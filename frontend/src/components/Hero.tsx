import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, Sparkles, Handshake } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import { siteConfig } from "@/lib/site-config";

// Los cuatro valores que ya declaraba el sitio, ahora con jerarquía propia:
// en una línea de texto plano se leían como decoración, no como compromiso.
const values = [
  { icon: ShieldCheck, label: "Calidad", detail: "Código revisado y probado" },
  { icon: Eye, label: "Transparencia", detail: "Avances visibles siempre" },
  { icon: Sparkles, label: "Innovación", detail: "La herramienta correcta" },
  { icon: Handshake, label: "Compromiso", detail: "Acompañamiento real" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center overflow-hidden pt-28 pb-16"
    >
      <FloatingShapes />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <p
          className="animate-rise inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm sm:text-sm"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          Software, datos e inteligencia artificial
        </p>

        <h1
          className="animate-rise font-display mt-7 max-w-4xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ "--rise-delay": "90ms" } as React.CSSProperties}
        >
          Convertimos ideas y datos en{" "}
          <span className="text-gradient-brand">software que despega</span>
        </h1>

        <p
          className="animate-rise mt-6 max-w-2xl text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
          style={{ "--rise-delay": "170ms" } as React.CSSProperties}
        >
          Diseñamos software a medida y convertimos datos en decisiones — desde
          plataformas web y aplicaciones móviles hasta modelos y dashboards que
          sostienen tu negocio por dentro.
        </p>

        <div
          className="animate-rise mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          style={{ "--rise-delay": "250ms" } as React.CSSProperties}
        >
          <Link
            href="/#contacto"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.8)] transition-colors hover:bg-brand-500 sm:w-auto"
          >
            Iniciemos tu proyecto
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/#servicios"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-line-strong)] px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-brand-500/50 hover:bg-white/5 sm:w-auto"
          >
            Ver servicios
          </Link>
        </div>

        {/* Franja de valores: sustituye a la lista de palabras sueltas anterior */}
        <ul
          className="animate-rise mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-6 sm:mt-20 sm:grid-cols-4"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          {values.map((value) => (
            <li key={value.label} className="flex flex-col items-center gap-2">
              <value.icon size={18} className="text-accent-400" aria-hidden />
              <span className="text-sm font-semibold text-white">
                {value.label}
              </span>
              <span className="text-sm leading-snug text-fg-muted">
                {value.detail}
              </span>
            </li>
          ))}
        </ul>

        <p className="sr-only">
          {siteConfig.name} — {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
