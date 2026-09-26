import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";
import FloatingSpeedDial from "@/components/FloatingSpeedDial";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-mustard selection:text-navy">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CartToast />
      <FloatingSpeedDial />
    </div>
  );
}
