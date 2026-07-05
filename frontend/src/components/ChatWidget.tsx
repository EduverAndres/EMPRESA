"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface Message {
  role: "user" | "model";
  text: string;
}

const GREETING: Message = {
  role: "model",
  text: `¡Hola! Soy el asistente de ${siteConfig.name}. Puedo contarte sobre nuestros servicios de software, datos e IA. ¿En qué te puedo ayudar?`,
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((cur) => [
          ...cur,
          { role: "model", text: data.error || "No se pudo obtener respuesta." },
        ]);
        return;
      }

      setMessages((cur) => [...cur, { role: "model", text: data.reply }]);
    } catch {
      setMessages((cur) => [
        ...cur,
        { role: "model", text: "No se pudo conectar. Revisa tu conexión e intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-4 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:w-96">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-white">
                Asistente {siteConfig.name}
              </p>
              <p className="text-xs text-neutral-500">
                Impulsado por IA · Powered by {siteConfig.name} &copy;
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar chat"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-600 text-white"
                      : "border border-white/10 bg-white/[0.04] text-neutral-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-neutral-400">
                  <Loader2 size={14} className="animate-spin" />
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-white/10 p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Escribe tu pregunta..."
              className="max-h-24 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500/50"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Enviar"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-600 text-white transition-all hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        {!open && (
          <span className="hidden rounded-full border border-white/10 bg-ink-950/90 px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:block">
            ¿Tienes dudas? Escríbenos
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
          className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_0_30px_rgba(217,4,41,0.5)] transition-all hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(217,4,41,0.7)]"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  );
}
