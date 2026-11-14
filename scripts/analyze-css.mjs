import fs from 'node:fs';

const css = fs.readFileSync('docs/research/root.css', 'utf8');

// Look for :root definitions
const rootMatches = [...css.matchAll(/:root\s*\{([^}]+)\}/g)].map(m => m[1]);
console.log(':root matches count:', rootMatches.length);
if (rootMatches.length > 0) {
  console.log('Sample :root variables (first 500 chars):');
  console.log(rootMatches[0].slice(0, 500));
}

// Look for font-family
const fontMatches = [...new Set([...css.matchAll(/font-family:[^;]+/g)].map(m => m[0]))];
console.log('\nFont families:');
fontMatches.slice(0, 10).forEach(f => console.log(f));

// Look for key color classes or dark theme
console.log('\nHas .dark?', css.includes('.dark'));
console.log('Has dark:?', css.includes('dark:'));

// Look for top classes
const classMatches = [...new Set([...css.matchAll(/\.([a-zA-Z0-9_\-\[\]\:\/\.]+)\{/g)].map(m => m[1]))];
console.log('Total CSS classes found:', classMatches.length);

