import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('saimor-lite', 'off'); } catch {} });
});

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
  const banner = await page.getByRole('banner').boundingBox();
  const title = await region.getByText('SAIMÔR / MÔRA ALIVE · V04', { exact: true }).boundingBox();
  expect(banner).not.toBeNull(); expect(title).not.toBeNull();
  expect(title!.y).toBeGreaterThanOrEqual(banner!.y + banner!.height);
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

test('the actual MÔRA product page has one interactive body and a working shared pause', async ({ page }, info) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /THREE.WebGLProgram|Shader Error/.test(message.text())) errors.push(message.text());
  });
  await page.goto('/mora');
  const essential = page.getByRole('button', { name: /^Nur essenziell$/i });
  await essential.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
  if (await essential.isVisible()) await essential.click();
  const hero = page.locator('section[aria-labelledby="mora-hero-title"]');
  const presence = page.getByTestId('mora-hero-presence');
  const canvas = presence.locator('canvas');
  await expect(canvas).toBeVisible({ timeout: 20000 });
  await expect(page.locator('[data-mora-presence]')).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'MÔRA Alive Vorschau' })).toHaveCount(0);
  await expect(hero.getByRole('heading', { level: 1 })).toContainText('Klarheit');
  const banner = await page.getByRole('banner').boundingBox();
  const title = await hero.getByRole('heading', { level: 1 }).boundingBox();
  expect(title!.y).toBeGreaterThanOrEqual(banner!.y + banner!.height);
  await presence.press('Enter');
  if (info.project.name.includes('iphone')) await presence.tap(); else await presence.click();
  await page.getByRole('button', { name: 'MÔRA und Hintergrund pausieren', exact: true }).click();
  await expect(presence).toHaveAttribute('data-still', 'true');
  const before = await canvas.screenshot();
  await page.waitForTimeout(250);
  expect(await canvas.screenshot()).toEqual(before);
  await hero.screenshot({ path: info.outputPath('mora-product-hero.png') });
  await page.getByRole('button', { name: 'MÔRA und Hintergrund fortsetzen', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(presence).toHaveAttribute('data-still', 'true');
  const reduced = await canvas.screenshot();
  await page.waitForTimeout(250);
  expect(await canvas.screenshot()).toEqual(reduced);
  await page.getByRole('button', { name: 'Termine', exact: true }).click();
  await expect(page.getByTestId('mora-context-preview')).toContainText('Mit Kontext in den Termin.');
  await expect(page.getByRole('link', { name: 'MÔRA begegnen' })).toHaveAttribute('href', '/mora/deep-view?from=mora');
  await page.locator('#im-os').scrollIntoViewIfNeeded();
  await expect(page.locator('#im-os').getByRole('button', { name: 'MÔRA im OS erleben' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/en/mora');
  await expect(page.getByTestId('mora-hero-presence').locator('canvas')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Invite MÔRA closer' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Clarity');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.getByTestId('mora-hero-presence')).toHaveAttribute('data-still', 'false');
  await page.evaluate(() => {
    document.documentElement.classList.add('lite');window.dispatchEvent(new Event('saimor-lite'));
  });
  await expect(page.getByTestId('mora-hero-presence')).toHaveAttribute('data-still', 'true');
  const liteCanvas = page.getByTestId('mora-hero-presence').locator('canvas');
  const lite = await liteCanvas.screenshot();await page.waitForTimeout(250);
  expect(await liteCanvas.screenshot()).toEqual(lite);
  expect(errors).toEqual([]);
});

test('the real product page stays usable without WebGL', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (/^webgl|experimental-webgl/.test(type)) return null;
      return getContext.apply(this, [type, ...args] as never);
    } as typeof getContext;
  });
  await page.goto('/mora');
  await expect(page.getByRole('img', { name: 'MÔRA: interaktive Ansicht nicht verfügbar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Klarheit/, level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'MÔRA im OS erleben' }).first()).toBeVisible();
  await expect(page.locator('[data-mora-presence]')).toHaveCount(1);
});
