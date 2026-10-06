"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

// Pairs of English <-> Vietnamese dispatches
const PAIRS: Record<string, { slug: string; lang: "vi" | "en"; label: string }> = {
  "metabolomic-horizon-clinical-diagnostics": {
    slug: "metabolomic-horizon-clinical-diagnostics-vi",
    lang: "vi",
    label: "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)",
  },
  "metabolomic-horizon-clinical-diagnostics-vi": {
    slug: "metabolomic-horizon-clinical-diagnostics",
    lang: "en",
    label: "English Edition (Academic Rigour)",
  },
  "curcumin-piperine-bioavailability": {
    slug: "curcumin-piperine-sinh-kha-dung",
    lang: "vi",
    label: "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)",
  },
  "curcumin-piperine-sinh-kha-dung": {
    slug: "curcumin-piperine-bioavailability",
    lang: "en",
    label: "English Edition (Academic Rigour)",
  },
  "glp1-keo-dai-tuoi-tho-nature": {
    slug: "glp1-longevity-nature-mitochondria",
    lang: "en",
    label: "English Edition (Academic Rigour & Molecular Pathways)",
  },
  "glp1-longevity-nature-mitochondria": {
    slug: "glp1-keo-dai-tuoi-tho-nature",
    lang: "vi",
    label: "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu & Ẩn dụ Đời thực)",
  },
  "resistant-starch-scfa-gut-vi": {
    slug: "resistant-starch-scfa-gut-en",
    lang: "en",
    label: "English Edition (Academic Rigour & Microbial Kinetics)",
  },
  "resistant-starch-scfa-gut-en": {
    slug: "resistant-starch-scfa-gut-vi",
    lang: "vi",
    label: "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu & Ẩn dụ Đời thực)",
  },
  "mevalonate-statin-coq10-vi": {
    slug: "mevalonate-statin-coq10-en",
    lang: "en",
    label: "English Edition (Academic Rigour & Pharmacogenomics)",
  },
  "mevalonate-statin-coq10-en": {
    slug: "mevalonate-statin-coq10-vi",
    lang: "vi",
    label: "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu & Ẩn dụ Đời thực)",
  },
};

// Accessible Medical Explanations / Metaphors for articles
const MEDICAL_ANALOGIES: Record<
  string,
  {
    title: string;
    hook: string;
    points: { term: string; layTerm: string; analogy: string }[];
  }
