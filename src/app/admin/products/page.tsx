import React from "react";
import { db } from "@/lib/db";
import AdminProductsClient from "./AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    db.product.findMany({
      orderBy: [{ categoryName: "asc" }, { createdAt: "desc" }],
    }),
    db.category.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <AdminProductsClient
      initialProducts={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
