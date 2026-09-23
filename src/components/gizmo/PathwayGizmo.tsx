"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { tick, onPaper } from "@/components/ui";

type LigandId = "curcumin" | "sulforaphane" | "berberine" | "quercetin";

interface Ligand {
  id: LigandId;
  name: string;
  formula: string;
  receptor: string;
  target: string;
  nodeX: number;
  nodeY: number;
  color: string;
  downstream: string[];
  note: string;
}

const LIGANDS: Ligand[] = [
  {
    id: "curcumin",
    name: "Curcumin",
    formula: "C₂₁H₂₀O₆",
    receptor: "IKKβ / NF-κB p65",
    target: "NF-κB",
    nodeX: 268,
    nodeY: 168,
    color: "#F59E0B",
    downstream: ["↓ IKKβ phosphorylation", "↓ IκBα degradation", "↓ p65 nuclear translocation", "↓ TNF-α, IL-6, COX-2"],
    note: "Curcuminoids interrupt the canonical NF-κB cascade at IKKβ, preventing IκBα release. The effect is redox-sensitive and concentration-dependent.",
  },
  {
    id: "sulforaphane",
    name: "Sulforaphane",
    formula: "C₆H₁₁NOS₂",
    receptor: "Keap1 (cysteine 151)",
    target: "Nrf2",
    nodeX: 268,
    nodeY: 96,
    color: "#10B981",
    downstream: ["↑ Keap1 alkylation", "↑ Nrf2 release from Keap1", "↑ ARE nuclear binding", "↑ HO-1, NQO1, GCLC"],
    note: "Electrophilic sulforaphane modifies Keap1 cysteines, freeing Nrf2 to dimerise with small Maf and drive antioxidant response element transcription.",
  },
  {
    id: "berberine",
    name: "Berberine",
    formula: "C₂₀H₁₈NO₄⁺",
    receptor: "AMPK α1 (Thr172)",
    target: "AMPK",
    nodeX: 268,
    nodeY: 240,
    color: "#00F2FE",
    downstream: ["↑ LKB1-dependent Thr172", "↑ ACC phosphorylation", "↓ mTORC1 / S6K1", "↑ GLUT4 translocation"],
    note: "Berberine raises the AMP:ATP ratio by inhibiting mitochondrial complex I, activating AMPK independently of exercise or energy stress.",
  },
  {
    id: "quercetin",
    name: "Quercetin",
    formula: "C₁₅H₁₀O₇",
    receptor: "PI3K / mTORC1",
    target: "mTOR",
    nodeX: 268,
    nodeY: 312,
    color: "#FF6B4A",
    downstream: ["↓ PI3K p85 association", "↓ Akt Ser473 phosphorylation", "↓ mTORC1 assembly", "↑ ULK1 → autophagy onset"],
    note: "Flavonol competition at the ATP pocket of PI3K lowers Akt output, disinhibiting AMPK and releasing the autophagy brake.",
  },
];

