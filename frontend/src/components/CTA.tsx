import { Mail, MessageCircle, Clock, Lock } from "lucide-react";
import Reveal from "./Reveal";
import SectionKicker from "./SectionKicker";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/site-config";

export default function CTA() {
  return (
    <section id="contacto" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="surface relative overflow-hidden rounded-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 0% 0%, rgba(37,99,235,0.18), transparent 60%)",
            }}
          />

          {/* Dos columnas: a la izquierda a quién escribes y por qué confiar,
              a la derecha la acción. Antes todo iba centrado en una sola
              columna y el formulario quedaba muy por debajo del pliegue. */}
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.85fr_1fr] lg:gap-14 lg:p-14">
            <div className="flex flex-col">
              <SectionKicker className="mb-4">Hablemos</SectionKicker>
              <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Cada proyecto recibe atención cercana y dedicada, de principio a
                fin. Cuéntanos tu idea y hablemos de cómo hacerla realidad.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={siteConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group surface flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:border-brand-500/40"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-600/15 text-accent-400">
                    <MessageCircle size={17} />
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-xs text-fg-subtle">WhatsApp</span>
                    <span className="text-sm font-medium text-white">
                      {siteConfig.whatsapp.display}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group surface flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:border-brand-500/40"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-600/15 text-accent-400">
                    <Mail size={17} />
                  </span>
                  <span className="flex min-w-0 flex-col text-left">
                    <span className="text-xs text-fg-subtle">Correo</span>
                    <span className="truncate text-sm font-medium text-white">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
              </div>

              <ul className="mt-8 flex flex-col gap-2.5 text-xs text-fg-subtle">
                <li className="flex items-center gap-2">
                  <Clock size={14} className="flex-none text-accent-400" />
                  Te respondemos por el medio que prefieras.
                </li>
                <li className="flex items-center gap-2">
                  <Lock size={14} className="flex-none text-accent-400" />
                  Tus datos se usan solo para responderte. Nada más.
                </li>
              </ul>
            </div>

            <div className="surface-solid rounded-2xl p-5 sm:p-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
