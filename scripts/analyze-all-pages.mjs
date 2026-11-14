import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'docs/research/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const title = content.match(/<title>([^<]*)<\/title>/i)?.[1] || '';
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) continue;
  
  // Find navbar
  const hasNav = content.includes('<nav');
  // Find footer
  const hasFooter = content.includes('<footer');
  // Find main or first big container
  const firstDiv = bodyMatch[1].match(/<div[^>]*class=["']([^"']*)["'][^>]*>/i)?.[1];
  console.log(`${file.padEnd(16)} | Title: ${title.slice(0, 40).padEnd(40)} | hasNav: ${hasNav} | hasFooter: ${hasFooter} | wrapper: ${firstDiv?.slice(0, 50)}`);
}

