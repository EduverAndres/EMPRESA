import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";
import SiteBackground from "@/components/SiteBackground";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

// Dos familias en vez de tres: se eliminó Geist Mono, que solo se usaba para
// dos etiquetas decorativas y obligaba a descargar un archivo de fuente entero.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Sin `metadataBase`, los campos de metadata que usan rutas relativas —
  // entre ellos la imagen que genera `opengraph-image.tsx` — no se pueden
  // resolver a una URL absoluta, y WhatsApp, Facebook y X descartan cualquier
  // og:image que no lo sea. Es la pieza que faltaba para que el enlace muestre
  // previsualización al compartirlo.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  keywords: [
    "desarrollo de software",
    "desarrollo web",
    "aplicaciones móviles",
    "inteligencia artificial",
    "ciencia de datos",
    "software a medida",
    "consultoría técnica",
    "Colombia",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  publisher: siteConfig.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    // La imagen no se declara aquí a propósito: `app/opengraph-image.tsx`
    // inyecta og:image junto con su tipo, ancho y alto de forma automática.
    // Declararla a mano sobrescribiría esas etiquetas y perderíamos las
    // dimensiones, que es justo lo que WhatsApp usa para decidir si muestra
    // la tarjeta grande o solo un enlace de texto.
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060910",
  colorScheme: "dark",
};

/**
 * Datos estructurados de la empresa (schema.org).
 *
 * `ProfessionalService` es el tipo que corresponde a un estudio que presta
 * servicios profesionales, y es el que permite a Google mostrar el nombre, la
 * forma de contacto y el catálogo de servicios como entidad, en vez de tratar
 * la portada como una página suelta.
 *
 * Se genera desde `siteConfig` y `services` para que no haya una segunda copia
 * de los mismos datos que se quede desactualizada.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organizacion`,
  name: siteConfig.fullName,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.email,
  // wa.me guarda el número ya normalizado, sin espacios ni signos.
  telephone: `+${siteConfig.whatsapp.href.split("/").pop()}`,
  founder: { "@type": "Person", name: siteConfig.founder },
  areaServed: { "@type": "Country", name: "Colombia" },
  availableLanguage: ["es"],
  // Las redes sin URL real valen "#": incluirlas dejaría un sameAs roto.
  sameAs: Object.values(siteConfig.social).filter((url) => url && url !== "#"),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.short,
        url: `${siteConfig.url}/servicios/${service.slug}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink-950">
        {/* Salto directo al contenido para quien navega con teclado o lector de pantalla */}
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        {/* Datos estructurados. Se escapa "<" según la recomendación de Next
            para que ningún texto del catálogo pueda cerrar la etiqueta. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
          }}
        />

        <SiteBackground />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
        <ChatWidget />
      </body>
    </html>
  );
}
