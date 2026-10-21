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
  "nhai-ky-no-lau-giam-calo": "chewing-slowly-satiety-gut-hormones",
  "chewing-slowly-satiety-gut-hormones": "chewing-slowly-satiety-gut-hormones",
  "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc": "morning-sunlight-circadian-clock-metabolism",
  "morning-sunlight-circadian-clock-metabolism": "morning-sunlight-circadian-clock-metabolism",
  "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau": "berries-anthocyanins-vascular-protection-antioxidant-shield",
  "berries-anthocyanins-vascular-protection-antioxidant-shield": "berries-anthocyanins-vascular-protection-antioxidant-shield",
  "ngat-quang-ngoi-lau-danh-thuc-mach-mau": "breaking-sedentary-sitting-vascular-shear-stress",
  "breaking-sedentary-sitting-vascular-shear-stress": "breaking-sedentary-sitting-vascular-shear-stress",
  "so-co-la-den-flavanol-gian-mach-ha-huyet-ap": "dark-chocolate-flavanols-nitric-oxide-endothelial-function",
  "dark-chocolate-flavanols-nitric-oxide-endothelial-function": "dark-chocolate-flavanols-nitric-oxide-endothelial-function",
  "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day": "drinking-water-before-meals-gastric-distension-metabolism",
  "drinking-water-before-meals-gastric-distension-metabolism": "drinking-water-before-meals-gastric-distension-metabolism",
  "tam-rung-20-phut-ha-hormone-cang-thang-cortisol": "nature-pill-twenty-minutes-cortisol-reduction",
  "nature-pill-twenty-minutes-cortisol-reduction": "nature-pill-twenty-minutes-cortisol-reduction",
  "ngu-trua-20-phut-phuc-hoi-tim-mach": "power-nap-cardiovascular-health-blood-pressure",
  "power-nap-cardiovascular-health-blood-pressure": "power-nap-cardiovascular-health-blood-pressure",
  "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau": "sauna-bathing-cardiovascular-longevity-heat-shock-proteins",
  "sauna-bathing-cardiovascular-longevity-heat-shock-proteins": "sauna-bathing-cardiovascular-longevity-heat-shock-proteins",
  "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi": "slow-breathing-vagal-tone-parasympathetic-reset",
  "slow-breathing-vagal-tone-parasympathetic-reset": "slow-breathing-vagal-tone-parasympathetic-reset",
};

export const twinRoot = (slug: string) => TWIN_ROOT[slug] ?? slug.replace(/-(vi|en)$/, "");

export function isViArticle(a: Article): boolean {
  return (
    a.lang === "vi" ||
    a.slug.endsWith("-vi") ||
    a.slug.includes("sinh-kha-dung") ||
    a.slug.includes("keo-dai-tuoi-tho") ||
    a.slug.includes("mo-nau") ||
    a.slug.includes("sinh-nhiet") ||
    /^(anh-nang|qua-mong|ngat-quang|nhai-ky|so-co-la|uong-ly|tam-rung|ngu-trua|xong-hoi|nhip-tho)/.test(a.slug)
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
