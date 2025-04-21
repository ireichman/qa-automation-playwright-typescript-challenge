import { log } from "console";
import { test, expect, UI_BASE_URL } from "../fixtures/test.fixtures";
import { testUsers, generateRandomString } from "../utilities/helpers";

// Testing login functionality.
test.describe("login functionality @login", () => {
  // Testing successful login with 2 users by iterating through the testUsers array.
  [testUsers.validUser, testUsers.problemUser].forEach((user) =>
    test(
      `Successful login for ${user.name} @fast @login @smoke @regression @tcid5`,
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
    "Unsuccessful login - invalid username and valid password @fast @login @smoke @regression @tcid6",
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
    "Unsuccessful login - bad username and good password @fast @login @smoke @regression @tcid7",
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
    "Unsuccessful login - good username and invalid password @fast @login @regression @tcid8",
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
    "Login timeout @slow, @logout @login @smoke @regression @tcid9",
    {
      annotation: {
        type: "positive",
        description:
          "Test that the session times out after 10 minutes of inactivity.",
      },
    },
    async ({ loginPage, page }) => {
      // Log in with valid credentials.
      await loginPage.login(
        testUsers.validUser.name,
        testUsers.validUser.password
      );
      // Wait for 10 minutes.
      await page.waitForTimeout(10 * 60 * 1000);
      // Due to the waiting time (10m) involved in building this test, it will not be completed this sprint.

      // Verify that the login page is displayed. Might need to referesh the page.
    }
  );

  test(
    "Logout after successful login @fast @logout @login @smoke @regression @tcid10",
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

  test(
    "load login page with performance metrics @fast @tcid2 @smoke @regression @performance",
    {
      annotation: {
        type: "performance",
        description: "Load the login page and collect performance metrics.",
      },
    },
    async ({ loginPage, page }, testInfo) => {
      // load the login page.
      await loginPage.goto();

      // Collect performance metrics using the browser's Performance API.
      const metrics = await page.evaluate(() => {
        const perfEntries = performance.getEntriesByType("navigation");
        return perfEntries[0] as PerformanceNavigationTiming;
      });
      // Format metrics into a readable report.
      const performanceReport = {
        domContentLoaded:
          metrics.domContentLoadedEventEnd - metrics.domContentLoadedEventStart,
        // More metrics can be added here as needed.
      };
      // Convert the metrics object to a formatted string.
      const formattedReport = JSON.stringify(performanceReport, null, 2);
      // Attach the metrics to the test report.
      await testInfo.attach("performance-metrics.json", {
        body: formattedReport,
        contentType: "application/json",
      });

      // Check that the page has loaded.
      const loginPagetitle = await loginPage.loginLogo;
      await expect(loginPagetitle).toHaveText("Swag Labs");
      // Check that the login form is present.
      const loginButton = await loginPage.loginButton;
      await expect(loginButton).toBeVisible();
      // Verify load time is within acceptable limits.
      expect(performanceReport.domContentLoaded).toBeLessThan(3000); // This is an example threshold, IRL it will be based on benchmarks and feature specifications.
    }
  );

  test("load login page with performance metrics", async ({
    page,
  }, testInfo) => {
    // Load the login page
    await page.goto(UI_BASE_URL);

    // Collect performance metrics using the browser's Performance API
    const metrics = await page.evaluate(() => {
      const perfEntries = performance.getEntriesByType("navigation");
      return perfEntries[0] as PerformanceNavigationTiming;
    });

    // Format the metrics into a readable report
    const performanceReport = {
      domContentLoaded:
        metrics.domContentLoadedEventEnd - metrics.domContentLoadedEventStart,
      // loadEvent: metrics.loadEventEnd - metrics.loadEventStart,
      // ttfb: metrics.responseStart - metrics.requestStart,
      // domInteractive:
      //   metrics.domInteractive - metrics.domContentLoadedEventStart,
      // domComplete: metrics.domComplete - metrics.domContentLoadedEventStart,
    };

    // Convert the metrics object to a formatted string
    const formattedReport = JSON.stringify(performanceReport, null, 2);

    // Attach the metrics to the test report
    await testInfo.attach("performance-metrics.json", {
      body: formattedReport,
      contentType: "application/json",
    });

    // Check that the page has loaded
    const title = page.locator(".login_logo");
    await expect(title).toHaveText("Swag Labs");
    // Check that the login form is present
    const loginForm = page.locator("form");
    await expect(loginForm).toBeVisible();
    // Verify load time is within acceptable limits.
    expect(performanceReport.domContentLoaded).toBeLessThan(3000); // This is an example threshold, IRL it will be based on benchmarks and feature specifications.
  });

  test(
    "Security - check for HTTPS @fast @security @login @smoke @regression @tcid21",
    {
      annotation: {
        type: "security",
        description:
          `Check that the login page is served over HTTPS and not HTTP. This test Mostly demonstrates security testing,
          due to the test server not having strict security headers.`,
      },
    },
    async ({ page }) => {
      // Load the login page
      const browserResponse = await page.goto(UI_BASE_URL);

      // Check if the page is served over HTTPS. TODO: Check for redirections.
      const finalUrl = page.url();

      // Check if the URL starts with "https://"
      const isHttps = finalUrl.startsWith("https://");
      expect(isHttps).toBeTruthy();

      // Check that the response the browser receives is successful (status code < 400).
      expect(browserResponse?.status()).toBeLessThan(400);

      // Check security headers.
      const securityHeaders = browserResponse?.headers();
      if (securityHeaders) {
      // Check for strict transport security header. It's not implemented in the test server though.

        if (securityHeaders["strict-transport-security"]) {
          expect(securityHeaders["strict-transport-security"]).toBeDefined();
        }

        if (securityHeaders["content-security-policy"]) {
          expect(securityHeaders["content-security-policy"]).toBeDefined();
        }
      }

});
});
