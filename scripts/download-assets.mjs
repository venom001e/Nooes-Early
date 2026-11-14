import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://commandcode.ai';
const assetList = JSON.parse(fs.readFileSync('docs/research/asset-list.json', 'utf8'));

async function downloadAsset(urlPath) {
  try {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
    
    // Determine local path in public/
    let cleanPath = urlPath.replace(/^https?:\/\/[^\/]+/, '');
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);
    
    // strip query params
    cleanPath = cleanPath.split('?')[0];
    
    const localFile = path.join('public', cleanPath);
    if (fs.existsSync(localFile)) {
      return; // Already downloaded
    }

    const res = await fetch(fullUrl);
    if (!res.ok) {
      // console.warn(`Failed ${fullUrl}: ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(localFile), { recursive: true });
    fs.writeFileSync(localFile, buffer);
  } catch (e) {
    // ignore individual failures
  }
}

async function main() {
  console.log(`Starting download of ${assetList.length} assets...`);
  const batchSize = 25;
  for (let i = 0; i < assetList.length; i += batchSize) {
    const batch = assetList.slice(i, i + batchSize);
    await Promise.all(batch.map(downloadAsset));
    if ((i + batchSize) % 50 === 0 || i + batchSize >= assetList.length) {
      console.log(`Downloaded ${Math.min(i + batchSize, assetList.length)}/${assetList.length}`);
    }
  }
  console.log('Finished downloading assets.');
}

main().catch(console.error);

