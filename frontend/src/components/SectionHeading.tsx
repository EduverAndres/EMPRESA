import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionKicker from "./SectionKicker";

/**
 * Encabezado de sección.
 *
 * Las cinco secciones repetían la misma estructura con medidas ligeramente
 * distintas, y eso hacía que la página se sintiera irregular al recorrerla.
 * Centralizarla garantiza el mismo ritmo vertical en todas.
 */
export default function SectionHeading({
  kicker,
  title,
  description,
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
      <SectionKicker className="mb-4">{kicker}</SectionKicker>
      <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
