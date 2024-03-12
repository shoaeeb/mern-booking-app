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
  await page.goto(`${UI_URL}/add-hotels`);

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
  await expect(page.getByText("Hotel added successfully"));
});
