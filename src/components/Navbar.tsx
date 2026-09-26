"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

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
    <header className="sticky top-0 z-40 bg-[#F6EFDF]/95 backdrop-blur-md border-b-2 border-navy shadow-[0_4px_12px_rgba(45,42,74,0.06)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[76px] gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <img
              src="/logo.jpg"
              alt="Logo Trạm"
              className="w-12 h-12 rounded-xl border-2 border-navy object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black text-navy tracking-tight uppercase group-hover:text-maroon transition-colors">
                Trạm
              </span>
              <span className="text-[11px] font-semibold text-muted -mt-1 hidden sm:block tracking-wide">
                Luôn tươi ngon vì sức khỏe
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-extrabold tracking-wider transition-colors relative py-1 ${
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
            {/* Admin link */}
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-navy/70 hover:text-navy hover:bg-navy/5 rounded-lg border border-navy/20 transition-all"
              title="Khu vực Quản trị"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center gap-2 bg-[#FFF2D5] hover:bg-[#FFE6B3] border-2 border-navy text-navy font-bold px-3.5 py-2 rounded-xl shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_1px_0_#2D2A4A] transition-all"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 text-navy" />
              <span className="hidden sm:inline text-xs font-black uppercase">
                Giỏ hàng
              </span>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-maroon text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
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
        <div className="md:hidden border-t-2 border-navy bg-[#F6EFDF] px-4 py-5 shadow-lg space-y-3">
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
          <div className="pt-2 border-t border-navy/20 flex gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-bold text-navy border border-navy/30 rounded-lg hover:bg-navy/5"
            >
              Khu vực Quản trị Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
