/**
 * Reader Brief & Practical Guide — lớp "dễ tiêu hóa" cho độc giả đại chúng (v2, Giai đoạn 1).
 *
 * Dữ liệu nằm trong frontmatter của từng bài .md:
 *
 *   brief:
 *     bottomLine: "Một câu kết luận dễ hiểu"
 *     evidence: "human-rct"
 *     takeaways:
 *       - "Ý chính 1"
 *       - "Ý chính 2"
 *       - "Ý chính 3"
 *   practical:
 *     steps: ["Việc nên làm 1", "Việc nên làm 2"]
 *     avoidIf: ["Ai cần thận trọng"]
 *     interactions: ["Tương tác thuốc"]
 *     seeDoctor: "Khi nào nên hỏi bác sĩ"
 *
 * Mọi trường đều tùy chọn. Bài thiếu dữ liệu sẽ không hiện hộp tương ứng (không dựng nội dung giả).
 */

export type EvidenceLevel =
  | "human-rct"
  | "human-observational"
  | "mixed"
  | "animal"
  | "in-vitro"
  | "review";

export interface ReaderBrief {
  bottomLine?: string;
  takeaways: string[];
  evidence?: EvidenceLevel;
}

export interface PracticalGuide {
  steps: string[];
  avoidIf: string[];
  interactions: string[];
  seeDoctor?: string;
}

const EVIDENCE_LEVELS: EvidenceLevel[] = [
  "human-rct",
  "human-observational",
  "mixed",
  "animal",
  "in-vitro",
  "review",
];

/** Nhãn + mô tả mức độ bằng chứng, xếp theo độ mạnh giảm dần. */
export const EVIDENCE_META: Record<
  EvidenceLevel,
  { vi: string; en: string; hintVi: string; hintEn: string; strength: 1 | 2 | 3 | 4 }
> = {
  "human-rct": {
    vi: "Thử nghiệm trên người (RCT)",
    en: "Human trials (RCT)",
    hintVi: "Có thử nghiệm ngẫu nhiên có đối chứng trên người — mức bằng chứng mạnh.",
    hintEn: "Supported by randomized controlled trials in humans — strong evidence.",
    strength: 4,
  },
  "human-observational": {
    vi: "Nghiên cứu quan sát trên người",
    en: "Human observational data",
    hintVi: "Dữ liệu từ quần thể người, cho thấy mối liên quan nhưng chưa chứng minh nhân quả.",
    hintEn: "Population data in humans — shows association, not proven causation.",
    strength: 3,
  },
  mixed: {
    vi: "Bằng chứng hỗn hợp",
    en: "Mixed evidence",
    hintVi: "Kết hợp dữ liệu trên người với nghiên cứu cơ chế ở động vật hoặc tế bào.",
    hintEn: "Human data combined with mechanistic animal or cell studies.",
    strength: 3,
  },
  review: {
    vi: "Tổng quan y văn",
    en: "Literature review",
    hintVi: "Tổng hợp từ các bài tổng quan; mức độ chắc chắn phụ thuộc vào nghiên cứu gốc.",
    hintEn: "Synthesized from reviews; certainty depends on the underlying studies.",
    strength: 2,
  },
  animal: {
    vi: "Chủ yếu trên động vật",
    en: "Mostly animal studies",
    hintVi: "Kết quả chủ yếu từ động vật; chưa chắc đã đúng ở người.",
    hintEn: "Mostly from animal models; may not translate to humans.",
    strength: 2,
  },
  "in-vitro": {
    vi: "Chủ yếu trong ống nghiệm",
    en: "Mostly in vitro",
    hintVi: "Kết quả từ tế bào trong phòng thí nghiệm; còn xa mới áp dụng được cho người.",
    hintEn: "Cell-culture findings; far from proven in people.",
    strength: 1,
  },
};

function cleanString(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length > 0 ? s : undefined;
}

function cleanList(v: unknown, max = 6): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map(cleanString)
    .filter((s): s is string => Boolean(s))
    .slice(0, max);
}

export function parseReaderBrief(raw: unknown): ReaderBrief | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const takeaways = cleanList(r.takeaways, 4);
  const bottomLine = cleanString(r.bottomLine);
  if (takeaways.length === 0 && !bottomLine) return undefined;
  const ev = cleanString(r.evidence) as EvidenceLevel | undefined;
  return {
    bottomLine,
    takeaways,
    evidence: ev && EVIDENCE_LEVELS.includes(ev) ? ev : undefined,
  };
}

export function parsePracticalGuide(raw: unknown): PracticalGuide | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const guide: PracticalGuide = {
    steps: cleanList(r.steps, 5),
    avoidIf: cleanList(r.avoidIf, 5),
    interactions: cleanList(r.interactions, 5),
    seeDoctor: cleanString(r.seeDoctor),
  };
  const empty =
    guide.steps.length === 0 &&
    guide.avoidIf.length === 0 &&
    guide.interactions.length === 0 &&
    !guide.seeDoctor;
  return empty ? undefined : guide;
}

/* ------------------------------------------------------------------ */
/*  Chia nhỏ "bức tường chữ" lúc hiển thị (không sửa file gốc).         */
/* ------------------------------------------------------------------ */

/** Từ viết tắt kết thúc bằng dấu chấm nhưng KHÔNG phải hết câu. */
const ABBREVIATIONS = [
  "TS", "PGS", "GS", "ThS", "BS", "Dr", "Prof", "Mr", "Ms", "Mrs", "St", "vs", "etc",
  "e.g", "i.e", "al", "Fig", "No", "approx", "ca", "cf", "Tp", "Q", "tr",
];

const ABBR_RE = new RegExp(`(?:^|[\\s(])(?:${ABBREVIATIONS.map((a) => a.replace(/\./g, "\\.")).join("|")})\\.$`, "u");
/** Chữ viết tắt một ký tự in hoa, ví dụ "Y. pestis", "E. coli". */
const INITIAL_RE = /(?:^|[\s(])\p{Lu}\.$/u;
/** Số thứ tự kiểu "1." hoặc số thập phân bị cắt. */
const NUMBER_RE = /(?:^|\s)\d{1,3}\.$/u;

/** Tách câu: sau . ! ? … và trước chữ in hoa / dấu mở ngoặc kép. */
export function splitSentences(text: string): string[] {
  const rough = text.split(/(?<=[.!?…])\s+(?=["“(«]?\p{Lu})/u);
  const out: string[] = [];
  for (const piece of rough) {
    const prev = out[out.length - 1];
    if (prev && (ABBR_RE.test(prev) || INITIAL_RE.test(prev) || NUMBER_RE.test(prev))) {
      out[out.length - 1] = `${prev} ${piece}`;
    } else {
      out.push(piece);
    }
  }
  return out;
}

/**
 * Gom câu thành các đoạn ngắn (~360 ký tự) để dễ đọc trên điện thoại.
 * Đoạn ngắn hơn `minLength` được giữ nguyên.
 */
export function chunkParagraph(text: string, target = 360, minLength = 560): string[] {
  if (text.length < minLength) return [text];
  const sentences = splitSentences(text);
  if (sentences.length < 3) return [text];

  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    if (buf && buf.length + s.length + 1 > target) {
      chunks.push(buf);
      buf = s;
    } else {
      buf = buf ? `${buf} ${s}` : s;
    }
  }
  if (buf) {
    // Không để lại một câu cụt quá ngắn ở cuối
    if (chunks.length > 0 && buf.length < 120) chunks[chunks.length - 1] += ` ${buf}`;
    else chunks.push(buf);
  }
  return chunks;
}
