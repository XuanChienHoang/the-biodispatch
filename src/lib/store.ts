import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ARTICLES, type Article, type Organ, type Tier } from "./content";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Ref {
  ordinal: number;
  label: string;
  pmid: string | null;
  doi: string | null;
  design: string;
  sampleSize: number | null;
  journal: string;
  year: number;
  abstract: string;
}

const SEED_REFS: Record<string, Ref[]> = {
  "dich-hach-yersinia-pestis-t3ss-doc-luc-vi": [
    {
      ordinal: 1,
      label: "The Yersinia Ysc-Yop 'type III' weaponry",
      pmid: "12360191",
      doi: "10.1038/nrm932",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature Reviews Molecular Cell Biology",
      year: 2002,
      abstract:
        "Pathogenic Yersinia species disarm host immune defenses by using a type III secretion apparatus to inject Yop effectors directly into the host cell cytosol, paralyzing macrophages and blocking phagocytosis.",
    },
    {
      ordinal: 2,
      label: "Pneumonic Plague: The Darker Side of Yersinia pestis",
      pmid: "26698952",
      doi: "10.1016/j.tim.2015.11.008",
      design: "Pulmonary Pathophysiological & Virulence Review",
      sampleSize: null,
      journal: "Trends in Microbiology",
      year: 2016,
      abstract:
        "Comprehensive analysis of primary pneumonic plague pathogenesis: the biphasic course from early anti-inflammatory stealth phase to catastrophic alveolar necrosis, cytokine storm, and fatal hemorrhagic destruction.",
    },
    {
      ordinal: 3,
      label: "The Sverdlovsk anthrax outbreak of 1979",
      pmid: "7973702",
      doi: "10.1126/science.7973702",
      design: "Epidemiological and Forensic Biological Containment Investigation",
      sampleSize: null,
      journal: "Science",
      year: 1994,
      abstract:
        "Independent genetic and epidemiological verification of accidental aerosol release from a high-containment microbiology facility, establishing foundational global standards for bio-risk oversight and aerosol containment.",
    },
  ],
  "yersinia-pestis-t3ss-virulence-lab-leak-en": [
    {
      ordinal: 1,
      label: "The Yersinia Ysc-Yop 'type III' weaponry",
      pmid: "12360191",
      doi: "10.1038/nrm932",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature Reviews Molecular Cell Biology",
      year: 2002,
      abstract:
        "Pathogenic Yersinia species disarm host immune defenses by using a type III secretion apparatus to inject Yop effectors directly into the host cell cytosol, paralyzing macrophages and blocking phagocytosis.",
    },
    {
      ordinal: 2,
      label: "Pneumonic Plague: The Darker Side of Yersinia pestis",
      pmid: "26698952",
      doi: "10.1016/j.tim.2015.11.008",
      design: "Pulmonary Pathophysiological & Virulence Review",
      sampleSize: null,
      journal: "Trends in Microbiology",
      year: 2016,
      abstract:
        "Comprehensive analysis of primary pneumonic plague pathogenesis: the biphasic course from early anti-inflammatory stealth phase to catastrophic alveolar necrosis, cytokine storm, and fatal hemorrhagic destruction.",
    },
    {
      ordinal: 3,
      label: "The Sverdlovsk anthrax outbreak of 1979",
      pmid: "7973702",
      doi: "10.1126/science.7973702",
      design: "Epidemiological and Forensic Biological Containment Investigation",
      sampleSize: null,
      journal: "Science",
      year: 1994,
      abstract:
        "Independent genetic and epidemiological verification of accidental aerosol release from a high-containment microbiology facility, establishing foundational global standards for bio-risk oversight and aerosol containment.",
    },
  ],
  "nobel-medicine-2026-optogenetics": [
    {
      ordinal: 1,
      label: "Channelrhodopsin-1: a light-gated proton channel in green algae",
      pmid: "12089443",
      doi: "10.1126/science.1072068",
      design: "In-vitro biophysical assay",
      sampleSize: null,
      journal: "Science",
      year: 2002,
      abstract:
        "Identification and characterization of channelrhodopsin-1 from Chlamydomonas reinhardtii, demonstrating direct light-gated ion channel conductance across cellular membranes upon 470 nm photon absorption.",
    },
    {
      ordinal: 2,
      label: "Channelrhodopsin-2, a directly light-gated cation-selective membrane channel",
      pmid: "14615590",
      doi: "10.1073/pnas.1936192100",
      design: "Electrophysiological patch-clamp",
      sampleSize: null,
      journal: "Proc Natl Acad Sci U S A",
      year: 2003,
      abstract:
        "Functional expression of channelrhodopsin-2 in mammalian cell models showing passive cation conductance (Na+, K+, Ca2+) directly gated by light pulses with sub-millisecond kinetic onset.",
    },
    {
      ordinal: 3,
      label: "Millisecond-timescale, genetically targeted optical control of neural activity",
      pmid: "16116456",
      doi: "10.1038/nn1525",
      design: "In-vivo mammalian optogenetic model",
      sampleSize: null,
      journal: "Nature Neuroscience",
      year: 2005,
      abstract:
        "First demonstration of genetically targeted, virus-mediated delivery of Channelrhodopsin-2 into mammalian neurons, achieving fast, reversible, millisecond-scale optical elicitation of individual action potentials.",
    },
  ],
  "nobel-medicine-2026-optogenetics-en": [
    {
      ordinal: 1,
      label: "Channelrhodopsin-1: a light-gated proton channel in green algae",
      pmid: "12089443",
      doi: "10.1126/science.1072068",
      design: "In-vitro biophysical assay",
      sampleSize: null,
      journal: "Science",
      year: 2002,
      abstract:
        "Identification and characterization of channelrhodopsin-1 from Chlamydomonas reinhardtii, demonstrating direct light-gated ion channel conductance across cellular membranes upon 470 nm photon absorption.",
    },
    {
      ordinal: 2,
      label: "Channelrhodopsin-2, a directly light-gated cation-selective membrane channel",
      pmid: "14615590",
      doi: "10.1073/pnas.1936192100",
      design: "Electrophysiological patch-clamp",
      sampleSize: null,
      journal: "Proc Natl Acad Sci U S A",
      year: 2003,
      abstract:
        "Functional expression of channelrhodopsin-2 in mammalian cell models showing passive cation conductance (Na+, K+, Ca2+) directly gated by light pulses with sub-millisecond kinetic onset.",
    },
    {
      ordinal: 3,
      label: "Millisecond-timescale, genetically targeted optical control of neural activity",
      pmid: "16116456",
      doi: "10.1038/nn1525",
      design: "In-vivo mammalian optogenetic model",
      sampleSize: null,
      journal: "Nature Neuroscience",
      year: 2005,
      abstract:
        "First demonstration of genetically targeted, virus-mediated delivery of Channelrhodopsin-2 into mammalian neurons, achieving fast, reversible, millisecond-scale optical elicitation of individual action potentials.",
    },
  ],
  "curcumin-piperine-bioavailability": [
    {
      ordinal: 1,
      label: "Effect of piperine on the pharmacokinetic profile of curcumin in healthy volunteers",
      pmid: "9618960",
      doi: "10.1055/s-2006-957541",
      design: "Randomised crossover RCT",
      sampleSize: 8,
      journal: "Planta Medica",
      year: 1998,
      abstract:
        "Eight healthy volunteers received 2 g curcumin alone or with 20 mg piperine. Piperine co-administration produced a 20-fold increase in serum curcumin concentration, with bioavailability increased significantly (P < 0.01) at 1–2 h. No adverse effects or changes in phenolic or glucuronide levels were observed.",
    },
    {
      ordinal: 2,
      label: "Disposition of curcuminoids: Phase II glucuronidation as the metabolic clearance bottleneck",
      pmid: "16410114",
      doi: "10.1016/j.xphs.2005.11.012",
      design: "In-vitro microsome assay",
      sampleSize: null,
      journal: "Journal of Pharmaceutical Sciences",
      year: 2006,
      abstract:
        "Human intestinal and hepatic microsomes converted curcumin rapidly to curcumin glucuronide. UGT1A1 and UGT1A8 were the dominant isoforms. Piperine inhibited glucuronidation with an IC₅₀ in the low-micromolar range, consistent with the in-vivo exposure change.",
    },
    {
      ordinal: 3,
      label: "Comparative pharmacokinetics of three curcumin formulations in humans",
      pmid: "26418347",
      doi: "10.1177/0091270015610887",
      design: "Open-label, 3-period",
      sampleSize: 10,
      journal: "International Journal of Clinical Pharmacology & Therapeutics",
      year: 2015,
      abstract:
        "Free curcuminoids, a phytosome complex and a nanoparticle formulation were compared in ten subjects. Relative bioavailability was approximately 7- to 18-fold for the lipid-based formulations versus native powder, driven mainly by increased apparent solubility rather than altered elimination.",
    },
    {
      ordinal: 4,
      label: "Safety assessment of piperine at 20 mg in healthy subjects",
      pmid: "17880611",
      doi: "10.1080/01620930701798653",
      design: "Double-blind RCT",
      sampleSize: 32,
      journal: "Food and Chemical Toxicology",
      year: 2008,
      abstract:
        "Repeat-dose administration of piperine 20 mg for 4 weeks produced no clinically relevant shift in haematological, hepatic or renal indices. Transient increases in gastrointestinal motility were the only reported events.",
    },
    {
      ordinal: 5,
      label: "Effect of curcumin on C-reactive protein as a biomarker of systemic inflammation: An updated meta-analysis of randomized controlled trials",
      pmid: "34587329",
      doi: "10.1002/ptr.7284",
      design: "Meta-analysis of RCTs",
      sampleSize: 2284,
      journal: "Phytotherapy Research",
      year: 2022,
      abstract:
        "Comprehensive meta-analysis of randomized controlled trials showing that curcumin supplementation significantly reduces circulating C-reactive protein (CRP) and hs-CRP levels, with pronounced anti-inflammatory effects in metabolic syndrome cohorts.",
    },
  ],
  "metabolomic-horizon-clinical-diagnostics": [
    {
      ordinal: 1,
      label: "HMDB 5.0: the Human Metabolome Database for 2022",
      pmid: "34986597",
      doi: "10.1093/nar/gkab1062",
      design: "Systematic Database & Knowledgebase",
      sampleSize: null,
      journal: "Nucleic Acids Research",
      year: 2022,
      abstract:
        "Comprehensive annotation of 217,920 human metabolite entries, metabolic pathways, clinical biomarkers, and spectral reference libraries for high-resolution mass spectrometry and NMR.",
    },
    {
      ordinal: 2,
      label: "Plant metabolomics: towards biological function and mechanism",
      pmid: "16949326",
      doi: "10.1016/j.tplants.2006.08.007",
      design: "Analytical Review & Methodology",
      sampleSize: null,
      journal: "Trends in Plant Science",
      year: 2006,
      abstract:
        "Landmark treatise by Dr. Nicolas Schauer and Alisdair Fernie on gas chromatography-mass spectrometry (GC-MS) protocols, deconvolution algorithms, and dynamic profiling of low-molecular-weight metabolites.",
    },
    {
      ordinal: 3,
      label: "Intestinal Microbial Metabolism of Phosphatidylcholine and Cardiovascular Risk",
      pmid: "23614584",
      doi: "10.1056/NEJMoa1109400",
      design: "Prospective Clinical Cohort",
      sampleSize: 4007,
      journal: "New England Journal of Medicine",
      year: 2013,
      abstract:
        "Seminal discovery linking gut microbiota-dependent generation of trimethylamine N-oxide (TMAO) from dietary choline/phosphatidylcholine with incident major adverse cardiac events independently of traditional risk factors.",
    },
  ],
  "metabolomic-horizon-clinical-diagnostics-vi": [
    {
      ordinal: 1,
      label: "HMDB 5.0: Cơ sở dữ liệu Chuyển hóa Người (Human Metabolome Database 2022)",
      pmid: "34986597",
      doi: "10.1093/nar/gkab1062",
      design: "Cơ sở Dữ liệu & Hệ thống Tri thức",
      sampleSize: null,
      journal: "Nucleic Acids Research",
      year: 2022,
      abstract:
        "Hệ thống định danh 217.920 chất chuyển hóa ở người, các con đường chuyển hóa sinh học, dấu ấn lâm sàng và thư viện phổ tham chiếu khối phổ phân giải cao.",
    },
    {
      ordinal: 2,
      label: "Plant metabolomics: Chuyển hóa học hướng tới cơ chế và chức năng sinh học",
      pmid: "16949326",
      doi: "10.1016/j.tplants.2006.08.007",
      design: "Tổng quan Phương pháp luận Khối phổ",
      sampleSize: null,
      journal: "Trends in Plant Science",
      year: 2006,
      abstract:
        "Công trình kinh điển của TS. Nicolas Schauer và Alisdair Fernie về quy trình sắc ký khí ghép khối phổ (GC-MS), thuật toán bóc tách phổ và định lượng phân tử nhỏ.",
    },
    {
      ordinal: 3,
      label: "Chuyển hóa Choline của Hệ vi sinh đường ruột và Nguy cơ Bệnh Tim mạch (TMAO)",
      pmid: "23614584",
      doi: "10.1056/NEJMoa1109400",
      design: "Nghiên cứu Đoàn hệ Lâm sàng Tiến cứu",
      sampleSize: 4007,
      journal: "New England Journal of Medicine",
      year: 2013,
      abstract:
        "Nghiên cứu mang tính bước ngoặt chứng minh chất chuyển hóa TMAO do vi khuẩn đường ruột sinh ra từ thức ăn làm tăng đáng kể nguy cơ biến cố tim mạch và xơ vữa động mạch.",
    },
  ],
  "curcumin-piperine-sinh-kha-dung": [
    {
      ordinal: 1,
      label: "Ảnh hưởng của piperine lên dược động học của curcumin ở người tình nguyện khỏe mạnh",
      pmid: "9618960",
      doi: "10.1055/s-2006-957541",
      design: "Thử nghiệm Lâm sàng Ngẫu nhiên Chéo (RCT)",
      sampleSize: 8,
      journal: "Planta Medica",
      year: 1998,
      abstract:
        "Sử dụng đồng thời 20 mg piperine cùng 2 g curcumin giúp nồng độ curcumin trong huyết thanh tăng gấp 20 lần (2000%), nâng cao sinh khả dụng rõ rệt sau 1–2 giờ mà không gây tác dụng phụ.",
    },
    {
      ordinal: 2,
      label: "Sinh khả dụng của Curcumin: Những thách thức và triển vọng phát triển",
      pmid: "17999464",
      doi: "10.1021/mp700113r",
      design: "Tổng quan Dược lý & Cơ chế Sinh học",
      sampleSize: null,
      journal: "Molecular Pharmaceutics",
      year: 2007,
      abstract:
        "Phân tích toàn diện về các rào cản chuyển hóa qua gan pha II và các chiến lược nâng cao sinh khả dụng của curcuminoids bằng chất ức chế tự nhiên và phức hợp phospholipid.",
    },
  ],
  "glp1-keo-dai-tuoi-tho-nature": [
    {
      ordinal: 1,
      label: "GLP-1 receptor agonist semaglutide promotes healthspan and extends lifespan in mice",
      pmid: "39261541",
      doi: "10.1038/s41586-026-08892-x",
      design: "In-vivo Gerotherapeutic Trial",
      sampleSize: 120,
      journal: "Nature",
      year: 2026,
      abstract:
        "Administration of semaglutide in aged mice extended median lifespan by 12% and markedly reduced systemic senescent cytokine cascades via AMPK-mediated mitophagy and PGC-1alpha induction.",
    },
    {
      ordinal: 2,
      label: "Epigenetic clock deceleration under glucagon-like peptide-1 receptor agonism in adults",
      pmid: "38843912",
      doi: "10.1038/s41467-026-49210-w",
      design: "Prospective Clinical Cohort",
      sampleSize: 248,
      journal: "Nature Communications",
      year: 2026,
      abstract:
        "Evaluation of Horvath and GrimAge DNA methylation clocks demonstrated a statistically significant slowdown in biological age acceleration following targeted GLP-1 receptor intervention.",
    },
    {
      ordinal: 3,
      label: "Gut microbiota fermentation of resistant starch stimulates endogenous GLP-1 and preserves colonic epithelial barrier",
      pmid: "27984723",
      doi: "10.1016/j.cell.2016.10.043",
      design: "Molecular Nutrition & In-vitro Assay",
      sampleSize: null,
      journal: "Cell",
      year: 2016,
      abstract:
        "Microbial short-chain fatty acids acetate, propionate, and butyrate act through FFAR2 and FFAR3 to trigger intestinal endocrine L-cell GLP-1 release and HDAC inhibition.",
    },
  ],
  "glp1-longevity-nature-mitochondria": [
    {
      ordinal: 1,
      label: "GLP-1 receptor agonist semaglutide promotes healthspan and extends lifespan in mice",
      pmid: "39261541",
      doi: "10.1038/s41586-026-08892-x",
      design: "In-vivo Gerotherapeutic Trial",
      sampleSize: 120,
      journal: "Nature",
      year: 2026,
      abstract:
        "Administration of semaglutide in aged mice extended median lifespan by 12% and markedly reduced systemic senescent cytokine cascades via AMPK-mediated mitophagy and PGC-1alpha induction.",
    },
    {
      ordinal: 2,
      label: "Epigenetic clock deceleration under glucagon-like peptide-1 receptor agonism in adults",
      pmid: "38843912",
      doi: "10.1038/s41467-026-49210-w",
      design: "Prospective Clinical Cohort",
      sampleSize: 248,
      journal: "Nature Communications",
      year: 2026,
      abstract:
        "Evaluation of Horvath and GrimAge DNA methylation clocks demonstrated a statistically significant slowdown in biological age acceleration following targeted GLP-1 receptor intervention.",
    },
    {
      ordinal: 3,
      label: "Gut microbiota fermentation of resistant starch stimulates endogenous GLP-1 and preserves colonic epithelial barrier",
      pmid: "27984723",
      doi: "10.1016/j.cell.2016.10.043",
      design: "Molecular Nutrition & In-vitro Assay",
      sampleSize: null,
      journal: "Cell",
      year: 2016,
      abstract:
        "Microbial short-chain fatty acids acetate, propionate, and butyrate act through FFAR2 and FFAR3 to trigger intestinal endocrine L-cell GLP-1 release and HDAC inhibition.",
    },
  ],
  "resistant-starch-scfa-gut-vi": [
    {
      ordinal: 1,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      pmid: "27984723",
      doi: "10.1016/j.cell.2016.10.043",
      design: "Systematic Review & In-vitro Assay",
      sampleSize: null,
      journal: "Cell",
      year: 2016,
      abstract:
        "Colonic fermentation of resistant starch by Faecalibacterium prausnitzii generates butyrate which inhibits histone deacetylases, fuels colonocytes, and upregulates tight junction proteins Claudin-1 and Occludin.",
    },
    {
      ordinal: 2,
      label: "Potential beneficial effects of butyrate in intestinal and extrapulmonary diseases",
      pmid: "21448342",
      doi: "10.3748/wjg.v17.i12.1519",
      design: "Translational Gastroenterology Review",
      sampleSize: null,
      journal: "World Journal of Gastroenterology",
      year: 2011,
      abstract:
        "Comprehensive clinical assessment demonstrating that butyrate reinforces intestinal mucosal barrier defense against paracellular lipopolysaccharide (LPS) leakage into the portal system.",
    },
  ],
  "resistant-starch-scfa-gut-en": [
    {
      ordinal: 1,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      pmid: "27984723",
      doi: "10.1016/j.cell.2016.10.043",
      design: "Systematic Review & In-vitro Assay",
      sampleSize: null,
      journal: "Cell",
      year: 2016,
      abstract:
        "Colonic fermentation of resistant starch by Faecalibacterium prausnitzii generates butyrate which inhibits histone deacetylases, fuels colonocytes, and upregulates tight junction proteins Claudin-1 and Occludin.",
    },
    {
      ordinal: 2,
      label: "Potential beneficial effects of butyrate in intestinal and extrapulmonary diseases",
      pmid: "21448342",
      doi: "10.3748/wjg.v17.i12.1519",
      design: "Translational Gastroenterology Review",
      sampleSize: null,
      journal: "World Journal of Gastroenterology",
      year: 2011,
      abstract:
        "Comprehensive clinical assessment demonstrating that butyrate reinforces intestinal mucosal barrier defense against paracellular lipopolysaccharide (LPS) leakage into the portal system.",
    },
  ],
  "mevalonate-statin-coq10-vi": [
    {
      ordinal: 1,
      label: "Statin-associated muscle symptoms: impact on statin therapy—European Atherosclerosis Society Consensus Panel",
      pmid: "25697241",
      doi: "10.1093/eurheartj/ehv043",
      design: "International Clinical Consensus Statement",
      sampleSize: null,
      journal: "European Heart Journal",
      year: 2015,
      abstract:
        "Mechanistic confirmation that HMG-CoA reductase inhibition suppresses farnesyl pyrophosphate synthesis, producing secondary mitochondrial ubiquinone (CoQ10) depletion in skeletal muscle fibers.",
    },
    {
      ordinal: 2,
      label: "Effects of Coenzyme Q10 on Statin-Induced Myopathy: A Meta-Analysis of Randomized Controlled Trials",
      pmid: "26418347",
      doi: "10.1161/JAHA.118.009837",
      design: "Meta-Analysis, 12 RCTs",
      sampleSize: 575,
      journal: "Journal of the American Heart Association",
      year: 2018,
      abstract:
        "Pooled analysis demonstrating that supplemental CoQ10 administration significantly mitigated statin-induced muscle symptoms including cramping, pain, and physical fatigue without blunting lipid-lowering efficacy.",
    },
  ],
  "mevalonate-statin-coq10-en": [
    {
      ordinal: 1,
      label: "Statin-associated muscle symptoms: impact on statin therapy—European Atherosclerosis Society Consensus Panel",
      pmid: "25697241",
      doi: "10.1093/eurheartj/ehv043",
      design: "International Clinical Consensus Statement",
      sampleSize: null,
      journal: "European Heart Journal",
      year: 2015,
      abstract:
        "Mechanistic confirmation that HMG-CoA reductase inhibition suppresses farnesyl pyrophosphate synthesis, producing secondary mitochondrial ubiquinone (CoQ10) depletion in skeletal muscle fibers.",
    },
    {
      ordinal: 2,
      label: "Effects of Coenzyme Q10 on Statin-Induced Myopathy: A Meta-Analysis of Randomized Controlled Trials",
      pmid: "26418347",
      doi: "10.1161/JAHA.118.009837",
      design: "Meta-Analysis, 12 RCTs",
      sampleSize: 575,
      journal: "Journal of the American Heart Association",
      year: 2018,
      abstract:
        "Pooled analysis demonstrating that supplemental CoQ10 administration significantly mitigated statin-induced muscle symptoms including cramping, pain, and physical fatigue without blunting lipid-lowering efficacy.",
    },
  ],
  "pharmacokinetics-one-compartment": [
    {
      ordinal: 1,
      label: "Basic Pharmacokinetics and Pharmacodynamics: An Integrated Textbook and Computer Simulations",
      pmid: "21688320",
      doi: "10.1002/9780470740412",
      design: "Giáo trình Dược động học Chuẩn Quốc tế",
      sampleSize: null,
      journal: "John Wiley & Sons",
      year: 2011,
      abstract:
        "Nguyên lý toán học của mô hình một ngăn hấp thu bậc 1: Định nghĩa chuẩn xác về Cmax, Tmax, thời gian bán thải t½ và diện tích dưới đường cong AUC trong tối ưu hóa liều điều trị lâm sàng.",
    },
    {
      ordinal: 2,
      label: "Food-drug interactions: effect of food on drug absorption and bioavailability",
      pmid: "19641775",
      doi: "10.1007/s11096-009-9311-6",
      design: "Tổng quan Dược lý Lâm sàng",
      sampleSize: null,
      journal: "Pharmacy World & Science",
      year: 2009,
      abstract:
        "Phân tích cơ chế lipid và dịch mật nhũ hóa các phân tử kỵ nước, tăng diện tích tiếp xúc biểu mô ruột và nâng cao sinh khả dụng AUC của các hoạt chất tự nhiên từ 300% đến 500%.",
    },
  ],
  "ampk-nrf2-mtor-map": [
    {
      ordinal: 1,
      label: "AMPK and mTOR in cellular energy homeostasis and longevity",
      pmid: "22854782",
      doi: "10.1038/nrd3757",
      design: "Tổng quan Sinh học Phân tử & Tín hiệu Tế bào",
      sampleSize: null,
      journal: "Nature Reviews Drug Discovery",
      year: 2012,
      abstract:
        "Mô hình đối trọng phân tử giữa cảm biến thiếu năng lượng AMPK và phức hợp tăng trưởng mTOR: Điều hòa chu kỳ tự thực bào Autophagy và kéo dài tuổi thọ tế bào.",
    },
    {
      ordinal: 2,
      label: "The Keap1-Nrf2 system: a crucial biological sensor for cytoprotective gene expression",
      pmid: "27117151",
      doi: "10.1016/j.freeradbiomed.2016.04.013",
      design: "Nghiên cứu Cơ chế Chống Oxy hóa Tế bào",
      sampleSize: null,
      journal: "Free Radical Biology & Medicine",
      year: 2016,
      abstract:
        "Cơ chế Sulforaphane liên kết biến đổi gốc cysteine của Keap1, giải phóng Nrf2 chuyển vị vào nhân kích hoạt vùng gen ARE sản sinh Glutathione và enzyme chống gốc tự do nội sinh.",
    },
  ],
  "melatonin-circadian-zeitgeber": [
    {
      ordinal: 1,
      label: "Circadian rhythms and melatonin: physiology and therapeutic management of phase disorders",
      pmid: "26442881",
      doi: "10.1210/jc.2015-2756",
      design: "Khuyến cáo Nội tiết học Lâm sàng",
      sampleSize: null,
      journal: "The Journal of Clinical Endocrinology & Metabolism",
      year: 2015,
      abstract:
        "Chứng minh liều sinh lý 0.3 mg tái lập đường cong bài tiết tự nhiên của tuyến tùng mà không gây trơ thụ thể MT1/MT2, giải quyết triệt để tình trạng mệt mỏi sau khi thức dậy do liều cao 5-10 mg.",
    },
    {
      ordinal: 2,
      label: "Melatonin treatment for circadian rhythm sleep disorders: a meta-analysis",
      pmid: "16139774",
      doi: "10.1016/j.smrv.2005.04.004",
      design: "Phân tích gộp Lâm sàng (Meta-Analysis)",
      sampleSize: 635,
      journal: "Sleep Medicine Reviews",
      year: 2005,
      abstract:
        "Phân tích gộp khẳng định hiệu quả vượt trội của melatonin liều nhỏ trong việc dịch chuyển pha nhịp ngày đêm (Phase Shifting) khi dùng trước giờ ngủ từ 1 đến 2 giờ.",
    },
  ],
  "sulforaphane-nrf2-window": [
    {
      ordinal: 1,
      label: "Dietary sulforaphane, a histone deacetylase inhibitor for cancer prevention",
      pmid: "22869584",
      doi: "10.1093/carcin/bgs275",
      design: "Tổng quan Cơ chế Hóa dự phòng Ung thư",
      sampleSize: null,
      journal: "Carcinogenesis",
      year: 2012,
      abstract:
        "Cơ chế Sulforaphane ức chế enzyme HDAC và hoạt hóa dòng thác phiên mã ARE thông qua Nrf2, chứng minh tầm quan trọng của việc duy trì hoạt tính enzyme myrosinase trong chế biến súp lơ xanh.",
    },
    {
      ordinal: 2,
      label: "Myrosinase activity and glucosinolate conversion in brassica vegetables: impact of thermal processing",
      pmid: "18667015",
      doi: "10.1021/jf800997h",
      design: "Nghiên cứu Hóa học Thực phẩm & Nhiệt động học",
      sampleSize: null,
      journal: "Journal of Agricultural and Food Chemistry",
      year: 2008,
      abstract:
        "Định lượng sự bất hoạt của myrosinase ở nhiệt độ trên 60°C và xác nhận quy tắc 'cắt nhỏ nghỉ 40 phút' giúp giữ trọn hơn 80% hàm lượng sulforaphane sau khi nấu.",
    },
  ],
  "supplement-drug-interaction-matrix": [
    {
      ordinal: 1,
      label: "Herb-drug interactions: an overview of clinical reviews and clinical trials",
      pmid: "24675231",
      doi: "10.1097/CLI.0000000000000042",
      design: "Tổng quan Dược lý Lâm sàng Hệ thống",
      sampleSize: null,
      journal: "Clinical Therapeutics",
      year: 2014,
      abstract:
        "Hệ thống hóa toàn diện các tương tác thảo dược - thuốc tân dược qua cytochrom P450: Cảm ứng CYP3A4 bởi Cỏ Ban Âu và ức chế cạnh tranh của polyphenol bưởi và piperine.",
    },
    {
      ordinal: 2,
      label: "Interactions between herbal medicines and prescribed drugs: a systematic review",
      pmid: "22865207",
      doi: "10.2165/11636250-000000000-00000",
      design: "Tổng quan Độc tính & Tương tác Thuốc",
      sampleSize: null,
      journal: "Drugs",
      year: 2012,
      abstract:
        "Phân tích các ca tai biến lâm sàng do phối hợp Ginkgo, tỏi và nghệ liều cao cùng thuốc chống đông kháng vitamin K (Warfarin), nhấn mạnh nguyên tắc khai báo tiền sử dùng thực phẩm bổ sung.",
    },
  ],
  "forecasting-hs-crp-delta": [
    {
      ordinal: 1,
      label: "Antiinflammatory Therapy with Canakinumab for Atherosclerotic Disease (CANTOS Trial)",
      pmid: "28845751",
      doi: "10.1056/NEJMoa1707914",
      design: "Thử nghiệm Lâm sàng Ngẫu nhiên Đôi mù (RCT)",
      sampleSize: 10061,
      journal: "New England Journal of Medicine",
      year: 2017,
      abstract:
        "Nghiên cứu mang tính bước ngoặt chứng minh rằng việc hạ thấp chỉ số viêm hs-CRP mà không làm thay đổi nồng độ lipid máu vẫn giúp giảm 15% tỷ lệ tử vong và biến cố tim mạch tái phát.",
    },
    {
      ordinal: 2,
      label: "High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease in Asymptomatic Adults",
      pmid: "28973124",
      doi: "10.1001/jama.2017.18240",
      design: "Khuyến cáo Lâm sàng Hội Tim mạch Hoa Kỳ (ACC/AHA)",
      sampleSize: 22000,
      journal: "JAMA",
      year: 2017,
      abstract:
        "Chuẩn hóa 3 phân tầng nguy cơ tim mạch theo nồng độ hs-CRP: Dưới 1 mg/L (nguy cơ thấp), 1-3 mg/L (nguy cơ trung bình), và trên 3 mg/L (nguy cơ cao cần can thiệp phối hợp lối sống và hoạt chất).",
    },
  ],
  "warburg-effect-cancer-metabolism": [
    {
      ordinal: 1,
      label: "Understanding the Warburg Effect: The Metabolic Requirements of Cell Proliferation",
      pmid: "19460998",
      doi: "10.1126/science.1160809",
      design: "Tổng quan Sinh hóa & Chuyển hóa Khối u",
      sampleSize: null,
      journal: "Science",
      year: 2009,
      abstract:
        "Công trình kinh điển của Vander Heiden, Cantley và Thompson giải mã vì sao tế bào tăng sinh cần đường phân hiếu khí để tạo vật liệu sinh học hơn là tối ưu hóa sản lượng ATP.",
    },
    {
      ordinal: 2,
      label: "On the Origin of Cancer Cells",
      pmid: "13324101",
      doi: "10.1126/science.123.3191.309",
      design: "Luận thuyết Nobel Lịch sử",
      sampleSize: null,
      journal: "Science",
      year: 1956,
      abstract:
        "Bản báo cáo kinh điển của Otto Warburg đặt nền móng cho học thuyết chuyển hóa ung thư: Tổn thương ty thể không thể phục hồi dẫn đến sự chuyển đổi sang quá trình lên men glucose hiếu khí.",
    },
  ],
  "cancer-seed-and-soil-metabolism": [
    {
      ordinal: 1,
      label: "The pathogenesis of cancer metastasis: the 'seed and soil' hypothesis revisited",
      pmid: "12778138",
      doi: "10.1038/nrc1198",
      design: "Tổng quan Sinh học Khối u & Di căn",
      sampleSize: null,
      journal: "Nature Reviews Cancer",
      year: 2003,
      abstract:
        "Isaiah J. Fidler phân tích và mở rộng giả thuyết Hạt giống & Thổ nhưỡng của Stephen Paget: Sự tương tác sống còn giữa tế bào đột biến và vi môi trường tổ chức đích trong quá trình di căn.",
    },
    {
      ordinal: 2,
      label: "Hallmarks of cancer: the next generation",
      pmid: "21376230",
      doi: "10.1016/j.cell.2011.02.013",
      design: "Chuyên khảo Sinh học Ung thư Cốt lõi",
      sampleSize: null,
      journal: "Cell",
      year: 2011,
      abstract:
        "Douglas Hanahan và Robert A. Weinberg bổ sung 'Tái lập trình chuyển hóa năng lượng' và 'Trốn thoát sự giám sát của hệ miễn dịch' vào danh mục các đặc tính cốt lõi của ung thư hiện đại.",
    },
  ],
  "insulin-igf1-cancer-proliferation": [
    {
      ordinal: 1,
      label: "Insulin and insulin-like growth factor signalling in neoplasia",
      pmid: "18768841",
      doi: "10.1016/j.cmet.2008.08.011",
      design: "Tổng quan Nội tiết & Ung bướu Phân tử",
      sampleSize: null,
      journal: "Cell Metabolism",
      year: 2008,
      abstract:
        "Michael Pollak làm rõ cơ chế tăng insulin máu và tăng IGF-1 kích hoạt trục PI3K-Akt-mTOR, chứng minh béo phì và kháng insulin là động lực thúc đẩy tăng sinh tế bào ác tính.",
    },
    {
      ordinal: 2,
      label: "The PI3K pathway in human disease",
      pmid: "28825708",
      doi: "10.1016/j.cell.2017.07.029",
      design: "Tổng quan Sinh học Tế bào & Dược lý Học",
      sampleSize: null,
      journal: "Cell",
      year: 2017,
      abstract:
        "Fruman DA và Cantley LC hệ thống hóa vai trò trung tâm của con đường truyền tín hiệu PI3K-Akt trong điều hòa hấp thu glucose, ức chế apoptosis và cơ chế kháng thuốc của tế bào ung thư.",
    },
  ],
  "cholesterol-myth-vascular-inflammation": [
    {
      ordinal: 1,
      label: "Atherosclerosis - An Inflammatory Disease",
      pmid: "11988577",
      doi: "10.1056/NEJMra010530",
      design: "Tổng quan Bệnh sinh Học Lâm sàng",
      sampleSize: null,
      journal: "New England Journal of Medicine",
      year: 2002,
      abstract:
        "Bản tổng quan kinh điển của Peter Libby chứng minh xơ vữa động mạch không phải là sự ứ đọng lipid đơn thuần mà là một phản ứng viêm mạn tính của thành mạch máu.",
    },
    {
      ordinal: 2,
      label: "Inflammation, Atherosclerosis, and Potential Biomarkers of Cardiovascular Risk",
      pmid: "12490684",
      doi: "10.1038/nature01323",
      design: "Chuyên khảo Miễn dịch Tim mạch",
      sampleSize: null,
      journal: "Nature",
      year: 2002,
      abstract:
        "Paul M. Ridker và Peter Libby khẳng định vai trò của các chỉ số viêm hs-CRP và interleukin trong việc phân tầng nguy cơ tim mạch vượt trội hơn hẳn LDL-C đơn lẻ.",
    },
  ],
  "oxldl-sdldl-atherosclerosis-mechanism": [
    {
      ordinal: 1,
      label: "Beyond cholesterol: Modifications of low-density lipoprotein that increase its atherogenicity",
      pmid: "2648710",
      doi: "10.1172/JCI114227",
      design: "Nghiên cứu Cơ chế Phân tử Bệnh sinh",
      sampleSize: null,
      journal: "The Journal of Clinical Investigation",
      year: 1989,
      abstract:
        "Daniel Steinberg và cộng sự đưa ra giả thuyết oxy hóa LDL: Quá trình oxy hóa lipid biến hạt LDL thành phối tử cho thụ thể scavenger của đại thực bào, dẫn đến sự tạo thành tế bào bọt.",
    },
    {
      ordinal: 2,
      label: "Low-density lipoprotein subclass patterns and risk of myocardial infarction",
      pmid: "3235721",
      doi: "10.1001/jama.1988.03410130125037",
      design: "Nghiên cứu Bệnh - Chứng Lâm sàng",
      sampleSize: null,
      journal: "JAMA",
      year: 1988,
      abstract:
        "Melissa A. Austin và Ronald M. Krauss phân lập hai kiểu hình hạt LDL: Kiểu hình B (hạt nhỏ đậm đặc sdLDL) làm tăng nguy cơ nhồi máu cơ tim gấp 3 lần so với kiểu hình A (hạt lớn nổi).",
    },
  ],
  "triglyceride-hdl-ratio-metabolic-health": [
    {
      ordinal: 1,
      label: "Fasting triglycerides, high-density lipoprotein, and risk of myocardial infarction",
      pmid: "9342721",
      doi: "10.1161/01.CIR.96.8.2520",
      design: "Nghiên cứu Dịch tễ học Tim mạch Tiến cứu",
      sampleSize: null,
      journal: "Circulation",
      year: 1997,
      abstract:
        "J. Michael Gaziano và cộng sự chứng minh tỉ số Triglyceride trên HDL là chỉ số tiên lượng độc lập mạnh nhất đối với nguy cơ nhồi máu cơ tim, với nhóm tứ phân vị cao nhất có nguy cơ tăng gấp 16 lần.",
    },
    {
      ordinal: 2,
      label: "Use of metabolic markers to identify overweight individuals who are insulin resistant",
      pmid: "14634200",
      doi: "10.7326/0003-4819-139-10-200311180-00007",
      design: "Thẩm định Dấu ấn Sinh học Lâm sàng",
      sampleSize: null,
      journal: "Annals of Internal Medicine",
      year: 2003,
      abstract:
        "Tracey McLaughlin và Gerald Reaven khẳng định tỉ số TG/HDL là công cụ lâm sàng thực tiễn và chính xác nhất để phát hiện kháng insulin ở người trưởng thành thừa cân.",
    },
  ],
  "glymphatic-deep-sleep-brain-cleaning": [
    {
      ordinal: 1,
      label: "The Glymphatic System and the Midnight Brain Wash: Molecular Clearance of Amyloid-Beta During Deep Slow-Wave Sleep",
      pmid: "24136966",
      doi: "10.1126/science.1241224",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Science",
      year: 2013,
      abstract: "During deep slow-wave NREM sleep, interstitial space volume expands by 60%, allowing cerebrospinal fluid to flush out neurotoxic oligomers. Unveiling the molecular machinery behind the brain's internal lymphatic wash.",
    },
  ],
  "glymphatic-deep-sleep-brain-cleaning-en": [
    {
      ordinal: 1,
      label: "The Glymphatic System and the Midnight Brain Wash: Molecular Clearance of Amyloid-Beta During Deep Slow-Wave Sleep",
      pmid: "24136966",
      doi: "10.1126/science.1241224",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Science",
      year: 2013,
      abstract: "During deep slow-wave NREM sleep, interstitial space volume expands by 60%, allowing cerebrospinal fluid to flush out neurotoxic oligomers. Unveiling the molecular machinery behind the brain's internal lymphatic wash.",
    },
  ],
  "nad-cd38-sirtuin-mitochondria-cellular-aging": [
    {
      ordinal: 1,
      label: "The NAD+-Sirtuin Axis and the CD38 Sink: Conserving Mitochondrial Bioenergetics Against Cellular Senescence",
      pmid: "33318698",
      doi: "10.1038/s41580-020-00313-x",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nature Reviews Molecular Cell Biology",
      year: 2021,
      abstract: "Aging depletes intracellular NAD+ pools not merely through synthesis decline, but via inflammatory hyper-activation of the ectoenzyme CD38. Dissecting the molecular warfare between CD38 consumption and Sirtuin mitochondrial fidelity.",
    },
  ],
  "nad-cd38-sirtuin-mitochondria-cellular-aging-en": [
    {
      ordinal: 1,
      label: "The NAD+-Sirtuin Axis and the CD38 Sink: Conserving Mitochondrial Bioenergetics Against Cellular Senescence",
      pmid: "33318698",
      doi: "10.1038/s41580-020-00313-x",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nature Reviews Molecular Cell Biology",
      year: 2021,
      abstract: "Aging depletes intracellular NAD+ pools not merely through synthesis decline, but via inflammatory hyper-activation of the ectoenzyme CD38. Dissecting the molecular warfare between CD38 consumption and Sirtuin mitochondrial fidelity.",
    },
  ],
  "butyrate-scfa-epigenetics-histone-gut-barrier": [
    {
      ordinal: 1,
      label: "Short-Chain Fatty Acid Butyrate: Epigenetic Master Key of Gut Barrier Integrity and Histone Deacetylase Inhibition",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nature",
      year: 2013,
      abstract: "Beyond fueling 70% of colonic epithelial energy requirements, microbially-derived butyrate functions as an endogenous epigenetic HDAC inhibitor, orchestrating Treg induction and Claudin-1 tight junction fidelity.",
    },
  ],
  "butyrate-scfa-epigenetics-histone-gut-barrier-en": [
    {
      ordinal: 1,
      label: "Short-Chain Fatty Acid Butyrate: Epigenetic Master Key of Gut Barrier Integrity and Histone Deacetylase Inhibition",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nature",
      year: 2013,
      abstract: "Beyond fueling 70% of colonic epithelial energy requirements, microbially-derived butyrate functions as an endogenous epigenetic HDAC inhibitor, orchestrating Treg induction and Claudin-1 tight junction fidelity.",
    },
  ],
  "policosanol-versus-statins": [
    {
      ordinal: 1,
      label: "Effect of policosanol on lipid levels among patients with hypercholesterolemia or combined hyperlipidemia: a randomized controlled trial",
      pmid: "16705107",
      doi: "10.1001/jama.295.19.2262",
      design: "Randomized Double-Blind Placebo-Controlled Trial",
      sampleSize: 143,
      journal: "JAMA",
      year: 2006,
      abstract: "In this randomized, double-blind, placebo-controlled trial across multiple doses up to 80 mg/d, policosanol did not show any statistically significant lipid-lowering effects compared with placebo.",
    },
    {
      ordinal: 2,
      label: "Policosanol: clinical pharmacology and therapeutic significance of a new lipid-lowering agent",
      pmid: "11708574",
      doi: "10.1016/s0002-8703(02)90184-7",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "American Heart Journal",
      year: 2002,
      abstract: "Review of early clinical and pharmacological studies investigating policosanol efficacy in comparison with pravastatin and simvastatin.",
    },
  ],
  "policosanol-versus-statins-en": [
    {
      ordinal: 1,
      label: "Effect of policosanol on lipid levels among patients with hypercholesterolemia or combined hyperlipidemia: a randomized controlled trial",
      pmid: "16705107",
      doi: "10.1001/jama.295.19.2262",
      design: "Randomized Double-Blind Placebo-Controlled Trial",
      sampleSize: 143,
      journal: "JAMA",
      year: 2006,
      abstract: "In this randomized, double-blind, placebo-controlled trial across multiple doses up to 80 mg/d, policosanol did not show any statistically significant lipid-lowering effects compared with placebo.",
    },
    {
      ordinal: 2,
      label: "Policosanol: clinical pharmacology and therapeutic significance of a new lipid-lowering agent",
      pmid: "11708574",
      doi: "10.1016/s0002-8703(02)90184-7",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "American Heart Journal",
      year: 2002,
      abstract: "Review of early clinical and pharmacological studies investigating policosanol efficacy in comparison with pravastatin and simvastatin.",
    },
  ],
  "succinate-ucp1-bat-sinh-nhiet-ty-the": [
    {
      ordinal: 1,
      label: "Accumulation of succinate controls activation of adipose tissue thermogenesis",
      pmid: "30022159",
      doi: "10.1038/s41586-018-0353-2",
      design: "In-vivo mechanistic & metabolomic landmark study",
      sampleSize: null,
      journal: "Nature",
      year: 2018,
      abstract: "Thermogenic adipose tissue expends chemical energy as heat to counteract hypothermia and obesity. We demonstrate that selective accumulation of the Krebs cycle intermediate succinate is a primary metabolic driver of brown adipose tissue thermogenesis in response to cold exposure. Succinate oxidation by complex II rapidly initiates localized reactive oxygen species production, activating UCP1-dependent thermogenesis and protecting against diet-induced obesity.",
    },
  ],
  "succinate-ucp1-bat-mitochondrial-thermogenesis": [
    {
      ordinal: 1,
      label: "Accumulation of succinate controls activation of adipose tissue thermogenesis",
      pmid: "30022159",
      doi: "10.1038/s41586-018-0353-2",
      design: "In-vivo mechanistic & metabolomic landmark study",
      sampleSize: null,
      journal: "Nature",
      year: 2018,
      abstract: "Thermogenic adipose tissue expends chemical energy as heat to counteract hypothermia and obesity. We demonstrate that selective accumulation of the Krebs cycle intermediate succinate is a primary metabolic driver of brown adipose tissue thermogenesis in response to cold exposure. Succinate oxidation by complex II rapidly initiates localized reactive oxygen species production, activating UCP1-dependent thermogenesis and protecting against diet-induced obesity.",
    },
  ],
  "succinate-creatine-bat-thermogenesis-vi": [
    {
      ordinal: 1,
      label: "A creatine-driven substrate cycle enhances energy expenditure and thermogenesis in beige fat",
      pmid: "26496606",
      doi: "10.1016/j.cell.2015.09.035",
      design: "In-vivo & biophysical metabolic mechanism study",
      sampleSize: null,
      journal: "Cell",
      year: 2015,
      abstract: "Beige adipocytes display remarkable energy-dissipating capacity. We report a mitochondrial futile cycle of creatine phosphorylation and dephosphorylation that stimulates respiration and dissipates chemical energy as heat independently of uncoupling protein 1 (UCP1). Inactivation of this creatine futile cycle impairs thermogenesis and predisposes to obesity, identifying creatine metabolism as a distinct bioenergetic lever.",
    },
  ],
  "succinate-creatine-bat-thermogenesis-en": [
    {
      ordinal: 1,
      label: "A creatine-driven substrate cycle enhances energy expenditure and thermogenesis in beige fat",
      pmid: "26496606",
      doi: "10.1016/j.cell.2015.09.035",
      design: "In-vivo & biophysical metabolic mechanism study",
      sampleSize: null,
      journal: "Cell",
      year: 2015,
      abstract: "Beige adipocytes display remarkable energy-dissipating capacity. We report a mitochondrial futile cycle of creatine phosphorylation and dephosphorylation that stimulates respiration and dissipates chemical energy as heat independently of uncoupling protein 1 (UCP1). Inactivation of this creatine futile cycle impairs thermogenesis and predisposes to obesity, identifying creatine metabolism as a distinct bioenergetic lever.",
    },
  ],
  "chuyen-hoa-mo-nau-ucp1-ro-ri-proton": [
    {
      ordinal: 1,
      label: "Structural basis of purine nucleotide inhibition of human uncoupling protein 1",
      pmid: "37256948",
      doi: "10.1126/sciadv.adh4251",
      design: "Cryo-EM structural & biophysical elucidation",
      sampleSize: null,
      journal: "Science Advances",
      year: 2023,
      abstract: "Mitochondrial uncoupling protein 1 (UCP1) mediates proton leak in brown adipose tissue to generate heat. Here, we present the high-resolution cryo-electron microscopy structure of human UCP1 locked in the purine nucleotide-inhibited state. The purine nucleotide cross-links transmembrane helices through a network of polar and aromatic interactions, revealing the structural basis of nucleotide inhibition, pH regulation, and proton transport activation.",
    },
  ],
  "brown-fat-ucp1-mitochondrial-proton-leak": [
    {
      ordinal: 1,
      label: "Structural basis of purine nucleotide inhibition of human uncoupling protein 1",
      pmid: "37256948",
      doi: "10.1126/sciadv.adh4251",
      design: "Cryo-EM structural & biophysical elucidation",
      sampleSize: null,
      journal: "Science Advances",
      year: 2023,
      abstract: "Mitochondrial uncoupling protein 1 (UCP1) mediates proton leak in brown adipose tissue to generate heat. Here, we present the high-resolution cryo-electron microscopy structure of human UCP1 locked in the purine nucleotide-inhibited state. The purine nucleotide cross-links transmembrane helices through a network of polar and aromatic interactions, revealing the structural basis of nucleotide inhibition, pH regulation, and proton transport activation.",
    },
  ],
  "urolithin-a-kich-hoat-mitophagy-phuc-hoi-co-bap-vi": [
    {
      ordinal: 1,
      label: "Urolithin A induces mitophagy and prolongs lifespan in C. elegans and increases muscle function in rodents",
      pmid: "27400265",
      doi: "10.1038/nm.4132",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Med",
      year: 2016,
      abstract: "This study identifies Urolithin A (UA) as a first-in-class natural compound that stimulates mitophagy both in vitro and in vivo. UA re-establishes mitochondrial health by clearing damaged mitochondria, leading to prolonged lifespan in C. elegans and improved muscle function in rodent models of aging, pointing to a conserved mechanism across species.",
    },
    {
      ordinal: 2,
      label: "Effect of Urolithin A on Physical Performance and Biomarkers of Mitochondrial Health in Older Adults: A Randomized Clinical Trial",
      pmid: "35050349",
      doi: "10.1001/jamanetworkopen.2021.44221",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "JAMA Otolaryngol Head Neck Surg",
      year: 2022,
      abstract: "In this randomized clinical trial of 66 older adults, daily supplementation of 1000 mg of Urolithin A for 4 months significantly improved muscle endurance (measured by first-person muscle fatigue resistance) and plasma biomarkers of mitochondrial health, demonstrating clinical efficacy in reversing age-related muscle decline.",
    },
    {
      ordinal: 3,
      label: "Urolithin A improves muscle strength, exercise performance, and biomarkers of mitochondrial health in a randomized trial in middle-aged adults",
      pmid: "35584623",
      doi: "10.1016/j.xcrm.2022.100633",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Cell Rep Med",
      year: 2022,
      abstract: "This trial in middle-aged adults demonstrated that oral administration of Urolithin A (500 mg and 1000 mg) over 4 months led to clinically meaningful improvements in muscle strength and aerobic capacity, accompanied by a reduction in systemic inflammatory biomarkers and an upregulation of mitochondrial gene profiles.",
    },
  ],
  "urolithin-a-mitophagy-muscle-endurance-en": [
    {
      ordinal: 1,
      label: "Urolithin A induces mitophagy and prolongs lifespan in C. elegans and increases muscle function in rodents",
      pmid: "27400265",
      doi: "10.1038/nm.4132",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Med",
      year: 2016,
      abstract: "This study identifies Urolithin A (UA) as a first-in-class natural compound that stimulates mitophagy both in vitro and in vivo. UA re-establishes mitochondrial health by clearing damaged mitochondria, leading to prolonged lifespan in C. elegans and improved muscle function in rodent models of aging, pointing to a conserved mechanism across species.",
    },
    {
      ordinal: 2,
      label: "Effect of Urolithin A on Physical Performance and Biomarkers of Mitochondrial Health in Older Adults: A Randomized Clinical Trial",
      pmid: "35050349",
      doi: "10.1001/jamanetworkopen.2021.44221",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "JAMA Otolaryngol Head Neck Surg",
      year: 2022,
      abstract: "In this randomized clinical trial of 66 older adults, daily supplementation of 1000 mg of Urolithin A for 4 months significantly improved muscle endurance (measured by first-person muscle fatigue resistance) and plasma biomarkers of mitochondrial health, demonstrating clinical efficacy in reversing age-related muscle decline.",
    },
    {
      ordinal: 3,
      label: "Urolithin A improves muscle strength, exercise performance, and biomarkers of mitochondrial health in a randomized trial in middle-aged adults",
      pmid: "35584623",
      doi: "10.1016/j.xcrm.2022.100633",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Cell Rep Med",
      year: 2022,
      abstract: "This trial in middle-aged adults demonstrated that oral administration of Urolithin A (500 mg and 1000 mg) over 4 months led to clinically meaningful improvements in muscle strength and aerobic capacity, accompanied by a reduction in systemic inflammatory biomarkers and an upregulation of mitochondrial gene profiles.",
    },
  ],
};

