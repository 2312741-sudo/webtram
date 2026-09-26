"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard, { ProductData } from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
  products: ProductData[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white/70 rounded-3xl border-2 border-dashed border-navy/30 p-8">
        <p className="font-serif text-lg font-bold text-navy">
          Không tìm thấy món ăn phù hợp
        </p>
        <p className="text-xs text-muted mt-1">
          Hãy thử tìm từ khóa khác hoặc đổi danh mục nhé!
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
