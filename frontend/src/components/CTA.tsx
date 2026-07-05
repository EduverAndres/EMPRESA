import { Mail, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionKicker from "./SectionKicker";
import { siteConfig } from "@/lib/site-config";

export default function CTA() {
  return (
    <section id="contacto" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/40 via-ink-900 to-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-600/25 blur-[90px]" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-brand-600/20 blur-[90px]" />

          <SectionKicker className="relative mb-3">Hablemos</SectionKicker>
          <h2 className="relative font-display mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-neutral-300">
            Cada proyecto recibe atención cercana y dedicada, de principio a
            fin. Cuéntanos tu idea y hablemos de cómo hacerla realidad.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(226,22,48,0.4)] transition-all hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(226,22,48,0.6)] sm:w-auto"
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5 sm:w-auto"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
