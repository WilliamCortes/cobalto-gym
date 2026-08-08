import Link from "next/link";
import { t } from "@/lib/content";

const colorMap: Record<string, { bg: string; border: string; accent: string }> = {
  green: { bg: "rgba(22,163,74,.1)", border: "rgba(22,163,74,.3)", accent: "var(--color-cobalt-bright)" },
  blue:  { bg: "rgba(59,130,246,.1)", border: "rgba(59,130,246,.3)", accent: "#60A5FA" },
  orange:{ bg: "rgba(251,146,60,.1)", border: "rgba(251,146,60,.3)", accent: "#FB923C" },
};

export default function PlanesPage() {
  const p = t.portal.plans;
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 12 }}>
          {p.eyebrow}
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 12, lineHeight: 1.1 }}>
          {p.title.split("\n").map((line, i) => <span key={i}>{line}{i < p.title.split("\n").length - 1 && <br />}</span>)}
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-mist)", maxWidth: 560, lineHeight: 1.7 }}>{p.lead}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
        {p.modules.map((mod) => {
          const colors = colorMap[mod.color] ?? colorMap.green;
          return (
            <Link
              key={mod.slug}
              href={`/portal/planes/${mod.slug}`}
              style={{
                display: "block", borderRadius: 20, overflow: "hidden",
                background: "var(--color-ink3)", border: `1px solid rgba(255,255,255,.07)`,
                textDecoration: "none", transition: "transform .2s, box-shadow .2s",
              }}
              onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,.3)"; }}
              onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Header band */}
              <div style={{
                height: 6,
                background: `linear-gradient(90deg, ${colors.accent} 0%, transparent 100%)`,
              }} />

              <div style={{ padding: "28px 28px 32px" }}>
                {/* Tag + level */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 999,
                    fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                    background: colors.bg, color: colors.accent, border: `1px solid ${colors.border}`,
                  }}>{mod.tag}</span>
                  <span style={{
                    padding: "4px 12px", borderRadius: 999,
                    fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                    background: "rgba(255,255,255,.06)", color: "var(--color-mist)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}>{mod.level}</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 1, color: "var(--color-snow)", marginBottom: 12, lineHeight: 1.2 }}>
                  {mod.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--color-mist)", lineHeight: 1.65, marginBottom: 24 }}>
                  {mod.desc}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-fog)" }}>
                    📅 <span>{mod.weeks} semanas</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.accent }}>
                    Ver plan →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Contact Edwin if no plans */}
      <div style={{
        marginTop: 40, padding: "28px 32px", borderRadius: 16,
        background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.2)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-snow)", marginBottom: 4 }}>¿Necesitas un plan personalizado?</div>
          <div style={{ fontSize: 13, color: "var(--color-mist)" }}>Edwin puede diseñarte un plan de nutrición 100% a tu medida y objetivos.</div>
        </div>
        <a
          href={`https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20un%20plan%20de%20nutrici%C3%B3n%20personalizado`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#25D366", color: "#fff",
            padding: "12px 20px", borderRadius: 10,
            fontSize: 14, fontWeight: 700, textDecoration: "none",
          }}
        >
          💬 Contactar a Edwin
        </a>
      </div>
    </div>
  );
}
