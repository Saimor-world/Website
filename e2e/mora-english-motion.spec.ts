import { test, expect } from '@playwright/test';

// Exercise normal motion even when headless software graphics would select site Lite mode.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('saimor-lite', 'off'); } catch {} });
});

test('English keyboard passage opens the living clearing using normal motion', async ({ page }, info) => {
  test.setTimeout(90000);
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await page.goto('/en/mora/deep-view#mora');
  await expect(page.locator('html')).toHaveAttribute('data-public-ready', 'true');
  await page.getByRole('button', { name: 'See through her eyes' }).click();
  await expect(page.getByRole('heading', { name: 'Through MÔRA’s eyes' })).toBeFocused();
  await page.getByRole('button', { name: 'Let the light in', exact: true }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Clarity.' })).toBeFocused();
  // Keyboard focus holds the flying guide before activation; no moving-target click race.
  await page.getByRole('button', { name: 'Get to know MÔRA', exact: true }).press('Enter');
  await expect(page.getByRole('link', { name: 'Discover MÔRA in the OS' })).toHaveAttribute('href', '/en/mora#im-os');
  await expect(page.locator('[data-guide-chapter] [data-mora-body] canvas')).toBeVisible();
  await page.screenshot({ path: info.outputPath('after-morning-english.png'), animations: 'disabled' });
  expect(exceptions).toEqual([]);
});

