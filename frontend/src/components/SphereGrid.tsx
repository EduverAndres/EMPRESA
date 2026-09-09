"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];

function mix(hexA: string, hexB: string, t: number): RGB {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255;
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255;
  return [
    Math.round(ar + (br - ar) * t),
    Math.round(ag + (bg - ag) * t),
    Math.round(ab + (bb - ab) * t),
  ];
}

// La luz entra desde la izquierda: el corte claro/oscuro tiene que leerse a lo
// ancho de la cara visible. Si viniera de frente, todos los puntos visibles
// quedarían iluminados y la esfera perdería volumen.
const LIGHT = { x: -0.95, y: 0.2, z: 0.25 };
const LIGHT_LEN = Math.sqrt(LIGHT.x ** 2 + LIGHT.y ** 2 + LIGHT.z ** 2);

// Cuántos tonos distintos se pre-renderizan. Con 20 el degradado sigue siendo
// continuo a simple vista y el número de sprites se mantiene mínimo.
const SHADES = 20;

/** 0 = navy en sombra, 0.55 = azul pleno, 1 = cian de alta luz. */
function shadeColor(t: number): RGB {
  if (t < 0.55) return mix("#0a1024", "#2563eb", t / 0.55);
  return mix("#2563eb", "#a5f3fc", (t - 0.55) / 0.45);
}

function lightLevel(nx: number, ny: number, nz: number) {
  const dot = (nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z) / LIGHT_LEN;
  return Math.max(0, dot);
}

function generatePoints(count: number) {
  const points: { x: number; y: number; z: number; shade: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const shade = Math.min(
      SHADES - 1,
      Math.round(lightLevel(x, y, z) * (SHADES - 1))
    );
    points.push({ x, y, z, shade });
  }
  return points;
}

const DOT_COUNT = 260;
const POINTS = generatePoints(DOT_COUNT);
const ANGULAR_SPEED = (Math.PI * 2) / 26000; // una vuelta cada 26 s

/**
 * Pre-renderiza un sprite por tono.
 *
 * La versión anterior llamaba a `createRadialGradient` 260 veces por frame
 * (unas 15 600 veces por segundo a 60 fps), que es de lejos la operación más
 * cara del canvas 2D. Aquí cada tono se dibuja una única vez a un canvas
 * fuera de pantalla y después solo se copia con `drawImage`, que el navegador
 * resuelve por hardware.
 */
function buildSprites(radius: number, dpr: number) {
  const size = Math.ceil(radius * 2 * dpr);
  const sprites: HTMLCanvasElement[] = [];

  for (let i = 0; i < SHADES; i++) {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const g = c.getContext("2d");
    if (!g) continue;

    const r = size / 2;
    const [red, green, blue] = shadeColor(i / (SHADES - 1));
    const grad = g.createRadialGradient(
      r - r * 0.35,
      r - r * 0.4,
      r * 0.1,
      r,
      r,
      r
    );
    grad.addColorStop(0, "rgba(255,255,255,0.5)");
    grad.addColorStop(0.55, `rgb(${red}, ${green}, ${blue})`);
    grad.addColorStop(1, "rgba(2,6,18,0.85)");

    g.beginPath();
    g.arc(r, r, r, 0, Math.PI * 2);
    g.fillStyle = grad;
    g.fill();

    sprites.push(c);
  }

  return sprites;
}

export default function SphereGrid({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // 1.5 basta: por encima el coste de relleno crece al cuadrado y la mejora
    // visual en puntos de 4 px es imperceptible.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.scale(dpr, dpr);

    const radius = size / 2;
    const dotRadius = Math.max(2, size * 0.029);
    // Los puntos del ecuador quedarían centrados justo en el borde del canvas
    // y se verían cortados por la mitad; se encoge la esfera lo suficiente
    // para dejar sitio al radio del propio punto.
    const sphereRadius = radius - dotRadius * 1.4;

    const sprites = buildSprites(dotRadius, dpr);
    const order = POINTS.map((_, i) => i);

    const draw = (angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      ctx.clearRect(0, 0, size, size);

      // Algoritmo del pintor: de atrás hacia delante. Entre frames el array
      // queda casi ordenado, y el sort de V8 (TimSort) resuelve ese caso en
      // tiempo lineal.
      order.sort((a, b) => {
        const za = POINTS[a].x * sin + POINTS[a].z * cos;
        const zb = POINTS[b].x * sin + POINTS[b].z * cos;
        return za - zb;
      });

      for (const i of order) {
        const p = POINTS[i];
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;

        const depth = (rz + 1) / 2; // 0 = fondo, 1 = frente
        const scale = 0.55 + 0.45 * depth;
        const r = dotRadius * scale;
        const cx = radius + rx * sphereRadius;
        const cy = radius + -p.y * sphereRadius;

        ctx.drawImage(sprites[p.shade], cx - r, cy - r, r * 2, r * 2);
      }
    };

    draw(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let angle = 0;
    let last = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // tras una pestaña en segundo plano, no saltar
      last = now;
      angle += ANGULAR_SPEED * dt;
      draw(angle);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    // Dejar de animar cuando la esfera sale de pantalla o la pestaña pasa a
    // segundo plano: durante el resto del scroll el coste baja a cero.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [size]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, rgba(37,99,235,0.42), rgba(34,211,238,0.12) 45%, transparent 68%)",
        }}
      />
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
    </div>
  );
}
