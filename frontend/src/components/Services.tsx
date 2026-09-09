import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import ServiceIcon3D from "./ServiceIcon3D";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/services";

/**
 * Servicio que ocupa la tarjeta ancha de la rejilla.
 *
 * Es el diferenciador principal del estudio y hasta ahora quedaba enterrado
 * entre los otros seis, todos del mismo tamaño. Cambiar el destacado es
 * cambiar este slug.
 */
const SLUG_DESTACADO = "ciencia-de-datos";

export default function Services() {
  const destacado =
    services.find((s) => s.slug === SLUG_DESTACADO) ?? services[0];
  const resto = services.filter((s) => s.slug !== destacado.slug);

  return (
    <section
      id="servicios"
      className="relative px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="left"
          kicker="Qué hacemos"
          title="Servicios pensados para acompañarte de punta a punta"
          description="Desde el producto que ve tu usuario hasta la infraestructura de datos e inteligencia artificial que lo sostiene por dentro."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta ancha: ocupa dos columnas y coloca el icono al lado del
              texto en vez de encima, que es lo que la distingue del resto sin
              necesidad de otro tratamiento visual. */}
          <Reveal className="sm:col-span-2">
            <Link
              href={`/servicios/${destacado.slug}`}
              className="spotlight surface group relative flex h-full flex-col gap-5 rounded-2xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-500/40 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
            >
              <div className="flex flex-none items-center justify-center sm:w-40">
                <ServiceIcon3D icon={destacado.icon} size={124} />
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-titulo-card font-semibold text-white">
                  {destacado.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fg-muted">
                  {destacado.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400">
                  Ver servicio
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          {resto.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 70}>
              <Link
                href={`/servicios/${service.slug}`}
                className="spotlight surface group relative flex h-full flex-col rounded-2xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-500/40"
              >
                <div className="mb-5 flex h-24 items-center justify-center">
                  <ServiceIcon3D icon={service.icon} size={92} />
                </div>

                <h3 className="font-display text-titulo-card font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                  {service.short}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400">
                  Ver servicio
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
