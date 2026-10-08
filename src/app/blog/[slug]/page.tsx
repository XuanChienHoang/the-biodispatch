import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BadgeCheck, Timer, Quote, ExternalLink, Users, FlaskConical, FileText, ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArticle, getReferences, getArticles } from "@/lib/store";
import { ArticleBody } from "@/components/ArticleBody";
import type { CitationData } from "@/components/Citation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import CurcuminPiperineGizmo from "@/components/gizmo/CurcuminPiperine";
import PKGizmo from "@/components/gizmo/PKGizmo";
import BiomarkerGizmo from "@/components/gizmo/BiomarkerGizmo";
import PathwayGizmo from "@/components/gizmo/PathwayGizmo";
import SynergyGizmo from "@/components/gizmo/SynergyGizmo";
import { ArticleLanguageBar } from "@/components/ArticleLanguageBar";
import { PathwayFlowchart } from "@/components/PathwayFlowchart";
import { SocialShare } from "@/components/SocialShare";
import { NewsletterBox } from "@/components/NewsletterBox";
import { TableOfContents } from "@/components/TableOfContents";
import { twinRoot } from "@/lib/home";

function extractTextFromChildren(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join("");
  if (children && typeof children === "object" && children.props?.children) {
    return extractTextFromChildren(children.props.children);
  }
  return "";
}

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Dispatch Not Found" };

  const ogUrl = new URL("https://www.phyto-codex.org/api/og");
  ogUrl.searchParams.set("title", a.title);
  ogUrl.searchParams.set("dek", a.dek);
  ogUrl.searchParams.set("organ", a.organ);
  ogUrl.searchParams.set("tier", a.tier);

  const directImage = a.image ? (a.image.startsWith("http") ? a.image : `https://www.phyto-codex.org${a.image}`) : ogUrl.toString();

  const root = twinRoot(slug);
  const isCurrentVi =
    a.lang === "vi" ||
    slug.endsWith("-vi") ||
    slug.includes("sinh-kha-dung") ||
    slug.includes("keo-dai-tuoi-tho") ||
    slug.includes("mo-nau") ||
    slug.includes("sinh-nhiet");

  // Determine twin slug
  const viSlug = isCurrentVi ? slug : `${root}-vi`;
  const enSlug = !isCurrentVi ? slug : (root.endsWith("-en") ? root : `${root}-en`);

  return {
    title: `${a.title} · Phytocodex`,
    description: a.dek,
    alternates: {
      canonical: `https://www.phyto-codex.org/blog/${slug}`,
      languages: {
        vi: `https://www.phyto-codex.org/blog/${viSlug}`,
        en: `https://www.phyto-codex.org/blog/${enSlug}`,
        "x-default": `https://www.phyto-codex.org/blog/${enSlug}`,
      },
    },
    keywords: [
      a.organ,
      a.tier,
      ...(a.tags || []),
      "TS. Hoàng Xuân Chiến",
      "Dr. Xuan Chien Hoang",
      "Biomedical Intelligence",
      "Metabolomics",
    ],
    openGraph: {
      title: `${a.title} · Phytocodex`,
      description: a.dek,
      url: `https://www.phyto-codex.org/blog/${slug}`,
      type: "article",
      publishedTime: a.date,
      authors: [a.author || "Dr. Xuan Chien Hoang"],
      tags: [a.organ, a.tier, ...(a.tags || [])],
      images: [
        {
          url: directImage,
          width: 1200,
          height: 630,
          alt: a.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.title} · Phytocodex`,
      description: a.dek,
      images: [directImage],
      creator: "@DrXuanChienHoang",
    },
  };
}

function designIcon(design: string) {
  if (/meta|random|crossover|blind|trial/i.test(design)) return Users;
  if (/in-vitro|microsome|assay/i.test(design)) return FlaskConical;
  return FileText;
}

function renderEmbeddedGizmo(gizmoName: string | null | undefined) {
  if (!gizmoName) return null;
  switch (gizmoName) {
    case "curcumin-piperine":
      return <CurcuminPiperineGizmo />;
    case "pk":
      return <PKGizmo />;
    case "biomarker":
      return <BiomarkerGizmo />;
    case "pathway":
      return <PathwayGizmo />;
    case "synergy":
      return <SynergyGizmo />;
    default:
      return null;
  }
}

export default async function BlogPage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const refs = await getReferences(slug);
  const data: CitationData[] = refs.map((r) => ({ ...r }));
  const allArticles = await getArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const isVi =
    article.lang === "vi" ||
    slug.endsWith("-vi") ||
    slug.includes("sinh-kha-dung") ||
    slug.includes("keo-dai-tuoi-tho") ||
    slug.includes("mo-nau") ||
    slug.includes("sinh-nhiet") ||
    Boolean(article.tags?.includes("Dược động học"));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "ScholarlyArticle"],
    headline: article.title,
    description: article.dek,
    datePublished: article.date || "2026-09-23",
    dateModified: article.date || "2026-09-23",
    inLanguage: isVi ? "vi-VN" : "en-US",
    about: {
      "@type": "MedicalCondition",
      name: article.organ,
    },
    author: {
      "@type": "Person",
      name: article.author || "Dr. Xuan Chien Hoang",
      jobTitle: "Doctor of Natural Sciences (Dr. rer. nat. in Molecular Biology)",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Hamburg",
      },
      sameAs: [
        "https://www.linkedin.com/in/dr-chien-xuan-hoang/",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Phytocodex",
      url: "https://www.phyto-codex.org",
    },
    citation: refs.map((r) => ({
      "@type": "CreativeWork",
      name: r.label,
      identifier: r.doi ? `https://doi.org/${r.doi}` : (r.pmid ? `PMID:${r.pmid}` : undefined),
    })),
    articleSection: article.tier,
    isAccessibleForFree: true,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* ------------- Journal Masthead Header ------------- */}
      <header className="relative overflow-hidden border-b border-slate-hair bg-paper">
        <div className="relative mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-20">
          <nav className="caps flex flex-wrap items-center gap-2 text-slate-ink">
            <Link href="/" className="hover:text-indigo-deep">
              {isVi ? "Trang chủ" : "Front"}
            </Link>
            <span>/</span>
            <Link href="/#directory" className="hover:text-indigo-deep">
              {isVi ? "Kho bài" : "Corpus"}
            </Link>
            <span>/</span>
            <span className="text-indigo-deep font-semibold">{article.tier}</span>
          </nav>

          <div className="mt-7 max-w-3xl">
            <div className="mb-6">
              <ArticleLanguageBar
                currentSlug={slug}
                articleMeta={{
                  title: article.title,
                  excerpt: article.dek,
                  content: article.content,
                  lang: isVi ? "vi" : "en",
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace font-medium">
                {article.tier}
              </span>
              <span className="caps rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                {article.organ}
              </span>
              <span className="caps flex items-center gap-1.5 rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                <BadgeCheck size={13} className="text-syn-ink" /> {isVi ? "Đối soát Y văn (PubMed / DOI)" : "Literature-Synthesized & EBM-Verified"}
              </span>
              <span className="caps flex items-center gap-1.5 rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                <Timer size={13} /> {article.minutes} {isVi ? "phút đọc" : "min read"}
              </span>
            </div>

            <h1 className="mt-6 font-display display-lg font-black leading-[0.94] tracking-[-0.04em] text-indigo-deep">
              {article.title}
            </h1>

            <p className="mt-5 max-w-2xl text-[1.15rem] leading-[1.65] text-indigo-soft">
              {article.dek}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-indigo-deep/15 pt-5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-deep text-trace font-mono font-bold flex items-center justify-center text-xs">
                  CH
                </div>
                <div>
                  <span className="caps font-semibold text-indigo-deep block">
                    {isVi ? "TS. Hoàng Xuân Chiến" : (article.author || "Dr. Xuan Chien Hoang")}
                  </span>
                  <span className="text-[0.72rem] text-slate-ink block">
                    {isVi
                      ? "Tiến sĩ Khoa học Tự nhiên · Đại học Hamburg, CHLB Đức"
                      : (article.authorRole || "Dr. rer. nat. · University of Hamburg")}
                  </span>
                </div>
              </div>
              <span className="caps text-slate-ink">{article.date || "2026-09-23"}</span>
              <span className="num text-[0.74rem] text-slate-ink">DOI: {article.doi}</span>
              {refs.length > 0 && (
                <span className="caps ml-auto flex items-center gap-1.5 text-indigo-deep">
                  <Quote size={12} className="text-trace-ink" /> {refs.length} {isVi ? "Tài liệu Y văn Tham chiếu" : "Referenced Literature"}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ------------- Article Body ------------- */}
      <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-20">
        {article.content ? (
          <div>
            {/* Top Area: Markdown Content + Sticky Sidebar */}
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
              <article className="min-w-0 max-w-[72ch] lg:max-w-[80ch] prose-editorial">
                {/* Mobile Collapsible Table of Contents (Only renders on mobile) */}
                <TableOfContents content={article.content} isVi={isVi} variant="mobile" />

                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h2({ children, ...props }) {
                      const text = extractTextFromChildren(children);
                      const id = text
                        .toLowerCase()
                        .replace(/[^\w\s\u00C0-\u1EF9-]/g, "")
                        .replace(/\s+/g, "-")
                        .substring(0, 50);
                      return (
                        <h2 id={id} className="scroll-mt-24 font-display font-bold" {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3({ children, ...props }) {
                      const text = extractTextFromChildren(children);
                      const id = text
                        .toLowerCase()
                        .replace(/[^\w\s\u00C0-\u1EF9-]/g, "")
                        .replace(/\s+/g, "-")
                        .substring(0, 50);
                      return (
                        <h3 id={id} className="scroll-mt-24 font-display font-bold" {...props}>
                          {children}
                        </h3>
                      );
                    },
                    pre({ children, ...props }) {
                      const rawText = extractTextFromChildren(children);
                      if (
                        rawText.includes("──►") ||
                        rawText.includes("->") ||
                        rawText.includes("→") ||
                        rawText.includes("┌") ||
                        (rawText.includes("│") && rawText.includes("▼"))
                      ) {
                        return <PathwayFlowchart rawText={rawText} isVi={isVi} />;
                      }
                      return <pre {...props}>{children}</pre>;
                    },
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </article>

              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-20 rounded-sm border border-slate-hair bg-paper p-5 space-y-5">
                  {/* Table of Contents for Desktop */}
                  <TableOfContents content={article.content} isVi={isVi} variant="desktop" />

                  <div className="border-t border-slate-hair pt-4">
                    <span className="caps text-slate-ink block mb-3 font-semibold">
                      {isVi ? "Thuộc tính Bài viết" : "Article Metadata"}
                    </span>
                    <div className="space-y-3 text-xs border-b border-slate-hair pb-4">
                      <div>
                        <span className="caps text-slate-ink block">
                          {isVi ? "Hệ Cơ quan" : "Organ System"}
                        </span>
                        <span className="font-semibold text-indigo-deep">{article.organ}</span>
                      </div>
                      <div>
                        <span className="caps text-slate-ink block">
                          {isVi ? "Độ sâu Phân tích" : "Analytical Depth"}
                        </span>
                        <span className="font-semibold text-indigo-deep">{article.tier}</span>
                      </div>
                      <div>
                        <span className="caps text-slate-ink block">
                          {isVi ? "Định danh Y văn (DOI)" : "Primary DOI"}
                        </span>
                        <a
                          href={`https://doi.org/${article.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-trace-ink underline truncate block"
                        >
                          {article.doi}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="caps text-slate-ink block mb-2 font-semibold">
                      {isVi ? "Điều hướng" : "Navigation"}
                    </span>
                    <Link href="/#directory" className="caps text-indigo-deep hover:text-trace-ink flex items-center gap-1 text-xs">
                      <ArrowLeft size={12} /> {isVi ? "Quay lại Kho bài viết" : "Back to Corpus"}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            {/* ------------- References Section (Ngay dưới phần kết bài, tràn rộng toàn trang) ------------- */}
            {refs.length > 0 && (
              <section id="references" className="mt-14 scroll-mt-8 border-t-2 border-indigo-deep pt-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="caps text-slate-ink">
                      {isVi ? "§ 6 · Tài liệu Tham khảo & Y văn Đối soát" : "§ 6 · References & Primary Evidence"}
                    </span>
                    <h2 className="mt-2 font-display text-[1.4rem] font-bold leading-tight tracking-[-0.03em] text-indigo-deep">
                      {isVi ? "Danh mục Y văn Thực chứng." : "Verified Source List."}
                    </h2>
                  </div>
                  <p className="caps text-[0.74rem] text-slate-ink">
                    {isVi
                      ? "Tài liệu tham khảo đối soát qua PubMed & CrossRef"
                      : "References indexed via NCBI PubMed & CrossRef"}
                  </p>
                </div>

                <ol className="mt-6 grid gap-3">
                  {refs.map((r) => {
                    const Icon = designIcon(r.design);
                    const pubmedUrl = r.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` : null;
                    const doiUrl = r.doi ? `https://doi.org/${r.doi}` : null;
                    const primaryUrl = pubmedUrl || doiUrl || "#";

                    return (
                      <li key={r.ordinal} className="group rounded-sm border border-slate-hair bg-paper p-5 transition-all duration-200 hover:border-indigo-deep hover:shadow-md">
                        <div className="grid gap-x-6 gap-y-3 md:grid-cols-[46px_minmax(0,1fr)_auto]">
                          <span className="num rounded-sm bg-indigo-deep py-1 text-center text-[0.78rem] text-trace font-bold h-fit">
                            {String(r.ordinal).padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <a
                              href={primaryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-display text-[1.06rem] font-semibold leading-snug tracking-[-0.01em] text-indigo-deep hover:text-trace-ink hover:underline block"
                            >
                              {r.label}
                            </a>
                            <p className="mt-1 text-[0.84rem] text-slate-ink">
                              {r.journal} · {r.year}
                            </p>
                            <p className="mt-2 max-w-4xl text-[0.88rem] leading-relaxed text-indigo-soft">
                              {r.abstract}
                            </p>
                          </div>
                          <div className="flex flex-row flex-wrap items-start gap-2 md:flex-col md:items-end">
                            <span className="caps flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-slate-hair px-2.5 py-1 text-xs text-indigo-soft">
                              <Icon size={11} className="text-trace-ink" /> {r.design}
                            </span>
                            <span className="num whitespace-nowrap text-[0.74rem] text-slate-ink">
                              {r.sampleSize ? `n = ${r.sampleSize}` : "n = systematic/in-vitro"}
                            </span>
                            
                            {/* Explicit Clickable Source Buttons */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {pubmedUrl && (
                                <a
                                  href={pubmedUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="caps inline-flex items-center gap-1 rounded bg-[#0071BC]/10 px-2.5 py-1 text-xs font-semibold text-[#0071BC] transition-colors hover:bg-[#0071BC] hover:text-white"
                                  title={`Xem bài báo gốc trên PubMed (PMID: ${r.pmid})`}
                                >
                                  PubMed <ExternalLink size={10} />
                                </a>
                              )}
                              {doiUrl && (
                                <a
                                  href={doiUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="caps inline-flex items-center gap-1 rounded bg-indigo-deep/10 px-2.5 py-1 text-xs font-semibold text-indigo-deep transition-colors hover:bg-indigo-deep hover:text-white"
                                  title={`Mở bài báo gốc qua DOI (${r.doi})`}
                                >
                                  DOI <ExternalLink size={10} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Interactive Simulation (Dưới danh mục Y văn tham khảo) */}
            {article.gizmo && (
              <div className="my-14 border-t border-slate-hair pt-8">
                <div className="mb-4 border-l-2 border-trace pl-3">
                  <span className="caps text-trace-ink font-semibold">Interactive Laboratory Simulation</span>
                  <p className="text-xs text-slate-ink">Model calculations execute entirely client-side.</p>
                </div>
                {renderEmbeddedGizmo(article.gizmo)}
              </div>
            )}

            {/* Social Share & Author Card Strip */}
            <div className="mt-12 max-w-3xl">
              <SocialShare
                title={isVi && article.titleVi ? article.titleVi : article.title}
                url={`https://www.phyto-codex.org/blog/${article.slug}`}
                isVi={isVi}
              />

              {/* Author bio card */}
              <div className="mt-10 rounded-sm border border-slate-hair bg-paper-tint p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-deep text-trace font-mono font-bold flex items-center justify-center text-base">
                    CH
                  </div>
                  <div>
                    <h4 className="font-display text-[1.1rem] font-bold text-indigo-deep">
                      {isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
                    </h4>
                    <p className="caps text-[0.7rem] text-trace-ink font-medium">
                      {isVi
                        ? "Tiến sĩ Sinh học Phân tử (Đại học Hamburg) · Sáng lập Lava Health GmbH"
                        : "Doctor of Natural Sciences (Univ. of Hamburg) · Founder, Lava Health GmbH"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-indigo-soft">
                  {isVi
                    ? "Nhà khoa học và chuyên gia phát triển sản phẩm y sinh với hơn 10 năm kinh nghiệm tại Đức và Châu Á. Tác giả cuốn sách chuyên khảo The Cancer Code (Amazon: eBook, Bìa mềm, Bìa cứng). Tiên phong kết hợp thảo dược Á Đông với tiêu chuẩn chiết xuất Châu Âu; tối ưu hóa sinh khả dụng, nghiên cứu giải pháp hỗ trợ ung thư và ứng dụng Data Science trong y tế thực chứng."
                    : "Biomedical scientist and product developer with over a decade of international experience in Germany and APAC. Author of The Cancer Code (Amazon: eBook, Paperback, Hardcover). Pioneering the East-West botanical bridge, bioavailability enhancement, and data-driven HealthTech."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <a
                    href="https://www.linkedin.com/in/dr-chien-xuan-hoang/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-deep font-semibold underline decoration-trace hover:text-trace-ink"
                  >
                    LinkedIn Profile ↗
                  </a>
                  <Link href="/about" className="text-indigo-deep font-semibold underline decoration-trace">
                    {isVi ? "Xem hồ sơ khoa học & quá trình công tác →" : "Read full profile & career history →"}
                  </Link>
                  <a
                    href="https://www.amazon.com/CANCER-CODE-Evidence-Based-Bioactives-Integrative-ebook/dp/B0HFVW9PFB/ref=sr_1_1?crid=32EIDTVIFZXPU&dib=eyJ2IjoiMSJ9._0XKQ_D9j8dGnHNwFjveCsRdRzY4ubvVmPn01TKr8OhUkuwgQs9nHF4R27uzUY54.qTeTUa5SQjqcM6bR4oT_eNCDbia84fDGlZnyk48I4cQ&dib_tag=se&keywords=the+cancer+code+dr.+xuan+chien+hoang&qid=1791279105&sprefix=%2Caps%2C191&sr=8-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trace-ink font-semibold underline decoration-trace"
                  >
                    {isVi ? "Sách: The Cancer Code (Amazon) ↗" : "Book: The Cancer Code (Amazon) ↗"}
                  </a>
                </div>
              </div>

              {/* Weekly Dispatch Newsletter Signup Box */}
              <div className="mt-10">
                <NewsletterBox isVi={isVi} />
              </div>
            </div>
          </div>
        ) : slug === "curcumin-piperine-bioavailability" && data.length > 0 ? (
          <ArticleBody refs={data} />
        ) : (
          <div className="rounded-sm border border-slate-hair bg-paper-tint p-8 lg:p-12">
            <span className="caps text-trace-ink font-semibold">Manuscript Status · In Peer Review</span>
            <h2 className="mt-4 max-w-2xl font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
              This dispatch is currently undergoing scientific peer review.
            </h2>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-indigo-soft">
              The full analytical text of <span className="text-indigo-deep font-semibold">{article.title}</span> is being
              evaluated against empirical metabolomic benchmarks. At Phytocodex, articles are published strictly alongside
              verifiable citations.
            </p>
            <div className="mt-7 grid max-w-2xl gap-px border-t border-slate-hair bg-slate-hair sm:grid-cols-3">
              {[
                ["Review Stage", "Peer Verification"],
                ["Reviewers", "Double-Blind"],
                ["Release Window", "2026"],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper-tint px-4 py-3">
                  <p className="caps text-slate-ink">{k}</p>
                  <p className="num mt-1 text-[1.1rem] font-bold text-indigo-deep">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog/metabolomic-horizon-clinical-diagnostics"
                className="caps rounded-sm bg-indigo-deep px-5 py-3 text-paper transition-colors hover:bg-indigo-mid"
              >
                Read Featured Metabolomics Dispatch
              </Link>
              <Link
                href="/#directory"
                className="caps rounded-sm border border-slate-hair px-5 py-3 text-indigo-soft transition-colors hover:border-indigo-deep hover:text-indigo-deep"
              >
                Return to Corpus
              </Link>
            </div>
          </div>
        )}

        {/* ------------- Related Dispatches ------------- */}
        <section className="mt-16 border-t border-slate-hair pt-8">
          <span className="caps text-slate-ink font-semibold">
            {isVi ? "Các Bài Phân tích Cùng Chuyên đề" : "Related Analytical Dispatches"}
          </span>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-sm border border-slate-hair p-5 transition-all duration-300 hover:border-indigo-deep hover:shadow-[0_18px_40px_-30px_rgba(11,25,44,0.8)]"
              >
                <span className="caps text-slate-ink">{a.organ}</span>
                <h3 className="mt-2.5 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] text-indigo-deep">
                  {isVi && a.titleVi ? a.titleVi : a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[0.86rem] leading-relaxed text-slate-ink">
                  {isVi && a.dekVi ? a.dekVi : a.dek}
                </p>
                <span className="caps mt-4 inline-flex items-center gap-1 text-indigo-deep font-semibold transition-transform group-hover:translate-x-1">
                  {isVi ? "Đọc bài phân tích" : "Open Dispatch"} <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
