"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/images/phytocodex-emblem.jpg"
      alt="Phytocodex emblem"
      width={size}
      height={size}
      className="rounded-full shrink-0 object-cover border border-amber-500/40 shadow-xs ring-1 ring-amber-400/20"
      priority
    />
  );
}

import { useLanguageStore } from "@/lib/i18n";

const NAV = [
  { href: "/", label: "Front", labelVi: "Trang chủ" },
  { href: "/#directory", label: "Corpus", labelVi: "Kho bài" },
  { href: "/gizmos", label: "Gizmos", labelVi: "Mô phỏng" },
  { href: "/about", label: "Author", labelVi: "Tác giả" },
];

export function InstrumentRail() {
  const path = usePathname();
  const { lang, toggleLang } = useLanguageStore();

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-slate-hair bg-paper/95 px-4 backdrop-blur md:hidden">
        <Link href="/" aria-label="Phytocodex home" className="flex items-center gap-2 text-indigo-deep font-display font-bold">
          <Wordmark size={26} />
          <span className="text-base font-black tracking-tight font-display text-indigo-deep">Phytocodex</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3 text-xs caps">
            <Link href="/#directory" className="text-slate-ink hover:text-indigo-deep">
              {lang === "vi" ? "Kho bài" : "Corpus"}
            </Link>
            <Link href="/gizmos" className="text-slate-ink hover:text-indigo-deep">
              {lang === "vi" ? "Mô phỏng" : "Gizmos"}
            </Link>
            <Link href="/about" className="text-slate-ink hover:text-indigo-deep">
              {lang === "vi" ? "Tác giả" : "Author"}
            </Link>
          </nav>
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="rounded-full border border-slate-hair bg-paper-tint px-2.5 py-1 text-xs font-mono font-bold text-indigo-deep shadow-2xs hover:border-indigo-deep cursor-pointer"
          >
            {lang === "vi" ? "🇻🇳 VI" : "🇬🇧 EN"}
          </button>
        </div>
      </header>

      {/* Desktop Fixed Left Instrument Rail */}
      <aside
        className="fixed left-0 top-0 z-50 hidden h-screen w-[72px] flex-col items-center justify-between border-r border-slate-hair bg-paper py-6 md:flex"
        aria-label="Instrument rail"
      >
        <div className="flex flex-col items-center gap-6">
          <Link href="/" aria-label="Phytocodex home" className="text-indigo-deep transition-transform hover:scale-105">
            <Wordmark size={36} />
          </Link>

          {/* Rail Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLang}
            title={lang === "vi" ? "Chuyển sang English" : "Chuyển sang Tiếng Việt"}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-hair bg-paper-tint text-[11px] font-mono font-bold text-indigo-deep shadow-2xs transition-all hover:scale-105 hover:border-indigo-deep hover:bg-indigo-deep hover:text-trace cursor-pointer"
          >
            {lang === "vi" ? "VI" : "EN"}
          </button>

          <nav className="flex flex-col items-center gap-6 mt-2">
            {NAV.map((n) => {
              const active = path === n.href;
              const label = lang === "vi" ? n.labelVi : n.label;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="group relative flex items-center"
                  aria-label={label}
                >
                  <span
                    className={`caps [writing-mode:vertical-rl] transition-colors duration-200 ${
                      active ? "text-indigo-deep font-bold" : "text-slate-ink group-hover:text-indigo-deep"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`absolute -left-[14px] top-1/2 h-6 w-[2px] -translate-y-1/2 transition-all duration-300 ${
                      active ? "bg-trace opacity-100" : "bg-indigo-deep opacity-0 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-px bg-slate-hair" />
          <span
            className="caps text-slate-ink [writing-mode:vertical-rl]"
            style={{ letterSpacing: "0.3em" }}
          >
            DR HOANG
          </span>
          <span className="num rounded-sm bg-indigo-deep px-1.5 py-1 text-[9px] font-medium tracking-tight text-trace">
            Q1
          </span>
          <motion.span
            aria-hidden
            className="block h-2 w-2 rounded-full bg-syn"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="caps text-slate-ink [writing-mode:vertical-rl]">EVIDENCE</span>
        </div>
      </aside>
    </>
  );
}
