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

/**
 * Correo que recibe el equipo con cada contacto del formulario.
 *
 * Se mantiene sobre fondo claro y con estilos en línea a propósito: los
 * clientes de correo no aplican hojas de estilo externas y muchos ignoran las
 * variantes oscuras, así que un diseño claro es el que se ve igual en todos.
 * El azul de marca aparece en la cabecera y en el botón de respuesta.
 */
export function renderContactEmail({ name, email, phone, message }: ContactSubmission) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  // Solo dígitos y el signo inicial: es lo que aceptan los enlaces tel: y wa.me.
  const waPhone = phone.replace(/[^\d]/g, "");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 11px 0; border-bottom: 1px solid #e8edf5; color: #64748b; font-size: 13px; width: 108px; vertical-align: top;">${label}</td>
      <td style="padding: 11px 0; border-bottom: 1px solid #e8edf5; color: #0f172a; font-size: 14px; font-weight: 600;">${value}</td>
    </tr>`;

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #eef2f8; padding: 32px 16px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #dde5f0;">

        <div style="background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #0891b2 100%); padding: 22px 28px;">
          <p style="margin: 0; color: #ffffff; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700;">
            ${siteConfig.name}
          </p>
          <p style="margin: 6px 0 0; color: #dbeafe; font-size: 15px;">
            Nuevo mensaje de contacto
          </p>
        </div>

        <div style="padding: 28px;">
          <p style="margin: 0 0 22px; color: #475569; font-size: 14px; line-height: 1.6;">
            Alguien dejó sus datos en el sitio web. Puedes responder directamente
            a este correo: la respuesta le llega al remitente.
          </p>

          <table style="width: 100%; border-collapse: collapse;">
            ${row("Nombre", safeName)}
            ${row("Correo", `<a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>`)}
            ${row("Teléfono", `<a href="tel:${safePhone}" style="color: #2563eb; text-decoration: none;">${safePhone}</a>`)}
          </table>

          <p style="margin: 22px 0 8px; color: #64748b; font-size: 13px;">Mensaje</p>
          <div style="background: #f6f9fd; border: 1px solid #e2e9f3; border-left: 3px solid #2563eb; border-radius: 10px; padding: 14px 16px; color: #0f172a; font-size: 14px; line-height: 1.65;">
            ${safeMessage || "<em style='color:#94a3b8'>(sin mensaje)</em>"}
          </div>

          <div style="margin-top: 26px;">
            <a href="mailto:${safeEmail}" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 11px 22px; border-radius: 999px;">
              Responder por correo
            </a>
            ${
              waPhone
                ? `<a href="https://wa.me/${waPhone}" style="display: inline-block; margin-left: 8px; color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none; padding: 11px 18px; border: 1px solid #c7d7ee; border-radius: 999px;">Abrir WhatsApp</a>`
                : ""
            }
          </div>
        </div>

        <div style="background: #f6f9fd; border-top: 1px solid #e2e9f3; padding: 16px 28px;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            Enviado desde el formulario de contacto de ${siteConfig.name}.
          </p>
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