> = {
  "glp1-keo-dai-tuoi-tho-nature": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Kéo Dài Tuổi Thọ Tế Bào",
    hook: "Giải mã cơ chế thuốc GLP-1 và ty thể mà không cần bằng cấp y sinh:",
    points: [
      {
        term: "Ty thể (Mitochondria)",
        layTerm: "Chiếc lò sưởi / Máy phát điện mini trong mỗi tế bào",
        analogy:
          "Ty thể đốt đường và mỡ để tạo năng lượng ATP cho bạn sống. Khi già đi, máy phát điện bị rỉ sét và xả khói đen độc hại (ROS) làm hỏng tế bào.",
      },
      {
        term: "Thực bào Ty thể (Mitophagy)",
        layTerm: "Đội ngũ công nhân vệ sinh nội bào dọn dẹp lò sưởi hỏng",
        analogy:
          "Thay vì để máy phát điện rỉ sét rò rỉ khói độc, tế bào gom chúng lại tiêu hủy và thay mới bằng lò phát điện sạch nguyên bản.",
      },
      {
        term: "Kích hoạt AMPK & Ức chế mTOR",
        layTerm: "Chế độ tiết kiệm pin và kích hoạt chu trình bảo dưỡng",
        analogy:
          "GLP-1 đánh lừa tế bào rằng đang trong chế độ nhịn ăn lành mạnh, khiến cơ thể tạm dừng xây dựng lãng phí để tập trung bảo trì sửa chữa máy móc.",
      },
    ],
  },
  "curcumin-piperine-sinh-kha-dung": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Khái niệm Sinh Hóa Cốt Lõi",
    hook: "Hiểu nhanh cơ chế hấp thu tinh chất nghệ và tiêu đen mà không cần bằng cấp y khoa:",
    points: [
      {
        term: "Sinh khả dụng (Bioavailability)",
        layTerm: "Tỷ lệ hoạt chất thực sự lọt vào máu",
        analogy:
          "Bạn uống 1000 mg nghệ nhưng gan và ruột loại bỏ tới 990 mg. Chỉ 10 mg vào được máu. 10 mg đó chính là sinh khả dụng (1%).",
      },
      {
        term: "Chuyển hóa Pha 2 (Glucuronidation qua UGT1A1)",
        layTerm: "Chiếc máy dán nhãn trục xuất tự động của lá gan",
        analogy:
          "Gan coi nghệ là chất lạ. Enzyme UGT1A1 gắn ngay một chiếc 'thẻ bài' (acid glucuronic) vào phân tử nghệ để cơ thể nhanh chóng bài tiết qua thận và mật.",
      },
      {
        term: "Piperine (Chiết xuất hạt tiêu đen)",
        layTerm: "Chiếc phanh sinh học kẹt tạm thời máy dán nhãn",
        analogy:
          "Piperine làm tạm dừng enzyme UGT1A1 trong 1–2 giờ. Trong thời gian lá gan bị 'phân tâm', nghệ tự do tràn vào mạch máu, giúp nồng độ tăng vọt gấp 20 lần.",
      },
    ],
  },
  "metabolomic-horizon-clinical-diagnostics-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Chuyển Hóa Học (Metabolomics) Là Gì?",
    hook: "Vì sao các bác sĩ hàng đầu thế giới đang chuyển dịch từ xét nghiệm gen sang đo đạc chất chuyển hóa:",
    points: [
      {
        term: "ADN (Genomics) vs Chất chuyển hóa (Metabolomics)",
        layTerm: "Bản vẽ trên giấy vs Đồng hồ đo tốc độ thực tế",
        analogy:
          "Bộ gen ADN cho biết cơ thể bạn CÓ THỂ mắc bệnh gì trong tương lai (bản vẽ thiết kế). Còn chất chuyển hóa cho biết cơ thể BẠN ĐANG VẬN HÀNH THẾ NÀO ngay hôm nay (khói bụi, nhiệt độ và xăng xe thực tế).",
      },
      {
        term: "TMAO (Trimethylamine N-oxide)",
        layTerm: "Khi vi khuẩn đường ruột phát tín hiệu xấu đến tim mạch",
        analogy:
          "Ăn nhiều thịt đỏ → vi khuẩn ruột tạo khí TMA → gan oxy hóa thành TMAO → làm viêm và xơ vữa thành mạch máu. Đo TMAO giúp chặn đứng xơ vữa trước khi nghẽn mạch.",
      },
      {
        term: "SCFA (Axit béo chuỗi ngắn: Butyrate)",
        layTerm: "Bữa tiệc thịnh soạn cho niêm mạc ruột",
        analogy:
          "Khi bạn ăn nhiều rau xanh và chất xơ, vi khuẩn có lợi lên men tạo ra Butyrate — chất này giống như lớp vữa xi măng hàn gắn các vết rò rỉ ở thành ruột, dập tắt các ổ viêm trong cơ thể.",
      },
    ],
  },
  "resistant-starch-scfa-gut-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Tinh Bột Kháng & Hàng Rào Ruột",
    hook: "Cơ chế bảo vệ niêm mạc ruột chống viêm rò rỉ qua 3 khái niệm sinh học:",
    points: [
      {
        term: "Tinh bột kháng (Resistant Starch)",
        layTerm: "Kiện hàng bọc thép đi thẳng xuống đại tràng",
        analogy:
          "Dạ dày và ruột non không tiêu hóa được tinh bột kháng. Nó đi nguyên vẹn xuống đại tràng để trở thành nguồn thức ăn quý giá cho hệ vi sinh đường ruột.",
      },
      {
        term: "Khóa protein Claudin-1 & Occludin",
        layTerm: "Lớp vữa xi măng gắn kết các viên gạch tế bào",
        analogy:
          "Các tế bào biểu mô ruột xếp sát nhau như tường thành. Claudin-1 là lớp vữa niêm phong các kẽ hở, ngăn không cho độc tố vi khuẩn tràn vào máu.",
      },
      {
        term: "Axit béo Butyrate",
        layTerm: "Nhiên liệu vàng nuôi dưỡng lính canh tế bào",
        analogy:
          "Tế bào đại tràng tiêu thụ tới 70% năng lượng từ Butyrate. Đủ Butyrate, tế bào ruột khỏe mạnh và lớp vữa thành ruột được gia cố vững chắc.",
      },
    ],
  },
  "mevalonate-statin-coq10-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Ngã Ba Mevalonate & Thuốc Statin",
    hook: "Vì sao thuốc hạ mỡ máu lại gây cảm giác mỏi cơ bắp và cách khắc phục:",
    points: [
      {
        term: "Enzyme HMG-CoA Reductase",
        layTerm: "Chiếc van tổng kiểm soát ở đầu nguồn dòng chảy",
        analogy:
          "Thuốc Statin đóng chặt chiếc van này để giảm tổng hợp mỡ máu cholesterol, bảo vệ thành mạch vành khỏi xơ vữa.",
      },
      {
        term: "Ngã ba Mevalonate",
        layTerm: "Dòng sông rẽ đôi nhánh đi hai hướng",
        analogy:
          "Một nhánh nước tạo Cholesterol, nhưng nhánh còn lại tạo Coenzyme Q10 cho ty thể. Khi đóng van tổng, nhánh CoQ10 cũng vô tình bị khô cạn.",
      },
      {
        term: "Coenzyme Q10 (Ubiquinol)",
        layTerm: "Chất dẫn truyền tia lửa điện trong nhà máy ty thể",
        analogy:
          "Cạn kiệt CoQ10 khiến ty thể tế bào cơ bị đoản mạch năng lượng, gây đau mỏi cơ bắp. Bổ sung Ubiquinol giúp bù đắp lượng thiếu hụt này.",
      },
    ],
  },
};

