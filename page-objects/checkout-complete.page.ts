import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";


export class CheckoutCompletePage extends BasePage {
  // Checkout complete elements.
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize elements.
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backHomeButton = page.locator("#back-to-products");
  }

  /**
   * Navigate to checkout complete page directly.
   */
  async goto(): Promise<void> {
    await this.page.goto(`${UI_BASE_URL}checkout-complete.html`);
  }

  /**
   * Get the complete header text.
   * @returns Complete header text
   */
  async getHeaderText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  /**
   * Get the complete message text.
   * @returns Complete message text.
   */
  async getMessageText(): Promise<string | null> {
    return await this.completeText.textContent();
  }

  /**
   * Return to home/products page.
   */
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.page.waitForURL(/.*\/inventory.html/);
  }
}
