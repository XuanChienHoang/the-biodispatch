"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { LabSlider, useCountUp, useExportPng, exportCsv } from "@/components/ui";
import { BIOMARKERS } from "@/lib/pk";

const L = 250;
const R = 700;
const W = 760;
const H = 340;

export default function BiomarkerGizmo() {
  const [key, setKey] = useState("crp");
  const [base, setBase] = useState<Record<string, number>>(
    Object.fromEntries(BIOMARKERS.map((b) => [b.key, b.def]))
  );

  const spec = BIOMARKERS.find((b) => b.key === key)!;
  const baseline = base[key];

  const pred = useMemo(() => {
    const point = baseline * (1 + spec.delta / 100);
    const lo = baseline * (1 + (spec.delta - spec.ci) / 100);
    const hi = baseline * (1 + (spec.delta + spec.ci) / 100);
    return { point, lo, hi, abs: point - baseline, pct: spec.delta };
  }, [baseline, spec]);

  const rolled = useCountUp(pred.point, spec.step < 1 ? 1 : 0);
  const pct = useCountUp(pred.pct, 1);

  const exportPng = useExportPng();
  const improved = pred.abs < 0;

  return (
    <BiomedicalGizmoContainer
      fig="Gizmo 04"
      title="Biomarker Delta Forecaster"
      subtitle="pooled meta-analytic effect sizes"
      canvas={<DeltaPlot spec={spec} baseline={baseline} pred={pred} W={W} H={H} L={L} R={R} />}
      presets={BIOMARKERS.map((b) => ({ id: b.key, label: b.name.split(" ")[0] }))}
      activePreset={key}
      onPreset={(id) => setKey(id)}
      onReset={() => { setKey("crp"); setBase(Object.fromEntries(BIOMARKERS.map((b) => [b.key, b.def]))); }}
      onExport={() => {
        exportPng("bio-chart", `forecast-${key}`);
        exportCsv(
          [["biomarker", "baseline", "predicted", "ci_low", "ci_high", "intervention", "k", "n"],
            [spec.name, baseline, pred.point.toFixed(2), pred.lo.toFixed(2), pred.hi.toFixed(2), spec.comparator, spec.k, spec.n]],
          `biomarker-${key}`
        );
      }}
      citeParams={[
        ["Biomarker", spec.name],
        ["Baseline", `${baseline} ${spec.unit}`],
        ["Intervention", spec.comparator],
        ["Pooled Δ", `${spec.delta} % (95% CI ±${spec.ci})`],
        ["Trials pooled", `k = ${spec.k}`],
        ["Participants", `n = ${spec.n}`],
        ["Model", "fixed-effect pooled RCT"],
      ]}
      controls={
        <div className="space-y-5">
          <div>
            <p className="caps mb-1.5 text-slate-ink">Biomarker</p>
            <div className="grid grid-cols-2 gap-1.5">
              {BIOMARKERS.map((b) => {
                const on = b.key === key;
                return (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setKey(b.key)}
                    aria-pressed={on}
                    className={`caps rounded-sm border px-2 py-2 transition-all duration-200 ${
                      on
                        ? "border-indigo-deep bg-indigo-deep text-paper"
                        : "border-slate-hair bg-paper text-slate-ink hover:border-indigo-deep hover:text-indigo-deep"
                    }`}
                  >
                    {b.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <LabSlider
            label={`Baseline · ${spec.name}`}
            value={baseline}
            min={spec.min}
            max={spec.max}
            step={spec.step}
            unit={spec.unit}
            display={spec.step < 1 ? baseline.toFixed(1) : String(Math.round(baseline))}
            onChange={(v) => setBase((p) => ({ ...p, [key]: v }))}
            variant="on-paper"
            hint={`Reference range ${spec.min}–${spec.max} ${spec.unit}`}
          />

          <div className="border-t border-slate-hair pt-3">
            <p className="caps text-slate-ink">Intervention</p>
            <p className="mt-1 text-[0.88rem] font-medium leading-snug text-indigo-deep">{spec.comparator}</p>
            <p className="num mt-1.5 text-[0.72rem] text-slate-ink">
              k = {spec.k} trials · n = {spec.n.toLocaleString()} · 95% CI ±{spec.ci} %
            </p>
          </div>
        </div>
      }
      telemetry={[
        { key: "Predicted value", value: rolled, unit: spec.unit, tone: improved ? "#10B981" : "#F59E0B" },
        { key: "Δ vs baseline", value: `${pct}`, unit: "%", tone: improved ? "#10B981" : "#F59E0B" },
        { key: "95% CI", value: `${pred.lo.toFixed(spec.step < 1 ? 1 : 0)}–${pred.hi.toFixed(spec.step < 1 ? 1 : 0)}`, unit: spec.unit, tone: "#00F2FE" },
        { key: "Evidence base", value: `k=${spec.k}`, unit: `n=${spec.n}`, tone: "#94A3B8" },
      ]}
      insight={
        <>
          A baseline of{" "}
          <span className="num text-indigo-deep">
            {baseline} {spec.unit}
          </span>{" "}
          is projected to reach{" "}
          <span className="num" style={{ color: improved ? "#047857" : "#B45309" }}>
            {rolled} {spec.unit}
          </span>{" "}
          ({pct} %) after {spec.comparator}, with the 95 % confidence interval spanning{" "}
          <span className="num text-indigo-deep">
            {pred.lo.toFixed(1)}–{pred.hi.toFixed(1)} {spec.unit}
          </span>
          {""}
          . The interval is the pooled sampling uncertainty only — it excludes adherence, formulation
          bioavailability and regression to the mean, all of which widen real-world error. Drawn from{" "}
          {spec.k} randomised trials ({spec.n.toLocaleString()} participants).
        </>
      }
    />
  );
}

function DeltaPlot({
  spec, baseline, pred, W, H, L, R,
}: {
  spec: { name: string; unit: string; min: number; max: number };
  baseline: number;
  pred: { point: number; lo: number; hi: number };
  W: number; H: number; L: number; R: number;
}) {
  const lo = Math.min(pred.lo, baseline) * 0.92;
  const hi = Math.max(pred.hi, baseline) * 1.08;
  const x = (v: number) => L + ((v - lo) / (hi - lo)) * (R - L);
  const mid = 140;

  const ticks = Array.from({ length: 6 }, (_, i) => lo + ((hi - lo) / 5) * i);

  return (
    <svg id="bio-chart" viewBox={`0 0 ${W} ${H}`} className="h-auto w-full"
      role="img" aria-label={`Predicted change in ${spec.name} from ${baseline} to ${pred.point}`}>

      {/* axis */}
      <line x1={L} y1={mid + 78} x2={R} y2={mid + 78} stroke="#64748B" strokeWidth="1" />
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={x(t)} y1={mid + 78} x2={x(t)} y2={mid + 84} stroke="#64748B" strokeWidth="1" />
          <text x={x(t)} y={mid + 98} textAnchor="middle" fill="#64748B" fontSize="10.5" fontFamily="var(--font-mono)">
            {t.toFixed(hi - lo < 12 ? 1 : 0)}
          </text>
        </g>
      ))}
      <text x={(L + R) / 2} y={H - 8} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.2">
        {spec.name.toUpperCase()} ({spec.unit})
      </text>

      {/* baseline marker */}
      <g>
        <line x1={x(baseline)} y1={mid - 74} x2={x(baseline)} y2={mid + 78} stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 5" />
        <text x={x(baseline)} y={mid - 82} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.6">
          BASELINE
        </text>
        <text x={x(baseline)} y={mid - 68} textAnchor="middle" fill="#94A3B8" fontSize="11.5" fontFamily="var(--font-mono)">
          {baseline}
        </text>
      </g>

      {/* 95% CI whisker */}
      <motion.g animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <line x1={x(pred.lo)} y1={mid} x2={x(pred.hi)} y2={mid} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <line x1={x(pred.lo)} y1={mid - 15} x2={x(pred.lo)} y2={mid + 15} stroke="#F59E0B" strokeWidth="2.5" />
        <line x1={x(pred.hi)} y1={mid - 15} x2={x(pred.hi)} y2={mid + 15} stroke="#F59E0B" strokeWidth="2.5" />
        <rect x={x(pred.lo)} y={mid - 9} width={Math.max(2, x(pred.hi) - x(pred.lo))} height="18" fill="#F59E0B" opacity="0.22" />
        <text x={x(pred.lo)} y={mid + 34} textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="var(--font-mono)">
          {pred.lo.toFixed(1)}
        </text>
        <text x={x(pred.hi)} y={mid + 34} textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="var(--font-mono)">
          {pred.hi.toFixed(1)}
        </text>
        <text x={(x(pred.lo) + x(pred.hi)) / 2} y={mid - 24} textAnchor="middle" fill="#F59E0B" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
          95 % CI
        </text>
      </motion.g>

      {/* predicted point */}
      <circle cx={x(pred.point)} cy={mid} r="9" fill="#08121F" stroke="#00F2FE" strokeWidth="3" />
      <circle cx={x(pred.point)} cy={mid} r="17" fill="none" stroke="#00F2FE" strokeWidth="1" opacity="0.45" />
      <line x1={x(pred.point)} y1={mid - 17} x2={x(pred.point)} y2={mid - 52} stroke="#00F2FE" strokeWidth="1" />
      <text x={x(pred.point)} y={mid - 58} textAnchor="middle" fill="#00F2FE" fontSize="14" fontFamily="var(--font-mono)" fontWeight="500">
        {pred.point.toFixed(1)}
      </text>

      <text x={L - 14} y={mid + 4} textAnchor="end" fill="#64748B" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.8">
        PREDICTED
      </text>
      <text x={L - 14} y={mid + 40} textAnchor="end" fill="#475569" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">
        FIXED-EFFECT POOLED
      </text>
      <text x={R} y={26} textAnchor="end" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
        EDUCATIONAL FORECAST — NOT A CLINICAL FORECAST
      </text>
    </svg>
  );
}
