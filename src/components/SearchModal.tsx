"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Clock, FlaskConical } from "lucide-react";
import type { Article } from "@/lib/content";
import { useLanguageStore } from "@/lib/i18n";
import { dedupeForLang, formatDate, ORGAN_ACCENT, ORGAN_VI } from "@/lib/home";

export function SearchModal({
  articles,
  isOpen,
  onClose,
}: {
  articles: Article[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const pool = dedupeForLang(articles, lang);

  // Focus input khi mở modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Phím tắt ESC để đóng
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const results = query.trim()
    ? pool.filter((a) => {
        const q = query.toLowerCase();
        const title = (isVi && a.titleVi ? a.titleVi : a.title).toLowerCase();
        const dek = (isVi && a.dekVi ? a.dekVi : a.dek).toLowerCase();
        const organ = (isVi ? ORGAN_VI[a.organ] : a.organ).toLowerCase();
        const tags = (a as any).tags ? (a as any).tags.join(" ").toLowerCase() : "";
        return title.includes(q) || dek.includes(q) || organ.includes(q) || tags.includes(q);
      })
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-indigo-deep/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-md border border-slate-hair bg-paper shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-hair px-4 py-3.5 sm:px-5">
          <Search className="h-5 w-5 text-slate-ink shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isVi
                ? "Tìm kiếm bài viết, hoạt chất, cơ chế phân tử (vd: mỡ nâu, UCP1, curcumin, Statin...)..."
                : "Search dispatches, molecules, mechanisms (e.g. BAT, UCP1, curcumin, statins...)..."
            }
            className="flex-1 bg-transparent text-sm sm:text-base font-sans text-indigo-deep placeholder:text-slate-mute focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-mute hover:text-indigo-deep p-1 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border border-slate-hair bg-paper-tint px-2 py-1 text-[11px] font-mono text-slate-ink hover:text-indigo-deep cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-slate-ink">
              <Search className="mx-auto h-8 w-8 text-slate-mute mb-2 opacity-50" />
              <p className="text-sm font-medium">
                {isVi ? "Nhập từ khóa để tra cứu kho dữ liệu y sinh" : "Enter keywords to query biomedical corpus"}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["UCP1", "Curcumin", "Mỡ nâu", "Statin", "NAD+", "Glymphatic", "hs-CRP"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setQuery(k)}
                    className="caps rounded-full border border-slate-hair bg-paper-tint px-2.5 py-1 text-xs text-slate-ink hover:border-indigo-deep hover:text-indigo-deep cursor-pointer"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-ink">
              <p className="text-base font-medium">
                {isVi ? `Không tìm thấy kết quả cho "${query}"` : `No dispatches found for "${query}"`}
              </p>
              <p className="mt-1 text-xs text-slate-mute">
                {isVi
                  ? "Hãy thử tìm bằng từ khóa chung hơn như: tim mạch, chuyển hóa, ty thể, dược động..."
                  : "Try searching broader terms like: metabolic, lipids, mitochondria, pharmacokinetic..."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="caps text-xs text-slate-mute pb-1">
                {isVi ? `Tìm thấy ${results.length} bài viết` : `Found ${results.length} results`}
              </div>
              {results.map((a) => {
                const title = isVi && a.titleVi ? a.titleVi : a.title;
                const dek = isVi && a.dekVi ? a.dekVi : a.dek;
                const accent = ORGAN_ACCENT[a.organ];

                return (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    onClick={onClose}
                    className="group block rounded-sm border border-slate-hair bg-paper p-3.5 transition-all hover:border-indigo-deep hover:bg-paper-tint"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="caps inline-flex items-center gap-1.5 text-xs font-semibold text-slate-ink">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                        {isVi ? ORGAN_VI[a.organ] : a.organ} · {a.tier}
                      </span>
                      {a.gizmo && (
                        <span className="caps inline-flex items-center gap-1 text-[11px] font-bold text-trace-ink">
                          <FlaskConical size={11} /> Gizmo
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1 font-display text-sm sm:text-base font-semibold text-indigo-deep group-hover:text-trace-ink transition-colors leading-snug">
                      {title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-ink line-clamp-2 leading-relaxed">
                      {dek}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-hair/60 pt-2 text-[11px] text-slate-mute">
                      <span>{formatDate(a.date, lang)}</span>
                      <span className="caps flex items-center gap-1 font-semibold text-indigo-deep group-hover:translate-x-0.5 transition-transform">
                        {isVi ? "Đọc bài" : "Read"} <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
