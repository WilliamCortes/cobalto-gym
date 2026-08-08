import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { t } from "@/lib/content";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gym Cobalto`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `${t.meta.siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${t.meta.siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-bebas,sans-serif);font-size:28px;letter-spacing:1px;margin:40px 0 16px;color:#fff">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;margin:28px 0 12px;color:#e5e7eb">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,.1);margin:40px 0"/>')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith("<h") || line.startsWith("<hr") || line === "") return line;
      return `<p style="color:#c9d1d9;line-height:1.8;margin-bottom:18px;font-size:16px">${line}</p>`;
    })
    .replace(/<\/p>\n<p/g, "</p><p");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
      worksFor: { "@type": "Organization", name: "Gym Cobalto" },
    },
    publisher: {
      "@type": "Organization",
      name: "Gym Cobalto",
      url: t.meta.siteUrl,
    },
    url: `${t.meta.siteUrl}/blog/${slug}`,
    image: `${t.meta.siteUrl}${post.image}`,
    keywords: post.keywords,
    inLanguage: "es-CO",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#16A34A", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 24, letterSpacing: 2, textDecoration: "none" }}>
            GYM COBALTO
          </Link>
          <Link href="/blog" style={{ color: "#9ca3af", fontSize: 14, textDecoration: "none" }}>
            ← Blog
          </Link>
        </header>

        <article style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
          {/* Category + date */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#16A34A", background: "rgba(22,163,74,.1)", padding: "3px 10px", borderRadius: 999 }}>
              {post.category}
            </span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              {new Date(post.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 24, color: "#fff" }}>
            {post.title}
          </h1>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 40 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#16A34A,#052e16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas,sans-serif)", fontSize: 18, color: "#fff", flexShrink: 0 }}>
              EG
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{post.author}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{post.authorTitle}</div>
            </div>
          </div>

          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          {/* CTA */}
          <div style={{ marginTop: 48, padding: "28px 32px", background: "rgba(22,163,74,.08)", border: "1px solid rgba(22,163,74,.25)", borderRadius: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>¿Listo para empezar en Gym Cobalto?</p>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>
              Estamos en Cachipay, Cundinamarca. Escríbenos por WhatsApp y coordinamos tu primera visita.
            </p>
            <a
              href="https://wa.me/573004436649?text=Hola!%20Le%C3%AD%20el%20blog%20y%20quiero%20info%20sobre%20Gym%20Cobalto"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#16A34A", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 15 }}
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </article>

        {/* More posts */}
        {allPosts.length > 0 && (
          <section style={{ maxWidth: 720, margin: "0 auto 48px", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 28, letterSpacing: 1, marginBottom: 20, color: "#fff" }}>
              MÁS ARTÍCULOS
            </h2>
            <div style={{ display: "grid", gap: 16 }}>
              {allPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "18px 24px" }}>
                    <p style={{ fontSize: 11, color: "#16A34A", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{p.category}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.06)", color: "#6b7280", fontSize: 13 }}>
          <p>
            <Link href="/" style={{ color: "#16A34A", textDecoration: "none" }}>Gym Cobalto</Link>
            {" · "}Calle 3 #1-63, Cachipay, Cundinamarca
          </p>
        </footer>
      </div>
    </>
  );
}
