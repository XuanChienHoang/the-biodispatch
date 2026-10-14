"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Coffee, LineChart, Sparkles, Salad, Footprints, Moon, SunMedium } from "lucide-react";
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

  // Mặc định kênh hiển thị là "life" (Khoa học Đời sống phổ thông, dễ hiểu) theo chỉ đạo của TS. Hoàng Xuân Chiến
  const [channel, setChannel] = useState<"life" | "clinical" | "all">("life");

  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  const lifeArticles = useMemo(() => pool.filter((a) => a.tier === "Life Dispatch"), [pool]);
  const clinicalArticles = useMemo(() => pool.filter((a) => a.tier !== "Life Dispatch"), [pool]);

  const activePicks = useMemo(() => {
    if (channel === "life") {
      return lifeArticles.slice(0, SPOTLIGHT_COUNT);
    }
    if (channel === "clinical") {
      return clinicalArticles.slice(0, SPOTLIGHT_COUNT);
    }
    return pool.slice(0, SPOTLIGHT_COUNT);
  }, [channel, lifeArticles, clinicalArticles, pool]);

  const [lead, ...side] = activePicks;
  if (!lead) return null;

  const title = (a: Article) => (isVi && a.titleVi ? a.titleVi : a.title);
  const dek = (a: Article) => (isVi && a.dekVi ? a.dekVi : a.dek);
  const minutes = isVi ? "phút đọc" : "min read";
  const author = isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang";

  return (
    <section
      aria-label={isVi ? "Tiêu điểm biên tập" : "Editorial Spotlight"}
      className="mx-auto max-w-[1240px] px-6 py-6 lg:px-10 lg:py-10"
    >
      {/* THANH ĐIỀU HƯỚNG KÊNH ĐỌC (CHO BÀI PHỔ THÔNG LÊN ĐẦU TIÊN MẶC ĐỊNH) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-indigo-deep pb-3.5 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caps text-xs font-bold text-slate-ink mr-1">
            {isVi ? "Kênh đọc ưu tiên:" : "Reading Channel:"}
          </span>

          {/* Tab 1: Khoa học Đời sống (Mặc định) */}
          <button
            type="button"
            onClick={() => setChannel("life")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              channel === "life"
                ? "bg-emerald-700 text-white font-bold shadow-xs"
                : "bg-paper-tint text-slate-ink border border-slate-hair hover:border-emerald-600 hover:text-emerald-700"
            }`}
          >
            <Coffee size={13} className={channel === "life" ? "text-emerald-200" : "text-emerald-600"} />
            <span>{isVi ? "Khoa học Đời sống (Dễ hiểu)" : "Living Science & Habits"}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                channel === "life" ? "bg-emerald-900/60 text-white" : "bg-slate-hair text-slate-ink"
              }`}
            >
              {lifeArticles.length}
            </span>
          </button>

          {/* Tab 2: Chuyên khảo Lâm sàng */}
          <button
            type="button"
            onClick={() => setChannel("clinical")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              channel === "clinical"
                ? "bg-indigo-deep text-white font-bold shadow-xs"
                : "bg-paper-tint text-slate-ink border border-slate-hair hover:border-indigo-deep hover:text-indigo-deep"
            }`}
          >
            <LineChart size={13} className={channel === "clinical" ? "text-trace" : "text-slate-mute"} />
            <span>{isVi ? "Chuyên khảo Học thuật (Chuyên sâu)" : "Clinical Monographs"}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                channel === "clinical" ? "bg-indigo-950 text-white" : "bg-slate-hair text-slate-ink"
              }`}
            >
              {clinicalArticles.length}
            </span>
          </button>

          {/* Tab 3: Tất cả */}
          <button
            type="button"
            onClick={() => setChannel("all")}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              channel === "all"
                ? "bg-slate-ink text-white font-bold shadow-xs"
                : "bg-paper-tint text-slate-ink border border-slate-hair hover:text-indigo-deep"
            }`}
          >
            <Sparkles size={12} />
            <span>{isVi ? "Tất cả mới nhất" : "All Recent"}</span>
          </button>
        </div>

        <a
          href="#life-science"
          className="caps text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors hidden sm:inline-flex items-center gap-1"
        >
          <span>{isVi ? "Xem chuyên mục đời sống ↓" : "Explore lifestyle section ↓"}</span>
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* ---------- LEAD STORY ---------- */}
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
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#050d19] via-[#050d19]/65 to-transparent lg:block"
          />

          <div className="relative z-10 p-5 sm:p-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              {lead.tier === "Life Dispatch" ? (
                <span className="caps rounded-sm bg-emerald-600 px-2.5 py-1 font-bold text-white shadow-xs">
                  {isVi ? "🌿 Góc Y khoa Đời sống · Dễ hiểu" : "🌿 Living Science · Practical"}
                </span>
              ) : (
                <span className="caps rounded-sm bg-trace px-2.5 py-1 font-bold text-indigo-deep shadow-xs">
                  {isVi ? "🔬 Chuyên khảo Lâm sàng" : "🔬 Clinical Deep-Dive"}
                </span>
              )}
              <span className="text-white/80">
                <OrganTag organ={lead.organ} lang={lang} />
              </span>
            </div>

            <h2 className="mt-3.5 max-w-2xl font-display text-[clamp(1.45rem,2.9vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
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
                {isVi ? "Đọc bài viết" : "Read now"} <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* ---------- ALSO NEW / SIDEBAR ---------- */}
        {side.length > 0 && (
          <aside className="lg:col-span-4">
            <div className="flex items-center justify-between border-b border-slate-hair pb-3">
              <span className="caps font-bold text-indigo-deep flex items-center gap-1.5">
                {channel === "life" ? (
                  <>
                    <Coffee size={13} className="text-emerald-600" />
                    <span>{isVi ? "Bài đời sống tiếp theo" : "More Life Dispatches"}</span>
                  </>
                ) : channel === "clinical" ? (
                  <>
                    <LineChart size={13} className="text-cyan-600" />
                    <span>{isVi ? "Chuyên khảo cùng đợt" : "Related Monographs"}</span>
                  </>
                ) : (
                  <span>{isVi ? "Vừa đăng gần đây" : "Also new"}</span>
                )}
              </span>
              <a href="#directory" className="caps text-xs text-slate-ink transition-colors hover:text-indigo-deep">
                {isVi ? "Xem tất cả ↓" : "View all ↓"}
              </a>
            </div>

            <ul className="divide-y divide-slate-hair">
              {side.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group flex gap-3.5 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace"
                  >
                    <div className="relative aspect-video w-28 shrink-0 self-start overflow-hidden rounded-sm bg-indigo-deep sm:w-36 lg:w-[7.5rem] xl:w-32">
                      <Cover article={a} src={a.thumb} sizes="160px" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {a.tier === "Life Dispatch" && (
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                            {isVi ? "Đời sống" : "Life"}
                          </span>
                        )}
                        <span className="text-slate-ink text-xs">
                          <OrganTag organ={a.organ} lang={lang} />
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
                        {title(a)}
                      </h3>
                      <p className="caps mt-1.5 text-xs text-slate-mute">
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

      {/* DẢI 4 THÓI QUEN SINH HỌC DỰ PHÒNG THƯỜNG NGÀY (BITE-SIZED HABIT SHORTCUTS) */}
      <div className="mt-10 rounded-sm border border-emerald-900/20 bg-emerald-950/[0.03] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-white text-xs font-bold">
              ✓
            </span>
            <span className="font-display text-sm sm:text-base font-bold text-indigo-deep">
              {isVi
                ? "4 Thói quen Sinh học Thường ngày: Cơ chế phân tử & Ứng dụng ngay"
                : "4 Daily Biological Habits: Molecular Mechanism & Practical Actions"}
            </span>
          </div>
          <span className="caps text-[11px] font-semibold text-emerald-800">
            {isVi ? "Y học Dự phòng · Dễ áp dụng" : "Preventive Health · Actionable"}
          </span>
        </div>

        <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Ăn rau trước cơm */}
          <Link
            href="/blog/an-rau-truoc-com-kiem-soat-duong-huyet-vi"
            className="group rounded-sm border border-slate-hair bg-paper p-3.5 transition-all hover:border-emerald-600 hover:shadow-xs"
          >
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <Salad size={14} />
              <span>{isVi ? "1. Lưới lọc chất xơ" : "1. Fiber Mesh"}</span>
            </div>
            <h4 className="mt-1.5 font-display text-xs font-bold text-indigo-deep group-hover:text-emerald-700 line-clamp-2">
              {isVi ? "Ăn rau trước cơm giúp kiểm soát đường huyết" : "Eat veggies before rice for glucose control"}
            </h4>
            <p className="mt-1 text-[11px] text-slate-ink line-clamp-2">
              {isVi
                ? "Chất xơ hòa tan tạo mạng lưới gel bọc niêm mạc ruột, làm chậm hấp thu đường tự nhiên."
                : "Viscous fiber creates a gel matrix in the small intestine, flattening glucose spikes."}
            </p>
          </Link>

          {/* Card 2: Đi bộ 10 phút sau ăn */}
          <Link
            href="/blog/di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi"
            className="group rounded-sm border border-slate-hair bg-paper p-3.5 transition-all hover:border-emerald-600 hover:shadow-xs"
          >
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <Footprints size={14} />
              <span>{isVi ? "2. Vận động nhẹ sau ăn" : "2. Post-Meal Walk"}</span>
            </div>
            <h4 className="mt-1.5 font-display text-xs font-bold text-indigo-deep group-hover:text-emerald-700 line-clamp-2">
              {isVi ? "Đi bộ 10 phút kích hoạt cơ bắp tiêu thụ đường" : "10-minute postprandial walk activates GLUT4"}
            </h4>
            <p className="mt-1 text-[11px] text-slate-ink line-clamp-2">
              {isVi
                ? "Sự co cơ kéo thụ thể GLUT4 lên màng tế bào, hút đường vào cơ bắp mà không phụ thuộc insulin."
                : "Muscle contraction translocates GLUT4 to cell membranes independently of insulin."}
            </p>
          </Link>

          {/* Card 3: Cơm nguội RS3 */}
          <Link
            href="/blog/tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi"
            className="group rounded-sm border border-slate-hair bg-paper p-3.5 transition-all hover:border-emerald-600 hover:shadow-xs"
          >
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <SunMedium size={14} />
              <span>{isVi ? "3. Tinh bột kháng RS3" : "3. Resistant Starch"}</span>
            </div>
            <h4 className="mt-1.5 font-display text-xs font-bold text-indigo-deep group-hover:text-emerald-700 line-clamp-2">
              {isVi ? "Cơm nguội bảo quản lạnh: Nuôi vi khuẩn đường ruột" : "Cold cooked rice: Fueling gut microbiome"}
            </h4>
            <p className="mt-1 text-[11px] text-slate-ink line-clamp-2">
              {isVi
                ? "Quá trình hồi thoái tinh bột tạo RS3, đi thẳng xuống đại tràng nuôi vi sinh lên men Butyrate."
                : "Starch retrogradation yields RS3, reaching the colon to feed butyrate-producing flora."}
            </p>
          </Link>

          {/* Card 4: Ngắt ánh sáng xanh / Magie Glycinate */}
          <Link
            href="/blog/magie-glycinate-vs-citrate-giac-ngu-va-lo-au-vi"
            className="group rounded-sm border border-slate-hair bg-paper p-3.5 transition-all hover:border-emerald-600 hover:shadow-xs"
          >
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <Moon size={14} />
              <span>{isVi ? "4. Vệ sinh giấc ngủ" : "4. Deep Sleep Primer"}</span>
            </div>
            <h4 className="mt-1.5 font-display text-xs font-bold text-indigo-deep group-hover:text-emerald-700 line-clamp-2">
              {isVi ? "Magie Glycinate & vệ sinh thần kinh trước khi ngủ" : "Magnesium Glycinate & nocturnal neural calm"}
            </h4>
            <p className="mt-1 text-[11px] text-slate-ink line-clamp-2">
              {isVi
                ? "Gắn thụ thể GABA-A, giảm nồng độ cortisol ban đêm và giúp chu kỳ ngủ sâu không bị chập chờn."
                : "Agonizes GABA-A receptors, lowers nocturnal cortisol, and stabilizes deep restorative sleep."}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
