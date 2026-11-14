const fs = require('fs');
const c = fs.readFileSync('src/data/pages/home.ts', 'utf8');

const goatIdx = c.indexOf('Be a GOAT');
console.log('goatIdx:', goatIdx);

const targetClass = '<div class=\\"border border-border border-t-0 border-b-0 relative flex flex-col justify-start items-center w-[90vw] md:w-[80vw] max-w-[1189px] mx-auto\\">';
const startIdx = c.lastIndexOf(targetClass, goatIdx);
console.log('Actual startIdx before goatIdx:', startIdx);

const nextDivider = '<div class=\\"h-[100px] flex justify-center items-center border-t border-b w-full border-border\\"><div class=\\"h-[100px] w-[90vw] md:w-[80vw] max-w-[1189px] border-l border-r border-border custom-dashed\\"></div></div>';
const endIdx = c.indexOf(nextDivider, goatIdx);
console.log('Actual endIdx after goatIdx:', endIdx);

const sectionSnippet = c.slice(startIdx, endIdx);
console.log('Snippet length:', sectionSnippet.length);
console.log('Snippet starts with:', sectionSnippet.slice(0, 150));
console.log('Snippet ends with:', sectionSnippet.slice(-150));

let openDivs = (sectionSnippet.match(/<div(\s|>)/g) || []).length;
let closeDivs = (sectionSnippet.match(/<\/div>/g) || []).length;
console.log('openDivs:', openDivs, 'closeDivs:', closeDivs);
console.log('Contains Be a GOAT:', sectionSnippet.includes('Be a GOAT'));
console.log('Contains See full pricing:', sectionSnippet.includes('See full pricing'));
console.log('Contains Max 20:', sectionSnippet.includes('Max 20'));
