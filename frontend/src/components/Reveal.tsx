"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * Revelado al entrar en pantalla.
 *
 * Sustituye a framer-motion (~50 KB gzip) por un único IntersectionObserver
 * compartido por todas las instancias del sitio. La animación en sí es CSS
 * puro (ver `[data-reveal]` en globals.css), así que corre en el compositor
 * y no ejecuta JavaScript por frame.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        // Una sola vez: dejamos de observar para no acumular trabajo al scrollear.
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  return observer;
}

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Retardo en milisegundos, para escalonar elementos de una misma rejilla. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si ya está en pantalla al montar (contenido "above the fold"), el
    // observer lo resuelve en su primera pasada igualmente.
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
