/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const pg = require('pg');

function ok(label, detail = '') {
  console.log(`OK   ${label}${detail ? ` - ${detail}` : ''}`);
}

function warn(label, detail = '') {
  console.warn(`WARN ${label}${detail ? ` - ${detail}` : ''}`);
}

function fail(label, detail = '') {
  console.error(`FAIL ${label}${detail ? ` - ${detail}` : ''}`);
}

function isSet(key) {
  return Boolean(process.env[key] && process.env[key].trim().length > 0);
}

async function checkDatabase() {
  if (!isSet('DATABASE_URL')) {
    fail('DATABASE_URL', 'Missing');
    return false;
  }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    await client.query('SELECT 1');
    ok('Database connection');
    return true;
  } catch (error) {
    fail('Database connection', error.message || 'Unknown error');
    return false;
  } finally {
    try {
      await client.end();
    } catch {}
  }
}

async function run() {
  let pass = true;

  if (isSet('NEXTAUTH_SECRET')) {
    const len = process.env.NEXTAUTH_SECRET.length;
    if (len < 24) {
      warn('NEXTAUTH_SECRET', `Too short (${len} chars)`);
    } else {
      ok('NEXTAUTH_SECRET', `${len} chars`);
    }
  } else {
    fail('NEXTAUTH_SECRET', 'Missing');
    pass = false;
  }

  if (isSet('NEXTAUTH_URL')) {
    ok('NEXTAUTH_URL', process.env.NEXTAUTH_URL);
  } else {
    warn('NEXTAUTH_URL', 'Missing (dev:auto sets fallback)');
  }

  const hasOwnerEmail = isSet('OWNER_EMAILS');
  const hasOwnerPassword = isSet('OWNER_PASSWORD');
  if (hasOwnerEmail && hasOwnerPassword) {
    ok('Owner credentials fallback');
  } else {
    warn('Owner credentials fallback', 'OWNER_EMAILS or OWNER_PASSWORD missing');
  }

  const hasSmtpCore = isSet('SMTP_HOST') && isSet('SMTP_USER') && isSet('SMTP_PASS');
  if (hasSmtpCore) {
    ok('SMTP magic-link delivery');
  } else {
    warn('SMTP magic-link delivery', 'Not fully configured (dev fallback uses debugUrl)');
  }

  const dbOk = await checkDatabase();
  if (!dbOk) pass = false;

  if (!pass) {
    fail('Preflight', 'Critical checks failed');
    process.exit(1);
  }

  ok('Preflight', 'All critical checks passed');
}

run().catch((error) => {
  fail('Preflight', error.message || 'Unexpected error');
  process.exit(1);
});
