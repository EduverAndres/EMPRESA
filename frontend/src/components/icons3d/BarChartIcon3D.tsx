const bars = [
  { h: 0.42, delay: 0 },
  { h: 0.68, delay: 0.4 },
  { h: 0.52, delay: 0.8 },
  { h: 0.9, delay: 1.2 },
];

export default function BarChartIcon3D({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const barWidth = size * 0.16;
  const gap = size * 0.08;
  const maxHeight = size * 0.78;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 700 }}
    >
      <div
        className="flex items-end animate-float-slower"
        style={{
          gap,
          transformStyle: "preserve-3d",
          transform: "rotateX(48deg) rotateZ(-10deg)",
        }}
      >
        {bars.map((bar, i) => (
          <div
            key={i}
            className="animate-pulse-glow rounded-t-[3px]"
            style={{
              width: barWidth,
              height: maxHeight * bar.h,
              background:
                "linear-gradient(to top, rgba(22,58,140,0.9), rgba(70,140,250,0.95))",
              borderTop: "3px solid rgba(201,235,253,0.9)",
              boxShadow: "6px 6px 0 rgba(4,8,20,0.5)",
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
