"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  BookOpen,
  LineChart,
  Layers,
  Heart,
  Sparkles,
  Brain,
  Flame,
  ShieldCheck,
  ChevronRight,
  Eye,
} from "lucide-react";
import { ORGANS, TIERS, type Article, type Tier, type Organ } from "@/lib/content";
import { inkOn, onPaper } from "@/lib/tones";
import { useLanguageStore, DICT } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI } from "@/lib/home";

const TIER_META: Record<Tier, { icon: typeof BookOpen; color: string; labelVi: string }> = {
  Fundamentals: { icon: BookOpen, color: "#64748B", labelVi: "Nền tảng Y sinh" },
  "Clinical Deep-Dive": { icon: LineChart, color: "#00F2FE", labelVi: "Phân tích Lâm sàng" },
  "Lab Gizmo": { icon: FlaskConical, color: "#10B981", labelVi: "Mô phỏng Dược học" },
};

type TabKey = "All" | Organ | "GizmosOnly";

interface TabItem {
  key: TabKey;
  labelEn: string;
  labelVi: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  { key: "All", labelEn: "All Dispatches", labelVi: "Toàn bộ Kho bài", icon: <Layers size={14} /> },
  { key: "Metabolic", labelEn: "Metabolic & BAT", labelVi: "Chuyển hóa & BAT", icon: <Flame size={14} /> },
  { key: "Heart", labelEn: "Cardiovascular", labelVi: "Tim mạch & Mỡ máu", icon: <Heart size={14} /> },
  { key: "Cellular Aging", labelEn: "Cellular Aging & Cancer", labelVi: "Trẻ hóa & Ung thư", icon: <Sparkles size={14} /> },
  { key: "Brain", labelEn: "Neuro & Sleep", labelVi: "Não bộ & Giấc ngủ", icon: <Brain size={14} /> },
  { key: "Gut", labelEn: "Gut & Microbiome", labelVi: "Đường ruột & Hệ vi sinh", icon: <ShieldCheck size={14} /> },
  { key: "Immune", labelEn: "Immunity & Bioavailability", labelVi: "Miễn dịch & Hấp thu", icon: <FlaskConical size={14} /> },
  { key: "GizmosOnly", labelEn: "Interactive Simulators", labelVi: "Có Bộ máy Mô phỏng", icon: <FlaskConical size={14} /> },
];

