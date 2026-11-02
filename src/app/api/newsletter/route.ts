import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { rateLimit } from "@/lib/rateLimit";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "content/subscribers.json");

// RFC 5322 compliant regex for safe email validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  // Rate limiting: 5 subscriptions per hour per IP to prevent spamming/disk exhaustion
  const limiter = rateLimit(req, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
    keyPrefix: "newsletter_sub",
  });

  if (!limiter.success) {
    const minutes = Math.ceil(limiter.resetMs / 60000);
    return NextResponse.json(
      { error: `Quá nhiều lượt đăng ký từ mạng của bạn. Vui lòng thử lại sau ${minutes} phút.` },
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
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    if (
      !email ||
      typeof email !== "string" ||
      email.length > 254 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Địa chỉ email không hợp lệ hoặc vượt quá độ dài quy định." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
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
      return NextResponse.json(
        { message: "Email này đã được đăng ký nhận bản tin trước đó." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    });

    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Đăng ký nhận bản tin thành công!" },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json(
      { error: `Lỗi hệ thống: ${errorMsg}` },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
