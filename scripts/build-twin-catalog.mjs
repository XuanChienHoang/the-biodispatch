import fs from 'fs';
import path from 'path';

const postsDir = path.resolve('content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const articles = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(postsDir, f), 'utf8');
  const slug = f.replace('.md', '');
  const doiM = content.match(/doi:\s*["']?([^"'\n]+)["']?/);
  const dateM = content.match(/date:\s*["']?([^"'\n]+)["']?/);
  const titleM = content.match(/title:\s*"([^"]+)"/);
  const langM = content.match(/lang:\s*["']?([^"'\n]+)["']?/);
  const isVi = langM ? langM[1] === 'vi' : (
    slug.endsWith('-vi') ||
    slug.includes('sinh-kha-dung') ||
    slug.includes('mo-nau') ||
    slug.includes('sinh-nhiet') ||
    /^(anh-nang|qua-mong|ngat-quang|nhai-ky|so-co-la|uong-ly|tam-rung|ngu-trua|xong-hoi|nhip-tho)/.test(slug)
  );
  articles.push({ slug, doi: doiM?.[1]?.trim(), date: dateM?.[1]?.trim(), title: titleM?.[1] || slug, isVi });
}

const viArticles = articles.filter(a => a.isVi);
const enArticles = articles.filter(a => !a.isVi);

const twinMap = {};

for (const vi of viArticles) {
  // 1. Direct suffix
  let en = enArticles.find(b => b.slug === vi.slug.replace(/-vi$/, '-en'));
  // 2. DOI
  if (!en && vi.doi) {
    en = enArticles.find(b => b.doi && b.doi.toLowerCase() === vi.doi.toLowerCase());
  }
  // 3. Date
  if (!en && vi.date) {
    en = enArticles.find(b => b.date === vi.date);
  }
  // 4. Stem
  if (!en) {
    const stem = vi.slug.replace(/-(vi|en)$/, '');
    en = enArticles.find(b => b.slug.startsWith(stem) || stem.startsWith(b.slug.replace(/-(vi|en)$/, '')));
  }

  if (en) {
    twinMap[vi.slug] = { slug: en.slug, lang: 'en', title: en.title };
    twinMap[en.slug] = { slug: vi.slug, lang: 'vi', title: vi.title };
  }
}

const catalogContent = `/**
 * Precompiled Bilingual Twin Catalog for Phytocodex
 * Maps each article slug to its exact bilingual counterpart.
 */

export interface TwinInfo {
  slug: string;
  lang: "vi" | "en";
  title: string;
}

export const TWIN_CATALOG: Record<string, TwinInfo> = ${JSON.stringify(twinMap, null, 2)};

export function resolveTwin(currentSlug: string): TwinInfo | null {
  if (TWIN_CATALOG[currentSlug]) {
    return TWIN_CATALOG[currentSlug];
  }

  // Runtime heuristic fallback for newly published articles
  if (currentSlug.endsWith("-vi")) {
    const enSlug = currentSlug.replace(/-vi$/, "-en");
    return {
      slug: enSlug,
      lang: "en",
      title: "English Edition"
    };
  }

  if (currentSlug.endsWith("-en")) {
    const viSlug = currentSlug.replace(/-en$/, "-vi");
    return {
      slug: viSlug,
      lang: "vi",
      title: "Phiên bản Tiếng Việt"
    };
  }

  return null;
}
`;

fs.writeFileSync('src/lib/twin-catalog.ts', catalogContent, 'utf8');
console.log(`✅ Đã tạo src/lib/twin-catalog.ts với ${Object.keys(twinMap).length} liên kết song ngữ hai chiều!`);
