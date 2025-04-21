import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { InventoryPage } from '../page-objects/inventory.page';
import { testUsers, generateRandomString } from '../utilities/helpers';
import { log } from 'console';
import { UI_BASE_URL } from '../fixtures/test.fixtures';



// Testing login functionality.
test.describe('login functionality @login', () => {
    // Declare  a login page object.
    let loginPage;

    test.beforeEach( async ({ page }) => {
        //Initialize a new LoginPage object for each test.
        loginPage = new LoginPage(page);
        // Navigate to the login page.
        await loginPage.goto();
    });

    test('Successful login @fast @login @tcid5', {
        annotation: {
            type: 'positive',
            description: 'Login with valid credentials should redirect to the inventory page.'
        }
        },
        async ({ page }) => {
        
        await loginPage.login(testUsers.validUser.name, testUsers.validUser.password);
        // Verify that the inventory page is displayed after login.
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(page).toHaveURL(`${UI_BASE_URL}inventory.html`);
    });

    test('Unsuccessful login - bad username and password @fast @login @tcid6', {
        annotation: {
            type: 'negative',
            description: 'Log in with bas username and bad password.'
        }
        },
        async ({ page }) => {
        // Attempt to login with invalid credentials.
        await loginPage.login(testUsers.invalidUser.name, testUsers.invalidUser.password);
        // Verify that the error message is displayed.
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
    test('Unsuccessful login - bad username and good password @fast @login @tcid7', {
        annotation: {
            type: 'negative',
            description: 'Log in with bad username and good password.'
        }
        },
        async ({ page }) => {
        // Attempt to login with invalid credentials.
        await loginPage.login(generateRandomString(8), testUsers.validUser.password);

            await loginPage.login(generateRandomString(8), testUsers.validUser.password);

            // Verify that error message is displayed.
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        });

        test('Unsuccessful login - good username and invalid password @fast @login @tcid8', {
            annotation: {
                type: 'negative',
                description: 'Log in with good username and bad password.'
            }
            },
            async ({ page }) => {
                // Attempt to login with invalid password.
                await loginPage.login(testUsers.validUser.name, generateRandomString(10));
                // Verify that error message is displayed.
                await expect(loginPage.errorMessage).toBeVisible();
                await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
            });
        
})