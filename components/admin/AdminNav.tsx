"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/usuarios", label: "Usuarios", icon: "👥", exact: false },
  { href: "/admin/planes", label: "Planes", icon: "📋", exact: false },
  { href: "/admin/suscripciones", label: "Suscripciones", icon: "💳", exact: false },
];

export default function AdminNav({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside style={{
      position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
      background: "#0d1117",
      borderRight: "1px solid rgba(255,255,255,.07)",
      display: "flex", flexDirection: "column", zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, background: "#000", borderRadius: 6, overflow: "hidden" }}>
            <Image src="/logo.jpg" alt="Gym Cobalto" width={30} height={30} style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: 2, color: "#f0f6fc" }}>
            GYM <span style={{ color: "#22c55e" }}>COBALTO</span>
          </span>
        </Link>
        <div style={{ marginTop: 8, padding: "4px 8px", background: "rgba(234,179,8,.12)", border: "1px solid rgba(234,179,8,.3)", borderRadius: 6, display: "inline-block" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#fbbf24", textTransform: "uppercase" }}>Panel Admin</span>
        </div>
      </div>

      {/* Admin info */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: 16, color: "#fff", flexShrink: 0,
          }}>
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f6fc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{adminName}</div>
            <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, letterSpacing: 0.5 }}>Administrador</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(({ href, label, icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8,
                textDecoration: "none", fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? "#f0f6fc" : "#8b949e",
                background: active ? "rgba(34,197,94,.12)" : "transparent",
                border: active ? "1px solid rgba(34,197,94,.25)" : "1px solid transparent",
                transition: "all .15s",
              }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: 24, padding: "0 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#30363d", textTransform: "uppercase", marginBottom: 8 }}>Accesos</div>
          <Link href="/portal" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, textDecoration: "none", fontSize: 12, color: "#8b949e" }}>
            🏠 Ver Portal Clientes
          </Link>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, textDecoration: "none", fontSize: 12, color: "#8b949e" }}>
            🌐 Ver Sitio Web
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 8, width: "100%",
          fontSize: 13, color: "#fca5a5",
          background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)",
          cursor: "pointer", textAlign: "left", transition: "all .15s",
        }}>
          🚪 Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
