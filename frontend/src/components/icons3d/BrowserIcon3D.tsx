export default function BrowserIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const w = size;
  const h = size * 0.74;
  const topBar = h * 0.22;
  const depth = size * 0.09;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: w, height: h, perspective: 700 }}
    >
      <div
        className="relative animate-float-slow"
        style={{
          width: w,
          height: h,
          transformStyle: "preserve-3d",
          transform: "rotateX(10deg) rotateY(-18deg)",
        }}
      >
        {/* side edge (depth) */}
        <div
          className="absolute"
          style={{
            width: depth,
            height: h,
            left: w - depth,
            background: "linear-gradient(to bottom, rgba(13,29,68,0.9), rgba(6,11,26,0.95))",
            transform: `rotateY(90deg) translateZ(${w - depth / 2}px)`,
          }}
        />
        {/* bottom edge (depth) */}
        <div
          className="absolute"
          style={{
            width: w,
            height: depth,
            top: h - depth,
            background: "linear-gradient(to right, rgba(6,11,26,0.95), rgba(13,29,68,0.9))",
            transform: `rotateX(-90deg) translateZ(${depth / 2}px)`,
          }}
        />
        {/* front panel */}
        <div
          className="absolute overflow-hidden rounded-[10px] border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
          style={{
            width: w,
            height: h,
            background: "#0e1526",
            transform: `translateZ(${depth}px)`,
          }}
        >
          <div
            className="flex items-center gap-[6px] border-b border-white/10 px-2.5"
            style={{
              height: topBar,
              background: "linear-gradient(135deg, rgba(82,150,252,0.35), rgba(13,29,68,0.5))",
            }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brand-400" />
            <span className="h-[7px] w-[7px] rounded-full bg-white/40" />
            <span className="h-[7px] w-[7px] rounded-full bg-white/20" />
          </div>

          <div
            className="flex flex-col justify-center gap-2 px-4"
            style={{ height: h - topBar }}
          >
            <span className="h-[6px] w-[70%] rounded-full bg-brand-500/70" />
            <span className="h-[6px] w-[45%] rounded-full bg-white/25" />
            <span className="flex items-center gap-1 text-[10px]">
              <span className="h-[6px] w-[30%] rounded-full bg-white/15" />
              <span className="h-[10px] w-[3px] animate-pulse-glow rounded-full bg-brand-400" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
