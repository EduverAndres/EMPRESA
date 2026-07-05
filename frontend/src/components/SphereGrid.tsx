"use client";

import { useEffect, useRef } from "react";

function generatePoints(count: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    });
  }
  return points;
}

// Light coming from the upper-left-front, like the reference render.
const LIGHT = { x: -0.6, y: 0.4, z: 0.75 };
const LIGHT_LEN = Math.sqrt(LIGHT.x ** 2 + LIGHT.y ** 2 + LIGHT.z ** 2);

function litColor(nx: number, ny: number, nz: number) {
  const dot = (nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z) / LIGHT_LEN;
  const t = Math.max(0, dot);

  // 0 -> near-black graphite, 0.55 -> intense red, 1 -> bright hot highlight
  if (t < 0.55) {
    const k = t / 0.55;
    return mix("#141414", "#d90429", k);
  }
  const k = (t - 0.55) / 0.45;
  return mix("#d90429", "#ff8a94", k);
}

function mix(hexA: string, hexB: string, t: number) {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255;
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

const px = (n: number) => `${n.toFixed(2)}px`;

const DOT_COUNT = 260;
const POINTS = generatePoints(DOT_COUNT);
// One full turn every 24s — matches the previous CSS animation's pace.
const ANGULAR_SPEED = (Math.PI * 2) / 24000;

export default function SphereGrid({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const radius = size / 2;
  const dotSize = Math.max(4, size * 0.058);
  const half = Number((dotSize / 2).toFixed(2));
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let angle = 0;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      angle += ANGULAR_SPEED * dt;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let i = 0; i < POINTS.length; i++) {
        const el = dotRefs.current[i];
        if (!el) continue;
        const p = POINTS[i];
        // Rotate around the Y axis. Each dot keeps its own plane facing the
        // camera at all times (only its position is animated, never its own
        // rotation), which is what keeps it a perfect circle instead of
        // stretching into an ellipse at grazing angles.
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        el.style.transform = `translate3d(${px(rx * radius)}, ${px(-p.y * radius)}, ${px(rz * radius)})`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [radius]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: Math.round(size * 1.9) }}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 38% 35%, rgba(217,4,41,0.4), transparent 65%)" }}
      />
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        {POINTS.map((p, i) => {
          const color = litColor(p.x, p.y, p.z);
          return (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: dotSize,
                height: dotSize,
                marginLeft: -half,
                marginTop: -half,
                borderRadius: "9999px",
                transform: `translate3d(${px(p.x * radius)}, ${px(-p.y * radius)}, ${px(p.z * radius)})`,
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), ${color} 55%, rgba(0,0,0,0.75) 100%)`,
                border: "0.5px solid rgba(0,0,0,0.4)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 1.5px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.5)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
