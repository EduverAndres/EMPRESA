import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Imagen que se ve al compartir el enlace en WhatsApp, LinkedIn o X.
 *
 * Se genera con `next/og` en tiempo de build, así que no hay ningún PNG que
 * mantener en `public/` ni que se quede desactualizado cuando cambie la marca.
 *
 * Todo el diseño usa flexbox, colores planos y degradados: son las únicas
 * primitivas que soporta el renderizador de `ImageResponse`. Nada de `filter`,
 * `mask` ni fuentes externas — la esfera de puntos de la marca no se puede
 * reproducir aquí, así que se representa con el mismo degradado radial.
 */

export const alt = `${siteConfig.fullName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          backgroundColor: "#060910",
          backgroundImage:
            "radial-gradient(ellipse 90% 75% at 50% -15%, rgba(37,99,235,0.42), rgba(6,9,16,0) 68%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 999,
              backgroundImage:
                "radial-gradient(circle at 34% 30%, #a5f3fc 0%, #22d3ee 26%, #3b82f6 55%, #1d4ed8 80%, #0b1a3d 100%)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 66,
                fontWeight: 700,
                letterSpacing: 5,
                lineHeight: 1,
              }}
            >
              <span style={{ color: "#e8edf7" }}>NE</span>
              <span style={{ color: "#22d3ee" }}>X</span>
              <span style={{ color: "#e8edf7" }}>US</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontSize: 21,
                letterSpacing: 7,
                textTransform: "uppercase",
                color: "#67e8f9",
              }}
            >
              {siteConfig.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: 920,
            }}
          >
            Ese proyecto que llevas meses aplazando
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              color: "#9fb0c9",
            }}
          >
            Software a medida · Ingeniería de datos · Inteligencia artificial
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 30,
            borderTop: "1px solid rgba(148,176,224,0.18)",
            fontSize: 24,
            color: "#9fb0c9",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.email}</div>
          <div style={{ display: "flex" }}>{siteConfig.whatsapp.display}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
