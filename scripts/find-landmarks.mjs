import fs from 'fs';

const delay = ms => new Promise(r => setTimeout(r, ms));
const NCBI_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const NCBI_PARAMS = 'tool=PhytocodexCurator&email=contact@phyto-codex.org';

const papers = [
  { topic: 'Atherosclerosis Steinberg 1989', q: 'Beyond cholesterol Modifications of low-density lipoprotein Steinberg NEJM' },
  { topic: 'LDL subclass Austin 1988', q: 'Low-density lipoprotein subclass patterns risk myocardial infarction Austin' },
  { topic: 'Warburg cancer 1956', q: 'On the origin of cancer cells Warburg 1956' },
  { topic: 'AMPK Hardie Nat Rev Mol Cell Biol 2012', q: 'AMPK mechanisms of cellular energy Hardie Nat Rev Mol Cell Biol' },
  { topic: 'Keap1 Nrf2 Yamamoto 2016', q: 'The Keap1-Nrf2 System a crucial biological sensor Yamamoto' },
  { topic: 'Melatonin sleep meta Buscemi 2005', q: 'The efficacy and safety of exogenous melatonin Buscemi BMJ 2005' },
  { topic: 'Sulforaphane Dashwood 2012', q: 'Dietary sulforaphane histone deacetylase inhibitor Dashwood' },
  { topic: 'Myrosinase thermal conversion 2008', q: 'Thermal stability of myrosinase glucosinolates' },
  { topic: 'CoQ10 Statin Myopathy Qu 2018', q: 'Effects of Coenzyme Q10 on Statin-Induced Myopathy' },
  { topic: 'Resistant starch SCFA Koh 2016', q: 'From Dietary Fiber to Host Physiology Koh Cell 2016' },
  { topic: 'Insulin and IGF in neoplasia Pollak 2008', q: 'Insulin and insulin-like growth factor signalling in neoplasia Pollak Nat Rev Cancer' },
  { topic: 'Herb drug interactions Fugh-Berman 2000', q: 'Herb-drug interactions Fugh-Berman Lancet 2000' }
];

async function find() {
  const output = {};
  for (const p of papers) {
    await delay(350);
    const sUrl = `${NCBI_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(p.q)}&retmode=json&${NCBI_PARAMS}`;
    const sRes = await fetch(sUrl).then(r => r.json());
    const id = sRes.esearchresult?.idlist?.[0];
    if (id) {
      await delay(350);
      const sumUrl = `${NCBI_BASE}/esummary.fcgi?db=pubmed&id=${id}&retmode=json&${NCBI_PARAMS}`;
      const sumRes = await fetch(sumUrl).then(r => r.json());
      const it = sumRes.result?.[id];
      if (it) {
        output[p.topic] = {
          pmid: id,
          doi: (it.articleids?.find(a => a.idtype === 'doi') || {}).value || null,
          title: it.title ? it.title.replace(/\.$/, '') : '',
          journal: it.source || '',
          year: it.pubdate ? parseInt(it.pubdate.slice(0, 4), 10) : null
        };
        console.log(`[FOUND] ${p.topic} -> PMID ${id} | ${output[p.topic].title.slice(0, 50)}...`);
      }
    } else {
      console.log(`[NOT FOUND] ${p.topic}`);
    }
  }
  fs.writeFileSync('scripts/landmark_found.json', JSON.stringify(output, null, 2));
}

find();
