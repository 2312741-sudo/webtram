"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, Filter, X } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { ProductData } from "@/components/ProductCard";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

interface MenuClientProps {
  initialProducts: ProductData[];
  categories: CategoryData[];
}

export default function MenuClient({
  initialProducts,
  categories,
}: MenuClientProps) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategoryParam);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all unique subcategories for the active category
  const availableSubCategories = useMemo(() => {
    const subs = new Set<string>();
    initialProducts.forEach((p) => {
      const matchCat =
        activeCategory === "all" || p.categoryName.includes(activeCategory);
      if (matchCat && p.subCategory) {
        subs.add(p.subCategory);
      }
    });
    return Array.from(subs);
  }, [initialProducts, activeCategory]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // 1. Category check
      const matchCat =
        activeCategory === "all" || p.categoryName.includes(activeCategory);

      // 2. SubCategory check
      const matchSub =
        activeSubCategory === "all" || p.subCategory === activeSubCategory;

      // 3. Search query check
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query));

      return matchCat && matchSub && matchQuery;
    });
  }, [initialProducts, activeCategory, activeSubCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black text-maroon uppercase tracking-widest block">
          Menu Trạm Đà Lạt
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-navy">
          Thực Đơn Tươi Mới
        </h1>
        <p className="text-sm text-navy/70 font-medium">
          Trà trái cây tự nhiên, sữa hạt bổ dưỡng & bánh nướng nóng hổi mỗi ngày.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="space-y-4">
        
        {/* Search bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm món (ví dụ: trà chanh, bơ coco, bánh lăn...)"
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border-2 border-navy text-sm font-semibold text-navy placeholder:text-muted/60 shadow-[0_3px_0_#2D2A4A] focus:outline-none focus:border-maroon transition-all"
          />
          <Search className="w-5 h-5 text-navy absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-navy"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveSubCategory("all");
            }}
            className={`px-5 py-2.5 rounded-xl border-2 border-navy text-xs font-black uppercase tracking-wider transition-all ${
              activeCategory === "all"
                ? "bg-navy text-white shadow-[0_3px_0_#7E2930] -translate-y-0.5"
                : "bg-white/80 hover:bg-white text-navy shadow-sm"
            }`}
          >
            Tất cả ({initialProducts.length})
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            const count = initialProducts.filter((p) =>
              p.categoryName.includes(cat.name)
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setActiveSubCategory("all");
                }}
                className={`px-5 py-2.5 rounded-xl border-2 border-navy text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-maroon text-white shadow-[0_3px_0_#2D2A4A] -translate-y-0.5"
                    : "bg-white/80 hover:bg-white text-navy shadow-sm"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Subcategories Filter Chips */}
        {availableSubCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-navy/15">
            <span className="text-xs font-bold text-muted flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-navy" />
              Lọc theo nhóm:
            </span>
            <button
              onClick={() => setActiveSubCategory("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                activeSubCategory === "all"
                  ? "bg-teal text-white border-teal shadow-xs"
                  : "bg-white/60 text-navy border-navy/20 hover:bg-white"
              }`}
            >
              Tất cả
            </button>
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  activeSubCategory === sub
                    ? "bg-teal text-white border-teal shadow-xs"
                    : "bg-white/60 text-navy border-navy/20 hover:bg-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result stats */}
      <div className="flex items-center justify-between text-xs font-bold text-muted px-2">
        <span>Hiển thị {filteredProducts.length} món</span>
        {searchQuery && (
          <span>Kết quả tìm kiếm cho: &ldquo;{searchQuery}&rdquo;</span>
        )}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
