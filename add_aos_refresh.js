const fs = require('fs');
let content = fs.readFileSync('d:/webtram/products.html', 'utf8');

// Add AOS.refresh() at the end of renderProducts
content = content.replace(/gridEl\.appendChild\(groupDiv\);\n      }\n    };/, "gridEl.appendChild(groupDiv);\n      }\n      if (window.AOS) {\n        setTimeout(() => AOS.refresh(), 100);\n      }\n    };");

fs.writeFileSync('d:/webtram/products.html', content, 'utf8');
console.log('Added AOS.refresh to products.html');
