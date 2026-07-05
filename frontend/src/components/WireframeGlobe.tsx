const meridians = [0, 30, 60, 90, 120, 150];

export default function WireframeGlobe({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: 900 }}
    >
      {/* soft ambient core, kept faint for a minimalist read */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-2xl"
        style={{ width: size * 0.35, height: size * 0.35 }}
      />

      <div
        className="relative animate-globe-spin"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: "rotateX(-10deg)",
        }}
      >
        {meridians.map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border border-brand-400/35"
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}

        {/* parallels */}
        <div className="absolute inset-0 rounded-full border border-white/25" style={{ transform: "rotateX(90deg)" }} />
        <div
          className="absolute rounded-full border border-white/12"
          style={{
            inset: size * 0.16,
            transform: `rotateX(90deg) translateZ(${size * 0.02}px)`,
          }}
        />
        <div
          className="absolute rounded-full border border-white/12"
          style={{
            inset: size * 0.36,
            transform: `rotateX(90deg) translateZ(${-size * 0.02}px)`,
          }}
        />

        {/* two faint data nodes on the surface */}
        <span
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white animate-pulse-glow"
          style={{
            left: "50%",
            top: "18%",
            transform: `translate(-50%, -50%) translateZ(${size * 0.46}px)`,
            boxShadow: "0 0 8px rgba(255,255,255,0.9)",
          }}
        />
        <span
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400 animate-pulse-glow"
          style={{
            left: "72%",
            top: "60%",
            transform: `translate(-50%, -50%) translateZ(${size * 0.4}px)`,
            boxShadow: "0 0 8px rgba(255,90,105,0.9)",
            animationDelay: "1.4s",
          }}
        />
      </div>

      {/* thin orbit ring, independent slow rotation */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-globe-spin-slow"
        style={{
          width: size * 1.34,
          height: size * 1.34,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ transform: "rotateX(78deg) rotateZ(12deg)" }}
        />
      </div>
    </div>
  );
}
