"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Filter,
  Check,
  ExternalLink,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Coffee,
} from "lucide-react";
import { formatVND, ORDER_STATUS_MAP } from "@/lib/utils";

interface OrderItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subCategory?: string | null;
}

interface OrderData {
  id: string;
  orderCode: string;
  customerName: string;
  phone: string;
  address?: string | null;
  note?: string | null;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  items: OrderItemData[];
}

export default function AdminOrdersClient({
  initialOrders,
}: {
  initialOrders: OrderData[];
}) {
  const [orders, setOrders] = useState<OrderData[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "CONFIRMED", label: "Đã xác nhận" },
    { key: "PREPARING", label: "Đang pha chế" },
    { key: "DELIVERING", label: "Đang giao" },
    { key: "COMPLETED", label: "Hoàn tất" },
    { key: "CANCELLED", label: "Đã hủy" },
  ];

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTogglePaid = async (orderId: string, currentPaid: boolean) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPaid: !currentPaid }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, isPaid: !currentPaid } : o
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter === "ALL" ? true : o.status === statusFilter
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-maroon tracking-wider">
            Quản Lý Đơn Hàng
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Danh Sách Đơn Hàng ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {statuses.map((st) => {
          const count =
            st.key === "ALL"
              ? orders.length
              : orders.filter((o) => o.status === st.key).length;
          return (
            <button
              key={st.key}
              onClick={() => setStatusFilter(st.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-navy transition-all ${
                statusFilter === st.key
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-navy hover:bg-navy/5"
              }`}
            >
              {st.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-muted border-2 border-navy">
            Không có đơn hàng nào trong mục này.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = ORDER_STATUS_MAP[order.status] || {
              label: order.status,
              color: "text-navy",
              bg: "bg-navy/10 border-navy/20",
            };

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border-2 border-navy p-5 shadow-[0_4px_12px_rgba(45,42,74,0.06)] space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-navy/10">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl font-black text-navy">
                      #{order.orderCode}
                    </span>
                    <span className="text-xs text-muted font-bold">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Changer Select */}
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border-2 border-navy bg-[#F6EFDF] text-xs font-black uppercase text-navy focus:outline-none cursor-pointer"
                    >
                      <option value="PENDING">Chờ xác nhận</option>
                      <option value="CONFIRMED">Đã xác nhận</option>
                      <option value="PREPARING">Đang pha chế</option>
                      <option value="DELIVERING">Đang giao hàng</option>
                      <option value="COMPLETED">Hoàn tất</option>
                      <option value="CANCELLED">Hủy đơn</option>
                    </select>

                    {/* Paid toggle button */}
                    <button
                      onClick={() => handleTogglePaid(order.id, order.isPaid)}
                      disabled={updatingId === order.id}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase border-2 transition-all ${
                        order.isPaid
                          ? "bg-green-100 border-green-600 text-green-800"
                          : "bg-amber-100 border-amber-500 text-amber-800"
                      }`}
                      title="Bấm để chuyển trạng thái thanh toán"
                    >
                      {order.isPaid ? "✓ Đã thanh toán" : "✕ Chưa thanh toán"}
                    </button>

                    <Link
                      href={`/order/${order.orderCode}`}
                      target="_blank"
                      className="p-2 text-navy hover:text-maroon border-2 border-navy rounded-xl hover:bg-navy/5 transition-all"
                      title="Xem trang khách hàng"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm text-navy">
                  {/* Customer Info (5 cols) */}
                  <div className="md:col-span-5 space-y-1 bg-[#F6EFDF]/40 p-3.5 rounded-2xl border border-navy/10 text-xs">
                    <div>
                      <strong>Khách hàng:</strong> {order.customerName}
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
                      <strong>Phương thức:</strong> {order.paymentMethod}
                    </div>
                  </div>

                  {/* Items Ordered (7 cols) */}
                  <div className="md:col-span-7 space-y-2">
                    <div className="text-xs font-black uppercase text-muted">
                      Món đặt ({order.items.length}):
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs p-2 bg-[#F6EFDF]/20 rounded-lg border border-navy/10"
                        >
                          <span className="font-bold">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-black text-maroon">
                            {formatVND(item.quantity * item.price)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-center text-sm font-black text-navy border-t border-navy/10">
                      <span>Tổng thu:</span>
                      <span className="font-serif text-lg text-maroon">
                        {formatVND(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
