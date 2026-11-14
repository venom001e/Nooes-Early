import fs from 'node:fs';
import path from 'node:path';

function fixDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      fixDir(full);
    } else if (f.name.endsWith('.html')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('&#x27;')) {
        c = c.replaceAll('&#x27;', "'");
        fs.writeFileSync(full, c);
        console.log('Fixed', full);
      }
    }
  }
}

fixDir('docs/research');

