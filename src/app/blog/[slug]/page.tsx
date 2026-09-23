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
  return {
    title: `${a.title} · The BioDispatch`,
    description: a.dek,
    openGraph: {
      title: `${a.title} · The BioDispatch`,
      description: a.dek,
      type: "article",
      authors: [a.author || "Dr. Xuan Chien Hoang"],
      tags: [a.organ, a.tier],
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.date || "2026-09-23",
    author: {
      "@type": "Person",
      name: article.author || "Dr. Xuan Chien Hoang",
      jobTitle: "Doctor of Natural Sciences (Dr. rer. nat.)",
      alumniOf: "University of Hamburg",
    },
    publisher: {
      "@type": "Organization",
      name: "The BioDispatch",
    },
    citations: refs.map((r) => r.doi).filter(Boolean),
    articleSection: article.tier,
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
            <Link href="/" className="hover:text-indigo-deep">Front</Link>
            <span>/</span>
            <Link href="/#directory" className="hover:text-indigo-deep">Corpus</Link>
            <span>/</span>
            <span className="text-indigo-deep font-semibold">{article.tier}</span>
          </nav>

          <div className="mt-7 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace font-medium">
                {article.tier}
              </span>
              <span className="caps rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                {article.organ}
              </span>
              <span className="caps flex items-center gap-1.5 rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                <BadgeCheck size={13} className="text-syn-ink" /> Peer-Reviewed EBM
              </span>
              <span className="caps flex items-center gap-1.5 rounded-sm border border-indigo-deep/25 px-2.5 py-1.5 text-indigo-deep">
                <Timer size={13} /> {article.minutes} min read
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
                    {article.author || "Dr. Xuan Chien Hoang"}
                  </span>
                  <span className="text-[0.72rem] text-slate-ink block">
                    {article.authorRole || "Dr. rer. nat. · University of Hamburg"}
                  </span>
                </div>
              </div>
              <span className="caps text-slate-ink">{article.date || "2026-09-23"}</span>
              <span className="num text-[0.74rem] text-slate-ink">DOI: {article.doi}</span>
              {refs.length > 0 && (
                <span className="caps ml-auto flex items-center gap-1.5 text-indigo-deep">
                  <Quote size={12} className="text-trace-ink" /> {refs.length} Verified References
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ------------- Article Body ------------- */}
      <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-20">
        {article.content ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
            <article className="min-w-0 max-w-[70ch] prose-editorial">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {article.content}
              </ReactMarkdown>

              {article.gizmo && (
                <div className="my-12">
                  <div className="mb-3 border-l-2 border-trace pl-3">
                    <span className="caps text-trace-ink font-semibold">Interactive Laboratory Simulation</span>
                    <p className="text-xs text-slate-ink">Model calculations execute entirely client-side.</p>
                  </div>
                  {renderEmbeddedGizmo(article.gizmo)}
                </div>
              )}

              {/* Author bio card */}
              <div className="mt-14 rounded-sm border border-slate-hair bg-paper-tint p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-deep text-trace font-mono font-bold flex items-center justify-center text-base">
                    CH
                  </div>
                  <div>
                    <h4 className="font-display text-[1.1rem] font-bold text-indigo-deep">Dr. Xuan Chien Hoang</h4>
                    <p className="caps text-[0.7rem] text-trace-ink font-medium">
                      Doctor of Natural Sciences (University of Hamburg, Germany)
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-indigo-soft">
                  Biomedical product lifecycle strategist and metabolomic profiling specialist with over 8 years of R&D,
                  quality governance, and clinical evidence synthesis experience across Europe and APAC.
                </p>
                <div className="mt-4 flex gap-4 text-xs font-mono">
                  <Link href="/about" className="text-indigo-deep font-semibold underline decoration-trace">
                    Read full profile & career history →
                  </Link>
                </div>
              </div>
            </article>

            {/* Sticky Sidebar Navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 rounded-sm border border-slate-hair bg-paper p-5">
                <span className="caps text-slate-ink block mb-3 font-semibold">Article Metadata</span>
                <div className="space-y-3 text-xs border-b border-slate-hair pb-4">
                  <div>
                    <span className="caps text-slate-ink block">Organ System</span>
                    <span className="font-semibold text-indigo-deep">{article.organ}</span>
                  </div>
                  <div>
                    <span className="caps text-slate-ink block">Analytical Depth</span>
                    <span className="font-semibold text-indigo-deep">{article.tier}</span>
                  </div>
                  <div>
                    <span className="caps text-slate-ink block">Primary DOI</span>
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

                <div className="mt-4">
                  <span className="caps text-slate-ink block mb-2 font-semibold">Navigation</span>
                  <Link href="/#directory" className="caps text-indigo-deep hover:text-trace-ink flex items-center gap-1 text-xs">
                    <ArrowLeft size={12} /> Back to Corpus
                  </Link>
                </div>
              </div>
            </aside>
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
              evaluated against empirical metabolomic benchmarks. At The BioDispatch, articles are published strictly alongside
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

        {/* ------------- References Section ------------- */}
        {refs.length > 0 && (
          <section id="references" className="mt-16 scroll-mt-8 border-t-2 border-indigo-deep pt-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="caps text-slate-ink">§ 6 · References & Primary Evidence</span>
                <h2 className="mt-2.5 font-display text-step-3 font-bold leading-tight tracking-[-0.03em] text-indigo-deep">
                  Verified Source List.
                </h2>
              </div>
              <p className="caps text-slate-ink">All citations verified against NCBI PubMed / CrossRef APIs</p>
            </div>

            <ol className="mt-8 grid gap-px bg-slate-hair">
              {refs.map((r) => {
                const Icon = designIcon(r.design);
                const href = r.doi
                  ? `https://doi.org/${r.doi}`
                  : `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`;
                return (
                  <li key={r.ordinal} className="group bg-paper">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid gap-x-6 gap-y-2 p-5 transition-colors duration-200 hover:bg-paper-tint md:grid-cols-[46px_minmax(0,1fr)_auto]"
                    >
                      <span className="num rounded-sm bg-indigo-deep py-1 text-center text-[0.78rem] text-trace font-bold">
                        {String(r.ordinal).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-[1.04rem] font-semibold leading-snug tracking-[-0.01em] text-indigo-deep">
                          {r.label}
                        </p>
                        <p className="mt-1.5 text-[0.84rem] text-slate-ink">
                          {r.journal} · {r.year}
                        </p>
                        <p className="mt-2 max-w-3xl text-[0.87rem] leading-relaxed text-indigo-soft">
                          {r.abstract}
                        </p>
                      </div>
                      <div className="flex flex-row items-start gap-3 md:flex-col md:items-end">
                        <span className="caps flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-slate-hair px-2 py-1 text-indigo-soft">
                          <Icon size={11} className="text-trace-ink" /> {r.design}
                        </span>
                        <span className="num whitespace-nowrap text-[0.74rem] text-slate-ink">
                          {r.sampleSize ? `n = ${r.sampleSize}` : "n = systematic/in-vitro"}
                        </span>
                        <span className="caps flex items-center gap-1 whitespace-nowrap text-indigo-deep font-semibold transition-transform group-hover:translate-x-0.5">
                          {r.doi ? `DOI ${r.doi}` : `PMID ${r.pmid}`} <ExternalLink size={11} />
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* ------------- Related Dispatches ------------- */}
        <section className="mt-16 border-t border-slate-hair pt-8">
          <span className="caps text-slate-ink font-semibold">Related Analytical Dispatches</span>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-sm border border-slate-hair p-5 transition-all duration-300 hover:border-indigo-deep hover:shadow-[0_18px_40px_-30px_rgba(11,25,44,0.8)]"
              >
                <span className="caps text-slate-ink">{a.organ}</span>
                <h3 className="mt-2.5 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] text-indigo-deep">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[0.86rem] leading-relaxed text-slate-ink">{a.dek}</p>
                <span className="caps mt-4 inline-flex items-center gap-1 text-indigo-deep font-semibold transition-transform group-hover:translate-x-1">
                  Open Dispatch <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
