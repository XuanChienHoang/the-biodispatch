import { NextResponse } from "next/server";
import { verifyPin, createAdminSession, clearAdminSession, checkAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const authenticated = await checkAdminSession();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin || typeof pin !== "string") {
      return NextResponse.json({ error: "Vui lòng nhập mã PIN bảo mật." }, { status: 400 });
    }

    if (verifyPin(pin)) {
      await createAdminSession();
      return NextResponse.json({ success: true, message: "Xác thực thành công!" });
    } else {
      return NextResponse.json({ error: "Mã PIN không chính xác. Vui lòng thử lại." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi xử lý yêu cầu." }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: "Đã đăng xuất khỏi hệ thống." });
}
