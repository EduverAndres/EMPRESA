function generatePoints(count: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    });
  }
  return points;
}

// Light coming from the upper-left-front, like the reference render.
const LIGHT = { x: -0.6, y: 0.4, z: 0.75 };
const LIGHT_LEN = Math.sqrt(LIGHT.x ** 2 + LIGHT.y ** 2 + LIGHT.z ** 2);

function litColor(nx: number, ny: number, nz: number) {
  const dot = (nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z) / LIGHT_LEN;
  const t = Math.max(0, dot);

  // 0 -> near-black graphite, 0.55 -> intense red, 1 -> bright hot highlight
  if (t < 0.55) {
    const k = t / 0.55;
    return mix("#141414", "#d90429", k);
  }
  const k = (t - 0.55) / 0.45;
  return mix("#d90429", "#ff8a94", k);
}

function mix(hexA: string, hexB: string, t: number) {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255;
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

const DOT_COUNT = 260;
const POINTS = generatePoints(DOT_COUNT);

export default function SphereGrid({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const radius = size / 2;
  const dotSize = Math.max(4, size * 0.05);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: size * 2.6 }}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 38% 35%, rgba(217,4,41,0.35), transparent 65%)" }}
      />
      <div
        className="animate-globe-spin"
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {POINTS.map((p, i) => {
          const color = litColor(p.x, p.y, p.z);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: dotSize,
                height: dotSize,
                marginLeft: -dotSize / 2,
                marginTop: -dotSize / 2,
                borderRadius: "9999px",
                transform: `translate3d(${p.x * radius}px, ${-p.y * radius}px, ${p.z * radius}px)`,
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), ${color} 65%, rgba(0,0,0,0.6) 100%)`,
                boxShadow: "0 0 2px rgba(0,0,0,0.6)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
