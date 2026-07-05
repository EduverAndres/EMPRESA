import { siteConfig } from "./site-config";

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderContactEmail({ name, email, phone, message }: ContactSubmission) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background: #f4f4f5; padding: 32px 16px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5;">
        <div style="background: #e2162e; padding: 20px 28px;">
          <p style="margin: 0; color: #ffffff; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">
            ${siteConfig.name} &mdash; Nuevo mensaje de contacto
          </p>
        </div>
        <div style="padding: 28px;">
          <p style="margin: 0 0 20px; color: #52525b; font-size: 14px;">
            Alguien dejó sus datos en el sitio web. Puedes responder directamente a este correo para contactarlo.
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #71717a; font-size: 13px; width: 120px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #18181b; font-size: 14px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #71717a; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #18181b; font-size: 14px;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #71717a; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #18181b; font-size: 14px;">${safePhone}</td>
            </tr>
          </table>
          <p style="margin: 20px 0 6px; color: #71717a; font-size: 13px;">Mensaje</p>
          <div style="background: #fafafa; border: 1px solid #eee; border-radius: 10px; padding: 14px 16px; color: #18181b; font-size: 14px; line-height: 1.6;">
            ${safeMessage || "<em>(sin mensaje)</em>"}
          </div>
        </div>
      </div>
    </div>
  `;

  const text = `Nuevo mensaje de contacto — ${siteConfig.name}

Nombre: ${name}
Correo: ${email}
Teléfono: ${phone}

Mensaje:
${message || "(sin mensaje)"}
`;

  return { html, text };
}
