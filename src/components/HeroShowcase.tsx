"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, ArrowRight, Sparkles, Flame, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";
import Link from "next/link";

interface StationHeroItem {
  id: string;
  stationName: string;
  stationEmoji: string;
  badge: string;
  productName: string;
  subCategory: string;
  price: number;
  image: string;
  desc: string;
  accentColor: string;
  bgColor: string;
}

const HERO_STATIONS: StationHeroItem[] = [
  {
    id: "hero-chanh",
    stationName: "Trạm Chanh",
    stationEmoji: "🍋",
    badge: "Món Bán Chạy Nhất",
    productName: "Trà Chanh Olong Tươi",
    subCategory: "Trà Trái Cây Tươi",
    price: 20000,
    image: "/images/products/trachanh.png",
    desc: "Trà ô long thượng hạng ủ lạnh cùng chanh tươi mọng nước, vị chua ngọt thanh mát xua tan mệt mỏi.",
    accentColor: "text-amber-800",
    bgColor: "bg-amber-500/10 border-amber-600/30",
  },
  {
    id: "hero-sua",
    stationName: "Trạm Sữa",
    stationEmoji: "🥛",
    badge: "Bổ Dưỡng Sáng Mịn",
    productName: "Sữa Đậu Nành Hạnh Nhân",
    subCategory: "Sữa Hạt Dinh Dưỡng",
    price: 22000,
    image: "/images/products/suadaunanhhanhnhan.png",
    desc: "Sữa bò tươi Đà Lạt nấu chậm cùng đậu nành hữu cơ và hạt hạnh nhân béo bùi, giàu dinh dưỡng.",
    accentColor: "text-teal-800",
    bgColor: "bg-teal-500/10 border-teal-600/30",
  },
  {
    id: "hero-banh",
    stationName: "Trạm Bánh",
    stationEmoji: "🥐",
    badge: "Đặc Sản Phố Núi",
    productName: "Bơ Coco Cốt Dừa",
    subCategory: "Đặc Sản Đà Lạt",
    price: 35000,
    image: "/images/products/bococo.png",
    desc: "Trái bơ sáp béo dẻo xay mịn hòa quyện cốt dừa thơm ngậy và dừa sấy giòn rụm khó cưỡng.",
    accentColor: "text-maroon-dark",
    bgColor: "bg-red-500/10 border-red-600/30",
  },
];

export default function HeroShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const current = HERO_STATIONS[activeIdx];

  const handleQuickAdd = () => {
    addItem(
      {
        id: current.id,
        name: current.productName,
        price: current.price,
        image: current.image,
        subCategory: current.subCategory,
        categoryName: current.stationName,
      },
      1,
      false
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="relative mx-auto max-w-md w-full">
      {/* Station Selector Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-navy mb-4 shadow-[0_4px_0_#2D2A4A] gap-1.5">
        {HERO_STATIONS.map((station, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={station.id}
              onClick={() => setActiveIdx(idx)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? "bg-navy text-mustard shadow-sm scale-102"
                  : "text-navy/70 hover:text-navy hover:bg-navy/5"
              }`}
            >
              <span>{station.stationEmoji}</span>
              <span className="hidden sm:inline">{station.stationName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Dynamic Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-navy shadow-[0_16px_40px_rgba(45,42,74,0.18)]"
        >
          {/* Card Image */}
          <div className="overflow-hidden rounded-2xl border-2 border-navy bg-paper aspect-[4/3] relative group">
            <img
              src={current.image}
              alt={current.productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-1 bg-maroon text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
                <Sparkles className="w-3 h-3 text-mustard" />
                <span>{current.badge}</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-navy/90 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <span className="text-mustard font-serif text-sm">
                {formatVND(current.price)}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[11px] font-medium text-white/90">
                {current.subCategory}
              </span>
            </div>
          </div>

          {/* Card Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-teal uppercase tracking-wider block">
                  {current.stationName} Tuyển Chọn
                </span>
                <h3 className="font-serif font-black text-navy text-xl sm:text-2xl leading-tight">
                  {current.productName}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-navy/75 leading-relaxed font-medium">
              {current.desc}
            </p>

            {/* Actions */}
            <div className="pt-3 border-t border-navy/10 flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickAdd}
                className={`flex-1 py-3 px-4 rounded-xl border-2 border-navy font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 ${
                  added
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-mustard hover:bg-[#d89e40] text-navy"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Đã thêm vào giỏ</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Thử món ngay ({formatVND(current.price)})</span>
                  </>
                )}
              </motion.button>

              <Link
                href={`/menu?category=${encodeURIComponent(current.stationName)}`}
                className="p-3 bg-[#F6EFDF] hover:bg-[#ebdcc0] text-navy rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 transition-all"
                title={`Xem toàn bộ menu ${current.stationName}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
