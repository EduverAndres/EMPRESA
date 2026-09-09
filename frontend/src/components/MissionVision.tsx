import { Rocket, Telescope } from "lucide-react";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

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

/**
 * Misión y visión.
 *
 * Salió de la portada: en una home que ya tenía seis secciones competía por
 * atención con el catálogo de servicios y con el cierre. Vive en `/nosotros`,
 * donde el encabezado de la página hace de `h1` y este componente aporta solo
 * los dos bloques.
 */
export default function MissionVision() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {blocks.map((block, i) => (
        <Reveal key={block.title} delay={60 + i * 80}>
          <SpotlightCard className="h-full">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-600/15 text-accent-400">
              <block.icon size={22} />
            </div>
            <h2 className="font-display text-titulo-card font-semibold text-white">
              {block.title}
            </h2>
            <p className="mt-4 leading-relaxed text-fg-muted">{block.text}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}
