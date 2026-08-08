import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog de Fitness y Entrenamiento | Gym Cobalto Cachipay",
  description:
    "Artículos de entrenamiento, nutrición y mentalidad escritos por Edwin González, coach certificado de Gym Cobalto en Cachipay, Cundinamarca.",
  alternates: { canonical: `${t.meta.siteUrl}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const CATEGORY_COLORS: Record<string, string> = {
    Bienestar: "#22C55E",
    Entrenamiento: "#3B82F6",
    Mentalidad: "#A855F7",
    "Nutrición y pérdida de grasa": "#F59E0B",
    "Entrenamiento Personal": "#EF4444",
    Motivación: "#EC4899",
  };

  return (
    <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#16A34A", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 24, letterSpacing: 2, textDecoration: "none" }}>
          GYM COBALTO
        </Link>
        <Link href="/#planes" style={{ background: "#16A34A", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
          Ver planes
        </Link>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
        <p style={{ color: "#16A34A", fontWeight: 700, letterSpacing: 3, fontSize: 12, textTransform: "uppercase", marginBottom: 12 }}>
          Cachipay · Cundinamarca
        </p>
        <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1, marginBottom: 12 }}>
          BLOG DE ENTRENAMIENTO
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 48, maxWidth: 560 }}>
          Artículos sobre fitness, fuerza y mentalidad escritos por Edwin González — coach certificado con más de 5 años en Cachipay.
        </p>

        <style>{`.blog-card{background:#161b22;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px 32px;transition:border-color .2s;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}.blog-card:hover{border-color:rgba(22,163,74,.4)}`}</style>
        <div style={{ display: "grid", gap: 24 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article className="blog-card">
                <div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                      color: CATEGORY_COLORS[post.category] ?? "#16A34A",
                      background: `${CATEGORY_COLORS[post.category] ?? "#16A34A"}18`,
                      padding: "3px 10px", borderRadius: 999,
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      {new Date(post.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{post.readingTime}</span>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.6 }}>
                    {post.description}
                  </p>
                  <p style={{ fontSize: 13, color: "#16A34A", marginTop: 16, fontWeight: 600 }}>
                    Por {post.author} →
                  </p>
                </div>
              </article>
            </Link>
          ))}

        </div>
      </div>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.06)", color: "#6b7280", fontSize: 13, marginTop: 48 }}>
        <p>
          <Link href="/" style={{ color: "#16A34A", textDecoration: "none" }}>Gym Cobalto</Link>
          {" · "}Calle 3 #1-63, Cachipay, Cundinamarca
        </p>
      </footer>
    </div>
  );
}
