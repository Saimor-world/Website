import { expect, test, type Page, type TestInfo } from '@playwright/test';

// The QA browser renders in software (SwiftShader), which would switch on the automatic lite mode.
// The journeys below check the full experience, so lite is opted out here (see lib/lite-mode-script.ts).
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('saimor-lite', 'off'); } catch {} });
});

const routes = ['/de', '/en', '/mora', '/en/mora', '/studio', '/en/studio', '/yori', '/en/yori', '/earth', '/de/kontakt', '/en/contact', '/de/einstieg/security-check', '/en/entry/security-check'];
/** Deep View is a short film; skip lands on the lights. Under reduced motion there is no film and no skip button. */
async function skipFilm(page: Page, german = true) {
  const world = page.getByTestId('deep-universe');
  const skip = page.getByRole('button', { name: german ? 'Überspringen' : 'Skip', exact: true });
  // Retried until hydrated: a click on the server-rendered button before hydration does nothing.
  await expect(async () => {
    if ((await world.getAttribute('data-step')) !== '3' && await skip.isVisible()) await skip.click({ timeout: 2000 });
    await expect(world).toHaveAttribute('data-step', '3', { timeout: 1500 });
  }).toPass({ timeout: 20000 });
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
  for (const locale of ['de','en'] as const) {
    const german=locale==='de';
    await visit(page,`/${locale}`); await consent(page);
    await expect(page.getByRole('heading',{level:1,name:'SAIMÔR'})).toBeVisible();
    const entry=page.getByRole('link',{name:german?'MÔRA entdecken →':'Discover MÔRA →'});
    await entry.scrollIntoViewIfNeeded();
    await expect(entry).toHaveAttribute('href',`${german?'':'/en'}/mora/deep-view?from=portal`);
    await shot(page,info,`after-home-entry-${locale}`);
    await entry.click();
    await page.waitForURL(/\/mora\/deep-view\?from=portal$/, { timeout: 60000 });
    await expect(page.getByTestId('deep-universe')).toBeVisible();
    await skipFilm(page,german);
    await page.getByRole('button',{name:german?'SAIMÔR OS: Erde · alles im Kontext':'SAIMÔR OS: Earth · all in context'}).click();
    await expect(page.getByTestId('focus-os')).toBeVisible();
    await page.getByRole('link',{name:german?'Zurück zum Portal':'Back to the portal'}).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}#system$`));
    await expect(page.locator('#system')).toBeInViewport();
    await noOverflow(page);
    await page.getByRole('link',{name:german?'YORI erkunden →':'Explore YORI →'}).click();
    await expect(page).toHaveURL(new RegExp(`${german?'':'/en'}/yori$`));
  }
});

