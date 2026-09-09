import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import ServiceIcon3D from "./ServiceIcon3D";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="servicios" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Qué hacemos"
          title="Servicios pensados para acompañarte de punta a punta"
          description="Desde el producto que ve tu usuario hasta la infraestructura de datos e inteligencia artificial que lo sostiene por dentro."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 70}>
              <Link
                href={`/servicios/${service.slug}`}
                className="spotlight surface group relative flex h-full flex-col rounded-2xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-500/40"
              >
                <div className="mb-5 flex h-24 items-center justify-center">
                  <ServiceIcon3D icon={service.icon} size={92} />
                </div>

                <h3 className="font-display text-lg font-semibold text-white">
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
