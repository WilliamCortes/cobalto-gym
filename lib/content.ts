import es from "@/content/es.json";

export type Content = typeof es;
export type Locale = "es";

const locales: Record<Locale, Content> = { es };

export function getContent(locale: Locale = "es"): Content {
  return locales[locale];
}

export const t = getContent();
