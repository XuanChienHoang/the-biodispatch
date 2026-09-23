"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { tick, onPaper } from "@/components/ui";
import { MATRIX_AGENTS, interactionFor, RELATION_META, type Relation } from "@/lib/content";

const GRADE_LABEL: Record<string, string> = {
  A: "Grade A · replicated human RCT",
  B: "Grade B · human + mechanistic",
  C: "Grade C · case report / in-vitro",
};

export default function SynergyGizmo() {
  const [a, setA] = useState("Curcumin");
  const [b, setB] = useState("Piperine");

  const pair = useMemo(() => interactionFor(a, b), [a, b]);

  const counts = useMemo(() => {
    const c: Record<Relation, number> = { synergistic: 0, antagonistic: 0, neutral: 0, potentiates: 0 };
    let total = 0;
    for (let i = 0; i < MATRIX_AGENTS.length; i++)
      for (let j = i + 1; j < MATRIX_AGENTS.length; j++) {
        const it = interactionFor(MATRIX_AGENTS[i], MATRIX_AGENTS[j]);
        if (it) {
          c[it.relation]++;
          total++;
        }
      }
    return { c, total };
  }, []);

  const cell = (x: string, y: string) => {
    if (x === y) return null;
    const it = interactionFor(x, y);
    if (!it) return "rgba(148,163,184,0.18)";
    return RELATION_META[it.relation].color;
  };

  return (
    <BiomedicalGizmoContainer
      fig="Gizmo 03"
      title="Synergy & Interaction Checker"
      subtitle="8 agents · 28 unique pairings"
      canvas={<MatrixGrid a={a} b={b} setA={setA} setB={setB} onPick={() => tick(1500)} counts={counts.c} />}
      presets={MATRIX_AGENTS.slice(0, 5).map((n) => ({ id: n, label: n }))}
      activePreset={a}
      onPreset={(id) => { setA(id); if (id === b) setB(a); }}
      onReset={() => { setA("Curcumin"); setB("Piperine"); }}
      citeParams={[
        ["Agent A", a],
        ["Agent B", b],
        ["Classification", pair ? RELATION_META[pair.relation].label : "—"],
        ["Evidence grade", pair ? pair.evidence : "—"],
        ["Pairings evaluated", String(counts.total)],
      ]}
      controls={
        <div className="space-y-4">
          <div>
            <p className="caps mb-1.5 text-slate-ink">Agent A</p>
            <select
              value={a}
              onChange={(e) => { setA(e.target.value); tick(1400); }}
              className="num w-full rounded-sm border border-slate-hair bg-paper px-2.5 py-2 text-[0.85rem] text-indigo-deep outline-none focus:border-trace"
            >
              {MATRIX_AGENTS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <span className="caps rounded-sm bg-indigo-deep px-2 py-1 text-trace">× co-administer</span>
          </div>
          <div>
            <p className="caps mb-1.5 text-slate-ink">Agent B</p>
            <select
              value={b}
              onChange={(e) => { setB(e.target.value); tick(1400); }}
              className="num w-full rounded-sm border border-slate-hair bg-paper px-2.5 py-2 text-[0.85rem] text-indigo-deep outline-none focus:border-trace"
            >
              {MATRIX_AGENTS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>

          <div className="border-t border-slate-hair pt-3">
            <p className="caps mb-2 text-slate-ink">Distribution · n = {counts.total}</p>
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {(Object.keys(RELATION_META) as Relation[]).map((k) => (
                <span
                  key={k}
                  title={`${RELATION_META[k].label}: ${counts.c[k]}`}
                  style={{ width: `${(counts.c[k] / counts.total) * 100}%`, background: RELATION_META[k].color }}
                />
              ))}
            </div>
            <ul className="mt-3 space-y-1.5">
              {(Object.keys(RELATION_META) as Relation[]).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: onPaper(RELATION_META[k].color) }} />
                  <span className="caps text-slate-ink flex-1">{RELATION_META[k].label}</span>
                  <span className="num text-[0.78rem] text-indigo-deep">{counts.c[k]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      telemetry={[
        { key: "Pair", value: pair ? `${RELATION_META[pair.relation].sign}` : "·", unit: `${a} × ${b}`, tone: pair ? RELATION_META[pair.relation].color : "#64748B" },
        { key: "Classification", value: pair ? RELATION_META[pair.relation].label.toUpperCase() : "N/A", tone: pair ? RELATION_META[pair.relation].color : "#64748B" },
        { key: "Evidence", value: pair ? `GRADE ${pair.evidence}` : "—", tone: "#00F2FE" },
        { key: "Agents covered", value: String(MATRIX_AGENTS.length), unit: "of 24", tone: "#94A3B8" },
      ]}
      insight={
        pair ? (
          <AnimatePresence mode="wait">
            <motion.div key={`${a}-${b}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <span className="caps" style={{ color: onPaper(RELATION_META[pair.relation].color) }}>
                {RELATION_META[pair.relation].label} · {GRADE_LABEL[pair.evidence]}
              </span>
              <p className="mt-1.5">{pair.mechanism}</p>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <span className="caps text-slate-ink">No documented interaction</span>
            <p className="mt-1.5">
              Absence of evidence here means no published pharmacokinetic or pharmacodynamic study has
              characterised this pairing — not evidence of absence. Click a lit cell in the matrix.
            </p>
          </>
        )
      }
    />
  );
}

function MatrixGrid({
  a, b, setA, setB, onPick, counts,
}: {
  a: string; b: string;
  setA: (s: string) => void;
  setB: (s: string) => void;
  onPick: () => void;
  counts: Record<Relation, number>;
}) {
  const n = MATRIX_AGENTS.length;
  const cellSize = 62;
  const left = 150;
  const top = 116;
  const W = left + n * cellSize + 18;
  const H = top + n * cellSize + 40;
  void counts;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[560px]" role="grid" aria-label="Interaction matrix">
        {/* column headers */}
        {MATRIX_AGENTS.map((c, i) => (
          <text
            key={`c${c}`}
            x={left + i * cellSize + cellSize / 2}
            y={top - 12}
            textAnchor="start"
            fill={c === a || c === b ? "#00F2FE" : "#64748b"}
            fontSize="10"
            fontFamily="var(--font-mono)"
            letterSpacing="1.1"
            transform={`rotate(-52 ${left + i * cellSize + cellSize / 2} ${top - 12})`}
          >
            {c.toUpperCase()}
          </text>
        ))}
        {/* row headers */}
        {MATRIX_AGENTS.map((r, j) => (
          <text
            key={`r${r}`}
            x={left - 12}
            y={top + j * cellSize + cellSize / 2 + 3.5}
            textAnchor="end"
            fill={r === a || r === b ? "#00F2FE" : "#64748b"}
            fontSize="10"
            fontFamily="var(--font-mono)"
            letterSpacing="1.1"
          >
            {r.toUpperCase()}
          </text>
        ))}

        {MATRIX_AGENTS.map((r, j) =>
          MATRIX_AGENTS.map((c, i) => {
            const diag = r === c;
            const it = diag ? null : interactionFor(r, c);
            const sel = (!diag && ((r === a && c === b) || (r === b && c === a)));
            const x = left + i * cellSize;
            const y = top + j * cellSize;
            const color = it ? RELATION_META[it.relation].color : "rgba(148,163,184,0.14)";
            return (
              <g
                key={`${r}-${c}`}
                onClick={() => {
                  if (diag) return;
                  setA(r); setB(c); onPick();
                }}
                style={{ cursor: diag ? "not-allowed" : "pointer" }}
                role="button"
                tabIndex={diag ? -1 : 0}
                aria-label={diag ? `${r} self` : `${r} and ${c}: ${it ? RELATION_META[it.relation].label : "no data"}`}
                onKeyDown={(e) => { if (!diag && (e.key === "Enter" || e.key === " ")) { setA(r); setB(c); onPick(); } }}
              >
                <rect
                  x={x + 2} y={y + 2} width={cellSize - 4} height={cellSize - 4} rx="2"
                  fill={diag ? "rgba(30,41,59,0.55)" : color}
                  fillOpacity={it ? 0.16 + 0.6 * (sel ? 1.6 : 1) : 1}
                  stroke={sel ? "#00F2FE" : diag ? "rgba(100,116,139,0.35)" : "rgba(148,163,184,0.16)"}
                  strokeWidth={sel ? 2.4 : 1}
                  style={{ transition: "stroke 250ms, fill-opacity 250ms" }}
                />
                {!diag && (
                  <text
                    x={x + cellSize / 2} y={y + cellSize / 2 + 4.5}
                    textAnchor="middle" fill={color} fontSize="15" fontFamily="var(--font-mono)" fontWeight="700"
                  >
                    {it ? RELATION_META[it.relation].sign : "?"}
                  </text>
                )}
                {sel && <title>{r} × {c}</title>}
              </g>
            );
          })
        )}

        <text x={left} y={H - 12} fill="#475569" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.8">
          SELECT ANY LIT CELL · + SYNERGY · ↑ POTENTIATES · − ANTAGONISM · · NEUTRAL · ? NO DATA
        </text>
      </svg>
    </div>
  );
}
