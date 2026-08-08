import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import CreateUserForm from "@/components/admin/CreateUserForm";

export default async function UsuariosPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email, membership_type, active, role, created_at")
    .order("created_at", { ascending: false });

  const { data: activeSubs } = await supabase
    .from("subscriptions")
    .select("user_id, end_date, payment_status")
    .gte("end_date", today)
    .order("end_date", { ascending: false });

  const subByUser = new Map<string, { end_date: string; payment_status: string }>();
  for (const s of activeSubs ?? []) {
    if (!subByUser.has(s.user_id)) subByUser.set(s.user_id, s);
  }

  const statusColor = (s: string) => s === "paid" ? "#22c55e" : s === "overdue" ? "#ef4444" : "#f59e0b";
  const statusLabel = (s: string) => s === "paid" ? "Pagado" : s === "overdue" ? "Vencido" : "Pendiente";

  function subStatus(userId: string) {
    const sub = subByUser.get(userId);
    if (!sub) return { label: "Sin suscripción", color: "#8b949e", end: null };
    return { label: statusLabel(sub.payment_status), color: statusColor(sub.payment_status), end: sub.end_date };
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 2, color: "#f0f6fc", marginBottom: 4 }}>USUARIOS</h1>
          <p style={{ fontSize: 13, color: "#8b949e" }}>{users?.length ?? 0} usuarios registrados</p>
        </div>
        <CreateUserForm />
      </div>

      <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              {["Usuario", "Tipo", "Estado", "Vence", "Rol", "Acceso", ""].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#8b949e", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((u) => {
              const sub = subStatus(u.id);
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "linear-gradient(135deg, #16a34a, #22c55e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
                      }}>
                        {(u.full_name ?? u.email ?? "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 500 }}>{u.full_name ?? "Sin nombre"}</div>
                        <div style={{ fontSize: 11, color: "#8b949e" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e" }}>{u.membership_type ?? "basic"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: `${sub.color}18`, color: sub.color, border: `1px solid ${sub.color}40` }}>
                      {sub.label}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e" }}>{sub.end ?? "—"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {u.role === "admin" && (
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: "rgba(234,179,8,.12)", color: "#fbbf24", border: "1px solid rgba(234,179,8,.3)" }}>Admin</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: u.active ? "#22c55e" : "#ef4444" }} />
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link href={`/admin/usuarios/${u.id}`} style={{ padding: "6px 14px", background: "rgba(255,255,255,.06)", color: "#f0f6fc", borderRadius: 6, textDecoration: "none", fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,.1)" }}>
                      Ver →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {!users?.length && (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: "center", fontSize: 14, color: "#8b949e" }}>
                  No hay usuarios registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
