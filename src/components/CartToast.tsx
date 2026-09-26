"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";

export default function CartToast() {
  const { toast, hideToast, setIsOpen } = useCartStore();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.timestamp}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 25 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] bg-[#F6EFDF] border-3 border-navy rounded-2xl p-3.5 shadow-[0_12px_32px_rgba(45,42,74,0.22)]"
        >
          <div className="flex items-start gap-3">
            {/* Image */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-navy bg-white shrink-0">
              <img
                src={toast.image}
                alt={toast.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 bg-maroon text-white text-[10px] font-black rounded-full px-1 border border-white">
                +{toast.quantity}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-teal uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                <span>Đã thêm vào giỏ!</span>
              </div>
              <h4 className="font-serif font-black text-navy text-sm truncate leading-snug">
                {toast.name}
              </h4>
              <p className="text-xs font-bold text-maroon">
                {formatVND(toast.price * toast.quantity)}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={hideToast}
              className="p-1 text-navy/60 hover:text-navy rounded-lg hover:bg-navy/10 transition-colors"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action button */}
          <div className="mt-2.5 pt-2 border-t border-navy/15 flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-muted">
              Đã lưu vào giỏ hàng
            </span>
            <button
              onClick={() => {
                hideToast();
                setIsOpen(true);
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-mustard hover:bg-[#d89e40] text-navy font-black text-xs rounded-xl border border-navy shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Xem giỏ</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
