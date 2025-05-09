import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";


export class InventoryPage extends BasePage {
  // Inventory page elements
  readonly productSortContainer: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadgeCount: Locator;

  constructor(page: Page) {
    super(page);
    this.productSortContainer = page.locator(".product_sort_container");
    this.inventoryList = page.locator(".inventory_list");
    this.inventoryItems = page.locator(".inventory_item");
  }

  /**
   * Navigate to inventory page directly.
   */
  async goto(): Promise<void> {
    await this.page.goto(`${UI_BASE_URL}inventory.html`);
  }

  /**
   * Retrieve the number of products displayed.
   * @returns Number of products.
   */
  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Sort products.
   * @param option Sort option (e.g., 'az', 'za', 'lohi', 'hilo').
   */
  async sortProductsBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.productSortContainer.selectOption(option);
  }

  /**
   * Retrieve product titles.
   * @returns Array of product titles.
   */
  async getProductTitles(): Promise<string[]> {
    const titles = await this.page
      .locator(".inventory_item_name")
      .allTextContents();
    return titles;
  }

  /**
   * Retrieve product prices.
   * @returns Array of product prices as numbers only without $.
   */
  async getProductPrices(): Promise<number[]> {
    const priceStrings = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return priceStrings.map((price) => parseFloat(price.replace("$", "")));
  }

  /**
   * Add a product to cart by name.
   * @param productName Name of the product to add.
   */
  async addProductToCart(productName: string): Promise<void> {
    const productItem = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: productName,
      }),
    });

    await productItem
      .locator("button")
      .filter({
        hasText: "Add to cart",
      })
      .click();
  }

  /**
   * Remove a product from cart by name.
   * @param productName Name of the product to remove.
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productItem = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: productName,
      }),
    });

    await productItem
      .locator("button")
      .filter({
        hasText: "Remove",
      })
      .click();
  }

  /**
   * Check if product is in cart.
   * @param productName Name of the product to check.
   * @returns True if product is in cart.
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const productItem = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: productName,
      }),
    });

    const buttonText = await productItem.locator("button").textContent();
    return buttonText?.includes("Remove") || false;
  }

  /**
   * Open product details page.
   * @param productName Name of the product to open.
   */
  async openProductDetails(productName: string): Promise<void> {
    await this.page
      .locator(".inventory_item_name", {
        hasText: productName,
      })
      .click();
  }
    /**
     * Get the shopping cart badge count.
     * @returns Number of items in the shopping cart.
     */

    async getShoppingCartBadgeCount(): Promise<number> {
        // Check if the cart badge is visible
        const cartBadge = this.page.locator(".shopping_cart_badge");
        if (!(await cartBadge.isVisible())) {
            return 0; // Return 0 if the badge is not visible
        } else {
            const badgeText = await this.page.locator(".shopping_cart_badge").textContent();
            return parseInt(badgeText || "0", 10);
        }
    }
    
};
