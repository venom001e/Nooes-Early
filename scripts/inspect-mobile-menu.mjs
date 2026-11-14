import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const search = 'Open main menu';
const idx = html.indexOf(search);
console.log('Index:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 600));
}

// Check where mobile menu links or dialogs are
console.log('\nDialog or drawer or menu matches:');
const matches = [...html.matchAll(/<div[^>]+(role=["']dialog["']|data-state=["']open["']|fixed inset-0)[^>]*>/gi)];
matches.forEach(m => console.log(m[0]));

