/**
 * Deterministic Zero-Token Anti-Duplication Guard
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Runs 100% locally in JavaScript (Zero Token Cost, <5ms execution).
 * Prevents topic and content duplication across Phytocodex dispatches.
 */

import { loadTopicRegistry, extractTokens, normalizeText } from './topic-registry.mjs';

// Canonical entity clusters: topics belonging to same biochemical cluster collide immediately
const ENTITY_SIGNATURES = [
  { name: 'Postprandial Walking & GLUT4', tokens: ['di-bo', 'walking', 'glut4', 'postprandial', 'bua-an', 'sau-an'] },
  { name: 'Zonulin & Leaky Gut', tokens: ['zonulin', 'leaky-gut', 'ro-ri-ruot', 'occludin', 'claudin', 'tight-junction'] },
  { name: 'L-Theanine & Caffeine', tokens: ['theanine', 'caffeine', 'tra-xanh', 'green-tea', 'alpha-wave', 'song-nao'] },
  { name: 'Mitohormesis & Stress Paradox', tokens: ['mitohormesis', 'hormesis', 'nghich-ly-stress', 'oxidative-stress'] },
  { name: 'Chewing & Satiety Signaling', tokens: ['nhai', 'chew', 'chewing', 'mastication', 'pyy', 'glp-1-no-lau'] },
  { name: 'Gut-Brain Axis & Vagus GABA', tokens: ['vagus', 'vagal', 'gaba', 'phe-vi', 'truc-nao-ruot', 'gut-brain'] },
  { name: 'Hydrolyzed Collagen Peptides', tokens: ['collagen', 'peptide', 'pro-hyp', 'nguyen-bao-soi', 'thuy-phan'] },
  { name: 'H5N1 Avian Flu & Sialic Acid', tokens: ['h5n1', 'sialic', 'cum-gia-cam', 'alpha-2-3', 'alpha-2-6'] },
  { name: 'Yersinia pestis & T3SS', tokens: ['yersinia', 'pestis', 't3ss', 'dich-hach', 'type-iii'] },
  { name: 'Vitamin D3 & K2 MK-7 Calcium Paradox', tokens: ['vitamin-d3', 'k2', 'mk-7', 'mk7', 'voi-hoa', 'calcification', 'calcium-paradox', 'osteocalcin'] },
  { name: 'Alpha-Ketoglutarate Epigenetics', tokens: ['alpha-ketoglutarate', 'akg', 'bieu-sinh', 'epigenetic-clock', 'tet-enzyme'] },
  { name: 'Resistant Starch & Colonic SCFA', tokens: ['resistant-starch', 'tinh-bot-khang', 'com-nguoi', 'cold-rice', 'butyrate'] },
  { name: 'Urolithin A & Mitophagy', tokens: ['urolithin', 'mitophagy', 'luu', 'pomegranate', 'ty-the'] },
  { name: 'Spermidine & eIF5A Autophagy', tokens: ['spermidine', 'eif5a', 'tu-thuc', 'autophagy'] },
  { name: 'Senolytics Fisetin & Quercetin', tokens: ['senolytic', 'senescent', 'fisetin', 'sasp', 'zombie'] },
  { name: 'Curcumin & Piperine Bioavailability', tokens: ['curcumin', 'piperine', 'nghe', 'tieu-den', 'sinh-kha-dung', 'bioavailability'] },
  { name: 'Glymphatic Brain Cleaning & Deep Sleep', tokens: ['glymphatic', 'aqp4', 'aquaporin', 'rua-xe-nao', 'slow-wave-sleep'] },
  { name: 'Melatonin Circadian Zeitgeber', tokens: ['melatonin', 'zeitgeber', 'nhip-sinh-hoc', 'circadian'] },
  { name: 'Red Light 670nm Retinal Mitochondria', tokens: ['670nm', 'anh-sang-do', 'red-light', 'retinal', 'vong-mac'] },
  { name: 'Ferroptosis & Brain Iron', tokens: ['ferroptosis', 'sat-te-bao', 'gpx4', 'iron-death'] },
  { name: 'Brown Fat & UCP1 Proton Leak', tokens: ['ucp1', 'brown-fat', 'mo-nau', 'proton-leak', 'ro-ri-proton'] },
  { name: 'Sulforaphane & Nrf2 Activation', tokens: ['sulforaphane', 'nrf2', 'sup-lo', 'broccoli'] },
  { name: 'Apple Cider Vinegar & Glucose Spikes', tokens: ['giam-tao', 'vinegar', 'acetic', 'glucose-spike'] },
  { name: 'Cold Bath / Warm Bath Sleep Core Temp', tokens: ['tam-nuoc-nong', 'tam-nuoc-lanh', 'warm-bath', 'core-body-temperature'] }
];

