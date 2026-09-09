/**
 * Marca NEXUS: esfera de puntos.
 *
 * Sustituye a `/logo-mark.png` (116 KB para mostrarse a 32 px). Al ser SVG
 * inline pesa menos de 1 KB, se ve nítido en cualquier densidad de pantalla,
 * no genera una petición de red y hereda el color de la paleta azul.
 *
 * Los `id` de los `<defs>` deben ser únicos por instancia dentro de la misma
 * página, por eso se pasan explícitamente en cada punto de uso.
 */
export default function LogoMark({
  size = 32,
  uid = "logo",
  className = "",
}: {
  size?: number;
  /** Sufijo único para los ids internos del SVG. */
  uid?: string;
  className?: string;
}) {
  const sphere = `${uid}-sphere`;
  const dots = `${uid}-dots`;
  const mask = `${uid}-mask`;
  const rim = `${uid}-rim`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="NEXUS"
      className={className}
    >
      <defs>
        {/* Luz desde arriba a la izquierda: cian brillante -> azul -> navy */}
        <radialGradient id={sphere} cx="34%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="26%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="80%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0b1a3d" />
        </radialGradient>

        {/* Oscurecido del borde: es lo que hace que se lea como esfera y no como círculo */}
        <radialGradient id={rim} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
        </radialGradient>

        {/* Rejilla de puntos que recorta la esfera */}
        <pattern id={dots} width="5.2" height="5.2" patternUnits="userSpaceOnUse">
          <circle cx="2.6" cy="2.6" r="1.72" fill="#fff" />
        </pattern>

        <mask id={mask}>
          <circle cx="32" cy="32" r="30" fill={`url(#${dots})`} />
        </mask>
      </defs>

      {/* Halo exterior */}
      <circle cx="32" cy="32" r="31" fill="#0b1a3d" opacity="0.55" />

      {/* Esfera punteada */}
      <g mask={`url(#${mask})`}>
        <circle cx="32" cy="32" r="30" fill={`url(#${sphere})`} />
        <circle cx="32" cy="32" r="30" fill={`url(#${rim})`} />
      </g>

      {/* Contorno sutil para separarla del fondo */}
      <circle
        cx="32"
        cy="32"
        r="30.5"
        fill="none"
        stroke="#22d3ee"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
    </svg>
  );
}
