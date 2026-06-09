const fs = require('fs');

const files = ['d:/webtram/index.html', 'd:/webtram/products.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Replace CSS
  const oldCSSRegex = /\.to-top\{position:fixed;right:16px;bottom:16px;z-index:60;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;border:2px solid var\(--navy\);background:#fff7e6;color:#2D2A4A;box-shadow:var\(--shadow\)\}/;
  const newCSS = '.to-top{position:fixed;right:16px;bottom:16px;z-index:60;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;border:2px solid var(--navy);background:#fff7e6;color:#2D2A4A;box-shadow:var(--shadow);opacity:0;pointer-events:none;transition:opacity 0.3s;cursor:pointer}\n    .to-top.show{opacity:1;pointer-events:auto}';
  content = content.replace(oldCSSRegex, newCSS);

  // Replace HTML tag
  const oldTag = '<a class="to-top" href="#top" aria-label="Lên đầu trang">⬆️</a>';
  const newTag = '<button class="to-top" aria-label="Lên đầu trang" onclick="window.scrollTo({top:0, behavior:\'smooth\'})">⬆️</button>';
  content = content.replace(oldTag, newTag);

  // Add JS logic before </body>
  const jsLogic = `  <script>
    const toTopBtn = document.querySelector('.to-top');
    if (toTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          toTopBtn.classList.add('show');
        } else {
          toTopBtn.classList.remove('show');
        }
      });
    }
  </script>
</body>`;
  if (!content.includes('toTopBtn.classList.add(\'show\')')) {
    content = content.replace(/<\/body>/, jsLogic);
  }

  fs.writeFileSync(f, content, 'utf8');
});
console.log('Updated to-top button');
