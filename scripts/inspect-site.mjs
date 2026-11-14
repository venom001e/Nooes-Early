import fs from 'node:fs';

async function main() {
  console.log('Fetching homepage HTML...');
  const res = await fetch('https://commandcode.ai');
  const html = await res.text();
  fs.writeFileSync('docs/research/homepage.html', html);

  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis;
  const links = [];
  let m;
  while ((m = linkRegex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    links.push({ href, text });
  }

  const internalLinks = links.filter(l => 
    l.href.startsWith('/') || l.href.includes('commandcode.ai')
  );

  console.log('Homepage internal links count:', internalLinks.length);
  console.log(JSON.stringify(internalLinks, null, 2));
}

main().catch(console.error);

