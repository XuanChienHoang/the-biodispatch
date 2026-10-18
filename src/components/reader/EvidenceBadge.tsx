import { EVIDENCE_META, type EvidenceLevel } from "@/lib/reader-brief";

/**
 * Huy hiệu mức độ bằng chứng: 4 vạch thể hiện độ mạnh + nhãn ngắn.
 * Giúp độc giả phân biệt ngay kết quả trên người với kết quả ống nghiệm / động vật.
 */
export function EvidenceBadge({
  level,
  isVi,
  tone = "light",
}: {
  level: EvidenceLevel;
  isVi: boolean;
  tone?: "light" | "dark";
}) {
  const meta = EVIDENCE_META[level];
  const color =
    meta.strength >= 4 ? "#059669" : meta.strength === 3 ? "#0e7490" : meta.strength === 2 ? "#b45309" : "#be123c";
  const dark = tone === "dark";

  return (
    <span
      title={isVi ? meta.hintVi : meta.hintEn}
      className={`inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[0.72rem] font-semibold ${
        dark ? "border-white/20 bg-white/10 text-white" : "border-slate-hair bg-paper text-indigo-deep"
      }`}
    >
      <span aria-hidden className="flex items-end gap-[2px]">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-[1px]"
            style={{
              height: `${4 + i * 2}px`,
              background: i <= meta.strength ? color : dark ? "rgba(255,255,255,0.25)" : "#e2e8f0",
            }}
          />
        ))}
      </span>
      <span className="sr-only">{isVi ? "Mức độ bằng chứng:" : "Evidence level:"}</span>
      {isVi ? meta.vi : meta.en}
    </span>
  );
}
