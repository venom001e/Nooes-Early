import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage-nooes.html', 'utf8');
const installPos = html.indexOf('@container/install');
console.log('Install block (1200 chars):\n', html.slice(installPos, installPos + 1200));

