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
  // Provenance and navigation do not require continuous software-GPU animation.
  // The product-page journey below separately verifies normal motion and pause.
  await page.emulateMedia({ reducedMotion: 'reduce' });
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
  await expect(region).toHaveAttribute('data-still', 'true');
  await region.getByRole('combobox', { name: 'Character-Vorschau' }).selectOption('approval');
  await expect(region.getByRole('status')).toHaveText('Braucht deine Freigabe');
  await region.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(region.getByRole('button', { name: 'Bewegung fortsetzen' })).toHaveAttribute('aria-pressed', 'true');
  await region.getByRole('button', { name: 'Bewegung fortsetzen' }).click();
  await expect(region).toHaveAttribute('data-still', 'true');
  await switchLanguage(page, 'EN');
  await expect(region).toBeVisible();
  await expect(page).toHaveURL(/\/en\/mora\/alive$/);
  await switchLanguage(page, 'DE');
  await expect(page).toHaveURL(/\/de\/mora\/alive$/);
  await expect(region).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(region).toHaveAttribute('data-still', 'false');
  await page.evaluate(() => {
    document.documentElement.classList.add('lite');window.dispatchEvent(new Event('saimor-lite'));
  });
  await expect(region).toHaveAttribute('data-still', 'true');
  const canvas = region.locator('canvas');
  const stillFrame = await canvas.screenshot();await page.waitForTimeout(250);
  expect(await canvas.screenshot()).toEqual(stillFrame);
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
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/mora/deep-view#mora');
  await expect(page.locator('[data-mora-body]')).toHaveAttribute('data-unavailable', 'true');
  await page.getByRole('button', { name: 'Durch ihre Augen sehen' }).click();
  await expect(page.getByRole('button', { name: 'MÔRA kennenlernen' })).toBeVisible();
  await page.getByRole('button', { name: 'MÔRA kennenlernen' }).click();
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toBeVisible();
});

test('Deep View carries one canonical body from encounter into the star river', async ({ page }, info) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/mora/deep-view?from=mora#mora');
  const encounter = page.getByTestId('deep-mora');
  await expect(encounter.locator('[data-mora-body] canvas')).toBeVisible();
  await expect(page.locator('[data-mora-body]')).toHaveCount(1);
  await expect(page.locator('img[src*="mora-stone"], [data-face-state]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Zurück zu MÔRA' })).toHaveAttribute('href', '/mora#deep-view');
  // A canvas's intrinsic DPR width must not expand the encounter's mobile grid track.
  const bounds = await page.getByRole('button', { name: 'MÔRA halten', exact: true }).evaluate(button => {
    const rect = (element: Element) => {
      const { x, width } = element.getBoundingClientRect();return { x, width };
    };
    return { button: rect(button), frame: rect(button.parentElement!),
      canvas: rect(button.querySelector('canvas')!) };
  });
  expect(bounds.button.width).toBeLessThanOrEqual(bounds.frame.width + .5);
  expect(Math.abs(bounds.canvas.width - bounds.button.width)).toBeLessThan(1);
  expect(Math.abs(bounds.button.x + bounds.button.width / 2
    - bounds.frame.x - bounds.frame.width / 2)).toBeLessThan(1);
  await encounter.screenshot({ path: info.outputPath('deep-alive-encounter.png') });
  await page.getByRole('button', { name: 'MÔRA halten', exact: true }).press('Enter');
  await expect(page).toHaveURL(/#clarity$/);
  const guide = page.locator('[data-guide-chapter]');
  const body = guide.locator('[data-mora-body]');
  await expect(body.locator('canvas')).toBeVisible();
  await expect(page.locator('[data-mora-body]')).toHaveCount(1);
  await expect(body).toHaveAttribute('data-still', 'true');
  const before = await body.locator('canvas').screenshot();await page.waitForTimeout(250);
  expect(await body.locator('canvas').screenshot()).toEqual(before);
  await expect(page.locator('canvas[data-scene="clearing"]')).toBeVisible();
  await page.getByRole('button', { name: 'MÔRA kennenlernen', exact: true }).click();
  await page.locator('article details summary').first().click();
  await expect(guide).toHaveAttribute('data-guide-chapter', '0');
  await expect(body).toHaveAttribute('data-character-state', 'listening');
  await expect(page.locator('[data-mora-body]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Lichtung genießen', exact: true }).click();
  await page.screenshot({ path: info.outputPath('deep-alive-river.png') });
  await page.getByRole('button', { name: 'Noch einmal', exact: true }).click();
  await expect(page.getByTestId('deep-uncertainty')).toBeVisible();
  await expect(page.locator('[data-mora-body]')).toHaveCount(0);
  await page.goto('/en/mora/deep-view?from=mora#mora');
  await expect(page.getByRole('button', { name: 'Hold MÔRA' }).locator('canvas')).toBeVisible();
  await page.getByRole('button', { name: 'See through her eyes' }).click();
  await expect(page.getByRole('button', { name: 'Get to know MÔRA' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
