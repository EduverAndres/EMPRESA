import Link from "next/link";
import { ArrowRight, LineChart, Wrench, LifeBuoy } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import AssistantButton from "./AssistantButton";
import { siteConfig } from "@/lib/site-config";

/**
 * Franja bajo los botones.
 *
 * Sustituye a «Calidad · Transparencia · Innovación · Compromiso»: cuatro
 * valores abstractos que cualquier estudio podría firmar y que no le dicen
 * nada a quien está decidiendo si escribirnos. En su lugar van los tres
 * diferenciadores declarados en `.claude/skills/nexus-marca/SKILL.md`.
 *
 * PENDIENTE: cuando existan los datos duros —años operando, proyectos
 * entregados y tiempo de respuesta— sustituyen a estos tres bloques, con la
 * cifra como `label` y la unidad como `detail`. Hasta entonces no se publica
 * ninguna cifra: una inventada haría más daño que la ausencia.
 */
const proof = [
  {
    icon: LineChart,
    label: "Datos e IA, no solo web",
    detail: "Modelos, dashboards e integraciones de IA",
  },
  {
    icon: Wrench,
    label: "El stack lo elige el problema",
    detail: "No forzamos la misma tecnología en todo",
  },
  {
    icon: LifeBuoy,
    label: "Seguimos después de entregar",
    detail: "Soporte y ajustes con el producto en marcha",
  },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center overflow-hidden pt-28 pb-32 sm:pb-40"
    >
      <FloatingShapes />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <p
          className="animate-rise inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-brand-300 backdrop-blur-sm"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          Software, datos e inteligencia artificial
        </p>

        <h1
          className="animate-rise font-display mt-7 max-w-4xl text-display font-semibold text-white"
          style={{ "--rise-delay": "90ms" } as React.CSSProperties}
        >
          Ese proyecto que llevas{" "}
          <span className="text-gradient-brand">meses aplazando</span>
        </h1>

        <p
          className="animate-rise mt-7 max-w-2xl text-balance text-entrada text-fg-muted"
          style={{ "--rise-delay": "170ms" } as React.CSSProperties}
        >
          Ya sea una idea sin empezar, un Excel que se quedó corto o un sistema
          que no se habla con los demás — lo construimos bien y te acompañamos
          después.
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
          <AssistantButton />
        </div>

        <ul
          className="animate-rise mt-16 grid w-full max-w-3xl grid-cols-1 gap-x-8 gap-y-7 sm:mt-20 sm:grid-cols-3"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          {proof.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-2">
              <item.icon size={18} className="text-accent-400" aria-hidden />
              <span className="text-sm font-semibold text-white">
                {item.label}
              </span>
              <span className="text-sm leading-snug text-fg-muted">
                {item.detail}
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
