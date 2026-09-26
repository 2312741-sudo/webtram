import React from "react";
import Link from "next/link";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-[#F6EFDF] border-t-4 border-mustard pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Trạm"
                className="w-12 h-12 rounded-xl border border-white/30 object-cover"
              />
              <span className="font-serif text-2xl font-black tracking-wide text-mustard uppercase">
                Trạm
              </span>
            </div>
            <p className="text-sm text-[#F6EFDF]/80 leading-relaxed mb-4">
              "Luôn tươi ngon vì sức khỏe" — Trạm mang đến những ly trà trái cây tươi mát, sữa hạt dinh dưỡng nguyên chất và bánh nướng thơm lừng mỗi ngày tại Đà Lạt.
            </p>
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href={process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/0941668405"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006af5] text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Zalo Trạm</span>
              </a>
              <a
                href="https://www.facebook.com/messages/t/115777478290228"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Messenger</span>
              </a>
              <a
                href="https://www.facebook.com/TramchanhDaLat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all"
              >
                <span>Fanpage</span>
              </a>
            </div>
          </div>

          {/* Col 2: Store Hours & Hotline */}
          <div>
            <h3 className="font-serif text-lg font-bold text-mustard mb-4 tracking-wide uppercase">
              Thời Gian & Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm text-[#F6EFDF]/85">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-mustard shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Mở cửa hàng ngày:</div>
                  <div className="text-mustard font-bold">19:00 — 24:00 (Thứ 2 → Chủ Nhật)</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-mustard shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Hotline / Đặt hàng:</div>
                  <a
                    href="tel:0941668405"
                    className="text-mustard font-bold hover:underline"
                  >
                    0941 668 405
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-mustard shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-[#F6EFDF]/85">
                  <div className="font-bold text-sm text-[#F6EFDF]">Chi nhánh tại Đà Lạt:</div>
                  <div>📍 <strong>Trạm Chanh:</strong> 09 Hải Thượng, Cam Ly</div>
                  <div>📍 <strong>Trạm Sữa:</strong> 44 Yersin, Xuân Hương</div>
                  <div>📍 <strong>Trạm Bánh:</strong> 46 Yersin, Xuân Hương</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-mustard mb-4 tracking-wide uppercase">
              Danh Mục Món
            </h3>
            <ul className="space-y-2 text-sm text-[#F6EFDF]/80">
              <li>
                <Link href="/menu?category=Trạm Chanh" className="hover:text-mustard transition-colors">
                  🍋 Trạm Chanh — Trà Trái Cây & Bánh Lăn Nướng
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Trạm Sữa" className="hover:text-mustard transition-colors">
                  🥛 Trạm Sữa — Sữa Hạt Tươi & Bánh Tam Giác
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Trạm Bánh" className="hover:text-mustard transition-colors">
                  🥐 Trạm Bánh — Cà Phê, Bơ Coco & Waffle Nướng
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/cart" className="text-mustard font-bold hover:underline">
                  👉 Xem giỏ hàng & Đặt hàng nhanh
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F6EFDF]/60 gap-3">
          <div>
            © {new Date().getFullYear()} Trạm — Luôn tươi ngon vì sức khỏe. Mọi quyền được bảo lưu.
          </div>
          <div className="flex gap-4">
            <Link href="/hours" className="hover:text-[#F6EFDF]">Giờ Mở Cửa</Link>
            <Link href="/contact" className="hover:text-[#F6EFDF]">Liên Hệ</Link>
            <Link href="/admin" className="hover:text-[#F6EFDF]">Quản Trị</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
