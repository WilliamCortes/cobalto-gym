import { test, expect } from "@playwright/test";

test.describe("Rutas públicas", () => {
  test("landing page carga con título correcto", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Gym Cobalto/i);
    await expect(page.locator("text=COBALTO")).toBeVisible();
  });

  test("landing page muestra sección de precios", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/70\.000|70,000|\$70/)).toBeVisible();
  });

  test("landing page tiene enlace al portal/login", async ({ page }) => {
    await page.goto("/");
    const loginLink = page.locator('a[href="/login"], a[href="/portal"]').first();
    await expect(loginLink).toBeVisible();
  });

  test("página de login renderiza formulario", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator('input[placeholder="tucorreo@email.com"]')).toBeVisible();
    await expect(page.locator('input[placeholder="••••••••"]')).toBeVisible();
    await expect(page.locator('button:has-text("Ingresar")')).toBeVisible();
  });

  test("login muestra ícono de ojo para contraseña", async ({ page }) => {
    await page.goto("/login");
    const eyeBtn = page.locator('button[aria-label="Mostrar contraseña"]');
    await expect(eyeBtn).toBeVisible();
    await eyeBtn.click();
    await expect(page.locator('button[aria-label="Ocultar contraseña"]')).toBeVisible();
    const passInput = page.locator('input[placeholder="••••••••"]');
    await expect(passInput).toHaveAttribute("type", "text");
  });

  test("login con credenciales incorrectas muestra error", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[placeholder="tucorreo@email.com"]').fill("noexiste@test.com");
    await page.locator('input[placeholder="••••••••"]').fill("wrongpassword");
    await page.locator('button:has-text("Ingresar")').click();
    await expect(page.locator("text=Correo o contraseña incorrectos")).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("/portal sin sesión redirige a /login", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL(/\/login/);
  });

  test("/admin sin sesión redirige a /login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
  });

  test("sitemap.xml devuelve 200", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
  });

  test("robots.txt devuelve 200", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("Sitemap");
  });
});
