import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";



export class CheckoutStepTwoPage extends BasePage {
  // Checkout step two elements.
  readonly cartItems: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize elements.
    this.cartItems = page.locator(".cart_item");
    this.summarySubtotal = page.locator(".summary_subtotal_label");
    this.summaryTax = page.locator(".summary_tax_label");
    this.summaryTotal = page.locator(".summary_total_label");
    this.finishButton = page.locator("#finish");
    this.cancelButton = page.locator("#cancel");
  }

  /**
   * Navigate to checkout step two page directly.
   */
  async goto(): Promise<void> {
    await this.page.goto(`${UI_BASE_URL}checkout-step-two.html`);
  }

  /**
   * Get the subtotal amount.
   * @returns Subtotal amount as a number.
   */
  async getSubtotal(): Promise<number> {
    const subtotalText = (await this.summarySubtotal.textContent()) || "0";
    // Using regex to extract numbers from a string with a dollar amount ("$12.34" => "12.34").
    const match = subtotalText.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get the tax amount.
   * @returns Tax amount as a number.
   */
  async getTax(): Promise<number> {
    const taxText = (await this.summaryTax.textContent()) || "0";
    // Using regex to extract numbers from a string with a dollar amount ("$12.34" => "12.34").
    const match = taxText.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get the total amount.
   * @returns Total amount as a number.
   */
  async getTotal(): Promise<number> {
    const totalText = (await this.summaryTotal.textContent()) || "0";
    // Using regex to extract numbers from a string with a dollar amount ("$12.34" => "12.34").
    const match = totalText.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Complete order.
   */
  async finish(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL(`${UI_BASE_URL}checkout-complete.html`);
  }

  /**
   * Cancel order and return to products.
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForURL(`${UI_BASE_URL}inventory.html`);
  }
}
