"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Tài khoản hoặc mật khẩu không chính xác");
      }

      // Successful login -> Redirect
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border-3 border-navy shadow-[0_16px_40px_rgba(45,42,74,0.14)] p-7 sm:p-9 space-y-6">
      
      {/* Brand header */}
      <div className="text-center space-y-2">
        <div className="relative inline-block">
          <img
            src="/logo.jpg"
            alt="Logo Trạm"
            className="w-16 h-16 rounded-2xl border-2 border-navy mx-auto object-cover shadow-sm"
          />
          <span className="absolute -bottom-1 -right-1 bg-mustard p-1 rounded-full border border-navy shadow-xs">
            <ShieldCheck className="w-4 h-4 text-navy" />
          </span>
        </div>

        <h1 className="font-serif text-2xl font-black text-navy uppercase tracking-wide">
          Trạm Quản Trị CMS
        </h1>
        <p className="text-xs text-muted font-semibold">
          Đăng nhập để quản lý thực đơn, xem doanh thu và xử lý đơn hàng
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-300 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Username */}
        <div>
          <label className="block text-xs font-black uppercase text-navy mb-1.5">
            Tên tài khoản
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên tài khoản"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-bold text-navy outline-none transition-all"
            />
            <User className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-black uppercase text-navy mb-1.5">
            Mật khẩu bảo mật
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-bold text-navy outline-none transition-all"
            />
            <Lock className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-maroon hover:bg-maroon-dark text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_2px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span>Đang xác thực...</span>
            ) : (
              <>
                <span>Đăng Nhập Vào Hệ Thống</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Credentials helper hint */}
      <div className="bg-[#FFF2D5] rounded-2xl border border-navy/20 p-3.5 text-xs text-navy/80 space-y-1">
        <div className="font-bold text-maroon flex items-center gap-1">
          <span>🔑 Thông tin đăng nhập mặc định:</span>
        </div>
        <div className="font-mono text-[11px] space-y-0.5">
          <div>• Tài khoản: <strong>admin</strong></div>
          <div>• Mật khẩu: <strong>tramdalat2026</strong></div>
        </div>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F0EAE1] flex flex-col justify-center items-center p-4">
      {/* Back to shop button */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-maroon transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ Trạm</span>
        </Link>
        <span className="text-xs text-muted font-bold">Hệ Thống Trạm Đà Lạt</span>
      </div>

      <Suspense fallback={
        <div className="w-full max-w-md bg-white rounded-3xl p-10 text-center font-bold text-navy">
          Đang tải trang đăng nhập...
        </div>
      }>
        <LoginForm />
      </Suspense>

      <div className="text-center text-xs text-muted font-semibold mt-6">
        © {new Date().getFullYear()} Trạm — Luôn tươi ngon vì sức khỏe
      </div>
    </div>
  );
}
