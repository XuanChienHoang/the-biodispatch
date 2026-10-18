/**
 * Autonomous Hybrid Image Generation & Curation Module for Phytocodex
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Architecture:
 * 1. Pexels & Pixabay APIs: 100% Authentic, 4K High-Res Editorial Photography (Zero AI Slop)
 * 2. Hugging Face Serverless FLUX.1-schnell: Nature-grade 3D Molecular / Biochemical Visualizations
 * 3. Wikimedia Commons Open Scientific Photography: Zero-Key, Public Botanical & Anatomical Specimen Archive
 * 4. Curated Archetypes & Sharp Normalization: Guaranteed 16:9 (1280x720) Sharp Cover & WebP Thumbnails
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'public/images/posts');
const thumbsDir = path.join(rootDir, 'public/images/thumbs');
const coversDir = path.join(rootDir, 'public/images/covers');

// Ensure output directories exist
[imagesDir, thumbsDir, coversDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

/**
 * Đọc API keys từ process.env hoặc các file cấu hình cục bộ
 */
function resolveApiKeys() {
  const keys = {
    PEXELS_API_KEY: process.env.PEXELS_API_KEY || '',
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY || '',
    HF_TOKEN: process.env.HF_TOKEN || process.env.HUGGINGFACE_TOKEN || ''
  };

  const candidateEnvPaths = [
    path.resolve(rootDir, '.env.local'),
    path.resolve(rootDir, '.env'),
    'c:/Hoang\'s projects/03_DR_HOANG_CONTENT_AND_MEDIA/instagram_facts_studio/config.env'
  ];

  for (const envPath of candidateEnvPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
          const [key, ...vals] = trimmed.split('=');
          const cleanKey = key.trim();
          const cleanVal = vals.join('=').trim().replace(/^["']|["']$/g, '');
          if (cleanKey === 'PEXELS_API_KEY' && !keys.PEXELS_API_KEY) keys.PEXELS_API_KEY = cleanVal;
          if (cleanKey === 'PIXABAY_API_KEY' && !keys.PIXABAY_API_KEY) keys.PIXABAY_API_KEY = cleanVal;
          if ((cleanKey === 'HF_TOKEN' || cleanKey === 'HUGGINGFACE_TOKEN') && !keys.HF_TOKEN) keys.HF_TOKEN = cleanVal;
        }
      } catch (err) {
        // ignore read errors
      }
    }
  }

  return keys;
}

/**
 * Trích xuất từ khóa tìm kiếm hình ảnh thông minh từ chủ đề bài viết
 */
export function extractSmartImageKeywords(topic = {}) {
  const text = ((topic.titleEn || '') + ' ' + (topic.titleVi || '') + ' ' + (topic.tags || []).join(' ')).toLowerCase();

  const HERB_KEYWORDS = [
    { pattern: /ginkgo/i, query: 'Ginkgo biloba medicinal leaf' },
    { pattern: /berberin/i, query: 'Berberis plant medicinal root' },
    { pattern: /curcumin|turmeric|nghệ/i, query: 'Curcuma longa rhizome turmeric' },
    { pattern: /ashwagandha|sâm ấn độ/i, query: 'Withania somnifera Ashwagandha plant' },
    { pattern: /rhodiola|rễ vàng/i, query: 'Rhodiola rosea golden root' },
    { pattern: /ginseng|nhân sâm/i, query: 'Panax ginseng root herbal' },
    { pattern: /green tea|trà xanh|epigallocatechin|egcg|theanine/i, query: 'Fresh Camellia sinensis green tea leaves' },
    { pattern: /resveratrol/i, query: 'Red grapes polygonum cuspidatum resveratrol' },
    { pattern: /sulforaphane|bông cải xanh|broccoli/i, query: 'Broccoli sprouts Brassica oleracea sulforaphane' },
    { pattern: /quercetin/i, query: 'Flavonoid antioxidant botanical plants quercetin' },
    { pattern: /milk thistle|kế sữa|silymarin/i, query: 'Silybum marianum milk thistle botanical' },
    { pattern: /garlic|tỏi|allicin/i, query: 'Allium sativum fresh garlic botanical' },
    { pattern: /ginger|gừng/i, query: 'Zingiber officinale fresh ginger root' },
    { pattern: /cinnamon|quế/i, query: 'Cinnamomum verum true cinnamon bark' },
    { pattern: /rosemary|hương thảo/i, query: 'Rosmarinus officinalis fresh rosemary herb' }
  ];

  for (const h of HERB_KEYWORDS) {
    if (h.pattern.test(text)) return h.query;
  }

  // Lifestyle keywords
  if (/walk|đi bộ|exercise|tập luyện|hiit/i.test(text)) return 'morning outdoor walking healthy vitality sunlight';
  if (/sleep|giấc ngủ|circadian|nhịp sinh học|melatonin/i.test(text)) return 'peaceful natural sleep bedroom darkness circadian';
  if (/nhai|ăn rau|cơm nguội|tinh bột kháng|microbiome|gut|ruột/i.test(text)) return 'fresh organic plant rich food healthy microbiome';
  if (/thở|vagus|thiền|breath/i.test(text)) return 'calm meditation breathing fresh morning air';
  if (/cold|nước lạnh|sauna|nhiệt/i.test(text)) return 'cold plunge hydrotherapy wellness recovery';
  if (/ánh sáng xanh|blue light/i.test(text)) return 'circadian night screen evening ambient lighting';

  // Organ fallbacks
  const organ = topic.organ || 'Metabolic';
  const ORGAN_QUERIES = {
    Cardiovascular: 'cardiovascular healthy circulation clinical science',
    Brain: 'human brain neuroscience cognitive synaptic vitality',
    Gut: 'healthy intestinal microbiome plant based biology',
    Metabolic: 'cellular energy metabolic mitochondrial vitality',
    'Cellular Aging': 'cellular longevity mitochondria laboratory science',
    Immunity: 'cellular immunity leukocyte defense laboratory science',
    Liver: 'healthy hepatic metabolism clean nutrition vitality'
  };

  return ORGAN_QUERIES[organ] || 'medicinal botany laboratory scientific vitality';
}

