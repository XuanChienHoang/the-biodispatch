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
    { pattern: /garlic|tỏi|allicin/i, query: 'Allium sativum garlic' },
    { pattern: /ginger|gừng/i, query: 'Zingiber officinale ginger' },
    { pattern: /cinnamon|quế/i, query: 'Cinnamomum cinnamon bark' },
    { pattern: /rosemary|hương thảo/i, query: 'Rosmarinus officinalis rosemary' },
    { pattern: /phosphatidylserine|dha|omega-3|omega 3|phospholipid/i, query: 'neuron synapse brain cell' },
    { pattern: /h5n1|influenza|cúm|avian flu|virus|respiratory/i, query: 'influenza virus transmission' },
    { pattern: /yersinia|pestis|t3ss|kháng sinh|vi khuẩn|bacteria/i, query: 'bacteria cellular microbiology' },
    { pattern: /glut4|glucose|insulin|đường huyết|tiểu đường/i, query: 'blood glucose metabolism cell' }
  ];

  for (const h of HERB_KEYWORDS) {
    if (h.pattern.test(text)) return h.query;
  }

  // Lifestyle keywords (Ngắn gọn để Openverse & Pexels tìm chính xác 100%)
  if (/walk|đi bộ|exercise|tập luyện|hiit/i.test(text)) return 'outdoor morning walking sunlight';
  if (/sleep|giấc ngủ|circadian|nhịp sinh học|melatonin/i.test(text)) return 'peaceful sleeping bedroom night';
  if (/nhai|ăn rau|cơm nguội|tinh bột kháng|microbiome|gut|ruột/i.test(text)) return 'healthy organic vegetables salad';
  if (/thở|vagus|thiền|breath/i.test(text)) return 'calm meditation breathing nature';
  if (/cold|nước lạnh|sauna|nhiệt/i.test(text)) return 'cold plunge wellness water';
  if (/ánh sáng xanh|blue light/i.test(text)) return 'screen evening lighting';

  // Organ fallbacks (Tối đa 2-3 từ khóa chuẩn xác cao)
  const organ = topic.organ || 'Metabolic';
  const ORGAN_QUERIES = {
    Cardiovascular: 'heart vascular circulation',
    Brain: 'human brain neuron',
    Gut: 'healthy intestinal microbiome',
    Metabolic: 'cellular metabolism mitochondria',
    'Cellular Aging': 'cell mitochondria longevity',
    Immunity: 'immune cell microbiology',
    Liver: 'liver metabolism health'
  };

  return ORGAN_QUERIES[organ] || 'medicinal botany laboratory';
}

/**
 * Xây dựng prompt FLUX 3D cho các cơ chế phân tử vi thể và khoa học thường thức
 */
