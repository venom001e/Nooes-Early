import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

const search = '<div class="w-full relative hidden lg:grid lg:grid-cols-2" style="height:616px">';
const start = orig.indexOf(search);
console.log('Grid start:', start);

const end = orig.indexOf('</section>', start);
const gridHtml = orig.slice(start, start + 12000);
fs.writeFileSync('docs/research/desktop-features-grid.html', gridHtml);
console.log('Saved desktop-features-grid.html');

