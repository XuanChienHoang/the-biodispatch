import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const runtime = "nodejs";

const VI_VOICES = {
  female: "vi-VN-HoaiMyNeural",
  male: "vi-VN-NamMinhNeural",
};

const EN_VOICES = {
  female: "en-US-JennyNeural",
  male: "en-US-GuyNeural",
};

/**
 * Tổng hợp giọng đọc Neural AI thế hệ mới (Microsoft Azure Neural Voices).
 * Mang lại giọng đọc tự nhiên, chuẩn phát thanh viên, có nhấn nhá và ngắt nghỉ tự nhiên.
 * Tuyệt đối không sử dụng công nghệ Google TTS cũ.
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const lang = searchParams.get("lang") || "vi";
  const gender = searchParams.get("gender") || "female"; // 'female' | 'male'

  if (!text.trim()) {
    return new NextResponse("Text required", { status: 400 });
  }

  const safeText = text.slice(0, 2500).trim();

  // Xác định giọng đọc Neural AI chuẩn theo ngôn ngữ và giới tính
  const isVi = lang === "vi";
  const voice = isVi
    ? gender === "male"
      ? VI_VOICES.male
      : VI_VOICES.female
    : gender === "male"
    ? EN_VOICES.male
    : EN_VOICES.female;

  try {
    const audioBuffer = await synthesizeWithEdge(safeText, voice);
    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-TTS-Engine": "Azure-Neural",
        "X-TTS-Voice": voice,
      },
    });
  } catch (err: any) {
    console.error("TTS Synthesis Error:", err);
    return new NextResponse(`TTS Synthesis Error: ${err.message}`, { status: 500 });
  }
}
