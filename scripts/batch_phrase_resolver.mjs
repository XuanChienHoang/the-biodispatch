import fs from 'fs';

const items = [
  { key: "urolithin_andreux", phrase: "mitophagy activator urolithin A is safe" },
  { key: "sulforaphane_dashwood", phrase: "Dietary sulforaphane histone deacetylase inhibitor" },
  { key: "policosanol_drossard", phrase: "Policosanol is ineffective in the treatment of hypercholesterolemia" },
  { key: "policosanol_gouni", phrase: "Effects of policosanol on lipid profile" },
  { key: "statin_chou_uspstf", phrase: "Statins for Prevention of Cardiovascular Disease in Adults" },
  { key: "sleep_nedergaard", phrase: "Sleep drives metabolite clearance" },
  { key: "glymphatic_jessen", phrase: "glymphatic system in central nervous system" },
  { key: "nad_rajman_sinclair", phrase: "Therapeutic potential of NAD-boosting molecules" },
  { key: "butyrate_vinolo", phrase: "short-chain fatty acids as modulators of immunity" },
  { key: "tg_hdl_da_luz", phrase: "Ratio of triglycerides to HDL-cholesterol as an indicator" },
  { key: "sdldl_hirano", phrase: "Small dense low-density lipoprotein cholesterol" },
  { key: "canakinumab_cantos", phrase: "Antiinflammatory Therapy with Canakinumab" },
  { key: "libby_inflammation_cvd", phrase: "Inflammation and cardiovascular disease Libby" },
  { key: "insulin_arcidiacono", phrase: "Insulin resistance, hyperinsulinemia, and cancer risk" },
  { key: "insulin_pollak_nrc", phrase: "Insulin and insulin-like growth factor signalling in neoplasia Pollak" },
  { key: "cancer_gillies", phrase: "Tumor acidity and metabolic remodeling" },
  { key: "cancer_martinez_outschoorn", phrase: "infectious nature of metastatic cancer" },
  { key: "crp_ridker_asymptomatic", phrase: "High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease in Asymptomatic" },
  { key: "crp_ridker_women", phrase: "C-reactive protein and other markers of inflammation in the prediction of cardiovascular disease in women" },
  { key: "herb_tsai", phrase: "Herb-drug interactions an overview of clinical reviews" },
  { key: "herb_izzo_drugs", phrase: "Interactions between herbal medicines and prescribed drugs Izzo" },
  { key: "nrf2_buendia", phrase: "Nrf2/ARE pathway promising target to counteract oxidative stress" },
  { key: "myrosinase_rungapamestry", phrase: "Myrosinase activity and glucosinolate conversion" },
  { key: "circadian_roenneberg", phrase: "human circadian clock and its entrainment" },
  { key: "melatonin_van_geijlswijk", phrase: "Evaluation of melatonin for slumber in children" },
  { key: "melatonin_bussfeld_meta", phrase: "Melatonin treatment for circadian rhythm sleep disorders a meta-analysis" },
  { key: "mtor_saxton_sabatini", phrase: "mTOR signaling in growth, metabolism, and disease Saxton" },
  { key: "keap1_suzuki_yamamoto", phrase: "Keap1-Nrf2 system crucial biological sensor" },
  { key: "ampk_hardie_jmcb", phrase: "AMPK and mTOR in cellular energy homeostasis Hardie" },
  { key: "rowland_clearance", phrase: "Rowland Tozer Clinical Pharmacokinetics Concepts" },
  { key: "food_drug_schmidt", phrase: "Food-drug interactions effect of food on drug absorption Schmidt" },
  { key: "statin_myopathy_mitochondria", phrase: "Mechanisms of statin-induced myopathy mitochondrial impairment" }
];

async function run() {
  const map = {};
  for (const item of items) {
    try {
      const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=' + encodeURIComponent(item.phrase) + '&retmode=json';
      const res = await fetch(url);
      const data = await res.json();
      const idList = data.esearchresult?.idlist || [];
      if (idList.length > 0) {
        const pmid = idList[0];
        const sUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + pmid + '&retmode=json';
        const sRes = await fetch(sUrl);
        const sData = await sRes.json();
        const info = sData.result?.[pmid];
        map[item.key] = {
          pmid,
          title: info?.title,
          source: info?.source,
          pubdate: info?.pubdate,
          doi: info?.articleids?.find(a => a.idtype === 'doi')?.value || null
        };
        console.log(`[OK] ${item.key} -> PMID: ${pmid} | DOI: ${map[item.key].doi} | ${info?.title?.substring(0, 50)}...`);
      } else {
        console.log(`[NOT FOUND] ${item.key} (${item.phrase})`);
      }
    } catch (e) {
      console.error(`[ERR] ${item.key}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/accurate_phrase_matches.json', JSON.stringify(map, null, 2));
}

run();
