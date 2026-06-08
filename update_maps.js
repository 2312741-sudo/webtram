const fs = require('fs');

const files = ['d:/webtram/index.html', 'd:/webtram/products.html'];

const newMapsHTML = `            <iframe src="https://maps.google.com/maps?q=09+Hải+Thượng,+Đà+Lạt&t=&z=16&ie=UTF8&iwloc=&output=embed" allowfullscreen loading="lazy" title="Trạm Chanh"></iframe>
            <iframe src="https://maps.google.com/maps?q=44+Yersin,+Đà+Lạt&t=&z=16&ie=UTF8&iwloc=&output=embed" allowfullscreen loading="lazy" title="Trạm Sữa"></iframe>
            <iframe src="https://maps.google.com/maps?q=46+Yersin,+Đà+Lạt&t=&z=16&ie=UTF8&iwloc=&output=embed" allowfullscreen loading="lazy" title="Trạm Bánh"></iframe>`;

const oldMapsRegex = /<iframe src="https:\/\/maps\.app\.goo\.gl\/mp5EodZBvcKLMJpr5"[\s\S]*?<iframe src="https:\/\/maps\.app\.goo\.gl\/pxAqwYU1uhAjr6fr9"[^>]*><\/iframe>/;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Replace map HTML
  content = content.replace(oldMapsRegex, newMapsHTML);

  // Add CSS for 3rd map to span full width and reduce map height to 200px
  content = content.replace(/\.map-grid iframe\{width:100%;height:280px;/, '.map-grid iframe{width:100%;height:200px;');
  content = content.replace(/\.map-grid iframe\{height:260px\}/, '.map-grid iframe{height:200px}');
  
  if (!content.includes('.map-grid iframe:nth-child(3)')) {
     content = content.replace(/\.map-grid\{display:grid;gap:18px;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/, '.map-grid{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr))}\n    .map-grid iframe:nth-child(3){grid-column:1/-1}');
  }

  fs.writeFileSync(f, content, 'utf8');
});
console.log('Updated maps');
