"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, BookOpen, FlaskConical, Award } from "lucide-react";
import { Wordmark } from "@/components/InstrumentRail";
import { useLanguageStore, DICT } from "@/lib/i18n";
import { SearchModal } from "@/components/SearchModal";
import type { Article } from "@/lib/content";

/** Masthead & Hero: Định vị ấn phẩm khoa học, thanh tìm kiếm thông minh và banner nghệ thuật y sinh. */
export function Hero({ articles = [] }: { articles?: Article[] }) {
  const { lang, setLang } = useLanguageStore();
  const t = DICT[lang];
  const isVi = lang === "vi";

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="relative overflow-hidden border-b border-slate-hair bg-paper">
        {/* 1. TOP MASTHEAD BAR: Đầy đủ tên ấn phẩm, tác giả, khung tìm kiếm nhanh và chuyển ngữ */}
        <div className="border-b border-slate-hair/80 bg-paper-tint/60">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-y-3 px-6 py-3 lg:px-10">
            {/* Cụm định danh bên trái */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-indigo-deep md:hidden">
                <Wordmark size={22} />
              </span>
              <span className="font-display font-black text-sm tracking-tight text-indigo-deep">
                The BioDispatch
              </span>
              <span className="hidden h-3.5 w-px bg-slate-hair sm:block" />
              <span className="caps hidden text-xs font-semibold text-slate-ink sm:inline">
                {isVi ? "TS. Hoàng Xuân Chiến · ĐH Hamburg" : "Dr. Xuan Chien Hoang · Univ. of Hamburg"}
              </span>
              <span className="hidden h-3.5 w-px bg-slate-hair md:block" />
              <span className="caps hidden text-[11px] text-slate-mute md:inline">
                {isVi ? "Tòa soạn Y sinh Thực chứng" : "Evidence-Based Intelligence"}
              </span>
            </div>

            {/* Cụm bên phải: Nút Search góc & Bộ chọn Ngôn ngữ */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Nút Tìm kiếm nhanh ở góc (Quick Search trigger) */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-slate-hair bg-paper px-3 py-1.5 text-xs text-slate-ink shadow-2xs transition-all hover:border-indigo-deep hover:text-indigo-deep hover:shadow-xs cursor-pointer sm:px-3.5"
                title={isVi ? "Tìm kiếm bài viết (Ctrl + K)" : "Search monographs (Ctrl + K)"}
              >
                <Search size={13} className="text-slate-mute group-hover:text-trace-ink shrink-0" />
                <span className="font-medium hidden sm:inline">
                  {isVi ? "Tìm kiếm..." : "Search..."}
                </span>
                <span className="font-medium inline sm:hidden">
                  {isVi ? "Tìm" : "Find"}
                </span>
                <span className="rounded bg-slate-hair/70 px-1.5 py-0.5 text-[10px] font-mono text-slate-ink font-semibold hidden md:inline">
                  ⌘K
                </span>
              </button>

              {/* Language Switcher Badge */}
              <div className="inline-flex rounded-full border border-slate-hair bg-paper p-0.5 text-xs font-mono shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLang("vi")}
                  className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                    lang === "vi"
                      ? "bg-indigo-deep text-white font-bold shadow-xs"
                      : "text-slate-ink hover:text-indigo-deep"
                  }`}
                >
                  🇻🇳 VI
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
                  🇬🇧 EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. KHU VỰC GIỚI THIỆU CHÍNH (EDITORIAL INTRO SẮP XẾP LẠI TINH TẾ) */}
        <div className="mx-auto max-w-[1240px] px-6 pb-6 pt-8 lg:px-10 lg:pb-10 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-12 lg:items-center"
          >
            {/* Cột Trái (7/12): Title + Badges + Subtitle rõ ràng */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1 text-xs text-trace font-semibold">
                  {t.heroPill1}
                </span>
                <span className="caps rounded-sm border border-slate-hair bg-paper-tint px-2.5 py-1 text-xs text-slate-ink font-semibold">
                  {t.heroPill2}
                </span>
                <span className="caps hidden rounded-sm border border-slate-hair bg-paper-tint px-2.5 py-1 text-xs text-slate-ink font-semibold sm:inline">
                  {t.heroPill3}
                </span>
              </div>

              <h1 className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-indigo-deep">
                {t.heroTitle}
              </h1>

              {/* Lời tựa: Định vị Tòa soạn mạch lạc, sang trọng */}
              <p className="mt-4 max-w-xl text-[1.02rem] leading-[1.65] text-indigo-soft">
                {t.heroSubtitle}
              </p>

              {/* Nút hành động chính */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#directory"
                  className="caps inline-flex items-center gap-2 rounded-sm bg-indigo-deep px-5 py-3 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#101f34] hover:shadow-md"
                >
                  <span>{t.exploreCorpus}</span>
                  <span className="text-trace">↓</span>
                </a>
                <Link
                  href="/gizmos"
                  className="caps inline-flex items-center gap-2 rounded-sm border border-slate-hair bg-paper px-4 py-3 text-xs font-semibold text-indigo-deep transition-all duration-200 hover:border-indigo-deep hover:bg-paper-tint"
                >
                  <span>{t.interactiveLab}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/about"
                  className="caps inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-ink transition-colors hover:text-indigo-deep"
                >
                  <span>{t.aboutAuthor}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Cột Phải (5/12): Card giới thiệu Tác giả & 3 Trụ cột Khoa học */}
            <div className="lg:col-span-5">
              <div className="rounded-sm border border-slate-hair bg-paper-tint/80 p-5 sm:p-6 shadow-xs">
                <div className="flex items-start justify-between border-b border-slate-hair pb-3.5">
                  <div>
                    <span className="caps text-[11px] font-bold text-trace-ink">
                      {isVi ? "CHỦ BIÊN TÒA SOẠN" : "CURATOR & LEAD INVESTIGATOR"}
                    </span>
                    <h3 className="font-display text-lg font-bold text-indigo-deep mt-0.5">
                      {isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
                    </h3>
                    <p className="text-xs text-slate-ink mt-0.5">
                      {isVi
                        ? "Tiến sĩ Sinh học Phân tử (Dr. rer. nat.) · ĐH Hamburg, CHLB Đức"
                        : "Dr. rer. nat. in Molecular Biology · University of Hamburg"}
                    </p>
                  </div>
                  <span className="rounded bg-indigo-deep px-2 py-1 text-[10px] font-mono font-bold text-trace">
                    EBM Verified
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded p-1 bg-amber-50 text-amber-600 shrink-0">
                      <Sparkles size={13} />
                    </div>
                    <div>
                      <span className="font-semibold text-indigo-deep">
                        {isVi ? "Dược lý học Tự nhiên Á - Âu: " : "East-West Ethnobotanicals: "}
                      </span>
                      <span className="text-slate-ink">
                        {isVi
                          ? "Chuẩn hóa hoạt chất, tối ưu hấp thu (sinh khả dụng)."
                          : "Standardized active phytochemicals & bioavailability."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded p-1 bg-teal-50 text-teal-600 shrink-0">
                      <BookOpen size={13} />
                    </div>
                    <div>
                      <span className="font-semibold text-indigo-deep">
                        {isVi ? "100% Y học Thực chứng: " : "Evidence-Based Medicine: "}
                      </span>
                      <span className="text-slate-ink">
                        {isVi
                          ? "Đối soát trực tiếp mã PubMed PMID và DOI thử nghiệm lâm sàng."
                          : "Strictly backed by primary PubMed PMIDs and clinical DOIs."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded p-1 bg-cyan-50 text-cyan-600 shrink-0">
                      <FlaskConical size={13} />
                    </div>
                    <div>
                      <span className="font-semibold text-indigo-deep">
                        {isVi ? "Mô phỏng Dược động học: " : "Simulation Engines: "}
                      </span>
                      <span className="text-slate-ink">
                        {isVi
                          ? "Các công cụ tính toán nồng độ thuốc, hiệp đồng và chỉ số."
                          : "Interactive local calculators for PK curves and biomarkers."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. TRANH NGHỆ THUẬT KHOA HỌC (SHOWCASE BANNER) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 overflow-hidden rounded-sm border border-slate-hair bg-indigo-deep shadow-sm lg:mt-10"
          >
            <div className="relative aspect-[21/9] w-full min-h-[220px] max-h-[380px] sm:aspect-[24/9]">
              <Image
                src="/images/biodispatch-hero-banner.jpg"
                alt="The BioDispatch — Molecular Bridge between Botanical Pharmacology and Precision Medicine"
                fill
                priority
                sizes="(min-width: 1280px) 1240px, 100vw"
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.02]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-deep/90 via-indigo-deep/20 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-deep/80 via-transparent to-transparent hidden sm:block"
              />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-trace animate-pulse" />
                      <span className="caps text-xs font-mono font-bold tracking-wider text-trace">
                        {isVi ? "CẦU NỐI DƯỢC LIỆU Á - ÂU & Y HỌC THỰC CHỨNG" : "EAST-WEST BOTANICAL PHARMACOLOGY BRIDGE"}
                      </span>
                    </div>
                    <p className="mt-1.5 font-display text-base font-medium text-white/95 sm:text-lg lg:text-xl leading-snug">
                      {isVi
                        ? "Giải mã cơ chế hấp thu phân tử, tối ưu sinh khả dụng và phân tích lâm sàng chuyên sâu."
                        : "Decoding molecular bio-enhancers, bioavailability kinetics, and clinical pharmacology."}
                    </p>
                  </div>
                  <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-white/70 border-l border-white/20 pl-4">
                    <span>Dr. Xuan Chien Hoang</span>
                    <span>·</span>
                    <span>Univ. of Hamburg</span>
                    <span>·</span>
                    <span className="text-trace">PubMed / CrossRef Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* MODAL TÌM KIẾM TOÀN TRANG */}
      <SearchModal
        articles={articles}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
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
