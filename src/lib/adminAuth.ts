import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "biodispatch_admin_session";

function getExpectedToken(): string | null {
  const pin = process.env.ADMIN_PIN || (process.env.NODE_ENV === "development" ? "admin123456" : null);
  if (!pin) return null;
  // Deterministic secret hash based on PIN with salt
  return crypto.createHash("sha256").update(`biodispatch-admin-session-v2-${pin}`).digest("hex");
}

/**
 * Constant-time PIN verification to eliminate timing attacks.
 */
export function verifyPin(inputPin: string): boolean {
  if (!inputPin || typeof inputPin !== "string") return false;

  const actualPin = process.env.ADMIN_PIN;
  if (!actualPin) {
    if (process.env.NODE_ENV === "development") {
      const devPin = "admin123456";
      const hInput = crypto.createHash("sha256").update(inputPin.trim()).digest();
      const hDev = crypto.createHash("sha256").update(devPin).digest();
      return crypto.timingSafeEqual(hInput, hDev);
    }
    console.error("[CRITICAL SECURITY ALERT] ADMIN_PIN environment variable is not defined!");
    return false;
  }

  // Hash both inputs to 32-byte buffers to avoid length leakage, then timingSafeEqual
  const hInput = crypto.createHash("sha256").update(inputPin.trim()).digest();
  const hActual = crypto.createHash("sha256").update(actualPin.trim()).digest();
  return crypto.timingSafeEqual(hInput, hActual);
}

export async function createAdminSession(): Promise<string | null> {
  const token = getExpectedToken();
  if (!token) {
    throw new Error("Không thể khởi tạo phiên làm việc do thiếu cấu hình bảo mật ADMIN_PIN.");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days (reduced from 30 days for better security)
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const expected = getExpectedToken();
    if (!expected) return false;

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const hToken = crypto.createHash("sha256").update(token).digest();
    const hExpected = crypto.createHash("sha256").update(expected).digest();
    return crypto.timingSafeEqual(hToken, hExpected);
  } catch {
    return false;
  }
}
