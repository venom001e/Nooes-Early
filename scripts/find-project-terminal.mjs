import fs from 'node:fs';

const text = fs.readFileSync('docs/research/features-grid-orig.html', 'utf8');

// Find where ~/project or terminal window is in the file
const projIdx = text.indexOf('~/project');
console.log('~/project index:', projIdx);
if (projIdx !== -1) {
  console.log(text.slice(projIdx - 500, projIdx + 1500));
} else {
  console.log('~/project not found in snippet, searching full homepage...');
  const full = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
  const fIdx = full.indexOf('~/project');
  console.log('Found in full homepage at:', fIdx);
  if (fIdx !== -1) {
    console.log(full.slice(fIdx - 600, fIdx + 1200));
  }
}

