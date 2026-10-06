"use client";

import React from "react";
import { ArrowRight, ArrowDown, Activity, Network } from "lucide-react";

interface PathwayFlowchartProps {
  rawText: string;
  isVi?: boolean;
}

export function PathwayFlowchart({ rawText, isVi = true }: PathwayFlowchartProps) {
  // Check if this is a 2D ASCII tree diagram with vertical lines or branch corners
  const is2DTree =
    rawText.includes("│") ||
    rawText.includes("┌") ||
    rawText.includes("└") ||
    rawText.includes("├") ||
    rawText.includes("┼") ||
    rawText.includes("▼");

  if (is2DTree) {
    return (
      <div className="my-8 rounded-lg border border-cyan-500/30 bg-[#070D18] p-4 sm:p-5 shadow-xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Network size={14} className="text-cyan-400" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-cyan-400 font-semibold">
              {isVi ? "Sơ đồ Phân nhánh 2D" : "2D Pathway Architecture"}
            </span>
          </div>
          <span className="font-mono text-[0.65rem] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            {isVi ? "Cuộn ngang để xem đầy đủ" : "Scroll horizontally to inspect"}
          </span>
        </div>
        <pre className="!my-0 !border-0 !bg-transparent !p-0 !shadow-none overflow-x-auto font-mono text-[0.82rem] leading-relaxed text-cyan-300">
          <code>{rawText}</code>
        </pre>
      </div>
    );
  }

  // Linear pathway lines with arrows
  const arrowRegex = /──►|-->|->|→|=>/;
  const lines = rawText
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => arrowRegex.test(l));

  if (lines.length === 0) {
    return (
      <pre className="overflow-x-auto rounded border border-cyan-500/25 bg-[#070B11] p-4 font-mono text-sm text-cyan-300">
        <code>{rawText}</code>
      </pre>
    );
  }

  return (
    <div className="my-8 space-y-4">
      {lines.map((line, lineIdx) => {
        const steps = line
          .split(arrowRegex)
          .map((s) => s.replace(/\[/g, "").replace(/\]/g, "").trim())
          .filter(Boolean);

        return (
          <div
            key={lineIdx}
            className="rounded-lg border border-cyan-500/30 bg-[#070D18] p-4 sm:p-5 shadow-xl shadow-black/40 transition-all hover:border-cyan-400/50"
          >
            {/* Header banner */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <Activity size={14} className="text-cyan-400" />
                <span className="font-mono text-[0.72rem] uppercase tracking-widest text-cyan-400 font-semibold">
                  {lines.length > 1
                    ? isVi
                      ? `Đường truyền ${lineIdx + 1}: Chuỗi phản ứng`
                      : `Signal Chain ${lineIdx + 1}`
                    : isVi
                      ? "Sơ đồ Cơ chế Phân tử theo Giai đoạn"
                      : "Molecular Mechanism Pipeline"}
                </span>
              </div>
              <span className="font-mono text-[0.68rem] text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/80">
                {steps.length} {isVi ? "Giai đoạn" : "Phases"}
              </span>
            </div>

            {/* Steps Container: Stack on mobile, horizontal flow on md+ */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-2.5 sm:gap-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center flex-1">
                  {/* Step Card */}
                  <div className="w-full flex-1 rounded-md bg-[#0D1829] border border-slate-700/80 hover:border-cyan-400/60 hover:bg-[#101F35] transition-all p-3.5 flex flex-col justify-between shadow-sm min-h-[90px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[0.66rem] font-bold text-cyan-400 tracking-wider">
                        {isVi ? `GIAI ĐOẠN 0${idx + 1}` : `PHASE 0${idx + 1}`}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50"></span>
                    </div>
                    <p className="text-xs sm:text-[0.85rem] font-semibold text-slate-100 leading-snug">
                      {step}
                    </p>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="flex items-center justify-center py-1.5 md:py-0 md:px-2 text-cyan-400/80 shrink-0">
                      {/* Arrow down on mobile */}
                      <span className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-cyan-950/60 border border-cyan-800/50">
                        <ArrowDown size={13} className="text-cyan-400" />
                      </span>
                      {/* Arrow right on desktop */}
                      <span className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-cyan-950/60 border border-cyan-800/50">
                        <ArrowRight size={13} className="text-cyan-400" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
