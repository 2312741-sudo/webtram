const fs = require('fs');
const path = require('path');

const dir = 'd:/webtram';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldCSSRegex = /\.nav-inline ul\{list-style:none;display:flex;gap:10px;margin:0;padding:0\}[\s\S]*?\.nav-inline a\.active\{background:var\(--mustard\);color:#2D2A4A\}/;

const newCSS = `.nav-inline ul{list-style:none;display:flex;gap:24px;margin:0;padding:0;flex-wrap:wrap;justify-content:flex-end}
    .nav-inline a{position:relative;display:inline-flex;align-items:center;padding:8px 0;font-weight:800;font-size:16px;color:var(--navy);border:none;background:transparent;box-shadow:none;transition:color .2s ease;text-decoration:none;letter-spacing:0.5px}
    .nav-inline a::after{content:'';position:absolute;bottom:-2px;left:0;width:0%;height:3px;background:var(--maroon);border-radius:2px;transition:width .3s ease}
    .nav-inline a:hover{color:var(--maroon-d);background:transparent;transform:none;box-shadow:none}
    .nav-inline a:hover::after, .nav-inline a.active::after{width:100%}
    .nav-inline a.active{color:var(--maroon-d);background:transparent;box-shadow:none;transform:none}`;

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (oldCSSRegex.test(content)) {
    content = content.replace(oldCSSRegex, newCSS);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', file);
    updatedCount++;
  } else {
    // try a more loose regex
    const startRegex = /\.nav-inline ul\{/;
    const endRegex = /\.nav-inline a\.active\{[^\}]+\}/;
    
    const startMatch = content.match(startRegex);
    if(startMatch) {
        const startIdx = startMatch.index;
        const subStr = content.substring(startIdx);
        const endMatch = subStr.match(endRegex);
        if(endMatch) {
            const endIdx = startIdx + endMatch.index + endMatch[0].length;
            const toReplace = content.substring(startIdx, endIdx);
            content = content.replace(toReplace, newCSS);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated (loose)', file);
            updatedCount++;
        } else {
            console.log('Could not find end match in', file);
        }
    } else {
        console.log('Could not find start match in', file);
    }
  }
});

console.log('Total files updated:', updatedCount);
