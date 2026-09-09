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

const pageTitle = `${siteConfig.fullName} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  // Sin `metadataBase` las URL de metadatos salen relativas, y WhatsApp,
  // Facebook y X no resuelven rutas relativas: el enlace se compartiría sin
  // ninguna previsualización. Es la pieza que faltaba.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageTitle,
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
    title: pageTitle,
    description: siteConfig.description,
    // `og:image` lo inyecta app/opengraph-image.tsx a partir de sus exports
    // `alt`, `size` y `contentType`. Declararlo también aquí duplicaría la
    // etiqueta y algunos lectores se quedan con la primera que encuentran.
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Sin esto Google recorta la miniatura a un tamaño mínimo en resultados
      // enriquecidos, aunque la imagen sea de 1200 px.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#060910",
  colorScheme: "dark",
};

/**
 * Datos estructurados del estudio.
 *
 * `ProfessionalService` es el tipo de schema.org que corresponde a un negocio
 * que presta servicios profesionales, y hereda de `LocalBusiness`, así que
 * admite datos de contacto y catálogo. Va en el layout para que esté presente
 * en la portada y en las siete páginas de servicio.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#nexus`,
  name: siteConfig.fullName,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.email,
  telephone: siteConfig.whatsapp.display.replace(/\s+/g, ""),
  founder: { "@type": "Person", name: siteConfig.founder },
  address: { "@type": "PostalAddress", addressCountry: "CO" },
  areaServed: { "@type": "Country", name: "Colombia" },
  availableLanguage: "es",
  // Solo las redes con URL real: un perfil apuntando a "#" ensucia el grafo.
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
        {/* El "<" se escapa a su equivalente unicode: JSON.stringify no lo
            hace, y un "<" dentro del JSON cerraría el <script> antes de
            tiempo si algún día un campo llegara a contener HTML. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
          }}
        />

        {/* Salto directo al contenido para quien navega con teclado o lector de pantalla */}
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteBackground />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
        <ChatWidget />
      </body>
    </html>
  );
}
