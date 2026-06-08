const fs = require('fs');
let html = fs.readFileSync('d:/webtram/index.html', 'utf8');

// Add AOS CSS before </head>
if (!html.includes('aos.css')) {
  html = html.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>');
}

// Add AOS JS before </body>
if (!html.includes('aos.js')) {
  html = html.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({ duration: 800, once: true, offset: 100 });</script>\n</body>');
}

// Add data-aos attributes to main sections
html = html.replace(/<section id="gt-ve-tram"/, '<section id="gt-ve-tram" data-aos="fade-up"');
html = html.replace(/<section id="danh-muc-san-pham"/, '<section id="danh-muc-san-pham" data-aos="fade-up"');
html = html.replace(/<div class="category-card/g, '<div class="category-card" data-aos="fade-up" data-aos-delay="100"');
html = html.replace(/<div class="hero-content"/, '<div class="hero-content" data-aos="fade-up"');
html = html.replace(/<div class="section-card/g, '<div class="section-card" data-aos="fade-up"');
html = html.replace(/<footer>/, '<footer data-aos="fade-up">');

fs.writeFileSync('d:/webtram/index.html', html, 'utf8');
console.log('Added AOS animations to index.html');
