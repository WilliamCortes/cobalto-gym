import type { MetadataRoute } from "next";
import { t } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Bots de IA — permitir indexación y citación
      { userAgent: "GPTBot",          allow: ["/"] },
      { userAgent: "ChatGPT-User",    allow: ["/"] },
      { userAgent: "PerplexityBot",   allow: ["/"] },
      { userAgent: "ClaudeBot",       allow: ["/"] },
      { userAgent: "anthropic-ai",    allow: ["/"] },
      { userAgent: "Google-Extended", allow: ["/"] },
      { userAgent: "Bingbot",         allow: ["/"] },
      // Todos los demás — público, excepto rutas privadas
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal/", "/admin/", "/api/"],
      },
    ],
    sitemap: `${t.meta.siteUrl}/sitemap.xml`,
  };
}