function normalizeDoi(doi) {
  if (!doi) return '';
  return doi
    .toLowerCase()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
    .replace(/^doi:\s*/, '')
    .trim();
}

/**
 * Calculates Jaccard token similarity between two token sets
 */
function jaccardSimilarity(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Validates a proposed topic against the registry locally (0 token cost).
 * @param {Object} proposedTopic - { titleVi, titleEn, slugVi, slugEn, doi, tagsVi, tagsEn, excerptVi, excerptEn }
 * @param {Object} customRegistry - optional pre-loaded registry
 * @returns {Object} { isDuplicate: boolean, reason?: string, matchedTopic?: Object }
 */
export function checkTopicCollision(proposedTopic, customRegistry = null) {
  if (!proposedTopic || typeof proposedTopic !== 'object') {
    return { isDuplicate: false };
  }

  const registry = customRegistry || loadTopicRegistry();
  const proposedDoi = normalizeDoi(proposedTopic.doi || proposedTopic.refDoi);

  // 1. Exact and normalized slug collision
  const proposedSlugs = [
    proposedTopic.slugVi,
    proposedTopic.slugEn,
    proposedTopic.topicId,
    proposedTopic.slug
  ].filter(Boolean).map(s => s.replace(/-(?:vi|en)$/, '').toLowerCase());

  for (const pSlug of proposedSlugs) {
    const matched = registry.topics.find(t => 
      t.id === pSlug || 
      t.slugs.some(s => s.replace(/-(?:vi|en)$/, '').toLowerCase() === pSlug)
    );
    if (matched) {
      return {
        isDuplicate: true,
        type: 'SLUG_COLLISION',
        reason: `Slug "${pSlug}" đã trùng lặp với bài viết "${matched.titleVi}" (${matched.id})`,
        matchedTopic: matched
      };
    }
  }

  // 2. Strict DOI match (if DOI is provided)
  if (proposedDoi && proposedDoi !== 'null') {
    const matched = registry.topics.find(t => {
      const existingDoi = normalizeDoi(t.doi);
      return existingDoi && existingDoi === proposedDoi;
    });
    if (matched) {
      return {
        isDuplicate: true,
        type: 'DOI_COLLISION',
        reason: `Mã định danh khoa học DOI [${proposedDoi}] đã được sử dụng trong bài "${matched.titleVi}"`,
        matchedTopic: matched
      };
    }
  }

  // 3. Biochemical Entity & Medical Mechanism Collision
  const combinedProposed = [
    proposedTopic.titleVi,
    proposedTopic.titleEn,
    proposedTopic.slugVi,
    proposedTopic.slugEn,
    Array.isArray(proposedTopic.tagsVi) ? proposedTopic.tagsVi.join(' ') : '',
    Array.isArray(proposedTopic.tagsEn) ? proposedTopic.tagsEn.join(' ') : '',
    proposedTopic.excerptVi,
    proposedTopic.excerptEn
  ].join(' ');

  const proposedTokens = new Set(extractTokens(combinedProposed));

  for (const signature of ENTITY_SIGNATURES) {
    let matchCount = 0;
    const matchedTokens = [];
    for (const sigToken of signature.tokens) {
      const normSig = normalizeText(sigToken);
      if (proposedTokens.has(normSig) || normalizeText(combinedProposed).includes(normSig)) {
        matchCount++;
        matchedTokens.push(sigToken);
      }
    }
    // If proposed topic triggers 2 or more distinct tokens of a known signature cluster
    if (matchCount >= 2) {
      // Find the topic in registry that corresponds to this signature
      const matched = registry.topics.find(t => {
        const tTokens = new Set(t.keywords.map(k => normalizeText(k)));
        const tCombined = normalizeText(`${t.titleVi} ${t.titleEn} ${t.id}`);
        let c = 0;
        for (const st of signature.tokens) {
          const nst = normalizeText(st);
          if (tTokens.has(nst) || tCombined.includes(nst)) c++;
        }
        return c >= 2;
      });

      if (matched) {
        return {
          isDuplicate: true,
          type: 'ENTITY_COLLISION',
          reason: `Trùng lặp cơ chế sinh học: Đề tài về cụm "${signature.name}" (${matchedTokens.join(', ')}) đã có bài chuyên khảo "${matched.titleVi}"`,
          matchedTopic: matched
        };
      }
    }
  }

  // 4. Title Jaccard / N-Gram Semantic Overlap (> 40% overlap)
  const propViTokens = new Set(extractTokens(proposedTopic.titleVi || ''));
  const propEnTokens = new Set(extractTokens(proposedTopic.titleEn || ''));

  for (const t of registry.topics) {
    const existingViTokens = new Set(extractTokens(t.titleVi));
    const existingEnTokens = new Set(extractTokens(t.titleEn));

    const viSim = jaccardSimilarity(propViTokens, existingViTokens);
    const enSim = jaccardSimilarity(propEnTokens, existingEnTokens);
    const maxSim = Math.max(viSim, enSim);

    if (maxSim >= 0.40) {
      return {
        isDuplicate: true,
        type: 'TITLE_SIMILARITY',
        reason: `Tiêu đề quá tương đồng (${(maxSim * 100).toFixed(0)}% trùng từ khóa) với bài "${t.titleVi}"`,
        matchedTopic: t
      };
    }
  }

  return { isDuplicate: false };
}

// Quick CLI self-test
if (process.argv[1] && process.argv[1].endsWith('topic-dedup-guard.mjs')) {
  console.log('🧪 Đang chạy kiểm thử Topic Deduplication Guard...');
  const testDup1 = {
    titleVi: "Đi bộ 10 phút sau ăn giải phóng GLUT4",
    titleEn: "10-minute postprandial walking triggers GLUT4",
    slugVi: "di-bo-sau-an-glut4-vi",
    slugEn: "postprandial-walking-glut4-en"
  };
  const res1 = checkTopicCollision(testDup1);
  console.log('Test 1 (Đi bộ sau ăn):', res1.isDuplicate ? `❌ BỊ CHẶN: ${res1.reason}` : '✅ HỢP LỆ');

  const testDup2 = {
    titleVi: "Zonulin và cơ chế rò rỉ ruột non",
    titleEn: "Zonulin pathway in leaky gut",
    slugVi: "zonulin-ro-ri-ruot-vi",
    slugEn: "zonulin-leaky-gut-en"
  };
  const res2 = checkTopicCollision(testDup2);
  console.log('Test 2 (Zonulin/Leaky gut):', res2.isDuplicate ? `❌ BỊ CHẶN: ${res2.reason}` : '✅ HỢP LỆ');

  const testUnique = {
    titleVi: "Astaxanthin: Sức mạnh bảo vệ màng kép ty thể trước stress oxy hóa",
    titleEn: "Astaxanthin: Dual-Layer Mitochondrial Protection Against Oxidative Stress",
    slugVi: "astaxanthin-bao-ve-ty-the-vi",
    slugEn: "astaxanthin-mitochondrial-protection-en",
    doi: "10.1016/j.freeradbiomed.2024.01.001"
  };
  const res3 = checkTopicCollision(testUnique);
  console.log('Test 3 (Astaxanthin - Mới):', res3.isDuplicate ? `❌ BỊ CHẶN: ${res3.reason}` : '✅ HỢP LỆ (Cho phép xuất bản)');
}
