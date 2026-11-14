import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const transformed = fs.readFileSync('src/data/pages/home.ts', 'utf8');

console.log('Original has nav:', orig.includes('nav class="flex items-center w-full h-[85px]'));
console.log('Original has terminal-demo:', orig.includes('terminal-demo'));

// Where did nav disappear?
const bodyMatch = orig.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
console.log('Body match has nav:', bodyMatch[1].includes('nav class="flex items-center w-full h-[85px]'));
console.log('Body match has terminal-demo:', bodyMatch[1].includes('terminal-demo'));

