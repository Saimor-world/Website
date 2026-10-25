import { test, expect, type Page } from '@playwright/test';

async function switchLanguage(page: Page, language: 'EN' | 'DE') {
  const desktop = page.getByRole('link', { name: `Switch language to ${language}` });
  if (await desktop.isVisible()) await desktop.click();
  else {
    await page.getByRole('button', { name: /Menü öffnen|Open menu/ }).click();
    await page.getByRole('dialog', { name: /^(Menü|Menu)$/ }).getByRole('link', { name: language, exact: true }).click();
  }
}

test('Website reuses the OS body with explicit preview provenance', async ({ page }) => {
  await page.goto('/mora/alive');
  const essential = page.getByRole('button', { name: /^Nur essenziell$/i });
  await essential.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
  if (await essential.isVisible()) await essential.click();
  const region = page.getByRole('region', { name: 'MÔRA Alive Vorschau' });
  await expect(region.locator('canvas')).toBeVisible({ timeout: 20000 });
  await expect(region).toHaveAttribute('data-character-source', 'preview');
  await region.getByRole('combobox', { name: 'Character-Vorschau' }).selectOption('approval');
  await expect(region.getByRole('status')).toHaveText('Braucht deine Freigabe');
  await region.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(region.getByRole('button', { name: 'Bewegung fortsetzen' })).toHaveAttribute('aria-pressed', 'true');
  await switchLanguage(page, 'EN');
  await expect(region).toBeVisible();
  await expect(page).toHaveURL(/\/en\/mora\/alive$/);
  await switchLanguage(page, 'DE');
  await expect(page).toHaveURL(/\/de\/mora\/alive$/);
  await expect(region).toBeVisible();
});
