import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateOrderCode } from "@/lib/utils";
import { getVietQRUrl } from "@/lib/vietqr";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    const orders = await db.order.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể lấy danh sách đơn hàng" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phone, address, note, items, paymentMethod = "VIETQR" } = body;

    if (!customerName || !phone) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên và số điện thoại nhận hàng" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Giỏ hàng của bạn đang trống" },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = items.reduce(
      (sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );

    const orderCode = generateOrderCode();

    const order = await db.order.create({
      data: {
        orderCode,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address ? address.trim() : null,
        note: note ? note.trim() : null,
        totalPrice,
        paymentMethod,
        status: "PENDING",
        isPaid: false,
        items: {
          create: items.map((item: any) => ({
            productId: item.id || null,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity) || 1,
            subCategory: item.subCategory || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    const vietQrUrl = getVietQRUrl({
      amount: totalPrice,
      orderCode: order.orderCode,
      customerName: order.customerName,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        vietQrUrl,
      },
    });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể khởi tạo đơn hàng" },
      { status: 500 }
    );
  }
}
