import { expect, test, type Page, type TestInfo } from '@playwright/test';

const routes = ['/de', '/en', '/mora', '/en/mora', '/studio', '/en/studio', '/yori', '/en/yori', '/earth', '/de/kontakt', '/en/contact', '/de/einstieg/security-check', '/en/entry/security-check'];
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
    const earth = page.getByRole('button', { name: /SAIMÔR Earth/ });
    await earth.click();
    const earthPreview = page.locator('dialog[aria-labelledby="earth-preview-title"]');
    await expect(earthPreview).toBeVisible();
    await earthPreview.getByRole('button', { name: german ? 'Wege' : 'Paths', exact: true }).click();
    await expect(earthPreview.getByRole('heading', { name: german ? 'Aus Spuren werden Verbindungen.' : 'Traces become connections.' })).toBeVisible();
    await earthPreview.getByRole('button', { name: german ? 'Lichtung' : 'Clearing', exact: true }).click();
    await expect(earthPreview.getByRole('heading', { name: german ? 'Jede Welt braucht einen Eingang.' : 'Every world needs an entrance.' })).toBeVisible();
    await expect(earthPreview.getByRole('link', { name: german ? 'Die Earth-Idee' : 'The Earth concept' })).toHaveAttribute('href', '/earth');
    await noOverflow(page);
    await shot(page, info, `after-earth-preview-${locale}`);
    await page.keyboard.press('Escape');
    await expect(earthPreview).not.toBeVisible();
    await expect(earth).toBeFocused();
    await earth.click();
    await earthPreview.getByRole('link', { name: german ? 'Auf der Erde ankommen' : 'Arrive on Earth' }).click();
    await expect(earthPreview).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(`${home}#system$`));
    const door = page.getByRole('link', { name: german ? 'Schwelle betreten' : 'Cross the threshold' });
    await door.scrollIntoViewIfNeeded();
    await shot(page, info, `after-forest-${locale}`);
    await door.click();
    await expect(page).toHaveURL(/\/mora\/deep-view\?from=portal$/);
    const back = page.getByRole('link', { name: german ? 'Zurück zum Portal' : 'Back to the portal' });
    await expect(back).toHaveAttribute('href', `${home}#system`);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', { name: german ? 'MÔRA begegnen' : 'Meet MÔRA', exact: true }).click();
    await page.getByRole('button', { name: german ? 'Durch ihre Augen sehen' : 'See through her eyes', exact: true }).click();
    await expect(page.locator('[data-dawn="morning"]')).toHaveCount(1);
    await page.getByRole('button', { name: german ? 'MÔRA kennenlernen' : 'Get to know MÔRA', exact: true }).click();
    await expect(page.getByRole('heading', { name: german ? 'Klarheit beginnt mit Zusammenhang.' : 'Clarity begins with context.' })).toBeVisible();
    await page.locator('article details summary').first().click();
    await expect(page.getByText(german ? /Eigene Daten kommen über Quellen/ : /Your own data comes through sources/)).toBeVisible();
    const chapterSummaries = page.locator('article details summary');
    for (let chapter = 0; chapter < 3; chapter++) {
      await chapterSummaries.nth(chapter).focus();
      await expect(page.locator('canvas[data-scene="clearing"]')).toHaveAttribute('data-chapter', String(chapter));
      await expect(page.locator('[data-guide-chapter]')).toHaveAttribute('data-guide-chapter', String(chapter));
    }
    await noOverflow(page);
    await shot(page, info, `after-mora-information-${locale}`);
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

