"use client";
import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/content";

export default function Footer() {
  const f = t.footer;
  return (
    <footer style={{ background: "var(--color-ink2)", borderTop: "1px solid rgba(255,255,255,.06)", padding: "64px 0 32px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, background: "#000", borderRadius: 8, overflow: "hidden" }}>
                <Image src="/logo.jpg" alt="Gym Cobalto" width={40} height={40} style={{ objectFit: "cover" }} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 2, color: "var(--color-snow)" }}>
                GYM <span style={{ color: "var(--color-cobalt-bright)" }}>COBALTO</span>
              </span>
            </Link>
            <p style={{ fontSize: 14, color: "var(--color-mist)", lineHeight: 1.7, marginBottom: 24 }}>{f.desc}</p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "IG", href: t.brand.instagram, title: "Instagram" },
                { label: "FB", href: t.brand.facebook, title: "Facebook" },
                { label: "WA", href: t.brand.whatsapp, title: "WhatsApp" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank" rel="noopener noreferrer"
                  title={soc.title}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "var(--color-fog)",
                    textDecoration: "none", transition: "all .2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "var(--color-cobalt)"; e.currentTarget.style.borderColor = "var(--color-cobalt)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "var(--color-fog)"; }}
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 1, marginBottom: 20, color: "var(--color-snow)" }}>Servicios</h4>
            <ul style={{ listStyle: "none" }}>
              {f.services.map((s) => (
                <li key={s} style={{ fontSize: 14, color: "var(--color-mist)", padding: "5px 0" }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 1, marginBottom: 20, color: "var(--color-snow)" }}>Blog</h4>
            <ul style={{ listStyle: "none" }}>
              <li style={{ padding: "5px 0" }}>
                <Link href="/blog" style={{ fontSize: 14, color: "var(--color-mist)", textDecoration: "none" }}>Todos los artículos</Link>
              </li>
              <li style={{ padding: "5px 0" }}>
                <Link href="/blog/beneficios-del-gimnasio" style={{ fontSize: 14, color: "var(--color-mist)", textDecoration: "none" }}>Beneficios del gym</Link>
              </li>
              <li style={{ padding: "5px 0" }}>
                <Link href="/blog/hiit-quema-grasa-en-menos-tiempo" style={{ fontSize: 14, color: "var(--color-mist)", textDecoration: "none" }}>HIIT y quema de grasa</Link>
              </li>
              <li style={{ padding: "5px 0" }}>
                <Link href="/blog/como-ganar-musculo-siendo-principiante" style={{ fontSize: 14, color: "var(--color-mist)", textDecoration: "none" }}>Ganar músculo</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 1, marginBottom: 20, color: "var(--color-snow)" }}>Contacto</h4>
            <ul style={{ listStyle: "none" }}>
              {f.contact.map((c) => (
                <li key={c} style={{ fontSize: 14, color: "var(--color-mist)", padding: "5px 0" }}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "var(--color-mist)" }} dangerouslySetInnerHTML={{ __html: f.copyright }} />
          <p style={{ fontSize: 12, color: "var(--color-steel)" }}>{f.hashtags}</p>
        </div>
      </div>

      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important;}}@media(max-width:600px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}
