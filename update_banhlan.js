const https = require('https');

const DB_URL = 'tramapp-65493-default-rtdb.asia-southeast1.firebasedatabase.app';

https.get(`https://${DB_URL}/products.json`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const products = JSON.parse(data);
    const updates = {};
    
    for (const [key, p] of Object.entries(products)) {
      if (p.subCategory === 'Bánh Lăn Nướng') {
        p.imageResourceName = 'banhlanvua.png';
        p.imageBase64 = ''; // Clear any base64 so it uses imageResourceName
        if (p.name === 'Lăn Truyền Thống') {
          p.multiPrice = '20k - 30k';
        } else {
          p.multiPrice = '15k - 50k';
        }
        updates[key] = p;
      }
    }

    const req = https.request({
      hostname: DB_URL,
      path: '/products.json',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      console.log('Firebase updated. Status:', res.statusCode);
    });
    
    req.write(JSON.stringify(updates));
    req.end();
  });
});
