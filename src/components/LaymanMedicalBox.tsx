"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import type { LaymanMedicalBoxData } from "@/lib/medical-analogies";

interface LaymanMedicalBoxProps {
  data: LaymanMedicalBoxData;
}

export function LaymanMedicalBox({ data }: LaymanMedicalBoxProps) {
  const [showAnalogy, setShowAnalogy] = useState(true);

  if (!data || !data.points || data.points.length === 0) {
    return null;
  }

  return (
    <div className="rounded-sm border-2 border-emerald-500/40 bg-emerald-500/5 p-4 sm:p-5 transition-all">
      <button
        type="button"
        onClick={() => setShowAnalogy(!showAnalogy)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
            <BookOpen size={14} />
          </span>
          <div>
            <h4 className="font-display text-[0.98rem] font-bold text-indigo-deep">
              {data.title}
            </h4>
            <p className="text-[0.76rem] text-slate-ink">{data.hook}</p>
          </div>
        </div>
        <span className="caps text-emerald-700 flex items-center gap-1 text-xs font-semibold">
          {showAnalogy ? (
            <>
              Thu gọn <ChevronUp size={14} />
            </>
          ) : (
            <>
              Mở rộng xem giải thích <ChevronDown size={14} />
            </>
          )}
        </span>
      </button>

      {showAnalogy && (
        <div className="mt-4 grid gap-3 border-t border-emerald-500/20 pt-4 sm:grid-cols-3">
          {data.points.map((pt, idx) => (
            <div
              key={idx}
              className="rounded-sm border border-emerald-500/20 bg-paper p-3.5 shadow-2xs"
            >
              <span className="num font-mono text-[0.72rem] font-bold text-emerald-600 block">
                0{idx + 1} · {pt.layTerm}
              </span>
              <h5 className="font-display text-[0.88rem] font-bold text-indigo-deep mt-1">
                {pt.term}
              </h5>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
                {pt.analogy}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
