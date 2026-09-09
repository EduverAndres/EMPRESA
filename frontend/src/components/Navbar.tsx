"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";
import LogoMark from "./LogoMark";
import { siteConfig } from "@/lib/site-config";

/** Ids de sección que el indicador de navegación puede marcar como activa. */
const SECTION_IDS = ["inicio", "mision-vision", "servicios", "contacto"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    let ticking = false;

    // El listener solo marca una bandera; la lectura del scroll (que fuerza
    // al navegador a recalcular el layout) se hace una vez por frame.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el enlace de la sección que ocupa la franja central de la pantalla.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/#inicio"
          className="group flex flex-none items-center gap-2.5"
          aria-label={`${siteConfig.name} — inicio`}
        >
          <LogoMark
            size={34}
            uid="nav"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <Wordmark className="text-lg" />
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-fg-subtle sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-fg-muted hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-accent-400 to-transparent transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-none items-center gap-2">
          <Link
            href="/#contacto"
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.6)] transition-colors hover:bg-brand-500 md:inline-block"
          >
            Hablemos
          </Link>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] text-white transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil: la altura se anima con grid-template-rows, que es
          compositable, en vez de animar `height` con JavaScript. */}
      <div
        className={`grid overflow-hidden border-[var(--color-line)] bg-ink-950/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "grid-rows-[1fr] border-b opacity-100"
            : "grid-rows-[0fr] border-b-0 opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-5 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
