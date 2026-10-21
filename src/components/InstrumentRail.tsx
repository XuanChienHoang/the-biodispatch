"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/i18n";
import { resolveTwin } from "@/lib/twin-catalog";

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

const NAV = [
  { href: "/", label: "Front", labelVi: "Trang chủ" },
  { href: "/#directory", label: "Corpus", labelVi: "Kho bài" },
  { href: "/gizmos", label: "Gizmos", labelVi: "Mô phỏng" },
  { href: "/about", label: "Author", labelVi: "Tác giả" },
];

export function InstrumentRail() {
  const path = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLanguageStore();

  const handleLanguageSwitch = (targetLang?: "vi" | "en") => {
    const nextLang = targetLang || (lang === "vi" ? "en" : "vi");
    setLang(nextLang);

    // If currently inside an article, immediately navigate to its twin translation
    if (path && path.startsWith("/blog/")) {
      const currentSlug = path.replace(/^\/blog\//, "").split("/")[0].split("?")[0].split("#")[0];
      if (currentSlug) {
        const twin = resolveTwin(currentSlug);
        if (twin && twin.slug && twin.slug !== currentSlug) {
          router.push(`/blog/${twin.slug}`);
          return;
        }
      }
    }
  };

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
          
          {/* Mobile Dual Language Switcher */}
          <div className="inline-flex items-center rounded-full border border-slate-hair bg-paper-tint p-0.5 text-xs font-mono font-bold shadow-2xs">
            <button
              type="button"
              onClick={() => handleLanguageSwitch("vi")}
              aria-label="Tiếng Việt"
              className={`rounded-full px-2 py-0.5 transition-all cursor-pointer ${
                lang === "vi"
                  ? "bg-indigo-deep text-white shadow-xs"
                  : "text-slate-ink hover:text-indigo-deep"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => handleLanguageSwitch("en")}
              aria-label="English"
              className={`rounded-full px-2 py-0.5 transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-indigo-deep text-white shadow-xs"
                  : "text-slate-ink hover:text-indigo-deep"
              }`}
            >
              EN
            </button>
          </div>
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

          {/* Desktop Dual Language Switcher */}
          <div className="flex flex-col items-center rounded-full border border-slate-hair bg-paper-tint p-1 text-[11px] font-mono font-bold shadow-2xs gap-1">
            <button
              type="button"
              onClick={() => handleLanguageSwitch("vi")}
              title="Phiên bản Tiếng Việt"
              className={`h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                lang === "vi"
                  ? "bg-indigo-deep text-white shadow-xs font-black"
                  : "text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/50"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => handleLanguageSwitch("en")}
              title="English Edition"
              className={`h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-indigo-deep text-white shadow-xs font-black"
                  : "text-slate-ink hover:text-indigo-deep hover:bg-slate-hair/50"
              }`}
            >
              EN
            </button>
          </div>

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
