export default function DatabaseIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const w = size;
  const h = size * 1.15;
  const cap = size * 0.24;

  return (
    <div
      className={`relative animate-float-slow ${className}`}
      style={{ width: w, height: h, perspective: 700 }}
    >
      <div
        className="relative"
        style={{ width: w, height: h, transformStyle: "preserve-3d", transform: "rotateX(8deg)" }}
      >
        {/* bottom cap (base shadow) */}
        <div
          className="absolute rounded-[50%] bg-gradient-to-b from-brand-900/90 to-black/80"
          style={{ left: 0, width: w, height: cap, top: h - cap * 1.1 }}
        />
        {/* cylindrical body */}
        <div
          className="absolute"
          style={{
            left: 0,
            width: w,
            height: h - cap,
            top: cap / 2,
            background:
              "linear-gradient(to right, rgba(60,5,12,0.9) 0%, rgba(255,60,78,0.85) 22%, rgba(255,140,150,0.9) 50%, rgba(255,60,78,0.85) 78%, rgba(60,5,12,0.9) 100%)",
            borderLeft: "1px solid rgba(255,255,255,0.15)",
            borderRight: "1px solid rgba(255,255,255,0.15)",
          }}
        />
        {/* seam lines separating the three "disks" */}
        <div
          className="absolute rounded-[50%] border-b-2 border-black/30"
          style={{ left: 0, width: w, height: cap * 0.7, top: cap / 2 + (h - cap) * 0.32 }}
        />
        <div
          className="absolute rounded-[50%] border-b-2 border-black/30"
          style={{ left: 0, width: w, height: cap * 0.7, top: cap / 2 + (h - cap) * 0.64 }}
        />
        {/* top cap (lit lid) */}
        <div
          className="absolute rounded-[50%] shadow-[0_0_18px_rgba(255,70,85,0.55)]"
          style={{
            left: 0,
            width: w,
            height: cap,
            top: 0,
            background:
              "linear-gradient(135deg, rgba(255,205,210,0.95), rgba(255,60,78,0.9))",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        />
      </div>
    </div>
  );
}
