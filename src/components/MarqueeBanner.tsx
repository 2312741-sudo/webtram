"use client";

import React from "react";

export default function MarqueeBanner() {
  const items = [
    "🍃 TRÀ OLONG ĐÀ LẠT TỰ NHIÊN",
    "🥛 SỮA BÒ TƯƠI HẠT NGUYÊN CHẤT",
    "🥐 BÁNH LĂN & TART NƯỚNG NÓNG HỔI",
    "🛵 GIAO HÀNG TẬN NƠI ĐÀ LẠT",
    "⚡ THANH TOÁN VIETQR TỰ ĐỘNG",
    "🍋 100% NGUYÊN LIỆU TƯƠI SẠCH",
    "💬 ĐẶT QUA ZALO & MESSENGER",
    "💛 LUÔN TƯƠI NGON VÌ SỨC KHỎE",
  ];

  return (
    <div className="relative overflow-hidden bg-navy text-mustard py-3 border-y-3 border-mustard select-none">
      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            <span className="font-serif font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
              {text}
            </span>
            <span className="text-white/30 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
