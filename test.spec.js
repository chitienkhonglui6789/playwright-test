const { test, expect } = require('@playwright/test');

test('24h - navigate category and article flow', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('https://www.24h.com.vn/');

  // 2. Verify homepage loaded
  await expect(page).toHaveTitle(/24h|Tin tức/);

  // 3. Click "Công nghệ" category
  const category = page.getByRole('link', { name: /Công nghệ/i }).first();
  await expect(category).toBeVisible();
  await category.click();

  // 4. Verify category page URL
  await expect(page).toHaveURL(/cong-nghe/);

  // 5. Wait for articles to load
  const articles = page.locator('a[href*=".html"]');
  await expect(articles.first()).toBeVisible();

  // 6. Click first article
  const firstArticle = articles.first();
  const articleTitle = await firstArticle.innerText();
  await firstArticle.click();

  // 7. Verify article page
  await expect(page.locator('h1')).toBeVisible();

  // 8. Verify article has content
  const paragraphs = page.locator('p');
  await expect(paragraphs.first()).toBeVisible();

  // 9. Verify title is not empty
  const title = await page.locator('h1').innerText();
  expect(title.length).toBeGreaterThan(10);

  // 10. Go back
  await page.goBack();

  // 11. Verify still in category page
  await expect(page).toHaveURL(/cong-nghe/);
});
