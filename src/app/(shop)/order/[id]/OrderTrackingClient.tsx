"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  QrCode,
  Copy,
  Check,
  Phone,
  MessageCircle,
  ArrowLeft,
  Package,
} from "lucide-react";
import { formatVND, ORDER_STATUS_MAP } from "@/lib/utils";

interface OrderTrackingClientProps {
  order: any;
  vietQrUrl: string;
}

export default function OrderTrackingClient({
  order,
  vietQrUrl,
}: OrderTrackingClientProps) {
  const [copied, setCopied] = useState(false);

  const statusInfo = ORDER_STATUS_MAP[order.status] || {
    label: order.status,
    color: "text-navy",
    bg: "bg-navy/10 border-navy/20",
  };

  const steps = [
    { key: "PENDING", label: "Tiếp nhận đơn" },
    { key: "CONFIRMED", label: "Đã xác nhận" },
    { key: "PREPARING", label: "Đang pha chế" },
    { key: "DELIVERING", label: "Đang giao hàng" },
    { key: "COMPLETED", label: "Hoàn tất" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  const copyTransferContent = () => {
    navigator.clipboard.writeText(`TRAM ${order.orderCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-maroon transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tiếp tục xem thực đơn</span>
        </Link>
        <span className="text-xs font-bold text-muted">
          Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
        </span>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_10px_30px_rgba(45,42,74,0.08)] overflow-hidden">
        
        {/* Banner Status */}
        <div className="bg-[#FFF2D5] p-6 border-b-2 border-navy flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase text-muted tracking-wider">
              Mã đơn hàng
            </div>
            <div className="font-serif text-3xl font-black text-navy tracking-tight">
              #{order.orderCode}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-xl border-2 text-xs font-black uppercase tracking-wider ${statusInfo.bg} ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
            {order.isPaid ? (
              <span className="px-3 py-1.5 rounded-xl border-2 border-green-600 bg-green-100 text-green-800 text-xs font-black uppercase">
                Đã thanh toán
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-800 text-xs font-black uppercase">
                Chưa thanh toán
              </span>
            )}
          </div>
        </div>

        {/* Stepper Status Progress */}
        <div className="p-6 border-b-2 border-navy/10 bg-[#F6EFDF]/40">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            {steps.map((step, idx) => {
              const isPastOrCurrent =
                currentStepIndex >= 0 && idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    isCurrent
                      ? "bg-maroon text-white border-navy shadow-sm font-black"
                      : isPastOrCurrent
                      ? "bg-white text-navy border-navy/40 font-bold"
                      : "bg-white/40 text-muted/60 border-dashed border-navy/20 font-medium"
                  }`}
                >
                  <div className="text-xs mb-1">Bước {idx + 1}</div>
                  <div className="text-xs leading-tight">{step.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT: Customer & Items Breakdown (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Customer Details */}
            <div className="space-y-2">
              <h3 className="font-serif text-base font-black text-navy uppercase">
                Thông tin người nhận
              </h3>
              <div className="bg-[#F6EFDF]/60 rounded-2xl p-4 border border-navy/15 text-sm space-y-1.5 text-navy">
                <div>
                  <strong>Họ tên:</strong> {order.customerName}
                </div>
                <div>
                  <strong>Điện thoại:</strong>{" "}
                  <a href={`tel:${order.phone}`} className="text-maroon font-bold underline">
                    {order.phone}
                  </a>
                </div>
                <div>
                  <strong>Địa chỉ:</strong> {order.address || "Nhận tại quán"}
                </div>
                {order.note && (
                  <div>
                    <strong>Ghi chú:</strong> {order.note}
                  </div>
                )}
                <div>
                  <strong>Hình thức:</strong> {order.paymentMethod}
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <h3 className="font-serif text-base font-black text-navy uppercase">
                Chi tiết món ({order.items.length})
              </h3>
              <div className="divide-y divide-navy/10 border-2 border-navy/20 rounded-2xl bg-white overflow-hidden">
                {order.items.map((item: any) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between text-sm">
                    <div>
                      <div className="font-bold text-navy">{item.name}</div>
                      {item.subCategory && (
                        <div className="text-[11px] text-teal font-medium">{item.subCategory}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-black text-navy">
                        {item.quantity} x {formatVND(item.price)}
                      </div>
                      <div className="text-xs font-extrabold text-maroon">
                        {formatVND(item.quantity * item.price)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Total */}
                <div className="p-4 bg-[#FFF2D5] flex items-center justify-between text-base font-black text-navy border-t-2 border-navy/20">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="font-serif text-xl text-maroon">
                    {formatVND(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: VietQR Transfer Code (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="bg-[#FFFDF7] p-5 rounded-3xl border-2 border-navy shadow-[0_4px_12px_rgba(45,42,74,0.06)] space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal/15 text-teal-dark rounded-full text-xs font-black uppercase">
                <QrCode className="w-3.5 h-3.5" />
                <span>Mã QR Thanh Toán Tự Động</span>
              </div>

              <div className="relative mx-auto max-w-[220px] bg-white p-3 rounded-2xl border-2 border-navy shadow-inner">
                <img
                  src={vietQrUrl}
                  alt="Mã QR Chuyển Khoản"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="text-xs space-y-1.5 text-navy/90 text-left bg-[#F6EFDF] p-3.5 rounded-xl border border-navy/15">
                <div>
                  <strong>Ngân hàng:</strong> MB Bank (Quân Đội)
                </div>
                <div>
                  <strong>Số tài khoản:</strong>{" "}
                  <span className="font-mono font-bold">0941668405</span>
                </div>
                <div>
                  <strong>Chủ tài khoản:</strong> TRAM CHANH DA LAT
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-navy/10">
                  <span>
                    <strong>Nội dung:</strong>{" "}
                    <span className="font-mono font-bold text-maroon">
                      TRAM {order.orderCode}
                    </span>
                  </span>
                  <button
                    onClick={copyTransferContent}
                    className="p-1 text-navy hover:text-maroon transition-colors"
                    title="Sao chép nội dung"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Support hotline */}
            <div className="pt-4 flex flex-col gap-2">
              <a
                href="tel:0941668405"
                className="w-full py-3 bg-navy hover:bg-navy-dark text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Hotline Trạm (0941 668 405)</span>
              </a>

              <a
                href="https://zalo.me/0941668405"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#006af5] hover:brightness-110 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Mở Zalo Xác Nhận Nhanh</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
