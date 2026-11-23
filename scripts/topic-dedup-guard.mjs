/**
 * Deterministic Zero-Token Anti-Duplication Guard (v3.0)
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 *
 * Runs 100% locally in JavaScript (Zero Token Cost, <5ms execution).
 * Prevents topic, biochemical mechanism, and paraphrase duplication across Phytocodex dispatches.
 */

import { loadTopicRegistry, extractTokens, normalizePhrase } from './topic-registry.mjs';

// Comprehensive canonical entity clusters (66+ biochemical & lifestyle mechanisms).
// Any proposed topic hitting >= 2 distinct tokens of a cluster already covered in the registry is BLOCKED immediately.
const ENTITY_SIGNATURES = [
  // === Previously uncovered high-repetition clusters (root cause of Nov 2026 duplicates) ===
  { name: 'Sugar Glycation, AGEs & Skin Wrinkles', tokens: ['nep nhan', 'wrinkle', 'wrinkles', 'glycation', 'duong hoa', 'maillard', 'cau sat', 'lo xo collagen', 'keo cao su', 'collagen', 'duong', 'sugar', 'ages'] },
  { name: 'Alcohol Flush, ALDH2 & TP53 DNA Risk', tokens: ['do mat', 'alcohol flush', 'asian glow', 'aldh2', 'acetaldehyde', 'tp53', 'uong ruou', 'ruou bia', 'flushing'] },
  { name: 'Hair Loss, DHT, Saw Palmetto & Follicles', tokens: ['rung toc', 'toc rung', 'hair loss', 'hair thins', 'dht', 'nang toc', 'follicle', 'follicles', 'saw palmetto', '5 alpha reductase', 'alopecia'] },
  { name: 'Pumpkin Seed Oil & Hormonal Hair Loss', tokens: ['hat bi do', 'pumpkin seed', 'phytosterol', 'rung toc', 'nang toc'] },
  { name: 'Late-Night Dinner & Circadian Fat / Gastric Risk', tokens: ['an toi muon', 'an muon', 'late dinner', 'eating late', 'sau 8 gio', 'sau 20h', 'after 8pm', 'an khuya'] },
  { name: 'Thyroid, Selenium & Iodine Cold Fatigue', tokens: ['tuyen giap', 'thyroid', 'selen', 'selenium', 'iod', 'i ot', 'iodine', 'so lanh', 'cold intolerance', 'cold sensitivity', 'hashimoto'] },
  { name: 'Creatine & Brain ATP Mental Fatigue', tokens: ['creatine', 'lam viec tri oc', 'mental fatigue', 'pin du phong', 'backup battery', 'neural atp', 'brain energy', 'nao bo', 'te bao nao', 'brain', 'atp', 'tram sac'] },
  { name: 'Coffee Timing & Adenosine Afternoon Crash', tokens: ['ca phe', 'coffee', 'adenosine', '90 phut', '60 90', 'sau 2 gio chieu', 'afternoon coffee', 'tri hoan', 'midmorning crash'] },
  { name: 'Soy, Isoflavones, Genistein & Flaxseed', tokens: ['dau nanh', 'soy', 'soybean', 'isoflavone', 'genistein', 'phytoestrogen', 'hat lanh', 'flaxseed', 'tien man kinh', 'menopause'] },
  { name: 'Food Sequencing (Vegetables Before Carbs)', tokens: ['an rau truoc', 'thu tu an', 'trat tu bua an', 'food sequencing', 'vegetables first', 'vegetables before carbs', 'tuyen tuy'] },
  { name: 'Potassium-Sodium Ratio & Blood Pressure', tokens: ['kali', 'potassium', 'natri', 'sodium', 'kieng muoi', 'salt restriction'] },
  { name: 'Charcoal Grilled Meat HCAs/PAHs & Fresh Herbs', tokens: ['do nuong', 'chay canh', 'chay xem', 'charcoal', 'grilled meat', 'hcas', 'pahs', 'rau song', 'charred'] },
  { name: 'H. pylori CagA Toxin & Gastric Cancer', tokens: ['vi khuan hp', 'h pylori', 'helicobacter', 'caga', 'ung thu da day', 'gastric cancer'] },
  { name: 'HPV Virus, p53 Inactivation & Cervical Cancer', tokens: ['hpv', 'p53', 'co tu cung', 'cervical cancer', 'papillomavirus', 'vaccine hpv'] },
  { name: 'Cancer Patients Medical Nutrition & Muscle Mass', tokens: ['benh nhan ung thu', 'kieng thit', 'bo doi khoi u', 'tumor starvation', 'cancer patients', 'khoi co nac', 'lean muscle'] },
  { name: 'Desk Worker Neck/Shoulder Pain & Trapezius', tokens: ['co vai gay', 'neck and shoulder', 'trapezius', 'co thang', 'ngoi may tinh', 'desk worker'] },
  { name: 'Astaxanthin & Computer Vision Digital Eye Strain', tokens: ['astaxanthin', 'moi mat', 'computer vision', '20 20 20', 'eye fatigue', 'co mi', 'man hinh'] },
  { name: 'Dark Chocolate Flavanols & Nitric Oxide', tokens: ['socola', 'chocolate', 'cacao', 'flavanol', 'oxit nitric', 'nitric oxide'] },
  { name: 'Warm Morning Salt Water & Electrolytes', tokens: ['nuoc am', 'muoi khoang', 'sea salt', 'warm water', 'dien giai', 'electrolyte', 'uong ly nuoc'] },
  { name: 'Cooled Sweet Potato & Resistant Starch', tokens: ['khoai lang', 'sweet potato', 'tinh bot khang', 'resistant starch', 'de lanh'] },
  { name: 'Shiitake / Maitake Mushrooms & Beta-Glucan', tokens: ['nam huong', 'shiitake', 'maitake', 'beta glucan', 'dectin 1'] },
  { name: 'Exercise NK Cells & Myokines Cancer Surveillance', tokens: ['te bao nk', 'nk cells', 'myokine', 'van dong', 'tuan tra'] },
  { name: 'Cortisol Steal & Chronic Stress Hormones', tokens: ['cortisol steal', 'cortisol', 'stress hijacks', 'hormone sinh san'] },
  { name: 'Sarcopenia After 40, Leucine & mTOR', tokens: ['teo co', 'sarcopenia', 'leucine', 'mtor', 'tuoi 40'] },
  { name: 'Phosphatidylserine & DHA Neuronal Membrane', tokens: ['phosphatidylserine', 'dha', 'synap', 'neuronal membrane', 'mang te bao than kinh'] },
  { name: 'Apple Pectin & Colonic Mucin Barrier', tokens: ['pectin', 'qua tao', 'apple pectin', 'mucin', 'mang nhay'] },
  { name: '4-7-8 Breathing & Vagus Nerve Anxiety', tokens: ['4 7 8', 'tho 4 7 8', 'breathing', 'phe vi', 'vagus', 'lo au'] },
  { name: 'Blue Light Screen Night Shift & Melatonin', tokens: ['anh sang xanh', 'blue light', 'night shift', 'kinh loc', 'melatonin'] },
  { name: 'Bedroom Temperature 19-20C & Slow-Wave Sleep', tokens: ['nhiet do phong ngu', 'bedroom temperature', '19 20', 'nrem'] },
  { name: 'Magnesium Glycinate vs Citrate Sleep', tokens: ['magie', 'magnesium', 'glycinate', 'citrate'] },
  { name: 'Sauna Heat Shock Proteins & Heart', tokens: ['xong hoi', 'sauna', 'heat shock', 'hsp'] },
  { name: 'Morning Sunlight 10 Minutes & SCN Clock', tokens: ['anh nang', 'morning sun', 'ban mai', 'scn', 'nhan tren cheo'] },
  { name: 'Cold Ice Water After Fatty Meals', tokens: ['nuoc da lanh', 'ice water', 'fatty meals', 'dau mo'] },
  { name: 'Sedentary Sitting & LPL Vascular Enzyme', tokens: ['ngoi nhieu', 'ngoi lau', 'sedentary', 'lpl', 'shear stress'] },
  { name: 'Intermittent Fasting 14-16h & Autophagy', tokens: ['nhin an gian doan', 'intermittent fasting', '14 16', 'autophagy', 'tu thuc bao'] },
  { name: 'Liver Detox Tea Myth & Phase 1/2', tokens: ['tra thai doc', 'detox tea', 'liver detox', 'phase 1', 'phase 2'] },
  { name: 'Fragmented Sleep & Group 2A DNA Repair', tokens: ['giac ngu ngat quang', 'fragmented sleep', 'nhom 2a', 'group 2a', 'double strand break'] },
  { name: 'Epstein-Barr Virus & Multiple Sclerosis', tokens: ['epstein barr', 'ebv', 'da xo cung', 'multiple sclerosis', 'molecular mimicry'] },
  { name: 'Resistance Training Longevity Myokines', tokens: ['khang luc', 'resistance training', 'tap ta', 'tap the luc'] },
  { name: 'Anti-Cancer Kitchen Food Combination & Heat', tokens: ['can bep chong ung thu', 'anti cancer kitchen', 'che bien dung cach', 'food combination'] },

  // === Original 38 clusters (normalized to spaces for reliable phrase matching) ===
  { name: 'Postprandial Walking & GLUT4', tokens: ['di bo', 'walking', 'glut4', 'postprandial', 'sau an'] },
  { name: 'Zonulin & Leaky Gut Endotoxin', tokens: ['zonulin', 'leaky gut', 'ro ri ruot', 'ro rui ruot', 'occludin', 'claudin', 'tight junction', 'endotoxin'] },
  { name: 'L-Theanine & Green Tea EGCG', tokens: ['theanine', 'egcg', 'tra xanh', 'green tea', 'alpha wave', 'song nao'] },
  { name: 'Mitohormesis & Stress Paradox', tokens: ['mitohormesis', 'hormesis', 'nghich ly stress', 'oxidative stress'] },
  { name: 'Chewing & Satiety Signaling', tokens: ['nhai ky', 'chew', 'chewing', 'mastication', 'pyy', 'glp 1'] },
  { name: 'Gut-Brain Axis & Vagus GABA', tokens: ['vagus', 'vagal', 'gaba', 'phe vi', 'truc nao ruot', 'gut brain'] },
  { name: 'Hydrolyzed Collagen Peptides', tokens: ['collagen peptide', 'pro hyp', 'nguyen bao soi', 'thuy phan', 'hydrolyzed collagen'] },
  { name: 'H5N1 Avian Flu & Sialic Acid', tokens: ['h5n1', 'sialic', 'cum gia cam', 'alpha 2 3', 'alpha 2 6'] },
  { name: 'Yersinia pestis & T3SS', tokens: ['yersinia', 'pestis', 't3ss', 'dich hach', 'type iii'] },
  { name: 'Vitamin D3 & K2 MK-7 Calcium Paradox', tokens: ['vitamin d3', 'k2', 'mk 7', 'mk7', 'voi hoa', 'calcification', 'calcium paradox', 'osteocalcin'] },
  { name: 'Alpha-Ketoglutarate Epigenetics', tokens: ['alpha ketoglutarate', 'akg', 'bieu sinh', 'epigenetic clock', 'tet enzyme'] },
  { name: 'Resistant Starch Cold Rice & SCFA', tokens: ['resistant starch', 'tinh bot khang', 'com nguoi', 'cold rice'] },
  { name: 'Urolithin A & Mitophagy', tokens: ['urolithin', 'mitophagy', 'qua luu', 'pomegranate', 'ty the'] },
  { name: 'Spermidine & eIF5A Autophagy', tokens: ['spermidine', 'eif5a', 'tu thuc', 'autophagy'] },
  { name: 'Senolytics Fisetin & Zombie Cells', tokens: ['senolytic', 'senescent', 'fisetin', 'sasp', 'zombie'] },
  { name: 'Curcumin & Piperine Bioavailability', tokens: ['curcumin', 'piperine', 'nghe', 'tieu den', 'sinh kha dung', 'bioavailability'] },
  { name: 'Glymphatic Brain Cleaning & Deep Sleep', tokens: ['glymphatic', 'aqp4', 'aquaporin', 'rua xe nao', 'slow wave sleep'] },
  { name: 'Melatonin Circadian Zeitgeber', tokens: ['melatonin', 'zeitgeber', 'nhip sinh hoc', 'circadian'] },
  { name: 'Red Light 670nm Retinal Mitochondria', tokens: ['670nm', 'anh sang do', 'red light', 'retinal', 'vong mac'] },
  { name: 'Ferroptosis & Brain Iron', tokens: ['ferroptosis', 'sat te bao', 'gpx4', 'iron death'] },
  { name: 'Brown Fat & UCP1 Proton Leak', tokens: ['ucp1', 'brown fat', 'mo nau', 'proton leak', 'ro ri proton'] },
  { name: 'Sulforaphane & Broccoli Nrf2', tokens: ['sulforaphane', 'nrf2', 'sup lo', 'bong cai xanh', 'broccoli'] },
  { name: 'Apple Cider Vinegar & Glucose Spikes', tokens: ['giam tao', 'vinegar', 'acetic', 'alpha amylase', 'glucose spike'] },
  { name: 'Warm Bath / Cold Bath Sleep Core Temp', tokens: ['tam nuoc nong', 'tam nuoc lanh', 'warm bath', 'core body temperature'] },
  { name: 'Oats Soluble Fiber & Colonic Butyrate', tokens: ['yen mach', 'oats', 'oatmeal', 'chat xo hoa tan', 'soluble fiber', 'butyrate'] },
  { name: 'Berries & Ellagic Acid DNA Protection', tokens: ['qua mong', 'berries', 'ellagic', 'viet quat', 'dau tay', 'telomere'] },
  { name: 'Moldy Food & Aflatoxin Liver Cancer', tokens: ['aflatoxin', 'thuc pham moc', 'moldy', 'aspergillus'] },
  { name: 'Liquid Fructose Boba & Fatty Liver MASLD', tokens: ['tra sua', 'boba', 'fructose', 'gan nhiem mo', 'fatty liver', 'masld'] },
  { name: 'Crushed Garlic & Allicin 10-Minute Rule', tokens: ['allicin', 'alliinase', 'toi tuoi', 'dap dap', 'crushed garlic', '10 phut'] },
  { name: 'Postprandial Somnolence & 2PM Lunch Slump', tokens: ['sap nguon', 'somnolence', 'lunch slump', 'bua trua', 'buon ngu', '2 gio chieu'] },
  { name: 'Cooked Tomatoes Lycopene & Olive Oil', tokens: ['ca chua', 'tomatoes', 'lycopene', 'dau o liu', 'olive oil'] },
  { name: 'Hot Beverages >65C & Esophageal Injury', tokens: ['65 do', '65c', 'tra nong', 'canh soi', 'thuc quan', 'esophageal'] },
  { name: 'Processed Red Meat Nitrosamine & Heme Iron', tokens: ['thit do', 'che bien san', 'processed meat', 'nitrosamine', 'heme'] },
  { name: 'Macular Pigment Lutein Zeaxanthin', tokens: ['lutein', 'zeaxanthin', 'hoang diem', 'macula', 'macular', 'sac to vang'] },
  { name: 'Rice Bran Phytoceramides & Skin Barrier', tokens: ['ceramide', 'cam gao', 'rice bran', 'phytoceramides', 'hang rao da'] },
  { name: 'Oral Hyaluronic Acid & Knee Joint', tokens: ['hyaluronic', 'khop goi', 'dem khop', 'synovial', 'knee joint'] },
  { name: 'Milk Thistle Silymarin & Hepatocyte', tokens: ['ke sua', 'silymarin', 'milk thistle', 'mang te bao gan'] },
  { name: 'Tart Cherry & Uric Acid Gout Prevention', tokens: ['anh dao', 'tart cherry', 'axit uric', 'uric acid', 'gut cap', 'gout'] }
];

