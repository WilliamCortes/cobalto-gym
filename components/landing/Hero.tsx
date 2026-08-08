"use client";
import Image from "next/image";
import { t } from "@/lib/content";

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function Hero() {
  const h = t.hero;
  return (
    <section
      aria-label="Presentación Gym Cobalto"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-ink)",
      }}
    >
      {/* Real gym photo background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/gym-interior.jpg"
          alt="Interior Gym Cobalto Cachipay"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 30%", filter: "brightness(.22) saturate(.5)" }}
          sizes="100vw"
        />
      </div>

      {/* Radial green glow overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(22,163,74,.5) 0%, transparent 60%), linear-gradient(180deg, transparent 40%, var(--color-ink) 100%)",
      }} />

      {/* Animated grid */}
      <div
        className="animate-grid-fade"
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(22,163,74,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Co symbol */}
      <div
        className="animate-pulse-el hero-element"
        aria-hidden
        style={{
          position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)",
          width: 220, height: 220,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle, rgba(22,163,74,.3) 0%, transparent 70%)",
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: 110, color: "var(--color-cobalt-bright)", lineHeight: 1, opacity: .15 }}>Co</span>
        <span style={{ fontSize: 11, letterSpacing: 4, color: "var(--color-cobalt-bright)", opacity: .4, textTransform: "uppercase" }}>{h.elementLabel}</span>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 800, padding: "160px 24px 120px",
          textAlign: "left",
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-up"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 16px", border: "1px solid rgba(22,163,74,.5)",
            borderRadius: 999, background: "rgba(22,163,74,.15)",
            fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
            color: "var(--color-cobalt-bright)", marginBottom: 28,
          }}
        >
          <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-cobalt-bright)", display: "inline-block" }} />
          🏆&nbsp; {h.badge}
        </div>

        {/* H1 */}
        <h1
          className="animate-fade-up-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(64px, 11vw, 140px)",
            lineHeight: .92, letterSpacing: 2,
            color: "var(--color-snow)", marginBottom: 8,
          }}
        >
          <span style={{
            background: "linear-gradient(90deg, var(--color-cobalt-bright) 0%, #80B3FF 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>{h.h1Line1}</span>
          <br />{h.h1Line2}<br />{h.h1Line3}
        </h1>

        <p
          className="animate-fade-up-2"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1, letterSpacing: 3, color: "var(--color-mist)", marginBottom: 32 }}
        >
          {h.sub}
        </p>

        <p
          className="animate-fade-up-3"
          style={{ fontSize: 18, color: "var(--color-fog)", lineHeight: 1.65, maxWidth: 520, marginBottom: 44 }}
          dangerouslySetInnerHTML={{ __html: h.desc }}
        />

        <div className="animate-fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a
            href={h.ctaPrimaryHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#25D366", color: "#fff",
              padding: "16px 32px", borderRadius: 12,
              fontWeight: 700, fontSize: 16, letterSpacing: ".3px",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(37,211,102,.45)",
              transition: "all .25s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#1da851"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,.45)"; e.currentTarget.style.transform = "none"; }}
          >
            <WaIcon /> {h.ctaPrimary} <ArrowIcon />
          </a>
          <a
            href={h.ctaSecondaryHref}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "transparent", color: "var(--color-snow)",
              padding: "16px 28px", borderRadius: 12,
              fontWeight: 600, fontSize: 15,
              border: "1px solid rgba(255,255,255,.2)",
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.background = "transparent"; }}
          >
            {h.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(8,12,18,.85)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,.06)",
        padding: "24px 0", zIndex: 2,
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-around",
          maxWidth: 1140, margin: "0 auto", padding: "0 24px",
          flexWrap: "wrap", gap: 20,
        }}>
          {h.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,48px)", color: "var(--color-snow)", lineHeight: 1 }}>
                <span style={{ color: "var(--color-cobalt-bright)" }}>{s.accent}</span>{s.suffix && s.suffix !== s.accent ? s.suffix : ""}
              </div>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-mist)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.hero-element{display:none!important;}}
      `}</style>
    </section>
  );
}
