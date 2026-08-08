"use client";
import { useState, useRef, type CSSProperties } from "react";
import { createUser } from "@/lib/actions";

const MEMBERSHIP_TYPES = [
  { value: "basic", label: "Básico" },
  { value: "semi-asistido", label: "Semi-asistido" },
  { value: "personalizado", label: "Personalizado" },
];

const inp: CSSProperties = {
  width: "100%", padding: "10px 12px",
  background: "#0d1117", border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 8, color: "#f0f6fc", fontSize: 13, outline: "none",
};
const lbl: CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e",
  letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase",
};

export default function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      await createUser(formData);
      formRef.current?.reset();
      setOpen(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => { setOpen(!open); setError(null); }}
        style={{ padding: "10px 18px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
      >
        {open ? "✕ Cancelar" : "+ Nuevo Usuario"}
      </button>

      {open && (
        <div style={{ marginTop: 16, background: "#0d1117", borderRadius: 12, border: "1px solid rgba(34,197,94,.2)", padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#f0f6fc", marginBottom: 20, letterSpacing: 0.5 }}>CREAR NUEVO USUARIO</h2>
          <form ref={formRef} action={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={lbl}>Nombre completo *</label>
                <input name="full_name" required style={inp} placeholder="Ana García" />
              </div>
              <div>
                <label style={lbl}>Correo electrónico *</label>
                <input name="email" type="email" required style={inp} placeholder="ana@email.com" />
              </div>
              <div>
                <label style={lbl}>Contraseña temporal *</label>
                <input name="password" type="password" required minLength={6} style={inp} placeholder="mínimo 6 caracteres" />
              </div>
              <div>
                <label style={lbl}>Teléfono</label>
                <input name="phone" style={inp} placeholder="3001234567" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={lbl}>Tipo de membresía</label>
                <select name="membership_type" style={inp}>
                  {MEMBERSHIP_TYPES.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, fontSize: 13, color: "#f87171" }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center" }}>
              <button
                type="submit" disabled={loading}
                style={{ padding: "10px 20px", background: loading ? "#166534" : "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Creando..." : "Crear usuario"}
              </button>
              <p style={{ fontSize: 12, color: "#8b949e" }}>
                El usuario podrá iniciar sesión con estas credenciales inmediatamente.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
