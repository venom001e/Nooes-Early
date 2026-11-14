import fs from 'node:fs';

const html = fs.readFileSync('docs/research/homepage.html', 'utf8');

console.log('--- FRAMEWORK DETECTION ---');
console.log('__NEXT_DATA__:', html.includes('__NEXT_DATA__'));
console.log('_next/static:', html.includes('_next/static'));
console.log('astro:', html.includes('astro'));
console.log('framer:', html.includes('framer'));

console.log('\n--- HEAD ASSETS ---');
const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
const linkTags = [...head.matchAll(/<link\s+[^>]*>/gi)].map(m => m[0]);
linkTags.forEach(t => console.log('LINK:', t));

const styleTags = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Inline style tags count:', styleTags.length);
if (styleTags.length > 0) {
  console.log('First inline style sample (200 chars):', styleTags[0].slice(0, 200));
}

const scriptTags = [...html.matchAll(/<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('\n--- SCRIPTS ---');
scriptTags.slice(0, 15).forEach(s => console.log('SCRIPT:', s));

const imgTags = [...html.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('\n--- IMAGES (first 20) ---');
[...new Set(imgTags)].slice(0, 20).forEach(i => console.log('IMG:', i));

const svgCount = [...html.matchAll(/<svg/gi)].length;
console.log('\nInline SVGs count:', svgCount);

