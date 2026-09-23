"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BiomedicalGizmoContainer } from "./Chassis";
import { LabSlider, useCountUp, useExportPng, exportCsv } from "@/components/ui";
import { BIOMARKERS } from "@/lib/pk";
import { useLanguageStore } from "@/lib/i18n";
import { Lightbulb, Sparkles, BookOpen } from "lucide-react";

const L = 250;
const R = 700;
const W = 760;
const H = 340;

const BIOMARKER_VI: Record<string, { nameVi: string; compVi: string; layAnalogy: string; meaning: string }> = {
  crp: {
    nameVi: "Chỉ số Viêm hs-CRP",
    compVi: "Tinh chất Nghệ Curcumin 1000 mg/ngày",
    layAnalogy: "hs-CRP giống như chiếc 'nhiệt kế báo cháy âm ỉ' trong lòng mạch máu. Chỉ số này càng cao nghĩa là cơ thể đang có những ổ viêm mạn tính gây tổn hại thành mạch và sưng đau khớp.",
    meaning: "Hạ mức viêm toàn thân, phòng ngừa xơ vữa động mạch và giảm đau thoái hóa khớp.",
  },
  glucose: {
    nameVi: "Đường huyết lúc đói (Glucose)",
    compVi: "Berberine 500 mg (3 lần/ngày)",
    layAnalogy: "Đường huyết lúc đói giống như lượng đường còn tồn dư trôi nổi trong máu sau một đêm ngủ dài. Berberine kích hoạt thụ thể AMPK mở cổng tế bào hút đường vào làm nhiên liệu đốt.",
    meaning: "Ổn định đường huyết, tăng độ nhạy insulin và giảm nguy cơ tiến triển thành đái tháo đường.",
  },
  ldl: {
    nameVi: "Mỡ máu xấu LDL-C",
    compVi: "Sterol thực vật (Phytosterols) 2 g/ngày",
    layAnalogy: "LDL-C giống như những chiếc xe chở dầu dễ bị rò rỉ và bốc cháy trên thành mạch máu. Sterol thực vật có cấu trúc tương tự cholesterol nên cạnh tranh hấp thu tại ruột, tống bớt mỡ xấu ra ngoài.",
    meaning: "Giảm nguy cơ lắng đọng mảng xơ vữa và phòng ngừa nhồi máu cơ tim, đột quỵ.",
  },
  tg: {
    nameVi: "Chất béo trung tính Triglycerides",
    compVi: "Dầu cá Omega-3 EPA+DHA 2 g/ngày",
    layAnalogy: "Triglycerides là lượng mỡ thừa tích tụ từ tinh bột và đường chưa kịp tiêu thụ. Omega-3 điều hòa gan ức chế sản xuất mỡ thừa và tăng tốc độ dọn dẹp các hạt mỡ trôi nổi.",
    meaning: "Làm sạch dòng máu, phòng ngừa gan nhiễm mỡ và bảo vệ chức năng tụy tạng.",
  },
};

