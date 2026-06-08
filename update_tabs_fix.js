const fs = require('fs');

let content = fs.readFileSync('d:/webtram/products.html', 'utf8');

const newLogic = `
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam === 'tram-chanh') { currentCategory = 'Trạm Chanh'; }
      else if (catParam === 'tram-sua') { currentCategory = 'Trạm Sữa'; }
      else if (catParam === 'tram-banh') { currentCategory = 'Trạm Bánh'; }

      renderFilters(categories);
      renderProducts();
    }).catch((error) => {`;

content = content.replace(/      renderFilters\(categories\);\n      renderProducts\(\);\n    \}\)\.catch\(\(error\) => \{/, newLogic);

fs.writeFileSync('d:/webtram/products.html', content, 'utf8');
console.log('Fixed URL parsing in products.html');
