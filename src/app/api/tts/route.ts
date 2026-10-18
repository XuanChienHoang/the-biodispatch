import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const runtime = "nodejs";

const VI_VOICES = {
  female: "vi-VN-HoaiMyNeural",
  male: "vi-VN-NamMinhNeural",
};

const EN_VOICES = {
  female: "en-US-EmmaNeural",
  male: "en-US-AndrewNeural",
};

/**
 * Tổng hợp giọng đọc Neural đời mới chất lượng cao với ngữ điệu tự nhiên, nhấn nhá như người thật.
 * Sử dụng Microsoft Azure Neural Voice (vi-VN-HoaiMyNeural và vi-VN-NamMinhNeural).
 * Tự động dự phòng sang Google TTS nếu có gián đoạn kết nối.
 */
async function synthesizeWithEdge(text: string, voice: string): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Edge Neural TTS timeout after 15s"));
    }, 15000);

    const { audioStream } = tts.toStream(text);
    const chunks: Buffer[] = [];
    audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
    audioStream.on("end", () => {
      clearTimeout(timeout);
      resolve(Buffer.concat(chunks));
    });
    audioStream.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// Fallback Google Translate TTS nếu xảy ra lỗi kết nối
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

async function fetchGoogleChunk(chunk: string, lang: string): Promise<Buffer> {
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
  const res = await fetch(ttsUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
  });
  if (!res.ok) throw new Error(`Google TTS status ${res.status}`);
  const arrayBuf = await res.arrayBuffer();
  return Buffer.from(arrayBuf);
}

async function synthesizeWithGoogle(text: string, lang: string): Promise<Buffer> {
  const chunks = splitTextIntoChunks(text, 140);
  const buffers = await Promise.all(chunks.map((c) => fetchGoogleChunk(c, lang)));
  return Buffer.concat(buffers);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const lang = searchParams.get("lang") || "vi";
  const gender = searchParams.get("gender") || "female"; // 'female' | 'male'

  if (!text.trim()) {
    return new NextResponse("Text required", { status: 400 });
  }

  const safeText = text.slice(0, 2000).trim();

  // Xác định giọng đọc Neural đời mới nhất
  const isVi = lang === "vi";
  const voice = isVi
    ? gender === "male"
      ? VI_VOICES.male
      : VI_VOICES.female
    : gender === "male"
    ? EN_VOICES.male
    : EN_VOICES.female;

  try {
    // 1. Giọng Neural AI đời mới nhất (Azure Neural Model)
    const audioBuffer = await synthesizeWithEdge(safeText, voice);
    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-TTS-Engine": "Azure-Neural",
      },
    });
  } catch (err: any) {
    console.warn("Edge Neural TTS failed, fallback to Google TTS:", err.message);
    try {
      const fallbackBuffer = await synthesizeWithGoogle(safeText, lang);
      return new NextResponse(new Uint8Array(fallbackBuffer), {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": fallbackBuffer.length.toString(),
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "X-TTS-Engine": "Google-Fallback",
        },
      });
    } catch (fallbackErr: any) {
      return new NextResponse(`Error: ${fallbackErr.message}`, { status: 500 });
    }
  }
}
