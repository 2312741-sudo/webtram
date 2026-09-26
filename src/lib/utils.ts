import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function generateOrderCode(): string {
  const date = new Date();
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TR${d}${m}-${random}`;
}

export const ORDER_STATUS_MAP: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PENDING: {
    label: "Chờ xác nhận",
    color: "text-amber-800",
    bg: "bg-amber-100 border-amber-300",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    color: "text-blue-800",
    bg: "bg-blue-100 border-blue-300",
  },
  PREPARING: {
    label: "Đang pha chế",
    color: "text-purple-800",
    bg: "bg-purple-100 border-purple-300",
  },
  DELIVERING: {
    label: "Đang giao hàng",
    color: "text-teal-800",
    bg: "bg-teal-100 border-teal-300",
  },
  COMPLETED: {
    label: "Hoàn tất",
    color: "text-green-800",
    bg: "bg-green-100 border-green-300",
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "text-red-800",
    bg: "bg-red-100 border-red-300",
  },
};
