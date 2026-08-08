import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RutinasPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: assignments } = await supabase
    .from("user_plan_assignments")
    .select("plan_id, active, content_plans(id, title, description, type)")
    .eq("user_id", user.id)
    .eq("active", true);

  const plans = (assignments ?? [])
    .map((a) => (a.content_plans as unknown) as { id: string; title: string; description: string | null; type: string } | null)
    .filter(Boolean)
    .filter((p) => p!.type === "training" || p!.type === "mixto") as { id: string; title: string; description: string | null; type: string }[];

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 12 }}>
          TU ENTRENAMIENTO
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 12, lineHeight: 1.1 }}>
          MIS RUTINAS
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-mist)", maxWidth: 560, lineHeight: 1.7 }}>
          Planes de entrenamiento asignados por Edwin para alcanzar tus objetivos.
        </p>
      </div>

      {plans.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {plans.map((plan) => (
            <Link key={plan.id} href={`/portal/planes/${plan.id}`} style={{
              display: "block", borderRadius: 20, overflow: "hidden",
              background: "var(--color-ink3)", border: "1px solid rgba(255,255,255,.07)",
              textDecoration: "none",
            }}>
              <div style={{ height: 6, background: "linear-gradient(90deg, #3b82f6 0%, transparent 100%)" }} />
              <div style={{ padding: "28px 28px 32px" }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", background: "rgba(59,130,246,.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,.3)" }}>
                  💪 {plan.type === "mixto" ? "Mixto" : "Entrenamiento"}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: 1, color: "var(--color-snow)", margin: "16px 0 10px", lineHeight: 1.2 }}>
                  {plan.title}
                </h2>
                {plan.description && (
                  <p style={{ fontSize: 14, color: "var(--color-mist)", lineHeight: 1.65, marginBottom: 20 }}>
                    {plan.description}
                  </p>
                )}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa" }}>Ver plan →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ padding: "60px 40px", textAlign: "center", background: "var(--color-ink3)", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💪</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-snow)", marginBottom: 8 }}>
            Aún no tienes rutinas asignadas
          </div>
          <p style={{ fontSize: 14, color: "var(--color-mist)", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
            Edwin te asignará tu plan de entrenamiento personalizado. Escríbele para comenzar.
          </p>
          <a href="https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20mi%20rutina%20de%20entrenamiento"
            target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            💬 Pedir mi rutina a Edwin
          </a>
        </div>
      )}
    </div>
  );
}
