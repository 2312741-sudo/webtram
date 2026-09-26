import React from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Coffee, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Giờ Mở Cửa & Địa Điểm | Trạm Đà Lạt",
  description: "Thời gian phục vụ và địa chỉ các chi nhánh của Trạm tại thành phố Đà Lạt.",
};

export default function HoursPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black text-maroon uppercase tracking-widest block">
          Trạm Đà Lạt
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-navy">
          Thời Gian Mở Cửa
        </h1>
        <p className="text-sm text-navy/70 font-medium">
          Chúng tôi mở cửa đón bạn mỗi ngày với không gian ấm cúng và hương vị ngọt lành.
        </p>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Schedule Card */}
        <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.08)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-navy/10">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2D5] border-2 border-navy flex items-center justify-center text-navy">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-black text-navy uppercase">
                Khung Giờ Phục Vụ
              </h2>
              <span className="text-xs font-bold text-teal">Mở cửa 7 ngày trong tuần</span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center p-3.5 bg-[#F6EFDF]/60 rounded-xl border border-navy/15">
              <span className="font-bold text-navy">Thứ Hai — Thứ Sáu:</span>
              <span className="font-black text-maroon font-serif text-base">06:30 — 22:00</span>
            </div>

            <div className="flex justify-between items-center p-3.5 bg-[#FFF2D5] rounded-xl border border-navy/20">
              <span className="font-bold text-navy">Thứ Bảy & Chủ Nhật:</span>
              <span className="font-black text-maroon font-serif text-base">06:30 — 22:30</span>
            </div>

            <div className="flex justify-between items-center p-3.5 bg-[#F6EFDF]/60 rounded-xl border border-navy/15">
              <span className="font-bold text-navy">Ngày Lễ & Tết:</span>
              <span className="font-black text-teal font-serif text-base">Phục vụ bình thường</span>
            </div>
          </div>

          <div className="text-xs text-muted leading-relaxed pt-2">
            💡 <strong>Mẹo nhỏ:</strong> Khung giờ sáng sớm (07:00 - 09:00) là lúc bánh nướng ra lò nóng hổi và sữa hạt tươi sánh mịn nhất!
          </div>
        </div>

        {/* Location & Delivery Card */}
        <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.08)] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-navy/10">
              <div className="w-12 h-12 rounded-2xl bg-teal/20 border-2 border-navy flex items-center justify-center text-teal-dark">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-black text-navy uppercase">
                  Địa Điểm & Giao Hàng
                </h2>
                <span className="text-xs font-bold text-muted">Thành phố ngàn hoa Đà Lạt</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-navy/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-maroon shrink-0 mt-1" />
                <div>
                  <div className="font-bold">Địa chỉ:</div>
                  <div className="text-muted text-xs leading-relaxed">
                    Khu vực trung tâm Đà Lạt, tỉnh Lâm Đồng (Hỗ trợ đặt hàng trực tuyến và giao tận nơi).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal shrink-0 mt-1" />
                <div>
                  <div className="font-bold">Số điện thoại / Zalo:</div>
                  <a href="tel:0941668405" className="text-maroon font-bold text-base hover:underline">
                    0941 668 405
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Coffee className="w-4 h-4 text-mustard shrink-0 mt-1" />
                <div>
                  <div className="font-bold">Dịch vụ:</div>
                  <div className="text-muted text-xs">
                    Uống tại chỗ, mang về (Takeaway) và giao hàng tận nơi.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/menu"
              className="w-full py-3.5 bg-maroon hover:bg-maroon-dark text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all"
            >
              <span>Xem thực đơn & Đặt giao tận nơi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