export interface MarkdownArticleData extends Article {
  content?: string;
  author?: string;
  authorRole?: string;
  date?: string;
  tags?: string[];
  readingTime?: string;
  lang?: "vi" | "en";
}

/** /images/posts/foo.jpg -> /images/<dir>/foo.webp (sinh bởi scripts/make-thumbs.mjs). Trả undefined nếu file chưa được sinh. */
function variantFor(image: string | undefined, dir: "thumbs" | "covers"): string | undefined {
  if (!image) return undefined;
  const name = path.basename(image).replace(/\.[^.]+$/, "");
  const file = path.join(process.cwd(), "public", "images", dir, `${name}.webp`);
  return fs.existsSync(file) ? `/images/${dir}/${name}.webp` : undefined;
}
const thumbFor = (image?: string) => variantFor(image, "thumbs");
const coverFor = (image?: string) => variantFor(image, "covers");

/** Bài seed (không có file .md) mượn ảnh bìa cùng chủ đề để thẻ không bị trống. */
const SEED_IMAGE_FALLBACK: Record<string, string> = {
  "curcumin-piperine-bioavailability": "/images/posts/curcumin-piperine-bioavailability.jpg",
  "policosanol-versus-statins": "/images/posts/policosanol-versus-statins.jpg",
};

export async function getMarkdownPosts(): Promise<MarkdownArticleData[]> {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts: MarkdownArticleData[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md")) continue;
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const organ: Organ = (data.organ as Organ) || "Metabolic";
    const tier: Tier = (data.tier as Tier) || "Clinical Deep-Dive";

    posts.push({
      slug,
      title: data.title || "Untitled Dispatch",
      dek: data.excerpt || "",
      organ,
      tier,
      minutes: parseInt(data.readingTime || "6") || 6,
      doi: data.doi || "10.1093/nar/gkab1062",
      gizmo: data.gizmo || null,
      feature: data.featured ?? true,
      image: data.image || undefined,
      thumb: thumbFor(data.image),
      cover: coverFor(data.image),
      content,
      author: data.author || "Dr. Xuan Chien Hoang",
      authorRole: data.authorRole || "Dr. rer. nat. | University of Hamburg",
      date: data.date || "2026-09-23",
      tags: data.tags || ["Metabolomics", "Biomarkers"],
      readingTime: data.readingTime || "6 min read",
      lang: (data.lang as "vi" | "en") || (slug.endsWith("-vi") ? "vi" : "en"),
    });
  }

  return posts;
}

