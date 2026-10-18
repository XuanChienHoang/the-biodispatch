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
  Coffee,
} from "lucide-react";
import { ORGANS, TIERS, type Article, type Tier, type Organ } from "@/lib/content";
import { inkOn, onPaper } from "@/lib/tones";
import { useLanguageStore, DICT } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI } from "@/lib/home";
import { HEALTH_GOALS, matchesHealthGoal } from "@/lib/health-goals";

const TIER_META: Record<string, { icon: typeof BookOpen; color: string; labelVi: string }> = {
  Fundamentals: { icon: BookOpen, color: "#64748B", labelVi: "Nền tảng Y sinh" },
  "Clinical Deep-Dive": { icon: LineChart, color: "#00F2FE", labelVi: "Phân tích Lâm sàng" },
  "Lab Gizmo": { icon: FlaskConical, color: "#10B981", labelVi: "Mô phỏng Dược học" },
  "Life Dispatch": { icon: Coffee, color: "#059669", labelVi: "🌿 Khoa học Đời sống (Dễ hiểu)" },
};

type TabKey = "All" | "LifeDispatch" | Organ | "GizmosOnly";

interface TabItem {
  key: TabKey;
  labelEn: string;
  labelVi: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  { key: "All", labelEn: "All Dispatches", labelVi: "Toàn bộ Kho bài", icon: <Layers size={14} /> },
  { key: "LifeDispatch", labelEn: "🌿 Living Science & Habits", labelVi: "🌿 Khoa học Đời sống (Dễ hiểu)", icon: <Coffee size={14} /> },
  { key: "Metabolic", labelEn: "Metabolic & BAT", labelVi: "Chuyển hóa & Dinh dưỡng", icon: <Flame size={14} /> },
  { key: "Heart", labelEn: "Cardiovascular", labelVi: "Tim mạch & Mỡ máu", icon: <Heart size={14} /> },
  { key: "Brain", labelEn: "Neuro & Sleep", labelVi: "Não bộ & Giấc ngủ", icon: <Brain size={14} /> },
  { key: "Gut", labelEn: "Gut & Microbiome", labelVi: "Đường ruột & Hệ vi sinh", icon: <ShieldCheck size={14} /> },
  { key: "Cellular Aging", labelEn: "Cellular Aging & Cancer", labelVi: "Trẻ hóa & Ung thư", icon: <Sparkles size={14} /> },
  { key: "Immune", labelEn: "Immunity & Bioavailability", labelVi: "Miễn dịch & Hấp thu", icon: <FlaskConical size={14} /> },
  { key: "GizmosOnly", labelEn: "Interactive Simulators", labelVi: "Có Bộ máy Mô phỏng", icon: <FlaskConical size={14} /> },
];