/**
 * Xây dựng prompt FLUX 3D cho các cơ chế phân tử vi thể
 */
function buildFluxPrompt(topic = {}) {
  const organ = topic.organ || 'Metabolic';
  const title = topic.titleEn || topic.titleVi || 'Biomedical Discovery';

  return `Nature-grade 3D scientific visualization: Molecular mechanism of ${title}. High-end biomedical rendering of ${organ} physiological pathways, subtle bioluminescent glow, volumetric depth of field, electron microscopy precision, cellular structures, ultra-fine detailing, scientific accuracy, cinematic lighting, 8k render, absolutely no text, no watermarks, 16:9 aspect ratio.`;
}

/**
 * 1. Tải ảnh thực tế chất lượng cao từ Pexels API (20.000 req/tháng miễn phí)
 */
async function fetchFromPexels(keyword, apiKey) {
  if (!apiKey) return null;
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&orientation=landscape&size=large&per_page=5`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey, 'User-Agent': 'Phytocodex-Engine/2.0' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const photos = data.photos || [];
    if (!photos.length) return null;

    // Chọn ảnh ngẫu nhiên trong top 3
    const photo = photos[Math.floor(Math.random() * Math.min(3, photos.length))];
    const imgUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
    if (!imgUrl) return null;

    const imgRes = await fetch(imgUrl);
    if (!imgRes.ok) return null;
    const arrayBuffer = await imgRes.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.warn(`[Pexels API Warning]: ${err.message}`);
    return null;
  }
}

/**
 * 2. Tải ảnh thực tế chất lượng cao từ Pixabay API (5.000 req/giờ miễn phí)
 */
async function fetchFromPixabay(keyword, apiKey) {
  if (!apiKey) return null;
  try {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(keyword)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Phytocodex-Engine/2.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    const hits = data.hits || [];
    if (!hits.length) return null;

    const hit = hits[Math.floor(Math.random() * Math.min(3, hits.length))];
    const imgUrl = hit.largeImageURL || hit.webformatURL;
    if (!imgUrl) return null;

    const imgRes = await fetch(imgUrl);
    if (!imgRes.ok) return null;
    const arrayBuffer = await imgRes.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.warn(`[Pixabay API Warning]: ${err.message}`);
    return null;
  }
}

/**
 * 3. Sinh ảnh phân tử 3D vi thể qua Hugging Face FLUX.1-schnell (Serverless miễn phí)
 */
async function generateFromHuggingFaceFlux(prompt, hfToken) {
  if (!hfToken) return null;
  try {
    const url = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.warn(`[Hugging Face FLUX Warning]: ${err.message}`);
    return null;
  }
}

/**
 * 4. Tải ảnh tiêu bản thực vật & y sinh học từ Wikimedia Commons (Không cần Key, 100% Mở)
 */
async function fetchFromWikimediaCommons(keyword) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(keyword + ' jpg')}&prop=imageinfo&iiprop=url|size&format=json&gsrlimit=5`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Phytocodex-Bot/2.0 (contact: info@phytocodex.com)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});

    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (info && info.width >= 1000 && !info.url.endsWith('.svg')) {
        const imgRes = await fetch(info.url, {
          headers: { 'User-Agent': 'Phytocodex-Bot/2.0' }
        });
        if (imgRes.ok) {
          const arrayBuffer = await imgRes.arrayBuffer();
          return Buffer.from(arrayBuffer);
        }
      }
    }
  } catch (err) {
    console.warn(`[Wikimedia Commons Warning]: ${err.message}`);
  }
  return null;
}

