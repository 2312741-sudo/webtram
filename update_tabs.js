const fs = require('fs');

// UPDATE index.html
let indexContent = fs.readFileSync('d:/webtram/index.html', 'utf8');

indexContent = indexContent.replace(/<a href="products\.html" class="badge" style="background:var\(--mustard\);/g, '<a href="products.html?category=tram-chanh" class="badge" style="background:var(--mustard);');
indexContent = indexContent.replace(/<a href="products\.html" class="badge" style="background:var\(--teal\);/g, '<a href="products.html?category=tram-sua" class="badge" style="background:var(--teal);');
indexContent = indexContent.replace(/<a href="products\.html" class="badge" style="background:var\(--maroon\);/g, '<a href="products.html?category=tram-banh" class="badge" style="background:var(--maroon);');

fs.writeFileSync('d:/webtram/index.html', indexContent, 'utf8');

// UPDATE products.html
let productsContent = fs.readFileSync('d:/webtram/products.html', 'utf8');

const newInitLogic = `        if (data) {
          const products = JSON.parse(data);
          allProducts = Object.values(products).sort((a,b) => (a.price || 0) - (b.price || 0));
          
          const urlParams = new URLSearchParams(window.location.search);
          const catParam = urlParams.get('category');
          let targetBtn = document.querySelectorAll('.filter-btn')[0];
          let initialCat = 'all';
          if (catParam === 'tram-chanh') { initialCat = 'Trạm Chanh'; targetBtn = document.querySelectorAll('.filter-btn')[1]; }
          else if (catParam === 'tram-sua') { initialCat = 'Trạm Sữa'; targetBtn = document.querySelectorAll('.filter-btn')[2]; }
          else if (catParam === 'tram-banh') { initialCat = 'Trạm Bánh'; targetBtn = document.querySelectorAll('.filter-btn')[3]; }
          
          if(targetBtn) {
            setCategory(initialCat, targetBtn);
          } else {
            renderProducts();
          }
        }`;

productsContent = productsContent.replace(/        if \(data\) \{\n          const products = JSON\.parse\(data\);\n          allProducts = Object\.values\(products\)\.sort\(\(a,b\) => \(a\.price \|\| 0\) - \(b\.price \|\| 0\)\);\n          renderProducts\(\);\n        \}/, newInitLogic);

fs.writeFileSync('d:/webtram/products.html', productsContent, 'utf8');
console.log('Updated index and products HTML');
