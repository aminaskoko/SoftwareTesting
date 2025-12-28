import { test, expect } from "@playwright/test";

test("Making sure the home pages load properly", async ({ page }) => {
  await page.goto("https://sweetshop.netlify.app");
  const logo = page.getByText(" Sweet Shop ");

  expect(logo).toBeTruthy();

  const navbar = page.locator(".navbar-nav");
  expect(navbar).toBeTruthy();

  const products = page.getByText("Add to Basket");
  expect(await products.count()).toBe(4);
});

test("Verifying navigation menu links", async ({ page }) => {
  await page.goto("https://sweetshop.netlify.app");

  // Click the get started link.
  await page.getByText("Browse Sweets").click();
  expect(page.url()).toBe("https://sweetshop.netlify.app/sweets");

  await page.getByText("About").click();
  expect(page.url()).toBe("https://sweetshop.netlify.app/about");
});

test("Verify Contact Form Submission (Valid Input)", async ({ page }) => {
  await page.goto("https://sweetshop.netlify.app/login");

  const emailField = page.locator("#exampleInputEmail");
  await emailField.fill("aminaskoko@mail.com");
  expect(emailField).toHaveValue("aminaskoko@mail.com");

  const passwordField = page.locator("#exampleInputPassword");

  await passwordField.fill("12345");
  expect(passwordField).toHaveValue("12345");

  const loginButton = page.getByRole("button", { name: "Login" });
  await loginButton.click();
  expect(page.getByText("Your Account")).toBeTruthy();
});
