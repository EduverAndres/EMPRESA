import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import SectionHeading from "./SectionHeading";
import BrowserIcon3D from "./icons3d/BrowserIcon3D";
import BarChartIcon3D from "./icons3d/BarChartIcon3D";

export default function Pillars() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Se retiró la píldora "Desarrollo de software & ciencia de datos" que
            iba encima: repetía el mismo mensaje que la etiqueta y el título,
            tres rótulos apilados diciendo lo mismo. */}
        <SectionHeading
          kicker="Lo que hacemos"
          title="Dos disciplinas, un mismo equipo"
          description="No separamos el desarrollo de software del análisis de datos — se combinan en cada proyecto que lo necesita."
        />

        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2">
          <Reveal delay={60}>
            <SpotlightCard className="h-full">
              <div className="flex h-24 items-center justify-center">
                <BrowserIcon3D size={104} />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-white sm:text-2xl">
                Desarrollo de software
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Construimos productos digitales a medida — sitios, aplicaciones
                móviles y sistemas internos — eligiendo la arquitectura y el
                stack correctos para cada proyecto.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={140}>
            <SpotlightCard className="h-full">
              <div className="flex h-24 items-center justify-center">
                <BarChartIcon3D size={104} />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-white sm:text-2xl">
                Ciencia de datos
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Convertimos datos dispersos en modelos, predicciones y
                dashboards que tu equipo realmente usa para tomar decisiones, no
                solo reportes que nadie vuelve a abrir.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
