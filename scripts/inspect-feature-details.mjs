import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage-nooes.html', 'utf8');

// Find taste or section description
const match = html.match(/Hello, taste[\s\S]*?<\/p>/i);
if (match) {
  console.log('Taste section match:', match[0].slice(0, 400));
}

// Find desktop demo section
const demoIdx = html.indexOf('desktop-demo');
if (demoIdx !== -1) {
  console.log('Desktop demo section (400 chars):');
  console.log(html.slice(demoIdx, demoIdx + 400));
}

