import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const matches = [...html.matchAll(/(<[a-zA-Z0-9\-]+[^>]+style=["'][^"']*opacity:\s*0[^"']*["'][^>]*>)/gi)].map(m => m[0]);
console.log('Elements with opacity:0 count:', matches.length);
matches.forEach(m => console.log(m.slice(0, 150)));

