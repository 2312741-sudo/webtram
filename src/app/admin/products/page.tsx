import React from "react";
import { db } from "@/lib/db";
import AdminProductsClient from "./AdminProductsClient";
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from "@/lib/defaultData";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [dbProducts, dbCategories] = await Promise.all([
      db.product.findMany({
        orderBy: [{ categoryName: "asc" }, { createdAt: "desc" }],
      }),
      db.category.findMany({
        orderBy: { order: "asc" },
      }),
    ]);
    if (dbProducts && dbProducts.length > 0) products = dbProducts;
    if (dbCategories && dbCategories.length > 0) categories = dbCategories;
  } catch (error) {
    console.warn("Could not query DB on AdminProductsPage, falling back to default:", error);
  }

  if (products.length === 0) products = DEFAULT_PRODUCTS;
  if (categories.length === 0) categories = DEFAULT_CATEGORIES;

  return (
    <AdminProductsClient
      initialProducts={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
