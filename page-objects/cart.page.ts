import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";

export class CartPage extends BasePage {
  // Cart page elements.
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemNames: Locator;
  readonly cartList: Locator;

  constructor(page: Page) {
    // Call the constructor of the base page.
    super(page);
    // Initialize elements.
    this.cartItems = page.getByTestId("inventory-item");
    this.cartItemNames = page.getByTestId("inventory-item-name");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });
    this.cartList = page.getByTestId("cart-list");
  }

  /**
   * Navigate to cart page directly.
   */
  async goto(): Promise<void> {
    await this.page.goto(`${UI_BASE_URL}cart.html`);
  }

  /**
   * Get the number of items in cart.
   * @returns Number of items in cart.
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get names of all items in cart.
   * @returns Array of item names.
   */
  async getItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  /**
   * Remove item from cart by name.
   * @param itemName Name of the item to remove.
   */
  async removeItem(itemName: string): Promise<void> {
    const item = this.cartItems.filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: itemName,
      }),
    });

    await item.locator(".cart_button").click();
  }

  /**
   * Continue shopping (will return to inventory).
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL(`${UI_BASE_URL}inventory.html`);
  }

  /**
   * Proceed to checkout.
   */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    const nextPage = await this.page.waitForURL(
      `${UI_BASE_URL}checkout-step-one.html`
    );
  }
}