test('universe journey: the film runs by itself, pauses, skips, and every light opens at a tap', async ({ page }, info) => {
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
  const world = page.getByTestId('deep-universe');
  // Consent/hydration may outlast the short opening shot; replay gives this timing test a fresh start.
  if(await world.getAttribute('data-step')!=='1'){
    await expect(world).toHaveAttribute('data-step','3',{timeout:14000});
    await page.getByRole('button',{name:/Noch einmal/}).click();
  }
  // Start: the forest stream at night, the river of stars, MÔRA by the water.
  await expect(world).toHaveAttribute('data-step', '1');
  await expect(page.getByRole('status')).toContainText('Deine Arbeit ist kein Stapel.');
  await expect(page.locator('[data-pixel-mora]')).toBeVisible();
  await expect(page.locator('[data-pixel-mora] img').first()).toHaveCSS('image-rendering', 'pixelated');
  // Screenshots can be slow; the film is paused for them and keeps its remaining time.
  const pause = page.getByRole('button', { name: 'Bewegung pausieren' });
  await pause.click();
  await noOverflow(page);
  await shot(page, info, 'after-deep-film-start');
  await pause.click();
  // It runs by itself: the second sentence follows without a click.
  await expect(world).toHaveAttribute('data-step', '2', { timeout: 9000 });
  await expect(page.getByRole('status')).toContainText('MÔRA kennt sie und hält sie zusammen.');
  // Pause holds it (paused first, so a slow screenshot cannot let the film move on).
  await pause.click();
  await expect(world).toHaveAttribute('data-still', 'true');
  await shot(page, info, 'after-deep-film-middle');
  await page.waitForTimeout(7500);
  await expect(world).toHaveAttribute('data-step', '2');
  await pause.click();
  await skipFilm(page);
  await expect(world).toHaveAttribute('data-step', '3');
  await expect(page.getByRole('status')).toContainText('Du siehst klar. Du entscheidest.');
  await expect(page.locator('[data-body] [data-glass]')).toHaveCount(5);
  await page.waitForTimeout(3200); // the lights have risen
  // Every light and its label stay in the picture.
  const viewport = page.viewportSize()!;
  for (const box of await page.locator('[data-body]').evaluateAll(nodes => nodes.map(node => {
    const r = node.getBoundingClientRect(); const label = node.querySelector('span:last-child')!.getBoundingClientRect();
    return { left: Math.min(r.left, label.left), right: Math.max(r.right, label.right), top: r.top, bottom: label.bottom };
  }))) {
    expect(box.left).toBeGreaterThanOrEqual(0); expect(box.right).toBeLessThanOrEqual(viewport.width);
    expect(box.top).toBeGreaterThanOrEqual(0); expect(box.bottom).toBeLessThanOrEqual(viewport.height);
  }
  await noOverflow(page);
  await shot(page, info, 'after-deep-film-end');
  await page.getByRole('button', { name: 'ARBEIT: Wasser · fließt' }).click();
  await expect(page).toHaveURL(/\/mora\/deep-view#work$/);
  await expect(page.getByTestId('focus-work')).toContainText('KALENDER');
  await shot(page, info, 'after-deep-light-work');
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await expect(page.getByTestId('focus-agents')).toBeVisible();
  await page.goBack();
  await expect(page.getByTestId('focus-work')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('focus-work')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
  await page.getByRole('button', { name: /Noch einmal/ }).click();
  await expect(world).toHaveAttribute('data-step', '1');
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
  const world = page.getByTestId('deep-universe');
  await expect(world).toHaveAttribute('data-still', 'true');
  await expect(world).toHaveAttribute('data-step', '3');
  const running = await world.evaluate(element =>
    element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length);
  expect(running).toBe(0);
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toBeInViewport();
  await noOverflow(page);
  await shot(page, info, 'after-short-reduced-universe');
  await page.getByRole('button', { name: 'SAIMÔR OS: Erde · alles im Kontext' }).click();
  await expect(page.getByTestId('focus-os')).toBeVisible();
  await expect(page.getByRole('button', { name: /^Weiter/ })).toBeInViewport();
  await noOverflow(page);
  await shot(page, info, 'after-short-reduced-end');
});

test('homepage: quiet arrival and artefact exploration stay under visitor control', async ({ page }, info) => {
  for(const locale of ['de','en'] as const){
    const de=locale==='de';
    await visit(page,`/${locale}`); await consent(page);
    await expect(page.locator('.mora-flight-track img')).toHaveCount(1);
    await expect(page.locator('.mora-flight-track button,.mora-flight-track a')).toHaveCount(0);
    await expect(page.getByTestId('mora-guide-dock')).toHaveCount(0);
    const artefact=page.locator('button.origin-interactive');
    await expect(artefact).toHaveAccessibleName(de?'ORIGIN vergrößern':'Zoom into ORIGIN');
    await artefact.scrollIntoViewIfNeeded();
    await artefact.focus(); await page.keyboard.press('Enter');
    await expect(artefact).toHaveAttribute('aria-pressed','true');
    await expect(artefact).toHaveAccessibleName(de?'ORIGIN verkleinern':'Zoom out of ORIGIN');
    await page.keyboard.press('Enter'); await expect(artefact).toHaveAttribute('aria-pressed','false');
    const signIn=page.getByRole('link',{name:de?'Zugang':'Sign in',exact:true});
    await signIn.scrollIntoViewIfNeeded(); await expect(signIn).toBeVisible();
    await expect(signIn).toHaveAttribute('href','/login');
    await noOverflow(page); await shot(page,info,`after-quiet-arrival-${locale}`);
  }
});

test('mobile navigation: escape, keyboard focus and readable entry', async ({ page }, info) => {
  test.skip((info.project.use.viewport?.width || 390) >= 768, 'Mobile navigation only');
  await visit(page, '/de/kontakt');
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
    const entry=page.getByRole('link',{name:de?'MÔRA entdecken →':'Discover MÔRA →'});
    await entry.scrollIntoViewIfNeeded(); await expect(entry).toBeInViewport();
    await expect(entry).toHaveAttribute('href',`${de?'':'/en'}/mora/deep-view?from=portal`);
    await shot(page,info,`after-product-entry-${locale}`);
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