export function Directory({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const t = DICT[lang];
  const isVi = lang === "vi";

  // Tab chuyên đề đang chọn (mặc định All, nhưng người đọc có thể bấm nhanh sang LifeDispatch)
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  // Lọc thêm theo độ sâu lâm sàng (tier) nếu muốn
  const [selectedTier, setSelectedTier] = useState<Tier | "All">("All");
  // Lọc theo Nhu cầu Sức khỏe / Triệu chứng thực tế (v2)
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  // Từ khóa tìm kiếm ngay trong Kho bài
  const [searchQuery, setSearchQuery] = useState("");
  // v2: Tinh gọn trang chủ — Mặc định hiển thị 12 bài, có nút "Xem thêm bài viết"
  const [visibleCount, setVisibleCount] = useState(12);

  // Mỗi chủ đề một phiên bản đúng ngôn ngữ đang chọn
  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  // Danh sách bài được lọc theo nhu cầu sức khỏe, tab chuyên đề, độ sâu và từ khóa tìm kiếm
  const filteredList = useMemo(() => {
    return pool.filter((a) => {
      // 1. Lọc theo Nhu cầu sức khỏe / Triệu chứng thực tế (Health Goal)
      if (selectedGoal !== "all" && !matchesHealthGoal(a, selectedGoal)) {
        return false;
      }

      // 2. Lọc theo tab cơ quan
      if (activeTab === "LifeDispatch") {
        if (a.tier !== "Life Dispatch") return false;
      } else if (activeTab === "GizmosOnly") {
        if (!a.gizmo) return false;
      } else if (activeTab !== "All") {
        if (a.organ !== activeTab) return false;
      }

      // 3. Lọc theo tier
      if (selectedTier !== "All" && a.tier !== selectedTier) {
        return false;
      }

      // 4. Lọc theo từ khóa tìm kiếm
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
  }, [pool, selectedGoal, activeTab, selectedTier, searchQuery, isVi]);

  return (
    <section id="directory" className="mx-auto max-w-[1240px] scroll-mt-8 px-6 py-12 lg:px-10 lg:py-16">
      {/* Header khu vực */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-indigo-deep pb-5">
        <div>
          <span className="caps text-slate-ink">
            {isVi ? "§ 1 · Thư viện Báo cáo & Tra cứu Toàn văn" : "§ 1 · Complete Article Directory & Corpus"}
          </span>
          <h2 className="mt-3 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            {isVi ? "Kho Bài viết Y sinh & Đời sống." : "The Complete Corpus."}
          </h2>
          <p className="mt-2 text-sm text-slate-ink max-w-xl">
            {isVi
              ? "Tra cứu toàn diện các bài viết phân tích từ khoa học thường thức ứng dụng hàng ngày đến các chuyên khảo dược học và mô phỏng tương tác."
              : "Search and filter through all dispatches — from accessible daily preventive habits to advanced molecular monographs."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm theo tiêu đề, chủ đề..." : "Search in corpus..."}
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

      {/* BỘ LỌC NHU CẦU & TRIỆU CHỨNG THỰC TẾ (v2: Health Goal & Symptom Pills) */}
      <div className="mt-7 rounded-sm border border-indigo-deep/15 bg-paper-tint/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="caps text-xs font-bold text-indigo-deep flex items-center gap-1.5">
            <span>🎯</span>
            {isVi ? "Tra cứu theo Nhu cầu Sức khỏe & Triệu chứng thực tế:" : "Filter by Health Goal & Real-world Symptom:"}
          </span>
          {selectedGoal !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedGoal("all")}
              className="text-xs font-mono text-trace-ink hover:underline cursor-pointer"
            >
              {isVi ? "✕ Đặt lại tất cả" : "✕ Reset filter"}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedGoal("all")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              selectedGoal === "all"
                ? "bg-indigo-deep text-white font-bold shadow-xs"
                : "border border-slate-hair bg-paper text-slate-ink hover:border-indigo-deep hover:text-indigo-deep"
            }`}
          >
            <span>✨</span>
            <span>{isVi ? "Tất cả nhu cầu" : "All Health Goals"}</span>
          </button>
          {HEALTH_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const count = pool.filter((a) => matchesHealthGoal(a, goal.id)).length;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoal(isSelected ? "all" : goal.id)}
                title={isVi ? goal.descriptionVi : goal.descriptionEn}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-teal-700 text-white font-bold shadow-xs ring-2 ring-teal-700/30"
                    : "border border-slate-hair bg-paper text-slate-ink hover:border-teal-600 hover:text-indigo-deep"
                }`}
              >
                <span>{goal.icon}</span>
                <span>{isVi ? goal.labelVi : goal.labelEn}</span>
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected ? "bg-white/25 text-white" : "bg-slate-hair text-slate-ink"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THANH TABS CHUYÊN ĐỀ NGANG */}
      <div className="mt-8 border-b border-slate-hair">
        <div className="no-scrollbar -mb-px flex space-x-2 overflow-x-auto pb-2 sm:space-x-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = pool.filter((a) => {
              if (tab.key === "LifeDispatch") return a.tier === "Life Dispatch";
              if (tab.key === "GizmosOnly") return !!a.gizmo;
              if (tab.key === "All") return true;
              return a.organ === tab.key;
            }).length;

            const isLifeTab = tab.key === "LifeDispatch";

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                }}
                className={`group flex shrink-0 items-center gap-2 rounded-t-sm border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isLifeTab
                      ? "border-emerald-700 bg-emerald-50/40 text-emerald-800 font-bold shadow-xs"
                      : "border-indigo-deep bg-paper text-indigo-deep font-bold shadow-xs"
                    : isLifeTab
                    ? "border-transparent text-emerald-700 hover:border-emerald-300 hover:text-emerald-800"
                    : "border-transparent text-slate-ink hover:border-slate-300 hover:text-indigo-deep"
                }`}
              >
                <span
                  className={
                    isActive
                      ? isLifeTab
                        ? "text-emerald-700"
                        : "text-trace-ink"
                      : isLifeTab
                      ? "text-emerald-600"
                      : "text-slate-mute group-hover:text-indigo-deep"
                  }
                >
                  {tab.icon}
                </span>
                <span>{isVi ? tab.labelVi : tab.labelEn}</span>
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.7rem] font-mono ${
                    isActive
                      ? isLifeTab
                        ? "bg-emerald-700 text-white"
                        : "bg-indigo-deep text-white"
                      : "bg-slate-hair text-slate-ink"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THANH ĐIỀU KHIỂN PHỤ: Lọc theo độ sâu phân tích (Tier) */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-hair pb-4 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps text-xs font-semibold text-slate-ink">
            {isVi ? "Phân loại bài đọc:" : "Article Tier:"}
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
                  ? tierName === "Life Dispatch"
                    ? "bg-emerald-700 text-white font-bold"
                    : "bg-indigo-deep text-white font-bold"
                  : "bg-paper-tint text-slate-ink border border-slate-hair hover:text-indigo-deep"
              }`}
            >
              {isVi ? TIER_META[tierName]?.labelVi || tierName : tierName}
            </button>
          ))}
        </div>

        <div className="caps text-xs text-slate-ink">
          {isVi
            ? `Hiển thị ${filteredList.length} bài viết`
            : `Displaying ${filteredList.length} dispatches`}
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
            type="button"
            onClick={() => {
              setActiveTab("All");
              setSelectedTier("All");
              setSearchQuery("");
            }}
            className="caps mt-3 inline-block text-xs font-bold text-trace-ink hover:underline cursor-pointer"
          >
            {isVi ? "Đặt lại toàn bộ bộ lọc" : "Reset all filters"}
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredList.slice(0, visibleCount).map((a, i) => {
              const meta = TIER_META[a.tier] || TIER_META["Clinical Deep-Dive"];
              const Icon = meta.icon;
              const accent = ORGAN_ACCENT[a.organ];
              const displayTitle = isVi && a.titleVi ? a.titleVi : a.title;
              const displayDek = isVi && a.dekVi ? a.dekVi : a.dek;
              const isLife = a.tier === "Life Dispatch";

              return (
                <motion.article
                  layout
                  key={a.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex flex-col overflow-hidden rounded-sm border bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    isLife
                      ? "border-emerald-900/25 hover:border-emerald-700"
                      : "border-slate-hair hover:border-indigo-deep"
                  }`}
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

                      {/* Huy hiệu hệ cơ quan & Phổ thông */}
                      <div className="absolute left-3 top-3 flex items-center gap-1.5">
                        {isLife ? (
                          <span className="caps inline-flex items-center gap-1 rounded-sm bg-emerald-800/90 px-2 py-0.8 text-[11px] font-bold text-white backdrop-blur-sm shadow-xs">
                            🌿 {isVi ? "Đời sống" : "Life"}
                          </span>
                        ) : null}
                        <span className="caps inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                          {isVi ? ORGAN_VI[a.organ] : a.organ}
                        </span>
                      </div>

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
                      <h3 className="font-display text-[1.06rem] font-semibold leading-[1.25] tracking-[-0.02em] text-indigo-deep line-clamp-3 transition-colors group-hover:text-trace-ink">
                        {displayTitle}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-slate-ink line-clamp-2">
                        {displayDek}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-hair pt-3 text-xs">
                        <span
                          className={`caps flex items-center gap-1.5 font-semibold ${
                            isLife ? "text-emerald-700 font-bold" : ""
                          }`}
                          style={isLife ? undefined : { color: onPaper(meta.color) }}
                        >
                          <Icon size={12} />
                          {isVi ? (isLife ? "Khoa học Đời sống" : meta.labelVi) : a.tier}
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

      {/* Nút Xem Thêm / Thu Gọn để trang chủ không bị dài vô tận */}
      {filteredList.length > 12 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {visibleCount < filteredList.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredList.length))}
              className="caps inline-flex items-center gap-2 rounded-sm bg-indigo-deep px-6 py-3.5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#101f34] hover:shadow-md cursor-pointer"
            >
              <span>
                {isVi
                  ? `Xem thêm 12 bài viết (Còn ${filteredList.length - visibleCount} bài)`
                  : `Load 12 more dispatches (${filteredList.length - visibleCount} remaining)`}
              </span>
              <span className="text-trace">↓</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setVisibleCount(12)}
              className="caps inline-flex items-center gap-2 rounded-sm border border-slate-hair bg-paper px-6 py-3.5 text-xs font-semibold text-slate-ink hover:border-indigo-deep hover:text-indigo-deep cursor-pointer"
            >
              <span>{isVi ? "Thu gọn về 12 bài tiêu biểu" : "Collapse to 12 dispatches"}</span>
              <span>↑</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
