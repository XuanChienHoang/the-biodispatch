"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Globe,
  Sparkles,
  Heart,
  Dna,
  Database,
  Building2,
  ExternalLink,
} from "lucide-react";
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
              {isVi ? "Chuyên gia Chủ biên" : "Lead Curator & Author"}
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              Dr. rer. nat. · Univ. Hamburg
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              Founder, Lava Health GmbH
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              VGI e.V. Board Member
            </span>
          </div>

          <h1 className="mt-5 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            {isVi ? "TS. Hoàng Xuân Chiến" : "Dr. Xuan Chien Hoang"}
          </h1>

          <p className="mt-3 text-[1.15rem] font-medium text-trace-ink font-mono">
            {isVi
              ? "Tiến sĩ Sinh học Phân tử (Dr. rer. nat., ĐH Hamburg) · Chuyên gia Y sinh, Dược liệu Á - Âu & Data Science"
              : "Doctor of Natural Sciences (Dr. rer. nat., University of Hamburg) · Biomedicine, East-West Phytotherapy & Data Science"}
          </p>

          <p className="mt-5 max-w-3xl text-[1.08rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Cầu nối tiên phong kết hợp tinh hoa dược liệu Á Đông với công nghệ chiết xuất, chuẩn hóa khắt khe của Đức và Châu Âu; nghiên cứu đột phá về tối ưu hóa sinh khả dụng, các giải pháp tự nhiên nâng đỡ người bệnh ung thư, bảo vệ tim mạch - chuyển hóa và ứng dụng Data Science trong y tế thực chứng."
              : "A pioneering bridge synthesizing traditional Asian ethnobotanicals with rigorous German & European extraction standards; advancing bioavailability optimization, supportive oncology formulations, cardiometabolic science, and data-driven HealthTech."}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1080px] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            {/* Academic & Professional Journey */}
            <section>
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 1 · Học thuật & Quá trình Công tác" : "§ 1 · Academic Background & Career Leadership"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Hơn 10 năm Nghiên cứu, Phát triển Sản phẩm & Lãnh đạo Y sinh" : "A Decade of Biomedical Discovery, Formulation & Leadership"}
              </h2>
              <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                {isVi ? (
                  <>
                    <p>
                      <strong>TS. Hoàng Xuân Chiến</strong> bảo vệ học vị Tiến sĩ Khoa học Tự nhiên (
                      <strong>Dr. rer. nat.</strong>) chuyên ngành <strong>Sinh học Phân tử</strong> tại{" "}
                      <strong>Đại học Hamburg (CHLB Đức)</strong> vào năm 2017, đồng thời hoàn thành chứng chỉ chuyên sâu
                      về <strong>Data Science</strong> tại <strong>StackFuel Berlin</strong> (2023).
                    </p>
                    <p>
                      Với hơn một thập kỷ công tác và làm việc tại Đức (Hamburg, Potsdam), ông sở hữu kinh nghiệm phong phú
                      từ môi trường nghiên cứu hàn lâm đỉnh cao đến các vị trí quản trị và phát triển sản phẩm thực chiến:
                    </p>
                    <ul className="list-disc pl-5 space-y-2.5">
                      <li>
                        <strong>Sáng lập & Điều hành Lava Health GmbH (Hamburg):</strong> Doanh nghiệp tiên phong xây dựng cầu nối
                        thương mại và khoa học hai chiều giữa Châu Âu và Châu Á. Đưa các dòng sản phẩm chiết xuất từ thảo dược quý
                        Việt Nam và Châu Á vào thị trường EU dưới sự kiểm soát nghiêm ngặt của pháp chế y tế Châu Âu (EFSA/HWG);
                        đồng thời xuất khẩu các dòng sản phẩm bổ sung sức khỏe và thiết bị y tế sản xuất tại Đức đạt chuẩn GMP/ISO
                        về phục vụ cộng đồng tại Châu Á. Trực tiếp phát triển thành công hơn 15 dòng sản phẩm Private Label.
                      </li>
                      <li>
                        <strong>Quản lý Chất lượng & Phát triển Sản phẩm tại Dr. Adem Healthcare Partners GmbH (Hamburg):</strong> Nghiên
                        cứu và phát triển các sản phẩm bổ trợ tự nhiên nhằm hỗ trợ bệnh nhân ung thư, giảm nhẹ biến chứng do hóa xạ trị;
                        đồng thời đồng phát triển các ứng dụng công nghệ y tế (Dr. Adem App) tích hợp Trí tuệ Nhân tạo (AI) và Machine
                        Learning trong ung bướu học.
                      </li>
                      <li>
                        <strong>Quản lý Dự án & Cố vấn Kỹ thuật tại TaRes GmbH (Hamburg):</strong> Điều phối dự án quốc tế nghiên cứu
                        và bào chế các chiết xuất thảo mộc Việt Nam (như Sâm Ngọc Linh, Hà thủ ô...) nhằm tăng cường miễn dịch và hỗ trợ
                        người bệnh ung thư, hợp tác cùng các viện nghiên cứu và bệnh viện lớn tại Việt Nam.
                      </li>
                      <li>
                        <strong>Nghiên cứu viên & Quản lý Dự án tại Metabolomic Discoveries GmbH (Potsdam):</strong> Vận hành các nền
                        tảng phân tích khối phổ phân giải cao (LC-MS/MS, GC-MS), chuyển hóa học (metabolomics), định danh dấu ấn sinh
                        học lâm sàng, phục vụ nghiên cứu phát triển dược phẩm và kiểm định độ an toàn thực phẩm.
                      </li>
                      <li>
                        <strong>Trưởng Phòng thí nghiệm & Chẩn đoán Phân tử:</strong> Chuyên sâu về virus học và bệnh học. Đặc biệt trong giai
                        đoạn đại dịch COVID-19, ông trực tiếp phụ trách phòng phân tích xét nghiệm virus SARS-CoV-2 tại Centogene GmbH (Hamburg);
                        đồng thời đảm nhiệm vai trò Cố vấn chuyên môn cho Đại sứ quán Việt Nam tại CHLB Đức về mảng COVID-19. Trước đó, ông là
                        Trưởng phòng Lab tại ICH Hamburg - Stendal, thiết lập quy chuẩn kiểm nghiệm và hệ thống SOPs.
                      </li>
                    </ul>
                    <p>
                      Bên cạnh sự nghiệp khoa học và doanh nghiệp, TS. Hoàng Xuân Chiến tích cực tham gia các hoạt động ngoại giao tri thức:
                      ông là <strong>Ủy viên Ban Điều hành Mạng lưới Đổi mới Sáng tạo Việt Nam - Đức (VGI e.V.)</strong> từ năm 2019,
                      nguyên Phó Chủ tịch Hội Sinh viên Việt Nam tại Đức, và vinh dự nhận{" "}
                      <strong>Giấy khen của Đại sứ đặc mệnh toàn quyền Việt Nam tại CHLB Đức</strong> (2017).
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Dr. Xuan Chien Hoang</strong> earned his doctorate in natural sciences (
                      <strong>Dr. rer. nat.</strong>) in <strong>Molecular Biology</strong> from the{" "}
                      <strong>University of Hamburg (Germany)</strong> in 2017, and subsequently completed an advanced
                      specialization in <strong>Data Science</strong> from <strong>StackFuel Berlin</strong> (2023).
                    </p>
                    <p>
                      With over a decade of international experience across Germany (Hamburg, Potsdam) and APAC, he bridges
                      the gap between high-level laboratory research and market-ready biomedical product lifecycles:
                    </p>
                    <ul className="list-disc pl-5 space-y-2.5">
                      <li>
                        <strong>Founder & Managing Director at Lava Health GmbH (Hamburg):</strong> Pioneering a bilateral scientific
                        and trade bridge between Europe and Asia. Introducing premium Asian botanical extracts into the EU market under
                        rigorous compliance (EFSA/HWG), while exporting certified German-manufactured health supplements and medical
                        devices to Asia. Personally engineered over 15 EU-compliant Private Label SKUs.
                      </li>
                      <li>
                        <strong>Quality Manager & Product Developer at Dr. Adem Healthcare Partners GmbH (Hamburg):</strong> Spearheading
                        formulations for cancer supportive care, chemotherapy side-effect mitigation, and integrating AI/ML technologies
                        into oncology applications (Dr. Adem App).
                      </li>
                      <li>
                        <strong>Project Manager & Technical Advisor at TaRes GmbH (Hamburg):</strong> Coordinating cross-border botanical
                        extraction projects featuring endemic Vietnamese medicinal herbs (*Panax vietnamensis*, *Polygonum multiflorum*)
                        in partnership with major oncology hospitals and institutes in Vietnam.
                      </li>
                      <li>
                        <strong>Research Scientist & Project Leader at Metabolomic Discoveries GmbH (Potsdam):</strong> Managing mass
                        spectrometry platforms (LC-MS/MS, GC-MS), untargeted and targeted metabolomics, biomarker discovery, and food
                        authenticity validation.
                      </li>
                      <li>
                        <strong>Laboratory Leadership & Molecular Diagnostics:</strong> Specialized in virology and pathology. During
                        the COVID-19 pandemic, he directed SARS-CoV-2 viral diagnostics at Centogene GmbH (Hamburg) and served as
                        Scientific Advisor on COVID-19 response to the Vietnamese Embassy in Germany. Previously Head of Laboratory at
                        ICH Hamburg - Stendal, establishing ISO testing standards and SOPs.
                      </li>
                    </ul>
                    <p>
                      Beyond laboratory and executive roles, Dr. Hoang is dedicated to international scientific exchange: serving as a{" "}
                      <strong>Board Member of the Vietnam - Germany Innovation Network (VGI e.V.)</strong> since 2019, former Vice
                      President of the Vietnamese Student Association in Germany, and recipient of the{" "}
                      <strong>Official Certificate of Merit from the Vietnamese Ambassador to Germany</strong> (2017).
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Core Strategic Pillars Bento Grid */}
            <section>
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 2 · Sáu Trụ cột Chiến lược & Năng lực Chuyên môn" : "§ 2 · Six Strategic Pillars & Core Competencies"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Định hướng Nghiên cứu & Phát triển Sản phẩm" : "Research Domains & Product Development Focus"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Pillar 1: East-West Bridge */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-trace-ink">
                    <Globe size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Cầu nối Dược liệu Á Đông & Chuẩn Châu Âu" : "East-West Botanical Bridge"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Kết hợp tinh hoa thảo mộc Á Đông (Sâm Ngọc Linh, Berberine, Curcumin, Đông trùng hạ thảo) với công nghệ chiết xuất siêu tới hạn và tiêu chuẩn chất lượng khắt khe của Dược điển Đức & Châu Âu (GMP, ISO, EFSA)."
                      : "Uniting Asian ethnobotanicals with state-of-the-art European supercritical fluid extraction, phytochemical standardization, and strict EU/GMP compliance."}
                  </p>
                </div>

                {/* Pillar 2: Bioavailability Enhancement */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-plasma-ink">
                    <Sparkles size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Tối ưu Sinh khả dụng & Tăng Hấp thu" : "Bioavailability & Delivery Science"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Giải quyết điểm nghẽn độ tan kém và đào thải nhanh của hoạt chất tự nhiên thông qua cơ chế hiệp đồng ức chế enzyme gan ruột (Piperine ức chế UGT1A1/CYP3A4), công nghệ vi bao liposome và phospholipid/phytosome."
                      : "Overcoming poor solubility and rapid clearance via pharmacokinetic synergy (UGT1A1/CYP3A4 modulation), liposomal encapsulation, and phospholipid phytosome technology."}
                  </p>
                </div>

                {/* Pillar 3: Supportive Oncology Care */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-syn-ink">
                    <ShieldCheck size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Sản phẩm Bổ trợ cho Người Ung thư" : "Integrative Oncology Support"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Nghiên cứu các công thức tự nhiên nâng đỡ thể trạng, giảm nhẹ hội chứng suy kiệt mệt mỏi (cancer-related fatigue/cachexia), tăng nhạy cảm tế bào u với phác đồ chuẩn và bảo vệ mô lành dựa trên y học thực chứng."
                      : "Evidence-based natural formulations aimed at supportive care, mitigating chemo-radiation fatigue and cachexia, modulating immune response, and protecting healthy tissues."}
                  </p>
                </div>

                {/* Pillar 4: Cardiometabolic Health */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-indigo-deep">
                    <Heart size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Bệnh Tim mạch & Rối loạn Chuyển hóa" : "Cardiometabolic & Vascular Health"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Phân tích cơ chế bệnh sinh xơ vữa động mạch, rối loạn lipid máu, đối chiếu số lượng hạt sinh xơ vữa ApoB vs LDL-C, bảo vệ chức năng nội mô mạch máu và điều hòa trục chuyển hóa tim - gan - ruột."
                      : "Deep physiological analysis of atherogenesis, dyslipidemia, ApoB vs LDL-C discordance, endothelial integrity, and gut-liver-heart metabolic cascades."}
                  </p>
                </div>

                {/* Pillar 5: Plant Biotechnology */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-trace-ink">
                    <Dna size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Công nghệ Sinh học Thực vật & Y sinh" : "Phytobiotechnology & Biomedicine"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Nghiên cứu sinh tổng hợp trao đổi chất thứ cấp, ứng dụng công nghệ quang phổ LED và bioreactor nuôi cấy tế bào thực vật nhằm kiểm soát và kích hoạt tối đa hàm lượng dược chất quý một cách bền vững."
                      : "Secondary metabolite biosynthesis, controlled LED spectral elicitation, and plant cell bioreactor scale-up for sustainable, high-potency phytochemical yields."}
                  </p>
                </div>

                {/* Pillar 6: Data Science & HealthTech */}
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-indigo-soft">
                    <Database size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      {isVi ? "Data Science, Nghiên cứu & HealthTech" : "Data Science, Analytics & HealthTech"}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    {isVi
                      ? "Khai phá dữ liệu lớn khối phổ và chuyển hóa học (Metabolomics/LC-MS), mô hình hóa toán học dược động học (PK/PD), và phát triển các nền tảng HealthTech hỗ trợ quyết định y học thực chứng."
                      : "Metabolomic big data analytics, mathematical PK/PD modeling, machine learning in oncology, and specialized HealthTech tools empowering evidence-based decisions."}
                  </p>
                </div>
              </div>
            </section>

            {/* Editorial Philosophy & Science Communication */}
            <section className="border-t border-slate-hair pt-8">
              <span className="caps text-slate-ink font-semibold">
                {isVi ? "§ 3 · Sứ mệnh Bình dân hóa Tri thức Y sinh" : "§ 3 · Editorial Mission & Science Communication"}
              </span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                {isVi ? "Vì sao The BioDispatch theo đuổi Tri thức Thực chứng?" : "Democratizing Biomedical Evidence for Clinicians and the Public"}
              </h2>
              {isVi ? (
                <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                  <p>
                    Thông tin y tế hiện nay thường bị mắc kẹt giữa hai thái cực: một bên là các công trình khoa học Q1 quá
                    hàn lâm, khô khan và bị khóa sau các bức tường trả phí học thuật; bên còn lại là các nội dung quảng cáo
                    thương mại thổi phồng, thần thánh hóa thảo dược và thiếu căn cứ khoa học thực chứng.
                  </p>
                  <p>
                    <strong>The BioDispatch</strong> ra đời để thực hiện một sứ mệnh khác biệt: <strong>Khoa học minh bạch, trực quan và dễ hiểu</strong>.
                    Chúng tôi tuân thủ triết lý <em>"Giáo dục trước, không bao giờ thương mại hóa"</em> (Educate first, never sell first).
                    Mọi bài phân tích đều neo chặt vào dữ liệu nghiên cứu thực tế có mã số định danh DOI/PubMed, kết hợp với các mô hình tính
                    toán tương tác giúp người đọc tự kiểm chứng cơ chế sinh học phân tử bằng trực giác của chính mình.
                  </p>
                  <p>
                    Bằng việc kết hợp kiến thức y sinh chuyên sâu với công cụ Data Science và các phép ẩn dụ đời thường gần gũi,
                    TS. Hoàng Xuân Chiến mong muốn trang bị cho người bệnh, y bác sĩ và cộng đồng một lăng kính khoa học sắc bén,
                    giúp mọi người hiểu đúng bản chất cơ thể và đưa ra quyết định chăm sóc sức khỏe an toàn, thông thái.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                  <p>
                    Most health communication is trapped between two extremes: either impenetrable peer-reviewed literature locked
                    behind academic paywalls, or hyper-simplified, scientifically ungrounded marketing claims that overpromise herbal miracles.
                  </p>
                  <p>
                    <strong>The BioDispatch</strong> is committed to a third path: <strong>explorable, transparent, and rigorous science</strong>.
                    Guided by the principle <em>"Educate first, never sell first,"</em> every thesis links directly to verified PubMed/DOI records
                    and provides interactive visual calculators that let readers test physiological mechanisms themselves.
                  </p>
                  <p>
                    By merging deep molecular biology with Data Science and relatable everyday analogies, Dr. Xuan Chien Hoang aims
                    to equip clinicians, patients, and curious readers with the scientific literacy needed to make safe, informed,
                    and evidence-grounded health decisions.
                  </p>
                </div>
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
                  <span className="caps text-slate-ink block">{isVi ? "Học vị Cao nhất" : "Doctorate"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi
                      ? "Tiến sĩ Sinh học Phân tử (Dr. rer. nat.) · ĐH Hamburg, Đức"
                      : "Doctor of Natural Sciences (Dr. rer. nat.) · Univ. of Hamburg"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Chứng chỉ Chuyên sâu" : "Certifications"}</span>
                  <span className="font-semibold text-indigo-deep">
                    Data Science · StackFuel Berlin (2023)
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Doanh nghiệp Sáng lập" : "Founder & Executive"}</span>
                  <span className="font-semibold text-indigo-deep">
                    Lava Health GmbH (Hamburg, CHLB Đức)
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Tổ chức Hội đoàn" : "Leadership & Innovation"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi
                      ? "Ủy viên BCH, Mạng lưới Đổi mới Sáng tạo Việt Nam - Đức (VGI e.V., từ 2019)"
                      : "Board Member, Vietnam - Germany Innovation Network (VGI e.V., since 2019)"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Vinh danh" : "Recognition"}</span>
                  <span className="font-semibold text-indigo-deep">
                    {isVi
                      ? "Giấy khen Đại sứ quán CHXHCN Việt Nam tại CHLB Đức (2017)"
                      : "Certificate of Merit, Vietnamese Ambassador to Germany (2017)"}
                  </span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">{isVi ? "Ngôn ngữ" : "Languages"}</span>
                  <span className="font-semibold text-indigo-deep">Tiếng Việt · Tiếng Đức · Tiếng Anh</span>
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
                {isVi ? "Phòng Lab Mô phỏng Dược học" : "Interactive Simulation Lab"}
              </span>
              <p className="text-xs text-indigo-soft leading-relaxed">
                {isVi
                  ? "Trải nghiệm các mô hình tính toán dược động học, hiệp đồng và dự báo dấu ấn sinh học chạy 100% nội bộ trên trình duyệt."
                  : "Explore client-side pharmacokinetic calculators, synergy matrices, and biomarker forecasting engines."}
              </p>
              <Link
                href="/gizmos"
                className="caps mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-deep hover:text-trace-ink"
              >
                {isVi ? "Khám phá Phòng Thí nghiệm Gizmos →" : "Open Simulation Engines Lab →"}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
