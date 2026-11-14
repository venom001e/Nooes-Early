import fs from 'node:fs';

const homeContent = fs.readFileSync('src/data/pages/home.ts', 'utf8');
const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

console.log('Original length:', orig.length);
console.log('homeContent length:', homeContent.length);

const tags = [
  'nav class="flex items-center w-full h-[85px]',
  'desktop-demo',
  'dash-top-right-solid',
  'everywhere',
  'border-border',
  'terminal-demo'
];
tags.forEach(t => {
  console.log(`Contains "${t}": original=${orig.includes(t)}, homeContent=${homeContent.includes(t)}`);
});
