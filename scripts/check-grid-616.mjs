import fs from 'node:fs';

const homeTs = fs.readFileSync('src/data/pages/home.ts', 'utf8');
const search = 'height:616px';
const idx = homeTs.indexOf(search);
console.log('Index:', idx);
if (idx !== -1) {
  console.log(homeTs.slice(idx, idx + 4000));
}

