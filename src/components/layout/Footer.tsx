import Link from "next/link";
import { useTranslations } from "next-intl";
import { Gauge, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tBreadcrumbs = useTranslations("breadcrumbs");

  const calculadoras = [
    { label: t("sueldoNeto") + " — Argentina", href: `/${locale}/calculadora-sueldo/argentina`, active: true },
    { label: t("aguinaldo") + " — Argentina", href: `/${locale}/calculadora-aguinaldo/argentina`, active: true },
    { label: t("indemnizacion") + " — Argentina", href: `/${locale}/calculadora-indemnizacion/argentina`, active: true },
  ];

  return (
    <footer className="border-t border-border bg-white" aria-label="Pie de página">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981] text-white">
                <Gauge className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">Niumeter</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("disclaimer")}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {t("madeWith")}
            </p>
          </div>

          {/* Calculadoras column */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{t("calculadoras")}</h3>
            <ul className="space-y-2">
              {calculadoras.map((calc) => (
                <li key={calc.href}>
                  {calc.active ? (
                    <Link
                      href={calc.href}
                      className="text-sm text-muted-foreground hover:text-[#10B981] transition-colors"
                    >
                      {calc.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground/50 cursor-default">
                      {calc.label}
                      <span className="ml-1 text-xs bg-muted rounded px-1">Pronto</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                {/* TODO: crear páginas legales reales */}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground hover:text-[#10B981] transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-sm text-muted-foreground hover:text-[#10B981] transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.arca.gob.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#10B981] transition-colors"
                >
                  ARCA Argentina
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/es${typeof window !== "undefined" ? window.location.pathname.substring(3) : ""}`}
              hrefLang="es"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              🇦🇷 Español
            </Link>
            <Link
              href={`/en${typeof window !== "undefined" ? window.location.pathname.substring(3) : ""}`}
              hrefLang="en"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              🇺🇸 English
            </Link>
          </div>
        </div>
      </div>

      {/* AdSense slot — COMENTADO: habilitar cuando se apruebe la cuenta */}
      {/*
      <div className="border-t border-border py-4">
        <div className="mx-auto max-w-7xl px-4 flex justify-center">
          TODO: AdSense footer slot
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      */}
    </footer>
  );
}
