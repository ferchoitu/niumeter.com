import Link from "next/link";
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
      available: false,
      badge: locale === "es" ? "Próximamente" : "Coming soon",
    },
    {
      id: "indemnizacion",
      emoji: "⚖️",
      title: t("cards.indemnizacion.titulo"),
      description: t("cards.indemnizacion.descripcion"),
      cta: t("cards.indemnizacion.cta"),
      href: `/${locale}/calculadora-indemnizacion/argentina`,
      available: false,
      badge: locale === "es" ? "Próximamente" : "Coming soon",
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

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fdf4] via-white to-[#eff6ff] border-b border-border">
        {/* Background orbs */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 px-4 py-1.5 text-sm font-medium text-[#10B981] ring-1 ring-[#10B981]/20 mb-6">
              <Gauge className="h-4 w-4" />
              🇦🇷 Argentina · 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
              {t("hero.headline")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/calculadora-sueldo/argentina`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-[#10B981]/25"
                )}
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#calculadoras"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "font-medium px-8 rounded-xl"
                )}
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-border bg-white" aria-label={t("trust.titulo")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-[#10B981]">{item.icon}</span>
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
          <h2 id="calculadoras-heading" className="text-3xl md:text-4xl font-bold text-foreground">
            {t("calculadoras.titulo")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("calculadoras.descripcion")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {calculadoras.map((calc) => (
            <Card
              key={calc.id}
              className={`group border border-border/60 shadow-sm transition-all duration-200 ${
                calc.available
                  ? "cursor-pointer card-hover hover:border-[#10B981]/50"
                  : "opacity-70"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl" aria-hidden>
                    {calc.emoji}
                  </span>
                  <Badge
                    variant={calc.available ? "default" : "secondary"}
                    className={
                      calc.available
                        ? "bg-[#10B981]/10 text-[#10B981] border-0 text-xs"
                        : "text-xs"
                    }
                  >
                    {calc.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base leading-snug">{calc.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {calc.available ? (
                  <Link
                    href={calc.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "w-full justify-between text-[#10B981] hover:bg-[#10B981]/10 hover:text-[#10B981] -mx-2 group-hover:translate-x-0.5 transition-transform"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== PAÍSES ===== */}
      <section className="bg-[#10B981]/5 border-y border-[#10B981]/20 py-12" aria-labelledby="paises-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="paises-heading" className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("paises.titulo")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 bg-white rounded-xl border border-border px-5 py-3 shadow-sm">
              <span className="text-2xl">🇦🇷</span>
              <div>
                <p className="font-semibold text-sm text-foreground">{t("paises.argentina")}</p>
                <p className="text-xs text-[#10B981]">Disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇲🇽</span>
              <div>
                <p className="font-semibold text-sm text-foreground">México</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇨🇱</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Chile</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-xl border border-dashed border-border px-5 py-3 opacity-50">
              <span className="text-2xl">🇨🇴</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Colombia</p>
                <p className="text-xs text-muted-foreground">{t("paises.proximamente")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {locale === "es"
            ? "¿Cuánto te queda de sueldo este mes?"
            : "How much take-home pay do you have this month?"}
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          {locale === "es"
            ? "Calculalo en 30 segundos. Sin registro, sin publicidades agresivas."
            : "Calculate it in 30 seconds. No registration, no aggressive ads."}
        </p>
        <Link
          href={`/${locale}/calculadora-sueldo/argentina`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-10 rounded-xl shadow-md hover:shadow-[#10B981]/25 transition-all duration-200"
          )}
        >
          {locale === "es" ? "Calcular ahora — es gratis" : "Calculate now — it's free"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
