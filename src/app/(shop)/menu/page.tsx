import React from "react";
import { db } from "@/lib/db";
import MenuClient from "./MenuClient";
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from "@/lib/defaultData";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [dbProducts, dbCategories] = await Promise.all([
      db.product.findMany({
        where: { isAvailable: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
      db.category.findMany({
        orderBy: { order: "asc" },
      }),
    ]);

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
    }
    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories;
    }
  } catch (error) {
    console.warn("Database query failed on /menu, using default data fallback:", error);
  }

  // Fallback if database is down, not yet seeded, or returns empty
  if (products.length === 0) {
    products = DEFAULT_PRODUCTS;
  }
  if (categories.length === 0) {
    categories = DEFAULT_CATEGORIES;
  }

  return (
    <MenuClient
      initialProducts={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
