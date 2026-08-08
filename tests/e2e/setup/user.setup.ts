import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../../.auth/user.json");

setup("autenticar como usuario", async ({ page }) => {
  const email = process.env.USER_EMAIL ?? "maria.test.cobalto@gmail.com";
  const password = process.env.USER_PASSWORD ?? "Cobalto123";

  await page.goto("/login");
  await page.locator('input[placeholder="tucorreo@email.com"]').fill(email);
  await page.locator('input[placeholder="••••••••"]').fill(password);
  await page.locator('button:has-text("Ingresar")').click();
  await expect(page).toHaveURL(/\/portal/);
  await page.context().storageState({ path: authFile });
});
