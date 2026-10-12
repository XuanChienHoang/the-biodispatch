import fs from 'fs';
import { VERIFIED_PAPERS } from './verified_reference_dictionary.mjs';

const SLUG_PAIRS = [
  ['ampk-nrf2-mtor-map', 'ampk-nrf2-mtor-map-en'],
  ['cancer-seed-and-soil-metabolism', 'cancer-seed-and-soil-metabolism-en'],
  ['cholesterol-myth-vascular-inflammation', 'cholesterol-myth-vascular-inflammation-en'],
  ['forecasting-hs-crp-delta', 'forecasting-hs-crp-delta-en'],
  ['insulin-igf1-cancer-proliferation', 'insulin-igf1-cancer-proliferation-en'],
  ['melatonin-circadian-zeitgeber', 'melatonin-circadian-zeitgeber-en'],
  ['oxldl-sdldl-atherosclerosis-mechanism', 'oxldl-sdldl-atherosclerosis-mechanism-en'],
  ['pharmacokinetics-one-compartment', 'pharmacokinetics-one-compartment-en'],
  ['sulforaphane-nrf2-window', 'sulforaphane-nrf2-window-en'],
  ['supplement-drug-interaction-matrix', 'supplement-drug-interaction-matrix-en'],
  ['triglyceride-hdl-ratio-metabolic-health', 'triglyceride-hdl-ratio-metabolic-health-en'],
  ['warburg-effect-cancer-metabolism', 'warburg-effect-cancer-metabolism-en']
];

const canonicalMap = { ...VERIFIED_PAPERS };
for (const [s1, s2] of SLUG_PAIRS) {
  if (canonicalMap[s1] && !canonicalMap[s2]) canonicalMap[s2] = canonicalMap[s1];
  else if (canonicalMap[s2] && !canonicalMap[s1]) canonicalMap[s1] = canonicalMap[s2];
}

function formatRefs(refs) {
  return '[\n' + refs.map(r => '    {\n' +
    '      ordinal: ' + r.ordinal + ',\n' +
    '      label: ' + JSON.stringify(r.label) + ',\n' +
    '      authors: ' + JSON.stringify(r.authors || '') + ',\n' +
    '      pmid: ' + (r.pmid ? JSON.stringify(r.pmid) : 'null') + ',\n' +
    '      doi: ' + (r.doi ? JSON.stringify(r.doi) : 'null') + ',\n' +
    '      design: ' + JSON.stringify(r.design || '') + ',\n' +
    '      sampleSize: ' + (r.sampleSize ? JSON.stringify(r.sampleSize) : 'null') + ',\n' +
    '      journal: ' + JSON.stringify(r.journal || '') + ',\n' +
    '      year: ' + r.year + '\n' +
    '    }').join(',\n') + '\n  ]';
}

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

let store = fs.readFileSync('src/lib/store.ts', 'utf8');
const idx = store.indexOf('export interface MarkdownArticleData');
if (idx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

// Find the last "};" before `idx`
const lastClosingSemicolon = store.lastIndexOf('};', idx);
if (lastClosingSemicolon === -1) {
  console.error('Closing }; of SEED_REFS not found!');
  process.exit(1);
}

let toAppend = '';
for (const s of missingSlugs) {
  if (canonicalMap[s]) {
    toAppend += ',\n  "' + s + '": ' + formatRefs(canonicalMap[s]);
  }
}

store = store.slice(0, lastClosingSemicolon) + toAppend + '\n' + store.slice(lastClosingSemicolon);
fs.writeFileSync('src/lib/store.ts', store, 'utf8');
console.log('Appended all 12 missing English slugs into SEED_REFS successfully!');
