"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "@/lib/content";
import { useLanguageStore } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI, SPOTLIGHT_COUNT, type Lang } from "@/lib/home";

function Cover({
  article,
  src,
  sizes,
  priority = false,
  className = "",
}: {
  article: Article;
  src?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${className}`}
      />
    );
  }
  // Chưa có ảnh: nền gradient theo màu hệ cơ quan, không để ô trống.
  const accent = ORGAN_ACCENT[article.organ];
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: `radial-gradient(ellipse at 75% 25%, ${accent}40 0%, #0B192C 70%)` }}
    >
      <div className="graticule absolute inset-0 opacity-40" />
    </div>
  );
}

function OrganTag({ organ, lang }: { organ: Article["organ"]; lang: Lang }) {
  return (
    <span className="caps inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORGAN_ACCENT[organ] }} />
      {lang === "vi" ? ORGAN_VI[organ] : organ}
    </span>
  );
}

export function HomeMagazine({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const picks = useMemo(() => dedupeForLang(articles, lang).slice(0, SPOTLIGHT_COUNT), [articles, lang]);
  const [lead, ...side] = picks;
  if (!lead) return null;

  const title = (a: Article) => (isVi && a.titleVi ? a.titleVi : a.title);
  const dek = (a: Article) => (isVi && a.dekVi ? a.dekVi : a.dek);
  const minutes = isVi ? "phút đọc" : "min read";
  const author = isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang";

  return (
    <section
      aria-label={isVi ? "Bài mới nhất" : "Latest dispatches"}
      className="mx-auto max-w-[1240px] px-6 py-8 lg:px-10 lg:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* ---------- lead story ---------- */}
        <Link
          href={`/blog/${lead.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-sm bg-indigo-deep shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace lg:col-span-8 lg:block lg:min-h-[500px]"
        >
          <div className="relative aspect-video overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
            <Cover
              article={lead}
              src={lead.cover ?? lead.thumb}
              sizes="(min-width: 1024px) 800px, 100vw"
              priority
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#050d19] via-[#050d19]/60 to-transparent lg:block"
          />

          <div className="relative z-10 p-5 sm:p-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="caps rounded-sm bg-trace px-2.5 py-1 font-bold text-indigo-deep">
                {isVi ? "Mới xuất bản" : "Latest dispatch"}
              </span>
              <span className="text-white/80">
                <OrganTag organ={lead.organ} lang={lang} />
              </span>
            </div>

            <h2 className="mt-3.5 max-w-2xl font-display text-[clamp(1.45rem,2.9vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {title(lead)}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-slate-300 line-clamp-2 lg:line-clamp-3">
              {dek(lead)}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-4">
              <span className="caps text-white/70">{author}</span>
              <span className="caps text-white/50">{formatDate(lead.date, lang)}</span>
              <span className="caps flex items-center gap-1.5 text-white/50">
                <Clock size={12} /> {lead.minutes} {minutes}
              </span>
              <span className="caps ml-auto flex items-center gap-1 font-semibold text-trace transition-transform group-hover:translate-x-1">
                {isVi ? "Đọc ngay" : "Read now"} <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* ---------- also new ---------- */}
        {side.length > 0 && (
          <aside className="lg:col-span-4">
            <div className="flex items-center justify-between border-b-2 border-indigo-deep pb-3">
              <span className="caps font-semibold text-indigo-deep">
                {isVi ? "Vừa đăng gần đây" : "Also new"}
              </span>
              <a href="#directory" className="caps text-slate-ink transition-colors hover:text-indigo-deep">
                {isVi ? "Tất cả ↓" : "All ↓"}
              </a>
            </div>

            <ul className="divide-y divide-slate-hair">
              {side.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group flex gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace"
                  >
                    <div className="relative aspect-video w-32 shrink-0 self-start overflow-hidden rounded-sm bg-indigo-deep sm:w-40 lg:w-[7.5rem] xl:w-36">
                      <Cover article={a} src={a.thumb} sizes="160px" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-ink">
                        <OrganTag organ={a.organ} lang={lang} />
                      </span>
                      <h3 className="mt-1.5 font-display text-[1.02rem] font-semibold leading-snug tracking-[-0.015em] text-indigo-deep line-clamp-3 transition-colors group-hover:text-trace-ink">
                        {title(a)}
                      </h3>
                      <p className="caps mt-2 text-slate-ink">
                        {formatDate(a.date, lang)} · {a.minutes} {minutes}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
}
