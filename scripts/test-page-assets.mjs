import fs from 'node:fs';

async function testAssets() {
  console.log('Fetching http://localhost:3000/...');
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();

  // Extract all src and href from the rendered HTML
  const srcs = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  const hrefs = [...html.matchAll(/href=["']([^"']+\.(?:css|woff2|png|svg|ico|webp|jpg))["']/g)].map(m => m[1]);
  const urls = [...new Set([...srcs, ...hrefs])].filter(u => u.startsWith('/') && !u.startsWith('/_next'));

  console.log(`Checking ${urls.length} asset URLs against localhost:3000...`);
  const failed = [];
  for (const u of urls) {
    try {
      const r = await fetch(`http://localhost:3000${u}`);
      if (!r.ok) {
        failed.push({ url: u, status: r.status });
      }
    } catch (e) {
      failed.push({ url: u, error: e.message });
    }
  }

  console.log(`Failed assets count: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Sample failed assets:', failed.slice(0, 20));
  }
}

testAssets().catch(console.error);

