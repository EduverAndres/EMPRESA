"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import LogoMark from "./LogoMark";
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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  // Cancela cualquier petición en vuelo al desmontar.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (rawText?: string) => {
      const text = (rawText ?? input).trim();
      if (!text || loading) return;

      const next: Message[] = [...messages, { role: "user", text }];
      setMessages(next);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;
      // Si el modelo no responde en 30 s, se corta en vez de dejar el
      // indicador "escribiendo" girando indefinidamente.
      const timeout = setTimeout(() => controller.abort(), 30_000);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));

        setMessages((cur) => [
          ...cur,
          {
            role: "model",
            text: res.ok
              ? data.reply || "No obtuve respuesta. ¿Puedes intentarlo de nuevo?"
              : data.error || "No se pudo obtener respuesta.",
          },
        ]);
      } catch (err) {
        const aborted = err instanceof DOMException && err.name === "AbortError";
        setMessages((cur) => [
          ...cur,
          {
            role: "model",
            text: aborted
              ? "La respuesta tardó demasiado. Intenta de nuevo o escríbenos por WhatsApp."
              : "No se pudo conectar. Revisa tu conexión e intenta de nuevo.",
          },
        ]);
      } finally {
        clearTimeout(timeout);
        abortRef.current = null;
        setLoading(false);
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
                  {m.text}
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
