"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

// Pairs of English <-> Vietnamese dispatches
const PAIRS: Record<string, { slug: string; lang: "vi" | "en"; label: string }> = {
  "ampk-nrf2-mtor-map": {
    "slug": "ampk-nrf2-mtor-map-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "ampk-nrf2-mtor-map-en": {
    "slug": "ampk-nrf2-mtor-map",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "chuyen-hoa-mo-nau-ucp1-ro-ri-proton": {
    "slug": "brown-fat-ucp1-mitochondrial-proton-leak",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "brown-fat-ucp1-mitochondrial-proton-leak": {
    "slug": "chuyen-hoa-mo-nau-ucp1-ro-ri-proton",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "butyrate-scfa-epigenetics-histone-gut-barrier": {
    "slug": "butyrate-scfa-epigenetics-histone-gut-barrier-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "butyrate-scfa-epigenetics-histone-gut-barrier-en": {
    "slug": "butyrate-scfa-epigenetics-histone-gut-barrier",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "cancer-seed-and-soil-metabolism": {
    "slug": "cancer-seed-and-soil-metabolism-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "cancer-seed-and-soil-metabolism-en": {
    "slug": "cancer-seed-and-soil-metabolism",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "cholesterol-myth-vascular-inflammation": {
    "slug": "cholesterol-myth-vascular-inflammation-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "cholesterol-myth-vascular-inflammation-en": {
    "slug": "cholesterol-myth-vascular-inflammation",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "curcumin-piperine-sinh-kha-dung": {
    "slug": "curcumin-piperine-bioavailability",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "curcumin-piperine-bioavailability": {
    "slug": "curcumin-piperine-sinh-kha-dung",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "forecasting-hs-crp-delta": {
    "slug": "forecasting-hs-crp-delta-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "forecasting-hs-crp-delta-en": {
    "slug": "forecasting-hs-crp-delta",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "glp1-keo-dai-tuoi-tho-nature": {
    "slug": "glp1-longevity-nature-mitochondria",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "glp1-longevity-nature-mitochondria": {
    "slug": "glp1-keo-dai-tuoi-tho-nature",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "glymphatic-deep-sleep-brain-cleaning": {
    "slug": "glymphatic-deep-sleep-brain-cleaning-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "glymphatic-deep-sleep-brain-cleaning-en": {
    "slug": "glymphatic-deep-sleep-brain-cleaning",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "insulin-igf1-cancer-proliferation": {
    "slug": "insulin-igf1-cancer-proliferation-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "insulin-igf1-cancer-proliferation-en": {
    "slug": "insulin-igf1-cancer-proliferation",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "melatonin-circadian-zeitgeber": {
    "slug": "melatonin-circadian-zeitgeber-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "melatonin-circadian-zeitgeber-en": {
    "slug": "melatonin-circadian-zeitgeber",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "metabolomic-horizon-clinical-diagnostics-vi": {
    "slug": "metabolomic-horizon-clinical-diagnostics",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "metabolomic-horizon-clinical-diagnostics": {
    "slug": "metabolomic-horizon-clinical-diagnostics-vi",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "mevalonate-statin-coq10-vi": {
    "slug": "mevalonate-statin-coq10-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "mevalonate-statin-coq10-en": {
    "slug": "mevalonate-statin-coq10-vi",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "nad-cd38-sirtuin-mitochondria-cellular-aging": {
    "slug": "nad-cd38-sirtuin-mitochondria-cellular-aging-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "nad-cd38-sirtuin-mitochondria-cellular-aging-en": {
    "slug": "nad-cd38-sirtuin-mitochondria-cellular-aging",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "nobel-medicine-2026-optogenetics": {
    "slug": "nobel-medicine-2026-optogenetics-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "nobel-medicine-2026-optogenetics-en": {
    "slug": "nobel-medicine-2026-optogenetics",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "oxldl-sdldl-atherosclerosis-mechanism": {
    "slug": "oxldl-sdldl-atherosclerosis-mechanism-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "oxldl-sdldl-atherosclerosis-mechanism-en": {
    "slug": "oxldl-sdldl-atherosclerosis-mechanism",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "pharmacokinetics-one-compartment": {
    "slug": "pharmacokinetics-one-compartment-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "pharmacokinetics-one-compartment-en": {
    "slug": "pharmacokinetics-one-compartment",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "policosanol-versus-statins": {
    "slug": "policosanol-versus-statins-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "policosanol-versus-statins-en": {
    "slug": "policosanol-versus-statins",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "resistant-starch-scfa-gut-vi": {
    "slug": "resistant-starch-scfa-gut-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "resistant-starch-scfa-gut-en": {
    "slug": "resistant-starch-scfa-gut-vi",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "succinate-creatine-bat-thermogenesis-vi": {
    "slug": "succinate-ucp1-bat-mitochondrial-thermogenesis",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "succinate-creatine-bat-thermogenesis-en": {
    "slug": "succinate-ucp1-bat-sinh-nhiet-ty-the",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "succinate-ucp1-bat-mitochondrial-thermogenesis": {
    "slug": "succinate-ucp1-bat-sinh-nhiet-ty-the",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "succinate-ucp1-bat-sinh-nhiet-ty-the": {
    "slug": "succinate-ucp1-bat-mitochondrial-thermogenesis",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "sulforaphane-nrf2-window": {
    "slug": "sulforaphane-nrf2-window-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "sulforaphane-nrf2-window-en": {
    "slug": "sulforaphane-nrf2-window",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "supplement-drug-interaction-matrix": {
    "slug": "supplement-drug-interaction-matrix-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "supplement-drug-interaction-matrix-en": {
    "slug": "supplement-drug-interaction-matrix",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "triglyceride-hdl-ratio-metabolic-health": {
    "slug": "triglyceride-hdl-ratio-metabolic-health-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "triglyceride-hdl-ratio-metabolic-health-en": {
    "slug": "triglyceride-hdl-ratio-metabolic-health",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  },
  "warburg-effect-cancer-metabolism": {
    "slug": "warburg-effect-cancer-metabolism-en",
    "lang": "en",
    "label": "English Edition (Academic Rigour)"
  },
  "warburg-effect-cancer-metabolism-en": {
    "slug": "warburg-effect-cancer-metabolism",
    "lang": "vi",
    "label": "Bản Tiếng Việt (Ngôn ngữ Y khoa Dễ hiểu)"
  }
};

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
  const { lang, setLang } = useLanguageStore();
  const [showAnalogy, setShowAnalogy] = useState(true);

  const alternate = PAIRS[currentSlug];
  const isViCurrent =
    articleMeta?.lang === "vi" ||
    currentSlug.endsWith("-vi") ||
    currentSlug.includes("sinh-kha-dung") ||
    currentSlug.includes("keo-dai-tuoi-tho") ||
    currentSlug.includes("mo-nau") ||
    currentSlug.includes("sinh-nhiet") ||
    !currentSlug.endsWith("-en");

  const analogyData: LaymanMedicalBoxData = resolveLaymanMedicalData(currentSlug, articleMeta);

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
              : "Scientific Literature Synthesis"}
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
