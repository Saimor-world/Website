import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import {
  CANONICAL_ROUTES,
  canonicalPathForRequest,
  canonicalUrlForRequest,
  SITE_ORIGIN,
  YORI_WORKSPACE_ORIGIN,
} from '@/lib/site-estate';
import { canonicalHref, estate, verifySiteEstate } from '@/scripts/verify-site-estate.mjs';

describe('Saimor World site estate', () => {
  it('normalizes root and legacy paths to canonical public routes', () => {
    expect(canonicalPathForRequest('/')).toBe('/de');
    expect(canonicalPathForRequest('/frnt')).toBe('/yori');
    expect(canonicalPathForRequest('/en/frnt?source=legacy')).toBe('/en/yori');
    expect(canonicalUrlForRequest('/en/yori/')).toBe(`${SITE_ORIGIN}/en/yori`);
  });

  it('keeps canonical routes unique and local to Saimor World', () => {
    expect(new Set(CANONICAL_ROUTES).size).toBe(CANONICAL_ROUTES.length);
    expect(CANONICAL_ROUTES).toContain('/yori');
    expect(CANONICAL_ROUTES).toContain('/en/yori');
    expect(CANONICAL_ROUTES.every((route) => route.startsWith('/'))).toBe(true);
  });

  it('maps every canonical route to a concrete Next page entry', async () => {
    await Promise.all(
      CANONICAL_ROUTES.map((route) => access(resolve(process.cwd(), 'app', route.slice(1), 'page.tsx'))),
    );
  });

  it('crawls every canonical route and verifies its canonical tag', async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
      const redirect = estate.legacyPathRedirects[url.pathname as keyof typeof estate.legacyPathRedirects];
      if (redirect) {
        return new Response(null, { status: 308, headers: { location: redirect } });
      }

      const canonical = new URL(url.pathname, estate.siteOrigin).toString();
      return new Response(`<html><head><link rel="canonical" href="${canonical}"></head></html>`, { status: 200 });
    }) as unknown as typeof fetch;

    const result = await verifySiteEstate({
      baseUrl: 'http://127.0.0.1:3001',
      fetchImpl,
    });

    expect(result).toMatchObject({ ok: true, failures: [] });
    expect(result.checks).toHaveLength(estate.canonicalRoutes.length + 2);
  });

  it('extracts canonical links independent of attribute order', () => {
    expect(canonicalHref('<link href="https://saimor.world/de" rel="canonical">'))
      .toBe('https://saimor.world/de');
  });

  it('contains no active WORLD CTA to the legacy FRNT host', async () => {
    const files = [
      resolve(process.cwd(), 'components/YoriSection.tsx'),
      resolve(process.cwd(), 'components/YoriProductPage.tsx'),
      resolve(process.cwd(), 'app/yori/page.tsx'),
      resolve(process.cwd(), 'app/en/yori/page.tsx'),
    ];
    const sources = await Promise.all(files.map((file) => readFile(file, 'utf8')));

    expect(sources.join('\n')).not.toContain('https://frnt.saimor.world');
    expect(sources.join('\n')).toContain(YORI_WORKSPACE_ORIGIN);
  });
});
