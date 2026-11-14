const fs = require('fs');

// In pricing.ts, the GOAT references are inside the actual pricing plan UI - replace GOAT plan name with "Starter"
let content = fs.readFileSync('src/data/pages/pricing.ts', 'utf8');

// Replace visible plan name "GOAT" with "Starter"
content = content
  .replace(/>GOAT</g, '>Starter<')
  .replace(/Get GOAT</g, 'Get Starter<')
  .replace(/\$10 GOAT plan/g, '$10 Starter plan')
  .replace(/\$10\) is for developers/g, '$10) is for developers') // keep context, just fix GOAT
  .replace(/GOAT \(\$10\)/g, 'Starter ($10)')
  .replace(/GOAT plan/g, 'Starter plan');

fs.writeFileSync('src/data/pages/pricing.ts', content, 'utf8');
console.log('Updated pricing.ts - replaced GOAT plan name with Starter');

// Verify
const remaining = (content.match(/GOAT/g) || []);
if (remaining.length > 0) {
  console.log('Remaining GOAT occurrences:', remaining.length);
  let pos = 0;
  while (true) {
    const idx = content.indexOf('GOAT', pos);
    if (idx === -1) break;
    console.log('  At ' + idx + ':', content.slice(Math.max(0, idx-50), idx+100));
    pos = idx + 4;
  }
} else {
  console.log('All GOAT references removed from pricing.ts!');
}

