import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { t } from "@/lib/content";

export default async function PortalDashboard() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const d = t.portal.dashboard;
  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Afiliado";

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,48px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 8 }}>
          {d.welcome} <span style={{ color: "var(--color-cobalt-bright)" }}>{displayName}!</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-mist)" }}>{d.subtitle}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 40 }} className="stats-grid">
        {[
          { label: "Días activos", value: "—", icon: "🏋️" },
          { label: "Semana actual", value: "—", icon: "📅" },
          { label: "Plan activo", value: "Básico", icon: "⭐" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "var(--color-ink3)", borderRadius: 16,
            padding: "24px", border: "1px solid rgba(255,255,255,.07)",
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{stat.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-snow)", marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: "var(--color-mist)", letterSpacing: 1, textTransform: "uppercase" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: 1, color: "var(--color-snow)", marginBottom: 20 }}>
        Acceso rápido
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 40 }}>
        {d.quickLinks.map((ql) => (
          <Link
            key={ql.href}
            href={ql.href}
            style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "var(--color-ink3)", borderRadius: 16,
              padding: "24px", border: "1px solid rgba(255,255,255,.07)",
              textDecoration: "none", transition: "all .2s",
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(22,163,74,.4)"; e.currentTarget.style.background = "var(--color-ink2)"; }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; e.currentTarget.style.background = "var(--color-ink3)"; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "rgba(22,163,74,.15)", border: "1px solid rgba(22,163,74,.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}>{ql.icon}</div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-fog)" }}>{ql.label}</span>
          </Link>
        ))}
      </div>

      {/* Motivational banner */}
      <div style={{
        borderRadius: 20, padding: "32px 40px",
        background: "linear-gradient(135deg, var(--color-cobalt-deep) 0%, var(--color-ink3) 100%)",
        border: "1px solid rgba(22,163,74,.3)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-display)", fontSize: 120, color: "rgba(22,163,74,.07)", lineHeight: 1,
          pointerEvents: "none",
        }}>Co</div>
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,36px)", color: "var(--color-snow)", letterSpacing: 1, marginBottom: 12 }}>
            TU PROGRESO NO ESPERA
          </div>
          <p style={{ fontSize: 15, color: "var(--color-mist)", maxWidth: 480, marginBottom: 20, lineHeight: 1.6 }}>
            Cada día que entrenas es un día que te acercas a tu mejor versión. Revisa tu plan de nutrición y mantente en el camino.
          </p>
          <Link
            href="/portal/planes"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--color-cobalt)", color: "#fff",
              padding: "12px 24px", borderRadius: 10,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}
          >
            🥗 Ver mi plan de nutrición →
          </Link>
        </div>
      </div>

      <style>{`@media(max-width:700px){.stats-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
