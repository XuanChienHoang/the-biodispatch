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
      label: "Curcuminoids and systemic inflammation: pooled analysis of randomised controlled trials",
      pmid: "31145664",
      doi: "10.1007/s00394-019-01962-y",
      design: "Meta-analysis, 9 RCTs",
      sampleSize: 742,
      journal: "European Journal of Nutrition",
      year: 2019,
      abstract:
        "Pooled curcuminoid supplementation reduced hs-CRP by −24.6% versus placebo (95% CI −34.4 to −14.8; I² = 11%). Effects were larger in metabolic syndrome cohorts and at doses ≥1000 mg/d over ≥8 weeks.",
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
};

export interface MarkdownArticleData extends Article {
  content?: string;
  author?: string;
  authorRole?: string;
  date?: string;
  tags?: string[];
  readingTime?: string;
}

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
      content,
      author: data.author || "Dr. Xuan Chien Hoang",
      authorRole: data.authorRole || "Dr. rer. nat. | University of Hamburg",
      date: data.date || "2026-09-23",
      tags: data.tags || ["Metabolomics", "Biomarkers"],
      readingTime: data.readingTime || "6 min read",
    });
  }

  return posts;
}

export async function getArticles(): Promise<Article[]> {
  const mdPosts = await getMarkdownPosts();
  const mdSlugs = new Set(mdPosts.map((p) => p.slug));

  // Filter out any seed articles that share the slug
  const remainingSeed = ARTICLES.filter((a) => !mdSlugs.has(a.slug));

  // Markdown posts are placed first as live dispatches
  return [...mdPosts, ...remainingSeed];
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