test('cinematic: deliberate passage, real face alignment, history and replay', async ({ page }, info) => {
  test.setTimeout(info.project.name.startsWith('webkit') ? 150000 : 90000); // Software WebKit includes full-resolution optical captures and frame sampling.
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await page.addInitScript(() => {
    const qa = window as unknown as Window & { __waterFrames: number };
    qa.__waterFrames = 0;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.dataset.scene === 'clearing') qa.__waterFrames++;
      return clear.apply(this, args);
    };
  });
  // Hold the opening while the test takes control; a slow software renderer
  // must not let the legitimate 7.2 s intro advance race the first pause click.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page, '/mora/deep-view');
  await consent(page);
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await shot(page, info, 'after-intro');
  await page.getByRole('button', { name: 'MÔRA begegnen' }).click();
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await expect(page.locator('[data-face-state="rest"]')).toBeVisible();
  // Measure both layers in one browser frame. Separate round-trips can span
  // the encounter's parent translate animation on slow software WebKit.
  const { face, stone } = await page.getByTestId('deep-mora').evaluate(element => {
    const bounds = (child: Element | null) => {
      if (!child) return null;
      const { x, y, width, height } = child.getBoundingClientRect();
      return { x, y, width, height };
    };
    return { face: bounds(element.querySelector('[data-face-state]')), stone: bounds(element.querySelector('img')) };
  });
  expect(face).not.toBeNull(); expect(stone).not.toBeNull();
  for (const key of ['x', 'y', 'width', 'height'] as const) expect(Math.abs(face![key] - stone![key])).toBeLessThan(1);
  await shot(page, info, 'after-encounter');
  // Inspect the actual closed blink, including its highlights, on both engines.
  await page.locator('[data-face-state="rest"]').evaluate(element => {
    for (const animation of element.getAnimations({ subtree: true })) {
      if ('animationName' in animation && /blink|lid/.test(String(animation.animationName))) {
        animation.pause(); animation.currentTime = 5320;
      }
    }
  });
  await expect(page.locator('[data-face-state] svg filter')).toHaveCount(0);
  const lidScales = await page.locator('[data-face-state="rest"] [class*="eye_"]').evaluateAll(eyes => eyes.map(eye => new DOMMatrix(getComputedStyle(eye).transform).d));
  expect(lidScales).toHaveLength(2);
  lidScales.forEach(scale => expect(scale).toBeCloseTo(.065, 3));
  // The shared screenshot helper disables animation, which resets the held lid.
  // Preserve this deliberately paused CSS animation to capture the actual blink.
  await page.screenshot({ path: info.outputPath('after-closed-blink.png'), animations: 'allow' });
  await page.locator('[data-face-state="rest"]').evaluate(element => {
    for (const animation of element.getAnimations({ subtree: true })) {
      if ('animationName' in animation && /blink|lid/.test(String(animation.animationName))) animation.play();
    }
  });
  const stablePoint = await page.getByRole('button', { name: 'MÔRA halten', exact: true }).boundingBox();
  expect(stablePoint).not.toBeNull();
  await page.mouse.move(stablePoint!.x + stablePoint!.width / 2, stablePoint!.y + stablePoint!.height / 2);
  await page.mouse.down();
  await expect(page.getByTestId('deep-clarity')).toBeVisible();
  await page.mouse.up();
  await expect(page).toHaveURL(/\/mora\/deep-view#clarity$/);
  await expect(page.getByRole('heading', { name: 'Durch MÔRAs Augen' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveCount(0);
  await expect(page.getByText(/PROJEKTCHAT|Wir starten morgen|Was belegt ist/)).toHaveCount(0);
  await noOverflow(page);
  await shot(page, info, 'after-mist');
  const starfield = page.locator('canvas[data-scene="clearing"]');
  await expect(starfield).toHaveAttribute('data-phase', 'water');
  await expect.poll(() => page.locator('[data-dawn]').evaluate(element => Number(getComputedStyle(element).getPropertyValue('--dawn')))).toBeGreaterThan(.25);
  await expect.poll(() => starfield.getAttribute('data-fade').then(value => Number(value))).toBeGreaterThan(0);
  await shot(page, info, 'after-first-light-stars');
  await page.getByRole('button', { name: 'Licht hereinlassen', exact: true }).click();
  await expect(page.locator('[data-dawn="morning"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Klarheit.' })).toBeFocused();
  await expect(starfield).toHaveAttribute('data-phase', 'water-memory');
  await expect.poll(() => starfield.getAttribute('data-fade').then(Number)).toBeGreaterThan(.3);
  const waterBounds = await starfield.boundingBox();
  await page.mouse.move(waterBounds!.x + waterBounds!.width * .53, waterBounds!.y + waterBounds!.height * .77);
  await expect.poll(() => starfield.getAttribute('data-interaction').then(Number)).toBeGreaterThan(.1);
  await shot(page, info, 'after-water-mycelium-hover');
  const timing = await page.evaluate(async () => {
    const qa = window as unknown as Window & { __waterFrames: number };
    const before = qa.__waterFrames, start = performance.now(), timestamps: number[] = [];
    await new Promise<void>(resolve => {
      const sample = (now: number) => {
        timestamps.push(now);
        if (now - start >= 1500) resolve(); else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const elapsed = timestamps.at(-1)! - start;
    return { callbacks: timestamps.length, paintedFrames: qa.__waterFrames - before,
      measuredFps: (qa.__waterFrames - before) * 1000 / elapsed,
      maxFrameGapMs: Math.max(...timestamps.slice(1).map((time, i) => time - timestamps[i])),
      note: 'Headless CI renderer; this measures this machine, not physical 120 Hz hardware.' };
  });
  await info.attach('water-frame-timing.json', { body: JSON.stringify(timing, null, 2), contentType: 'application/json' });
  expect(timing.paintedFrames / timing.callbacks).toBeGreaterThan(.8);
  await noOverflow(page);
  await expect(page.locator('[data-guide-ready="true"]')).toBeVisible();
  await shot(page, info, 'after-clarity');
  await page.getByRole('button', { name: 'MÔRA kennenlernen', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Klarheit beginnt mit Zusammenhang.' })).toBeFocused();
  for (let chapter = 0; chapter < 3; chapter++) {
    await page.locator('article details summary').nth(chapter).hover();
    await expect(starfield).toHaveAttribute('data-chapter', String(chapter));
    await expect(page.locator('[data-guide-chapter]')).toHaveAttribute('data-guide-chapter', String(chapter));
    await shot(page, info, `after-mora-chapter-${chapter + 1}`);
  }
  await shot(page, info, 'after-mora-context');
  await page.getByRole('button', { name: 'Lichtung genießen', exact: true }).click();
  await expect(page.getByRole('button', { name: 'MÔRA kennenlernen', exact: true })).toBeFocused();
  // The morning is a place to explore, not a heading pasted on a still card.
  const clearing = page.getByRole('region', { name: 'Die Lichtung erkunden' });
  await expect(page.getByTestId('deep-clearing')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Klarheit.' })).toHaveCSS('width', '1px');
  await clearing.press('ArrowRight');
  await expect(page.locator('[data-scene="clarity"]')).toHaveCSS('--look-x', '0.35');
  await clearing.press('ArrowUp');
  await expect(page.locator('[data-scene="clarity"]')).toHaveCSS('--look-y', '-0.35');
  await shot(page, info, 'after-exploring');
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  const pausedX = await page.locator('[data-scene="clarity"]').evaluate(e => getComputedStyle(e).getPropertyValue('--look-x'));
  await clearing.press('ArrowRight');
  await expect(page.locator('[data-scene="clarity"]')).toHaveCSS('--look-x', pausedX);
  await page.getByRole('button', { name: 'Bewegung pausieren' }).click();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'MÔRA.', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Noch einmal' }).click();
  await expect(page.getByTestId('deep-uncertainty')).toBeVisible();
  expect(exceptions).toEqual([]);
});

test('English cinematic passage opens the living clearing using normal motion', async ({ page }, info) => {
  test.setTimeout(90000);
  const exceptions: string[] = [];
  page.on('pageerror', error => exceptions.push(error.message));
  await visit(page, '/en/mora/deep-view#mora');
  await page.getByRole('button', { name: 'See through her eyes' }).click();
  await expect(page.getByRole('heading', { name: 'Through MÔRA’s eyes' })).toBeFocused();
  await page.getByRole('button', { name: 'Let the light in', exact: true }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Clarity.' })).toBeFocused();
  await page.getByRole('button', { name: 'Get to know MÔRA', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Discover MÔRA in the OS' })).toHaveAttribute('href', '/en/mora#im-os');
  await expect(page.locator('[data-guide-ready="true"]')).toBeVisible();
  await shot(page, info, 'after-morning-english');
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
  await expect(page.locator('[data-dawn="morning"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Klarheit.' })).toBeVisible();
  await noOverflow(page);
  await shot(page, info, 'after-short-morning');
  await page.getByRole('button', { name: 'MÔRA kennenlernen', exact: true }).click();
  for (const chapter of await page.locator('article details summary').all()) await chapter.click();
  const next = page.getByRole('link', { name: 'MÔRA im OS entdecken', exact: true });
  await next.scrollIntoViewIfNeeded();
  await expect(next).toBeVisible();
  // Expanded content must not reveal the top/bottom edges of a section-sized veil.
  const veil = page.getByTestId('deep-clarity').locator(':scope > [aria-hidden="true"]');
  const coverage = await veil.evaluate(element => ({ top: element.getBoundingClientRect().top,
    bottom: element.getBoundingClientRect().bottom, viewport: innerHeight }));
  expect(Math.abs(coverage.top)).toBeLessThan(1);
  expect(Math.abs(coverage.bottom - coverage.viewport)).toBeLessThan(1);
  const fogRepeats = await page.locator('[data-dawn] > div > i').evaluateAll(elements => elements.map(element => getComputedStyle(element).backgroundRepeat));
  expect(fogRepeats).toHaveLength(3);
  expect(fogRepeats.every(repeat => repeat === 'no-repeat')).toBe(true);
  await noOverflow(page);
  await shot(page, info, 'after-short-mora-context', true);
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
