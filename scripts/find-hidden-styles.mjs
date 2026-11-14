import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const inlineStyles = [...html.matchAll(/style=["']([^"']+)["']/gi)].map(m => m[1]);

const hiddenOrZero = inlineStyles.filter(s => 
  s.includes('opacity:0') || 
  s.includes('opacity: 0') || 
  s.includes('scale:0') ||
  s.includes('scale: 0') ||
  s.includes('display:none') ||
  s.includes('visibility:hidden')
);

console.log('Total inline styles:', inlineStyles.length);
console.log('Zero/hidden styles:');
[...new Set(hiddenOrZero)].forEach(s => console.log('  ', s));

