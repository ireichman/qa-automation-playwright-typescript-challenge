import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { InventoryPage } from "../page-objects/inventory.page";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing cart functionality.
test.describe("cart functionality @cart", () => {
    test.beforeEach(
        async ({ loginPage, inventoryPage }) => {
            // Logging in before each test. Cannot reuse logins because the cart will have unexpected items.
            await loginPage.goto();
            await loginPage.login(testUsers.validUser.name, testUsers.validUser.password);
            await expect(inventoryPage.inventoryList).toBeVisible();
        }
    );
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

    test(
        "add all items to cart @fast @cart @tcid13",
        {
        annotation: {
            type: "positive",
            description: "Add all items to cart.",
        },
        },
        async ({ inventoryPage }) => {
        // Navigate to inventory page.
        await inventoryPage.goto();
    
        // Add all items to cart.
        const productCount = await inventoryPage.getProductCount();
        for (let i = 0; i < productCount; i++) {
            const productName = await inventoryPage.getProductTitles();
            await inventoryPage.addProductToCart(productName[i]);
        }
        // Check the product count on the cart badge.
        const cartBadge = await inventoryPage.getShoppingCartBadgeCount();
        expect(cartBadge).toBe(productCount);

        }
    );

    test(
        'cart badge - add 1 item to cart and remove it indicated in badge @fast @cart @tcid14',
        {
            annotation: {
                type: 'positive',
                description: 'Adding an item to the cart should update the cart badge count. Removing it should decrease the count.',
            }
        },
        async ({ inventoryPage }) => {
            // Navigate to inventory page.
            await inventoryPage.goto();

            // Add an item to cart.
            await inventoryPage.addProductToCart("Sauce Labs Onesie");
            // Check the product count on the cart badge.
            const cartBadge = await inventoryPage.getShoppingCartBadgeCount();
            expect(cartBadge).toBe(1);

            // Remove the item from the cart.
            await inventoryPage.removeProductFromCart("Sauce Labs Onesie");
            // Check the product count on the cart badge.
            const cartBadgeAfterRemove = await inventoryPage.getShoppingCartBadgeCount();
            expect(cartBadgeAfterRemove).toBe(0);
        }
    )

});
