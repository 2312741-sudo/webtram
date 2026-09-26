import React from "react";
import { db } from "@/lib/db";
import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <AdminOrdersClient initialOrders={JSON.parse(JSON.stringify(orders))} />;
}
