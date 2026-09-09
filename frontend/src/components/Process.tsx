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

/**
 * Sección de ancho completo: el rail de pasos sale de la caja de contenido y
 * se corta contra el borde derecho de la pantalla.
 *
 * El corte es intencionado — comunica que el proceso continúa y obliga al ojo
 * a moverse en horizontal después de dos secciones bajando en vertical. Las
 * cajas que antes rodeaban cada icono desaparecen: aquí separan el espacio y
 * el número, no un borde.
 */
export default function Process() {
  return (
    <section className="relative pt-16 pb-28 sm:pt-24 sm:pb-56">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Cómo trabajamos"
          title="Un proceso claro, de principio a fin"
          description="Cuatro etapas, sin sorpresas: en cada una sabes qué se está haciendo y qué sigue después."
        />
      </div>

      {/* El revelado envuelve al rail completo y no a cada paso: los pasos que
          quedan fuera del recorte horizontal nunca llegarían a activarlo. */}
      <Reveal delay={80} className="mt-14 sm:mt-20">
        <div className="rail-scroller overflow-x-auto pb-4">
          <ol className="rail-start flex w-max snap-x snap-mandatory gap-8 pr-5 sm:gap-12 sm:pr-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="w-[74vw] max-w-[19rem] flex-none snap-start sm:w-[17rem]"
              >
                <span
                  aria-hidden
                  className="numero-contorno font-display block text-display font-bold"
                >
                  {i + 1}
                </span>
                <step.icon
                  size={20}
                  className="mt-3 text-accent-400"
                  aria-hidden
                />
                <h3 className="font-display mt-4 text-titulo-card font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Prueba de método, no de resultados: mientras no existan casos reales
          que publicar, lo verificable es cómo se trabaja. Se dice de forma
          explícita en vez de rellenar el hueco con clientes inventados. */}
      <div className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-8">
        <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
          Los casos de proyectos entregados llegan pronto. Mientras tanto, este
          es el método con el que trabajamos en cada uno.
        </p>
      </div>
    </section>
  );
}
