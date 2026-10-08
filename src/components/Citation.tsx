"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Users, FlaskConical } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Inline PubMed citation with hover card: abstract, n, study design   */
/* ------------------------------------------------------------------ */

export interface CitationData {
  ordinal: number;
  label: string;
  pmid: string | null;
  doi: string | null;
  design: string;
  sampleSize: number | null;
  journal: string;
  year: number;
  abstract: string;
}

function designIcon(design: string) {
  if (/meta|RCT|crossover|blind|trial/i.test(design)) return Users;
  if (/in-vitro|microsome|assay/i.test(design)) return FlaskConical;
  return FileText;
}

export function Citation({ data }: { data: CitationData | undefined }) {
  const [open, setOpen] = useState(false);
  if (!data) return null;
  const Icon = designIcon(data.design);
  const href = data.doi
    ? `https://doi.org/${data.doi}`
    : `https://pubmed.ncbi.nlm.nih.gov/${data.pmid}/`;

  return (
    <span
      className="relative inline-block align-baseline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="num mx-[2px] inline-flex h-[1.15em] min-w-[1.15em] items-center justify-center rounded-[3px] bg-indigo-deep px-[4px] align-super text-[0.6em] font-medium leading-none text-trace transition-colors duration-150 hover:bg-trace hover:text-indigo-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace"
        aria-label={`Reference ${data.ordinal}: ${data.label}`}
        tabIndex={0}
      >
        {data.ordinal}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            role="tooltip"
            className="absolute bottom-[calc(100%+10px)] left-1/2 z-50 block w-[min(360px,80vw)] -translate-x-1/2 overflow-hidden rounded-sm border border-slate-hair bg-paper text-left shadow-[0_18px_50px_-12px_rgba(11,25,44,0.35)]"
          >
            <span className="flex items-center gap-2 border-b border-slate-hair bg-paper-tint px-3 py-2">
              <Icon size={12} className="text-trace-ink" strokeWidth={2.2} />
              <span className="caps text-indigo-soft">{data.design}</span>
              <span className="caps ml-auto text-slate-ink">
                {data.sampleSize ? `n = ${data.sampleSize}` : "n = in-vitro"}
              </span>
            </span>
            <span className="block px-3 py-3">
              <span className="block font-display text-[0.95rem] font-semibold leading-snug text-indigo-deep">
                {data.label}
              </span>
              <span className="mt-1.5 block text-[0.74rem] text-slate-ink">
                {data.journal} · {data.year}
              </span>
              <span className="mt-2.5 block text-[0.79rem] leading-relaxed text-indigo-soft">
                {data.abstract}
              </span>
            </span>
            <span className="flex items-center justify-between border-t border-slate-hair px-3 py-2">
              <span className="num text-[0.66rem] text-slate-ink">
                {data.pmid ? `PMID ${data.pmid}` : data.doi}
              </span>
              <span className="caps text-trace-ink">pubmed ↗</span>
            </span>
            <a href={href} target="_blank" rel="noopener noreferrer" className="sr-only">
              Open reference {data.ordinal}
            </a>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Cite-this-model modal                                               */
/* ------------------------------------------------------------------ */

export function CiteModal({
  open,
  onClose,
  title,
  params,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  params: [string, string][];
}) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const citation = `Hoang, X. C. (${new Date().getFullYear()}). ${title} [Interactive pharmacokinetic engine]. Phytocodex. https://www.phyto-codex.org/gizmos (truy cập ${new Date()
    .toISOString()
    .slice(0, 10)}).`;
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-indigo-deep/70 p-5 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-sm border border-slate-hair bg-paper"
        >
          <div className="flex items-center justify-between border-b border-slate-hair bg-paper-tint px-5 py-3">
            <span className="caps text-indigo-soft">
              {isVi ? "Trích dẫn mô hình khoa học này" : "Cite this model"}
            </span>
            <button onClick={onClose} className="caps text-slate-ink hover:text-indigo-deep cursor-pointer" aria-label="Close">
              esc ✕
            </button>
          </div>
          <div className="p-5">
            <p className="caps text-slate-ink">
              {isVi ? "Các tham số đang áp dụng" : "Parameters in effect"}
            </p>
            <dl className="mt-3 grid gap-x-6 border-y border-slate-hair py-3 sm:grid-cols-2">
              {params.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 py-1">
                  <dt className="caps text-slate-ink">{k}</dt>
                  <dd className="num text-[0.85rem] text-indigo-deep">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="caps mt-5 text-slate-ink">APA 7th Edition</p>
            <p className="mt-2 rounded-sm bg-paper-tint p-3 font-mono text-[0.78rem] leading-relaxed text-indigo-soft select-all">
              {citation}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(citation).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="caps rounded-sm bg-indigo-deep px-4 py-2.5 text-paper transition-colors hover:bg-indigo-mid cursor-pointer"
              >
                {copied ? (isVi ? "đã sao chép ✓" : "copied ✓") : (isVi ? "sao chép trích dẫn" : "copy citation")}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="caps rounded-sm border border-slate-hair px-4 py-2.5 text-indigo-soft transition-colors hover:border-indigo-deep hover:text-indigo-deep cursor-pointer"
              >
                {isVi ? "đóng" : "close"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Row({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
