"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * Tarjeta con foco de luz que sigue al cursor.
 *
 * Reemplaza a la tarjeta con inclinación 3D anterior. El giro en perspectiva
 * era llamativo pero desalineaba el texto y dificultaba la lectura; un foco
 * suave da la misma sensación de profundidad sin mover el contenido.
 *
 * Solo se actualizan dos variables CSS, y se hace dentro de un rAF para no
 * escribir más de una vez por frame aunque el ratón dispare decenas de
 * eventos. React no vuelve a renderizar en ningún momento.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || frame.current) return;

    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${clientY - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight surface group rounded-2xl p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)] sm:p-9 ${className}`}
    >
      {children}
    </div>
  );
}
