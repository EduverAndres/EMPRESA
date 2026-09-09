import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionKicker from "./SectionKicker";

/**
 * Encabezado de sección.
 *
 * Las cinco secciones repetían la misma estructura con medidas ligeramente
 * distintas, y eso hacía que la página se sintiera irregular al recorrerla.
 * Centralizarla garantiza el mismo ritmo vertical en todas.
 *
 * El centrado era una clase fija dentro del componente, así que ninguna
 * sección podía romperlo aunque quisiera. Ahora tanto el eje como el peso son
 * decisión de quien lo usa, con el centrado y el nivel principal como valores
 * por defecto.
 *
 * Los tamaños salen de los tokens de la escala (`globals.css`); aquí no hay
 * ningún valor suelto.
 */
export default function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  size = "principal",
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  /** Eje del bloque. `left` lo ancla a la izquierda de su contenedor. */
  align?: "center" | "left";
  /**
   * Peso tipográfico de la sección. `apoyo` es para las que deben leerse como
   * pausa y no competir con las protagonistas.
   */
  size?: "principal" | "apoyo";
  className?: string;
}) {
  const box = align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center";
  const titleSize =
    size === "apoyo" ? "text-titulo-apoyo" : "text-titulo-seccion";

  return (
    <Reveal className={`${box} ${className}`}>
      <SectionKicker className="mb-4">{kicker}</SectionKicker>
      <h2 className={`font-display ${titleSize} font-semibold text-white`}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-entrada text-fg-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
