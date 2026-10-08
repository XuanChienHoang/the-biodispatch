"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/i18n";

const BRIDGES = [
  {
    key: "CardioAware",
    href: "https://cardioaware.lavahealth.de",
    field: "metric=ldl-c&marker=oxldl",
    blurb: "Cardiovascular botanical extracts — Policosanol, CoQ10, Hawthorn.",
    blurbVi: "Chiết xuất thực vật bảo vệ tim mạch — Policosanol, CoQ10, Táo mèo tự nhiên.",
    stats: "Risk metrics pre-filled · 6 predictors",
    statsVi: "Chỉ số nguy cơ tim mạch · 6 biến số dự báo",
    color: "#00F2FE",
  },
  {
    key: "OncoAware",
    href: "https://oncoaware.lavahealth.de",
    field: "context=supportive-care&endpoint=fatigue",
    blurb: "Supportive care, antioxidant timing windows and cancer-related fatigue.",
    blurbVi: "Chăm sóc hỗ trợ, thời điểm vàng chống oxy hóa và cải thiện mệt mỏi thể chất.",
    stats: "Timing windows · 4 endpoints",
    statsVi: "Cửa sổ thời gian · 4 đích lâm sàng",
    color: "#10B981",
  },
  {
    key: "GutAware",
    href: "https://gutaware.lavahealth.de",
    field: "pathway=scfa-synthesis&substrate=rs2",
    blurb: "Prebiotics, polyphenols and short-chain fatty acid synthesis.",
    blurbVi: "Prebiotics, polyphenols và quá trình sinh tổng hợp axit béo chuỗi ngắn (SCFA).",
    stats: "Live SCFA simulation sync",
    statsVi: "Mô phỏng đồng bộ SCFA thời gian thực",
    color: "#F59E0B",
  },
];

export function ComplianceStrip() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <>
      <section className="border-t border-slate-hair bg-indigo-deep text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
            <div>
              <span className="caps text-trace">
                {isVi ? "§ 4 · Cầu nối Dữ liệu Lâm sàng Thực tế" : "§ 4 · Clinical Telemetry Bridge"}
              </span>
              <h2 className="mt-3 max-w-xl font-display text-step-3 leading-[1.02] tracking-[-0.02em]">
                {isVi
                  ? "Nghiên cứu Học thuật kết nối với Phòng Phân tích Thực chứng."
                  : "Editorial meets Evidence-Based Lab Analytics."}
              </h2>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-slate-300">
              {isVi
                ? "Chủ biên bởi TS. Hoàng Xuân Chiến (Dr. rer. nat. Sinh học Phân tử, ĐH Hamburg). Cầu nối kết hợp dược liệu Á - Âu, tối ưu sinh khả dụng, hỗ trợ ung thư, tim mạch và giải pháp HealthTech thực chứng."
                : "Curated by Dr. Xuan Chien Hoang (Dr. rer. nat. in Molecular Biology, Univ. of Hamburg). Bridging East-West botanicals, bioavailability enhancement, oncology care, and data-driven HealthTech."}
            </p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-white/12 sm:grid-cols-3">
            {BRIDGES.map((b) => (
              <a
                key={b.key}
                href={`${b.href}/?${b.field}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-indigo-deep p-6 transition-colors duration-300 hover:bg-[#101f34]"
              >
                <span
                  className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: b.color }}
                />
                <div className="flex items-baseline justify-between">
                  <span className="num text-[1.12rem] font-medium tracking-tight">{b.key}</span>
                  <span
                    className="caps transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: b.color }}
                  >
                    {isVi ? "mở ứng dụng ↗" : "open ↗"}
                  </span>
                </div>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-300">
                  {isVi ? b.blurbVi : b.blurb}
                </p>
                <p className="caps mt-5 text-white/40">{isVi ? b.statsVi : b.stats}</p>
                <p className="num mt-2 truncate text-[0.66rem] text-white/25">
                  {b.href.replace("https://", "")}/?{b.field}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-hair bg-paper-tint">
        <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10">
          <div className="grid gap-10 border-b border-slate-hair pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="caps text-slate-ink">
                {isVi
                  ? "Quy chuẩn Tuân thủ Pháp chế Y tế Châu Âu (EFSA / HWG / LMIV)"
                  : "EFSA / HWG / LMIV Compliance Notice"}
              </p>
              <p className="mt-3 max-w-md text-[0.86rem] leading-relaxed text-indigo-soft">
                {isVi
                  ? "Các công bố về sức khỏe được dẫn chiếu từ các bằng chứng khoa học được cấp phép theo Quy định (EC) số 1924/2006 của Liên minh Châu Âu. Nội dung tại đây không cấu thành lời khuyên y khoa điều trị, chẩn đoán chính thức hay đơn thuốc điều trị. Các mô hình dược động học tương tác là công cụ mô phỏng giáo dục trực quan dựa trên y văn đã công bố."
                  : "Health claims cited on this publication reference authorized scientific substantiations under EU Regulation (EC) No 1924/2006. Nothing here constitutes clinical medical advice, formal diagnosis, or pharmaceutical prescription. Interactive pharmacokinetic models are pedagogical simulations based on published literature."}
              </p>
            </div>
            <div>
              <p className="caps text-slate-ink">The BioDispatch</p>
              <ul className="mt-3 space-y-2 text-[0.88rem] text-indigo-soft">
                <li>
                  <Link className="transition-colors hover:text-trace-ink" href="/about">
                    {isVi ? "Về Tác giả: TS. Hoàng Xuân Chiến" : "About Dr. Xuan Chien Hoang"}
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-trace-ink" href="/gizmos">
                    {isVi ? "Phòng Mô phỏng Dược học (Gizmos Lab)" : "Simulation Engines Lab"}
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-trace-ink" href="/#directory">
                    {isVi ? "Thư viện Báo cáo & Bài Phân tích" : "Article Directory & Corpus"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="caps text-slate-ink">
                {isVi ? "Bảo mật Dữ liệu & Kiến trúc Hệ thống" : "Data Privacy & Architecture"}
              </p>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-indigo-soft">
                {isVi
                  ? "Tuyệt đối không thu thập hay truyền dữ liệu sức khỏe người dùng ra ngoài. Toàn bộ các thuật toán mô phỏng và phương trình dược động học đều chạy 100% nội bộ trên trình duyệt của bạn."
                  : "Zero health data telemetry is transmitted. All mathematical simulations and pharmacokinetic equations execute entirely client-side within your browser process."}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="caps text-slate-ink">
              {isVi
                ? "The BioDispatch · TS. Hoàng Xuân Chiến · Hamburg, CHLB Đức"
                : "The BioDispatch · Dr. Xuan Chien Hoang · Hamburg, Germany"}
            </p>
            <p className="caps text-slate-ink">
              {isVi ? "Tòa soạn Y sinh Thực chứng · 2026" : "Evidence-Based Editorial System · 2026"}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
