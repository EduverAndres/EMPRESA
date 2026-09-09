"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Loader2,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "loading" | "success" | "error";
type Field = "name" | "phone" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-fg-subtle outline-none transition-colors";

function validate(values: Record<Field, string>) {
  const errors: Partial<Record<Field, string>> = {};

  if (!values.name.trim()) errors.name = "Dinos cómo te llamas.";
  if (!values.phone.trim()) errors.phone = "Necesitamos un teléfono de contacto.";

  if (!values.email.trim()) errors.email = "Necesitamos tu correo.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Ese correo no parece válido.";

  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const values = {
      name: String(raw.name ?? ""),
      phone: String(raw.phone ?? ""),
      email: String(raw.email ?? ""),
      message: String(raw.message ?? ""),
    };

    // Validación en el cliente antes de gastar una petición al servidor.
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: raw.company ?? "" }),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "No se pudo enviar el mensaje.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo enviar el mensaje. Revisa tu conexión.");
    }
  };

  /** Limpia el error de un campo en cuanto el visitante lo corrige. */
  const clearError = (field: Field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 px-2 py-12 text-center"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-500/15 text-success-400">
          <CheckCircle2 size={28} />
        </span>
        <p className="font-display text-lg font-semibold text-white">
          ¡Mensaje enviado!
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
          Gracias por escribirnos. Te responderemos pronto al correo o teléfono
          que dejaste.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const inputTone = (field: Field) =>
    errors[field]
      ? "border-red-500/60 focus:border-red-500"
      : "border-[var(--color-line)] focus:border-brand-500/60";

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left">
      {/* Trampa para bots: una persona nunca ve ni rellena este campo. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-fg-muted">
            Nombre <span className="text-accent-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
            className={`${fieldClass} ${inputTone("name")}`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-fg-muted">
            Teléfono / WhatsApp <span className="text-accent-400">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+57 300 000 0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onChange={() => clearError("phone")}
            className={`${fieldClass} ${inputTone("phone")}`}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="email" className="text-xs font-medium text-fg-muted">
            Correo electrónico <span className="text-accent-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
            className={`${fieldClass} ${inputTone("email")}`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-medium text-fg-muted">
            Cuéntanos sobre tu proyecto{" "}
            <span className="text-fg-subtle">(opcional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="¿Qué necesitas construir?"
            className={`${fieldClass} resize-none border-[var(--color-line)] focus:border-brand-500/60`}
          />
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <p className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 flex-none" />
            {errorMessage}
          </p>
          {/* Si el correo falla, el contacto no se pierde: se ofrece WhatsApp
              en el mismo sitio en vez de dejar al visitante en un callejón. */}
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white underline underline-offset-4 transition-colors hover:text-accent-300"
          >
            <MessageCircle size={13} />
            Escríbenos por WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.8)] transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}
