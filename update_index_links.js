const fs = require('fs');
let content = fs.readFileSync('d:/webtram/index.html', 'utf8');

content = content.replace(/<a href="menuTramChanh\.html"/g, '<a href="products.html"');
content = content.replace(/<a href="menuTramSua\.html"/g, '<a href="products.html"');
content = content.replace(/<a href="menuTramBanh\.html"/g, '<a href="products.html"');

fs.writeFileSync('d:/webtram/index.html', content, 'utf8');
