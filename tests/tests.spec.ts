import { test, expect } from '@playwright/test';

const UI_BASE_URL: string = process.env.UI_BASE_URL?? '';
if (!UI_BASE_URL) {
    throw new Error(`Error retrieving UI_BASE_URL from environment variables. Received: ${UI_BASE_URL}`);
};

test.describe('Website availability and resposiveness', () => {
    test('load login page', async ({ page }) => {1
        // Have fun! 🎉 Thanks!
        // Load the test site.
        await page.goto(UI_BASE_URL);
        // Wait for the page to load.
        await page.waitForLoadState('networkidle');
        // Look for login button.
        const loginButton = await page.getByRole('button', { name: 'Login' });
        // Check if the login button is visible.
        expect(loginButton).toBeVisible();
        // Check if the login button is enabled.
        expect(loginButton).toBeEnabled();
        

    });
});
