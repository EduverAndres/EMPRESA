const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

export default function CompassIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const needleH = size * 0.34;
  const needleW = size * 0.075;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 700 }}
    >
      <div
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: "rotateX(55deg)",
        }}
      >
        <div
          className="relative rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(255,60,78,0.35)]"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,150,158,0.35), rgba(60,5,12,0.85) 70%)",
          }}
        >
          {ticks.map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 bg-white/30"
              style={{
                width: 2,
                height: size * 0.09,
                transform: `rotate(${deg}deg) translateY(-${size / 2 - size * 0.045}px)`,
                transformOrigin: "center",
              }}
            />
          ))}

          <div
            className="absolute inset-0 flex items-center justify-center animate-compass-settle"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative" style={{ width: needleW, height: needleH * 2 }}>
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${needleW / 2}px solid transparent`,
                  borderRight: `${needleW / 2}px solid transparent`,
                  borderBottom: `${needleH}px solid rgba(255,80,95,0.95)`,
                  filter: "drop-shadow(0 0 6px rgba(255,80,95,0.7))",
                }}
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${needleW / 2}px solid transparent`,
                  borderRight: `${needleW / 2}px solid transparent`,
                  borderTop: `${needleH}px solid rgba(230,230,235,0.9)`,
                }}
              />
            </div>
          </div>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            style={{ width: size * 0.09, height: size * 0.09 }}
          />
        </div>
      </div>
    </div>
  );
}
