"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import WireframeGlobe from "./WireframeGlobe";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 40, damping: 15, mass: 0.5 });

  const globeX = useTransform(sx, [-1, 1], [-24, 24]);
  const globeY = useTransform(sy, [-1, 1], [-24, 24]);
  const tiltX = useTransform(sy, [-1, 1], [8, -8]);
  const tiltY = useTransform(sx, [-1, 1], [-8, 8]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      mx.set(relX * 2 - 1);
      my.set(relY * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px]"
    >
      {/* soft red glow behind the globe */}
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[110px] sm:h-[26rem] sm:w-[26rem]" />

      {/* minimalist wireframe globe centerpiece */}
      <motion.div
        style={{ x: globeX, y: globeY, rotateX: tiltX, rotateY: tiltY }}
        className="absolute left-1/2 top-[16%] -translate-x-1/2 [transform-style:preserve-3d]"
      >
        <div className="scale-75 sm:scale-100">
          <WireframeGlobe size={280} />
        </div>
      </motion.div>

      <div className="absolute right-[6%] bottom-[12%] h-24 w-24 rounded-full border border-brand-500/20 bg-brand-600/5 animate-float-slower sm:h-32 sm:w-32" />
    </div>
  );
}
