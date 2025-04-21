import { test as setup, expect, UI_BASE_URL } from "./test.fixture";
import { testUsers } from "../utilities/helpers";
import path from "path";
import test from "@playwright/test";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

/**
 * Authentication fixture.
 */
setup("authenticate", async ({ loginPage, inventoryPage, page }) => {
  // Authentication steps.
  await loginPage.goto();
  await loginPage.login(testUsers.validUser.name, testUsers.validUser.password); 

  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  expect(inventoryPage.inventoryList).toBeVisible();
// Store auth state in a file.
  await page.context().storageState({ path: authFile });
});
