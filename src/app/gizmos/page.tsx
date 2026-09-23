import Link from "next/link";
import type { Metadata } from "next";
import { GIZMOS } from "@/lib/content";
import { onPaper } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Simulation Index",
  description:
    "Four interactive biomedical engines: pharmacokinetics, molecular pathway, synergy matrix and biomarker forecasting.",
};

const ENGINE_ART: Record<string, React.ReactNode> = {
  pk: (
    <g>
      <path d="M4 78 C 30 78, 34 16, 62 16 C 90 16, 96 54, 132 54 C 160 54, 164 78, 196 78" fill="none" stroke="#00F2FE" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 78 C 40 78, 60 62, 100 62 C 140 62, 160 78, 196 78" fill="none" stroke="#64748B" strokeWidth="1.4" strokeDasharray="5 5" />
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
          return <rect key={`${r}${c}`} x={40 + c * 25} y={12 + r * 15} width="21" height="12" rx="1.5" fill={col} opacity={r === c ? 1 : 0.62} />;
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
      <text x="60" y="10" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">BASE</text>
    </g>
  ),
};

export default function GizmosIndex() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-20">
        <nav className="caps flex items-center gap-2 text-slate-ink">
          <Link href="/" className="hover:text-indigo-deep">Hub</Link>
          <span>/</span>
          <span className="text-indigo-deep">Simulation index</span>
        </nav>

        <div className="mt-8 grid gap-8 border-b-2 border-indigo-deep pb-7 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="caps text-slate-ink">§ 2 · The lab</span>
            <h1 className="mt-3 font-display display-xl font-black leading-[0.9] tracking-[-0.04em] text-indigo-deep">
              Four instruments,
              <br />
              one workbench.
            </h1>
          </div>
          <p className="text-[1rem] leading-relaxed text-slate-ink lg:pb-2">
            Each engine is a self-contained client island: no network calls, no storage, no
            telemetry. Open one, break it, export the CSV, cite the model — and know exactly which
            assumption you were leaning on.
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
                <span className="num text-step-2 leading-none font-medium transition-colors" style={{ color: onPaper(g.color) }}>
                  {g.index}
                </span>
              </div>

              <div className="flex flex-col gap-4 border-b border-slate-hair p-6 md:flex-row md:items-center md:gap-8">
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-step-1 font-semibold leading-tight tracking-[-0.02em] text-indigo-deep">
                    {g.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-slate-ink">{g.blurb}</p>
                </div>
                <ul className="shrink-0 space-y-1 md:w-52">
                  {g.inputs.map((i) => (
                    <li key={i} className="caps text-slate-ink">{i}</li>
                  ))}
                </ul>
              </div>

              <div className="graticule flex items-center justify-between gap-4 bg-instrument px-5 py-4 md:flex-col md:justify-center md:px-7">
                <svg width="200" height="92" viewBox="0 0 200 92" fill="none" className="max-w-full">
                  <line x1="0" y1="84" x2="200" y2="84" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
                  {ENGINE_ART[g.slug]}
                </svg>
                <span className="caps shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: g.color }}>
                  run →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