export function Directory({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const t = DICT[lang];
  const isVi = lang === "vi";

  // Tab chuyên đề đang chọn
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  // Lọc thêm theo độ sâu lâm sàng (tier) nếu muốn
  const [selectedTier, setSelectedTier] = useState<Tier | "All">("All");
  // Từ khóa tìm kiếm ngay trong Kho bài
  const [searchQuery, setSearchQuery] = useState("");

  // Mỗi chủ đề một phiên bản đúng ngôn ngữ đang chọn
  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  // Danh sách bài được lọc theo tab chuyên đề, độ sâu và từ khóa tìm kiếm
  const filteredList = useMemo(() => {
    return pool.filter((a) => {
      // 1. Lọc theo tab
      if (activeTab === "GizmosOnly") {
        if (!a.gizmo) return false;
      } else if (activeTab !== "All") {
        if (a.organ !== activeTab) return false;
      }

      // 2. Lọc theo tier
      if (selectedTier !== "All" && a.tier !== selectedTier) {
        return false;
      }

      // 3. Lọc theo từ khóa tìm kiếm
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const title = (isVi && a.titleVi ? a.titleVi : a.title).toLowerCase();
        const dek = (isVi && a.dekVi ? a.dekVi : a.dek).toLowerCase();
        const organ = (isVi ? ORGAN_VI[a.organ] : a.organ).toLowerCase();
        if (!title.includes(q) && !dek.includes(q) && !organ.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [pool, activeTab, selectedTier, searchQuery, isVi]);

  return (
    <section id="directory" className="mx-auto max-w-[1240px] scroll-mt-8 px-6 py-12 lg:px-10 lg:py-16">
      {/* Header khu vực */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-indigo-deep pb-5">
        <div>
          <span className="caps text-slate-ink">
            {isVi ? "§ 1 · Thư viện Báo cáo & Tra cứu Chuyên sâu" : "§ 1 · Article Directory & Specialized Corpus"}
          </span>
          <h2 className="mt-3 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            {isVi ? "Kho Bài viết Chuyên sâu." : "The Specialised Corpus."}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Lọc nhanh trong kho bài..." : "Filter in corpus..."}
              className="w-full rounded-full border border-slate-hair bg-paper-tint py-2 pl-9 pr-4 text-xs font-sans text-indigo-deep placeholder:text-slate-mute focus:border-indigo-deep focus:bg-paper focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-slate-mute">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-slate-mute hover:text-indigo-deep cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* THANH TABS CHUYÊN ĐỀ NGANG */}
      <div className="mt-8 border-b border-slate-hair">
        <div className="no-scrollbar -mb-px flex space-x-2 overflow-x-auto pb-2 sm:space-x-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            // Đếm số bài tương ứng trong tab này
            const count = pool.filter((a) => {
              if (tab.key === "GizmosOnly") return !!a.gizmo;
              if (tab.key === "All") return true;
              return a.organ === tab.key;
            }).length;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                }}
                className={`group flex shrink-0 items-center gap-2 rounded-t-sm border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-indigo-deep bg-paper text-indigo-deep font-bold shadow-xs"
                    : "border-transparent text-slate-ink hover:border-slate-300 hover:text-indigo-deep"
                }`}
              >
                <span className={isActive ? "text-trace-ink" : "text-slate-mute group-hover:text-indigo-deep"}>
                  {tab.icon}
                </span>
                <span>{isVi ? tab.labelVi : tab.labelEn}</span>
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.7rem] font-mono ${
                    isActive ? "bg-indigo-deep text-white" : "bg-slate-hair text-slate-ink"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THANH ĐIỀU KHIỂN PHỤ: Lọc theo độ sâu lâm sàng (Tier) */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-hair pb-4 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps text-xs font-semibold text-slate-ink">
            {isVi ? "Độ sâu phân tích:" : "Analytical Depth:"}
          </span>
          <button
            type="button"
            onClick={() => setSelectedTier("All")}
            className={`caps rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
              selectedTier === "All"
                ? "bg-indigo-deep text-white font-bold"
                : "bg-paper-tint text-slate-ink border border-slate-hair hover:text-indigo-deep"
            }`}
          >
            {isVi ? "Tất cả" : "All Tiers"}
          </button>
          {TIERS.map((tierName) => (
            <button
              key={tierName}
              type="button"
              onClick={() => setSelectedTier(tierName)}
              className={`caps rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                selectedTier === tierName
                  ? "bg-indigo-deep text-white font-bold"
                  : "bg-paper-tint text-slate-ink border border-slate-hair hover:text-indigo-deep"
              }`}
            >
              {isVi ? TIER_META[tierName].labelVi : tierName}
            </button>
          ))}
        </div>

        <div className="caps text-xs text-slate-ink">
          {isVi
            ? `Hiển thị ${filteredList.length} bài phân tích`
            : `Displaying ${filteredList.length} monographs`}
        </div>
      </div>

      {/* DANH SÁCH BÀI THEO TAB ĐANG CHỌN */}
      {filteredList.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-slate-hair bg-paper-tint px-8 py-16 text-center">
          <FlaskConical className="mx-auto text-slate-ink" size={28} />
          <p className="mt-4 font-display text-base text-indigo-deep">
            {isVi ? "Chưa có bài viết ở chuyên đề và bộ lọc này." : "No monographs match this specialized filter."}
          </p>
          <button
            onClick={() => {
              setActiveTab("All");
              setSelectedTier("All");
            }}
            className="caps mt-5 rounded-sm bg-indigo-deep px-4 py-2 text-xs font-semibold text-paper hover:bg-indigo-mid cursor-pointer"
          >
            {isVi ? "Đặt lại về Tất cả" : "Reset to All"}
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredList.map((a, i) => {
              const meta = TIER_META[a.tier];
              const Icon = meta.icon;
              const accent = ORGAN_ACCENT[a.organ];
              const displayTitle = isVi && a.titleVi ? a.titleVi : a.title;
              const displayDek = isVi && a.dekVi ? a.dekVi : a.dek;

              return (
                <motion.article
                  layout
                  key={a.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col overflow-hidden rounded-sm border border-slate-hair bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-deep hover:shadow-md"
                >
                  <Link
                    href={`/blog/${a.slug}`}
                    className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace"
                  >
                    <div className="relative aspect-video overflow-hidden bg-indigo-deep">
                      {a.thumb ? (
                        <Image
                          src={a.thumb}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{ background: `radial-gradient(ellipse at 75% 25%, ${accent}40 0%, #0B192C 70%)` }}
                        >
                          <div className="graticule absolute inset-0 opacity-40" />
                        </div>
                      )}
                      <span className="caps absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                        {isVi ? ORGAN_VI[a.organ] : a.organ}
                      </span>
                      {a.gizmo && (
                        <span
                          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[#050d19]/85 text-trace backdrop-blur-sm"
                          title={t.embeddedGizmo}
                        >
                          <FlaskConical size={13} />
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[1.08rem] font-semibold leading-[1.2] tracking-[-0.02em] text-indigo-deep line-clamp-3 transition-colors group-hover:text-trace-ink">
                        {displayTitle}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-slate-ink line-clamp-2">
                        {displayDek}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-hair pt-3 text-xs">
                        <span
                          className="caps flex items-center gap-1.5 font-semibold"
                          style={{ color: onPaper(meta.color) }}
                        >
                          <Icon size={12} />
                          {isVi ? meta.labelVi : a.tier}
                        </span>
                        <span className="caps text-slate-ink">
                          {formatDate(a.date, lang)} · {a.minutes} {t.minRead}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
