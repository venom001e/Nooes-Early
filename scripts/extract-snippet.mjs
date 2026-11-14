import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const snippet = orig.slice(71500, 95000);
fs.writeFileSync('docs/research/features-grid-orig.html', snippet);
console.log('Saved features-grid-orig.html length:', snippet.length);

