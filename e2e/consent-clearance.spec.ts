import { expect, test } from '@playwright/test';

test('fresh consent leaves page actions reachable without recording a choice', async ({ page }, info) => {
  await page.goto('/de');
  const banner = page.getByRole('dialog', { name: 'Datenschutz', exact: true });
  await expect(banner).toBeVisible();
  await expect(banner).toHaveCSS('opacity', '1');
  // Even the final footer action must scroll clear of the fixed banner.
  const footerAction = page.locator('footer[data-public-footer]').getByRole('button').first();
  await footerAction.evaluate(element => element.scrollIntoView({ block: 'end', behavior: 'instant' }));
  await expect.poll(async () => {
    const a = await footerAction.boundingBox(), b = await banner.boundingBox();
    return Boolean(a && b && a.y + a.height <= b.y - 8);
  }).toBe(true);
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
  await page.screenshot({ path: info.outputPath('threshold-above-consent.png'), animations: 'disabled' });
  await action.click();
  await expect(page).toHaveURL(/\/mora\/deep-view\?from=portal$/);
  await expect(banner).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingBottom))).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem('analytics_enabled'))).toBeNull();
});

test('expanded consent remains usable on a short screen and releases its space after a choice', async ({ page }, info) => {
  await page.setViewportSize({ width: info.project.name.endsWith('390') ? 390 : 1440, height: 390 });
  await page.goto('/de');
  const banner = page.getByRole('dialog', { name: 'Datenschutz', exact: true });
  await expect(banner).toHaveCSS('opacity', '1');
  await banner.getByRole('button', { name: 'Einstellungen', exact: true }).click();
  const save = banner.getByRole('button', { name: 'Speichern', exact: true });
  await save.scrollIntoViewIfNeeded();
  await expect(save).toBeInViewport();
  await expect.poll(async () => {
    const box = await banner.boundingBox();
    return Boolean(box && box.y >= 0 && box.y + box.height <= 390);
  }).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem('analytics_enabled'))).toBeNull();
  await page.screenshot({ path: info.outputPath('consent-short-screen.png'), animations: 'disabled' });
  await save.click();
  await expect(banner).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingBottom))).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem('cookie_consent'))).toBe('essential');
  expect(await page.evaluate(() => localStorage.getItem('analytics_enabled'))).toBe('false');
});
