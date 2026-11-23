/**
 * Topic & Entity Registry for Phytocodex (v3.0)
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 *
 * Provides:
 * 1. Always-fresh, structured catalog of all published topics (content/topic-registry.json)
 * 2. Complete, non-truncated exclusion fingerprint for LLM prompts (covers 100% of VI topics)
 * 3. Recent dispatch context (latest titles, organs, opening hooks) to enforce rotation & variety
 * 4. Fast indexing & phrase normalization for deterministic zero-token local deduplication
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
  'va', 'cho', 'cua', 'trong', 'cac', 'nhung', 'de', 'voi', 'la', 'tu', 'khi', 'nhu',
  'tai', 'mot', 'bai', 'sao', 'vi', 'ban', 'cach', 'giup', 'lam', 'gi', 'nao', 'hay',
  'cung', 'hon', 'den', 've', 'nay', 'do', 'khong', 'nhieu', 'moi', 'ngay', 'nguoi',
  'the', 'and', 'for', 'with', 'from', 'into', 'that', 'this', 'how', 'why', 'your',
  'what', 'during', 'between', 'beyond', 'through', 'under', 'over', 'after', 'before',
  'part', 'code', 'study', 'role', 'paradox', 'mechanisms', 'mechanism', 'story', 'secret',
  'truth', 'guide', 'health', 'healthy', 'body', 'cells', 'cellular', 'protect', 'protects',
  'co', 'che', 'giai', 'ma', 'nghich', 'ly', 'su', 'that', 'bi', 'mat', 'cau', 'chuyen',
  'hien', 'tuong', 'nguy', 'co', 'bao', 've', 'suc', 'khoe', 'te', 'bao', 'phan', 'tu'
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

/**
 * Phrase normalizer: converts hyphens & underscores to spaces so multi-word
 * tokens like "ro-ri-ruot" match "hoi chung ro ri ruot" reliably.
 */
export function normalizePhrase(text) {
  return normalizeText(text)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractTokens(text) {
  const norm = normalizePhrase(text);
  return norm.split(/\s+/).filter(t => t.length > 2 && !STOPWORDS.has(t));
}

/**
 * Builds or refreshes the topic registry from content/posts/
 */
export function buildTopicRegistry() {
  if (!fs.existsSync(postsDir)) {
    return { version: '3.0.0', fileCount: 0, topics: [], lastUpdated: new Date().toISOString() };
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).sort();
  const groupedByRoot = new Map();

  for (const f of files) {
    const fpath = path.join(postsDir, f);
    const content = fs.readFileSync(fpath, 'utf8');
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const fm = fmMatch ? fmMatch[1] : content;
    const body = fmMatch ? content.slice(fmMatch[0].length).trim() : '';

    const getField = (name) => {
      const m = fm.match(new RegExp(`^${name}:\\s*["']?(.*?)["']?\\s*$`, 'm'));
      return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
    };

    const title = getField('title');
    const date = getField('date');
    const tier = getField('tier') || 'Clinical Deep-Dive';
    const organ = getField('organ') || 'Metabolic';
    const doi = getField('doi');
    const lang = getField('lang') || (f.endsWith('-vi.md') ? 'vi' : 'en');
    const tagsMatch = fm.match(/^tags:\s*\[(.*?)\]/m);
    const tags = tagsMatch ? tagsMatch[1].split(',').map(s => s.replace(/["']/g, '').trim()).filter(Boolean) : [];
    const excerpt = getField('excerpt');

    // First narrative paragraph (lead/hook)
    const firstPara = body
      .split(/\r?\n\r?\n/)
      .map(p => p.trim())
      .find(p => p && !p.startsWith('![') && !p.startsWith('#') && !p.startsWith('>')) || '';
    const leadSnippet = firstPara.replace(/\s+/g, ' ').slice(0, 140);

    const rootSlug = f.replace(/\.md$/, '').replace(/-(?:vi|en)$/, '');

    if (!groupedByRoot.has(rootSlug)) {
      groupedByRoot.set(rootSlug, {
        id: rootSlug,
        slugs: [],
        titleVi: '',
        titleEn: '',
        lang,
        organ,
        tier,
        doi: '',
        date,
        tags: new Set(),
        excerpts: [],
        leadVi: ''
      });
    }

    const entry = groupedByRoot.get(rootSlug);
    entry.slugs.push(f.replace(/\.md$/, ''));
    if (lang === 'vi') {
      entry.titleVi = title;
      entry.lang = 'vi';
      if (leadSnippet) entry.leadVi = leadSnippet;
    } else {
      entry.titleEn = title;
    }
    if (doi && doi !== '""' && doi !== 'null') {
      entry.doi = doi;
    }
    if (date && (!entry.date || date > entry.date)) {
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
      lang: data.titleVi ? 'vi' : 'en',
      titleVi: data.titleVi || data.titleEn,
      titleEn: data.titleEn || data.titleVi,
      organ: data.organ,
      tier: data.tier,
      doi: data.doi,
      date: data.date,
      tags: Array.from(data.tags),
      leadVi: data.leadVi || '',
      keywords: tokens.slice(0, 30)
    });
  }

  topics.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  const registry = {
    version: '3.0.0',
    fileCount: files.length,
    lastUpdated: new Date().toISOString(),
    totalTopics: topics.length,
    topics
  };

  fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2), 'utf8');
  return registry;
}

/**
 * Loads the topic registry — automatically rebuilds if content/posts/*.md count changed
 * so the dedup guard and LLM exclusion prompt are NEVER stale.
 */
export function loadTopicRegistry(forceRebuild = false) {
  const liveFileCount = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).length
    : 0;

  if (!forceRebuild && fs.existsSync(registryFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
      if (
        data.version === '3.0.0' &&
        data.fileCount === liveFileCount &&
        Array.isArray(data.topics) &&
        data.topics.length > 0
      ) {
        return data;
      }
    } catch {
      // rebuild on parse error
    }
  }
  return buildTopicRegistry();
}

