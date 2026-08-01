import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderContactEmail } from "@/lib/contact-email";
import { siteConfig } from "@/lib/site-config";

// Resend requiere el runtime de Node.js (no Edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Dirección remitente. IMPORTANTE:
// "onboarding@resend.dev" es la dirección de PRUEBAS de Resend: solo permite
// entregar correos a la dirección con la que se creó la cuenta de Resend.
// Para enviar a CONTACT_TO_EMAIL (o a cualquier destinatario real) en
// producción, hay que verificar un dominio propio en resend.com/domains y
// usar una dirección de ese dominio aquí, por ejemplo:
//   const FROM_EMAIL = `${siteConfig.name} <contacto@tudominio.com>`;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  // Honeypot: real users never fill this hidden field. Bots usually do.
  const honeypot = String(body.company ?? "").trim();

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Nombre, correo y teléfono son obligatorios." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY no está configurada en las variables de entorno del servidor."
    );
    return NextResponse.json(
      { error: "El servicio de contacto no está disponible en este momento." },
      { status: 500 }
    );
  }

  const { html, text } = renderContactEmail({ name, email, phone, message });

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || siteConfig.email,
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      html,
      text,
    });

    if (error) {
      // Log detallado: el mensaje de Resend suele decir exactamente qué
      // falló (dominio no verificado, destinatario no permitido, etc).
      console.error("[contact] Resend rechazó el envío:", {
        name: error.name,
        message: error.message,
        from: FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL || siteConfig.email,
      });
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
        { status: 502 }
      );
    }

    console.info("[contact] Correo enviado", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error inesperado enviando el correo:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
