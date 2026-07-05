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
                "linear-gradient(to top, rgba(120,10,22,0.9), rgba(255,70,85,0.95))",
              borderTop: "3px solid rgba(255,205,210,0.9)",
              boxShadow: "6px 6px 0 rgba(10,2,4,0.5)",
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
