import type { MetadataRoute } from "next";
import { t } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/portal/", "/api/"] },
    ],
    sitemap: `${t.meta.siteUrl}/sitemap.xml`,
  };
}
