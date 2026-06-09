const fs = require('fs');

let content = fs.readFileSync('d:/webtram/index.html', 'utf8');

const target = `<div class="notice">
        <figure>
          <figcaption style="font-weight:800;color:var(--navy);text-transform:uppercase;letter-spacing:.5px;margin:0 0 10px">Thông báo mới nhất</figcaption>
          <img src="540969295_122278309496024728_7286110682791047457_n.jpg" alt="Thông báo mới" loading="lazy" decoding="async">
        </figure>
      </div>`;

const replacement = `<div class="notice" style="display:flex; flex-direction:column; align-items:center;">
        <figcaption style="font-weight:800;color:var(--navy);text-transform:uppercase;letter-spacing:.5px;margin:0 0 10px;align-self:flex-start;">Thông báo mới nhất</figcaption>
        <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:var(--shadow); width:100%; max-width:340px;">
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTramchanhDaLat&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="100%" height="500" style="border:none;overflow:hidden; display:block;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      </div>`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    fs.writeFileSync('d:/webtram/index.html', normalizedContent.replace(normalizedTarget, replacement), 'utf8');
    console.log('Successfully replaced notice with FB iframe');
} else {
    console.log('Target block not found');
}
