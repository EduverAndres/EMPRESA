import { Search, Layers, Repeat, LifeBuoy } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionKicker from "./SectionKicker";

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
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionKicker className="mb-3">Cómo trabajamos</SectionKicker>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un proceso claro, de principio a fin
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08} className="relative">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="relative z-10 flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-brand-500/25 bg-ink-900 text-brand-400 shadow-[0_0_25px_rgba(226,22,48,0.2)]">
                  <step.icon size={24} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
