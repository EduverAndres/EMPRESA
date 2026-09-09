import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

/**
 * Mapa del sitio.
 *
 * Las secciones de la portada son anclas de una misma página, así que no se
 * listan por separado: para un buscador son la misma URL. Lo que sí importa
 * son las siete páginas de detalle de servicio, que hoy solo se alcanzan
 * desde el pie y la rejilla de servicios.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/nosotros`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...services.map((service) => ({
      url: `${siteConfig.url}/servicios/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
