import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deletePlan, createPlan } from "@/lib/actions";
import { redirect } from "next/navigation";

async function createAndRedirect(formData: FormData) {
  "use server";
  const plan = await createPlan({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
  });
  redirect(`/admin/planes/${plan.id}`);
}

const typeLabel = (t: string) => t === "nutrition" ? "🥗 Nutrición" : t === "training" ? "💪 Entrenamiento" : "⚡ Mixto";
const typeColor = (t: string) => t === "nutrition" ? "#22c55e" : t === "training" ? "#3b82f6" : "#f59e0b";

export default async function PlanesPage() {
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("content_plans")
    .select("id, title, description, type, created_at, plan_modules(id)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 2, color: "#f0f6fc", marginBottom: 28 }}>PLANES</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        {/* Plans list */}
        <div>
          {(plans ?? []).length === 0 && (
            <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: 40, textAlign: "center", color: "#8b949e", fontSize: 14 }}>
              No hay planes creados aún.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(plans ?? []).map((plan) => {
              const modules = plan.plan_modules as unknown as { id: string }[];
              return (
                <div key={plan.id} style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f0f6fc" }}>{plan.title}</h2>
                      <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: `${typeColor(plan.type)}18`, color: typeColor(plan.type), border: `1px solid ${typeColor(plan.type)}40` }}>
                        {typeLabel(plan.type)}
                      </span>
                    </div>
                    {plan.description && <p style={{ fontSize: 12, color: "#8b949e", marginBottom: 6 }}>{plan.description}</p>}
                    <div style={{ fontSize: 11, color: "#30363d" }}>{modules?.length ?? 0} módulos · {new Date(plan.created_at).toLocaleDateString("es-CO")}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
                    <Link href={`/admin/planes/${plan.id}`} style={{ padding: "7px 16px", background: "#22c55e", color: "#000", borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
                      Editar
                    </Link>
                    <form action={deletePlan.bind(null, plan.id)}>
                      <button type="submit" style={{ padding: "7px 12px", background: "rgba(239,68,68,.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create form */}
        <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: 20, position: "sticky", top: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5, marginBottom: 16 }}>NUEVO PLAN</h3>
          <form action={createAndRedirect}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Título</label>
                <input name="title" required style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Tipo</label>
                <select name="type" style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none" }}>
                  <option value="nutrition">🥗 Nutrición</option>
                  <option value="training">💪 Entrenamiento</option>
                  <option value="mixed">⚡ Mixto</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Descripción</label>
                <textarea name="description" rows={3} style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none", resize: "vertical" }} />
              </div>
              <button type="submit" style={{ padding: "11px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Crear Plan →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
