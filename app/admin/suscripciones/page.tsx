import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { updateSubscriptionStatus } from "@/lib/actions";

const statusColor = (s: string) => s === "paid" ? "#22c55e" : s === "overdue" ? "#ef4444" : "#f59e0b";
const statusLabel = (s: string) => s === "paid" ? "Pagado" : s === "overdue" ? "Vencido" : "Pendiente";

export default async function SuscripcionesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  let query = supabase
    .from("subscriptions")
    .select("id, user_id, plan_type, start_date, end_date, amount, payment_status, payment_method, notes, created_at")
    .order("end_date", { ascending: true });

  if (status && ["paid", "pending", "overdue"].includes(status)) {
    query = query.eq("payment_status", status);
  }

  const { data: subs } = await query;

  const userIds = [...new Set((subs ?? []).map((s) => s.user_id))];
  const { data: profilesData } = userIds.length > 0
    ? await supabase.from("profiles").select("id, full_name, email").in("id", userIds)
    : { data: [] as { id: string; full_name: string | null; email: string | null }[] };
  const profileMap = Object.fromEntries((profilesData ?? []).map((p) => [p.id, p]));

  const { count: totalActive } = await supabase.from("subscriptions").select("*", { count: "exact", head: true }).gte("end_date", today).eq("payment_status", "paid");
  const { count: totalPending } = await supabase.from("subscriptions").select("*", { count: "exact", head: true }).in("payment_status", ["pending", "overdue"]);
  const { count: expiring } = await supabase.from("subscriptions").select("*", { count: "exact", head: true })
    .gte("end_date", today).lte("end_date", new Date(Date.now() + 7 * 864e5).toISOString().split("T")[0]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 2, color: "#f0f6fc", marginBottom: 4 }}>SUSCRIPCIONES</h1>
          <p style={{ fontSize: 13, color: "#8b949e" }}>{subs?.length ?? 0} registros{status ? ` · filtrado: ${statusLabel(status)}` : ""}</p>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ background: "#0d1117", borderRadius: 10, border: "1px solid rgba(34,197,94,.2)", padding: "16px 20px" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e", fontFamily: "var(--font-display)" }}>{totalActive ?? 0}</div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4, letterSpacing: 0.5 }}>ACTIVAS Y PAGADAS</div>
        </div>
        <div style={{ background: "#0d1117", borderRadius: 10, border: "1px solid rgba(239,68,68,.2)", padding: "16px 20px" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#ef4444", fontFamily: "var(--font-display)" }}>{totalPending ?? 0}</div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4, letterSpacing: 0.5 }}>PENDIENTES / VENCIDAS</div>
        </div>
        <div style={{ background: "#0d1117", borderRadius: 10, border: "1px solid rgba(245,158,11,.2)", padding: "16px 20px" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#f59e0b", fontFamily: "var(--font-display)" }}>{expiring ?? 0}</div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4, letterSpacing: 0.5 }}>VENCEN EN 7 DÍAS</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Todos", value: "" },
          { label: "Pagados", value: "paid" },
          { label: "Pendientes", value: "pending" },
          { label: "Vencidos", value: "overdue" },
        ].map((f) => (
          <Link key={f.value} href={f.value ? `/admin/suscripciones?status=${f.value}` : "/admin/suscripciones"}
            style={{
              padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none",
              background: (status ?? "") === f.value ? "#22c55e" : "rgba(255,255,255,.06)",
              color: (status ?? "") === f.value ? "#000" : "#8b949e",
              border: (status ?? "") === f.value ? "none" : "1px solid rgba(255,255,255,.1)",
            }}>
            {f.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              {["Usuario", "Plan", "Inicio", "Vence", "Monto", "Estado", "Método", "Acciones"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#8b949e", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(subs ?? []).map((s) => {
              const profile = profileMap[s.user_id] ?? null;
              const isExpired = s.end_date < today;
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", background: isExpired && s.payment_status !== "paid" ? "rgba(239,68,68,.03)" : "transparent" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <Link href={`/admin/usuarios/${s.user_id}`} style={{ textDecoration: "none" }}>
                      <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 500 }}>{profile?.full_name ?? "Sin nombre"}</div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{profile?.email}</div>
                    </Link>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e" }}>{s.plan_type}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e", whiteSpace: "nowrap" }}>{s.start_date}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, whiteSpace: "nowrap" }}>
                    <span style={{ color: isExpired ? "#ef4444" : "#f0f6fc" }}>{s.end_date}</span>
                    {isExpired && <span style={{ display: "block", fontSize: 10, color: "#ef4444" }}>VENCIDA</span>}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#f0f6fc", whiteSpace: "nowrap" }}>
                    {s.amount ? `$${Number(s.amount).toLocaleString("es-CO")}` : "—"}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap",
                      background: `${statusColor(s.payment_status)}18`,
                      color: statusColor(s.payment_status),
                      border: `1px solid ${statusColor(s.payment_status)}40`,
                    }}>
                      {statusLabel(s.payment_status)}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e" }}>{s.payment_method ?? "—"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                      {s.payment_status !== "paid" && (
                        <form action={updateSubscriptionStatus.bind(null, s.id, "paid")}>
                          <button type="submit" style={{ padding: "5px 10px", background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.3)", borderRadius: 6, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                            Marcar pagado
                          </button>
                        </form>
                      )}
                      {s.payment_status !== "overdue" && (
                        <form action={updateSubscriptionStatus.bind(null, s.id, "overdue")}>
                          <button type="submit" style={{ padding: "5px 10px", background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.25)", borderRadius: 6, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                            Vencido
                          </button>
                        </form>
                      )}
                      <Link href={`/admin/usuarios/${s.user_id}`} style={{ padding: "5px 10px", background: "rgba(255,255,255,.06)", color: "#8b949e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, fontSize: 11, textDecoration: "none", whiteSpace: "nowrap" }}>
                        Ver usuario
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!subs?.length && (
              <tr>
                <td colSpan={8} style={{ padding: 40, textAlign: "center", fontSize: 14, color: "#8b949e" }}>
                  No hay suscripciones{status ? ` con estado "${statusLabel(status)}"` : ""}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
