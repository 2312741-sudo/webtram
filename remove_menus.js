const fs = require('fs');

const filesToUpdate = [
  'd:/webtram/index.html',
  'd:/webtram/lienHe.html',
  'd:/webtram/products.html',
  'd:/webtram/thoiGianMoCua.html'
];

filesToUpdate.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Remove the 3 menu links from desktop nav
  content = content.replace(/<li><a href="menuTramChanh\.html">.*?<\/a><\/li>\n?\s*/g, '');
  content = content.replace(/<li><a href="menuTramSua\.html">.*?<\/a><\/li>\n?\s*/g, '');
  content = content.replace(/<li><a href="menuTramBanh\.html">.*?<\/a><\/li>\n?\s*/g, '');

  // Remove the 3 menu links from mobile drawer nav
  content = content.replace(/<li><a class="drawer-item" href="menuTramChanh\.html">.*?<\/a><\/li>\n?\s*/g, '');
  content = content.replace(/<li><a class="drawer-item" href="menuTramSua\.html">.*?<\/a><\/li>\n?\s*/g, '');
  content = content.replace(/<li><a class="drawer-item" href="menuTramBanh\.html">.*?<\/a><\/li>\n?\s*/g, '');

  if (f.endsWith('products.html')) {
    // Add AOS scripts and CSS
    if (!content.includes('aos.css')) {
      content = content.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>');
    }
    if (!content.includes('aos.js')) {
      content = content.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({ duration: 800, once: true, offset: 100 });</script>\n</body>');
    }

    // Add AOS to subcat-group and product-card
    content = content.replace(/className = 'subcat-group';/g, "className = 'subcat-group';\n         groupDiv.setAttribute('data-aos', 'fade-up');");
    content = content.replace(/card.className = 'product-card';/g, "card.className = 'product-card';\n            card.setAttribute('data-aos', 'fade-up');\n            card.setAttribute('data-aos-delay', '100');");
  }

  fs.writeFileSync(f, content, 'utf8');
});
console.log('Updated HTML files');
