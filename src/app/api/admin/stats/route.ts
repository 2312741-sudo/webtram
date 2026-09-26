import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const totalOrders = await db.order.count();
    const pendingOrders = await db.order.count({ where: { status: "PENDING" } });
    const processingOrders = await db.order.count({
      where: { status: { in: ["CONFIRMED", "PREPARING", "DELIVERING"] } },
    });
    const completedOrders = await db.order.count({ where: { status: "COMPLETED" } });

    // Calculate total revenue from completed orders
    const completed = await db.order.findMany({
      where: { status: "COMPLETED" },
      select: { totalPrice: true },
    });
    const totalRevenue = completed.reduce((sum, o) => sum + o.totalPrice, 0);

    const totalProducts = await db.product.count();

    // Latest 5 orders
    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        totalRevenue,
        totalProducts,
        recentOrders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể thống kê dữ liệu" },
      { status: 500 }
    );
  }
}
