import fs from 'node:fs';

let css = fs.readFileSync('src/styles/commandcode.css', 'utf8');
console.log('Entities found:');
console.log('&#x27; count:', (css.match(/&#x27;/g) || []).length);
console.log('&quot; count:', (css.match(/&quot;/g) || []).length);
console.log('&amp; count:', (css.match(/&amp;/g) || []).length);

css = css.replaceAll('&#x27;', "'")
         .replaceAll('&quot;', '"')
         .replaceAll('&amp;', '&');

// Also check any url(something) that might be relative or missing leading slash
// Ensure url('/home/noise.png') etc. exist in public/
fs.writeFileSync('src/styles/commandcode.css', css);
console.log('Fixed entities in src/styles/commandcode.css');

