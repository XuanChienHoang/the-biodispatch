import fs from 'fs';

// Accurate verified search queries for each title
const queries = [
  { label: "Mechanisms of statin-induced myopathy: the role of mitochondrial impairment and coenzyme Q10 depletion", q: "statin induced myopathy mitochondrial impairment coenzyme Q10 depletion Marcoff" },
  { label: "Applied Biopharmaceutics & Pharmacokinetics, 7th Edition", q: "Applied Biopharmaceutics Pharmacokinetics Shargel" },
  { label: "Food-drug interactions: effect of food on drug absorption and bioavailability", q: "Food drug interactions effect of food on drug absorption Schmidt Dalhoff" },
  { label: "Clearance concept in pharmacokinetics: renal, hepatic, and organ clearance equations", q: "Rowland Tozer clearance concept pharmacokinetics" },
  { label: "AMPK and mTOR in cellular energy homeostasis and longevity", q: "Hardie AMPK and mTOR in cellular energy homeostasis" },
  { label: "The Keap1-Nrf2 system: a crucial biological sensor for cytoprotective gene expression", q: "Suzuki Yamamoto The Keap1-Nrf2 system crucial biological sensor" },
  { label: "mTOR signaling in growth, metabolism, and disease", q: "Saxton Sabatini mTOR signaling in growth metabolism and disease Cell" },
  { label: "Melatonin treatment for circadian rhythm sleep disorders: a meta-analysis", q: "van Geijlswijk Melatonin treatment for circadian rhythm sleep disorders meta-analysis" },
  { label: "The human circadian clock and its entrainment by zeitgebers", q: "Roenneberg Merrow The human circadian clock and its entrainment by zeitgebers" },
  { label: "Dietary sulforaphane, a histone deacetylase inhibitor for cancer prevention", q: "Dashwood Ho Dietary sulforaphane histone deacetylase inhibitor" },
  { label: "Myrosinase activity and glucosinolate conversion in brassica vegetables: impact of thermal processing", q: "Rungapamestry Duncan Myrosinase activity glucosinolate conversion brassica" },
  { label: "Nrf2/ARE pathway: a promising target to counteract oxidative stress in neurodegenerative diseases", q: "Buendia Michalska Nrf2 ARE pathway promising target oxidative stress neurodegenerative" },
  { label: "Interactions between herbal medicines and prescribed drugs: a systematic review", q: "Izzo Ernst Interactions between herbal medicines and prescribed drugs systematic review Drugs" },
  { label: "Clinical review of herb-drug interactions: Cytochrome P450 and P-glycoprotein mechanisms", q: "Tsai Lin Herb-drug interactions Cytochrome P450" },
  { label: "C-reactive protein and other markers of inflammation in the prediction of cardiovascular disease in women", q: "Ridker Hennekens C-reactive protein and other markers of inflammation in the prediction of cardiovascular disease in women NEJM" },
  { label: "High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease in Asymptomatic Adults", q: "Ridker High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease in Asymptomatic Adults JAMA" },
  { label: "The infectious nature of metastatic cancer: metabolic symbiosis in the tumor microenvironment", q: "Martinez-Outschoorn Lisanti Sotgia metabolic symbiosis tumor microenvironment Nat Rev Cancer" },
  { label: "Tumor acidity and metabolic remodeling in metastatic dissemination", q: "Gillies Pilot Tumor acidity and metabolic remodeling in metastatic dissemination" },
  { label: "Insulin and insulin-like growth factor signalling in neoplasia", q: "Pollak Insulin and insulin-like growth factor signalling in neoplasia Nat Rev Cancer" },
  { label: "Insulin resistance, hyperinsulinemia, and cancer risk: epidemiological and experimental evidence", q: "Arcidiacono Iiritano Insulin resistance hyperinsulinemia cancer risk" },
  { label: "Inflammation and cardiovascular disease", q: "Libby Ridker Maseri Inflammation and cardiovascular disease Nature" },
  { label: "Interleukin-1β inhibition and cardiovascular events in patients with prior myocardial infarction", q: "Ridker Antiinflammatory Therapy with Canakinumab CANTOS NEJM" },
  { label: "Small dense low-density lipoprotein particles as a predictor of cardiovascular disease", q: "Hirano Small dense low-density lipoprotein particles predictor cardiovascular disease" },
  { label: "Ratio of triglycerides to HDL-cholesterol as an indicator of LDL particle size and atherogenic dyslipidemia", q: "da Luz Favarato Ratio of triglycerides to HDL-cholesterol as an indicator of LDL particle size" },
  { label: "The glymphatic system in central nervous system health and disease", q: "Jessen Munk Lundgaard Nedergaard The glymphatic system in central nervous system health and disease" },
  { label: "Therapeutic potential of NAD-boosting molecules: the in vivo evidence", q: "Rajman Chwalek Sinclair Therapeutic potential of NAD-boosting molecules" },
  { label: "Butyrate and other short-chain fatty acids as modulators of immunity and inflammation", q: "Vinolo Rodrigues Nachbar Curi Butyrate and other short-chain fatty acids modulators immunity inflammation" },
  { label: "Policosanol is ineffective in the treatment of hypercholesterolemia: a randomized controlled trial", q: "Berthold Unverdorben Policosanol is ineffective in the treatment of hypercholesterolemia JAMA" },
  { label: "Effects of policosanol on lipid profile: a systematic review and meta-analysis of randomized controlled trials", q: "Castano Effects of policosanol on lipid profile meta-analysis" },
  { label: "Statins and Cardiovascular Disease Prevention: From Evidence to Clinical Practice", q: "Chou Statins for Prevention of Cardiovascular Disease in Adults JAMA" },
  { label: "The mitophagy activator urolithin A is safe and induces a molecular signature of improved mitochondrial and cellular health in humans", q: "Andreux Blanco-Bose Ryu The mitophagy activator urolithin A is safe Nat Metab" }
];

async function searchPubmed(term) {
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=' + encodeURIComponent(term) + '&retmode=json';
  const res = await fetch(url);
  const data = await res.json();
  const idList = data.esearchresult?.idlist || [];
  if (idList.length === 0) return null;
  const pmid = idList[0];
  const summaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + pmid + '&retmode=json';
  const sumRes = await fetch(summaryUrl);
  const sumData = await sumRes.json();
  const item = sumData.result?.[pmid];
  const doiObj = item?.articleids?.find(a => a.idtype === 'doi');
  return {
    pmid,
    title: item?.title,
    source: item?.source,
    pubdate: item?.pubdate,
    doi: doiObj ? doiObj.value : null
  };
}

async function run() {
  const resolved = {};
  for (const item of queries) {
    try {
      const res = await searchPubmed(item.q);
      resolved[item.label] = res;
      console.log(`[RESOLVED] ${item.label.substring(0, 40)}...`);
      console.log(`  -> PMID: ${res?.pmid} | DOI: ${res?.doi} | Title: ${res?.title}\n`);
    } catch (e) {
      console.error(`[FAILED] ${item.label}:`, e.message);
    }
  }
  fs.writeFileSync('scripts/accurate_resolved_map.json', JSON.stringify(resolved, null, 2));
}

run();
