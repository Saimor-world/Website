#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:3094';
const OUT = process.env.SHOT_DIR || '/opt/cursor/artifacts/screenshots';
mkdirSync(OUT, { recursive: true });

async function statsFromBuffer(buffer) {
  const sharp = (await import('sharp')).default;
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = info.width * info.height;
  const lum = new Float64Array(pixels);
  let sum = 0;
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    lum[p] = y;
    sum += y;
  }
  const mean = sum / pixels;
  let varsum = 0;
  for (let p = 0; p < pixels; p++) {
    const d = lum[p] - mean;
    varsum += d * d;
  }
  return { mean, stddev: Math.sqrt(varsum / pixels), w: info.width, h: info.height };
}

async function shotStats(page, name, clip) {
  const path = `${OUT}/${name}.png`;
  const buffer = clip
    ? await page.screenshot({ path, type: 'png', clip })
    : await page.screenshot({ path, type: 'png' });
  return { path, ...(await statsFromBuffer(buffer)) };
}

const smallFonts = async (page) => page.evaluate(() => {
  const hits = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!(el instanceof HTMLElement)) continue;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;
    const size = parseFloat(style.fontSize);
    if (!(size < 12)) continue;
    const text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    if (rect.bottom < 0 || rect.top > innerHeight || rect.right < 0 || rect.left > innerWidth) continue;
    hits.push({ text: text.slice(0, 72), size: Number(size.toFixed(2)), tag: el.tagName.toLowerCase() });
  }
  return hits;
});

const overlap = async (page) => page.evaluate(() => {
  const sound = document.querySelector('[data-testid="site-ambient"]');
  if (!sound) return { present: false };
  const sr = sound.getBoundingClientRect();
  const cs = getComputedStyle(sound);
  const hits = [];
  for (const el of document.querySelectorAll('h1, h2, h3, p, a, article')) {
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(sr.right, r.right) - Math.max(sr.left, r.left));
    const y = Math.max(0, Math.min(sr.bottom, r.bottom) - Math.max(sr.top, r.top));
    if (x > 8 && y > 8) {
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      if (text) hits.push({ text, x, y });
    }
  }
  return {
    present: true,
    embedded: sound.getAttribute('data-embedded') === 'true',
    height: sr.height,
    radius: cs.borderRadius,
    box: { left: sr.left, top: sr.top, width: sr.width, height: sr.height },
    overlaps: hits.slice(0, 8),
  };
});

const heroFooterStack = async (page) => page.evaluate(() => {
  const footer = Array.from(document.querySelectorAll('span, div')).find((el) =>
    /EIN ORT · ALLES IM KONTEXT|ONE PLACE · EVERYTHING IN CONTEXT/.test(el.textContent || '')
    && el.children.length === 0,
  );
  const earth = Array.from(document.querySelectorAll('button')).find((el) => /SAIMÔR Earth/.test(el.textContent || ''));
  if (!footer || !earth) return { found: false };
  const a = footer.getBoundingClientRect();
  const b = earth.getBoundingClientRect();
  const overlapX = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const overlapY = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return {
    found: true,
    footer: { x: a.x, y: a.y, w: a.width, h: a.height, bottom: a.bottom, lines: a.height > 28 ? 2 : 1, text: (footer.textContent || '').trim() },
    earth: { x: b.x, y: b.y, w: b.width, h: b.height, top: b.top },
    overlapX,
    overlapY,
    colliding: overlapX > 2 && overlapY > 2,
    stacked: a.bottom <= b.top + 2,
  };
});

const report = {};
const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });

try {
  for (const width of [360, 390, 430, 1440]) {
    const height = width === 1440 ? 900 : 844;
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: width <= 430 ? 2 : 1 });
    await page.goto(`${BASE}/de`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);
    const hero = await shotStats(page, `r5-hero-${width}`, { x: 0, y: 0, width, height: Math.min(height, 780) });
    report[`hero-${width}`] = {
      mean: hero.mean,
      stddev: hero.stddev,
      fonts: await smallFonts(page),
      sound: await overlap(page),
      footer: await heroFooterStack(page),
    };
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/mora/deep-view`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1400);
    const opening = await shotStats(page, 'r5-deep-opening-1440', { x: 0, y: 0, width: 1440, height: 900 });
    report['deep-opening-1440'] = { mean: opening.mean, stddev: opening.stddev, fonts: await smallFonts(page), sound: await overlap(page) };

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const enjoy = page.getByRole('button', { name: /Lichtung|clearing|Augen|eyes|genießen|Open/i });
    if (await enjoy.count()) {
      await enjoy.first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(400);
    }
    const look = page.getByRole('button', { name: /Augen|eyes|Lichtung|clearing/i });
    if (await look.count()) {
      await look.first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(600);
    }
    await page.evaluate(() => { location.hash = 'clarity'; window.dispatchEvent(new Event('hashchange')); });
    await page.waitForTimeout(1200);
    const clearing = page.locator('[data-testid="deep-clearing"]');
    if (await clearing.count()) {
      const left = await shotStats(page, 'r5-lichtung-left-1440', { x: 0, y: 0, width: 720, height: 900 });
      const full = await shotStats(page, 'r5-lichtung-full-1440', { x: 0, y: 0, width: 1440, height: 900 });
      report['lichtung-1440'] = { left: left.mean, leftStd: left.stddev, full: full.mean, fullStd: full.stddev };
    }
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto(`${BASE}/mora/deep-view`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1400);
    const opening = await shotStats(page, 'r5-deep-opening-390', { x: 0, y: 0, width: 390, height: 844 });
    report['deep-opening-390'] = { mean: opening.mean, stddev: opening.stddev, fonts: await smallFonts(page) };
    await page.close();
  }
} finally {
  await browser.close();
}

const jsonPath = `${OUT}/r5-measurements.json`;
writeFileSync(jsonPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(`Wrote ${jsonPath}`);
