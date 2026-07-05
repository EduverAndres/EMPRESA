import type { ReactNode } from "react";

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
      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "brand" ? "text-brand-400" : "text-neutral-500"
      } ${className}`}
    >
      {children}
    </p>
  );
}
