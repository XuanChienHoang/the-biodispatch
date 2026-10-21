"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ChevronDown, ChevronUp, BookOpen, ArrowRight, Languages } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";
import { resolveTwin } from "@/lib/twin-catalog";
import { resolveLaymanMedicalData } from "@/lib/layman-resolver";
import type { LaymanMedicalBoxData } from "@/lib/medical-analogies";

export function ArticleLanguageBar({
  currentSlug,
  articleMeta,
}: {
  currentSlug: string;
  articleMeta?: {
    title?: string;
    excerpt?: string;
    content?: string;
    lang?: "vi" | "en";
  };
}) {
  const router = useRouter();
  const { lang, setLang } = useLanguageStore();
  const [showAnalogy, setShowAnalogy] = useState(true);

  const twin = resolveTwin(currentSlug);

  // Determine current language accurately
  const isViCurrent =
    twin ? twin.lang === "en" :
    (articleMeta?.lang === "vi" ||
    currentSlug.endsWith("-vi") ||
    currentSlug.includes("sinh-kha-dung") ||
    currentSlug.includes("keo-dai-tuoi-tho") ||
    currentSlug.includes("mo-nau") ||
    currentSlug.includes("sinh-nhiet") ||
    !currentSlug.endsWith("-en"));

  // Sync store with current article language on mount or slug change
  useEffect(() => {
    const expectedLang = isViCurrent ? "vi" : "en";
    if (lang !== expectedLang) {
      setLang(expectedLang);
    }
  }, [isViCurrent, lang, setLang]);

  const analogyData: LaymanMedicalBoxData = resolveLaymanMedicalData(currentSlug, articleMeta);

  const handleSwitchLanguage = (targetLang: "vi" | "en") => {
    if ((targetLang === "vi" && isViCurrent) || (targetLang === "en" && !isViCurrent)) {
      return;
    }
    setLang(targetLang);
    if (twin?.slug) {
      router.push(`/blog/${twin.slug}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Interactive Bilingual Language Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-indigo-deep/20 bg-paper-tint/90 px-3.5 py-2.5 text-xs shadow-2xs backdrop-blur-xs">
        {/* Left: Dual Language Segmented Tabs */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-ink font-mono text-[11px] font-semibold">
            <Languages size={13} className="text-indigo-deep" />
            <span>{isViCurrent ? "Bản dịch song sinh:" : "Bilingual Edition:"}</span>
          </span>

          <div className="inline-flex items-center rounded-sm border border-slate-hair bg-paper p-0.5 shadow-2xs font-mono">
            {/* Tiếng Việt Tab */}
            {isViCurrent ? (
              <span className="inline-flex items-center gap-1 rounded-xs bg-indigo-deep px-2.5 py-1 text-[11px] font-bold text-trace shadow-xs">
                🇻🇳 Tiếng Việt
              </span>
            ) : twin?.slug ? (
              <Link
                href={`/blog/${twin.slug}`}
                onClick={() => setLang("vi")}
                className="inline-flex items-center gap-1 rounded-xs px-2.5 py-1 text-[11px] font-medium text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/40 transition-all cursor-pointer"
                title="Chuyển ngay sang bản Tiếng Việt"
              >
                🇻🇳 Tiếng Việt
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleSwitchLanguage("vi")}
                className="inline-flex items-center gap-1 rounded-xs px-2.5 py-1 text-[11px] font-medium text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/40 transition-all cursor-pointer"
              >
                🇻🇳 Tiếng Việt
              </button>
            )}

            {/* English Tab */}
            {!isViCurrent ? (
              <span className="inline-flex items-center gap-1 rounded-xs bg-indigo-deep px-2.5 py-1 text-[11px] font-bold text-trace shadow-xs">
                🇬🇧 English
              </span>
            ) : twin?.slug ? (
              <Link
                href={`/blog/${twin.slug}`}
                onClick={() => setLang("en")}
                className="inline-flex items-center gap-1 rounded-xs px-2.5 py-1 text-[11px] font-medium text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/40 transition-all cursor-pointer"
                title="Switch immediately to English Edition"
              >
                🇬🇧 English
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleSwitchLanguage("en")}
                className="inline-flex items-center gap-1 rounded-xs px-2.5 py-1 text-[11px] font-medium text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/40 transition-all cursor-pointer"
              >
                🇬🇧 English
              </button>
            )}
          </div>
        </div>

        {/* Right: Direct Twin Dispatch Link */}
        {twin?.slug && (
          <Link
            href={`/blog/${twin.slug}`}
            onClick={() => setLang(twin.lang)}
            className="caps group inline-flex items-center gap-1.5 rounded-sm bg-indigo-deep/5 px-3 py-1 font-semibold text-indigo-deep border border-indigo-deep/20 transition-all hover:bg-indigo-deep hover:text-trace cursor-pointer"
            title={twin.title}
          >
            <Sparkles size={12} className="text-amber-500 group-hover:text-trace" />
            <span className="max-w-[200px] sm:max-w-[320px] truncate text-[11px]">
              {isViCurrent ? "Đọc bản Tiếng Anh (Academic Edition)" : "Đọc bản Tiếng Việt (Y sinh Dễ hiểu)"}
            </span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Accessible Medical Analogy Callout Box (Rendered on EVERY article) */}
      {analogyData && analogyData.points && analogyData.points.length > 0 && (
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
