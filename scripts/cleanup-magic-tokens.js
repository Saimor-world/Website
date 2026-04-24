require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const pg = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[cleanup:magic] DATABASE_URL is not set');
    process.exit(1);
  }

  const client = new pg.Client({ connectionString });
  await client.connect();

  try {
    const result = await client.query(`
      DELETE FROM "MagicLoginToken"
      WHERE "usedAt" IS NOT NULL
         OR "expiresAt" < NOW() - INTERVAL '24 hours'
    `);
    console.log(`[cleanup:magic] Deleted ${result.rowCount || 0} token rows`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error('[cleanup:magic] Failed:', error.message);
  process.exit(1);
});
