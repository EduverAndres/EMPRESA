export default function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <g
        className="animate-spin-slow"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <ellipse
          cx="16"
          cy="16"
          rx="13.5"
          ry="6.2"
          stroke="currentColor"
          className="text-brand-400/70"
          strokeWidth="1.1"
          transform="rotate(-20 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="8.5"
          ry="13.5"
          stroke="currentColor"
          className="text-white/20"
          strokeWidth="1"
          transform="rotate(35 16 16)"
        />
        <circle cx="27.2" cy="10.6" r="1.4" className="fill-white" />
        <circle cx="5.4" cy="21.6" r="1.3" className="fill-brand-400" />
      </g>

      <circle
        cx="16"
        cy="16"
        r="3.4"
        className="fill-brand-500"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,50,69,0.85))" }}
      />
      <circle cx="16" cy="16" r="3.4" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
    </svg>
  );
}
