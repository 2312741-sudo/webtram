import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trạm — Luôn tươi ngon vì sức khỏe | Đà Lạt",
  description: "Trà trái cây tự nhiên, Sữa hạt tươi nguyên chất & Bánh nướng hảo hạng tại Đà Lạt. Đặt hàng trực tuyến, giao tận nơi nhanh chóng.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-mustard selection:text-navy">
        {children}
      </body>
    </html>
  );
}
