import React from "react";
import { db } from "@/lib/db";
import MenuClient from "./MenuClient";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const [products, categories] = await Promise.all([
    db.product.findMany({
      where: { isAvailable: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    db.category.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return <MenuClient initialProducts={products as any} categories={categories} />;
}
