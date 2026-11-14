import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://commandcode.ai';

async function fetchAndSave(urlPath, outputPath) {
  try {
    const fullUrl = `${BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
    console.log(`Fetching: ${fullUrl}`);
    const res = await fetch(fullUrl);
    if (!res.ok) {
      console.error(`Failed ${fullUrl}: ${res.status}`);
      return null;
    }
    const text = await res.text();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, text);
    console.log(`Saved ${outputPath} (${text.length} bytes)`);
    return text;
  } catch (e) {
    console.error(`Error fetching ${urlPath}:`, e.message);
    return null;
  }
}

async function main() {
  // 1. Download stylesheets
  await fetchAndSave('/assets/root-DMQRLNXC.css', 'docs/research/root.css');
  await fetchAndSave('/assets/love-DK_E78op.css', 'docs/research/love.css');
  await fetchAndSave('/assets/desktop-page-_I461akd.css', 'docs/research/desktop.css');

  // 2. Discover primary pages to clone
  // The primary distinct English pages of commandcode.ai:
  const pages = [
    { route: '/', file: 'homepage.html' },
    { route: '/pricing', file: 'pricing.html' },
    { route: '/features', file: 'features.html' },
    { route: '/about', file: 'about.html' },
    { route: '/desktop', file: 'desktop.html' },
    { route: '/why', file: 'why.html' },
    { route: '/models', file: 'models.html' },
    { route: '/skills', file: 'skills.html' },
    { route: '/security', file: 'security.html' },
    { route: '/love', file: 'love.html' },
    { route: '/changelog', file: 'changelog.html' },
    { route: '/brand', file: 'brand.html' },
    { route: '/careers', file: 'careers.html' },
    { route: '/contact', file: 'contact.html' },
    { route: '/developers', file: 'developers.html' },
    { route: '/provider', file: 'provider.html' },
    { route: '/blog', file: 'blog.html' },
    { route: '/privacy', file: 'privacy.html' },
    { route: '/terms', file: 'terms.html' },
    { route: '/signin', file: 'signin.html' },
    { route: '/signup', file: 'signup.html' },
    { route: '/forgot', file: 'forgot.html' },
  ];

  for (const page of pages) {
    await fetchAndSave(page.route, `docs/research/pages/${page.file}`);
  }
}

main().catch(console.error);

