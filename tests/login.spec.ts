import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { InventoryPage } from '../page-objects/inventory.page';
import { testUsers } from '../utilities/helpers';
import { log } from 'console';
import { UI_BASE_URL } from '../fixtures/test.fixtures';



// Testing login functionality.
test.describe('login functionality', () => {


    test.beforeEach( async ({ page }) => {
        //Create a new LoginPage object for each test.
        const loginPage = new LoginPage(page);
        // Navigate to the login page.
        await loginPage.goto();
    });

    test('Successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.login(`${testUsers.validUser.name}`, `${testUsers.validUser.password}`);
        // Verify that the inventory page is displayed after login.
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(page).toHaveURL(`${UI_BASE_URL}inventory.html`);
    })
})