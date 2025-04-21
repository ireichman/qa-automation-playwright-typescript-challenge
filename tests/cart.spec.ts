import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { InventoryPage } from "../page-objects/inventory.page";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing cart functionality.
test.describe("cart functionality @cart", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Logging in before each test. Cannot reuse logins because the cart will have unexpected items.
    await loginPage.goto();
    await loginPage.login(
      testUsers.validUser.name,
      testUsers.validUser.password
    );
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test(
    "add 1 item to cart indicated in cart page @fast @cart @tcid15",
    {
      annotation: {
        type: "positive",
        description: "Adding an item to the cart and verifying the cart page.",
      },
    },
    async ({ inventoryPage, cartPage }) => {
      // Navigate to inventory page.
      await inventoryPage.goto();

      // Add an item to cart.
      await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt");

      // Navigate to the cart page.
      await cartPage.goto();

      // Verify that the cart page is displayed.
      await expect(cartPage.cartList).toBeVisible();

      // Verify that the item is present in the cart.
      const cartItem = await cartPage.getItemNames();
      expect(cartItem[0]).toBe("Sauce Labs Bolt T-Shirt");
      expect(await cartPage.getItemCount()).toBe(1);
    }
  );
});
