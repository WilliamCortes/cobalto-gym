import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const today = new Date().toISOString().split("T")[0];

  const [{ data: profile }, { data: subscriptions }] = await Promise.all([
    supabase.from("profiles").select("full_name, email, phone, membership_type, goal").eq("id", user.id).single(),
    supabase.from("subscriptions")
      .select("plan_type, start_date, end_date, payment_status, amount, payment_method")
      .eq("user_id", user.id)
      .eq("payment_status", "paid")
      .order("end_date", { ascending: false })
      .limit(5),
  ]);

  const activeSub = (subscriptions ?? []).find((s) => s.end_date >= today);
  const daysLeft = activeSub
    ? Math.max(0, Math.round((new Date(activeSub.end_date + "T00:00:00").getTime() - new Date(today + "T00:00:00").getTime()) / 86400000))
    : 0;

  const membershipLabel: Record<string, string> = {
    basic: "Básico",
    "semi-asistido": "Semi-asistido",
    personalizado: "Personalizado",
  };

  const planLabel: Record<string, string> = {
    semanal: "Semanal", quincenal: "Quincenal", mensual: "Mensual",
    trimestral: "Trimestral", semestral: "Semestral", anual: "Anual",
    pareja: "En pareja", familiar: "Familiar", "semi-asistido": "Semi-asistido",
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 12 }}>
          TU CUENTA
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 12, lineHeight: 1.1 }}>
          MI PERFIL
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="perfil-grid">
        {/* Profile info */}
        <div style={{ background: "var(--color-ink3)", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ height: 6, background: "linear-gradient(90deg, var(--color-cobalt) 0%, transparent 100%)" }} />
          <div style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700, flexShrink: 0,
              }}>
                {(profile?.full_name ?? user.email ?? "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-snow)", letterSpacing: 1 }}>
                  {profile?.full_name ?? "Sin nombre"}
                </div>
                <div style={{ fontSize: 13, color: "var(--color-mist)", marginTop: 2 }}>
                  {membershipLabel[profile?.membership_type ?? ""] ?? profile?.membership_type ?? "Miembro"}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {[
                { label: "Correo", value: profile?.email ?? user.email },
                { label: "Teléfono", value: profile?.phone || "No registrado" },
                { label: "Objetivo", value: profile?.goal || "No especificado" },
              ].map((field) => (
                <div key={field.label} style={{ padding: "14px 16px", background: "rgba(255,255,255,.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 4 }}>{field.label}</div>
                  <div style={{ fontSize: 14, color: "var(--color-fog)" }}>{field.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <a href="https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20actualizar%20mis%20datos"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                💬 Actualizar datos con Edwin
              </a>
            </div>
          </div>
        </div>

        {/* Subscription info */}
        <div style={{ background: "var(--color-ink3)", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ height: 6, background: activeSub ? "linear-gradient(90deg, #22c55e 0%, transparent 100%)" : "linear-gradient(90deg, #ef4444 0%, transparent 100%)" }} />
          <div style={{ padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 1, color: "var(--color-snow)", marginBottom: 20 }}>
              MEMBRESÍA
            </h2>

            {activeSub ? (
              <>
                <div style={{ padding: "20px", background: "rgba(34,197,94,.06)", borderRadius: 14, border: "1px solid rgba(34,197,94,.2)", marginBottom: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#22c55e", marginBottom: 8, fontWeight: 600 }}>ACCESO ACTIVO</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "#22c55e", lineHeight: 1 }}>{daysLeft}</div>
                  <div style={{ fontSize: 13, color: "var(--color-mist)", marginTop: 4 }}>días restantes</div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    { label: "Plan", value: planLabel[activeSub.plan_type] ?? activeSub.plan_type },
                    { label: "Inicio", value: activeSub.start_date },
                    { label: "Vence", value: activeSub.end_date },
                    { label: "Monto pagado", value: activeSub.amount ? `$${Number(activeSub.amount).toLocaleString("es-CO")}` : "—" },
                    { label: "Método de pago", value: activeSub.payment_method ?? "—" },
                  ].map((f) => (
                    <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,.05)" }}>
                      <span style={{ fontSize: 12, color: "var(--color-mist)", textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</span>
                      <span style={{ fontSize: 13, color: "var(--color-fog)", fontWeight: 500 }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#ef4444", marginBottom: 8 }}>
                  Sin membresía activa
                </div>
                <p style={{ fontSize: 13, color: "var(--color-mist)", marginBottom: 20, lineHeight: 1.6 }}>
                  Tu acceso ha expirado o no tienes una suscripción vigente. Contáctate con Edwin para renovar.
                </p>
                <a href="https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20renovar%20mi%20membresia"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  💬 Renovar con Edwin
                </a>
              </div>
            )}

            {(subscriptions ?? []).length > 1 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 10, fontWeight: 600 }}>Historial</div>
                {(subscriptions ?? []).slice(activeSub ? 1 : 0, 4).map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 12, color: "var(--color-mist)" }}>
                    <span>{planLabel[s.plan_type] ?? s.plan_type} · {s.start_date}</span>
                    <span style={{ color: "var(--color-fog)" }}>{s.end_date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:700px){.perfil-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}
