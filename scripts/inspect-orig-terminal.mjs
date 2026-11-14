import fs from 'node:fs';

const origSection = fs.readFileSync('docs/research/target-features-section.html', 'utf8');

// Check what is inside the terminal in target-features-section
const termIdx = origSection.indexOf('~/project');
console.log('Terminal area:\n', origSection.slice(termIdx - 200, termIdx + 1200));

