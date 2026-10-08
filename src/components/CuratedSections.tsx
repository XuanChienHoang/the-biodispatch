"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flame, HeartPulse, BrainCircuit, ShieldAlert, Sparkles, Clock, FlaskConical } from "lucide-react";
import type { Article, Organ } from "@/lib/content";
import { useLanguageStore } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI, SPOTLIGHT_COUNT } from "@/lib/home";
import { onPaper } from "@/lib/tones";

interface CuratedSectionsProps {
  articles: Article[];
}

export function CuratedSections({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  // Danh sách bài đã lọc theo ngôn ngữ & sắp xếp mới nhất
  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  // Lấy các bài sau 4 bài đầu của HomeMagazine
  const remaining = useMemo(() => pool.slice(SPOTLIGHT_COUNT), [pool]);

  // 1. Tuyến Chuyển hóa & Ty thể (Metabolic & Brown Fat / UCP1)
  const metabolicArticles = useMemo(() => {
    return remaining.filter((a) => {
      const text = `${a.slug} ${a.title} ${a.dek}`.toLowerCase();
      return (
        a.organ === "Metabolic" ||
        text.includes("mo-nau") ||
        text.includes("brown-fat") ||
        text.includes("succinate") ||
        text.includes("creatine") ||
        text.includes("ucp1") ||
        text.includes("sinh-nhiet") ||
        text.includes("thermogenesis") ||
        text.includes("glp1")
      );
    });
  }, [remaining]);

  // 2. Tuyến Tim mạch & Tuần hoàn (Heart, Lipids & Vascular)
  const cardiovascularArticles = useMemo(() => {
    return remaining.filter((a) => a.organ === "Heart");
  }, [remaining]);

  // 3. Tuyến Trẻ hóa & Sinh học Khối u (Cellular Aging, NAD+, Cancer Metabolism)
  const longevityArticles = useMemo(() => {
    return remaining.filter((a) => {
      // Tránh trùng lặp với metabolic đã chọn ở trên nếu đã lấy
      const isAlreadyInMetabolic = metabolicArticles.some((m) => m.slug === a.slug);
      if (isAlreadyInMetabolic) return false;
      return a.organ === "Cellular Aging";
    });
  }, [remaining, metabolicArticles]);

  // 4. Tuyến Não bộ, Trực giác & Đường ruột (Brain & Gut-Brain Axis)
  const brainGutArticles = useMemo(() => {
    return remaining.filter((a) => a.organ === "Brain" || a.organ === "Gut" || a.organ === "Immune");
  }, [remaining]);

  return (
    <div className="space-y-16 py-6 lg:space-y-24">
      {/* SECTION 1: CHUYỂN HÓA & NĂNG LƯỢNG TY THỂ */}
      {metabolicArticles.length > 0 && (
        <section aria-label="Metabolic Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Chuyên đề Trọng điểm" : "Special Dispatch"}
            title={isVi ? "Chuyển hóa Năng lượng & Sinh nhiệt Ty thể" : "Metabolic Energetics & Mitochondrial Dynamics"}
            subtitle={
              isVi
                ? "Tái lập trình mỡ nâu (BAT), nghịch lý rò rỉ proton UCP1, chu trình creatine và các chỉ số sinh hóa chuyển hóa tế bào."
                : "Brown adipose tissue remodeling, UCP1 proton leak paradox, creatine futile cycling, and cellular bioenergetics."
            }
            icon={<Flame className="h-5 w-5 text-amber-500" />}
            href="#directory"
            count={metabolicArticles.length}
            isVi={isVi}
          />
          <FeaturedEditorialBlock articles={metabolicArticles} isVi={isVi} />
        </section>
      )}

      {/* SECTION 2: TIM MẠCH & MẬT MÃ XƠ VỮA */}
      {cardiovascularArticles.length > 0 && (
        <section aria-label="Cardiovascular Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Chuyên đề Lâm sàng" : "Clinical Series"}
            title={isVi ? "Tim mạch & Mật mã Xơ vữa Động mạch" : "Cardiovascular & Atherosclerotic Decoding"}
            subtitle={
              isVi
                ? "Bóc tách huyền thoại cholesterol, hạt mỡ oxLDL đục thủng nội mô, tỉ số vàng TG/HDL và ngã ba chuyển hóa Mevalonate."
                : "Demystifying cholesterol dogma, oxLDL endothelial penetration, TG/HDL ratio precision, and the Mevalonate pathway."
            }
            icon={<HeartPulse className="h-5 w-5 text-rose-500" />}
            href="#directory"
            count={cardiovascularArticles.length}
            isVi={isVi}
          />
          <ThreeCardGrid articles={cardiovascularArticles.slice(0, 3)} isVi={isVi} />
          {cardiovascularArticles.length > 3 && (
            <CompactCardRow articles={cardiovascularArticles.slice(3, 6)} isVi={isVi} />
          )}
        </section>
      )}

      {/* BANNER NGHỈ CHÂN TẠP CHÍ: TIÊU CHUẨN BIÊN TẬP VÀ MÔ PHỎNG */}
      <section className="border-y border-slate-hair bg-indigo-deep text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
          <div className="max-w-2xl">
            <span className="caps text-trace font-mono text-xs">
              {isVi ? "§ TÒA SOẠN Y SINH THỰC CHỨNG" : "§ EVIDENCE-BASED DISPATCH"}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {isVi
                ? "Mọi bài viết đều đi kèm mã định danh DOI và đối soát PubMed độc lập."
                : "Every analysis is anchored by verified PubMed PMIDs and primary DOIs."}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {isVi
                ? "Dữ liệu trung thực, không khuếch đại tác dụng thực phẩm bổ sung. Tập trung vào cơ chế phân tử và thử nghiệm lâm sàng đối chứng."
                : "Objective scientific analysis with no supplement hype. Strictly focused on molecular mechanisms and controlled clinical endpoints."}
            </p>
          </div>
          <Link
            href="/gizmos"
            className="caps inline-flex items-center gap-2 self-start rounded-sm bg-trace px-5 py-3 font-semibold text-indigo-deep transition-transform duration-200 hover:scale-[1.03] sm:self-center"
          >
            <span>{isVi ? "Thử nghiệm Phòng Lab" : "Open Simulation Lab"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 3: TRẺ HÓA TẾ BÀO & SINH HỌC KHỐI U */}
      {longevityArticles.length > 0 && (
        <section aria-label="Longevity Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Sinh học Phân tử" : "Molecular Biology"}
            title={isVi ? "Trẻ hóa Tế bào & Sinh học Khối u" : "Cellular Senescence & Cancer Biology"}
            subtitle={
              isVi
                ? "Cuộc chiến bảo toàn NAD+, trục Sirtuin/CD38, giải mã hiệu ứng Warburg và 4 nút tín hiệu trẻ hóa AMPK/mTOR."
                : "NAD+ homeostasis, Sirtuin/CD38 battle, Warburg metabolic hijacking, and the AMPK/mTOR rejuvenation network."
            }
            icon={<Sparkles className="h-5 w-5 text-indigo-400" />}
            href="#directory"
            count={longevityArticles.length}
            isVi={isVi}
          />
          <FeaturedEditorialBlock articles={longevityArticles} isVi={isVi} />
        </section>
      )}

      {/* SECTION 4: NÃO BỘ, TRỤC RUỘT - NÃO & MIỄN DỊCH */}
      {brainGutArticles.length > 0 && (
        <section aria-label="Brain and Gut Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Trục Ruột - Não - Miễn dịch" : "Gut-Brain & Neurobiology"}
            title={isVi ? "Não bộ, Giấc ngủ & Trục Đường ruột - Thần kinh" : "Neurobiology, Circadian Zeitgebers & The Gut Axis"}
            subtitle={
              isVi
                ? "Cơ chế 'rửa xe' não bộ Glymphatic khi ngủ sâu, giải Nobel Optogenetics, Butyrate hàn gắn rò rỉ ruột và nhịp Melatonin."
                : "Glymphatic deep sleep clearance, Optogenetics Nobel milestone, Butyrate epigenetic tight junctions, and Melatonin rhythm."
            }
            icon={<BrainCircuit className="h-5 w-5 text-teal-500" />}
            href="#directory"
            count={brainGutArticles.length}
            isVi={isVi}
          />
          <ThreeCardGrid articles={brainGutArticles.slice(0, 3)} isVi={isVi} />
          {brainGutArticles.length > 3 && (
            <CompactCardRow articles={brainGutArticles.slice(3, 7)} isVi={isVi} />
          )}
        </section>
      )}
    </div>
  );
}

