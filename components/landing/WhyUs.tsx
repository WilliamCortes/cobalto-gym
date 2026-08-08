import Image from "next/image";
import { t } from "@/lib/content";

export default function WhyUs() {
  const w = t.whyUs;
  return (
    <section
      id="nosotros"
      aria-label="Por qué Gym Cobalto"
      style={{ padding: "100px 0", background: "var(--color-ink2)" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="why-grid">
          {/* Visual */}
          <div style={{ position: "relative" }} className="why-visual">
            <div style={{
              position: "absolute", top: -24, left: -24, width: 80, height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--color-cobalt-bright) 0%, transparent 70%)",
              opacity: .5,
            }} />
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", position: "relative", background: "var(--color-ink3)" }}>
              <Image
                src="/images/gym-interior.jpg"
                alt="Interior Gym Cobalto — zona de entrenamiento"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div style={{
              position: "absolute", bottom: -24, right: -24,
              width: "60%", borderRadius: 12, aspectRatio: "4/3",
              background: "var(--color-cobalt-deep)",
              border: "3px solid var(--color-ink)",
              boxShadow: "0 20px 60px rgba(0,0,0,.5)",
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Image
                src="/images/pagos.jpg"
                alt="Pagos digitales Gym Cobalto"
                fill
                style={{ objectFit: "cover" }}
                sizes="30vw"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-eyebrow">{w.eyebrow}</p>
            <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{w.title}</h2>
            <p className="section-lead">{w.lead}</p>

            <ul style={{ listStyle: "none", marginTop: 32 }}>
              {w.points.map((pt) => (
                <li key={pt.title} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: "rgba(22,163,74,.15)", border: "1px solid rgba(22,163,74,.3)",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>{pt.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{pt.title}</div>
                    <p style={{ fontSize: 14, color: "var(--color-mist)", lineHeight: 1.6 }}>{pt.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .why-grid{grid-template-columns:1fr!important;gap:40px!important;}
          .why-visual{order:-1;}
        }
      `}</style>
    </section>
  );
}
