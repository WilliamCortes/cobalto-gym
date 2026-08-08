import { t } from "@/lib/content";

export default function Location() {
  const l = t.location;
  return (
    <section id="ubicacion" aria-label="Ubicación" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <p className="section-eyebrow">{l.eyebrow}</p>
        <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{l.title}</h2>
        <p className="section-lead">{l.lead}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="location-grid">
          {/* Map */}
          <div style={{
            borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,.4)",
            aspectRatio: "4/3",
          }}>
            <iframe
              src="https://maps.google.com/maps?q=Gym+Cobalto+Calle+3+Cachipay+Cundinamarca+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ display: "block", filter: "invert(.9) hue-rotate(180deg) saturate(.7)", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gym Cobalto ubicación en Cachipay"
            />
          </div>

          {/* Details */}
          <div>
            <ul style={{ listStyle: "none" }}>
              {l.details.map((d) => (
                <li key={d.label} style={{
                  display: "flex", gap: 14, padding: "18px 0",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  fontSize: 15, color: "var(--color-fog)",
                }}>
                  <span style={{ color: "var(--color-cobalt-bright)", fontSize: 18, flexShrink: 0, width: 24 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--color-mist)", fontWeight: 600, marginBottom: 2 }}>{d.label}</div>
                    {d.href ? (
                      <a href={d.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-cobalt-bright)", fontWeight: 500, textDecoration: "none" }}>{d.value}</a>
                    ) : (
                      <div style={{ color: "var(--color-snow)", fontWeight: 500, whiteSpace: "pre-line" }}>{d.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={`${t.brand.whatsapp}?text=Hola!%20Quisiera%20ir%20a%20Gym%20Cobalto`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25D366", color: "#fff",
                  padding: "14px 24px", borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(37,211,102,.3)",
                }}
              >
                💬 {l.ctaWrite}
              </a>
              <a
                href={t.brand.instagram}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "transparent", color: "var(--color-snow)",
                  padding: "14px 24px", borderRadius: 12,
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                📸 {l.ctaIG}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.location-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
