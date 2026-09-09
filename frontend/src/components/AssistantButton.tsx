"use client";

import { Sparkles } from "lucide-react";
import { ABRIR_CHAT_EVENT } from "@/lib/chat-events";

/**
 * Paso de menor compromiso del hero: abre el asistente en vez de pedir datos.
 *
 * Es un `<button>` y no un enlace porque no navega a ningún sitio; así se
 * comporta como espera el teclado (Enter y Espacio) y los lectores de pantalla
 * lo anuncian como lo que es. `aria-haspopup` avisa de que lo que abre es un
 * diálogo.
 */
export default function AssistantButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new CustomEvent(ABRIR_CHAT_EVENT))}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-line-strong)] px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-brand-500/50 hover:bg-white/5 sm:w-auto ${className}`}
    >
      <Sparkles size={15} className="text-accent-400" aria-hidden />
      Pregúntale al asistente
    </button>
  );
}
