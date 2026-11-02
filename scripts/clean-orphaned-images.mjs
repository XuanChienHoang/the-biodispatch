/**
 * Clean Orphaned Images
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Removes any image files in public/images/posts, covers, thumbs
 * that do not have a corresponding post in content/posts and are not seed articles.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const postsDir = path.join(rootDir, 'content/posts');
const imagesPostsDir = path.join(rootDir, 'public/images/posts');
const imagesCoversDir = path.join(rootDir, 'public/images/covers');
const imagesThumbsDir = path.join(rootDir, 'public/images/thumbs');

const SEED_SLUGS = new Set([
  'curcumin-piperine-bioavailability',
  'policosanol-versus-statins',
  'berberine-ampk-activation',
  'quercetin-senolytic-aging',
  'sulforaphane-nrf2-window',
  'resveratrol-sirt1-longevity',
  'ashwagandha-cortisol-hpa',
  'rhodiola-salidroside-fatigue'
]);

export function cleanOrphanedImages() {
  if (!fs.existsSync(postsDir) || !fs.existsSync(imagesPostsDir)) return 0;

  const validSlugs = new Set(SEED_SLUGS);
  for (const f of fs.readdirSync(postsDir)) {
    if (f.endsWith('.md')) validSlugs.add(f.replace(/\.md$/, ''));
  }

  let cleaned = 0;
  for (const f of fs.readdirSync(imagesPostsDir)) {
    if (!f.endsWith('.jpg')) continue;
    const slug = f.replace(/\.jpg$/, '');
    if (!validSlugs.has(slug)) {
      console.log(`🧹 [Orphan Cleanup] Xóa ảnh mồ côi: ${slug}`);
      [
        path.join(imagesPostsDir, `${slug}.jpg`),
        path.join(imagesCoversDir, `${slug}.webp`),
        path.join(imagesThumbsDir, `${slug}.webp`)
      ].forEach(p => {
        if (fs.existsSync(p)) {
          fs.unlinkSync(p);
          cleaned++;
        }
      });
    }
  }

  if (cleaned > 0) {
    console.log(`✅ [Orphan Cleanup] Đã dọn dẹp ${cleaned} tệp ảnh không có bài viết.`);
  } else {
    console.log('✅ [Orphan Cleanup] Kho ảnh đồng bộ 100% với bài viết, không có tệp mồ côi.');
  }
  return cleaned;
}

if (process.argv[1] && process.argv[1].endsWith('clean-orphaned-images.mjs')) {
  cleanOrphanedImages();
}
