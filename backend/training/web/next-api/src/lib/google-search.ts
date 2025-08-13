import { chromium, Page, Browser } from '@playwright/test';

/**
 * Performs a Google search using Playwright.
 * @param query - The search query string.
 * @param headless - Whether to run the browser in headless mode. Defaults to true.
 * @param timeout - The time to wait after performing the search (in milliseconds). Defaults to 10000.
 */
async function searchGoogle(query: string, headless: boolean = true, timeout: number = 10000): Promise<void> {
  const browser: Browser = await chromium.launch({ headless });

  try {
    const page: Page = await browser.newPage();
    await page.goto('https://www.google.com');
    await page.waitForLoadState('networkidle');

    // Handle cookie consent dialog if present
    try {
      const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i });
      if (await acceptButton.isVisible({ timeout: 3000 })) {
        await acceptButton.click();
      }
    } catch {
      // Ignore if no cookie dialog appears
    }

    // Perform the search
    const searchBox = page.getByRole('combobox', { name: 'Search' });
    await searchBox.fill(query);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    // Wait for the specified timeout duration
    await page.waitForTimeout(timeout);
  } catch (error) {
    console.error('An error occurred during the search:', error);
  } finally {
    await browser.close();
  }
}

// Example usage
searchGoogle('mcp', false).catch(error => {
  console.error('Search failed:', error);
  process.exit(1);
});
