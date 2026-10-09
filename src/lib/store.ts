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
      pmid: "",
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
      pmid: "",
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
      pmid: "",
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
      pmid: "",
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
      pmid: "",
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
      pmid: "",
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
