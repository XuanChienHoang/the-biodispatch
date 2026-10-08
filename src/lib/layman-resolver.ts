import { getCuratedAnalogy, type LaymanMedicalBoxData, type LaymanMedicalPoint } from "./medical-analogies";

interface PostContentExtract {
  title?: string;
  excerpt?: string;
  content?: string;
  lang?: "vi" | "en";
}

/**
 * Resolves or dynamically synthesizes a 3-point Layman Medical Concept box for ANY article.
 * Guarantees that no article will ever lack the accessible emerald callout box.
 */
export function resolveLaymanMedicalData(
  slug: string,
  post?: PostContentExtract
): LaymanMedicalBoxData {
  // 1. Check curated high-fidelity repository first
  const curated = getCuratedAnalogy(slug);
  if (curated) {
    return curated;
  }

  const isVi =
    post?.lang === "vi" ||
    slug.endsWith("-vi") ||
    slug.includes("sinh-kha-dung") ||
    slug.includes("keo-dai-tuoi-tho") ||
    slug.includes("mo-nau") ||
    slug.includes("sinh-nhiet") ||
    !slug.endsWith("-en");

  const content = post?.content || "";
  const title = post?.title || slug;
  const excerpt = post?.excerpt || "";

  // 2. Extract blockquote analogy if present: > *"..."*
  const quoteMatch = content.match(/> \*"([\s\S]*?)"\*/);
  const blockquote = quoteMatch ? quoteMatch[1].replace(/\n+/g, " ").trim() : "";

  // 3. Extract numbered H2 headings (e.g. ## 1. ..., ## 2. ..., ## 3. ...)
  const h2Matches = [...content.matchAll(/^##\s+([0-9]+\.\s+[^\n\r]+)/gm)].map((m) =>
    m[1].trim()
  );

  // If we have extracted blockquote sentences and headings, synthesize 3 intuitive points
  const points: LaymanMedicalPoint[] = [];

  // Split blockquote into logical sentences for analogy points
  const quoteSentences = blockquote
    ? blockquote
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 20)
    : [];

  const defaultTermsVi = [
    {
      term: "Cơ chế Phân tử & Tín hiệu Tế bào",
      layTerm: "Chiếc công tắc sinh học điều phối năng lượng nội bào",
    },
    {
      term: "Nghịch lý Y sinh & Cân bằng Động",
      layTerm: "Hệ thống van an toàn bảo vệ mô khỏi stress oxy hóa",
    },
    {
      term: "Ứng dụng Lâm sàng & Can thiệp Thực chứng",
      layTerm: "Chiến lược tối ưu hóa nhịp điệu sinh học tự nhiên",
    },
  ];

  const defaultTermsEn = [
    {
      term: "Molecular Signal Transduction",
      layTerm: "The biological master switch regulating cellular energy flux",
    },
    {
      term: "Physiological Feedback & Dynamic Homeostasis",
      layTerm: "The safety-relief valve dampening oxidative stress cascades",
    },
    {
      term: "Translational Clinical Protocols",
      layTerm: "Actionable lifestyle levers synchronizing cellular rhythm",
    },
  ];

  const defaultTerms = isVi ? defaultTermsVi : defaultTermsEn;

  for (let i = 0; i < 3; i++) {
    const rawHeading = h2Matches[i] || "";
    // Clean heading number (e.g., "1. Molecular Architecture..." -> "Molecular Architecture...")
    const cleanHeading = rawHeading.replace(/^[0-9]+\.\s*/, "").split(/[:—–-]/)[0]?.trim();

    const term = cleanHeading || defaultTerms[i].term;
    const layTerm = defaultTerms[i].layTerm;

    let analogyText = quoteSentences[i] || "";
    if (!analogyText && quoteSentences.length > 0) {
      analogyText = quoteSentences[0];
    }
    if (!analogyText) {
      analogyText = excerpt
        ? excerpt
        : isVi
        ? "Cơ chế phân tử cốt lõi được đối soát trực tiếp với y văn quốc tế, đảm bảo tính thực chứng và khả năng ứng dụng lâm sàng chính xác."
        : "Evidence-based biochemical pathways synthesized directly from peer-reviewed literature to deliver precise clinical insight.";
    }

    points.push({
      term,
      layTerm,
      analogy: analogyText,
    });
  }

  const boxTitle = isVi
    ? `Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Sinh Học Cốt Lõi`
    : `Layman Medical Concept: 3 Core Biological Pillars`;

  const boxHook = isVi
    ? `Giải mã cơ chế phân tử và ý nghĩa lâm sàng dưới góc nhìn trực quan không cần bằng cấp y khoa:`
    : `Deconstructing molecular mechanisms and clinical takeaways into intuitive, accessible principles:`;

  return {
    title: boxTitle,
    hook: boxHook,
    points,
  };
}
