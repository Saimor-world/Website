import { expect, test, type Page, type TestInfo } from '@playwright/test';

const baseline = 'https://website-n275k2p3c-marius-projects-20aa51eb.vercel.app';
const routes = ['/de', '/en', '/mora', '/en/mora', '/studio', '/en/studio', '/yori', '/en/yori', '/de/kontakt', '/en/contact', '/de/einstieg/security-check', '/en/entry/security-check'];
async function consent(page: Page) {
  const essential = page.getByRole('button', { name: /Nur Essenziell|Essential only|Only essential/i });
  if (await essential.isVisible()) await essential.click();
}
async function shot(page: Page, info: TestInfo, name: string, fullPage = false) {
  await page.screenshot({ path: info.outputPath(`${name}.png`), fullPage, animations: 'disabled' });
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) <= innerWidth + 1)).toBeTruthy();
}

test('immutable v21 baseline: home, forest, encounter and clarity', async ({ page }, info) => {
  test.setTimeout(90000);
  await page.goto(`${baseline}/de`);
  await consent(page);
  await page.locator('#world-title').waitFor();
  await shot(page, info, 'before-home', true);
  await page.locator('#system').scrollIntoViewIfNeeded();
  await shot(page, info, 'before-forest');
  await page.goto(`${baseline}/mora/deep-view`);
  await page.getByTestId('deep-mora').waitFor();
  await page.waitForTimeout(3200); // capture the OS rest face, after the 2.6 s greeting
  await shot(page, info, 'before-encounter');
  await page.getByRole('button', { name: 'Durch ihre Augen sehen' }).click();
  await shot(page, info, 'before-clarity');
});

test('public routes render, contain one headline, load images and fit the viewport', async ({ page }, info) => {
  test.setTimeout(180000);
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await consent(page);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await noOverflow(page);
    await expect.poll(() => page.locator('img').evaluateAll(images => images.filter(element => { const i = element as HTMLImageElement; return i.getBoundingClientRect().top < innerHeight && (!i.complete || i.naturalWidth === 0); }).length)).toBe(0);
    await shot(page, info, `after-${route.replaceAll('/', '-')}`, true);
  }
  expect(exceptions).toEqual([]);
});

test('homepage: wordless door, cinematic passage, escape, focus return, product and studio paths', async ({ page }, info) => {
  await page.goto('/de');
  await consent(page);
  const door = page.getByRole('button', { name: 'Schwelle betreten' });
  await door.scrollIntoViewIfNeeded();
  await shot(page, info, 'after-forest');
  await door.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await expect(page.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeVisible();
  await shot(page, info, 'after-portal');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(door).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.getByRole('link', { name: 'Produkte entdecken', exact: true }).click();
  await expect(page).toHaveURL(/#products$/);
  await page.getByRole('link', { name: 'MÔRA im Detail entdecken' }).click();
  await expect(page).toHaveURL(/\/mora$/);
  await page.goBack();
  await page.getByRole('link', { name: 'Studio entdecken', exact: true }).first().click();
  await expect(page).toHaveURL(/\/studio$/);
  await page.getByRole('link', { name: 'Workshop anfragen', exact: true }).click();
  await expect(page).toHaveURL(/\/de\/kontakt$/);
  await expect(page.getByRole('link', { name: 'E-Mail schreiben' })).toHaveAttribute('href', /^mailto:contact@saimor.world/);
});

test('cinematic: deliberate passage, real face alignment, history, replay and localization', async ({ page }, info) => {
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await page.goto('/mora/deep-view');
  await consent(page);
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await shot(page, info, 'after-intro');
  await page.getByRole('button', { name: 'MÔRA begegnen' }).click();
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(page.locator('[data-face-state="rest"]')).toBeVisible();
  const face = await page.locator('[data-face-state]').boundingBox();
  const stone = await page.getByRole('img', { name: 'MÔRA, Jadestein' }).boundingBox();
  expect(face).not.toBeNull(); expect(stone).not.toBeNull();
  for (const key of ['x', 'y', 'width', 'height'] as const) expect(Math.abs(face![key] - stone![key])).toBeLessThan(1);
  await shot(page, info, 'after-encounter');
  await page.getByRole('button', { name: 'Durch ihre Augen sehen' }).click();
  await expect(page.getByTestId('deep-clarity')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sieh den Unterschied.' })).toBeFocused();
  await noOverflow(page);
  await shot(page, info, 'after-clarity');
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'MÔRA.', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Noch einmal' }).click();
  await expect(page.getByTestId('deep-uncertainty')).toBeVisible();
  await page.goto('/en/mora/deep-view');
  await page.getByRole('button', { name: 'Meet MÔRA' }).click();
  await page.getByRole('button', { name: 'See through her eyes' }).click();
  await expect(page.getByRole('heading', { name: 'See the difference.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discover MÔRA' })).toHaveAttribute('href', '/en/mora');
  expect(exceptions).toEqual([]);
});

test('reduced motion has no timer, zoom or forced transition; short viewport stays usable', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: info.project.use.viewport?.width || 390, height: 620 });
  await page.goto('/mora/deep-view');
  await consent(page);
  await page.waitForTimeout(5100);
  await expect(page.getByTestId('deep-uncertainty')).toBeVisible();
  await page.getByRole('button', { name: 'MÔRA begegnen' }).click();
  await page.getByRole('button', { name: 'Durch ihre Augen sehen' }).click();
  await expect(page.getByTestId('deep-clarity')).toBeVisible();
  await page.getByRole('button', { name: 'Noch einmal' }).click();
  await noOverflow(page);
  await shot(page, info, 'after-short-reduced');
});

test('mobile navigation: escape, keyboard focus and readable entry', async ({ page }, info) => {
  test.skip((info.project.use.viewport?.width || 390) >= 768, 'Mobile navigation only');
  await page.goto('/de');
  await consent(page);
  const menu = page.getByRole('button', { name: 'Menü öffnen' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await shot(page, info, 'after-menu');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});
