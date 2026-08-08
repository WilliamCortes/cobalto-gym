import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProgresoPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: entries } = await supabase
    .from("progress_entries")
    .select("id, recorded_at, weight_kg, waist_cm, hip_cm, chest_cm")
    .eq("user_id", user.id)
    .order("recorded_at", { ascending: true });

  const list = entries ?? [];
  const latest = list[list.length - 1] ?? null;
  const first = list[0] ?? null;

  const diff = (key: "weight_kg" | "waist_cm" | "hip_cm" | "chest_cm") => {
    if (!latest || !first || list.length < 2) return null;
    const v1 = first[key] as number | null;
    const v2 = latest[key] as number | null;
    if (!v1 || !v2) return null;
    return Number((v2 - v1).toFixed(1));
  };

  const formatDiff = (d: number | null, unit = "kg") => {
    if (d === null) return "—";
    const sign = d > 0 ? "+" : "";
    return `${sign}${d} ${unit}`;
  };

  const statCards = [
    { label: "Peso actual", value: latest?.weight_kg ? `${latest.weight_kg} kg` : "—", delta: diff("weight_kg"), unit: "kg" },
    { label: "Cintura", value: latest?.waist_cm ? `${latest.waist_cm} cm` : "—", delta: diff("waist_cm"), unit: "cm" },
    { label: "Cadera", value: latest?.hip_cm ? `${latest.hip_cm} cm` : "—", delta: diff("hip_cm"), unit: "cm" },
    { label: "Pecho", value: latest?.chest_cm ? `${latest.chest_cm} cm` : "—", delta: diff("chest_cm"), unit: "cm" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--color-cobalt-bright)", fontWeight: 600, marginBottom: 12 }}>
          TU EVOLUCIÓN
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 12, lineHeight: 1.1 }}>
          MI PROGRESO
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-mist)", maxWidth: 560, lineHeight: 1.7 }}>
          Evolución de tus medidas registradas por Edwin durante el seguimiento.
        </p>
      </div>

      {list.length > 0 ? (
        <>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14, marginBottom: 36 }}>
            {statCards.map((card) => {
              const isGood = card.label === "Peso actual" ? (card.delta !== null && card.delta < 0) : (card.delta !== null && card.delta < 0);
              const deltaColor = card.delta === null ? "var(--color-mist)" : isGood ? "#22c55e" : card.delta === 0 ? "var(--color-mist)" : "#f59e0b";
              return (
                <div key={card.label} style={{ background: "var(--color-ink3)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,.07)" }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 10 }}>{card.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-snow)", marginBottom: 6 }}>{card.value}</div>
                  {list.length >= 2 && (
                    <div style={{ fontSize: 12, color: deltaColor, fontWeight: 600 }}>
                      {formatDiff(card.delta, card.unit)} desde inicio
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* History table */}
          <div style={{ background: "var(--color-ink3)", borderRadius: 16, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--color-snow)", letterSpacing: 1 }}>
                Historial de medidas
              </h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                    {["Fecha", "Peso (kg)", "Cintura (cm)", "Cadera (cm)", "Pecho (cm)"].map((h) => (
                      <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "var(--color-mist)", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...list].reverse().map((entry, i) => (
                    <tr key={entry.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", background: i === 0 ? "rgba(22,163,74,.04)" : "transparent" }}>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: i === 0 ? "#22c55e" : "var(--color-snow)", fontWeight: i === 0 ? 600 : 400 }}>
                        {entry.recorded_at}{i === 0 && <span style={{ marginLeft: 8, fontSize: 10, background: "rgba(22,163,74,.15)", color: "#22c55e", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>ÚLTIMO</span>}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--color-fog)" }}>{entry.weight_kg ?? "—"}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--color-fog)" }}>{entry.waist_cm ?? "—"}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--color-fog)" }}>{entry.hip_cm ?? "—"}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--color-fog)" }}>{entry.chest_cm ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: "60px 40px", textAlign: "center", background: "var(--color-ink3)", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-snow)", marginBottom: 8 }}>
            Sin medidas registradas aún
          </div>
          <p style={{ fontSize: 14, color: "var(--color-mist)", maxWidth: 400, margin: "0 auto 24px" }}>
            Edwin registrará tus medidas durante las sesiones de seguimiento para que puedas ver tu evolución aquí.
          </p>
          <a href="https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20hacer%20mi%20medici%C3%B3n%20inicial"
            target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            💬 Pedir medición a Edwin
          </a>
        </div>
      )}
    </div>
  );
}