/**
 * Chuẩn hóa ảnh về tỷ lệ vàng 16:9 (1280x720) và tự động sinh thumbnail WebP song song
 */
async function processAndSaveImage(rawBuffer, slug) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  const thumbPath = path.join(thumbsDir, `${slug}.webp`);
  const coverPath = path.join(coversDir, `${slug}.webp`);

  // Lưu file ảnh gốc chuẩn hóa 16:9 JPEG
  await sharp(rawBuffer)
    .resize(1280, 720, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85 })
    .toFile(targetPath);

  // Tự động sinh luôn thumbnail và cover WebP cho giao diện Next.js
  await sharp(targetPath)
    .resize(720, 405, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(thumbPath);

  await sharp(targetPath)
    .resize(1280, 720, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(coverPath);

  return targetPath;
}

/**
 * Điều phối sinh / thu thập ảnh độc bản cho bài viết mới
 */
export async function generateDispatchImage(slug, topic = {}) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }

  const { PEXELS_API_KEY, PIXABAY_API_KEY, HF_TOKEN } = resolveApiKeys();
  const keyword = extractSmartImageKeywords(topic);
  const isMolecularMechanism = (topic.tier === 'Deep Phyto' || topic.tier === 'Mechanism' || /pathway|enzyme|receptor|kinase|glut4|ampk/i.test(topic.titleEn || ''));

  console.log(`📸 [Image Engine] Khởi chạy tìm kiếm ảnh chất lượng cao cho "${slug}" (Keyword: "${keyword}")...`);

  // TẦNG 1: Nếu là cơ chế phân tử sâu và có HF_TOKEN -> Dùng FLUX.1 3D
  if (isMolecularMechanism && HF_TOKEN) {
    console.log(`🧬 [Image Engine] Chủ đề cơ chế vi thể -> Kích hoạt FLUX.1-schnell 3D qua Hugging Face...`);
    const prompt = buildFluxPrompt(topic);
    const fluxBuffer = await generateFromHuggingFaceFlux(prompt, HF_TOKEN);
    if (fluxBuffer && fluxBuffer.length > 20000) {
      await processAndSaveImage(fluxBuffer, slug);
      console.log(`✅ [Image Engine] Đã tạo thành công ảnh 3D phân tử FLUX.1 -> ${slug}.jpg`);
      return targetPath;
    }
  }

  // TẦNG 2: Pexels API (Nhiếp ảnh thực tế 4K không mùi AI)
  if (PEXELS_API_KEY) {
    console.log(`🌿 [Image Engine] Đang tìm kiếm ảnh nhiếp ảnh thực tế 4K qua Pexels API...`);
    const pexelsBuffer = await fetchFromPexels(keyword, PEXELS_API_KEY);
    if (pexelsBuffer && pexelsBuffer.length > 20000) {
      await processAndSaveImage(pexelsBuffer, slug);
      console.log(`✅ [Image Engine] Đã tải và chuẩn hóa ảnh Pexels 4K -> ${slug}.jpg`);
      return targetPath;
    }
  }

  // TẦNG 3: Pixabay API (Nhiếp ảnh y sinh & dược liệu thực tế)
  if (PIXABAY_API_KEY) {
    console.log(`🌱 [Image Engine] Đang tìm kiếm ảnh dược liệu / y sinh qua Pixabay API...`);
    const pixabayBuffer = await fetchFromPixabay(keyword, PIXABAY_API_KEY);
    if (pixabayBuffer && pixabayBuffer.length > 20000) {
      await processAndSaveImage(pixabayBuffer, slug);
      console.log(`✅ [Image Engine] Đã tải và chuẩn hóa ảnh Pixabay -> ${slug}.jpg`);
      return targetPath;
    }
  }

  // TẦNG 4: Wikimedia Commons (Kho ảnh tiêu bản khoa học mở, không cần Key)
  console.log(`🔬 [Image Engine] Tìm kiếm kho tư liệu ảnh khoa học thực tế mở (Wikimedia Commons)...`);
  const wikiBuffer = await fetchFromWikimediaCommons(keyword);
  if (wikiBuffer && wikiBuffer.length > 20000) {
    await processAndSaveImage(wikiBuffer, slug);
    console.log(`✅ [Image Engine] Đã lấy và chuẩn hóa ảnh khoa học mở -> ${slug}.jpg`);
    return targetPath;
  }

  // TẦNG 5: Curated Archetype Fallback (Nếu mạng timeout hoặc offline hoàn toàn)
  console.warn(`⚠️ [Image Engine] Không tải được ảnh ngoài. Chuyển sang ảnh mẫu Archetype.`);
  return null;
}
