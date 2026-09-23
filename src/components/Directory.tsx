"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FlaskConical, BookOpen, LineChart } from "lucide-react";
import { ORGANS, TIERS, type Article, type Tier, type Organ } from "@/lib/content";
import { inkOn, onPaper } from "@/lib/tones";

const TIER_META: Record<Tier, { icon: typeof BookOpen; color: string }> = {
  Fundamentals: { icon: BookOpen, color: "#64748B" },
  "Clinical Deep-Dive": { icon: LineChart, color: "#00F2FE" },
  "Lab Gizmo": { icon: FlaskConical, color: "#10B981" },
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
  const [organ, setOrgan] = useState<Organ | "All">("All");
  const [tier, setTier] = useState<Tier | "All">("All");

  const list = useMemo(
    () => articles.filter((a) => (organ === "All" || a.organ === organ) && (tier === "All" || a.tier === tier)),
    [articles, organ, tier]
  );

  const feature = list.find((a) => a.feature) ?? list[0];
  const rest = list.filter((a) => a !== feature);

  return (
    <section id="directory" className="mx-auto max-w-[1240px] scroll-mt-8 px-6 py-16 lg:px-10 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-indigo-deep pb-5">
        <div>
          <span className="caps text-slate-ink">§ 1 · Article Directory & Corpus</span>
          <h2 className="mt-3 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            The Corpus.
          </h2>
        </div>
        <p className="max-w-md text-[0.95rem] leading-relaxed text-slate-ink">
          Filtered by organ system and by analytical depth — from foundational molecular physiology to full interactive
          pharmacokinetic simulators.
        </p>
      </div>

      {/* filters */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps w-24 shrink-0 text-slate-ink font-semibold">Organ Axis</span>
          <Chip active={organ === "All"} onClick={() => setOrgan("All")}>All</Chip>
          {ORGANS.map((o) => (
            <Chip key={o} active={organ === o} onClick={() => setOrgan(o)}>{o}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps w-24 shrink-0 text-slate-ink font-semibold">Complexity</span>
          <Chip active={tier === "All"} onClick={() => setTier("All")}>All</Chip>
          {TIERS.map((t) => (
            <Chip
              key={t}
              active={tier === t}
              onClick={() => setTier(t)}
              tone={onPaper(TIER_META[t].color)}
            >
              {t}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-slate-hair pt-3">
        <p className="caps text-slate-ink">
          Showing {list.length} of {articles.length} dispatches
        </p>
        {(organ !== "All" || tier !== "All") && (
          <button
            onClick={() => { setOrgan("All"); setTier("All"); }}
            className="caps text-indigo-deep underline decoration-trace decoration-2 underline-offset-4 hover:text-trace-ink cursor-pointer"
          >
            clear filters
          </button>
        )}
      </div>

      {/* ---------- bento ---------- */}
      {list.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-slate-hair bg-paper-tint px-8 py-16 text-center">
          <FlaskConical className="mx-auto text-slate-ink" size={26} />
          <p className="mt-4 font-display text-step-1 text-indigo-deep">
            No papers match this intersection.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-slate-ink">
            The organ system and complexity tier you combined have not been published yet. Widen one of the two axes.
          </p>
          <button
            onClick={() => { setOrgan("All"); setTier("All"); }}
            className="caps mt-6 rounded-sm bg-indigo-deep px-4 py-2.5 text-paper hover:bg-indigo-mid cursor-pointer"
          >
            reset filters
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {feature && (
              <motion.article
                layout
                key={feature.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-sm bg-indigo-deep md:col-span-6 lg:col-span-4 lg:row-span-2 shadow-sm"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(0, 242, 254, 0.18) 0%, rgba(16, 185, 129, 0.08) 45%, #0B192C 85%)",
                  }}
                />
                <div className="absolute inset-0 graticule opacity-40 pointer-events-none" />
                <Link
                  href={`/blog/${feature.slug}`}
                  className="relative flex h-full min-h-[340px] flex-col justify-end p-6 lg:min-h-[430px] lg:p-8"
                >
                  <div className="absolute left-6 top-6 flex flex-wrap gap-2 lg:left-8 lg:top-8">
                    <span className="caps rounded-sm bg-trace px-2.5 py-1 text-indigo-deep font-bold">
                      Latest Featured Dispatch
                    </span>
                    <span className="caps rounded-sm border border-white/25 px-2.5 py-1 text-white/80">
                      {feature.organ}
                    </span>
                  </div>
                  <span className="caps text-trace font-medium">{feature.tier}</span>
                  <h3 className="mt-2.5 max-w-lg font-display text-step-3 font-bold leading-[1.02] tracking-[-0.03em] text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3.5 max-w-lg text-[0.98rem] leading-relaxed text-slate-300">
                    {feature.dek}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/12 pt-4">
                    <span className="caps flex items-center gap-1.5 text-white/60">
                      <Timer0 /> {feature.minutes} min read
                    </span>
                    {feature.gizmo && (
                      <span className="caps flex items-center gap-1.5 text-trace">
                        <FlaskConical size={12} /> Embedded Simulation Gizmo
                      </span>
                    )}
                    <span className="caps ml-auto flex items-center gap-1 text-trace transition-transform group-hover:translate-x-1 font-semibold">
                      Read Full Analysis <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )}

            {rest.map((a, i) => {
              const meta = TIER_META[a.tier];
              const Icon = meta.icon;
              return (
                <motion.article
                  layout
                  key={a.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, delay: Math.min(i * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col rounded-sm border border-slate-hair bg-paper transition-all duration-300 hover:border-indigo-deep hover:shadow-[0_20px_45px_-30px_rgba(11,25,44,0.7)] md:col-span-3 lg:col-span-2"
                >
                  <span
                    className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: onPaper(meta.color) }}
                  />
                  <Link href={`/blog/${a.slug}`} className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="caps text-slate-ink">{a.organ}</span>
                      <Icon size={15} style={{ color: onPaper(meta.color) }} className="shrink-0" />
                    </div>
                    <h3 className="mt-3 font-display text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-indigo-deep">
                      {a.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-slate-ink line-clamp-3">
                      {a.dek}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-hair pt-3">
                      <span className="caps font-semibold" style={{ color: onPaper(meta.color) }}>
                        {a.tier}
                      </span>
                      <span className="caps text-slate-ink">{a.minutes} min</span>
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

function Timer0() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2" />
      <path d="M9 2h6" />
    </svg>
  );
}
