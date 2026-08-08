"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Sin permisos de administrador");
  return { supabase, user };
}

// ── Profiles ──────────────────────────────────────────────
export async function updateProfile(userId: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const data = {
    full_name: (formData.get("full_name") as string) || null,
    phone: (formData.get("phone") as string) || null,
    membership_type: (formData.get("membership_type") as string) || null,
    notes: (formData.get("notes") as string) || null,
    active: formData.get("active") === "true",
  };
  const { error } = await supabase.from("profiles").update(data).eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/usuarios");
  revalidatePath(`/admin/usuarios/${userId}`);
}

// ── Subscriptions ─────────────────────────────────────────
export async function createSubscription(formData: FormData) {
  const { supabase } = await requireAdmin();
  const userId = formData.get("user_id") as string;
  const data = {
    user_id: userId,
    plan_type: formData.get("plan_type") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    amount: formData.get("amount") ? Number(formData.get("amount")) : null,
    payment_status: formData.get("payment_status") as string,
    payment_method: formData.get("payment_method") as string,
    notes: formData.get("notes") as string || null,
  };
  const { error } = await supabase.from("subscriptions").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/usuarios");
  revalidatePath(`/admin/usuarios/${userId}`);
  revalidatePath("/admin/suscripciones");
}

export async function updateSubscriptionStatus(id: string, payment_status: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("subscriptions").update({ payment_status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/suscripciones");
  revalidatePath("/admin");
}

export async function deleteSubscription(id: string, userId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
  revalidatePath("/admin/suscripciones");
}

// ── Content Plans ─────────────────────────────────────────
export async function createPlan(data: { title: string; description: string; type: string }) {
  const { supabase, user } = await requireAdmin();
  const { data: plan, error } = await supabase
    .from("content_plans")
    .insert({ ...data, created_by: user.id })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/planes");
  return plan;
}

export async function updatePlan(id: string, data: { title?: string; description?: string; type?: string }) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("content_plans")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/planes");
  revalidatePath(`/admin/planes/${id}`);
}

export async function deletePlan(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("content_plans").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/planes");
}

// ── Plan Modules ──────────────────────────────────────────
export async function createModule(data: {
  plan_id: string; week_number: number; day_name: string | null;
  title: string; content: string | null; video_url: string | null; sort_order: number;
}) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("plan_modules").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/planes/${data.plan_id}`);
}

export async function updateModule(id: string, planId: string, data: {
  week_number?: number; day_name?: string | null; title?: string; content?: string | null; video_url?: string | null;
}) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("plan_modules").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/planes/${planId}`);
}

export async function deleteModule(id: string, planId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("plan_modules").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/planes/${planId}`);
}

// ── Plan Assignments ──────────────────────────────────────
export async function assignPlan(userId: string, planId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("user_plan_assignments")
    .upsert({ user_id: userId, plan_id: planId, active: true }, { onConflict: "user_id,plan_id" });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

export async function removePlanAssignment(userId: string, planId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("user_plan_assignments")
    .delete()
    .eq("user_id", userId)
    .eq("plan_id", planId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

// ── Tasks ─────────────────────────────────────────────────
export async function createTask(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const userId = formData.get("user_id") as string;
  const data = {
    user_id: userId,
    title: formData.get("title") as string,
    description: formData.get("description") as string || null,
    due_date: formData.get("due_date") as string || null,
    created_by: user.id,
  };
  const { error } = await supabase.from("tasks").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

export async function toggleTask(id: string, userId: string, completed: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("tasks").update({ completed }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

export async function deleteTask(id: string, userId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

// ── Progress ──────────────────────────────────────────────
export async function addProgressEntry(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const userId = formData.get("user_id") as string;
  const entry = {
    user_id: userId,
    weight_kg: formData.get("weight_kg") ? parseFloat(formData.get("weight_kg") as string) : null,
    waist_cm: formData.get("waist_cm") ? parseFloat(formData.get("waist_cm") as string) : null,
    hip_cm: formData.get("hip_cm") ? parseFloat(formData.get("hip_cm") as string) : null,
    chest_cm: formData.get("chest_cm") ? parseFloat(formData.get("chest_cm") as string) : null,
    notes: formData.get("notes") as string || null,
    recorded_at: formData.get("recorded_at") as string || new Date().toISOString().split("T")[0],
    created_by: user.id,
  };
  const { error } = await supabase.from("progress_entries").insert(entry);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}

export async function deleteProgressEntry(id: string, userId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("progress_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/usuarios/${userId}`);
}
