import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import BrowserIcon3D from "./icons3d/BrowserIcon3D";
import BarChartIcon3D from "./icons3d/BarChartIcon3D";

export default function Pillars() {
  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            Lo que hacemos
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Dos disciplinas, un mismo equipo
          </h2>
          <p className="mt-4 text-neutral-400">
            No separamos el desarrollo de software del análisis de datos —
            se combinan en cada proyecto que lo necesita.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2">
          <ScrollReveal delay={0.05}>
            <TiltCard className="h-full">
              <div className="flex h-28 items-center justify-center">
                <BrowserIcon3D size={110} />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-white sm:text-2xl">
                Desarrollo de software
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                Construimos productos digitales a medida — sitios,
                aplicaciones móviles y sistemas internos — eligiendo la
                arquitectura y el stack correctos para cada proyecto.
              </p>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TiltCard className="h-full">
              <div className="flex h-28 items-center justify-center">
                <BarChartIcon3D size={110} />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-white sm:text-2xl">
                Ciencia de datos
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                Convertimos datos dispersos en modelos, predicciones y
                dashboards que tu equipo realmente usa para tomar
                decisiones, no solo reportes que nadie vuelve a abrir.
              </p>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
