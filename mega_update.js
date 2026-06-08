const fs = require('fs');

const fixEncodingAndApplyFeatures = () => {
  const htmlFiles = [
    'd:/webtram/index.html',
    'd:/webtram/lienHe.html',
    'd:/webtram/menuTramBanh.html',
    'd:/webtram/menuTramChanh.html',
    'd:/webtram/menuTramSua.html',
    'd:/webtram/products.html',
    'd:/webtram/thoiGianMoCua.html'
  ];

  const oldNavCSSRegex = /\.nav-inline ul\{list-style:none;display:flex;gap:10px;margin:0;padding:0\}[\s\S]*?\.nav-inline a\.active\{background:var\(--mustard\);color:#2D2A4A\}/;
  const newNavCSS = `.nav-inline ul{list-style:none;display:flex;gap:24px;margin:0;padding:0;flex-wrap:wrap;justify-content:flex-end}
    .nav-inline a{position:relative;display:inline-flex;align-items:center;padding:8px 0;font-weight:800;font-size:16px;color:var(--navy);border:none;background:transparent;box-shadow:none;transition:color .2s ease;text-decoration:none;letter-spacing:0.5px}
    .nav-inline a::after{content:'';position:absolute;bottom:-2px;left:0;width:0%;height:3px;background:var(--maroon);border-radius:2px;transition:width .3s ease}
    .nav-inline a:hover{color:var(--maroon-d);background:transparent;transform:none;box-shadow:none}
    .nav-inline a:hover::after, .nav-inline a.active::after{width:100%}
    .nav-inline a.active{color:var(--maroon-d);background:transparent;box-shadow:none;transform:none}`;

  const renderProductsRegex = /const renderProducts = \(\) => \{[\s\S]*?(?=const closeModal = \(\) => \{)/;
  const newRenderLogic = `
    const renderProducts = () => {
      gridEl.innerHTML = '';
      
      const filtered = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category && p.category.includes(currentCategory));

      if (filtered.length === 0) {
        gridEl.innerHTML = '<div class="no-products">Không tìm thấy sản phẩm nào!</div>';
        return;
      }

      const groups = {};
      filtered.forEach(p => {
         const sub = p.subCategory || 'Khác';
         if(!groups[sub]) groups[sub] = [];
         groups[sub].push(p);
      });

      for (const sub in groups) {
         const groupDiv = document.createElement('div');
         groupDiv.className = 'subcat-group';
         groupDiv.style.gridColumn = '1 / -1';
         groupDiv.style.marginTop = '16px';
         
         const title = document.createElement('h3');
         title.style.fontSize = '24px';
         title.style.color = 'var(--navy)';
         title.style.borderBottom = '2px dashed var(--navy)';
         title.style.paddingBottom = '8px';
         title.style.marginBottom = '20px';
         title.style.fontFamily = "'Merriweather', serif";
         title.textContent = sub;
         groupDiv.appendChild(title);
         
         const subGrid = document.createElement('div');
         subGrid.className = 'product-grid subcat-grid';
         subGrid.style.display = 'grid';
         subGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(260px, 1fr))';
         subGrid.style.gap = '24px';
         subGrid.style.marginBottom = '40px';
         
         groups[sub].forEach(product => {
            let imgSrc = 'https://via.placeholder.com/300x200?text=Trạm';
            if (product.imageBase64 && product.imageBase64.trim() !== '') {
              imgSrc = \`data:image/png;base64,\${product.imageBase64}\`;
            } else {
              const fileName = product.imageResourceName && product.imageResourceName.trim() !== '' 
                ? product.imageResourceName 
                : \`\${normalizeName(product.name)}.png\`;
              const finalFileName = fileName.match(/\\.(png|jpe?g|gif)$/i) ? fileName : \`\${fileName}.png\`;
              imgSrc = \`hinhsp/\${finalFileName}\`;
            }
            
            let priceStr = product.multiPrice ? product.multiPrice : formatPrice(product.price);

            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';
            card.innerHTML = \`
              <img src="\${imgSrc}" alt="\${product.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Trạm';">
              <div class="product-info">
                <div class="product-cat">\${product.category || 'Trạm'}</div>
                <h3 class="product-name">\${product.name}</h3>
                <div class="product-price">\${priceStr}</div>
              </div>
            \`;
            card.onclick = () => showModal(product, imgSrc, priceStr);
            subGrid.appendChild(card);
         });
         
         groupDiv.appendChild(subGrid);
         gridEl.appendChild(groupDiv);
      }
    };

    // Modal Logic
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    
    const showModal = (product, imgSrc, priceStr) => {
      document.getElementById('modal-img').src = imgSrc;
      document.getElementById('modal-cat').textContent = product.category || 'Trạm';
      document.getElementById('modal-name').textContent = product.name;
      document.getElementById('modal-price').textContent = priceStr || formatPrice(product.price);
      
      const descEl = document.getElementById('modal-desc');
      if (product.note && product.note.trim() !== '') {
        descEl.textContent = product.note;
        descEl.style.display = 'block';
      } else {
        descEl.textContent = 'Món này vô cùng thơm ngon và được chuẩn bị từ nguyên liệu tươi sạch của Trạm. Mời bạn thưởng thức!';
        descEl.style.display = 'block';
      }
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
`;

  htmlFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // 1. Fix mangled literal variables from PowerShell
    content = content.replace(/let currentCategory = 'Tr\?m Chanh';/g, "let currentCategory = 'Trạm Chanh';");
    content = content.replace(/let currentCategory = 'Tr\?m S\?a';/g, "let currentCategory = 'Trạm Sữa';");
    content = content.replace(/let currentCategory = 'Tr\?m Bnh';/g, "let currentCategory = 'Trạm Bánh';");
    content = content.replace(/Tr\?m/g, "Trạm"); // Fallback for other mangled "Trạm"
    content = content.replace(/T\?t c\?/g, "Tất cả");

    // 2. Apply Nav CSS redesign
    if (oldNavCSSRegex.test(content)) {
      content = content.replace(oldNavCSSRegex, newNavCSS);
    } else {
      // Loose replacement
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
              content = content.replace(toReplace, newNavCSS);
          }
      }
    }

    // 3. Apply Subcategories renderProducts
    if (renderProductsRegex.test(content)) {
      content = content.replace(renderProductsRegex, newRenderLogic);
      content = content.replace(/id="product-grid"/, 'id="product-grid" style="display:block;"');
    }

    // 4. Apply AOS for index.html only
    if (f.endsWith('index.html')) {
      if (!content.includes('aos.css')) {
        content = content.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>');
      }
      if (!content.includes('aos.js')) {
        content = content.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({ duration: 800, once: true, offset: 100 });</script>\n</body>');
      }
      content = content.replace(/<section id="gt-ve-tram"/, '<section id="gt-ve-tram" data-aos="fade-up"');
      content = content.replace(/<section id="danh-muc-san-pham"/, '<section id="danh-muc-san-pham" data-aos="fade-up"');
      content = content.replace(/<div class="category-card"/g, '<div class="category-card" data-aos="fade-up" data-aos-delay="100"');
      content = content.replace(/<div class="hero-content"/, '<div class="hero-content" data-aos="fade-up"');
      content = content.replace(/<div class="section-card"/g, '<div class="section-card" data-aos="fade-up"');
      content = content.replace(/<footer>/, '<footer data-aos="fade-up">');
    }

    fs.writeFileSync(f, content, 'utf8');
    console.log('Processed', f);
  });
};

fixEncodingAndApplyFeatures();
