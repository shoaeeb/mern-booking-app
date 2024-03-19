import { test, expect } from "@playwright/test";
import { link } from "fs";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.locator("[name=email]").fill("johndoe@gmail.com");
  await page.locator("[name=password]").fill("secret");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign in Successfully")).toBeVisible();
});

test("should allow the user to search", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("where are you going").fill("dublin");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels Found in Dublin")).toBeVisible();
});

test("should allow the user to show detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "View More" }).first().click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});
