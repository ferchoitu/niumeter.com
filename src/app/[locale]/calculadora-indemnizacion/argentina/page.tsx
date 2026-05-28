import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import ArgentinaIndemnizacionCalculator from "@/components/calculators/ArgentinaIndemnizacionCalculator";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";

async function getContent(locale: string) {
  if (locale === "en") {
    const { content } = await import("@/content/calculadora-indemnizacion/argentina/en");
    return content;
  }
  const { content } = await import("@/content/calculadora-indemnizacion/argentina/es");
  return content;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://niumeter.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.indemnizacionCalc" });
  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-indemnizacion/argentina`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(t("h1"))}&locale=${locale}`;

  return {
    // Sin "| Niumeter" — el template del layout lo agrega automáticamente
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/es/calculadora-indemnizacion/argentina`,
        en: `${BASE_URL}/en/calculadora-indemnizacion/argentina`,
        "x-default": `${BASE_URL}/es/calculadora-indemnizacion/argentina`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t("h1") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageUrl],
    },
  };
}

export default async function ArgentinaIndemnizacionPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.indemnizacionCalc" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumbs" });
  const c = await getContent(locale);

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-indemnizacion/argentina`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tBc("inicio"), item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: tBc("calculadoras"), item: `${BASE_URL}/${locale}/calculadoras` },
      { "@type": "ListItem", position: 3, name: tBc("argentina"), item: `${BASE_URL}/${locale}/calculadora-indemnizacion/argentina` },
      { "@type": "ListItem", position: 4, name: tBc("indemnizacion"), item: canonicalUrl },
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
    offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: locale === "es" ? "Cómo calcular tu indemnización por despido en Argentina" : "How to calculate your severance pay in Argentina",
    description: t("description"),
    step: [
      {
        "@type": "HowToStep", position: 1,
        name: locale === "es" ? "Ingresá tu mejor remuneración" : "Enter your best salary",
        text: locale === "es" ? "El mayor sueldo bruto mensual del último año de trabajo." : "The highest gross monthly salary from the last year of employment.",
      },
      {
        "@type": "HowToStep", position: 2,
        name: locale === "es" ? "Ingresá las fechas de ingreso y despido" : "Enter your start and dismissal dates",
        text: locale === "es" ? "El sistema calcula automáticamente tu antigüedad y aplica el redondeo legal." : "The system automatically calculates your seniority and applies the legal rounding.",
      },
      {
        "@type": "HowToStep", position: 3,
        name: locale === "es" ? "Elegí el tipo de desvinculación" : "Select the type of termination",
        text: locale === "es" ? "Sin causa, con causa o renuncia — cada caso tiene conceptos diferentes." : "Without cause, with cause, or resignation — each case has different entitlements.",
      },
      {
        "@type": "HowToStep", position: 4,
        name: locale === "es" ? "Ver tu liquidación final" : "See your final settlement",
        text: locale === "es" ? "El resultado aparece con el desglose completo de cada concepto." : "The result appears with a complete breakdown of each component.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: tBc("inicio"), href: `/${locale}` },
            { label: tBc("calculadoras") },
            { label: tBc("argentina") },
            { label: tBc("indemnizacion") },
          ]}
        />
      </div>

      <CalculatorShell
        title={t("h1")}
        description={locale === "es"
          ? "Calculá tu liquidación final según Ley 20.744. SMVM $367.800 — Res. 9/2025."
          : "Calculate your final settlement under Law 20.744. Minimum wage $367,800 — Res. 9/2025."}
        badge="⚖️ Argentina · 2026"
      >
        <ArgentinaIndemnizacionCalculator />
      </CalculatorShell>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Separator className="mb-12" />
        <article className="prose prose-slate max-w-none">

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.intro.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.intro.p3}</p>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.conceptos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.conceptos.intro}</p>
          <div className="space-y-3 mb-10 not-prose">
            {c.conceptos.items.map((item, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.tope.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.tope.p1}</p>
          <div className="not-prose bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-4 mb-5">
            <p className="text-sm font-semibold text-foreground">{c.tope.p2}</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.tope.p3}</p>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.tipos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.tipos.p1}</p>
          <div className="overflow-x-auto mb-10 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">Concepto</th>
                  <th className="text-center py-2 pr-4 font-semibold text-muted-foreground">Sin causa</th>
                  <th className="text-center py-2 pr-4 font-semibold text-muted-foreground">Con causa</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Renuncia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {c.tipos.tabla.map((row) => (
                  <tr key={row.concepto}>
                    <td className="py-3 pr-4 text-foreground">{row.concepto}</td>
                    <td className="py-3 pr-4 text-center">{row.sinCausa}</td>
                    <td className="py-3 pr-4 text-center">{row.conCausa}</td>
                    <td className="py-3 text-center">{row.renuncia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.plazos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.plazos.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.plazos.p2}</p>

          <div className="not-prose p-6 bg-[#10B981]/5 rounded-xl border border-[#10B981]/20 mb-12">
            <h3 className="font-semibold text-foreground mb-3">{c.linksRelacionados.titulo}</h3>
            <ul className="space-y-2 text-sm">
              {c.linksRelacionados.links.map((link) => (
                <li key={link.label} className="text-muted-foreground">
                  {link.icon}{" "}
                  {link.activo && link.href ? (
                    <a href={`/${locale}${link.href}`} className="text-[#10B981] hover:underline">{link.label}</a>
                  ) : (
                    <span>{link.label}</span>
                  )}{" "}
                  — {link.activo ? link.desc : <em>{link.desc}</em>}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">{c.faq.h2}</h2>
          <div className="space-y-3 not-prose">
            {c.faq.items.map((faq, idx) => (
              <details key={idx} className="group border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 font-semibold text-foreground text-sm select-none list-none">
                  <span>{faq.q}</span>
                  <span className="text-muted-foreground shrink-0 transition-transform group-open:rotate-180">▼</span>
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
