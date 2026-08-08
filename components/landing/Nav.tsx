"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { t } from "@/lib/content";

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      aria-label="Navegación principal"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 0",
        background: scrolled
          ? "rgba(8,12,18,.96)"
          : "linear-gradient(180deg,rgba(8,12,18,.95) 0%,rgba(8,12,18,0) 100%)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,.05)" : "none",
        transition: "all .3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{
            width: 40, height: 40, background: "#000", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", boxShadow: "0 0 20px rgba(22,163,74,.45)",
          }}>
            <Image src="/logo.jpg" alt="Gym Cobalto logo" width={40} height={40} style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 2, color: "var(--color-snow)" }}>
            GYM <span style={{ color: "var(--color-cobalt-bright)" }}>COBALTO</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {t.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".5px", color: "var(--color-fog)", transition: "color .2s", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-snow)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-fog)")}
            >
              {l.label}
            </a>
          ))}
          <Link
            href={t.nav.portalHref}
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".5px", color: "var(--color-mist)", textDecoration: "none" }}
          >
            {t.nav.portalLink}
          </Link>
          <a
            href={t.nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--color-cobalt)", color: "#fff",
              padding: "10px 22px", borderRadius: 8,
              fontSize: 13, fontWeight: 600, letterSpacing: ".3px",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
              transition: "background .2s, box-shadow .2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--color-cobalt-bright)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(22,163,74,.45)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "var(--color-cobalt)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <WaIcon /> {t.nav.cta}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", background: "none", border: "none", padding: 4 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--color-snow)", borderRadius: 2 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(8,12,18,.98)", padding: 24,
            borderBottom: "1px solid rgba(255,255,255,.07)",
            display: "flex", flexDirection: "column", gap: 20,
          }}
        >
          {t.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, fontWeight: 500, color: "var(--color-fog)", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={t.nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "var(--color-cobalt)", color: "#fff", padding: "12px 20px", borderRadius: 8, fontWeight: 600, textDecoration: "none", textAlign: "center" }}
          >
            {t.nav.cta}
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .nav-links-desktop{display:none!important;}
          .nav-hamburger{display:flex!important;}
        }
      `}</style>
    </nav>
  );
}
