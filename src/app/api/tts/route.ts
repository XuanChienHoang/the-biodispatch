import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function splitTextIntoChunks(text: string, maxLength = 140): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return [clean];

  const chunks: string[] = [];
  const sentences = clean.split(/(?<=[.!?:;,\n])\s+/);
  let current = "";

  for (const part of sentences) {
    if ((current + " " + part).trim().length <= maxLength) {
      current = (current + " " + part).trim();
    } else {
      if (current) chunks.push(current);
      if (part.length <= maxLength) {
        current = part;
      } else {
        const words = part.split(" ");
        let wordChunk = "";
        for (const w of words) {
          if ((wordChunk + " " + w).trim().length <= maxLength) {
            wordChunk = (wordChunk + " " + w).trim();
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = w;
          }
        }
        current = wordChunk;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function fetchChunk(chunk: string, lang: string): Promise<Buffer> {
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
  const res = await fetch(ttsUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
  });
  if (!res.ok) {
    throw new Error(`TTS fetch failed with status ${res.status}`);
  }
  const arrayBuf = await res.arrayBuffer();
  return Buffer.from(arrayBuf);
}

/**
 * Proxy stream âm thanh tiếng Việt chuẩn tự nhiên qua Google Neural TTS với cơ chế tự động chia đoạn và ghép MP3 buffer.
 * Giúp mọi thiết bị (kể cả Windows/iOS/Android không cài gói giọng đọc) đều nghe được giọng tiếng Việt tự nhiên 100%.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const lang = searchParams.get("lang") || "vi";

  if (!text.trim()) {
    return new NextResponse("Text required", { status: 400 });
  }

  // Giới hạn an toàn 1500 ký tự cho một bản tóm tắt âm thanh
  const safeText = text.slice(0, 1500);
  const chunks = splitTextIntoChunks(safeText, 140);

  try {
    const buffers = await Promise.all(chunks.map((c) => fetchChunk(c, lang)));
    const merged = Buffer.concat(buffers);

    return new NextResponse(merged, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": merged.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err: any) {
    console.error("TTS Route Error:", err);
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
}