/**
 * Returns recent Vietnamese dispatches (titles, organs, opening hooks) so the generator
 * rotates organs, headline styles, and opening hooks instead of repeating recent patterns.
 */
export function getRecentDispatchContext(limit = 10, registry = null) {
  const reg = registry || loadTopicRegistry();
  const viTopics = reg.topics.filter(t => t.lang === 'vi');
  const recent = viTopics.slice(0, limit);
  return {
    recentTitlesVi: recent.map(t => t.titleVi),
    recentOrgans: recent.map(t => t.organ),
    recentOpenings: recent.map(t => t.leadVi).filter(Boolean)
  };
}

/**
 * Produces a COMPLETE, non-truncated exclusion summary covering 100% of published VI topics
 * (deduplicated by core subject phrase and grouped across ALL organs).
 */
export function getCompactExclusionSummary(registry = null) {
  const reg = registry || loadTopicRegistry();
  const viTopics = reg.topics.filter(t => t.lang === 'vi');

  const byOrgan = new Map();
  const seenFingerprints = new Set();

  for (const t of viTopics) {
    const organ = t.organ || 'Metabolic';
    if (!byOrgan.has(organ)) byOrgan.set(organ, []);

    // Extract concise subject label before colon/question mark
    let shortName = (t.titleVi || '').split(/[:?]/)[0].trim();
    if (shortName.length > 48) {
      shortName = shortName.slice(0, 48).trim();
    }
    const fp = normalizePhrase(shortName).split(' ').slice(0, 4).join(' ');
    if (!shortName || seenFingerprints.has(fp)) continue;
    seenFingerprints.add(fp);
    byOrgan.get(organ).push(shortName);
  }

  const lines = [
    `DANH MỤC TOÀN BỘ ${viTopics.length} CHỦ ĐỀ ĐÃ XUẤT BẢN (TUYỆT ĐỐI CẤM LẶP LẠI HOẶC VIẾT LẠI DƯỚI GÓC ĐỘ TƯƠNG TỰ):`
  ];

  for (const [organ, names] of byOrgan.entries()) {
    if (names.length > 0) {
      lines.push(`• [${organ}] (${names.length}): ${names.join(' | ')}`);
    }
  }

  const recent = getRecentDispatchContext(8, reg);
  if (recent.recentTitlesVi.length > 0) {
    lines.push('\n8 BÀI MỚI NHẤT VỪA ĐĂNG (KHÔNG lặp chủ đề, KHÔNG lặp kiểu đặt tựa đề, KHÔNG lặp cách mở bài):');
    recent.recentTitlesVi.forEach((title, idx) => {
      lines.push(`  ${idx + 1}. ${title}`);
    });
  }

  return lines.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('🔄 Đang đồng bộ và xây dựng topic-registry.json (v3.0)...');
  const reg = buildTopicRegistry();
  console.log(`✅ Đã lập chỉ mục ${reg.totalTopics} bản ghi (${reg.fileCount} files) vào content/topic-registry.json.`);
  console.log('\n--- BẢN TÓM TẮT LOẠI TRỪ ĐẦY ĐỦ 100% ---');
  console.log(getCompactExclusionSummary(reg));
}
