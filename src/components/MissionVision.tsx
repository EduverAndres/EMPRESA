import { Rocket, Telescope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";

export default function MissionVision() {
  return (
    <section id="mision-vision" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            Nuestro rumbo
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un rumbo claro detrás de cada línea de código
          </h2>
          <p className="mt-4 text-neutral-400">
            En Órbita trabajamos con un propósito y una dirección definidos:
            construir software que genere valor real para quienes confían en
            nosotros.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2">
          <ScrollReveal delay={0.05}>
            <TiltCard className="h-full">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400">
                <Rocket size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Misión
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                Ayudar a negocios y personas a convertir sus ideas en software
                sólido, escalable y hecho a medida, acompañándolos de cerca en
                cada etapa con procesos claros, comunicación honesta y
                atención al detalle desde el primer día.
              </p>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TiltCard className="h-full">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400">
                <Telescope size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Visión
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                Convertirnos en un estudio de desarrollo de referencia,
                reconocido por la calidad de nuestro trabajo, la innovación
                constante y las relaciones de confianza que construimos con
                cada cliente que crece junto a nosotros.
              </p>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
