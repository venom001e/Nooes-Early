import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

// Extract nav
const navMatch = html.match(/<nav\s+class="[^"]*fixed top-0[^"]*"[\s\S]*?<\/nav>/i);
if (navMatch) {
  fs.writeFileSync('docs/research/navbar.html', navMatch[0]);
  console.log('Saved navbar.html, length:', navMatch[0].length);
} else {
  console.log('Navbar regex did not match');
}

// Extract footer
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  fs.writeFileSync('docs/research/footer.html', footerMatch[0]);
  console.log('Saved footer.html, length:', footerMatch[0].length);
} else {
  console.log('Footer regex did not match');
}

