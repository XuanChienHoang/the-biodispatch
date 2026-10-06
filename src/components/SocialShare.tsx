"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface SocialShareProps {
  title: string;
  url: string;
  isVi?: boolean;
}

export function SocialShare({ title, url, isVi = true }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-sm border border-slate-hair bg-paper-tint/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Share2 size={15} className="text-trace-ink" />
          <span className="caps text-[0.72rem] font-semibold text-slate-ink">
            {isVi ? "Chia sẻ bài phân tích này" : "Share this Dispatch"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chia sẻ lên LinkedIn"
            className="flex h-8 items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 text-xs text-indigo-deep transition-all duration-200 hover:border-[#0A66C2]/40 hover:text-[#0A66C2] hover:bg-paper-tint"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span className="hidden sm:inline font-mono text-[0.7rem]">LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chia sẻ lên Facebook"
            className="flex h-8 items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 text-xs text-indigo-deep transition-all duration-200 hover:border-[#1877F2]/40 hover:text-[#1877F2] hover:bg-paper-tint"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="hidden sm:inline font-mono text-[0.7rem]">Facebook</span>
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chia sẻ lên X"
            className="flex h-8 items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 text-xs text-indigo-deep transition-all duration-200 hover:border-slate-800 hover:text-black hover:bg-paper-tint"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="hidden sm:inline font-mono text-[0.7rem]">X</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopy}
            title={isVi ? "Sao chép liên kết" : "Copy article URL"}
            className="flex h-8 items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 text-xs text-indigo-deep transition-all duration-200 hover:border-trace-ink hover:bg-paper-tint"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="font-mono text-[0.7rem] text-emerald-600 font-semibold">
                  {isVi ? "Đã sao chép!" : "Copied!"}
                </span>
              </>
            ) : (
              <>
                <Link2 size={13} />
                <span className="hidden sm:inline font-mono text-[0.7rem]">
                  {isVi ? "Sao chép link" : "Copy link"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
