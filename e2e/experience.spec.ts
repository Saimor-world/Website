import { expect, test, type Page, type TestInfo } from '@playwright/test';

// The QA browser renders in software (SwiftShader), which would switch on the automatic lite mode.
// The journeys below check the full experience, so lite is opted out here (see lib/lite-mode-script.ts).
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('saimor-lite', 'off'); } catch {} });
});

const routes = ['/de', '/en', '/mora', '/en/mora', '/studio', '/en/studio', '/yori', '/en/yori', '/earth', '/de/kontakt', '/en/contact', '/de/einstieg/security-check', '/en/entry/security-check'];
/** Deep View starts in the forest: up through the light, then the universe welcome. */
async function climb(page: Page, german = true) {
  await page.getByRole('button', { name: german ? 'Nach oben' : 'Look up' }).click();
  await page.getByRole('button', { name: german ? 'Weiter' : 'Next', exact: true }).click();
}
async function visit(page: Page, route: string) {
  const response = await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-public-ready', 'true');
  return response;
}
async function consent(page: Page) {
  if (await page.evaluate(() => Boolean(localStorage.getItem('cookie_consent')))) return;
  const essential = page.getByRole('button', { name: /Nur Essenziell|Essential only|Only essential/i });
  await essential.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
  if (await essential.isVisible()) {
    await essential.click();
    await expect(page.getByRole('dialog', { name: /Datenschutz|Privacy/, exact: true })).not.toBeVisible();
  }
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
  // Earth regions come from earth.saimor.world, which only allows the production origin; keep CI hermetic.
  await page.route('https://earth.saimor.world/**', route => route.fulfill({ status: 200, json: { regions: [] } }));
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

test('homepage portal leads through MÔRA into the OS product and back in DE/EN', async ({ page }, info) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['de', 'en'] as const) {
    const german = locale === 'de';
    const home = german ? '/de' : '/en';
    await visit(page, home); await consent(page);
    await expect(page.getByRole('button', { name: /SAIMÔR Earth/ })).toHaveCount(0);
    const horizon = page.getByTestId('earth-horizon');
    await horizon.scrollIntoViewIfNeeded();
    await expect(horizon.getByText('powered by')).toHaveCount(0);
    await expect(horizon.getByRole('link', { name: german ? 'Ein anderer Weg: YORI' : 'Another path: YORI' })).toBeAttached();
    await expect(horizon.getByRole('heading')).toHaveCount(0);
    await expect(horizon.getByTestId('earth-mycelium')).toBeAttached();
    await expect(horizon.getByRole('img', { name: 'MÔRA' })).toHaveCount(0);
    await expect(horizon.locator('[data-testid="earth-mycelium"] canvas')).toHaveCount(2);
    await shot(page, info, `after-earth-horizon-${locale}`);
    const door = page.getByRole('link', { name: german ? 'Schwelle betreten' : 'Cross the threshold' });
    await door.scrollIntoViewIfNeeded();
    await shot(page, info, `after-forest-${locale}`);
    await door.click();
    await expect(page).toHaveURL(/\/mora\/deep-view\?from=portal$/);
    const back = page.getByRole('link', { name: german ? 'Zurück zum Portal' : 'Back to the portal' });
    await expect(back).toHaveAttribute('href', `${home}#system`);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1, name: german ? 'Das SAIMÔR-Universe' : 'The SAIMÔR universe' })).toBeVisible();
    await climb(page, german);
    await page.getByRole('button', { name: german ? /Los geht/ : /Let’s go/ }).click();
    await expect(page.getByTestId('focus-os')).toBeVisible();
    for (let step = 0; step < 5; step++) await page.getByRole('button', { name: german ? /^Weiter/ : /^Next/ }).click();
    await noOverflow(page);
    await shot(page, info, `after-universe-end-${locale}`);
    const product = page.getByRole('link', { name: german ? 'MÔRA im OS entdecken' : 'Discover MÔRA in the OS', exact: true });
    await product.click();
    await expect(page).toHaveURL(new RegExp(`${german ? '/mora' : '/en/mora'}#im-os$`));
    await expect(page.getByRole('button', { name: german ? 'MÔRA im OS erleben' : 'Experience MÔRA in the OS', exact: true }).last()).toBeVisible();
    await page.goBack();
    await back.click();
    await expect(page).toHaveURL(new RegExp(`${home}#system$`));
    await expect(door).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
  }
  await visit(page, '/de#system');
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

