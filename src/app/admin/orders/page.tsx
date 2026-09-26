import React from "react";
import { db } from "@/lib/db";
import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  try {
    orders = await db.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.warn("Could not query DB on AdminOrdersPage:", error);
  }

  return <AdminOrdersClient initialOrders={JSON.parse(JSON.stringify(orders))} />;
}
