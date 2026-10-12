import fs from 'fs';
import { VERIFIED_PAPERS } from './verified_reference_dictionary.mjs';

// Pairings between Vietnamese and English slugs
const SLUG_PAIRS = [
  ['nobel-medicine-2026-optogenetics', 'nobel-medicine-2026-optogenetics-en'],
  ['curcumin-piperine-sinh-kha-dung', 'curcumin-piperine-bioavailability'],
  ['metabolomic-horizon-clinical-diagnostics-vi', 'metabolomic-horizon-clinical-diagnostics'],
  ['glp1-keo-dai-tuoi-tho-nature', 'glp1-longevity-nature-mitochondria'],
  ['resistant-starch-scfa-gut-vi', 'resistant-starch-scfa-gut-en'],
  ['mevalonate-statin-coq10-vi', 'mevalonate-statin-coq10-en'],
  ['pharmacokinetics-one-compartment', 'pharmacokinetics-one-compartment-en'],
  ['ampk-nrf2-mtor-map', 'ampk-nrf2-mtor-map-en'],
  ['melatonin-circadian-zeitgeber', 'melatonin-circadian-zeitgeber-en'],
  ['sulforaphane-nrf2-window', 'sulforaphane-nrf2-window-en'],
  ['supplement-drug-interaction-matrix', 'supplement-drug-interaction-matrix-en'],
  ['forecasting-hs-crp-delta', 'forecasting-hs-crp-delta-en'],
  ['warburg-effect-cancer-metabolism', 'warburg-effect-cancer-metabolism-en'],
  ['cancer-seed-and-soil-metabolism', 'cancer-seed-and-soil-metabolism-en'],
  ['insulin-igf1-cancer-proliferation', 'insulin-igf1-cancer-proliferation-en'],
  ['cholesterol-myth-vascular-inflammation', 'cholesterol-myth-vascular-inflammation-en'],
  ['oxldl-sdldl-atherosclerosis-mechanism', 'oxldl-sdldl-atherosclerosis-mechanism-en'],
  ['triglyceride-hdl-ratio-metabolic-health', 'triglyceride-hdl-ratio-metabolic-health-en'],
  ['glymphatic-deep-sleep-brain-cleaning', 'glymphatic-deep-sleep-brain-cleaning-en'],
  ['nad-cd38-sirtuin-mitochondria-cellular-aging', 'nad-cd38-sirtuin-mitochondria-cellular-aging-en'],
  ['butyrate-scfa-epigenetics-histone-gut-barrier', 'butyrate-scfa-epigenetics-histone-gut-barrier-en'],
  ['policosanol-versus-statins', 'policosanol-versus-statins-en'],
  ['urolithin-a-kich-hoat-mitophagy-phuc-hoi-co-bap-vi', 'urolithin-a-mitophagy-muscle-endurance-en']
];

let store = fs.readFileSync('src/lib/store.ts', 'utf8');

// Build the canonical reference map
const canonicalMap = {};

// 1. Populate from VERIFIED_PAPERS
for (const [key, refs] of Object.entries(VERIFIED_PAPERS)) {
  canonicalMap[key] = refs;
}

// 2. Link paired slugs (e.g. if key is defined, map its counterpart)
for (const [s1, s2] of SLUG_PAIRS) {
  if (canonicalMap[s1] && !canonicalMap[s2]) {
    canonicalMap[s2] = canonicalMap[s1];
  } else if (canonicalMap[s2] && !canonicalMap[s1]) {
    canonicalMap[s1] = canonicalMap[s2];
  }
}

// Special case: metabolomic-horizon-clinical-diagnostics-vi has Vietnamese labels but same papers
canonicalMap['metabolomic-horizon-clinical-diagnostics-vi'] = [
  {
    ordinal: 1,
    label: "HMDB 5.0: the Human Metabolome Database for 2022",
    authors: "Wishart DS, Guo A, Oler E, et al.",
    pmid: "34986597",
    doi: "10.1093/nar/gkab1062",
    design: "Cơ sở dữ liệu Chuyển hóa Người Toàn diện (HMDB 5.0)",
    sampleSize: "217,920 chất chuyển hóa",
    journal: "Nucleic Acids Res",
    year: 2022
  },
  {
    ordinal: 2,
    label: "Plant metabolomics: towards biological function and mechanism",
    authors: "Fiehn O",
    pmid: "16949327",
    doi: "10.1016/j.tplants.2006.08.007",
    design: "Khung Phương pháp Chuyển hóa học Thực vật",
    sampleSize: null,
    journal: "Trends Plant Sci",
    year: 2006
  },
  {
    ordinal: 3,
    label: "Intestinal microbial metabolism of phosphatidylcholine and cardiovascular risk",
    authors: "Tang WH, Wang Z, Levison BS, et al.",
    pmid: "23614584",
    doi: "10.1056/NEJMoa1109400",
    design: "Nghiên cứu Đoàn hệ Lâm sàng Chuyển hóa TMAO",
    sampleSize: "4,007 bệnh nhân chụp mạch vành",
    journal: "N Engl J Med",
    year: 2013
  }
];

