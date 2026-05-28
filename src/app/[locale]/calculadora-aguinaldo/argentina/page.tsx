import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import ArgentinaAguinaldoCalculator from "@/components/calculators/ArgentinaAguinaldoCalculator";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";

async function getContent(locale: string) {
  if (locale === "en") {
    const { content } = await import("@/content/calculadora-aguinaldo/argentina/en");
    return content;
  }
  const { content } = await import("@/content/calculadora-aguinaldo/argentina/es");
  return content;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://niumeter.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.aguinaldoCalc" });

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-aguinaldo/argentina`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(t("h1"))}&locale=${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/es/calculadora-aguinaldo/argentina`,
        en: `${BASE_URL}/en/calculadora-aguinaldo/argentina`,
        "x-default": `${BASE_URL}/es/calculadora-aguinaldo/argentina`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("h1"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageUrl],
    },
  };
}

export default async function ArgentinaAguinaldoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.aguinaldoCalc" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumbs" });
  const c = await getContent(locale);

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-aguinaldo/argentina`;

  // ===== JSON-LD Schemas =====

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tBc("inicio"),
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tBc("calculadoras"),
        item: `${BASE_URL}/${locale}/calculadoras`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tBc("argentina"),
        item: `${BASE_URL}/${locale}/calculadora-aguinaldo/argentina`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tBc("aguinaldo"),
        item: canonicalUrl,
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("title"),
    url: canonicalUrl,
    description: t("description"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name:
      locale === "es"
        ? "Cómo calcular tu aguinaldo (SAC) en Argentina"
        : "How to calculate your SAC (annual bonus) in Argentina",
    description: t("description"),
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name:
          locale === "es"
            ? "Ingresá la mejor remuneración del semestre"
            : "Enter the best salary of the semester",
        text:
          locale === "es"
            ? "Es el mayor sueldo bruto mensual que cobraste en los últimos 6 meses."
            : "This is the highest gross monthly salary you received in the last 6 months.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: locale === "es" ? "Indicá los meses trabajados" : "Enter the months worked",
        text:
          locale === "es"
            ? "Si completaste el semestre completo, son 6 meses. Si no, indicá los meses para calcular el proporcional."
            : "If you completed the full semester, it's 6 months. Otherwise, enter the months for a proportional calculation.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name:
          locale === "es" ? "Configurá tus opciones adicionales" : "Configure your additional options",
        text:
          locale === "es"
            ? "Indicá si estás en convenio colectivo y si tenés deducciones familiares para Ganancias."
            : "Indicate if you're covered by a collective agreement and if you have family deductions for Income Tax.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: locale === "es" ? "Ver tu SAC neto" : "See your net SAC",
        text:
          locale === "es"
            ? "El resultado aparece automáticamente con el desglose completo de descuentos."
            : "The result appears automatically with a complete deduction breakdown.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      {/* Schema markup */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: tBc("inicio"), href: `/${locale}` },
            { label: tBc("calculadoras") },
            { label: tBc("argentina") },
            { label: tBc("aguinaldo") },
          ]}
        />
      </div>

      {/* Calculator */}
      <CalculatorShell
        title={t("h1")}
        description={locale === "es"
          ? "Calculá tu SAC neto en Argentina con descuentos actualizados 2026."
          : "Calculate your net SAC in Argentina with updated 2026 deductions."}
        badge="🎁 Argentina · 2026"
      >
        <ArgentinaAguinaldoCalculator />
      </CalculatorShell>

      {/* ===== SEO Content Block ===== */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Separator className="mb-12" />

        <article className="prose prose-slate max-w-none">

          {/* ── Introducción ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.intro.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.intro.p3}</p>

          {/* ── Cómo calcular ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.comoCelcular.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.comoCelcular.intro}</p>
          <div className="not-prose bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-4 mb-6 text-center">
            <p className="font-bold text-lg text-foreground">{c.comoCelcular.formula}</p>
          </div>
          <div className="space-y-3 mb-10 not-prose">
            {c.comoCelcular.steps.map((step, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{step.titulo}</p>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Descuentos ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.descuentos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.descuentos.intro}</p>
          <div className="space-y-3 mb-10 not-prose">
            {c.descuentos.items.map((item, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Ejemplos ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.ejemplos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{c.ejemplos.intro}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10 not-prose">
            {c.ejemplos.casos.map((caso) => (
              <div key={caso.titulo} className="border border-border rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  {caso.titulo}
                </p>
                <p className="text-xs text-muted-foreground mb-4">{caso.subtitulo}</p>
                <div className="space-y-2 text-sm">
                  {caso.filas.map((fila) => (
                    <div key={fila.label} className="flex justify-between">
                      <span className="text-muted-foreground">{fila.label}</span>
                      <span className="font-medium text-foreground">{fila.valor}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-1 flex justify-between font-semibold">
                    <span className="text-foreground">{caso.neto.label}</span>
                    <span className="text-[#10B981]">{caso.neto.valor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Proporcional ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.proporcional.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.proporcional.p1}</p>
          <div className="not-prose bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-4 mb-5 text-center">
            <p className="font-bold text-foreground">{c.proporcional.formula}</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.proporcional.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.proporcional.p3}</p>

          {/* ── Ganancias ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.ganancias.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.ganancias.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.ganancias.p2}</p>
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-10 text-sm text-blue-800 dark:text-blue-300 not-prose">
            💡 <strong>{c.ganancias.alerta}</strong>
          </div>

          {/* ── Links relacionados ── */}
          <div className="not-prose p-6 bg-[#10B981]/5 rounded-xl border border-[#10B981]/20 mb-12">
            <h3 className="font-semibold text-foreground mb-3">{c.linksRelacionados.titulo}</h3>
            <ul className="space-y-2 text-sm">
              {c.linksRelacionados.links.map((link) => (
                <li key={link.label} className="text-muted-foreground">
                  {link.icon}{" "}
                  {link.activo && link.href ? (
                    <a href={`/${locale}${link.href}`} className="text-[#10B981] hover:underline">
                      {link.label}
                    </a>
                  ) : (
                    <span>{link.label}</span>
                  )}{" "}
                  — {link.activo ? link.desc : <em>{link.desc}</em>}
                </li>
              ))}
            </ul>
          </div>

          {/* ── FAQ ── */}
          <h2 className="text-2xl font-bold text-foreground mb-6">{c.faq.h2}</h2>
          <div className="space-y-3 not-prose">
            {c.faq.items.map((faq, idx) => (
              <details key={idx} className="group border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 font-semibold text-foreground text-sm select-none list-none">
                  <span>{faq.q}</span>
                  <span className="text-muted-foreground shrink-0 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

        </article>
      </div>
    </>
  );
}