/* ================== SUB-COMPONENTS ================== */

function SectionHeader({
  badge,
  title,
  subtitle,
  icon,
  href,
  count,
  isVi,
}: {
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  count: number;
  isVi: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-indigo-deep pb-4">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <span className="caps font-bold tracking-wider text-indigo-deep">{badge}</span>
          <span className="rounded-full bg-slate-hair px-2 py-0.5 text-xs font-semibold text-slate-ink">
            {count} {isVi ? "bài" : "dispatches"}
          </span>
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-indigo-deep sm:text-3xl lg:text-[2rem]">
          {title}
        </h2>
        <p className="mt-1.5 max-w-2xl text-[0.93rem] leading-relaxed text-slate-ink">{subtitle}</p>
      </div>
      <a
        href={href}
        className="caps inline-flex items-center gap-1.5 text-xs font-semibold text-slate-ink transition-colors hover:text-indigo-deep"
      >
        <span>{isVi ? "Xem tất cả bài viết" : "View all papers"}</span>
        <span>↓</span>
      </a>
    </div>
  );
}

/** Layout kết hợp 1 Card lớn bên trái (Lead Card) + 2 Card nằm dọc bên phải */
function FeaturedEditorialBlock({ articles, isVi }: { articles: Article[]; isVi: boolean }) {
  const [main, ...side] = articles;
  if (!main) return null;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-12">
      {/* Cột chính bên trái: Chiếm 7/12 cột */}
      <div className="lg:col-span-7">
        <ArticleLeadCard article={main} isVi={isVi} />
      </div>

      {/* Cột phụ bên phải: Chiếm 5/12 cột, hiển thị 2-3 bài tiếp theo */}
      <div className="flex flex-col justify-between gap-5 lg:col-span-5">
        {side.slice(0, 3).map((a) => (
          <ArticleSideRow key={a.slug} article={a} isVi={isVi} />
        ))}
      </div>
    </div>
  );
}

