import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://commandcode.ai';
const pagesDir = 'docs/research/pages';

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const assetUrls = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');

  // img src
  const imgMatches = content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  for (const m of imgMatches) {
    if (!m[1].startsWith('data:') && !m[1].includes('facebook.com') && !m[1].includes('google')) {
      assetUrls.add(m[1]);
    }
  }

  // video poster / src
  const videoMatches = content.matchAll(/<(?:video|source)[^>]+(?:src|poster)=["']([^"']+)["']/gi);
  for (const m of videoMatches) {
    if (!m[1].startsWith('data:')) {
      assetUrls.add(m[1]);
    }
  }

  // links (favicons, etc.)
  const linkMatches = content.matchAll(/<link[^>]+href=["']([^"']+\.(?:png|svg|ico|webp|jpg|jpeg))["']/gi);
  for (const m of linkMatches) {
    assetUrls.add(m[1]);
  }
}

console.log(`Found ${assetUrls.size} unique assets across all pages:`);
const sorted = [...assetUrls].sort();
console.log(sorted.slice(0, 30));

fs.writeFileSync('docs/research/asset-list.json', JSON.stringify(sorted, null, 2));

