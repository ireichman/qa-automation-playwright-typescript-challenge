import { Page, Locator } from "@playwright/test";
import { UI_BASE_URL } from "../fixtures/test.fixtures";
import { el } from "@faker-js/faker";

export class BasePage {
  readonly page: Page;

  // Common elements.
  readonly headerLogo: Locator;
  readonly burgerMenuButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly sidebarMenu: Locator;
  readonly sidebarInventoryLink: Locator;
  readonly sidebarAboutLink: Locator;
  readonly sidebarLogoutLink: Locator;
  readonly sidebarResetAppLink: Locator;
  readonly sidebarCloseButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    

    // Initialize common elements.
    this.headerLogo = page.getByText("Swag Labs");
    this.burgerMenuButton = page.getByRole("button", { name: "Open Menu"});
    this.shoppingCartLink = page.getByRole("link", { name: "shopping-cart-link" });
    this.sidebarMenu = page.locator(".bm-menu-wrap[aria-hidden='false']").getByRole("navigation");
    this.sidebarInventoryLink = page.getByRole("link", { name: "All Items" });
    this.sidebarAboutLink = page.getByRole("link", { name: "About" });
    this.sidebarLogoutLink = page.getByRole("link", { name: "Logout" });
    this.sidebarResetAppLink = page.getByRole("link", { name: "Reset App State" });
    this.sidebarCloseButton = page.getByRole("button", { name: "Close Menu" });
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
  }

  async openMenu(): Promise<void> {
    await this.burgerMenuButton.click();
  }

  /**
   * Close sidebar menu.
   */
  async closeMenu(): Promise<void> {
      await this.sidebarCloseButton.click();
  }

  /**
   * Logout from the application.
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.sidebarLogoutLink.click({ timeout: 2000 });
    // Should redirect to login page
    await this.page.waitForURL(UI_BASE_URL);
  }

  /**
   * Reset the app state.
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.sidebarResetAppLink.click();
    await this.closeMenu();
  }

  /**
   * Go to the shopping cart.
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(`${UI_BASE_URL}cart.html`);
  }

  /**
   * Get the number of items in cart.
   * @returns The number of items in cart, or 0 if empty.
   */
  async getCartItemCount(): Promise<number> {
    // Check if the shopping cart badge is visible. If .isVisible() fails, catch the error and return false.
    const isVisible = await this.shoppingCartBadge
      .isVisible()
      .catch(() => false);
    // If the badge is not visible, return 0.
    if (!isVisible) {
      return 0;
    } else {
      const countText = await this.shoppingCartBadge.textContent();
      // If there is a text content, parse it as an integer. If not, return 0.
      return countText ? parseInt(countText, 10) : 0;
    }

  }
}
