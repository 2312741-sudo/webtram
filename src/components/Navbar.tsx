"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import LiveShopStatus from "./LiveShopStatus";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalCount } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCount = mounted ? getTotalCount() : 0;

  const navLinks = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "THỰC ĐƠN", href: "/menu" },
    { label: "GIỜ MỞ CỬA", href: "/hours" },
    { label: "LIÊN HỆ", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Top Utility Announcement Bar */}
      <div className="bg-navy text-[#F6EFDF] px-4 py-1.5 border-b border-mustard/30 text-xs font-medium">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Live Shop Hours & Status Indicator */}
          <LiveShopStatus />

          {/* Quick info & admin link */}
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="hidden md:inline text-mustard">
              🛵 Giao nhanh toàn Đà Lạt • Hotline 0941 668 405
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-white/70 hover:text-mustard transition-colors py-0.5 px-2 rounded-md hover:bg-white/10"
              title="Khu vực Quản trị Hệ Thống"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#F6EFDF]/95 backdrop-blur-md border-b-2 border-navy shadow-[0_4px_16px_rgba(45,42,74,0.06)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[74px] gap-4">
            
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo.jpg"
                alt="Logo Trạm"
                className="w-12 h-12 rounded-2xl border-2 border-navy object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black text-navy tracking-tight uppercase group-hover:text-maroon transition-colors leading-none">
                  Trạm
                </span>
                <span className="text-[11px] font-bold text-muted tracking-wide mt-1 hidden sm:block">
                  Luôn tươi ngon vì sức khỏe
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-black tracking-wider transition-colors relative py-1.5 uppercase ${
                      active
                        ? "text-maroon"
                        : "text-navy hover:text-maroon"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-maroon rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Shopping Cart Button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center gap-2 bg-[#FFF2D5] hover:bg-[#FFE6B3] border-2 border-navy text-navy font-black px-4 py-2 rounded-xl shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_1px_0_#2D2A4A] transition-all"
                aria-label="Xem giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4 text-navy" />
                <span className="hidden sm:inline text-xs font-black uppercase">
                  Giỏ hàng
                </span>
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-maroon text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-navy border-2 border-navy rounded-xl bg-white/80"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-navy bg-[#F6EFDF] px-4 py-5 shadow-lg space-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-black text-sm tracking-wide ${
                  isActive(link.href)
                    ? "bg-maroon text-white shadow-sm"
                    : "text-navy hover:bg-navy/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy/20 flex flex-col gap-2 text-xs">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 font-bold text-navy border border-navy/30 rounded-xl hover:bg-navy/5 bg-white/50"
              >
                🛡️ Khu vực Quản trị Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