export default function BiomarkerGizmo() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const [key, setKey] = useState("crp");
  const [base, setBase] = useState<Record<string, number>>(
    Object.fromEntries(BIOMARKERS.map((b) => [b.key, b.def]))
  );

  const spec = BIOMARKERS.find((b) => b.key === key)!;
  const baseline = base[key];
  const viInfo = BIOMARKER_VI[key];

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
    <div className="space-y-6">
      <BiomedicalGizmoContainer
        fig="Gizmo 04"
        title={isVi ? "Dự báo Biến thiên Chỉ số Sinh học (hs-CRP / Lipid)" : "Biomarker Delta Forecaster"}
        subtitle={isVi ? "phân tích gộp meta-analysis từ các thử nghiệm lâm sàng" : "pooled meta-analytic effect sizes"}
        canvas={<DeltaPlot spec={spec} baseline={baseline} pred={pred} W={W} H={H} L={L} R={R} isVi={isVi} />}
        presets={BIOMARKERS.map((b) => ({
          id: b.key,
          label: isVi && BIOMARKER_VI[b.key] ? BIOMARKER_VI[b.key].nameVi.split(" ")[0] : b.name.split(" ")[0],
        }))}
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
          [isVi ? "Chỉ số sinh học" : "Biomarker", isVi ? viInfo.nameVi : spec.name],
          [isVi ? "Mức nền ban đầu" : "Baseline", `${baseline} ${spec.unit}`],
          [isVi ? "Can thiệp thực nghiệm" : "Intervention", isVi ? viInfo.compVi : spec.comparator],
          [isVi ? "Mức thay đổi dự báo" : "Pooled Δ", `${spec.delta} % (95% CI ±${spec.ci})`],
          [isVi ? "Số nghiên cứu gộp" : "Trials pooled", `k = ${spec.k}`],
          [isVi ? "Tổng số người tham gia" : "Participants", `n = ${spec.n}`],
          [isVi ? "Mô hình" : "Model", isVi ? "phân tích gộp thử nghiệm RCT" : "fixed-effect pooled RCT"],
        ]}
        controls={
          <div className="space-y-5">
            <div>
              <p className="caps mb-1.5 text-slate-ink">
                {isVi ? "Chọn chỉ số xét nghiệm" : "Biomarker"}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {BIOMARKERS.map((b) => {
                  const on = b.key === key;
                  const label = isVi && BIOMARKER_VI[b.key] ? BIOMARKER_VI[b.key].nameVi : b.name;
                  return (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setKey(b.key)}
                      aria-pressed={on}
                      className={`caps rounded-sm border px-2 py-2 text-xs transition-all duration-200 cursor-pointer ${
                        on
                          ? "border-indigo-deep bg-indigo-deep text-paper font-bold shadow-xs"
                          : "border-slate-hair bg-paper text-slate-ink hover:border-indigo-deep hover:text-indigo-deep"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <LabSlider
              label={isVi ? `Chỉ số ban đầu · ${viInfo.nameVi}` : `Baseline · ${spec.name}`}
              value={baseline}
              min={spec.min}
              max={spec.max}
              step={spec.step}
              unit={spec.unit}
              display={spec.step < 1 ? baseline.toFixed(1) : String(Math.round(baseline))}
              onChange={(v) => setBase((p) => ({ ...p, [key]: v }))}
              variant="on-paper"
              hint={isVi ? `Khoảng tham chiếu sinh học: ${spec.min}–${spec.max} ${spec.unit}` : `Reference range ${spec.min}–${spec.max} ${spec.unit}`}
            />

            <div className="border-t border-slate-hair pt-3">
              <p className="caps text-slate-ink">{isVi ? "Liệu pháp can thiệp đối chiếu" : "Intervention"}</p>
              <p className="mt-1 text-[0.88rem] font-medium leading-snug text-indigo-deep">
                {isVi ? viInfo.compVi : spec.comparator}
              </p>
              <p className="num mt-1.5 text-[0.72rem] text-slate-ink">
                {isVi
                  ? `Dữ liệu từ k = ${spec.k} thử nghiệm · n = ${spec.n.toLocaleString()} người · Khoảng tin cậy 95% CI ±${spec.ci}%`
                  : `k = ${spec.k} trials · n = ${spec.n.toLocaleString()} · 95% CI ±${spec.ci} %`}
              </p>
            </div>
          </div>
        }
        telemetry={[
          { key: isVi ? "Chỉ số dự báo" : "Predicted value", value: rolled, unit: spec.unit, tone: improved ? "#10B981" : "#F59E0B" },
          { key: isVi ? "Mức biến thiên Δ" : "Δ vs baseline", value: `${pct}`, unit: "%", tone: improved ? "#10B981" : "#F59E0B" },
          { key: isVi ? "Khoảng tin cậy 95%" : "95% CI", value: `${pred.lo.toFixed(spec.step < 1 ? 1 : 0)}–${pred.hi.toFixed(spec.step < 1 ? 1 : 0)}`, unit: spec.unit, tone: "#00F2FE" },
          { key: isVi ? "Quy mô chứng cứ" : "Evidence base", value: `k=${spec.k}`, unit: `n=${spec.n}`, tone: "#94A3B8" },
        ]}
        insight={
          isVi ? (
            <>
              Chỉ số nền ban đầu{" "}
              <span className="num text-indigo-deep">
                {baseline} {spec.unit}
              </span>{" "}
              được dự báo sẽ giảm về mức{" "}
              <span className="num" style={{ color: improved ? "#047857" : "#B45309" }}>
                {rolled} {spec.unit}
              </span>{" "}
              (biến thiên {pct}%) sau đợt can thiệp bằng {viInfo.compVi}. Khoảng tin cậy 95% dao động từ{" "}
              <span className="num text-indigo-deep">
                {pred.lo.toFixed(1)}–{pred.hi.toFixed(1)} {spec.unit}
              </span>
              . Khoảng tin cậy này phản ánh độ phân tán dữ liệu thực tế trích xuất từ {spec.k} thử nghiệm lâm sàng ngẫu nhiên có đối chứng ({spec.n.toLocaleString()} người tham gia).
            </>
          ) : (
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
              . Drawn from {spec.k} randomised trials ({spec.n.toLocaleString()} participants).
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
                {isVi ? `💡 Góc Giải Thích Dễ Hiểu: ${viInfo.nameVi}` : `💡 Clinical Guide: ${spec.name}`}
              </h4>
              <p className="text-[0.78rem] text-slate-ink">
                {isVi
                  ? "Bản chất sinh học và ý nghĩa thực tế của chỉ số xét nghiệm này trong đời sống:"
                  : "Decoding what this biomarker means in daily health and clinical practice:"}
              </p>
            </div>
          </div>
          <span className="caps text-xs font-mono font-bold text-trace-ink bg-indigo-deep/10 px-2.5 py-1 rounded-sm">
            {spec.key.toUpperCase()} MARKER
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-deep font-semibold text-sm">
              <Sparkles size={14} className="text-trace-ink" />
              <span>{isVi ? "Hình tượng Ẩn dụ Dễ hiểu" : "Metaphorical Intuition"}</span>
            </div>
            <p className="mt-2.5 text-[0.88rem] leading-relaxed text-indigo-soft">
              {isVi ? viInfo.layAnalogy : "Pooled effect sizes estimate expected response in real populations."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-ink text-xs caps font-bold">
                <BookOpen size={13} />
                <span>{isVi ? "Tác động Lâm sàng Thực tế" : "Clinical Relevance"}</span>
              </div>
              <p className="mt-2 text-[0.85rem] font-medium leading-relaxed text-indigo-deep">
                {isVi ? viInfo.meaning : "Targeting reduced systemic chronic inflammation and vascular protection."}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-hair text-[0.75rem] text-slate-ink font-mono">
              {isVi ? `Can thiệp đối chứng: ${viInfo.compVi}` : `Comparator: ${spec.comparator}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeltaPlot({
  spec, baseline, pred, W, H, L, R, isVi,
}: {
  spec: { name: string; unit: string; min: number; max: number };
  baseline: number;
  pred: { point: number; lo: number; hi: number };
  W: number; H: number; L: number; R: number;
  isVi: boolean;
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
          {isVi ? "CHỈ SỐ BAN ĐẦU" : "BASELINE"}
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
          {isVi ? "KHOẢNG TIN CẬY 95% CI" : "95 % CI"}
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
        {isVi ? "DỰ BÁO" : "PREDICTED"}
      </text>
      <text x={L - 14} y={mid + 40} textAnchor="end" fill="#475569" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">
        {isVi ? "PHÂN TÍCH GỘP RCT" : "FIXED-EFFECT POOLED"}
      </text>
      <text x={R} y={26} textAnchor="end" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
        {isVi ? "MÔ HÌNH MÔ PHỎNG GIÁO DỤC — KHÔNG THAY THẾ CHẨN ĐOÁN LÂM SÀNG" : "EDUCATIONAL FORECAST — NOT A CLINICAL FORECAST"}
      </text>
    </svg>
  );
}
