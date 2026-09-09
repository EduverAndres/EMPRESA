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

  // Corta la petición si el modelo tarda demasiado; sin esto la función se
  // queda colgada hasta que Vercel la mata y el visitante no recibe nada.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
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
        signal: controller.signal,
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const detalle = data?.error?.message ?? `HTTP ${res.status}`;
      console.error("[chat] Gemini rechazó la petición:", res.status, detalle);

      // Mensajes distintos según la causa: una clave inválida y una cuota
      // agotada requieren acciones muy distintas de tu parte.
      if (res.status === 400 && /API key not valid/i.test(detalle)) {
        return NextResponse.json(
          { error: "El asistente no está configurado correctamente. Escríbenos por WhatsApp." },
          { status: 503 }
        );
      }
      if (res.status === 429) {
        return NextResponse.json(
          { error: "El asistente está saturado en este momento. Intenta en unos minutos." },
          { status: 429 }
        );
      }
      if (res.status === 404) {
        console.error(
          `[chat] El modelo "${MODEL}" no existe o no está disponible para esta clave.`
        );
      }

      return NextResponse.json(
        { error: "No se pudo obtener respuesta. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const candidate = data?.candidates?.[0];
    const reply: string | undefined = candidate?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      const blocked =
        data?.promptFeedback?.blockReason || candidate?.finishReason === "SAFETY";
      return NextResponse.json({
        reply: blocked
          ? "No puedo responder a eso. ¿Tienes alguna otra pregunta sobre nuestros servicios?"
          : "No tengo una respuesta clara para eso. ¿Puedes reformular tu pregunta?",
      });
    }

    return NextResponse.json({ reply });
  } catch (err) {
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
  } finally {
    clearTimeout(timeout);
  }
}
