import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../../.auth/admin.json");

setup("autenticar como admin", async ({ page }) => {
  const email = process.env.ADMIN_EMAIL ?? "admin@gymcobalto.test";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("Falta ADMIN_PASSWORD en variables de entorno");

  await page.goto("/login");
  await page.locator('input[placeholder="tucorreo@email.com"]').fill(email);
  await page.locator('input[placeholder="••••••••"]').fill(password);
  await page.locator('button:has-text("Ingresar")').click();
  await expect(page).toHaveURL(/\/admin/);
  await page.context().storageState({ path: authFile });
});
