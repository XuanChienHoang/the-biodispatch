import { getCuratedAnalogy, type LaymanMedicalBoxData, type LaymanMedicalPoint } from "./medical-analogies";

interface PostContentExtract {
  title?: string;
  excerpt?: string;
  content?: string;
  lang?: "vi" | "en";
  brief?: {
    takeaways?: string[];
    bottomLine?: string;
  };
}

const GENERIC_BOILERPLATE_PATTERNS = [
  /Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức/i,
  /Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu/i,
  /Circadian and biochemical coordination verified by international medical guidelines/i,
  /Sustaining cellular vitality and metabolic resilience in daily life/i,
  /Cơ chế tự nhiên được kiểm chứng qua các hướng dẫn y học chính thức/i,
  /Validated through peer-reviewed biomedical guidelines/i,
];

const BOILERPLATE_HEADING_PATTERNS = [
  /^sơ đồ cơ chế/i,
  /^molecular pathway/i,
  /^bảng tóm tắt/i,
  /^bảng đối chiếu/i,
  /^tài liệu tham khảo/i,
  /^references/i,
  /^danh mục y văn/i,
  /^góc y khoa/i,
  /^layman medical/i,
  /^1\.\s*cơ chế phân tử vi mô và các thụ thể/i,
  /^2\.\s*nghịch lý sinh học,\s*con đường bệnh sinh/i,
  /^3\.\s*ứng dụng lâm sàng,\s*dinh dưỡng thực chứng/i,
  /^1\.\s*microscopic molecular mechanisms and key receptors/i,
  /^2\.\s*biological paradox,\s*pathogenic pathways/i,
  /^3\.\s*clinical applications,\s*evidence-based nutrition/i,
];

function cleanMarkdown(text: string, maxChars = 290): string {
  const cleaned = text
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxChars) return cleaned;

  const slice = cleaned.slice(0, maxChars);
  const lastPeriod = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("; "), slice.lastIndexOf("! "));
  if (lastPeriod > maxChars * 0.45) {
    return slice.slice(0, lastPeriod + 1).trim();
  }
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim() + ".";
}

