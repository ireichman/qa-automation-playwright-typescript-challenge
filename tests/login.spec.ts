import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing login functionality.
test.describe("login functionality @login", () => {
  [testUsers.validUser, testUsers.problemUser].forEach((user) =>
    test(
      `Successful login for ${user.name} @fast @login @tcid5`,
      {
        annotation: {
          type: "positive",
          description:
            "Login with valid credentials should redirect to the inventory page.",
        },
      },
      async ({ loginPage, inventoryPage, page }) => {
        await loginPage.login(user.name, user.password);
        // Verify that the inventory page is displayed after login.
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(page).toHaveURL(`${UI_BASE_URL}inventory.html`);
      }
    )
  );

  test(
    "Unsuccessful login - invalid username and valid password @fast @login @tcid6",
    {
      annotation: {
        type: "negative",
        description: "Log in with invalid username and bad password.",
      },
    },
    async ({ loginPage, page }) => {
      // Attempt to login with invalid credentials.
      await loginPage.login(
        testUsers.invalidUser.name,
        testUsers.invalidUser.password
      );
      // Verify that the error message is displayed.
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    }
  );
  test(
    "Unsuccessful login - bad username and good password @fast @login @tcid7",
    {
      annotation: {
        type: "negative",
        description: "Log in with bad username and good password.",
      },
    },
    async ({ loginPage, page }) => {
      // Attempt to login with invalid credentials.
      await loginPage.login(
        generateRandomString(8),
        testUsers.validUser.password
      );

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );

      // Verify that error message is displayed.
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    }
  );

  test(
    "Unsuccessful login - good username and invalid password @fast @login @tcid8",
    {
      annotation: {
        type: "negative",
        description: "Log in with good username and bad password.",
      },
    },
    async ({ loginPage, page }) => {
      // Attempt to login with invalid password.
      await loginPage.login(testUsers.validUser.name, generateRandomString(10));
      // Verify that error message is displayed.
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    }
  );

  test.fixme(
    "Login timeout @slow, @logout @login @tcid9",
    {
      annotation: {
        type: "positive",
        description: "Login",
      },
    },
    async ({ loginPage, page }) => {
      // Log in with valid credentials.
      await loginPage.login(
        testUsers.validUser.name,
        testUsers.validUser.password
      );
      // Wait for 5 minutes.
      await page.waitForTimeout(5 * 60 * 1000);
      // I am trying to find the actual timeout period and message. Will finish the test when the data is found.
    }
  );

  test(
    "Logout after successful login @fast @logout @login @tcid10",
    {
      annotation: {
        type: "positive",
        description: "Log in with valid credentials and then log out.",
      },
    },
    async ({ loginPage, inventoryPage, page }) => {
      // Log in with valid credentials.
      await loginPage.login(
        testUsers.validUser.name,
        testUsers.validUser.password
      );

      // Verify that the inventory page is displayed after login.
      await expect(page).toHaveURL(`${UI_BASE_URL}inventory.html`);

      // Log out.
      await inventoryPage.logout();

      // Verify that the login page is displayed.
      await expect(page).toHaveURL(UI_BASE_URL);
      await expect(loginPage.loginLogo).toBeVisible();
    }
  );

  
});
