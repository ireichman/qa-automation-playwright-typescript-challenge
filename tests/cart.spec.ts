import { test, expect, UI_BASE_URL } from "../fixtures/test.fixture";
import { InventoryPage } from "../page-objects/inventory.page";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing cart functionality.
test.describe("cart functionality @cart", () => {
  test(
    "add 1 item to cart @fast @cart @tcid12",
    {
      annotation: {
        type: "positive",
        description: "Add 1 item to cart.",
      },
    },
    async ({ inventoryPage }) => {
      // Navigate to inventory page.
      await inventoryPage.goto();

      // Add an item to cart.
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      // Check the product count on the cart badge.
      const cartBadge = await inventoryPage.getShoppingCartBadgeCount();
      expect(cartBadge).toBe(1);
    }
  );
});