export function ArticleLanguageBar({ currentSlug }: { currentSlug: string }) {
  const { lang, setLang } = useLanguageStore();
  const [showAnalogy, setShowAnalogy] = useState(true);

  const alternate = PAIRS[currentSlug];
  const isViCurrent = currentSlug.endsWith("-vi") || currentSlug.includes("sinh-kha-dung");
  const analogyData = MEDICAL_ANALOGIES[currentSlug];

  return (
    <div className="space-y-4">
      {/* Language Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-indigo-deep/20 bg-paper-tint px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-indigo-deep">
            {isViCurrent ? "🇻🇳 Phiên bản Tiếng Việt" : "🇬🇧 English Edition"}
          </span>
          <span className="text-slate-hair">|</span>
          <span className="text-slate-ink">
            {isViCurrent
              ? "Diễn giải y sinh thực chứng · Dễ hiểu"
              : "Peer-reviewed scientific manuscript"}
          </span>
        </div>

        {alternate && (
          <div className="flex items-center gap-2">
            <span className="caps text-slate-ink hidden sm:inline">
              {isViCurrent ? "Chuyển ngôn ngữ:" : "Alternate version:"}
            </span>
            <Link
              href={`/blog/${alternate.slug}`}
              className="caps inline-flex items-center gap-1.5 rounded-sm bg-indigo-deep px-3 py-1 font-semibold text-trace transition-all hover:bg-indigo-mid"
            >
              <Sparkles size={12} />
              {alternate.label} →
            </Link>
          </div>
        )}
      </div>

      {/* Accessible Medical Analogy Callout Box */}
      {analogyData && (
        <div className="rounded-sm border-2 border-emerald-500/40 bg-emerald-500/5 p-4 sm:p-5 transition-all">
          <button
            type="button"
            onClick={() => setShowAnalogy(!showAnalogy)}
            className="flex w-full items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                <BookOpen size={14} />
              </span>
              <div>
                <h4 className="font-display text-[0.98rem] font-bold text-indigo-deep">
                  {analogyData.title}
                </h4>
                <p className="text-[0.76rem] text-slate-ink">{analogyData.hook}</p>
              </div>
            </div>
            <span className="caps text-emerald-700 flex items-center gap-1 text-xs font-semibold">
              {showAnalogy ? (
                <>
                  Thu gọn <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Mở rộng xem giải thích <ChevronDown size={14} />
                </>
              )}
            </span>
          </button>

          {showAnalogy && (
            <div className="mt-4 grid gap-3 border-t border-emerald-500/20 pt-4 sm:grid-cols-3">
              {analogyData.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-emerald-500/20 bg-paper p-3.5 shadow-2xs"
                >
                  <span className="num font-mono text-[0.72rem] font-bold text-emerald-600 block">
                    0{idx + 1} · {pt.layTerm}
                  </span>
                  <h5 className="font-display text-[0.88rem] font-bold text-indigo-deep mt-1">
                    {pt.term}
                  </h5>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
                    {pt.analogy}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
