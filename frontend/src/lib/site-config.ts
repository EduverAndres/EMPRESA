/**
 * URL pública del sitio.
 *
 * Tiene que ser absoluta: WhatsApp, Facebook y X no resuelven rutas relativas
 * en `og:image`, así que sin esto el enlace se comparte sin previsualización.
 *
 * `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` la expone Vercel de forma
 * automática y apunta siempre al dominio de producción — hoy el subdominio
 * `.vercel.app`. `NEXT_PUBLIC_SITE_URL` la sobrescribe el día que se conecte
 * un dominio propio, sin tocar código.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "NEXUS",
  fullName: "NEXUS",
  url: siteUrl,
  tagline: "Tecnología inteligente",
  description:
    "NEXUS es un estudio de ingeniería especializado en desarrollo de software full stack, ingeniería de datos, inteligencia artificial, automatización de procesos, soluciones en la nube y analítica avanzada — con procesos claros y compromiso real con cada cliente.",
  founder: "Eduver Gutiérrez",
  email: "eduverjimenez07@gmail.com",
  whatsapp: {
    display: "+57 333 236 9167",
    href: "https://wa.me/573332369167",
  },
  social: {
    instagram: "https://www.instagram.com/orbitalabssoftware/",
    linkedin: "#",
    facebook: "#",
  },
  // Misión y visión salió del menú principal: vive en /nosotros y se enlaza
  // desde el pie, para que el nav se quede solo con el recorrido de la home.
  nav: [
    { label: "Inicio", href: "/#inicio" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Contacto", href: "/#contacto" },
  ],
};
