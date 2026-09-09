export default function AICoreIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 700 }}
    >
      {/* glowing core */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          background:
            "radial-gradient(circle at 35% 35%, rgba(206,238,253,0.95), rgba(59,130,246,0.9) 55%, rgba(22,58,140,0.9) 100%)",
          boxShadow: `0 0 ${size * 0.35}px rgba(59,130,246,0.55)`,
        }}
      />

      {/* orbit 1 */}
      <div
        className="absolute rounded-full border border-brand-400/40"
        style={{
          width: size * 0.72,
          height: size * 0.72,
          transform: "rotateX(72deg) rotateZ(0deg)",
        }}
      >
        <div
          className="absolute animate-spin-slow"
          style={{ inset: 0, animationDuration: "7s" }}
        >
          <span
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            style={{ width: size * 0.07, height: size * 0.07, top: -size * 0.035, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      </div>

      {/* orbit 2 */}
      <div
        className="absolute rounded-full border border-white/15"
        style={{
          width: size * 0.95,
          height: size * 0.95,
          transform: "rotateX(70deg) rotateZ(55deg)",
        }}
      >
        <div
          className="absolute animate-spin-slow"
          style={{ inset: 0, animationDuration: "11s", animationDirection: "reverse" }}
        >
          <span
            className="absolute rounded-full bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]"
            style={{ width: size * 0.06, height: size * 0.06, top: -size * 0.03, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      </div>

      {/* orbit 3 */}
      <div
        className="absolute rounded-full border border-brand-500/25"
        style={{
          width: size * 1.16,
          height: size * 1.16,
          transform: "rotateX(68deg) rotateZ(-40deg)",
        }}
      >
        <div
          className="absolute animate-spin-slow"
          style={{ inset: 0, animationDuration: "16s" }}
        >
          <span
            className="absolute rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            style={{ width: size * 0.045, height: size * 0.045, top: -size * 0.0225, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      </div>
    </div>
  );
}
