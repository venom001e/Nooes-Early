import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const demoStart = html.indexOf('id="desktop-demo"');
const demoEnd = html.indexOf('</section>', demoStart + 500);

console.log('Desktop demo section sample (1500 chars):\n');
console.log(html.slice(demoStart, demoStart + 1500));

