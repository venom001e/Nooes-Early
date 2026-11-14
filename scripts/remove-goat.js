const fs = require('fs');
const path = require('path');

// Final cleanup: replace remaining GOAT occurrences in blog.ts and love.ts
// These are inside testimonials and blog post content - replace 'GOAT' with 'Starter'
// but keep 'GOAT dad' -> 'cool dad', and 'More GOAT customers' -> 'More Starter customers' etc.

function cleanFile(filePath) {
  let c = fs.readFileSync(filePath, 'utf8');
  const original = c;

  // Broad replacement of all remaining GOAT references
  // Using split/join to avoid regex issues

  // Handle special cases first
  c = c.split('be a GOAT').join('be a Starter');
  c = c.split('A GOAT dad').join('A cool dad');
  c = c.split('GOAT dad').join('cool dad');
  c = c.split('More GOAT customers').join('More Starter customers');
  c = c.split('GOAT &gt; Go').join('Starter &gt; Go');
  c = c.split('Go, GOAT,').join('Go, Starter,');
  c = c.split('GOAT/$10').join('Starter/$10');
  c = c.split('10 GOAT ').join('10 Starter ');
  c = c.split('in GOAT').join('in Starter');
  c = c.split('GOAT and above').join('Starter and above');
  c = c.split('on $10/mo GOAT').join('on $10/mo Starter');
  c = c.split('second @nooes_ai GOAT sub').join('second @nooes_ai Starter sub');
  c = c.split('Switched to GOAT').join('Switched to Starter');
  c = c.split('upgraded to GOAT').join('upgraded to Starter');
  c = c.split('built a GOAT').join('built a legend');
  c = c.split('@nooes_ai GOAT Plan').join('@nooes_ai Starter Plan');
  c = c.split('first week of GOAT Plan').join('first week of Starter Plan');
  c = c.split('GO to GOAT to Pro').join('Go to Starter to Pro');
  c = c.split('GOAT</strong>').join('Starter</strong>');
  c = c.split('GOAT 🐐').join('Starter 🚀');

  // Generic catch-all after specific cases
  c = c.split('GOAT').join('Starter');

  if (c !== original) {
    fs.writeFileSync(filePath, c, 'utf8');
    const remaining = (c.match(/GOAT/g) || []).length;
    console.log('Cleaned ' + path.basename(filePath) + ' - remaining: ' + remaining);
  }
}

cleanFile('src/data/pages/blog.ts');
cleanFile('src/data/pages/love.ts');

// Grand final verification
console.log('\nGrand final verification across ALL pages:');
const dir = 'src/data/pages';
let total = 0;
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.ts')) continue;
  const c = fs.readFileSync(path.join(dir, file), 'utf8');
  const count = (c.match(/GOAT/g) || []).length;
  if (count > 0) {
    console.log(file + ': ' + count);
    total += count;
  }
}
if (total === 0) console.log('ALL CLEAN - no GOAT in any page!');
else console.log('Total remaining: ' + total);