function cleanTerm(raw: string, maxChars = 84): string {
  let cleaned = raw
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[0-9]+(\.[0-9]+)*[.)]?\s*/, "")
    .replace(/^§\s*[0-9]+\s*·?\s*/i, "")
    .replace(/[*_`[\]]/g, "")
    .replace(/[!?:]+$/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length > maxChars) {
    const colonIdx = cleaned.indexOf(":");
    if (colonIdx > 8 && colonIdx <= maxChars) {
      cleaned = cleaned.slice(0, colonIdx).trim();
    } else {
      const lastSpace = cleaned.slice(0, maxChars).lastIndexOf(" ");
      cleaned = (lastSpace > 10 ? cleaned.slice(0, lastSpace) : cleaned.slice(0, maxChars)).trim();
    }
  }

  // Ensure no unclosed parenthesis at the end
  const openIdx = cleaned.lastIndexOf("(");
  const closeIdx = cleaned.lastIndexOf(")");
  if (openIdx !== -1 && openIdx > closeIdx) {
    const beforeParen = cleaned.slice(0, openIdx).trim();
    if (beforeParen.length >= 6) {
      cleaned = beforeParen;
    } else {
      cleaned = cleaned + ")";
    }
  }
  return cleaned;
}

function isBoilerplateHeading(h: string): boolean {
  const trimmed = h.replace(/^[0-9]+\.\s*/, "").trim();
  if (trimmed.length < 5) return true;
  return BOILERPLATE_HEADING_PATTERNS.some((re) => re.test(h.trim()) || re.test(trimmed));
}

function extractFlowchartSteps(content: string): string[] {
  const arrowRegex = /──►|-->|->|→|=>/;
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => arrowRegex.test(l) && !l.startsWith("|"));

  if (lines.length === 0) return [];

  const steps: string[] = [];
  for (const line of lines) {
    const parts = line
      .split(arrowRegex)
      .map((s) => cleanTerm(s, 78))
      .filter((s) => s.length >= 4);
    for (const p of parts) {
      if (!steps.includes(p)) {
        steps.push(p);
      }
    }
  }
  return steps;
}

interface ExtractedSection {
  heading: string;
  paragraphs: string[];
  bullets: { boldTerm: string; body: string }[];
}

function extractSectionsAndParagraphs(content: string): {
  introParagraphs: string[];
  sections: ExtractedSection[];
  allDistinctParagraphs: string[];
  allBullets: { boldTerm: string; body: string }[];
} {
  // Strip fenced code blocks and markdown tables before extracting prose
  const withoutCode = content.replace(/```[\s\S]*?```/g, "\n");
  const lines = withoutCode.split(/\r?\n/);

  const introParagraphs: string[] = [];
  const sections: ExtractedSection[] = [];
  const allDistinctParagraphs: string[] = [];
  const allBullets: { boldTerm: string; body: string }[] = [];

  let currentSection: ExtractedSection | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("|") || line.startsWith("──►") || line.startsWith("┌") || line.startsWith("│")) {
      continue;
    }

    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      const hText = headingMatch[1].trim();
      currentSection = {
        heading: hText,
        paragraphs: [],
        bullets: [],
      };
      sections.push(currentSection);
      continue;
    }

    // Skip blockquotes here since blockquote is extracted separately
    if (line.startsWith(">")) continue;

    // Check bullet with bold term: * **Term:** Description
    const bulletMatch = line.match(/^[-*•]\s+\*\*([^*]{3,80})\*\*[:：–-]?\s*(.+)$/);
    if (bulletMatch) {
      const boldTerm = cleanTerm(bulletMatch[1], 78);
      const body = cleanMarkdown(bulletMatch[2], 275);
      if (body.length >= 35) {
        const item = { boldTerm, body };
        allBullets.push(item);
        if (currentSection) currentSection.bullets.push(item);
      }
      continue;
    }

    // Normal bullet or numbered item
    const plainBullet = line.match(/^(?:[-*•]|[0-9]+\.)\s+(.+)$/);
    if (plainBullet) {
      const cleaned = cleanMarkdown(plainBullet[1], 275);
      if (cleaned.length >= 50 && !allDistinctParagraphs.includes(cleaned)) {
        allDistinctParagraphs.push(cleaned);
        if (currentSection) currentSection.paragraphs.push(cleaned);
      }
      continue;
    }

    // Regular prose paragraph
    const cleanedPara = cleanMarkdown(line, 285);
    if (cleanedPara.length >= 60 && !allDistinctParagraphs.includes(cleanedPara)) {
      allDistinctParagraphs.push(cleanedPara);
      if (currentSection) {
        currentSection.paragraphs.push(cleanedPara);
      } else {
        introParagraphs.push(cleanedPara);
      }
    }
  }

  return { introParagraphs, sections, allDistinctParagraphs, allBullets };
}

function hasDuplicateOrBoilerplatePoints(points: LaymanMedicalPoint[]): boolean {
  if (!points || points.length < 3) return true;
  const seenAnalogies = new Set<string>();
  const seenTerms = new Set<string>();

  for (const pt of points) {
    const aNorm = (pt.analogy || "").trim().toLowerCase();
    const tNorm = (pt.term || "").trim().toLowerCase();
    if (!aNorm || aNorm.length < 20) return true;
    if (seenAnalogies.has(aNorm)) return true;
    if (seenTerms.has(tNorm)) return true;
    if (GENERIC_BOILERPLATE_PATTERNS.some((re) => re.test(pt.analogy))) return true;
    seenAnalogies.add(aNorm);
    seenTerms.add(tNorm);
  }
  return false;
}

/**
 * Resolves or dynamically synthesizes a 3-point Layman Medical Concept box for ANY article.
 * Strictly guarantees that all 3 columns have distinct terms, distinct layTerms, and distinct explanations.
 */
export function resolveLaymanMedicalData(
  slug: string,
  post?: PostContentExtract
): LaymanMedicalBoxData {
  const isVi =
    post?.lang === "vi" ||
    slug.endsWith("-vi") ||
    slug.includes("sinh-kha-dung") ||
    slug.includes("keo-dai-tuoi-tho") ||
    slug.includes("mo-nau") ||
    slug.includes("sinh-nhiet") ||
    (!slug.endsWith("-en") &&
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
        `${post?.title || ""} ${post?.excerpt || ""}`
      ));

  // 1. Check curated repository first (matching language accurately)
  const curated = getCuratedAnalogy(slug, isVi ? "vi" : "en");
  if (curated && !hasDuplicateOrBoilerplatePoints(curated.points)) {
    return curated;
  }

  const content = post?.content || "";
  const title = post?.title || slug;
  const excerpt = post?.excerpt || "";
  const takeaways = (post?.brief?.takeaways || []).map((t) => cleanMarkdown(t, 275)).filter((t) => t.length >= 30);
  const bottomLine = post?.brief?.bottomLine ? cleanMarkdown(post.brief.bottomLine, 275) : "";

  // Topic-specific check for morning coffee
  const textLower = `${slug} ${title}`.toLowerCase();
  if (textLower.includes("ca-phe-buoi-sang") || textLower.includes("morning-coffee-causes")) {
    if (isVi) {
      return {
        title: "Góc Y Khoa Dễ Hiểu: 3 Cơ Chế Khiến Bạn Sập Nguồn Lúc 10 Giờ Sáng",
        hook: "Giải mã tương tác giữa caffeine, chất gây mệt mỏi Adenosine và nhịp sinh học Cortisol:",
        points: [
          {
            term: "Kẻ Chiếm Chỗ Khôn Khéo (Receptor Antagonist)",
            layTerm: "Caffeine chỉ 'bịt mắt' não bộ chứ không triệt tiêu cơn mệt",
            analogy:
              "Caffeine có hình dáng giống hệt phân tử Adenosine nên chiếm trước ổ khóa thụ thể. Não không nhận được tín hiệu mỏi mệt tạm thời, nhưng phân tử mệt mỏi vẫn tiếp tục tích tụ ngoài cửa.",
          },
          {
            term: "Cú Sập Nguồn Năng Lượng (The 10 AM Caffeine Crash)",
            layTerm: "Đợt sóng thần Adenosine tràn vào đồng loạt khi thuốc tan",
            analogy:
              "Sau 2 - 3 tiếng, gan phân giải hết caffeine, giải phóng toàn bộ các ổ khóa. Hàng triệu phân tử Adenosine tồn đọng ùa vào thụ thể cùng lúc, khiến mắt bạn lập tức trĩu nặng.",
          },
          {
            term: "Phản Ứng Đánh Thức Cortisol (Cortisol Awakening Response)",
            layTerm: "Cơ thể đã có sẵn 'tách cà phê tự nhiên' lúc 7h - 8h sáng",
            analogy:
              "Khi vừa thức dậy, nồng độ hormone Cortisol tự nhiên đang ở đỉnh cao nhất. Uống cà phê lúc này chỉ làm tim đập dồn và tăng nhờn thuốc; hãy lùi cữ cà phê sang 9h30 khi Cortisol hạ nhiệt.",
          },
        ],
      };
    } else {
      return {
        title: "Layman Medical Concept: 3 Biological Mechanisms Behind the 10 AM Crash",
        hook: "Deconstructing caffeine pharmacokinetics, Adenosine buildup, and morning Cortisol dynamics:",
        points: [
          {
            term: "Receptor Imposter (Adenosine Antagonism)",
            layTerm: "Caffeine masks exhaustion without eliminating cellular fatigue",
            analogy:
              "Caffeine shares the precise molecular geometry of Adenosine, occupying brain receptors and blinding neurons to tiredness while fatigue molecules continue accumulating outside.",
          },
          {
            term: "The Mid-Morning Caffeine Crash",
            layTerm: "The sudden flood of backlog Adenosine when caffeine clears",
            analogy:
              "Within 2 to 3 hours, hepatic enzymes metabolize circulating caffeine. The open receptors are immediately overwhelmed by surging Adenosine, triggering the sharp mid-morning slump.",
          },
          {
            term: "Cortisol Awakening Response (CAR)",
            layTerm: "Your body already brews an internal stimulant between 7 and 8 AM",
            analogy:
              "Endogenous cortisol naturally peaks shortly after waking. Delaying your first cup by 90 minutes prevents receptor desensitization and ensures sustained midday energy.",
          },
        ],
      };
    }
  }

  // 2. Extract blockquote analogy if present: > *"..."* or > "..."
  const quoteMatch =
    content.match(/>\s*\*"([\s\S]*?)"\*/) ||
    content.match(/>\s*\*([\s\S]*?)\*/) ||
    content.match(/^>\s+([^\n\r]{40,})/m);
  const blockquote = quoteMatch ? cleanMarkdown(quoteMatch[1], 285) : "";

  // 3. Extract flowchart steps & prose sections
  const flowchartSteps = extractFlowchartSteps(content);
  const { introParagraphs, sections, allDistinctParagraphs, allBullets } =
    extractSectionsAndParagraphs(content);

  const meaningfulHeadings = sections
    .map((s) => s.heading)
    .filter((h) => !isBoilerplateHeading(h))
    .map((h) => cleanTerm(h, 80));

  // Build candidate pool of distinct TERMS (3 distinct terms required)
  const termCandidates: string[] = [];
  const addTermCandidate = (t?: string) => {
    if (!t) return;
    const cleaned = cleanTerm(t, 80);
    if (cleaned.length < 4) return;
    if (!termCandidates.some((existing) => existing.toLowerCase() === cleaned.toLowerCase())) {
      termCandidates.push(cleaned);
    }
  };

  if (meaningfulHeadings.length >= 3) {
    meaningfulHeadings.slice(0, 3).forEach(addTermCandidate);
  } else {
    if (flowchartSteps.length >= 3) {
      addTermCandidate(flowchartSteps[0]);
      addTermCandidate(flowchartSteps[Math.floor(flowchartSteps.length / 2)]);
      addTermCandidate(flowchartSteps[flowchartSteps.length - 1]);
    }
    meaningfulHeadings.forEach(addTermCandidate);
    flowchartSteps.forEach(addTermCandidate);
  }
  allBullets.forEach((b) => addTermCandidate(b.boldTerm));

  const fallbackTerms = isVi
    ? [
        "Cơ Chế Khởi Phát Tại Tế Bào",
        "Đường Truyền Tín Hiệu Sinh Hóa",
        "Ứng Dụng Bảo Vệ Thực Chứng",
      ]
    : [
        "Primary Cellular Trigger",
        "Biochemical Signaling Cascade",
        "Evidence-Based Clinical Action",
      ];
  fallbackTerms.forEach(addTermCandidate);

  // Build candidate pool of distinct EXPLANATIONS / ANALOGIES (3 distinct texts required)
  const usedAnalogies = new Set<string>();
  const pickDistinctText = (candidates: (string | undefined)[]): string => {
    for (const raw of candidates) {
      if (!raw) continue;
      const cleaned = cleanMarkdown(raw, 285);
      if (cleaned.length < 35) continue;
      if (GENERIC_BOILERPLATE_PATTERNS.some((re) => re.test(cleaned))) continue;
      const norm = cleaned.toLowerCase();
      let isDup = false;
      for (const seen of usedAnalogies) {
        if (seen === norm || seen.slice(0, 60) === norm.slice(0, 60)) {
          isDup = true;
          break;
        }
      }
      if (!isDup) {
        usedAnalogies.add(norm);
        return cleaned;
      }
    }
    return "";
  };

  const sec1Paras = [
    ...(sections[0]?.paragraphs || []),
    ...(sections[0]?.bullets.map((b) => `${b.boldTerm}: ${b.body}`) || []),
  ];
  const sec2Paras = [
    ...(sections[1]?.paragraphs || []),
    ...(sections[1]?.bullets.map((b) => `${b.boldTerm}: ${b.body}`) || []),
  ];
  const sec3Paras = [
    ...sections.slice(2).flatMap((s) => [
      ...s.paragraphs,
      ...s.bullets.map((b) => `${b.boldTerm}: ${b.body}`),
    ]),
  ];

  const analogy1 =
    pickDistinctText([
      curated?.points?.[0]?.analogy,
      blockquote,
      takeaways[0],
      introParagraphs[0],
      sec1Paras[0],
      excerpt,
      allDistinctParagraphs[0],
    ]) ||
    cleanMarkdown(
      excerpt ||
        (isVi
          ? `Khởi phát từ tương tác phân tử đặc hiệu trong "${title}", mở khóa chuỗi đáp ứng sinh lý tại mô đích.`
          : `Initiated by target-specific molecular interactions in "${title}", unlocking downstream physiological responses.`),
      285
    );

  const analogy2 =
    pickDistinctText([
      curated?.points?.[1]?.analogy,
      takeaways[1],
      sec2Paras[0],
      sec1Paras[1],
      introParagraphs[1],
      allBullets[0] ? `${allBullets[0].boldTerm}: ${allBullets[0].body}` : undefined,
      ...allDistinctParagraphs,
    ]) ||
    (isVi
      ? `Chuỗi dẫn truyền nội bào điều hòa trực tiếp hoạt tính enzyme và biểu hiện gen thông qua lộ trình: ${flowchartSteps.slice(0, 3).join(" → ") || title}.`
      : `Intracellular signaling directly modulates enzymatic kinetics and gene expression across: ${flowchartSteps.slice(0, 3).join(" → ") || title}.`);

  const analogy3 =
    pickDistinctText([
      curated?.points?.[2]?.analogy,
      takeaways[2],
      bottomLine,
      sec3Paras[0],
      sec2Paras[1],
      allBullets[1] ? `${allBullets[1].boldTerm}: ${allBullets[1].body}` : undefined,
      ...allDistinctParagraphs.slice().reverse(),
    ]) ||
    (isVi
      ? `Áp dụng đúng liều lượng sinh lý, thời điểm hấp thu và phối hợp dinh dưỡng toàn phần giúp tối ưu hóa sinh khả dụng và bảo vệ tế bào dài hạn.`
      : `Aligning physiological dosing, circadian timing, and whole-food matrix synergy maximizes bioavailability and long-term cellular protection.`);

  const layTermsVi = [
    "Khởi phát & Hình ảnh Ẩn dụ",
    "Mắt xích Phân tử & Bằng chứng",
    "Ứng dụng Thực hành & Bảo vệ",
  ];
  const layTermsEn = [
    "Biological Trigger & Analogy",
    "Molecular Pathway & Evidence",
    "Actionable Protocol & Defense",
  ];

  const points: LaymanMedicalPoint[] = [
    {
      term: curated?.points?.[0]?.term ? cleanTerm(curated.points[0].term, 80) : termCandidates[0],
      layTerm: isVi ? layTermsVi[0] : layTermsEn[0],
      analogy: analogy1,
    },
    {
      term:
        curated?.points?.[1]?.term &&
        curated.points[1].term.toLowerCase() !== (curated?.points?.[0]?.term || "").toLowerCase()
          ? cleanTerm(curated.points[1].term, 80)
          : termCandidates[1] || fallbackTerms[1],
      layTerm: isVi ? layTermsVi[1] : layTermsEn[1],
      analogy: analogy2,
    },
    {
      term:
        curated?.points?.[2]?.term &&
        curated.points[2].term.toLowerCase() !== (curated?.points?.[1]?.term || "").toLowerCase()
          ? cleanTerm(curated.points[2].term, 80)
          : termCandidates[2] || fallbackTerms[2],
      layTerm: isVi ? layTermsVi[2] : layTermsEn[2],
      analogy: analogy3,
    },
  ];

  return {
    title:
      curated?.title ||
      (isVi
        ? "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Sinh Học Cốt Lõi"
        : "Layman Medical Concept: 3 Core Biological Pillars"),
    hook:
      curated?.hook ||
      (isVi
        ? "Giải mã trực quan từ cơ chế khởi phát, bằng chứng tế bào đến hướng dẫn áp dụng thực tế:"
        : "Intuitive breakdown from primary trigger and cellular evidence to actionable daily practice:"),
    points,
  };
}
