import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/components/Citation.tsx',
  'src/app/layout.tsx',
  'src/app/sitemap.xml/route.ts',
  'src/app/robots.txt/route.ts',
  'src/app/feed.xml/route.ts',
  'src/app/blog/[slug]/page.tsx',
  'src/app/api/og/route.tsx',
];

for (const rel of filesToUpdate) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) continue;
  let content = fs.readFileSync(full, 'utf8');
  const count = (content.match(/phytocodex\.vercel\.app/g) || []).length;
  if (count > 0) {
    content = content.replace(/phytocodex\.vercel\.app/g, 'www.phyto-codex.org');
    fs.writeFileSync(full, content, 'utf8');
    console.log(`Updated ${rel}: replaced ${count} occurrences`);
  }
}
