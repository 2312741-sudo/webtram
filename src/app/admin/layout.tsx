"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Coffee,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render clean layout without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Tổng Quan", href: "/admin", icon: LayoutDashboard },
    { label: "Quản Lý Đơn Hàng", href: "/admin/orders", icon: ClipboardList },
    { label: "Quản Lý Món Ăn", href: "/admin/products", icon: Coffee },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EAE1] flex flex-col md:flex-row">
      
      {/* Mobile Topbar */}
      <div className="md:hidden bg-navy text-white px-4 py-3 flex items-center justify-between border-b-2 border-navy">
        <div className="flex items-center gap-2.5">
          <img src="/logo.jpg" alt="Trạm" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-serif font-black text-mustard tracking-wide text-lg">TRẠM ADMIN</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-white hover:text-mustard"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-navy text-white z-40 flex flex-col justify-between p-5 border-r-4 border-mustard transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <img
              src="/logo.jpg"
              alt="Logo Trạm"
              className="w-10 h-10 rounded-xl border border-mustard object-cover"
            />
            <div>
              <div className="font-serif font-black text-mustard tracking-wide text-xl leading-none">
                TRẠM CMS
              </div>
              <div className="text-[10px] text-white/60 font-semibold mt-1">
                Hệ thống Quản trị & Bán hàng
              </div>
            </div>
          </div>

          {/* Admin status pill */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 font-bold">Admin: Đang trực tuyến</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    active
                      ? "bg-mustard text-navy shadow-md font-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-mustard transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Trang Bán Hàng</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs font-bold text-red-300 hover:text-red-200 transition-colors py-2 px-3 rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất Admin</span>
          </button>

          <div className="text-[10px] text-white/40 px-3 pt-1">
            Trạm — Đà Lạt • v1.0 Fullstack
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
