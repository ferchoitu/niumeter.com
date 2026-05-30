import type { MetadataRoute } from "next";

const BASE_URL = "https://niumeter.com";
const locales = ["es", "en"] as const;

/**
 * Dynamic sitemap — auto-generated.
 * To add a new calculator: add an entry to `routes` below.
 * The sitemap will include all locales automatically.
 *
 * TODO: add new calculator routes as they are built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes — extend this array when adding new calculators
  const routes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculadora-sueldo/argentina",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/calculadora-aguinaldo/argentina",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/calculadora-indemnizacion/argentina",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/calculadora-monotributo/argentina",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    // TODO: add when built:
    // { path: "/calculadora-freelance/argentina", priority: 0.8, changeFrequency: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
