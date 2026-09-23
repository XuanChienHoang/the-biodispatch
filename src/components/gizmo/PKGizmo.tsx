"use client";

import { useMemo, useState } from "react";
import { BiomedicalGizmoContainer, type Telemetry } from "./Chassis";
import { LabSlider, Segmented, useExportPng, exportCsv } from "@/components/ui";
import { simulate, FORM_META, type Form, type Food, BASE_KEL } from "@/lib/pk";
import { useLanguageStore } from "@/lib/i18n";
import { Lightbulb, Sparkles, BookOpen } from "lucide-react";

const W = 760;
const H = 380;
const L = 62;
const R = 744;
const T = 22;
const B = 322;

export default function PKGizmo() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  const [dose, setDose] = useState(500);
  const [form, setForm] = useState<Form>("standard");
  const [food, setFood] = useState<Food>("fasting");
  const [preset, setPreset] = useState("standard");

  const res = useMemo(() => simulate({ doseMg: dose, form, food }), [dose, form, food]);

  const yMax = useMemo(() => {
    const peak = Math.max(res.cmax, 0.05);
    const mag = Math.pow(10, Math.floor(Math.log10(peak)));
    return Math.ceil((peak * 1.18) / (mag / 2)) * (mag / 2);
  }, [res.cmax]);

  const x = (t: number) => L + (t / 24) * (R - L);
  const y = (c: number) => B - (c / yMax) * (B - T);

  const path = useMemo(() => {
    let d = `M ${x(0).toFixed(2)} ${y(0).toFixed(2)}`;
    for (let i = 1; i < res.points.length; i += 3) {
      d += ` L ${x(res.points[i].t).toFixed(2)} ${y(res.points[i].c).toFixed(2)}`;
    }
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res, yMax]);

  const area = `${path} L ${x(24).toFixed(2)} ${y(0).toFixed(2)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);
  const xTicks = [0, 4, 8, 12, 16, 20, 24];

  const exportPng = useExportPng();

  const t: Telemetry[] = [
    { key: isVi ? "Nồng độ đỉnh (Cmax)" : "Cmax", value: res.cmax.toFixed(3), unit: "µg/mL", tone: "#00F2FE" },
    { key: isVi ? "Thời gian đỉnh (Tmax)" : "Tmax", value: res.tmax.toFixed(1), unit: "h", tone: "#00F2FE" },
    { key: isVi ? "Thời gian bán thải (t½)" : "t½", value: res.halfLife.toFixed(1), unit: "h", tone: "#10B981" },
    { key: isVi ? "Lượng hấp thu (AUC₀₋₂₄)" : "AUC₀₋₂₄", value: res.auc.toFixed(2), unit: "µg·h/mL", tone: "#F59E0B" },
  ];

  return (
    <div className="space-y-6">
      <BiomedicalGizmoContainer
        fig="Gizmo 01"
        title={isVi ? "Mô phỏng Dược động học & Sinh khả dụng" : "Pharmacokinetics & Bioavailability"}
        subtitle={isVi ? "mô hình 1 ngăn · hấp thu động học bậc một" : "1-compartment · first-order absorption"}
        canvas={
          <Plot
            path={path}
            area={area}
            res={res}
            yMax={yMax}
            x={x}
            y={y}
            yTicks={yTicks}
            xTicks={xTicks}
            dose={dose}
            form={FORM_META[form].label}
            isVi={isVi}
          />
        }
        presets={[
          { id: "standard", label: isVi ? "Chiết xuất chuẩn (Đói)" : "Standard extract" },
          { id: "liposomal", label: isVi ? "Bọc Liposome tối ưu" : "Optimal absorption" },
          { id: "highfat", label: isVi ? "Bữa ăn giàu chất béo" : "High-fat scenario" },
          { id: "megadose", label: isVi ? "Liều cao 2000 mg" : "Megadose 2 g" },
        ]}
        activePreset={preset}
        onPreset={(id) => {
          setPreset(id);
          if (id === "standard") { setDose(500); setForm("standard"); setFood("fasting"); }
          if (id === "liposomal") { setDose(500); setForm("liposomal"); setFood("fasting"); }
          if (id === "highfat") { setDose(500); setForm("standard"); setFood("highfat"); }
          if (id === "megadose") { setDose(2000); setForm("standard"); setFood("fasting"); }
        }}
        onReset={() => { setDose(500); setForm("standard"); setFood("fasting"); setPreset("standard"); }}
        onExport={() => {
          exportPng("pk-chart", "biodispatch-pk-curve");
          exportCsv(
            [["t_h", "conc_ug_ml"], ...res.points.filter((_, i) => i % 8 === 0).map((p) => [p.t.toFixed(2), p.c.toFixed(4)])],
            "pk-curve"
          );
        }}
        citeParams={[
          [isVi ? "Liều lượng" : "Dose", `${dose} mg`],
          [isVi ? "Dạng bào chế" : "Form", FORM_META[form].label],
          [isVi ? "Tình trạng ăn" : "Food state", food === "fasting" ? (isVi ? "Lúc đói" : "Fasting") : (isVi ? "Sau ăn béo" : "High-fat meal")],
          [isVi ? "Hệ số hấp thu F" : "F", res.F.toFixed(4)],
          [isVi ? "Hằng số hấp thu ka" : "ka", `${res.ka.toFixed(2)} h⁻¹`],
          [isVi ? "Hằng số đào thải ke" : "ke", `${res.kel.toFixed(3)} h⁻¹`],
          [isVi ? "Mô hình" : "Model", isVi ? "1 ngăn bậc một" : "1-cpt first-order"],
        ]}
        controls={
          <div className="space-y-5">
            <LabSlider
              label={isVi ? "Liều lượng uống" : "Dose"}
              value={dose}
              min={50}
              max={2000}
              step={25}
              unit="mg"
              onChange={(v) => { setDose(v); setPreset(""); }}
            />
            <Segmented
              label={isVi ? "Dạng bào chế" : "Delivery form"}
              value={form}
              onChange={(v) => { setForm(v); setPreset(""); }}
              options={[
                { value: "standard", label: isVi ? "Chuẩn" : "Std extract" },
                { value: "micronized", label: isVi ? "Vi hạt" : "Micronized" },
                { value: "liposomal", label: isVi ? "Liposome" : "Liposomal" },
              ]}
            />
            <Segmented
              label={isVi ? "Tình trạng dạ dày" : "Food intake"}
              value={food}
              onChange={(v) => { setFood(v); setPreset(""); }}
              tone="#10B981"
              options={[
                { value: "fasting", label: isVi ? "Lúc đói" : "Fasting" },
                { value: "highfat", label: isVi ? "Ăn no béo" : "High-fat meal" },
              ]}
            />
            <div className="border-t border-slate-hair pt-3">
              <p className="caps text-slate-ink">{isVi ? "Ghi chú sinh khả dụng" : "Formulation note"}</p>
              <p className="mt-1.5 text-[0.76rem] leading-relaxed text-indigo-soft">
                {isVi ? (
                  form === "liposomal"
                    ? "Màng phospholipid kép bảo vệ hoạt chất khỏi axit dạ dày. Sinh khả dụng F = " + (res.F * 100).toFixed(1) + "%."
                    : form === "micronized"
                    ? "Nghiền siêu mịn tăng diện tích tiếp xúc niêm mạc ruột. F = " + (res.F * 100).toFixed(1) + "%."
                    : "Chiết xuất thô tự nhiên, độ hòa tan kém. F = " + (res.F * 100).toFixed(1) + "%."
                ) : (
                  `${FORM_META[form].note}. F = ${(res.F * 100).toFixed(1)}%`
                )}
                {food === "highfat" && (isVi ? " · +Kích hoạt hấp thu theo đường bạch huyết (Chylomicron)." : " · +lipid-triggered chylomicron transport")}
              </p>
            </div>
          </div>
        }
        telemetry={t}
        insight={
          isVi ? (
            <>
              Nồng độ dược chất trong máu tuân theo phương trình dược động học:{" "}
              <span className="num text-indigo-deep">
                C(t) = F·D·kₐ / (V(kₐ−kₑ)) · (e^{`−kₑt`} − e^{`−kₐt`})
              </span>{" "}
              với hằng số đào thải kₑ được cố định ở mức {BASE_KEL} h⁻¹ (thời gian bán thải t½ {res.halfLife.toFixed(1)} giờ). Dải hiệu quả điều trị tối thiểu được đặt ở mức 12% Cmax — một công thức bào chế được đánh giá cao khi nó duy trì nồng độ ổn định trong dải này suốt nhiều giờ chứ không phải là đỉnh vọt lên rồi tụt dốc tức thì.
            </>
          ) : (
            <>
              Serum concentration follows{" "}
              <span className="num text-indigo-deep">
                C(t) = F·D·kₐ / (V(kₐ−kₑ)) · (e^{`−kₑt`} − e^{`−kₐt`})
              </span>{" "}
              with kₑ fixed at {BASE_KEL} h⁻¹ (t½ {res.halfLife.toFixed(1)} h). The therapeutic band is
              drawn at 12% of Cmax — a formulation is judged by whether it enters that band <em>at all</em>,
              not by how high it spikes. Native curcuminoids at {dose} mg reach{" "}
              <span className="num text-trace">{res.cmax.toFixed(3)} µg/mL</span>; the same dose as a
              liposomal complex would clear the floor by roughly an order of magnitude.
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
                {isVi ? "💡 Góc Giải Thích Dược Động Học Dễ Hiểu" : "💡 Pharmacokinetics Layman Guide"}
              </h4>
              <p className="text-[0.78rem] text-slate-ink">
                {isVi
                  ? "Bốn chỉ số vàng quyết định một viên thuốc hay thực phẩm bổ sung có thực sự phát huy tác dụng:"
                  : "Four essential clinical indicators that decide whether an active compound works:"}
              </p>
            </div>
          </div>
          <span className="caps text-xs font-mono font-bold text-trace-ink bg-indigo-deep/10 px-2.5 py-1 rounded-sm">
            1-COMPARTMENT PK
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-deep">
              <Sparkles size={13} className="text-trace-ink" />
              <span>Cmax · Nồng độ đỉnh</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Giống như 'tốc độ tối đa' mà chiếc xe có thể đạt được. Cmax càng cao thì lượng hoạt chất thấm vào máu trong một thời điểm càng mạnh."
                : "The peak serum concentration reached after single administration."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-deep">
              <Sparkles size={13} className="text-trace-ink" />
              <span>Tmax · Thời gian lên đỉnh</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Thời gian từ lúc nuốt viên uống đến khi nồng độ đạt đỉnh cao nhất. Uống lúc đói giúp Tmax đến sớm hơn, sau ăn no làm chậm hấp thu."
                : "Time elapsed from intake until peak concentration is achieved in bloodstream."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-deep">
              <Sparkles size={13} className="text-trace-ink" />
              <span>t½ · Thời gian bán thải</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Thời gian để cơ thể đào thải một nửa lượng hoạt chất trong máu. t½ càng dài thì bạn càng ít phải uống nhắc lại nhiều lần trong ngày."
                : "Time required for half of the active drug to be cleared by hepatic/renal systems."}
            </p>
          </div>

          <div className="rounded-sm border border-indigo-deep/15 bg-paper p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-deep">
              <Sparkles size={13} className="text-trace-ink" />
              <span>AUC · Diện tích dưới đường cong</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-indigo-soft">
              {isVi
                ? "Thước đo tổng lượng hoạt chất cơ thể thực sự hấp thu và sử dụng được suốt cả ngày. Đây là con số quan trọng nhất của một sản phẩm."
                : "Total systemic drug exposure across 24 hours. The most crucial bioavailability metric."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlotProps {
  path: string;
  area: string;
  res: { cmax: number; tmax: number; kel: number };
  yMax: number;
  x: (t: number) => number;
  y: (c: number) => number;
  yTicks: number[];
  xTicks: number[];
  dose: number;
  form: string;
  isVi: boolean;
}

function Plot({ path, area, res, yMax, x, y, yTicks, xTicks, dose, form, isVi }: PlotProps) {
  void yMax;
  const cmaxX = x(res.tmax);
  const cmaxY = y(res.cmax);
  const bandY = y(res.cmax * 0.12);
  return (
    <svg
      id="pk-chart"
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Serum concentration curve, Cmax ${res.cmax.toFixed(3)} micrograms per millilitre at ${res.tmax.toFixed(1)} hours`}
    >
      <defs>
        <linearGradient id="pk-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
        </linearGradient>
        <clipPath id="pk-clip"><rect x={L} y={T - 6} width={R - L} height={B - T + 6} /></clipPath>
      </defs>

      {/* therapeutic window band */}
      <rect x={L} y={bandY} width={R - L} height={B - bandY} fill="#F59E0B" opacity="0.10" />
      <line x1={L} y1={bandY} x2={R} y2={bandY} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 4" opacity="0.75" />
      <text x={R - 4} y={bandY - 7} textAnchor="end" fill="#F59E0B" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
        {isVi ? "DẢI NỒNG ĐỘ TÁC DỤNG LÂM SÀNG (12% Cmax)" : "THERAPEUTIC FLOOR (12% Cmax)"}
      </text>

      {/* hairline grid — data-ink minimal */}
      {yTicks.map((v: number, i: number) => (
        <g key={`y${i}`}>
          <line x1={L} y1={y(v)} x2={R} y2={y(v)} stroke="#94A3B8" strokeWidth="0.5" opacity={i === 0 ? 0.55 : 0.16} />
          <text x={L - 9} y={y(v) + 3.5} textAnchor="end" fill="#64748B" fontSize="10.5" fontFamily="var(--font-mono)">
            {v.toFixed(v < 1 ? 2 : 1)}
          </text>
        </g>
      ))}
      {xTicks.map((t: number) => (
        <g key={`x${t}`}>
          <line x1={x(t)} y1={B} x2={x(t)} y2={B + 6} stroke="#64748B" strokeWidth="1" />
          <text x={x(t)} y={B + 19} textAnchor="middle" fill="#64748B" fontSize="10.5" fontFamily="var(--font-mono)">
            {t}
          </text>
        </g>
      ))}
      <line x1={L} y1={T} x2={L} y2={B} stroke="#64748B" strokeWidth="1" />

      {/* axis titles */}
      <text x={(L + R) / 2} y={H - 8} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.2">
        {isVi ? "THỜI GIAN SAU KHI UỐNG (GIỜ)" : "TIME AFTER DOSE (h)"}
      </text>
      <text x={14} y={(T + B) / 2} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.2" transform={`rotate(-90 14 ${(T + B) / 2})`}>
        {isVi ? "NỒNG ĐỘ TRONG HUYẾT TƯƠNG (µg/mL)" : "SERUM CONCENTRATION (µg/mL)"}
      </text>

      <g clipPath="url(#pk-clip)">
        <path d={area} fill="url(#pk-fill)" />
        <path
          d={path}
          fill="none"
          stroke="#00F2FE"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 7px rgba(0,242,254,0.55))" }}
        />
      </g>

      {/* Cmax annotation with leader line — Tufte */}
      <g>
        <circle cx={cmaxX} cy={cmaxY} r="4" fill="#08121F" stroke="#00F2FE" strokeWidth="2" />
        <line x1={cmaxX} y1={cmaxY} x2={cmaxX + 44} y2={cmaxY - 30} stroke="#00F2FE" strokeWidth="1" opacity="0.7" />
        <text x={cmaxX + 48} y={cmaxY - 33} fill="#00F2FE" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
          Cmax {res.cmax.toFixed(3)}
        </text>
        <text x={cmaxX + 48} y={cmaxY - 21} fill="#94A3B8" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.2">
          Tmax {res.tmax.toFixed(1)} h
        </text>
        <line x1={cmaxX} y1={cmaxY} x2={cmaxX} y2={B} stroke="#00F2FE" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.6" />
      </g>

      {/* corner watermark */}
      <text x={R} y={T + 2} textAnchor="end" fill="#334155" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.6">
        {form.toUpperCase()} · {dose} mg · kₑ = {res.kel.toFixed(3)}
      </text>
    </svg>
  );
}
