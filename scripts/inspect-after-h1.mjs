import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage-nooes.html', 'utf8');
const h1Pos = html.indexOf('<h1');
console.log('After H1 (1500 chars):\n', html.slice(h1Pos, h1Pos + 1500));

