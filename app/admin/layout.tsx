import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Panel Admin — Gym Cobalto", robots: "noindex" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/portal");

  const adminName = profile.full_name ?? profile.email ?? user.email ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#010409" }}>
      <AdminNav adminName={adminName} />
      <main style={{ flex: 1, marginLeft: 240, padding: "36px 40px", overflowY: "auto", minHeight: "100vh" }} className="admin-main">
        {children}
      </main>
      <style>{`
        @media(max-width:900px){
          .admin-sidebar{display:none!important;}
          .admin-main{margin-left:0!important;padding:20px 16px!important;}
        }
      `}</style>
    </div>
  );
}
