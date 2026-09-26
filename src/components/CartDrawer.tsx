"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getTotalCount,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalAmount = getTotalAmount();
  const totalCount = getTotalCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md bg-[#F6EFDF] h-full shadow-2xl flex flex-col z-10 border-l-3 border-navy"
          >
            {/* Header */}
            <div className="p-5 border-b-2 border-navy bg-[#FFF2D5] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-navy text-mustard rounded-xl shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-black text-navy uppercase leading-none">
                    Giỏ hàng của bạn
                  </h2>
                  <span className="text-[11px] font-bold text-muted">
                    {totalCount} phần món được chọn
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-navy hover:text-maroon rounded-xl hover:bg-navy/10 transition-colors border border-navy/20"
                aria-label="Đóng giỏ hàng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted">
                  <div className="p-4 bg-white/60 rounded-3xl border-2 border-dashed border-navy/20 mb-3">
                    <ShoppingBag className="w-12 h-12 text-navy/30 stroke-1" />
                  </div>
                  <p className="font-bold text-navy text-base mb-1">
                    Giỏ hàng đang trống
                  </p>
                  <p className="text-xs text-muted mb-4 max-w-xs">
                    Bạn chưa chọn món nào. Hãy khám phá thực đơn tươi ngon của Trạm nhé!
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 bg-maroon text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_3px_0_#2D2A4A] hover:bg-maroon-dark active:translate-y-0.5 transition-all"
                  >
                    Khám Phá Thực Đơn
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-3.5 p-3 bg-white/95 rounded-2xl border-2 border-navy shadow-[0_2px_0_#2D2A4A]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-navy/20 bg-paper shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-navy text-sm truncate leading-snug">
                        {item.name}
                      </h4>
                      {item.subCategory && (
                        <span className="text-[11px] font-semibold text-teal block truncate">
                          {item.subCategory}
                        </span>
                      )}
                      <span className="text-xs font-extrabold text-maroon block mt-0.5">
                        {formatVND(item.price)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center border-2 border-navy rounded-lg bg-[#F6EFDF] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-navy/10 text-navy transition-colors"
                          title="Giảm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-black text-navy">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-navy/10 text-navy transition-colors"
                          title="Tăng"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted hover:text-red-600 transition-colors p-1"
                        title="Xóa món"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-5 border-t-2 border-navy bg-[#FFFDF7] space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-navy">
                  <span>Tổng tiền ({totalCount} phần):</span>
                  <span className="font-serif text-2xl font-black text-maroon">
                    {formatVND(totalAmount)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 px-4 bg-maroon hover:bg-maroon-dark text-white font-black text-sm rounded-xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_2px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Tiến hành đặt hàng</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-center text-xs font-semibold text-muted hover:text-red-700 transition-colors"
                  >
                    Xóa sạch giỏ hàng
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
