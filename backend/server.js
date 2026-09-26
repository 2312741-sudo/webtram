require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Security & secrets
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "tramdalat2026";
const ADMIN_SECRET =
  process.env.ADMIN_SECRET || "tram_admin_secret_key_dalat_super_secure_2026";
const COOKIE_NAME = "tram_admin_session";

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".png";
    const cleanName = file.originalname
      .replace(/\.[^/.]+$/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 25);
    const unique = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    cb(null, `upload_${unique}_${cleanName || "img"}${ext.toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ hỗ trợ file hình ảnh (JPG, PNG, WEBP, GIF)"), false);
    }
  },
});

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use("/uploads", express.static(uploadsDir));

// HMAC token generator & verifier for admin auth
function createAdminToken(username) {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString("base64");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(base64Payload)
    .digest("hex");
  return `${base64Payload}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || !token.includes(".")) return { valid: false };
  try {
    const [base64Payload, signature] = token.split(".");
    const expected = crypto
      .createHmac("sha256", ADMIN_SECRET)
      .update(base64Payload)
      .digest("hex");
    if (signature !== expected) return { valid: false };

    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString("utf-8"));
    if (!payload.exp || Date.now() > payload.exp) return { valid: false };
    return { valid: true, username: payload.username };
  } catch (e) {
    return { valid: false };
  }
}

function requireAdmin(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return res.status(401).json({ success: false, error: "Chưa đăng nhập quyền Admin" });
  }
  req.adminUser = session.username;
  next();
}

