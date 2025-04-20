import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { UI_BASE_URL } from "../fixtures/test.fixtures";

export class CheckoutStepOnePage extends BasePage {
    // Checkout step one elements.
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize elements.
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.getByTestId('[data-test="error"]');
        
    }

    /**
     * Navigate to step one page.
     */
    async goto(): Promise<void> {
        await this.page.goto(`${UI_BASE_URL}checkout-step-one.html`);
    }

    /**
     * Fill in checkout form.
     * @param firstName 
     * @param lastName
     * @param zipCode 5 digit number as string.
     */
    async fillInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    /**
     * Click continue button.
     */
    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Click cancel button.
     */
    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    /**
     * Check for an error message.
     * @returns True if there is an error.
     */
    async hasError(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    /**
     * Retrieve error message string.
     * @returns Error message string or empty string if there is no error.
     */
    async getErrorMessage(): Promise<string | null> {
        if (await this.hasError()) {
            return await this.errorMessage.textContent() || "";
        }
        return null;
    }

}