import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";

export class InventoryPage extends BasePage {
  // Inventory page elements
  readonly productSortContainer: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadgeCount: Locator;
  readonly inventoryItemsTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.productSortContainer = page.getByTestId("product-sort-container");
    this.inventoryList = page.getByTestId("inventory-list");
    this.inventoryItems = page.getByTestId("inventory-item");
    this.shoppingCartBadgeCount = page.getByTestId("shopping-cart-badge");
    this.inventoryItemsTitles = page.getByTestId("inventory-item-name");
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
    const productTitles = this.inventoryItemsTitles;
    return productTitles.allTextContents();
  }

  /**
   * Retrieve product prices.
   * @returns Array of product prices as numbers only, without $.
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
    // Finding the inventory item container for the product.
    const productContainer = this.inventoryItems.filter({
      hasText: productName,
    });
    // finding the 'add to cart' button for the product.
    const addToCartButton = await productContainer.getByRole("button", {
      name: "Add to cart",
    });
    await addToCartButton.click();
  }

  /**
   * Remove a product from cart by name.
   * @param productName Name of the product to remove.
   */
  async removeProductFromCart(productName: string): Promise<void> {
    // Finding the inventory item container for the product.
    const productContainer = await this.inventoryItems.filter({
      hasText: productName,
    });
    const removeButton = await productContainer.getByRole("button", {
      name: "Remove",
    });
    await removeButton.click();
  }

  /**
   * Check if product is in cart.
   * @param productName Name of the product to check.
   * @returns True if product is in cart.
   */
  async isProductInCart(productName: string): Promise<boolean> {
    // Finding the inventory item container for the product.
    const productContainer = await this.inventoryItems.filter({
      hasText: productName,
    });

    const buttonText = await productContainer.getByRole("button").textContent();
    return buttonText?.includes("Remove") || false;
  }

  /**
   * Open product details page.
   * @param productName Name of the product to open.
   */
  async openProductDetails(productName: string): Promise<void> {
    await this.page.getByRole("link", { name: productName }).click();
  }
  /**
   * Get the shopping cart badge count.
   * @returns Number of items in the shopping cart.
   */
  async getShoppingCartBadgeCount(): Promise<number> {
    // Check if the cart badge is visible
    // const cartBadge = this.page.locator(".shopping_cart_badge");
    if (!(await this.shoppingCartBadge.isVisible())) {
      return 0; // Return 0 if the badge is not visible
    } else {
      const badgeText = await this.shoppingCartBadge.textContent();
      return parseInt(badgeText || "0", 10);
    }
  }
}
