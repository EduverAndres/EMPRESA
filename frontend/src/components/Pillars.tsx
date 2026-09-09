import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import SectionHeading from "./SectionHeading";
import BrowserIcon3D from "./icons3d/BrowserIcon3D";
import BarChartIcon3D from "./icons3d/BarChartIcon3D";

/**
 * Primera sección que rompe el centrado del hero.
 *
 * El encabezado se ancla a la izquierda y se queda pegado arriba mientras las
 * dos disciplinas pasan por delante. Las tarjetas no están a la misma altura a
 * propósito: el desfase vertical es lo que las separa, en lugar de un borde o
 * una línea divisoria.
 */
export default function Pillars() {
  return (
    <section className="relative px-5 pt-24 pb-16 sm:px-8 sm:pt-40 sm:pb-24">
      <div className="mx-auto grid max-w-6xl gap-x-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              align="left"
              kicker="Lo que hacemos"
              title="Dos disciplinas, un mismo equipo"
              description="No separamos el desarrollo de software del análisis de datos — se combinan en cada proyecto que lo necesita."
            />
          </div>
        </div>

        <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Reveal delay={60}>
            <SpotlightCard>
              <div className="flex h-24 items-center justify-center">
                <BrowserIcon3D size={104} />
              </div>
              <h3 className="font-display mt-6 text-titulo-card font-semibold text-white">
                Desarrollo de software
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Construimos productos digitales a medida — sitios, aplicaciones
                móviles y sistemas internos — eligiendo la arquitectura y el
                stack correctos para cada proyecto.
              </p>
            </SpotlightCard>
          </Reveal>

          {/* El desfase sustituye al borde: dos bloques que no se alinean se
              leen como dos cosas distintas sin dibujar la separación. */}
          <Reveal delay={140} className="mt-8 lg:mt-24">
            <SpotlightCard>
              <div className="flex h-24 items-center justify-center">
                <BarChartIcon3D size={104} />
              </div>
              <h3 className="font-display mt-6 text-titulo-card font-semibold text-white">
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
