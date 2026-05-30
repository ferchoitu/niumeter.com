import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import ArgentinaMonotributoCalculator from "@/components/calculators/ArgentinaMonotributoCalculator";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";

async function getContent(locale: string) {
  if (locale === "en") {
    const { content } = await import("@/content/calculadora-monotributo/argentina/en");
    return content;
  }
  const { content } = await import("@/content/calculadora-monotributo/argentina/es");
  return content;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://niumeter.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.monotributoCalc" });
  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-monotributo/argentina`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(t("h1"))}&locale=${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/es/calculadora-monotributo/argentina`,
        en: `${BASE_URL}/en/calculadora-monotributo/argentina`,
        "x-default": `${BASE_URL}/es/calculadora-monotributo/argentina`,
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

export default async function ArgentinaMonotributoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.monotributoCalc" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumbs" });
  const c = await getContent(locale);

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-monotributo/argentina`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tBc("inicio"), item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: tBc("calculadoras"), item: `${BASE_URL}/${locale}/calculadoras` },
      { "@type": "ListItem", position: 3, name: tBc("argentina"), item: `${BASE_URL}/${locale}/calculadora-monotributo/argentina` },
      { "@type": "ListItem", position: 4, name: tBc("monotributo"), item: canonicalUrl },
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
    name: locale === "es"
      ? "Cómo calcular tu categoría de monotributo en Argentina"
      : "How to calculate your monotributo category in Argentina",
    description: t("description"),
    step: [
      {
        "@type": "HowToStep", position: 1,
        name: locale === "es" ? "Ingresá tus ingresos brutos anuales" : "Enter your annual gross income",
        text: locale === "es"
          ? "El total de lo que facturaste en los últimos 12 meses calendario."
          : "The total amount invoiced in the last 12 calendar months.",
      },
      {
        "@type": "HowToStep", position: 2,
        name: locale === "es" ? "Elegí tu tipo de actividad" : "Select your type of activity",
        text: locale === "es"
          ? "Servicios/locaciones o venta de bienes muebles. Las cuotas difieren desde la categoría C en adelante."
          : "Services/leasing or movable goods sales. Fees differ from Category C onwards.",
      },
      {
        "@type": "HowToStep", position: 3,
        name: locale === "es" ? "Indicá si tenés empleados o local" : "Indicate if you have employees or premises",
        text: locale === "es"
          ? "Estos factores pueden determinar una categoría mínima superior a la de tus ingresos."
          : "These factors may determine a minimum category higher than your income category.",
      },
      {
        "@type": "HowToStep", position: 4,
        name: locale === "es" ? "Ver tu categoría y cuota mensual" : "See your category and monthly fee",
        text: locale === "es"
          ? "La calculadora muestra tu categoría, cuota, tope y margen disponible en tiempo real."
          : "The calculator shows your category, fee, limit and available margin in real time.",
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
            { label: tBc("monotributo") },
          ]}
        />
      </div>

      <CalculatorShell
        title={t("h1")}
        description={locale === "es"
          ? "Determiná tu categoría A–K y cuánto pagás por mes. Datos ARCA — Ley 27.743, Junio 2026."
          : "Determine your A–K category and how much you pay per month. ARCA data — Law 27.743, June 2026."}
        badge="🧾 Argentina · Monotributo 2026"
      >
        <ArgentinaMonotributoCalculator />
      </CalculatorShell>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Separator className="mb-12" />
        <article className="prose prose-slate max-w-none">

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.intro.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.intro.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.intro.p3}</p>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.comoFunciona.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.comoFunciona.intro}</p>
          <div className="space-y-3 mb-10 not-prose">
            {c.comoFunciona.items.map((item, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.diferencias.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.diferencias.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.diferencias.p2}</p>

          <h2 className="text-2xl font-bold text-foreground mb-4">{c.recategorizacion.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.recategorizacion.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.recategorizacion.p2}</p>

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
