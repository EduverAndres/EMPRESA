export default function PhoneIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const w = size * 0.56;
  const h = size;
  const depth = size * 0.1;
  const dot = size * 0.14;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 700 }}
    >
      <div
        className="relative animate-float-slow"
        style={{
          width: w,
          height: h,
          transformStyle: "preserve-3d",
          transform: "rotateY(-24deg) rotateX(6deg)",
        }}
      >
        {/* side edge (depth) */}
        <div
          className="absolute"
          style={{
            width: depth,
            height: h,
            left: w - depth,
            background: "linear-gradient(to bottom, rgba(70,140,250,0.6), rgba(8,15,34,0.9))",
            transform: `rotateY(90deg) translateZ(${w - depth / 2}px)`,
          }}
        />
        {/* screen */}
        <div
          className="absolute overflow-hidden rounded-[16px] border-2 border-black/60 shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
          style={{
            width: w,
            height: h,
            background: "linear-gradient(155deg, rgba(25,68,164,0.9), rgba(8,15,34,0.95))",
            transform: `translateZ(${depth}px)`,
          }}
        >
          {/* notch */}
          <div className="mx-auto mt-2 h-[6px] w-[30%] rounded-full bg-black/50" />

          {/* app grid */}
          <div
            className="grid h-full grid-cols-2 place-items-center gap-2 px-4"
            style={{ paddingTop: h * 0.16, paddingBottom: h * 0.16 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[6px]"
                style={{
                  width: dot,
                  height: dot,
                  background:
                    i === 0
                      ? "rgba(176,222,253,0.9)"
                      : "rgba(255,255,255,0.15)",
                  boxShadow: i === 0 ? "0 0 10px rgba(82,150,252,0.7)" : undefined,
                }}
              />
            ))}
          </div>

          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 h-[4px] w-[26%] -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
