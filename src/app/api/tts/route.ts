import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import https from "https";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const WebSocket = require("ws");

export const runtime = "nodejs";

const VI_VOICES = {
  female: "vi-VN-HoaiMyNeural",
  male: "vi-VN-NamMinhNeural",
};

const EN_VOICES = {
  female: "en-US-JennyNeural",
  male: "en-US-GuyNeural",
};

// ============================================================================
// Microsoft Edge Neural TTS v2 DRM (Sec-MS-GEC v2: CS64 + Custom SHA-256)
// Ported from rany2/edge-tts v7.3.0 to ensure 100% compatibility with
// Microsoft's updated Read Aloud WebSocket endpoint.
// ============================================================================
const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WIN_EPOCH = 11644473600;
const CHROMIUM_FULL_VERSION = "143.0.3650.75";
const SEC_MS_GEC_VERSION = `2-${CHROMIUM_FULL_VERSION}`;

const SHA256_INITIAL = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];
const SHA256_STATE = [
  0xfd9fbea2, 0x91243ce7, 0xbe499094, 0xcd2e1e0a,
  0x6c006f49, 0x04bd35ab, 0xfeb0a7e4, 0x03effbd2,
];
const SHA256_SCHEDULE = [
  0xeb24bf9e, 0x1558691f, 0xa0c09ee2, 0x0cfa32ba,
  0xa622ee8c, 0xd1dd9491, 0xc0dd25a0, 0xf9e70ab6,
  0xf0c31573, 0x7058ce4e, 0x7188e606, 0x00e5ab33,
  0xd258b060, 0x72766564,
];
const SHA256_ROUND_CONSTANTS = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
const SHA256_ADJUSTMENT = 0xc9dc06a7;
const SHA256_BLOCK_CONSTANTS = [
  ...SHA256_ROUND_CONSTANTS.slice(0, 14),
  SHA256_ADJUSTMENT,
  ...SHA256_ROUND_CONSTANTS.slice(15),
];
const SHA256_SIGMA0_ADJUSTMENT = 0x059c0b80;
const SHA256_SIGMA1_ADJUSTMENT = 0x000b92c0;

const CS64_COEFFICIENTS: [number, number][] = [
  [0xe82e91b1, 0xb32700d0],
  [0x44de24c6, 0x88dff51d],
  [0x3beb65bc, 0x29514038],
  [0xc89c5933, 0xb328cbdf],
  [0x8d1ec211, 0xd405b4d5],
  [0x314ef5d5, 0x26e55f3c],
  [0xe92491b1, 0x607801c6],
  [0xf0a5b9d5, 0x82b2c1fb],
  [0x06064cf3, 0xfa51a3da],
  [0xda79fa60, 0x207cc464],
  [0xbed20560, 0x3c3c74f3],
  [0x89f9c9f8, 0xd2d14b61],
  [0x35fa38c6, 0xbb04a2c1],
  [0xcb49e3c6, 0xc5626167],
];
const CS64_FACTOR = 0x82893933;
const CS64_ADJUSTMENT0 = 0xf2f90b1a;
const CS64_ADJUSTMENT1 = 0x0b1a0000;

function imul32(a: number, b: number): number {
  return Math.imul(a, b) >>> 0;
}
function rol16(v: number): number {
  const x = v >>> 0;
  return ((x << 16) | (x >>> 16)) >>> 0;
}
function rotr(v: number, n: number): number {
  const x = v >>> 0;
  return ((x >>> n) | (x << (32 - n))) >>> 0;
}
function sigma0(v: number): number {
  return (rotr(v, 7) ^ rotr(v, 18) ^ (v >>> 3)) >>> 0;
}
function sigma1(v: number): number {
  return (rotr(v, 17) ^ rotr(v, 19) ^ (v >>> 10)) >>> 0;
}

function sha256Rounds(state: number[], words: number[], firstRound = 0): number[] {
  let [a, b, c, d, e, f, g, h] = state;
  const constants = firstRound === 14 ? SHA256_BLOCK_CONSTANTS : SHA256_ROUND_CONSTANTS;
  for (let index = firstRound; index < 64; index++) {
    const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
    const ch = (g ^ (e & (f ^ g))) >>> 0;
    const t1 = (h + S1 + ch + constants[index] + words[index]) >>> 0;
    const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
    const maj = ((a & b) | (c & (a | b))) >>> 0;
    const t2 = (S0 + maj) >>> 0;

    h = g;
    g = f;
    f = e;
    e = (d + t1) >>> 0;
    d = c;
    c = b;
    b = a;
    a = (t1 + t2) >>> 0;
  }
  return [a, b, c, d, e, f, g, h];
}

