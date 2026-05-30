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

          {/* Lead + ¿Qué es? */}
          <p className="text-muted-foreground leading-relaxed mb-6 text-base">{c.intro.lead}</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.intro.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">{c.intro.p1}</p>
          <ul className="list-disc list-inside space-y-1 mb-4 not-prose pl-1">
            {c.intro.listItems.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.intro.p2}</p>

          {/* ¿Por qué controlar? */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.porQueControlar.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.porQueControlar.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.porQueControlar.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.porQueControlar.p3}</p>

          {/* Cómo evitar errores */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.comoEvitar.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.comoEvitar.p1}</p>
          <ul className="list-disc list-inside space-y-1 mb-10 not-prose pl-1">
            {c.comoEvitar.items.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>

          {/* Cómo funciona */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.comoFunciona.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.comoFunciona.intro}</p>
          <div className="not-prose grid gap-4 mb-6">
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.comoFunciona.datos.h3}</p>
              <ul className="space-y-1">
                {c.comoFunciona.datos.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-1">{c.comoFunciona.resultado.h3}</p>
              <p className="text-sm text-muted-foreground mb-2">{c.comoFunciona.resultado.p1}</p>
              <ul className="space-y-1 mb-2">
                {c.comoFunciona.resultado.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{c.comoFunciona.resultado.p2}</p>
            </div>
          </div>

          {/* Ejemplos concretos */}
          <h2 className="text-2xl font-bold text-foreground mb-3 mt-10">{c.ejemplos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.ejemplos.intro}</p>
          <div className="not-prose grid gap-4 mb-3">
            {c.ejemplos.items.map((ej, i) => {
              const borderColor = ej.color === "emerald"
                ? "border-emerald-200 bg-emerald-50"
                : ej.color === "blue"
                ? "border-blue-200 bg-blue-50"
                : "border-amber-200 bg-amber-50";
              const textColor = ej.color === "emerald"
                ? "text-emerald-700"
                : ej.color === "blue"
                ? "text-blue-700"
                : "text-amber-700";
              return (
                <div key={i} className={`rounded-xl border p-4 ${borderColor}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${textColor}`}>{ej.titulo}</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Categoría</span>
                      <p className={`text-xl font-black ${textColor}`}>{ej.categoria}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Cuota mensual</span>
                      <p className="text-sm font-bold text-foreground">{ej.cuota}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Tope anual</span>
                      <p className="text-sm font-medium text-foreground">{ej.tope}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Margen restante</span>
                      <p className="text-sm font-medium text-foreground">{ej.margen}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{ej.mensaje}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mb-10">{c.ejemplos.nota}</p>

          {/* Tabla de categorías */}
          <h2 className="text-2xl font-bold text-foreground mb-3">{c.tabla.h2}</h2>
          <p className="text-xs text-muted-foreground mb-4">{c.tabla.fuente}</p>
          <div className="not-prose overflow-x-auto mb-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border bg-zinc-50">
                  <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Cat.</th>
                  <th className="text-right py-2 px-3 font-semibold text-muted-foreground">Tope anual</th>
                  <th className="text-right py-2 px-3 font-semibold text-muted-foreground">Cuota Servicios</th>
                  <th className="text-right py-2 px-3 font-semibold text-muted-foreground">Cuota Bienes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { cat: "A", tope: "$10.277.988", srv: "$42.386,74", bien: "$42.386,74", topeOk: true, cuotaOk: true },
                  { cat: "B", tope: "$15.000.000 *", srv: "$48.250,78", bien: "$48.250,78", topeOk: false, cuotaOk: true },
                  { cat: "C", tope: "$21.000.000 *", srv: "$56.501,85", bien: "$55.227,06", topeOk: false, cuotaOk: true },
                  { cat: "D", tope: "$27.000.000 *", srv: "$72.414,10", bien: "$70.661,26", topeOk: false, cuotaOk: true },
                  { cat: "E", tope: "$40.000.000 *", srv: "$102.537,97", bien: "$92.658,35", topeOk: false, cuotaOk: true },
                  { cat: "F", tope: "$52.000.000 *", srv: "$129.045,32", bien: "$111.198,27", topeOk: false, cuotaOk: true },
                  { cat: "G", tope: "$46.211.109", srv: "$197.108,23", bien: "$118.920,05", topeOk: true, cuotaOk: true },
                  { cat: "H", tope: "$70.113.407", srv: "$447.346,93", bien: "$238.038,48", topeOk: true, cuotaOk: true },
                  { cat: "I", tope: "$78.479.212", srv: "$824.802,26", bien: "$355.672,64", topeOk: true, cuotaOk: true },
                  { cat: "J", tope: "$89.872.640", srv: "$999.007,65", bien: "$434.895,92", topeOk: true, cuotaOk: true },
                  { cat: "K", tope: "$108.357.084", srv: "PENDIENTE", bien: "PENDIENTE", topeOk: true, cuotaOk: false },
                ].map((row) => (
                  <tr key={row.cat} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-primary">{row.cat}</td>
                    <td className="py-2 px-3 text-right">
                      {row.cuotaOk || row.topeOk && row.tope !== "PENDIENTE" ? (
                        <span className="font-medium text-foreground">{row.tope}</span>
                      ) : row.tope === "PENDIENTE" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">⚠️ PENDIENTE</span>
                      ) : (
                        <span className="text-foreground">{row.tope}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      {row.cuotaOk ? (
                        <span className="font-medium text-foreground">{row.srv}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">⚠️ PENDIENTE</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      {row.cuotaOk ? (
                        <span className="font-medium text-foreground">{row.bien}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">⚠️ PENDIENTE</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-10">{c.tabla.nota}</p>

          {/* Recategorización */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.recategorizacion.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.recategorizacion.p1}</p>
          <div className="not-prose space-y-4 mb-10">
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.recategorizacion.limites.h3}</p>
              <p className="text-sm text-muted-foreground">{c.recategorizacion.limites.p1}</p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.recategorizacion.siSuperas.h3}</p>
              <ul className="space-y-1 mb-3">
                {c.recategorizacion.siSuperas.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-red-400 shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{c.recategorizacion.siSuperas.p1}</p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.recategorizacion.automatica.h3}</p>
              <p className="text-sm text-muted-foreground mb-2">{c.recategorizacion.automatica.p1}</p>
              <p className="text-sm text-muted-foreground">{c.recategorizacion.automatica.p2}</p>
            </div>
          </div>

          {/* ¿Cuánto se paga? */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.cuantoPaga.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.cuantoPaga.p1}</p>
          <div className="not-prose space-y-4 mb-10">
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.cuantoPaga.factores.h3}</p>
              <ul className="space-y-1 mb-3">
                {c.cuantoPaga.factores.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{c.cuantoPaga.factores.p1}</p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <p className="font-semibold text-foreground text-sm mb-2">{c.cuantoPaga.diferencias.h3}</p>
              <p className="text-sm text-muted-foreground">{c.cuantoPaga.diferencias.p1}</p>
            </div>
          </div>

          {/* Errores frecuentes */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.errores.h2}</h2>
          <div className="not-prose space-y-4 mb-10">
            {c.errores.items.map((item, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-2">{item.h3}</p>
                <p className="text-sm text-muted-foreground mb-1">{item.p1}</p>
                {item.p2 && <p className="text-sm text-muted-foreground">{item.p2}</p>}
              </div>
            ))}
          </div>

          {/* Ventajas */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.ventajas.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.ventajas.p1}</p>
          <div className="not-prose space-y-4 mb-10">
            {c.ventajas.items.map((item, i) => (
              <div key={i} className="border border-[#10B981]/30 bg-[#10B981]/5 rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm mb-2">{item.h3}</p>
                <p className="text-sm text-muted-foreground mb-1">{item.p1}</p>
                {item.p2 && <p className="text-sm text-muted-foreground">{item.p2}</p>}
              </div>
            ))}
          </div>

          {/* Conclusión */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.conclusion.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.conclusion.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.conclusion.p2}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.conclusion.p3}</p>

          {/* Links relacionados */}
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

          {/* FAQs */}
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
