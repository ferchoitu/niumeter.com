import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import ArgentinaSalaryCalculator from "@/components/calculators/ArgentinaSalaryCalculator";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";

// Contenido editorial por locale — no hardcodear strings en este componente
async function getContent(locale: string) {
  if (locale === "en") {
    const { content } = await import("@/content/calculadora-sueldo/argentina/en");
    return content;
  }
  const { content } = await import("@/content/calculadora-sueldo/argentina/es");
  return content;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://niumeter.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.argentinaCalc" });

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-sueldo/argentina`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(t("h1"))}&locale=${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/es/calculadora-sueldo/argentina`,
        en: `${BASE_URL}/en/calculadora-sueldo/argentina`,
        "x-default": `${BASE_URL}/es/calculadora-sueldo/argentina`,
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

export default async function ArgentinaSalaryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.argentinaCalc" });
  const tCalc = await getTranslations({ locale, namespace: "calculator.argentina" });
  const tBc = await getTranslations({ locale, namespace: "breadcrumbs" });
  const c = await getContent(locale);

  const canonicalUrl = `${BASE_URL}/${locale}/calculadora-sueldo/argentina`;

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
        item: `${BASE_URL}/${locale}/calculadora-sueldo/argentina`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tBc("sueldoNeto"),
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
    name: locale === "es"
      ? "Cómo calcular tu sueldo neto en Argentina"
      : "How to calculate your net salary in Argentina",
    description: t("description"),
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: locale === "es" ? "Ingresá tu sueldo bruto" : "Enter your gross salary",
        text: locale === "es"
          ? "Escribí el monto de tu sueldo bruto mensual en pesos argentinos."
          : "Enter your monthly gross salary in Argentine pesos.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: locale === "es" ? "Configurá tus opciones" : "Configure your options",
        text: locale === "es"
          ? "Indicá si estás en convenio, si tenés cónyuge o hijos, y cualquier descuento adicional."
          : "Indicate if you're under a collective agreement, have a spouse or children, and any additional deductions.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: locale === "es" ? "Ver tu sueldo neto" : "See your net salary",
        text: locale === "es"
          ? "El resultado aparece automáticamente con el desglose completo de descuentos."
          : "The result appears automatically with a complete breakdown of deductions.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo calcular mi sueldo neto en Argentina?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Restás los aportes obligatorios al sueldo bruto: jubilación (11%), obra social (3%) y PAMI (3%). Si te retienen Ganancias, ese monto se suma a los descuentos. El total de descuentos mínimos es del 17% del bruto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto me descuentan del sueldo en Argentina?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Como mínimo un 17% (jubilación, obra social y PAMI). Si estás en convenio, sumás el aporte sindical (1-3%). Si pagás Ganancias, el descuento total puede llegar al 25-35% dependiendo de tu sueldo y situación familiar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué diferencia hay entre sueldo bruto y neto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El bruto es el total acordado en tu contrato, el que figura en el primer renglón del recibo. El neto es lo que te depositan después de todos los descuentos. La diferencia mínima es del 17%.",
        },
      },
      {
        "@type": "Question",
        name: "¿Todos pagan Impuesto a las Ganancias en Argentina?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. En 2026 solo pagan Ganancias los trabajadores que superan ciertos pisos salariales: $3.000.045 brutos mensuales para solteros sin hijos, y hasta $3.952.152 brutos para casados con 2 hijos. Si estás debajo de esos montos, no te corresponde la retención.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo se actualizan los valores de Ganancias en Argentina?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Según la Ley 27.743, ARCA actualiza las escalas y deducciones dos veces al año: en enero y julio. Los ajustes se hacen en base al índice IPC del INDEC del semestre anterior.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si soy monotributista en lugar de estar en relación de dependencia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El sistema es completamente distinto. Los monotributistas pagan una cuota fija mensual según su categoría (de la A a la K) que ya incluye impuestos, jubilación y obra social. No tienen sueldo bruto/neto en el sentido tradicional.",
        },
      },
      {
        "@type": "Question",
        name: "¿El aguinaldo (SAC) tiene los mismos descuentos que el sueldo mensual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, al aguinaldo se le aplican los mismos aportes: jubilación, obra social y PAMI. También puede impactar en Ganancias si el monto acumulado supera los pisos anuales. Por eso el SAC suele quedar más achicado de lo que uno espera.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo derivar mi obra social a una prepaga?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Podés derivar tu aporte de obra social (3% tuyo más las contribuciones patronales) a una empresa de medicina prepaga. El trámite se hace a través de tu empleador o directamente con la prepaga elegida.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si mi empleador no me retiene Ganancias y yo debería pagar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sos responsable solidario ante ARCA. Si el empleador no retiene correctamente, tenés que regularizar la situación. Lo más práctico es avisarle al área de RRHH para que lo corrijan antes de que genere un problema mayor.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es el SIRADIG y para qué sirve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es el sistema de ARCA donde cargás tus deducciones personales (medicina prepaga, alquiler, hijos, cónyuge) para que tu empleador las descuente de la base de Ganancias. Si no lo completás, probablemente estés pagando más de lo que corresponde.",
        },
      },
    ],
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
            { label: tBc("sueldoNeto") },
          ]}
        />
      </div>

      {/* Calculator */}
      <CalculatorShell
        title={t("h1")}
        description={tCalc("descripcion")}
        badge="🇦🇷 Argentina · 2026"
      >
        <ArgentinaSalaryCalculator />
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

          {/* ── Bruto vs Neto ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.brutoNeto.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.brutoNeto.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.brutoNeto.p2}</p>

          {/* ── Qué datos necesitás ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.datosNecesarios.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.datosNecesarios.intro}</p>
          <ul className="space-y-2 mb-10 list-none pl-0 not-prose">
            {c.datosNecesarios.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-muted/40 rounded-lg px-4 py-3 text-sm text-muted-foreground">
                <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

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

          {/* ── Ejemplo real ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.ejemplos.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{c.ejemplos.intro}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10 not-prose">
            {[c.ejemplos.caso1, c.ejemplos.caso2].map((caso) => (
              <div key={caso.titulo} className="border border-border rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{caso.titulo}</p>
                <p className="text-xs text-muted-foreground mb-4">{caso.subtitulo}</p>
                <div className="space-y-2 text-sm">
                  {caso.filas.map((fila) => (
                    <div key={fila.label} className="flex justify-between">
                      <span className="text-muted-foreground">{fila.label}</span>
                      <span className={`font-medium ${fila.destacado ? "text-green-600" : "text-foreground"}`}>{fila.valor}</span>
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

          {/* ── Ganancias ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.ganancias.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.ganancias.p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.ganancias.p2}</p>
          <div className="overflow-x-auto mb-6 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">Situación familiar</th>
                  <th className="text-right py-2 pr-4 font-semibold text-muted-foreground">Piso bruto mensual</th>
                  <th className="text-right py-2 font-semibold text-muted-foreground">Piso neto mensual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {c.ganancias.tabla.map((row) => (
                  <tr key={row.situacion}>
                    <td className="py-3 pr-4 text-foreground">{row.situacion}</td>
                    <td className="py-3 pr-4 text-right text-foreground">{row.bruto}</td>
                    <td className="py-3 text-right font-medium text-[#10B981]">{row.neto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-10 text-sm text-blue-800 dark:text-blue-300 not-prose">
            💡 <strong>{c.ganancias.alerta}</strong>
          </div>

          {/* ── SIRADIG ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.siradig.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{c.siradig.p1}</p>
          <ul className="space-y-2 mb-5 list-none pl-0 not-prose">
            {c.siradig.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-[#10B981] mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-10">{c.siradig.p2}</p>

          {/* ── Usar mejor el sueldo ── */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.usarMejor.h2}</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">{c.usarMejor.intro}</p>
          <ul className="space-y-2 mb-10 list-none pl-0 not-prose">
            {c.usarMejor.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-muted/40 rounded-lg px-4 py-3 text-sm text-muted-foreground">
                <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

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

