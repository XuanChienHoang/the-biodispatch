"use client";

import { useState } from "react";
import { BiomedicalGizmoContainer, type Telemetry } from "@/components/gizmo/Chassis";
import { LabSlider } from "@/components/ui";
import { useLanguageStore } from "@/lib/i18n";
import { Activity, ShieldAlert, Heart, Info, Sparkles, CheckCircle2 } from "lucide-react";

interface TMAOState {
  cholineIntake: number; // mg/day (200 - 1500)
  cutCDAbundance: number; // % (10 - 100)
  fmo3Activity: number; // % (20 - 150)
  dmbInhibitor: number; // µM (0 - 100)
  gfrClearance: number; // mL/min (30 - 120)
}

const PRESETS: Record<string, TMAOState> = {
  mediterranean: {
    cholineIntake: 450,
    cutCDAbundance: 35,
    fmo3Activity: 90,
    dmbInhibitor: 65,
    gfrClearance: 100,
  },
  western: {
    cholineIntake: 1200,
    cutCDAbundance: 85,
    fmo3Activity: 120,
    dmbInhibitor: 0,
    gfrClearance: 95,
  },
  renal_stress: {
    cholineIntake: 750,
    cutCDAbundance: 65,
    fmo3Activity: 100,
    dmbInhibitor: 10,
    gfrClearance: 40,
  },
  dmb_rescue: {
    cholineIntake: 1000,
    cutCDAbundance: 80,
    fmo3Activity: 100,
    dmbInhibitor: 85,
    gfrClearance: 95,
  },
};

