import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import ServiceIcon3D from "@/components/ServiceIcon3D";
import SectionKicker from "@/components/SectionKicker";
import { services, getServiceBySlug } from "@/lib/services";

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
    title: service.title,
    description: service.short,
    openGraph: { title: service.title, description: service.short },
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
        <section className="relative px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-16">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/#servicios"
              className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Volver a servicios
            </Link>

            <div className="mt-8 flex flex-col items-center gap-6 text-center sm:mt-10">
              <Reveal>
                <div className="flex h-36 items-center justify-center sm:h-44">
                  <ServiceIcon3D icon={service.icon} size={160} />
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display max-w-2xl text-titulo-seccion font-semibold text-white">
                  {service.title}
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-fg-muted sm:text-lg">
                  {service.short}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative px-5 pb-20 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.3fr_1fr]">
            <Reveal className="space-y-5">
              {service.description.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={100}>
              <div className="surface rounded-2xl p-6 sm:p-7">
                <SectionKicker>Incluye</SectionKicker>
                <ul className="mt-5 space-y-3.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-fg"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-600/20 text-accent-400">
                        <Check size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionKicker tone="muted" className="mb-5">
                Otros servicios
              </SectionKicker>
              <div className="flex flex-wrap gap-2.5">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="surface group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-fg-muted transition-colors hover:border-brand-500/40 hover:text-white"
                  >
                    {s.title}
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
