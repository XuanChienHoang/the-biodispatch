"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { LabSlider, useCountUp, useExportPng, exportCsv, tick } from "@/components/ui";
import { curcuminPiperine } from "@/lib/pk";

const W = 760;
const H = 380;
const L = 62;
const R = 744;
const T = 22;
const B = 322;

export default function CurcuminPiperineGizmo() {
  const [piperine, setPiperine] = useState(0);
  const [dose, setDose] = useState(1000);

  const m = useMemo(() => curcuminPiperine(piperine, dose), [piperine, dose]);

  const yMax = useMemo(() => {
    const peak = Math.max(m.treatedStats.cmax, m.controlStats.cmax, 0.02) * 1.15;
    const mag = Math.pow(10, Math.floor(Math.log10(peak)));
    return Math.ceil(peak / (mag / 5)) * (mag / 5);
  }, [m.treatedStats.cmax, m.controlStats.cmax]);

  const x = (t: number) => L + (t / 24) * (R - L);
  const y = (c: number) => B - (Math.min(c, yMax) / yMax) * (B - T);

  const mkPath = (pts: { t: number; c: number }[]) => {
    let d = `M ${x(0).toFixed(2)} ${y(0).toFixed(2)}`;
    for (let i = 1; i < pts.length; i += 3) d += ` L ${x(pts[i].t).toFixed(2)} ${y(pts[i].c).toFixed(2)}`;
    return d;
  };

  const ctrlPath = mkPath(m.control);
  const trtPath = mkPath(m.treated);
  const trtArea = `${trtPath} L ${x(24).toFixed(2)} ${y(0).toFixed(2)} Z`;

  const on = piperine > 0;
  const fold = useCountUp(m.aucFold, 1);
  const aucOn = useCountUp(m.treatedStats.auc, 2);

  const exportPng = useExportPng();

  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1].map((f) => f * yMax);
  const xTicks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <BiomedicalGizmoContainer
      fig="Gizmo 01a"
      title="Curcumin × Piperine Bio-enhancement"
      subtitle="Phase II UGT1A1 inhibition model"
      canvas={
        <CurcuminPlot
          ctrlPath={ctrlPath}
          trtPath={trtPath}
          trtArea={trtArea}
          on={on}
          x={x}
          y={y}
          yTicks={yTicks}
          xTicks={xTicks}
          dose={dose}
          m={m}
        />
      }
      presets={[
        { id: "off", label: "Piperine 0 mg" },
        { id: "on", label: "Piperine 20 mg" },
        { id: "black", label: "Pepper + fat" },
      ]}
      activePreset={piperine === 0 ? "off" : piperine >= 20 ? "on" : ""}
      onPreset={(id) => {
        if (id === "off") setPiperine(0);
        if (id === "on") setPiperine(20);
        if (id === "black") { setPiperine(20); setDose(1500); }
      }}
      onReset={() => { setPiperine(0); setDose(1000); }}
      onExport={() => {
        exportPng("cp-chart", "curcumin-piperine");
        exportCsv(
          [["t_h", "auc_0mg", "auc_20mg"], ...m.control.filter((_: unknown, i: number) => i % 8 === 0).map((p: { t: number; c: number }, i: number) => [p.t.toFixed(2), p.c.toFixed(4), m.treated[i * 8].c.toFixed(4)])],
          "curcumin-piperine"
        );
      }}
      citeParams={[
        ["Curcumin dose", `${dose} mg`],
        ["Piperine dose", `${piperine} mg`],
        ["ke (treated)", `${m.keTreated.toFixed(3)} h⁻¹`],
        ["t½ (treated)", `${m.halfLife.toFixed(1)} h`],
        ["UGT1A1 suppression", `${m.ugtInhibition.toFixed(0)} %`],
        ["AUC fold", `${m.aucFold.toFixed(1)} ×`],
        ["Model", "first-order + UGT inhibition"],
      ]}
      controls={
        <div className="space-y-5">
          {/* --- THE SWITCH --- */}
          <div>
            <p className="caps mb-1.5 text-slate-ink">Bio-enhancer</p>
            <button
              type="button"
              onClick={() => {
                const next = on ? 0 : 20;
                setPiperine(next);
                tick(next ? 1800 : 700, 0.05);
              }}
              aria-pressed={on}
              className={`group flex w-full items-center justify-between rounded-sm border px-3 py-3 transition-all duration-300 ${
                on
                  ? "border-trace bg-trace/10 shadow-[0_0_22px_-6px_rgba(0,242,254,0.7)]"
                  : "border-slate-hair bg-paper hover:border-indigo-deep"
              }`}
            >
              <span className="flex flex-col items-start">
                <span className={`caps ${on ? "text-trace" : "text-slate-ink"}`}>
                  {on ? "engaged" : "bypass"}
                </span>
                <span className="num mt-0.5 text-[1.05rem] font-medium text-indigo-deep">
                  {piperine} mg piperine
                </span>
              </span>
              <span
                className={`relative h-7 w-12 rounded-full border transition-colors duration-300 ${
                  on ? "border-trace bg-trace/25" : "border-slate-hair bg-paper-rule"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 520, damping: 34 }}
                  className={`absolute top-[3px] h-5 w-5 rounded-full ${on ? "right-[3px] bg-trace" : "left-[3px] bg-slate-mute"}`}
                />
              </span>
            </button>
            <p className="mt-2 text-[0.73rem] leading-snug text-slate-ink">
              Piperine competitively inhibits intestinal &amp; hepatic UGT1A1, collapsing glucuronidation
              of curcuminoids.
            </p>
          </div>

          <LabSlider
            label="Curcumin dose"
            value={dose}
            min={250}
            max={2000}
            step={50}
            unit="mg"
            onChange={setDose}
          />

          <LabSlider
            label="Piperine dose"
            value={piperine}
            min={0}
            max={20}
            step={1}
            unit="mg"
            onChange={(v) => { setPiperine(v); tick(2400, 0.012); }}
            hint="UGT1A1 inhibition saturates at 20 mg"
          />

          <div className="border-t border-slate-hair pt-3">
            <p className="caps text-slate-ink">UGT1A1 suppression</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-rule">
              <motion.div
                className="h-full"
                style={{ background: on ? "#F59E0B" : "#94A3B8" }}
                animate={{ width: `${m.ugtInhibition}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="num mt-1.5 text-[0.78rem] text-indigo-soft">
              {m.ugtInhibition.toFixed(1)} % · glucuronide fraction {m.glucuronideFrac.toFixed(0)} %
            </p>
          </div>
        </div>
      }
      telemetry={[
        { key: "AUC fold-change", value: `${fold}`, unit: "×", tone: on ? "#00F2FE" : "#64748B" },
        { key: "AUC (piperine)", value: aucOn, unit: "µg·h/mL", tone: "#00F2FE" },
        { key: "t½ (treated)", value: m.halfLife.toFixed(1), unit: "h", tone: "#10B981" },
        { key: "Cmax ratio", value: (m.treatedStats.cmax / Math.max(m.controlStats.cmax, 1e-9)).toFixed(2), unit: "×", tone: "#F59E0B" },
      ]}
      insight={
        on ? (
          <>
            With 20 mg piperine co-administered, the elimination rate constant falls from{" "}
            <span className="num text-indigo-deep">0.128</span> to{" "}
            <span className="num text-trace">{m.keTreated.toFixed(3)} h⁻¹</span> and apparent
            bioavailability rises from 1.1 % to{" "}
            <span className="num text-trace">{(m.F * 100).toFixed(2)} %</span>. The curve does not get
            taller so much as <em>longer</em> — the terminal phase stretches because the glucuronide
            sink is saturated. This is the mechanistic account of the ~20-fold AUC rise reported by
            Shoba et&nbsp;al. (1998, n&nbsp;=&nbsp;8). AUC is area under the curve; here it is computed
            by trapezoidal integration over 0–24 h.
          </>
        ) : (
          <>
            Control state: free curcuminoids at {dose} mg, unmodified Phase&nbsp;II clearance. Curcumin
            is glucuronidated and sulfated within minutes, so the curve barely clears{" "}
            <span className="num text-indigo-deep">{m.controlStats.cmax.toFixed(3)} µg/mL</span> —
            essentially all of the dose is excreted before absorption finishes. Flip the bio-enhancer
            switch to inhibit UGT1A1 and watch the terminal phase stretch.
          </>
        )
      }
    />
  );
}

