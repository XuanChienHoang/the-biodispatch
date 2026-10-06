"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/InstrumentRail";
import { useLanguageStore, DICT } from "@/lib/i18n";

/** Masthead gọn: tên ấn phẩm + tiêu đề một dòng. Dành chỗ cho bài tiêu điểm ngay trong màn hình đầu. */
export function Hero() {
  const { lang, setLang } = useLanguageStore();
  const t = DICT[lang];

  return (
    <header className="relative overflow-hidden border-b border-slate-hair">
      {/* masthead bar */}
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 lg:px-10">
        <span className="flex items-center gap-2.5 text-indigo-deep md:hidden">
          <Wordmark size={22} />
        </span>
        <span className="caps font-semibold text-indigo-deep">The BioDispatch</span>
        <span className="hidden h-3 w-px bg-slate-hair sm:block" />
        <span className="caps text-slate-ink">{t.curatorRole}</span>
        <span className="hidden h-3 w-px bg-slate-hair sm:block" />
        <span className="caps text-slate-ink">University of Hamburg</span>

        {/* Language Switcher Badge */}
        <div className="ml-auto flex items-center gap-2">
          <div className="inline-flex rounded-full border border-slate-hair bg-paper-tint p-0.5 text-xs font-mono shadow-xs">
            <button
              type="button"
              onClick={() => setLang("vi")}
              className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                lang === "vi"
                  ? "bg-indigo-deep text-white font-bold shadow-xs"
                  : "text-slate-ink hover:text-indigo-deep"
              }`}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-indigo-deep text-white font-bold shadow-xs"
                  : "text-slate-ink hover:text-indigo-deep"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </div>

      {/* compact intro */}
      <div className="mx-auto max-w-[1240px] px-6 pb-8 pt-4 lg:px-10 lg:pb-10 lg:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace font-medium">
                {t.heroPill1}
              </span>
              <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink font-medium">
                {t.heroPill2}
              </span>
              <span className="caps hidden rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink font-medium sm:inline">
                {t.heroPill3}
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.35rem)] font-black leading-[0.98] tracking-[-0.035em] text-indigo-deep">
              {t.heroTitle}
            </h1>
          </div>

          <div>
            <p className="max-w-xl text-[1.02rem] leading-[1.6] text-indigo-soft">{t.heroSubtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#directory"
                className="caps inline-flex items-center gap-2 rounded-sm bg-indigo-deep px-5 py-3 text-white transition-all duration-300 hover:bg-[#101f34] hover:shadow-lg"
              >
                <span>{t.exploreCorpus}</span>
                <span className="text-trace">↓</span>
              </a>
              <Link
                href="/gizmos"
                className="caps inline-flex items-center gap-2 rounded-sm border border-slate-hair bg-paper px-5 py-3 text-indigo-deep transition-all duration-200 hover:border-indigo-deep hover:bg-paper-tint"
              >
                <span>{t.interactiveLab}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className="caps inline-flex items-center gap-1.5 px-2 py-2 text-slate-ink transition-colors hover:text-indigo-deep"
              >
                <span>{t.aboutAuthor}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

/** Dải thông tin 4 cột (tác giả, trọng tâm, chuẩn biên tập, công cụ mô phỏng), đặt giữa kho bài và phòng lab. */
export function HeroStrip() {
  const { lang } = useLanguageStore();
  const t = DICT[lang];

  return (
    <section className="border-y border-slate-hair bg-paper-tint">
      <div className="mx-auto max-w-[1240px] px-6 py-10 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-l-2 border-indigo-deep pl-4">
            <span className="caps text-slate-ink">{t.leadInvestigator}</span>
            <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">
              {lang === "vi" ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
            </p>
            <p className="mt-0.5 text-[0.8rem] text-slate-ink">{t.leadInvestigatorSub}</p>
          </div>

          <div className="border-l-2 border-trace pl-4">
            <span className="caps text-slate-ink">{t.coreFocus}</span>
            <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">{t.coreFocusTitle}</p>
            <p className="mt-0.5 text-[0.8rem] text-slate-ink">{t.coreFocusSub}</p>
          </div>

          <div className="border-l-2 border-syn pl-4">
            <span className="caps text-slate-ink">{t.editorialRigour}</span>
            <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">{t.editorialRigourTitle}</p>
            <p className="mt-0.5 text-[0.8rem] text-slate-ink">{t.editorialRigourSub}</p>
          </div>

          <div className="border-l-2 border-plasma pl-4">
            <span className="caps text-slate-ink">{t.simEngines}</span>
            <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">{t.simEnginesTitle}</p>
            <p className="mt-0.5 text-[0.8rem] text-slate-ink">{t.simEnginesSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
