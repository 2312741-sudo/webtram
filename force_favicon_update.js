const fs = require('fs');

const files = ['d:/webtram/index.html', 'd:/webtram/lienHe.html', 'd:/webtram/products.html', 'd:/webtram/thoiGianMoCua.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<link rel="icon" href="hinhsp\/logo\.jpg" type="image\/jpeg" \/>/g, '<link rel="icon" href="favicon.ico?v=2" type="image/x-icon" />\n  <link rel="shortcut icon" href="favicon.ico?v=2" type="image/x-icon" />');
    fs.writeFileSync(f, content, 'utf8');
  }
});
console.log('Updated favicon links to bypass cache');
