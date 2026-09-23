"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { tick, onPaper } from "@/components/ui";
import { MATRIX_AGENTS, interactionFor, RELATION_META, type Relation } from "@/lib/content";
import { useLanguageStore } from "@/lib/i18n";
import { Lightbulb, Sparkles, BookOpen, AlertTriangle } from "lucide-react";

const AGENT_VI: Record<string, string> = {
  Curcumin: "Curcumin (Nghệ)",
  Piperine: "Piperine (Tiêu đen)",
  Iron: "Sắt (Fe²⁺)",
  Calcium: "Canxi (Ca²⁺)",
  "Green Tea EGCG": "EGCG Trà xanh",
  Quercetin: "Quercetin (Vỏ táo)",
  Warfarin: "Warfarin (Thuốc chống đông)",
  "St. John's Wort": "Cỏ Ban Âu (St. John's Wort)",
};

const RELATION_VI: Record<Relation, { label: string; desc: string }> = {
  synergistic: {
    label: "Hiệp đồng (Tăng tác dụng)",
    desc: "Hai hoạt chất tương hỗ lẫn nhau, tạo ra hiệu quả sinh học vượt trội hơn tổng tác dụng riêng rẽ của từng chất.",
  },
  antagonistic: {
    label: "Đối kháng (Bất lợi / Cạnh tranh)",
    desc: "Hai chất triệt tiêu hoặc cản trở hấp thu của nhau, làm giảm nồng độ hoạt chất hoặc gây lắng đọng không tan.",
  },
  neutral: {
    label: "Trung tính (Không tương tác)",
    desc: "Có thể uống đồng thời mà không làm thay đổi sinh khả dụng hay chuyển hóa dược học của nhau.",
  },
  potentiates: {
    label: "Tăng nồng độ máu (Bio-enhancer)",
    desc: "Một chất đóng vai trò ức chế enzyme đào thải, giúp chất kia lưu hành lâu hơn gấp nhiều lần trong cơ thể.",
  },
};

const GRADE_LABEL_VI: Record<string, string> = {
  A: "Cấp độ A · Thử nghiệm lâm sàng RCT lặp lại trên người",
  B: "Cấp độ B · Cơ chế sinh hóa rõ ràng + dữ liệu người",
  C: "Cấp độ C · Báo cáo ca lâm sàng hoặc thử nghiệm in-vitro",
};

const GRADE_LABEL_EN: Record<string, string> = {
  A: "Grade A · replicated human RCT",
  B: "Grade B · human + mechanistic",
  C: "Grade C · case report / in-vitro",
};