function ArticleLeadCard({ article, isVi }: { article: Article; isVi: boolean }) {
  const accent = ORGAN_ACCENT[article.organ];
  const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;
  const displayDek = isVi && article.dekVi ? article.dekVi : article.dek;

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-slate-hair bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-deep hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-indigo-deep">
        {article.thumb || article.cover ? (
          <Image
            src={article.cover || article.thumb || ""}
            alt=""
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="caps inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/85 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            {isVi ? ORGAN_VI[article.organ] : article.organ}
          </span>
          {article.gizmo && (
            <span className="caps inline-flex items-center gap-1 rounded-sm bg-trace/90 px-2 py-1 text-xs font-bold text-indigo-deep backdrop-blur-sm">
              <FlaskConical size={12} /> Gizmo
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-indigo-deep transition-colors group-hover:text-trace-ink sm:text-[1.35rem]">
          {displayTitle}
        </h3>
        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-slate-ink line-clamp-3">
          {displayDek}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-hair pt-3 text-xs text-slate-ink">
          <span className="caps font-semibold">{article.tier}</span>
          <span className="caps flex items-center gap-1">
            <Clock size={12} /> {formatDate(article.date, isVi ? "vi" : "en")} · {article.minutes}{" "}
            {isVi ? "phút" : "min"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArticleSideRow({ article, isVi }: { article: Article; isVi: boolean }) {
  const accent = ORGAN_ACCENT[article.organ];
  const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-1 gap-4 rounded-sm border border-slate-hair bg-paper p-4 transition-all duration-200 hover:border-indigo-deep hover:bg-paper-tint"
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-sm bg-indigo-deep sm:w-28">
        {article.thumb ? (
          <Image
            src={article.thumb}
            alt=""
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 75% 25%, ${accent}40 0%, #0B192C 70%)` }}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <span className="caps text-[0.7rem] font-semibold text-slate-ink">
            {isVi ? ORGAN_VI[article.organ] : article.organ}
          </span>
          <h4 className="mt-1 font-display text-[0.98rem] font-semibold leading-snug tracking-tight text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
            {displayTitle}
          </h4>
        </div>
        <p className="caps mt-2 text-[0.72rem] text-slate-mute">
          {formatDate(article.date, isVi ? "vi" : "en")} · {article.minutes} {isVi ? "phút đọc" : "min read"}
        </p>
      </div>
    </Link>
  );
}

/** Lưới 3 thẻ chuẩn cho các chuyên đề */
function ThreeCardGrid({ articles, isVi }: { articles: Article[]; isVi: boolean }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const accent = ORGAN_ACCENT[article.organ];
        const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;
        const displayDek = isVi && article.dekVi ? article.dekVi : article.dek;

        return (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-slate-hair bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-deep hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-indigo-deep">
              {article.thumb ? (
                <Image
                  src={article.thumb}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 75% 25%, ${accent}40 0%, #0B192C 70%)` }}
                />
              )}
              <span className="caps absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {isVi ? ORGAN_VI[article.organ] : article.organ}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[1.08rem] font-semibold leading-tight tracking-tight text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
                {displayTitle}
              </h3>
              <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-slate-ink line-clamp-2">
                {displayDek}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-hair pt-3 text-[0.75rem] text-slate-ink">
                <span className="caps font-semibold">{article.tier}</span>
                <span className="caps">
                  {formatDate(article.date, isVi ? "vi" : "en")} · {article.minutes} {isVi ? "phút" : "min"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Dải thẻ nhỏ ngang 2-4 cột cho các bài phụ bổ sung */
function CompactCardRow({ articles, isVi }: { articles: Article[]; isVi: boolean }) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;
        return (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex items-center gap-3 rounded-sm border border-slate-hair bg-paper p-3 transition-colors hover:border-indigo-deep hover:bg-paper-tint"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-indigo-deep">
              {article.thumb && (
                <Image src={article.thumb} alt="" fill sizes="48px" className="object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-[0.88rem] font-semibold leading-snug text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
                {displayTitle}
              </h4>
              <span className="caps mt-1 block text-[0.7rem] text-slate-mute">
                {formatDate(article.date, isVi ? "vi" : "en")} · {article.minutes} {isVi ? "phút" : "min"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
