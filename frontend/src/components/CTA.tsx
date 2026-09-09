import { Mail, MessageCircle, Clock, Lock, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionKicker from "./SectionKicker";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/site-config";

const canales = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsapp.display,
    href: siteConfig.whatsapp.href,
    externo: true,
  },
  {
    icon: Mail,
    label: "Correo",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    externo: false,
  },
];

/**
 * Cierre de la página: dos columnas reales, 5/7.
 *
 * La caja exterior con borde desapareció. El formulario conserva la suya —
 * es la única de la página que la necesita, porque delimita una zona donde se
 * escribe. La separación entre las dos columnas la hace el espacio.
 *
 * Los canales de contacto se listan con una fila por canal separada por una
 * línea de un píxel, en vez de dos tarjetas con borde completo: al quedarse
 * la columna sin caja contenedora, dos rectángulos sueltos se leían como
 * restos del diseño anterior.
 */
export default function CTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-5 pt-28 pb-24 sm:px-8 sm:pt-48 sm:pb-40"
    >
      {/* A ancho completo de la sección, no del contenedor: ver `.halo-contacto`. */}
      <div aria-hidden className="halo-contacto" />

      <Reveal className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col lg:col-span-5">
              <SectionKicker className="mb-4">Hablemos</SectionKicker>
              <h2 className="font-display text-titulo-seccion font-semibold text-white">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="mt-5 text-entrada text-fg-muted">
                Cada proyecto recibe atención cercana y dedicada, de principio a
                fin. Cuéntanos tu idea y hablemos de cómo hacerla realidad.
              </p>

              <div className="mt-10 border-y border-[var(--color-line)]">
                {canales.map((canal, i) => (
                  <a
                    key={canal.label}
                    href={canal.href}
                    {...(canal.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex items-center gap-4 py-4 ${
                      i > 0 ? "border-t border-[var(--color-line)]" : ""
                    }`}
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-600/15 text-accent-400 transition-colors duration-300 group-hover:bg-brand-600/30">
                      <canal.icon size={18} />
                    </span>

                    <span className="flex min-w-0 flex-col">
                      <span className="text-kicker font-semibold text-fg-subtle">
                        {canal.label}
                      </span>
                      <span className="mt-1 truncate text-sm font-medium text-white">
                        {canal.value}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="ml-auto flex-none text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400"
                    />
                  </a>
                ))}
              </div>

              <ul className="mt-8 flex flex-col gap-3 text-sm text-fg-muted">
                <li className="flex items-start gap-2.5">
                  <Clock size={15} className="mt-0.5 flex-none text-accent-400" />
                  Te respondemos por el medio que prefieras.
                </li>
                <li className="flex items-start gap-2.5">
                  <Lock size={15} className="mt-0.5 flex-none text-accent-400" />
                  Tus datos se usan solo para responderte. Nada más.
                </li>
              </ul>
            </div>

            <div className="panel-contacto rounded-2xl p-6 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.95)] sm:p-8 lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
