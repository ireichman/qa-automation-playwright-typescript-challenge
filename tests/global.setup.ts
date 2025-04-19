import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

async function globalSetup() {
    console.log('Starting global setup...');
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    try {
        // OPTIONAL: This could be helpful for creating test users and/or other initial data to be referenced
        // locally during tests. The usefulness may be greatly reduced for this QA coding challenge, yet
        // it's here as a starter if it can help.
    } catch (error) {
        console.error('Error in global setup:', error);
        throw error;
    } finally {
        await context.close();
        await browser.close();
    }
}

export default globalSetup;
