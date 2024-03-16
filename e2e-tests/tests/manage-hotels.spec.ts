import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.locator("[name=email]").fill("johndoe@gmail.com");
  await page.locator("[name=password]").fill("secret");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign in Successfully")).toBeVisible();
});

test("should allow the user to create a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name=name]").fill("test_hotel");
  await page.locator("[name=city]").fill("test_city");
  await page.locator("[name=country]").fill("test_country");
  await page.locator("[name=description]").fill("test_description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Airport Shuttle").click();
  await page.getByLabel("Spa").click();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("2");
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files/1.jpg"),
    path.join(__dirname, "files/2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Saving...")).toBeVisible();
  await page.waitForTimeout(6000);
  await expect(page.getByText("Hotel added successfully")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.getByRole("link", { name: "My Hotels" }).click();
  await expect(page.getByText("test_hotel").first()).toBeVisible();
  await expect(page.getByText("Budget").first()).toBeVisible();
  await expect(page.getByText("3 Star Rating").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
});

test("should allow the user to edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("test_hotel");
  await page.locator('[name="name"]').fill("test_hotel_updated");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Saving...")).toBeVisible();
  await page.waitForTimeout(8000);
  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("test_hotel_updated");
  await page.locator('[name="name"]').fill("test_hotel");
  await page.getByRole("button", { name: "Save" }).click();
});
