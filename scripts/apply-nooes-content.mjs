import fs from 'node:fs';

let html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// 1. Title
html = html.replace(
  /<title>.*?<\/title>/i,
  '<title>Nooes — Code Less. Build More. | The AI Software Engineering Platform</title>'
);

// 2. Meta description
html = html.replace(
  /<meta\s+name=["']description["']\s+content=["'][^"']*["']/i,
  '<meta name="description" content="Nooes is an AI-powered software engineering platform designed to help developers build software more efficiently directly inside their project."'
);

// 3. Hero H1
const oldH1Regex = /<h1[^>]*>[\s\S]*?<\/h1>/i;
const newH1 = `<h1 class="font-display text-[28px] sm:text-[32px] md:text-[32px] lg:text-[42px] xl:text-[52px] leading-[1.05] font-semibold text-center sm:text-start px-0 "><span style="opacity:1">The AI Software Engineering Platform<br/>That Works <span class="text-brand-text">Inside Your Project</span>.<br/><span dir="ltr" class="text-muted-foreground inline-block">Nooes.</span></span></h1>`;
html = html.replace(oldH1Regex, newH1);

// 4. Hero Tagline / Badge
html = html.replaceAll('Command Code raised $5M seed.', 'Code Less. Build More. — Nooes 2.0 is live');
html = html.replaceAll('best coding agent for open models', 'AI Software Engineering Platform inside your project');

// 5. Replace Brand Name globally where appropriate
html = html.replaceAll('Command Code', 'Nooes');
html = html.replaceAll('command code', 'nooes');
html = html.replaceAll('commandcode', 'nooes');

fs.writeFileSync('docs/research/pages/homepage-nooes.html', html);
console.log('Saved test homepage-nooes.html');

