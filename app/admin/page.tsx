import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function StatCard({ label, value, color, href }: { label: string; value: number | string; color: string; href?: string }) {
  const card = (
    <div style={{
      background: "#0d1117", borderRadius: 12, padding: "20px 24px",
      border: `1px solid ${color}30`,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: "var(--font-display)", letterSpacing: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#8b949e", fontWeight: 500, letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
  return href ? <Link href={href} style={{ textDecoration: "none" }}>{card}</Link> : card;
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const in7days = new Date(Date.now() + 7 * 864e5).toISOString().split("T")[0];

  const [
    { count: totalUsers },
    { count: activeSubs },
    { count: expiringSoon },
    { count: pendingPayments },
    { count: totalPlans },
    { data: recentUsers },
    { data: recentSubs },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("subscriptions").select("*", { count: "exact", head: true })
      .gte("end_date", today).eq("payment_status", "paid"),
    supabase.from("subscriptions").select("*", { count: "exact", head: true })
      .gte("end_date", today).lte("end_date", in7days),
    supabase.from("subscriptions").select("*", { count: "exact", head: true })
      .in("payment_status", ["pending", "overdue"]),
    supabase.from("content_plans").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("id, full_name, email, active, created_at")
      .order("created_at", { ascending: false }).limit(5),
    supabase.from("subscriptions").select("id, user_id, plan_type, end_date, payment_status")
      .order("created_at", { ascending: false }).limit(5),
  ]);

  const recentSubUserIds = Array.from(new Set((recentSubs ?? []).map((s) => s.user_id)));
  const { data: recentSubProfiles } = recentSubUserIds.length > 0
    ? await supabase.from("profiles").select("id, full_name, email").in("id", recentSubUserIds)
    : { data: [] as { id: string; full_name: string | null; email: string | null }[] };
  const subProfileMap = Object.fromEntries((recentSubProfiles ?? []).map((p) => [p.id, p]));

  const statusColor = (s: string) => s === "paid" ? "#22c55e" : s === "overdue" ? "#ef4444" : "#f59e0b";
  const statusLabel = (s: string) => s === "paid" ? "Pagado" : s === "overdue" ? "Vencido" : "Pendiente";

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 2, color: "#f0f6fc", marginBottom: 4 }}>
          DASHBOARD
        </h1>
        <p style={{ fontSize: 13, color: "#8b949e" }}>
          {new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 40 }}>
        <StatCard label="Total Usuarios" value={totalUsers ?? 0} color="#22c55e" href="/admin/usuarios" />
        <StatCard label="Suscripciones Activas" value={activeSubs ?? 0} color="#3b82f6" href="/admin/suscripciones" />
        <StatCard label="Vencen en 7 días" value={expiringSoon ?? 0} color="#f59e0b" href="/admin/suscripciones" />
        <StatCard label="Pagos Pendientes" value={pendingPayments ?? 0} color="#ef4444" href="/admin/suscripciones" />
        <StatCard label="Planes Creados" value={totalPlans ?? 0} color="#a855f7" href="/admin/planes" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent users */}
        <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5 }}>Usuarios Recientes</h2>
            <Link href="/admin/usuarios" style={{ fontSize: 12, color: "#22c55e", textDecoration: "none" }}>Ver todos →</Link>
          </div>
          <div>
            {(recentUsers ?? []).map((u) => (
              <Link key={u.id} href={`/admin/usuarios/${u.id}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,.04)", textDecoration: "none" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>
                  {(u.full_name ?? u.email ?? "?").charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {u.full_name ?? "Sin nombre"}
                  </div>
                  <div style={{ fontSize: 11, color: "#8b949e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: u.active ? "#22c55e" : "#ef4444", flexShrink: 0 }} />
              </Link>
            ))}
            {!recentUsers?.length && (
              <div style={{ padding: 24, textAlign: "center", fontSize: 13, color: "#8b949e" }}>Sin usuarios aún</div>
            )}
          </div>
        </div>

        {/* Recent subscriptions */}
        <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5 }}>Suscripciones Recientes</h2>
            <Link href="/admin/suscripciones" style={{ fontSize: 12, color: "#22c55e", textDecoration: "none" }}>Ver todas →</Link>
          </div>
          <div>
            {(recentSubs ?? []).map((s) => {
              const profile = subProfileMap[s.user_id] ?? null;
              return (
                <Link key={s.id} href={`/admin/usuarios/${s.user_id}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,.04)", textDecoration: "none" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 500 }}>{profile?.full_name ?? profile?.email ?? "Usuario"}</div>
                    <div style={{ fontSize: 11, color: "#8b949e" }}>{s.plan_type} · vence {s.end_date}</div>
                  </div>
                  <span style={{
                    padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                    background: `${statusColor(s.payment_status)}18`,
                    color: statusColor(s.payment_status),
                    border: `1px solid ${statusColor(s.payment_status)}40`,
                  }}>
                    {statusLabel(s.payment_status)}
                  </span>
                </Link>
              );
            })}
            {!recentSubs?.length && (
              <div style={{ padding: 24, textAlign: "center", fontSize: 13, color: "#8b949e" }}>Sin suscripciones aún</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/admin/usuarios" style={{ padding: "10px 20px", background: "#22c55e", color: "#000", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
          + Gestionar Usuarios
        </Link>
        <Link href="/admin/planes" style={{ padding: "10px 20px", background: "rgba(168,85,247,.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,.3)", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
          + Crear Plan
        </Link>
        <a
          href="https://supabase.com/dashboard/project/bowtvdvkrmiljnqcyxnr/auth/users"
          target="_blank" rel="noopener noreferrer"
          style={{ padding: "10px 20px", background: "rgba(255,255,255,.05)", color: "#8b949e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
        >
          🔑 Crear usuario (Supabase) ↗
        </a>
      </div>
    </div>
  );
}
