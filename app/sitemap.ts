import type { MetadataRoute } from "next";
import { t } from "@/lib/content";
import { CIUDADES_CERCANAS } from "@/lib/seo-locations";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = t.meta.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                                  lastModified: now, changeFrequency: "weekly",  priority: 1    },
    { url: `${base}/gimnasio-en-cachipay`,        lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/#servicios`,                  lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/#planes`,                     lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/#horarios`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.8  },
    { url: `${base}/#nosotros`,                   lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/#ubicacion`,                  lastModified: now, changeFrequency: "monthly", priority: 0.8  },
  ];

  const locationRoutes: MetadataRoute.Sitemap = CIUDADES_CERCANAS.map((c) => ({
    url: `${base}/cerca/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...getAllPosts().map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}
