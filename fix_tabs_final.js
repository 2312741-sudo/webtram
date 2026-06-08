const fs = require('fs');
let content = fs.readFileSync('d:/webtram/products.html', 'utf8');

const target = `      renderFilters(categories);
      renderProducts();
    }).catch((error) => {`;

const replacement = `      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam === 'tram-chanh') { currentCategory = 'Trạm Chanh'; }
      else if (catParam === 'tram-sua') { currentCategory = 'Trạm Sữa'; }
      else if (catParam === 'tram-banh') { currentCategory = 'Trạm Bánh'; }

      renderFilters(categories);
      renderProducts();
    }).catch((error) => {`;

// Standardize line endings just in case
let normalizedContent = content.replace(/\r\n/g, '\n');
let normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    normalizedContent = normalizedContent.replace(normalizedTarget, replacement);
    fs.writeFileSync('d:/webtram/products.html', normalizedContent, 'utf8');
    console.log("Success");
} else {
    console.log("Target not found!");
}
