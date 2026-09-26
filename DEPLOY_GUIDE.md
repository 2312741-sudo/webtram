# HƯỚNG DẪN DEPLOY TRANG WEB TRẠM ĐÀ LẠT
*(Kiến trúc: Frontend trên Vercel + Backend & Database trên Render)*

---

## 🏗️ Tổng Quan Kiến Trúc
- **Frontend (Vercel):** Chạy Next.js 14 App Router, tối ưu SEO, giao diện động mượt mà, phân phối qua mạng CDN toàn cầu, miễn phí HTTPS/SSL.
- **Backend (Render):** Chạy Node.js / Express API độc lập, xử lý đơn hàng, xác thực tài khoản Admin, upload và lưu trữ ảnh sản phẩm.
- **Database (Render):** PostgreSQL Database được Render quản lý tự động, sao lưu an toàn và miễn phí 100%.

---

## BƯỚC 1: DEPLOY BACKEND & DATABASE TRÊN RENDER (3 Phút)

File cấu hình tự động `render.yaml` đã được tích hợp sẵn trong mã nguồn. Bạn chỉ cần bấm chuột theo các bước:

1. Truy cập vào **[https://dashboard.render.com](https://dashboard.render.com)** (Đăng nhập bằng tài khoản GitHub).
2. Ở góc trên bên phải, bấm nút **`New +`** ➔ Chọn **`Blueprint`**.
3. Chọn kho lưu trữ **`2312741-sudo/webtram`** (và chọn nhánh `main` hoặc `feat/fullstack-nextjs`).
4. Render sẽ tự động phát hiện file `render.yaml` và liệt kê 2 dịch vụ sẽ được tạo:
   - **`webtram-db`** (Cơ sở dữ liệu PostgreSQL)
   - **`webtram-backend`** (Web Service Node.js API)
5. Bấm nút **`Apply`**.
6. Render sẽ tự động:
   - Tạo Database PostgreSQL.
   - Build và khởi động Backend.
   - Tạo bảng dữ liệu và nạp sẵn 29 món ăn đặc sản của 3 Trạm (`seed.js`).
7. Khi Render báo **`Live`**, bạn copy đường link URL của Backend (có dạng: `https://webtram-backend.onrender.com`).

---

## BƯỚC 2: DEPLOY FRONTEND TRÊN VERCEL (2 Phút)

1. Truy cập vào **[https://vercel.com](https://vercel.com)** (Đăng nhập bằng tài khoản GitHub).
2. Bấm nút **`Add New...`** ➔ Chọn **`Project`**.
3. Tìm và bấm **`Import`** tại kho lưu trữ **`2312741-sudo/webtram`**.
4. Ở phần cấu hình dự án:
   - **Framework Preset:** `Next.js` (Vercel tự động nhận diện).
   - **Root Directory:** `./` (để mặc định).
5. Mở rộng mục **`Environment Variables`** và thêm các biến sau:
   - **`BACKEND_URL`**: Dán đường link Render bạn vừa copy ở Bước 1 (Ví dụ: `https://webtram-backend.onrender.com`).
   - **`ADMIN_USERNAME`**: `admin`
   - **`ADMIN_PASSWORD`**: `tramdalat2026`
   - **`ADMIN_SECRET`**: `tram_admin_secret_key_dalat_super_secure_2026`
6. Bấm nút **`Deploy`**!
7. Sau khoảng 1 phút, Vercel sẽ hoàn tất và cấp đường link web chính thức (Ví dụ: `https://webtram.vercel.app`).

---

## BƯỚC 3: KIỂM TRA TRANG WEB CHÍNH THỨC
1. Truy cập vào đường link Vercel được cấp.
2. Kiểm tra các chức năng:
   - Xem thực đơn 3 trạm và đặt hàng thử.
   - Đăng nhập trang quản trị: `https://<ten-web-cua-ban>.vercel.app/admin` (`admin` / `tramdalat2026`).
   - Thử thêm món mới hoặc tải ảnh trực tiếp từ máy lên.

---

## GẮN TÊN MIỀN RIÊNG (NẾU CÓ)
Nếu bạn có mua tên miền riêng (ví dụ: `tramdalat.com` hoặc `tramchanhdalat.vn`):
1. Vào dự án trên Vercel ➔ **Settings** ➔ **Domains**.
2. Nhập tên miền của bạn và cấu hình DNS CNAME theo hướng dẫn hiển thị trên Vercel.
