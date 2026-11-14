import fs from 'node:fs';
import path from 'node:path';

function cleanHtml(raw) {
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];
  
  // Remove script tags
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove noscript tags
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  
  // Replace internal links to stay local
  body = body.replaceAll('https://commandcode.ai/', '/');
  body = body.replaceAll('https://commandcode.ai', '/');
  
  return body.trim();
}

const html = fs.readFileSync('docs/research/pages/pricing.html', 'utf8');
const cleaned = cleanHtml(html);
console.log('Cleaned pricing HTML length:', cleaned.length);
console.log('Start:\n', cleaned.slice(0, 300));
console.log('\nEnd:\n', cleaned.slice(-300));

