"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/content";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/portal";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lp = t.portal.login;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("Correo o contraseña incorrectos. Verifica tus datos.");
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--color-ink)",
      backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(22,163,74,.15) 0%, transparent 60%)",
      padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 48, height: 48, background: "#000", borderRadius: 10, overflow: "hidden", boxShadow: "0 0 20px rgba(22,163,74,.4)" }}>
              <Image src="/logo.jpg" alt="Gym Cobalto" width={48} height={48} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 2, color: "var(--color-snow)" }}>
              GYM <span style={{ color: "var(--color-cobalt-bright)" }}>COBALTO</span>
            </span>
          </Link>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--color-mist)" }}>{lp.subtitle}</p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--color-ink3)",
          borderRadius: 20,
          padding: 40,
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 20px 80px rgba(0,0,0,.4)",
        }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 2, marginBottom: 32, color: "var(--color-snow)" }}>
            {lp.title}
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 8 }}>
                {lp.emailLabel}
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder={lp.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 12,
                  background: "var(--color-ink2)", border: "1px solid rgba(255,255,255,.12)",
                  color: "var(--color-snow)", fontSize: 15, outline: "none",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-cobalt-bright)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.12)")}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "var(--color-mist)", marginBottom: 8 }}>
                {lp.passwordLabel}
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder={lp.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 12,
                  background: "var(--color-ink2)", border: "1px solid rgba(255,255,255,.12)",
                  color: "var(--color-snow)", fontSize: 15, outline: "none",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-cobalt-bright)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.12)")}
              />
            </div>

            {error && (
              <div style={{
                marginBottom: 20, padding: "12px 16px", borderRadius: 10,
                background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)",
                fontSize: 14, color: "#FCA5A5",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "16px", borderRadius: 12,
                background: loading ? "rgba(22,163,74,.5)" : "var(--color-cobalt)",
                color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: ".3px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 6px 24px rgba(22,163,74,.4)",
                transition: "all .25s",
              }}
            >
              {loading ? "Ingresando..." : lp.submitLabel}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "var(--color-mist)" }}>
              {lp.noAccount}{" "}
              <a
                href={lp.contactHref}
                target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--color-cobalt-bright)", fontWeight: 600, textDecoration: "none" }}
              >
                {lp.contactAdmin}
              </a>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--color-mist)", textDecoration: "none" }}>
            {lp.backToSite}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
