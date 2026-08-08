"use client";
import { t } from "@/lib/content";

export default function Services() {
  const s = t.services;
  return (
    <section
      id="servicios"
      aria-label="Servicios"
      style={{ padding: "100px 0" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <p className="section-eyebrow">{s.eyebrow}</p>
        <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{s.title}</h2>
        <p className="section-lead">{s.lead}</p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 20, overflow: "hidden",
        }}>
          {s.items.map((item) => (
            <div
              key={item.name}
              style={{
                background: item.comingSoon ? "rgba(34,197,94,.03)" : "var(--color-ink)",
                padding: "40px 32px",
                position: "relative", overflow: "hidden",
                transition: "background .25s",
                border: item.comingSoon ? "1px dashed rgba(34,197,94,.3)" : "none",
                opacity: item.comingSoon ? .75 : 1,
              }}
              onMouseOver={(e) => { if (!item.comingSoon) (e.currentTarget as HTMLElement).style.background = "var(--color-ink3)"; (e.currentTarget.querySelector(".srv-glow") as HTMLElement | null)?.style && ((e.currentTarget.querySelector(".srv-glow") as HTMLElement).style.opacity = "1"); }}
              onMouseOut={(e) => { if (!item.comingSoon) (e.currentTarget as HTMLElement).style.background = "var(--color-ink)"; (e.currentTarget.querySelector(".srv-glow") as HTMLElement | null)?.style && ((e.currentTarget.querySelector(".srv-glow") as HTMLElement).style.opacity = "0"); }}
            >
              <div className="srv-glow" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
                opacity: 0, transition: "opacity .25s",
              }} />
              <div style={{ fontSize: 32, marginBottom: 20 }}>{item.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1, marginBottom: 12 }}>{item.name}</div>
              <p style={{ fontSize: 14, color: "var(--color-mist)", lineHeight: 1.65 }}>{item.desc}</p>
              <span style={{
                display: "inline-block", marginTop: 16,
                padding: "5px 12px", borderRadius: 999,
                fontSize: 11, fontWeight: 600, letterSpacing: 1,
                background: item.comingSoon ? "rgba(34,197,94,.1)" : "rgba(22,163,74,.2)",
                color: item.comingSoon ? "#4ADE80" : "var(--color-cobalt-bright)",
                textTransform: "uppercase",
              }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:900px){#servicios > div > div:last-child{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