function expandSha256Schedule(words: number[], firstWord = 16): void {
  for (let index = firstWord; index < 64; index++) {
    const s1 = sigma1(words[index - 2]);
    const s0 = sigma0(words[index - 15]);
    words.push((s1 + words[index - 7] + s0 + words[index - 16]) >>> 0);
  }
}

function sha256Init(data7: Buffer): number[] {
  const words = new Array<number>(14).fill(0);
  words.push(((data7[0] << 16) | (data7[1] << 8) | data7[2]) >>> 0);
  words.push(data7.readUInt32BE(3));

  for (let index = 16; index < 30; index++) {
    let value = SHA256_SCHEDULE[index - 16];
    if (index - 2 >= 14) {
      value =
        (value +
          (index === 16
            ? sigma1(words[index - 2]) ^ SHA256_SIGMA1_ADJUSTMENT
            : sigma1(words[index - 2]))) >>>
        0;
    }
    if (index - 7 >= 14) {
      value = (value + words[index - 7]) >>> 0;
    }
    if (index - 15 >= 14) {
      value =
        (value +
          (index === 29
            ? sigma0(words[index - 15]) ^ SHA256_SIGMA0_ADJUSTMENT
            : sigma0(words[index - 15]))) >>>
        0;
    }
    words.push(value >>> 0);
  }
  words.push(
    (sigma1(words[28]) +
      words[23] +
      sigma0(words[15]) +
      words[14] +
      SHA256_ADJUSTMENT -
      SHA256_ROUND_CONSTANTS[14]) >>>
      0
  );
  expandSha256Schedule(words, 31);
  const working = sha256Rounds(SHA256_STATE, words, 14);
  return SHA256_INITIAL.map((x, i) => (x + working[i]) >>> 0);
}

function sha256Digest(data: Buffer): Buffer {
  const length = 57 + data.length;
  const tail = data.subarray(7);
  const padZeroCount = (((55 - length) % 64) + 64) % 64;
  const padded = Buffer.alloc(tail.length + 1 + padZeroCount + 8);
  tail.copy(padded, 0);
  padded[tail.length] = 0x80;
  padded.writeBigUInt64BE(BigInt(length * 8), padded.length - 8);

  let state = sha256Init(data.subarray(0, 7));
  for (let offset = 0; offset < padded.length; offset += 64) {
    const words: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      words.push(padded.readUInt32BE(offset + i));
    }
    expandSha256Schedule(words, 16);
    const working = sha256Rounds(state, words, 0);
    state = state.map((x, i) => (x + working[i]) >>> 0);
  }
  const out = Buffer.alloc(32);
  for (let i = 0; i < 8; i++) {
    out.writeUInt32BE(state[i], i * 4);
  }
  return out;
}

function wordsLe4Even(data: Buffer): number[] {
  const rem = data.length % 4;
  const padLen = rem === 0 ? 0 : 4 - rem;
  const padded = Buffer.concat([data, Buffer.alloc(padLen)]);
  if (padded.length === 0) return [];
  const words: number[] = [];
  for (let i = 0; i < padded.length; i += 4) {
    words.push(padded.readUInt32LE(i));
  }
  if (words.length % 2 !== 0) {
    words.push(0);
  }
  return words;
}