export default function SynergyGizmo() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

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

  return (
    <div className="space-y-6">
      <BiomedicalGizmoContainer
        fig="Gizmo 03"
        title={isVi ? "Ma trận Kiểm tra Tương tác & Hiệp đồng Hoạt chất" : "Synergy & Interaction Checker"}
        subtitle={isVi ? "8 hoạt chất đại diện · 28 cặp phối hợp đã được chứng minh y khoa" : "8 agents · 28 unique pairings"}
        canvas={<MatrixGrid a={a} b={b} setA={setA} setB={setB} onPick={() => tick(1500)} counts={counts.c} isVi={isVi} />}
        presets={MATRIX_AGENTS.slice(0, 5).map((n) => ({
          id: n,
          label: isVi && AGENT_VI[n] ? AGENT_VI[n].split(" ")[0] : n,
        }))}
        activePreset={a}
        onPreset={(id) => { setA(id); if (id === b) setB(a); }}
        onReset={() => { setA("Curcumin"); setB("Piperine"); }}
        citeParams={[
          [isVi ? "Hoạt chất A" : "Agent A", isVi && AGENT_VI[a] ? AGENT_VI[a] : a],
          [isVi ? "Hoạt chất B" : "Agent B", isVi && AGENT_VI[b] ? AGENT_VI[b] : b],
          [
            isVi ? "Phân loại tương tác" : "Classification",
            pair ? (isVi ? RELATION_VI[pair.relation].label : RELATION_META[pair.relation].label) : "—",
          ],
          [isVi ? "Cấp độ bằng chứng" : "Evidence grade", pair ? pair.evidence : "—"],
          [isVi ? "Số cặp tương tác đã khảo sát" : "Pairings evaluated", String(counts.total)],
        ]}
        controls={
          <div className="space-y-4">
            <div>
              <p className="caps mb-1.5 text-slate-ink">{isVi ? "Hoạt chất thứ nhất (A)" : "Agent A"}</p>
              <select
                value={a}
                onChange={(e) => { setA(e.target.value); tick(1400); }}
                className="num w-full rounded-sm border border-slate-hair bg-paper px-2.5 py-2 text-[0.85rem] text-indigo-deep outline-none focus:border-trace"
              >
                {MATRIX_AGENTS.map((n) => (
                  <option key={n} value={n}>
                    {isVi && AGENT_VI[n] ? AGENT_VI[n] : n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center">
              <span className="caps rounded-sm bg-indigo-deep px-2 py-1 text-trace text-xs font-mono font-bold">
                {isVi ? "× phối hợp cùng" : "× co-administer"}
              </span>
            </div>
            <div>
              <p className="caps mb-1.5 text-slate-ink">{isVi ? "Hoạt chất thứ hai (B)" : "Agent B"}</p>
              <select
                value={b}
                onChange={(e) => { setB(e.target.value); tick(1400); }}
                className="num w-full rounded-sm border border-slate-hair bg-paper px-2.5 py-2 text-[0.85rem] text-indigo-deep outline-none focus:border-trace"
              >
                {MATRIX_AGENTS.map((n) => (
                  <option key={n} value={n}>
                    {isVi && AGENT_VI[n] ? AGENT_VI[n] : n}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-slate-hair pt-3">
              <p className="caps mb-2 text-slate-ink">
                {isVi ? `Phân bố dữ liệu nghiên cứu · n = ${counts.total}` : `Distribution · n = ${counts.total}`}
              </p>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {(Object.keys(RELATION_META) as Relation[]).map((k) => (
                  <span
                    key={k}
                    title={`${isVi ? RELATION_VI[k].label : RELATION_META[k].label}: ${counts.c[k]}`}
                    style={{ width: `${(counts.c[k] / counts.total) * 100}%`, background: RELATION_META[k].color }}
                  />
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {(Object.keys(RELATION_META) as Relation[]).map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: onPaper(RELATION_META[k].color) }} />
                    <span className="caps text-slate-ink flex-1 text-xs">
                      {isVi ? RELATION_VI[k].label : RELATION_META[k].label}
                    </span>
                    <span className="num text-[0.78rem] text-indigo-deep font-bold">{counts.c[k]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
        telemetry={[
          {
            key: isVi ? "Cặp hoạt chất" : "Pair",
            value: pair ? `${RELATION_META[pair.relation].sign}` : "·",
            unit: `${isVi && AGENT_VI[a] ? AGENT_VI[a].split(" ")[0] : a} × ${isVi && AGENT_VI[b] ? AGENT_VI[b].split(" ")[0] : b}`,
            tone: pair ? RELATION_META[pair.relation].color : "#64748B",
          },
          {
            key: isVi ? "Phân loại" : "Classification",
            value: pair
              ? (isVi ? RELATION_VI[pair.relation].label.split(" ")[0].toUpperCase() : RELATION_META[pair.relation].label.toUpperCase())
              : "N/A",
            tone: pair ? RELATION_META[pair.relation].color : "#64748B",
          },
          {
            key: isVi ? "Bằng chứng" : "Evidence",
            value: pair ? `CẤP ${pair.evidence}` : "—",
            tone: "#00F2FE",
          },
          {
            key: isVi ? "Hoạt chất" : "Agents covered",
            value: String(MATRIX_AGENTS.length),
            unit: isVi ? "hoạt chất" : "of 24",
            tone: "#94A3B8",
          },
        ]}
        insight={
          pair ? (
            <AnimatePresence mode="wait">
              <motion.div key={`${a}-${b}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                <span className="caps font-bold" style={{ color: onPaper(RELATION_META[pair.relation].color) }}>
                  {isVi ? RELATION_VI[pair.relation].label : RELATION_META[pair.relation].label} · {isVi ? GRADE_LABEL_VI[pair.evidence] : GRADE_LABEL_EN[pair.evidence]}
                </span>
                <p className="mt-1.5 leading-relaxed text-[0.9rem] text-indigo-soft">{pair.mechanism}</p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <span className="caps text-slate-ink font-bold">
                {isVi ? "Chưa có nghiên cứu tương tác trực tiếp" : "No documented interaction"}
              </span>
              <p className="mt-1.5 leading-relaxed text-[0.9rem] text-indigo-soft">
                {isVi
                  ? "Sự thiếu vắng dữ liệu ở đây có nghĩa là chưa có thử nghiệm lâm sàng hoặc nghiên cứu dược động học nào công bố về cặp phối hợp này — không đồng nghĩa với việc hoàn toàn an toàn khi dùng liều cao. Hãy nhấp vào các ô sáng màu trên ma trận để kiểm tra."
                  : "Absence of evidence here means no published pharmacokinetic or pharmacodynamic study has characterised this pairing — not evidence of absence. Click a lit cell in the matrix."}
              </p>
            </>
          )
        }
      />

      {/* Accessible Layman Medical Explainer Box */}
      <div className="rounded-sm border-2 border-indigo-deep/20 bg-paper-tint p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-indigo-deep/15 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-deep text-trace shadow-2xs">
              <Lightbulb size={14} />
            </span>
            <div>
              <h4 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                {isVi ? "💡 Góc Giải Thích Tương Tác Dược Chất Dễ Hiểu" : "💡 Clinical Synergy & Interaction Guide"}
              </h4>
              <p className="text-[0.78rem] text-slate-ink">
                {isVi
                  ? "Hiểu đúng cách phối hợp thực phẩm bảo vệ sức khỏe và thuốc kê đơn để tránh tiền mất tật mang:"
                  : "Clinical rules of thumb when combining botanicals with prescription pharmacotherapy:"}
              </p>
            </div>
          </div>
          <span className="caps text-xs font-mono font-bold text-trace-ink bg-indigo-deep/10 px-2.5 py-1 rounded-sm">
            EVIDENCE-BASED SAFETY
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-syn-ink">
              <Sparkles size={13} />
              <span>Hiệp đồng: 1 + 1 = 5</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Ví dụ Curcumin + Piperine. Piperine khóa chiếc phanh đào thải của gan giúp nồng độ nghệ trong máu tăng vọt gấp 20 lần thay vì tăng liều uống gây xót dạ dày."
                : "Curcumin + Piperine: Bio-enhancer suppresses hepatic clearance, boosting systemic exposure twenty-fold."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-600">
              <AlertTriangle size={13} />
              <span>Đối kháng: Cạnh tranh cửa vào</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Ví dụ Canxi và Sắt, hoặc Trà xanh và Sắt. Cả hai cùng tranh nhau một 'cánh cổng vận chuyển' DMT1 ở thành ruột hoặc tannin trong trà kết tủa sắt, khiến cơ thể không hấp thu được viên sắt."
                : "Calcium competes with Iron for DMT1 transporter; Green tea EGCG polyphenols chelate non-heme iron into insoluble complexes."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-red-600">
              <AlertTriangle size={13} />
              <span>Cảnh giác: Tương tác Thuốc kê đơn</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Cỏ Ban Âu (St. John's Wort) kích hoạt mạnh enzyme CYP3A4 khiến thuốc chống đông máu Warfarin bị đào thải quá nhanh làm tăng nguy cơ cục máu đông. Luôn hỏi ý kiến bác sĩ khi uống chung."
                : "St. John's Wort induces hepatic CYP3A4, collapsing plasma concentrations of critical drugs like Warfarin and contraceptives."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixGrid({
  a, b, setA, setB, onPick, counts, isVi,
}: {
  a: string; b: string;
  setA: (s: string) => void;
  setB: (s: string) => void;
  onPick: () => void;
  counts: Record<Relation, number>;
  isVi: boolean;
}) {
  const n = MATRIX_AGENTS.length;
  const cellSize = 62;
  const left = 160;
  const top = 120;
  const W = left + n * cellSize + 20;
  const H = top + n * cellSize + 44;
  void counts;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[620px]" role="grid" aria-label="Interaction matrix">
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
            {isVi && AGENT_VI[c] ? AGENT_VI[c].toUpperCase() : c.toUpperCase()}
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
            {isVi && AGENT_VI[r] ? AGENT_VI[r].toUpperCase() : r.toUpperCase()}
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
          {isVi
            ? "CHỌN Ô SÁNG MÀU ĐỂ XEM CƠ CHẾ · + HIỆP ĐỒNG · ↑ TĂNG HẤP THU · − ĐỐI KHÁNG · · TRUNG TÍNH · ? CHƯA CÓ DỮ LIỆU"
            : "SELECT ANY LIT CELL · + SYNERGY · ↑ POTENTIATES · − ANTAGONISM · · NEUTRAL · ? NO DATA"}
        </text>
      </svg>
    </div>
  );
}
