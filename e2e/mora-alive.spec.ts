import { test, expect } from '@playwright/test';

test('Website reuses the OS body with explicit preview provenance', async ({ page }) => {
  await page.goto('/mora/alive');
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20000 });
  const region = page.getByRole('region', { name: 'MÔRA Alive Vorschau' });
  await expect(region).toHaveAttribute('data-character-source', 'preview');
  await page.getByRole('combobox', { name: 'Character-Vorschau' }).selectOption('approval');
  await expect(page.getByRole('status')).toHaveText('Braucht deine Freigabe');
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(page.getByRole('button', { name: 'Bewegung fortsetzen' })).toHaveAttribute('aria-pressed', 'true');
});
