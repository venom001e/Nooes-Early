import fs from 'node:fs';

const homeTs = fs.readFileSync('src/data/pages/home.ts', 'utf8');
const match = homeTs.match(/html:\s*("[\s\S]*?")\s*};/);
let html = JSON.parse(match[1]);

console.log('Original html length:', html.length);

// 1. Fix desktop demo scale
html = html.replaceAll('--demo-scale:0', '--demo-scale:1');

// 2. Fix opacity:0 on content headings and text that were waiting for JS scroll trigger
html = html.replaceAll(
  '<div class="community-eyebrow font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground/70" style="opacity:0">',
  '<div class="community-eyebrow font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground/70" style="opacity:1">'
);

html = html.replaceAll(
  '<h2 class="community-heading font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] text-balance leading-[1.05] font-semibold tracking-[-0.02em] text-foreground" style="opacity:0">',
  '<h2 class="community-heading font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] text-balance leading-[1.05] font-semibold tracking-[-0.02em] text-foreground" style="opacity:1">'
);

html = html.replaceAll(
  'class="w-[90%] text-start sm:max-w-[440px] description-text leading-snug" style="opacity:0"',
  'class="w-[90%] text-start sm:max-w-[440px] description-text leading-snug" style="opacity:1"'
);

// 3. Fix any select-none hidden labels that had opacity:0
html = html.replaceAll('style="opacity:0"', 'style="opacity:1"');

// Write back to home.ts
fs.writeFileSync(
  'src/data/pages/home.ts',
  `export const homeData = {\n  title: "Nooes — Code Less. Build More.",\n  description: "The AI Software Engineering Platform That Works Inside Your Project. Understands your codebase, edits files, fixes bugs, and executes terminal commands.",\n  html: ${JSON.stringify(html)}\n};\n`
);

console.log('Fixed zero-scale and zero-opacity in home.ts!');

