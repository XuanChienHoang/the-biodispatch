import fs from 'fs';

async function getPubmedByTitle(title) {
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=' + encodeURIComponent('"' + title + '"[title]') + '&retmode=json';
  const res = await fetch(url);
  const data = await res.json();
  const idList = data.esearchresult?.idlist || [];
  if (idList.length === 0) return null;
  const pmid = idList[0];
  const sUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + pmid + '&retmode=json';
  const sRes = await fetch(sUrl);
  const sData = await sRes.json();
  const info = sData.result?.[pmid];
  return {
    pmid,
    title: info?.title,
    doi: info?.articleids?.find(a => a.idtype === 'doi')?.value || null,
    source: info?.source,
    year: parseInt(info?.pubdate)
  };
}

const titles = [
  'Atherosclerosis--an inflammatory disease',
  'Inflammation and cardiovascular disease',
  'The PI3K Pathway in Human Disease',
  'Insulin and insulin-like growth factor signalling in neoplasia',
  'mTOR Signaling in Growth, Metabolism, and Disease',
  'The Keap1-Nrf2 system: a crucial biological sensor for cytoprotective gene expression',
  'AMPK and mTOR in cellular energy homeostasis and longevity',
  'Interactions between herbal medicines and prescribed drugs: a systematic review',
  'Herb-drug interactions',
  'C-Reactive Protein and Other Markers of Inflammation in the Prediction of Cardiovascular Disease in Women',
  'High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease in Asymptomatic Adults',
  'The pathogenesis of cancer metastasis: the \'seed and soil\' hypothesis revisited',
  'The infectious nature of metastatic cancer: metabolic symbiosis in the tumor microenvironment',
  'Tumor acidity and metabolic remodeling in metastatic dissemination',
  'Insulin resistance, hyperinsulinemia, and cancer risk: epidemiological and experimental evidence',
  'Beyond cholesterol. Modifications of low-density lipoprotein that increase its atherogenicity',
  'Low-density lipoprotein subclass patterns and risk of myocardial infarction',
  'Small dense low-density lipoprotein particles as a predictor of cardiovascular disease',
  'Fasting triglycerides, high-density lipoprotein, and risk of myocardial infarction',
  'Use of metabolic markers to identify overweight individuals who are insulin resistant',
  'Ratio of triglycerides to HDL-cholesterol as an indicator of LDL particle size and atherogenic dyslipidemia',
  'Sleep drives metabolite clearance from the adult brain',
  'The glymphatic system in central nervous system health and disease',
  'NAD(+) metabolism and its roles in cellular processes during ageing',
  'Therapeutic potential of NAD-boosting molecules: the in vivo evidence',
  'Commensal microbe-derived butyrate induces the differentiation of colonic regulatory T cells',
  'Butyrate and other short-chain fatty acids as modulators of immunity and inflammation',
  'Policosanol is ineffective in the treatment of hypercholesterolemia: a randomized controlled trial',
  'Effects of policosanol on lipid profile: a systematic review and meta-analysis of randomized controlled trials',
  'Statins for Prevention of Cardiovascular Disease in Adults: Evidence Report and Systematic Review for the US Preventive Services Task Force',
  'Effect of Urolithin A Supplementation on Muscle Endurance and Mitochondrial Health in Older Adults: A Randomized Clinical Trial',
  'The mitophagy activator urolithin A is safe and induces a molecular signature of improved mitochondrial and cellular health in humans'
];

async function run() {
  const map = {};
  for (const t of titles) {
    const r = await getPubmedByTitle(t);
    map[t] = r;
    console.log(t.substring(0, 42), '-> PMID:', r?.pmid, '| DOI:', r?.doi, '| Year:', r?.year);
  }
  fs.writeFileSync('scripts/title_exact_pubmed.json', JSON.stringify(map, null, 2));
}

run();
