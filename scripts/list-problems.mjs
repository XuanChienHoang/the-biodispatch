import fs from 'fs';

const issues = JSON.parse(fs.readFileSync('scripts/audit_issues.json', 'utf8'));

const problemItems = [];
for (const iss of issues) {
  if (!problemItems.some(p => p.slug === iss.slug && p.ordinal === iss.ordinal)) {
    problemItems.push(iss);
  }
}

console.log('Total unique reference slots with issues:', problemItems.length);
for (const p of problemItems) {
  const label = p.currentLabel || p.label || '';
  const doi = p.currentDoi || p.doi || '';
  console.log(`[${p.slug}] #${p.ordinal} (${p.type}): label="${label}", doi="${doi}", pmid="${p.pmid}"`);
}
