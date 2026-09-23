"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Microscope, ShieldCheck } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

export function AboutClient() {
  const { lang, setLang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <main className="bg-paper text-indigo-deep">
      {/* Header */}
      <header className="border-b border-slate-hair bg-paper-tint">
        <div className="mx-auto max-w-[1080px] px-6 py-12 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="caps inline-flex items-center gap-1.5 text-slate-ink hover:text-indigo-deep transition-colors"
            >
              <ArrowLeft size={13} /> {isVi ? "Quay lại Trang chủ" : "Return to Front"}
            </Link>

            <div className="inline-flex rounded-full border border-slate-hair bg-paper p-0.5 text-xs font-mono shadow-2xs">
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  isVi
                    ? "bg-indigo-deep text-white font-bold shadow-xs"
                    : "text-slate-ink hover:text-indigo-deep"
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  !isVi
                    ? "bg-indigo-deep text-white font-bold shadow-xs"
                    : "text-slate-ink hover:text-indigo-deep"
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1 text-trace font-medium">
              {isVi ? "Chuyên gia Chủ biên" : "Lead Investigator"}
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              {isVi ? "Hội đồng Biên tập" : "Editorial Board"}
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              University of Hamburg (CHLB Đức)
            </span>
          </div>

          <h1 className="mt-5 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            {isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
          </h1>

          <p className="mt-3 text-[1.2rem] font-medium text-trace-ink font-mono">
            {isVi
              ? "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Chuyên gia Chuyển hóa học & Công nghệ Sinh học"
              : "Doctor of Natural Sciences (Dr. rer. nat.) · Biotechnology & Metabolomics Specialist"}
          </p>

          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Cầu nối giữa hóa sinh phân tử cốt lõi, công nghệ khối phổ chuyển hóa học và chu kỳ phát triển sản phẩm y sinh thực chứng đạt chuẩn lưu hành tại Đức, Liên minh Châu Âu và Châu Á."
              : "Bridging fundamental molecular biochemistry, mass spectrometry metabolomics, and real-world health product lifecycles across Germany, Europe, and APAC."}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1080px] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {/* Bio section */}
            <section>
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 1 · Học thuật & Quá trình Công tác" : "§ 1 · Academic & Professional Background"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Giao điểm của Khoa học Sự sống & Dữ liệu Đo lường" : "The Intersection of Biology & Telemetry"}
              </h2>
              <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                {isVi ? (
                  <>
                    <p>
                      TS. Hoàng Xuân Chiến bảo vệ xuất sắc học vị Tiến sĩ Khoa học Tự nhiên (
                      <strong>Dr. rer. nat.</strong>) tại <strong>Đại học Hamburg (CHLB Đức)</strong>, chuyên sâu về mô
                      hình hóa dữ liệu sinh học, thiết kế thí nghiệm và phân tích hóa học phân giải cao.
                    </p>
                    <p>
                      Với hơn 8 năm kinh nghiệm nghiên cứu và phát triển sản phẩm y sinh tại Hamburg, Rostock và
                      Potsdam, ông từng trực tiếp quản trị các phòng kiểm nghiệm phân tích chuẩn ISO, xây dựng hệ thống
                      đảm bảo chất lượng theo tiêu chuẩn Dược điển Châu Âu, và phát triển thành công hơn 15 công thức chăm
                      sóc sức khỏe đạt chuẩn lưu hành tại thị trường Đức & EU.
                    </p>
                    <p>
                      Lĩnh vực chuyên môn sâu bao gồm: Định lượng chuyển hóa học (metabolomics) định danh và không định danh,
                      mô hình hóa dược động học (hệ thống 1 và 2 ngăn), cơ chế tăng cường sinh khả dụng hoạt chất tự nhiên,
                      và quy trình kiểm soát chất lượng dựa trên y học thực chứng.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Dr. Xuan Chien Hoang earned his doctorate in natural sciences (<strong>Dr. rer. nat.</strong>) from the{" "}
                      <strong>University of Hamburg (Germany)</strong>, specializing in biological data modeling, experimental
                      design, and high-resolution chemical profiling.
                    </p>
                    <p>
                      With more than 8 years of post-doctoral industry experience in Hamburg, Rostock, and Potsdam, he has directed
                      laboratory analytical testing operations, led quality assurance pipelines adhering to strict ISO and EU
                      pharmaceutical standards, and successfully engineered over 15 EU-compliant healthcare formulations from
                      concept to commercial deployment.
                    </p>
                    <p>
                      His technical domain encompasses both targeted and untargeted metabolomics, pharmacokinetic modeling (1- and
                      2-compartment systems), bioactive compound bio-enhancement, and algorithmic data pipelines.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Core Pillars Bento */}
            <section>
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 2 · Bốn Trụ cột Nghiên cứu" : "§ 2 · Analytical Pillars"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Lĩnh vực Chuyên môn Trọng tâm" : "Core Research Domains"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-trace-ink">
                    <Microscope size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Chuyển hóa học & Khối phổ (MS)" : "Metabolomics & MS Profiling"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Bóc tách dữ liệu phổ khối LC-MS/MS và GC-MS, định danh các dấu ấn sinh học phân tử nhỏ (<1500 Da) và phân tích dòng chuyển hóa thời gian thực."
                      : "High-resolution LC-MS/MS and GC-MS spectral deconvolution, identification of low-molecular-weight phenotypic markers, and metabolic flux analysis."}
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-syn-ink">
                    <GraduationCap size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Y học Thực chứng (EBM)" : "Evidence-Based Medicine (EBM)"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Quy chuẩn Citation-Before-Claim (có bằng chứng trước khi khẳng định), đối soát y văn PubMed/CrossRef, phân tích tổng hợp (meta-analysis) không ảo giác số liệu."
                      : "Zero-hallucination citation protocol (Citation-Before-Claim), systematic meta-analyses, and Bayesian prior evaluation of clinical trial endpoints."}
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-plasma-ink">
                    <BookOpen size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Mô phỏng Dược động học Tương tác" : "Interactive Simulation Engines"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Công cụ tính toán dược động học (Cmax, Tmax, AUC), mô hình ức chế enzyme (UGT1A1, CYP3A4) và ma trận tương tác hoạt chất tính toán trực tiếp trên trình duyệt."
                      : "Client-side pharmacokinetic calculators, enzyme inhibition models (UGT1A1, CYP3A4), and dynamic synergy matrices running without server roundtrips."}
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-indigo-deep">
                    <ShieldCheck size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Pháp chế Y tế Đức & EU" : "EU Regulatory Compliance"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Tuân thủ nghiêm ngặt Quy định (EC) No 1924/2006 (NHCR), Luật Quảng cáo Dược phẩm CHLB Đức (HWG), và chuẩn hóa chứng cứ lâm sàng."
                      : "Rigorous adherence to Regulation (EC) No 1924/2006 (NHCR), German Heilmittelwerbegesetz (HWG), and clinical evidence substantiation standards."}
                  </p>
                </div>
              </div>
            </section>

            {/* Editorial Philosophy */}
            <section className="border-t border-slate-hair pt-8">
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 3 · Sứ mệnh Xuất bản" : "§ 3 · Editorial Mission"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Vì sao The BioDispatch ra đời?" : "Why The BioDispatch Exists"}
              </h2>
              {isVi ? (
                <>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                    Báo chí y tế hiện nay thường rơi vào hai thái cực: hoặc là các bài báo khoa học quá khô khan, bị khóa
                    sau các bức tường trả phí học thuật; hoặc là các nội dung quảng cáo thương mại nói quá, giật gân và thiếu
                    căn cứ khoa học thực chứng.
                  </p>
                  <p className="mt-3 text-[1.05rem] leading-[1.75] text-indigo-soft">
                    <strong>The BioDispatch</strong> theo đuổi con đường thứ ba: <strong>Khoa học minh bạch, trực quan và dễ hiểu</strong>.
                    Mọi bài phân tích đều neo chặt vào dữ liệu nghiên cứu thực tế có mã số định danh DOI/PubMed, đồng thời cung cấp các
                    mô hình tính toán tương tác giúp người đọc tự kiểm chứng cơ chế sinh học mà không cần phải đoán mò.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                    Most biomedical journalism falls into two traps: either unreadable academic paywalls or hyper-simplified,
                    scientifically groundless marketing claims.
                  </p>
                  <p className="mt-3 text-[1.05rem] leading-[1.75] text-indigo-soft">
                    <strong>The BioDispatch</strong> is dedicated to a third path: explorable, rigorous, transparent science.
                    Every article links directly to verified PubMed/DOI records and provides interactive visual models that let
                    clinicians, researchers, and curious minds test the mathematical claims themselves.
                  </p>
                </>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-sm border border-slate-hair bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-indigo-deep text-trace font-mono font-bold flex items-center justify-center text-xl">
                  CH
                </div>
                <div>
                  <h3 className="font-display text-[1.15rem] font-bold text-indigo-deep">
                    {isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
                  </h3>
                  <p className="caps text-[0.68rem] text-slate-ink">Dr. rer. nat. · Hamburg</p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-slate-hair pt-5 text-xs">
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Đại học Tốt nghiệp" : "Alma Mater"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi ? "Đại học Hamburg, CHLB Đức" : "University of Hamburg, Germany"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Nơi làm việc" : "Location"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi ? "Hamburg, CHLB Đức" : "Hamburg, Germany"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Ngôn ngữ" : "Languages"}</span>
                  <span className="font-semibold text-indigo-deep">Tiếng Đức · Tiếng Anh · Tiếng Việt</span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Tổ chức Hội đoàn" : "Leadership"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi
                      ? "Ủy viên BCH, Hội Chuyên gia & Trí thức Việt Nam tại Đức (VGI e.V., từ 2019)"
                      : "Board Member, VGI e.V. (since 2019)"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Liên hệ Chuyên môn" : "Contact / Inquiries"}</span>
                  <a
                    href="mailto:hoangxuanchien86@gmail.com"
                    className="font-mono text-trace-ink underline block break-all"
                  >
                    hoangxuanchien86@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-slate-hair bg-paper-tint p-6">
              <span className="caps text-slate-ink block font-semibold mb-2">
                {isVi ? "Hệ thống Xuất bản Tự động" : "Publishing Pipeline"}
              </span>
              <p className="text-xs text-indigo-soft leading-relaxed">
                {isVi
                  ? "Soạn thảo và quản lý trong kho lưu trữ riêng tư GitHub với hệ thống triển khai tự động trực tiếp lên Vercel."
                  : "Authored and maintained in a private Git workspace with automated continuous deployment to Vercel."}
              </p>
              <Link
                href="/#directory"
                className="caps mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-deep hover:text-trace-ink"
              >
                {isVi ? "Khám phá Kho bài viết →" : "Browse Published Dispatches →"}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
