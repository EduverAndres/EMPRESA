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

// Light coming mostly from the left, like the reference render — the split
// needs to read left/right across the visible face, not front/back (which
// would hide the dark half behind the sphere and make every visible dot
// look lit).
const LIGHT = { x: -0.95, y: 0.2, z: 0.25 };
const LIGHT_LEN = Math.sqrt(LIGHT.x ** 2 + LIGHT.y ** 2 + LIGHT.z ** 2);

function litColor(nx: number, ny: number, nz: number): RGB {
  const dot = (nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z) / LIGHT_LEN;
  const t = Math.max(0, dot);

  // 0 -> near-black graphite, 0.55 -> intense red, 1 -> bright hot highlight
  if (t < 0.55) {
    return mix("#141414", "#d90429", t / 0.55);
  }
  return mix("#d90429", "#ff8a94", (t - 0.55) / 0.45);
}

function generatePoints(count: number) {
  const points: { x: number; y: number; z: number; color: RGB }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z, color: litColor(x, y, z) });
  }
  return points;
}

const DOT_COUNT = 260;
const POINTS = generatePoints(DOT_COUNT);
// One full turn every 24s.
const ANGULAR_SPEED = (Math.PI * 2) / 24000;

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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const radius = size / 2;
    const dotRadius = Math.max(2, size * 0.029);
    // Dots sitting exactly at the sphere's equator/edge would otherwise be
    // centered right on the canvas boundary, clipping them in half. Pulling
    // the sphere in a bit leaves room for the dot's own radius on every side.
    const sphereRadius = radius - dotRadius * 1.4;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const order = POINTS.map((_, i) => i);

    const draw = (angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      ctx.clearRect(0, 0, size, size);

      // Painter's algorithm: draw back-to-front so near dots overlap far ones.
      order.sort((a, b) => {
        const za = POINTS[a].x * sin + POINTS[a].z * cos;
        const zb = POINTS[b].x * sin + POINTS[b].z * cos;
        return za - zb;
      });

      for (const i of order) {
        const p = POINTS[i];
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;

        const depth = (rz + 1) / 2; // 0 (back) .. 1 (front)
        const scale = 0.55 + 0.45 * depth;
        const cx = radius + rx * sphereRadius;
        const cy = radius + -p.y * sphereRadius;
        const r = dotRadius * scale;
        const [red, green, blue] = p.color;

        const grad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
        grad.addColorStop(0, "rgba(255,255,255,0.55)");
        grad.addColorStop(0.55, `rgb(${red}, ${green}, ${blue})`);
        grad.addColorStop(1, "rgba(0,0,0,0.8)");

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    draw(0);
    if (reduced) return;

    let raf = 0;
    let angle = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      angle += ANGULAR_SPEED * dt;
      draw(angle);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 38% 35%, rgba(217,4,41,0.4), transparent 65%)" }}
      />
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
    </div>
  );
}
