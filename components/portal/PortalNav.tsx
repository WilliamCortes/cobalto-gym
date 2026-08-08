"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/content";

interface Props { user: User; }

export default function PortalNav({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = t.portal.nav;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const displayName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Afiliado";

  return (
    <aside
      className="portal-sidebar"
      style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 260,
        background: "var(--color-ink2)",
        borderRight: "1px solid rgba(255,255,255,.07)",
        display: "flex", flexDirection: "column",
        zIndex: 50, overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "#000", borderRadius: 6, overflow: "hidden" }}>
            <Image src="/logo.jpg" alt="Gym Cobalto" width={32} height={32} style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 2, color: "var(--color-snow)" }}>
            GYM <span style={{ color: "var(--color-cobalt-bright)" }}>COBALTO</span>
          </span>
        </Link>
      </div>

      {/* User info */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-bright) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: 18, color: "#fff", flexShrink: 0,
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-snow)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</div>
            <div style={{ fontSize: 11, color: "var(--color-mist)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: "20px 16px" }} aria-label="Portal navigation">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.links.map((link) => {
            const active = pathname === link.href || (link.href !== "/portal" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "11px 14px", borderRadius: 10,
                  textDecoration: "none",
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-snow)" : "var(--color-mist)",
                  background: active ? "rgba(22,163,74,.15)" : "transparent",
                  border: active ? "1px solid rgba(22,163,74,.3)" : "1px solid transparent",
                  transition: "all .2s",
                }}
              >
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                {link.label}
                {active && (
                  <span style={{
                    marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                    background: "var(--color-cobalt-bright)",
                  }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer actions */}
      <div style={{ padding: "20px 16px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", flexDirection: "column", gap: 8 }}>
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 10,
            fontSize: 13, color: "var(--color-mist)", textDecoration: "none",
            transition: "color .2s",
          }}
        >
          {nav.backToSite}
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 10,
            fontSize: 13, color: "#FCA5A5",
            background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)",
            cursor: "pointer", textAlign: "left", width: "100%",
            transition: "all .2s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(239,68,68,.15)"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "rgba(239,68,68,.08)"; }}
        >
          🚪 {nav.logout}
        </button>
      </div>
    </aside>
  );
}
