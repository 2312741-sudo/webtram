const fs = require('fs');

let content = fs.readFileSync('d:/webtram/products.html', 'utf8');

const newShowModal = `    const showModal = (product, imgSrc, priceStr) => {
      document.getElementById('modal-img').src = imgSrc;
      document.getElementById('modal-cat').textContent = product.category || 'Trạm';
      document.getElementById('modal-name').textContent = product.name;
      document.getElementById('modal-price').textContent = priceStr || formatPrice(product.price);
      
      const descEl = document.getElementById('modal-desc');
      
      if (product.subCategory === 'Bánh Lăn Nướng') {
        let priceNho, priceVua, priceLon;
        if (product.name === 'Lăn Truyền Thống') {
           priceNho = '20k';
           priceVua = '25k';
           priceLon = '30k';
        } else {
           priceNho = '15k';
           priceVua = '30k';
           priceLon = '50k';
        }
        
        descEl.innerHTML = \`
          <div style="display:flex; justify-content:space-between; gap:10px; margin-top:20px; text-align:center;">
             <div style="flex:1;">
               <img src="hinhsp/banhlannho.png" style="width:100%; border-radius:12px; border:2px solid var(--navy); margin-bottom:8px; aspect-ratio: 1; object-fit: cover;">
               <div style="font-weight:700; color:var(--navy); font-size:14px;">Size Nhỏ</div>
               <div style="color:var(--maroon); font-weight:800;">\${priceNho}</div>
             </div>
             <div style="flex:1;">
               <img src="hinhsp/banhlanvua.png" style="width:100%; border-radius:12px; border:2px solid var(--navy); margin-bottom:8px; aspect-ratio: 1; object-fit: cover;">
               <div style="font-weight:700; color:var(--navy); font-size:14px;">Size Vừa</div>
               <div style="color:var(--maroon); font-weight:800;">\${priceVua}</div>
             </div>
             <div style="flex:1;">
               <img src="hinhsp/banhlanlon.png" style="width:100%; border-radius:12px; border:2px solid var(--navy); margin-bottom:8px; aspect-ratio: 1; object-fit: cover;">
               <div style="font-weight:700; color:var(--navy); font-size:14px;">Size Lớn</div>
               <div style="color:var(--maroon); font-weight:800;">\${priceLon}</div>
             </div>
          </div>
          <div style="margin-top:16px;">Món bánh nướng béo ngậy vô cùng thơm ngon và được chuẩn bị từ nguyên liệu tươi sạch của Trạm. Mời bạn thưởng thức!</div>
        \`;
        descEl.style.display = 'block';
      } else {
        if (product.note && product.note.trim() !== '') {
          descEl.textContent = product.note;
          descEl.style.display = 'block';
        } else {
          descEl.textContent = 'Món này vô cùng thơm ngon và được chuẩn bị từ nguyên liệu tươi sạch của Trạm. Mời bạn thưởng thức!';
          descEl.style.display = 'block';
        }
      }
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };`;

const regex = /const showModal = \([\s\S]*?document\.body\.style\.overflow = 'hidden';\n    };/;
content = content.replace(regex, newShowModal);

fs.writeFileSync('d:/webtram/products.html', content, 'utf8');
console.log('Updated showModal in products.html');
