import { BookOpen, ChevronDown } from "lucide-react";
import { CURATED_MEDICAL_ANALOGIES } from "@/lib/medical-analogies";

/**
 * "Giải nghĩa thuật ngữ": dùng kho ẩn dụ đã biên tập sẵn (medical-analogies.ts).
 * Chỉ khớp đúng slug để không bao giờ hiện nhầm ngôn ngữ; bài chưa có dữ liệu thì không hiện.
 * Dùng <details> gốc của trình duyệt: không cần JavaScript, mặc định thu gọn.
 */
export function PlainGlossary({ slug, isVi }: { slug: string; isVi: boolean }) {
  const data = CURATED_MEDICAL_ANALOGIES[slug];
  if (!data || !data.points?.length) return null;

  return (
    <details className="not-prose group mb-10 rounded-sm border border-emerald-600/25 bg-emerald-50/40 open:bg-emerald-50/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
            <BookOpen size={15} aria-hidden />
          </span>
          <span>
            <span className="block font-display text-[1.02rem] font-bold text-indigo-deep">
              {isVi
                ? `Giải nghĩa ${data.points.length} thuật ngữ khó trong bài`
                : `${data.points.length} key terms, explained simply`}
            </span>
            <span className="block text-[0.8rem] text-slate-ink">
              {isVi ? "Bấm để mở — không cần nền tảng y khoa" : "Tap to open — no medical background needed"}
            </span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-emerald-700 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>

      <div className="grid gap-3 border-t border-emerald-600/15 px-5 pb-5 pt-4 md:grid-cols-3">
        {data.points.map((pt, i) => (
          <div key={i} className="rounded-sm border border-emerald-600/15 bg-paper p-4">
            <span className="num block text-[0.7rem] font-bold text-emerald-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-display text-[0.95rem] font-bold leading-snug text-indigo-deep">{pt.term}</h3>
            <p className="mt-1 text-[0.82rem] font-semibold italic leading-snug text-emerald-800">{pt.layTerm}</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-indigo-soft">{pt.analogy}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
