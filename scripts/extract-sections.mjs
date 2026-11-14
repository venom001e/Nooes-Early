import fs from 'node:fs';

const html = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

const navStart = html.indexOf('<nav class="flex items-center w-full h-[85px]');
const sectionStart = html.indexOf('<section id="everywhere"', navStart);

const fullNav = html.slice(navStart, sectionStart);
fs.writeFileSync('docs/research/navbar-full.html', fullNav);
console.log('Full nav saved! Length:', fullNav.length);

const footerStart = html.indexOf('<footer aria-label="Footer"');
const footerEnd = html.indexOf('</body>', footerStart);
const fullFooter = html.slice(footerStart, footerEnd);
fs.writeFileSync('docs/research/footer-full.html', fullFooter);
console.log('Full footer saved! Length:', fullFooter.length);