interface PlotProps {
  ctrlPath: string;
  trtPath: string;
  trtArea: string;
  on: boolean;
  x: (t: number) => number;
  y: (c: number) => number;
  yTicks: number[];
  xTicks: number[];
  dose: number;
  m: { controlStats: { cmax: number; tmax: number }; treatedStats: { cmax: number; tmax: number } };
}

function CurcuminPlot({ ctrlPath, trtPath, trtArea, on, x, y, yTicks, xTicks, dose, m }: PlotProps) {
  return (
    <svg
      id="cp-chart"
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={on ? "Serum curcumin curve with and without 20 mg piperine" : "Serum curcumin curve, control"}
    >
      <defs>
        <linearGradient id="cp-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cp-clip"><rect x={L} y={T - 6} width={R - L} height={B - T + 6} /></clipPath>
        <pattern id="hcp" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#F59E0B" strokeWidth="2.4" opacity="0.5" />
        </pattern>
      </defs>

      {yTicks.map((v, i) => (
        <g key={`y${i}`}>
          <line x1={L} y1={y(v)} x2={R} y2={y(v)} stroke="#94A3B8" strokeWidth="0.5" opacity={i === 0 ? 0.55 : 0.16} />
          <text x={L - 9} y={y(v) + 3.5} textAnchor="end" fill="#64748B" fontSize="10.5" fontFamily="var(--font-mono)">
            {v.toFixed(v < 1 ? 2 : 1)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line x1={x(t)} y1={B} x2={x(t)} y2={B + 6} stroke="#64748B" strokeWidth="1" />
          <text x={x(t)} y={B + 19} textAnchor="middle" fill="#64748B" fontSize="10.5" fontFamily="var(--font-mono)">
            {t}
          </text>
        </g>
      ))}
      <line x1={L} y1={T} x2={L} y2={B} stroke="#64748B" strokeWidth="1" />

      <text x={(L + R) / 2} y={H - 8} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.2">
        TIME AFTER DOSE (h)
      </text>
      <text x={14} y={(T + B) / 2} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.2" transform={`rotate(-90 14 ${(T + B) / 2})`}>
        SERUM CURCUMIN (µg/mL)
      </text>

      <g clipPath="url(#cp-clip)">
        {on && <path d={trtArea} fill="url(#cp-fill)" />}
        {/* control trace — flat, honest */}
        <path d={ctrlPath} fill="none" stroke="#64748B" strokeWidth="1.6" strokeDasharray="5 4" />
        {/* treated trace */}
        <path
          d={trtPath}
          fill="none"
          stroke={on ? "#00F2FE" : "#334155"}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: on ? "drop-shadow(0 0 8px rgba(0,242,254,0.6))" : "none" }}
        />
        {/* glucuronidation-cleavage band — collapses when UGT is inhibited */}
        <rect
          x={L}
          y={T}
          width={R - L}
          height={B - T}
          fill="url(#hcp)"
          opacity={on ? 0.16 : 0.62}
          style={{ transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </g>

      {/* UGT band label */}
      <text x={L + 8} y={T + 15} fill="#F59E0B" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.5" opacity={on ? 0.75 : 1}>
        {on ? "UGT1A1 INHIBITED — GLUCURONIDE SINK COLLAPSED" : "PHASE II GLUCURONIDATION CLEARANCE"}
      </text>

      {on ? (
        <g>
          <circle cx={x(m.treatedStats.tmax)} cy={y(m.treatedStats.cmax)} r="4" fill="#08121F" stroke="#00F2FE" strokeWidth="2" />
          <line x1={x(m.treatedStats.tmax)} y1={y(m.treatedStats.cmax)} x2={x(m.treatedStats.tmax) + 40} y2={y(m.treatedStats.cmax) - 26} stroke="#00F2FE" strokeWidth="1" opacity="0.7" />
          <text x={x(m.treatedStats.tmax) + 44} y={y(m.treatedStats.cmax) - 29} fill="#00F2FE" fontSize="11.5" fontFamily="var(--font-mono)" fontWeight="500">
            +20 mg piperine
          </text>
          <text x={x(m.treatedStats.tmax) + 44} y={y(m.treatedStats.cmax) - 17} fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.1">
            Cmax {m.treatedStats.cmax.toFixed(3)} µg/mL
          </text>
        </g>
      ) : (
        <text x={R - 6} y={y(0) - 10} textAnchor="end" fill="#64748B" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2">
          CONTROL · Cmax {m.controlStats.cmax.toFixed(3)}
        </text>
      )}

      <text x={R} y={T + 2} textAnchor="end" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
        {dose} mg CURCUMIN
      </text>
    </svg>
  );
}
