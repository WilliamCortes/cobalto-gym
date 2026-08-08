import { test, expect } from "@playwright/test";

test.describe("Portal del cliente", () => {

  // ── Dashboard ──────────────────────────────────────────────────────────────
  test("dashboard carga con nombre del usuario", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL(/\/portal/);
    await expect(page.locator("text=BIENVENIDO")).toBeVisible();
  });

  test("nav lateral muestra los 5 links", async ({ page }) => {
    await page.goto("/portal");
    for (const label of ["Dashboard", "Nutrición", "Rutinas", "Progreso", "Mi perfil"]) {
      await expect(page.locator(`text=${label}`).first()).toBeVisible();
    }
  });

  test("quick links muestran nutrición, rutinas y progreso", async ({ page }) => {
    await page.goto("/portal");
    await expect(page.locator('a[href="/portal/planes"]').first()).toBeVisible();
    await expect(page.locator('a[href="/portal/rutinas"]').first()).toBeVisible();
    await expect(page.locator('a[href="/portal/progreso"]').first()).toBeVisible();
  });

  // ── Planes (Nutrición) ─────────────────────────────────────────────────────
  test("/portal/planes carga sin error", async ({ page }) => {
    await page.goto("/portal/planes");
    await expect(page).toHaveURL(/\/portal\/planes/);
    await expect(page.locator("h1")).toBeVisible();
  });

  // ── Rutinas ────────────────────────────────────────────────────────────────
  test("/portal/rutinas no da 404", async ({ page }) => {
    const res = await page.goto("/portal/rutinas");
    expect(res?.status()).not.toBe(404);
  });

  test("/portal/rutinas muestra título MIS RUTINAS", async ({ page }) => {
    await page.goto("/portal/rutinas");
    await expect(page.locator("text=MIS RUTINAS")).toBeVisible();
  });

  test("/portal/rutinas muestra planes o empty state con botón WhatsApp", async ({ page }) => {
    await page.goto("/portal/rutinas");
    const hasPlans = await page.locator('a[href*="/portal/planes/"]').count();
    if (hasPlans === 0) {
      await expect(page.locator('text=Aún no tienes rutinas asignadas')).toBeVisible();
      await expect(page.locator('a[href*="wa.me"]')).toBeVisible();
    } else {
      await expect(page.locator('a[href*="/portal/planes/"]').first()).toBeVisible();
    }
  });

  // ── Progreso ───────────────────────────────────────────────────────────────
  test("/portal/progreso no da 404", async ({ page }) => {
    const res = await page.goto("/portal/progreso");
    expect(res?.status()).not.toBe(404);
  });

  test("/portal/progreso muestra título MI PROGRESO", async ({ page }) => {
    await page.goto("/portal/progreso");
    await expect(page.locator("text=MI PROGRESO")).toBeVisible();
  });

  test("/portal/progreso muestra medidas o empty state", async ({ page }) => {
    await page.goto("/portal/progreso");
    const hasMeasurements = await page.locator("text=PESO ACTUAL").count();
    if (hasMeasurements === 0) {
      await expect(page.locator("text=Sin medidas registradas")).toBeVisible();
    } else {
      await expect(page.locator("text=PESO ACTUAL")).toBeVisible();
    }
  });

  // ── Perfil ─────────────────────────────────────────────────────────────────
  test("/portal/perfil no da 404", async ({ page }) => {
    const res = await page.goto("/portal/perfil");
    expect(res?.status()).not.toBe(404);
  });

  test("/portal/perfil muestra título MI PERFIL", async ({ page }) => {
    await page.goto("/portal/perfil");
    await expect(page.locator("text=MI PERFIL")).toBeVisible();
  });

  test("/portal/perfil muestra sección MEMBRESÍA", async ({ page }) => {
    await page.goto("/portal/perfil");
    await expect(page.locator("text=MEMBRESÍA")).toBeVisible();
  });

  test("/portal/perfil muestra correo del usuario", async ({ page }) => {
    await page.goto("/portal/perfil");
    await expect(page.locator("text=CORREO")).toBeVisible();
  });

  // ── No puede acceder al admin ──────────────────────────────────────────────
  test("usuario normal no puede acceder a /admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).not.toHaveURL(/\/admin(?!.*login)/);
  });

  // ── Cerrar sesión ──────────────────────────────────────────────────────────
  test("botón cerrar sesión existe en sidebar", async ({ page }) => {
    await page.goto("/portal");
    await expect(page.locator('button:has-text("Cerrar sesión")')).toBeVisible();
  });
});
