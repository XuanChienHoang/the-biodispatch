import { create } from "zustand";

export type Language = "en" | "vi";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: "vi", // Default to Vietnamese as requested by Dr. Hoang
  setLang: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("biodispatch_lang", lang);
    }
    set({ lang });
  },
  toggleLang: () => {
    set((state) => {
      const next = state.lang === "vi" ? "en" : "vi";
      if (typeof window !== "undefined") {
        localStorage.setItem("biodispatch_lang", next);
      }
      return { lang: next };
    });
  },
}));

export const DICT = {
  en: {
    brandSubtitle: "Evidence-Based Editorial · 2026",
    curatorRole: "Curator: Dr. Xuan Chien Hoang (Dr. rer. nat.)",
    heroPill1: "Metabolomic Telemetry",
    heroPill2: "Interactive Simulation Engines",
    heroPill3: "Zero-Hallucination Verified",
    heroTitle: "The BioDispatch.",
    heroSubtitle:
      "An independent analytical publication delivering rigorous, evidence-based insights at the intersection of biotechnology, metabolomics, and next-generation clinical healthcare. Every thesis is anchored in peer-reviewed literature, mass spectrometry telemetry, and verifiable pharmacokinetic models.",
    exploreCorpus: "Explore Corpus & Dispatches",
    interactiveLab: "Interactive Gizmos Lab",
    aboutAuthor: "About Lead Author",
    leadInvestigator: "Lead Investigator",
    leadInvestigatorSub: "Doctor of Natural Sciences (Hamburg)",
    coreFocus: "Core Focus",
    coreFocusTitle: "Metabolomics & TechBio",
    coreFocusSub: "Targeted / Untargeted mass spec profiling",
    editorialRigour: "Editorial Rigour",
    editorialRigourTitle: "100% DOI Verified",
    editorialRigourSub: "NCBI PubMed & CrossRef verified citations",
    simEngines: "Simulation Engines",
    simEnginesTitle: "4 Local Calculators",
    simEnginesSub: "1-compartment PK, Synergy & Biomarkers",
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
    simulationLabHead: "Four Laboratory Engines.",
    openFullLab: "Open Full Simulation Lab →",
    runSimulation: "Run Simulation Engine →",
    switchLanguage: "Tiếng Việt 🇻🇳",
  },
  vi: {
    brandSubtitle: "Tòa soạn Y sinh Thực chứng · 2026",
    curatorRole: "Chủ biên: TS. Hoàng Xuân Chiến (Dr. rer. nat.)",
    heroPill1: "Dữ liệu Chuyển hóa Thực chứng",
    heroPill2: "Mô phỏng Động học Tương tác",
    heroPill3: "Đối soát Y văn Chuẩn xác",
    heroTitle: "The BioDispatch.",
    heroSubtitle:
      "Chuyên trang phân tích độc lập, cung cấp những góc nhìn thực chứng và sâu sắc tại giao điểm của công nghệ sinh học, chuyển hóa học (metabolomics) và đổi mới sáng tạo y tế. Diễn giải các nghiên cứu y sinh phức tạp thành ngôn ngữ khoa học sáng rõ, dễ hiểu và có thể kiểm chứng.",
    exploreCorpus: "Khám phá Kho Bài viết",
    interactiveLab: "Phòng Mô phỏng Dược học",
    aboutAuthor: "Về Tác giả Chủ biên",
    leadInvestigator: "Chuyên gia Chủ biên",
    leadInvestigatorSub: "Tiến sĩ Khoa học Tự nhiên (ĐH Hamburg)",
    coreFocus: "Lĩnh vực Trọng tâm",
    coreFocusTitle: "Chuyển hóa học & TechBio",
    coreFocusSub: "Định lượng khối phổ & Dấu ấn sinh học",
    editorialRigour: "Tiêu chuẩn Khoa học",
    editorialRigourTitle: "100% Đối soát DOI/PubMed",
    editorialRigourSub: "Y văn bình duyệt, không ảo giác số liệu",
    simEngines: "Bộ máy Mô phỏng",
    simEnginesTitle: "4 Công cụ Tính toán",
    simEnginesSub: "Dược động học PK, Tương tác & Chỉ số",
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
    simulationLabHead: "Bốn Công cụ Đo lường Dược học.",
    openFullLab: "Mở Toàn bộ Phòng Lab Mô phỏng →",
    runSimulation: "Chạy Mô phỏng Dược học →",
    switchLanguage: "English 🇬🇧",
  },
};
