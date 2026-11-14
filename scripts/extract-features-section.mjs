import fs from 'node:fs';

const orig = fs.readFileSync('docs/research/pages/homepage.html', 'utf8');

const search = '// best coding agent for open models';
const idx = orig.indexOf(search);
console.log('Found search at index:', idx);

if (idx !== -1) {
  // Let's find the section container
  const sectionStart = orig.lastIndexOf('<section', idx);
  const sectionEnd = orig.indexOf('</section>', idx + 5000);
  console.log('Section start:', sectionStart, 'Section end:', sectionEnd);
  const sectionHtml = orig.slice(sectionStart, sectionEnd + 10);
  fs.writeFileSync('docs/research/features-section-original.html', sectionHtml);
  console.log('Saved features-section-original.html (length: ' + sectionHtml.length + ')');
}

