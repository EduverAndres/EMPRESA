import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderContactEmail } from "@/lib/contact-email";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

// Resend necesita el runtime de Node.js (no Edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 120, email: 200, phone: 40, message: 4000 };

// Dirección remitente. IMPORTANTE:
// "onboarding@resend.dev" es la dirección de PRUEBAS de Resend: solo entrega
// correos a la dirección con la que se creó la cuenta. Para escribir a
// CONTACT_TO_EMAIL (o a cualquier otro destinatario) en producción hay que
// verificar un dominio propio en resend.com/domains y usar una dirección de
// ese dominio, por ejemplo: "NEXUS <contacto@tudominio.com>".
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  `${siteConfig.name} <onboarding@resend.dev>`;

/** Recorta y normaliza un campo del formulario. */
function field(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const limit = rateLimit(request, { key: "contact", max: 5, windowMs: 300_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Ya recibimos varios mensajes tuyos. Espera unos minutos antes de enviar otro." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = field(body.name, MAX_LEN.name);
  const email = field(body.email, MAX_LEN.email);
  const phone = field(body.phone, MAX_LEN.phone);
  const message = field(body.message, MAX_LEN.message);
  // Trampa para bots: una persona nunca ve este campo oculto.
  const honeypot = field(body.company, 100);

  // Se responde "ok" a propósito: si el bot recibiera un error, reintentaría.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Nombre, correo y teléfono son obligatorios." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;

  if (!apiKey) {
    console.error(
      "[contact] Falta RESEND_API_KEY en las variables de entorno del servidor. Revisa /api/health."
    );
    return NextResponse.json(
      {
        error: `No pudimos enviar el mensaje. Escríbenos por WhatsApp al ${siteConfig.whatsapp.display} y te atendemos enseguida.`,
      },
      { status: 503 }
    );
  }

  const { html, text } = renderContactEmail({ name, email, phone, message });

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      // Responder al correo recibido escribe directamente al visitante.
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      html,
      text,
    });

    if (error) {
      // El mensaje de Resend suele decir exactamente qué falló: dominio sin
      // verificar, destinatario no permitido en modo pruebas, clave inválida...
      console.error("[contact] Resend rechazó el envío:", {
        name: error.name,
        message: error.message,
        from: FROM_EMAIL,
        to,
      });

      if (/testing emails|verify a domain|own email address/i.test(error.message ?? "")) {
        console.error(
          `[contact] Resend está en modo pruebas: con el remitente "${FROM_EMAIL}" solo puede entregar a la dirección dueña de la cuenta. Verifica un dominio en https://resend.com/domains y define CONTACT_FROM_EMAIL para poder escribir a "${to}".`
        );
      }

      return NextResponse.json(
        {
          error: `No pudimos enviar el mensaje. Escríbenos por WhatsApp al ${siteConfig.whatsapp.display} y te atendemos enseguida.`,
        },
        { status: 502 }
      );
    }

    console.info("[contact] Correo enviado", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error inesperado enviando el correo:", err);
    return NextResponse.json(
      {
        error: `No pudimos enviar el mensaje. Escríbenos por WhatsApp al ${siteConfig.whatsapp.display} y te atendemos enseguida.`,
      },
      { status: 500 }
    );
  }
}
