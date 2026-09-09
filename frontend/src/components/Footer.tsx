import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons/BrandIcons";
import SectionKicker from "./SectionKicker";
import Wordmark from "./Wordmark";
import LogoMark from "./LogoMark";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-line)] bg-ink-950/70">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/#inicio" className="flex items-center gap-2.5">
              <LogoMark size={32} uid="footer" />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks
                // Solo se muestran las redes con una URL real: un icono que
                // lleva a "#" resta credibilidad más de lo que suma.
                .filter((item) => item.href && item.href !== "#")
                .map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="surface flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-accent-400"
                  >
                    <item.icon size={17} />
                  </a>
                ))}
            </div>
          </div>

          <nav aria-label="Navegación del pie">
            <SectionKicker tone="muted">Navegación</SectionKicker>
            <div className="mt-5 flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-fg-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Enlaces directos a cada servicio: ayudan al visitante y le dan a
              los buscadores rutas internas hacia las páginas de detalle. */}
          <nav aria-label="Servicios">
            <SectionKicker tone="muted">Servicios</SectionKicker>
            <div className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="text-sm text-fg-muted transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <SectionKicker tone="muted">Contacto</SectionKicker>
            <div className="mt-5 flex flex-col gap-3 text-sm text-fg-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-2 transition-colors hover:text-white"
              >
                <Mail size={15} className="mt-0.5 flex-none text-accent-400" />
                <span className="break-all">{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle size={15} className="flex-none text-accent-400" />
                {siteConfig.whatsapp.display}
              </a>
              <p className="pt-2 text-fg-subtle">
                Fundado por{" "}
                <span className="text-fg-muted">{siteConfig.founder}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-line)] pt-8 text-xs text-fg-subtle sm:flex-row">
          <p>
            © {year} {siteConfig.fullName}. Todos los derechos reservados.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
