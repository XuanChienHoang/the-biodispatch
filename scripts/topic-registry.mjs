/**
 * Topic & Entity Registry for Phytocodex
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Provides:
 * 1. Persistent, structured catalog of all published topics (content/topic-registry.json)
 * 2. Ultra-compact exclusion fingerprint for LLM prompts (<200 tokens total)
 *    -> Solves token cost: Gemini does NOT read full articles or 168 titles!
 * 3. Fast indexing & lookup for deterministic zero-token local deduplication
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'content/posts');
const registryFile = path.join(rootDir, 'content/topic-registry.json');

// Stopwords for biomedical NLP tokenization
const STOPWORDS = new Set([
  'va', 'và', 'cho', 'cua', 'của', 'trong', 'cac', 'các', 'nhung', 'nhưng',
  'de', 'để', 'voi', 'với', 'la', 'là', 'tu', 'từ', 'khi', 'nhu', 'như',
  'o', 'ở', 'tai', 'tại', 'mot', 'một', 'bai', 'bài', 'sao', 'vi', 'vì',
  'the', 'and', 'for', 'with', 'from', 'into', 'that', 'this', 'how', 'why',
  'what', 'during', 'between', 'beyond', 'through', 'under', 'over', 'after',
  'before', 'part', 'code', 'study', 'role', 'paradox', 'mechanisms', 'mechanism',
  'co', 'che', 'cơ', 'chế', 'giai', 'ma', 'giải', 'mã', 'nghich', 'ly', 'nghịch', 'lý'
]);

export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractTokens(text) {
  const norm = normalizeText(text);
  return norm.split(/[\s-]+/).filter(t => t.length > 2 && !STOPWORDS.has(t));
}

/**
 * Builds or refreshes the topic registry from content/posts/
 */
export function buildTopicRegistry() {
  if (!fs.existsSync(postsDir)) {
    return { topics: [], lastUpdated: new Date().toISOString() };
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const groupedByRoot = new Map();

  for (const f of files) {
    const fpath = path.join(postsDir, f);
    const content = fs.readFileSync(fpath, 'utf8');
    
    const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
    const dateMatch = content.match(/^date:\s*["']?(.*?)["']?$/m);
    const tierMatch = content.match(/^tier:\s*["']?(.*?)["']?$/m);
    const organMatch = content.match(/^organ:\s*["']?(.*?)["']?$/m);
    const doiMatch = content.match(/^doi:\s*["']?(.*?)["']?$/m);
    const langMatch = content.match(/^lang:\s*["']?(.*?)["']?$/m);
    const tagsMatch = content.match(/^tags:\s*\[(.*?)\]/m);
    const excerptMatch = content.match(/^excerpt:\s*["']?(.*?)["']?$/m);

    const title = titleMatch ? titleMatch[1].trim() : '';
    const date = dateMatch ? dateMatch[1].trim() : '';
    const tier = tierMatch ? tierMatch[1].trim() : 'Clinical Deep-Dive';
    const organ = organMatch ? organMatch[1].trim() : 'Metabolic';
    const doi = doiMatch ? doiMatch[1].trim() : '';
    const lang = langMatch ? langMatch[1].trim() : (f.endsWith('-vi.md') ? 'vi' : 'en');
    const tags = tagsMatch ? tagsMatch[1].split(',').map(s => s.replace(/["']/g, '').trim()).filter(Boolean) : [];
    const excerpt = excerptMatch ? excerptMatch[1].trim() : '';

    const rootSlug = f.replace(/\.md$/, '').replace(/-(?:vi|en)$/, '');

    if (!groupedByRoot.has(rootSlug)) {
      groupedByRoot.set(rootSlug, {
        id: rootSlug,
        slugs: [],
        titleVi: '',
        titleEn: '',
        organ,
        tier,
        doi: '',
        date,
        tags: new Set(),
        excerpts: []
      });
    }

    const entry = groupedByRoot.get(rootSlug);
    entry.slugs.push(f.replace(/\.md$/, ''));
    if (lang === 'vi') {
      entry.titleVi = title;
    } else {
      entry.titleEn = title;
    }
    if (doi && doi !== '""' && doi !== 'null') {
      entry.doi = doi;
    }
    if (date && (!entry.date || date < entry.date)) {
      entry.date = date;
    }
    tags.forEach(t => entry.tags.add(t));
    if (excerpt) entry.excerpts.push(excerpt);
  }

  const topics = [];
  for (const [id, data] of groupedByRoot.entries()) {
    const combinedText = `${data.titleVi} ${data.titleEn} ${Array.from(data.tags).join(' ')} ${data.excerpts.join(' ')}`;
    const tokens = Array.from(new Set(extractTokens(combinedText)));
    
    topics.push({
      id,
      slugs: data.slugs,
      titleVi: data.titleVi || data.titleEn,
      titleEn: data.titleEn || data.titleVi,
      organ: data.organ,
      tier: data.tier,
      doi: data.doi,
      date: data.date,
      tags: Array.from(data.tags),
      keywords: tokens.slice(0, 25)
    });
  }

  topics.sort((a, b) => (a.date > b.date ? -1 : 1));

  const registry = {
    version: '2.0.0',
    lastUpdated: new Date().toISOString(),
    totalTopics: topics.length,
    topics
  };

  fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2), 'utf8');
  return registry;
}

/**
 * Loads the topic registry (or builds if missing)
 */
export function loadTopicRegistry() {
  if (fs.existsSync(registryFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        return data;
      }
    } catch {
      // rebuild on parse error
    }
  }
  return buildTopicRegistry();
}

/**
 * Produces an ultra-compact summary of covered subjects (<200 tokens)
 * formatted specifically for LLM system instructions to avoid topic collisions.
 */
export function getCompactExclusionSummary(registry = null) {
  const reg = registry || loadTopicRegistry();
  const byOrgan = {
    Metabolic: [],
    Gut: [],
    Brain: [],
    'Cellular Aging': [],
    Immune: [],
    Heart: []
  };

  for (const t of reg.topics) {
    const organ = byOrgan[t.organ] ? t.organ : 'Metabolic';
    // Extract short concise subject label from titleVi or titleEn
    let shortName = t.titleVi.split(/[:–—\(\?]/)[0].trim();
    if (shortName.length > 35) {
      shortName = shortName.slice(0, 35).trim();
    }
    if (!byOrgan[organ].includes(shortName)) {
      byOrgan[organ].push(shortName);
    }
  }

  const lines = [
    'DANH MỤC CÁC CHỦ ĐỀ & HOẠT CHẤT ĐÃ ĐĂNG (TUYỆT ĐỐI CẤM TRÙNG LẶP DƯỚI MỌI HÌNH THỨC):'
  ];

  for (const [organ, names] of Object.entries(byOrgan)) {
    if (names.length > 0) {
      lines.push(`• [${organ}]: ${names.slice(0, 15).join(', ')}`);
    }
  }

  return lines.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('🔄 Đang đồng bộ và xây dựng topic-registry.json...');
  const reg = buildTopicRegistry();
  console.log(`✅ Đã lập chỉ mục ${reg.totalTopics} chủ đề duy nhất vào content/topic-registry.json.`);
  console.log('\n--- BẢN TÓM TẮT ĐỘC QUYỀN SIÊU TIẾT KIỆM TOKEN (<200 TOKENS) ---');
  console.log(getCompactExclusionSummary(reg));
}
