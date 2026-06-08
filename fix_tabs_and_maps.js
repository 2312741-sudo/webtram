const fs = require('fs');

// 1. Fix Tab Switching Visuals in products.html
let productsContent = fs.readFileSync('d:/webtram/products.html', 'utf8');
const targetJS = `      renderFilters(categories);
      renderProducts();
    }).catch((error) => {`;

const replacementJS = `      renderFilters(categories);
      updateFilterStyles();
      renderProducts();
    }).catch((error) => {`;

// Standardize line endings
let normalizedContent = productsContent.replace(/\r\n/g, '\n');
let normalizedTarget = targetJS.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    normalizedContent = normalizedContent.replace(normalizedTarget, replacementJS);
}

// 2. Fix Trạm Bánh Map Pin
const tramBanhTarget = 'q=46+Yersin,+Đà+Lạt';
const tramBanhReplacement = 'q=11.9401785,108.4513255';
normalizedContent = normalizedContent.replace(tramBanhTarget, tramBanhReplacement);

fs.writeFileSync('d:/webtram/products.html', normalizedContent, 'utf8');

// Also fix Trạm Bánh Map in index.html
let indexContent = fs.readFileSync('d:/webtram/index.html', 'utf8');
indexContent = indexContent.replace(tramBanhTarget, tramBanhReplacement);

// Wait! What about the category cards in index.html?
// Did the user click the "Xem Menu ->" button on the category cards?
// Currently those link to `products.html` with NO query params.
// Let's fix them too just in case!
const cardsTargetChanh = '<a href="products.html" class="btn btn-primary" style="margin-top:auto">Xem Menu &rarr;</a>';
// Actually, earlier grep_search didn't find this exact string.
// The grep_search output for `href="products.html"` was:
// 197: <li><a href="products.html">Sản phẩm</a></li>
// 213: <li><a class="drawer-item" href="products.html"><span class="ico">🧺</span> Sản phẩm</a></li>
// 270: <p style="margin-top:24px"><a href="products.html" style="font-weight:700;color:var(--maroon-d);text-decoration:underline;">Khám phá toàn bộ sản phẩm →</a></p>
// 
// So the category cards do NOT have `href="products.html"`. Wait!
// Did I miss something? The `grep_search` found ONLY those 3 occurrences!
// This means the `.category-card` elements in `index.html` were deleted or replaced?
// Wait, I ran a `cat` command earlier on `index.html` lines 225-260:
/*
      <div class="notice">
        <figure>
          ...
          <img src="..." alt="ThA'ng bAo m>i" ...>
        </figure>
      </div>
    </div>
  </section>

  <main class="container">
    <section id="gt-ve-tram" data-aos="fade-up" class="section-card intro">
      <h3 class="section-title">Gi>i thiu v? Trm</h3>
*/
// The `<section class="categories">` is completely GONE from `index.html`!
// Ah! It must have been removed in a previous session when I "xóa 3 trang này luôn".
// Okay, so the user IS clicking the `.badge` links at the top!
// Which means the ONLY issue was the `updateFilterStyles()` missing.

fs.writeFileSync('d:/webtram/index.html', indexContent, 'utf8');
console.log('Fixed tabs and maps');
