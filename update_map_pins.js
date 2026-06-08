const fs = require('fs');

const files = ['d:/webtram/index.html', 'd:/webtram/products.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  content = content.replace(/q=09\+Hải\+Thượng,\+Đà\+Lạt/g, 'q=11.9421901,108.4312284');
  content = content.replace(/q=44\+Yersin,\+Đà\+Lạt/g, 'q=11.9401785,108.4513255');

  fs.writeFileSync(f, content, 'utf8');
});
console.log('Updated map pins');
