import { expect, test } from '@playwright/test';

test('fresh consent leaves the threshold action reachable without recording a choice', async ({ page }) => {
  await page.goto('/de');
  const banner = page.getByRole('dialog', { name: 'Datenschutz', exact: true });
  await expect(banner).toBeVisible();
  const action = page.getByTestId('mobile-threshold-entry');
  // The explicit threshold link belongs to the phone layout.
  if ((await page.viewportSize())!.width >= 768) {
    await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingBottom))).toBeGreaterThan(0);
    return;
  }
  await action.evaluate(element => element.scrollIntoView({ block: 'end', behavior: 'instant' }));
  await expect.poll(async () => {
    const a = await action.boundingBox(), b = await banner.boundingBox();
    return Boolean(a && b && a.y + a.height <= b.y - 8);
  }).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem('cookie_consent'))).toBeNull();
  await action.click();
  await expect(page).toHaveURL(/\/mora\/deep-view\?from=portal$/);
  await expect(banner).not.toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('analytics_enabled'))).toBeNull();
});
