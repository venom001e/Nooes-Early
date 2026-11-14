import fs from 'node:fs';

const homeTs = fs.readFileSync('src/data/pages/home.ts', 'utf8');
const fIdx = homeTs.indexOf('//');
const bestIdx = homeTs.indexOf('Ships. Fixes');

console.log('Ships. Fixes in home.ts:', bestIdx);
if (bestIdx !== -1) {
  console.log(homeTs.slice(bestIdx - 500, bestIdx + 2000));
}