canonicalMap['curcumin-piperine-sinh-kha-dung'] = [
  {
    ordinal: 1,
    label: "Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers",
    authors: "Shoba G, Joy D, Joseph T, Majeed M, Rajendran R, Srinivas PS",
    pmid: "9619120",
    doi: "10.1055/s-2006-957450",
    design: "Thử nghiệm Dược động học bắt chéo trên người và động vật",
    sampleSize: "8 người khỏe mạnh",
    journal: "Planta Med",
    year: 1998
  },
  {
    ordinal: 2,
    label: "Bioavailability of curcumin: problems and promises",
    authors: "Anand P, Kunnumakkara AB, Newman RA, Aggarwal BB",
    pmid: "17999464",
    doi: "10.1021/mp700113r",
    design: "Tổng quan Dược động học & Rào cản Chuyển hóa Liên hợp",
    sampleSize: null,
    journal: "Mol Pharm",
    year: 2007
  },
  {
    ordinal: 3,
    label: "Effect of curcumin on C-reactive protein as a biomarker of systemic inflammation: An updated meta-analysis",
    authors: "Sahebkar A, Cicero AFG, Simental-Mendía LE, et al.",
    pmid: "34586711",
    doi: "10.1002/ptr.7284",
    design: "Phân tích gộp & Thử nghiệm Lâm sàng Đối chứng Ngẫu nhiên",
    sampleSize: "23 RCTs (n=1,750)",
    journal: "Phytother Res",
    year: 2021
  }
];

// Helper to format ref block as TypeScript string
function formatRefs(refs) {
  return `[\n` + refs.map(r => `    {\n` +
    `      ordinal: ${r.ordinal},\n` +
    `      label: ${JSON.stringify(r.label)},\n` +
    `      authors: ${JSON.stringify(r.authors || '')},\n` +
    `      pmid: ${r.pmid ? JSON.stringify(r.pmid) : 'null'},\n` +
    `      doi: ${r.doi ? JSON.stringify(r.doi) : 'null'},\n` +
    `      design: ${JSON.stringify(r.design || '')},\n` +
    `      sampleSize: ${r.sampleSize ? JSON.stringify(r.sampleSize) : 'null'},\n` +
    `      journal: ${JSON.stringify(r.journal || '')},\n` +
    `      year: ${r.year}\n` +
    `    }`).join(',\n') + `\n  ]`;
}

// Update existing keys in store.ts
let updatedCount = 0;
for (const [slug, refs] of Object.entries(canonicalMap)) {
  const regex = new RegExp(`("${slug}":\\s*\\[[\\s\\S]*?\\n  \\])`, 'g');
  if (regex.test(store)) {
    const formatted = `"${slug}": ${formatRefs(refs)}`;
    store = store.replace(regex, formatted);
    updatedCount++;
    console.log(`Updated existing slug in store.ts: ${slug}`);
  }
}

// Add missing keys (like the 12 English keys)
const missingSlugs = [
  'ampk-nrf2-mtor-map-en',
  'cancer-seed-and-soil-metabolism-en',
  'cholesterol-myth-vascular-inflammation-en',
  'forecasting-hs-crp-delta-en',
  'insulin-igf1-cancer-proliferation-en',
  'melatonin-circadian-zeitgeber-en',
  'oxldl-sdldl-atherosclerosis-mechanism-en',
  'pharmacokinetics-one-compartment-en',
  'sulforaphane-nrf2-window-en',
  'supplement-drug-interaction-matrix-en',
  'triglyceride-hdl-ratio-metabolic-health-en',
  'warburg-effect-cancer-metabolism-en'
];

let addedCount = 0;
// We append missing keys right before the end of SEED_REFS
// Look for closing bracket of SEED_REFS: `export const SEED_REFS: Record<string, Ref[]> = { ... };`
const endOfSeedRefsMarker = '\n};';
const indexOfEnd = store.indexOf('};\n\nexport const SEED_DISPATCHES');

if (indexOfEnd !== -1) {
  let appendString = '';
  for (const mSlug of missingSlugs) {
    if (!store.includes(`"${mSlug}":`)) {
      const refs = canonicalMap[mSlug];
      if (refs) {
        appendString += `,\n  "${mSlug}": ${formatRefs(refs)}`;
        addedCount++;
        console.log(`Added missing slug to SEED_REFS: ${mSlug}`);
      } else {
        console.warn(`No canonical refs found for missing slug: ${mSlug}`);
      }
    }
  }
  if (appendString) {
    store = store.slice(0, indexOfEnd) + appendString + store.slice(indexOfEnd);
  }
} else {
  console.error('Could not find closing anchor of SEED_REFS!');
}

fs.writeFileSync('src/lib/store.ts', store, 'utf8');
console.log(`Successfully healed store.ts! (Updated: ${updatedCount}, Added: ${addedCount})`);
