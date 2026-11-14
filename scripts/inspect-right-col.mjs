import fs from 'node:fs';

const html = fs.readFileSync('docs/research/desktop-features-grid.html', 'utf8');

// Find all top-level divs or elements in this grid
console.log('Grid HTML length:', html.length);

// Where does the right column begin?
// Left column ends after item 06 or 07
const f6Idx = html.indexOf('npx taste push/pull');
console.log('Item 06 index:', f6Idx);

if (f6Idx !== -1) {
  console.log('After item 06 (next 3000 chars):');
  console.log(html.slice(f6Idx, f6Idx + 3000));
}

