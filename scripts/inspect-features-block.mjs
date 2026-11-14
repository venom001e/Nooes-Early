import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage-nooes.html', 'utf8');

// Find features section
const f1 = html.indexOf('Your coding taste');
if (f1 !== -1) {
  console.log('Feature 01 area (800 chars):');
  console.log(html.slice(f1 - 200, f1 + 600));
} else {
  console.log('Your coding taste not found');
}

