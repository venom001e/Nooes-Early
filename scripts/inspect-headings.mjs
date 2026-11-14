import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'docs/research/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const headings = [...html.matchAll(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 5);
  console.log(`=== ${file} ===`);
  console.log('Headings:', headings);
}

