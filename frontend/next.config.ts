import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La cabecera "X-Powered-By: Next.js" solo revela el stack; no aporta nada.
  poweredByHeader: false,

  // experimental: {
    // El CSS de Tailwind viaja dentro del HTML en vez de en un <link> aparte.
    // Elimina una petición bloqueante antes del primer pintado, que es la que
    // más pesa en la primera visita — justo el caso de un cliente potencial
    // que entra por primera vez.
  //   inlineCss: true,
  // },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Las rutas de API nunca deben quedar cacheadas por un intermediario.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
