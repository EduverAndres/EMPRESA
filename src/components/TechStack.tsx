import ScrollReveal from "./ScrollReveal";

const rowA = [
  "Frontend moderno",
  "Aplicaciones web escalables",
  "Apps móviles multiplataforma",
  "APIs REST y GraphQL",
  "Arquitecturas en la nube",
];

const rowB = [
  "Ciencia de datos y modelos predictivos",
  "Bases de datos relacionales y no relacionales",
  "Integraciones de inteligencia artificial",
  "Automatización de procesos",
  "DevOps y despliegue continuo",
];

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row marquee-fade overflow-hidden">
      <div
        className={`marquee-track ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex-none rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-neutral-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            Capacidades
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Elegimos la herramienta correcta, no la única que sabemos usar
          </h2>
          <p className="mt-4 text-neutral-400">
            Evaluamos cada proyecto por su cuenta y elegimos el lenguaje, el
            framework y la infraestructura que mejor se ajusten a lo que
            necesita, en vez de aplicar siempre la misma receta.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1} className="mt-12 flex flex-col gap-4">
        <Row items={rowA} direction="left" />
        <Row items={rowB} direction="right" />
      </ScrollReveal>
    </section>
  );
}