export default function TMAOGizmo() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const [state, setState] = useState<TMAOState>(PRESETS.western);
  const [activePreset, setActivePreset] = useState<string>("western");

  // Mathematical Model of Gut-Liver-Heart TMAO Kinetics
  // 1. Bacterial Cleavage: Choline/Carnitine -> TMA via CutC/D, inhibited competitively by DMB
  // DMB IC50 ≈ 22 µM
  const dmbInhibitionFraction = state.dmbInhibitor / (state.dmbInhibitor + 22);
  const effectiveCutCD = (state.cutCDAbundance / 100) * (1 - dmbInhibitionFraction * 0.88);
  const tmaMicrobialYield = (state.cholineIntake * effectiveCutCD * 0.38) / 100; // arbitrary unit scaling

  // 2. Hepatic FMO3 Oxidation: TMA -> TMAO
  const tmaoLiverSynthesis = tmaMicrobialYield * (state.fmo3Activity / 100) * 1.15;

  // 3. Renal Clearance & Serum Equilibrium Concentration (µmol/L)
  // Normal reference baseline < 6.2 µmol/L (Tang et al., NEJM 2013)
  const gfrFactor = Math.max(0.3, state.gfrClearance / 95);
  const plasmaTMAO = Number(Math.max(1.2, (tmaoLiverSynthesis / gfrFactor) * 2.8).toFixed(1));

  // 4. Clinical Atheroma Biomarkers
  // CD36 Scavenger Receptor Activation on Macrophages (%)
  const cd36Activation = Math.min(100, Math.round(plasmaTMAO * 6.2));

  // Foam Cell Formation Rate & Plaque Accumulation Index (0 - 100)
  const plaqueIndex = Math.min(
    95,
    Math.round(plasmaTMAO <= 6.2 ? plasmaTMAO * 4.5 : 28 + (plasmaTMAO - 6.2) * 5.8)
  );

  // MACE Relative Risk / Hazard Ratio (HR) based on Cleveland Clinic cohorts (Tang et al.)
  const maceHazardRatio = Number(
    Math.max(1.0, 1.0 + (plasmaTMAO > 6.2 ? (plasmaTMAO - 6.2) * 0.12 : 0)).toFixed(2)
  );

  // Arterial Cross-Section Lumen Remaining (%)
  const arterialLumen = Math.max(25, 100 - Math.round(plaqueIndex * 0.72));

  // Status Color Tone
  const riskTone =
    plasmaTMAO < 6.2
      ? "text-syn-ink"
      : plasmaTMAO < 10.0
      ? "text-plasma-ink"
      : "text-[#FF4A4A]";

  const telemetry: Telemetry[] = [
    {
      key: isVi ? "TMAO Huyết tương" : "Plasma TMAO",
      value: `${plasmaTMAO}`,
      unit: "µmol/L",
      tone: riskTone,
    },
    {
      key: isVi ? "Kích hoạt Thụ thể CD36" : "CD36 Activation",
      value: `${cd36Activation}`,
      unit: "%",
    },
    {
      key: isVi ? "Tỉ số Nguy cơ MACE" : "MACE Hazard Ratio",
      value: `${maceHazardRatio}×`,
      unit: isVi ? "nguy cơ biến cố" : "relative risk",
      tone: maceHazardRatio > 1.4 ? "text-[#FF4A4A]" : "text-syn-ink",
    },
    {
      key: isVi ? "Lòng Mạch Thông thoáng" : "Arterial Lumen",
      value: `${arterialLumen}`,
      unit: "%",
    },
  ];

  const presets = [
    { id: "mediterranean", label: isVi ? "Địa Trung Hải (Dầu Ô liu)" : "Mediterranean (EVOO)" },
    { id: "western", label: isVi ? "Chế độ Thịt đỏ Phổ thông" : "High Red Meat Western" },
    { id: "renal_stress", label: isVi ? "Suy giảm Thận (eGFR 40)" : "Renal Impairment" },
    { id: "dmb_rescue", label: isVi ? "Can thiệp DMB Ức chế" : "DMB Microbial Block" },
  ];

  return (
    <BiomedicalGizmoContainer
      fig="GIZMO 05 · TMAO AXIS"
      title={isVi ? "Trục TMAO Tim - Gan - Ruột & Thác Xơ vữa Động mạch" : "Gut-Liver TMAO Axis & Atheroma Cascade"}
      subtitle={
        isVi
          ? "Mô phỏng chuyển hóa Choline thành TMA qua vi khuẩn, oxy hóa FMO3 tại gan và mảng xơ vữa"
          : "Bacterial CutC/D cleavage, hepatic FMO3 oxidation, CD36 scavenger cascade & atheroma risk"
      }
      presets={presets}
      activePreset={activePreset}
      onPreset={(id) => {
        setActivePreset(id);
        if (PRESETS[id]) setState(PRESETS[id]);
      }}
      onReset={() => {
        setActivePreset("western");
        setState(PRESETS.western);
      }}
      telemetry={telemetry}
      citeParams={[
        ["Choline Intake", `${state.cholineIntake} mg/d`],
        ["CutC/D Abundance", `${state.cutCDAbundance}%`],
        ["FMO3 Activity", `${state.fmo3Activity}%`],
        ["DMB Inhibitor", `${state.dmbInhibitor} µM`],
        ["eGFR Clearance", `${state.gfrClearance} mL/min`],
        ["Predicted Plasma TMAO", `${plasmaTMAO} µmol/L`],
        ["MACE Hazard Ratio", `${maceHazardRatio}x`],
      ]}
      canvas={
        <div className="space-y-6">
          {/* Main Visual: 3-Compartment Organ Flow SVG */}
          <div className="rounded-sm border border-slate-hair bg-[#0B1524] p-5 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <span className="caps text-[0.72rem] text-trace font-mono font-semibold">
                {isVi ? "SƠ ĐỒ DÒNG CHUYỂN HÓA 3 CƠ QUAN THỜI GIAN THỰC" : "REAL-TIME 3-ORGAN METABOLIC CASCADE"}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        plasmaTMAO < 6.2 ? "#10B981" : plasmaTMAO < 10 ? "#F59E0B" : "#FF4A4A",
                    }}
                  />
                  <span className="font-mono text-[0.7rem] text-slate-300">
                    {plasmaTMAO < 6.2
                      ? isVi
                        ? "Ngưỡng An toàn (<6.2 µM)"
                        : "Optimal (<6.2 µM)"
                      : plasmaTMAO < 10
                      ? isVi
                        ? "Nguy cơ Trung bình (6.2 - 10 µM)"
                        : "Moderate Risk"
                      : isVi
                      ? "Nguy cơ Tim mạch Cao (>10 µM)"
                      : "High MACE Risk"}
                  </span>
                </span>
              </div>
            </div>

            <svg viewBox="0 0 760 260" className="mt-4 w-full" fill="none">
              <defs>
                <linearGradient id="gutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="arteryBlood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#991B1B" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="plaqueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* ZONE 1: Lòng Ruột (Gut Lumen) */}
              <g transform="translate(15, 20)">
                <rect x="0" y="0" width="220" height="210" rx="4" fill="url(#gutGradient)" stroke="#334155" strokeWidth="1.2" />
                <rect x="0" y="0" width="220" height="26" rx="4" fill="#1E293B" />
                <text x="12" y="17" fill="#00F2FE" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                  {isVi ? "1. LÒNG RUỘT (GUT LUMEN)" : "1. GUT MICROBIOTA"}
                </text>

                {/* Substrate in */}
                <text x="12" y="50" fill="#94A3B8" fontSize="9.5" fontFamily="sans-serif">
                  {isVi ? "Khẩu phần Choline/Carnitine:" : "Choline/Carnitine Diet:"}
                </text>
                <text x="12" y="66" fill="#F8FAFC" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  {state.cholineIntake} mg/ngày
                </text>

                {/* Enzyme CutC/D */}
                <rect x="12" y="80" width="196" height="42" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
                <text x="20" y="96" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Enzyme CutC/D ({state.cutCDAbundance}% khuẩn)
                </text>
                <text x="20" y="112" fill={state.dmbInhibitor > 30 ? "#10B981" : "#94A3B8"} fontSize="8.5" fontFamily="sans-serif">
                  {state.dmbInhibitor > 0
                    ? isVi
                      ? `Ức chế bởi DMB: -${Math.round(dmbInhibitionFraction * 88)}%`
                      : `DMB Blockade: -${Math.round(dmbInhibitionFraction * 88)}%`
                    : isVi
                    ? "Không có chất ức chế DMB"
                    : "No DMB inhibitor active"}
                </text>

                {/* Generated TMA */}
                <path d="M110 125 L110 148" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="110,154 106,146 114,146" fill="#F59E0B" />
                <rect x="12" y="156" width="196" height="40" rx="3" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
                <text x="20" y="172" fill="#CBD5E1" fontSize="9" fontFamily="sans-serif">
                  {isVi ? "Khí Trimethylamine sinh ra:" : "Microbial TMA Output:"}
                </text>
                <text x="20" y="188" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  TMA: {Math.round(tmaMicrobialYield * 10)} nmol/h
                </text>
              </g>

              {/* INTER-ORGAN ARROW: Portal Vein */}
              <g transform="translate(240, 110)">
                <line x1="0" y1="15" x2="32" y2="15" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 3" />
                <polygon points="38,15 28,10 28,20" fill="#F59E0B" />
                <text x="2" y="6" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                  {isVi ? "TĨNH MẠCH CỬA" : "PORTAL"}
                </text>
              </g>

              {/* ZONE 2: Gan (Hepatic FMO3 Oxidation) */}
              <g transform="translate(285, 20)">
                <rect x="0" y="0" width="200" height="210" rx="4" fill="url(#gutGradient)" stroke="#334155" strokeWidth="1.2" />
                <rect x="0" y="0" width="200" height="26" rx="4" fill="#1E293B" />
                <text x="12" y="17" fill="#10B981" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                  {isVi ? "2. GAN (HEPATIC FMO3)" : "2. LIVER METABOLISM"}
                </text>

                <text x="12" y="50" fill="#94A3B8" fontSize="9.5" fontFamily="sans-serif">
                  {isVi ? "Enzyme oxy hóa Flavin:" : "Hepatic Oxygenase:"}
                </text>
                <text x="12" y="66" fill="#10B981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  FMO3 ({state.fmo3Activity}%)
                </text>

                {/* Conversion Equation Graphic */}
                <rect x="12" y="80" width="176" height="42" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="18" y="98" fill="#F8FAFC" fontSize="9" fontFamily="monospace">
                  TMA + O₂ ➔ TMAO
                </text>
                <text x="18" y="112" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">
                  {isVi ? "Oxy hóa chuyển đổi nhanh" : "Rapid enzymatic monooxygenation"}
                </text>

                {/* Renal Clearance box */}
                <path d="M100 125 L100 148" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="100,154 96,146 104,146" fill="#10B981" />
                <rect x="12" y="156" width="176" height="40" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
                <text x="18" y="172" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">
                  {isVi ? "Lọc cầu thận eGFR:" : "Renal eGFR Clearance:"}
                </text>
                <text x="18" y="188" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  {state.gfrClearance} mL/min
                </text>
              </g>

              {/* INTER-ORGAN ARROW: Systemic Circulation */}
              <g transform="translate(490, 110)">
                <line x1="0" y1="15" x2="30" y2="15" stroke="#FF4A4A" strokeWidth="2.5" strokeDasharray="5 3" />
                <polygon points="36,15 26,10 26,20" fill="#FF4A4A" />
                <text x="0" y="6" fill="#FF6B4A" fontSize="8" fontFamily="monospace">
                  TMAO
                </text>
              </g>

              {/* ZONE 3: Lòng Mạch Vành & Mảng Xơ Vữa (Atheroma Plaque) */}
              <g transform="translate(530, 20)">
                <rect x="0" y="0" width="215" height="210" rx="4" fill="url(#gutGradient)" stroke="#334155" strokeWidth="1.2" />
                <rect x="0" y="0" width="215" height="26" rx="4" fill="#1E293B" />
                <text x="12" y="17" fill="#FF6B4A" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                  {isVi ? "3. NỘI MÔ MẠCH VÀNH" : "3. CORONARY ATHEROMA"}
                </text>

                {/* Artery Cross Section Visual */}
                <g transform="translate(108, 92)">
                  {/* Outer artery wall */}
                  <circle cx="0" cy="0" r="48" fill="#450A0A" stroke="#DC2626" strokeWidth="3" />
                  {/* Lumen blood flow */}
                  <circle
                    cx="0"
                    cy="0"
                    r={Math.max(14, 42 - plaqueIndex * 0.32)}
                    fill="url(#arteryBlood)"
                  />
                  {/* Plaque accumulation crescent */}
                  {plaqueIndex > 15 && (
                    <path
                      d={`M -38 0 A 38 38 0 0 1 38 0 A ${Math.max(
                        10,
                        38 - plaqueIndex * 0.35
                      )} 26 0 0 0 -38 0 Z`}
                      fill="url(#plaqueGrad)"
                      opacity="0.9"
                    />
                  )}
                  {/* Central lumen text */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {arterialLumen}%
                  </text>
                </g>

                <text x="12" y="160" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">
                  {isVi ? "Thụ thể Đại thực bào CD36:" : "CD36 Scavenger Uptake:"}
                </text>
                <text x="12" y="176" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  {cd36Activation}% {isVi ? "tế bào bọt tích tụ" : "foam cell cascade"}
                </text>

                <text x="12" y="196" fill="#EF4444" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                  MACE HR: {maceHazardRatio}× {isVi ? "nguy cơ biến cố" : "risk"}
                </text>
              </g>
            </svg>
          </div>

          {/* Clinical Telemetry Bar Meter */}
          <div className="rounded-sm border border-slate-hair bg-paper p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="caps font-semibold text-slate-ink">
                {isVi ? "Thước đo Nồng độ TMAO Huyết thanh & Cảnh báo Nguy cơ" : "Serum TMAO Risk Stratification"}
              </span>
              <span className="font-mono text-indigo-deep font-bold">
                {plasmaTMAO} µmol/L
              </span>
            </div>

            <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-hair">
              {/* Green zone < 6.2 */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#10B981]"
                style={{ width: "31%" }}
                title="Tối ưu < 6.2 µM"
              />
              {/* Yellow zone 6.2 - 10 */}
              <div
                className="absolute top-0 bottom-0 bg-[#F59E0B]"
                style={{ left: "31%", width: "19%" }}
                title="Trung bình 6.2 - 10 µM"
              />
              {/* Red zone > 10 */}
              <div
                className="absolute top-0 bottom-0 bg-[#FF4A4A]"
                style={{ left: "50%", right: "0" }}
                title="Nguy cơ cao > 10 µM"
              />

              {/* Cursor indicator */}
              <div
                className="absolute top-0 bottom-0 w-1.5 -ml-0.75 bg-indigo-deep shadow-md transition-all duration-300"
                style={{
                  left: `${Math.min(98, Math.max(2, (plasmaTMAO / 20) * 100))}%`,
                }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[0.7rem] font-mono text-slate-ink">
              <span>0 µM ({isVi ? "Tối ưu" : "Optimal"})</span>
              <span>6.2 µM ({isVi ? "Ngưỡng Tang et al." : "NEJM Threshold"})</span>
              <span>10.0 µM ({isVi ? "Nguy cơ cao" : "High Risk"})</span>
              <span>20+ µM</span>
            </div>
          </div>
        </div>
      }
      controls={
        <div className="space-y-5">
          <div>
            <LabSlider
              label={isVi ? "Khẩu phần Choline/Carnitine nạp vào" : "Dietary Choline & L-Carnitine"}
              min={200}
              max={1500}
              step={25}
              value={state.cholineIntake}
              onChange={(v) => setState((s) => ({ ...s, cholineIntake: v }))}
              unit="mg/d"
            />
            <p className="mt-1 text-[0.72rem] text-slate-ink">
              {isVi
                ? "Nguồn từ thịt đỏ (bò, cừu), lòng đỏ trứng gà và đạm động vật."
                : "Sources: beef, lamb, egg yolks, and organ meats."}
            </p>
          </div>

          <div>
            <LabSlider
              label={isVi ? "Mật độ Vi khuẩn mang Enzyme CutC/D" : "CutC/D Microbiota Abundance"}
              min={10}
              max={100}
              step={5}
              value={state.cutCDAbundance}
              onChange={(v) => setState((s) => ({ ...s, cutCDAbundance: v }))}
              unit="%"
            />
            <p className="mt-1 text-[0.72rem] text-slate-ink">
              {isVi
                ? "Tỉ lệ vi khuẩn chuyển hóa Choline thành khí độc TMA trong đại tràng."
                : "Proportion of colonic taxa carrying the choline trimethylamine-lyase gene."}
            </p>
          </div>

          <div>
            <LabSlider
              label={isVi ? "Chất ức chế Vi sinh DMB (từ Dầu Ô liu)" : "Microbial Inhibitor DMB (EVOO)"}
              min={0}
              max={100}
              step={5}
              value={state.dmbInhibitor}
              onChange={(v) => setState((s) => ({ ...s, dmbInhibitor: v }))}
              unit="µM"
            />
            <p className="mt-1 text-[0.72rem] text-slate-ink">
              {isVi
                ? "3,3-Dimethyl-1-butanol (DMB) trong dầu ô liu khóa chọn lọc enzyme CutC/D."
                : "Non-lethal CutC/D competitive inhibitor found in extra-virgin olive oil & balsamic vinegar."}
            </p>
          </div>

          <div>
            <LabSlider
              label={isVi ? "Hoạt lực Enzyme FMO3 tại Gan" : "Hepatic FMO3 Activity"}
              min={20}
              max={150}
              step={5}
              value={state.fmo3Activity}
              onChange={(v) => setState((s) => ({ ...s, fmo3Activity: v }))}
              unit="%"
            />
            <p className="mt-1 text-[0.72rem] text-slate-ink">
              {isVi
                ? "Flavin-containing monooxygenase 3: enzyme gan oxy hóa TMA thành TMAO."
                : "Hepatic enzyme responsible for monooxygenation of portal TMA."}
            </p>
          </div>

          <div>
            <LabSlider
              label={isVi ? "Độ lọc Cầu thận (eGFR Thải trừ)" : "Renal eGFR Clearance"}
              min={30}
              max={120}
              step={5}
              value={state.gfrClearance}
              onChange={(v) => setState((s) => ({ ...s, gfrClearance: v }))}
              unit="mL/min"
            />
            <p className="mt-1 text-[0.72rem] text-slate-ink">
              {isVi
                ? "Thận lọc và đào thải TMAO ra nước tiểu; thận yếu khiến TMAO ứ đọng cao."
                : "Primary excretion route; renal insufficiency causes severe systemic accumulation."}
            </p>
          </div>
        </div>
      }
      insight={
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-sm border border-slate-hair bg-paper-tint p-4">
            <Info size={18} className="mt-0.5 shrink-0 text-trace-ink" />
            <div className="text-xs leading-relaxed text-indigo-soft">
              <strong className="text-indigo-deep">
                {isVi ? "Ý nghĩa Lâm sàng Thực chứng:" : "Empirical Clinical Insight:"}
              </strong>{" "}
              {isVi ? (
                <>
                  Nghiên cứu mang tính bước ngoặt của Tang et al. trên 4.007 bệnh nhân tim mạch tại Cleveland Clinic
                  (công bố trên <em>The New England Journal of Medicine</em>, 2013) chứng minh rằng: nồng độ TMAO trong máu
                  vượt ngưỡng <strong>6.2 µmol/L</strong> làm tăng <strong>2.54 lần</strong> nguy cơ nhồi máu cơ tim, đột quỵ và
                  tử vong do tim mạch độc lập với các yếu tố nguy cơ truyền thống như LDL-C hay huyết áp.
                </>
              ) : (
                <>
                  The landmark Cleveland Clinic study of 4,007 patients by Tang et al. (published in <em>NEJM</em>, 2013) demonstrated
                  that elevated plasma TMAO above <strong>6.2 µmol/L</strong> confers a <strong>2.54-fold higher hazard</strong> of major
                  adverse cardiac events (MACE), completely independent of standard Framingham risk factors and LDL-C.
                </>
              )}
            </div>
          </div>

          {/* Layman Guide - Góc Giải Thích Dễ Hiểu */}
          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-5">
            <div className="flex items-center gap-2 text-indigo-deep">
              <Sparkles size={16} className="text-trace-ink" />
              <h4 className="font-display text-[0.98rem] font-bold">
                {isVi ? "💡 Góc Giải Thích Dễ Hiểu Về Trục TMAO" : "💡 Layman Intuition: How Gut Bacteria Damage Arteries"}
              </h4>
            </div>

            <div className="mt-3 space-y-3 text-xs leading-relaxed text-indigo-soft">
              <div>
                <p className="font-semibold text-indigo-deep">
                  {isVi
                    ? "1. TMAO là gì và tại sao tim mạch lại sợ nó?"
                    : "1. What is TMAO and why is it dangerous for the heart?"}
                </p>
                <p className="mt-0.5">
                  {isVi
                    ? "Choline trong trứng và Carnitine trong thịt bò là những dưỡng chất tốt. Nhưng nếu ruột có quá nhiều vi khuẩn mang enzyme CutC/D, chúng sẽ 'chặt' dưỡng chất này thành khí TMA (có mùi tanh). Khí này vào gan bị oxy hóa thành TMAO – một chất kích thích mạch máu tích tụ mỡ xơ vữa."
                    : "Choline and carnitine in eggs and beef are essential nutrients. However, when metabolized by specific colonic bacteria, they are converted into foul-smelling TMA gas, which the liver oxidizes into TMAO, a compound that accelerates arterial plaque formation."}
                </p>
              </div>

              <div>
                <p className="font-semibold text-indigo-deep">
                  {isVi
                    ? "2. Chiếc 'máy dọn rác' bị biến chất (Thụ thể CD36 & Tế bào bọt):"
                    : "2. The corrupted scavenger: CD36 & Foam Cells"}
                </p>
                <p className="mt-0.5">
                  {isVi
                    ? "Bình thường, đại thực bào trong thành mạch dọn dẹp các phân tử mỡ thừa một cách có kiểm soát. Khi TMAO tăng cao, nó kích hoạt thụ thể CD36 khiến đại thực bào 'ăn mỡ' mất kiểm soát đến mức tự phình to thành các tế bào bọt (foam cells), chết đi và tạo thành mảng xơ vữa gây tắc hẹp mạch vành."
                    : "Under normal conditions, macrophages clear excess lipids in a regulated fashion. Elevated TMAO supercharges macrophage CD36 scavenger receptors, causing them to engorge on oxLDL until they transform into lipid-laden foam cells, the cellular hallmark of atherosclerotic plaque."}
                </p>
              </div>

              <div>
                <p className="font-semibold text-indigo-deep">
                  {isVi
                    ? "3. Dầu ô liu nguyên chất (DMB) giải cứu như thế nào?"
                    : "3. How Extra-Virgin Olive Oil (DMB) rescues the system"}
                </p>
                <p className="mt-0.5">
                  {isVi
                    ? "Trong dầu ô liu nguyên chất và giấm balsamic có một hoạt chất tự nhiên tên là DMB (3,3-Dimethyl-1-butanol). DMB đóng vai trò như 'chiếc nắp đậy', khóa chặt miệng enzyme CutC/D của vi khuẩn để chúng không tạo ra TMA nữa mà không cần phải dùng kháng sinh tiêu diệt vi khuẩn có lợi."
                    : "Extra-virgin olive oil and balsamic vinegar contain a natural structural analog called DMB. DMB non-lethally blocks the active pocket of bacterial CutC/D enzymes, preventing TMA generation without disrupting beneficial gut flora."}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
