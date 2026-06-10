const fs = require('fs');

const files = ['d:/webtram/index.html', 'd:/webtram/lienHe.html', 'd:/webtram/products.html', 'd:/webtram/thoiGianMoCua.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<link rel="icon" href="favicon\.ico" type="image\/x-icon" \/>/g, '<link rel="icon" href="hinhsp/logo.jpg" type="image/jpeg" />');
    fs.writeFileSync(f, content, 'utf8');
  }
});
console.log('Updated favicon in all HTML files');
