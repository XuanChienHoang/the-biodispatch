"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Flame,
  HeartPulse,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Clock,
  FlaskConical,
  Coffee,
  Microscope,
} from "lucide-react";
import type { Article } from "@/lib/content";
import { useLanguageStore } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI } from "@/lib/home";

interface CuratedSectionsProps {
  articles: Article[];
}

export function CuratedSections({ articles }: { articles: Article[] }) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  // Danh sách bài đã lọc theo ngôn ngữ & sắp xếp mới nhất
  const pool = useMemo(() => dedupeForLang(articles, lang), [articles, lang]);

  // 1. TUYẾN KHOA HỌC ĐỜI SỐNG & THÓI QUEN DỰ PHÒNG (Ưu tiên số 1 - Đặt lên đầu tiên để bạn đọc phổ thông không bị ngợp)
  const lifeArticles = useMemo(() => {
    return pool.filter((a) => a.tier === "Life Dispatch");
  }, [pool]);

  // 2. Tuyến Dinh dưỡng & Chuyển hóa Năng lượng (Metabolic & Nutrition)
  const metabolicArticles = useMemo(() => {
    return pool.filter((a) => {
      const text = `${a.slug} ${a.title} ${a.dek}`.toLowerCase();
      return (
        a.organ === "Metabolic" ||
        text.includes("mo-nau") ||
        text.includes("brown-fat") ||
        text.includes("succinate") ||
        text.includes("creatine") ||
        text.includes("ucp1") ||
        text.includes("duong-huyet") ||
        text.includes("glucose") ||
        text.includes("glp1")
      );
    });
  }, [pool]);

  // 3. Tuyến Tim mạch & Tuần hoàn Máu (Cardiovascular & Circulation)
  const cardiovascularArticles = useMemo(() => {
    return pool.filter((a) => {
      const text = `${a.slug} ${a.title} ${a.dek}`.toLowerCase();
      return (
        a.organ === "Heart" ||
        text.includes("tim-mach") ||
        text.includes("huyet-ap") ||
        text.includes("mach-mau") ||
        text.includes("cholesterol") ||
        text.includes("oxldl")
      );
    });
  }, [pool]);

  // 4. Tuyến Não bộ, Giấc ngủ & Thần kinh Thư thái (Brain & Sleep)
  const brainSleepArticles = useMemo(() => {
    return pool.filter((a) => {
      const text = `${a.slug} ${a.title} ${a.dek}`.toLowerCase();
      return (
        a.organ === "Brain" ||
        text.includes("giac-ngu") ||
        text.includes("sleep") ||
        text.includes("magie") ||
        text.includes("magnesium") ||
        text.includes("phe-vi") ||
        text.includes("glymphatic")
      );
    });
  }, [pool]);

  // 5. Tuyến Đường ruột, Hệ Vi sinh & Miễn dịch (Gut Microbiome & Immunity)
  const gutImmuneArticles = useMemo(() => {
    return pool.filter((a) => {
      const text = `${a.slug} ${a.title} ${a.dek}`.toLowerCase();
      return (
        a.organ === "Gut" ||
        a.organ === "Immune" ||
        text.includes("ruot") ||
        text.includes("collagen") ||
        text.includes("butyrate") ||
        text.includes("vi-khuan") ||
        text.includes("microbiome")
      );
    });
  }, [pool]);

  // 6. Khu vực Học thuật: Chuyên khảo Lâm sàng & Cơ chế Bệnh sinh (Dành cho Chuyên gia, Bác sĩ & Nghiên cứu sinh)
  const clinicalMonographs = useMemo(() => {
    return pool.filter((a) => a.tier === "Clinical Deep-Dive" || a.tier === "Fundamentals");
  }, [pool]);

  return (
    <div className="space-y-16 py-6 lg:space-y-24">
      {/* =========================================================================
          SECTION 1: KHOA HỌC ĐỜI SỐNG & THÓI QUEN SINH HỌC DỰ PHÒNG (LÊN ĐẦU TIÊN)
          ========================================================================= */}
      {lifeArticles.length > 0 && (
        <section
          id="life-science"
          aria-label="Life Science Section"
          className="mx-auto max-w-[1240px] scroll-mt-12 px-6 lg:px-10"
        >
          <div className="rounded-sm border border-emerald-900/30 bg-emerald-950/[0.02] p-5 sm:p-8">
            <SectionHeader
              badge={isVi ? "🌿 Góc Y khoa Phổ thông · Ứng dụng ngay" : "🌿 Living Science & Daily Habits"}
              title={
                isVi
                  ? "Khoa học Đời sống & Thói quen Sinh học Thường ngày"
                  : "Daily Biological Habits & Preventive Living"
              }
              subtitle={
                isVi
                  ? "Cơ chế khoa học dễ hiểu đằng sau những thói quen ăn uống, giấc ngủ, vận động và thư giãn mỗi ngày. Kiến thức chuẩn y khoa từ TS. Hoàng Xuân Chiến, diễn đạt gần gũi, không thuật ngữ đánh đố, có thể áp dụng ngay cho bản thân và gia đình."
                  : "Accessible, evidence-based science behind daily nutrition, sleep architecture, gentle movement, and circadian alignment. Rigorous research translated into everyday vitality."
              }
              icon={<Coffee className="h-5 w-5 text-emerald-700" />}
              href="#directory"
              count={lifeArticles.length}
              isVi={isVi}
              accentColor="emerald"
            />

            {/* Layout 1 bài lớn + 3 bài bên cạnh */}
            <FeaturedEditorialBlock articles={lifeArticles.slice(0, 4)} isVi={isVi} />

            {/* Dải 3 bài bổ sung ở dưới */}
            {lifeArticles.length > 4 && (
              <div className="mt-8 border-t border-emerald-900/15 pt-6">
                <span className="caps text-xs font-bold text-emerald-800">
                  {isVi ? "Thói quen sinh học khác dành cho bạn:" : "More practical habits:"}
                </span>
                <ThreeCardGrid articles={lifeArticles.slice(4, 7)} isVi={isVi} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: DINH DƯỠNG, CHUYỂN HÓA & NĂNG LƯỢNG (Metabolic & Nutrition)
          ========================================================================= */}
      {metabolicArticles.length > 0 && (
        <section aria-label="Metabolic Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Dinh dưỡng & Năng lượng Cơ thể" : "Metabolic Nutrition"}
            title={
              isVi
                ? "Dinh dưỡng Chuyển hóa & Năng lượng Tế bào"
                : "Metabolic Nutrition & Cellular Bioenergetics"
            }
            subtitle={
              isVi
                ? "Từ thói quen ăn uống kiểm soát đường huyết tự nhiên, tinh bột kháng, kích hoạt mô mỡ nâu (BAT) đến các chu trình chuyển hóa năng lượng ty thể."
                : "Practical glucose modulation, resistant starch benefits, brown fat thermogenesis (UCP1), and mitochondrial bioenergetics."
            }
            icon={<Flame className="h-5 w-5 text-amber-500" />}
            href="#directory"
            count={metabolicArticles.length}
            isVi={isVi}
          />
          <FeaturedEditorialBlock articles={metabolicArticles.slice(0, 4)} isVi={isVi} />
        </section>
      )}

      {/* =========================================================================
          SECTION 3: TIM MẠCH, TUẦN HOÀN & HUYẾT ÁP (Cardiovascular & Circulation)
          ========================================================================= */}
      {cardiovascularArticles.length > 0 && (
        <section aria-label="Cardiovascular Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Tim mạch & Tuần hoàn" : "Cardiovascular & Circulation"}
            title={
              isVi
                ? "Sức khỏe Tim mạch & Tuần hoàn Máu"
                : "Cardiovascular Health & Endothelial Resilience"
            }
            subtitle={
              isVi
                ? "Bảo vệ nội mô mạch máu khi ngồi lâu, dinh dưỡng giãn mạch từ sô-cô-la đen & quả mọng, xông hơi sauna và giải mã chỉ số mỡ máu thực chứng."
                : "Breaking sedentary shear stress, flavanol nitric oxide vasodilation, berry anthocyanins, and evidence-based lipid ratios."
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

      {/* =========================================================================
          BANNER NGHỈ CHÂN TẠP CHÍ: TIÊU CHUẨN BIÊN TẬP VÀ MÔ PHỎNG DƯỢC HỌC
          ========================================================================= */}
      <section className="border-y border-slate-hair bg-indigo-deep text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
          <div className="max-w-2xl">
            <span className="caps text-trace font-mono text-xs">
              {isVi ? "§ TÒA SOẠN Y SINH THỰC CHỨNG" : "§ EVIDENCE-BASED DISPATCH"}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {isVi
                ? "Dữ liệu trung thực. Từ thói quen hàng ngày đến cơ chế phân tử sâu sắc."
                : "Honest data. Bridging everyday habits with deep molecular mechanisms."}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {isVi
                ? "Mọi bài viết phổ thông hay chuyên sâu đều được bảo chứng bởi các nghiên cứu lâm sàng PubMed và đối soát độc lập, không quảng cáo thực phẩm chức năng."
                : "Every article is anchored in verified PubMed literature without supplement commercial hype. Science for living well."}
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

      {/* =========================================================================
          SECTION 4: NÃO BỘ, GIẤC NGỦ & THẦN KINH THƯ THÁI (Neurobiology & Sleep)
          ========================================================================= */}
      {brainSleepArticles.length > 0 && (
        <section aria-label="Brain and Sleep Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Não bộ & Thần kinh" : "Neuro & Circadian Sleep"}
            title={
              isVi
                ? "Não bộ, Giấc ngủ & Thần kinh Thư thái"
                : "Neurobiology, Restorative Sleep & Mental Calm"
            }
            subtitle={
              isVi
                ? "Vệ sinh giấc ngủ sinh học, xoa dịu thần kinh với Magie Bisglycinate, nhịp thở 4-7-8 kích hoạt phế vị và cơ chế làm sạch não Glymphatic khi ngủ sâu."
                : "Circadian sleep hygiene, nocturnal GABA-A activation via magnesium chelation, vagal breathing, and glymphatic brain clearance."
            }
            icon={<BrainCircuit className="h-5 w-5 text-teal-600" />}
            href="#directory"
            count={brainSleepArticles.length}
            isVi={isVi}
          />
          <ThreeCardGrid articles={brainSleepArticles.slice(0, 3)} isVi={isVi} />
          {brainSleepArticles.length > 3 && (
            <CompactCardRow articles={brainSleepArticles.slice(3, 7)} isVi={isVi} />
          )}
        </section>
      )}

      {/* =========================================================================
          SECTION 5: ĐƯỜNG RUỘT, HỆ VI SINH & MIỄN DỊCH (Gut & Microbiome)
          ========================================================================= */}
      {gutImmuneArticles.length > 0 && (
        <section aria-label="Gut and Immunity Section" className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <SectionHeader
            badge={isVi ? "Đường ruột & Hệ Vi sinh" : "Gut & Natural Immunity"}
            title={
              isVi
                ? "Hệ Vi sinh, Đường ruột & Miễn dịch Tự nhiên"
                : "Gut Microbiome, Barrier Integrity & Immunity"
            }
            subtitle={
              isVi
                ? "Trục ruột - não, sự thật hấp thu collagen peptide, nuôi dưỡng vi sinh với axit béo Butyrate và củng cố hàng rào bảo vệ cơ thể."
                : "Gut-brain communication, hydrolyzed collagen peptides absorption reality, butyrate epigenetics, and intestinal mucosal defense."
            }
            icon={<ShieldCheck className="h-5 w-5 text-indigo-500" />}
            href="#directory"
            count={gutImmuneArticles.length}
            isVi={isVi}
          />
          <ThreeCardGrid articles={gutImmuneArticles.slice(0, 3)} isVi={isVi} />
          {gutImmuneArticles.length > 3 && (
            <CompactCardRow articles={gutImmuneArticles.slice(3, 6)} isVi={isVi} />
          )}
        </section>
      )}

      {/* =========================================================================
          SECTION 6: GÓC HỌC THUẬT & CHUYÊN KHẢO LÂM SÀNG (DÀNH CHO CHUYÊN GIA & BÁC SĨ)
          Được đóng khung phân biệt rõ ràng ở cuối trang để người đọc phổ thông không bị ngợp
          ========================================================================= */}
      {clinicalMonographs.length > 0 && (
        <section
          aria-label="Academic Monograph Section"
          className="mx-auto max-w-[1240px] px-6 lg:px-10"
        >
          <div className="rounded-sm border-2 border-indigo-deep/20 bg-indigo-950/[0.03] p-6 sm:p-8">
            <SectionHeader
              badge={isVi ? "🔬 Chuyên khảo Y sinh Học thuật" : "🔬 Clinical Research Archive"}
              title={
                isVi
                  ? "Chuyên khảo Học thuật & Dược động học Phân tử"
                  : "Clinical Research Monographs & Molecular Pharmacology"
              }
              subtitle={
                isVi
                  ? "Khu vực học thuật chuyên sâu: Đối soát thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT), phân tích dược động học phân tử (PK/PD), cơ chế tự thực bào ty thể, Ferroptosis và biến đổi gen trường thọ. Dành cho nghiên cứu sinh, bác sĩ và chuyên gia y tế."
                  : "Advanced biomedical repository: Primary randomized controlled trials (RCT), molecular pharmacokinetics, mitochondrial autophagy, and senescence pathways for clinicians and researchers."
              }
              icon={<Microscope className="h-5 w-5 text-indigo-deep" />}
              href="#directory"
              count={clinicalMonographs.length}
              isVi={isVi}
            />
            <ThreeCardGrid articles={clinicalMonographs.slice(0, 3)} isVi={isVi} />
            {clinicalMonographs.length > 3 && (
              <CompactCardRow articles={clinicalMonographs.slice(3, 9)} isVi={isVi} />
            )}
          </div>
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
  accentColor = "indigo",
}: {
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  count: number;
  isVi: boolean;
  accentColor?: "indigo" | "emerald";
}) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 border-b-2 pb-4 ${
        accentColor === "emerald" ? "border-emerald-700" : "border-indigo-deep"
      }`}
    >
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <span
            className={`caps font-bold tracking-wider ${
              accentColor === "emerald" ? "text-emerald-800" : "text-indigo-deep"
            }`}
          >
            {badge}
          </span>
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

/** Layout kết hợp 1 Card lớn bên trái (Lead Card) + 2-3 Card nằm dọc bên phải */
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
      <div className="flex flex-col justify-between gap-4 lg:col-span-5">
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
  const isLife = article.tier === "Life Dispatch";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-sm border bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isLife ? "border-emerald-900/30 hover:border-emerald-700" : "border-slate-hair hover:border-indigo-deep"
      }`}
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
          {isLife ? (
            <span className="caps inline-flex items-center gap-1.5 rounded-sm bg-emerald-800/95 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm shadow-xs">
              🌿 {isVi ? "Đời sống" : "Life"}
            </span>
          ) : (
            <span className="caps inline-flex items-center gap-1.5 rounded-sm bg-[#050d19]/85 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              {isVi ? ORGAN_VI[article.organ] : article.organ}
            </span>
          )}
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
          <span className={`caps font-semibold ${isLife ? "text-emerald-700 font-bold" : ""}`}>
            {isLife ? (isVi ? "Khoa học Đời sống" : "Life Dispatch") : article.tier}
          </span>
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
  const isLife = article.tier === "Life Dispatch";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-1 gap-3.5 rounded-sm border border-slate-hair bg-paper p-3.5 transition-all duration-200 hover:border-indigo-deep hover:bg-paper-tint"
    >
      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-sm bg-indigo-deep sm:w-24">
        {article.thumb ? (
          <Image
            src={article.thumb}
            alt=""
            fill
            sizes="100px"
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
          <div className="flex items-center gap-1.5">
            {isLife && (
              <span className="rounded bg-emerald-50 px-1 py-0.2 text-[10px] font-semibold text-emerald-700">
                {isVi ? "Đời sống" : "Life"}
              </span>
            )}
            <span className="caps text-[0.7rem] font-semibold text-slate-ink">
              {isVi ? ORGAN_VI[article.organ] : article.organ}
            </span>
          </div>
          <h4 className="mt-1 font-display text-[0.93rem] font-semibold leading-snug tracking-tight text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
            {displayTitle}
          </h4>
        </div>
        <p className="caps mt-1.5 text-[0.72rem] text-slate-mute">
          {formatDate(article.date, isVi ? "vi" : "en")} · {article.minutes} {isVi ? "phút đọc" : "min read"}
        </p>
      </div>
    </Link>
  );
}

/** Lưới 3 thẻ chuẩn cho các chuyên đề */
function ThreeCardGrid({ articles, isVi }: { articles: Article[]; isVi: boolean }) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const accent = ORGAN_ACCENT[article.organ];
        const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;
        const displayDek = isVi && article.dekVi ? article.dekVi : article.dek;
        const isLife = article.tier === "Life Dispatch";

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
              <div className="mb-1">
                {isLife && (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    🌿 {isVi ? "Khoa học Đời sống" : "Life Dispatch"}
                  </span>
                )}
              </div>
              <h3 className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-indigo-deep line-clamp-2 transition-colors group-hover:text-trace-ink">
                {displayTitle}
              </h3>
              <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-slate-ink line-clamp-2">
                {displayDek}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-hair pt-3 text-[0.75rem] text-slate-ink">
                <span className="caps font-semibold">
                  {isLife ? (isVi ? "Dễ hiểu" : "Practical") : article.tier}
                </span>
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

/** Dải thẻ nhỏ ngang cho các bài phụ bổ sung */
function CompactCardRow({ articles, isVi }: { articles: Article[]; isVi: boolean }) {
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const displayTitle = isVi && article.titleVi ? article.titleVi : article.title;
        const isLife = article.tier === "Life Dispatch";
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
              {isLife && (
                <span className="text-[10px] font-semibold text-emerald-700 block mb-0.5">
                  🌿 {isVi ? "Đời sống" : "Life"}
                </span>
              )}
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