function cs64Digest(data: Buffer, digest: Buffer): [number, number] {
  const keyA = (digest.readUInt32LE(0) | 1) >>> 0;
  const keyB = (digest.readUInt32LE(4) | 1) >>> 0;
  const factors = [imul32(keyA, CS64_FACTOR), imul32(keyB, CS64_FACTOR)];

  const terms = CS64_COEFFICIENTS.map(([coeff], idx) => imul32(coeff, factors[idx % 2]));
  const offsets = CS64_COEFFICIENTS.map(([, off]) => off >>> 0);

  const words = wordsLe4Even(Buffer.concat([Buffer.from([0]), data]));
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    let term = imul32(word, index % 2 === 0 ? keyA : keyB);
    let offset = imul32(rol16(word), index % 2 === 0 ? 0xef0569fb : 0xc31713db);
    if (index === 0) {
      term = (term + imul32(CS64_ADJUSTMENT0, factors[0])) >>> 0;
      offset = (offset + CS64_ADJUSTMENT1) >>> 0;
    }
    terms.push(term);
    offsets.push(offset);
  }

  let swapAcc = 0;
  let swapLast = 0;
  let state = 0;
  let acc = 0;
  for (let index = 0; index < terms.length; index += 2) {
    const x = terms[index];
    const y = terms[index + 1];
    let t = rol16((offsets[index] + x) >>> 0);
    let q = imul32(t, 0x76f50f34);
    swapAcc = (swapAcc + ((imul32(rol16(q), 0xc3efea97) + q) >>> 0)) >>> 0;

    t = rol16((offsets[index + 1] + y) >>> 0);
    q = imul32(t, 0x1881ce3c);
    swapLast = (imul32(rol16(q), 0x35bd1ec9) + q) >>> 0;
    swapAcc = (swapAcc + swapLast) >>> 0;

    state = (imul32(state, keyA) + x) >>> 0;
    state = imul32(rol16(state), 0xcf98b111);
    state = imul32(rol16(state), 0x87085b9f);
    state = imul32(rol16(state), 0x12ceb96d);
    state = imul32(rol16(state), 0x257e1d83);
    acc = (acc + state) >>> 0;

    t = (imul32(state, keyB) + y) >>> 0;
    t = imul32(rol16(t), 0xa27416f5);
    t = imul32(rol16(t), 0xd38396ff);
    state = imul32(rol16(imul32(rol16(t), 0x7c932b89)), 0xbfa49f69);
    acc = (acc + state) >>> 0;
  }
  return [(swapLast ^ state) >>> 0, (swapAcc ^ acc) >>> 0];
}

let clockSkewSeconds = 0;

function generateSecMsGecV2(unixTimestampSec: number): string {
  let ticks = unixTimestampSec + WIN_EPOCH;
  ticks -= ticks % 300;
  ticks *= 1e7;
  const strToHash = Buffer.from(`${ticks.toFixed(0)}${TRUSTED_CLIENT_TOKEN}`, "ascii");
  const digest = sha256Digest(strToHash);
  const [cs0, cs1] = cs64Digest(strToHash, digest);
  const csBuf = Buffer.alloc(8);
  csBuf.writeUInt32LE(cs0, 0);
  csBuf.writeUInt32LE(cs1, 4);
  return `${csBuf.toString("hex").toUpperCase()}-${digest.toString("hex").toUpperCase()}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function syncClockSkewFromBing(): Promise<void> {
  return new Promise((resolve) => {
    const req = https.get(
      `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=${TRUSTED_CLIENT_TOKEN}`,
      (res) => {
        res.resume();
        if (res.headers.date) {
          const serverSec = Math.floor(Date.parse(res.headers.date) / 1000);
          const localSec = Math.floor(Date.now() / 1000);
          clockSkewSeconds = serverSec - localSec;
        }
        resolve();
      }
    );
    req.on("error", () => resolve());
    req.setTimeout(3500, () => {
      req.destroy();
      resolve();
    });
  });
}

async function synthesizeWithEdgeV2(text: string, voice: string, isRetry = false): Promise<Buffer> {
  const nowSec = Math.floor(Date.now() / 1000) + clockSkewSeconds;
  const secMsGec = generateSecMsGecV2(nowSec);
  const reqId = crypto.randomUUID().replace(/-/g, "");
  const muid = crypto.randomBytes(16).toString("hex").toUpperCase();
  const xmlLang = voice.startsWith("vi-") ? "vi-VN" : "en-US";
  const escapedText = escapeXml(text);

  const wsUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}&ConnectionId=${reqId}`;

  return new Promise<Buffer>((resolve, reject) => {
    let settled = false;
    const finishResolve = (buf: Buffer) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(buf);
    };
    const finishReject = (err: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(err);
    };

    const timeout = setTimeout(() => {
      try {
        ws.close();
      } catch {}
      finishReject(new Error("Edge Neural TTS timeout after 15s"));
    }, 15000);

    const ws = new WebSocket(wsUrl, {
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        "User-Agent":
          `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROMIUM_FULL_VERSION.split(".")[0]}.0.0.0 Safari/537.36 Edg/${CHROMIUM_FULL_VERSION.split(".")[0]}.0.0.0`,
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: `muid=${muid};`,
      },
    });

    ws.on("unexpected-response", async (_req: any, resp: any) => {
      clearTimeout(timeout);
      if (!isRetry) {
        if (resp.headers.date) {
          const serverSec = Math.floor(Date.parse(resp.headers.date) / 1000);
          const localSec = Math.floor(Date.now() / 1000);
          clockSkewSeconds = serverSec - localSec;
        } else {
          await syncClockSkewFromBing();
        }
        try {
          const retryBuf = await synthesizeWithEdgeV2(text, voice, true);
          finishResolve(retryBuf);
        } catch (retryErr: any) {
          finishReject(retryErr);
        }
        return;
      }
      finishReject(new Error(`Edge TTS unexpected HTTP response: ${resp.statusCode}`));
    });

    ws.on("open", () => {
      const configMsg =
        `X-Timestamp:${new Date().toString()}\r\n` +
        `Content-Type:application/json; charset=utf-8\r\n` +
        `Path:speech.config\r\n\r\n` +
        `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      ws.send(configMsg);

      const ssml =
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${xmlLang}'>` +
        `<voice name='${voice}'>` +
        `<prosody pitch='+0Hz' rate='+0%' volume='+0%'>${escapedText}</prosody>` +
        `</voice></speak>`;

      const ssmlMsg =
        `X-RequestId:${reqId}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${new Date().toString()}Z\r\n` +
        `Path:ssml\r\n\r\n` +
        ssml;
      ws.send(ssmlMsg);
    });

    const chunks: Buffer[] = [];
    const headerMarker = Buffer.from("Path:audio\r\n");

    ws.on("message", (data: Buffer | string, isBinary: boolean) => {
      if (isBinary) {
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
        const idx = buf.indexOf(headerMarker);
        if (idx !== -1) {
          chunks.push(buf.subarray(idx + headerMarker.length));
        }
      } else {
        const textMsg = data.toString();
        if (textMsg.includes("Path:turn.end")) {
          try {
            ws.close();
          } catch {}
          const finalBuffer = Buffer.concat(chunks);
          if (finalBuffer.length === 0) {
            finishReject(new Error("Empty audio buffer returned by Edge Neural TTS"));
          } else {
            finishResolve(finalBuffer);
          }
        }
      }
    });

    ws.on("error", (err: any) => {
      finishReject(err instanceof Error ? err : new Error(String(err)));
    });
  });
}

