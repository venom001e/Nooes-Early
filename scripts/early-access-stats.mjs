const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    '[FILL] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. ' +
      'Run `npx vercel env pull .env.local`, then ' +
      '`node --env-file=.env.local scripts/early-access-stats.mjs`.',
  );
  process.exit(1);
}

const endpoint = `${url.replace(/\/$/, '')}/rest/v1/early_access_signups?select=status,created_at,confirmed_at`;

const response = await fetch(endpoint, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
  },
  cache: 'no-store',
});

if (!response.ok) {
  console.error(`Supabase request failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const rows = await response.json();
const since = (hours) => {
  const cutoff = Date.now() - hours * 60 * 60 * 1000;
  return rows.filter((row) => new Date(row.created_at).getTime() >= cutoff).length;
};

console.log('Early access stats');
console.log('------------------');
console.log(`Total signups:  ${rows.length}`);
console.log(`Pending:        ${rows.filter((row) => row.status === 'pending').length}`);
console.log(`Confirmed:      ${rows.filter((row) => row.status === 'confirmed').length}`);
console.log(`Last 24 hours:  ${since(24)}`);
console.log(`Last 7 days:    ${since(24 * 7)}`);
