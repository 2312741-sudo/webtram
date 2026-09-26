import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  QrCode,
  Copy,
  Phone,
  MessageCircle,
  ArrowLeft,
  Package,
} from "lucide-react";
import { db } from "@/lib/db";
import { formatVND, ORDER_STATUS_MAP } from "@/lib/utils";
import { getVietQRUrl } from "@/lib/vietqr";
import OrderTrackingClient from "./OrderTrackingClient";

export const dynamic = "force-dynamic";

interface OrderPageProps {
  params: { id: string };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const order = await db.order.findFirst({
    where: {
      OR: [{ id: params.id }, { orderCode: params.id }],
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  const vietQrUrl = getVietQRUrl({
    amount: order.totalPrice,
    orderCode: order.orderCode,
    customerName: order.customerName,
  });

  return (
    <OrderTrackingClient
      order={JSON.parse(JSON.stringify(order))}
      vietQrUrl={vietQrUrl}
    />
  );
}
