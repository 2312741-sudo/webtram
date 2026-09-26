"use client";

import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { ProductData } from "./ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";

interface ProductModalProps {
  product: ProductData | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  if (!product) return null;

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        subCategory: product.subCategory || undefined,
        categoryName: product.categoryName,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl border-2 border-navy shadow-[0_20px_50px_rgba(45,42,74,0.3)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border-2 border-navy flex items-center justify-center text-navy hover:text-maroon hover:bg-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media */}
        <div className="relative aspect-video w-full bg-[#fdfbf5] border-b-2 border-navy overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.categoryName && (
            <span className="absolute bottom-3 left-3 bg-maroon text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase shadow-sm">
              {product.categoryName}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            {product.subCategory && (
              <span className="text-xs font-extrabold text-teal uppercase tracking-wide">
                {product.subCategory}
              </span>
            )}
            <h2 className="font-serif text-2xl font-black text-navy mt-0.5">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-serif text-2xl font-black text-maroon">
                {formatVND(product.price)}
              </span>
              {product.multiPrice && (
                <span className="text-xs font-bold text-muted bg-[#FFF2D5] px-2 py-0.5 rounded-md border border-navy/20">
                  {product.multiPrice}
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-sm text-navy/80 leading-relaxed bg-[#F6EFDF]/60 p-3.5 rounded-xl border border-navy/10">
              {product.description}
            </p>
          )}

          {/* Quantity and Add button */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center border-2 border-navy rounded-xl bg-white overflow-hidden shadow-[0_2px_0_#2D2A4A]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-navy/10 text-navy transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-black text-navy min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 hover:bg-navy/10 text-navy transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-5 bg-mustard hover:bg-[#d89e40] text-navy font-black text-sm rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_1px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm vào giỏ ({formatVND(product.price * quantity)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
