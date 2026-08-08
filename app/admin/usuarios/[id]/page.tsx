import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  updateProfile, createSubscription, deleteSubscription,
  createTask, deleteTask, toggleTask, addProgressEntry, deleteProgressEntry,
  assignPlan, removePlanAssignment,
} from "@/lib/actions";

interface Props { params: Promise<{ id: string }> }

const PLAN_TYPES = ["mensual", "quincenal", "semanal", "trimestral", "semestral", "anual", "pareja", "familiar", "semi-asistido", "personalizado"];
const PAYMENT_METHODS = ["Nequi", "Daviplata", "Transferencia", "Efectivo"];
const MEMBERSHIP_TYPES = ["basic", "semi-asistido", "personalizado"];

const sColor = (s: string) => s === "paid" ? "#22c55e" : s === "overdue" ? "#ef4444" : "#f59e0b";
const sLabel = (s: string) => s === "paid" ? "Pagado" : s === "overdue" ? "Vencido" : "Pendiente";

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "#f0f6fc", letterSpacing: 0.5 }}>{title}</h2>
        {action}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function Input({ label, name, defaultValue, type = "text", required, step }: { label: string; name: string; defaultValue?: string | null; type?: string; required?: boolean; step?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
      <input
        name={name} type={type} defaultValue={defaultValue ?? ""} required={required} step={step}
        style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none" }}
      />
    </div>
  );
}

