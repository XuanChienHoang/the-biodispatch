import fs from 'fs';
import path from 'path';

const storeContent = fs.readFileSync('src/lib/store.ts', 'utf8');

// Parse SEED_REFS
// Extract every reference block
const refBlocks = [];
const refRegex = /\{\s*ordinal:\s*(\d+),\s*label:\s*"([^"]+)",\s*pmid:\s*("[^"]*"|null),\s*doi:\s*("[^"]*"|null),[\s\S]*?year:\s*(\d+),[\s\S]*?\}/g;

let m;
const pmidMap = new Map();
const doiMap = new Map();

// Helper to extract all refs per slug
const slugRefBlockRegex = /"([a-zA-Z0-9\-_]+)":\s*\[([\s\S]*?)\]/g;
let slugMatch;
const allRecords = [];

while ((slugMatch = slugRefBlockRegex.exec(storeContent)) !== null) {
  const slug = slugMatch[1];
  const body = slugMatch[2];
  
  const innerRefRegex = /\{\s*ordinal:\s*(\d+),\s*label:\s*"([^"]+)",\s*pmid:\s*("[^"]*"|null),\s*doi:\s*("[^"]*"|null),\s*design:\s*"([^"]*)",\s*sampleSize:[\s\S]*?journal:\s*"([^"]*)",\s*year:\s*(\d+)/g;
  let itemMatch;
  while ((itemMatch = innerRefRegex.exec(body)) !== null) {
    const ordinal = parseInt(itemMatch[1]);
    const label = itemMatch[2];
    const pmid = itemMatch[3] === 'null' ? null : itemMatch[3].replace(/"/g, '');
    const doi = itemMatch[4] === 'null' ? null : itemMatch[4].replace(/"/g, '');
    const journal = itemMatch[6];
    const year = parseInt(itemMatch[7]);
    
    allRecords.push({
      slug,
      ordinal,
      label,
      pmid,
      doi,
      journal,
      year
    });
  }
}

console.log(`Total reference records extracted across all slugs: ${allRecords.length}`);

// Audit each record with NCBI PubMed and CrossRef
async function auditAll() {
  const issues = [];
  const valid = [];

  // 1. Group unique PMIDs
  const uniquePmids = [...new Set(allRecords.map(r => r.pmid).filter(Boolean))];
  console.log(`Auditing ${uniquePmids.length} unique PMIDs via NCBI E-utilities...`);

  const pmidData = {};
  for (let i = 0; i < uniquePmids.length; i += 30) {
    const chunk = uniquePmids.slice(i, i + 30);
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${chunk.join(',')}&retmode=json`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.result) {
        for (const id of chunk) {
          if (data.result[id] && !data.result[id].error) {
            pmidData[id] = {
              title: data.result[id].title,
              source: data.result[id].source,
              pubdate: data.result[id].pubdate,
              articleids: data.result[id].articleids || []
            };
          } else {
            pmidData[id] = { error: 'NOT_FOUND_ON_PUBMED' };
          }
        }
      }
    } catch (e) {
      console.error('Error querying PubMed:', e);
    }
  }

  // 2. Audit each record against NCBI Data
  for (const r of allRecords) {
    if (!r.pmid) {
      issues.push({
        slug: r.slug,
        ordinal: r.ordinal,
        type: 'MISSING_PMID',
        label: r.label,
        doi: r.doi
      });
      continue;
    }

    const ncbi = pmidData[r.pmid];
    if (!ncbi || ncbi.error) {
      issues.push({
        slug: r.slug,
        ordinal: r.ordinal,
        type: 'INVALID_PMID',
        pmid: r.pmid,
        label: r.label,
        doi: r.doi
      });
      continue;
    }

    // Check DOI match if both exist
    const ncbiDoiObj = ncbi.articleids.find(a => a.idtype === 'doi');
    const ncbiDoi = ncbiDoiObj ? ncbiDoiObj.value.toLowerCase() : null;

    if (r.doi && ncbiDoi && r.doi.toLowerCase() !== ncbiDoi) {
      issues.push({
        slug: r.slug,
        ordinal: r.ordinal,
        type: 'DOI_PMID_MISMATCH',
        currentDoi: r.doi,
        actualDoi: ncbiDoi,
        pmid: r.pmid,
        currentLabel: r.label,
        actualTitle: ncbi.title
      });
      continue;
    }

    // Check title similarity or mismatch
    const normCurrent = r.label.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normActual = ncbi.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    // If title has completely zero resemblance
    if (!normActual.includes(normCurrent.slice(0, 15)) && !normCurrent.includes(normActual.slice(0, 15))) {
      issues.push({
        slug: r.slug,
        ordinal: r.ordinal,
        type: 'TITLE_MISMATCH',
        pmid: r.pmid,
        currentLabel: r.label,
        actualTitle: ncbi.title,
        journal: ncbi.source,
        year: r.year
      });
      continue;
    }

    valid.push(r);
  }

  console.log(`\n================ AUDIT REPORT ================`);
  console.log(`Total references checked: ${allRecords.length}`);
  console.log(`Valid & Verified: ${valid.length}`);
  console.log(`Issues detected: ${issues.length}`);
  console.log(`==============================================\n`);

  if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
    fs.writeFileSync('scripts/audit_issues.json', JSON.stringify(issues, null, 2));
  }
}

auditAll();
