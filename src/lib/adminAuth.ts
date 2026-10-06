import { cookies } from "next/headers";
import crypto from "crypto";

const DEFAULT_PIN = "2026";
const COOKIE_NAME = "biodispatch_admin_session";

function getExpectedToken(): string {
  const pin = process.env.ADMIN_PIN || DEFAULT_PIN;
  // Deterministic token based on secret PIN
  return crypto.createHash("sha256").update(`biodispatch-admin-${pin}`).digest("hex");
}

export function verifyPin(inputPin: string): boolean {
  const actualPin = process.env.ADMIN_PIN || DEFAULT_PIN;
  return inputPin.trim() === actualPin.trim();
}

export async function createAdminSession(): Promise<string> {
  const token = getExpectedToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return token === getExpectedToken();
  } catch {
    return false;
  }
}
