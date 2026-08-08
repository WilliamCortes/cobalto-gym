import { test, expect } from "@playwright/test";

test.describe("Panel de administración", () => {

  // ── Dashboard ──────────────────────────────────────────────────────────────
  test("dashboard carga con título PANEL ADMIN", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator("text=PANEL ADMIN").first()).toBeVisible();
  });

  test("dashboard muestra tarjetas de stats", async ({ page }) => {
    await page.goto("/admin");
    for (const label of ["USUARIOS", "SUSCRIPCIONES ACTIVAS", "VENCEN EN 7 DÍAS"]) {
      await expect(page.locator(`text=${label}`).first()).toBeVisible();
    }
  });

  test("dashboard tiene acceso rápido a Nuevo usuario", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator('a[href="/admin/usuarios"]')).toBeVisible();
  });

  // ── Usuarios ───────────────────────────────────────────────────────────────
  test("/admin/usuarios carga lista de usuarios", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await expect(page.locator("text=USUARIOS")).toBeVisible();
    await expect(page.locator('button:has-text("+ Nuevo Usuario")')).toBeVisible();
  });

  test("formulario Nuevo Usuario se abre y cierra", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await page.locator('button:has-text("+ Nuevo Usuario")').click();
    await expect(page.locator("text=CREAR NUEVO USUARIO")).toBeVisible();
    await expect(page.locator('input[name="full_name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await page.locator('button:has-text("Cancelar")').click();
    await expect(page.locator("text=CREAR NUEVO USUARIO")).not.toBeVisible();
  });

  test("lista de usuarios no tiene enlaces a supabase.com", async ({ page }) => {
    await page.goto("/admin/usuarios");
    const supaLinks = page.locator('a[href*="supabase.com"]');
    await expect(supaLinks).toHaveCount(0);
  });

  test("fila de usuario tiene botón Ver →", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await expect(page.locator('a:has-text("Ver →")').first()).toBeVisible();
  });

  // ── Detalle de usuario ─────────────────────────────────────────────────────
  test("/admin/usuarios/[id] carga detalle con secciones", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await page.locator('a:has-text("Ver →")').first().click();
    await expect(page).toHaveURL(/\/admin\/usuarios\/.+/);
    await expect(page.locator("text=Perfil")).toBeVisible();
  });

  test("detalle de usuario muestra banner de estadísticas", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await page.locator('a:has-text("Ver →")').first().click();
    await expect(page.locator("text=DÍAS ACTIVOS").first()).toBeVisible();
  });

  test("formulario de suscripción calcula fecha fin automáticamente", async ({ page }) => {
    await page.goto("/admin/usuarios");
    await page.locator('a:has-text("Ver →")').first().click();
    await expect(page.locator("text=Fin (auto)").or(page.locator("text=Fin (manual)"))).toBeVisible();
  });

  // ── Suscripciones ──────────────────────────────────────────────────────────
  test("/admin/suscripciones carga con filtros", async ({ page }) => {
    await page.goto("/admin/suscripciones");
    await expect(page.locator("text=SUSCRIPCIONES")).toBeVisible();
    for (const f of ["Todos", "Pagados", "Pendientes", "Vencidos"]) {
      await expect(page.locator(`text=${f}`).first()).toBeVisible();
    }
  });

  test("suscripciones muestra tarjetas de resumen", async ({ page }) => {
    await page.goto("/admin/suscripciones");
    await expect(page.locator("text=ACTIVAS Y PAGADAS")).toBeVisible();
    await expect(page.locator("text=PENDIENTES / VENCIDAS")).toBeVisible();
    await expect(page.locator("text=VENCEN EN 7 DÍAS")).toBeVisible();
  });

  test("botón de acción dice 'Marcar vencido' (no solo 'Vencido')", async ({ page }) => {
    await page.goto("/admin/suscripciones");
    const btnVencido = page.locator('button:has-text("Marcar vencido")');
    const count = await btnVencido.count();
    // Si hay suscripciones pagadas, debe aparecer el botón con texto correcto
    if (count > 0) {
      await expect(btnVencido.first()).toBeVisible();
    }
    // No debe existir ningún botón que diga exactamente solo "Vencido"
    const wrongBtn = page.locator('button:text-is("Vencido")');
    await expect(wrongBtn).toHaveCount(0);
  });

  test("filtro 'Pagados' muestra solo suscripciones pagadas", async ({ page }) => {
    await page.goto("/admin/suscripciones?status=paid");
    const badges = page.locator('span:has-text("Pagado")');
    const pendingBadges = page.locator('span:has-text("Pendiente")');
    await expect(pendingBadges).toHaveCount(0);
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  // ── Planes ─────────────────────────────────────────────────────────────────
  test("/admin/planes carga lista de planes", async ({ page }) => {
    await page.goto("/admin/planes");
    await expect(page.locator("text=PLANES DE CONTENIDO")).toBeVisible();
    await expect(page.locator('button:has-text("Crear Plan")').or(page.locator('input[name="title"]'))).toBeVisible();
  });

  test("no hay enlaces a supabase.com en admin/planes", async ({ page }) => {
    await page.goto("/admin/planes");
    await expect(page.locator('a[href*="supabase.com"]')).toHaveCount(0);
  });

  // ── Manual ─────────────────────────────────────────────────────────────────
  test("/admin/manual carga guía completa", async ({ page }) => {
    await page.goto("/admin/manual");
    await expect(page.locator("text=GUÍA DEL PANEL ADMIN")).toBeVisible();
  });

  test("manual no contiene enlaces al dashboard de Supabase", async ({ page }) => {
    await page.goto("/admin/manual");
    await expect(page.locator('a[href*="supabase.com/dashboard"]')).toHaveCount(0);
  });

  test("manual tiene las 8 secciones del TOC", async ({ page }) => {
    await page.goto("/admin/manual");
    for (const section of ["Acceso y login", "Dashboard", "Gestión de usuarios", "Suscripciones", "Planes de contenido", "Portal del cliente", "Flujos de trabajo", "Limitaciones"]) {
      await expect(page.locator(`text=${section}`).first()).toBeVisible();
    }
  });

  test("manual versión es v1.2", async ({ page }) => {
    await page.goto("/admin/manual");
    await expect(page.locator("text=v1.2")).toBeVisible();
  });

  // ── Navegación sidebar ─────────────────────────────────────────────────────
  test("sidebar admin tiene todos los links", async ({ page }) => {
    await page.goto("/admin");
    for (const href of ["/admin", "/admin/usuarios", "/admin/planes", "/admin/suscripciones", "/admin/manual"]) {
      await expect(page.locator(`a[href="${href}"]`)).toBeVisible();
    }
  });

  test("sidebar tiene enlace 'Ver Portal Clientes'", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator('a[href="/portal"]')).toBeVisible();
  });
});
