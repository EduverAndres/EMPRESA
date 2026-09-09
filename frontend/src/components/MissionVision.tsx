import { Rocket, Telescope } from "lucide-react";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/site-config";

const blocks = [
  {
    icon: Rocket,
    title: "Misión",
    text: "Ayudar a negocios y personas a convertir sus ideas en software sólido, escalable y hecho a medida, acompañándolos de cerca en cada etapa con procesos claros, comunicación honesta y atención al detalle desde el primer día.",
  },
  {
    icon: Telescope,
    title: "Visión",
    text: "Convertirnos en un estudio de desarrollo de referencia, reconocido por la calidad de nuestro trabajo, la innovación constante y las relaciones de confianza que construimos con cada cliente que crece junto a nosotros.",
  },
];

export default function MissionVision() {
  return (
    <section id="mision-vision" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Nuestro rumbo"
          title="Un rumbo claro detrás de cada línea de código"
          description={`En ${siteConfig.name} trabajamos con un propósito y una dirección definidos: construir software que genere valor real para quienes confían en nosotros.`}
        />

        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={60 + i * 80}>
              <SpotlightCard className="h-full">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-600/15 text-accent-400">
                  <block.icon size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {block.title}
                </h3>
                <p className="mt-4 leading-relaxed text-fg-muted">
                  {block.text}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