function generateVietQrUrl(amount, orderCode) {
  const bankId = "970422"; // MB Bank
  const accountNo = "0941668405";
  const template = "compact2";
  const accountName = encodeURIComponent("TRAM CHANH DA LAT");
  const memo = encodeURIComponent(`TRAM ${orderCode}`);
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${memo}&accountName=${accountName}`;
}

/* ==========================================================================
   HEALTH CHECK
   ========================================================================== */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Web Tram Da Lat API Backend",
    timestamp: new Date().toISOString(),
  });
});

/* ==========================================================================
   AUTH ROUTES
   ========================================================================== */
app.post("/api/admin/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username &&
    password &&
    username.trim() === ADMIN_USERNAME &&
    password.trim() === ADMIN_PASSWORD
  ) {
    const token = createAdminToken(username.trim());
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.json({ success: true, message: "Đăng nhập thành công" });
  }
  return res.status(401).json({ success: false, error: "Sai tài khoản hoặc mật khẩu" });
});

app.post("/api/admin/auth/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ success: true, message: "Đã đăng xuất" });
});

app.get("/api/admin/auth/me", (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  const session = verifyAdminToken(token);
  if (session.valid) {
    return res.json({ authenticated: true, user: { username: session.username } });
  }
  return res.json({ authenticated: false });
});

/* ==========================================================================
   ADMIN STATS
   ========================================================================== */
app.get("/api/admin/stats", requireAdmin, async (req, res) => {
  try {
    const [totalOrders, pendingOrders, totalProducts, paidOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.product.count({ where: { isAvailable: true } }),
      prisma.order.findMany({
        where: { isPaid: true },
        select: { totalPrice: true },
      }),
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalProducts,
      },
      recentOrders,
    });
  } catch (e) {
    console.error("Stats error:", e);
    res.status(500).json({ success: false, error: "Không thể lấy số liệu thống kê" });
  }
});

/* ==========================================================================
   IMAGE UPLOAD
   ========================================================================== */
app.post("/api/admin/upload", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "Vui lòng chọn file hình ảnh" });
  }
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: publicUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

/* ==========================================================================
   PRODUCTS ROUTES
   ========================================================================== */
app.get("/api/products", async (req, res) => {
  try {
    const { category, subCategory, q, featured } = req.query;
    const where = { isAvailable: true };

    if (category && category !== "all") {
      where.categoryName = { contains: category };
    }
    if (subCategory) {
      where.subCategory = subCategory;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { subCategory: { contains: q } },
      ];
    }

    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.category.findMany({ orderBy: { order: "asc" } }),
    ]);

    res.json({ success: true, data: products, categories });
  } catch (e) {
    console.error("GET /api/products error:", e);
    res.status(500).json({ success: false, error: "Không thể lấy danh sách sản phẩm" });
  }
});

app.post("/api/products", requireAdmin, async (req, res) => {
  try {
    const { name, categoryName, subCategory, price, image, description, multiPrice, isFeatured } =
      req.body;
    if (!name || !categoryName || !price) {
      return res.status(400).json({ success: false, error: "Vui lòng nhập Tên, Danh mục và Giá" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        categoryName,
        subCategory: subCategory || null,
        price: Number(price),
        image: image || "/images/products/trachanh.png",
        description: description || null,
        multiPrice: multiPrice || null,
        isFeatured: Boolean(isFeatured),
      },
    });

    res.json({ success: true, data: product });
  } catch (e) {
    console.error("POST /api/products error:", e);
    res.status(500).json({ success: false, error: "Không thể tạo sản phẩm mới" });
  }
});

app.patch("/api/products/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.price !== undefined) data.price = Number(data.price);
    if (data.isFeatured !== undefined) data.isFeatured = Boolean(data.isFeatured);
    if (data.isAvailable !== undefined) data.isAvailable = Boolean(data.isAvailable);

    const updated = await prisma.product.update({
      where: { id },
      data,
    });
    res.json({ success: true, data: updated });
  } catch (e) {
    console.error("PATCH /api/products error:", e);
    res.status(500).json({ success: false, error: "Không thể cập nhật sản phẩm" });
  }
});

app.delete("/api/products/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, message: "Đã xóa sản phẩm thành công" });
  } catch (e) {
    console.error("DELETE /api/products error:", e);
    res.status(500).json({ success: false, error: "Không thể xóa sản phẩm" });
  }
});

/* ==========================================================================
   ORDERS ROUTES
   ========================================================================== */
app.get("/api/orders", requireAdmin, async (req, res) => {
  try {
    const { status, isPaid } = req.query;
    const where = {};
    if (status && status !== "ALL") where.status = status;
    if (isPaid !== undefined) where.isPaid = isPaid === "true";

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json({ success: true, data: orders });
  } catch (e) {
    console.error("GET /api/orders error:", e);
    res.status(500).json({ success: false, error: "Không thể lấy danh sách đơn hàng" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, phone, address, note, paymentMethod, items } = req.body;
    if (!customerName || !phone || !items || !items.length) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng nhập tên, số điện thoại và chọn ít nhất 1 món",
      });
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderCode = `TR${Date.now().toString().slice(-6)}`;

    const order = await prisma.order.create({
      data: {
        orderCode,
        customerName,
        phone,
        address: address || null,
        note: note || null,
        paymentMethod: paymentMethod || "VIETQR",
        totalPrice,
        status: "PENDING",
        isPaid: false,
        items: {
          create: items.map((i) => ({
            name: i.name,
            price: Number(i.price),
            quantity: Number(i.quantity),
            subCategory: i.subCategory || null,
            productId: i.id || null,
          })),
        },
      },
      include: { items: true },
    });

    const vietQrUrl = generateVietQrUrl(order.totalPrice, order.orderCode);
    res.json({ success: true, data: order, vietQrUrl });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    res.status(500).json({ success: false, error: "Không thể tạo đơn hàng" });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderCode: id }],
      },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: "Không tìm thấy đơn hàng" });
    }

    const vietQrUrl = generateVietQrUrl(order.totalPrice, order.orderCode);
    res.json({ success: true, data: order, vietQrUrl });
  } catch (e) {
    console.error("GET /api/orders/:id error:", e);
    res.status(500).json({ success: false, error: "Lỗi tải thông tin đơn hàng" });
  }
});

app.patch("/api/orders/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isPaid } = req.body;
    const data = {};
    if (status) data.status = status;
    if (isPaid !== undefined) data.isPaid = Boolean(isPaid);

    const updated = await prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    });
    res.json({ success: true, data: updated });
  } catch (e) {
    console.error("PATCH /api/orders/:id error:", e);
    res.status(500).json({ success: false, error: "Không thể cập nhật đơn hàng" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Web Tram Backend Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
