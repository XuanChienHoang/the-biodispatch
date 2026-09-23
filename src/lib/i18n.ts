import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "vi";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: "vi", // Default to Vietnamese as requested by Dr. Hoang
      setLang: (lang) => set({ lang }),
      toggleLang: () =>
        set((state) => ({
          lang: state.lang === "vi" ? "en" : "vi",
        })),
    }),
    {
      name: "biodispatch_lang",
    }
  )
);

export const DICT = {
  en: {
    brandSubtitle: "Evidence-Based Editorial · 2026",
    curatorRole: "Curator: Dr. Xuan Chien Hoang (Dr. rer. nat. · Univ. of Hamburg)",
    heroPill1: "East-West Botanical Bridge",
    heroPill2: "Bioavailability & Simulation",
    heroPill3: "Zero-Hallucination EBM",
    heroTitle: "The BioDispatch.",
    heroSubtitle:
      "An independent analytical publication curated by Dr. Xuan Chien Hoang. Bridging Asian ethnobotanical wisdom with cutting-edge European extraction standards; pioneering bioavailability optimization, supportive oncology formulations, cardiometabolic health, and data-driven HealthTech.",
    exploreCorpus: "Explore Corpus & Dispatches",
    interactiveLab: "Interactive Gizmos Lab",
    aboutAuthor: "About Dr. Hoang",
    leadInvestigator: "Lead Investigator",
    leadInvestigatorSub: "Doctor of Natural Sciences (Univ. of Hamburg)",
    coreFocus: "Strategic Focus",
    coreFocusTitle: "East-West Botanicals & HealthTech",
    coreFocusSub: "Bioavailability, Oncology, CVD & Data Science",
    editorialRigour: "Scientific Rigour",
    editorialRigourTitle: "100% Evidence-Based",
    editorialRigourSub: "PubMed & CrossRef verified citations",
    simEngines: "Simulation Engines",
    simEnginesTitle: "5 Local Calculators",
    simEnginesSub: "PK, Synergy, Biomarkers & TMAO Axis",
    gizmoSectionTitle: "§ 0 · Interactive Pharmacokinetic Instrument",
    gizmoSectionHead: "One switch. Twenty-fold exposure.",
    gizmoSectionDesc:
      "Piperine is not an active ingredient — it is an enzyme inhibitor that suppresses hepatic Phase II glucuronidation. Move the dose slider or toggle the switch to watch the clearance curve deform in real time.",
    corpusTitle: "§ 1 · Article Directory & Corpus",
    corpusHead: "The Corpus.",
    corpusDesc:
      "Filtered by organ system and by analytical depth — from foundational molecular physiology to full interactive pharmacokinetic simulators.",
    organAxis: "Organ Axis",
    complexityAxis: "Complexity",
    all: "All",
    showingDispatches: "Showing",
    of: "of",
    dispatchesText: "dispatches",
    clearFilters: "clear filters",
    readFull: "Read Full Analysis",
    minRead: "min read",
    embeddedGizmo: "Embedded Simulation Gizmo",
    simulationLabTitle: "§ 2 · Simulation Engines & Gizmos Lab",
    simulationLabHead: "Five Laboratory Engines.",
    openFullLab: "Open Full Simulation Lab →",
    runSimulation: "Run Simulation Engine →",
    switchLanguage: "Tiếng Việt 🇻🇳",
  },
  vi: {
    brandSubtitle: "Tòa soạn Y sinh Thực chứng · 2026",
    curatorRole: "Chủ biên: TS. Hoàng Xuân Chiến (Dr. rer. nat. · ĐH Hamburg)",
    heroPill1: "Cầu nối Dược liệu Á - Âu",
    heroPill2: "Tối ưu Hấp thu & Mô phỏng",
    heroPill3: "Y học Thực chứng Chuẩn xác",
    heroTitle: "The BioDispatch.",
    heroSubtitle:
      "Chuyên trang phân tích y sinh độc lập của TS. Hoàng Xuân Chiến. Cầu nối tiên phong giữa tinh hoa dược liệu Á Đông và công nghệ chiết xuất, chuẩn hóa Châu Âu; đột phá công nghệ tối ưu hấp thu (sinh khả dụng), các giải pháp hỗ trợ ung thư, bệnh tim mạch và ứng dụng Data Science trong HealthTech thực chứng.",
    exploreCorpus: "Khám phá Kho Bài viết",
    interactiveLab: "Phòng Mô phỏng Dược học",
    aboutAuthor: "Về TS. Hoàng Xuân Chiến",
    leadInvestigator: "Chuyên gia Chủ biên",
    leadInvestigatorSub: "Tiến sĩ Sinh học Phân tử (ĐH Hamburg)",
    coreFocus: "Định hướng Chiến lược",
    coreFocusTitle: "Dược liệu Á - Âu & HealthTech",
    coreFocusSub: "Tối ưu hấp thu, Ung thư, Tim mạch & Data Science",
    editorialRigour: "Tiêu chuẩn Khoa học",
    editorialRigourTitle: "100% Y học Thực chứng",
    editorialRigourSub: "Đối soát PubMed/DOI, không ảo giác số liệu",
    simEngines: "Bộ máy Mô phỏng",
    simEnginesTitle: "5 Công cụ Tính toán",
    simEnginesSub: "PK, Hiệp đồng, Chỉ số & Trục TMAO",
    gizmoSectionTitle: "§ 0 · Dụng cụ Mô phỏng Dược động học Tương tác",
    gizmoSectionHead: "Chỉ một công tắc. Hấp thu tăng gấp 20 lần.",
    gizmoSectionDesc:
      "Chất piperine trong hạt tiêu đen không phải thuốc bổ — nó là 'chiếc phanh' kìm hãm gan đào thải hoạt chất quá nhanh. Bạn hãy thử gạt công tắc hoặc kéo thanh liều lượng để thấy cơ thể giữ lại tinh chất nghệ ra sao trong thời gian thực.",
    corpusTitle: "§ 1 · Thư viện Báo cáo & Bài Phân tích",
    corpusHead: "Kho Bài viết Chuyên sâu.",
    corpusDesc:
      "Được phân loại theo từng cơ quan trong cơ thể và theo độ sâu phân tích — từ kiến thức sinh học tế bào dễ hiểu đến các công cụ mô phỏng tương tác.",
    organAxis: "Cơ quan",
    complexityAxis: "Mức độ",
    all: "Tất cả",
    showingDispatches: "Hiển thị",
    of: "trên",
    dispatchesText: "bài viết",
    clearFilters: "xóa bộ lọc",
    readFull: "Đọc Bài Phân tích",
    minRead: "phút đọc",
    embeddedGizmo: "Có Dụng cụ Mô phỏng",
    simulationLabTitle: "§ 2 · Phòng Thí nghiệm Mô phỏng Trực quan",
    simulationLabHead: "Năm Công cụ Đo lường Dược học.",
    openFullLab: "Mở Toàn bộ Phòng Lab Mô phỏng →",
    runSimulation: "Chạy Mô phỏng Dược học →",
    switchLanguage: "English 🇬🇧",
  },
};
