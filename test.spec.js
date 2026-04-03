const { test, expect } = require('@playwright/test');

test('24h homepage test', async ({ page }) => {
  await page.goto('https://www.24h.com.vn/');
  await expect(page).toHaveTitle(/24h|Tin tức/);
});
