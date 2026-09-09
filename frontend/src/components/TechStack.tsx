import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Solo tecnologías verificables en este repositorio: `package.json`, la
 * configuración y el código de las rutas de API. Nada aspiracional — si no se
 * usa aquí, no aparece.
 */
const rowA = ["Next.js", "React", "TypeScript", "Tailwind CSS"];
const rowB = ["Node.js", "Vercel", "Resend", "Google Gemini"];

/**
 * Copias de la lista dentro de la cinta.
 *
 * Los nombres de tecnología son mucho más cortos que las frases genéricas que
 * había antes, así que dos copias ya no cubren una pantalla ancha y se abriría
 * un hueco al final del bucle. El desplazamiento del keyframe sigue siendo
 * -50 %, que sigue cayendo en un punto idéntico mientras el número de copias
 * sea par.
 */
const REPEATS = 8;

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const loop = Array.from({ length: REPEATS }, () => items).flat();
  return (
    <div className="marquee-row marquee-fade overflow-hidden" aria-hidden>
      <div
        className={`marquee-track ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="surface flex-none rounded-full px-5 py-2.5 text-sm font-medium text-fg-muted"
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
        <SectionHeading
          kicker="Capacidades"
          title="Elegimos la herramienta correcta, no la única que sabemos usar"
          description="Evaluamos cada proyecto por su cuenta y elegimos el lenguaje, el framework y la infraestructura que mejor se ajusten a lo que necesita, en vez de aplicar siempre la misma receta."
        />
      </div>

      <Reveal delay={100} className="mt-12 flex flex-col gap-3">
        <Row items={rowA} direction="left" />
        <Row items={rowB} direction="right" />
      </Reveal>

      {/* Las marquesinas son decorativas y duplican su contenido; esta lista da
          el mismo contenido, una sola vez, a lectores de pantalla y buscadores. */}
      <ul className="sr-only">
        {[...rowA, ...rowB].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
