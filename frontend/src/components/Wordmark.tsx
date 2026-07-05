export default function Wordmark({ className = "" }: { className?: string }) {
  const chrome = {
    backgroundImage:
      "linear-gradient(180deg, #ffffff 0%, #d9dde1 28%, #8b929b 48%, #f2f4f6 58%, #6b7280 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
    filter:
      "drop-shadow(0 1px 0 rgba(255,255,255,0.25)) drop-shadow(0 2px 2px rgba(0,0,0,0.55))",
  };

  const redX = {
    backgroundImage:
      "linear-gradient(180deg, #ff8a94 0%, #ff2d43 30%, #d90429 55%, #ff2d43 78%, #8b0000 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
    filter:
      "drop-shadow(0 0 8px rgba(217,4,41,0.9)) drop-shadow(0 0 18px rgba(217,4,41,0.55))",
  };

  return (
    <span className={`font-display font-bold uppercase tracking-[0.08em] ${className}`}>
      <span style={chrome}>NE</span>
      <span style={redX}>X</span>
      <span style={chrome}>US</span>
    </span>
  );
}
