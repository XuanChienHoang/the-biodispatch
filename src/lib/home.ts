import type { Article, Organ } from "@/lib/content";

export type Lang = "vi" | "en";

/** Số bài ở khối tiêu điểm (1 bài lớn + 3 bài nhỏ). Kho bài bên dưới bỏ qua các bài này khi chưa lọc. */
export const SPOTLIGHT_COUNT = 4;

export const ORGAN_VI: Record<Organ, string> = {
  Gut: "Đường ruột",
  Heart: "Tim mạch",
  Immune: "Miễn dịch",
  "Cellular Aging": "Lão hóa Tế bào",
  Metabolic: "Chuyển hóa",
  Brain: "Não bộ",
};

/** Màu nhấn theo hệ cơ quan, dùng cho chấm màu trên ảnh và viền thẻ. */
export const ORGAN_ACCENT: Record<Organ, string> = {
  Gut: "#10B981",
  Heart: "#F43F5E",
  Immune: "#F59E0B",
  "Cellular Aging": "#A78BFA",
  Metabolic: "#00F2FE",
  Brain: "#38BDF8",
};

/**
 * Các cặp bài song ngữ không theo quy ước hậu tố -vi / -en.
 * Bài mới nên đặt tên <slug>-vi và <slug>-en để tự được ghép cặp.
 */
const TWIN_ROOT: Record<string, string> = {
  "chuyen-hoa-mo-nau-ucp1-ro-ri-proton": "brown-fat-ucp1-mitochondrial-proton-leak",
  "brown-fat-ucp1-mitochondrial-proton-leak": "brown-fat-ucp1-mitochondrial-proton-leak",
  "succinate-ucp1-bat-sinh-nhiet-ty-the": "succinate-ucp1-bat-mitochondrial-thermogenesis",
  "succinate-ucp1-bat-mitochondrial-thermogenesis": "succinate-ucp1-bat-mitochondrial-thermogenesis",
  "curcumin-piperine-sinh-kha-dung": "curcumin-piperine",
  "curcumin-piperine-bioavailability": "curcumin-piperine",
  "glp1-keo-dai-tuoi-tho-nature": "glp1-longevity",
  "glp1-longevity-nature-mitochondria": "glp1-longevity",
  "metabolomic-horizon-clinical-diagnostics": "metabolomic-horizon",
  "metabolomic-horizon-clinical-diagnostics-vi": "metabolomic-horizon",
};

export const twinRoot = (slug: string) => TWIN_ROOT[slug] ?? slug.replace(/-(vi|en)$/, "");

export function isViArticle(a: Article): boolean {
  return (
    a.lang === "vi" ||
    a.slug.endsWith("-vi") ||
    a.slug.includes("sinh-kha-dung") ||
    a.slug.includes("keo-dai-tuoi-tho") ||
    a.slug.includes("mo-nau") ||
    a.slug.includes("sinh-nhiet")
  );
}

/**
 * Mỗi chủ đề chỉ hiện một phiên bản, chuẩn xác theo ngôn ngữ đang chọn.
 * Loại bỏ tuyệt đối tình trạng rò rỉ bài tiếng Việt sang tiếng Anh và ngược lại.
 */
export function dedupeForLang(articles: Article[], lang: Lang): Article[] {
  const targetIsVi = lang === "vi";
  const best = new Map<string, Article>();

  for (const a of articles) {
    const key = twinRoot(a.slug);
    const cur = best.get(key);
    if (!cur) {
      best.set(key, a);
      continue;
    }
    const aMatches = targetIsVi === isViArticle(a);
    const curMatches = targetIsVi === isViArticle(cur);
    if (aMatches && !curMatches) best.set(key, a);
  }

  const keep = new Set(best.values());
  return articles
    .filter((a) => keep.has(a))
    .filter((a) => (targetIsVi ? isViArticle(a) : !isViArticle(a)));
}

/** Định dạng xác định (không phụ thuộc múi giờ) để tránh lệch hydration. */
export function formatDate(date: string | undefined, lang: Lang): string {
  if (!date) return "";
  const [y, m, d] = date.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return "";
  if (lang === "vi") return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}