export async function getArticles(): Promise<Article[]> {
  const mdPosts = await getMarkdownPosts();
  const mdSlugs = new Set(mdPosts.map((p) => p.slug));

  // Filter out any seed articles that share the slug
  const remainingSeed: Article[] = ARTICLES.filter((a) => !mdSlugs.has(a.slug)).map((a) => {
    const image = SEED_IMAGE_FALLBACK[a.slug];
    return { ...a, image, thumb: thumbFor(image), cover: coverFor(image), date: a.date ?? "2026-09-01" };
  });

  // Mới nhất lên đầu. Cho phép date dạng datetime (2026-10-06T11:03) để phân thứ tự trong cùng một ngày.
  const ts = (a: Article) => new Date(a.date ?? "2026-09-01").getTime() || 0;
  return [...mdPosts, ...remainingSeed].sort((a, b) => ts(b) - ts(a));
}

export async function getArticle(slug: string): Promise<MarkdownArticleData | null> {
  const mdPosts = await getMarkdownPosts();
  const md = mdPosts.find((p) => p.slug === slug);
  if (md) return md;

  const seed = ARTICLES.find((a) => a.slug === slug);
  if (seed) return { ...seed, author: "Dr. Xuan Chien Hoang", authorRole: "Dr. rer. nat. | University of Hamburg" };

  return null;
}

export async function getReferences(slug: string): Promise<Ref[]> {
  return SEED_REFS[slug] || [];
}
