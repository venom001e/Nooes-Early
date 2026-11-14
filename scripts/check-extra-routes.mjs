import fs from 'node:fs';

const extraRoutes = ['/mods', '/ide', '/learn', '/launch', '/billing'];

async function check() {
  for (const r of extraRoutes) {
    try {
      const res = await fetch(`https://commandcode.ai${r}`, { redirect: 'manual' });
      console.log(`${r.padEnd(10)}: status ${res.status}, location: ${res.headers.get('location')}`);
    } catch (e) {
      console.log(`${r}: error ${e.message}`);
    }
  }
}

check();

