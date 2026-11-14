import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// Find all script tags in original
const scripts = [...orig.matchAll(/<script\s+[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total script tags:', scripts.length);

scripts.forEach((s, idx) => {
  const openTag = s[0].match(/<script[^>]*>/)[0];
  console.log(`Script ${idx + 1}: ${openTag}`);
  if (s[1].length < 200) {
    console.log('Content:', s[1]);
  } else {
    console.log('Content (first 150):', s[1].slice(0, 150));
  }
});

