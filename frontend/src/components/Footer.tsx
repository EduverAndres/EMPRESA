import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons/BrandIcons";
import SectionKicker from "./SectionKicker";
import Wordmark from "./Wordmark";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-900/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/#inicio" className="flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt={siteConfig.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-400 hover:shadow-[0_0_20px_rgba(226,22,48,0.25)]"
                >
                  <item.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <SectionKicker tone="muted">Navegación</SectionKicker>
            <div className="mt-5 flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionKicker tone="muted">Contacto</SectionKicker>
            <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-400">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-brand-400" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle size={15} className="text-brand-400" />
                {siteConfig.whatsapp.display}
              </a>
              <p className="pt-2 text-neutral-500">
                Fundado por{" "}
                <span className="text-neutral-300">{siteConfig.founder}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {year} {siteConfig.fullName}. Todos los derechos reservados.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
