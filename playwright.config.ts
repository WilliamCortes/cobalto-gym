import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "https://cobalto-gym.vercel.app";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 1,
  timeout: 20000,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: "**/setup/*.setup.ts" },
    {
      name: "public",
      testMatch: "**/public.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "portal",
      testMatch: "**/portal.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "tests/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "admin",
      testMatch: "**/admin.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "tests/.auth/admin.json",
      },
      dependencies: ["setup"],
    },
  ],
});