function Select({ label, name, options, defaultValue }: { label: string; name: string; options: { value: string; label: string }[]; defaultValue?: string | null }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
      <select
        name={name} defaultValue={defaultValue ?? ""}
        style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none" }}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: profile },
    { data: subscriptions },
    { data: tasks },
    { data: progress },
    { data: assignments },
    { data: allPlans },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).single(),
    supabase.from("subscriptions").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("tasks").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("progress_entries").select("*").eq("user_id", id).order("recorded_at", { ascending: false }),
    supabase.from("user_plan_assignments").select("plan_id, active, content_plans(id, title, type)").eq("user_id", id),
    supabase.from("content_plans").select("id, title, type").order("created_at", { ascending: false }),
  ]);

  if (!profile) notFound();

  const displayName = profile.full_name ?? profile.email ?? "Usuario";
  const assignedPlanIds = new Set((assignments ?? []).filter((a) => a.active).map((a) => a.plan_id));
  const today = new Date().toISOString().split("T")[0];
  const activeSub = (subscriptions ?? []).find((s) => s.end_date >= today && s.payment_status === "paid");

  const submitUpdateProfile = updateProfile.bind(null, id);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <Link href="/admin/usuarios" style={{ color: "#8b949e", textDecoration: "none", fontSize: 13 }}>← Usuarios</Link>
        <span style={{ color: "#30363d" }}>/</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700, color: "#fff",
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: 1, color: "#f0f6fc" }}>{displayName}</h1>
            <div style={{ fontSize: 12, color: "#8b949e" }}>{profile.email}</div>
          </div>
        </div>
        {activeSub && (
          <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e40" }}>
            Activo hasta {activeSub.end_date}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left column */}
        <div>
          {/* Profile */}
          <Section title="Perfil">
            <form action={submitUpdateProfile}>
              <div style={{ display: "grid", gap: 14 }}>
                <Input label="Nombre completo" name="full_name" defaultValue={profile.full_name} />
                <Input label="Teléfono" name="phone" defaultValue={profile.phone} />
                <Select label="Tipo de membresía" name="membership_type" defaultValue={profile.membership_type}
                  options={MEMBERSHIP_TYPES.map((m) => ({ value: m, label: m }))} />
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Notas internas</label>
                  <textarea name="notes" defaultValue={profile.notes ?? ""} rows={3}
                    style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" name="active" id="active" defaultChecked={profile.active !== false} value="true"
                    style={{ width: 16, height: 16, cursor: "pointer" }} />
                  <label htmlFor="active" style={{ fontSize: 13, color: "#f0f6fc", cursor: "pointer" }}>Acceso activo a la plataforma</label>
                </div>
                <button type="submit" style={{ padding: "10px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Guardar Perfil
                </button>
              </div>
            </form>
          </Section>

          {/* Progress */}
          <Section title={`Progreso (${progress?.length ?? 0} entradas)`}>
            <form action={addProgressEntry}>
              <input type="hidden" name="user_id" value={id} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <Input label="Peso (kg)" name="weight_kg" type="number" step="0.1" />
                <Input label="Cintura (cm)" name="waist_cm" type="number" step="0.1" />
                <Input label="Cadera (cm)" name="hip_cm" type="number" step="0.1" />
                <Input label="Pecho (cm)" name="chest_cm" type="number" step="0.1" />
              </div>
              <Input label="Fecha" name="recorded_at" type="date" defaultValue={today} />
              <div style={{ marginTop: 10 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Notas</label>
                <textarea name="notes" rows={2} style={{ width: "100%", padding: "10px 12px", background: "#161b22", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none", resize: "vertical" }} />
              </div>
              <button type="submit" style={{ marginTop: 12, width: "100%", padding: "9px", background: "rgba(168,85,247,.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,.3)", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                + Registrar Medida
              </button>
            </form>
            {(progress ?? []).length > 0 && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {(progress ?? []).map((p) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#161b22", borderRadius: 8, fontSize: 12 }}>
                    <div style={{ color: "#8b949e" }}>{p.recorded_at}</div>
                    <div style={{ display: "flex", gap: 12, color: "#f0f6fc", flexWrap: "wrap" }}>
                      {p.weight_kg && <span>{p.weight_kg}kg</span>}
                      {p.waist_cm && <span>Cin:{p.waist_cm}cm</span>}
                      {p.hip_cm && <span>Cad:{p.hip_cm}cm</span>}
                      {p.chest_cm && <span>Pec:{p.chest_cm}cm</span>}
                    </div>
                    <form action={deleteProgressEntry.bind(null, p.id, id)}>
                      <button type="submit" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14 }}>×</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* Right column */}
        <div>
          {/* Subscription */}
          <Section title="Suscripción">
            <form action={createSubscription}>
              <input type="hidden" name="user_id" value={id} />
              <div style={{ display: "grid", gap: 12 }}>
                <Select label="Tipo de plan" name="plan_type" options={PLAN_TYPES.map((p) => ({ value: p, label: p }))} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Input label="Inicio" name="start_date" type="date" defaultValue={today} required />
                  <Input label="Fin" name="end_date" type="date" required />
                </div>
                <Input label="Monto (COP)" name="amount" type="number" defaultValue="70000" required />
                <Select label="Estado de pago" name="payment_status" options={[
                  { value: "paid", label: "Pagado" }, { value: "pending", label: "Pendiente" }, { value: "overdue", label: "Vencido" }
                ]} />
                <Select label="Método de pago" name="payment_method" options={PAYMENT_METHODS.map((m) => ({ value: m, label: m }))} />
                <Input label="Notas" name="notes" />
                <button type="submit" style={{ padding: "10px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  + Registrar Suscripción
                </button>
              </div>
            </form>

            {(subscriptions ?? []).length > 0 && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {(subscriptions ?? []).map((s) => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#161b22", borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#f0f6fc", fontWeight: 600 }}>{s.plan_type}</div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{s.start_date} → {s.end_date}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: `${sColor(s.payment_status)}18`, color: sColor(s.payment_status), border: `1px solid ${sColor(s.payment_status)}40` }}>
                        {sLabel(s.payment_status)}
                      </span>
                      <form action={deleteSubscription.bind(null, s.id, id)}>
                        <button type="submit" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14 }}>×</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Plans */}
          <Section title="Planes Asignados">
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {(allPlans ?? []).map((plan) => {
                const isAssigned = assignedPlanIds.has(plan.id);
                const action = isAssigned
                  ? removePlanAssignment.bind(null, id, plan.id)
                  : assignPlan.bind(null, id, plan.id);
                return (
                  <div key={plan.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: isAssigned ? "rgba(34,197,94,.08)" : "#161b22", borderRadius: 8, border: isAssigned ? "1px solid rgba(34,197,94,.25)" : "1px solid transparent" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 500 }}>{plan.title}</div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{plan.type}</div>
                    </div>
                    <form action={action}>
                      <button type="submit" style={{ padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: isAssigned ? "rgba(239,68,68,.15)" : "#22c55e", color: isAssigned ? "#ef4444" : "#000" }}>
                        {isAssigned ? "Quitar" : "Asignar"}
                      </button>
                    </form>
                  </div>
                );
              })}
              {!allPlans?.length && (
                <div style={{ fontSize: 13, color: "#8b949e", textAlign: "center", padding: "12px 0" }}>
                  No hay planes. <Link href="/admin/planes" style={{ color: "#22c55e" }}>Crear uno →</Link>
                </div>
              )}
            </div>
          </Section>

          {/* Tasks */}
          <Section title={`Tareas (${tasks?.length ?? 0})`}>
            <form action={createTask}>
              <input type="hidden" name="user_id" value={id} />
              <div style={{ display: "grid", gap: 10 }}>
                <Input label="Título de la tarea" name="title" required />
                <Input label="Descripción" name="description" />
                <Input label="Fecha límite" name="due_date" type="date" />
                <button type="submit" style={{ padding: "9px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  + Agregar Tarea
                </button>
              </div>
            </form>
            {(tasks ?? []).length > 0 && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {(tasks ?? []).map((task) => (
                  <div key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: "#161b22", borderRadius: 8 }}>
                    <form action={toggleTask.bind(null, task.id, id, !task.completed)}>
                      <button type="submit" style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${task.completed ? "#22c55e" : "#30363d"}`, background: task.completed ? "#22c55e20" : "transparent", flexShrink: 0, marginTop: 1, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {task.completed && <span style={{ fontSize: 10, color: "#22c55e", lineHeight: 1 }}>✓</span>}
                      </button>
                    </form>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: task.completed ? "#8b949e" : "#f0f6fc", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</div>
                      {task.description && <div style={{ fontSize: 11, color: "#8b949e", marginTop: 1 }}>{task.description}</div>}
                      {task.due_date && <div style={{ fontSize: 10, color: "#8b949e", marginTop: 2 }}>Vence: {task.due_date}</div>}
                    </div>
                    <form action={deleteTask.bind(null, task.id, id)}>
                      <button type="submit" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14 }}>×</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
