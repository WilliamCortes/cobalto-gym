import { t } from "@/lib/content";

export default function Ticker() {
  const items = [...t.ticker.items, ...t.ticker.items];
  return (
    <div
      role="region"
      aria-label="Servicios Gym Cobalto"
      aria-live="off"
      style={{
        background: "var(--color-cobalt-deep)",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div
        className="animate-ticker"
        style={{ display: "flex", gap: 64, width: "max-content" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontSize: 13, fontWeight: 600, letterSpacing: 1,
              whiteSpace: "nowrap", color: "rgba(255,255,255,.7)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-cobalt-bright)", display: "inline-block", flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
