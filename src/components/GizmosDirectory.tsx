"use client";

import Link from "next/link";
import { GIZMOS } from "@/lib/content";
import { onPaper } from "@/lib/tones";
import { useLanguageStore } from "@/lib/i18n";

const ENGINE_ART: Record<string, React.ReactNode> = {
  pk: (
    <g>
      <path
        d="M4 78 C 30 78, 34 16, 62 16 C 90 16, 96 54, 132 54 C 160 54, 164 78, 196 78"
        fill="none"
        stroke="#00F2FE"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M4 78 C 40 78, 60 62, 100 62 C 140 62, 160 78, 196 78"
        fill="none"
        stroke="#64748B"
        strokeWidth="1.4"
        strokeDasharray="5 5"
      />
    </g>
  ),
  pathway: (
    <g>
      <circle cx="24" cy="46" r="10" fill="none" stroke="#10B981" strokeWidth="1.8" />
      <rect x="70" y="22" width="22" height="52" rx="3" fill="none" stroke="#10B981" strokeWidth="1.8" />
      <path d="M36 46 H66" stroke="#10B981" strokeWidth="1.6" strokeDasharray="6 5" />
      <ellipse cx="164" cy="46" rx="30" ry="24" fill="none" stroke="#10B981" strokeWidth="1.6" strokeDasharray="5 4" />
      <path d="M96 46 H128" stroke="#10B981" strokeWidth="1.6" strokeDasharray="6 5" />
      <rect x="128" y="34" width="24" height="24" rx="2" fill="none" stroke="#10B981" strokeWidth="1.4" />
    </g>
  ),
  synergy: (
    <g>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const cols = ["#10B981", "#00F2FE", "#64748B", "#FF6B4A"];
          const col = r === c ? "rgba(148,163,184,0.2)" : cols[(r * 3 + c * 5) % 4];
          return (
            <rect
              key={`${r}${c}`}
              x={40 + c * 25}
              y={12 + r * 15}
              width="21"
              height="12"
              rx="1.5"
              fill={col}
              opacity={r === c ? 1 : 0.62}
            />
          );
        })
      )}
    </g>
  ),
  biomarker: (
    <g>
      <line x1="10" y1="46" x2="196" y2="46" stroke="#475569" strokeWidth="1.4" />
      <line x1="60" y1="46" x2="60" y2="14" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 4" />
      <line x1="92" y1="46" x2="164" y2="46" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <line x1="92" y1="34" x2="92" y2="58" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="164" y1="34" x2="164" y2="58" stroke="#F59E0B" strokeWidth="2.5" />
      <circle cx="128" cy="46" r="8" fill="#08121F" stroke="#00F2FE" strokeWidth="3" />
      <text x="60" y="10" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">
        BASE
      </text>
    </g>
  ),
  tmao: (
    <g>
      <circle cx="34" cy="46" r="14" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
      <path d="M48 46 H76" stroke="#F59E0B" strokeWidth="1.6" strokeDasharray="4 3" />
      <polygon points="80,46 72,42 72,50" fill="#F59E0B" />
      <circle cx="98" cy="46" r="18" fill="none" stroke="#10B981" strokeWidth="1.8" />
      <path d="M116 46 H144" stroke="#EF4444" strokeWidth="1.6" strokeDasharray="4 3" />
      <polygon points="148,46 140,42 140,50" fill="#EF4444" />
      <circle cx="168" cy="46" r="15" fill="#450A0A" stroke="#DC2626" strokeWidth="2.2" />
      <circle cx="168" cy="46" r="8" fill="#DC2626" />
    </g>
  ),
};

