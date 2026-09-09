/**
 * Logotipo tipográfico NEXUS.
 *
 * Las letras conservan el acabado cromado original; la X pasa de rojo a cian
 * para alinearse con la paleta de confianza. El resplandor se mantiene suave:
 * un `drop-shadow` muy intenso obliga al navegador a rasterizar el texto en
 * cada repintado.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  const chrome = {
    backgroundImage:
      "linear-gradient(180deg, #ffffff 0%, #dbe3ee 28%, #8b97ab 48%, #f2f5f9 58%, #6b7c99 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))",
  };

  const accentX = {
    backgroundImage:
      "linear-gradient(180deg, #a5f3fc 0%, #22d3ee 32%, #3b82f6 62%, #1d4ed8 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
    filter: "drop-shadow(0 0 10px rgba(34,211,238,0.45))",
  };

  return (
    <span
      className={`font-display font-bold uppercase tracking-[0.08em] ${className}`}
    >
      <span style={chrome}>NE</span>
      <span style={accentX}>X</span>
      <span style={chrome}>US</span>
    </span>
  );
}