test('universe journey: MÔRA guides through the planets, history, pause and replay', async ({ page }, info) => {
  test.setTimeout(info.project.name.startsWith('webkit') ? 150000 : 90000);
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await page.addInitScript(() => {
    const qa = window as unknown as Window & { __contexts: string[] };
    qa.__contexts = [];
    const get = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      qa.__contexts.push(type); return (get as (...args: unknown[]) => RenderingContext | null).call(this, type, ...rest);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await visit(page, '/mora/deep-view');
  await consent(page);
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toHaveCount(0);
  await expect(page.getByTestId('pixel-sky')).toBeAttached();
  // Step 1, forest: MÔRA in her everyday outfit by the water, the scene in coarse pixels.
  await expect(page.getByTestId('deep-universe')).toHaveAttribute('data-mode', 'forest');
  await expect(page.locator('[data-pixel-mora][data-outfit="default"]')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Hier fängt es an: im Wald, am Wasser.');
  const forest = page.locator('[data-scene="forest"] img');
  await expect(forest).toHaveCSS('image-rendering', 'pixelated');
  expect(await forest.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeLessThanOrEqual(200);
  await noOverflow(page);
  await shot(page, info, 'after-universe-forest');
  // Step 2, light: she rises with the captain's hat.
  await page.getByRole('button', { name: 'Nach oben' }).click();
  await expect(page.getByRole('status')).toContainText('Durch das Licht, hinauf.');
  await expect(page.locator('[data-pixel-mora][data-outfit="captain"]')).toBeVisible();
  await shot(page, info, 'after-universe-light');
  // Step 3, the universe of nature planets.
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Jeder Planet trägt ein Stück unserer Welt.');
  await expect(page.locator('[data-body] canvas[data-biome]')).toHaveCount(5);
  await page.waitForTimeout(1200); // the map has risen into place
  await noOverflow(page);
  await shot(page, info, 'after-universe-welcome');
  // Pixel art stays sharp: every pixel canvas is drawn at a whole-number scale with nearest-neighbour rendering.
  const pixels = await page.locator('canvas').evaluateAll(canvases => canvases.map(canvas => {
    const element = canvas as HTMLCanvasElement;
    // Layout width, not the bounding box: orbiting moons are rotated.
    return { ratio: element.offsetWidth / element.width, rendering: getComputedStyle(element).imageRendering };
  }));
  expect(pixels.length).toBeGreaterThan(4);
  for (const pixel of pixels) {
    expect(Math.abs(pixel.ratio - Math.round(pixel.ratio))).toBeLessThan(.01);
    expect(pixel.rendering).toMatch(/pixelated|crisp-edges/);
  }
  await page.getByRole('button', { name: /Los geht/ }).click();
  await expect(page).toHaveURL(/\/mora\/deep-view#os$/);
  await expect(page.getByTestId('focus-os')).toBeVisible();
  await shot(page, info, 'after-universe-os');
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await expect(page.getByTestId('focus-work')).toContainText('KALENDER');
  await shot(page, info, 'after-universe-work');
  await page.goBack();
  await expect(page.getByTestId('focus-files')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('focus-files')).toHaveCount(0);
  await page.getByRole('button', { name: 'AGENTS: Licht · im Hintergrund' }).click();
  await expect(page.getByRole('status')).toContainText('Aktionen brauchen deine Freigabe');
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(page.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
  await noOverflow(page);
  await shot(page, info, 'after-universe-end');
  await page.getByRole('button', { name: /Noch einmal/ }).click();
  await expect(page.getByRole('status')).toContainText('Jeder Planet trägt ein Stück unserer Welt.');
  const contexts = await page.evaluate(() => (window as unknown as Window & { __contexts: string[] }).__contexts);
  expect(contexts.filter(type => /webgl/i.test(type))).toEqual([]);
  expect(exceptions).toEqual([]);
});

test('English universe: planets, moons and the way into the OS', async ({ page }, info) => {
  test.setTimeout(90000);
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await visit(page, '/en/mora/deep-view#work');
  await consent(page);
  await expect(page.getByTestId('focus-work')).toContainText('CALENDAR');
  await expect(page.getByRole('status')).toContainText('Meeting, mail and task sit side by side.');
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await page.getByRole('button', { name: 'SECURITY: Stone · Check' }).click();
  await expect(page.getByRole('link', { name: 'Security Check' })).toHaveAttribute('href', '/en/entry/security-check');
  await page.getByRole('button', { name: /^Next/ }).click();
  await expect(page.getByRole('link', { name: 'Discover MÔRA in the OS' })).toHaveAttribute('href', '/en/mora#im-os');
  await shot(page, info, 'after-universe-english');
  expect(exceptions).toEqual([]);
});

test('reduced motion lands every step at once; short viewport stays usable', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: info.project.use.viewport?.width || 390, height: 620 });
  await visit(page, '/mora/deep-view');
  await consent(page);
  await expect(page.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
  const running = await page.getByTestId('deep-universe').evaluate(element =>
    element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length);
  expect(running).toBe(0);
  await climb(page);
  await page.getByRole('button', { name: /Los geht/ }).click();
  await expect(page.getByTestId('focus-os')).toBeVisible();
  await expect(page.getByRole('button', { name: /^Weiter/ })).toBeInViewport();
  await noOverflow(page);
  await shot(page, info, 'after-short-reduced-universe');
  for (let step = 0; step < 5; step++) await page.getByRole('button', { name: /^Weiter/ }).click();
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toBeInViewport();
  await noOverflow(page);
  await shot(page, info, 'after-short-reduced-end');
});

test('homepage: MÔRA greets, guides the tour on request and stays quiet otherwise', async ({ page }, info) => {
  test.setTimeout(90000);
  // MÔRA sleeps between 22:00 and 06:00 (own unit test); this journey checks her daytime greeting.
  await page.clock.setFixedTime(new Date('2026-10-29T14:00:00'));
  for (const locale of ['de', 'en'] as const) {
    const de = locale === 'de';
    await visit(page, `/${locale}`); await consent(page);
    await page.evaluate(() => localStorage.removeItem('saimor-mora-guide'));
    await visit(page, `/${locale}`);
    // The hero stays as it is: orbits, no parked MÔRA (she may only fly past).
    const hero = page.locator('section[aria-labelledby="world-title"]');
    await expect(page.getByTestId('hero-orbits')).toBeVisible();
    await expect(hero.getByTestId('mora-guide')).toHaveCount(0);
    await expect(hero.locator('[data-testid="mora-flyby"] button, [data-testid="mora-flyby"] a')).toHaveCount(0);
    const greeting = page.locator('#system').getByTestId('mora-guide');
    await greeting.scrollIntoViewIfNeeded();
    await expect(greeting.locator('[data-pixel-mora]')).toBeVisible();
    await expect(greeting.getByRole('status')).toContainText(de ? 'Hallo, ich bin MÔRA.' : 'Hi, I’m MÔRA.');
    await expect(page.getByTestId('mora-guide-dock')).toHaveCount(0);
    await noOverflow(page);
    await shot(page, info, `after-mora-greeting-${locale}`);
    await greeting.getByRole('button', { name: de ? 'Ja, zeig mal' : 'Yes, show me' }).click();
    const dock = page.getByTestId('mora-guide-dock');
    await expect(dock).toBeVisible();
    await page.evaluate(() => document.getElementById('products')?.scrollIntoView({ block: 'start' }));
    await expect(dock).toContainText(de ? 'ZU: PRODUKTE' : 'ON: PRODUCTS');
    await expect(page.locator('#products')).toHaveAttribute('data-mora-focus', 'true');
    await noOverflow(page);
    await shot(page, info, `after-mora-tour-${locale}`);
    await dock.getByRole('button', { name: de ? 'Weiter' : 'Next' }).click();
    await expect(dock).toContainText('Studio');
    await dock.getByRole('button', { name: de ? 'Hinweise schließen' : 'Close hints' }).click();
    await expect(dock.getByRole('button', { name: de ? 'MÔRA antippen' : 'Tap MÔRA' })).toHaveAttribute('aria-expanded', 'false');
    await visit(page, `/${locale}`);
    await expect(page.locator('#system').getByTestId('mora-guide').getByRole('status')).toHaveCount(0);
  }
  // "Look myself": she flies to the bottom-left corner at once and stays there, clear of the discoveries.
  await page.evaluate(() => localStorage.removeItem('saimor-mora-guide'));
  await visit(page, '/de');
  const greeting = page.locator('#system').getByTestId('mora-guide');
  await greeting.scrollIntoViewIfNeeded();
  await greeting.getByRole('button', { name: 'Ich schau selbst' }).click();
  const dock = page.getByTestId('mora-guide-dock');
  await expect(dock).toBeVisible();
  await page.waitForTimeout(1300); // landed
  const viewport = page.viewportSize()!;
  const box = (await dock.boundingBox())!;
  expect(box.x).toBeLessThan(40);
  expect(viewport.height - (box.y + box.height)).toBeLessThan(48);
  const discoveries = page.locator('button[aria-label*="entdeckt"]').filter({ visible: true });
  for (const other of await discoveries.all()) {
    const b = (await other.boundingBox())!;
    expect(box.x + box.width <= b.x || b.x + b.width <= box.x || box.y + box.height <= b.y || b.y + b.height <= box.y).toBe(true);
  }
  await page.evaluate(() => document.getElementById('products')?.scrollIntoView({ block: 'start' }));
  await expect(dock).toBeVisible();
  await shot(page, info, 'after-mora-quiet-dock');
  // Over the hero the corner stays empty: there she only flies through.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(dock).toHaveCount(0);
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

test('mobile priorities: first scroll, optional fields and direct contact stay usable', async ({ page }, info) => {
  test.skip((info.project.use.viewport?.width || 390) >= 768, 'Phone priorities');
  for (const locale of ['de', 'en']) {
    const de = locale === 'de';
    await visit(page, `/${locale}`); await consent(page);
    const ways = page.locator('section[aria-labelledby="world-title"] details');
    await expect(ways).not.toHaveAttribute('open', '');
    await ways.locator('summary').click();
    await expect(ways.getByRole('link', { name: de ? 'Einloggen' : 'Log in', exact: true })).toBeVisible();
    await ways.locator('summary').click();
    await page.evaluate(() => {
      const scrollport = document.body.scrollHeight > document.documentElement.scrollHeight ? document.body : document.scrollingElement!;
      scrollport.scrollBy({ top: 480, left: 0, behavior: 'instant' });
    });
    await expect(page.getByTestId('mobile-threshold-entry')).toBeInViewport();
    await expect(page.getByTestId('mobile-threshold-entry')).toHaveAttribute('href', `${de ? '' : '/en'}/mora/deep-view?from=portal`);
    await shot(page, info, `after-first-scroll-${locale}`);
    await visit(page, de ? '/de/kontakt' : '/en/contact');
    await expect(page.getByRole('link', { name: de ? 'E-Mail schreiben' : 'Send an email', exact: true })).toBeInViewport();
    await visit(page, de ? '/de/einstieg/security-check' : '/en/entry/security-check');
    const optional = page.locator('[data-scan-optional] details');
    await expect(optional).not.toHaveAttribute('open', '');
    const company = page.getByPlaceholder(de ? 'Firmenname' : 'Company name', { exact: true });
    await expect(company).not.toBeVisible();
    await expect(page.getByRole('button', { name: de ? 'Scan starten' : 'Start scan', exact: true })).toBeInViewport();
    await optional.locator('summary').click();
    await company.fill('QA example');
    await optional.locator('summary').click();
    await optional.locator('summary').click();
    await expect(company).toHaveValue('QA example');
  }
});

test('product states, workshop details and YORI example rooms respond', async ({ page }, info) => {
  await visit(page, '/mora'); await consent(page);
  // MÔRA appears exactly once on /mora: the hero stone. No companion, no further figures.
  await expect(page.locator('[data-mora-presence]')).toHaveCount(1);
  await expect(page.locator('[data-mora-character]')).toHaveCount(0);
  await expect(page.getByTestId('mora-companion')).toHaveCount(0);
  await page.getByRole('button', { name: 'Termine', exact: true }).click();
  await expect(page.getByTestId('mora-context-preview')).toContainText('Mit Kontext in den Termin.');
  await page.getByRole('button', { name: 'Bewegung pausieren', exact: true }).click();
  await expect(page.getByTestId('mora-product')).toHaveAttribute('data-paused', 'true');
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
