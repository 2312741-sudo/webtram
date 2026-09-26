"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black text-maroon uppercase tracking-widest block">
          Kết nối với Trạm
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-navy">
          Liên Hệ & Góp Ý
        </h1>
        <p className="text-sm text-navy/70 font-medium">
          Mỗi ý kiến đóng góp từ bạn là niềm vui và động lực để Trạm hoàn thiện chất lượng phục vụ mỗi ngày.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Info Col (5 cols) */}
        <div className="md:col-span-5 bg-navy text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_24px_rgba(45,42,74,0.15)] border-2 border-navy">
          <div>
            <h2 className="font-serif text-2xl font-black text-mustard uppercase mb-2">
              Trạm Đà Lạt
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Trà trái cây tự nhiên, sữa hạt dinh dưỡng nguyên chất & bánh nướng hảo hạng.
            </p>
          </div>

          <div className="space-y-4 text-sm text-white/90">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-mustard shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-white/60">Hotline đặt hàng & phản hồi:</div>
                <a href="tel:0941668405" className="font-black text-base text-mustard hover:underline">
                  0941 668 405
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-mustard shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-white/60">Địa chỉ quán:</div>
                <div className="font-semibold text-sm">Thành phố Đà Lạt, Lâm Đồng</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-mustard shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-white/60">Email:</div>
                <div className="font-semibold text-sm">tramchanhdalat@gmail.com</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-white/70">Kênh nhắn tin trực tiếp:</div>
            <div className="flex flex-col gap-2">
              <a
                href={process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/0941668405"}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 bg-[#006af5] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn tin qua Zalo</span>
              </a>

              <a
                href={process.env.NEXT_PUBLIC_MESSENGER_URL || "https://m.me/TramchanhDaLat"}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Facebook Messenger</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form Col (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.06)] space-y-6">
          <h2 className="font-serif text-xl font-black text-navy uppercase border-b-2 border-navy/10 pb-3">
            Gửi Tin Nhắn / Đóng Góp Ý Kiến
          </h2>

          {sent ? (
            <div className="p-8 text-center bg-[#FFF2D5] rounded-2xl border-2 border-navy space-y-3">
              <CheckCircle2 className="w-12 h-12 text-teal mx-auto" />
              <h3 className="font-serif text-xl font-black text-navy">
                Cảm ơn bạn đã gửi ý kiến!
              </h3>
              <p className="text-xs text-navy/80">
                Đội ngũ Trạm đã ghi nhận phản hồi của bạn và sẽ phản hồi sớm nhất có thể.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-navy mb-1.5">
                  Tên của bạn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên của bạn"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-navy mb-1.5">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-navy mb-1.5">
                  Nội dung tin nhắn / góp ý <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Bạn muốn nhắn nhủ điều gì với Trạm..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-maroon hover:bg-maroon-dark text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Gửi phản hồi ngay</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
