import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ServiceIcon3D from "./ServiceIcon3D";
import SectionKicker from "./SectionKicker";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="servicios" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionKicker className="mb-3">Qué hacemos</SectionKicker>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Servicios pensados para acompañarte de punta a punta.
          </h2>
          <p className="mt-4 text-neutral-400">
            Desde el producto que ve tu usuario hasta la infraestructura de
            datos e inteligencia artificial que lo sostiene por dentro.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.06}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/40 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(226,22,48,0.15)]"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-600/0 blur-2xl transition-colors duration-300 group-hover:bg-brand-600/20" />

                <div className="relative mb-4 flex h-24 items-center justify-center">
                  <ServiceIcon3D icon={service.icon} size={92} />
                </div>

                <h3 className="relative font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                  {service.short}
                </p>

                <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400">
                  Ver servicio
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
