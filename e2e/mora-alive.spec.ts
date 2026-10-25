import { test, expect } from '@playwright/test';

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
  await page.getByRole('link', { name: 'Switch language to EN' }).click();
  await expect(region).toBeVisible();
  await expect(page).toHaveURL(/\/en\/mora\/alive$/);
  await page.getByRole('link', { name: 'Switch language to DE' }).click();
  await expect(page).toHaveURL(/\/de\/mora\/alive$/);
  await expect(region).toBeVisible();
});
