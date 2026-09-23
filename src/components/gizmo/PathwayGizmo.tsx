"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { tick, onPaper } from "@/components/ui";
import { useLanguageStore } from "@/lib/i18n";
import { Lightbulb, Sparkles, BookOpen, ChevronRight } from "lucide-react";

type LigandId = "curcumin" | "sulforaphane" | "berberine" | "quercetin";

interface Ligand {
  id: LigandId;
  name: string;
  nameVi: string;
  sourceVi: string;
  formula: string;
  receptor: string;
  receptorVi: string;
  target: string;
  nodeX: number;
  nodeY: number;
  color: string;
  downstream: string[];
  downstreamVi: string[];
  note: string;
  noteVi: string;
  layTitle: string;
  layAnalogy: string;
  clinicalMeaning: string;
}

const LIGANDS: Ligand[] = [
  {
    id: "curcumin",
    name: "Curcumin",
    nameVi: "Curcumin (Tinh chất Nghệ)",
    sourceVi: "Củ nghệ vàng (Curcuma longa)",
    formula: "C₂₁H₂₀O₆",
    receptor: "IKKβ / NF-κB p65",
    receptorVi: "Tiểu đơn vị IKKβ / NF-κB p65",
    target: "NF-κB",
    nodeX: 268,
    nodeY: 168,
    color: "#F59E0B",
    downstream: ["↓ IKKβ phosphorylation", "↓ IκBα degradation", "↓ p65 nuclear translocation", "↓ TNF-α, IL-6, COX-2"],
    downstreamVi: [
      "↓ Giảm phosphoryl hóa IKKβ",
      "↓ Ngăn thoái giáng IκBα",
      "↓ Chặn chuyển vị p65 vào nhân",
      "↓ Giảm các chất viêm TNF-α, IL-6, COX-2",
    ],
    note: "Curcuminoids interrupt the canonical NF-κB cascade at IKKβ, preventing IκBα release. The effect is redox-sensitive and concentration-dependent.",
    noteVi: "Các phân tử curcuminoids làm ngắt quãng dòng tín hiệu viêm kinh điển NF-κB ngay tại nút IKKβ, ngăn chặn giải phóng phức hợp gây viêm.",
    layTitle: "Cắt đứt dây chuông báo động viêm nhiễm NF-κB",
    layAnalogy:
      "NF-κB giống như chiếc 'chuông báo cháy' của tế bào. Khi bị tổn thương, stress oxy hóa hoặc vi khuẩn kích thích, chiếc chuông này reo liên hồi gây sưng đau, viêm khớp và viêm mạn tính. Curcumin đi thẳng vào nút IKKβ và 'ngắt dây chuông', dập tắt tín hiệu viêm ngay từ tế bào chất trước khi nó kịp kích hoạt nhân tế bào sản sinh độc tố viêm.",
    clinicalMeaning: "Giảm sưng đau khớp, hạ chỉ số viêm hs-CRP và bảo vệ niêm mạc ruột.",
  },
  {
    id: "sulforaphane",
    name: "Sulforaphane",
    nameVi: "Sulforaphane (Mầm Súp Lơ)",
    sourceVi: "Mầm bông cải xanh (Broccoli sprouts)",
    formula: "C₆H₁₁NOS₂",
    receptor: "Keap1 (cysteine 151)",
    receptorVi: "Thụ thể Keap1 (gốc Cysteine 151)",
    target: "Nrf2",
    nodeX: 268,
    nodeY: 96,
    color: "#10B981",
    downstream: ["↑ Keap1 alkylation", "↑ Nrf2 release from Keap1", "↑ ARE nuclear binding", "↑ HO-1, NQO1, GCLC"],
    downstreamVi: [
      "↑ Alkyl hóa thụ thể Keap1",
      "↑ Giải phóng Nrf2 khỏi Keap1",
      "↑ Gắn kết vùng ARE trong nhân",
      "↑ Bật các enzyme chống oxy hóa HO-1, NQO1",
    ],
    note: "Electrophilic sulforaphane modifies Keap1 cysteines, freeing Nrf2 to dimerise with small Maf and drive antioxidant response element transcription.",
    noteVi: "Sulforaphane biến đổi các gốc cysteine trên Keap1, giải phóng Nrf2 tự do đi vào nhân để kích hoạt các yếu tố phản ứng chống oxy hóa.",
    layTitle: "Bẻ khóa còng số 8 để phóng thích Khiên Chống Lão Hóa Nrf2",
    layAnalogy:
      "Nrf2 là 'tổng chỉ huy đội phòng cháy chữa cháy' của tế bào. Bình thường Nrf2 bị một chiếc còng số 8 tên là Keap1 khóa chặt và đem đi tiêu hủy. Hợp chất Sulforaphane bẻ gãy chiếc còng Keap1 này, giải phóng Nrf2 bay thẳng vào nhân tế bào, bật công tắc cho hàng trăm enzyme chống oxy hóa nội sinh (HO-1, NQO1) hoạt động hết công suất.",
    clinicalMeaning: "Bảo vệ tế bào khỏi gốc tự do, tăng khả năng thải độc gan Pha II và trẻ hóa mạch máu.",
  },
  {
    id: "berberine",
    name: "Berberine",
    nameVi: "Berberine (Cây Hoàng Liên)",
    sourceVi: "Hoàng liên, Vàng đắng (Berberis aristata)",
    formula: "C₂₀H₁₈NO₄⁺",
    receptor: "AMPK α1 (Thr172)",
    receptorVi: "Tiểu đơn vị AMPK α1 (vị trí Thr172)",
    target: "AMPK",
    nodeX: 268,
    nodeY: 240,
    color: "#00F2FE",
    downstream: ["↑ LKB1-dependent Thr172", "↑ ACC phosphorylation", "↓ mTORC1 / S6K1", "↑ GLUT4 translocation"],
    downstreamVi: [
      "↑ Phosphoryl hóa vị trí Thr172",
      "↑ Bất hoạt enzyme tích mỡ ACC",
      "↓ Ức chế phân nhánh mTORC1",
      "↑ Mở cổng hút đường vào tế bào GLUT4",
    ],
    note: "Berberine raises the AMP:ATP ratio by inhibiting mitochondrial complex I, activating AMPK independently of exercise or energy stress.",
    noteVi: "Berberine nâng cao tỷ lệ AMP:ATP bằng cách ức chế nhẹ phức hợp ty thể I, kích hoạt cảm biến năng lượng AMPK mà không cần vận động kiệt sức.",
    layTitle: "Bật chế độ Tiết Kiệm Năng Lượng & Đốt Mỡ Thừa AMPK",
    layAnalogy:
      "AMPK giống như 'chế độ tiết kiệm pin (Low Power Mode)' của cơ thể. Bình thường bạn phải chạy bộ 10km hoặc nhịn ăn gián đoạn thì cơ thể mới kích hoạt AMPK. Berberine tác động vào ty thể, đánh lừa tế bào rằng năng lượng đang cạn kiệt, lập tức bật công tắc AMPK để mở toang các kênh GLUT4 hút sạch đường huyết vào tế bào và kích hoạt cỗ máy đốt mỡ thừa.",
    clinicalMeaning: "Ổn định đường huyết sau ăn, cải thiện độ nhạy insulin và giảm tích tụ mỡ nội tạng.",
  },
  {
    id: "quercetin",
    name: "Quercetin",
    nameVi: "Quercetin (Vỏ Táo & Hành Tây)",
    sourceVi: "Vỏ táo, hành tây đỏ, nụ hoa hòe (Sophora japonica)",
    formula: "C₁₅H₁₀O₇",
    receptor: "PI3K / mTORC1",
    receptorVi: "Tổ hợp enzyme PI3K / mTORC1",
    target: "mTOR",
    nodeX: 268,
    nodeY: 312,
    color: "#FF6B4A",
    downstream: ["↓ PI3K p85 association", "↓ Akt Ser473 phosphorylation", "↓ mTORC1 assembly", "↑ ULK1 → autophagy onset"],
    downstreamVi: [
      "↓ Ức chế tiểu đơn vị PI3K",
      "↓ Giảm tín hiệu Akt Ser473",
      "↓ Giải tán phức hợp mTORC1",
      "↑ Kích hoạt ULK1 → Tự thực bào (Autophagy)",
    ],
    note: "Flavonol competition at the ATP pocket of PI3K lowers Akt output, disinhibiting AMPK and releasing the autophagy brake.",
    noteVi: "Hoạt chất flavonoid cạnh tranh vị trí ATP của PI3K làm giảm hoạt tính Akt, nhả phanh hãm phức hợp mTORC1 và kích hoạt chu trình tự thực bào.",
    layTitle: "Nhả nhẹ phanh xe để kích hoạt Chu trình Dọn Rác Tế Bào (Autophagy)",
    layAnalogy:
      "mTOR giống như 'chiếc phanh xe kìm hãm cỗ máy dọn rác tự nhiên của tế bào'. Khi chúng ta nạp dư thừa calo, phanh mTOR luôn bị đạp chặt, khiến các mảnh vụn protein già cỗi tích tụ làm tế bào lão hóa. Quercetin giúp nhả nhẹ chiếc phanh mTOR này, cho phép tế bào khởi động quy trình Autophagy để tự tiêu hóa các bào quan hư hại và làm mới cấu trúc sinh học.",
    clinicalMeaning: "Dọn dẹp tế bào già cỗi (senolytic), tăng cường tuổi thọ tế bào và kháng viêm mạch máu.",
  },
];

