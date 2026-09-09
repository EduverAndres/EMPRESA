import type { ReactNode } from "react";

/** Etiqueta corta que antecede al título de cada sección. */
export default function SectionKicker({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "muted";
  className?: string;
}) {
  return (
    <p
      className={`text-kicker font-semibold uppercase ${
        tone === "brand" ? "text-accent-400" : "text-fg-subtle"
      } ${className}`}
    >
      {children}
    </p>
  );
}