function normalizeDoi(doi) {
  if (!doi) return '';
  return doi
    .toLowerCase()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
    .replace(/^doi:\s*/, '')
    .trim();
}

function jaccardSimilarity(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

function diceSimilarity(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  return (2 * intersection) / (setA.size + setB.size);
}

/**
 * Checks whole-word/phrase boundary match on space-normalized text
 */
function containsNormalizedPhrase(haystackPhrase, needlePhrase) {
  if (!haystackPhrase || !needlePhrase) return false;
  return ` ${haystackPhrase} `.includes(` ${needlePhrase} `);
}

/**
 * Validates a proposed topic against the registry locally (0 token cost).
 * @param {Object} proposedTopic - { titleVi, titleEn, slugVi, slugEn, doi, tagsVi, tagsEn, excerptVi, excerptEn }
 * @param {Object} customRegistry - optional pre-loaded registry
 * @returns {Object} { isDuplicate: boolean, type?: string, reason?: string, matchedTopic?: Object }
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

  // 3. Biochemical Entity & Medical Mechanism Collision (evaluate VI and EN separately so VI+EN translation of 1 generic word never double-counts as 2!)
  const viProposedPhrase = normalizePhrase([
    proposedTopic.titleVi,
    proposedTopic.slugVi,
    Array.isArray(proposedTopic.tagsVi) ? proposedTopic.tagsVi.join(' ') : '',
    proposedTopic.excerptVi
  ].join(' '));
  const enProposedPhrase = normalizePhrase([
    proposedTopic.titleEn,
    proposedTopic.slugEn,
    Array.isArray(proposedTopic.tagsEn) ? proposedTopic.tagsEn.join(' ') : '',
    proposedTopic.excerptEn
  ].join(' '));

  for (const signature of ENTITY_SIGNATURES) {
    const viMatched = [];
    const enMatched = [];
    for (const sigToken of signature.tokens) {
      const normSig = normalizePhrase(sigToken);
      if (containsNormalizedPhrase(viProposedPhrase, normSig)) viMatched.push(sigToken);
      if (containsNormalizedPhrase(enProposedPhrase, normSig)) enMatched.push(sigToken);
    }
    const matchedTokens = viMatched.length >= enMatched.length ? viMatched : enMatched;
    if (matchedTokens.length >= 2) {
      const matched = registry.topics.find(t => {
        const tVi = normalizePhrase(`${t.titleVi} ${t.id} ${(t.tags || []).join(' ')}`);
        const tEn = normalizePhrase(`${t.titleEn} ${t.id} ${(t.tags || []).join(' ')}`);
        let cVi = 0;
        let cEn = 0;
        for (const st of signature.tokens) {
          const nst = normalizePhrase(st);
          if (containsNormalizedPhrase(tVi, nst)) cVi++;
          if (containsNormalizedPhrase(tEn, nst)) cEn++;
        }
        return cVi >= 2 || cEn >= 2;
      });

      if (matched) {
        return {
          isDuplicate: true,
          type: 'ENTITY_COLLISION',
          reason: `Trùng lặp cơ chế sinh học: Đề tài thuộc cụm "${signature.name}" (${matchedTokens.slice(0, 4).join(', ')}) đã có bài "${matched.titleVi}"`,
          matchedTopic: matched
        };
      }
    }
  }

  // 4. Title & Core Keyword Semantic Overlap (Jaccard >= 0.33 OR Dice >= 0.45)
  const propViTokens = new Set(extractTokens(proposedTopic.titleVi || ''));
  const propEnTokens = new Set(extractTokens(proposedTopic.titleEn || ''));

  // Generic organ/domain terms excluded from Layer 5 self-learning rare-keyword fingerprint
  const BROAD_DOMAIN_TERMS = new Set([
    'metabolic', 'aging', 'longevity', 'nutrition', 'lifestyle', 'health', 'healthy',
    'cancer', 'prevention', 'cardiovascular', 'heart', 'brain', 'gut', 'immune', 'immunity',
    'stress', 'sleep', 'digestion', 'hormones', 'endocrine', 'energy', 'inflammation',
    'blood', 'sugar', 'pressure', 'risk', 'diet', 'food', 'foods', 'daily', 'natural',
    'human', 'clinical', 'effect', 'effects', 'benefits', 'damage', 'chronic', 'system',
    'lao', 'hoa', 'dinh', 'duong', 'chuyen', 'nang', 'luong', 'ung', 'thu', 'tim', 'mach',
    'ruot', 'mien', 'dich', 'giac', 'ngu', 'huyet', 'tieu', 'noi', 'tiet', 'viem', 'man',
    'tinh', 'thuc', 'pham', 'thoi', 'quen', 'song', 'doi', 'thuong', 'tang', 'giam', 'chong',
    'can', 'bep', 'bua', 'sang', 'toi', 'chieu', 'dem', 'tuoi', 'trung', 'nien', 'phong', 'ngua'
  ]);

  const toRareTokens = (text) => new Set(
    extractTokens(text).filter(t => t.length >= 4 && !BROAD_DOMAIN_TERMS.has(t))
  );

  const propRareVi = toRareTokens(`${proposedTopic.titleVi || ''} ${proposedTopic.slugVi || ''}`);
  const propRareEn = toRareTokens(`${proposedTopic.titleEn || ''} ${proposedTopic.slugEn || ''}`);

  for (const t of registry.topics) {
    const existingViTokens = new Set(extractTokens(t.titleVi));
    const existingEnTokens = new Set(extractTokens(t.titleEn));

    const viJacc = jaccardSimilarity(propViTokens, existingViTokens);
    const enJacc = jaccardSimilarity(propEnTokens, existingEnTokens);
    const viDice = diceSimilarity(propViTokens, existingViTokens);
    const enDice = diceSimilarity(propEnTokens, existingEnTokens);
    const maxJacc = Math.max(viJacc, enJacc);
    const maxDice = Math.max(viDice, enDice);

    if (maxJacc >= 0.33 || maxDice >= 0.45) {
      return {
        isDuplicate: true,
        type: 'TITLE_SIMILARITY',
        reason: `Tiêu đề quá tương đồng (Jaccard ${(maxJacc * 100).toFixed(0)}%, Dice ${(maxDice * 100).toFixed(0)}%) với bài "${t.titleVi}"`,
        matchedTopic: t
      };
    }

    // 5. Self-Learning Rare-Keyword Fingerprint Guard (auto-protects ANY newly discovered future topic!)
    const existRareVi = toRareTokens(`${t.titleVi || ''} ${t.id || ''}`);
    const existRareEn = toRareTokens(`${t.titleEn || ''} ${t.id || ''}`);
    const sharedVi = [...propRareVi].filter(tok => existRareVi.has(tok));
    const sharedEn = [...propRareEn].filter(tok => existRareEn.has(tok));
    const bestShared = sharedVi.length >= sharedEn.length ? sharedVi : sharedEn;
    const hasLongSpecificPair = bestShared.filter(tok => tok.length >= 7).length >= 2;

    if (bestShared.length >= 3 || (hasLongSpecificPair && Math.max(viDice, enDice) >= 0.30)) {
      return {
        isDuplicate: true,
        type: 'SELF_LEARNING_KEYWORD_COLLISION',
        reason: `Trùng cụm từ khóa đặc hiệu tự học (${bestShared.slice(0, 4).join(', ')}) với bài "${t.titleVi}"`,
        matchedTopic: t
      };
    }
  }

  return { isDuplicate: false };
}

// Quick CLI self-test
if (process.argv[1] && process.argv[1].endsWith('topic-dedup-guard.mjs')) {
  console.log('🧪 Đang chạy kiểm thử Topic Deduplication Guard v3.0...');
  const cases = [
    { name: 'Sugar/Wrinkles paraphrase', topic: { titleVi: 'Đường tinh luyện phá vỡ mạng lưới đàn hồi làn da như dây cao su cũ', titleEn: 'Refined sugar breaks down skin elasticity via glycation cross-links' }, expectDup: true },
    { name: 'Alcohol flush paraphrase', topic: { titleVi: 'Gò má ửng đỏ sau một ly bia: Dấu hiệu enzym ALDH2 quá tải độc tố', titleEn: 'Flushed cheeks after beer: ALDH2 overload and acetaldehyde DNA risk' }, expectDup: true },
    { name: 'Hair loss Saw Palmetto', topic: { titleVi: 'Chiết xuất cọ lùn Saw Palmetto và kẽm bảo vệ nang tóc trước DHT', titleEn: 'Saw Palmetto and zinc protect follicles against DHT hair loss' }, expectDup: true },
    { name: 'Creatine brain ATP', topic: { titleVi: 'Creatine giúp tái tạo năng lượng ATP cho tế bào não khi làm việc căng thẳng', titleEn: 'Creatine replenishes brain ATP under cognitive load' }, expectDup: true },
    { name: 'Late dinner after 8pm', topic: { titleVi: 'Thói quen ăn tối muộn sau 8 giờ làm rối loạn đồng hồ chuyển hóa', titleEn: 'Eating late dinner after 8pm disrupts metabolic circadian clock' }, expectDup: true },
    { name: 'NEW: Beetroot & mouthwash', topic: { titleVi: 'Nước súc miệng diệt khuẩn có thể làm mất tác dụng hạ huyết áp của củ dền', titleEn: 'Antiseptic mouthwash blunts dietary nitrate blood pressure benefits from beetroot' }, expectDup: false },
    { name: 'NEW: 30 plants microbiome', topic: { titleVi: '30 loại thực vật mỗi tuần: Con số vàng giúp hệ vi sinh đường ruột đa dạng gấp đôi', titleEn: 'Thirty plant foods per week: The diversity threshold for gut microbiome resilience' }, expectDup: false },
    { name: 'NEW: Soleus calf muscle', topic: { titleVi: 'Cơ dép ở bắp chân, máy bơm chuyển hóa thầm lặng dưới gầm bàn làm việc', titleEn: 'The soleus calf muscle: A quiet metabolic pump under your office desk' }, expectDup: false },
  ];
  let failures = 0;
  for (const c of cases) {
    const res = checkTopicCollision(c.topic);
    const ok = res.isDuplicate === c.expectDup;
    if (!ok) failures++;
    console.log(`${ok ? '✅' : '❌'} [${c.name}] dup=${res.isDuplicate} (expect ${c.expectDup}) ${res.reason ? '-> ' + res.reason : ''}`);
  }
  if (failures > 0) process.exit(1);
}
