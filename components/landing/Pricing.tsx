"use client";
import { t } from "@/lib/content";

const WA_BASE = "https://wa.me/573004436649?text=Hola!%20";

export default function Pricing() {
  const p = t.pricing;
  return (
    <section id="planes" aria-label="Planes y precios" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <p className="section-eyebrow">{p.eyebrow}</p>
        <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{p.title}</h2>
        <p className="section-lead">{p.lead}</p>

        {/* Quick access: Día, Semana, Quincena */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }} className="quick-plans-grid">
          {p.quickPlans.map((qp) => (
            <a
              key={qp.name}
              href={`${WA_BASE}${qp.waText}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: "var(--color-ink3)", borderRadius: 12,
                padding: "20px 24px", border: "1px solid rgba(255,255,255,.07)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                textDecoration: "none", transition: "border-color .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(22,163,74,.4)")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.07)")}
            >
              <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--color-mist)", fontWeight: 600 }}>{qp.name}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--color-snow)" }}>{qp.price}</span>
            </a>
          ))}
        </div>

        {/* Main monthly plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {p.mainPlans.map((plan) => (
            <div
              key={plan.name}
              style={{
                borderRadius: 20,
                padding: "40px 32px",
                background: plan.featured
                  ? "linear-gradient(160deg, var(--color-cobalt-deep) 0%, var(--color-ink3) 100%)"
                  : "var(--color-ink3)",
                border: plan.featured ? "1px solid var(--color-cobalt)" : "1px solid rgba(255,255,255,.07)",
                boxShadow: plan.featured ? "0 0 60px rgba(22,163,74,.3)" : "none",
                position: "relative",
                transition: "transform .25s, box-shadow .25s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                if (plan.featured) (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 80px rgba(22,163,74,.45)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                if (plan.featured) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(22,163,74,.3)";
              }}
            >
              {plan.featured && plan.badge && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "var(--color-cobalt-bright)", color: "#fff",
                  padding: "5px 18px", borderRadius: 999,
                  fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}
              <div style={{ fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 16 }}>{plan.name}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,64px)", lineHeight: 1, color: "var(--color-snow)", marginBottom: 6 }}>
                <sup style={{ fontSize: 22, color: "var(--color-mist)" }}>$</sup>{plan.price}
              </div>
              <div style={{ fontSize: 13, color: "var(--color-mist)", marginBottom: 32 }}>{plan.period}</div>
              <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: 28 }} />
              <ul style={{ listStyle: "none", marginBottom: 36 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    fontSize: 14, color: "var(--color-fog)",
                    padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)",
                  }}>
                    <span style={{ color: f.included ? "var(--color-cobalt-bright)" : "var(--color-steel)", flexShrink: 0, marginTop: 1 }}>
                      {f.included ? "✓" : "—"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a
                href={`${WA_BASE}${plan.waText}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", textAlign: "center",
                  padding: 15, borderRadius: 12,
                  fontWeight: 700, fontSize: 15, letterSpacing: ".5px",
                  textDecoration: "none",
                  ...(plan.featured
                    ? { background: "var(--color-cobalt)", color: "#fff", boxShadow: "0 6px 24px rgba(22,163,74,.4)" }
                    : { background: "transparent", color: "var(--color-snow)", border: "1px solid rgba(255,255,255,.2)" }),
                }}
              >
                {plan.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        {/* Duration strip */}
        <div style={{ marginTop: 28, padding: "28px 32px", background: "var(--color-ink3)", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 20 }}>
            {p.durationTitle}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="duration-grid">
            {p.durationPlans.map((dp) => (
              <div
                key={dp.label}
                style={{
                  textAlign: "center", padding: "20px 16px",
                  background: dp.best ? "rgba(22,163,74,.08)" : "var(--color-ink2)",
                  borderRadius: 12,
                  border: dp.best ? "1px solid var(--color-cobalt)" : "1px solid rgba(255,255,255,.06)",
                }}
              >
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--color-mist)", marginBottom: 8 }}>{dp.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: dp.best ? "var(--color-cobalt-bright)" : "var(--color-snow)", display: "block" }}>{dp.price}</div>
                <div style={{ fontSize: 11, color: "var(--color-mist)", marginTop: 4 }}>{dp.perMonth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Group plans */}
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="group-plans-grid">
          {p.groupPlans.map((gp) => (
            <a
              key={gp.name}
              href={`${WA_BASE}${gp.waText}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: "var(--color-ink3)", borderRadius: 12,
                padding: "20px 24px", border: "1px solid rgba(255,255,255,.07)",
                display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
                textDecoration: "none", transition: "border-color .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(22,163,74,.3)")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.07)")}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fog)", marginBottom: 2 }}>{gp.icon} {gp.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-mist)" }}>{gp.note}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-cobalt-bright)", whiteSpace: "nowrap" }}>{gp.price}</div>
            </a>
          ))}
        </div>

        {/* Payment methods */}
        <div style={{ marginTop: 32, padding: "28px 32px", background: "rgba(22,163,74,.06)", borderRadius: 20, border: "1px solid rgba(22,163,74,.2)" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 16 }}>{p.paymentTitle}</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }} className="payment-methods-flex">
            {p.paymentMethods.map((pm) => (
              <div
                key={pm.label}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "var(--color-ink3)", borderRadius: 12,
                  padding: "14px 20px", border: "1px solid rgba(255,255,255,.07)",
                  flex: 1, minWidth: 170,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-fog)" }}>{pm.label}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--color-cobalt-bright)", marginLeft: "auto" }}>{pm.number}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--color-mist)", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: p.paymentNote }} />
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          .quick-plans-grid,.duration-grid,.group-plans-grid,.payment-methods-flex{grid-template-columns:1fr!important;flex-direction:column!important;}
        }
      `}</style>
    </section>
  );
}
