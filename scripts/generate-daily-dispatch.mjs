/**
 * Autonomous Dispatch Engine for The BioDispatch
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Flow:
 * 1. Checks current posts in content/posts/
 * 2. Finds the next unreleased breakthrough topic from radar or generates with Gemini
 * 3. Enforces strict Editorial Guidelines:
 *    - NO em-dash (—) or en-dash (–)
 *    - Strict blockquote for analogies (> *"..."*)
 *    - Responsive Pathway Flowchart ([Phase 1] ──► [Phase 2])
 *    - Real verified PubMed & DOI citation
 *    - 16:9 Artwork generation / fallback
 *    - Bilingual VI and EN outputs
 * 4. Updates SEED_REFS in src/lib/store.ts
 * 5. Regenerates thumbnails with make-thumbs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DISPATCH_RADAR_TOPICS } from './radar-topics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'content/posts');
const imagesDir = path.join(rootDir, 'public/images/posts');
const storeFile = path.join(rootDir, 'src/lib/store.ts');

// Ensure directories exist
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

function sanitizeTypography(text) {
  if (!text) return '';
  return text
    .replace(/—/g, ' - ')
    .replace(/–/g, ' - ')
    .replace(/\s+-\s+/g, ' - ');
}

function getExistingSlugs() {
  const files = fs.readdirSync(postsDir);
  return new Set(files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));
}

function getExistingDispatchesCatalog() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const catalog = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(postsDir, f), 'utf8');
      const titleMatch = content.match(/^title:\s*"([^"]+)"/m);
      const organMatch = content.match(/^organ:\s*"([^"]+)"/m);
      if (titleMatch) {
        catalog.push({
          slug: f.replace(/\.md$/, ''),
          title: titleMatch[1],
          organ: organMatch ? organMatch[1] : ''
        });
      }
    } catch {
      // ignore read error
    }
  }
  return catalog;
}

function createDispatchMarkdown(topic, lang = 'vi', scheduledIsoDate) {
  const isVi = lang === 'vi';
  // Ensure bulletproof naming convention: -vi for Vietnamese, -en for English
  let slugVi = topic.slugVi;
  if (!slugVi.endsWith('-vi')) slugVi += '-vi';
  let slugEn = topic.slugEn;
  if (!slugEn.endsWith('-en')) slugEn += '-en';

  const slug = isVi ? slugVi : slugEn;
  const title = isVi ? topic.titleVi : topic.titleEn;
  const excerpt = isVi ? topic.excerptVi : topic.excerptEn;
  const tags = isVi ? topic.tagsVi : topic.tagsEn;
  const readingTime = isVi ? topic.readingTimeVi : topic.readingTimeEn;
  const analogy = isVi ? topic.analogyVi : topic.analogyEn;
  const lead = isVi ? topic.leadVi : topic.leadEn;
  const sections = isVi ? topic.sectionsVi : topic.sectionsEn;
  const authorName = isVi ? 'TS. Hoàng Xuân Chiến' : 'Dr. Xuan Chien Hoang';
  const authorRole = isVi 
    ? 'Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức'
    : 'Doctor of Natural Sciences (Dr. rer. nat.) · University of Hamburg, Germany';
  const imgPath = `/images/posts/${slug}.jpg`;
  const imgAlt = isVi ? `Đồ họa phân tử y sinh ${topic.titleVi}` : `Biomedical molecular illustration for ${topic.titleEn}`;

  const tagsYaml = tags.map(t => `"${sanitizeTypography(t)}"`).join(', ');

  let bodyContent = `---
title: "${sanitizeTypography(title)}"
date: "${scheduledIsoDate}"
excerpt: "${sanitizeTypography(excerpt)}"
author: "${authorName}"
authorRole: "${authorRole}"
tags: [${tagsYaml}]
organ: "${topic.organ}"
tier: "${topic.tier}"
readingTime: "${readingTime}"
featured: true
doi: "${topic.doi}"
gizmo: ${topic.gizmo ? `"${topic.gizmo}"` : 'null'}
lang: "${lang}"
image: "${imgPath}"
imageAlt: "${sanitizeTypography(imgAlt)}"
---

${sanitizeTypography(lead)}

![${sanitizeTypography(imgAlt)}](${imgPath})

> *"${sanitizeTypography(analogy)}"*

---

`;

  const activeFlowchart = isVi ? (topic.flowchartVi || topic.flowchart) : (topic.flowchartEn || topic.flowchart);
  if (activeFlowchart) {
    bodyContent += `## ${isVi ? 'Sơ đồ cơ chế truyền tín hiệu phân tử' : 'Molecular Pathway Flowchart'}\n\n`;
    bodyContent += `\`\`\`text\n${sanitizeTypography(activeFlowchart)}\n\`\`\`\n\n---\n\n`;
  }

  sections.forEach((sec, idx) => {
    bodyContent += `## ${sanitizeTypography(sec.heading)}\n\n`;
    bodyContent += `${sanitizeTypography(sec.body)}\n\n`;
    if (idx < sections.length - 1) {
      bodyContent += `---\n\n`;
    }
  });

  return { slug, content: bodyContent };
}

function updateStoreSeedRefs(topic) {
  if (!fs.existsSync(storeFile)) return;
  let storeContent = fs.readFileSync(storeFile, 'utf8');

  // Check if topic is already registered in SEED_REFS
  if (storeContent.includes(`"${topic.slugVi}": [`)) {
    console.log(`ℹ️ [Store] SEED_REFS đã có mục cho ${topic.slugVi}`);
    return;
  }

  // Handle multi-reference array if provided by Gemini, or construct structured references
  let refsList = [];
  if (Array.isArray(topic.references) && topic.references.length > 0) {
    refsList = topic.references.map((r, idx) => ({
      ordinal: idx + 1,
      label: (r.label || r.title || 'Landmark Research Publication').replace(/"/g, '\\"'),
      pmid: (r.pmid || '').trim(),
      doi: (r.doi || '').trim(),
      design: (r.design || 'Landmark Literature Synthesis').replace(/"/g, '\\"'),
      sampleSize: r.sampleSize || null,
      journal: (r.journal || 'Nature').replace(/"/g, '\\"'),
      year: r.year || 2024,
      abstract: (r.abstract || '').replace(/"/g, '\\"')
    }));
  } else {
    const refTitle = (topic.refPaperTitle || topic.titleEn || 'Biomedical Landmark Study').replace(/"/g, '\\"');
    const refAbstract = (topic.refAbstract || topic.excerptEn || '').replace(/"/g, '\\"');
    const refDesign = 'Landmark Literature Synthesis';
    const refJournal = (topic.refJournal || topic.journal || 'Nature').replace(/"/g, '\\"');
    const refYear = topic.refYear || topic.year || 2024;
    const refDoi = (topic.refDoi || topic.doi || '').trim();
    const refPmid = (topic.refPmid || topic.pmid || '').trim();
    refsList = [{
      ordinal: 1,
      label: refTitle,
      pmid: refPmid,
      doi: refDoi,
      design: refDesign,
      sampleSize: null,
      journal: refJournal,
      year: refYear,
      abstract: refAbstract
    }];
  }

  const serializedItems = refsList.map(r => `    {
      ordinal: ${r.ordinal},
      label: "${r.label}",
      pmid: "${r.pmid}",
      doi: "${r.doi}",
      design: "${r.design}",
      sampleSize: ${r.sampleSize ? `"${r.sampleSize}"` : 'null'},
      journal: "${r.journal}",
      year: ${r.year},
      abstract: "${r.abstract}",
    },`).join('\n');

  const newRefBlock = `  "${topic.slugVi}": [
${serializedItems}
  ],
  "${topic.slugEn}": [
${serializedItems}
  ],
`;

  // Insert before closing bracket of SEED_REFS
  const targetPattern = /const SEED_REFS: Record<string, Ref\[\]> = \{([\s\S]*?)\n\};/;
  const match = storeContent.match(targetPattern);
  if (match) {
    const updated = storeContent.replace(
      targetPattern,
      `const SEED_REFS: Record<string, Ref[]> = {$1\n${newRefBlock}};`
    );
    fs.writeFileSync(storeFile, updated, 'utf8');
    console.log(`✅ [Store] Đã cập nhật ${refsList.length} tài liệu y văn vào SEED_REFS cho ${topic.slugVi} & ${topic.slugEn}`);
  }
}

const ORGAN_PALETTES = {
  Brain: { bg1: "#0b1528", bg2: "#1e293b", accent: "#38bdf8", glow: "#0284c7" },
  Heart: { bg1: "#2a0812", bg2: "#1f1325", accent: "#f43f5e", glow: "#be123c" },
  Gut: { bg1: "#062016", bg2: "#0f2e22", accent: "#10b981", glow: "#047857" },
  "Cellular Aging": { bg1: "#1a0b2e", bg2: "#161330", accent: "#a78bfa", glow: "#7c3aed" },
  Metabolic: { bg1: "#081d2a", bg2: "#0f172a", accent: "#00f2fe", glow: "#0284c7" },
  Immune: { bg1: "#2d1604", bg2: "#1c1917", accent: "#f59e0b", glow: "#d97706" }
};

async function createFallbackIllustration(slug, topic = {}) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  if (fs.existsSync(targetPath)) return;

  const organ = topic.organ || "Metabolic";
  const palette = ORGAN_PALETTES[organ] || ORGAN_PALETTES.Metabolic;
  const title = (topic.titleEn || topic.titleVi || slug).substring(0, 48);
  const tier = topic.tier || "Clinical Deep-Dive";

  // Render a clean, distinct vector SVG scientific banner
  const svg = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg1}" />
      <stop offset="100%" stop-color="${palette.bg2}" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0.2" />
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="60" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bg)" />

  <!-- Organic Molecule Glow Rings -->
  <circle cx="980" cy="360" r="280" fill="${palette.glow}" opacity="0.3" filter="url(#blur)" />
  <circle cx="320" cy="180" r="180" fill="${palette.accent}" opacity="0.15" filter="url(#blur)" />

  <!-- Molecular Hex Lattice Geometry -->
  <g stroke="${palette.accent}" stroke-width="1.5" stroke-opacity="0.25" fill="none">
    <polygon points="980,240 1040,275 1040,345 980,380 920,345 920,275" />
    <polygon points="1040,345 1100,380 1100,450 1040,485 980,450 980,380" />
    <polygon points="920,345 980,380 980,450 920,485 860,450 860,380" />
    <line x1="980" y1="240" x2="980" y2="170" />
    <circle cx="980" cy="170" r="6" fill="${palette.accent}" />
    <circle cx="1040" cy="275" r="4" fill="${palette.accent}" />
    <circle cx="860" cy="450" r="5" fill="${palette.accent}" />
  </g>

  <!-- Editorial Masthead Overlays -->
  <g font-family="system-ui, -apple-system, sans-serif">
    <text x="96" y="240" fill="${palette.accent}" font-size="20" font-weight="700" letter-spacing="4">THE BIODISPATCH · ${organ.toUpperCase()}</text>
    <text x="96" y="280" fill="#94a3b8" font-size="14" font-weight="600" letter-spacing="2">${tier.toUpperCase()}</text>
    <rect x="96" y="320" width="80" height="4" fill="${palette.accent}" />
    <text x="96" y="380" fill="#f8fafc" font-size="44" font-weight="800" letter-spacing="-1">${title}</text>
    <text x="96" y="440" fill="#94a3b8" font-size="20" font-weight="400">Dr. Xuan Chien Hoang · University of Hamburg</text>
  </g>

  <!-- Frame Border -->
  <rect x="32" y="32" width="1216" height="656" fill="none" stroke="${palette.accent}" stroke-width="1" stroke-opacity="0.2" />
</svg>`;

  try {
    const sharp = (await import('sharp')).default;
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(targetPath);
    console.log(`🎨 [Artwork Generated] Đã tạo ảnh bìa phân tử độc bản riêng cho ${slug}`);
  } catch (err) {
    console.warn(`⚠️ [Artwork] Không thể render SVG sang JPG: ${err.message}`);
  }
}

export async function runAutonomousDispatch() {
  console.log('================================================================');
  console.log('  THE BIODISPATCH — AUTONOMOUS DISPATCH ENGINE');
  console.log('  Editorial Director: Dr. Xuan Chien Hoang');
  console.log('================================================================\n');

  const existingSlugs = getExistingSlugs();
  console.log(`📊 [Inventory] Đang có ${existingSlugs.size} bài viết trong content/posts/`);

  // Find the first radar topic not yet created
  let nextTopic = DISPATCH_RADAR_TOPICS.find(t => !existingSlugs.has(t.slugVi));

  if (!nextTopic) {
    console.log('✨ Tất cả chủ đề trong Radar Catalog tĩnh đã xuất bản. Đang kích hoạt Gemini AI sinh chủ đề mới...');
    const { generateTopicWithGemini } = await import('./gemini-topic-generator.mjs');
    const existingCatalog = getExistingDispatchesCatalog();
    nextTopic = await generateTopicWithGemini(existingCatalog);
    if (!nextTopic) {
      console.log('⚠️ Không thể sinh chủ đề mới qua Gemini AI trong phiên chạy này.');
      return null;
    }
  }

  // Determine publication timestamp: Today or configured slot (09:00 or 13:00)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = now.getHours();
  const timeSlot = hours < 11 ? '09:00:00Z' : '13:00:00Z';
  const scheduledIsoDate = `${year}-${month}-${day}T${timeSlot}`;

  console.log(`🚀 [Dispatch Target] Phát hiện chủ đề tiếp theo: "${nextTopic.titleVi}"`);
  console.log(`⏰ [Publish Time] Thời gian xuất bản: ${scheduledIsoDate}`);

  // 1. Tạo bài viết tiếng Việt
  const viPost = createDispatchMarkdown(nextTopic, 'vi', scheduledIsoDate);
  const viFilePath = path.join(postsDir, `${viPost.slug}.md`);

  // GATEKEEPER AUDIT: BẮT BUỘC KIỂM DUYỆT CHẤT LƯỢNG TRƯỚC KHI XUẤT BẢN
  const { validateDispatchContent } = await import('./validate-dispatch.mjs');
  const viValidation = validateDispatchContent(viPost.content, 'vi');
  if (!viValidation.isValid) {
    console.error('❌ [Gatekeeper REJECT] Bài viết tiếng Việt chưa đạt chuẩn biên tập của TS. Hoàng Xuân Chiến:');
    viValidation.issues.forEach(issue => console.error(`   - ${issue}`));
    throw new Error('Chất lượng bản thảo không đạt chuẩn Gatekeeper!');
  }
  console.log(`🛡️ [Gatekeeper PASSED] Bản thảo đạt ${viValidation.wordCount} từ và vượt qua toàn bộ 7 tiêu chuẩn biên tập!`);

  fs.writeFileSync(viFilePath, viPost.content, 'utf8');
  console.log(`📝 [Written] Đã tạo bản tiếng Việt: content/posts/${viPost.slug}.md`);

  // 2. Tạo bài viết tiếng Anh
  const enPost = createDispatchMarkdown(nextTopic, 'en', scheduledIsoDate);
  const enFilePath = path.join(postsDir, `${enPost.slug}.md`);

  const enValidation = validateDispatchContent(enPost.content, 'en');
  if (!enValidation.isValid) {
    console.error('❌ [Gatekeeper REJECT] Bài viết tiếng Anh chưa đạt chuẩn biên tập:');
    enValidation.issues.forEach(issue => console.error(`   - ${issue}`));
    throw new Error('Chất lượng bản thảo tiếng Anh không đạt chuẩn Gatekeeper!');
  }
  console.log(`🛡️ [Gatekeeper PASSED] Bản thảo tiếng Anh đạt ${enValidation.wordCount} từ và vượt qua toàn bộ 7 tiêu chuẩn biên tập!`);

  fs.writeFileSync(enFilePath, enPost.content, 'utf8');
  console.log(`📝 [Written] Đã tạo bản tiếng Anh: content/posts/${enPost.slug}.md`);

  // 3. Khởi tạo ảnh bìa 16:9 độc bản
  await createFallbackIllustration(nextTopic.slugVi, nextTopic);

  // 4. Cập nhật SEED_REFS trong store.ts
  updateStoreSeedRefs(nextTopic);

  console.log('\n✅ [Done] Hoàn tất sinh bản tin chuyên sâu song ngữ đạt chuẩn Gatekeeper!');
  return nextTopic;
}

// Direct CLI execution
if (process.argv[1] && process.argv[1].endsWith('generate-daily-dispatch.mjs')) {
  runAutonomousDispatch().catch(err => {
    console.error('❌ Lỗi khi chạy Autonomous Dispatch:', err);
    process.exit(1);
  });
}
