import { CheckCircle2, AlertTriangle, Pill, Stethoscope, Info } from "lucide-react";
import type { PracticalGuide } from "@/lib/reader-brief";

function Block({
  icon,
  title,
  items,
  accent,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accent: string;
  bg: string;
}) {
  return (
    <div className="rounded-sm border p-4 sm:p-5" style={{ borderColor: `${accent}33`, background: bg }}>
      <h3 className="caps flex items-center gap-2 text-[0.7rem] font-bold" style={{ color: accent }}>
        {icon}
        {title}
      </h3>
      <ul className="mt-3 grid gap-2.5">
        {items.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[0.93rem] leading-relaxed text-indigo-soft">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Hộp "Áp dụng thực tế & An toàn": việc nên làm, ai cần thận trọng, tương tác thuốc, khi nào gặp bác sĩ.
 * Luôn kèm dòng miễn trừ y khoa cố định.
 */
export function PracticalSafetyBox({ guide, isVi }: { guide: PracticalGuide; isVi: boolean }) {
  return (
    <section
      id="ap-dung-thuc-te"
      aria-labelledby="practical-title"
      className="not-prose mt-14 scroll-mt-24 rounded-sm border-2 border-indigo-deep bg-paper"
    >
      <header className="border-b border-indigo-deep/15 px-5 py-4 sm:px-6">
        <span className="caps text-[0.66rem] font-semibold text-slate-ink">
          {isVi ? "Từ phòng thí nghiệm đến đời sống" : "From the bench to your day"}
        </span>
        <h2
          id="practical-title"
          className="mt-1 font-display text-[1.45rem] font-bold leading-tight tracking-[-0.02em] text-indigo-deep"
        >
          {isVi ? "Áp dụng thực tế & An toàn" : "Putting it into practice — safely"}
        </h2>
      </header>

      <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
        {guide.steps.length > 0 && (
          <div className={guide.avoidIf.length === 0 ? "md:col-span-2" : ""}>
            <Block
              icon={<CheckCircle2 size={14} aria-hidden />}
              title={isVi ? "Nên làm" : "What you can do"}
              items={guide.steps}
              accent="#047857"
              bg="#f0fdf4"
            />
          </div>
        )}
        {guide.avoidIf.length > 0 && (
          <div className={guide.steps.length === 0 ? "md:col-span-2" : ""}>
            <Block
              icon={<AlertTriangle size={14} aria-hidden />}
              title={isVi ? "Cần thận trọng nếu" : "Be cautious if"}
              items={guide.avoidIf}
              accent="#b45309"
              bg="#fffbeb"
            />
          </div>
        )}
        {guide.interactions.length > 0 && (
          <div className="md:col-span-2">
            <Block
              icon={<Pill size={14} aria-hidden />}
              title={isVi ? "Tương tác với thuốc" : "Drug interactions"}
              items={guide.interactions}
              accent="#be123c"
              bg="#fff1f2"
            />
          </div>
        )}
        {guide.seeDoctor && (
          <div className="md:col-span-2 flex items-start gap-3 rounded-sm border border-indigo-deep/15 bg-paper-tint p-4 sm:p-5">
            <Stethoscope size={18} className="mt-0.5 shrink-0 text-indigo-deep" aria-hidden />
            <div>
              <h3 className="caps text-[0.7rem] font-bold text-indigo-deep">
                {isVi ? "Khi nào nên hỏi bác sĩ" : "When to talk to a doctor"}
              </h3>
              <p className="mt-1.5 text-[0.93rem] leading-relaxed text-indigo-soft">{guide.seeDoctor}</p>
            </div>
          </div>
        )}
      </div>

      <footer className="flex items-start gap-2.5 border-t border-indigo-deep/10 bg-paper-tint px-5 py-3.5 sm:px-6">
        <Info size={14} className="mt-0.5 shrink-0 text-slate-ink" aria-hidden />
        <p className="text-[0.78rem] leading-relaxed text-slate-ink">
          {isVi
            ? "Nội dung mang tính giáo dục, không thay thế chẩn đoán hay đơn thuốc của bác sĩ. Hãy trao đổi với bác sĩ hoặc dược sĩ trước khi dùng thực phẩm bổ sung, nhất là khi đang dùng thuốc, mang thai, cho con bú hoặc có bệnh nền."
            : "Educational content only — not a substitute for a diagnosis or prescription. Talk to your doctor or pharmacist before starting any supplement, especially if you take medication, are pregnant or breastfeeding, or have a chronic condition."}
        </p>
      </footer>
    </section>
  );
}
