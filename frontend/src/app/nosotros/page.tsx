import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import MissionVision from "@/components/MissionVision";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Misión y visión de ${siteConfig.fullName}: por qué construimos software y cómo acompañamos a cada cliente.`,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: `Nosotros — ${siteConfig.fullName}`,
    description: `Misión y visión de ${siteConfig.fullName}: por qué construimos software y cómo acompañamos a cada cliente.`,
    url: "/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <SectionKicker className="mb-4">Nuestro rumbo</SectionKicker>
              <h1 className="font-display text-titulo-seccion font-semibold text-white">
                Un rumbo claro detrás de cada línea de código
              </h1>
              <p className="mt-5 text-entrada text-fg-muted">
                En {siteConfig.name} trabajamos con un propósito y una dirección
                definidos: construir software que genere valor real para quienes
                confían en nosotros.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            <MissionVision />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
