import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog de Fitness y Entrenamiento | Gym Cobalto Cachipay",
  description:
    "Artículos de entrenamiento, nutrición y mentalidad escritos por Edwin González, coach certificado de Gym Cobalto en Cachipay, Cundinamarca.",
  alternates: { canonical: `${t.meta.siteUrl}/blog` },
};

const CATEGORY_COLORS: Record<string, string> = {
  Bienestar: "#22C55E",
  Entrenamiento: "#3B82F6",
  Mentalidad: "#A855F7",
  "Nutrición y pérdida de grasa": "#F59E0B",
  "Entrenamiento Personal": "#EF4444",
  Motivación: "#EC4899",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

      <style>{`
        .featured-card { transition: opacity .25s; }
        .featured-card:hover { opacity: .92; }
        .post-card { background: #111720; border: 1px solid rgba(255,255,255,.07); border-radius: 16px; overflow: hidden; transition: border-color .25s, transform .25s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: rgba(22,163,74,.45); transform: translateY(-5px); }
        .post-card-img { overflow: hidden; position: relative; height: 176px; }
        .post-card-img img { transition: transform .4s ease !important; }
        .post-card:hover .post-card-img img { transform: scale(1.06) !important; }
        .blog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } .featured-text { max-width: 100% !important; padding: 28px !important; } .featured-wrap { height: min(380px, 80vw) !important; } }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,.07)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(13,17,23,.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <Link href="/" style={{ color: "#fff", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 22, letterSpacing: 3, textDecoration: "none" }}>
          GYM <span style={{ color: "#16A34A" }}>COBALTO</span>
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>← Inicio</Link>
          <Link href="/#planes" style={{ background: "#16A34A", color: "#fff", padding: "9px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
            Ver planes
          </Link>
        </div>
      </header>

      {/* Page headline */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "52px 24px 36px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(52px, 9vw, 108px)", lineHeight: 0.88, color: "#fff", margin: 0 }}>
            BLOG<br />ENTRENA<span style={{ color: "#16A34A" }}>MIENTO</span>
          </h1>
          <p style={{ color: "#4b5563", fontSize: 14, maxWidth: 280, lineHeight: 1.7 }}>
            Por Edwin González — coach certificado con más de 5 años formando atletas en Cachipay, Cundinamarca.
          </p>
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 44px" }}>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <article className="featured-card" style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
              <div className="featured-wrap" style={{ height: "min(500px, 58vw)", minHeight: 280, position: "relative" }}>
                <Image
                  src={featured.image}
                  fill
                  sizes="(max-width: 1240px) 100vw, 1240px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  alt={featured.title}
                  priority
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(13,17,23,.98) 0%, rgba(13,17,23,.88) 38%, rgba(13,17,23,.35) 70%, rgba(13,17,23,.0) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,17,23,.6) 0%, transparent 40%)" }} />

                <div className="featured-text" style={{ position: "absolute", bottom: 0, left: 0, padding: "44px 52px", maxWidth: "58%" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                      color: CATEGORY_COLORS[featured.category] ?? "#16A34A",
                      background: `${CATEGORY_COLORS[featured.category] ?? "#16A34A"}22`,
                      border: `1px solid ${CATEGORY_COLORS[featured.category] ?? "#16A34A"}44`,
                      padding: "4px 12px", borderRadius: 999,
                    }}>
                      {featured.category}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.3)", display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>
                      {new Date(featured.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>{featured.readingTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(26px, 3.5vw, 50px)", lineHeight: 1, color: "#fff", marginBottom: 16 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
                    {featured.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#16A34A,#052e16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 14, color: "#fff", flexShrink: 0 }}>EG</div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 600 }}>{featured.author}</span>
                    <span style={{ fontSize: 13, color: "#16A34A", fontWeight: 700, marginLeft: 8 }}>Leer artículo →</span>
                  </div>
                </div>

                <div style={{ position: "absolute", top: 24, right: 24, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.9)", background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.15)", padding: "5px 12px", borderRadius: 6 }}>
                  Destacado
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#4b5563" }}>
              Más artículos
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.06)" }} />
          </div>
          <div className="blog-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article className="post-card">
                  <div className="post-card-img">
                    <Image
                      src={post.image}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      alt={post.title}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,17,23,.5) 0%, transparent 50%)", pointerEvents: "none" }} />
                  </div>
                  <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                        color: CATEGORY_COLORS[post.category] ?? "#16A34A",
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 10, color: "#374151" }}>·</span>
                      <span style={{ fontSize: 10, color: "#374151" }}>{post.readingTime}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#e5e7eb", lineHeight: 1.45, marginBottom: 10, flex: 1 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 11, color: "#374151" }}>
                      {new Date(post.date).toLocaleDateString("es-CO", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      <footer style={{ padding: "28px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.05)", color: "#374151", fontSize: 13 }}>
        <Link href="/" style={{ color: "#16A34A", textDecoration: "none", fontWeight: 600 }}>Gym Cobalto</Link>
        {" · "}Calle 3 #1-63, Cachipay, Cundinamarca
      </footer>
    </div>
  );
}
