"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/#inicio" className="flex items-center gap-2.5 group">
          <Image
            src="/logo-mark.png"
            alt={siteConfig.name}
            width={32}
            height={32}
            priority
            className="rounded-full transition-transform group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <Wordmark className="text-lg" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contacto"
          className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(226,22,48,0.35)] transition-all hover:bg-brand-500 hover:shadow-[0_0_28px_rgba(226,22,48,0.55)] md:inline-block"
        >
          Hablemos
        </Link>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-ink-950/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-neutral-200 transition-colors hover:bg-white/5 hover:text-white"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
