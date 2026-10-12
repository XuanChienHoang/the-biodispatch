import fs from 'fs';

const delay = ms => new Promise(r => setTimeout(r, ms));
const NCBI_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const NCBI_PARAMS = 'tool=PhytocodexCurator&email=contact@phyto-codex.org';

const papers = [
  '10.1038/nn1525',
  '10.1055/s-2006-957450',
  '10.1093/nar/gkab1062',
  '10.1016/j.tplants.2006.08.007',
  '10.1056/NEJMoa1208400',
  '10.1093/eurheartj/ehv043',
  '10.1016/j.freeradbiomed.2016.04.013',
  '10.1210/jc.2015-2756',
  '10.1093/carcin/bgs275',
  '10.1021/jf800997h',
  '10.1038/nrc1098',
  '10.1016/j.cmet.2008.08.011',
  '10.1016/j.cell.2017.07.029',
  '10.1056/NEJM199901143400207',
  '10.1038/nature01323',
  '10.1172/JCI114227',
  '10.1001/jama.1988.03410130125037',
  '10.1161/01.CIR.96.8.2520',
  '10.7326/0003-4819-139-10-200311180-00007',
  '10.1126/science.1241224',
  '10.1038/s41580-020-00313-x',
  '10.1038/nature12721',
  '10.1001/jamanetworkopen.2021.44279'
];

async function checkDois() {
  const verified = {};
  for (const doi of papers) {
    await delay(350);
    try {
      const sUrl = `${NCBI_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(doi + '[doi]')}&retmode=json&${NCBI_PARAMS}`;
      const sRes = await fetch(sUrl).then(r => r.json());
      const pmid = sRes.esearchresult?.idlist?.[0];
      if (pmid) {
        await delay(350);
        const sumUrl = `${NCBI_BASE}/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json&${NCBI_PARAMS}`;
        const sumRes = await fetch(sumUrl).then(r => r.json());
        const it = sumRes.result?.[pmid];
        if (it) {
          verified[doi] = {
            pmid,
            title: it.title ? it.title.replace(/\.$/, '') : '',
            journal: it.source || '',
            year: it.pubdate ? parseInt(it.pubdate.slice(0, 4), 10) : null,
            doi: (it.articleids?.find(a => a.idtype === 'doi') || {}).value || doi
          };
          console.log(`[VERIFIED] DOI: ${doi} -> PMID: ${pmid} | ${verified[doi].title.slice(0, 50)}...`);
        }
      } else {
        console.log(`[NOT IN PUBMED] DOI: ${doi}`);
      }
    } catch (e) {
      console.error(`Error for ${doi}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/verified_dois.json', JSON.stringify(verified, null, 2));
}

checkDois();
