import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Reglas para los rastreadores.
 *
 * `/api/` queda fuera: son endpoints de chat, contacto y diagnóstico, no
 * contenido indexable, y rastrearlos solo gastaría cuota de Gemini y de
 * Resend.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
