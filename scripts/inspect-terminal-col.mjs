import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const text = fs.readFileSync('docs/research/features-grid-orig.html', 'utf8');

const projIdx = text.indexOf('~/project');
console.log('Right column terminal content (from ~/project to next 2000 chars):');
console.log(text.slice(projIdx, projIdx + 2000));

