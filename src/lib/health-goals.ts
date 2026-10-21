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
    labelVi: "Giấc ngủ & Thần kinh",
    labelEn: "Sleep & Stress Relief",
    icon: "😴",
    descriptionVi: "Khó ngủ, thức giấc giữa đêm, sương mù não, căng thẳng thần kinh",
    descriptionEn: "Insomnia, night awakenings, brain fog, nervous exhaustion",
    keywords: [
      "giac-ngu", "sleep", "ngu", "melatonin", "glymphatic", "theanine", "caffeine",
      "lo-au", "anxiety", "căng thẳng", "cortisol", "phe-vi", "vagus", "tho-cham",
      "breathing", "tam-rung", "nature-pill", "anh-sang-xanh", "blue-light", "magie", "magnesium", "dopamine"
    ]
  },
  {
    id: "metabolic-weight",
    labelVi: "Đường huyết & Mỡ bụng",
    labelEn: "Blood Sugar & Fat Loss",
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
    labelVi: "Tim mạch & Huyết áp",
    labelEn: "Heart & Vascular Health",
    icon: "🫀",
    descriptionVi: "Xơ vữa động mạch, vôi hóa mạch, huyết áp cao, mỡ máu, tuần hoàn kém",
    descriptionEn: "Atherosclerosis, arterial calcification, hypertension, lipid plaques",
    keywords: [
      "canxi", "calcium", "d3", "k2", "mk7", "calcification", "voi-hoa",
      "cholesterol", "statin", "oxldl", "sdldl", "triglyceride", "hdl", "coq10",
      "huyet-ap", "blood-pressure", "muoi", "salt", "so-co-la", "chocolate", "flavanol",
      "qua-mong", "berries", "anthocyanin", "ngoi-lau", "sedentary", "xong-hoi", "sauna", "tim-mach"
    ]
  },
  {
    id: "gut-microbiome",
    labelVi: "Đường ruột & Tiêu hóa",
    labelEn: "Gut & Digestion",
    icon: "🛡️",
    descriptionVi: "Đầy hơi khó tiêu, viêm niêm mạc, rò rỉ ruột, hệ vi sinh đường ruột",
    descriptionEn: "Leaky gut, intestinal barrier, bloating, gut-brain axis dysbiosis",
    keywords: [
      "ruot", "gut", "zonulin", "leaky-gut", "butyrate", "scfa", "microbiota",
      "microbiome", "mucin", "vi-khuan", "truc-nao-ruot", "gaba", "curcumin", "piperine", "tieu-hoa"
    ]
  },
  {
    id: "energy-vitality",
    labelVi: "Năng lượng & Sức bền",
    labelEn: "Energy & Recovery",
    icon: "⚡",
    descriptionVi: "Sập nguồn buổi sáng, mệt mỏi sau ăn trưa, sạc năng lượng ty thể",
    descriptionEn: "Afternoon crash, morning fatigue, workout recovery, mitochondrial recharge",
    keywords: [
      "sup-nguon", "crash", "ca-phe", "coffee", "anh-nang", "sunlight",
      "nuoc-uong", "hydration", "electrolytes", "dien-giai", "ngu-trua", "power-nap",
      "670nm", "red-light", "creatine", "succinate", "ampk", "nang-luong", "met-moi"
    ]
  },
  {
    id: "longevity-cancer",
    labelVi: "Trẻ hóa & Trường thọ",
    labelEn: "Longevity & Anti-Aging",
    icon: "🧬",
    descriptionVi: "Tế bào già SASP, suy thoái ty thể, đột biến gene, làm chậm tốc độ lão hóa",
    descriptionEn: "Senescent cells, mitochondrial decay, DNA damage, biological age reversal",
    keywords: [
      "senolytics", "fisetin", "sasp", "te-bao-gia", "nad", "sirtuin", "sirt6",
      "urolithin", "mitophagy", "ty-the", "mitochondria", "alpha-ketoglutarate",
      "spermidine", "autophagy", "warburg", "cancer", "ung-thu", "ferroptosis", "mitohormesis", "truong-tho"
    ]
  },
  {
    id: "hormones-vitality",
    labelVi: "Nội tiết, Tóc & Sinh lực",
    labelEn: "Hormones, Hair & Vitality",
    icon: "🌿",
    descriptionVi: "Cân bằng tuyến giáp, rụng tóc sau tuổi 30, Testosterone, tiền mãn kinh",
    descriptionEn: "Thyroid health, hair loss, DHT inhibition, testosterone, perimenopause",
    keywords: [
      "tuyen-giap", "thyroid", "rung-toc", "hair-loss", "dht", "testosterone", "estrogen",
      "perimenopause", "tien-man-kinh", "sinh-luc", "noi-tiet", "hormone", "saw-palmetto", "nettle"
    ]
  },
  {
    id: "joints-mobility",
    labelVi: "Xương khớp & Vận động",
    labelEn: "Joints & Mobility",
    icon: "🦴",
    descriptionVi: "Đau mỏi vai gáy, khô khớp, teo cơ tuổi trung niên, bảo vệ sụn",
    descriptionEn: "Joint stiffness, cartilage protection, sarcopenia, bone density",
    keywords: [
      "khop", "joint", "cartilage", "sun-khop", "uc-ii", "sarcopenia", "teo-co",
      "loang-xuong", "bone", "xuong", "leucine", "glucosamine", "collagen", "co-bap", "muscle", "vai-gay"
    ]
  },
  {
    id: "liver-detox",
    labelVi: "Gan mật & Thải độc",
    labelEn: "Liver Care & Detox",
    icon: "🫁",
    descriptionVi: "Gan nhiễm mỡ, hạ men gan, thải độc rượu bia, đào thải axit uric ngừa gút",
    descriptionEn: "Fatty liver, alcohol detox, liver enzymes, gout and uric acid clearance",
    keywords: [
      "gan", "liver", "gan-nhiem-mo", "masld", "nafld", "thai-doc", "detox", "gout", "gut",
      "axit-uric", "uric-acid", "tudca", "choline", "tart-cherry", "ruou-bia", "men-gan"
    ]
  },
  {
    id: "skin-eyes",
    labelVi: "Sáng mắt & Mịn da",
    labelEn: "Eyes & Skin Care",
    icon: "👁️",
    descriptionVi: "Mỏi mắt màn hình, bảo vệ điểm vàng, nếp nhăn và hàng rào ẩm cho da",
    descriptionEn: "Digital eye strain, macular health, skin hydration, anti-glycation",
    keywords: [
      "mat", "eye", "vision", "lutein", "zeaxanthin", "diem-vang", "macula", "da", "skin",
      "nep-nhan", "wrinkles", "glycation", "ages", "ceramide", "anh-sang-xanh", "collagen", "sang-mat"
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
