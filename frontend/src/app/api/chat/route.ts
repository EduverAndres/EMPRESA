import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const UPSTREAM_TIMEOUT_MS = 25_000;

// Respuestas de reserva cuando el modelo termina sin producir texto. Van
// dentro del propio flujo y no como error HTTP: para cuando se sabe que no hay
// texto, la respuesta ya se está transmitiendo y el código de estado ya se
// envió.
const SIN_TEXTO_BLOQUEADO =
  "No puedo responder a eso. ¿Tienes alguna otra pregunta sobre nuestros servicios?";
const SIN_TEXTO_VACIO =
  "No tengo una respuesta clara para eso. ¿Puedes reformular tu pregunta?";
const CORTE_INESPERADO =
  "Se interrumpió la respuesta. Intenta de nuevo o escríbenos por WhatsApp.";

export async function POST(request: Request) {
  // Sin límite, un script puede vaciar la cuota gratuita de Gemini en minutos.
  const limit = rateLimit(request, { key: "chat", max: 20, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Demasiadas preguntas seguidas. Espera un momento e intenta de nuevo." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  const trimmed = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === "model" ? "model" : "user",
    text: String(m.text ?? "").slice(0, MAX_MESSAGE_LENGTH),
  }));

  const lastUserMessage = [...trimmed].reverse().find((m) => m.role === "user");
  if (!lastUserMessage?.text.trim()) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  // Gemini rechaza la conversación si el primer turno es del modelo, y el
  // widget arranca siempre con un saludo. Se descarta ese saludo inicial.
  while (trimmed.length > 0 && trimmed[0].role === "model") trimmed.shift();

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "[chat] Falta GEMINI_API_KEY en las variables de entorno. Revisa /api/health."
    );
    return NextResponse.json(
      { error: "El asistente no está disponible ahora mismo. Escríbenos por WhatsApp y te respondemos." },
      { status: 503 }
    );
  }

  // El tiempo límite cubre toda la transmisión, no solo la primera respuesta:
  // si el modelo se queda a medias, el flujo se corta en vez de dejar al
  // visitante mirando una respuesta que nunca termina.
  const abortar = new AbortController();
  const temporizador = setTimeout(() => abortar.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(
      // `alt=sse` hace que Gemini emita eventos "data:" uno por fragmento. Sin
      // este parámetro devuelve un array JSON gigante que solo se puede
      // interpretar cuando ha llegado entero — justo lo contrario de lo que
      // hace falta aquí.
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // En cabecera y no en la query: así la clave no acaba escrita en los
          // logs de acceso ni en trazas de error.
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          contents: trimmed.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
        }),
        signal: abortar.signal,
      }
    );
  } catch (err) {
    clearTimeout(temporizador);
    if (err instanceof DOMException && err.name === "AbortError") {
      console.error("[chat] Gemini no respondió dentro del tiempo límite.");
      return NextResponse.json(
        { error: "La respuesta tardó demasiado. Intenta de nuevo." },
        { status: 504 }
      );
    }
    console.error("[chat] Error inesperado:", err);
    return NextResponse.json(
      { error: "No se pudo obtener respuesta. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // Los errores se resuelven antes de empezar a transmitir: una vez enviado el
  // primer byte del cuerpo ya no se puede cambiar el código de estado.
  if (!upstream.ok) {
    clearTimeout(temporizador);
    const data = await upstream.json().catch(() => null);
    const detalle = data?.error?.message ?? `HTTP ${upstream.status}`;
    console.error("[chat] Gemini rechazó la petición:", upstream.status, detalle);

    if (upstream.status === 400 && /API key not valid/i.test(detalle)) {
      return NextResponse.json(
        { error: "El asistente no está configurado correctamente. Escríbenos por WhatsApp." },
        { status: 503 }
      );
    }
    if (upstream.status === 429) {
      return NextResponse.json(
        { error: "El asistente está saturado en este momento. Intenta en unos minutos." },
        { status: 429 }
      );
    }
    if (upstream.status === 404) {
      console.error(
        `[chat] El modelo "${MODEL}" no existe o no está disponible para esta clave.`
      );
    }

    return NextResponse.json(
      { error: "No se pudo obtener respuesta. Intenta de nuevo." },
      { status: 502 }
    );
  }

  if (!upstream.body) {
    clearTimeout(temporizador);
    return NextResponse.json(
      { error: "No se pudo obtener respuesta. Intenta de nuevo." },
      { status: 502 }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let pendiente = "";
      let huboTexto = false;
      let bloqueado = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Gemini termina cada línea con CRLF, así que los eventos vienen
          // separados por "\r\n\r\n". Se normaliza a "\n" antes de buscar el
          // corte: si no, la búsqueda de "\n\n" no encuentra nada y no se
          // llega a extraer una sola letra.
          pendiente += decoder
            .decode(value, { stream: true })
            .replace(/\r\n/g, "\n");

          // Los eventos SSE se separan por una línea en blanco. Un fragmento
          // puede cortar un evento por la mitad, así que lo que quede sin
          // cerrar se guarda para la siguiente vuelta.
          let corte: number;
          while ((corte = pendiente.indexOf("\n\n")) !== -1) {
            const evento = pendiente.slice(0, corte);
            pendiente = pendiente.slice(corte + 2);

            for (const linea of evento.split("\n")) {
              if (!linea.startsWith("data:")) continue;
              const carga = linea.slice(5).trim();
              if (!carga || carga === "[DONE]") continue;

              let json: unknown;
              try {
                json = JSON.parse(carga);
              } catch {
                continue;
              }

              const dato = json as {
                promptFeedback?: { blockReason?: string };
                candidates?: {
                  finishReason?: string;
                  content?: { parts?: { text?: string }[] };
                }[];
              };

              if (dato.promptFeedback?.blockReason) bloqueado = true;
              const candidato = dato.candidates?.[0];
              if (candidato?.finishReason === "SAFETY") bloqueado = true;

              const texto =
                candidato?.content?.parts
                  ?.map((p) => p.text ?? "")
                  .join("") ?? "";

              if (texto) {
                huboTexto = true;
                controller.enqueue(encoder.encode(texto));
              }
            }
          }
        }

        // El modelo terminó sin emitir texto: filtro de seguridad o respuesta
        // vacía. Se envía el mensaje de reserva por el mismo canal.
        if (!huboTexto) {
          controller.enqueue(
            encoder.encode(bloqueado ? SIN_TEXTO_BLOQUEADO : SIN_TEXTO_VACIO)
          );
        }
      } catch (err) {
        console.error("[chat] La transmisión se interrumpió:", err);
        // Si ya se envió texto no se añade nada: el visitante se queda con la
        // parte que sí llegó, que es más útil que un aviso pegado al final.
        if (!huboTexto) {
          controller.enqueue(encoder.encode(CORTE_INESPERADO));
        }
      } finally {
        clearTimeout(temporizador);
        reader.releaseLock();
        controller.close();
      }
    },

    cancel() {
      // El visitante cerró la pestaña o canceló: se corta también la petición
      // a Gemini en vez de dejarla consumiendo cuota.
      clearTimeout(temporizador);
      abortar.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Evita que un proxy intermedio acumule la respuesta y la entregue de
      // golpe, que anularía el streaming.
      "X-Accel-Buffering": "no",
    },
  });
}
