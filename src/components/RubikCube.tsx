import type { CSSProperties, ReactNode } from "react";

export default function RubikCube({
  size = 128,
  variant = "main",
  glyph,
  className = "",
}: {
  size?: number;
  variant?: "main" | "mini";
  glyph?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rubik-scene relative ${className}`}
      style={{ "--cube-size": `${size}px` } as CSSProperties}
    >
      <div className={`rubik ${variant === "main" ? "rubik--main" : "rubik--mini"}`}>
        <div className="rubik-face rubik-face-front" />
        <div className="rubik-face rubik-face-back" />
        <div className="rubik-face rubik-face-right" />
        <div className="rubik-face rubik-face-left" />
        <div className="rubik-face rubik-face-top" />
        <div className="rubik-face rubik-face-bottom" />
      </div>

      {glyph ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          style={{ perspective: "none" }}
        >
          {glyph}
        </div>
      ) : null}
    </div>
  );
}
