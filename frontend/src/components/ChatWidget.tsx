"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import LogoMark from "./LogoMark";
import { ABRIR_CHAT_EVENT } from "@/lib/chat-events";
import { siteConfig } from "@/lib/site-config";

interface Message {
  role: "user" | "model";
  text: string;
}

const GREETING: Message = {
  role: "model",
  text: `¡Hola! Soy el asistente de ${siteConfig.name}. Puedo contarte sobre nuestros servicios de software, datos e IA. ¿En qué te puedo ayudar?`,
};

// Arrancar con la caja de texto vacía deja al visitante sin saber qué preguntar.
// Estas tres cubren las dudas más habituales antes de contactar.
const SUGGESTIONS = [
  "¿Qué servicios ofrecen?",
  "¿Cómo es su proceso de trabajo?",
  "Necesito una app, ¿por dónde empiezo?",
];

/** Separación entre el inicio del desvanecido de una letra y el de la siguiente. */
const LETRA_STAGGER_MS = 16;
/** Duración del desvanecido de cada letra. Debe coincidir con `.chat-letra`. */
const LETRA_FADE_MS = 280;
/** Tope de revelado para un mismo fragmento recibido. */
const FRAGMENTO_MAX_MS = 500;

/**
 * Reparto del desvanecido dentro de un fragmento recién llegado.
 *
 * El modelo no manda las letras de una en una: manda trozos. Sin escalonar,
 * cada trozo aparecería de golpe. Escalonándolo dentro del propio trozo se
 * mantiene la lectura letra a letra, pero sin inventarse un retardo que no
 * existe: el ritmo global lo sigue marcando la llegada real de los datos.
 */
function pasoDelFragmento(cantidad: number) {
  if (cantidad <= 1) return 0;
  return Math.min(LETRA_STAGGER_MS, FRAGMENTO_MAX_MS / cantidad);
}

/**
 * Respuesta del asistente, con revelado letra a letra mientras llega.
 *
 * El escalonado se hace con `animation-delay` por letra, así que la animación
 * corre entera en el compositor: no hay ni un temporizador de JavaScript por
 * carácter.
 *
 * La estructura —copia accesible + copia visible— es la misma durante y
 * después de la transmisión. Es deliberado: el panel es una región
 * `aria-live`, y si al terminar se sustituyera este marcado por texto plano,
 * el lector de pantalla vería un nodo nuevo y volvería a anunciar la respuesta
 * entera.
 */
