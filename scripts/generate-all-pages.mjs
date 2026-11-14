import fs from 'node:fs';
import path from 'node:path';

const pages = [
  { key: 'home', route: '', file: 'homepage.html' },
  { key: 'pricing', route: 'pricing', file: 'pricing.html' },
  { key: 'features', route: 'features', file: 'features.html' },
  { key: 'about', route: 'about', file: 'about.html' },
  { key: 'desktop', route: 'desktop', file: 'desktop.html' },
  { key: 'why', route: 'why', file: 'why.html' },
  { key: 'models', route: 'models', file: 'models.html' },
  { key: 'skills', route: 'skills', file: 'skills.html' },
  { key: 'security', route: 'security', file: 'security.html' },
  { key: 'love', route: 'love', file: 'love.html' },
  { key: 'changelog', route: 'changelog', file: 'changelog.html' },
  { key: 'brand', route: 'brand', file: 'brand.html' },
  { key: 'careers', route: 'careers', file: 'careers.html' },
  { key: 'contact', route: 'contact', file: 'contact.html' },
  { key: 'developers', route: 'developers', file: 'developers.html' },
  { key: 'provider', route: 'provider', file: 'provider.html' },
  { key: 'blog', route: 'blog', file: 'blog.html' },
  { key: 'privacy', route: 'privacy', file: 'privacy.html' },
  { key: 'terms', route: 'terms', file: 'terms.html' },
  { key: 'signin', route: 'signin', file: 'signin.html' },
  { key: 'signup', route: 'signup', file: 'signup.html' },
  { key: 'forgot', route: 'forgot', file: 'forgot.html' },
  { key: 'mods', route: 'mods', file: 'mods.html' },
  { key: 'ide', route: 'ide', file: 'ide.html' },
  { key: 'learn', route: 'learn', file: 'learn.html' },
  { key: 'launch', route: 'launch', file: 'launch.html' },
];

function cleanHtml(raw) {
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];
  
  // Remove script tags
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove noscript tags
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  
  // Replace internal links to stay local in app
  body = body.replaceAll('https://commandcode.ai/', '/');
  body = body.replaceAll('https://commandcode.ai', '/');
  
  return body.trim();
}

fs.mkdirSync('src/data/pages', { recursive: true });

for (const p of pages) {
  const filePath = path.join('docs/research/pages', p.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const title = raw.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || 'Command Code';
  const desc = raw.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() || 
               'Command Code is the best coding agent for open models.';
  const cleanedHtml = cleanHtml(raw);

  // Write data file
  const dataPath = path.join('src/data/pages', `${p.key}.ts`);
  const escapedHtml = JSON.stringify(cleanedHtml);
  fs.writeFileSync(dataPath, `export const ${p.key}Data = {\n  title: ${JSON.stringify(title)},\n  description: ${JSON.stringify(desc)},\n  html: ${escapedHtml}\n};\n`);
  console.log(`Generated data: ${dataPath} (${cleanedHtml.length} bytes)`);

  // Write Next.js page route
  const targetDir = p.route ? path.join('src/app', p.route) : 'src/app';
  fs.mkdirSync(targetDir, { recursive: true });
  const pagePath = path.join(targetDir, 'page.tsx');

  const pageContent = `import type { Metadata } from 'next';
import { ${p.key}Data } from '@/data/pages/${p.key}';
import SiteInteractions from '@/components/sites/commandcode/SiteInteractions';

export const metadata: Metadata = {
  title: ${p.key}Data.title,
  description: ${p.key}Data.description,
};

export default function ${p.key.charAt(0).toUpperCase() + p.key.slice(1)}Page() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: ${p.key}Data.html }} 
      />
      <SiteInteractions />
    </>
  );
}
`;

  fs.writeFileSync(pagePath, pageContent);
  console.log(`Generated page: ${pagePath}`);
}

console.log('All 26 pages successfully created!');

