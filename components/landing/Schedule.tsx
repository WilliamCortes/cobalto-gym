"use client";
import { useState, useEffect } from "react";
import { t } from "@/lib/content";

export default function Schedule() {
  const s = t.schedule;
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    const dayOfWeek = new Date().getDay();
    // days array: Mon(1),Tue(2),Wed(3),Thu(4),Fri(5),Sat(6),Sun(0)
    const jsToIndex = [6, 0, 1, 2, 3, 4, 5];
    setTodayIndex(jsToIndex[dayOfWeek]);
  }, []);

  return (
    <section id="horarios" aria-label="Horarios" style={{ padding: "100px 0", background: "var(--color-ink2)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <p className="section-eyebrow">{s.eyebrow}</p>
        <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{s.title}</h2>
        <p className="section-lead">{s.lead}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {s.days.map((day, i) => {
            const isToday = todayIndex === i;
            return (
              <div
                key={day.name}
                style={{
                  background: isToday ? "rgba(22,163,74,.12)" : "var(--color-ink3)",
                  borderRadius: 12,
                  padding: "28px 24px",
                  border: isToday ? "1px solid var(--color-cobalt-bright)" : "1px solid rgba(255,255,255,.06)",
                  transition: "border-color .2s, transform .2s",
                  opacity: day.closed ? .45 : 1,
                }}
                onMouseOver={(e) => { if (!day.closed) { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-cobalt)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; } }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = isToday ? "var(--color-cobalt-bright)" : "rgba(255,255,255,.06)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                {isToday && (
                  <div style={{
                    display: "inline-block", marginBottom: 8,
                    padding: "3px 10px", borderRadius: 999,
                    background: "var(--color-cobalt-bright)", color: "#fff",
                    fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                  }}>HOY</div>
                )}
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: 2,
                  textTransform: "uppercase",
                  color: isToday ? "var(--color-cobalt-bright)" : "var(--color-mist)",
                  marginBottom: 10,
                }}>{day.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1, color: day.closed ? "var(--color-mist)" : "var(--color-snow)", lineHeight: 1.2 }}>
                  {day.hours.map((h, hi) => (
                    <div key={hi}>{h}</div>
                  ))}
                </div>
                <div style={{
                  display: "inline-block", marginTop: 10,
                  fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                  color: day.closed ? "var(--color-steel)" : "var(--color-cobalt-bright)",
                  fontWeight: 600,
                }}>{day.tag}</div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 28, padding: "20px 28px", borderRadius: 12,
          background: "rgba(22,163,74,.1)", border: "1px solid rgba(22,163,74,.25)",
          fontSize: 14, color: "var(--color-mist)", maxWidth: 600,
        }}
          dangerouslySetInnerHTML={{ __html: s.note }}
        />
      </div>
    </section>
  );
}
