import { Search, Layers, Repeat, LifeBuoy } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Descubrimiento",
    description:
      "Entendemos tu negocio, tus usuarios y el problema real antes de tocar una línea de código.",
  },
  {
    icon: Layers,
    title: "Arquitectura & diseño",
    description:
      "Elegimos el stack y la arquitectura según lo que el proyecto necesita, no según lo que ya conocemos.",
  },
  {
    icon: Repeat,
    title: "Desarrollo iterativo",
    description:
      "Entregas frecuentes y comunicación constante — nada de meses de silencio hasta la entrega final.",
  },
  {
    icon: LifeBuoy,
    title: "Lanzamiento & soporte",
    description:
      "Acompañamos el después: monitoreo, ajustes y soporte una vez el producto está en producción.",
  },
];

export default function Process() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Cómo trabajamos"
          title="Un proceso claro, de principio a fin"
          description="Cuatro etapas, sin sorpresas: en cada una sabes qué se está haciendo y qué sigue después."
        />

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Hilo que une los cuatro pasos en escritorio */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent lg:block"
          />

          {steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 90} className="relative">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="surface-solid relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-accent-400">
                  <step.icon size={22} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
