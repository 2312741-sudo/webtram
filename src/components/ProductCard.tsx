"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Eye } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";

export interface ProductData {
  id: string;
  name: string;
  categoryName: string;
  subCategory?: string | null;
  price: number;
  multiPrice?: string | null;
  image: string;
  description?: string | null;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: ProductData;
  onSelect?: (product: ProductData) => void;
  index?: number;
}

export default function ProductCard({ product, onSelect, index }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        subCategory: product.subCategory || undefined,
        categoryName: product.categoryName,
      },
      1,
      false // Do not force open drawer, use snappy Toast instead!
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const staggerDelay = typeof index === "number" ? (index % 4) * 0.07 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect && onSelect(product)}
      className="group bg-white rounded-3xl border-2 border-navy shadow-[0_4px_12px_rgba(45,42,74,0.07)] hover:shadow-[0_16px_32px_rgba(45,42,74,0.16)] transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Product Image */}
        <div className="relative aspect-square w-full bg-[#fdfbf5] overflow-hidden border-b-2 border-navy">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Overlay quick-view button on hover */}
          <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-navy text-xs font-black shadow-md border border-navy/20">
              <Eye className="w-3.5 h-3.5 text-teal" />
              <span>Xem chi tiết</span>
            </span>
          </div>

          {/* Badges */}
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-maroon text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
              ✦ Bán chạy
            </span>
          )}

          {product.subCategory && (
            <span className="absolute bottom-3 left-3 bg-navy/85 backdrop-blur-sm text-mustard text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
              {product.subCategory}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-1.5">
          <h3 className="font-serif font-black text-navy text-base leading-snug group-hover:text-maroon transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-muted line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Price & Add Button */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-navy/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif font-black text-navy text-base">
              {formatVND(product.price)}
            </span>
            {product.multiPrice && (
              <span className="text-[10px] font-semibold text-teal -mt-0.5">
                {product.multiPrice}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleQuickAdd}
            className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border-2 border-navy text-xs font-black transition-all ${
              added
                ? "bg-green-600 text-white border-green-700 shadow-none"
                : "bg-mustard hover:bg-[#d89e40] text-navy shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
            }`}
            title="Thêm vào giỏ hàng"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Thêm</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
