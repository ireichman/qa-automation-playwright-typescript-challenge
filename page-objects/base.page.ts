import { Page, Locator, expect } from "@playwright/test";

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

  constructor(page: Page) {
    this.page = page;

    // Initialize common elements.
    this.headerLogo = page.locator(".app_logo");
    this.burgerMenuButton = page.locator("#react-burger-menu-btn");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.sidebarMenu = page.locator(".bm-menu-wrap");
    this.sidebarInventoryLink = page.locator("#inventory_sidebar_link");
    this.sidebarAboutLink = page.locator("#about_sidebar_link");
    this.sidebarLogoutLink = page.locator("#logout_sidebar_link");
    this.sidebarResetAppLink = page.locator("#reset_sidebar_link");
    this.sidebarCloseButton = page.locator("#react-burger-cross-btn");
  }

  /**
   * Open the sidebar menu.
   */
  async openMenu(): Promise<void> {
    if (!(await this.sidebarMenu.isVisible())) {
      await this.burgerMenuButton.click();
      await this.sidebarMenu.waitFor({ state: "visible" });
    }
  }

  /**
   * Close sidebar menu.
   */
  async closeMenu(): Promise<void> {
    if (
      await this.sidebarMenu.isVisible({ timeout: 1000 }).catch(() => false)
    ) {
      await this.sidebarCloseButton.click();
      await this.sidebarMenu.waitFor({ state: "hidden" });
    }
  }

  /**
   * Logout from the application.
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.sidebarLogoutLink.click();
    // Should redirect to login page
    await this.page.waitForURL(/.*\/.*login.*/);
  }

  /**
   * Reset the app state
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.sidebarResetAppLink.click();
    await this.closeMenu();
  }

  /**
   * Go to the shopping cart
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/.*\/cart.html/);
  }

  /**
   * Get the number of items in cart.
   * @returns The number of items in cart, or 0 if empty.
   */
  async getCartItemCount(): Promise<number> {
    const cartBadge = this.page.locator(".shopping_cart_badge");
    const isVisible = await cartBadge.isVisible().catch(() => false);
    if (!isVisible) return 0;

    const countText = await cartBadge.textContent();
    return countText ? parseInt(countText, 10) : 0;
  }
}
