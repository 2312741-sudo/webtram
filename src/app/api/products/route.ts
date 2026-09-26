import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const search = searchParams.get("q");
    const featured = searchParams.get("featured");

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

    return NextResponse.json({
      success: true,
      data: products,
      categories,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
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
