import { t } from "@/lib/content";

export default function Story() {
  const s = t.story;
  return (
    <section aria-label="Historia de Gym Cobalto" style={{ padding: "100px 0", background: "var(--color-ink2)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="story-grid">
          {/* Visual side */}
          <div>
            <div style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              background: "linear-gradient(160deg, var(--color-cobalt-deep) 0%, var(--color-ink3) 100%)",
              padding: "48px 40px",
              border: "1px solid rgba(22,163,74,.2)",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
              }} />
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px,3vw,36px)",
                lineHeight: 1.2, color: "var(--color-cobalt-bright)",
                marginBottom: 32,
              }}>
                {s.quote}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: 20, color: "#fff",
                }}>E</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.brand.founder}</div>
                  <div style={{ fontSize: 12, color: "var(--color-mist)" }}>{s.quoteAuthor.split(",")[1]?.trim()}</div>
                </div>
              </div>

              {/* Milestones */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}>
                {s.milestones.map((m) => (
                  <div key={m.year} style={{
                    flex: 1, minWidth: 80, textAlign: "center",
                    background: "rgba(255,255,255,.04)", borderRadius: 12,
                    padding: "14px 10px", border: "1px solid rgba(255,255,255,.08)",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-cobalt-bright)" }}>{m.year}</div>
                    <div style={{ fontSize: 11, color: "var(--color-mist)", marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="section-eyebrow">{s.eyebrow}</p>
            <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{s.title}</h2>
            {s.paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: 16, color: "var(--color-fog)", lineHeight: 1.75, marginBottom: 20 }}>{para}</p>
            ))}
            <a
              href={t.brand.instagram}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,.2)", color: "var(--color-snow)",
                textDecoration: "none", fontSize: 14, fontWeight: 600,
                transition: "all .25s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.background = "transparent"; }}
            >
              📸 Nuestra historia en Instagram
            </a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.story-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
