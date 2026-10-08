"use client";

import { useEffect, useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isVi: boolean;
  variant?: "mobile" | "desktop" | "all";
}

function parseHeadings(content: string): HeadingItem[] {
  if (!content) return [];
  const lines = content.split("\n");
  const found: HeadingItem[] = [];
  let h2Counter = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length; // 2 for ##, 3 for ###
      const text = match[2].replace(/[*_`]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u1EF9-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50) || `section-${++h2Counter}`;

      found.push({ id, text, level });
    }
  }
  return found;
}

export function TableOfContents({ content, isVi, variant = "all" }: TableOfContentsProps) {
  const headings = parseHeadings(content);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Track scroll position for active heading & reading progress
  useEffect(() => {
    const handleScroll = () => {
      // Reading Progress Calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Active Section Tracking
      if (headings.length === 0) return;
      
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPos = window.scrollY + 120;
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(el.id);
          return;
        }
      }
      if (headingElements.length > 0 && window.scrollY < 200) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length < 2) return null;

  const showMobile = variant === "mobile" || variant === "all";
  const showDesktop = variant === "desktop" || variant === "all";

  return (
    <>
      {/* Top Sticky Reading Progress Bar (Fixed across entire viewport) */}
      {showDesktop && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
          <div
            className="h-full bg-trace-ink transition-all duration-150 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Mobile Collapsible TOC Strip */}
      {showMobile && (
        <div className="lg:hidden mb-6 rounded-sm border border-slate-hair bg-paper-tint p-3 text-xs">
          <button
            type="button"
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex w-full items-center justify-between font-semibold text-indigo-deep cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <List size={14} className="text-trace-ink" />
              {isVi ? "Mục lục Báo cáo (Xem nhanh)" : "Table of Contents"}
            </span>
            {isOpenMobile ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isOpenMobile && (
            <ul className="mt-3 space-y-1.5 border-t border-slate-hair/60 pt-2.5">
              {headings.map((h) => (
                <li
                  key={h.id}
                  className={h.level === 3 ? "pl-3 text-[0.78rem]" : "font-medium"}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpenMobile(false)}
                    className={`block py-0.5 transition-colors ${
                      activeId === h.id
                        ? "text-trace-ink font-bold"
                        : "text-slate-ink hover:text-indigo-deep"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Desktop Sticky Sidebar TOC */}
      {showDesktop && (
        <div className="hidden lg:block space-y-2">
          <div className="flex items-center justify-between border-b border-slate-hair pb-2">
            <span className="caps text-slate-ink font-semibold flex items-center gap-1.5 text-[0.7rem]">
              <List size={12} className="text-trace-ink" />
              {isVi ? "Mục lục Cơ chế" : "Mechanisms Outline"}
            </span>
            <span className="font-mono text-[0.68rem] text-slate-ink">
              {Math.round(progress)}%
            </span>
          </div>

          <nav className="max-h-[50vh] overflow-y-auto pr-1 text-xs space-y-1.5 no-scrollbar">
            {headings.map((h) => {
              const isActive = activeId === h.id;
              return (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={`block rounded-xs py-1 transition-all ${
                    h.level === 3 ? "pl-3 text-[0.75rem]" : "font-medium"
                  } ${
                    isActive
                      ? "text-trace-ink font-bold pl-2 border-l-2 border-trace-ink bg-trace/10"
                      : "text-indigo-soft hover:text-indigo-deep hover:pl-1"
                  }`}
                >
                  <span className="line-clamp-2 leading-tight">{h.text}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
