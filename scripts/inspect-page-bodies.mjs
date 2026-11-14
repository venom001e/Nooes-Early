import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'docs/research/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) continue;
  
  const body = bodyMatch[1];
  // Check if body has script tags
  const scripts = [...body.matchAll(/<script[\s\S]*?<\/script>/gi)];
  console.log(`${file.padEnd(16)}: Body length ${body.length}, Scripts in body: ${scripts.length}`);
}