// Module-level LRU cache so iOS Safari Range requests (bytes=0-1 then bytes=0-N)
// and repeat plays are served instantaneously in 0ms.
const AUDIO_CACHE = new Map<string, Buffer>();
const MAX_CACHE_ENTRIES = 25;

function getCachedOrSynthesize(cacheKey: string, text: string, voice: string): Promise<Buffer> {
  const existing = AUDIO_CACHE.get(cacheKey);
  if (existing) {
    return Promise.resolve(existing);
  }
  return synthesizeWithEdgeV2(text, voice).then((buf) => {
    if (AUDIO_CACHE.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = AUDIO_CACHE.keys().next().value;
      if (oldestKey) AUDIO_CACHE.delete(oldestKey);
    }
    AUDIO_CACHE.set(cacheKey, buf);
    return buf;
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const lang = searchParams.get("lang") || "vi";
  // Mặc định là giọng Nam Minh (male) theo yêu cầu của TS. Hoàng Xuân Chiến
  const gender = searchParams.get("gender") || "male";

  if (!text.trim()) {
    return new NextResponse("Text required", { status: 400 });
  }

  const safeText = text.slice(0, 2200).trim();
  const isVi = lang === "vi";
  const voice = isVi
    ? gender === "female"
      ? VI_VOICES.female
      : VI_VOICES.male
    : gender === "female"
    ? EN_VOICES.female
    : EN_VOICES.male;

  const cacheKey = `${voice}::${safeText}`;

  try {
    const audioBuffer = await getCachedOrSynthesize(cacheKey, safeText, voice);
    const totalLength = audioBuffer.length;
    const rangeHeader = req.headers.get("range");

    // Hỗ trợ đầy đủ HTTP 206 Partial Content cho iOS Safari & Mobile Chrome
    if (rangeHeader) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? Math.min(parseInt(match[2], 10), totalLength - 1) : totalLength - 1;
        if (start >= 0 && start < totalLength && start <= end) {
          const chunk = audioBuffer.subarray(start, end + 1);
          return new NextResponse(new Uint8Array(chunk), {
            status: 206,
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": chunk.length.toString(),
              "Content-Range": `bytes ${start}-${end}/${totalLength}`,
              "Accept-Ranges": "bytes",
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
              "X-TTS-Engine": "Azure-Neural-V2",
              "X-TTS-Voice": voice,
            },
          });
        }
      }
    }

    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": totalLength.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-TTS-Engine": "Azure-Neural-V2",
        "X-TTS-Voice": voice,
      },
    });
  } catch (err: any) {
    console.error("TTS Synthesis Error:", err);
    return new NextResponse(`TTS Synthesis Error: ${err.message}`, { status: 500 });
  }
}
