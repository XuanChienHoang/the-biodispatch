"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, BookOpen, LineChart } from "lucide-react";
import { ORGANS, TIERS, type Article, type Tier, type Organ } from "@/lib/content";
import { inkOn, onPaper } from "@/lib/tones";
import { useLanguageStore, DICT } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI, SPOTLIGHT_COUNT } from "@/lib/home";

const TIER_META: Record<Tier, { icon: typeof BookOpen; color: string; labelVi: string }> = {
  Fundamentals: { icon: BookOpen, color: "#64748B", labelVi: "Nền tảng Y sinh" },
  "Clinical Deep-Dive": { icon: LineChart, color: "#00F2FE", labelVi: "Phân tích Lâm sàng" },
  "Lab Gizmo": { icon: FlaskConical, color: "#10B981", labelVi: "Mô phỏng Dược học" },
};

function Chip({
  active,
  children,
  onClick,
  tone = "#0B192C",
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tone?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`caps whitespace-nowrap rounded-full border px-3.5 py-2 transition-all duration-200 cursor-pointer ${
        active
          ? "border-transparent"
          : "border-slate-hair bg-paper text-slate-ink hover:border-indigo-deep hover:text-indigo-deep"
      }`}
      style={active ? { background: tone, color: inkOn(tone) } : undefined}
    >
      {children}
    </button>
  );
}

export function Directory({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const t = DICT[lang];
  const isVi = lang === "vi";

  const [organ, setOrgan] = useState<Organ | "All">("All");
  const [tier, setTier] = useState<Tier | "All">("All");

  // Mỗi chủ đề một phiên bản đúng ngôn ngữ đang chọn, mới nhất trước.
  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  const filtering = organ !== "All" || tier !== "All";

  const list = useMemo(() => {
    const filtered = pool.filter(
      (a) => (organ === "All" || a.organ === organ) && (tier === "All" || a.tier === tier)
    );
    // Chưa lọc: bỏ các bài đã nằm ở khối tiêu điểm để không lặp lại ngay bên dưới.
    return filtering ? filtered : filtered.slice(SPOTLIGHT_COUNT);
  }, [pool, organ, tier, filtering]);

  const matched = useMemo(
    () => pool.filter((a) => (organ === "All" || a.organ === organ) && (tier === "All" || a.tier === tier)).length,
    [pool, organ, tier]
  );

  const reset = () => {
    setOrgan("All");
    setTier("All");
  };

  return (
    <section id="directory" className="mx-auto max-w-[1240px] scroll-mt-8 px-6 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-indigo-deep pb-5">
        <div>
          <span className="caps text-slate-ink">{t.corpusTitle}</span>
          <h2 className="mt-3 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            {t.corpusHead}
          </h2>
        </div>
        <p className="max-w-md text-[0.95rem] leading-relaxed text-slate-ink">{t.corpusDesc}</p>
      </div>

      {/* filters */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps w-24 shrink-0 text-slate-ink font-semibold">{t.organAxis}</span>
          <Chip active={organ === "All"} onClick={() => setOrgan("All")}>
            {t.all}
          </Chip>
          {ORGANS.map((o) => (
            <Chip key={o} active={organ === o} onClick={() => setOrgan(o)}>
              {isVi ? ORGAN_VI[o] : o}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps w-24 shrink-0 text-slate-ink font-semibold">{t.complexityAxis}</span>
          <Chip active={tier === "All"} onClick={() => setTier("All")}>
            {t.all}
          </Chip>
          {TIERS.map((tierName) => (
            <Chip
              key={tierName}
              active={tier === tierName}
              onClick={() => setTier(tierName)}
              tone={onPaper(TIER_META[tierName].color)}
            >
              {isVi ? TIER_META[tierName].labelVi : tierName}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-slate-hair pt-3">
        <p className="caps text-slate-ink">
          {filtering
            ? `${t.showingDispatches} ${matched} ${t.of} ${pool.length} ${t.dispatchesText}`
            : isVi
              ? `${list.length} bài trong kho lưu trữ, chưa kể ${SPOTLIGHT_COUNT} bài mới nhất ở trên`
              : `${list.length} dispatches in the archive, excluding the ${SPOTLIGHT_COUNT} latest above`}
        </p>
        {filtering && (
          <button
            onClick={reset}
            className="caps text-indigo-deep underline decoration-trace decoration-2 underline-offset-4 hover:text-trace-ink cursor-pointer"
          >
            {t.clearFilters}
          </button>
        )}
      </div>

      {/* ---------- visual grid ---------- */}
      {list.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-slate-hair bg-paper-tint px-8 py-16 text-center">
          <FlaskConical className="mx-auto text-slate-ink" size={26} />
          <p className="mt-4 font-display text-step-1 text-indigo-deep">
            {isVi ? "Chưa có bài viết ở phân mục này." : "No papers match this intersection."}
          </p>
          <button
            onClick={reset}
            className="caps mt-6 rounded-sm bg-indigo-deep px-4 py-2.5 text-paper hover:bg-indigo-mid cursor-pointer"
          >
            {isVi ? "Đặt lại bộ lọc" : "Reset filters"}
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((a, i) => {
              const meta = TIER_META[a.tier];
              const Icon = meta.icon;
              const accent = ORGAN_ACCENT[a.organ];
              const displayTitle = isVi && a.titleVi ? a.titleVi : a.title;
              const displayDek = isVi && a.dekVi ? a.dekVi : a.dek;
              return (
                <motion.article
                  layout
                  key={a.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, delay: Math.min(i * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col overflow-hidden rounded-sm border border-slate-hair bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-deep hover:shadow-[0_22px_45px_-28px_rgba(11,25,44,0.75)]"
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
                      <span className="caps absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/80 px-2 py-1 text-white backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                        {isVi ? ORGAN_VI[a.organ] : a.organ}
                      </span>
                      {a.gizmo && (
                        <span
                          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[#050d19]/80 text-trace backdrop-blur-sm"
                          title={t.embeddedGizmo}
                        >
                          <FlaskConical size={13} />
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[1.14rem] font-semibold leading-[1.18] tracking-[-0.02em] text-indigo-deep line-clamp-3">
                        {displayTitle}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-slate-ink line-clamp-2">
                        {displayDek}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-hair pt-3">
                        <span
                          className="caps flex items-center gap-1.5 font-semibold"
                          style={{ color: onPaper(meta.color) }}
                        >
                          <Icon size={13} />
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
