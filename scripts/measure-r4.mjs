#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3094';
const OUT = process.env.SHOT_DIR || '/opt/cursor/artifacts/screenshots';
mkdirSync(OUT, { recursive: true });

const luminance = (data) => {
  let sum = 0;
  const pixels = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return pixels ? sum / pixels : 0;
};

async function meanOf(page, clip) {
  const shot = await page.screenshot({ type: 'png', clip });
  const { createCanvas, loadImage } = await import('canvas').catch(() => ({ createCanvas: null, loadImage: null }));
  if (!createCanvas) {
    return page.evaluate(async ({ x, y, width, height }) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = await new Promise((resolve) => {
        // filled later
        resolve('');
      });
      void img;
      void ctx;
      void x;
      void y;
      return null;
    }, clip);
  }
  const img = await loadImage(shot);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return luminance(ctx.getImageData(0, 0, img.width, img.height).data);
}

async function meanFromBuffer(buffer) {
  // Decode PNG with Playwright's screenshot already taken; use page evaluate on ImageData via screenshot file is heavy.
  // Use sharp if available.
  try {
    const sharp = (await import('sharp')).default;
    const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let sum = 0;
    const pixels = info.width * info.height;
    for (let i = 0; i < data.length; i += 4) {
      sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    }
    return { mean: sum / pixels, w: info.width, h: info.height };
  } catch {
    return { mean: null, w: 0, h: 0 };
  }
}

const smallFonts = async (page) => page.evaluate(() => {
  const nodes = Array.from(document.querySelectorAll('body *'));
  const hits = [];
  for (const el of nodes) {
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
    hits.push({
      text: text.slice(0, 72),
      size: Number(size.toFixed(2)),
      tag: el.tagName.toLowerCase(),
    });
  }
  return hits;
});

const overlap = async (page) => page.evaluate(() => {
  const sound = document.querySelector('[data-testid="site-ambient"]');
  if (!sound) return { present: false };
  const sr = sound.getBoundingClientRect();
  const content = Array.from(document.querySelectorAll('h1, h2, h3, p, a, article, [data-earth-map], [class*="feature"]'));
  const hits = [];
  for (const el of content) {
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
    box: { left: sr.left, top: sr.top, right: sr.right, bottom: sr.bottom, width: sr.width, height: sr.height },
    overlaps: hits.slice(0, 8),
  };
});

const navContrast = async (page) => page.evaluate(() => {
  const header = document.querySelector('[data-public-header]');
  if (!header) return null;
  const bar = header.querySelector('div.flex');
  const wordmark = Array.from(header.querySelectorAll('span')).find((n) => n.textContent?.trim() === 'Saimôr');
  const link = header.querySelector('nav a');
  const cs = (el) => el ? getComputedStyle(el) : null;
  const barCs = cs(bar);
  const markCs = cs(wordmark);
  const linkCs = cs(link);
  return {
    barBg: barCs?.backgroundColor,
    wordmark: markCs?.color,
    link: linkCs?.color,
    light: header.getAttribute('data-light'),
  };
});

const goldEdge = async (page) => page.evaluate(() => {
  const gate = document.querySelector('.yori-edge, a[aria-label*="YORI"]');
  if (!gate) return { present: false };
  const r = gate.getBoundingClientRect();
  return { present: true, left: r.left, right: r.right, top: r.top, width: r.width, height: r.height, overflowLeft: r.left < -1 };
});

async function shotMean(page, name, clip) {
  const path = `${OUT}/${name}.png`;
  const buffer = clip ? await page.screenshot({ path, type: 'png', clip }) : await page.screenshot({ path, type: 'png' });
  const stats = await meanFromBuffer(buffer);
  return { path, ...stats };
}

async function runPage(browser, path, width, height, extra) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: width <= 430 ? 2 : 1 });
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);
  const result = {
    path,
    width,
    fonts: await smallFonts(page),
    sound: await overlap(page),
    nav: await navContrast(page),
    gold: await goldEdge(page),
  };
  if (extra) Object.assign(result, await extra(page));
  await page.close();
  return result;
}

const report = {};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });

try {
  for (const width of [360, 390, 430, 1440]) {
    const height = width === 1440 ? 900 : 780;
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: width <= 430 ? 2 : 1 });
    await page.goto(`${BASE}/de`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(700);
    const hero = await shotMean(page, `r4-hero-${width}`, { x: 0, y: 0, width, height: Math.min(height, 740) });
    report[`hero-${width}`] = {
      mean: hero.mean,
      fonts: await smallFonts(page),
      sound: await overlap(page),
      gold: await goldEdge(page),
    };
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/earth`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/r4-earth-desktop-1440.png`, type: 'png' });
    report['earth-1440'] = {
      nav: await navContrast(page),
      fonts: await smallFonts(page),
      sound: await overlap(page),
    };
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(400);
    report['earth-1440-scrolled'] = { nav: await navContrast(page) };
    await page.screenshot({ path: `${OUT}/r4-earth-desktop-scrolled.png`, type: 'png' });
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
    await page.goto(`${BASE}/earth`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/r4-earth-mobile-360.png`, type: 'png' });
    report['earth-360'] = { nav: await navContrast(page), fonts: await smallFonts(page) };
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/mora/deep-view`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1200);
    const opening = await shotMean(page, 'r4-deep-opening-1440', { x: 0, y: 0, width: 1440, height: 900 });
    report['deep-opening-1440'] = { mean: opening.mean, fonts: await smallFonts(page), sound: await overlap(page) };
    // Advance to morning if a hold/continue control exists
    const enjoy = page.getByRole('button', { name: /Lichtung|clearing|genießen|Open/i });
    if (await enjoy.count()) {
      await enjoy.first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(2500);
    }
    const clearing = page.locator('[data-testid="deep-clearing"]');
    if (await clearing.count()) {
      await page.waitForTimeout(800);
      const left = await shotMean(page, 'r4-lichtung-left-1440', { x: 0, y: 0, width: 720, height: 900 });
      const full = await shotMean(page, 'r4-lichtung-full-1440', { x: 0, y: 0, width: 1440, height: 900 });
      report['lichtung-1440'] = { left: left.mean, full: full.mean };
    }
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto(`${BASE}/mora/deep-view`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1200);
    const opening = await shotMean(page, 'r4-deep-opening-390', { x: 0, y: 0, width: 390, height: 844 });
    report['deep-opening-390'] = { mean: opening.mean, fonts: await smallFonts(page) };
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/en/earth`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    report['en-earth'] = { nav: await navContrast(page), share: await page.getByText('Share', { exact: true }).count() };
    await page.close();
  }
} finally {
  await browser.close();
}

const jsonPath = `${OUT}/r4-measurements.json`;
writeFileSync(jsonPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(`Wrote ${jsonPath}`);
