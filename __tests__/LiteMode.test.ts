import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LITE_MODE_SCRIPT, LITE_SLOW_TTL_MS } from '@/lib/lite-mode-script';

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const run = () => new Function(LITE_MODE_SCRIPT)();
const html = document.documentElement;

describe('Lite mode', () => {
  beforeEach(() => {
    html.className = ''; html.removeAttribute('data-lite'); window.localStorage.clear();
    // A capable desktop: only the stored probe result may switch Lite on.
    vi.spyOn(navigator, 'hardwareConcurrency', 'get').mockReturnValue(8);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      getExtension: () => null, getParameter: () => 'ANGLE (NVIDIA)', RENDERER: 0,
    } as unknown as RenderingContext);
  });
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  it('stops endless animation only for costly layers, never for [data-cheap-motion] motion', () => {
    const killer = /(html\.lite[^{}]+)\{[^{}]*animation-iteration-count:\s*1\s*!important/.exec(css);
    expect(killer).not.toBeNull();
    const selectors = killer![1].split(',').map(s => s.trim()).filter(s => s.startsWith('html.lite'));
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) expect(selector).toContain(':not([data-cheap-motion])');
  });

  it('keeps a fresh slow-device result, then lets it expire after the TTL', () => {
    window.localStorage.setItem('saimor-lite', `slow:${Date.now() - 60_000}`);
    run();
    expect(html.classList.contains('lite')).toBe(true);

    html.className = '';
    window.localStorage.setItem('saimor-lite', `slow:${Date.now() - LITE_SLOW_TTL_MS - 1}`);
    run();
    expect(html.classList.contains('lite')).toBe(false);
    expect(window.localStorage.getItem('saimor-lite')).toBeNull();
  });

  it('drops the old permanent "slow" flag so the device is measured again', () => {
    window.localStorage.setItem('saimor-lite', 'slow');
    run();
    expect(html.classList.contains('lite')).toBe(false);
    expect(window.localStorage.getItem('saimor-lite')).toBeNull();
  });
});
