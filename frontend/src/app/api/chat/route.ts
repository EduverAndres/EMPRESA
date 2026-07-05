import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(request: Request) {
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
  if (!lastUserMessage || !lastUserMessage.text.trim()) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY no está configurada.");
    return NextResponse.json(
      { error: "El asistente no está disponible en este momento." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: buildSystemPrompt() }],
          },
          contents: trimmed.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 400,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API error:", res.status, JSON.stringify(data));
      return NextResponse.json(
        { error: "No se pudo obtener respuesta. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const reply: string | undefined =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      undefined;

    if (!reply) {
      const blockReason = data?.promptFeedback?.blockReason;
      return NextResponse.json({
        reply: blockReason
          ? "No puedo responder a eso. ¿Tienes alguna otra pregunta sobre nuestros servicios?"
          : "No tengo una respuesta clara para eso. ¿Puedes reformular tu pregunta?",
      });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "No se pudo obtener respuesta. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
