import React from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Coffee, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Giờ Mở Cửa & Địa Điểm | Trạm Đà Lạt",
  description: "Thời gian phục vụ và địa chỉ các chi nhánh của Trạm tại thành phố Đà Lạt.",
};

export default function HoursPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <ScrollReveal direction="up" className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black text-maroon uppercase tracking-widest block">
          Trạm Đà Lạt
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-navy">
          Thời Gian Mở Cửa
        </h1>
        <p className="text-sm text-navy/70 font-medium">
          Chúng tôi mở cửa đón bạn mỗi ngày với không gian ấm cúng và hương vị ngọt lành.
        </p>
      </ScrollReveal>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Schedule Card */}
        <ScrollReveal direction="right" delay={0.1} scale={true} className="h-full">
          <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.08)] p-6 sm:p-8 space-y-6 h-full">
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
              <div className="flex justify-between items-center p-4 bg-[#FFF2D5] rounded-2xl border-2 border-navy shadow-[0_2px_0_#2D2A4A]">
                <span className="font-bold text-navy text-base">Thứ 2 → Chủ Nhật:</span>
                <span className="font-black text-maroon font-serif text-xl">19:00 → 24:00</span>
              </div>

              <div className="flex justify-between items-center p-3.5 bg-[#F6EFDF]/60 rounded-xl border border-navy/15">
                <span className="font-bold text-navy">Ngày Lễ & Tết:</span>
                <span className="font-black text-teal font-serif text-base">Phục vụ bình thường</span>
              </div>
            </div>

            <div className="text-xs text-muted leading-relaxed pt-2">
              <em>* Có thể điều chỉnh theo ngày lễ — cập nhật trên trang chủ và fanpage của Trạm.</em>
            </div>
          </div>
        </ScrollReveal>

        {/* Location & Delivery Card */}
        <ScrollReveal direction="left" delay={0.15} scale={true} className="h-full">
          <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.08)] p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-navy/10">
                <div className="w-12 h-12 rounded-2xl bg-teal/20 border-2 border-navy flex items-center justify-center text-teal-dark">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-black text-navy uppercase">
                    Hệ Thống Chi Nhánh
                  </h2>
                  <span className="text-xs font-bold text-muted">Thành phố Đà Lạt, Lâm Đồng</span>
                </div>
              </div>

              <div className="space-y-2.5 text-sm text-navy/90">
                <div className="p-3.5 bg-[#F6EFDF]/60 rounded-2xl border border-navy/15 space-y-2">
                  <div className="font-black text-xs uppercase text-maroon tracking-wide">
                    3 Điểm hẹn Trạm tại Đà Lạt:
                  </div>
                  <div className="text-xs space-y-1.5 font-medium">
                    <div>📍 <strong>TRẠM CHANH:</strong> 09 Hải Thượng, Phường Cam Ly, Đà Lạt</div>
                    <div>📍 <strong>TRẠM SỮA:</strong> 44 Yersin, Phường Xuân Hương, Đà Lạt</div>
                    <div>📍 <strong>TRẠM BÁNH:</strong> 46 Yersin, Phường Xuân Hương, Đà Lạt</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <Phone className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-xs">Số điện thoại / Zalo đặt trước:</div>
                    <a href="tel:0941668405" className="text-maroon font-bold text-base hover:underline">
                      0941 668 405
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Coffee className="w-4 h-4 text-mustard shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Dịch vụ:</div>
                    <div className="text-muted text-xs">
                      Thưởng thức tại chỗ, mang về (Takeaway) và giao hàng tận nơi.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/menu"
                className="w-full py-3.5 bg-maroon hover:bg-maroon-dark text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
              >
                <span>Xem thực đơn & Đặt giao tận nơi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}
