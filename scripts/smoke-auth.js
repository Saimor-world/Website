/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const baseUrl = process.env.SMOKE_BASE_URL || 'http://localhost:3001';
const fallbackOwnerEmail = (process.env.OWNER_EMAILS || '')
  .split(',')
  .map((v) => v.trim())
  .filter(Boolean)[0] || '';
const smokeEmail = process.env.SMOKE_EMAIL || fallbackOwnerEmail;
const smokePassword = process.env.SMOKE_PASSWORD || process.env.OWNER_PASSWORD || '';

async function request(path, init = {}) {
  const res = await fetch(`${baseUrl}${path}`, init);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { res, text, json };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function run() {
  console.log(`[smoke-auth] Base URL: ${baseUrl}`);

  const health = await request('/api/health');
  assert(health.res.status === 200, `health failed: ${health.res.status}`);
  console.log('[smoke-auth] /api/health OK');

  const providers = await request('/api/auth/providers');
  assert(providers.res.status === 200, `providers failed: ${providers.res.status}`);
  assert(providers.json?.credentials, 'credentials provider missing');
  assert(providers.json?.['magic-token'], 'magic-token provider missing');
  console.log('[smoke-auth] /api/auth/providers OK');

  if (smokeEmail) {
    const magic = await request('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: smokeEmail,
        callbackUrl: '/account/bridge',
        locale: 'de',
      }),
    });
    assert(magic.res.status === 200, `magic-link failed: ${magic.res.status}`);
    assert(magic.json?.success === true, 'magic-link success=false');
    console.log('[smoke-auth] magic-link request OK');

    if (typeof magic.json?.debugUrl === 'string') {
      const debugUrl = new URL(magic.json.debugUrl);
      const token = debugUrl.searchParams.get('token') || '';
      const email = debugUrl.searchParams.get('email') || '';
      assert(token.length > 0, 'magic debug token missing');
      assert(email.length > 0, 'magic debug email missing');

      const csrfMagic = await request('/api/auth/csrf');
      assert(csrfMagic.res.status === 200, `csrf(magic) failed: ${csrfMagic.res.status}`);
      assert(csrfMagic.json?.csrfToken, 'csrfToken(magic) missing');
      const csrfMagicCookie = csrfMagic.res.headers.get('set-cookie') || '';

      const magicForm = new URLSearchParams({
        csrfToken: csrfMagic.json.csrfToken,
        email,
        token,
        callbackUrl: `${baseUrl}/account/bridge`,
        json: 'true',
      });

      const magicCb = await fetch(`${baseUrl}/api/auth/callback/magic-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: csrfMagicCookie,
        },
        body: magicForm.toString(),
      });
      const magicBody = await magicCb.text();
      let magicParsed = {};
      try {
        magicParsed = JSON.parse(magicBody);
      } catch {}

      assert(magicCb.status === 200, `magic callback failed: ${magicCb.status}`);
      assert(
        typeof magicParsed.url === 'string' && magicParsed.url.includes('/account/bridge'),
        'magic callback url missing'
      );
      console.log('[smoke-auth] magic-token callback OK');
    } else {
      console.log('[smoke-auth] magic-link email mode active (no debugUrl), callback simulation skipped');
    }
  } else {
    console.log('[smoke-auth] Skipping magic-link check (no SMOKE_EMAIL/OWNER_EMAILS)');
  }

  if (smokeEmail && smokePassword) {
    const csrf = await request('/api/auth/csrf');
    assert(csrf.res.status === 200, `csrf failed: ${csrf.res.status}`);
    assert(csrf.json?.csrfToken, 'csrfToken missing');
    const csrfCookie = csrf.res.headers.get('set-cookie') || '';

    const form = new URLSearchParams({
      csrfToken: csrf.json.csrfToken,
      email: smokeEmail,
      password: smokePassword,
      callbackUrl: `${baseUrl}/account/bridge`,
      json: 'true',
    });

    const login = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: csrfCookie,
      },
      body: form.toString(),
    });
    const body = await login.text();
    let parsed = {};
    try {
      parsed = JSON.parse(body);
    } catch {}

    assert(login.status === 200, `credentials login failed: ${login.status}`);
    assert(
      typeof parsed.url === 'string' && parsed.url.includes('/account/bridge'),
      'credentials callback url missing'
    );
    console.log('[smoke-auth] credentials login OK');
  } else {
    console.log('[smoke-auth] Skipping credentials check (SMOKE_EMAIL/SMOKE_PASSWORD not set)');
  }

  console.log('[smoke-auth] All checks passed');
}

run().catch((error) => {
  console.error('[smoke-auth] FAILED:', error.message);
  process.exit(1);
});
