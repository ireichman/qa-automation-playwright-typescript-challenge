/*
Login page objet class for making the login process reusable.
This class contains methods for navigating the login page and logging in.
*/

import { Page } from "@playwright/test";

// Importing the URL var from .env.
const UI_BASE_URL: string = process.env.UI_BASE_URL?? '';

// If the UI_BASE_URL is empty, throw an error.
if (!UI_BASE_URL) {
    throw new Error(`Error retrieving UI_BASE_URL from .env. Received: ${UI_BASE_URL}`);
};


export class LoginPage {
  // Element selectors
  private readonly selectors = {
    // Form elements
    loginForm: "form",
    usernameInput: "#username",
    passwordInput: "#password",
    loginButton: "#login-button",

    // Verification elements
    pageTitle: ".login_logo",
    userInfoBox: "#login_credentials",
    loginErrorMessage: "error",

    // Post-login elements
    productTitle: "#title",
  };

  /**
   * Constructor - initializes the page object with a Playwright page
   * @param page - Playwright page object to interact with
   */
  constructor(private page: Page) {}

  /**
   * Navigates to the login page
   * @returns Promise that resolves when navigation is complete
   */
  async navigate() {
    const url = UI_BASE_URL;
    console.log(`Navigating to login page: ${url}`);
    await this.page.goto(url);
  }

  /**
   * Verifies the login page is fully loaded by checking for elements that a user would expect to see.
   * @returns Promise that resolves when verification is complete.
   */
  async verifyPageLoaded() {
    // Wait for and verify title is present
    await this.page.waitForSelector(this.selectors.pageTitle);
    console.log("Login page title is visible");

    // Verify login form elements are present
    await this.page.waitForSelector(this.selectors.usernameInput);
    await this.page.waitForSelector(this.selectors.passwordInput);
    await this.page.waitForSelector(this.selectors.loginButton);

    // Verify footer is present
    await this.page.waitForSelector(this.selectors.loginForm);
    console.log("Login page loaded successfully");
  }

  /**
   * Gets the text content of the page title.
   * @returns Promise resolving to the title text
   */
  async getPageTitle(): Promise<string> {
    return (await this.page.textContent(this.selectors.pageTitle)) || "";
  }

  /**
   * Checks for login form.
   * @returns Promise resolving to the footer text
   */
  async getFooterText(): Promise<string> {
    return (await this.page.textContent(this.selectors.loginForm)) || "";
  }

  /**
   * Performs the login action with provided credentials
   * @param username - User's username or email
   * @param password - User's password
   * @returns Promise that resolves when login is complete and verified
   */
  async login(username: string, password: string): Promise<void> {
    console.log(`Attempting login for user: ${username}`);

    // Fill in the login form.
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);

    // Click login button and wait for navigation/response
    await Promise.all([
      // Click the button
      this.page.getByRole("button", { name: "Login" }).click(),

      // Wait for either success or error indicator
      this.page.waitForSelector(
        [this.selectors.productTitle, this.selectors.loginErrorMessage].join(", ")
      ),
    ]);

    // Check if login was successful
    const errorVisible = await this.page.isVisible(this.selectors.loginErrorMessage);
    if (errorVisible) {
      const errorText = await this.page.textContent(
        this.selectors.loginErrorMessage
      );
      throw new Error(`Login failed: ${errorText}`);
    }
}

  /**
   * Checks if user is currently logged in.
   * @returns Promise resolving to boolean indicating login status.
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.page.isVisible(this.selectors.productTitle);
  }

  /**
   * Retrieves any error message displayed on the login page.
   * @returns Promise resolving to error message text, or empty string if none
   */
  async getErrorMessage(): Promise<string> {
    if (await this.page.isVisible(this.selectors.loginErrorMessage)) {
      return (await this.page.textContent(this.selectors.loginErrorMessage)) || "";
    }
    return "";
  }
}