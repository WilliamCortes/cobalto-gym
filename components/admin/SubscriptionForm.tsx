"use client";
import { useState, useEffect, type CSSProperties } from "react";
import { createSubscription } from "@/lib/actions";

const PLAN_TYPES = ["mensual", "quincenal", "semanal", "trimestral", "semestral", "anual", "pareja", "familiar", "semi-asistido", "personalizado"];
const PAYMENT_METHODS = ["Nequi", "Daviplata", "Transferencia", "Efectivo"];

const PLAN_DURATIONS: Record<string, { months?: number; days?: number }> = {
  semanal:       { days: 6 },
  quincenal:     { days: 14 },
  mensual:       { months: 1 },
  pareja:        { months: 1 },
  familiar:      { months: 1 },
  "semi-asistido": { months: 1 },
  trimestral:    { months: 3 },
  semestral:     { months: 6 },
  anual:         { months: 12 },
};

function calcEndDate(start: string, planType: string): string {
  if (!start) return "";
  const dur = PLAN_DURATIONS[planType];
  if (!dur) return "";
  const d = new Date(start + "T12:00:00");
  if (dur.days !== undefined) {
    d.setDate(d.getDate() + dur.days);
  } else if (dur.months !== undefined) {
    d.setMonth(d.getMonth() + dur.months);
    d.setDate(d.getDate() - 1);
  }
  return d.toISOString().split("T")[0];
}

const input: CSSProperties = {
  width: "100%", padding: "10px 12px", background: "#161b22",
  border: "1px solid rgba(255,255,255,.1)", borderRadius: 8,
  color: "#f0f6fc", fontSize: 13, outline: "none",
};
const label: CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600, color: "#8b949e",
  letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase",
};

export default function SubscriptionForm({ userId, today }: { userId: string; today: string }) {
  const [planType, setPlanType] = useState("mensual");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(calcEndDate(today, "mensual"));

  useEffect(() => {
    const calc = calcEndDate(startDate, planType);
    if (calc) setEndDate(calc);
  }, [startDate, planType]);

  return (
    <form action={createSubscription}>
      <input type="hidden" name="user_id" value={userId} />
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <label style={label}>Tipo de plan</label>
          <select name="plan_type" value={planType} onChange={e => setPlanType(e.target.value)} style={input}>
            {PLAN_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={label}>Inicio</label>
            <input name="start_date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required style={input} />
          </div>
          <div>
            <label style={{ ...label, color: endDate ? "#22c55e" : "#8b949e" }}>
              Fin {endDate ? "(auto)" : "(manual)"}
            </label>
            <input name="end_date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required style={{ ...input, borderColor: endDate ? "rgba(34,197,94,.3)" : "rgba(255,255,255,.1)" }} />
          </div>
        </div>
        <div>
          <label style={label}>Monto (COP)</label>
          <input name="amount" type="number" defaultValue="70000" required style={input} />
        </div>
        <div>
          <label style={label}>Estado de pago</label>
          <select name="payment_status" style={input}>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="overdue">Vencido</option>
          </select>
        </div>
        <div>
          <label style={label}>Método de pago</label>
          <select name="payment_method" style={input}>
            {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label style={label}>Notas</label>
          <input name="notes" style={input} />
        </div>
        <button type="submit" style={{ padding: "10px", background: "#22c55e", color: "#000", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          + Registrar Suscripción
        </button>
      </div>
    </form>
  );
}
