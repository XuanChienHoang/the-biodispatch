"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="lw-g" x1="8" y1="44" x2="40" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F2FE" />
          <stop offset="0.55" stopColor="#10B981" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* hexagonal flask bezel */}
      <path
        d="M24 2.6 42.8 13.3v21.4L24 45.4 5.2 34.7V13.3Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="none"
      />
      {/* liquid meniscus */}
      <path
        d="M11.4 31.2c3.1-3.4 5.6 2.4 8.7-.4 3.1-2.8 5.4 2.1 8.4-.6 3-2.7 5.6 2.3 8.1-.5v9.1L24 45.4 11.4 37.6Z"
        fill="url(#lw-g)"
        opacity="0.9"
      />
      {/* rising trace */}
      <path
        d="M14 27.5c3.4 0 3.9-9.6 7.2-9.6 3.3 0 3.1 6.9 6.4 6.9 2.4 0 3.4-4.6 5.4-8.6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="14" cy="27.5" r="2.4" fill="#00F2FE" />
    </svg>
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
        <Link href="/" aria-label="The BioDispatch home" className="flex items-center gap-2 text-indigo-deep font-display font-bold">
          <Wordmark size={24} />
          <span className="text-sm tracking-tight">The BioDispatch</span>
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
          <Link href="/" aria-label="The BioDispatch home" className="text-indigo-deep">
            <Wordmark size={30} />
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
