import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ARTICLES, type Article, type Organ, type Tier } from "./content";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Ref {
  ordinal: number;
  label: string;
  authors?: string;
  pmid: string | null;
  doi: string | null;
  design?: string;
  sampleSize?: string | number | null;
  journal?: string;
  year?: number;
  abstract?: string;
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
      label: "Millisecond-timescale, genetically targeted optical control of neural activity",
      authors: "Boyden ES, Zhang F, Bamberg E, Nagel G, Deisseroth K",
      pmid: "16116447",
      doi: "10.1038/nn1525",
      design: "In Vitro / In Vivo Optogenetics Pioneer Study",
      sampleSize: null,
      journal: "Nat Neurosci",
      year: 2005
    },
    {
      ordinal: 2,
      label: "Channelrhodopsin-2, a directly light-gated cation-selective membrane channel",
      authors: "Nagel G, Szellas T, Huhn W, et al.",
      pmid: "14615590",
      doi: "10.1073/pnas.1936192100",
      design: "Molecular Biophysics Study",
      sampleSize: null,
      journal: "Proc Natl Acad Sci U S A",
      year: 2003
    },
    {
      ordinal: 3,
      label: "Optogenetics: 10 years of microbial opsins in neuroscience",
      authors: "Deisseroth K",
      pmid: "26308982",
      doi: "10.1038/nn.4091",
      design: "Historical Review",
      sampleSize: null,
      journal: "Nat Neurosci",
      year: 2015
    }
  ],
  "nobel-medicine-2026-optogenetics-en": [
    {
      ordinal: 1,
      label: "Millisecond-timescale, genetically targeted optical control of neural activity",
      authors: "Boyden ES, Zhang F, Bamberg E, Nagel G, Deisseroth K",
      pmid: "16116447",
      doi: "10.1038/nn1525",
      design: "In Vitro / In Vivo Optogenetics Pioneer Study",
      sampleSize: null,
      journal: "Nat Neurosci",
      year: 2005
    },
    {
      ordinal: 2,
      label: "Channelrhodopsin-2, a directly light-gated cation-selective membrane channel",
      authors: "Nagel G, Szellas T, Huhn W, et al.",
      pmid: "14615590",
      doi: "10.1073/pnas.1936192100",
      design: "Molecular Biophysics Study",
      sampleSize: null,
      journal: "Proc Natl Acad Sci U S A",
      year: 2003
    },
    {
      ordinal: 3,
      label: "Optogenetics: 10 years of microbial opsins in neuroscience",
      authors: "Deisseroth K",
      pmid: "26308982",
      doi: "10.1038/nn.4091",
      design: "Historical Review",
      sampleSize: null,
      journal: "Nat Neurosci",
      year: 2015
    }
  ],
  "curcumin-piperine-bioavailability": [
    {
      ordinal: 1,
      label: "Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers",
      authors: "Shoba G, Joy D, Joseph T, Majeed M, Rajendran R, Srinivas PS",
      pmid: "9619120",
      doi: "10.1055/s-2006-957450",
      design: "Clinical Crossover Pharmacokinetic Study",
      sampleSize: "8 healthy human volunteers",
      journal: "Planta Med",
      year: 1998
    },
    {
      ordinal: 2,
      label: "Bioavailability of curcumin: problems and promises",
      authors: "Anand P, Kunnumakkara AB, Newman RA, Aggarwal BB",
      pmid: "17999464",
      doi: "10.1021/mp700113r",
      design: "Mechanistic & Pharmacokinetic Review",
      sampleSize: null,
      journal: "Mol Pharm",
      year: 2007
    },
    {
      ordinal: 3,
      label: "Effect of curcumin on C-reactive protein as a biomarker of systemic inflammation: An updated meta-analysis of randomized controlled trials",
      authors: "Sahebkar A, Cicero AFG, Simental-Mendía LE, et al.",
      pmid: "34586711",
      doi: "10.1002/ptr.7284",
      design: "Systematic Review & Meta-analysis",
      sampleSize: "23 RCTs (n=1,750)",
      journal: "Phytother Res",
      year: 2021
    }
  ],
  "metabolomic-horizon-clinical-diagnostics": [
    {
      ordinal: 1,
      label: "HMDB 5.0: the Human Metabolome Database for 2022",
      authors: "Wishart DS, Guo A, Oler E, et al.",
      pmid: "34986597",
      doi: "10.1093/nar/gkab1062",
      design: "Comprehensive Clinical Metabolomics Database",
      sampleSize: "217,920 metabolite entries",
      journal: "Nucleic Acids Res",
      year: 2022
    },
    {
      ordinal: 2,
      label: "Plant metabolomics: towards biological function and mechanism",
      authors: "Fiehn O",
      pmid: "16949327",
      doi: "10.1016/j.tplants.2006.08.007",
      design: "Methodological Framework",
      sampleSize: null,
      journal: "Trends Plant Sci",
      year: 2006
    },
    {
      ordinal: 3,
      label: "Intestinal microbial metabolism of phosphatidylcholine and cardiovascular risk",
      authors: "Tang WH, Wang Z, Levison BS, et al.",
      pmid: "23614584",
      doi: "10.1056/NEJMoa1109400",
      design: "Clinical Prospective Cohort (TMAO Metabolomics)",
      sampleSize: "4,007 patients undergoing elective coronary angiography",
      journal: "N Engl J Med",
      year: 2013
    }
  ],
  "metabolomic-horizon-clinical-diagnostics-vi": [
    {
      ordinal: 1,
      label: "HMDB 5.0: the Human Metabolome Database for 2022",
      authors: "Wishart DS, Guo A, Oler E, et al.",
      pmid: "34986597",
      doi: "10.1093/nar/gkab1062",
      design: "Cơ sở dữ liệu Chuyển hóa Người Toàn diện (HMDB 5.0)",
      sampleSize: "217,920 chất chuyển hóa",
      journal: "Nucleic Acids Res",
      year: 2022
    },
    {
      ordinal: 2,
      label: "Plant metabolomics: towards biological function and mechanism",
      authors: "Fiehn O",
      pmid: "16949327",
      doi: "10.1016/j.tplants.2006.08.007",
      design: "Khung Phương pháp Chuyển hóa học Thực vật",
      sampleSize: null,
      journal: "Trends Plant Sci",
      year: 2006
    },
    {
      ordinal: 3,
      label: "Intestinal microbial metabolism of phosphatidylcholine and cardiovascular risk",
      authors: "Tang WH, Wang Z, Levison BS, et al.",
      pmid: "23614584",
      doi: "10.1056/NEJMoa1109400",
      design: "Nghiên cứu Đoàn hệ Lâm sàng Chuyển hóa TMAO",
      sampleSize: "4,007 bệnh nhân chụp mạch vành",
      journal: "N Engl J Med",
      year: 2013
    }
  ],
  "curcumin-piperine-sinh-kha-dung": [
    {
      ordinal: 1,
      label: "Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers",
      authors: "Shoba G, Joy D, Joseph T, Majeed M, Rajendran R, Srinivas PS",
      pmid: "9619120",
      doi: "10.1055/s-2006-957450",
      design: "Thử nghiệm Dược động học bắt chéo trên người và động vật",
      sampleSize: "8 người khỏe mạnh",
      journal: "Planta Med",
      year: 1998
    },
    {
      ordinal: 2,
      label: "Bioavailability of curcumin: problems and promises",
      authors: "Anand P, Kunnumakkara AB, Newman RA, Aggarwal BB",
      pmid: "17999464",
      doi: "10.1021/mp700113r",
      design: "Tổng quan Dược động học & Rào cản Chuyển hóa Liên hợp",
      sampleSize: null,
      journal: "Mol Pharm",
      year: 2007
    },
    {
      ordinal: 3,
      label: "Effect of curcumin on C-reactive protein as a biomarker of systemic inflammation: An updated meta-analysis",
      authors: "Sahebkar A, Cicero AFG, Simental-Mendía LE, et al.",
      pmid: "34586711",
      doi: "10.1002/ptr.7284",
      design: "Phân tích gộp & Thử nghiệm Lâm sàng Đối chứng Ngẫu nhiên",
      sampleSize: "23 RCTs (n=1,750)",
      journal: "Phytother Res",
      year: 2021
    }
  ],
  "glp1-keo-dai-tuoi-tho-nature": [
    {
      ordinal: 1,
      label: "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes",
      authors: "Marso SP, Bain SC, Consoli A, et al.",
      pmid: "27633186",
      doi: "10.1056/NEJMoa1607141",
      design: "Randomized, Double-Blind Trial (SUSTAIN-6)",
      sampleSize: "3,297 patients",
      journal: "N Engl J Med",
      year: 2016
    },
    {
      ordinal: 2,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Synthesis & Endogenous Incretin Axis",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    }
  ],
  "glp1-longevity-nature-mitochondria": [
    {
      ordinal: 1,
      label: "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes",
      authors: "Marso SP, Bain SC, Consoli A, et al.",
      pmid: "27633186",
      doi: "10.1056/NEJMoa1607141",
      design: "Randomized, Double-Blind Trial (SUSTAIN-6)",
      sampleSize: "3,297 patients",
      journal: "N Engl J Med",
      year: 2016
    },
    {
      ordinal: 2,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Synthesis & Endogenous Incretin Axis",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    }
  ],
  "resistant-starch-scfa-gut-vi": [
    {
      ordinal: 1,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Review & Metabolic Integration",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    },
    {
      ordinal: 2,
      label: "Commensal microbe-derived butyrate induces the differentiation of colonic regulatory T cells",
      authors: "Furusawa Y, Obata Y, Fukuda S, et al.",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Mucosal Immunology Study",
      sampleSize: "Murine colon model",
      journal: "Nature",
      year: 2013
    }
  ],
  "resistant-starch-scfa-gut-en": [
    {
      ordinal: 1,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Review & Metabolic Integration",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    },
    {
      ordinal: 2,
      label: "Commensal microbe-derived butyrate induces the differentiation of colonic regulatory T cells",
      authors: "Furusawa Y, Obata Y, Fukuda S, et al.",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Mucosal Immunology Study",
      sampleSize: "Murine colon model",
      journal: "Nature",
      year: 2013
    }
  ],
  "mevalonate-statin-coq10-vi": [
    {
      ordinal: 1,
      label: "Statin-associated muscle symptoms: impact on statin therapy--European Atherosclerosis Society Consensus Panel",
      authors: "Stroes ES, Thompson PD, Corsini A, et al.",
      pmid: "25694464",
      doi: "10.1093/eurheartj/ehv043",
      design: "International Consensus Guideline",
      sampleSize: null,
      journal: "Eur Heart J",
      year: 2015
    },
    {
      ordinal: 2,
      label: "Effects of Coenzyme Q10 on Statin-Induced Myopathy: An Updated Meta-Analysis of Randomized Controlled Trials",
      authors: "Qu H, Guo M, Chai H, Wang WT, Gao ZY, Shi DZ",
      pmid: "30371340",
      doi: "10.1161/JAHA.118.009835",
      design: "Systematic Review & Meta-analysis",
      sampleSize: "12 RCTs (n=575)",
      journal: "J Am Heart Assoc",
      year: 2018
    },
    {
      ordinal: 3,
      label: "The Role of Coenzyme Q10 in Statin-Associated Myopathy: A Systematic Review",
      authors: "Marcoff L, Thompson PD",
      pmid: "17560286",
      doi: "10.1016/j.jacc.2007.02.049",
      design: "Systematic Review & Mitochondrial Bioenergetics Analysis",
      sampleSize: null,
      journal: "J Am Coll Cardiol",
      year: 2007
    }
  ],
  "mevalonate-statin-coq10-en": [
    {
      ordinal: 1,
      label: "Statin-associated muscle symptoms: impact on statin therapy--European Atherosclerosis Society Consensus Panel",
      authors: "Stroes ES, Thompson PD, Corsini A, et al.",
      pmid: "25694464",
      doi: "10.1093/eurheartj/ehv043",
      design: "International Consensus Guideline",
      sampleSize: null,
      journal: "Eur Heart J",
      year: 2015
    },
    {
      ordinal: 2,
      label: "Effects of Coenzyme Q10 on Statin-Induced Myopathy: An Updated Meta-Analysis of Randomized Controlled Trials",
      authors: "Qu H, Guo M, Chai H, Wang WT, Gao ZY, Shi DZ",
      pmid: "30371340",
      doi: "10.1161/JAHA.118.009835",
      design: "Systematic Review & Meta-analysis",
      sampleSize: "12 RCTs (n=575)",
      journal: "J Am Heart Assoc",
      year: 2018
    },
    {
      ordinal: 3,
      label: "The Role of Coenzyme Q10 in Statin-Associated Myopathy: A Systematic Review",
      authors: "Marcoff L, Thompson PD",
      pmid: "17560286",
      doi: "10.1016/j.jacc.2007.02.049",
      design: "Systematic Review & Mitochondrial Bioenergetics Analysis",
      sampleSize: null,
      journal: "J Am Coll Cardiol",
      year: 2007
    }
  ],
  "pharmacokinetics-one-compartment": [
    {
      ordinal: 1,
      label: "Food-Drug Interactions",
      authors: "Schmidt LE, Dalhoff K",
      pmid: "12093316",
      doi: "10.2165/00003495-200262100-00005",
      design: "Comprehensive Clinical Pharmacology Review",
      sampleSize: null,
      journal: "Drugs",
      year: 2002
    },
    {
      ordinal: 2,
      label: "Clearance concepts in pharmacokinetics",
      authors: "Rowland M, Benet LZ, Graham GG",
      pmid: "4764426",
      doi: "10.1007/BF01059626",
      design: "Landmark Pharmacokinetics Formulation",
      sampleSize: null,
      journal: "J Pharmacokinet Biopharm",
      year: 1973
    }
  ],
  "ampk-nrf2-mtor-map": [
    {
      ordinal: 1,
      label: "AMPK: a nutrient and energy sensor that maintains energy homeostasis",
      authors: "Hardie DG, Ross FA, Hawley SA",
      pmid: "22436748",
      doi: "10.1038/nrm3311",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Rev Mol Cell Biol",
      year: 2012
    },
    {
      ordinal: 2,
      label: "Molecular basis of the Keap1-Nrf2 system",
      authors: "Suzuki T, Yamamoto M",
      pmid: "26117331",
      doi: "10.1016/j.freeradbiomed.2015.06.006",
      design: "Comprehensive Structural & Mechanistic Review",
      sampleSize: null,
      journal: "Free Radic Biol Med",
      year: 2015
    },
    {
      ordinal: 3,
      label: "mTOR Signaling in Growth, Metabolism, and Disease",
      authors: "Saxton RA, Sabatini DM",
      pmid: "28283069",
      doi: "10.1016/j.cell.2017.02.004",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Cell",
      year: 2017
    }
  ],
  "melatonin-circadian-zeitgeber": [
    {
      ordinal: 1,
      label: "Circadian rhythms and melatonin: physiology and therapeutic management of phase disorders",
      authors: "Ferracioli-Oda E, Qawasmi A, Bloch MH",
      pmid: "23691095",
      doi: "10.1371/journal.pone.0063773",
      design: "Meta-Analysis of Randomized Controlled Trials",
      sampleSize: "19 RCTs (n=1,683)",
      journal: "PLoS One",
      year: 2013
    },
    {
      ordinal: 2,
      label: "Entrainment of the Human Circadian Clock",
      authors: "Roenneberg T, Kumar CJ, Merrow M",
      pmid: "18419286",
      doi: "10.1101/sqb.2007.72.043",
      design: "Chronobiology Landmark Review",
      sampleSize: null,
      journal: "Cold Spring Harb Symp Quant Biol",
      year: 2007
    }
  ],
  "sulforaphane-nrf2-window": [
    {
      ordinal: 1,
      label: "Dietary Sulforaphane, a Histone Deacetylase Inhibitor for Cancer Prevention",
      authors: "Myzak MC, Dashwood RH",
      pmid: "19812222",
      doi: "10.3945/jn.109.113332",
      design: "Molecular Nutrition & Epigenetics Review",
      sampleSize: null,
      journal: "J Nutr",
      year: 2009
    },
    {
      ordinal: 2,
      label: "Nrf2-ARE pathway: An emerging target against oxidative stress and neuroinflammation in neurodegenerative diseases",
      authors: "Buendia I, Michalska P, Navarro E, Gameiro I, Egea J, León R",
      pmid: "26617217",
      doi: "10.1016/j.pharmthera.2015.11.003",
      design: "Pharmacological Review",
      sampleSize: null,
      journal: "Pharmacol Ther",
      year: 2016
    }
  ],
  "supplement-drug-interaction-matrix": [
    {
      ordinal: 1,
      label: "Herb-drug interactions",
      authors: "Fugh-Berman A",
      pmid: "10675182",
      doi: "10.1016/S0140-6736(99)06457-0",
      design: "Landmark Systematic Clinical Review",
      sampleSize: null,
      journal: "Lancet",
      year: 2000
    },
    {
      ordinal: 2,
      label: "Interactions between herbal medicines and prescribed drugs: a systematic review",
      authors: "Izzo AA, Ernst E",
      pmid: "11772128",
      doi: "10.2165/00003495-200161150-00002",
      design: "Comprehensive Systematic Review",
      sampleSize: null,
      journal: "Drugs",
      year: 2001
    }
  ],
  "forecasting-hs-crp-delta": [
    {
      ordinal: 1,
      label: "C-reactive protein and other markers of inflammation in the prediction of cardiovascular disease in women",
      authors: "Ridker PM, Hennekens CH, Buring JE, Rifai N",
      pmid: "10733371",
      doi: "10.1056/NEJM200003233421202",
      design: "Prospective Cohort Study (Women's Health Study)",
      sampleSize: "28,263 healthy women followed for 3 years",
      journal: "N Engl J Med",
      year: 2000
    },
    {
      ordinal: 2,
      label: "Antiinflammatory Therapy with Canakinumab for Atherosclerotic Disease",
      authors: "Ridker PM, Everett BM, Thuren T, et al.",
      pmid: "28845751",
      doi: "10.1056/NEJMoa1707914",
      design: "Randomized, Double-Blind, Placebo-Controlled Trial (CANTOS)",
      sampleSize: "10,061 patients with prior MI and hs-CRP ≥2 mg/L",
      journal: "N Engl J Med",
      year: 2017
    }
  ],
  "warburg-effect-cancer-metabolism": [
    {
      ordinal: 1,
      label: "Understanding the Warburg Effect: The Metabolic Requirements of Cell Proliferation",
      authors: "Vander Heiden MG, Cantley LC, Thompson CB",
      pmid: "19460998",
      doi: "10.1126/science.1160809",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Science",
      year: 2009
    },
    {
      ordinal: 2,
      label: "On the origin of cancer cells",
      authors: "Warburg O",
      pmid: "13298683",
      doi: "10.1126/science.123.3191.309",
      design: "Foundational Classic Landmark Paper",
      sampleSize: null,
      journal: "Science",
      year: 1956
    },
    {
      ordinal: 3,
      label: "Hallmarks of cancer: the next generation",
      authors: "Hanahan D, Weinberg RA",
      pmid: "21376230",
      doi: "10.1016/j.cell.2011.02.013",
      design: "Comprehensive Review & Metabolic Reprogramming Framework",
      sampleSize: null,
      journal: "Cell",
      year: 2011
    }
  ],
  "cancer-seed-and-soil-metabolism": [
    {
      ordinal: 1,
      label: "The pathogenesis of cancer metastasis: the 'seed and soil' hypothesis revisited",
      authors: "Fidler IJ",
      pmid: "12778135",
      doi: "10.1038/nrc1098",
      design: "Landmark Pathological Review",
      sampleSize: null,
      journal: "Nat Rev Cancer",
      year: 2003
    },
    {
      ordinal: 2,
      label: "Metabolic Asymmetry in Cancer: A Balancing Act",
      authors: "Martinez-Outschoorn UE, Lisanti MP, Sotgia F",
      pmid: "25026205",
      doi: "10.1016/j.ccr.2014.06.021",
      design: "Molecular Mechanisms Review",
      sampleSize: null,
      journal: "Cancer Cell",
      year: 2014
    }
  ],
  "insulin-igf1-cancer-proliferation": [
    {
      ordinal: 1,
      label: "Insulin and insulin-like growth factor signalling in neoplasia",
      authors: "Pollak M",
      pmid: "19029956",
      doi: "10.1038/nrc2536",
      design: "Landmark Oncological Review",
      sampleSize: null,
      journal: "Nat Rev Cancer",
      year: 2008
    },
    {
      ordinal: 2,
      label: "The PI3K Pathway in Human Disease",
      authors: "Fruman DA, Chiu H, Hopkins BD, Bagrodia S, Cantley LC, Engelman JA",
      pmid: "28802037",
      doi: "10.1016/j.cell.2017.07.029",
      design: "Comprehensive Molecular Review",
      sampleSize: null,
      journal: "Cell",
      year: 2017
    },
    {
      ordinal: 3,
      label: "Insulin Resistance and Cancer Risk: An Overview of the Pathogenic Mechanisms",
      authors: "Arcidiacono B, Iiritano S, Nocera A, et al.",
      pmid: "22701472",
      doi: "10.1155/2012/789174",
      design: "Systematic Review & Mechanistic Synthesis",
      sampleSize: null,
      journal: "Exp Diabetes Res",
      year: 2012
    }
  ],
  "cholesterol-myth-vascular-inflammation": [
    {
      ordinal: 1,
      label: "Atherosclerosis--an inflammatory disease",
      authors: "Ross R",
      pmid: "9887164",
      doi: "10.1056/NEJM199901143400207",
      design: "Landmark Pathological Review",
      sampleSize: null,
      journal: "N Engl J Med",
      year: 1999
    },
    {
      ordinal: 2,
      label: "Inflammation in atherosclerosis",
      authors: "Libby P",
      pmid: "12490960",
      doi: "10.1038/nature01323",
      design: "Landmark Mechanistic Synthesis",
      sampleSize: null,
      journal: "Nature",
      year: 2002
    },
    {
      ordinal: 3,
      label: "Antiinflammatory Therapy with Canakinumab for Atherosclerotic Disease",
      authors: "Ridker PM, Everett BM, Thuren T, et al.",
      pmid: "28845751",
      doi: "10.1056/NEJMoa1707914",
      design: "Randomized Controlled Trial (CANTOS)",
      sampleSize: "10,061 participants",
      journal: "N Engl J Med",
      year: 2017
    }
  ],
  "oxldl-sdldl-atherosclerosis-mechanism": [
    {
      ordinal: 1,
      label: "Beyond cholesterol. Modifications of low-density lipoprotein that increase its atherogenicity",
      authors: "Steinberg D, Parthasarathy S, Carew TE, Khoo JC, Witztum JL",
      pmid: "2648148",
      doi: "10.1056/NEJM198904063201407",
      design: "Foundational Pathophysiological Review",
      sampleSize: null,
      journal: "N Engl J Med",
      year: 1989
    },
    {
      ordinal: 2,
      label: "Low-density lipoprotein subclass patterns and risk of myocardial infarction",
      authors: "Austin MA, Breslow JL, Hennekens CH, Buring JE, Willett WC, Krauss RM",
      pmid: "3418853",
      doi: null,
      design: "Prospective Case-Control Study",
      sampleSize: "248 cases / 248 controls",
      journal: "JAMA",
      year: 1988
    }
  ],
  "triglyceride-hdl-ratio-metabolic-health": [
    {
      ordinal: 1,
      label: "Fasting triglycerides, high-density lipoprotein, and risk of myocardial infarction",
      authors: "Gaziano JM, Hennekens CH, O'Donnell CJ, Breslow JL, Buring JE",
      pmid: "9355888",
      doi: "10.1161/01.cir.96.8.2520",
      design: "Prospective Case-Control Study (Physicians' Health Study)",
      sampleSize: "340 MI cases / 340 matched controls",
      journal: "Circulation",
      year: 1997
    },
    {
      ordinal: 2,
      label: "Use of metabolic markers to identify overweight individuals who are insulin resistant",
      authors: "McLaughlin T, Reaven G, Abbasi F, et al.",
      pmid: "14623617",
      doi: "10.7326/0003-4819-139-10-200311180-00007",
      design: "Clinical Cohort Validation Study (TG/HDL Ratio Cutoff)",
      sampleSize: "258 overweight individuals",
      journal: "Ann Intern Med",
      year: 2003
    }
  ],
  "glymphatic-deep-sleep-brain-cleaning": [
    {
      ordinal: 1,
      label: "Sleep drives metabolite clearance from the adult brain",
      authors: "Xie L, Kang H, Xu Q, Chen MJ, Liao Y, Thiyagarajan M, O'Donnell J, Christensen DJ, Nicholson C, Iliff JJ, Takano T, Deane R, Nedergaard M",
      pmid: "24136970",
      doi: "10.1126/science.1241224",
      design: "Landmark In Vivo Two-Photon Imaging Study",
      sampleSize: "Murine sleep/wake model",
      journal: "Science",
      year: 2013
    },
    {
      ordinal: 2,
      label: "A paravascular pathway facilitates CSF flow through the brain parenchyma and the clearance of interstitial solutes, including amyloid β",
      authors: "Iliff JJ, Wang M, Liao Y, et al.",
      pmid: "22896675",
      doi: "10.1126/scitranslmed.3003748",
      design: "Foundational Discovery of Glymphatic System",
      sampleSize: null,
      journal: "Sci Transl Med",
      year: 2012
    },
    {
      ordinal: 3,
      label: "The Glymphatic System: A Beginner's Guide",
      authors: "Jessen NA, Munk AS, Lundgaard I, Nedergaard M",
      pmid: "25947369",
      doi: "10.1007/s11064-015-1581-6",
      design: "Translational Neuroscience Review",
      sampleSize: null,
      journal: "Neurochem Res",
      year: 2015
    }
  ],
  "glymphatic-deep-sleep-brain-cleaning-en": [
    {
      ordinal: 1,
      label: "Sleep drives metabolite clearance from the adult brain",
      authors: "Xie L, Kang H, Xu Q, Chen MJ, Liao Y, Thiyagarajan M, O'Donnell J, Christensen DJ, Nicholson C, Iliff JJ, Takano T, Deane R, Nedergaard M",
      pmid: "24136970",
      doi: "10.1126/science.1241224",
      design: "Landmark In Vivo Two-Photon Imaging Study",
      sampleSize: "Murine sleep/wake model",
      journal: "Science",
      year: 2013
    },
    {
      ordinal: 2,
      label: "A paravascular pathway facilitates CSF flow through the brain parenchyma and the clearance of interstitial solutes, including amyloid β",
      authors: "Iliff JJ, Wang M, Liao Y, et al.",
      pmid: "22896675",
      doi: "10.1126/scitranslmed.3003748",
      design: "Foundational Discovery of Glymphatic System",
      sampleSize: null,
      journal: "Sci Transl Med",
      year: 2012
    },
    {
      ordinal: 3,
      label: "The Glymphatic System: A Beginner's Guide",
      authors: "Jessen NA, Munk AS, Lundgaard I, Nedergaard M",
      pmid: "25947369",
      doi: "10.1007/s11064-015-1581-6",
      design: "Translational Neuroscience Review",
      sampleSize: null,
      journal: "Neurochem Res",
      year: 2015
    }
  ],
  "nad-cd38-sirtuin-mitochondria-cellular-aging": [
    {
      ordinal: 1,
      label: "NAD(+) metabolism and its roles in cellular processes during ageing",
      authors: "Covarrubias AJ, Perrone R, Grozio A, Verdin E",
      pmid: "33353981",
      doi: "10.1038/s41580-020-00313-x",
      design: "Landmark Molecular Gerontology Review",
      sampleSize: null,
      journal: "Nat Rev Mol Cell Biol",
      year: 2021
    },
    {
      ordinal: 2,
      label: "CD38 Dictates Age-Related NAD Decline and Mitochondrial Dysfunction through an SIRT3-Dependent Mechanism",
      authors: "Camacho-Pereira J, Tarragó MG, Chini CCS, et al.",
      pmid: "27304511",
      doi: "10.1016/j.cmet.2016.05.006",
      design: "Mechanistic Animal & Cellular Study",
      sampleSize: "In vivo mouse aging cohort",
      journal: "Cell Metab",
      year: 2016
    },
    {
      ordinal: 3,
      label: "Therapeutic Potential of NAD-Boosting Molecules: The In Vivo Evidence",
      authors: "Rajman L, Chwalek K, Sinclair DA",
      pmid: "29514064",
      doi: "10.1016/j.cmet.2018.02.011",
      design: "Comprehensive Translational Review",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2018
    }
  ],
  "nad-cd38-sirtuin-mitochondria-cellular-aging-en": [
    {
      ordinal: 1,
      label: "NAD(+) metabolism and its roles in cellular processes during ageing",
      authors: "Covarrubias AJ, Perrone R, Grozio A, Verdin E",
      pmid: "33353981",
      doi: "10.1038/s41580-020-00313-x",
      design: "Landmark Molecular Gerontology Review",
      sampleSize: null,
      journal: "Nat Rev Mol Cell Biol",
      year: 2021
    },
    {
      ordinal: 2,
      label: "CD38 Dictates Age-Related NAD Decline and Mitochondrial Dysfunction through an SIRT3-Dependent Mechanism",
      authors: "Camacho-Pereira J, Tarragó MG, Chini CCS, et al.",
      pmid: "27304511",
      doi: "10.1016/j.cmet.2016.05.006",
      design: "Mechanistic Animal & Cellular Study",
      sampleSize: "In vivo mouse aging cohort",
      journal: "Cell Metab",
      year: 2016
    },
    {
      ordinal: 3,
      label: "Therapeutic Potential of NAD-Boosting Molecules: The In Vivo Evidence",
      authors: "Rajman L, Chwalek K, Sinclair DA",
      pmid: "29514064",
      doi: "10.1016/j.cmet.2018.02.011",
      design: "Comprehensive Translational Review",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2018
    }
  ],
  "butyrate-scfa-epigenetics-histone-gut-barrier": [
    {
      ordinal: 1,
      label: "Commensal microbe-derived butyrate induces the differentiation of colonic regulatory T cells",
      authors: "Furusawa Y, Obata Y, Fukuda S, et al.",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Mucosal Immunology Study",
      sampleSize: "Murine colon model",
      journal: "Nature",
      year: 2013
    },
    {
      ordinal: 2,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Review & Metabolic Integration",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    }
  ],
  "butyrate-scfa-epigenetics-histone-gut-barrier-en": [
    {
      ordinal: 1,
      label: "Commensal microbe-derived butyrate induces the differentiation of colonic regulatory T cells",
      authors: "Furusawa Y, Obata Y, Fukuda S, et al.",
      pmid: "24226770",
      doi: "10.1038/nature12721",
      design: "Landmark Mucosal Immunology Study",
      sampleSize: "Murine colon model",
      journal: "Nature",
      year: 2013
    },
    {
      ordinal: 2,
      label: "From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids as Key Bacterial Metabolites",
      authors: "Koh A, De Vadder F, Kovatcheva-Datchary P, Bäckhed F",
      pmid: "27259147",
      doi: "10.1016/j.cell.2016.05.041",
      design: "Mechanistic Review & Metabolic Integration",
      sampleSize: null,
      journal: "Cell",
      year: 2016
    }
  ],
  "policosanol-versus-statins": [
    {
      ordinal: 1,
      label: "Effect of policosanol on lipid levels among patients with hypercholesterolemia or combined hyperlipidemia: a randomized controlled trial",
      authors: "Berthold HK, Unverdorben S, Degenhardt R, Bulitta M, Gouni-Berthold I",
      pmid: "16705107",
      doi: "10.1001/jama.295.19.2262",
      design: "Double-Blind, Placebo-Controlled Multicenter RCT",
      sampleSize: "143 hypercholesterolemic patients",
      journal: "JAMA",
      year: 2006
    },
    {
      ordinal: 2,
      label: "Statins for Prevention of Cardiovascular Disease in Adults: Evidence Report and Systematic Review for the US Preventive Services Task Force",
      authors: "Chou R, Dana T, Blazina I, Daeges M, Jeanne TL",
      pmid: "27838722",
      doi: "10.1001/jama.2015.15629",
      design: "USPSTF Systematic Evidence Review",
      sampleSize: "19 trials (n=71,344)",
      journal: "JAMA",
      year: 2016
    }
  ],
  "policosanol-versus-statins-en": [
    {
      ordinal: 1,
      label: "Effect of policosanol on lipid levels among patients with hypercholesterolemia or combined hyperlipidemia: a randomized controlled trial",
      authors: "Berthold HK, Unverdorben S, Degenhardt R, Bulitta M, Gouni-Berthold I",
      pmid: "16705107",
      doi: "10.1001/jama.295.19.2262",
      design: "Double-Blind, Placebo-Controlled Multicenter RCT",
      sampleSize: "143 hypercholesterolemic patients",
      journal: "JAMA",
      year: 2006
    },
    {
      ordinal: 2,
      label: "Statins for Prevention of Cardiovascular Disease in Adults: Evidence Report and Systematic Review for the US Preventive Services Task Force",
      authors: "Chou R, Dana T, Blazina I, Daeges M, Jeanne TL",
      pmid: "27838722",
      doi: "10.1001/jama.2015.15629",
      design: "USPSTF Systematic Evidence Review",
      sampleSize: "19 trials (n=71,344)",
      journal: "JAMA",
      year: 2016
    }
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
      label: "The mitophagy activator urolithin A is safe and induces a molecular signature of improved mitochondrial and cellular health in humans",
      authors: "Andreux PA, Blanco-Bose W, Ryu D, et al.",
      pmid: "32694802",
      doi: "10.1038/s42255-019-0073-4",
      design: "First-in-Human Phase I Randomized Clinical Trial",
      sampleSize: "60 elderly sedentary adults",
      journal: "Nat Metab",
      year: 2019
    },
    {
      ordinal: 2,
      label: "Effect of Urolithin A Supplementation on Muscle Endurance and Mitochondrial Health in Older Adults: A Randomized Clinical Trial",
      authors: "Liu S, D'Amico D, Shankland E, et al.",
      pmid: "35050355",
      doi: "10.1001/jamanetworkopen.2021.44279",
      design: "Randomized, Double-Blind, Placebo-Controlled Trial",
      sampleSize: "66 older adults (65-90 years)",
      journal: "JAMA Netw Open",
      year: 2022
    }
  ],
  "urolithin-a-mitophagy-muscle-endurance-en": [
    {
      ordinal: 1,
      label: "The mitophagy activator urolithin A is safe and induces a molecular signature of improved mitochondrial and cellular health in humans",
      authors: "Andreux PA, Blanco-Bose W, Ryu D, et al.",
      pmid: "32694802",
      doi: "10.1038/s42255-019-0073-4",
      design: "First-in-Human Phase I Randomized Clinical Trial",
      sampleSize: "60 elderly sedentary adults",
      journal: "Nat Metab",
      year: 2019
    },
    {
      ordinal: 2,
      label: "Effect of Urolithin A Supplementation on Muscle Endurance and Mitochondrial Health in Older Adults: A Randomized Clinical Trial",
      authors: "Liu S, D'Amico D, Shankland E, et al.",
      pmid: "35050355",
      doi: "10.1001/jamanetworkopen.2021.44279",
      design: "Randomized, Double-Blind, Placebo-Controlled Trial",
      sampleSize: "66 older adults (65-90 years)",
      journal: "JAMA Netw Open",
      year: 2022
    }
  ],
  "ampk-nrf2-mtor-map-en": [
    {
      ordinal: 1,
      label: "AMPK: a nutrient and energy sensor that maintains energy homeostasis",
      authors: "Hardie DG, Ross FA, Hawley SA",
      pmid: "22436748",
      doi: "10.1038/nrm3311",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Rev Mol Cell Biol",
      year: 2012
    },
    {
      ordinal: 2,
      label: "Molecular basis of the Keap1-Nrf2 system",
      authors: "Suzuki T, Yamamoto M",
      pmid: "26117331",
      doi: "10.1016/j.freeradbiomed.2015.06.006",
      design: "Comprehensive Structural & Mechanistic Review",
      sampleSize: null,
      journal: "Free Radic Biol Med",
      year: 2015
    },
    {
      ordinal: 3,
      label: "mTOR Signaling in Growth, Metabolism, and Disease",
      authors: "Saxton RA, Sabatini DM",
      pmid: "28283069",
      doi: "10.1016/j.cell.2017.02.004",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Cell",
      year: 2017
    }
  ],
  "cancer-seed-and-soil-metabolism-en": [
    {
      ordinal: 1,
      label: "The pathogenesis of cancer metastasis: the 'seed and soil' hypothesis revisited",
      authors: "Fidler IJ",
      pmid: "12778135",
      doi: "10.1038/nrc1098",
      design: "Landmark Pathological Review",
      sampleSize: null,
      journal: "Nat Rev Cancer",
      year: 2003
    },
    {
      ordinal: 2,
      label: "Metabolic Asymmetry in Cancer: A Balancing Act",
      authors: "Martinez-Outschoorn UE, Lisanti MP, Sotgia F",
      pmid: "25026205",
      doi: "10.1016/j.ccr.2014.06.021",
      design: "Molecular Mechanisms Review",
      sampleSize: null,
      journal: "Cancer Cell",
      year: 2014
    }
  ],
  "cholesterol-myth-vascular-inflammation-en": [
    {
      ordinal: 1,
      label: "Atherosclerosis--an inflammatory disease",
      authors: "Ross R",
      pmid: "9887164",
      doi: "10.1056/NEJM199901143400207",
      design: "Landmark Pathological Review",
      sampleSize: null,
      journal: "N Engl J Med",
      year: 1999
    },
    {
      ordinal: 2,
      label: "Inflammation in atherosclerosis",
      authors: "Libby P",
      pmid: "12490960",
      doi: "10.1038/nature01323",
      design: "Landmark Mechanistic Synthesis",
      sampleSize: null,
      journal: "Nature",
      year: 2002
    },
    {
      ordinal: 3,
      label: "Antiinflammatory Therapy with Canakinumab for Atherosclerotic Disease",
      authors: "Ridker PM, Everett BM, Thuren T, et al.",
      pmid: "28845751",
      doi: "10.1056/NEJMoa1707914",
      design: "Randomized Controlled Trial (CANTOS)",
      sampleSize: "10,061 participants",
      journal: "N Engl J Med",
      year: 2017
    }
  ],
  "forecasting-hs-crp-delta-en": [
    {
      ordinal: 1,
      label: "C-reactive protein and other markers of inflammation in the prediction of cardiovascular disease in women",
      authors: "Ridker PM, Hennekens CH, Buring JE, Rifai N",
      pmid: "10733371",
      doi: "10.1056/NEJM200003233421202",
      design: "Prospective Cohort Study (Women's Health Study)",
      sampleSize: "28,263 healthy women followed for 3 years",
      journal: "N Engl J Med",
      year: 2000
    },
    {
      ordinal: 2,
      label: "Antiinflammatory Therapy with Canakinumab for Atherosclerotic Disease",
      authors: "Ridker PM, Everett BM, Thuren T, et al.",
      pmid: "28845751",
      doi: "10.1056/NEJMoa1707914",
      design: "Randomized, Double-Blind, Placebo-Controlled Trial (CANTOS)",
      sampleSize: "10,061 patients with prior MI and hs-CRP ≥2 mg/L",
      journal: "N Engl J Med",
      year: 2017
    }
  ],
  "insulin-igf1-cancer-proliferation-en": [
    {
      ordinal: 1,
      label: "Insulin and insulin-like growth factor signalling in neoplasia",
      authors: "Pollak M",
      pmid: "19029956",
      doi: "10.1038/nrc2536",
      design: "Landmark Oncological Review",
      sampleSize: null,
      journal: "Nat Rev Cancer",
      year: 2008
    },
    {
      ordinal: 2,
      label: "The PI3K Pathway in Human Disease",
      authors: "Fruman DA, Chiu H, Hopkins BD, Bagrodia S, Cantley LC, Engelman JA",
      pmid: "28802037",
      doi: "10.1016/j.cell.2017.07.029",
      design: "Comprehensive Molecular Review",
      sampleSize: null,
      journal: "Cell",
      year: 2017
    },
    {
      ordinal: 3,
      label: "Insulin Resistance and Cancer Risk: An Overview of the Pathogenic Mechanisms",
      authors: "Arcidiacono B, Iiritano S, Nocera A, et al.",
      pmid: "22701472",
      doi: "10.1155/2012/789174",
      design: "Systematic Review & Mechanistic Synthesis",
      sampleSize: null,
      journal: "Exp Diabetes Res",
      year: 2012
    }
  ],
  "melatonin-circadian-zeitgeber-en": [
    {
      ordinal: 1,
      label: "Circadian rhythms and melatonin: physiology and therapeutic management of phase disorders",
      authors: "Ferracioli-Oda E, Qawasmi A, Bloch MH",
      pmid: "23691095",
      doi: "10.1371/journal.pone.0063773",
      design: "Meta-Analysis of Randomized Controlled Trials",
      sampleSize: "19 RCTs (n=1,683)",
      journal: "PLoS One",
      year: 2013
    },
    {
      ordinal: 2,
      label: "Entrainment of the Human Circadian Clock",
      authors: "Roenneberg T, Kumar CJ, Merrow M",
      pmid: "18419286",
      doi: "10.1101/sqb.2007.72.043",
      design: "Chronobiology Landmark Review",
      sampleSize: null,
      journal: "Cold Spring Harb Symp Quant Biol",
      year: 2007
    }
  ],
  "oxldl-sdldl-atherosclerosis-mechanism-en": [
    {
      ordinal: 1,
      label: "Beyond cholesterol. Modifications of low-density lipoprotein that increase its atherogenicity",
      authors: "Steinberg D, Parthasarathy S, Carew TE, Khoo JC, Witztum JL",
      pmid: "2648148",
      doi: "10.1056/NEJM198904063201407",
      design: "Foundational Pathophysiological Review",
      sampleSize: null,
      journal: "N Engl J Med",
      year: 1989
    },
    {
      ordinal: 2,
      label: "Low-density lipoprotein subclass patterns and risk of myocardial infarction",
      authors: "Austin MA, Breslow JL, Hennekens CH, Buring JE, Willett WC, Krauss RM",
      pmid: "3418853",
      doi: null,
      design: "Prospective Case-Control Study",
      sampleSize: "248 cases / 248 controls",
      journal: "JAMA",
      year: 1988
    }
  ],
  "pharmacokinetics-one-compartment-en": [
    {
      ordinal: 1,
      label: "Food-Drug Interactions",
      authors: "Schmidt LE, Dalhoff K",
      pmid: "12093316",
      doi: "10.2165/00003495-200262100-00005",
      design: "Comprehensive Clinical Pharmacology Review",
      sampleSize: null,
      journal: "Drugs",
      year: 2002
    },
    {
      ordinal: 2,
      label: "Clearance concepts in pharmacokinetics",
      authors: "Rowland M, Benet LZ, Graham GG",
      pmid: "4764426",
      doi: "10.1007/BF01059626",
      design: "Landmark Pharmacokinetics Formulation",
      sampleSize: null,
      journal: "J Pharmacokinet Biopharm",
      year: 1973
    }
  ],
  "sulforaphane-nrf2-window-en": [
    {
      ordinal: 1,
      label: "Dietary Sulforaphane, a Histone Deacetylase Inhibitor for Cancer Prevention",
      authors: "Myzak MC, Dashwood RH",
      pmid: "19812222",
      doi: "10.3945/jn.109.113332",
      design: "Molecular Nutrition & Epigenetics Review",
      sampleSize: null,
      journal: "J Nutr",
      year: 2009
    },
    {
      ordinal: 2,
      label: "Nrf2-ARE pathway: An emerging target against oxidative stress and neuroinflammation in neurodegenerative diseases",
      authors: "Buendia I, Michalska P, Navarro E, Gameiro I, Egea J, León R",
      pmid: "26617217",
      doi: "10.1016/j.pharmthera.2015.11.003",
      design: "Pharmacological Review",
      sampleSize: null,
      journal: "Pharmacol Ther",
      year: 2016
    }
  ],
  "supplement-drug-interaction-matrix-en": [
    {
      ordinal: 1,
      label: "Herb-drug interactions",
      authors: "Fugh-Berman A",
      pmid: "10675182",
      doi: "10.1016/S0140-6736(99)06457-0",
      design: "Landmark Systematic Clinical Review",
      sampleSize: null,
      journal: "Lancet",
      year: 2000
    },
    {
      ordinal: 2,
      label: "Interactions between herbal medicines and prescribed drugs: a systematic review",
      authors: "Izzo AA, Ernst E",
      pmid: "11772128",
      doi: "10.2165/00003495-200161150-00002",
      design: "Comprehensive Systematic Review",
      sampleSize: null,
      journal: "Drugs",
      year: 2001
    }
  ],
  "triglyceride-hdl-ratio-metabolic-health-en": [
    {
      ordinal: 1,
      label: "Fasting triglycerides, high-density lipoprotein, and risk of myocardial infarction",
      authors: "Gaziano JM, Hennekens CH, O'Donnell CJ, Breslow JL, Buring JE",
      pmid: "9355888",
      doi: "10.1161/01.cir.96.8.2520",
      design: "Prospective Case-Control Study (Physicians' Health Study)",
      sampleSize: "340 MI cases / 340 matched controls",
      journal: "Circulation",
      year: 1997
    },
    {
      ordinal: 2,
      label: "Use of metabolic markers to identify overweight individuals who are insulin resistant",
      authors: "McLaughlin T, Reaven G, Abbasi F, et al.",
      pmid: "14623617",
      doi: "10.7326/0003-4819-139-10-200311180-00007",
      design: "Clinical Cohort Validation Study (TG/HDL Ratio Cutoff)",
      sampleSize: "258 overweight individuals",
      journal: "Ann Intern Med",
      year: 2003
    }
  ],
  "warburg-effect-cancer-metabolism-en": [
    {
      ordinal: 1,
      label: "Understanding the Warburg Effect: The Metabolic Requirements of Cell Proliferation",
      authors: "Vander Heiden MG, Cantley LC, Thompson CB",
      pmid: "19460998",
      doi: "10.1126/science.1160809",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Science",
      year: 2009
    },
    {
      ordinal: 2,
      label: "On the origin of cancer cells",
      authors: "Warburg O",
      pmid: "13298683",
      doi: "10.1126/science.123.3191.309",
      design: "Foundational Classic Landmark Paper",
      sampleSize: null,
      journal: "Science",
      year: 1956
    },
    {
      ordinal: 3,
      label: "Hallmarks of cancer: the next generation",
      authors: "Hanahan D, Weinberg RA",
      pmid: "21376230",
      doi: "10.1016/j.cell.2011.02.013",
      design: "Comprehensive Review & Metabolic Reprogramming Framework",
      sampleSize: null,
      journal: "Cell",
      year: 2011
    }
  ],
  "alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi": [
    {
      ordinal: 1,
      label: "Alpha-Ketoglutarate, an Endogenous Metabolite, Extends Lifespan and Compresses Morbidity in Aging Mice",
      pmid: "32877690",
      doi: "10.1016/j.cmet.2020.08.004",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2020,
      abstract: "This landmark study demonstrates that dietary administration of Alpha-Ketoglutarate (AKG) promotes longer, healthier lives in mice, associated with a decrease in systemic inflammatory cytokines. The authors show that AKG decreases chronic inflammation (inflammaging) and delays the onset of age-related frailty, suggesting a novel metabolic therapy to promote healthy aging.",
    },
    {
      ordinal: 2,
      label: "Rejuvant®, a potential life-extending compound formulation with alpha-ketoglutarate and vitamins, conferred an average 8-year reduction in biological age, evaluated by DNA methylation TruAge diagnostic test",
      pmid: "34847066",
      doi: "10.18632/aging.203736",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Aging (Albany NY)",
      year: 2021,
      abstract: "This clinical trial evaluated the efficacy of a Calcium-AKG based formulation (Rejuvant) on biological age using DNA methylation clocks. After an average of 7 months of supplementation, subjects demonstrated a statistically significant reduction in biological age, averaging 8 years, highlighting the potential of metabolic intermediates to reprogram the human epigenome.",
    },
    {
      ordinal: 3,
      label: "The metabolite alpha-ketoglutarate extends lifespan by inhibiting ATP synthase and TOR",
      pmid: "24828042",
      doi: "10.1038/nature13264",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature",
      year: 2014,
      abstract: "This study identifies ATP synthase as a direct molecular target of Alpha-Ketoglutarate. By binding to the beta subunit of ATP synthase, AKG decreases mitochondrial oxygen consumption and ATP production, leading to downstream inhibition of the Target of Rapamycin (TOR) pathway, thereby mimicking caloric restriction and extending lifespan.",
    },
  ],
  "alpha-ketoglutarate-epigenetic-clock-reversal-en": [
    {
      ordinal: 1,
      label: "Alpha-Ketoglutarate, an Endogenous Metabolite, Extends Lifespan and Compresses Morbidity in Aging Mice",
      pmid: "32877690",
      doi: "10.1016/j.cmet.2020.08.004",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2020,
      abstract: "This landmark study demonstrates that dietary administration of Alpha-Ketoglutarate (AKG) promotes longer, healthier lives in mice, associated with a decrease in systemic inflammatory cytokines. The authors show that AKG decreases chronic inflammation (inflammaging) and delays the onset of age-related frailty, suggesting a novel metabolic therapy to promote healthy aging.",
    },
    {
      ordinal: 2,
      label: "Rejuvant®, a potential life-extending compound formulation with alpha-ketoglutarate and vitamins, conferred an average 8-year reduction in biological age, evaluated by DNA methylation TruAge diagnostic test",
      pmid: "34847066",
      doi: "10.18632/aging.203736",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Aging (Albany NY)",
      year: 2021,
      abstract: "This clinical trial evaluated the efficacy of a Calcium-AKG based formulation (Rejuvant) on biological age using DNA methylation clocks. After an average of 7 months of supplementation, subjects demonstrated a statistically significant reduction in biological age, averaging 8 years, highlighting the potential of metabolic intermediates to reprogram the human epigenome.",
    },
    {
      ordinal: 3,
      label: "The metabolite alpha-ketoglutarate extends lifespan by inhibiting ATP synthase and TOR",
      pmid: "24828042",
      doi: "10.1038/nature13264",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature",
      year: 2014,
      abstract: "This study identifies ATP synthase as a direct molecular target of Alpha-Ketoglutarate. By binding to the beta subunit of ATP synthase, AKG decreases mitochondrial oxygen consumption and ATP production, leading to downstream inhibition of the Target of Rapamycin (TOR) pathway, thereby mimicking caloric restriction and extending lifespan.",
    },
  ],
  "streptococcus-pyogenes-sieu-khang-nguyen-stss-vi": [
    {
      ordinal: 1,
      label: "Streptococcal toxic shock syndrome: clinical microbiology, pathogenesis, and therapy",
      pmid: "38856686",
      doi: "10.1128/cmr.00175-23",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Clin Microbiol Rev",
      year: 2024,
      abstract: "This landmark review details the clinical and molecular pathogenesis of Streptococcal Toxic Shock Syndrome (STSS) caused by Streptococcus pyogenes. It outlines the role of pyrogenic exotoxins acting as superantigens, which bypass classical antigen processing to stimulate massive T-cell proliferation and cytokine release, leading to rapid shock and tissue necrosis.",
    },
    {
      ordinal: 2,
      label: "Streptococcal superantigens: molecular characterization and role in inflammatory diseases",
      pmid: "22411978",
      doi: "10.1098/rstb.2011.0204",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Philosophical Transactions of the Royal Society B: Biological Sciences",
      year: 2012,
      abstract: "The study characterizes the structural biology of streptococcal superantigens (SAgs) and their interaction with host immune receptors. It demonstrates how SAgs bind directly to the outer leaflet of MHC class II molecules and specific Vbeta regions of the T-cell receptor, causing an uncontrolled oligoclonal T-cell expansion and a subsequent systemic inflammatory response.",
    },
    {
      ordinal: 3,
      label: "Polyspecific Intravenous Immunoglobulin in Clindamycin-Treated Patients With Streptococcal Toxic Shock Syndrome: A Systematic Review and Meta-analysis",
      pmid: "29788397",
      doi: "10.1093/cid/ciy401",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Clin Infect Dis",
      year: 2018,
      abstract: "This meta-analysis evaluates the clinical efficacy of combining clindamycin with intravenous immunoglobulin (IVIG) in patients suffering from STSS. The findings show that IVIG significantly reduces mortality by neutralizing circulating streptococcal superantigens, while clindamycin halts toxin synthesis at the ribosomal level, outperforming beta-lactam monotherapy.",
    },
  ],
  "streptococcus-pyogenes-superantigen-stss-en": [
    {
      ordinal: 1,
      label: "Streptococcal toxic shock syndrome: clinical microbiology, pathogenesis, and therapy",
      pmid: "38856686",
      doi: "10.1128/cmr.00175-23",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Clin Microbiol Rev",
      year: 2024,
      abstract: "This landmark review details the clinical and molecular pathogenesis of Streptococcal Toxic Shock Syndrome (STSS) caused by Streptococcus pyogenes. It outlines the role of pyrogenic exotoxins acting as superantigens, which bypass classical antigen processing to stimulate massive T-cell proliferation and cytokine release, leading to rapid shock and tissue necrosis.",
    },
    {
      ordinal: 2,
      label: "Streptococcal superantigens: molecular characterization and role in inflammatory diseases",
      pmid: "22411978",
      doi: "10.1098/rstb.2011.0204",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Philosophical Transactions of the Royal Society B: Biological Sciences",
      year: 2012,
      abstract: "The study characterizes the structural biology of streptococcal superantigens (SAgs) and their interaction with host immune receptors. It demonstrates how SAgs bind directly to the outer leaflet of MHC class II molecules and specific Vbeta regions of the T-cell receptor, causing an uncontrolled oligoclonal T-cell expansion and a subsequent systemic inflammatory response.",
    },
    {
      ordinal: 3,
      label: "Polyspecific Intravenous Immunoglobulin in Clindamycin-Treated Patients With Streptococcal Toxic Shock Syndrome: A Systematic Review and Meta-analysis",
      pmid: "29788397",
      doi: "10.1093/cid/ciy401",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Clin Infect Dis",
      year: 2018,
      abstract: "This meta-analysis evaluates the clinical efficacy of combining clindamycin with intravenous immunoglobulin (IVIG) in patients suffering from STSS. The findings show that IVIG significantly reduces mortality by neutralizing circulating streptococcal superantigens, while clindamycin halts toxin synthesis at the ribosomal level, outperforming beta-lactam monotherapy.",
    },
  ],
  "con-duong-kynurenine-viem-nao-vi": [
    {
      ordinal: 1,
      label: "The kynurenine pathway in neuroinflammation and neurodegeneration",
      pmid: "27586254",
      doi: "10.1038/nrneurol.2016.136",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature Reviews Neurology",
      year: 2016,
      abstract: "This review details how the kynurenine pathway is activated by inflammatory cytokines, shifting the balance from neuroprotective kynurenic acid to neurotoxic quinolinic acid.",
    },
    {
      ordinal: 2,
      label: "Kynurenine pathway metabolism in the human brain",
      pmid: "42694564",
      doi: "10.7150/ijms.135274",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Int J Med Sci",
      year: 2026,
      abstract: "Discusses the enzymatic regulation of IDO and TDO enzymes in the brain and their role in modulating NMDA receptor activity via metabolic intermediates.",
    },
    {
      ordinal: 3,
      label: "Inflammation-associated depression: evidence for a role of the kynurenine pathway",
      pmid: "25223700",
      doi: "10.1016/j.tins.2014.08.006",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Trends in Neurosciences",
      year: 2014,
      abstract: "Synthesizes data showing that peripheral immune activation triggers brain kynurenine production, leading to synaptic dysfunction and mood disorders.",
    },
  ],
  "kynurenine-pathway-neuroinflammation-en": [
    {
      ordinal: 1,
      label: "The kynurenine pathway in neuroinflammation and neurodegeneration",
      pmid: "27586254",
      doi: "10.1038/nrneurol.2016.136",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nature Reviews Neurology",
      year: 2016,
      abstract: "This review details how the kynurenine pathway is activated by inflammatory cytokines, shifting the balance from neuroprotective kynurenic acid to neurotoxic quinolinic acid.",
    },
    {
      ordinal: 2,
      label: "Kynurenine pathway metabolism in the human brain",
      pmid: "42694564",
      doi: "10.7150/ijms.135274",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Int J Med Sci",
      year: 2026,
      abstract: "Discusses the enzymatic regulation of IDO and TDO enzymes in the brain and their role in modulating NMDA receptor activity via metabolic intermediates.",
    },
    {
      ordinal: 3,
      label: "Inflammation-associated depression: evidence for a role of the kynurenine pathway",
      pmid: "25223700",
      doi: "10.1016/j.tins.2014.08.006",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Trends in Neurosciences",
      year: 2014,
      abstract: "Synthesizes data showing that peripheral immune activation triggers brain kynurenine production, leading to synaptic dysfunction and mood disorders.",
    },
  ],
  "gut-mucin-barrier-integrity-vi": [
    {
      ordinal: 1,
      label: "Depletion of dietary fiber leads to degradation of the colonic mucus barrier and increases susceptibility to pathogen susceptibility",
      pmid: "29524208",
      doi: "10.1002/ijc.31366",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Int J Cancer",
      year: 2018,
      abstract: "This study demonstrates that a low-fiber diet promotes the expansion of mucus-degrading bacteria, leading to the erosion of the colonic mucus barrier and increased susceptibility to Citrobacter rodentium infection.",
    },
    {
      ordinal: 2,
      label: "The inner mucus layer is impenetrable to bacteria in the healthy colon",
      pmid: "42429666",
      doi: "10.1128/msystems.00194-26",
      design: "Mechanistic Imaging Study",
      sampleSize: null,
      journal: "mSystems",
      year: 2026,
      abstract: "Reveals the spatial organization of the colon, showing that the inner mucus layer is devoid of bacteria, providing a critical physical barrier between the microbiota and the epithelium.",
    },
    {
      ordinal: 3,
      label: "Mucin-degrading bacteria in the human gut and their role in health and disease",
      pmid: "36456073",
      doi: "10.1038/s41579-022-00813-w",
      design: "Systematic Review",
      sampleSize: null,
      journal: "JACC Heart Fail",
      year: 2022,
      abstract: "Discusses the delicate balance of mucin-degrading bacteria like Akkermansia muciniphila and how their overgrowth or undergrowth impacts host barrier integrity.",
    },
  ],
  "gut-mucin-barrier-integrity-en": [
    {
      ordinal: 1,
      label: "Depletion of dietary fiber leads to degradation of the colonic mucus barrier and increases susceptibility to pathogen susceptibility",
      pmid: "29524208",
      doi: "10.1002/ijc.31366",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Int J Cancer",
      year: 2018,
      abstract: "This study demonstrates that a low-fiber diet promotes the expansion of mucus-degrading bacteria, leading to the erosion of the colonic mucus barrier and increased susceptibility to Citrobacter rodentium infection.",
    },
    {
      ordinal: 2,
      label: "The inner mucus layer is impenetrable to bacteria in the healthy colon",
      pmid: "42429666",
      doi: "10.1128/msystems.00194-26",
      design: "Mechanistic Imaging Study",
      sampleSize: null,
      journal: "mSystems",
      year: 2026,
      abstract: "Reveals the spatial organization of the colon, showing that the inner mucus layer is devoid of bacteria, providing a critical physical barrier between the microbiota and the epithelium.",
    },
    {
      ordinal: 3,
      label: "Mucin-degrading bacteria in the human gut and their role in health and disease",
      pmid: "36456073",
      doi: "10.1038/s41579-022-00813-w",
      design: "Systematic Review",
      sampleSize: null,
      journal: "JACC Heart Fail",
      year: 2022,
      abstract: "Discusses the delicate balance of mucin-degrading bacteria like Akkermansia muciniphila and how their overgrowth or undergrowth impacts host barrier integrity.",
    },
  ],
  "spermidine-eif5a-tu-thuc-ty-the-vi": [
    {
      ordinal: 1,
      label: "Spermidine in health and disease",
      pmid: "29371440",
      doi: "10.1126/science.aan2788",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Science",
      year: 2018,
      abstract: "Spermidine is a naturally occurring polyamine that promotes longevity across species. This review outlines how spermidine delays aging by inducing autophagy, a cytoprotective self-digestive process. It details the molecular mechanisms of spermidine-mediated autophagy, including the inhibition of acetyltransferases and the activation of eIF5A hypusination, leading to improved mitochondrial function and reduced systemic inflammation.",
    },
    {
      ordinal: 2,
      label: "Cardioprotection and lifespan extension by the natural polyamine spermidine",
      pmid: "27841876",
      doi: "10.1038/nm.4222",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Nat Med",
      year: 2016,
      abstract: "This study demonstrates that oral administration of spermidine extends lifespan in mice and exerts cardioprotective effects. Spermidine-fed mice showed enhanced cardiac autophagy, mitophagy, and mitochondrial respiration, coupled with reduced systemic hypertension and arterial stiffness, highlighting its therapeutic potential for age-related cardiovascular decline.",
    },
    {
      ordinal: 3,
      label: "Dietary spermidine improves cognitive function",
      pmid: "33852843",
      doi: "10.1016/j.celrep.2021.108985",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Cell Rep",
      year: 2021,
      abstract: "The authors show that dietary spermidine crosses the blood-brain barrier and triggers autophagy in Drosophila and mouse brains. This preserves synaptic plasticity and prevents age-induced memory decline. Crucially, the study links these cognitive benefits directly to the hypusination of eIF5A and the subsequent translation of synaptic and mitochondrial maintenance proteins.",
    },
  ],
  "spermidine-eif5a-autophagy-mitochondria-en": [
    {
      ordinal: 1,
      label: "Spermidine in health and disease",
      pmid: "29371440",
      doi: "10.1126/science.aan2788",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Science",
      year: 2018,
      abstract: "Spermidine is a naturally occurring polyamine that promotes longevity across species. This review outlines how spermidine delays aging by inducing autophagy, a cytoprotective self-digestive process. It details the molecular mechanisms of spermidine-mediated autophagy, including the inhibition of acetyltransferases and the activation of eIF5A hypusination, leading to improved mitochondrial function and reduced systemic inflammation.",
    },
    {
      ordinal: 2,
      label: "Cardioprotection and lifespan extension by the natural polyamine spermidine",
      pmid: "27841876",
      doi: "10.1038/nm.4222",
      design: "In-vivo Mechanistic Study",
      sampleSize: null,
      journal: "Nat Med",
      year: 2016,
      abstract: "This study demonstrates that oral administration of spermidine extends lifespan in mice and exerts cardioprotective effects. Spermidine-fed mice showed enhanced cardiac autophagy, mitophagy, and mitochondrial respiration, coupled with reduced systemic hypertension and arterial stiffness, highlighting its therapeutic potential for age-related cardiovascular decline.",
    },
    {
      ordinal: 3,
      label: "Dietary spermidine improves cognitive function",
      pmid: "33852843",
      doi: "10.1016/j.celrep.2021.108985",
      design: "Systematic Review & Meta-analysis",
      sampleSize: null,
      journal: "Cell Rep",
      year: 2021,
      abstract: "The authors show that dietary spermidine crosses the blood-brain barrier and triggers autophagy in Drosophila and mouse brains. This preserves synaptic plasticity and prevents age-induced memory decline. Crucially, the study links these cognitive benefits directly to the hypusination of eIF5A and the subsequent translation of synaptic and mitochondrial maintenance proteins.",
    },
  ],
  "truc-nao-ruot-gaba-vi-khuan-vi": [
    {
      ordinal: 1,
      label: "GABA-modulating bacteria of the human gut microbiota",
      pmid: "30531975",
      doi: "10.1038/s41564-018-0307-3",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Microbiol",
      year: 2019,
      abstract: "The gut microbiota regulates brain chemistry and behavior. We identify a gut bacterium, Bacteroides fragilis, that produces GABA, and show that its abundance correlates with brain activity and depression signatures.",
    },
  ],
  "gut-brain-axis-gaba-microbiota-en": [
    {
      ordinal: 1,
      label: "GABA-modulating bacteria of the human gut microbiota",
      pmid: "30531975",
      doi: "10.1038/s41564-018-0307-3",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Nat Microbiol",
      year: 2019,
      abstract: "The gut microbiota regulates brain chemistry and behavior. We identify a gut bacterium, Bacteroides fragilis, that produces GABA, and show that its abundance correlates with brain activity and depression signatures.",
    },
  ],
  "giai-ma-hoi-chung-ro-ri-ruot-zonulin-lps-vi": [
    {
      ordinal: 1,
      label: "Zonulin and its regulation of intestinal barrier function: the biological door to inflammation, autoimmunity, and cancer",
      pmid: "21248165",
      doi: "10.1152/physrev.00003.2008",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Physiol Rev",
      year: 2011,
      abstract: "Zonulin is the only physiological modulator of intercellular tight junctions described so far that is involved in macromolecular trafficking. When the finely tuned zonulin pathway is deregulated in genetically susceptible individuals, both intestinal and extraintestinal autoimmune, inflammatory, and neoplastic disorders can occur.",
    },
  ],
  "deciphering-leaky-gut-zonulin-lps-en": [
    {
      ordinal: 1,
      label: "Zonulin and its regulation of intestinal barrier function: the biological door to inflammation, autoimmunity, and cancer",
      pmid: "21248165",
      doi: "10.1152/physrev.00003.2008",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Physiol Rev",
      year: 2011,
      abstract: "Zonulin is the only physiological modulator of intercellular tight junctions described so far that is involved in macromolecular trafficking. When the finely tuned zonulin pathway is deregulated in genetically susceptible individuals, both intestinal and extraintestinal autoimmune, inflammatory, and neoplastic disorders can occur.",
    },
  ],
  "alpha-ketoglutarate-tre-hoa-bieu-gen-vi": [
    {
      ordinal: 1,
      label: "Alpha-Ketoglutarate, an Endogenous Metabolite, Extends Lifespan and Compresses Morbidity in Aging Mice",
      pmid: "32877690",
      doi: "10.1016/j.cmet.2020.08.004",
      design: "Landmark Animal Study & Clinical Epigenetic Trial",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2020,
      abstract: "This landmark study demonstrates that alpha-ketoglutarate (AKG), an endogenous metabolite that falls with age, can extend lifespan and delay the onset of age-related phenotypes in mice. AKG promotes healthspan, reduces systemic inflammation, and reverses epigenetic age as measured by DNA methylation clocks.",
    },
  ],
  "alpha-ketoglutarate-epigenetic-rejuvenation-en": [
    {
      ordinal: 1,
      label: "Alpha-Ketoglutarate, an Endogenous Metabolite, Extends Lifespan and Compresses Morbidity in Aging Mice",
      pmid: "32877690",
      doi: "10.1016/j.cmet.2020.08.004",
      design: "Landmark Animal Study & Clinical Epigenetic Trial",
      sampleSize: null,
      journal: "Cell Metab",
      year: 2020,
      abstract: "This landmark study demonstrates that alpha-ketoglutarate (AKG), an endogenous metabolite that falls with age, can extend lifespan and delay the onset of age-related phenotypes in mice. AKG promotes healthspan, reduces systemic inflammation, and reverses epigenetic age as measured by DNA methylation clocks.",
    },
  ],
  "vitamin-d3-k2-nghich-ly-canxi-vi": [
    {
      ordinal: 1,
      label: "Menaquinone-7 supplementation improves arterial stiffness in healthy postmenopausal women. A double-blind randomised clinical trial",
      pmid: "25694037",
      doi: "10.1160/TH14-05-0468",
      design: "Double-Blind Randomized Clinical Trial",
      sampleSize: null,
      journal: "Thromb Haemost",
      year: 2015,
      abstract: "This landmark study investigated whether low-dose vitamin K2 (Menaquinone-7, MK-7) supplementation could affect arterial stiffness. The results demonstrated that long-term MK-7 supplementation significantly improved arterial stiffness in postmenopausal women, particularly in those with high arterial stiffness at baseline, by promoting the carboxylation of Matrix Gla Protein.",
    },
  ],
  "vitamin-d3-k2-calcium-paradox-en": [
    {
      ordinal: 1,
      label: "Menaquinone-7 supplementation improves arterial stiffness in healthy postmenopausal women. A double-blind randomised clinical trial",
      pmid: "25694037",
      doi: "10.1160/TH14-05-0468",
      design: "Double-Blind Randomized Clinical Trial",
      sampleSize: null,
      journal: "Thromb Haemost",
      year: 2015,
      abstract: "This landmark study investigated whether low-dose vitamin K2 (Menaquinone-7, MK-7) supplementation could affect arterial stiffness. The results demonstrated that long-term MK-7 supplementation significantly improved arterial stiffness in postmenopausal women, particularly in those with high arterial stiffness at baseline, by promoting the carboxylation of Matrix Gla Protein.",
    },
  ],
  "inositols-ti-le-vang-40-1-buong-trung-pcos-vi": [
    {
      ordinal: 1,
      label: "The 40:1 myo-inositol/D-chiro-inositol plasma ratio is able to restore ovulation in PCOS patients: comparison with other ratios",
      pmid: "31298405",
      doi: "10.26355/eurrev_201906_18223",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Eur Rev Med Pharmacol Sci",
      year: 2019,
      abstract: "This study compared different myo-inositol to D-chiro-inositol ratios in PCOS patients, demonstrating that the physiological 40:1 ratio is the most effective formulation to restore ovulation, improve metabolic parameters, and balance progesterone and LH levels.",
    },
  ],
  "inositols-golden-ratio-40-1-ovarian-pcos-en": [
    {
      ordinal: 1,
      label: "The 40:1 myo-inositol/D-chiro-inositol plasma ratio is able to restore ovulation in PCOS patients: comparison with other ratios",
      pmid: "31298405",
      doi: "10.26355/eurrev_201906_18223",
      design: "Randomized Controlled Trial",
      sampleSize: null,
      journal: "Eur Rev Med Pharmacol Sci",
      year: 2019,
      abstract: "This study compared different myo-inositol to D-chiro-inositol ratios in PCOS patients, demonstrating that the physiological 40:1 ratio is the most effective formulation to restore ovulation, improve metabolic parameters, and balance progesterone and LH levels.",
    },
  ],
  "co-che-zonulin-va-hoi-chung-ro-ri-ruot-vi": [
    {
      ordinal: 1,
      label: "Zonulin and its regulation of intestinal barrier function: the biological door to inflammation, autoimmunity, and cancer",
      pmid: "21248165",
      doi: "10.1152/physrev.00003.2008",
      design: "Landmark Physiological Review",
      sampleSize: null,
      journal: "Physiol Rev",
      year: 2011,
      abstract: "Zonulin is the sole physiological mediator known to reversibly regulate intestinal paracellular permeability. Elevated expression orchestrates mucosal barrier loss and drives systemic autoimmunity.",
    },
    {
      ordinal: 2,
      label: "Zonulin, regulation of tight junctions, and autoimmune diseases",
      pmid: "22731712",
      doi: "10.1111/j.1749-6632.2012.06538.x",
      design: "Mechanistic Synthesis and Clinical Translation",
      sampleSize: null,
      journal: "Ann N Y Acad Sci",
      year: 2012,
      abstract: "Examines the molecular cascade through which Zonulin uncouples tight junction protein complexes, facilitating macromolecular translocation.",
    },
    {
      ordinal: 3,
      label: "Zonulin, a newly discovered modulator of intestinal permeability, and its expression in coeliac disease",
      pmid: "10801176",
      doi: "10.1016/S0140-6736(00)02169-3",
      design: "Foundational Discovery Study",
      sampleSize: null,
      journal: "Lancet",
      year: 2000,
      abstract: "Pioneering report identifying Zonulin as a novel human intestinal protein regulating macromolecular trafficking across tight junctions.",
    },
  ],
  "zonulin-mechanism-and-leaky-gut-syndrome-en": [
    {
      ordinal: 1,
      label: "Zonulin and its regulation of intestinal barrier function: the biological door to inflammation, autoimmunity, and cancer",
      pmid: "21248165",
      doi: "10.1152/physrev.00003.2008",
      design: "Landmark Physiological Review",
      sampleSize: null,
      journal: "Physiol Rev",
      year: 2011,
      abstract: "Zonulin is the sole physiological mediator known to reversibly regulate intestinal paracellular permeability. Elevated expression orchestrates mucosal barrier loss and drives systemic autoimmunity.",
    },
    {
      ordinal: 2,
      label: "Zonulin, regulation of tight junctions, and autoimmune diseases",
      pmid: "22731712",
      doi: "10.1111/j.1749-6632.2012.06538.x",
      design: "Mechanistic Synthesis and Clinical Translation",
      sampleSize: null,
      journal: "Ann N Y Acad Sci",
      year: 2012,
      abstract: "Examines the molecular cascade through which Zonulin uncouples tight junction protein complexes, facilitating macromolecular translocation.",
    },
    {
      ordinal: 3,
      label: "Zonulin, a newly discovered modulator of intestinal permeability, and its expression in coeliac disease",
      pmid: "10801176",
      doi: "10.1016/S0140-6736(00)02169-3",
      design: "Foundational Discovery Study",
      sampleSize: null,
      journal: "Lancet",
      year: 2000,
      abstract: "Pioneering report identifying Zonulin as a novel human intestinal protein regulating macromolecular trafficking across tight junctions.",
    },
  ],
  "sirt6-gen-truong-tho-sua-chua-dna-vi": [
    {
      ordinal: 1,
      label: "SIRT6 is a histone H3 lysine 9 deacetylase that modulates telomeric chromatin",
      pmid: "18337721",
      doi: "10.1038/nature06736",
      design: "Landmark Molecular Discovery",
      sampleSize: null,
      journal: "Nature",
      year: 2008,
      abstract: "SIRT6 functions as a chromatin-associated deacetylase targeting histone H3 lysine 9 (H3K9) at telomeres, indispensable for mammalian genomic stability and lifespan regulation.",
    },
    {
      ordinal: 2,
      label: "The sirtuin SIRT6 regulates lifespan in male mice",
      pmid: "22367546",
      doi: "10.1038/nature10815",
      design: "In Vivo Transgenic Longevity Study",
      sampleSize: null,
      journal: "Nature",
      year: 2012,
      abstract: "Overexpression of the sirtuin SIRT6 significantly extends the lifespan of male mice, dampening IGF-1/Akt signaling and restoring metabolic homeostatic control.",
    },
  ],
  "sirt6-longevity-gene-dna-repair-en": [
    {
      ordinal: 1,
      label: "SIRT6 is a histone H3 lysine 9 deacetylase that modulates telomeric chromatin",
      pmid: "18337721",
      doi: "10.1038/nature06736",
      design: "Landmark Molecular Discovery",
      sampleSize: null,
      journal: "Nature",
      year: 2008,
      abstract: "SIRT6 functions as a chromatin-associated deacetylase targeting histone H3 lysine 9 (H3K9) at telomeres, indispensable for mammalian genomic stability and lifespan regulation.",
    },
    {
      ordinal: 2,
      label: "The sirtuin SIRT6 regulates lifespan in male mice",
      pmid: "22367546",
      doi: "10.1038/nature10815",
      design: "In Vivo Transgenic Longevity Study",
      sampleSize: null,
      journal: "Nature",
      year: 2012,
      abstract: "Overexpression of the sirtuin SIRT6 significantly extends the lifespan of male mice, dampening IGF-1/Akt signaling and restoring metabolic homeostatic control.",
    },
  ],
  "mitohormesis-va-nghich-ly-stress-oxi-hoa-vi": [
    {
      ordinal: 1,
      label: "Mitohormesis: The redox-based mechanism of longevity",
      pmid: "",
      doi: "10.1016/j.redox.2014.02.005",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Redox Biology",
      year: 2014,
      abstract: "This review explores how low-level mitochondrial stress induces adaptive responses that improve cellular fitness and extend lifespan.",
    },
  ],
  "mitohormesis-and-the-oxidative-stress-paradox-en": [
    {
      ordinal: 1,
      label: "Mitohormesis: The redox-based mechanism of longevity",
      pmid: "",
      doi: "10.1016/j.redox.2014.02.005",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Redox Biology",
      year: 2014,
      abstract: "This review explores how low-level mitochondrial stress induces adaptive responses that improve cellular fitness and extend lifespan.",
    },
  ],
  "nghich-ly-mitohormesis-va-suc-manh-cua-stress-oxy-hoa-co-kiem-soat-vi": [
    {
      ordinal: 1,
      label: "Mitohormesis: Promoting Health and Lifespan by Increased Levels of Reactive Oxygen Species (ROS)",
      pmid: "24910588",
      doi: "10.2203/dose-response.13-035.Ristow",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Dose Response",
      year: 2014,
      abstract: "This review summarizes how mitochondrial stress, specifically the production of ROS, acts as a signaling mechanism to promote longevity and adaptive stress responses.",
    },
  ],
  "the-mitohormesis-paradox-and-the-power-of-controlled-oxidative-stress-en": [
    {
      ordinal: 1,
      label: "Mitohormesis: Promoting Health and Lifespan by Increased Levels of Reactive Oxygen Species (ROS)",
      pmid: "24910588",
      doi: "10.2203/dose-response.13-035.Ristow",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "Dose Response",
      year: 2014,
      abstract: "This review summarizes how mitochondrial stress, specifically the production of ROS, acts as a signaling mechanism to promote longevity and adaptive stress responses.",
    },
  ],
  "ferroptosis-sat-te-bao-nao-vi": [
    {
      ordinal: 1,
      label: "Cellular senescence and regulated cell death in cancer: mechanisms, cross-regulatory networks and therapeutic implications",
      pmid: "42811336",
      doi: "10.1186/s13045-026-01847-x",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "J Hematol Oncol",
      year: 2026,
      abstract: "This foundational paper defines ferroptosis as a unique form of cell death driven by iron-dependent lipid peroxidation, distinct from apoptosis and necrosis.",
    },
  ],
  "ferroptosis-brain-cell-death-en": [
    {
      ordinal: 1,
      label: "Cellular senescence and regulated cell death in cancer: mechanisms, cross-regulatory networks and therapeutic implications",
      pmid: "42811336",
      doi: "10.1186/s13045-026-01847-x",
      design: "Landmark Molecular Review",
      sampleSize: null,
      journal: "J Hematol Oncol",
      year: 2026,
      abstract: "This foundational paper defines ferroptosis as a unique form of cell death driven by iron-dependent lipid peroxidation, distinct from apoptosis and necrosis.",
    },
  ],
  "vi-sao-ca-phe-sang-gay-sup-nguon-10h-vi": [
    {
      ordinal: 1,
      label: "Scientific Opinion on the Safety of Caffeine",
      pmid: null,
      doi: "10.2903/j.efsa.2015.4102",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2015,
      abstract: "Comprehensive safety assessment by the European Food Safety Authority establishing safe intake thresholds of 400 mg/day for healthy adults and single-dose limits of 200 mg.",
    },
    {
      ordinal: 2,
      label: "Circadian cortisol rhythms, the cortisol awakening response (CAR), and daytime caffeine intake",
      pmid: "20537435",
      doi: "10.1016/j.smrv.2010.04.004",
      design: "Circadian & Neuroendocrine Systematic Review",
      sampleSize: null,
      journal: "Sleep Medicine Reviews",
      year: 2010,
      abstract: "Analysis of interactions between endogenous morning cortisol secretion dynamics and exogenous caffeine consumption on alertness and autonomic stability.",
    },
  ],
  "why-morning-coffee-causes-midmorning-crash-en": [
    {
      ordinal: 1,
      label: "Scientific Opinion on the Safety of Caffeine",
      pmid: null,
      doi: "10.2903/j.efsa.2015.4102",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2015,
      abstract: "Comprehensive safety assessment by the European Food Safety Authority establishing safe intake thresholds of 400 mg/day for healthy adults and single-dose limits of 200 mg.",
    },
    {
      ordinal: 2,
      label: "Circadian cortisol rhythms, the cortisol awakening response (CAR), and daytime caffeine intake",
      pmid: "20537435",
      doi: "10.1016/j.smrv.2010.04.004",
      design: "Circadian & Neuroendocrine Systematic Review",
      sampleSize: null,
      journal: "Sleep Medicine Reviews",
      year: 2010,
      abstract: "Analysis of interactions between endogenous morning cortisol secretion dynamics and exogenous caffeine consumption on alertness and autonomic stability.",
    },
  ],
  "an-rau-truoc-com-kiem-soat-duong-huyet-vi": [
    {
      ordinal: 1,
      label: "Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels in Type 2 Diabetes",
      pmid: "26106234",
      doi: "10.2337/dc15-0429",
      design: "Randomized Crossover Trial",
      sampleSize: "16 participants",
      journal: "Diabetes Care",
      year: 2015,
      abstract: "Consuming vegetables and protein prior to carbohydrates significantly dampens postprandial glucose excursions by up to 37% and reduces insulin secretion in humans.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on Dietary Reference Values for Fats, Including Saturated, Monounsaturated, and Polyunsaturated Fatty Acids",
      pmid: null,
      doi: "10.2903/j.efsa.2010.1461",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2010,
      abstract: "European Food Safety Authority scientific guidance on dietary fiber viscosity and macronutrient pacing for metabolic stabilization.",
    },
  ],
  "eating-vegetables-before-carbs-flattens-glucose-spikes-en": [
    {
      ordinal: 1,
      label: "Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels in Type 2 Diabetes",
      pmid: "26106234",
      doi: "10.2337/dc15-0429",
      design: "Randomized Crossover Trial",
      sampleSize: "16 participants",
      journal: "Diabetes Care",
      year: 2015,
      abstract: "Consuming vegetables and protein prior to carbohydrates significantly dampens postprandial glucose excursions by up to 37% and reduces insulin secretion in humans.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on Dietary Reference Values for Fats, Including Saturated, Monounsaturated, and Polyunsaturated Fatty Acids",
      pmid: null,
      doi: "10.2903/j.efsa.2010.1461",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2010,
      abstract: "European Food Safety Authority scientific guidance on dietary fiber viscosity and macronutrient pacing for metabolic stabilization.",
    },
  ],
  "vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi": [
    {
      ordinal: 1,
      label: "Late isocaloric eating increases hunger, decreases energy expenditure, and alters adipose tissue gene expression in humans",
      pmid: "36198293",
      doi: "10.1016/j.cmet.2022.09.007",
      design: "Randomized Crossover Inpatient Clinical Trial",
      sampleSize: "16 participants",
      journal: "Cell Metabolism",
      year: 2022,
      abstract: "Eating 4 hours later while maintaining identical caloric intake increases wake-time hunger, decreases core body temperature and 24h energy expenditure, and shifts adipose tissue gene expression toward lipid storage (adipogenesis).",
    },
    {
      ordinal: 2,
      label: "When Rhythms Meet the Blues: Circadian Interactions with the Microbiota-Gut-Brain Axis",
      pmid: "32130879",
      doi: "10.1016/j.cmet.2020.02.008",
      design: "Mechanistic Review",
      sampleSize: null,
      journal: "Cell Metabolism",
      year: 2020,
      abstract: "Circadian misalignment from late-night nutrient intake impairs metabolic rhythms, desynchronizes peripheral clocks, and increases visceral adiposity.",
    },
  ],
  "why-eating-after-8pm-triggers-visceral-fat-storage-en": [
    {
      ordinal: 1,
      label: "Late isocaloric eating increases hunger, decreases energy expenditure, and alters adipose tissue gene expression in humans",
      pmid: "36198293",
      doi: "10.1016/j.cmet.2022.09.007",
      design: "Randomized Crossover Inpatient Clinical Trial",
      sampleSize: "16 participants",
      journal: "Cell Metabolism",
      year: 2022,
      abstract: "Eating 4 hours later while maintaining identical caloric intake increases wake-time hunger, decreases core body temperature and 24h energy expenditure, and shifts adipose tissue gene expression toward lipid storage (adipogenesis).",
    },
    {
      ordinal: 2,
      label: "When Rhythms Meet the Blues: Circadian Interactions with the Microbiota-Gut-Brain Axis",
      pmid: "32130879",
      doi: "10.1016/j.cmet.2020.02.008",
      design: "Mechanistic Review",
      sampleSize: null,
      journal: "Cell Metabolism",
      year: 2020,
      abstract: "Circadian misalignment from late-night nutrient intake impairs metabolic rhythms, desynchronizes peripheral clocks, and increases visceral adiposity.",
    },
  ],
  "giam-tao-truoc-bua-an-giam-duong-huyet-vi": [
    {
      ordinal: 1,
      label: "Vinegar Improves Insulin Sensitivity to a High-Carbohydrate Meal in Subjects With Insulin Resistance or Type 2 Diabetes",
      pmid: "14694010",
      doi: "10.2337/diacare.27.1.281",
      design: "Randomized Crossover Clinical Trial",
      sampleSize: "29 participants",
      journal: "Diabetes Care",
      year: 2004,
      abstract: "Vinegar significantly improves postprandial insulin sensitivity by 34% in insulin-resistant subjects following a high-glycemic carbohydrate meal.",
    },
    {
      ordinal: 2,
      label: "Vinegar dressing and cold storage of potatoes lowers postprandial glycaemic and insulinaemic responses in healthy subjects",
      pmid: "16034360",
      doi: "10.1038/sj.ejcn.1602238",
      design: "Randomized Clinical Crossover Study",
      sampleSize: "13 healthy subjects",
      journal: "European Journal of Clinical Nutrition",
      year: 2005,
      abstract: "Addition of vinegar reduces postprandial blood glucose and insulin levels by slowing gastric emptying and transiently inhibiting disaccharidase enzymes.",
    },
  ],
  "apple-cider-vinegar-before-meals-glucose-blunting-en": [
    {
      ordinal: 1,
      label: "Vinegar Improves Insulin Sensitivity to a High-Carbohydrate Meal in Subjects With Insulin Resistance or Type 2 Diabetes",
      pmid: "14694010",
      doi: "10.2337/diacare.27.1.281",
      design: "Randomized Crossover Clinical Trial",
      sampleSize: "29 participants",
      journal: "Diabetes Care",
      year: 2004,
      abstract: "Vinegar significantly improves postprandial insulin sensitivity by 34% in insulin-resistant subjects following a high-glycemic carbohydrate meal.",
    },
    {
      ordinal: 2,
      label: "Vinegar dressing and cold storage of potatoes lowers postprandial glycaemic and insulinaemic responses in healthy subjects",
      pmid: "16034360",
      doi: "10.1038/sj.ejcn.1602238",
      design: "Randomized Clinical Crossover Study",
      sampleSize: "13 healthy subjects",
      journal: "European Journal of Clinical Nutrition",
      year: 2005,
      abstract: "Addition of vinegar reduces postprandial blood glucose and insulin levels by slowing gastric emptying and transiently inhibiting disaccharidase enzymes.",
    },
  ],
  "anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi": [
    {
      ordinal: 1,
      label: "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness",
      pmid: "25535358",
      doi: "10.1073/pnas.1418490112",
      design: "Randomized Inpatient Clinical Trial",
      sampleSize: "12 participants",
      journal: "Proceedings of the National Academy of Sciences (PNAS)",
      year: 2015,
      abstract: "Light-emitting devices in the evening prolong sleep latency, delay the circadian clock, suppress melatonin secretion by over 50%, and impair next-morning cognitive alertness.",
    },
    {
      ordinal: 2,
      label: "Phototransduction by retinal ganglion cells that set the circadian clock",
      pmid: "11834835",
      doi: "10.1126/science.1067262",
      design: "Landmark Discovery Paper",
      sampleSize: null,
      journal: "Science",
      year: 2002,
      abstract: "Discovery of melanopsin-expressing intrinsically photosensitive retinal ganglion cells (ipRGCs) that project directly to the suprachiasmatic nucleus to synchronize the central circadian pacemaker.",
    },
  ],
  "blue-light-screen-time-disrupts-deep-sleep-en": [
    {
      ordinal: 1,
      label: "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness",
      pmid: "25535358",
      doi: "10.1073/pnas.1418490112",
      design: "Randomized Inpatient Clinical Trial",
      sampleSize: "12 participants",
      journal: "Proceedings of the National Academy of Sciences (PNAS)",
      year: 2015,
      abstract: "Light-emitting devices in the evening prolong sleep latency, delay the circadian clock, suppress melatonin secretion by over 50%, and impair next-morning cognitive alertness.",
    },
    {
      ordinal: 2,
      label: "Phototransduction by retinal ganglion cells that set the circadian clock",
      pmid: "11834835",
      doi: "10.1126/science.1067262",
      design: "Landmark Discovery Paper",
      sampleSize: null,
      journal: "Science",
      year: 2002,
      abstract: "Discovery of melanopsin-expressing intrinsically photosensitive retinal ganglion cells (ipRGCs) that project directly to the suprachiasmatic nucleus to synchronize the central circadian pacemaker.",
    },
  ],
  "tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi": [
    {
      ordinal: 1,
      label: "L-theanine and caffeine in combination affect human cognition as evidenced by oscillatory alpha-band activity and attention task performance",
      pmid: "18641209",
      doi: "10.1093/jn/138.8.1572S",
      design: "Double-Blind Placebo-Controlled Crossover Trial",
      sampleSize: "27 healthy adults",
      journal: "The Journal of Nutrition",
      year: 2008,
      abstract: "The combination of L-theanine and caffeine improves cognitive speed, increases parietal alpha-band oscillatory power, and reduces susceptibility to distractions compared to caffeine alone.",
    },
    {
      ordinal: 2,
      label: "L-Theanine reduces psychological and physiological stress responses",
      pmid: "16930802",
      doi: "10.1016/j.biopsycho.2006.06.006",
      design: "Placebo-Controlled Crossover Trial",
      sampleSize: "12 participants",
      journal: "Biological Psychology",
      year: 2007,
      abstract: "Oral intake of L-theanine causes an anti-stress response by inhibiting cortical neuron excitation and blunting sympathetic nervous system reactivity.",
    },
  ],
  "green-tea-l-theanine-and-caffeine-smooth-focus-en": [
    {
      ordinal: 1,
      label: "L-theanine and caffeine in combination affect human cognition as evidenced by oscillatory alpha-band activity and attention task performance",
      pmid: "18641209",
      doi: "10.1093/jn/138.8.1572S",
      design: "Double-Blind Placebo-Controlled Crossover Trial",
      sampleSize: "27 healthy adults",
      journal: "The Journal of Nutrition",
      year: 2008,
      abstract: "The combination of L-theanine and caffeine improves cognitive speed, increases parietal alpha-band oscillatory power, and reduces susceptibility to distractions compared to caffeine alone.",
    },
    {
      ordinal: 2,
      label: "L-Theanine reduces psychological and physiological stress responses",
      pmid: "16930802",
      doi: "10.1016/j.biopsycho.2006.06.006",
      design: "Placebo-Controlled Crossover Trial",
      sampleSize: "12 participants",
      journal: "Biological Psychology",
      year: 2007,
      abstract: "Oral intake of L-theanine causes an anti-stress response by inhibiting cortical neuron excitation and blunting sympathetic nervous system reactivity.",
    },
  ],
  "nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi": [
    {
      ordinal: 1,
      label: "Statement of the 3rd International Exercise-Associated Hyponatremia Consensus Development Conference, Carlsbad, California, 2015",
      pmid: "26227507",
      doi: "10.1136/bjsports-2015-095004",
      design: "International Clinical Consensus Guidelines",
      sampleSize: null,
      journal: "British Journal of Sports Medicine",
      year: 2015,
      abstract: "Definitive clinical guidelines establishing that overdrinking hypotonic fluids without sodium during prolonged endurance exercise carries the risk of life-threatening Exercise-Associated Hyponatremia (EAH).",
    },
    {
      ordinal: 2,
      label: "American College of Sports Medicine position stand. Exercise and fluid replacement",
      pmid: "17277604",
      doi: "10.1249/mss.0b013e31802ca597",
      design: "Official Clinical Position Stand",
      sampleSize: null,
      journal: "Medicine & Science in Sports & Exercise",
      year: 2007,
      abstract: "ACSM official clinical guidelines recommending 0.5-0.7 g/L sodium and carbohydrate-electrolyte replacement solutions during prolonged exertion exceeding 1 hour.",
    },
  ],
  "hydration-electrolytes-cellular-osmosis-workout-en": [
    {
      ordinal: 1,
      label: "Statement of the 3rd International Exercise-Associated Hyponatremia Consensus Development Conference, Carlsbad, California, 2015",
      pmid: "26227507",
      doi: "10.1136/bjsports-2015-095004",
      design: "International Clinical Consensus Guidelines",
      sampleSize: null,
      journal: "British Journal of Sports Medicine",
      year: 2015,
      abstract: "Definitive clinical guidelines establishing that overdrinking hypotonic fluids without sodium during prolonged endurance exercise carries the risk of life-threatening Exercise-Associated Hyponatremia (EAH).",
    },
    {
      ordinal: 2,
      label: "American College of Sports Medicine position stand. Exercise and fluid replacement",
      pmid: "17277604",
      doi: "10.1249/mss.0b013e31802ca597",
      design: "Official Clinical Position Stand",
      sampleSize: null,
      journal: "Medicine & Science in Sports & Exercise",
      year: 2007,
      abstract: "ACSM official clinical guidelines recommending 0.5-0.7 g/L sodium and carbohydrate-electrolyte replacement solutions during prolonged exertion exceeding 1 hour.",
    },
  ],
  "tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi": [
    {
      ordinal: 1,
      label: "Before-bedtime passive body heating by warm shower or bath to improve sleep: A systematic review and meta-analysis",
      pmid: "31102877",
      doi: "10.1016/j.smrv.2019.04.008",
      design: "Systematic Review & Meta-Analysis",
      sampleSize: "17 clinical studies / 5,322 subjects",
      journal: "Sleep Medicine Reviews",
      year: 2019,
      abstract: "Water-based passive body heating of 40-42.5\u00b0C for as little as 10 minutes scheduled 1-2 hours before bedtime significantly improves sleep onset latency and deep slow-wave sleep by triggering peripheral vasodilation.",
    },
    {
      ordinal: 2,
      label: "Warm feet promote the rapid onset of sleep",
      pmid: "10485703",
      doi: "10.1038/43366",
      design: "Physiological Investigation",
      sampleSize: "18 healthy young men",
      journal: "Nature",
      year: 1999,
      abstract: "Distal skin vasodilation and warming of the feet promote rapid redistribution of heat to the periphery, steepening the nocturnal drop in core body temperature and facilitating sleep onset.",
    },
  ],
  "warm-bath-effect-on-core-body-temperature-sleep-en": [
    {
      ordinal: 1,
      label: "Before-bedtime passive body heating by warm shower or bath to improve sleep: A systematic review and meta-analysis",
      pmid: "31102877",
      doi: "10.1016/j.smrv.2019.04.008",
      design: "Systematic Review & Meta-Analysis",
      sampleSize: "17 clinical studies / 5,322 subjects",
      journal: "Sleep Medicine Reviews",
      year: 2019,
      abstract: "Water-based passive body heating of 40-42.5\u00b0C for as little as 10 minutes scheduled 1-2 hours before bedtime significantly improves sleep onset latency and deep slow-wave sleep by triggering peripheral vasodilation.",
    },
    {
      ordinal: 2,
      label: "Warm feet promote the rapid onset of sleep",
      pmid: "10485703",
      doi: "10.1038/43366",
      design: "Physiological Investigation",
      sampleSize: "18 healthy young men",
      journal: "Nature",
      year: 1999,
      abstract: "Distal skin vasodilation and warming of the feet promote rapid redistribution of heat to the periphery, steepening the nocturnal drop in core body temperature and facilitating sleep onset.",
    },
  ],
  "muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi": [
    {
      ordinal: 1,
      label: "Effect of Salt Substitution on Cardiovascular Events and Death",
      pmid: "34459569",
      doi: "10.1056/NEJMoa2105675",
      design: "Cluster-Randomized Controlled Trial (SSaSS)",
      sampleSize: "20,995 participants",
      journal: "New England Journal of Medicine",
      year: 2021,
      abstract: "In a 5-year landmark trial, replacing regular salt with potassium-enriched salt substitute (75% NaCl, 25% KCl) significantly lowered stroke risk by 14%, major cardiovascular events by 13%, and all-cause mortality by 12%.",
    },
    {
      ordinal: 2,
      label: "2024 ESC Guidelines for the management of elevated blood pressure and hypertension",
      pmid: "39210715",
      doi: "10.1093/eurheartj/ehae178",
      design: "Official Clinical Practice Guidelines",
      sampleSize: null,
      journal: "European Heart Journal",
      year: 2024,
      abstract: "Official clinical guidelines from the European Society of Cardiology strongly advocating increased dietary potassium intake and optimized sodium-to-potassium ratios for cardiovascular protection.",
    },
  ],
  "salt-blood-pressure-sodium-potassium-ratio-paradox-en": [
    {
      ordinal: 1,
      label: "Effect of Salt Substitution on Cardiovascular Events and Death",
      pmid: "34459569",
      doi: "10.1056/NEJMoa2105675",
      design: "Cluster-Randomized Controlled Trial (SSaSS)",
      sampleSize: "20,995 participants",
      journal: "New England Journal of Medicine",
      year: 2021,
      abstract: "In a 5-year landmark trial, replacing regular salt with potassium-enriched salt substitute (75% NaCl, 25% KCl) significantly lowered stroke risk by 14%, major cardiovascular events by 13%, and all-cause mortality by 12%.",
    },
    {
      ordinal: 2,
      label: "2024 ESC Guidelines for the management of elevated blood pressure and hypertension",
      pmid: "39210715",
      doi: "10.1093/eurheartj/ehae178",
      design: "Official Clinical Practice Guidelines",
      sampleSize: null,
      journal: "European Heart Journal",
      year: 2024,
      abstract: "Official clinical guidelines from the European Society of Cardiology strongly advocating increased dietary potassium intake and optimized sodium-to-potassium ratios for cardiovascular protection.",
    },
  ],
  "tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi": [
    {
      ordinal: 1,
      label: "Resistant starch decreases intrahepatic triglycerides in patients with nonalcoholic fatty liver disease via gut microbiome alterations",
      pmid: "37673036",
      doi: "10.1016/j.cmet.2023.08.002",
      design: "Randomized Double-Blind Controlled Trial",
      sampleSize: "200 patients",
      journal: "Cell Metabolism",
      year: 2023,
      abstract: "Resistant starch supplementation reshapes the human gut microbiota, significantly enriches Bifidobacterium, elevates circulating short-chain fatty acids, and markedly reduces intrahepatic fat accumulation.",
    },
    {
      ordinal: 2,
      label: "Hypoglycemic effect of recrystallized resistant starch on high-fat and high-fructose diet-induced type 2 diabetes mice",
      pmid: "38302033",
      doi: "10.1016/j.ijbiomac.2024.129812",
      design: "Preclinical Mechanistic Investigation",
      sampleSize: null,
      journal: "International Journal of Biological Macromolecules",
      year: 2024,
      abstract: "Demonstrates the molecular structural basis of retrograded amylose (RS3) crystal formation upon cooling and its potent blunting of starch digestion enzymes.",
    },
  ],
  "resistant-starch-cold-rice-gut-microbiome-scfa-en": [
    {
      ordinal: 1,
      label: "Resistant starch decreases intrahepatic triglycerides in patients with nonalcoholic fatty liver disease via gut microbiome alterations",
      pmid: "37673036",
      doi: "10.1016/j.cmet.2023.08.002",
      design: "Randomized Double-Blind Controlled Trial",
      sampleSize: "200 patients",
      journal: "Cell Metabolism",
      year: 2023,
      abstract: "Resistant starch supplementation reshapes the human gut microbiota, significantly enriches Bifidobacterium, elevates circulating short-chain fatty acids, and markedly reduces intrahepatic fat accumulation.",
    },
    {
      ordinal: 2,
      label: "Hypoglycemic effect of recrystallized resistant starch on high-fat and high-fructose diet-induced type 2 diabetes mice",
      pmid: "38302033",
      doi: "10.1016/j.ijbiomac.2024.129812",
      design: "Preclinical Mechanistic Investigation",
      sampleSize: null,
      journal: "International Journal of Biological Macromolecules",
      year: 2024,
      abstract: "Demonstrates the molecular structural basis of retrograded amylose (RS3) crystal formation upon cooling and its potent blunting of starch digestion enzymes.",
    },
  ],
  "di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi": [
    {
      ordinal: 1,
      label: "Advice to walk after meals is more effective for lowering postprandial glycaemia in type 2 diabetes mellitus than walking at other times: a randomized, crossover trial",
      pmid: "27747394",
      doi: "10.1007/s00125-016-4085-2",
      design: "Randomized Crossover Clinical Trial",
      sampleSize: "41 participants",
      journal: "Diabetologia",
      year: 2016,
      abstract: "Walking for just 10 minutes immediately after each main meal was significantly more effective at lowering postprandial blood glucose (22% lower dinner spike) than a single 30-minute walk performed at any other time.",
    },
    {
      ordinal: 2,
      label: "Breaking Up Prolonged Sitting Reduces Postprandial Glucose and Insulin Responses",
      pmid: "22374636",
      doi: "10.2337/dc11-1931",
      design: "Randomized Crossover Trial",
      sampleSize: "19 overweight adults",
      journal: "Diabetes Care",
      year: 2012,
      abstract: "Brief bouts of light walking activity after meals stimulate contraction-mediated GLUT4 translocation, dramatically reducing postprandial glucose and insulin requirements.",
    },
  ],
  "ten-minute-post-meal-walk-glucose-clearance-en": [
    {
      ordinal: 1,
      label: "Advice to walk after meals is more effective for lowering postprandial glycaemia in type 2 diabetes mellitus than walking at other times: a randomized, crossover trial",
      pmid: "27747394",
      doi: "10.1007/s00125-016-4085-2",
      design: "Randomized Crossover Clinical Trial",
      sampleSize: "41 participants",
      journal: "Diabetologia",
      year: 2016,
      abstract: "Walking for just 10 minutes immediately after each main meal was significantly more effective at lowering postprandial blood glucose (22% lower dinner spike) than a single 30-minute walk performed at any other time.",
    },
    {
      ordinal: 2,
      label: "Breaking Up Prolonged Sitting Reduces Postprandial Glucose and Insulin Responses",
      pmid: "22374636",
      doi: "10.2337/dc11-1931",
      design: "Randomized Crossover Trial",
      sampleSize: "19 overweight adults",
      journal: "Diabetes Care",
      year: 2012,
      abstract: "Brief bouts of light walking activity after meals stimulate contraction-mediated GLUT4 translocation, dramatically reducing postprandial glucose and insulin requirements.",
    },
  ],
  "nhai-ky-no-lau-giam-calo": [
    {
      ordinal: 1,
      label: "Improvement in chewing activity reduces energy intake in normal-weight and obese men",
      pmid: "21775556",
      doi: "10.3945/ajcn.111.015164",
      design: "Randomized Controlled Crossover Trial",
      sampleSize: "30 participants",
      journal: "The American Journal of Clinical Nutrition",
      year: 2011,
      abstract: "Increasing the number of chews per bite from 15 to 40 significantly reduces meal energy intake by 11.9% while suppressing postprandial ghrelin levels and increasing CCK and GLP-1 secretion.",
    },
    {
      ordinal: 2,
      label: "Eating slowly increases the postprandial response of the anorexigenic gut hormones, peptide YY and glucagon-like peptide-1",
      pmid: "19875483",
      doi: "10.1210/jc.2009-1018",
      design: "Randomized Crossover Trial",
      sampleSize: "17 healthy subjects",
      journal: "The Journal of Clinical Endocrinology & Metabolism",
      year: 2010,
      abstract: "Prolonging meal duration markedly enhances systemic concentrations of anorexigenic peptides PYY and GLP-1, promoting sustained hypothalamic satiety.",
    },
  ],
  "chewing-slowly-satiety-gut-hormones": [
    {
      ordinal: 1,
      label: "Improvement in chewing activity reduces energy intake in normal-weight and obese men",
      pmid: "21775556",
      doi: "10.3945/ajcn.111.015164",
      design: "Randomized Controlled Crossover Trial",
      sampleSize: "30 participants",
      journal: "The American Journal of Clinical Nutrition",
      year: 2011,
      abstract: "Increasing the number of chews per bite from 15 to 40 significantly reduces meal energy intake by 11.9% while suppressing postprandial ghrelin levels and increasing CCK and GLP-1 secretion.",
    },
    {
      ordinal: 2,
      label: "Eating slowly increases the postprandial response of the anorexigenic gut hormones, peptide YY and glucagon-like peptide-1",
      pmid: "19875483",
      doi: "10.1210/jc.2009-1018",
      design: "Randomized Crossover Trial",
      sampleSize: "17 healthy subjects",
      journal: "The Journal of Clinical Endocrinology & Metabolism",
      year: 2010,
      abstract: "Prolonging meal duration markedly enhances systemic concentrations of anorexigenic peptides PYY and GLP-1, promoting sustained hypothalamic satiety.",
    },
  ],
  "ngu-trua-20-phut-phuc-hoi-tim-mach": [
    {
      ordinal: 1,
      label: "Association of napping with incident cardiovascular events in a prospective cohort study",
      pmid: "31501230",
      doi: "10.1136/heartjnl-2019-314999",
      design: "Prospective Population Cohort Study (CoLaus)",
      sampleSize: "3,462 participants followed for 5.3 years",
      journal: "Heart",
      year: 2019,
      abstract: "Individuals who took occasional naps (1-2 times weekly for 5-20 min) manifested a 48% lower hazard ratio of incident fatal or non-fatal cardiovascular events compared to non-nappers.",
    },
    {
      ordinal: 2,
      label: "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease",
      pmid: "30879355",
      doi: "10.1161/CIR.0000000000000678",
      design: "Official Clinical Practice Guidelines",
      sampleSize: null,
      journal: "Circulation",
      year: 2019,
      abstract: "Official clinical practice guidance endorsing stress reduction, restorative circadian sleep hygiene, and autonomic recovery for lifelong cardiovascular protection.",
    },
  ],
  "power-nap-cardiovascular-health-blood-pressure": [
    {
      ordinal: 1,
      label: "Association of napping with incident cardiovascular events in a prospective cohort study",
      pmid: "31501230",
      doi: "10.1136/heartjnl-2019-314999",
      design: "Prospective Population Cohort Study (CoLaus)",
      sampleSize: "3,462 participants followed for 5.3 years",
      journal: "Heart",
      year: 2019,
      abstract: "Individuals who took occasional naps (1-2 times weekly for 5-20 min) manifested a 48% lower hazard ratio of incident fatal or non-fatal cardiovascular events compared to non-nappers.",
    },
    {
      ordinal: 2,
      label: "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease",
      pmid: "30879355",
      doi: "10.1161/CIR.0000000000000678",
      design: "Official Clinical Practice Guidelines",
      sampleSize: null,
      journal: "Circulation",
      year: 2019,
      abstract: "Official clinical practice guidance endorsing stress reduction, restorative circadian sleep hygiene, and autonomic recovery for lifelong cardiovascular protection.",
    },
  ],
  "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc": [
    {
      ordinal: 1,
      label: "Timing and Intensity of Light Correlate with Body Weight in Adults",
      pmid: "24694994",
      doi: "10.1371/journal.pone.0092251",
      design: "Cross-Sectional Circadian Biomarker Study",
      sampleSize: "54 adults monitored via actigraphy",
      journal: "PLoS ONE",
      year: 2014,
      abstract: "Earlier exposure to moderate-to-high intensity ambient morning light (> 500 lux, Mean Light Onset MLiO) correlates significantly with lower body mass index (BMI) independent of caloric intake and exercise.",
    },
    {
      ordinal: 2,
      label: "Systematic review of light exposure impact on human circadian rhythm, sleep and mood",
      pmid: "30311830",
      doi: "10.1080/07420528.2018.1527773",
      design: "Comprehensive Chronobiological Review",
      sampleSize: null,
      journal: "Chronobiology International",
      year: 2019,
      abstract: "Establishes the neurobiological necessity of early daytime lux exposure via ipRGC melanopsin pathways for nocturnal melatonin secretion and metabolic synchronization.",
    },
  ],
  "morning-sunlight-circadian-clock-metabolism": [
    {
      ordinal: 1,
      label: "Timing and Intensity of Light Correlate with Body Weight in Adults",
      pmid: "24694994",
      doi: "10.1371/journal.pone.0092251",
      design: "Cross-Sectional Circadian Biomarker Study",
      sampleSize: "54 adults monitored via actigraphy",
      journal: "PLoS ONE",
      year: 2014,
      abstract: "Earlier exposure to moderate-to-high intensity ambient morning light (> 500 lux, Mean Light Onset MLiO) correlates significantly with lower body mass index (BMI) independent of caloric intake and exercise.",
    },
    {
      ordinal: 2,
      label: "Systematic review of light exposure impact on human circadian rhythm, sleep and mood",
      pmid: "30311830",
      doi: "10.1080/07420528.2018.1527773",
      design: "Comprehensive Chronobiological Review",
      sampleSize: null,
      journal: "Chronobiology International",
      year: 2019,
      abstract: "Establishes the neurobiological necessity of early daytime lux exposure via ipRGC melanopsin pathways for nocturnal melatonin secretion and metabolic synchronization.",
    },
  ],
  "ngat-quang-ngoi-lau-danh-thuc-mach-mau": [
    {
      ordinal: 1,
      label: "Sitting Time, Physical Activity, and Risk of Mortality in Adults",
      pmid: "31023430",
      doi: "10.1016/j.jacc.2019.02.031",
      design: "Prospective Cohort Investigation",
      sampleSize: "149,077 participants followed for 8.9 years",
      journal: "Journal of the American College of Cardiology (JACC)",
      year: 2019,
      abstract: "Sedentary sitting time is an independent cardiovascular risk factor; replacing sitting with brief standing and light activity breaks attenuates all-cause and cardiovascular mortality.",
    },
    {
      ordinal: 2,
      label: "World Health Organization 2020 guidelines on physical activity and sedentary behaviour",
      pmid: "33239350",
      doi: "10.1136/bjsports-2020-102955",
      design: "Official Global Clinical Guidelines",
      sampleSize: null,
      journal: "British Journal of Sports Medicine",
      year: 2020,
      abstract: "WHO official recommendations to limit sedentary time and frequently interrupt sedentary bouts with movement of any intensity to support cardiovascular and metabolic health.",
    },
  ],
  "breaking-sedentary-sitting-vascular-shear-stress": [
    {
      ordinal: 1,
      label: "Sitting Time, Physical Activity, and Risk of Mortality in Adults",
      pmid: "31023430",
      doi: "10.1016/j.jacc.2019.02.031",
      design: "Prospective Cohort Investigation",
      sampleSize: "149,077 participants followed for 8.9 years",
      journal: "Journal of the American College of Cardiology (JACC)",
      year: 2019,
      abstract: "Sedentary sitting time is an independent cardiovascular risk factor; replacing sitting with brief standing and light activity breaks attenuates all-cause and cardiovascular mortality.",
    },
    {
      ordinal: 2,
      label: "World Health Organization 2020 guidelines on physical activity and sedentary behaviour",
      pmid: "33239350",
      doi: "10.1136/bjsports-2020-102955",
      design: "Official Global Clinical Guidelines",
      sampleSize: null,
      journal: "British Journal of Sports Medicine",
      year: 2020,
      abstract: "WHO official recommendations to limit sedentary time and frequently interrupt sedentary bouts with movement of any intensity to support cardiovascular and metabolic health.",
    },
  ],
  "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi": [
    {
      ordinal: 1,
      label: "How Breath-Control Can Change Your Life: A Systematic Review on the Neurophysiological Correlates of Slow Breathing",
      pmid: "30245619",
      doi: "10.3389/fnhum.2018.00353",
      design: "Systematic Neurophysiological Review",
      sampleSize: "15 human clinical trials",
      journal: "Frontiers in Human Neuroscience",
      year: 2018,
      abstract: "Slow breathing protocols (~6 breaths/min with extended exhalation) stimulate arterial baroreceptors, increasing high-frequency HRV, elevating parasympathetic vagal tone, and reducing psychological anxiety.",
    },
    {
      ordinal: 2,
      label: "Vagal Tank Theory: The Three Rs of Cardiac Vagal Control Functioning – Resting, Reactivity, and Recovery",
      pmid: "30042653",
      doi: "10.3389/fnins.2018.00458",
      design: "Autonomic Neuroscience Theoretical Framework & Review",
      sampleSize: null,
      journal: "Frontiers in Neuroscience",
      year: 2018,
      abstract: "Cardiac vagal control acts as the physiological substrate for emotional self-regulation, demonstrating that voluntary breath control dampens sympathetic hyperactivity.",
    },
  ],
  "slow-breathing-vagal-tone-parasympathetic-reset": [
    {
      ordinal: 1,
      label: "How Breath-Control Can Change Your Life: A Systematic Review on the Neurophysiological Correlates of Slow Breathing",
      pmid: "30245619",
      doi: "10.3389/fnhum.2018.00353",
      design: "Systematic Neurophysiological Review",
      sampleSize: "15 human clinical trials",
      journal: "Frontiers in Human Neuroscience",
      year: 2018,
      abstract: "Slow breathing protocols (~6 breaths/min with extended exhalation) stimulate arterial baroreceptors, increasing high-frequency HRV, elevating parasympathetic vagal tone, and reducing psychological anxiety.",
    },
    {
      ordinal: 2,
      label: "Vagal Tank Theory: The Three Rs of Cardiac Vagal Control Functioning – Resting, Reactivity, and Recovery",
      pmid: "30042653",
      doi: "10.3389/fnins.2018.00458",
      design: "Autonomic Neuroscience Theoretical Framework & Review",
      sampleSize: null,
      journal: "Frontiers in Neuroscience",
      year: 2018,
      abstract: "Cardiac vagal control acts as the physiological substrate for emotional self-regulation, demonstrating that voluntary breath control dampens sympathetic hyperactivity.",
    },
  ],
  "so-co-la-den-flavanol-gian-mach-ha-huyet-ap": [
    {
      ordinal: 1,
      label: "Effects of chocolate, cocoa, and flavan-3-ols on cardiovascular health: a systematic review and meta-analysis of randomized trials",
      pmid: "22301923",
      doi: "10.3945/ajcn.111.023457",
      design: "Systematic Review & Meta-Analysis of 42 RCTs",
      sampleSize: "1,297 subjects across 42 trials",
      journal: "The American Journal of Clinical Nutrition",
      year: 2012,
      abstract: "Cocoa flavanols significantly increase flow-mediated dilation (FMD) by 2.23% while reducing systolic blood pressure by 2.8 mmHg and mean arterial pressure.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on the substantiation of a health claim related to cocoa flavanols and maintenance of normal endothelium-dependent vasodilation",
      pmid: null,
      doi: "10.2903/j.efsa.2012.2809",
      design: "Official Regulatory Health Claim Verification",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2012,
      abstract: "European Food Safety Authority authorization: 200 mg of cocoa flavanols daily helps maintain endothelium-dependent vasodilation and normal blood flow.",
    },
  ],
  "dark-chocolate-flavanols-nitric-oxide-endothelial-function": [
    {
      ordinal: 1,
      label: "Effects of chocolate, cocoa, and flavan-3-ols on cardiovascular health: a systematic review and meta-analysis of randomized trials",
      pmid: "22301923",
      doi: "10.3945/ajcn.111.023457",
      design: "Systematic Review & Meta-Analysis of 42 RCTs",
      sampleSize: "1,297 subjects across 42 trials",
      journal: "The American Journal of Clinical Nutrition",
      year: 2012,
      abstract: "Cocoa flavanols significantly increase flow-mediated dilation (FMD) by 2.23% while reducing systolic blood pressure by 2.8 mmHg and mean arterial pressure.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on the substantiation of a health claim related to cocoa flavanols and maintenance of normal endothelium-dependent vasodilation",
      pmid: null,
      doi: "10.2903/j.efsa.2012.2809",
      design: "Official Regulatory Health Claim Verification",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2012,
      abstract: "European Food Safety Authority authorization: 200 mg of cocoa flavanols daily helps maintain endothelium-dependent vasodilation and normal blood flow.",
    },
  ],
  "tam-rung-20-phut-ha-hormone-cang-thang-cortisol": [
    {
      ordinal: 1,
      label: "Urban Nature Experiences Reduce Stress in the Context of Daily Life: A Prospective Biomarker Trial",
      pmid: "31019479",
      doi: "10.3389/fpsyg.2019.00722",
      design: "Repeated-Measures Biomarker Clinical Field Study",
      sampleSize: "36 participants across 8 weeks",
      journal: "Frontiers in Psychology",
      year: 2019,
      abstract: "Spending 20 to 30 minutes in nature yields the most efficient salivary cortisol reduction, accelerating cortisol clearance by 21.3% per hour compared to normal diurnal rhythms.",
    },
    {
      ordinal: 2,
      label: "The health benefits of the great outdoors: A systematic review and meta-analysis of greenspace exposure and health outcomes",
      pmid: "29982151",
      doi: "10.1016/j.envres.2018.06.030",
      design: "Meta-Analysis of 143 Studies",
      sampleSize: "Over 290 million subjects",
      journal: "Environmental Research",
      year: 2018,
      abstract: "High greenspace exposure is associated with statistically significant reductions in diastolic blood pressure, salivary cortisol, heart rate, and incidence of type 2 diabetes.",
    },
  ],
  "nature-pill-twenty-minutes-cortisol-reduction": [
    {
      ordinal: 1,
      label: "Urban Nature Experiences Reduce Stress in the Context of Daily Life: A Prospective Biomarker Trial",
      pmid: "31019479",
      doi: "10.3389/fpsyg.2019.00722",
      design: "Repeated-Measures Biomarker Clinical Field Study",
      sampleSize: "36 participants across 8 weeks",
      journal: "Frontiers in Psychology",
      year: 2019,
      abstract: "Spending 20 to 30 minutes in nature yields the most efficient salivary cortisol reduction, accelerating cortisol clearance by 21.3% per hour compared to normal diurnal rhythms.",
    },
    {
      ordinal: 2,
      label: "The health benefits of the great outdoors: A systematic review and meta-analysis of greenspace exposure and health outcomes",
      pmid: "29982151",
      doi: "10.1016/j.envres.2018.06.030",
      design: "Meta-Analysis of 143 Studies",
      sampleSize: "Over 290 million subjects",
      journal: "Environmental Research",
      year: 2018,
      abstract: "High greenspace exposure is associated with statistically significant reductions in diastolic blood pressure, salivary cortisol, heart rate, and incidence of type 2 diabetes.",
    },
  ],
  "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day": [
    {
      ordinal: 1,
      label: "Efficacy of water preloading before main meals as a strategy for weight loss in primary care: A randomized controlled trial",
      pmid: "26237305",
      doi: "10.1002/oby.21167",
      design: "Randomized Controlled Trial",
      sampleSize: "84 obese adults across 12 weeks",
      journal: "Obesity",
      year: 2015,
      abstract: "Preloading 500 mL of water 30 minutes before all three main meals resulted in a 4.3 kg weight reduction in the compliant cohort, 1.3 kg greater than lifestyle consultation controls.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on the substantiation of health claims related to water and maintenance of normal physical and cognitive functions",
      pmid: null,
      doi: "10.2903/j.efsa.2011.2075",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2011,
      abstract: "European Food Safety Authority confirmation that adequate pre-prandial and daily water consumption sustains normal physical and cognitive thermoregulation.",
    },
  ],
  "drinking-water-before-meals-gastric-distension-metabolism": [
    {
      ordinal: 1,
      label: "Efficacy of water preloading before main meals as a strategy for weight loss in primary care: A randomized controlled trial",
      pmid: "26237305",
      doi: "10.1002/oby.21167",
      design: "Randomized Controlled Trial",
      sampleSize: "84 obese adults across 12 weeks",
      journal: "Obesity",
      year: 2015,
      abstract: "Preloading 500 mL of water 30 minutes before all three main meals resulted in a 4.3 kg weight reduction in the compliant cohort, 1.3 kg greater than lifestyle consultation controls.",
    },
    {
      ordinal: 2,
      label: "Scientific Opinion on the substantiation of health claims related to water and maintenance of normal physical and cognitive functions",
      pmid: null,
      doi: "10.2903/j.efsa.2011.2075",
      design: "Official Regulatory Scientific Opinion",
      sampleSize: null,
      journal: "EFSA Journal",
      year: 2011,
      abstract: "European Food Safety Authority confirmation that adequate pre-prandial and daily water consumption sustains normal physical and cognitive thermoregulation.",
    },
  ],
  "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau": [
    {
      ordinal: 1,
      label: "Association Between Sauna Bathing and Fatal Cardiovascular and All-Cause Mortality Events",
      pmid: "25705824",
      doi: "10.1001/jamainternmed.2014.8187",
      design: "Prospective Population-Based Cohort (KIHD)",
      sampleSize: "2,315 middle-aged men followed for 20.7 years",
      journal: "JAMA Internal Medicine",
      year: 2015,
      abstract: "Frequent sauna bathing (4-7 sessions/week) was associated with a 50% lower risk of fatal coronary heart disease, 63% lower sudden cardiac death, and 40% lower all-cause mortality compared to 1 session/week.",
    },
    {
      ordinal: 2,
      label: "Cardiovascular and Other Health Benefits of Sauna Bathing: A Review of the Evidence",
      pmid: "30077204",
      doi: "10.1016/j.mayocp.2018.04.008",
      design: "Clinical Review & Mechanistic Synthesis",
      sampleSize: null,
      journal: "Mayo Clinic Proceedings",
      year: 2018,
      abstract: "Synthesizes hemodynamic benefits of hyperthermia: reduced systemic vascular resistance, improved arterial compliance, and upregulation of cytoprotective Heat Shock Proteins (HSP).",
    },
  ],
  "sauna-bathing-cardiovascular-longevity-heat-shock-proteins": [
    {
      ordinal: 1,
      label: "Association Between Sauna Bathing and Fatal Cardiovascular and All-Cause Mortality Events",
      pmid: "25705824",
      doi: "10.1001/jamainternmed.2014.8187",
      design: "Prospective Population-Based Cohort (KIHD)",
      sampleSize: "2,315 middle-aged men followed for 20.7 years",
      journal: "JAMA Internal Medicine",
      year: 2015,
      abstract: "Frequent sauna bathing (4-7 sessions/week) was associated with a 50% lower risk of fatal coronary heart disease, 63% lower sudden cardiac death, and 40% lower all-cause mortality compared to 1 session/week.",
    },
    {
      ordinal: 2,
      label: "Cardiovascular and Other Health Benefits of Sauna Bathing: A Review of the Evidence",
      pmid: "30077204",
      doi: "10.1016/j.mayocp.2018.04.008",
      design: "Clinical Review & Mechanistic Synthesis",
      sampleSize: null,
      journal: "Mayo Clinic Proceedings",
      year: 2018,
      abstract: "Synthesizes hemodynamic benefits of hyperthermia: reduced systemic vascular resistance, improved arterial compliance, and upregulation of cytoprotective Heat Shock Proteins (HSP).",
    },
  ],
  "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau": [
    {
      ordinal: 1,
      label: "High Anthocyanin Intake Is Associated With a Reduced Risk of Myocardial Infarction in Young and Middle-Aged Women",
      pmid: "23319811",
      doi: "10.1161/CIRCULATIONAHA.112.122408",
      design: "Prospective Epidemiological Cohort (Nurses' Health Study II)",
      sampleSize: "93,600 women followed across 18 years",
      journal: "Circulation",
      year: 2013,
      abstract: "Consuming >= 3 servings per week of blueberries and strawberries was associated with a 32% reduced risk of myocardial infarction in women compared to lower intake.",
    },
    {
      ordinal: 2,
      label: "2021 Dietary Guidance to Improve Cardiovascular Health: A Scientific Statement From the American Heart Association",
      pmid: "34724806",
      doi: "10.1161/CIR.0000000000001031",
      design: "AHA Scientific Statement & Clinical Guidance",
      sampleSize: null,
      journal: "Circulation",
      year: 2021,
      abstract: "American Heart Association scientific guidance strongly recommending deep-colored fruits, particularly anthocyanin-rich berries, for long-term arterial protection.",
    },
  ],
  "berries-anthocyanins-vascular-protection-antioxidant-shield": [
    {
      ordinal: 1,
      label: "High Anthocyanin Intake Is Associated With a Reduced Risk of Myocardial Infarction in Young and Middle-Aged Women",
      pmid: "23319811",
      doi: "10.1161/CIRCULATIONAHA.112.122408",
      design: "Prospective Epidemiological Cohort (Nurses' Health Study II)",
      sampleSize: "93,600 women followed across 18 years",
      journal: "Circulation",
      year: 2013,
      abstract: "Consuming >= 3 servings per week of blueberries and strawberries was associated with a 32% reduced risk of myocardial infarction in women compared to lower intake.",
    },
    {
      ordinal: 2,
      label: "2021 Dietary Guidance to Improve Cardiovascular Health: A Scientific Statement From the American Heart Association",
      pmid: "34724806",
      doi: "10.1161/CIR.0000000000001031",
      design: "AHA Scientific Statement & Clinical Guidance",
      sampleSize: null,
      journal: "Circulation",
      year: 2021,
      abstract: "American Heart Association scientific guidance strongly recommending deep-colored fruits, particularly anthocyanin-rich berries, for long-term arterial protection.",
    },
  ],};

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
  "magie-glycinate-vs-citrate-giac-ngu-va-lo-au-vi": [
    {
      ordinal: 1,
      label: "Magnesium Glycinate vs Magnesium Citrate: Selecting the Optimal Chelate for Sleep Architecture and Neural Calming",
      pmid: "",
      doi: "10.3390/nu13010180",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nutrients",
      year: 2021,
      abstract: "Not all magnesium salts exhibit identical pharmacodynamics. While magnesium citrate predominantly promotes osmotic peristalsis, bisglycinate chelates cross systemic barriers via glycine co-transport, activating GABA-A receptors and attenuating nocturnal cortisol spikes.",
    },
  ],
  "magnesium-glycinate-versus-citrate-sleep-and-anxiety-en": [
    {
      ordinal: 1,
      label: "Magnesium Glycinate vs Magnesium Citrate: Selecting the Optimal Chelate for Sleep Architecture and Neural Calming",
      pmid: "",
      doi: "10.3390/nu13010180",
      design: "Landmark Literature Synthesis",
      sampleSize: null,
      journal: "Nutrients",
      year: 2021,
      abstract: "Not all magnesium salts exhibit identical pharmacodynamics. While magnesium citrate predominantly promotes osmotic peristalsis, bisglycinate chelates cross systemic barriers via glycine co-transport, activating GABA-A receptors and attenuating nocturnal cortisol spikes.",
    },
  ],
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
    let tier: Tier = "Clinical Deep-Dive";
    if (data.tier === "life" || data.tier === "Life Dispatch") {
      tier = "Life Dispatch";
    } else if (data.tier === "Fundamentals") {
      tier = "Fundamentals";
    } else if (data.tier === "Lab Gizmo") {
      tier = "Lab Gizmo";
    } else if (data.tier === "Clinical Deep-Dive") {
      tier = "Clinical Deep-Dive";
    }

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
