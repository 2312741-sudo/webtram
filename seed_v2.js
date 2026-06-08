const https = require('https');

const DB_URL = 'tramapp-65493-default-rtdb.asia-southeast1.firebasedatabase.app';

const categories = [
  { name: 'Trạm Chanh' },
  { name: 'Trạm Sữa' },
  { name: 'Trạm Bánh' }
];

const productsData = [
  // Trạm Chanh
  { name: 'Trà Olong - Chanh tươi', category: 'Trạm Chanh, Trạm Sữa', subCategory: 'Trà Olong Trái Cây', img: 'trachanh.png', price: 20000 },
  { name: 'Trà Olong - Xoài', category: 'Trạm Chanh, Trạm Sữa', subCategory: 'Trà Olong Trái Cây', img: 'traxoai.png', price: 30000 },
  { name: 'Trà Olong - Chanh dây', category: 'Trạm Chanh', subCategory: 'Trà Olong Trái Cây', img: 'trachanhday.png', price: 30000 },
  { name: 'Trà Olong - Quả mọng', category: 'Trạm Chanh', subCategory: 'Trà Olong Trái Cây', img: 'traquamong.png', price: 30000 },
  { name: 'Trà Olong - Mãng cầu', category: 'Trạm Chanh, Trạm Sữa', subCategory: 'Trà Olong Trái Cây', img: 'tramangcau.png', price: 30000 },
  { name: 'Trà Olong - Đào', category: 'Trạm Chanh', subCategory: 'Trà Olong Trái Cây', img: 'tradao.png', price: 30000 },
  { name: 'Thêm thạch dừa / thạch chanh', category: 'Trạm Chanh', subCategory: 'Trà Olong Trái Cây', img: 'thach.png', price: 5000 },
  
  { name: 'Lăn Truyền Thống', category: 'Trạm Chanh', subCategory: 'Bánh Lăn Nướng', img: 'banhlanlon.png', price: 20000, multiPrice: '20k - 30k' },
  { name: 'Lăn Phô Mai Chảy', category: 'Trạm Chanh', subCategory: 'Bánh Lăn Nướng', img: 'banhlanvua.png', price: 15000, multiPrice: 'Từ 15k' },
  { name: 'Lăn Choco Chip', category: 'Trạm Chanh', subCategory: 'Bánh Lăn Nướng', img: 'banhlannho.png', price: 15000, multiPrice: 'Từ 15k' },
  { name: 'Lăn Cốm dẻo', category: 'Trạm Chanh', subCategory: 'Bánh Lăn Nướng', img: 'banhlanlon.png', price: 15000, multiPrice: 'Từ 15k' },

  // Trạm Sữa
  { name: 'Sữa bò tươi - Đậu nành hạt điều', category: 'Trạm Sữa', subCategory: 'Sữa Hạt Tươi', img: 'suadaunanhhanhnhan.png', price: 18000 },
  { name: 'Sữa bò tươi - Bí đỏ Đậu phộng', category: 'Trạm Sữa', subCategory: 'Sữa Hạt Tươi', img: 'suabido.png', price: 18000 },
  { name: 'Sữa bò tươi - Cốm rang', category: 'Trạm Sữa', subCategory: 'Sữa Hạt Tươi', img: 'suacomrang.png', price: 25000 },
  { name: 'Sữa bò tươi - Bắp non', category: 'Trạm Sữa', subCategory: 'Sữa Hạt Tươi', img: 'suabapnon.png', price: 18000 },
  
  { name: 'Trà sữa tươi - Olong matcha', category: 'Trạm Sữa', subCategory: 'Trà Sữa Tươi', img: 'tsmatcha.png', price: 30000 },
  { name: 'Trà sữa tươi - Olong gạo rang', category: 'Trạm Sữa', subCategory: 'Trà Sữa Tươi', img: 'tsgaorang.png', price: 35000 },

  { name: 'Tam giác - nhân sữa', category: 'Trạm Sữa', subCategory: 'Bánh Tam Giác Nướng', img: 'banhtamgiac.png', price: 20000 },
  { name: 'Tam giác - nhân phô mai', category: 'Trạm Sữa', subCategory: 'Bánh Tam Giác Nướng', img: 'banhtamgiac.png', price: 20000 },
  { name: 'Tam giác - nhân trứng muối', category: 'Trạm Sữa', subCategory: 'Bánh Tam Giác Nướng', img: 'banhtamgiac.png', price: 20000 },

  // Trạm Bánh
  { name: 'Bánh tart trứng', category: 'Trạm Bánh', subCategory: 'Bánh Tart', img: 'tarttrung.png', price: 18000 },
  { name: 'Bánh tart chuối choco', category: 'Trạm Bánh', subCategory: 'Bánh Tart', img: 'tartchuoichoco.png', price: 20000 },

  { name: 'Cà phê đen', category: 'Trạm Bánh', subCategory: 'Cafe Việt Nam', img: 'cfden.png', price: 18000 },
  { name: 'Cà phê sữa', category: 'Trạm Bánh', subCategory: 'Cafe Việt Nam', img: 'cfsua.png', price: 20000 },
  { name: 'Bạc xỉu', category: 'Trạm Bánh', subCategory: 'Cafe Việt Nam', img: 'bacxiu.png', price: 25000 },
  { name: 'Cà phê kem trứng', category: 'Trạm Bánh', subCategory: 'Cafe Việt Nam', img: 'cfkemtrung.png', price: 30000 },

  { name: 'Bơ coco', category: 'Trạm Bánh', subCategory: 'Đặc Biệt', img: 'bococo.png', price: 35000 },

  { name: 'Waffle bơ cay chà bông', category: 'Trạm Bánh', subCategory: 'Bánh Waffle', img: 'banhwafflebocaychabong.png', price: 25000 },
  { name: 'Waffle cốm dẻo', category: 'Trạm Bánh', subCategory: 'Bánh Waffle', img: 'banhwafflecomdeo.png', price: 25000 },
  { name: 'Waffle kem choco', category: 'Trạm Bánh', subCategory: 'Bánh Waffle', img: 'banhwafflekemchoco.png', price: 25000 }
];

const products = {};
productsData.forEach((p, idx) => {
  products['p' + idx] = {
    id: 'p' + idx,
    name: p.name,
    category: p.category,
    subCategory: p.subCategory,
    imageResourceName: p.img,
    price: p.price,
    unit: 'Ly/Phần',
    multiPrice: p.multiPrice || null
  };
});

function putData(path, data) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    const options = {
      hostname: DB_URL,
      path: path + '.json',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    };
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseBody));
        } else {
          reject(new Error('Failed ' + res.statusCode + ': ' + responseBody));
        }
      });
    });
    req.on('error', reject);
    req.write(dataString);
    req.end();
  });
}

async function run() {
  try {
    console.log('Seeding categories...');
    await putData('/categories', categories);
    console.log('Seeding products...');
    await putData('/products', products);
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Error during seed:', err);
  }
}

run();
