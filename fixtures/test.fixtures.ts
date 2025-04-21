/* 
Extending Playwright's test fixture to include custom page objects.
*/

import { test as base, Page, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login.page";
import { InventoryPage } from "../page-objects/inventory.page";
import { CartPage } from "../page-objects/cart.page";
import { CheckoutStepOnePage } from "../page-objects/checkout-step-one.page";
import { CheckoutStepTwoPage } from "../page-objects/checkout-step-two.page";
import { CheckoutCompletePage } from "../page-objects/checkout-complete.page";

// Define all fixtures
type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  loggedInPage: Page;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
};

// Export the extended test
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    console.log("Creating a new LoginPage object");
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // A fixture that provides an already logged-in page
  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
});

// Also exporting expect so it's not necessary to have a separate import.
export { expect } from "@playwright/test";

/*
exporting UI_BASE_URL from .env file.
Having it here allows us to use it in all page objects.
*/
// Importing the URL var from .env.
export const UI_BASE_URL: string = process.env.UI_BASE_URL ?? "";

// If UI_BASE_URL is empty, throw an error.
if (!UI_BASE_URL) {
  throw new Error(
    `Error retrieving UI_BASE_URL from .env. Received: ${UI_BASE_URL}`
  );
}
