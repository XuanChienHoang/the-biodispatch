import fs from 'fs';

const storeContent = fs.readFileSync('src/lib/store.ts', 'utf8');

// Extract the SEED_REFS object text between "const SEED_REFS: Record<string, Ref[]> = {" and "};\n\nexport interface"
const startMarker = 'const SEED_REFS: Record<string, Ref[]> = {';
const endMarker = 'export interface MarkdownArticleData';

const startIdx = storeContent.indexOf(startMarker);
const endIdx = storeContent.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate SEED_REFS block!');
  process.exit(1);
}

const seedRefsText = storeContent.substring(startIdx + startMarker.length, endIdx);

// Extract each slug block
// Slugs may be formatted as "slug-name": [ ... ] or slug_name: [ ... ]
const slugPattern = /(?:["']([a-zA-Z0-9\-_]+)["']|([a-zA-Z0-9\-_]+))\s*:\s*\[([\s\S]*?)\n\s*\]/g;
let match;
const allRecords = [];
let slugCount = 0;

while ((match = slugPattern.exec(seedRefsText)) !== null) {
  const slug = match[1] || match[2];
  const block = match[3];
  slugCount++;

  // Match each ref object inside block
  const refObjPattern = /\{\s*ordinal:\s*(\d+),\s*label:\s*"([^"]+)",[\s\S]*?pmid:\s*("[^"]*"|null),\s*doi:\s*("[^"]*"|null),[\s\S]*?journal:\s*"([^"]*)",\s*year:\s*(\d+)/g;
  let refMatch;
  while ((refMatch = refObjPattern.exec(block)) !== null) {
    allRecords.push({
      slug,
      ordinal: parseInt(refMatch[1]),
      label: refMatch[2],
      pmid: refMatch[3] === 'null' ? null : refMatch[3].replace(/"/g, ''),
      doi: refMatch[4] === 'null' ? null : refMatch[4].replace(/"/g, ''),
      journal: refMatch[5],
      year: parseInt(refMatch[6])
    });
  }
}

console.log(`Found ${slugCount} slugs and ${allRecords.length} total reference records in SEED_REFS.`);

// Audit each record with NCBI PubMed and CrossRef
async function auditAll() {
  const issues = [];
  const valid = [];

  // Group unique PMIDs
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

  // Audit each record against NCBI Data
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

    // Check Title similarity if label looks English
    const isVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(r.label);
    if (!isVietnamese && ncbi.title) {
      const cleanLabel = r.label.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      const cleanNcbi = ncbi.title.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      const labelWords = cleanLabel.split(/\s+/).filter(w => w.length > 4);
      const matchingWords = labelWords.filter(w => cleanNcbi.includes(w));
      const overlap = labelWords.length > 0 ? (matchingWords.length / labelWords.length) : 1;

      if (overlap < 0.25 && labelWords.length >= 3) {
        issues.push({
          slug: r.slug,
          ordinal: r.ordinal,
          type: 'TITLE_MISMATCH',
          pmid: r.pmid,
          currentLabel: r.label,
          actualTitle: ncbi.title,
          journal: ncbi.source,
          year: parseInt(ncbi.pubdate)
        });
        continue;
      }
    }

    valid.push(r);
  }

  console.log('\n================ AUDIT REPORT ================');
  console.log(`Total references checked: ${allRecords.length}`);
  console.log(`Valid & Verified: ${valid.length}`);
  console.log(`Issues detected: ${issues.length}`);
  console.log('==============================================\n');

  if (issues.length > 0) {
    console.log('Issues summary:');
    issues.forEach(i => console.log(JSON.stringify(i)));
  }

  fs.writeFileSync('scripts/audit_issues_after.json', JSON.stringify(issues, null, 2));
}

auditAll();
