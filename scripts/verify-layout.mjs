#!/usr/bin/env node
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const WIDTHS = [360, 390, 430, 1440];

async function measureOverflow(page, selector, viewport) {
  const results = await page.evaluate(({ selector, viewport }) => {
    const elements = document.querySelectorAll(selector);
    const issues = [];
    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewport) {
        issues.push({
          index: i,
          text: el.textContent?.slice(0, 50),
          right: rect.right,
          overflow: rect.right - viewport
        });
      }
    });
    return issues;
  }, { selector, viewport });
  return results;
}

async function checkPage(browser, path, width) {
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

  // Check all text elements for overflow
  const textOverflow = await measureOverflow(page, 'p, span, h1, h2, h3, h4, h5, h6, a, button, label', width);
  
  // Check .headerGrid specifically for the "Ein Zusammenhang" section
  const headerGridInfo = await page.evaluate(() => {
    const grid = document.querySelector('[class*="headerGrid"]');
    if (!grid) return null;
    const computed = getComputedStyle(grid);
    const rect = grid.getBoundingClientRect();
    return {
      gridTemplateColumns: computed.gridTemplateColumns,
      width: rect.width,
      right: rect.right
    };
  });

  await page.close();
  
  return { path, width, textOverflow, headerGridInfo };
}

async function main() {
  console.log('Starting layout verification...\n');
  const browser = await chromium.launch();
  
  const pages = ['/de', '/mora', '/mora/deep-view'];
  const results = [];
  
  for (const path of pages) {
    for (const width of WIDTHS) {
      const result = await checkPage(browser, path, width);
      results.push(result);
      
      if (result.textOverflow.length > 0) {
        console.log(`❌ ${path} @ ${width}px: ${result.textOverflow.length} overflow issues`);
        result.textOverflow.forEach(issue => {
          console.log(`   - "${issue.text}..." right=${issue.right.toFixed(0)}px (overflow: ${issue.overflow.toFixed(0)}px)`);
        });
      } else {
        console.log(`✓ ${path} @ ${width}px: No overflow`);
      }
      
      if (result.headerGridInfo && width <= 760) {
        const cols = result.headerGridInfo.gridTemplateColumns;
        if (cols !== '1fr' && !cols.includes('px')) {
          console.log(`   ⚠️ headerGrid columns: ${cols} (expected 1fr on mobile)`);
        }
      }
    }
  }
  
  await browser.close();
  
  const hasIssues = results.some(r => r.textOverflow.length > 0);
  console.log(hasIssues ? '\n⚠️ Some overflow issues found' : '\n✓ All pages pass overflow check');
  process.exit(hasIssues ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
