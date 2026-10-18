import { Zap, Check } from "lucide-react";
import type { ReaderBrief as ReaderBriefData } from "@/lib/reader-brief";
import { EvidenceBadge } from "./EvidenceBadge";

/**
 * Hộp "Đọc nhanh trong 60 giây": kết luận một câu + tối đa 4 ý chính.
 * Đặt ngay đầu thân bài, để người đọc bận rộn nắm được giá trị trước khi đi vào cơ chế.
 */
export function ReaderBrief({ brief, isVi }: { brief: ReaderBriefData; isVi: boolean }) {
  return (
    <section
      id="doc-nhanh"
      aria-labelledby="reader-brief-title"
      className="not-prose mb-10 scroll-mt-24 overflow-hidden rounded-sm border border-indigo-deep/15 shadow-[0_18px_40px_-32px_rgba(11,25,44,0.7)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 bg-indigo-deep px-5 py-3">
        <h2
          id="reader-brief-title"
          className="caps flex items-center gap-2 text-[0.72rem] font-bold text-white"
        >
          <Zap size={14} className="text-trace" aria-hidden />
          {isVi ? "Đọc nhanh trong 60 giây" : "The 60-second read"}
        </h2>
        {brief.evidence && <EvidenceBadge level={brief.evidence} isVi={isVi} tone="dark" />}
      </header>

      <div className="bg-gradient-to-br from-[#effcf9] via-paper to-paper px-5 py-5 sm:px-6 sm:py-6">
        {brief.bottomLine && (
          <p className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-indigo-deep sm:text-[1.3rem]">
            {brief.bottomLine}
          </p>
        )}

        {brief.takeaways.length > 0 && (
          <ul className={`grid gap-3 ${brief.bottomLine ? "mt-5 border-t border-indigo-deep/10 pt-5" : ""}`}>
            {brief.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-indigo-soft">
                <span
                  aria-hidden
                  className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
