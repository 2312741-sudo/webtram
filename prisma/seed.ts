import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoriesData = [
  { name: "Trạm Chanh", slug: "tram-chanh", order: 1 },
  { name: "Trạm Sữa", slug: "tram-sua", order: 2 },
  { name: "Trạm Bánh", slug: "tram-banh", order: 3 },
];

const productsData = [
  // Trạm Chanh
  {
    name: "Trà Olong - Chanh tươi",
    categoryName: "Trạm Chanh, Trạm Sữa",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/trachanh.png",
    price: 20000,
    isFeatured: true,
    description: "Trà Olong cao cấp kết hợp vị chua thanh mát của chanh tươi tự nhiên.",
  },
  {
    name: "Trà Olong - Xoài",
    categoryName: "Trạm Chanh, Trạm Sữa",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/traxoai.png",
    price: 30000,
    isFeatured: true,
    description: "Thơm ngọt vị xoài chín nhiệt đới quyện cùng nền trà Olong đậm đà.",
  },
  {
    name: "Trà Olong - Chanh dây",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/trachanhday.png",
    price: 30000,
    isFeatured: false,
    description: "Vị chanh dây đậm đà bừng tỉnh mọi giác quan.",
  },
  {
    name: "Trà Olong - Quả mọng",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/traquamong.png",
    price: 30000,
    isFeatured: true,
    description: "Sự kết hợp giữa dâu tây và quả mọng đỏ ngọt thanh giải nhiệt tuyệt đối.",
  },
  {
    name: "Trà Olong - Mãng cầu",
    categoryName: "Trạm Chanh, Trạm Sữa",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/tramangcau.png",
    price: 30000,
    isFeatured: false,
    description: "Mãng cầu xiêm tươi dầm kết hợp trà Olong thanh tao.",
  },
  {
    name: "Trà Olong - Đào",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Trà Olong Trái Cây",
    image: "/images/products/tradao.png",
    price: 30000,
    isFeatured: false,
    description: "Trà đào thơm nức giòn ngọt thanh mát.",
  },
  {
    name: "Thêm thạch dừa / thạch chanh",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Topping Thêm",
    image: "/images/products/thach.png",
    price: 5000,
    isFeatured: false,
    description: "Topping giòn sần sật ăn kèm trà cực đã.",
  },
  {
    name: "Lăn Truyền Thống",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Bánh Lăn Nướng",
    image: "/images/products/banhlanlon.png",
    price: 20000,
    multiPrice: "20k - 30k",
    isFeatured: true,
    description: "Bánh lăn nướng vỏ giòn thơm bùi mùi bơ sữa trứng.",
  },
  {
    name: "Lăn Phô Mai Chảy",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Bánh Lăn Nướng",
    image: "/images/products/banhlanvua.png",
    price: 15000,
    multiPrice: "Từ 15k",
    isFeatured: true,
    description: "Nhân phô mai béo ngậy tan chảy kích thích vị giác.",
  },
  {
    name: "Lăn Choco Chip",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Bánh Lăn Nướng",
    image: "/images/products/banhlannho.png",
    price: 15000,
    multiPrice: "Từ 15k",
    isFeatured: false,
    description: "Vỏ thơm hạt choco ngọt ngào quyến rũ.",
  },
  {
    name: "Lăn Cốm dẻo",
    categoryName: "Trạm Chanh",
    categorySlug: "tram-chanh",
    subCategory: "Bánh Lăn Nướng",
    image: "/images/products/banhlanlon.png",
    price: 15000,
    multiPrice: "Từ 15k",
    isFeatured: false,
    description: "Hương cốm non thơm dịu dẻo thơm truyền thống.",
  },

  // Trạm Sữa
  {
    name: "Sữa bò tươi - Đậu nành hạt điều",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Sữa Hạt Tươi",
    image: "/images/products/suadaunanhhanhnhan.png",
    price: 18000,
    isFeatured: true,
    description: "Sữa bò tươi nguyên chất nấu cùng đậu nành hữu cơ và hạt điều giàu dinh dưỡng.",
  },
  {
    name: "Sữa bò tươi - Bí đỏ Đậu phộng",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Sữa Hạt Tươi",
    image: "/images/products/suabido.png",
    price: 18000,
    isFeatured: false,
    description: "Ngọt sánh tự nhiên từ bí đỏ và béo thơm từ đậu phộng rang.",
  },
  {
    name: "Sữa bò tươi - Cốm rang",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Sữa Hạt Tươi",
    image: "/images/products/suacomrang.png",
    price: 25000,
    isFeatured: true,
    description: "Đặc sản sữa cốm rang thơm nồng nàn mùa thu.",
  },
  {
    name: "Trà sữa tươi - Olong matcha",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Trà Sữa Tươi",
    image: "/images/products/tsmatcha.png",
    price: 30000,
    isFeatured: true,
    description: "Matcha Nhật Bản cao cấp hòa quyện trà sữa tươi thanh ngọt.",
  },
  {
    name: "Trà sữa tươi - Olong gạo rang",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Trà Sữa Tươi",
    image: "/images/products/tsgaorang.png",
    price: 35000,
    isFeatured: true,
    description: "Vị trà gạo rang thơm lừng chuẩn vị trà sữa hiện đại.",
  },
  {
    name: "Tam giác - nhân sữa",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Bánh Tam Giác Nướng",
    image: "/images/products/banhtamgiac.png",
    price: 20000,
    isFeatured: false,
    description: "Bánh nướng hình tam giác thơm lừng nhân sữa béo ngậy.",
  },
  {
    name: "Tam giác - nhân phô mai",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Bánh Tam Giác Nướng",
    image: "/images/products/banhtamgiac.png",
    price: 20000,
    isFeatured: false,
    description: "Nhân phô mai mặn ngọt béo thơm hấp dẫn.",
  },
  {
    name: "Tam giác - nhân trứng muối",
    categoryName: "Trạm Sữa",
    categorySlug: "tram-sua",
    subCategory: "Bánh Tam Giác Nướng",
    image: "/images/products/banhtamgiac.png",
    price: 20000,
    isFeatured: true,
    description: "Trứng muối bùi béo kết hợp vỏ bánh giòn tan nóng hổi.",
  },

  // Trạm Bánh
  {
    name: "Bánh tart trứng",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Bánh Tart",
    image: "/images/products/tarttrung.png",
    price: 18000,
    isFeatured: true,
    description: "Bánh tart ngàn lớp giòn rụm, nhân trứng nướng béo mịn.",
  },
  {
    name: "Bánh tart chuối choco",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Bánh Tart",
    image: "/images/products/tartchuoichoco.png",
    price: 20000,
    isFeatured: false,
    description: "Sự kết hợp hoàn hảo giữa chuối chín thơm và socola ngọt dịu.",
  },
  {
    name: "Cà phê đen",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Cafe Việt Nam",
    image: "/images/products/cfden.png",
    price: 18000,
    isFeatured: false,
    description: "Cà phê Robusta Đắk Lắk nguyên chất thơm đậm đà.",
  },
  {
    name: "Cà phê sữa",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Cafe Việt Nam",
    image: "/images/products/cfsua.png",
    price: 20000,
    isFeatured: true,
    description: "Cà phê sữa pha phin truyền thống thơm ngọt béo ngậy.",
  },
  {
    name: "Bạc xỉu",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Cafe Việt Nam",
    image: "/images/products/bacxiu.png",
    price: 25000,
    isFeatured: true,
    description: "Nhiều sữa ít cà phê, béo ngọt dịu nhẹ thích hợp mọi lứa tuổi.",
  },
  {
    name: "Cà phê kem trứng",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Cafe Việt Nam",
    image: "/images/products/cfkemtrung.png",
    price: 30000,
    isFeatured: true,
    description: "Lớp kem trứng bông xốp đánh đặc quyện cùng cà phê nóng nồng nàn.",
  },
  {
    name: "Bơ coco",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Đặc Biệt",
    image: "/images/products/bococo.png",
    price: 35000,
    isFeatured: true,
    description: "Bơ sáp Đà Lạt dầm nước cốt dừa béo thơm nức tiếng.",
  },
  {
    name: "Waffle bơ cay chà bông",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Bánh Waffle",
    image: "/images/products/banhwafflebocaychabong.png",
    price: 25000,
    isFeatured: false,
    description: "Waffle giòn rụm với bơ cay thơm cay kích thích và chà bông thơm lừng.",
  },
  {
    name: "Waffle cốm dẻo",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Bánh Waffle",
    image: "/images/products/banhwafflecomdeo.png",
    price: 25000,
    isFeatured: false,
    description: "Waffle kết hợp hạt cốm non dẻo mềm thơm phức.",
  },
  {
    name: "Waffle kem choco",
    categoryName: "Trạm Bánh",
    categorySlug: "tram-banh",
    subCategory: "Bánh Waffle",
    image: "/images/products/banhwafflekemchoco.png",
    price: 25000,
    isFeatured: true,
    description: "Waffle ấm nóng phủ kem socola béo ngậy ngọt ngào.",
  },
];

async function main() {
  console.log("Seeding Database for Trạm...");

  // Clear existing items
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  // Create Products
  for (const prod of productsData) {
    const categoryId = categoryMap.get(prod.categorySlug);
    await prisma.product.create({
      data: {
        name: prod.name,
        categoryName: prod.categoryName,
        subCategory: prod.subCategory,
        price: prod.price,
        multiPrice: prod.multiPrice || null,
        image: prod.image,
        description: prod.description,
        isFeatured: prod.isFeatured,
        categoryId: categoryId || null,
      },
    });
  }

  console.log(`Seeded ${categoriesData.length} categories and ${productsData.length} products successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
