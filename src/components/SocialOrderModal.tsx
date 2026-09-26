"use client";

import React, { useState } from "react";
import { X, Copy, Check, MessageCircle, ExternalLink, ArrowRight } from "lucide-react";
import {
  MESSENGER_DIRECT_URL,
  MESSENGER_SHORT_URL,
  FACEBOOK_PAGE_URL,
  ZALO_URL,
} from "@/lib/utils";

interface SocialOrderModalProps {
  isOpen: boolean;
  channel: "zalo" | "messenger";
  orderCode: string;
  messageContent: string;
  onClose: () => void;
}

export default function SocialOrderModal({
  isOpen,
  channel,
  orderCode,
  messageContent,
  onClose,
}: SocialOrderModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isMessenger = channel === "messenger";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl border-2 border-navy shadow-[0_20px_50px_rgba(45,42,74,0.3)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div
          className={`p-5 flex items-center justify-between text-white border-b-2 border-navy ${
            isMessenger
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              : "bg-[#006af5]"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-serif font-black text-lg uppercase tracking-wide">
              {isMessenger ? "Gửi Đơn Qua Messenger" : "Gửi Đơn Qua Zalo"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Guide */}
        <div className="p-6 space-y-4">
          <div className="bg-[#FFF2D5] rounded-2xl p-4 border border-navy/20 text-xs font-bold text-navy space-y-2">
            <div className="flex items-center gap-2 text-maroon font-black uppercase">
              <span>Đơn hàng #{orderCode} đã được tạo thành công!</span>
            </div>
            <div className="text-muted leading-relaxed">
              1️⃣ Bấm nút <strong>"Copy nội dung"</strong> bên dưới.<br />
              2️⃣ Bấm <strong>"Mở Messenger"</strong> và dán (Paste) vào khung chat gửi cho Trạm.
            </div>
          </div>

          {/* Textarea preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-navy">
              <span>Nội dung tin nhắn:</span>
              <button
                onClick={handleCopy}
                className="text-maroon hover:underline flex items-center gap-1 font-bold text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã copy!" : "Copy nội dung"}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={messageContent}
              onClick={handleCopy}
              className="w-full p-3 rounded-xl bg-[#F6EFDF]/60 border-2 border-navy/30 text-xs font-mono text-navy focus:outline-none cursor-pointer"
            />
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-2">
            {isMessenger ? (
              <>
                {/* Primary: Direct Facebook Messages */}
                <a
                  href={MESSENGER_DIRECT_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCopy}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>1. Mở Chat Messenger Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Secondary Fallback 1: Short link m.me */}
                <div className="flex gap-2">
                  <a
                    href={MESSENGER_SHORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleCopy}
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-navy/5 text-navy font-bold text-xs rounded-xl border-2 border-navy/40 flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <span>Mở link m.me</span>
                    <ExternalLink className="w-3 h-3 text-muted" />
                  </a>

                  {/* Secondary Fallback 2: Fanpage */}
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-navy/5 text-navy font-bold text-xs rounded-xl border-2 border-navy/40 flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <span>Xem Fanpage Trạm</span>
                    <ExternalLink className="w-3 h-3 text-muted" />
                  </a>
                </div>
              </>
            ) : (
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleCopy}
                className="w-full py-3.5 px-4 bg-[#006af5] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Mở Zalo Gửi Tin Nhắn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs font-bold text-muted hover:text-navy transition-colors"
            >
              Đóng cửa sổ này
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
