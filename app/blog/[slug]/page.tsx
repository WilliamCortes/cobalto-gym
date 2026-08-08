import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const CATEGORY_COLORS: Record<string, string> = {
  Bienestar: "#22C55E",
  Entrenamiento: "#3B82F6",
  Mentalidad: "#A855F7",
  "Nutrición y pérdida de grasa": "#F59E0B",
  "Entrenamiento Personal": "#EF4444",
  Motivación: "#EC4899",
};

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-bebas,sans-serif);font-size:30px;letter-spacing:1px;margin:48px 0 18px;color:#fff;line-height:1.1">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:19px;font-weight:700;margin:32px 0 14px;color:#e5e7eb">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin:44px 0"/>')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith("<h") || line.startsWith("<hr") || line === "") return line;
      return `<p style="color:#9ca3af;line-height:1.85;margin-bottom:20px;font-size:16.5px">${line}</p>`;
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
  const catColor = CATEGORY_COLORS[post.category] ?? "#16A34A";

  const imageUrl = post.image.startsWith("http") ? post.image : `${t.meta.siteUrl}${post.image}`;

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
    image: imageUrl,
    keywords: post.keywords,
    inLanguage: "es-CO",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

        {/* Sticky header */}
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.07)", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(13,17,23,.9)", backdropFilter: "blur(14px)" }}>
          <Link href="/" style={{ color: "#fff", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 20, letterSpacing: 3, textDecoration: "none" }}>
            GYM <span style={{ color: "#16A34A" }}>COBALTO</span>
          </Link>
          <Link href="/blog" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>
            ← Blog
          </Link>
        </header>

        {/* Hero image */}
        <div style={{ position: "relative", height: "min(560px, 70vw)", minHeight: 300 }}>
          <Image
            src={post.image}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            alt={post.title}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,17,23,.75) 0%, rgba(13,17,23,.1) 35%, rgba(13,17,23,.1) 50%, rgba(13,17,23,.85) 80%, rgba(13,17,23,1) 100%)" }} />

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 40px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                  color: catColor,
                  background: `${catColor}22`,
                  border: `1px solid ${catColor}44`,
                  padding: "4px 12px", borderRadius: 999,
                }}>
                  {post.category}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
                  {new Date(post.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{post.readingTime}</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(30px, 5.5vw, 62px)", lineHeight: 1, color: "#fff", margin: 0, textShadow: "0 2px 20px rgba(0,0,0,.4)" }}>
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Author strip */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.07)", background: "#111720" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#16A34A,#052e16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 16, color: "#fff", flexShrink: 0 }}>
                EG
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{post.author}</div>
                <div style={{ fontSize: 12, color: "#4b5563" }}>{post.authorTitle}</div>
              </div>
            </div>
            <a
              href="https://wa.me/573004436649?text=Hola!%20Le%C3%AD%20el%20blog%20y%20quiero%20info%20sobre%20Gym%20Cobalto"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textDecoration: "none", border: "1px solid rgba(22,163,74,.3)", padding: "6px 14px", borderRadius: 8 }}
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </div>

        {/* Article content */}
        <article style={{ maxWidth: 720, margin: "0 auto", padding: "52px 24px 48px" }}>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          {/* CTA block */}
          <div style={{ marginTop: 56, padding: "32px 36px", background: "linear-gradient(135deg, rgba(22,163,74,.08) 0%, rgba(22,163,74,.03) 100%)", border: "1px solid rgba(22,163,74,.2)", borderRadius: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#16A34A", marginBottom: 12 }}>
              Gym Cobalto · Cachipay
            </p>
            <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#fff" }}>¿Listo para empezar?</p>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
              Estamos en Cachipay, Cundinamarca. Escríbenos por WhatsApp y coordinamos tu primera visita — sin compromiso.
            </p>
            <a
              href="https://wa.me/573004436649?text=Hola!%20Le%C3%AD%20el%20blog%20y%20quiero%20info%20sobre%20Gym%20Cobalto"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#16A34A", color: "#fff", padding: "13px 26px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15 }}
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </article>

        {/* More posts */}
        {allPosts.length > 0 && (
          <section style={{ maxWidth: 720, margin: "0 auto 60px", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 26, letterSpacing: 1, color: "#fff", margin: 0 }}>
                MÁS ARTÍCULOS
              </h2>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.06)" }} />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {allPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#111720", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, overflow: "hidden", display: "grid", gridTemplateColumns: "100px 1fr" }}>
                    <div style={{ position: "relative", height: 76 }}>
                      <Image src={p.image} fill sizes="100px" style={{ objectFit: "cover" }} alt={p.title} />
                    </div>
                    <div style={{ padding: "14px 18px" }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: CATEGORY_COLORS[p.category] ?? "#16A34A", marginBottom: 5 }}>{p.category}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#e5e7eb", lineHeight: 1.4 }}>{p.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer style={{ padding: "28px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.05)", color: "#374151", fontSize: 13 }}>
          <Link href="/" style={{ color: "#16A34A", textDecoration: "none", fontWeight: 600 }}>Gym Cobalto</Link>
          {" · "}Calle 3 #1-63, Cachipay, Cundinamarca
        </footer>
      </div>
    </>
  );
}
