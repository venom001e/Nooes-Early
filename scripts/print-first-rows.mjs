import fs from 'node:fs';

const html = fs.readFileSync('docs/research/target-features-section.html', 'utf8');

// Print the header row and buttons row
const firstRowsEnd = html.indexOf('<div class="w-full lg:hidden">');
console.log('--- FIRST ROWS ---');
console.log(html.slice(0, firstRowsEnd));

