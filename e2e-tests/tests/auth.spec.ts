import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";
test("should allow the users to sign in", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.locator("[name=email]").fill("johndoe@gmail.com");
  await page.locator("[name=password]").fill("secret");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign in Successfully")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create A Account" })
  ).toBeVisible();

  const randomEmail = `test-${Math.floor(Math.random() * 100000)}@example.com`;
  await page.locator("[name=firstName]").fill("test_first_name");
  await page.locator("[name=lastName]").fill("test_last_name");
  await page.locator("[name=email]").fill(randomEmail);
  await page.locator("[name=password]").fill("random_password");
  await page.locator("[name=confirmPassword]").fill("random_password");
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Created Account Successfully")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
});
