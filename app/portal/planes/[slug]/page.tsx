import { notFound } from "next/navigation";
import Link from "next/link";
import { t } from "@/lib/content";

const sampleWeeks = [
  {
    week: 1,
    title: "Semana 1 — Base metabólica",
    days: [
      {
        day: "Lunes",
        meals: [
          { time: "06:00", label: "Desayuno", desc: "2 huevos revueltos + 1 taza avena + 1 banano", kcal: 420 },
          { time: "10:00", label: "Merienda", desc: "1 manzana + 30g nueces mixtas", kcal: 210 },
          { time: "13:00", label: "Almuerzo", desc: "150g pechuga a la plancha + arroz integral + ensalada verde", kcal: 580 },
          { time: "16:30", label: "Pre-entreno", desc: "1 banano + 1 cucharada mantequilla de maní", kcal: 280 },
          { time: "20:00", label: "Cena", desc: "120g atún en agua + verduras al vapor + 1 papa mediana", kcal: 380 },
        ],
        videoUrl: null,
        totalKcal: 1870,
      },
      {
        day: "Martes",
        meals: [
          { time: "06:00", label: "Desayuno", desc: "Smoothie proteico: leche + 1 banano + 2 cdas proteína + avena", kcal: 460 },
          { time: "10:00", label: "Merienda", desc: "30g almendras + 1 pera", kcal: 230 },
          { time: "13:00", label: "Almuerzo", desc: "150g carne magra + lenteja + aguacate ¼", kcal: 620 },
          { time: "16:30", label: "Pre-entreno", desc: "Tostada integral + huevo cocido", kcal: 240 },
          { time: "20:00", label: "Cena", desc: "Omelette 3 claras + 1 yema + espinaca + queso bajo en grasa", kcal: 340 },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        totalKcal: 1890,
      },
    ],
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mod = t.portal.plans.modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const colorMap: Record<string, string> = {
    green: "var(--color-cobalt-bright)",
    blue:  "#60A5FA",
    orange: "#FB923C",
  };
  const accent = colorMap[mod.color] ?? "var(--color-cobalt-bright)";

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "var(--color-mist)" }}>
        <Link href="/portal/planes" style={{ color: "var(--color-mist)", textDecoration: "none" }}>Planes</Link>
        <span>›</span>
        <span style={{ color: "var(--color-snow)" }}>{mod.title}</span>
      </div>

      {/* Header */}
      <div style={{
        borderRadius: 20, padding: "40px", marginBottom: 40,
        background: "linear-gradient(135deg, var(--color-cobalt-deep) 0%, var(--color-ink3) 100%)",
        border: "1px solid rgba(22,163,74,.2)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-display)", fontSize: 120, color: "rgba(22,163,74,.05)",
          pointerEvents: "none",
        }}>Co</div>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", background: "rgba(22,163,74,.15)", color: accent, border: `1px solid rgba(22,163,74,.3)` }}>{mod.tag}</span>
            <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", background: "rgba(255,255,255,.06)", color: "var(--color-mist)" }}>{mod.level}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", letterSpacing: 2, color: "var(--color-snow)", marginBottom: 12 }}>{mod.title}</h1>
          <p style={{ fontSize: 15, color: "var(--color-mist)", maxWidth: 560, lineHeight: 1.7 }}>{mod.desc}</p>
          <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 14, color: "var(--color-fog)" }}>📅 <strong>{mod.weeks} semanas</strong></div>
            <div style={{ fontSize: 14, color: "var(--color-fog)" }}>🥗 <strong>Plan completo</strong></div>
            <div style={{ fontSize: 14, color: "var(--color-fog)" }}>👤 <strong>Edwin González</strong></div>
          </div>
        </div>
      </div>

      {/* Week selector */}
      {sampleWeeks.map((week) => (
        <div key={week.week} style={{ marginBottom: 48 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 24,
            padding: "16px 24px", borderRadius: 12,
            background: "var(--color-ink3)", border: "1px solid rgba(255,255,255,.07)",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(22,163,74,.15)", border: "1px solid rgba(22,163,74,.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 18, color: accent,
            }}>{week.week}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-snow)" }}>{week.title}</div>
              <div style={{ fontSize: 12, color: "var(--color-mist)" }}>{week.days.length} días · contenido detallado</div>
            </div>
          </div>

          {/* Day tabs */}
          {week.days.map((day) => (
            <div key={day.day} style={{ marginBottom: 24 }}>
              <div style={{
                padding: "14px 20px", borderRadius: "12px 12px 0 0",
                background: "rgba(22,163,74,.1)", border: "1px solid rgba(22,163,74,.2)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 1, color: accent }}>{day.day}</div>
                <div style={{ fontSize: 13, color: "var(--color-mist)", background: "rgba(255,255,255,.06)", padding: "4px 12px", borderRadius: 999 }}>
                  {day.totalKcal} kcal totales
                </div>
              </div>

              <div style={{ background: "var(--color-ink3)", border: "1px solid rgba(255,255,255,.07)", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {day.meals.map((meal, mi) => (
                  <div key={mi} style={{
                    display: "flex", gap: 16, padding: "18px 20px",
                    borderBottom: mi < day.meals.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                    alignItems: "flex-start",
                  }}>
                    <div style={{ fontSize: 12, fontFamily: "var(--font-display)", color: "var(--color-mist)", width: 52, flexShrink: 0, letterSpacing: 1, paddingTop: 2 }}>{meal.time}</div>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: accent, flexShrink: 0, marginTop: 6,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: accent, marginBottom: 4 }}>{meal.label}</div>
                      <div style={{ fontSize: 14, color: "var(--color-fog)", lineHeight: 1.5 }}>{meal.desc}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-mist)", flexShrink: 0, paddingTop: 2 }}>{meal.kcal} kcal</div>
                  </div>
                ))}

                {/* Video if available */}
                {day.videoUrl && (
                  <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 12 }}>
                      📹 Video del día
                    </div>
                    <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9", background: "var(--color-ink2)" }}>
                      <iframe
                        src={day.videoUrl}
                        width="100%" height="100%"
                        style={{ border: 0, display: "block" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Video ${day.day}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* More weeks coming */}
      <div style={{
        padding: "28px 32px", borderRadius: 16,
        background: "rgba(22,163,74,.06)", border: "1px solid rgba(22,163,74,.2)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-snow)", marginBottom: 8 }}>Semanas 2–{mod.weeks} disponibles con Edwin</div>
        <p style={{ fontSize: 13, color: "var(--color-mist)", marginBottom: 20 }}>Edwin cargará tu plan completo semana a semana. Escríbele para obtener acceso total a tu programa.</p>
        <a
          href="https://wa.me/573004436649?text=Hola%20Edwin!%20Quiero%20acceder%20a%20las%20semanas%20restantes%20de%20mi%20plan"
          target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}
        >
          💬 Contactar a Edwin para más semanas
        </a>
      </div>
    </div>
  );
}
