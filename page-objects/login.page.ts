
import { Page, expect } from "@playwright/test";
import { UI_BASE_URL } from "../fixtures/test.fixtures";


export class LoginPage {
  readonly page: Page;

  // Login page elements.
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessage;
  readonly loginLogo;

  constructor(page: Page) {
    this.page = page;

    // Initialize elements.
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator(".login_logo");
  }

  /**
   * Navigate to login page.
   */
  async goto(): Promise<void> {
    await this.page.goto(UI_BASE_URL);
  }

  /**
   * Login with credentials.
   * @param username Username for login.
   * @param password Password for login.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Check for login errors.
   * @returns True if ther is an error message.
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Gets error message text
   * @returns Error message text unless there is no error; then it's null.
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.hasError()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}
