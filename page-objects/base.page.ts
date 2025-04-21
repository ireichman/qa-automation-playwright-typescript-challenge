import { Page, Locator } from "@playwright/test";
import { UI_BASE_URL } from "../fixtures/test.fixtures";

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
   * Check if the sidebar menu is open. isVisible method was not reliable.
   * Instead I used getAttribute to check the style for transform attribute.
   * @returns A boolean indicating if the menu is open.
   */
  async isMenuOpen(): Promise<boolean> {
    const style = await this.sidebarMenu.getAttribute('style');
    const isVisible = !style?.includes('transform');
    return isVisible;
  }


  /**
   * Open the sidebar menu.
   */
  async openMenu(): Promise<void> {
    const isVisible = await this.isMenuOpen();
    if (!isVisible) {
      await this.burgerMenuButton.click();
      await this.sidebarMenu.waitFor({ state: "visible" });
    }
  }

  /**
   * Close sidebar menu.
   */
  async closeMenu(): Promise<void> {
    const isVisible = await this.isMenuOpen();
    if (isVisible) {
      await this.sidebarCloseButton.click();
      await this.sidebarMenu.waitFor({ state: "hidden" });
    }
  }

  /**
   * Logout from the application.
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.waitForTimeout(1000);
    // await this.sidebarLogoutLink.waitFor({ state: "visible" });
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
    const cartBadge = this.page.locator(".shopping_cart_badge");
    const isVisible = await cartBadge.isVisible().catch(() => false);
    if (!isVisible) return 0;

    const countText = await cartBadge.textContent();
    return countText ? parseInt(countText, 10) : 0;
  }
}
