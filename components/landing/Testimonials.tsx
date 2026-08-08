"use client";
import { t } from "@/lib/content";

export default function Testimonials() {
  const test = t.testimonials;
  return (
    <section aria-label="Testimonios" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <p className="section-eyebrow">{test.eyebrow}</p>
        <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{test.title}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {test.items.map((item) => (
            <div
              key={item.author}
              style={{
                background: "var(--color-ink3)", borderRadius: 20,
                padding: 32, border: "1px solid rgba(255,255,255,.06)",
                position: "relative", overflow: "hidden",
                transition: "transform .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                background: "linear-gradient(90deg, var(--color-cobalt) 0%, transparent 100%)",
              }} />
              <div style={{ color: "var(--color-gold)", fontSize: 16, marginBottom: 16, letterSpacing: 2 }}>
                {"★".repeat(item.stars)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-fog)", fontStyle: "italic", marginBottom: 20 }}>
                <span style={{ color: "var(--color-cobalt-bright)", fontSize: 32, lineHeight: 0, verticalAlign: -14, marginRight: 2 }}>"</span>
                {item.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: 18, color: "#fff", flexShrink: 0,
                }}>
                  {item.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{item.author}</div>
                  <div style={{ fontSize: 12, color: "var(--color-mist)" }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
