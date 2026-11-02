import { NextResponse } from "next/server";
import { verifyPin, createAdminSession, clearAdminSession, checkAdminSession } from "@/lib/adminAuth";
import { rateLimit } from "@/lib/rateLimit";

export async function GET() {
  const authenticated = await checkAdminSession();
  return NextResponse.json({ authenticated }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  // Rate limiting: 5 attempts per 15 minutes per IP
  const limiter = rateLimit(request, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
    keyPrefix: "admin_auth",
  });

  if (!limiter.success) {
    const minutesLeft = Math.ceil(limiter.resetMs / 60000);
    return NextResponse.json(
      {
        error: `Quá nhiều lần thử không thành công. Nhằm bảo vệ hệ thống, tài khoản tạm thời bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(limiter.resetMs / 1000).toString(),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { pin } = body;

    if (!pin || typeof pin !== "string" || pin.trim().length === 0) {
      return NextResponse.json(
        { error: "Vui lòng nhập mã PIN bảo mật." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (verifyPin(pin)) {
      await createAdminSession();
      return NextResponse.json(
        { success: true, message: "Xác thực thành công!" },
        { headers: { "Cache-Control": "no-store" } }
      );
    } else {
      return NextResponse.json(
        {
          error: `Mã PIN không chính xác. Bạn còn ${limiter.remaining} lần thử trước khi bị tạm khóa.`,
        },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Lỗi xử lý yêu cầu xác thực." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json(
    { success: true, message: "Đã đăng xuất an toàn khỏi hệ thống." },
    { headers: { "Cache-Control": "no-store" } }
  );
}
