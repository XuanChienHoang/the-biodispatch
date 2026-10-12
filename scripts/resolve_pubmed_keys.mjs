import fs from 'fs';

async function searchPubmed(term) {
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=' + encodeURIComponent(term) + '&retmode=json';
  const res = await fetch(url);
  const data = await res.json();
  const idList = data.esearchresult?.idlist || [];
  if (idList.length === 0) return null;
  const summaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + idList[0] + '&retmode=json';
  const sumRes = await fetch(summaryUrl);
  const sumData = await sumRes.json();
  const item = sumData.result?.[idList[0]];
  const doiObj = item?.articleids?.find(a => a.idtype === 'doi');
  return {
    pmid: idList[0],
    title: item?.title,
    source: item?.source,
    pubdate: item?.pubdate,
    doi: doiObj ? doiObj.value : null
  };
}

async function run() {
  const queries = [
    { key: 'optogenetics_boyden', q: 'Boyden millisecond-timescale genetically targeted optical control neural activity 2005' },
    { key: 'curcumin_shoba', q: 'Shoba Influence of piperine on the pharmacokinetics of curcumin 1998' },
    { key: 'curcumin_anand', q: 'Anand Bioavailability of curcumin: problems and promises 2007' },
    { key: 'curcumin_crp_meta', q: 'Sahebkar Effect of curcumin on C-reactive protein meta-analysis' },
    { key: 'metabolomics_fiehn', q: 'Fiehn Plant metabolomics: towards biological function and mechanism 2006' },
    { key: 'hmdb_wishart', q: 'HMDB 5.0 the Human Metabolome Database Wishart 2022' },
    { key: 'tmao_tang', q: 'Tang Wang Hazen Intestinal microbial metabolism of phosphatidylcholine and cardiovascular risk 2013' },
    { key: 'glp1_semaglutide_nature', q: 'semaglutide promotes healthspan and extends lifespan Nature' },
    { key: 'scfa_koh_cell', q: 'Koh From Dietary Fiber to Host Physiology Short-Chain Fatty Acids 2016' },
    { key: 'butyrate_canani', q: 'Berni Canani Potential beneficial effects of butyrate in intestinal' },
    { key: 'statin_eas', q: 'Statin-associated muscle symptoms impact on statin therapy European Atherosclerosis Society 2015' },
    { key: 'coq10_statin_qu', q: 'Effects of Coenzyme Q10 on Statin-Induced Myopathy meta-analysis Qu 2018' },
    { key: 'ampk_mtor_mihaylova', q: 'Mihaylova Shaw The AMPK signalling pathway coordinates cell growth autophagy and metabolism' },
    { key: 'ampk_hardie', q: 'Hardie AMPK and mTOR in cellular energy homeostasis and longevity Nat Rev Mol Cell Biol' },
    { key: 'keap1_nrf2_yamamoto', q: 'Yamamoto Keap1-Nrf2 system crucial biological sensor' },
    { key: 'melatonin_ferracioli', q: 'Circadian rhythms and melatonin physiology and therapeutic management Ferracioli' },
    { key: 'melatonin_bussfeld', q: 'Melatonin treatment for circadian rhythm sleep disorders meta-analysis smrv' },
    { key: 'melatonin_aujeszky', q: 'Melatonin treatment circadian rhythm sleep disorders meta-analysis' },
    { key: 'sulforaphane_dashwood', q: 'Dietary sulforaphane histone deacetylase inhibitor for cancer prevention Dashwood' },
    { key: 'sulforaphane_myrosinase_rungapamestry', q: 'Myrosinase activity glucosinolate conversion brassica thermal processing Rungapamestry' },
    { key: 'herb_drug_tsai', q: 'Herb-drug interactions an overview of clinical reviews Tsai' },
    { key: 'herb_drug_fugh_berman', q: 'Herb-drug interactions Lancet Fugh-Berman 2000' },
    { key: 'hs_crp_ridker', q: 'Ridker High-Sensitivity C-Reactive Protein and Risk of Cardiovascular Disease 2018' },
    { key: 'warburg_1956', q: 'Warburg On the origin of cancer cells 1956' },
    { key: 'seed_soil_fidler', q: 'Fidler The pathogenesis of cancer metastasis the seed and soil hypothesis revisited 2003' },
    { key: 'insulin_pollak', q: 'Pollak Insulin and insulin-like growth factor signalling in neoplasia 2008' },
    { key: 'pi3k_fruman', q: 'Fruman The PI3K Pathway in Human Disease Cell 2017' },
    { key: 'ross_atherosclerosis', q: 'Ross Russell Atherosclerosis--an inflammatory disease NEJM 1999' },
    { key: 'libby_inflammation', q: 'Libby Inflammation and cardiovascular disease Nature 2002' },
    { key: 'steinberg_beyond_cholesterol', q: 'Steinberg Beyond cholesterol modifications of low-density lipoprotein 1989' },
    { key: 'austin_ldl_subclass', q: 'Austin Low-density lipoprotein subclass patterns and risk of myocardial infarction 1988' },
    { key: 'gaziano_tg_hdl', q: 'Gaziano Fasting triglycerides high-density lipoprotein risk myocardial infarction 1997' },
    { key: 'mclaughlin_insulin_res', q: 'McLaughlin Use of metabolic markers to identify overweight individuals who are insulin resistant 2003' },
    { key: 'nedergaard_sleep_brain', q: 'Nedergaard Sleep drives metabolite clearance adult brain Science 2013' },
    { key: 'covarrubias_nad', q: 'Covarrubias NAD+ metabolism and its roles in cellular processes during ageing 2021' },
    { key: 'furusawa_butyrate_treg', q: 'Furusawa Commensal microbe-derived butyrate induces colonic regulatory T cells Nature 2013' },
    { key: 'castano_policosanol', q: 'Castano Policosanol clinical pharmacology therapeutic significance' },
    { key: 'urolithin_jama_2022', q: 'Effect of Urolithin A Supplementation on Muscle Endurance and Mitochondrial Health in Older Adults 2022' }
  ];

  const results = {};
  for (const item of queries) {
    try {
      const res = await searchPubmed(item.q);
      results[item.key] = res;
      console.log(`[${item.key}] -> PMID: ${res?.pmid} | DOI: ${res?.doi} | Title: ${res?.title?.substring(0, 60)}...`);
    } catch (err) {
      console.error(`[${item.key}] failed:`, err.message);
    }
  }

  fs.writeFileSync('scripts/pubmed_resolved_keys.json', JSON.stringify(results, null, 2));
  console.log('Saved to scripts/pubmed_resolved_keys.json');
}

run();
