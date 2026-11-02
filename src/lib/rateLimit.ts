/**
 * In-memory sliding-window rate limiter for Next.js API Routes.
 * Fully self-contained, high-performance, and resilient against memory leaks.
 */

interface RateLimitRecord {
  timestamps: number[];
}

// Global in-memory storage keyed by "prefix:identifier"
const memoryStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 5 minutes to purge stale keys and protect memory
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function purgeStale(maxAgeMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of memoryStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < maxAgeMs);
    if (validTimestamps.length === 0) {
      memoryStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Safely extracts client IP address from standard reverse-proxy headers (Vercel, Cloudflare, AWS).
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  
  // Vercel / Cloudflare standard headers
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Return first IP (client), strip extra whitespace
    const firstIp = xForwardedFor.split(",")[0];
    if (firstIp) return firstIp.trim();
  }

  return "127.0.0.1";
}

export interface RateLimitOptions {
  limit: number;      // Maximum allowed requests in window
  windowMs: number;   // Window duration in milliseconds
  keyPrefix?: string; // Optional namespace prefix (e.g. "auth", "newsletter")
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

/**
 * Checks and updates rate limit counter for a given client identifier.
 */
export function rateLimit(
  req: Request,
  options: RateLimitOptions
): RateLimitResult {
  const { limit, windowMs, keyPrefix = "default" } = options;
  const ip = getClientIp(req);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();

  // Trigger non-blocking cleanup check
  purgeStale(windowMs * 2);

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0] || now;
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return {
      success: false,
      limit,
      remaining: 0,
      resetMs,
    };
  }

  // Allow request and record timestamp
  record.timestamps.push(now);

  const oldest = record.timestamps[0];
  const resetMs = Math.max(0, windowMs - (now - oldest));

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.timestamps.length),
    resetMs,
  };
}

