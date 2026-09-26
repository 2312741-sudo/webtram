import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  Coffee,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { db } from "@/lib/db";
import { formatVND, ORDER_STATUS_MAP } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalOrders,
    pendingOrders,
    processingOrders,
    completedOrders,
    totalProducts,
    recentOrders,
    completedList,
  ] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: "PENDING" } }),
    db.order.count({
      where: { status: { in: ["CONFIRMED", "PREPARING", "DELIVERING"] } },
    }),
    db.order.count({ where: { status: "COMPLETED" } }),
    db.product.count(),
    db.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    db.order.findMany({
      where: { status: "COMPLETED" },
      select: { totalPrice: true },
    }),
  ]);

  const totalRevenue = completedList.reduce((sum, o) => sum + o.totalPrice, 0);

  const stats = [
    {
      label: "Doanh Thu Đã Thu",
      value: formatVND(totalRevenue),
      icon: DollarSign,
      color: "text-green-700 bg-green-100 border-green-300",
    },
    {
      label: "Đơn Chờ Xác Nhận",
      value: pendingOrders,
      icon: Clock,
      color: "text-amber-800 bg-amber-100 border-amber-300",
      highlight: pendingOrders > 0,
    },
    {
      label: "Đơn Đang Thực Hiện",
      value: processingOrders,
      icon: ShoppingBag,
      color: "text-blue-800 bg-blue-100 border-blue-300",
    },
    {
      label: "Tổng Món Thực Đơn",
      value: totalProducts,
      icon: Coffee,
      color: "text-purple-800 bg-purple-100 border-purple-300",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-maroon tracking-wider">
            Bảng Điều Khiển
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Tổng Quan Hoạt Động Trạm
          </h1>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-maroon hover:bg-maroon-dark text-white rounded-xl text-xs font-black uppercase tracking-wider border border-navy shadow-sm flex items-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Xem Đơn Hàng</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-white hover:bg-navy/5 text-navy rounded-xl text-xs font-black uppercase tracking-wider border-2 border-navy shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Coffee className="w-4 h-4" />
            <span>Quản Lý Món</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.label}
              className={`bg-white rounded-2xl p-5 border-2 border-navy shadow-[0_4px_12px_rgba(45,42,74,0.06)] flex items-center justify-between ${
                st.highlight ? "ring-2 ring-amber-500" : ""
              }`}
            >
              <div>
                <div className="text-xs font-bold text-muted mb-1">{st.label}</div>
                <div className="font-serif text-2xl font-black text-navy">
                  {st.value}
                </div>
              </div>
              <div className={`p-3 rounded-xl border-2 ${st.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.06)] overflow-hidden">
        <div className="p-6 border-b-2 border-navy flex items-center justify-between bg-[#FFF2D5]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-navy" />
            <h2 className="font-serif text-lg font-black text-navy uppercase">
              Đơn Hàng Gần Đây
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-black text-maroon hover:underline flex items-center gap-1"
          >
            <span>Tất cả đơn ({totalOrders})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-muted text-sm">
            Chưa có đơn hàng nào được ghi nhận.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-navy">
              <thead className="bg-[#F6EFDF] border-b border-navy/20 text-xs font-black uppercase text-navy/70">
                <tr>
                  <th className="py-3.5 px-4">Mã Đơn</th>
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Số Điện Thoại</th>
                  <th className="py-3.5 px-4">Món Đặt</th>
                  <th className="py-3.5 px-4">Tổng Tiền</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-4 text-right">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 font-medium">
                {recentOrders.map((order) => {
                  const statusInfo = ORDER_STATUS_MAP[order.status] || {
                    label: order.status,
                    color: "text-navy",
                    bg: "bg-navy/10 border-navy/20",
                  };

                  return (
                    <tr key={order.id} className="hover:bg-[#F6EFDF]/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-maroon">
                        #{order.orderCode}
                      </td>
                      <td className="py-3.5 px-4 font-bold">{order.customerName}</td>
                      <td className="py-3.5 px-4">{order.phone}</td>
                      <td className="py-3.5 px-4 text-xs text-muted max-w-[200px] truncate">
                        {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                      </td>
                      <td className="py-3.5 px-4 font-black">
                        {formatVND(order.totalPrice)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase ${statusInfo.bg} ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/order/${order.orderCode}`}
                          target="_blank"
                          className="text-xs font-bold text-teal hover:underline"
                        >
                          Xem
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
