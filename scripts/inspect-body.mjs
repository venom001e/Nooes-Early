import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// Extract the body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}

const bodyAttr = html.match(/<body([^>]*)>/i)?.[1] || '';
console.log('Body attributes:', bodyAttr);

const bodyContent = bodyMatch[1];
console.log('Body length:', bodyContent.length);

// Check root containers
const firstDivMatch = bodyContent.match(/<div[^>]*class=["']([^"']*)["'][^>]*>/i);
console.log('First div classes:', firstDivMatch?.[1]);

// Let's check main tags or sections
const sectionMatches = [...bodyContent.matchAll(/<(header|nav|main|footer|section)([^>]*)>/gi)].map(m => `<${m[1]}${m[2]}>`);
console.log('Major structural tags:');
sectionMatches.forEach(s => console.log(s));

