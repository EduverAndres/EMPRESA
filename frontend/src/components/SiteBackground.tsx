/**
 * Fondo global del sitio.
 *
 * Antes había seis animaciones simultáneas (rejilla en deriva, tres manchas
 * de luz con `blur(120px)`, trazas de circuito con dash animado, doce
 * partículas y un haz de barrido). Cada frame el navegador tenía que volver a
 * desenfocar superficies de 30 rem, que es de las operaciones más caras que
 * existen en composición, y ocurría durante todo el scroll.
 *
 * Aquí la profundidad se consigue con degradados fijos: se pintan una vez y
 * después no cuestan nada. Es además un fondo más silencioso, que deja que el
 * contenido sea lo que llama la atención.
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950"
    >
      {/* Halo superior: ancla la vista en el hero */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% -10%, rgba(37,99,235,0.20), rgba(34,211,238,0.05) 45%, transparent 72%)",
        }}
      />

      {/* Rejilla técnica, desvanecida hacia abajo */}
      <div className="bg-grid bg-grid-fade absolute inset-x-0 top-0 h-[120vh] opacity-70" />

      {/* Base fría en el pie, para que la página no termine en negro plano */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 120%, rgba(29,78,216,0.14), transparent 70%)",
        }}
      />
    </div>
  );
}
