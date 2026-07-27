import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const estateLocation = resolve(process.cwd(), 'config/site-estate.json');
const estate = JSON.parse(await readFile(estateLocation, 'utf8'));

export function canonicalHref(html) {
  const match = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)
    || html.match(/<link\b(?=[^>]*\bhref=["']([^"']+)["'])(?=[^>]*\brel=["']canonical["'])[^>]*>/i);
  return match?.[1] ?? null;
}

export async function verifySiteEstate({ baseUrl, fetchImpl = fetch, checkLegacyHost = false }) {
  const failures = [];
  const checks = [];

  for (const route of estate.canonicalRoutes) {
    const response = await fetchImpl(new URL(route, baseUrl), { redirect: 'manual' });
    const html = await response.text();
    const expectedCanonical = new URL(route, estate.siteOrigin).toString();
    const actualCanonical = canonicalHref(html);
    const ok = response.status >= 200 && response.status < 300 && actualCanonical === expectedCanonical;
    checks.push({ kind: 'canonical', route, status: response.status, ok });
    if (!ok) {
      failures.push(`${route}: HTTP ${response.status}; canonical ${actualCanonical ?? 'missing'} (expected ${expectedCanonical})`);
    }
  }

  for (const [source, destination] of Object.entries(estate.legacyPathRedirects)) {
    const response = await fetchImpl(new URL(source, baseUrl), { redirect: 'manual' });
    const location = response.headers.get('location');
    const actualPath = location ? new URL(location, baseUrl).pathname : null;
    const ok = response.status >= 300 && response.status < 400 && actualPath === destination;
    checks.push({ kind: 'path-redirect', route: source, status: response.status, ok });
    if (!ok) failures.push(`${source}: redirect to ${actualPath ?? 'missing'} (expected ${destination})`);
  }

  if (checkLegacyHost) {
    const response = await fetchImpl(new URL('/', baseUrl), {
      redirect: 'manual',
      headers: { host: new URL(estate.legacyYoriOrigin).host },
    });
    const location = response.headers.get('location');
    const ok = response.status === 308 && location?.startsWith(estate.yoriWorkspaceOrigin);
    checks.push({ kind: 'host-redirect', route: estate.legacyYoriOrigin, status: response.status, ok });
    if (!ok) failures.push(`${estate.legacyYoriOrigin}: expected 308 to ${estate.yoriWorkspaceOrigin}`);
  }

  return { ok: failures.length === 0, checks, failures };
}

async function main() {
  const baseArgument = process.argv.find((argument) => argument.startsWith('--base-url='));
  const baseUrl = baseArgument?.slice('--base-url='.length) || process.env.SITE_BASE_URL || 'http://127.0.0.1:3001';
  const result = await verifySiteEstate({
    baseUrl,
    checkLegacyHost: process.argv.includes('--check-legacy-host'),
  });

  if (!result.ok) {
    console.error(result.failures.join('\n'));
    process.exitCode = 1;
    return;
  }

  console.log(`Verified ${result.checks.length} canonical route and redirect checks against ${baseUrl}.`);
}

if (import.meta.url.startsWith('file:') && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}

export { estate };
