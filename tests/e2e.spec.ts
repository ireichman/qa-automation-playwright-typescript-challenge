import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { testUsers, generateRandomString } from "../utilities/helpers";


test.describe("E2E test suite @e2e", () => {
    test(
        'e2e - login, checkout with 1 item, and logout @fast @e2e @smoke @regression @tcid20', 
    {
        annotation: {
            type: "positive",
            description: `End-to-end test for login, add Test.allTheThings() T-Shirt (Red), 
            checkout and logout. Written from a user's perspective.`,
        }
    },
    async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
        // Navigate to the login page.
        await loginPage.goto();

        // Log in with valid credentials.
        await loginPage.login(
            testUsers.validUser.name,
            testUsers.validUser.password
        );

        // Verify that the inventory page is displayed.
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(inventoryPage.page).toHaveURL(`${UI_BASE_URL}inventory.html`);

        // Add an item to cart.
        await inventoryPage.addProductToCart("Test.allTheThings() T-Shirt (Red)");

        // Navigate to the cart page.
        await cartPage.goto();

        // Verify that the cart page is displayed.
        await expect(cartPage.cartList).toBeVisible();

        // Proceed to checkout.
        await cartPage.checkout();

        // Fill checkout step one info. and continue.
        await checkoutStepOnePage.fillInformation(generateRandomString(7), generateRandomString(3), generateRandomString(5, false, false, true));
        await checkoutStepOnePage.continue();

        // Verify that the checkout step two page is displayed.
        await expect(checkoutStepTwoPage.summarySubtotal).toBeVisible();

        // Complete the checkout process.
        await checkoutStepTwoPage.finish();

        // Verify that the checkout complete page is displayed.
        await expect(await checkoutCompletePage.getHeaderText()).toBe('Thank you for your order!');
    });
});