export default function PathwayGizmo() {
  const [sel, setSel] = useState<LigandId>("curcumin");
  const active = LIGANDS.find((l) => l.id === sel)!;

  return (
    <BiomedicalGizmoContainer
      fig="Gizmo 02"
      title="Molecular Pathway & Target Visualizer"
      subtitle="click a ligand to propagate signal"
      canvas={<Cell active={active} onPick={(id) => { setSel(id); tick(1500); }} sel={sel} />}
      presets={LIGANDS.map((l) => ({ id: l.id, label: l.name }))}
      activePreset={sel}
      onPreset={(id) => setSel(id as LigandId)}
      onReset={() => setSel("curcumin")}
      citeParams={[
        ["Ligand", active.name],
        ["Formula", active.formula],
        ["Primary target", active.target],
        ["Receptor site", active.receptor],
        ["Model", "schematic signalling"],
      ]}
      controls={
        <div className="space-y-4">
          <div>
            <p className="caps text-slate-ink">Ligand library</p>
            <div className="mt-2 space-y-1.5">
              {LIGANDS.map((l) => {
                const on = l.id === sel;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => { setSel(l.id); tick(1500); }}
                    className={`flex w-full items-center gap-2.5 rounded-sm border px-2.5 py-2 text-left transition-all duration-200 ${
                      on ? "border-slate-hair bg-paper shadow-sm" : "border-transparent hover:bg-paper"
                    }`}
                    aria-pressed={on}
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: onPaper(l.color), boxShadow: on ? `0 0 9px ${l.color}` : "none" }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.86rem] font-medium leading-tight text-indigo-deep">{l.name}</span>
                      <span className="num block text-[0.66rem] text-slate-ink">{l.formula}</span>
                    </span>
                    <span className="caps shrink-0" style={{ color: onPaper(l.color) }}>{l.target}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-hair pt-3">
            <p className="caps text-slate-ink">Receptor site</p>
            <p className="num mt-1 text-[0.88rem] font-medium text-indigo-deep">{active.receptor}</p>
          </div>
        </div>
      }
      telemetry={[
        { key: "Target", value: active.target, tone: active.color },

        { key: "Downstream nodes", value: String(active.downstream.length), unit: "reported", tone: "#00F2FE" },
        { key: "Direction", value: active.id === "sulforaphane" ? "UP" : "DOWN", unit: "regulation", tone: active.id === "sulforaphane" ? "#10B981" : "#F59E0B" },
        { key: "Compartment", value: "CYTO→NUC", tone: "#94A3B8" },
      ]}
      insight={
        <>
          <AnimatePresence mode="wait">
            <motion.span
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24 }}
            >
              <strong className="text-indigo-deep">{active.name}</strong> → {active.note}
            </motion.span>
          </AnimatePresence>
          <span className="mt-2 block text-[0.79rem] text-slate-ink">
            Downstream: {active.downstream.join(" · ")}
          </span>
        </>
      }
    />
  );
}

