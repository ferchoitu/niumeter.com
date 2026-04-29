"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Gauge, Menu, Globe, ChevronDown, X } from "lucide-react";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const getAlternateUrl = (targetLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  const navLinks = [
    {
      label: `${t("argentina")} — ${t("sueldoNeto")}`,
      href: `/${locale}/calculadora-sueldo/argentina`,
      disabled: false,
    },
    {
      label: t("aguinaldo"),
      href: "#",
      disabled: true,
    },
    {
      label: t("indemnizacion"),
      href: "#",
      disabled: true,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981] text-white transition-transform group-hover:scale-105">
                <Gauge className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Niumeter</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {/* Calculadoras dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setCalcOpen((v) => !v); setLangOpen(false); }}
                  onBlur={() => setTimeout(() => setCalcOpen(false), 150)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  aria-expanded={calcOpen}
                  aria-haspopup="true"
                >
                  {t("calculadoras")}
                  <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${calcOpen ? "rotate-180" : ""}`} />
                </button>
                {calcOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                    {navLinks.map((link) =>
                      link.disabled ? (
                        <div
                          key={link.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground opacity-50 cursor-default"
                        >
                          {link.label}
                          <span className="text-xs bg-muted rounded px-1.5 py-0.5">Pronto</span>
                        </div>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setCalcOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Language switcher + mobile */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => { setLangOpen((v) => !v); setCalcOpen(false); }}
                  onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  aria-label={t("idioma")}
                  aria-expanded={langOpen}
                  aria-haspopup="true"
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase font-semibold">{locale}</span>
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                    <Link
                      href={getAlternateUrl("es")}
                      hrefLang="es"
                      onClick={() => setLangOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                    >
                      🇦🇷 Español
                      {locale === "es" && <span className="ml-auto text-[#10B981] text-xs">✓</span>}
                    </Link>
                    <Link
                      href={getAlternateUrl("en")}
                      hrefLang="en"
                      onClick={() => setLangOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                    >
                      🇺🇸 English
                      {locale === "en" && <span className="ml-auto text-[#10B981] text-xs">✓</span>}
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
                aria-label={t("menu")}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <nav
            className="absolute top-16 right-0 bottom-0 w-80 bg-white border-l border-border shadow-xl p-6 overflow-y-auto"
            aria-label="Navegación móvil"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981] text-white">
                <Gauge className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">Niumeter</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {t("calculadoras")}
            </p>
            <div className="flex flex-col gap-1 mb-8">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.disabled ? (
                    <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground opacity-50">
                      {link.label}
                      <span className="text-xs bg-muted rounded px-1.5 py-0.5">Pronto</span>
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {t("idioma")}
              </p>
              <Link
                href={getAlternateUrl("es")}
                hrefLang="es"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                🇦🇷 Español
                {locale === "es" && <span className="ml-auto text-[#10B981] text-xs">Activo</span>}
              </Link>
              <Link
                href={getAlternateUrl("en")}
                hrefLang="en"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                🇺🇸 English
                {locale === "en" && <span className="ml-auto text-[#10B981] text-xs">Active</span>}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
