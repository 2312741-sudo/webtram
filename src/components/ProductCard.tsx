"use client";

import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
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
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      subCategory: product.subCategory || undefined,
      categoryName: product.categoryName,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect && onSelect(product)}
      className="group bg-white rounded-2xl border-2 border-navy shadow-[0_4px_12px_rgba(45,42,74,0.08)] hover:shadow-[0_12px_28px_rgba(45,42,74,0.15)] hover:-translate-y-1.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-[#fdfbf5] overflow-hidden border-b-2 border-navy">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {product.isFeatured && (
          <span className="absolute top-2.5 left-2.5 bg-maroon text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm border border-white/20">
            Nổi bật
          </span>
        )}

        {product.subCategory && (
          <span className="absolute bottom-2.5 left-2.5 bg-navy/85 backdrop-blur-sm text-mustard text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
            {product.subCategory}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="font-serif font-black text-navy text-base leading-snug group-hover:text-maroon transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-muted line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-black text-navy text-base">
              {formatVND(product.price)}
            </span>
            {product.multiPrice && (
              <span className="text-[10px] font-semibold text-teal -mt-0.5">
                {product.multiPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border-2 border-navy text-xs font-black transition-all ${
              added
                ? "bg-green-600 text-white border-green-700 shadow-none scale-95"
                : "bg-mustard hover:bg-[#d89e40] text-navy shadow-[0_2px_0_#2D2A4A] active:translate-y-0.5"
            }`}
            title="Thêm vào giỏ hàng"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