function Cell({
  active,
  onPick,
  sel,
}: {
  active: Ligand;
  onPick: (id: LigandId) => void;
  sel: LigandId;
}) {
  return (
    <svg viewBox="0 0 760 380" className="h-auto w-full" role="img" aria-label={`Cell signalling diagram, ${active.name} targeting ${active.target}`}>
      <defs>
        <radialGradient id="cyto" cx="45%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#12233a" />
          <stop offset="100%" stopColor="#08121f" />
        </radialGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={active.color} />
        </marker>
        <marker id="arrowmute" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#475569" />
        </marker>
      </defs>

      {/* --- membrane (two leaflets, hand-drawn) --- */}
      <path d="M18 56 C 18 30, 46 20, 92 20 L 668 20 C 714 20, 742 32, 742 58 L 742 340 C 742 362, 714 372, 668 372 L 92 372 C 46 372, 18 360, 18 336 Z"
        fill="url(#cyto)" stroke="#334155" strokeWidth="1.4" />
      <path d="M18 72 C 18 46, 46 36, 92 36 L 668 36 C 714 36, 742 48, 742 74"
        fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 5" />
      <path d="M18 324 C 18 348, 46 356, 92 356 L 668 356 C 714 356, 742 346, 742 322"
        fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 5" />
      <text x="34" y="48" fill="#475569" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.4">PLASMA MEMBRANE</text>

      {/* --- extracellular ligands (clickable) --- */}
      {LIGANDS.map((l) => {
        const y = l.nodeY;
        const on = l.id === sel;
        return (
          <g key={l.id} onClick={() => onPick(l.id)} style={{ cursor: "pointer" }} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onPick(l.id); }}>
            <title>{l.name}</title>
            <circle cx="70" cy={y} r={on ? 15 : 12} fill="#08121F" stroke={l.color} strokeWidth={on ? 2.6 : 1.4}
              opacity={on ? 1 : 0.55} style={{ transition: "all 300ms" }} />
            {on && <circle cx="70" cy={y} r="22" fill="none" stroke={l.color} strokeWidth="1" opacity="0.35" />}
            <text x="70" y={y + 3.5} textAnchor="middle" fill={l.color} fontSize="10" fontFamily="var(--font-mono)" fontWeight="700" opacity={on ? 1 : 0.7}>
              {l.name.slice(0, 2).toUpperCase()}
            </text>
            <text x="70" y={y + 30} textAnchor="middle" fill={on ? "#e2e8f0" : "#64748b"} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.6">
              {l.name}
            </text>

            {/* ligand → receptor transit */}
            <path
              d={`M 86 ${y} C 150 ${y}, 190 ${y}, 246 ${y}`}
              fill="none"
              stroke={on ? l.color : "#334155"}
              strokeWidth={on ? 2.2 : 1}
              strokeDasharray={on ? "8 6" : "3 6"}
              markerEnd={on ? "url(#arrow)" : "url(#arrowmute)"}
              opacity={on ? 1 : 0.4}
              className={on ? "animate-[data-flow_1.6s_linear_infinite]" : ""}
            />
          </g>
        );
      })}

      {/* --- membrane receptor --- */}
      <g>
        <path d="M246 62 h34 v256 h-34 z" fill="#0b192c" stroke={active.color} strokeWidth="1.6" rx="3" />
        <path d="M246 78 h-14 a10 10 0 0 0 0 20 h14" fill="none" stroke={active.color} strokeWidth="1.4" />
        <path d="M246 302 h-14 a10 10 0 0 1 0 -20 h14" fill="none" stroke={active.color} strokeWidth="1.4" />
        <text x="263" y="200" textAnchor="middle" fill={active.color} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6"
          transform={`rotate(-90 263 200)`}>
          {active.target} NODE
        </text>
      </g>

      {/* --- cytosolic cascade --- */}
      <path d={`M 284 190 C 340 190, 380 ${active.nodeY + 0}, 430 190`}
        fill="none" stroke={active.color} strokeWidth="2" strokeDasharray="9 6" markerEnd="url(#arrow)"
        className="animate-[data-flow_2s_linear_infinite]" opacity="0.9" />

      {active.downstream.map((d, i) => {
        const cx = 470 + i * 74;
        const on = i < 3;
        return (
          <g key={d}>
            <motion.rect
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.35 }}
              x={cx - 33} y="172" width="66" height="36" rx="3"
              fill="#0b192c" stroke={on ? active.color : "#475569"} strokeWidth="1"
            />
            <text x={cx} y="187" textAnchor="middle" fill={on ? active.color : "#94a3b8"} fontSize="11" fontFamily="var(--font-mono)" fontWeight="700">
              {d.split(" ")[0]}
            </text>
            <text x={cx} y="200" textAnchor="middle" fill="#94a3b8" fontSize="7.6" fontFamily="var(--font-mono)" letterSpacing="0.4">
              {d.split(" ").slice(1).join(" ").slice(0, 14)}
            </text>
            {i < active.downstream.length - 1 && (
              <line x1={cx + 33} y1="190" x2={cx + 41} y2="190" stroke={active.color} strokeWidth="1.4" markerEnd="url(#arrow)" />
            )}
          </g>
        );
      })}

      {/* --- nucleus --- */}
      <g>
        <ellipse cx="666" cy="278" rx="70" ry="58" fill="#0b192c" stroke={active.color} strokeWidth="1.4" strokeDasharray="5 4" />
        <text x="666" y="272" textAnchor="middle" fill={active.color} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2.6">NUCLEUS</text>
        <text x="666" y="290" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">DNA → mRNA</text>
        <path d={`M 700 240 C 736 246, 736 258, 720 268`} fill="none" stroke={active.color} strokeWidth="2" strokeDasharray="6 5"
          markerEnd="url(#arrow)" className="animate-[data-flow_2.4s_linear_infinite]" />
      </g>

      <text x="34" y="346" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.8">
        SCHEMATIC — NOT TO SCALE
      </text>
    </svg>
  );
}
