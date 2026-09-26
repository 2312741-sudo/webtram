import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from "@/lib/defaultData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const search = searchParams.get("q")?.toLowerCase();
  const featured = searchParams.get("featured");

  try {
    const where: any = {
      isAvailable: true,
    };

    if (category && category !== "all") {
      where.categoryName = {
        contains: category,
      };
    }

    if (subCategory) {
      where.subCategory = subCategory;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { subCategory: { contains: search } },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    const categories = await db.category.findMany({
      orderBy: { order: "asc" },
    });

    if (products && products.length > 0) {
      return NextResponse.json({
        success: true,
        data: products,
        categories: categories.length > 0 ? categories : DEFAULT_CATEGORIES,
      });
    }
  } catch (error) {
    console.warn("GET /api/products database error, using default fallback:", error);
  }

  // Fallback filtering on DEFAULT_PRODUCTS
  let filtered = [...DEFAULT_PRODUCTS];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.categoryName.includes(category));
  }
  if (subCategory) {
    filtered = filtered.filter((p) => p.subCategory === subCategory);
  }
  if (featured === "true") {
    filtered = filtered.filter((p) => p.isFeatured);
  }
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.subCategory.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    categories: DEFAULT_CATEGORIES,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, categoryName, subCategory, price, image, description, multiPrice, isFeatured } = body;

    if (!name || !categoryName || !price) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ Tên, Danh mục và Giá" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name,
        categoryName,
        subCategory: subCategory || null,
        price: Number(price),
        image: image || "/images/products/trachanh.png",
        description: description || null,
        multiPrice: multiPrice || null,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể tạo sản phẩm mới" },
      { status: 500 }
    );
  }
}
