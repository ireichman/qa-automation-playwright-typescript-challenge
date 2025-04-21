import { fa } from "@faker-js/faker";
import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing cart functionality.
test.describe("Checkout functionality @checkout", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Logging in before each test. Cannot reuse logins because the cart will have unexpected items.
    await loginPage.goto();
    await loginPage.login(
      testUsers.validUser.name,
      testUsers.validUser.password
    );
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test("checkout - 1 Sauce Labs Fleece Jacket, correct total price @fast @checkout @smoke @regression @tcid17", {
    annotation: {
      type: "positive",
      description:
        "Adding an item to the cart, proceeding to checkout, and verifying the total price.",
    },
  }, async ({ inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    // Navigate to inventory page.
    await inventoryPage.goto();

    // Add an item to cart.
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");

    // Navigate to the cart page.
    await cartPage.goto();

    // Verify that the cart page is displayed.
    await expect(cartPage.cartList).toBeVisible();

    // Proceed to checkout.
    await cartPage.checkout();

    // Fill checkout step one info. and continue.
    // await checkoutStepOnePage.firstNameInput.toBeVisible();
    await checkoutStepOnePage.fillInformation(generateRandomString(7), generateRandomString(3), generateRandomString(5, false, false, true));
    await checkoutStepOnePage.continue();

    // Verify that the total price is correct.
    // await checkoutStepTwoPage.checkoutOverview.toBeVisible();
    await expect(checkoutStepTwoPage.summarySubtotal).toBeVisible();
    const totalPrice = await checkoutStepTwoPage.getTotal();
    const subtotalPrice = await checkoutStepTwoPage.getSubtotal();
    const taxPrice = await checkoutStepTwoPage.getTax();
    const expectedTotalPrice = subtotalPrice + taxPrice;
    expect(totalPrice).toBe(expectedTotalPrice);
  }
  );

});
