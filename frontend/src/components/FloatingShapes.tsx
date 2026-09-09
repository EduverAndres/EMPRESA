"use client";

import { useEffect, useRef } from "react";
import SphereGrid from "./SphereGrid";

/**
 * Escenografía del hero: la esfera de puntos con un paralaje muy sutil.
 *
 * El paralaje se escribe directamente sobre `style.transform` dentro de un
 * requestAnimationFrame propio, en vez de pasar por estado de React o por los
 * muelles de framer-motion. Así el movimiento del ratón no provoca ni un solo
 * re-render, y el bucle solo corre mientras hay algo que actualizar.
 */
export default function FloatingShapes() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sphereRef.current;
    if (!el) return;

    // Sin ratón (móvil/tablet) no hay paralaje que calcular.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    let idle = true;

    const loop = () => {
      // Interpolación suave hacia el objetivo (efecto muelle, sin librería).
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      // Cuando prácticamente ha alcanzado el objetivo, se detiene el bucle.
      if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
        idle = true;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 34;
      targetY = (e.clientY / window.innerHeight - 0.5) * 26;
      if (idle) {
        idle = false;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={sphereRef}
        className="absolute left-1/2 top-[14%] -translate-x-1/2 will-change-transform"
      >
        <div className="scale-[0.62] opacity-90 sm:scale-90 lg:scale-100">
          <SphereGrid size={300} />
        </div>
      </div>
    </div>
  );
}
