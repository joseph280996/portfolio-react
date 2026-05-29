import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("English home renders hero and landmarks", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/en");

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    expect(errors, errors.join("\n")).toHaveLength(0);
  });

  test("root redirects to a locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(en|vi)$/);
  });

  test("unknown route renders the 404 page", async ({ page }) => {
    const res = await page.goto("/en/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });

  test("locale switcher swaps to Vietnamese", async ({ page }) => {
    await page.goto("/en");
    // Vietnamese hero copy from content/vi/sections/hero.mdx.
    await page.goto("/vi");
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
    await expect(page.locator("h1")).toContainText("Tùng");
  });

  test("home visual snapshot", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    // Wait for self-hosted fonts so glyph metrics are stable across runs.
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot("home-en.png", {
      fullPage: true,
      animations: "disabled",
    });
  });
});

test.describe("navigation", () => {
  test("projects index lists project cards", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("a[href*='/projects/']").first()).toBeVisible();
  });

  test("blog index lists posts", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.getByRole("article").first()).toBeVisible();
  });
});
