import { t } from "@/lib/content";

export default function CtaSection() {
  const c = t.cta;
  return (
    <section
      aria-label="Llamado a la acción"
      style={{
        padding: "120px 24px",
        background: "linear-gradient(135deg, var(--color-cobalt-deep) 0%, var(--color-ink) 60%)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative radial */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(22,163,74,.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <p className="section-eyebrow" style={{ display: "block" }}>{c.eyebrow}</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 9vw, 110px)",
          lineHeight: .92, letterSpacing: 2, color: "var(--color-snow)", marginBottom: 32,
          whiteSpace: "pre-line",
        }}>
          {c.title.split("\n")[0]}<br />
          <span style={{ color: "var(--color-cobalt-bright)" }}>{c.title.split("\n")[1]}</span>
        </h2>
        <p
          style={{ fontSize: 18, color: "var(--color-fog)", lineHeight: 1.65, marginBottom: 48 }}
          dangerouslySetInnerHTML={{ __html: c.sub.replace(/\n/g, "<br/>") }}
        />

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={c.primaryHref}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#25D366", color: "#fff",
              padding: "20px 40px", borderRadius: 12,
              fontWeight: 700, fontSize: 18, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(37,211,102,.4)",
              transition: "all .25s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#1da851"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.transform = "none"; }}
          >
            💬 {c.primary}
          </a>
          <a
            href={c.secondaryHref}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "var(--color-snow)",
              padding: "20px 32px", borderRadius: 12,
              fontWeight: 600, fontSize: 16, textDecoration: "none",
              border: "1px solid rgba(255,255,255,.2)",
              transition: "all .25s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.background = "transparent"; }}
          >
            📸 {c.secondary}
          </a>
        </div>

        <div style={{ marginTop: 64, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {c.bullets.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-mist)" }}>
              <span style={{ color: "var(--color-cobalt-bright)" }}>✓</span> {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