function RespuestaAsistente({
  texto,
  streaming,
  delays,
}: {
  texto: string;
  streaming: boolean;
  delays?: number[];
}) {
  return (
    <>
      {/* Mientras llega texto, la copia accesible se mantiene vacía: anunciar
          cada fragmento haría que el lector leyera la respuesta a trozos. Se
          rellena entera, y una sola vez, al terminar. */}
      <span className="sr-only">{streaming ? "" : texto}</span>

      <span aria-hidden="true">
        {streaming
          ? // `Array.from` y no `split("")`: parte por caracteres reales y no
            // rompe emojis ni letras acentuadas compuestas.
            Array.from(texto).map((caracter, i) => (
              <span
                key={i}
                className="chat-letra"
                style={{ animationDelay: `${delays?.[i] ?? 0}ms` }}
              >
                {caracter}
              </span>
            ))
          : texto}
      </span>
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  /** Índice del mensaje que se está recibiendo ahora mismo. */
  const [streamingIdx, setStreamingIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const finStreamRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Retardo asignado a cada letra de la respuesta en curso.
   *
   * Es un ref y no estado porque cada letra tiene que conservar el suyo: si el
   * valor cambiara entre renders, el navegador reevaluaría animaciones ya
   * terminadas y las letras antiguas volverían a parpadear.
   */
  const delaysRef = useRef<number[]>([]);

  // Baja al último mensaje sin usar scroll suave: dentro de un panel corto el
  // desplazamiento animado se acumula y llega tarde a la respuesta siguiente.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Abrir desde fuera: hoy lo usa el botón secundario del hero.
  useEffect(() => {
    const abrir = () => {
      setOpen(true);
      // Si el panel ya estaba abierto, el efecto de foco de arriba no se
      // vuelve a disparar porque depende de `open`; se enfoca aquí para que
      // la acción siempre lleve el cursor a la caja de texto.
      inputRef.current?.focus();
    };
    window.addEventListener(ABRIR_CHAT_EVENT, abrir);
    return () => window.removeEventListener(ABRIR_CHAT_EVENT, abrir);
  }, []);

  // Cancela cualquier petición en vuelo y cualquier temporizador al desmontar.
  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (finStreamRef.current) clearTimeout(finStreamRef.current);
    },
    []
  );

  const send = useCallback(
    async (rawText?: string) => {
      const text = (rawText ?? input).trim();
      if (!text || loading) return;

      const next: Message[] = [...messages, { role: "user", text }];
      // La respuesta ocupará la posición siguiente a la del mensaje recién
      // añadido; se calcula aquí para poder ir actualizándola con cada trozo.
      const indiceRespuesta = next.length;

      setMessages(next);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;
      // Si el modelo no responde en 30 s, se corta en vez de dejar el
      // indicador "escribiendo" girando indefinidamente.
      const timeout = setTimeout(() => controller.abort(), 30_000);

      if (finStreamRef.current) clearTimeout(finStreamRef.current);
      delaysRef.current = [];

      let acumulado = "";
      let creado = false;

      /** Reemplaza el contenido de la respuesta en curso. */
      const escribir = (contenido: string) => {
        setMessages((cur) => {
          const copia = [...cur];
          copia[indiceRespuesta] = { role: "model", text: contenido };
          return copia;
        });
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
          signal: controller.signal,
        });

        // Los errores siguen llegando como JSON con su código de estado: el
        // servidor los resuelve antes de empezar a transmitir.
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          setMessages((cur) => [
            ...cur,
            {
              role: "model",
              text: data.error || "No se pudo obtener respuesta.",
            },
          ]);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const trozo = decoder.decode(value, { stream: true });
          if (!trozo) continue;

          const previos = delaysRef.current.length;
          acumulado += trozo;
          const total = Array.from(acumulado).length;
          const paso = pasoDelFragmento(total - previos);
          for (let i = previos; i < total; i++) {
            delaysRef.current.push(Math.round((i - previos) * paso));
          }

          if (!creado) {
            creado = true;
            // El indicador de "escribiendo" desaparece con la primera letra,
            // no al final: ese es el cambio que se nota respecto a esperar la
            // respuesta entera.
            setLoading(false);
            setStreamingIdx(indiceRespuesta);
            setMessages((cur) => [
              ...cur,
              { role: "model", text: acumulado },
            ]);
          } else {
            escribir(acumulado);
          }
        }

        if (!creado) {
          setMessages((cur) => [
            ...cur,
            {
              role: "model",
              text: "No obtuve respuesta. ¿Puedes intentarlo de nuevo?",
            },
          ]);
        }
      } catch (err) {
        const aborted = err instanceof DOMException && err.name === "AbortError";
        const aviso = aborted
          ? "La respuesta tardó demasiado. Intenta de nuevo o escríbenos por WhatsApp."
          : "No se pudo conectar. Revisa tu conexión e intenta de nuevo.";

        if (creado) {
          // Ya había texto en pantalla: el aviso se añade al final en vez de
          // borrar lo que el visitante estaba leyendo.
          escribir(`${acumulado}\n\n${aviso}`);
        } else {
          setMessages((cur) => [...cur, { role: "model", text: aviso }]);
        }
      } finally {
        clearTimeout(timeout);
        abortRef.current = null;
        setLoading(false);

        // Se deja terminar el desvanecido del último fragmento antes de volver
        // a texto plano; si no, las últimas letras aparecerían de golpe.
        finStreamRef.current = setTimeout(
          () => setStreamingIdx(null),
          FRAGMENTO_MAX_MS + LETRA_FADE_MS
        );
      }
    },
    [input, loading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  // La caja crece con el texto hasta un tope, en vez de mostrar una barra de scroll.
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label={`Asistente de ${siteConfig.name}`}
          className="surface-solid mb-4 flex h-[30rem] max-h-[calc(100svh-8rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl shadow-[0_24px_70px_-12px_rgba(0,0,0,0.75)] sm:w-[23rem]"
        >
          <header className="flex items-center gap-3 border-b border-[var(--color-line)] bg-white/[0.03] px-4 py-3">
            <LogoMark size={32} uid="chat" className="flex-none" />
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-sm font-semibold text-white">
                Asistente {siteConfig.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                En línea · Impulsado por IA
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar chat"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </header>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-brand-600 text-white"
                      : "surface rounded-bl-md text-fg"
                  }`}
                >
                  {m.role === "model" ? (
                    <RespuestaAsistente
                      texto={m.text}
                      streaming={streamingIdx === i}
                      delays={delaysRef.current}
                    />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="surface flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="space-y-2 pt-1">
                <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
                  <Sparkles size={12} className="text-accent-400" />
                  Prueba con:
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="surface block w-full rounded-xl px-3.5 py-2.5 text-left text-sm text-fg-muted transition-colors hover:border-brand-500/40 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-[var(--color-line)] p-3">
            <label htmlFor="chat-input" className="sr-only">
              Escribe tu pregunta
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Escribe tu pregunta..."
              className="max-h-24 flex-1 resize-none rounded-xl border border-[var(--color-line)] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-fg-subtle focus:border-brand-500/60"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!open && (
          <span className="surface-solid hidden rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg sm:block">
            ¿Tienes dudas? Pregúntanos
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
          aria-expanded={open}
          className="relative flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_10px_30px_-6px_rgba(37,99,235,0.8)] transition-colors hover:bg-brand-500"
        >
          {!open && (
            <span
              aria-hidden
              className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-500/50"
            />
          )}
          <span className="relative">
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </span>
        </button>
      </div>
    </div>
  );
}