export default function PathwayGizmo() {
  const [sel, setSel] = useState<LigandId>("curcumin");
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const active = LIGANDS.find((l) => l.id === sel)!;

  return (
    <div className="space-y-6">
      <BiomedicalGizmoContainer
        fig="Gizmo 02"
        title={isVi ? "Bản đồ Con đường Tín hiệu & Thụ thể Tế bào" : "Molecular Pathway & Target Visualizer"}
        subtitle={isVi ? "chọn hoạt chất để quan sát dòng tín hiệu lan truyền vào nhân" : "click a ligand to propagate signal"}
        canvas={<Cell active={active} onPick={(id) => { setSel(id); tick(1500); }} sel={sel} isVi={isVi} />}
        presets={LIGANDS.map((l) => ({ id: l.id, label: isVi ? l.nameVi : l.name }))}
        activePreset={sel}
        onPreset={(id) => setSel(id as LigandId)}
        onReset={() => setSel("curcumin")}
        citeParams={[
          [isVi ? "Hoạt chất" : "Ligand", isVi ? active.nameVi : active.name],
          [isVi ? "Công thức phân tử" : "Formula", active.formula],
          [isVi ? "Đích tác động chính" : "Primary target", active.target],
          [isVi ? "Vị trí thụ thể" : "Receptor site", isVi ? active.receptorVi : active.receptor],
          [isVi ? "Mô hình" : "Model", isVi ? "mô phỏng tín hiệu tế bào" : "schematic signalling"],
        ]}
        controls={
          <div className="space-y-4">
            <div>
              <p className="caps text-slate-ink">{isVi ? "Thư viện hoạt chất" : "Ligand library"}</p>
              <div className="mt-2 space-y-1.5">
                {LIGANDS.map((l) => {
                  const on = l.id === sel;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => { setSel(l.id); tick(1500); }}
                      className={`flex w-full items-center gap-2.5 rounded-sm border px-2.5 py-2 text-left transition-all duration-200 cursor-pointer ${
                        on ? "border-slate-hair bg-paper shadow-sm" : "border-transparent hover:bg-paper"
                      }`}
                      aria-pressed={on}
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          background: onPaper(l.color),
                          boxShadow: on ? `0 0 9px ${l.color}` : "none",
                        }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.86rem] font-medium leading-tight text-indigo-deep">
                          {isVi ? l.nameVi : l.name}
                        </span>
                        <span className="num block text-[0.66rem] text-slate-ink">{l.formula}</span>
                      </span>
                      <span className="caps shrink-0 font-bold" style={{ color: onPaper(l.color) }}>
                        {l.target}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-hair pt-3">
              <p className="caps text-slate-ink">{isVi ? "Thụ thể tiếp nhận" : "Receptor site"}</p>
              <p className="num mt-1 text-[0.88rem] font-medium text-indigo-deep">
                {isVi ? active.receptorVi : active.receptor}
              </p>
            </div>
          </div>
        }
        telemetry={[
          { key: isVi ? "Đích tác động" : "Target", value: active.target, tone: active.color },
          {
            key: isVi ? "Nút hạ nguồn" : "Downstream nodes",
            value: String(active.downstream.length),
            unit: isVi ? "vị trí" : "reported",
            tone: "#00F2FE",
          },
          {
            key: isVi ? "Chiều tác động" : "Direction",
            value: active.id === "sulforaphane" ? (isVi ? "TĂNG" : "UP") : (isVi ? "GIẢM" : "DOWN"),
            unit: isVi ? "điều hòa" : "regulation",
            tone: active.id === "sulforaphane" ? "#10B981" : "#F59E0B",
          },
          { key: isVi ? "Khoang tế bào" : "Compartment", value: isVi ? "BÀO TƯƠNG→NHÂN" : "CYTO→NUC", tone: "#94A3B8" },
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
                <strong className="text-indigo-deep">{isVi ? active.nameVi : active.name}</strong> →{" "}
                {isVi ? active.noteVi : active.note}
              </motion.span>
            </AnimatePresence>
            <span className="mt-2 block text-[0.79rem] text-slate-ink">
              {isVi ? "Chuỗi tác động hạ nguồn: " : "Downstream: "}
              {(isVi ? active.downstreamVi : active.downstream).join(" · ")}
            </span>
          </>
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
                {isVi ? "💡 Góc Giải Thích Y Khoa Dễ Hiểu" : "💡 Clinical Layman's Intuition Guide"}
              </h4>
              <p className="text-[0.78rem] text-slate-ink">
                {isVi
                  ? "Hiểu sâu bản chất sinh hóa của tế bào qua những hình tượng ẩn dụ thực tế:"
                  : "Decoding complex cellular cascades through intuitive everyday analogies:"}
              </p>
            </div>
          </div>
          <span className="caps text-xs font-mono font-bold text-trace-ink bg-indigo-deep/10 px-2.5 py-1 rounded-sm">
            {active.target} NODE
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-deep font-semibold text-sm">
              <Sparkles size={14} className="text-trace-ink" />
              <span>{isVi ? active.layTitle : active.name + " Mechanism"}</span>
            </div>
            <p className="mt-2.5 text-[0.88rem] leading-relaxed text-indigo-soft">
              {isVi ? active.layAnalogy : active.note}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-ink text-xs caps font-bold">
                <BookOpen size={13} />
                <span>{isVi ? "Ý nghĩa Lâm sàng Thực tế" : "Clinical Application"}</span>
              </div>
              <p className="mt-2 text-[0.85rem] font-medium leading-relaxed text-indigo-deep">
                {isVi ? active.clinicalMeaning : active.downstream.join(", ")}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-hair text-[0.75rem] text-slate-ink font-mono">
              {isVi ? `Nguồn chiết xuất: ${active.sourceVi}` : `Target: ${active.receptor}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({
  active,
  onPick,
  sel,
  isVi,
}: {
  active: Ligand;
  onPick: (id: LigandId) => void;
  sel: LigandId;
  isVi: boolean;
}) {
  return (
    <svg
      viewBox="0 0 760 380"
      class-name="h-auto w-full"
      role="img"
      aria-label={`Cell signalling diagram, ${active.name} targeting ${active.target}`}
    >
      <defs>
        <radialGradient id="cyto" cx="45%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#12233a" />
          <stop offset="100%" stopColor="#08121f" />
        </radialGradient>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={active.color} />
        </marker>
        <marker
          id="arrowmute"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#475569" />
        </marker>
      </defs>

      {/* --- membrane (two leaflets, hand-drawn) --- */}
      <path
        d="M18 56 C 18 30, 46 20, 92 20 L 668 20 C 714 20, 742 32, 742 58 L 742 340 C 742 362, 714 372, 668 372 L 92 372 C 46 372, 18 360, 18 336 Z"
        fill="url(#cyto)"
        stroke="#334155"
        strokeWidth="1.4"
      />
      <path
        d="M18 72 C 18 46, 46 36, 92 36 L 668 36 C 714 36, 742 48, 742 74"
        fill="none"
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      <path
        d="M18 324 C 18 348, 46 356, 92 356 L 668 356 C 714 356, 742 346, 742 322"
        fill="none"
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      <text x="34" y="48" fill="#475569" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.4">
        {isVi ? "MÀNG TẾ BÀO (PLASMA MEMBRANE)" : "PLASMA MEMBRANE"}
      </text>

      {/* --- extracellular ligands (clickable) --- */}
      {LIGANDS.map((l) => {
        const y = l.nodeY;
        const on = l.id === sel;
        return (
          <g
            key={l.id}
            onClick={() => onPick(l.id)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onPick(l.id);
            }}
          >
            <title>{isVi ? l.nameVi : l.name}</title>
            <circle
              cx="70"
              cy={y}
              r={on ? 15 : 12}
              fill="#08121F"
              stroke={l.color}
              strokeWidth={on ? 2.6 : 1.4}
              opacity={on ? 1 : 0.55}
              style={{ transition: "all 300ms" }}
            />
            {on && (
              <circle cx="70" cy={y} r="22" fill="none" stroke={l.color} strokeWidth="1" opacity="0.35" />
            )}
            <text
              x="70"
              y={y + 3.5}
              textAnchor="middle"
              fill={l.color}
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="700"
              opacity={on ? 1 : 0.7}
            >
              {l.name.slice(0, 2).toUpperCase()}
            </text>
            <text
              x="70"
              y={y + 30}
              textAnchor="middle"
              fill={on ? "#e2e8f0" : "#64748b"}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.6"
            >
              {isVi ? l.nameVi.split(" ")[0] : l.name}
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
        <text
          x="263"
          y="200"
          textAnchor="middle"
          fill={active.color}
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          letterSpacing="1.6"
          transform={`rotate(-90 263 200)`}
        >
          {active.target} {isVi ? "THỤ THỂ" : "NODE"}
        </text>
      </g>

      {/* --- cytosolic cascade --- */}
      <path
        d={`M 284 190 C 340 190, 380 ${active.nodeY + 0}, 430 190`}
        fill="none"
        stroke={active.color}
        strokeWidth="2"
        strokeDasharray="9 6"
        markerEnd="url(#arrow)"
        className="animate-[data-flow_2s_linear_infinite]"
        opacity="0.9"
      />

      {active.downstream.map((d, i) => {
        const cx = 470 + i * 74;
        const on = i < 3;
        const dVi = isVi && active.downstreamVi[i] ? active.downstreamVi[i] : d;
        return (
          <g key={d}>
            <motion.rect
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.35 }}
              x={cx - 33}
              y="172"
              width="66"
              height="36"
              rx="3"
              fill="#0b192c"
              stroke={on ? active.color : "#475569"}
              strokeWidth="1"
            />
            <text
              x={cx}
              y={187}
              textAnchor="middle"
              fill={on ? active.color : "#94a3b8"}
              fontSize="11"
              fontFamily="var(--font-mono)"
              fontWeight="700"
            >
              {d.split(" ")[0]}
            </text>
            <text
              x={cx}
              y={200}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="7.6"
              fontFamily="var(--font-mono)"
              letterSpacing="0.4"
            >
              {dVi.slice(2, 16)}
            </text>
            {i < active.downstream.length - 1 && (
              <line
                x1={cx + 33}
                y1="190"
                x2={cx + 41}
                y2="190"
                stroke={active.color}
                strokeWidth="1.4"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}

      {/* --- nucleus --- */}
      <g>
        <ellipse
          cx="666"
          cy="278"
          rx="70"
          ry="58"
          fill="#0b192c"
          stroke={active.color}
          strokeWidth="1.4"
          strokeDasharray="5 4"
        />
        <text
          x="666"
          y="272"
          textAnchor="middle"
          fill={active.color}
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="2.6"
        >
          {isVi ? "NHÂN TẾ BÀO" : "NUCLEUS"}
        </text>
        <text
          x="666"
          y="290"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="1.4"
        >
          {isVi ? "ADN → mARN" : "DNA → mRNA"}
        </text>
        <path
          d={`M 700 240 C 736 246, 736 258, 720 268`}
          fill="none"
          stroke={active.color}
          strokeWidth="2"
          strokeDasharray="6 5"
          markerEnd="url(#arrow)"
          className="animate-[data-flow_2.4s_linear_infinite]"
        />
      </g>

      <text x="34" y="346" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.8">
        {isVi ? "SƠ ĐỒ MÔ PHỎNG — KHÔNG THEO TỶ LỆ TUYỆT ĐỐI" : "SCHEMATIC — NOT TO SCALE"}
      </text>
    </svg>
  );
}
