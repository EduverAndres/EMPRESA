import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
// Siempre en vivo: si se cacheara, seguiría informando del estado que había en
// el momento del build en vez del de la configuración actual.
export const dynamic = "force-dynamic";

/**
 * Diagnóstico de configuración.
 *
 * Cuando el chat o el formulario fallan en producción, casi siempre es porque
 * falta una variable de entorno en Vercel o quedó cargada en el Environment
 * equivocado. Abrir `/api/health` responde eso al instante, sin tener que
 * bucear en los logs de runtime.
 *
 * Solo devuelve booleanos y longitudes: nunca el valor de una clave.
 */
export async function GET() {
  const gemini = process.env.GEMINI_API_KEY?.trim() ?? "";
  const resend = process.env.RESEND_API_KEY?.trim() ?? "";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;

  const usandoRemitenteDePruebas = !from || from.includes("onboarding@resend.dev");

  const problemas: string[] = [];

  if (!gemini) {
    problemas.push(
      "Falta GEMINI_API_KEY: el asistente de IA responderá con un error. Créala en https://aistudio.google.com/apikey y cárgala en Vercel."
    );
  }

  if (!resend) {
    problemas.push(
      "Falta RESEND_API_KEY: el formulario de contacto no podrá enviar correos. Créala en https://resend.com/api-keys y cárgala en Vercel."
    );
  } else if (usandoRemitenteDePruebas) {
    problemas.push(
      `Se está usando el remitente de pruebas de Resend (onboarding@resend.dev), que solo entrega correos a la dirección con la que se creó la cuenta de Resend. Si esa no es "${to}", el envío fallará. Verifica un dominio en https://resend.com/domains y define CONTACT_FROM_EMAIL.`
    );
  }

  return NextResponse.json(
    {
      ok: problemas.length === 0,
      entorno: process.env.VERCEL_ENV || process.env.NODE_ENV || "desconocido",
      asistenteIA: {
        configurado: gemini.length > 0,
        modelo: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      },
      correo: {
        configurado: resend.length > 0,
        remitente: from || "NEXUS <onboarding@resend.dev> (por defecto)",
        destinatario: to,
        usandoRemitenteDePruebas,
      },
      problemas,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
