import type { MetadataRoute } from "next";
import { t } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = t.meta.siteUrl;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#planes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#horarios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/#nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#ubicacion`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