export function GizmosDirectory() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-20">
      <nav className="caps flex items-center gap-2 text-slate-ink">
        <Link href="/" className="hover:text-indigo-deep">
          {isVi ? "Trang chủ" : "Hub"}
        </Link>
        <span>/</span>
        <span className="text-indigo-deep">{isVi ? "Danh mục Mô phỏng" : "Simulation index"}</span>
      </nav>

      <div className="mt-8 grid gap-8 border-b-2 border-indigo-deep pb-7 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <span className="caps text-slate-ink">
            {isVi ? "§ 2 · Phòng Thí nghiệm Dược học" : "§ 2 · The lab"}
          </span>
          <h1 className="mt-3 font-display display-xl font-black leading-[0.9] tracking-[-0.04em] text-indigo-deep">
            {isVi ? (
              <>
                Năm công cụ,
                <br />
                một bàn làm việc.
              </>
            ) : (
              <>
                Five instruments,
                <br />
                one workbench.
              </>
            )}
          </h1>
        </div>
        <p className="text-[1rem] leading-relaxed text-slate-ink lg:pb-2">
          {isVi
            ? "Mỗi công cụ chạy độc lập hoàn toàn trên trình duyệt: không gửi dữ liệu ra máy chủ ngoài, tùy ý thay đổi liều lượng, xuất dữ liệu CSV và mô hình hóa chính xác các cơ chế dược động học."
            : "Each engine is a self-contained client island: no network calls, no storage, no telemetry. Open one, break it, export the CSV, cite the model — and know exactly which assumption you were leaning on."}
        </p>
      </div>

      <div className="mt-10 space-y-px bg-slate-hair">
        {GIZMOS.map((g) => (
          <Link
            key={g.slug}
            href={`/gizmos/${g.slug}`}
            className="group grid items-stretch gap-0 bg-paper transition-colors duration-300 hover:bg-paper-tint md:grid-cols-[92px_minmax(0,1fr)_auto]"
          >
            <div className="flex items-center justify-center border-b border-slate-hair py-5 md:border-b-0 md:border-r">
              <span
                className="num text-step-2 leading-none font-medium transition-colors"
                style={{ color: onPaper(g.color) }}
              >
                {g.index}
              </span>
            </div>

            <div className="flex flex-col gap-4 border-b border-slate-hair p-6 md:flex-row md:items-center md:gap-8">
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-step-1 font-semibold leading-tight tracking-[-0.02em] text-indigo-deep">
                  {isVi && g.nameVi ? g.nameVi : g.name}
                </h2>
                <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-slate-ink">
                  {isVi && g.blurbVi ? g.blurbVi : g.blurb}
                </p>
              </div>
              <ul className="shrink-0 space-y-1 md:w-52">
                {(isVi && (g as any).inputsVi ? (g as any).inputsVi : g.inputs).map((i: string) => (
                  <li key={i} className="caps text-slate-ink">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="graticule flex items-center justify-between gap-4 bg-instrument px-5 py-4 md:flex-col md:justify-center md:px-7">
              <svg width="200" height="92" viewBox="0 0 200 92" fill="none" className="max-w-full">
                <line x1="0" y1="84" x2="200" y2="84" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
                {ENGINE_ART[g.slug]}
              </svg>
              <span
                className="caps shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: g.color }}
              >
                {isVi ? "mô phỏng →" : "run →"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Simulation Roadmap */}
      <div className="mt-14 rounded-sm border border-slate-hair bg-paper-tint p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-hair pb-4">
          <div>
            <span className="caps text-trace-ink font-semibold">
              {isVi ? "§ Lộ trình Mở rộng Phòng Thí nghiệm" : "§ Future Engine Roadmap"}
            </span>
            <h3 className="mt-1 font-display text-[1.4rem] font-bold text-indigo-deep">
              {isVi ? "Các Mô hình Mô phỏng Chuyên sâu Đang Chuẩn bị" : "Advanced Engines Under Development"}
            </h3>
          </div>
          <span className="caps rounded-sm bg-indigo-deep px-3 py-1 text-xs text-trace font-mono">
            {isVi ? "Kế hoạch Triển khai Tiếp theo" : "Next Phase Roadmap"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          {[
            {
              id: "06",
              titleVi: "Lên men Tinh bột kháng & SCFA",
              titleEn: "Resistant Starch → SCFA Synthesis",
              descVi: "Sinh tổng hợp Butyrate đường ruột, hạ pH đại tràng và hàn gắn hàng rào niêm mạc ruột (Tight Junctions).",
              descEn: "Colonic fermentation, butyrate yield, HDAC inhibition, and Claudin-1 tight junction integrity.",
            },
            {
              id: "07",
              titleVi: "Ngã ba Mevalonate: Statin & CoQ10",
              titleEn: "Mevalonate Shunt: Statin vs CoQ10",
              descVi: "Mô hình hóa sự suy giảm CoQ10 ở ty thể cơ vân khi dùng thuốc Statin và cơ chế giảm đau mỏi cơ.",
              descEn: "HMG-CoA reductase suppression, mitochondrial CoQ10 depletion, and myopathy risk profiling.",
            },
            {
              id: "08",
              titleVi: "Cửa sổ Thủy phân Sulforaphane",
              titleEn: "Sulforaphane Myrosinase Kinetics",
              descVi: "Nhiệt động học enzyme Myrosinase trong bông cải xanh, bảo toàn hoạt chất kích hoạt con đường Nrf2.",
              descEn: "Thermal inactivation threshold, glucoraphanin hydrolysis, and Nrf2 phase II detoxification.",
            },
            {
              id: "09",
              titleVi: "Căn chỉnh Nhịp Sinh học & Melatonin",
              titleEn: "Circadian Phase & Melatonin PRC",
              descVi: "Đáp ứng pha của ánh sáng xanh và nồng độ Melatonin, tối ưu nhạy cảm Insulin và chu kỳ thức ngủ.",
              descEn: "Phase Response Curve to 480nm light, pineal melatonin window, and core temperature rhythm.",
            },
            {
              id: "10",
              titleVi: "Bộ đếm Hạt mỡ xơ vữa ApoB vs LDL-C",
              titleEn: "ApoB Particle Count Discordance",
              descVi: "Phát hiện điểm mù tim mạch do hạt mỡ nhỏ đặc (sdLDL) ở người kháng insulin và gan nhiễm mỡ.",
              descEn: "Atherogenic particle density vs cholesterol mass discordance in insulin-resistant phenotypes.",
            },
            {
              id: "11",
              titleVi: "Phức hợp EGCG & Chelate Sắt",
              titleEn: "EGCG Iron Chelation Kinetics",
              descVi: "Mô phỏng động học tạo phức không tan giữa polyphenol trà xanh và ion sắt, tối ưu cửa sổ hấp thu.",
              descEn: "Gastric chelation kinetics, non-haem iron absorption suppression, and timing windows.",
            },
          ].map((m) => (
            <div key={m.id} className="rounded-sm border border-slate-hair bg-paper p-4">
              <div className="flex items-center justify-between text-slate-ink">
                <span className="font-mono font-bold text-trace-ink">{m.id}</span>
                <span className="caps text-[0.65rem]">{isVi ? "đang chuẩn hóa" : "in development"}</span>
              </div>
              <h4 className="mt-2 font-display text-[0.95rem] font-bold text-indigo-deep">
                {isVi ? m.titleVi : m.titleEn}
              </h4>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-indigo-soft">
                {isVi ? m.descVi : m.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
