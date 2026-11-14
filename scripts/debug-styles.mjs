import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// Let's check what stylesheets and fonts commandcode.ai loads in its <head>
const origHead = orig.match(/<head[^>]*>([\s\S]*?)<\/head>/i)[1];
console.log('Original head length:', origHead.length);

// Check all <style> tags in original page
const styles = [...orig.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('Style tags in original:', styles.length);

// Check all stylesheets linked in original
const stylesheets = [...orig.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
console.log('Stylesheets linked:');
stylesheets.forEach(s => console.log(s));