function buildFluxPrompt(topic = {}) {
  const organ = topic.organ || 'Metabolic';
  const title = topic.titleEn || topic.titleVi || 'Biomedical Discovery';
  const isLifeDispatch = (topic.tier === 'Life Dispatch' || topic.tier === 'life');

  if (isLifeDispatch) {
    return `Nature-grade cinematic scientific visualization: ${title}. High-end biomedical and physiological concept, depicting human ${organ} health, vibrant natural lighting, elegant laboratory or anatomical atmosphere, volumetric depth of field, photorealistic, 8k resolution, cinematic composition, absolutely no text, no labels, no watermarks, 16:9 aspect ratio.`;
  }

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
 * 3. Sinh ảnh phân tử 3D vi thể qua FLUX.1 (Hỗ trợ cả HF Token và Serverless FLUX.1 mở chất lượng cao)
 */
async function generateFromFluxServerless(prompt, hfToken = '') {
  // 1. Thử qua Hugging Face FLUX.1-schnell nếu có Token
  if (hfToken) {
    try {
      const url = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

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

      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const buf = Buffer.from(arrayBuffer);
        if (buf.length > 25000) return buf;
      }
    } catch (err) {
      console.warn(`[Hugging Face FLUX Warning]: ${err.message}`);
    }
  }

  // 2. Tầng FLUX.1 Serverless Mở (Zero-Key, Black Forest Labs FLUX architecture, 1280x720 16:9, không logo)
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const cleanPrompt = encodeURIComponent(prompt.slice(0, 450));
    const url = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1280&height=720&model=flux&nologo=true&seed=${seed}`;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 70000); // 70s timeout cho FLUX render

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Phytocodex-Engine/2.0'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const buf = Buffer.from(arrayBuffer);
      if (buf.length > 25000) {
        return buf;
      }
    }
  } catch (err) {
    console.warn(`[FLUX.1 Open Endpoint Warning]: ${err.message}`);
  }

  return null;
}

/**
 * 4. Tải ảnh tiêu bản thực vật & y sinh học từ Wikimedia Commons (Không cần Key, 100% Mở)
 */
async function fetchFromWikimediaCommons(keyword) {
  try {
    const cleanQuery = `${keyword} -schema -diagram -clipart -drawing -icon`;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(cleanQuery)}&prop=imageinfo&iiprop=url|size&format=json&gsrlimit=10`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Phytocodex-Bot/2.0 (contact: info@phytocodex.com)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});

    for (const p of pages) {
      const title = (p.title || '').toLowerCase();
      // Loại bỏ tranh vẽ sơ đồ, biểu đồ thô sơ
      if (/schema|diagram|drawing|clipart|icon|vector|symbol/i.test(title)) continue;

      const info = p.imageinfo?.[0];
      if (info && info.width >= 800 && !info.url.endsWith('.svg') && !info.url.endsWith('.gif')) {
        const imgRes = await fetch(info.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (imgRes.ok) {
          const arrayBuffer = await imgRes.arrayBuffer();
          const buf = Buffer.from(arrayBuffer);
          if (buf.length > 30000) return buf;
        }
      }
    }
  } catch (err) {
    console.warn(`[Wikimedia Commons Warning]: ${err.message}`);
  }
  return null;
}

/**
 * 5. Tải ảnh nhiếp ảnh mở chất lượng cao từ Openverse (WordPress Foundation - Hoàn toàn không cần Key)
 */
async function fetchFromOpenverse(keyword) {
  try {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(keyword)}&page_size=5`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Phytocodex-Engine/2.0 (contact: info@phytocodex.com)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results || [];

    for (const item of results) {
      const title = (item.title || '').toLowerCase();
      if (/schema|diagram|drawing|clipart|icon|vector|symbol/i.test(title)) continue;

      if (item.url && !item.url.endsWith('.svg') && !item.url.endsWith('.gif')) {
        try {
          const imgRes = await fetch(item.url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
          });
          if (imgRes.ok) {
            const arrayBuffer = await imgRes.arrayBuffer();
            const buf = Buffer.from(arrayBuffer);
            if (buf.length > 25000) return buf;
          }
        } catch (e) {
          // ignore single item fetch failure
        }
      }
    }
  } catch (err) {
    console.warn(`[Openverse Warning]: ${err.message}`);
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

  // TẦNG 1: Sinh ảnh 3D phân tử / y sinh cao cấp qua FLUX.1 Serverless (Tự động độc bản 100%)
  console.log(`🧬 [Image Engine] Kích hoạt FLUX.1 3D Biomedical Visualization cho "${slug}"...`);
  const fluxPrompt = buildFluxPrompt(topic);
  const fluxBuffer = await generateFromFluxServerless(fluxPrompt, HF_TOKEN);
  if (fluxBuffer && fluxBuffer.length > 20000) {
    await processAndSaveImage(fluxBuffer, slug);
    console.log(`✅ [Image Engine] Đã tạo thành công ảnh 3D y sinh độc bản FLUX.1 -> ${slug}.jpg`);
    return targetPath;
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

  // TẦNG 4: Openverse (WordPress Foundation - Hơn 700 triệu ảnh CC chất lượng cao, không cần Key)
  console.log(`🌐 [Image Engine] Tìm kiếm ảnh nhiếp ảnh thực tế qua Openverse (Keyless)...`);
  const openverseBuffer = await fetchFromOpenverse(keyword);
  if (openverseBuffer && openverseBuffer.length > 20000) {
    await processAndSaveImage(openverseBuffer, slug);
    console.log(`✅ [Image Engine] Đã lấy và chuẩn hóa ảnh Openverse -> ${slug}.jpg`);
    return targetPath;
  }

  // TẦNG 5: Wikimedia Commons (Kho ảnh tiêu bản khoa học mở, không cần Key)
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
