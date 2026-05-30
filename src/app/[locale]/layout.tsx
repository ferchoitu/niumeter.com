import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";
// Load animation library asynchronously — non-critical for LCP

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const locales = ["es", "en"] as const;
type Locale = (typeof locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.home" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = "https://niumeter.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: `%s | ${tMeta("siteName")}`,
    },
    description: t("description"),
    applicationName: "Niumeter",
    authors: [{ name: "Niumeter" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      siteName: "Niumeter",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: "Niumeter — Calculadoras Financieras",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@niumeter",
      creator: "@niumeter",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "es": `${baseUrl}/es`,
        "en": `${baseUrl}/en`,
        "x-default": `${baseUrl}/es`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="es" href="https://niumeter.com/es" />
        <link rel="alternate" hrefLang="en" href="https://niumeter.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://niumeter.com/es" />

        {/* Google Analytics 4 — TODO: reemplazar GA_MEASUREMENT_ID con tu ID real */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* AdSense — COMENTADO: descomentar cuando se apruebe la cuenta */}
        {/*
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </head>
      <body className={`${montserrat.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>
            <Header locale={locale} />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer locale={locale} />
          </TooltipProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
