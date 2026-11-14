import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// Find all /assets/*.js files referenced
const jsMatches = [...orig.matchAll(/\/assets\/[a-zA-Z0-9_\-]+\.js/g)].map(m => m[0]);
const uniqueJs = [...new Set(jsMatches)];

console.log(`Found ${uniqueJs.length} unique JavaScript bundles in homepage.html:`);
console.log(uniqueJs.slice(0, 15));
fs.writeFileSync('docs/research/js-bundles.json', JSON.stringify(uniqueJs, null, 2));

