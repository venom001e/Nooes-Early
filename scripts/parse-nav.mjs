import fs from 'node:fs';

const navHtml = fs.readFileSync('docs/research/navbar-full.html', 'utf8');

// Check links inside nav
const links = [...navHtml.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)].map(m => ({
  href: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim()
}));

console.log('Nav links found:', JSON.stringify(links, null, 2));

