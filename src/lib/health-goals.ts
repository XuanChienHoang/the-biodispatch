import type { Article } from "@/lib/content";

/**
 * Phân loại bài viết theo Nhu cầu & Triệu chứng sức khỏe thực tế (Symptom & Goal Taxonomy).
 * Độc giả tìm kiếm theo "nỗi đau" (mất ngủ, mỡ máu, giảm cân...) thay vì phải biết tên enzyme.
 */

export interface HealthGoalCategory {
  id: string;
  labelVi: string;
  labelEn: string;
  icon: string; // Emoji
  descriptionVi: string;
  descriptionEn: string;
  keywords: string[];
}

export const HEALTH_GOALS: HealthGoalCategory[] = [
  {
    id: "sleep-stress",
    labelVi: "Giấc ngủ & Giảm lo âu",
    labelEn: "Sleep & Stress Relief",
    icon: "😴",
    descriptionVi: "Khó ngủ, thức giấc giữa đêm, sương mù não, căng thẳng thần kinh",
    descriptionEn: "Insomnia, night awakenings, brain fog, nervous exhaustion",
    keywords: [
      "giac-ngu", "sleep", "ngu", "melatonin", "glymphatic", "theanine", "caffeine",
      "lo-au", "anxiety", "căng thẳng", "cortisol", "phe-vi", "vagus", "tho-cham",
      "breathing", "tam-rung", "nature-pill", "anh-sang-xanh", "blue-light", "magie", "magnesium"
    ]
  },
  {
    id: "metabolic-weight",
    labelVi: "Đường huyết & Giảm mỡ bụng",
    labelEn: "Blood Sugar & Visceral Fat",
    icon: "🩸",
    descriptionVi: "Đỉnh đường huyết sau ăn, kháng insulin, thèm ngọt, mỡ nội tạng",
    descriptionEn: "Postprandial glucose spikes, insulin resistance, cravings, visceral fat",
    keywords: [
      "duong-huyet", "glucose", "insulin", "an-rau", "vegetables", "giam-tao", "vinegar",
      "di-bo", "walking", "nhai-ky", "chewing", "tinh-bot-khang", "resistant-starch",
      "an-muon", "after-8pm", "glp1", "mo-nau", "brown-fat", "ucp1", "thermogenesis", "succinate"
    ]
  },
  {
    id: "cardio-vessels",
    labelVi: "Tim mạch & Mỡ máu sạch",
    labelEn: "Heart & Vascular Health",
    icon: "🫀",
    descriptionVi: "Xơ vữa động mạch, vôi hóa mạch, huyết áp cao, mỡ máu, đột quỵ",
    descriptionEn: "Atherosclerosis, arterial calcification, hypertension, lipid plaques",
    keywords: [
      "canxi", "calcium", "d3", "k2", "mk7", "calcification", "voi-hoa",
      "cholesterol", "statin", "oxldl", "sdldl", "triglyceride", "hdl", "coq10",
      "huyet-ap", "blood-pressure", "muoi", "salt", "so-co-la", "chocolate", "flavanol",
      "qua-mong", "berries", "anthocyanin", "ngoi-lau", "sedentary", "xong-hoi", "sauna"
    ]
  },
  {
    id: "gut-microbiome",
    labelVi: "Đường ruột & Hệ vi sinh",
    labelEn: "Gut & Microbiome",
    icon: "🛡️",
    descriptionVi: "Rò rỉ ruột, viêm ruột ngầm, đầy hơi khó tiêu, hội chứng trục não-ruột",
    descriptionEn: "Leaky gut, intestinal barrier, bloating, gut-brain axis dysbiosis",
    keywords: [
      "ruot", "gut", "zonulin", "leaky-gut", "butyrate", "scfa", "microbiota",
      "microbiome", "mucin", "vi-khuan", "truc-nao-ruot", "gaba", "curcumin", "piperine"
    ]
  },
  {
    id: "longevity-cancer",
    labelVi: "Trẻ hóa & Phòng chống Ung thư",
    labelEn: "Cellular Aging & Cancer Defense",
    icon: "🧬",
    descriptionVi: "Tế bào già SASP, suy thoái ty thể, đột biến gene, chuyển hóa khối u",
    descriptionEn: "Senescent cells, mitochondrial decay, DNA damage, tumor metabolism",
    keywords: [
      "senolytics", "fisetin", "sasp", "te-bao-gia", "nad", "sirtuin", "sirt6",
      "urolithin", "mitophagy", "ty-the", "mitochondria", "alpha-ketoglutarate",
      "spermidine", "autophagy", "warburg", "cancer", "ung-thu", "ferroptosis", "mitohormesis"
    ]
  },
  {
    id: "energy-vitality",
    labelVi: "Năng lượng & Tăng sức bền",
    labelEn: "Energy & Exercise Recovery",
    icon: "⚡",
    descriptionVi: "Mệt mỏi sau ăn, sập nguồn buổi sáng, phục hồi sau tập luyện, tối ưu ty thể",
    descriptionEn: "Afternoon crash, morning fatigue, workout recovery, mitochondrial recharge",
    keywords: [
      "sup-nguon", "crash", "ca-phe", "coffee", "anh-nang", "sunlight",
      "nuoc-uong", "hydration", "electrolytes", "dien-giai", "ngu-trua", "power-nap",
      "670nm", "red-light", "creatine", "succinate", "ampk"
    ]
  }
];

/**
 * Kiểm tra xem một bài viết có khớp với Health Goal Category hay không.
 */
export function matchesHealthGoal(article: Article, goalId: string): boolean {
  if (goalId === "all") return true;
  const cat = HEALTH_GOALS.find((g) => g.id === goalId);
  if (!cat) return false;

  const corpus = `${article.slug} ${article.title} ${article.dek || ""} ${(article as any).tags ? (article as any).tags.join(" ") : ""}`.toLowerCase();
  return cat.keywords.some((k) => corpus.includes(k.toLowerCase()));
}

/**
 * Đếm số lượng bài viết tương ứng với từng Health Goal.
 */
export function countArticlesByHealthGoal(articles: Article[]): Record<string, number> {
  const counts: Record<string, number> = { all: articles.length };
  for (const cat of HEALTH_GOALS) {
    counts[cat.id] = articles.filter((a) => matchesHealthGoal(a, cat.id)).length;
  }
  return counts;
}
