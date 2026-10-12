import fs from 'fs';

// Helper to delay between NCBI calls
const delay = ms => new Promise(r => setTimeout(r, ms));

const NCBI_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const NCBI_PARAMS = 'tool=PhytocodexCurator&email=contact@phyto-codex.org';

async function queryPubMedByKeywords(query) {
  const url = `${NCBI_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=5&retmode=json&${NCBI_PARAMS}`;
  await delay(350);
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.esearchresult?.idlist || [];
  } catch (e) {
    return [];
  }
}

async function getPubMedSummary(pmid) {
  const url = `${NCBI_BASE}/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json&${NCBI_PARAMS}`;
  await delay(350);
  try {
    const res = await fetch(url);
    const data = await res.json();
    const it = data.result?.[pmid];
    if (!it || it.error) return null;
    return {
      pmid,
      title: (it.title || '').replace(/\.$/, ''),
      journal: it.source || '',
      pubdate: it.pubdate || '',
      year: it.pubdate ? parseInt(it.pubdate.slice(0, 4), 10) : null,
      doi: (it.articleids?.find(a => a.idtype === 'doi') || {}).value || null
    };
  } catch (e) {
    return null;
  }
}

// Queries for the problematic slots
const TARGET_QUERIES = [
  { key: 'curcumin-piperine-disp', query: 'curcumin glucuronidation piperine pharmacokinetics human' },
  { key: 'curcumin-piperine-three', query: 'Comparative pharmacokinetics curcumin formulations humans' },
  { key: 'curcumin-piperine-safety', query: 'piperine safety human volunteers healthy' },
  { key: 'curcumin-piperine-nano', query: 'curcumin piperine bioavailability phytotherapy research 2021' },
  { key: 'glp1-cell-fermentation', query: 'Gut microbiota fermentation resistant starch GLP-1 colonic' },
  { key: 'resistant-starch-canani', query: 'Potential beneficial effects of butyrate Canani' },
  { key: 'resistant-starch-koh', query: 'From Dietary Fiber to Host Physiology: Short-Chain Fatty Acids' },
  { key: 'statin-myopathy-coq10', query: 'Coenzyme Q10 Statin-Induced Myopathy Meta-Analysis Randomized' },
  { key: 'statin-eas-panel', query: 'Statin-associated muscle symptoms European Atherosclerosis Society Consensus Panel' },
  { key: 'pk-one-compartment', query: 'Basic Pharmacokinetics and Pharmacodynamics Integrated Textbook' },
  { key: 'pk-food-effect', query: 'Food-drug interactions effect of food on drug absorption bioavailability' },
  { key: 'ampk-mtor-hardie', query: 'AMPK mTOR cellular energy homeostasis longevity Hardie' },
  { key: 'keap1-nrf2-yamamoto', query: 'Keap1-Nrf2 system crucial biological sensor Yamamoto' },
  { key: 'melatonin-circadian-zisapel', query: 'Circadian rhythms and melatonin physiology and therapeutic management Zisapel' },
  { key: 'melatonin-meta-buscemi', query: 'Melatonin treatment for circadian rhythm sleep disorders meta-analysis Buscemi' },
  { key: 'sulforaphane-hdac-dashwood', query: 'Dietary sulforaphane histone deacetylase inhibitor Dashwood' },
  { key: 'myrosinase-thermal', query: 'Myrosinase activity glucosinolate conversion brassica vegetables thermal' },
  { key: 'herb-drug-fugh-berman', query: 'Herb-drug interactions overview clinical reviews trials' },
  { key: 'herb-drug-systematic', query: 'Interactions between herbal medicines and prescribed drugs systematic review' },
  { key: 'crp-cardiovascular-ridker', query: 'C-Reactive Protein Risk Cardiovascular Disease Ridker JAMA' },
  { key: 'warburg-origin-cancer', query: 'Warburg On the Origin of Cancer Cells Science 1956' },
  { key: 'cancer-seed-soil-fidler', query: 'pathogenesis of cancer metastasis seed and soil hypothesis revisited Fidler' },
  { key: 'insulin-igf1-pollak', query: 'Insulin insulin-like growth factor signalling neoplasia Pollak' },
  { key: 'pi3k-human-disease-fruman', query: 'PI3K pathway human disease Fruman Cell' },
  { key: 'atherosclerosis-ross-1999', query: 'Atherosclerosis an inflammatory disease Ross Russell NEJM' },
  { key: 'atherosclerosis-libby-2002', query: 'Inflammation and atherosclerosis Libby Nature 2002' },
  { key: 'oxldl-steinberg-1989', query: 'Beyond cholesterol Modifications of low-density lipoprotein Steinberg JCI' },
  { key: 'ldl-subclass-austin-jama', query: 'Low-density lipoprotein subclass patterns risk myocardial infarction Austin JAMA' },
  { key: 'tg-hdl-ratio-gaziano', query: 'Fasting triglycerides high-density lipoprotein risk myocardial infarction Gaziano' },
  { key: 'tg-hdl-insulin-mclaughlin', query: 'metabolic markers identify overweight individuals insulin resistant McLaughlin' },
  { key: 'policosanol-mas-review', query: 'Policosanol clinical pharmacology therapeutic significance' }
];

async function run() {
  const results = {};
  for (const item of TARGET_QUERIES) {
    console.log(`Searching for: ${item.key}...`);
    const ids = await queryPubMedByKeywords(item.query);
    if (ids.length > 0) {
      const best = await getPubMedSummary(ids[0]);
      results[item.key] = best;
      console.log(` -> Found: PMID ${best?.pmid} | DOI ${best?.doi} | ${best?.title} (${best?.journal}, ${best?.year})`);
    } else {
      console.log(` -> Not found for: ${item.key}`);
    }
  }
  fs.writeFileSync('scripts/pubmed_resolved.json', JSON.stringify(results, null, 2));
}

run();
