import fs from 'fs';

const storeContent = fs.readFileSync('src/lib/store.ts', 'utf8');
const pmidRegex = /pmid:\s*"([^"]+)"/g;
let match;
const allPmids = [];
while ((match = pmidRegex.exec(storeContent)) !== null) {
  if (match[1].trim()) {
    allPmids.push(match[1].trim());
  }
}

const uniquePmids = [...new Set(allPmids)];
console.log(`Found ${uniquePmids.length} unique PMIDs in store.ts`);

async function audit() {
  const invalid = [];
  const valid = [];
  // Chunk in batches of 40 for NCBI E-utilities
  for (let i = 0; i < uniquePmids.length; i += 40) {
    const chunk = uniquePmids.slice(i, i + 40);
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${chunk.join(',')}&retmode=json`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      for (const id of chunk) {
        if (!data.result || !data.result[id] || data.result[id].error) {
          invalid.push(id);
        } else {
          valid.push({ id, title: data.result[id].title, source: data.result[id].source });
        }
      }
    } catch (err) {
      console.error('Error querying NCBI:', err);
    }
  }

  console.log(`\n✅ Valid PMIDs: ${valid.length}`);
  if (invalid.length > 0) {
    console.log(`❌ Invalid/404 PMIDs (${invalid.length}):`, invalid);
  } else {
    console.log(`🎉 100% of PMIDs in store.ts exist in PubMed!`);
  }
}

audit();
