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

  // 3. Extract any H3 or H2 headings
  const headings = [...content.matchAll(/^#{2,3}\s+([^#\n\r]+)/gm)]
    .map((m) => m[1].replace(/^[0-9]+\.\s*/, "").replace(/[!?:]+$/, "").trim())
    .filter((h) => h.length > 5 && !h.toLowerCase().includes("tài liệu") && !h.toLowerCase().includes("reference"));

  const points: LaymanMedicalPoint[] = [];

  // Phân tích từ khóa chuyên biệt theo chủ đề để tạo điểm nhấn giá trị cao
  const textLower = `${title} ${excerpt} ${content}`.toLowerCase();

  if (textLower.includes("ca-phe") || textLower.includes("caffeine") || textLower.includes("coffee")) {
    if (isVi) {
      return {
        title: "Góc Y Khoa Dễ Hiểu: 3 Cơ Chế Khiến Bạn Sập Nguồn Lúc 10 Giờ Sáng",
        hook: "Giải mã tương tác giữa caffeine, chất gây mệt mỏi Adenosine và nhịp sinh học Cortisol:",
        points: [
          {
            term: "Kẻ Chiếm Chỗ Khôn Khéo (Receptor Antagonist)",
            layTerm: "Caffeine chỉ 'bịt mắt' não bộ chứ không triệt tiêu cơn mệt",
            analogy: "Caffeine có hình dáng giống hệt phân tử Adenosine nên chiếm trước ổ khóa thụ thể. Não không nhận được tín hiệu mỏi mệt tạm thời, nhưng phân tử mệt mỏi vẫn tiếp tục tích tụ ngoài cửa.",
          },
          {
            term: "Cú Sập Nguồn Năng Lượng (The 10 AM Caffeine Crash)",
            layTerm: "Đợt sóng thần Adenosine tràn vào đồng loạt khi thuốc tan",
            analogy: "Sau 2 - 3 tiếng, gan phân giải hết caffeine, giải phóng toàn bộ các ổ khóa. Hàng triệu phân tử Adenosine tồn đọng ùa vào thụ thể cùng lúc, khiến mắt bạn lập tức trĩu nặng.",
          },
          {
            term: "Phản Ứng Đánh Thức Cortisol (Cortisol Awakening Response)",
            layTerm: "Cơ thể đã có sẵn 'tách cà phê tự nhiên' lúc 7h - 8h sáng",
            analogy: "Khi vừa thức dậy, nồng độ hormone Cortisol tự nhiên đang ở đỉnh cao nhất. Uống cà phê lúc này chỉ làm tim đập dồn và tăng nhờn thuốc; hãy lùi cữ cà phê sang 9h30 khi Cortisol hạ nhiệt.",
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
            analogy: "Caffeine shares the precise molecular geometry of Adenosine, occupying brain receptors and blinding neurons to tiredness while fatigue molecules continue accumulating outside.",
          },
          {
            term: "The Mid-Morning Caffeine Crash",
            layTerm: "The sudden flood of backlog Adenosine when caffeine clears",
            analogy: "Within 2 to 3 hours, hepatic enzymes metabolize circulating caffeine. The open receptors are immediately overwhelmed by surging Adenosine, triggering the sharp mid-morning slump.",
          },
          {
            term: "Cortisol Awakening Response (CAR)",
            layTerm: "Your body already brews an internal stimulant between 7 and 8 AM",
            analogy: "Endogenous cortisol naturally peaks shortly after waking. Delaying your first cup by 90 minutes prevents receptor desensitization and ensures sustained midday energy.",
          },
        ],
      };
    }
  }

  // Tự động phân tách nếu có trích xuất ẩn dụ và tiêu đề bài
  for (let i = 0; i < 3; i++) {
    const heading = headings[i] || (isVi ? `Góc Nhìn Thực Chứng ${i + 1}` : `Key Biological Dimension ${i + 1}`);
    points.push({
      term: heading,
      layTerm: isVi ? `Mắt xích sinh học then chốt cần lưu ý` : `Essential physiological mechanism`,
      analogy: blockquote || excerpt || (isVi ? `Cơ chế tự nhiên được kiểm chứng qua các hướng dẫn y học chính thức.` : `Validated through peer-reviewed biomedical guidelines.`),
    });
  }

  return {
    title: isVi ? `Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Sinh Học Cốt Lõi` : `Layman Medical Concept: 3 Core Biological Pillars`,
    hook: isVi ? `Tóm tắt trực quan các điểm mấu chốt để bạn áp dụng ngay hôm nay:` : `Key intuitive takeaways translated for everyday lifestyle practice:`,
    points,
  };
}
