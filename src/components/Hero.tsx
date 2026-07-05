"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <FloatingShapes />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/5 px-4 py-1.5 text-xs font-medium text-brand-400 sm:text-sm"
        >
          <Sparkles size={14} className="text-brand-400" />
          Estudio de desarrollo de software
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Convertimos ideas en{" "}
          <span className="text-gradient-brand">software que despega</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-base text-neutral-300 sm:text-lg"
        >
          Diseñamos y construimos software a medida — desde plataformas web
          hasta aplicaciones móviles — con procesos claros, atención al
          detalle y un compromiso real con el resultado de cada cliente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/#contacto"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(226,22,48,0.4)] transition-all hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(226,22,48,0.6)] sm:w-auto"
          >
            Iniciemos tu proyecto
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/#mision-vision"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5 sm:w-auto"
          >
            Conoce más
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm"
        >
          <span>Calidad</span>
          <span className="h-1 w-1 rounded-full bg-brand-600" />
          <span>Transparencia</span>
          <span className="h-1 w-1 rounded-full bg-brand-600" />
          <span>Innovación</span>
          <span className="h-1 w-1 rounded-full bg-brand-600" />
          <span>Compromiso</span>
        </motion.div>
      </div>
    </section>
  );
}
