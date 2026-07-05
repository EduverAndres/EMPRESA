const particles = [
  { left: "6%", size: 3, duration: 14, delay: 0 },
  { left: "14%", size: 2, duration: 18, delay: 3 },
  { left: "23%", size: 4, duration: 16, delay: 6 },
  { left: "34%", size: 2, duration: 20, delay: 1 },
  { left: "45%", size: 3, duration: 15, delay: 9 },
  { left: "55%", size: 2, duration: 22, delay: 4 },
  { left: "64%", size: 4, duration: 17, delay: 7 },
  { left: "73%", size: 2, duration: 19, delay: 2 },
  { left: "82%", size: 3, duration: 16, delay: 10 },
  { left: "91%", size: 2, duration: 21, delay: 5 },
  { left: "38%", size: 2, duration: 24, delay: 12 },
  { left: "68%", size: 3, duration: 18, delay: 14 },
];

export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 bg-grid-drift opacity-[0.35]" />

      <div className="absolute -left-40 top-[8%] h-[26rem] w-[26rem] rounded-full bg-brand-600/20 blur-[120px] animate-blob-a" />
      <div className="absolute -right-32 top-[42%] h-[30rem] w-[30rem] rounded-full bg-brand-700/15 blur-[130px] animate-blob-b" />
      <div className="absolute left-[15%] bottom-[-8%] h-[24rem] w-[24rem] rounded-full bg-brand-500/10 blur-[130px] animate-blob-c" />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1200 1800"
        preserveAspectRatio="none"
      >
        <path
          className="circuit-line"
          d="M0,180 L280,180 L320,220 L680,220 L720,180 L1200,180"
        />
        <path
          className="circuit-line circuit-line--slow"
          d="M0,560 L200,560 L240,600 L560,600 L600,560 L900,560 L940,600 L1200,600"
        />
        <path
          className="circuit-line"
          d="M0,980 L360,980 L400,940 L900,940 L940,980 L1200,980"
        />
        <path
          className="circuit-line circuit-line--slow"
          d="M0,1360 L260,1360 L300,1400 L760,1400 L800,1360 L1200,1360"
        />
        <circle className="circuit-node" cx="320" cy="220" r="4" />
        <circle className="circuit-node" cx="600" cy="560" r="4" />
        <circle className="circuit-node" cx="900" cy="940" r="4" />
        <circle className="circuit-node" cx="760" cy="1400" r="4" />
      </svg>

      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="scan-beam" />
    </div>
  );
}
