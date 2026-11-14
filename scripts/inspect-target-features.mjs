import fs from 'node:fs';

const html = fs.readFileSync('docs/research/target-features-section.html', 'utf8');
console.log('Length:', html.length);
console.log('First 1000 chars:\n', html.slice(0, 1000));
console.log('\nLast 1000 chars:\n', html.slice(-1000));

