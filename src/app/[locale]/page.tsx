import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Shield, RefreshCw, UserCheck, Gauge, Calculator, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/JsonLd";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://niumeter.com";

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Niumeter",
    url: BASE_URL,
    description:
      locale === "es"
        ? "Calculadoras financieras y de sueldo para Argentina. Sin registro."
        : "Financial and salary calculators for Argentina. No registration required.",
    inLanguage: [locale === "es" ? "es-AR" : "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/${locale}/calculadora-sueldo/argentina`,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Niumeter",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [],
  };

  const calculadoras = [
    {
      id: "sueldo-neto",
      emoji: "💼",
      title: t("cards.sueldoNeto.titulo"),
      description: t("cards.sueldoNeto.descripcion"),
      cta: t("cards.sueldoNeto.cta"),
      href: `/${locale}/calculadora-sueldo/argentina`,
      available: true,
      badge: "Disponible",
    },
    {
      id: "aguinaldo",
      emoji: "🎁",
      title: t("cards.aguinaldo.titulo"),
      description: t("cards.aguinaldo.descripcion"),
      cta: t("cards.aguinaldo.cta"),
      href: `/${locale}/calculadora-aguinaldo/argentina`,
      available: true,
      badge: "Disponible",
    },
    {
      id: "indemnizacion",
      emoji: "⚖️",
      title: t("cards.indemnizacion.titulo"),
      description: t("cards.indemnizacion.descripcion"),
      cta: t("cards.indemnizacion.cta"),
      href: `/${locale}/calculadora-indemnizacion/argentina`,
      available: true,
      badge: "Disponible",
    },
    {
      id: "monotributo",
      emoji: "🧾",
      title: locale === "es" ? "Calculadora de Monotributo" : "Monotributo Calculator",
      description: locale === "es"
        ? "Determiná tu categoría A–K, cuánto pagás por mes y cuánto margen de facturación te queda."
        : "Determine your A–K category, how much you pay per month and your remaining invoicing margin.",
      cta: locale === "es" ? "Calcular ahora" : "Calculate now",
      href: `/${locale}/calculadora-monotributo/argentina`,
      available: true,
      badge: "Disponible",
    },
    {
      id: "freelance",
      emoji: "🖥️",
      title: t("cards.freelance.titulo"),
      description: t("cards.freelance.descripcion"),
      cta: t("cards.freelance.cta"),
      href: `/${locale}/calculadora-freelance/argentina`,
      available: false,
      badge: locale === "es" ? "Próximamente" : "Coming soon",
    },
  ];

  const trustItems = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: t("trust.item1"),
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: t("trust.item2"),
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      label: t("trust.item3"),
    },
  ];

  const philosophyItems = [
    {
      num: "01",
      title: locale === "es" ? "Transparencia LCT" : "LCT Transparency",
      description:
        locale === "es"
          ? "Cálculos basados estrictamente en la Ley de Contrato de Trabajo de Argentina. Fórmulas abiertas, claras y sin letra chica."
          : "Calculations based strictly on Argentine Labor Law. Open, clear formulas with no fine print.",
    },
    {
      num: "02",
      title: locale === "es" ? "Velocidad Inmediata" : "Instant Speed",
      description:
        locale === "es"
          ? "Sin registros molestos ni capturas de datos. Obtené tus resultados de aguinaldo, indemnización o sueldo neto en 5 segundos."
          : "No annoying signups or data harvesting. Get your severance, bonus, or salary results in 5 seconds.",
    },
    {
      num: "03",
      title: locale === "es" ? "Privacidad Absoluta" : "Absolute Privacy",
      description:
        locale === "es"
          ? "Todo el procesamiento de tus datos financieros ocurre localmente en tu dispositivo. Tu información nunca toca nuestros servidores."
          : "All processing of your financial data happens locally on your device. Your info never touches our servers.",
    },
  ];

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50/50 via-white to-white border-b border-border/40">
        {/* Background orbs */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex self-start items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 mb-6">
                <Gauge className="h-4 w-4" />
                🇦🇷 Argentina · 2026
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight text-balance">
                {t("hero.headline")}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-zinc-650 max-w-2xl leading-relaxed">
                {t("hero.subheadline")}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/calculadora-sueldo/argentina`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-primary hover:bg-primary/90 text-white font-bold px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-primary/20"
                  )}
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href="#calculadoras"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "font-medium px-8 rounded-xl border-border bg-white text-zinc-800 hover:bg-zinc-50"
                  )}
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border/60 group">
              <span className="cyber-corner cyber-corner-tl z-10 w-3 h-3 border-t-2 border-l-2" />
              <span className="cyber-corner cyber-corner-tr z-10 w-3 h-3 border-t-2 border-r-2" />
              <span className="cyber-corner cyber-corner-bl z-10 w-3 h-3 border-b-2 border-l-2" />
              <span className="cyber-corner cyber-corner-br z-10 w-3 h-3 border-b-2 border-r-2" />
              <Image
                src="/hero.jpg"
                alt="Niumeter Hero Image"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-border/40 bg-card/25" aria-label={t("trust.titulo")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR GRID ===== */}
      <section
        id="calculadoras"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        aria-labelledby="calculadoras-heading"
      >
        <div className="text-center mb-12">
          <h2 id="calculadoras-heading" className="text-3xl md:text-4xl font-bold text-zinc-950">
            {t("calculadoras.titulo")}
          </h2>
          <p className="mt-3 text-zinc-600 text-lg">
            {t("calculadoras.descripcion")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculadoras.map((calc) => (
            <div
              key={calc.id}
              className={`group relative glass-panel p-6 rounded-xl flex flex-col justify-between h-full border border-border/40 transition-all duration-200 ${
                calc.available ? "cursor-pointer card-hover" : "opacity-40"
              }`}
            >
              {calc.available && (
                <>
                  <span className="cyber-corner cyber-corner-tl group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="cyber-corner cyber-corner-tr group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="cyber-corner cyber-corner-bl group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
                  <span className="cyber-corner cyber-corner-br group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </>
              )}

              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" aria-hidden>
                    {calc.emoji}
                  </span>
                  <Badge
                    variant={calc.available ? "default" : "secondary"}
                    className={
                      calc.available
                        ? "bg-primary/10 text-primary border-primary/20 text-xs"
                        : "text-xs"
                    }
                  >
                    {calc.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-900 leading-snug">{calc.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {calc.description}
                </p>
              </div>

              <div>
                {calc.available ? (
                  <Link
                    href={calc.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "w-full justify-between text-primary hover:bg-primary/10 hover:text-primary -mx-2 px-2 group-hover:translate-x-0.5 transition-transform"
                    )}
                  >
                    {calc.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-0">
                    <span>{calc.cta}</span>
                    <Calculator className="h-4 w-4 opacity-40" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PHILOSOPHY / TIMELINE SECTION ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-border/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left side text */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 mb-6">
              {locale === "es" ? "Nuestros Principios" : "Our Principles"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              {locale === "es" ? "Cálculos honestos, herramientas privadas" : "Honest calculations, private tools"}
            </h2>
            <p className="mt-4 text-zinc-600 text-base md:text-lg leading-relaxed">
              {locale === "es"
                ? "Diseñamos Niumeter para devolver la transparencia a las finanzas personales de los trabajadores argentinos. Sin trucos, sin publicidad invasiva."
                : "We designed Niumeter to bring transparency back to personal finance for Argentine workers. No tricks, no invasive ads."}
            </p>
          </div>

          {/* Right side timeline */}
          <div className="lg:col-span-7 relative pl-8 lg:pl-16">
            {/* Vertical line */}
            <div className="absolute left-[9px] lg:left-[41px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-border/40 to-transparent" />

            <div className="space-y-12">
              {philosophyItems.map((item, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row gap-6 items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-[-30px] lg:left-[-62px] top-1.5 flex items-center justify-center">
                    <div className="w-5 h-5 bg-background border-2 border-primary rounded-sm flex items-center justify-center neon-glow">
                      <div className="w-1.5 h-1.5 bg-primary rounded-sm" />
                    </div>
                  </div>

                  {/* Glass Card */}
                  <div className="relative w-full glass-panel p-6 md:p-8 rounded-xl border border-border/40 bg-white/70">
                    <span className="cyber-corner cyber-corner-tl" />
                    <span className="cyber-corner cyber-corner-tr" />
                    <span className="cyber-corner cyber-corner-bl" />
                    <span className="cyber-corner cyber-corner-br" />

                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-2xl font-mono font-bold text-primary/40">{item.num}</span>
                      <h3 className="text-xl font-bold text-zinc-950">{item.title}</h3>
                    </div>
                    <p className="text-sm md:text-base text-zinc-650 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAÍSES ===== */}
      <section className="bg-primary/5 border-y border-primary/10 py-12" aria-labelledby="paises-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="paises-heading" className="text-2xl font-bold text-zinc-950 mb-8 text-center">
            {t("paises.titulo")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 bg-card rounded-xl border border-border px-5 py-3 shadow-sm">
              <span className="text-2xl">🇦🇷</span>
              <div>
                <p className="font-semibold text-sm text-zinc-900">{t("paises.argentina")}</p>
                <p className="text-xs text-primary">Disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇲🇽</span>
              <div>
                <p className="font-semibold text-sm text-zinc-900">México</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇨🇱</span>
              <div>
                <p className="font-semibold text-sm text-zinc-900">Chile</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇨🇴</span>
              <div>
                <p className="font-semibold text-sm text-zinc-900">Colombia</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-4">
          {locale === "es"
            ? "¿Cuánto te queda de sueldo este mes?"
            : "How much take-home pay do you have this month?"}
        </h2>
        <p className="text-zinc-600 text-lg mb-8 max-w-xl mx-auto">
          {locale === "es"
            ? "Calculalo en 30 segundos. Sin registro, sin publicidades agresivas."
            : "Calculate it in 30 seconds. No registration, no aggressive ads."}
        </p>
        <Link
          href={`/${locale}/calculadora-sueldo/argentina`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-primary hover:bg-primary/90 text-white font-bold px-10 rounded-xl shadow-md hover:shadow-primary/20 transition-all duration-200"
          )}
        >
          {locale === "es" ? "Calcular ahora — es gratis" : "Calculate now — it's free"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
