"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, BookOpen, Scale, FileText, CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

export default function EditorialPolicyPage() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <main className="min-h-screen bg-paper py-12 lg:py-20">
      <div className="mx-auto max-w-[900px] px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="caps inline-flex items-center gap-1.5 text-xs font-semibold text-slate-ink hover:text-indigo-deep transition-colors"
          >
            <ArrowLeft size={14} />
            {isVi ? "Quay lại Trang chủ" : "Back to Home"}
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-slate-hair pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1 text-trace font-medium">
              E-E-A-T Framework
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              {isVi ? "Quy chuẩn Biên tập & Kiểm chứng" : "Standards & Integrity"}
            </span>
          </div>

          <h1 className="mt-4 font-display display-lg font-black leading-[0.98] tracking-[-0.03em] text-indigo-deep">
            {isVi
              ? "Chính sách Biên tập & Đối soát Y văn Thực chứng"
              : "Editorial Policy & Evidence Verification Standards"}
          </h1>

          <p className="mt-4 text-[1.1rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Quy trình tuyển chọn tài liệu y văn, nguyên tắc đối soát mã định danh quốc tế (PubMed PMID / DOI), tính độc lập học thuật và cam kết phi thương mại của Phytocodex."
              : "Source curation criteria, protocol for PMID/DOI cross-verification, academic independence, and editorial governance at Phytocodex."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-ink">
            <span>Chủ biên: TS. Hoàng Xuân Chiến (Dr. rer. nat.)</span>
            <span>Cập nhật lần cuối: Tháng 10/2026</span>
          </div>
        </header>

        {/* Main Content Sections */}
        <div className="mt-10 space-y-12 text-[0.96rem] leading-[1.75] text-indigo-soft">
          {/* Section 1 */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <BookOpen size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "1. Khung Phân tầng Bằng chứng (Levels of Evidence)" : "1. Hierarchy of Scientific Evidence"}
              </h2>
            </div>
            <p className="mt-4">
              {isVi
                ? "Phytocodex áp dụng hệ thống phân tầng bằng chứng nghiêm ngặt theo chuẩn Y học Thực chứng (Evidence-Based Medicine - EBM). Chúng tôi ưu tiên tuyệt đối các nguồn công bố trên các tạp chí quốc tế có uy tín hàng đầu trong hệ thống NLM / MEDLINE / PubMed:"
                : "Phytocodex adheres to rigorous Evidence-Based Medicine (EBM) standards. We prioritize peer-reviewed literature indexed in major biomedical databases including NLM / MEDLINE / PubMed:"}
            </p>
            <ul className="mt-4 space-y-2.5 text-xs font-mono">
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-deep">Tầng 1 (Cao nhất):</span>
                <span>Tổng quan hệ thống (Systematic Reviews), Phân tích gộp (Meta-Analyses) và Thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCTs) mù đôi trên người.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-deep">Tầng 2 (Trung gian):</span>
                <span>Nghiên cứu đoàn hệ (Cohort Studies), Nghiên cứu bệnh chứng (Case-Control) và các thử nghiệm dược động học lâm sàng (Phase I/II PK-PD).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-deep">Tầng 3 (Cơ chế tiền lâm sàng):</span>
                <span>Nghiên cứu cơ chế in vitro và in vivo trên động vật. Toàn bộ các phát hiện ở tầng này bắt buộc phải được tuyên bố rõ ràng là bằng chứng tiền lâm sàng, không được phóng đại thành kết luận lâm sàng trên người.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "2. Giao thức Đối soát Y văn (Citation-Before-Claim)" : "2. Citation-Before-Claim Protocol"}
              </h2>
            </div>
            <p className="mt-4">
              {isVi
                ? "Mọi số liệu định lượng, tỷ lệ phần trăm (%), nồng độ ức chế (IC50), chỉ số diện tích dưới đường cong (AUC) hoặc kết luận cơ chế sinh học phân tử đều phải được neo trực tiếp vào tài liệu tham chiếu quốc tế có mã số định danh:"
                : "Every quantitative claim, percentage effect, IC50 concentration, pharmacokinetic parameter, or mechanistic claim must be anchored to an verifiable international publication identifier:"}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs font-mono">
              <div className="border border-slate-hair bg-paper p-4 rounded-sm">
                <span className="font-bold text-indigo-deep block mb-1">Mã PubMed (PMID):</span>
                <span>Đối soát trực tiếp trên Thư viện Y học Quốc gia Hoa Kỳ (National Library of Medicine).</span>
              </div>
              <div className="border border-slate-hair bg-paper p-4 rounded-sm">
                <span className="font-bold text-indigo-deep block mb-1">Mã Định danh Kỹ thuật số (DOI):</span>
                <span>Đảm bảo liên kết vĩnh viễn tới bài báo gốc trên trang xuất bản của tạp chí khoa học.</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-ink">
              {isVi
                ? "Chúng tôi loại trừ triệt để các tuyên bố giật gân, các suy đoán chưa có bằng chứng hoặc việc sử dụng thông tin từ các trang tin trung gian không trích nguồn sơ cấp."
                : "Sensationalist claims, unverified health speculations, and secondary-source blog summaries are strictly disqualified."}
            </p>
          </section>

          {/* Section 3 */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <Scale size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "3. Tính Độc lập Học thuật & Tuyên bố Không Xung đột Lợi ích" : "3. Independence & Conflict of Interest (COI)"}
              </h2>
            </div>
            <p className="mt-4">
              {isVi
                ? "Phytocodex là ấn phẩm khoa học và giáo dục độc lập phi thương mại do cá nhân TS. Hoàng Xuân Chiến sáng lập và trực tiếp điều hành về mặt nội dung."
                : "Phytocodex is an independent, non-commercial scientific and educational publishing project founded and curated personally by Dr. Xuan Chien Hoang."}
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-trace-ink font-bold">✓</span>
                <span>
                  <strong>{isVi ? "Không tài trợ thương mại:" : "Zero corporate sponsorship:"}</strong>{" "}
                  {isVi
                    ? "Chúng tôi không nhận tài trợ từ các hãng dược phẩm, nhà phân phối thực phẩm chức năng hoặc bất kỳ đơn vị thương mại nào để viết bài khen ngợi sản phẩm."
                    : "No corporate funding or commercial sponsorships from pharmaceutical or supplement companies influence our editorial evaluations."}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-trace-ink font-bold">✓</span>
                <span>
                  <strong>{isVi ? "Phân định ranh giới tổ chức:" : "Organizational boundary:"}</strong>{" "}
                  {isVi
                    ? "Mặc dù người sáng lập có hoạt động nghiên cứu và phát triển sản phẩm y sinh, Phytocodex duy trì sự phân định ranh giới độc lập tuyệt đối giữa nghiên cứu khoa học thực chứng và các hoạt động thương mại bên ngoài."
                    : "While the founder engages in biomedical R&D, Phytocodex maintains complete operational independence from external corporate entities."}
                </span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <FileText size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "4. Quy trình Cập nhật & Đính chính (Correction Policy)" : "4. Corrections & Continuous Review"}
              </h2>
            </div>
            <p className="mt-4">
              {isVi
                ? "Tri thức y sinh học luôn phát triển. Khi có thử nghiệm lâm sàng mới quy mô lớn hơn hoặc khi y văn quốc tế có cập nhật làm thay đổi bản chất của kết luận trước đó, chúng tôi thực hiện cập nhật bản thảo và ghi rõ ngày cập nhật gần nhất."
                : "Biomedical understanding constantly advances. When new clinical trials or literature syntheses update prior consensus, dispatches are amended with explicit revision dates."}
            </p>
            <p className="mt-3">
              {isVi
                ? "Nếu bạn phát hiện bất kỳ sai sót nào về số liệu định lượng, mã số DOI hoặc trích dẫn, vui lòng gửi phản hồi trực tiếp tới hộp thư:"
                : "For inquiries regarding quantitative corrections or reference verification, please reach out directly:"}
            </p>
            <div className="mt-3 font-mono text-xs">
              <a href="mailto:hoangxuanchien86@gmail.com" className="text-trace-ink underline">
                hoangxuanchien86@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
