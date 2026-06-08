const fs = require('fs');

const files = [
  'd:/webtram/products.html',
  'd:/webtram/menuTramChanh.html',
  'd:/webtram/menuTramSua.html',
  'd:/webtram/menuTramBanh.html'
];

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

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  const regex = /const renderProducts = \(\) => \{[\s\S]*?(?=const closeModal = \(\) => \{)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newRenderLogic);
    content = content.replace(/id="product-grid"/, 'id="product-grid" style="display:block;"');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated ' + f);
  } else {
    console.log('Could not find replace target in ' + f);
  }
});
