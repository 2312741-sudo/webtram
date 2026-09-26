"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  QrCode,
  Banknote,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Phone,
  User,
  MapPin,
  FileText,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatVND } from "@/lib/utils";
import SocialOrderModal from "@/components/SocialOrderModal";

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getTotalCount,
  } = useCartStore();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"VIETQR" | "COD" | "ZALO" | "MESSENGER">("VIETQR");

  // Social popup state
  const [socialModal, setSocialModal] = useState<{
    isOpen: boolean;
    channel: "zalo" | "messenger";
    orderCode: string;
    messageContent: string;
  }>({
    isOpen: false,
    channel: "messenger",
    orderCode: "",
    messageContent: "",
  });

  // Loading & submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalAmount = getTotalAmount();
  const totalCount = getTotalCount();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("Vui lòng nhập tên người nhận hàng");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Vui lòng nhập số điện thoại để Trạm liên hệ xác nhận");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Giỏ hàng của bạn đang trống");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          note,
          paymentMethod,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Không thể đặt hàng, vui lòng thử lại");
      }

      // Clear the cart
      clearCart();

      // If user chose Zalo or Messenger, show popup with copied message
      if (paymentMethod === "ZALO" || paymentMethod === "MESSENGER") {
        const socialMsg = `Trạm ơi, mình vừa đặt đơn hàng #${data.data.orderCode}:\n- Khách: ${customerName} (${phone})\n- Địa chỉ: ${address || "Nhận tại quán"}\n- Ghi chú: ${note || "Không có"}\n- Tổng tiền: ${formatVND(totalAmount)}\n- Món đã chọn:\n${items.map((i, idx) => `  ${idx + 1}. ${i.name} x${i.quantity} = ${formatVND(i.price * i.quantity)}`).join("\n")}`;
        
        try {
          await navigator.clipboard.writeText(socialMsg);
        } catch (e) {}

        setSocialModal({
          isOpen: true,
          channel: paymentMethod === "ZALO" ? "zalo" : "messenger",
          orderCode: data.data.orderCode,
          messageContent: socialMsg,
        });
        return;
      }

      // Redirect to Order Detail / Tracking page
      router.push(`/order/${data.data.orderCode}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Đã xảy ra lỗi khi tạo đơn hàng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-black text-maroon uppercase tracking-widest block mb-1">
          Giỏ Hàng & Thanh Toán
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-navy">
          Xác Nhận Đơn Hàng Của Bạn
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.06)] p-8 max-w-lg mx-auto">
          <ShoppingBag className="w-16 h-16 text-navy/20 mx-auto mb-4 stroke-1" />
          <h2 className="font-serif text-2xl font-black text-navy mb-2">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-sm text-muted mb-6">
            Hãy ghé qua thực đơn của Trạm để chọn những ly trà thanh mát, sữa hạt thơm lừng và bánh nướng hảo hạng nhé!
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-maroon hover:bg-maroon-dark text-white font-black text-sm uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 transition-all"
          >
            <span>Khám phá thực đơn ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Cart Items (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.06)] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-navy/10">
                <h3 className="font-serif text-lg font-black text-navy uppercase">
                  Món đã chọn ({totalCount})
                </h3>
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-muted hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tất cả</span>
                </button>
              </div>

              <div className="divide-y divide-navy/10 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-navy/20 bg-paper shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-navy text-base leading-snug truncate">
                        {item.name}
                      </h4>
                      {item.subCategory && (
                        <span className="text-xs font-semibold text-teal block truncate">
                          {item.subCategory}
                        </span>
                      )}
                      <div className="text-sm font-black text-maroon mt-1">
                        {formatVND(item.price)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border-2 border-navy rounded-xl bg-[#F6EFDF] overflow-hidden shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-navy/10 text-navy transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-black text-navy min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-navy/10 text-navy transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted hover:text-red-600 transition-colors"
                      title="Xóa món này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t-2 border-navy/10 flex items-center justify-between text-base font-extrabold text-navy">
                <span>Tạm tính ({totalCount} phần):</span>
                <span className="font-serif text-2xl font-black text-maroon">
                  {formatVND(totalAmount)}
                </span>
              </div>
            </div>

            <div className="bg-[#FFF2D5] rounded-2xl border-2 border-navy/30 p-4 text-xs font-bold text-navy/80 space-y-1">
              <p>📍 Giao hàng nhanh nội thành Đà Lạt trong vòng 20 - 40 phút.</p>
              <p>📞 Cần hỗ trợ gấp? Gọi ngay hotline: <a href="tel:0941668405" className="text-maroon underline font-black">0941 668 405</a></p>
            </div>
          </div>

          {/* RIGHT: Customer Form & Payment (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.08)] p-6 space-y-6">
              
              <h3 className="font-serif text-xl font-black text-navy uppercase border-b-2 border-navy/10 pb-3">
                Thông Tin Nhận Hàng
              </h3>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-300 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none transition-all"
                    />
                    <User className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1.5">
                    Số điện thoại nhận hàng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0912 345 678"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none transition-all"
                    />
                    <Phone className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1.5">
                    Địa chỉ giao hàng (hoặc ghi "Lấy tại quán")
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số nhà, tên đường hoặc khách sạn..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none transition-all"
                    />
                    <MapPin className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1.5">
                    Ghi chú đơn hàng (tuỳ chọn)
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ít ngọt, nhiều đá, giao lúc 10h..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F6EFDF]/40 border-2 border-navy/40 focus:border-navy focus:bg-white text-sm font-semibold text-navy outline-none transition-all resize-none"
                    />
                    <FileText className="w-4 h-4 text-navy/50 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-2">
                  <label className="block text-xs font-black uppercase text-navy mb-2">
                    Hình thức thanh toán
                  </label>
                  <div className="space-y-2">
                    
                    {/* VietQR */}
                    <label
                      onClick={() => setPaymentMethod("VIETQR")}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "VIETQR"
                          ? "border-navy bg-[#FFF2D5] shadow-xs font-bold"
                          : "border-navy/20 bg-white hover:bg-navy/5 text-navy/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "VIETQR"}
                        onChange={() => setPaymentMethod("VIETQR")}
                        className="text-maroon focus:ring-maroon"
                      />
                      <QrCode className="w-5 h-5 text-teal shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-black uppercase text-navy">
                          Quét mã VietQR (Tự động điền tiền)
                        </div>
                        <div className="text-[11px] text-muted">
                          Chuyển khoản qua App ngân hàng bất kỳ bằng QR
                        </div>
                      </div>
                    </label>

                    {/* COD */}
                    <label
                      onClick={() => setPaymentMethod("COD")}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "COD"
                          ? "border-navy bg-[#FFF2D5] shadow-xs font-bold"
                          : "border-navy/20 bg-white hover:bg-navy/5 text-navy/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="text-maroon focus:ring-maroon"
                      />
                      <Banknote className="w-5 h-5 text-mustard shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-black uppercase text-navy">
                          Tiền mặt khi nhận hàng (COD)
                        </div>
                        <div className="text-[11px] text-muted">
                          Thanh toán trực tiếp cho nhân viên giao hàng
                        </div>
                      </div>
                    </label>

                    {/* Zalo */}
                    <label
                      onClick={() => setPaymentMethod("ZALO")}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "ZALO"
                          ? "border-navy bg-[#FFF2D5] shadow-xs font-bold"
                          : "border-navy/20 bg-white hover:bg-navy/5 text-navy/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "ZALO"}
                        onChange={() => setPaymentMethod("ZALO")}
                        className="text-maroon focus:ring-maroon"
                      />
                      <MessageCircle className="w-5 h-5 text-[#006af5] shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-black uppercase text-navy">
                          Xác nhận & Gửi tin nhắn qua Zalo Trạm
                        </div>
                        <div className="text-[11px] text-muted">
                          Hệ thống tạo đơn và kết nối trực tiếp với Zalo quán
                        </div>
                      </div>
                    </label>

                    {/* Messenger Facebook */}
                    <label
                      onClick={() => setPaymentMethod("MESSENGER")}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "MESSENGER"
                          ? "border-navy bg-[#FFF2D5] shadow-xs font-bold"
                          : "border-navy/20 bg-white hover:bg-navy/5 text-navy/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "MESSENGER"}
                        onChange={() => setPaymentMethod("MESSENGER")}
                        className="text-maroon focus:ring-maroon"
                      />
                      <MessageCircle className="w-5 h-5 text-[#a855f7] shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-black uppercase text-navy">
                          Xác nhận & Gửi qua Messenger Facebook
                        </div>
                        <div className="text-[11px] text-muted">
                          Sao chép đơn hàng và mở tin nhắn Messenger cho Trạm
                        </div>
                      </div>
                    </label>

                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-maroon hover:bg-maroon-dark text-white font-black text-sm uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_2px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Đang xử lý đơn hàng...</span>
                    ) : (
                      <>
                        <span>Hoàn tất đặt hàng ({formatVND(totalAmount)})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      )}

      {/* Social Popup Modal for Zalo & Messenger */}
      <SocialOrderModal
        isOpen={socialModal.isOpen}
        channel={socialModal.channel}
        orderCode={socialModal.orderCode}
        messageContent={socialModal.messageContent}
        onClose={() => {
          setSocialModal((prev) => ({ ...prev, isOpen: false }));
          router.push(`/order/${socialModal.orderCode}`);
        }}
      />

    </div>
  );
}
