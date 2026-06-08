const fs = require('fs');

const files = [
  { path: 'd:/webtram/index.html', activeHref: '#gt-ve-tram', activeDrawerHref: 'index.html#gt-ve-tram' },
  { path: 'd:/webtram/products.html', activeHref: 'products.html', activeDrawerHref: 'products.html' },
  { path: 'd:/webtram/thoiGianMoCua.html', activeHref: 'thoiGianMoCua.html', activeDrawerHref: 'thoiGianMoCua.html' },
  { path: 'd:/webtram/lienHe.html', activeHref: 'lienHe.html', activeDrawerHref: 'lienHe.html' }
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf8');

  // Clear all desktop active classes
  content = content.replace(/class="active"/g, '');
  content = content.replace(/class=" active"/g, '');
  content = content.replace(/class="active "/g, '');
  
  // Set the correct desktop active class
  const desktopRegex = new RegExp('href="' + f.activeHref.replace('#', '\\\\#') + '"');
  content = content.replace(desktopRegex, 'class="active" href="' + f.activeHref + '"');

  // Clear all drawer active classes (they look like class="drawer-item active")
  content = content.replace(/class="drawer-item active"/g, 'class="drawer-item"');
  
  // Set the correct drawer active class
  const drawerRegex = new RegExp('class="drawer-item" href="' + f.activeDrawerHref.replace('#', '\\\\#') + '"');
  content = content.replace(drawerRegex, 'class="drawer-item active" href="' + f.activeDrawerHref + '"');

  fs.writeFileSync(f.path, content, 'utf8');
});
console.log('Fixed active navigation states');
