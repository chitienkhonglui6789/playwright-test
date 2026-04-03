const { test, expect } = require('@playwright/test');

test('24h - navigate category and article flow', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('https://www.24h.com.vn/');

  // 2. Verify homepage loaded
  await expect(page).toHaveTitle(/24h|Tin tức/i);

  // 3. Click "Công nghệ" category (fallback if not found)
  const category = page.getByRole('link', { name: /Công nghệ/i }).first();

  if (await category.isVisible()) {
    await category.click();
  } else {
    // fallback: click any visible category link
    const fallbackCategory = page.locator('a[href*="cong-nghe"], a').first();
    await fallbackCategory.click();
  }

  // 4. Verify navigation happened
  await expect(page).toHaveURL(/cong-nghe|\.vn/);

  // 5. Wait for articles
  const articles = page.locator('a[href*=".html"]');
  await expect(articles.first()).toBeVisible();

  // 6. Click first article
  await articles.first().click();

  // 7. Verify article page loaded
  const titleLocator = page.locator('h1');
  await expect(titleLocator).toBeVisible();

  // 8. Validate title (stable check)
  const title = await titleLocator.innerText();
  expect(title.trim().length).toBeGreaterThan(0);
  expect(title).toMatch(/[a-zA-ZÀ-ỹ]/);

  // 9. Verify article content exists
  const paragraphs = page.locator('p');
  await expect(paragraphs.first()).toBeVisible();

  // 10. Go back
  await page.goBack();

  // 11. Verify still on site
  await expect(page).toHaveURL(/24h|cong-nghe/);
});
