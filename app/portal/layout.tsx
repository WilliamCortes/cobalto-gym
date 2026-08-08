import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalNav from "@/components/portal/PortalNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-ink)" }}>
      <PortalNav user={user} />
      <main style={{
        flex: 1,
        marginLeft: 260,
        padding: "40px 48px",
        overflowY: "auto",
      }} className="portal-main">
        {children}
      </main>
      <style>{`
        @media(max-width:900px){
          .portal-main{margin-left:0!important;padding:24px 20px!important;}
        }
      `}</style>
    </div>
  );
}
