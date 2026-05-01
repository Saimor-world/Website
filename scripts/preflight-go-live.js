/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const pg = require('pg');

const REQUIRED = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL',
  'OWNER_EMAILS',
  'OWNER_PASSWORD',
  'SAIMOR_ENTRY_SECRET',
  'SAIMOR_WALL_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'NEXT_PUBLIC_OS_HOME_URL',
];

const RECOMMENDED = [
  'OS_HOME_URL',
  'GEMINI_API_KEY',
  'ANTHROPIC_API_KEY',
  'SAIMOR_CORE_BASE_URL',
  'OWNER_CONSOLE_CORE_TOKEN',
  'NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS',
  'SENTRY_DSN',
  'NEXT_PUBLIC_SENTRY_DSN',
  'NEXT_PUBLIC_CAL_URL',
];

const OPTIONAL = [
  'SENTRY_AUTH_TOKEN',
  'SENTRY_ORG',
  'SENTRY_PROJECT',
  'SENTRY_ENVIRONMENT',
  'NEXT_PUBLIC_SENTRY_ENVIRONMENT',
  'SMTP_REJECT_UNAUTHORIZED',
  'RATE_LIMIT_SECURITY_SCAN',
  'RATE_LIMIT_MAGIC_LINK',
];

function value(key) {
  return (process.env[key] || '').trim();
}

function isSet(key) {
  return value(key).length > 0;
}

function row(status, key, detail = '') {
  const suffix = detail ? ` - ${detail}` : '';
  console.log(`${status.padEnd(6)} ${key}${suffix}`);
}

function checkLength(key, min) {
  if (!isSet(key)) return false;
  const len = value(key).length;
  if (len < min) {
    row('WARN', key, `too short (${len} chars, recommend ${min}+)`);
    return false;
  }
  row('OK', key, `${len} chars`);
  return true;
}

function checkUrl(key, expectedPrefix) {
  if (!isSet(key)) return false;
  const raw = value(key);
  try {
    const url = new URL(raw);
    if (expectedPrefix && !raw.startsWith(expectedPrefix)) {
      row('WARN', key, `expected ${expectedPrefix}..., got ${url.origin}`);
      return false;
    }
    row('OK', key, url.origin);
    return true;
  } catch {
    row('FAIL', key, `invalid URL: ${raw}`);
    return false;
  }
}

async function checkDatabase() {
  if (!isSet('DATABASE_URL')) return false;
  const raw = value('DATABASE_URL');
  if (/localhost|127\.0\.0\.1/.test(raw)) {
    row('WARN', 'DATABASE_URL', 'local database, do not use this in Vercel Production');
  }

  const client = new pg.Client({ connectionString: raw });
  try {
    await client.connect();
    await client.query('SELECT 1');
    row('OK', 'DATABASE_URL', 'connection works');
    return true;
  } catch (error) {
    row('FAIL', 'DATABASE_URL', error.message || 'connection failed');
    return false;
  } finally {
    try {
      await client.end();
    } catch {}
  }
}

async function main() {
  console.log('SAIMOR WORLD Go-Live ENV Preflight');
  console.log('No secret values are printed.\n');

  let hardFail = false;

  for (const key of REQUIRED) {
    if (!isSet(key)) {
      row('FAIL', key, 'missing');
      hardFail = true;
    }
  }

  console.log('\nQuality checks');
  checkUrl('NEXTAUTH_URL', 'https://');
  checkUrl('NEXT_PUBLIC_OS_HOME_URL', 'https://');
  checkLength('NEXTAUTH_SECRET', 32);
  checkLength('SAIMOR_ENTRY_SECRET', 32);
  checkLength('SAIMOR_WALL_SECRET', 32);
  checkLength('OWNER_PASSWORD', 16);
  if (isSet('SMTP_SECURE') && !['true', 'false'].includes(value('SMTP_SECURE'))) {
    row('WARN', 'SMTP_SECURE', 'must be true or false');
  }
  await checkDatabase();

  console.log('\nRecommended');
  for (const key of RECOMMENDED) {
    row(isSet(key) ? 'OK' : 'WARN', key, isSet(key) ? 'configured' : 'missing or optional fallback');
  }

  console.log('\nOptional / monitoring');
  for (const key of OPTIONAL) {
    row(isSet(key) ? 'OK' : 'INFO', key, isSet(key) ? 'configured' : 'not configured');
  }

  if (hardFail) {
    console.log('\nResult: FAIL - required production variables are missing.');
    process.exit(1);
  }

  console.log('\nResult: OK - required variables are present. Review WARN lines before launch.');
}

main().catch((error) => {
  row('FAIL', 'preflight', error.message || 'unexpected error');
  process.exit(1);
});
