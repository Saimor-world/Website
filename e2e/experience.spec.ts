import { expect, test, type Page, type TestInfo } from '@playwright/test';

const routes = ['/de', '/en', '/mora', '/en/mora', '/studio', '/en/studio', '/yori', '/en/yori', '/de/kontakt', '/en/contact', '/de/einstieg/security-check', '/en/entry/security-check'];
async function visit(page: Page, route: string) {
  const response = await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-public-ready', 'true');
  return response;
}
async function consent(page: Page) {
  const essential = page.getByRole('button', { name: /Nur Essenziell|Essential only|Only essential/i });
  await essential.waitFor({ state: 'visible', timeout: 2000 }).catch(() => undefined);
  if (await essential.isVisible()) await essential.click();
}
async function shot(page: Page, info: TestInfo, name: string, fullPage = false) {
  if (fullPage) {
    // Wait at each real image before returning to the top. WebKit may defer a
    // footer lazy image when a scrolling sweep immediately jumps away again.
    for (const image of await page.locator('img').all()) {
      if (!await image.isVisible()) continue;
      if (!await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true, { timeout: 15000 });
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth), {
          timeout: 15000, message: `${name}: ${await image.getAttribute('src')}`,
        }).toBeGreaterThan(0);
      }
    }
    await page.evaluate(() => {
      const scrollport = document.body.scrollHeight > document.documentElement.scrollHeight ? document.body : document.scrollingElement!;
      scrollport.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }
  await page.screenshot({ path: info.outputPath(`${name}.png`), fullPage, animations: 'disabled' });
}
async function noOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({ width: innerWidth, body: document.body.scrollWidth, root: document.documentElement.scrollWidth, elements: Array.from(document.querySelectorAll('body *')).filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).slice(0, 8).map(e => ({ tag: e.tagName, class: e.className, right: e.getBoundingClientRect().right })) }));
  expect(Math.max(overflow.body, overflow.root), `${page.url()} ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(overflow.width + 1);
}

test('immutable v21 baseline: home, forest, encounter and clarity', async ({ page }, info) => {
  test.setTimeout(90000);
  const baseline = process.env.QA_BASELINE_URL || (info.project.name.startsWith('webkit') ? 'https://127.0.0.1:3444' : 'http://127.0.0.1:3002');
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
    const response = await visit(page, route);
    expect(response?.status(), route).toBe(200);
    await consent(page);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await noOverflow(page);
    await expect(page.locator('html')).toHaveAttribute('lang', route.startsWith('/en') ? 'en' : 'de');
    await expect.poll(() => page.locator('img').evaluateAll(images => images.filter(element => { const i = element as HTMLImageElement; return i.getBoundingClientRect().top < innerHeight && (!i.complete || i.naturalWidth === 0); }).length)).toBe(0);
    await shot(page, info, `after-${route.replaceAll('/', '-')}`, true);
  }
  expect(exceptions).toEqual([]);
});

test('homepage: wordless door, cinematic passage, escape, focus return, product and studio paths', async ({ page }, info) => {
  await visit(page, '/de');
  await consent(page);
  const door = page.getByRole('button', { name: 'Schwelle betreten' });
  await door.scrollIntoViewIfNeeded();
  await shot(page, info, 'after-forest');
  await door.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow-y', 'hidden');
  await expect(page.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeVisible();
  await shot(page, info, 'after-portal');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(door).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
  await page.getByRole('link', { name: 'Produkte entdecken', exact: true }).click();
  await expect(page).toHaveURL(/#products$/);
  await page.getByRole('link', { name: 'MÔRA im Detail entdecken' }).click();
  await expect(page).toHaveURL(/\/mora$/);
  await page.goBack();
  await expect(page.locator('#world-title')).toBeVisible();
  await page.getByRole('link', { name: 'Studio entdecken', exact: true }).first().click();
  await expect(page).toHaveURL(/\/studio$/);
  await page.getByRole('link', { name: 'Die Möglichkeiten ansehen', exact: true }).click();
  await expect(page).toHaveURL(/#wege$/);
  await page.getByRole('link', { name: 'Workshop anfragen', exact: true }).click();
  await expect(page).toHaveURL(/\/de\/kontakt$/);
  await expect(page.getByRole('link', { name: 'E-Mail schreiben' })).toHaveAttribute('href', /^mailto:contact@saimor.world/);
  await page.goBack();
  await expect(page.locator('#studio-title')).toBeVisible();
});

test('cinematic: deliberate passage, real face alignment, history, replay and localization', async ({ page }, info) => {
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await visit(page, '/mora/deep-view');
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
  await visit(page, '/en/mora/deep-view');
  await page.getByRole('button', { name: 'Meet MÔRA' }).click();
  await page.getByRole('button', { name: 'See through her eyes' }).click();
  await expect(page.getByRole('heading', { name: 'See the difference.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discover MÔRA' })).toHaveAttribute('href', '/en/mora');
  expect(exceptions).toEqual([]);
});

test('reduced motion has no timer, zoom or forced transition; short viewport stays usable', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: info.project.use.viewport?.width || 390, height: 620 });
  await visit(page, '/mora/deep-view');
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
  await visit(page, '/de');
  await consent(page);
  const menu = page.locator('button[aria-controls="saimor-mobile-menu"]');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await shot(page, info, 'after-menu');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('product states, workshop details and YORI example rooms respond', async ({ page }, info) => {
  await visit(page, '/mora'); await consent(page);
  for (const name of ['Ruht', 'Träumt', 'Spricht']) {
    const state = page.getByRole('button', { name, exact: true });
    await state.click();
    await expect(state).toHaveAttribute('aria-pressed', 'true');
  }
  await visit(page, '/studio');
  await page.locator('#workshops summary').click();
  await expect(page.locator('#workshops details')).toHaveAttribute('open', '');
  await visit(page, '/yori');
  await page.getByRole('button', { name: 'Werkstatt', exact: true }).click();
  await expect(page.getByText('02 / WERKSTATT', { exact: true }).first()).toBeVisible();
  await shot(page, info, 'after-yori-workshop');
  await page.getByRole('button', { name: 'Cash', exact: true }).click();
  await expect(page.getByText('03 / CASH', { exact: true }).first()).toBeVisible();
});

test('demo failures and scanner failures are visible in both languages (controlled API fixtures)', async ({ page }) => {
  for (const locale of ['de', 'en']) {
    await page.route('**/api/demo-launch', route => route.fulfill({ status: 503, json: { error: 'QA failure fixture' } }));
    await visit(page, locale === 'de' ? '/mora' : '/en/mora'); await consent(page);
    await page.getByRole('button', { name: locale === 'de' ? 'MÔRA im OS erleben' : 'Experience MÔRA in the OS', exact: true }).first().click();
    await expect(page.getByRole('alert').filter({ hasText: locale === 'de' ? 'gerade nicht erreichbar' : 'currently unavailable' })).toBeVisible();
    await page.route('**/api/security-scan', route => route.fulfill({ status: 503, json: { success: false, error: 'QA controlled scanner failure' } }));
    await visit(page, locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check');
    await page.getByPlaceholder(locale === 'de' ? 'deine-domain.de' : 'your-domain.com').fill('example.com');
    await page.getByPlaceholder(locale === 'de' ? 'dein@email.de' : 'you@example.com').fill('qa@example.com');
    await page.getByRole('button', { name: locale === 'de' ? 'Scan starten' : 'Start scan', exact: true }).click();
    await expect(page.getByText('QA controlled scanner failure', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: locale === 'de' ? 'Erneut versuchen' : 'Try again', exact: true }).click();
    await expect(page.getByRole('button', { name: locale === 'de' ? 'Scan starten' : 'Start scan', exact: true })).toBeVisible();
  }
});
