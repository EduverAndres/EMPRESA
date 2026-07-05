export default function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const gradientId = "nexus-core-glass";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={gradientId} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#ff3245" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>
      </defs>

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

        {/* circuit traces: nodes read as data points on a network, not just orbit dots */}
        <path
          d="M27.2,10.6 L29.4,10.6 L29.4,7.6"
          stroke="currentColor"
          className="text-brand-400/50"
          strokeWidth="0.7"
          fill="none"
        />
        <circle cx="29.4" cy="7.6" r="0.6" stroke="currentColor" className="text-brand-400/50" strokeWidth="0.6" fill="none" />

        <path
          d="M5.4,21.6 L3.2,21.6 L3.2,24.6"
          stroke="currentColor"
          className="text-white/25"
          strokeWidth="0.7"
          fill="none"
        />
        <circle cx="3.2" cy="24.6" r="0.6" stroke="currentColor" className="text-white/25" strokeWidth="0.6" fill="none" />

        <circle cx="27.2" cy="10.6" r="1.4" className="fill-white" />
        <circle cx="5.4" cy="21.6" r="1.3" className="fill-brand-400" />
      </g>

      <circle
        cx="16"
        cy="16"
        r="3.4"
        fill={`url(#${gradientId})`}
        style={{ filter: "drop-shadow(0 0 4px rgba(217,4,41,0.85))" }}
      />
      <circle cx="16" cy="16" r="3.4" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
    </svg>
  );
}
