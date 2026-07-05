import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceIcon3D from "@/components/ServiceIcon3D";
import SectionKicker from "@/components/SectionKicker";
import { services, getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — ${siteConfig.fullName}`,
    description: service.short,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/#servicios"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Volver a servicios
            </Link>

            <div className="mt-8 flex flex-col items-center gap-8 text-center sm:mt-10">
              <ScrollReveal y={16}>
                <div className="flex h-40 items-center justify-center sm:h-48">
                  <ServiceIcon3D icon={service.icon} size={168} />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <h1 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {service.title}
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-300 sm:text-lg">
                  {service.short}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="relative px-5 pb-24 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.3fr_1fr]">
            <ScrollReveal className="space-y-5">
              {service.description.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-neutral-300">
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <SectionKicker>Incluye</SectionKicker>
                <ul className="mt-5 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-200">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-600/20 text-brand-400">
                        <Check size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionKicker tone="muted" className="mb-5">Otros servicios</SectionKicker>
              <div className="flex flex-wrap gap-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-brand-500/40 hover:text-white"
                  >
                    {s.title}
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
