"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkles, MapPin } from "lucide-react";

export default function LiveShopStatus() {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${hours}:${minutes}`);

      // Shop is open 19:00 - 24:00 (19 - 23h59)
      const open = hours >= 19 && hours <= 23;
      setIsOpenNow(open);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-bold">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-xs transition-all ${
          isOpenNow
            ? "bg-green-500/10 border-green-600/30 text-green-900"
            : "bg-[#FFF2D5] border-navy/20 text-navy"
        }`}
      >
        <span className="relative flex h-2 w-2">
          {isOpenNow && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isOpenNow ? "bg-green-600" : "bg-amber-500"
            }`}
          ></span>
        </span>

        <span className="text-[11px] font-extrabold uppercase tracking-wide">
          {isOpenNow
            ? "Đang mở cửa đón khách • 19:00 - 24:00"
            : "Đang ủ mẻ mới • Mở cửa 19:00 tối nay"}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-muted font-bold px-2 py-1 bg-white/60 rounded-full border border-navy/15">
        <MapPin className="w-3 h-3 text-teal" />
        <span>Đà Lạt {timeString}</span>
        <span className="text-teal font-black">• 18°C Se lạnh</span>
      </div>
    </div>
  );
}
