import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

const sIdx = orig.indexOf('Ships. Fixes');
// Find the enclosing container before "Ships. Fixes"
const headerStart = orig.lastIndexOf('<div class="w-full border-b border-border py-12', sIdx);
console.log('Header row starts at:', headerStart);

// Find where this entire features grid ends (before the next separator or section)
const nextDivider = orig.indexOf('Take a closer look', sIdx);
console.log('Next section starts at:', nextDivider);

console.log('Features grid HTML length:', nextDivider - headerStart);
fs.writeFileSync('docs/research/target-features-section.html', orig.slice(headerStart, nextDivider));
console.log('Saved target-features-section.html');

