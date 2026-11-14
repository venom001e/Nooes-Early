import fs from 'node:fs';
import path from 'node:path';

function transformHomeHtml(raw) {
  let html = raw;

  // 1. Replace Title & Meta
  html = html.replace(
    /<title>.*?<\/title>/i,
    '<title>Nooes — Code Less. Build More. | The AI Software Engineering Platform</title>'
  );

  // 2. Hero H1
  const oldH1 = /<h1 class="font-display[^"]*"[^>]*>[\s\S]*?<\/h1>/i;
  const newH1 = `<h1 class="font-display text-[28px] sm:text-[32px] md:text-[32px] lg:text-[42px] xl:text-[52px] leading-[1.05] font-semibold text-center sm:text-start px-0 "><span style="opacity:1">The AI Software Engineering Platform<br/>That Works <span class="text-brand-text">Inside Your Project</span>.<br/><span dir="ltr" class="text-muted-foreground inline-block">Nooes.</span></span></h1>`;
  html = html.replace(oldH1, newH1);

  // 3. Hero Tagline Badge
  html = html.replaceAll('Command Code raised $5M seed.', 'Code Less. Build More. — Introducing Nooes');

  // 4. Hero description paragraph
  html = html.replaceAll(
    /Command Code is the best coding agent for open models\.[^<]*/gi,
    'Nooes is an AI-powered software engineering platform designed to help developers build software more efficiently. Unlike traditional AI chatbots, Nooes works directly inside your project—understanding your codebase, editing files, fixing bugs, executing terminal commands, and assisting throughout the entire development workflow.'
  );

  // 5. Replace 7 core features in the feature list
  html = html.replaceAll('Your coding taste `npx taste`', '🧠 Understands Your Entire Codebase');
  html = html.replaceAll('Your coding taste ', '🧠 Understands Codebase ');
  html = html.replaceAll('Interactive, headless, sandbox agents', '✨ Direct File Editing (Natural Language)');
  html = html.replaceAll('Skills, reviews, bundled agentic tools', '🐞 Autonomous Bug Detection & Fixing');
  html = html.replaceAll('Context engineering with /agents, /memory', '💻 Terminal Automation & Workflows');
  html = html.replaceAll('Hackable /skills, /mcp, /commands, and plugins', '🤖 Multi-Model AI (Claude, GPT-4o, Gemini)');
  html = html.replaceAll('Collaborate /share sessions, npx taste push/pull', '☁️ Cloud Account & Multi-Device Sync');
  html = html.replaceAll('Your design partner `/design`', '🚀 Built for Every Developer & Team');

  // 6. Section copy
  html = html.replaceAll(
    'Hello, taste. The meta neuro-symbolic AI model that pairs LLMs with your coding taste.',
    'Code Less. Build More. Nooes automatically scans your complete project architecture, dependencies, and APIs without copy-pasting.'
  );
  html = html.replaceAll(
    'Hello, taste.</span> The meta neuro-symbolic AI model that pairs LLMs with your coding',
    'Code Less. Build More.</span> An AI software engineering platform that works directly inside your'
  );
  html = html.replaceAll('//best coding agent for open models.', '//AI Engineering Platform Inside Your Codebase');
  html = html.replaceAll('best coding agent for open models.', 'The AI software engineering platform that works inside your project.');
  html = html.replaceAll('//stop patching AI slop.', '//Why Nooes?');
  html = html.replaceAll('stop patching AI slop.', 'Traditional AI chatbots guess. Nooes understands and takes action.');

  // 7. Subscribe / CTA banner
  html = html.replaceAll('Subscribe.Be a GOAT.', 'Start Building with Nooes.');
  html = html.replaceAll(
    'Everything you need to ship production code faster with AI.',
    'Experience a smarter way to build software—where your AI doesn’t just answer questions, but works directly inside your project to help you create, improve, and ship applications faster.'
  );

  // 8. Brand replacements
  html = html.replaceAll('Command Code', 'Nooes');
  html = html.replaceAll('command code', 'nooes');
  html = html.replaceAll('commandcode', 'nooes');
  html = html.replaceAll('COMMAND CODE', 'NOOES');

  return html;
}

function cleanHtml(raw) {
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];
  
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  body = body.replaceAll('https://commandcode.ai/', '/');
  body = body.replaceAll('https://commandcode.ai', '/');
  
  return body.trim();
}

console.log('Transforming homepage with Nooes data...');
const rawHome = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');
const transformedHome = transformHomeHtml(rawHome);
const cleanedHome = cleanHtml(transformedHome);

// Write home.ts data
fs.writeFileSync(
  'src/data/pages/home.ts',
  `export const homeData = {\n  title: "Nooes — Code Less. Build More.",\n  description: "The AI Software Engineering Platform That Works Inside Your Project. Understands your codebase, edits files, fixes bugs, and executes terminal commands.",\n  html: ${JSON.stringify(cleanedHome)}\n};\n`
);
console.log('Saved src/data/pages/home.ts');

// Rebrand other core pages (about, features, why, pricing)
const otherPages = [
  { key: 'about', file: 'about.html', title: 'About Nooes — Code Less. Build More.' },
  { key: 'features', file: 'features.html', title: 'Features — Nooes AI Engineering Platform' },
  { key: 'why', file: 'why.html', title: 'Why Nooes — The AI Platform Inside Your Codebase' },
  { key: 'pricing', file: 'pricing.html', title: 'Pricing — Nooes AI Platform' },
  { key: 'models', file: 'models.html', title: 'Supported Models — Nooes Multi-Model AI' },
  { key: 'skills', file: 'skills.html', title: 'Skills & Capabilities — Nooes' },
  { key: 'desktop', file: 'desktop.html', title: 'Nooes Terminal & Desktop App' },
  { key: 'changelog', file: 'changelog.html', title: 'Changelog — Nooes' },
  { key: 'contact', file: 'contact.html', title: 'Contact Nooes Team' },
  { key: 'careers', file: 'careers.html', title: 'Careers at Nooes' },
];

for (const p of otherPages) {
  const filePath = path.join('docs/research/pages', p.file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replaceAll('Command Code', 'Nooes');
  content = content.replaceAll('command code', 'nooes');
  content = content.replaceAll('commandcode', 'nooes');
  content = content.replaceAll('COMMAND CODE', 'NOOES');

  const cleaned = cleanHtml(content);
  fs.writeFileSync(
    path.join('src/data/pages', `${p.key}.ts`),
    `export const ${p.key}Data = {\n  title: ${JSON.stringify(p.title)},\n  description: "Nooes is the AI Software Engineering Platform That Works Inside Your Project.",\n  html: ${JSON.stringify(cleaned)}\n};\n`
  );
  console.log(`Saved src/data/pages/${p.key}.ts`);
}

console.log('Rebrand completed successfully!');

