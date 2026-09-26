"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function FloatingSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 bg-navy/20 sm:hidden z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Popup */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-20 mb-3 w-72 bg-[#F6EFDF] border-3 border-navy rounded-3xl p-4 shadow-[0_16px_36px_rgba(45,42,74,0.25)] space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-navy/15">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="font-serif font-black text-xs text-navy uppercase tracking-wider">
                    Hỗ trợ nhanh • Trạm
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-navy hover:text-maroon rounded-lg hover:bg-navy/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Links */}
              <div className="space-y-2">
                <a
                  href="https://www.facebook.com/messages/t/115777478290228"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border-2 border-navy hover:bg-[#FFF2D5] transition-all group shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-navy group-hover:text-maroon flex items-center gap-1">
                      <span>Chat Messenger</span>
                      <ExternalLink className="w-3 h-3 text-muted" />
                    </div>
                    <p className="text-[10px] text-muted truncate">
                      Tư vấn & nhận đơn ngay
                    </p>
                  </div>
                </a>

                <a
                  href="https://zalo.me/0941668405"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border-2 border-navy hover:bg-[#FFF2D5] transition-all group shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0068FF] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    Zalo
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-navy group-hover:text-maroon flex items-center gap-1">
                      <span>Nhắn qua Zalo</span>
                      <ExternalLink className="w-3 h-3 text-muted" />
                    </div>
                    <p className="text-[10px] text-muted font-mono">
                      0941 668 405
                    </p>
                  </div>
                </a>

                <a
                  href="tel:0941668405"
                  className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border-2 border-navy hover:bg-[#FFF2D5] transition-all group shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-maroon text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-navy group-hover:text-maroon">
                      Hotline Đà Lạt
                    </div>
                    <p className="text-[10px] text-muted font-mono">
                      0941 668 405 (Bấm gọi)
                    </p>
                  </div>
                </a>

                <a
                  href="/hours"
                  className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border-2 border-navy hover:bg-[#FFF2D5] transition-all group shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-navy group-hover:text-maroon">
                      3 Chi Nhánh Đà Lạt
                    </div>
                    <p className="text-[10px] text-muted truncate">
                      Mở cửa: 19:00 - 24:00
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2.5 px-4 py-3 bg-maroon hover:bg-maroon-dark text-white rounded-full border-3 border-navy shadow-[0_6px_0_#2D2A4A] active:translate-y-1 active:shadow-[0_2px_0_#2D2A4A] transition-all"
        aria-label="Hỗ trợ & Liên hệ Trạm"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mustard opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-mustard"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="font-serif font-black text-xs uppercase tracking-wider hidden sm:inline">
          Liên hệ Trạm
        </span>
      </motion.button>
    </div>
  );
}
