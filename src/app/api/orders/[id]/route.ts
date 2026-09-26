import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getVietQRUrl } from "@/lib/vietqr";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idOrCode = params.id;
    const order = await db.order.findFirst({
      where: {
        OR: [{ id: idOrCode }, { orderCode: idOrCode }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    const vietQrUrl = getVietQRUrl({
      amount: order.totalPrice,
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
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi tìm đơn hàng" },
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
    const { status, isPaid } = body;

    const updated = await db.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(isPaid !== undefined && { isPaid: Boolean(isPaid) }),
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật đơn hàng" },
      { status: 500 }
    );
  }
}
