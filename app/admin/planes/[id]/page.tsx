import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { updatePlan, createModule, updateModule, deleteModule } from "@/lib/actions";

interface Props { params: Promise<{ id: string }> }
type Mod = { id: string; week_number: number; day_name: string | null; sort_order: number; title: string; content: string | null; video_url: string | null };

const typeLabel = (t: string) => t === "nutrition" ? "🥗 Nutrición" : t === "training" ? "💪 Entrenamiento" : "⚡ Mixto";

function Field({ label, name, defaultValue, type = "text", required, placeholder }: {
  label: string; name: string; defaultValue?: string | null; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
      <input name={name} type={type} defaultValue={defaultValue ?? ""} required={required} placeholder={placeholder}
        style={{ width: "100%", padding: "9px 12px", background: "#0d1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, color: "#f0f6fc", fontSize: 12, outline: "none" }} />
    </div>
  );
}

export default async function PlanEditorPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: plan }, { data: modules }] = await Promise.all([
    supabase.from("content_plans").select("*").eq("id", id).single(),
    supabase.from("plan_modules").select("*").eq("plan_id", id).order("week_number").order("sort_order"),
  ]);

  if (!plan) notFound();

  const mods = (modules ?? []) as Mod[];
  const weeks = [...new Set(mods.map((m) => m.week_number))].sort((a, b) => a - b);
  const maxWeek = weeks.length > 0 ? Math.max(...weeks) : 0;

  async function handleUpdatePlan(formData: FormData) {
    "use server";
    await updatePlan(id, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
    });
    redirect(`/admin/planes/${id}`);
  }

  async function handleCreateModule(formData: FormData) {
    "use server";
    await createModule({
      plan_id: formData.get("plan_id") as string,
      week_number: Number(formData.get("week_number") ?? 1),
      day_name: (formData.get("day_name") as string) || null,
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || null,
      video_url: (formData.get("video_url") as string) || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
    });
    redirect(`/admin/planes/${id}`);
  }

  async function handleUpdateModule(formData: FormData) {
    "use server";
    const modId = formData.get("module_id") as string;
    await updateModule(modId, id, {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || null,
      video_url: (formData.get("video_url") as string) || null,
    });
  }

  async function handleDeleteModule(formData: FormData) {
    "use server";
    const modId = formData.get("module_id") as string;
    await deleteModule(modId, id);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Link href="/admin/planes" style={{ color: "#8b949e", textDecoration: "none", fontSize: 13 }}>← Planes</Link>
        <span style={{ color: "#30363d" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1, color: "#f0f6fc" }}>{plan.title}</h1>
        <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.25)" }}>
          {typeLabel(plan.type)}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
        <div>
          {/* Add module form */}
          <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5, marginBottom: 14 }}>+ AGREGAR MÓDULO</h3>
            <form action={handleCreateModule}>
              <input type="hidden" name="plan_id" value={id} />
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 10, marginBottom: 10 }}>
                <Field label="Semana" name="week_number" type="number" defaultValue={String(maxWeek + 1)} required />
                <Field label="Día" name="day_name" placeholder="Lunes, Martes…" />
                <Field label="Orden" name="sort_order" type="number" defaultValue="0" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Field label="Título del módulo" name="title" required />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 5, textTransform: "uppercase" }}>Contenido (texto libre)</label>
                <textarea name="content" rows={5} placeholder="Desayuno: 2 huevos + avena…&#10;Almuerzo: Pollo + arroz integral…"
                  style={{ width: "100%", padding: "9px 12px", background: "#0d1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, color: "#f0f6fc", fontSize: 12, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              </div>
              <Field label="URL de Video (YouTube embed)" name="video_url" placeholder="https://www.youtube.com/embed/..." />
              <button type="submit" style={{ marginTop: 14, width: "100%", padding: "10px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Agregar Módulo
              </button>
            </form>
          </div>

          {/* Modules by week */}
          {weeks.map((week) => {
            const weekModules = mods.filter((m) => m.week_number === week);
            return (
              <div key={week} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 16, color: "#22c55e" }}>
                    {week}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f6fc" }}>Semana {week}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {weekModules.map((mod) => (
                    <div key={mod.id} style={{ background: "#0d1117", borderRadius: 10, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{mod.day_name || `Módulo ${mod.sort_order + 1}`}</span>
                          <span style={{ fontSize: 12, color: "#8b949e", marginLeft: 8 }}>{mod.title}</span>
                        </div>
                        <form action={handleDeleteModule}>
                          <input type="hidden" name="module_id" value={mod.id} />
                          <button type="submit" style={{ background: "rgba(239,68,68,.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                            Eliminar
                          </button>
                        </form>
                      </div>
                      {mod.content && (
                        <div style={{ padding: "10px 16px", fontSize: 12, color: "#8b949e", whiteSpace: "pre-wrap", borderBottom: mod.video_url ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                          {mod.content}
                        </div>
                      )}
                      {mod.video_url && (
                        <div style={{ padding: "12px 16px" }}>
                          <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", background: "#161b22" }}>
                            <iframe src={mod.video_url} width="100%" height="100%" style={{ border: 0, display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={mod.title} />
                          </div>
                        </div>
                      )}
                      <details style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                        <summary style={{ padding: "8px 16px", fontSize: 11, color: "#8b949e", cursor: "pointer", listStyle: "none" }}>✏️ Editar módulo</summary>
                        <form action={handleUpdateModule} style={{ padding: "12px 16px", display: "grid", gap: 10 }}>
                          <input type="hidden" name="module_id" value={mod.id} />
                          <Field label="Título" name="title" defaultValue={mod.title} />
                          <div>
                            <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 5, textTransform: "uppercase" }}>Contenido</label>
                            <textarea name="content" rows={5} defaultValue={mod.content ?? ""}
                              style={{ width: "100%", padding: "9px 12px", background: "#0d1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, color: "#f0f6fc", fontSize: 12, outline: "none", resize: "vertical" }} />
                          </div>
                          <Field label="URL Video YouTube" name="video_url" defaultValue={mod.video_url} />
                          <button type="submit" style={{ padding: "8px", background: "#22c55e", color: "#000", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            Guardar cambios
                          </button>
                        </form>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {mods.length === 0 && (
            <div style={{ textAlign: "center", padding: 32, color: "#8b949e", fontSize: 14 }}>
              Agrega el primer módulo usando el formulario de arriba.
            </div>
          )}
        </div>

        {/* Plan settings sidebar */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5, marginBottom: 14 }}>CONFIGURACIÓN DEL PLAN</h3>
            <form action={handleUpdatePlan}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Field label="Título" name="title" defaultValue={plan.title} required />
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 5, textTransform: "uppercase" }}>Descripción</label>
                  <textarea name="description" rows={3} defaultValue={plan.description ?? ""}
                    style={{ width: "100%", padding: "9px 12px", background: "#0d1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, color: "#f0f6fc", fontSize: 12, outline: "none", resize: "vertical" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 5, textTransform: "uppercase" }}>Tipo</label>
                  <select name="type" defaultValue={plan.type} style={{ width: "100%", padding: "9px 12px", background: "#0d1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, color: "#f0f6fc", fontSize: 12, outline: "none" }}>
                    <option value="nutrition">🥗 Nutrición</option>
                    <option value="training">💪 Entrenamiento</option>
                    <option value="mixed">⚡ Mixto</option>
                  </select>
                </div>
                <button type="submit" style={{ padding: "9px", background: "#22c55e", color: "#000", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Actualizar Plan
                </button>
              </div>
            </form>
          </div>
          <div style={{ marginTop: 12, padding: "12px 16px", background: "#0d1117", borderRadius: 10, border: "1px solid rgba(255,255,255,.07)", fontSize: 11, color: "#8b949e" }}>
            <div style={{ marginBottom: 8, fontWeight: 700, color: "#f0f6fc" }}>Estadísticas</div>
            <div>{mods.length} módulos en total</div>
            <div>{weeks.length} semanas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
