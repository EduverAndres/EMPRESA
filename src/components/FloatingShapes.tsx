"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import RubikCube from "./RubikCube";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 40, damping: 15, mass: 0.5 });

  const cubeX = useTransform(sx, [-1, 1], [-26, 26]);
  const cubeY = useTransform(sy, [-1, 1], [-26, 26]);
  const miniX = useTransform(sx, [-1, 1], [16, -16]);
  const miniY = useTransform(sy, [-1, 1], [16, -16]);
  const ringRotateX = useTransform(sy, [-1, 1], [12, -12]);
  const ringRotateY = useTransform(sx, [-1, 1], [-12, 12]);

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
      {/* red glow core behind the cube */}
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/30 blur-[100px] sm:h-[28rem] sm:w-[28rem]" />

      {/* orbiting rings + rubik's cube centerpiece */}
      <motion.div
        style={{ x: cubeX, y: cubeY, rotateX: ringRotateX, rotateY: ringRotateY }}
        className="absolute left-1/2 top-[16%] -translate-x-1/2 [transform-style:preserve-3d]"
      >
        <div className="relative flex h-56 w-56 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute -inset-6 rounded-full border border-brand-400/30 animate-spin-slow [transform:rotateX(70deg)]" />
          <div className="absolute -inset-14 rounded-full border border-white/10 animate-spin-slow [animation-duration:38s] [transform:rotateX(70deg)_rotateZ(30deg)]" />
          <div className="scale-75 sm:scale-100 [transform-style:preserve-3d]">
            <RubikCube size={132} variant="main" />
          </div>
        </div>
      </motion.div>

      {/* satellite mini cubes */}
      <motion.div
        style={{ x: miniX, y: miniY }}
        className="absolute left-[10%] top-[64%] hidden sm:block"
      >
        <div className="animate-float-slow">
          <RubikCube size={44} variant="mini" />
        </div>
      </motion.div>

      <motion.div
        style={{ x: miniY, y: miniX }}
        className="absolute right-[12%] top-[28%] hidden sm:block"
      >
        <div className="animate-float-slower">
          <RubikCube size={30} variant="mini" />
        </div>
      </motion.div>

      <div className="absolute right-[6%] bottom-[12%] h-24 w-24 rounded-full border border-brand-500/30 bg-brand-600/5 animate-float-slower sm:h-32 sm:w-32" />
    </div>
  );
}
