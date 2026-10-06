import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Stores subscriber emails locally in JSON file (or bridges to external API like Buttondown/Resend)
const SUBSCRIBERS_FILE = path.join(process.cwd(), "content/subscribers.json");

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Địa chỉ email không hợp lệ." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check directory and ensure subscribers file exists
    const dir = path.dirname(SUBSCRIBERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let subscribers: { email: string; subscribedAt: string }[] = [];
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      try {
        const fileData = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
        subscribers = JSON.parse(fileData);
      } catch {
        subscribers = [];
      }
    }

    const exists = subscribers.some((s) => s.email === cleanEmail);
    if (exists) {
      return NextResponse.json({ message: "Email này đã được đăng ký trước đó." }, { status: 200 });
    }

    subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    });

    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Đăng ký thành công!" }, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json({ error: `Lỗi hệ thống: ${errorMsg}` }, { status: 500 });
  }
}
