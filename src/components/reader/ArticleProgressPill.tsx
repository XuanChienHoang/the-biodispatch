"use client";

import { useEffect, useState } from "react";
import { Zap, Stethoscope, Quote, ArrowUp, Share2, Check } from "lucide-react";

interface ArticleProgressPillProps {
  isVi: boolean;
  hasBrief?: boolean;
  hasPractical?: boolean;
  hasRefs?: boolean;
  title: string;
}

/**
 * Thanh tiến trình đọc nổi cho thiết bị di động (Mobile Floating Navigation Pill).
 * Hiển thị thanh tiến trình % đọc bài và các nút nhảy nhanh (Đọc nhanh, Thực hành, Y văn, Lên đầu trang).
 */
export function ArticleProgressPill({
  isVi,
  hasBrief,
  hasPractical,
  hasRefs,
  title,
}: ArticleProgressPillProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setProgress(currentProgress);
        // Hiện pill sau khi cuộn qua 250px
        setIsVisible(window.scrollY > 250);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label={isVi ? "Thanh điều hướng đọc bài" : "Reading navigation pill"}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md transition-all duration-300 md:hidden"
    >
      <div className="relative overflow-hidden rounded-full border border-indigo-deep/20 bg-indigo-deep/95 p-1.5 text-white shadow-2xl backdrop-blur-md">
        {/* Progress bar background fill */}
        <div
          className="absolute inset-0 bg-teal-500/15 pointer-events-none transition-all duration-150"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center justify-between gap-1 text-xs">
          {/* Progress Indicator */}
          <div className="flex items-center gap-1.5 pl-3 pr-2 py-1">
            <span className="font-mono text-[11px] font-bold text-trace">
              {progress}%
            </span>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex items-center gap-1">
            {hasBrief && (
              <button
                type="button"
                onClick={() => scrollToSection("doc-nhanh")}
                className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-white/20 active:scale-95 transition-all"
                title={isVi ? "Nhảy đến Đọc nhanh 60s" : "Jump to 60s Brief"}
              >
                <Zap size={12} className="text-trace" />
                <span>{isVi ? "60s" : "Brief"}</span>
              </button>
            )}

            {hasPractical && (
              <button
                type="button"
                onClick={() => scrollToSection("ap-dung-thuc-te")}
                className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-white/20 active:scale-95 transition-all"
                title={isVi ? "Nhảy đến Thực hành & An toàn" : "Jump to Practical Guide"}
              >
                <Stethoscope size={12} className="text-emerald-400" />
                <span>{isVi ? "Thực hành" : "Action"}</span>
              </button>
            )}

            {hasRefs && (
              <button
                type="button"
                onClick={() => scrollToSection("references")}
                className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-white/20 active:scale-95 transition-all"
                title={isVi ? "Nhảy đến Nguồn tham khảo PubMed" : "Jump to References"}
              >
                <Quote size={12} className="text-amber-400" />
                <span>{isVi ? "Nguồn" : "Refs"}</span>
              </button>
            )}
          </div>

          {/* Share & Scroll to Top */}
          <div className="flex items-center gap-1 pr-1 border-l border-white/15 pl-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all"
              title={isVi ? "Chia sẻ bài viết" : "Share dispatch"}
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
            </button>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all"
              title={isVi ? "Lên đầu trang" : "Back to top"}
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
