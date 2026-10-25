import { test, expect } from '@playwright/test';

test('Website reuses the OS body with explicit preview provenance', async ({ page }) => {
  await page.goto('/mora/alive');
  const region = page.getByRole('region', { name: 'MÔRA Alive Vorschau' });
  await expect(region.locator('canvas')).toBeVisible({ timeout: 20000 });
  await expect(region).toHaveAttribute('data-character-source', 'preview');
  await region.getByRole('combobox', { name: 'Character-Vorschau' }).selectOption('approval');
  await expect(region.getByRole('status')).toHaveText('Braucht deine Freigabe');
  await region.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(region.getByRole('button', { name: 'Bewegung fortsetzen' })).toHaveAttribute('aria-pressed', 'true');
});
