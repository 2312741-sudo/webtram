import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const product = await db.product.update({
      where: { id: params.id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.categoryName && { categoryName: body.categoryName }),
        ...(body.subCategory !== undefined && { subCategory: body.subCategory }),
        ...(body.image && { image: body.image }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.multiPrice !== undefined && { multiPrice: body.multiPrice }),
        ...(body.isAvailable !== undefined && { isAvailable: Boolean(body.isAvailable) }),
        ...(body.isFeatured !== undefined && { isFeatured: Boolean(body.isFeatured) }),
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Đã xóa sản phẩm" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}
