import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SESSION_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin session
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifyAdminToken(sessionToken);
    if (!session.valid) {
      return NextResponse.json(
        { success: false, error: "Bạn chưa đăng nhập tài khoản quản trị" },
        { status: 401 }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy file hình ảnh tải lên" },
        { status: 400 }
      );
    }

    // 3. Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!file.type.startsWith("image/") && !validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Định dạng file không hợp lệ. Vui lòng chọn ảnh JPG, PNG, WEBP hoặc GIF.",
        },
        { status: 400 }
      );
    }

    // 4. Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Kích thước ảnh vượt quá giới hạn 10MB" },
        { status: 400 }
      );
    }

    // 5. Read file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Generate safe filename
    const originalExt = path.extname(file.name) || ".png";
    const cleanExt = originalExt.toLowerCase();
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove Vietnamese diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 25);

    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const finalFilename = `upload_${uniqueSuffix}_${baseName || "product"}${cleanExt}`;

    // 7. Ensure directory exists in public/images/products
    const uploadDir = path.join(process.cwd(), "public", "images", "products");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // 8. Write file to disk
    const destPath = path.join(uploadDir, finalFilename);
    await fs.promises.writeFile(destPath, buffer);

    const publicUrl = `/images/products/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.size,
    });
  } catch (error: any) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi tải ảnh lên hệ thống: " + (error?.message || "Không xác định") },
      { status: 500 }
    );
  }
}
