import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const homeTs = fs.readFileSync('src/data/pages/home.ts', 'utf8');

// Extract the html string from homeTs
const htmlMatch = homeTs.match(/html:\s*("[\s\S]*?")\s*};/);
if (!htmlMatch) {
  console.log('Could not extract html from home.ts');
  process.exit(1);
}

const currentHtml = JSON.parse(htmlMatch[1]);

console.log('Original length:', orig.length);
console.log('Current HTML length:', currentHtml.length);

// Compare main sections
const origSections = [...orig.matchAll(/<(?:section|nav|footer|header|main)([^>]*)>/gi)].map(m => m[0]);
const currentSections = [...currentHtml.matchAll(/<(?:section|nav|footer|header|main)([^>]*)>/gi)].map(m => m[0]);

console.log('Original structural tags count:', origSections.length);
console.log('Current structural tags count:', currentSections.length);

console.log('\nFirst 10 structural tags in Original:');
origSections.slice(0, 10).forEach(s => console.log('  ', s));

console.log('\nFirst 10 structural tags in Current:');
currentSections.slice(0, 10).forEach(s => console.log('  ', s));

