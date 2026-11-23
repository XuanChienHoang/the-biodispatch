/**
 * Autonomous Hybrid Image Generation & Curation Module for Phytocodex
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Architecture (v4.0 — Zero Content Mismatch & Editorial Quality Guarantee):
 * 1. Sanitized Deterministic Keyword Engine: Prevents Vietnamese false-friend idioms ("thời điểm vàng" != macula, "cầu sắt/gỉ sét", "nghệ thuật" != turmeric) and prioritizes exact title entities before organ fallbacks.
 * 2. Concise 2-4 Word & Unsplash-Filtered Queries: Optimized for Wikimedia Commons CirrusSearch `filetype:bitmap` with anti-archive/anti-pathology filters.
 * 3. Multi-Source High-Res Photography Acquisition: Pexels 4K -> Pixabay HD -> Wikimedia Commons (`filetype:bitmap` landscape >= 0.85 ratio) -> Curated 4K Editorial Library. (Dead Openverse Cloudflare-403 tier removed.)
 * 4. Universal Fail-Closed Gemini Vision Gatekeeper v4.0: EVERY candidate image must score >= 8.0/10 and pass strict rejection of cutouts (#FFF/#000), pathology jars, military/hospital beds, amateur flash, messy 2000s desks, burlap sacks, raw uncooked rice, and tree twigs. Never overrides Vision rejection when API key is configured.
 * 5. Perceptual + Cryptographic Dedup Guard: Combines MD5 hash + 16x16 RGB perceptual fingerprint (MAE) to block both identical files and near-identical shots.
 * 6. Procedural Monograph Fallback: Generates a 16:9 SVG monograph card only if all external sources fail.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
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

const VISION_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.7-flash',
  'gemini-3.8-flash',
  'gemma-4-31b-it'
];

/**
 * Đọc API keys từ process.env hoặc các file cấu hình cục bộ
 */
export function resolveApiKeys() {
  const keys = {
    PEXELS_API_KEY: process.env.PEXELS_API_KEY || '',
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    HF_TOKEN: process.env.HF_TOKEN || process.env.HUGGINGFACE_TOKEN || ''
  };

  const candidateEnvPaths = [
    path.resolve(rootDir, '.env.local'),
    path.resolve(rootDir, '.env'),
    "c:/Hoang's projects/03_DR_HOANG_CONTENT_AND_MEDIA/instagram_facts_studio/config.env"
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
          if ((cleanKey === 'GEMINI_API_KEY' || cleanKey === 'GOOGLE_API_KEY') && !keys.GEMINI_API_KEY) keys.GEMINI_API_KEY = cleanVal;
          if ((cleanKey === 'HF_TOKEN' || cleanKey === 'HUGGINGFACE_TOKEN') && !keys.HF_TOKEN) keys.HF_TOKEN = cleanVal;
        }
      } catch {
        // ignore read errors
      }
    }
  }

  return keys;
}

// In-memory cache for existing image fingerprints (MD5 + 16x16 RGB raw vector)
const fingerprintCache = new Map();

async function computeImageFingerprint(buf) {
  const normalizedBuf = await sharp(buf)
    .resize(1280, 720, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86 })
    .toBuffer();
  const md5 = crypto.createHash('md5').update(normalizedBuf).digest('hex');
  const tinyRgb = await sharp(normalizedBuf)
    .resize(16, 16, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer();
  return { md5, tinyRgb };
}

function calculateRgbMae(bufA, bufB) {
  if (!bufA || !bufB || bufA.length !== bufB.length) return 999;
  let sum = 0;
  for (let i = 0; i < bufA.length; i++) {
    sum += Math.abs(bufA[i] - bufB[i]);
  }
  return sum / bufA.length;
}

/**
 * Kiểm tra xem buffer ảnh có bị trùng lặp MD5 hoặc trùng lặp thị giác (Perceptual Fingerprint)
 * với bất kỳ bài viết nào khác hay không.
 */
export async function checkIfImageAlreadyUsed(rawBuffer, currentSlug = '') {
  const currentBase = currentSlug.replace(/-(vi|en)$/, '');

  let candidateFp;
  try {
    candidateFp = await computeImageFingerprint(rawBuffer);
  } catch {
    return true; // Reject unreadable/corrupt buffer
  }

  if (!fs.existsSync(imagesDir)) return false;
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

  for (const f of files) {
    const base = f.replace(/-(vi|en)\.jpg$/, '').replace(/\.jpg$/, '');
    if (base === currentBase) continue; // Cùng cặp song ngữ thì được phép

    const fullPath = path.join(imagesDir, f);
    try {
      const stat = fs.statSync(fullPath);
      const cacheKey = `${f}:${stat.mtimeMs}:${stat.size}`;
      let existingFp = fingerprintCache.get(cacheKey);
      if (!existingFp) {
        const existingBuf = fs.readFileSync(fullPath);
        existingFp = await computeImageFingerprint(existingBuf);
        fingerprintCache.set(cacheKey, existingFp);
      }

      if (existingFp.md5 === candidateFp.md5) {
        console.warn(`🛡️ [Dedup Guard] Ảnh tải về bị trùng hash MD5 với "${f}". Bỏ qua.`);
        return true;
      }

      const mae = calculateRgbMae(existingFp.tinyRgb, candidateFp.tinyRgb);
      if (mae < 14.0) {
        console.warn(`🛡️ [Perceptual Dedup Guard] Ảnh quá giống về mặt thị giác (MAE=${mae.toFixed(1)}) với "${f}". Bỏ qua.`);
        return true;
      }
    } catch {
      // ignore single file read error
    }
  }
  return false;
}

/**
 * Làm sạch các cụm từ đồng âm tiếng Việt dễ gây bắt nhầm từ khóa thực vật/thực phẩm/ẩn dụ
 * Ví dụ: "thời điểm vàng" != điểm vàng mắt; "nghệ thuật" != củ nghệ; "tỉnh táo" != quả táo
 */
function sanitizeVietnameseFalseFriends(rawText = '') {
  return rawText
    .toLowerCase()
    .replace(/thời\s+điểm\s+vàng|thoi-diem-vang|giờ\s+vàng|gio-vang/gi, ' ')
    .replace(/cầu\s+sắt|cau-sat|gỉ\s+sét|gi-set|bức\s+tường|buc-tuong|viên\s+pin|vien-pin|nhà\s+máy|nha-may|lá\s+chắn|la-chan|chiếc\s+khiên|chiec-khien|đội\s+tuần\s+tra|doi-tuan-tra|xe\s+bồn|xe-bon|chìa\s+khóa|chia-khoa|vôi\s+vữa|voi-vua/gi, ' ')
    .replace(/nghệ\s+thuật|công\s+nghệ|văn\s+nghệ|kỹ\s+nghệ|thiện\s+nghệ|nghệ\s+sĩ|nghệ\s+nhân/gi, ' ')
    .replace(/tỉnh\s+táo|sáng\s+tạo|cấu\s+tạo|tái\s+tạo|nhân\s+tạo|táo\s+bạo|cải\s+tạo|đào\s+tạo|chế\s+tạo/gi, ' ')
    .replace(/cơ\s+chế|cơ\s+thể|cơ\s+quan|nguy\s+cơ|hữu\s+cơ|cơ\s+bản|cơ\s+học|động\s+cơ|cơ\s+sở|cơ\s+hội/gi, ' ')
    .replace(/hiệu\s+quả|kết\s+quả|hậu\s+quả|nhân\s+quả|quả\s+thực|quả\s+nhiên/gi, ' ')
    .replace(/thực\s+hành|vận\s+hành|hành\s+động|hành\s+trình|tiến\s+hành|ban\s+hành|đồng\s+hành/gi, ' ')
    .replace(/cần\s+thiết|chuyên\s+cần|cần\s+phải|ân\s+cần/gi, ' ');
}

/**
 * Title-First Entity Extraction Engine:
 * Trích xuất trực tiếp các thực thể cốt lõi từ Tiêu đề bài viết (titleVi & titleEn).
 * Bắt buộc đặt ở vị trí ƯU TIÊN SỐ 1: Tiêu đề nói gì -> Ảnh bìa tìm đúng đối tượng đó.
 */
export function extractKeywordsFromTitle(titleVi = '', titleEn = '') {
  const queries = [];
  const vi = sanitizeVietnameseFalseFriends(titleVi.toLowerCase());
  const en = sanitizeVietnameseFalseFriends((titleEn || '').toLowerCase());

  // 1. Bóc tách thực thể theo Tựa đề tiếng Anh
  if (en) {
    const cleanEn = en
      .replace(/[?!:;,"'“”()[\]{}]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Đặt nhóm đặc hiệu (hạt bí đỏ, đồ nướng, ăn tối muộn, rò rỉ ruột, creatine, HPV, H. pylori, ...) lên trước
    if (/\b(?:pumpkin seed|cucurbita pepo|pepita)\b/i.test(cleanEn)) {
      queries.push('Pumpkin Seeds macro', 'Pepita de calabaza', 'Kürbiskernöl', 'pumpkin seeds bowl');
    }
    if (/\b(?:hair loss|thinning hair|alopecia|follicle|saw palmetto)\b/i.test(cleanEn)) {
      queries.push('intitle:Unsplash hair woman', 'intitle:Unsplash braided hair', 'Seated woman with blonde hair', 'woman healthy hair');
    }
    if (/\b(?:sweet potato|ipomoea batatas)\b/i.test(cleanEn)) {
      queries.push('Steamed sweet potato', 'Jjin-goguma', 'Baked potato, baked sweet potato', 'boiled sweet potato');
    }
    if (/\b(?:skin wrinkle|wrinkles|collagen|skin aging)\b/i.test(cleanEn)) {
      queries.push('intitle:Unsplash woman portrait', 'intitle:Unsplash berries', 'Fruit Platter (Unsplash)', 'fresh berries bowl');
    }
    if (/\b(?:eating late|late dinner|late at night|after 8)\b/i.test(cleanEn)) {
      queries.push('intitle:Unsplash dinner', 'Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'evening dinner table');
    }
    if (/\b(?:leaky gut|endotoxin|gut barrier)\b/i.test(cleanEn)) {
      queries.push('Healthy Lentil Salad (Unsplash)', 'Vegetable Salad (Unsplash)', 'fermented vegetables bowl', 'probiotic yogurt berries');
    }
    if (/\b(?:h\.?\s*pylori|helicobacter|caga|gastric cancer)\b/i.test(cleanEn)) {
      queries.push('Broccoli sprouts', 'Fresh Vegetable Produce (Unsplash)', 'green cabbage kitchen', 'Brassica oleracea sprouts');
    }
    if (/\b(?:hpv|cervical cancer)\b/i.test(cleanEn)) {
      queries.push('HumanPapillomavirus', 'DNA methylation H o', 'microscope laboratory research', 'laboratory research scientist');
    }
    if (/\b(?:soy|soybean|tofu|flaxseed|phytoestrogen)\b/i.test(cleanEn)) {
      queries.push('tofu salad bowl', 'Linum usitatissimum seeds', 'Flaxseeds', 'Edamame bowl');
    }
    if (/\b(?:creatine|mental fatigue|backup battery)\b/i.test(cleanEn)) {
      queries.push('Working on a laptop outdoors (Unsplash)', 'Man at a laptop in an office (Unsplash)', 'Macbook and tea (Unsplash)', 'desk laptop coffee');
    }
    if (/\b(?:medical nutrition|cancer patients|muscle preservation)\b/i.test(cleanEn)) {
      queries.push('Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'Vegetable Salad (Unsplash)', 'salmon vegetables meal');
    }
    if (/\b(?:phosphatidylserine|dha|neuronal membrane|omega-3)\b/i.test(cleanEn)) {
      queries.push('salmon fillet culinary', 'walnuts bowl wooden', 'omega 3 capsules');
    }
    if (/\b(?:neck and shoulder|trapezius|desk workers)\b/i.test(cleanEn)) {
      queries.push('Man at a laptop in an office (Unsplash)', 'Working on a laptop outdoors (Unsplash)', 'Businessman working and writing notes in office (Unsplash)', 'office worker laptop desk');
    }
    if (/\b(?:charcoal|grilled meat|barbecue|bbq)\b/i.test(cleanEn)) {
      queries.push('grilled meat skewers herbs', 'barbecue grill meat', 'charcoal grilled meat');
    }
    if (/\b(?:potassium|sodium|blood pressure)\b/i.test(cleanEn)) {
      queries.push('Persea americana fruit 2', 'Fresh Vegetable Produce (Unsplash)', 'Spinacia oleracea spinach', 'fresh green avocado halved');
    }
    if (/\b(?:cold intolerance|feeling cold|chills)\b/i.test(cleanEn)) {
      queries.push('Sejak tea leaves', 'Tea cup (Unsplash)', 'knit sweater warm tea');
    }
    if (/\b(?:thyroid|hypothyroid|hashimoto)\b/i.test(cleanEn)) {
      queries.push('Sejak tea leaves', 'Seaweed food', 'Tea cup (Unsplash)');
    }
    if (/\b(?:oats|oatmeal|avena sativa)\b/i.test(cleanEn)) {
      queries.push('oatmeal breakfast', 'Bowl of Cereal (Unsplash)', 'granola yogurt berries', 'Healthy breakfast (Unsplash)');
    }
    if (/\b(?:blueberr|strawberr|raspberr|berries)\b/i.test(cleanEn)) {
      queries.push('Strawberry and blueberries (Unsplash V6FcCG14q30)', 'Fresh raspberries bowl', 'intitle:Unsplash berries');
    }
    if (/\b(?:pomegranate|urolithin)\b/i.test(cleanEn)) {
      queries.push('Punica granatum pomegranate', 'Pomegranate arils bowl');
    }
    if (/\b(?:broccoli|sulforaphane|sprouts)\b/i.test(cleanEn)) {
      queries.push('Broccoli sprouts', 'Brassica oleracea broccoli');
    }
    if (/\b(?:cooked tomato|tomatoes|lycopene)\b/i.test(cleanEn)) {
      queries.push('Solanum lycopersicum tomatoes', 'fresh red tomatoes vine', 'cooked tomatoes olive oil');
    }
    if (/\b(?:dark chocolate|cocoa|cacao)\b/i.test(cleanEn)) {
      queries.push('Theobroma cacao beans', 'dark chocolate pieces');
    }
    if (/\b(?:garlic|allicin)\b/i.test(cleanEn) && !/\b(?:charcoal|grilled meat|barbecue|bbq)\b/i.test(cleanEn)) {
      queries.push('Allium sativum garlic', 'fresh garlic wooden board');
    }
    if (/\b(?:green tea|matcha|theanine|egcg)\b/i.test(cleanEn)) {
      queries.push('Sejak tea leaves', 'matcha green tea bowl', 'Tea cup (Unsplash)');
    }
    if (/\b(?:coffee|caffeine)\b/i.test(cleanEn)) {
      queries.push('Sweet morning coffee (Unsplash)', 'Coffee (Unsplash BIYoKb7Lux0)', 'Roasted coffee beans');
    }
    if (/\b(?:shiitake|maitake|mushroom)\b/i.test(cleanEn)) {
      queries.push('Lentinula edodes shiitake', 'fresh shiitake mushrooms');
    }
    if (/\b(?:milk thistle|silymarin)\b/i.test(cleanEn)) {
      queries.push('Silybum marianum flower');
    }
    if (/\b(?:tart cherry|sour cherry|uric acid|gout)\b/i.test(cleanEn)) {
      queries.push('Prunus cerasus cherries', 'fresh red cherries bowl');
    }
    if (/\b(?:avocado)\b/i.test(cleanEn)) {
      queries.push('Persea americana fruit 2', 'fresh green avocado halved');
    }
    if (/\b(?:celery juice|celery)\b/i.test(cleanEn)) {
      queries.push('fresh green celery', 'Apium graveolens celery');
    }
    if (/\b(?:somnolence|lunch slump|afternoon crash)\b/i.test(cleanEn)) {
      queries.push('Laptop on a neat desk (Unsplash)', 'Macbook and tea (Unsplash)', 'laptop coffee desk');
    }
    if (/\b(?:dry eyes|screen|eye fatigue|lutein|zeaxanthin)\b/i.test(cleanEn)) {
      queries.push('Laptop on a green thumb\'s desk (Unsplash)', 'Macbook and tea (Unsplash)', 'human eye iris');
    }
    if (/\b(?:sleep|circadian|melatonin|insomnia)\b/i.test(cleanEn) && !/\b(?:eating late|late dinner|late at night)\b/i.test(cleanEn)) {
      queries.push('Soft Comforts (Unsplash)', 'cozy bedroom lamp', 'person sleeping bed');
    }
    if (/\b(?:walking|brisk walk)\b/i.test(cleanEn)) {
      queries.push('Early morning in autumn forest (Unsplash)', 'person walking forest path');
    }
    if (/\b(?:sunlight|sunrise|dawn)\b/i.test(cleanEn)) {
      queries.push('Early morning in autumn forest (Unsplash)', 'morning sunlight forest');
    }
    if (/\b(?:intermittent fasting|autophagy)\b/i.test(cleanEn)) {
      queries.push('Sejak tea leaves', 'Healthy breakfast (Unsplash)');
    }
    if (/\b(?:fatigue|exhaustion|tired|weary)\b/i.test(cleanEn) && !/\b(?:leaky gut|creatine|cold intolerance)\b/i.test(cleanEn)) {
      queries.push('Soft Comforts (Unsplash)', 'Tea cup (Unsplash)');
    }
  }

  // 2. Bóc tách thực thể theo Tựa đề tiếng Việt (titleVi)
  // Nhóm đặc hiệu ưu tiên cao nhất
  if (/hạt bí đỏ|hat-bi-do|dầu hạt bí|pumpkin seed/i.test(vi)) {
    queries.push('Pumpkin Seeds macro', 'Pepita de calabaza', 'Kürbiskernöl', 'pumpkin seeds bowl');
  }
  if (/rụng tóc|tóc rụng|rung-toc|nang tóc|hói đầu|mỏng tóc|saw palmetto|\bdht\b/i.test(vi)) {
    queries.push('intitle:Unsplash hair woman', 'intitle:Unsplash braided hair', 'Seated woman with blonde hair', 'woman healthy hair');
  }
  if (/khoai lang|khoai-lang/i.test(vi)) {
    queries.push('Steamed sweet potato', 'Jjin-goguma', 'Baked potato, baked sweet potato', 'boiled sweet potato');
  }
  if (/nếp nhăn|nep-nhan|làn da|lan-da|collagen|lão hóa da|đứt gãy sợi/i.test(vi)) {
    queries.push('intitle:Unsplash woman portrait', 'intitle:Unsplash berries', 'Fruit Platter (Unsplash)', 'fresh berries bowl');
  }
  if (/ăn tối muộn|an-toi-muon|ăn khuya|sau 8 giờ/i.test(vi)) {
    queries.push('intitle:Unsplash dinner', 'Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'evening dinner table');
  }
  if (/rò rỉ ruột|ro-ri-ruot|endotoxin|hàng rào niêm mạc|luôn mệt mỏi|mệt mỏi kéo dài/i.test(vi)) {
    queries.push('Healthy Lentil Salad (Unsplash)', 'Vegetable Salad (Unsplash)', 'fermented vegetables bowl', 'probiotic yogurt berries');
  }
  if (/vi khuẩn hp|vi-khuan-hp|helicobacter|caga|ung thư dạ dày/i.test(vi)) {
    queries.push('Broccoli sprouts', 'Fresh Vegetable Produce (Unsplash)', 'green cabbage kitchen', 'Brassica oleracea sprouts');
  }
  if (/virus hpv|\bhpv\b|cổ tử cung/i.test(vi)) {
    queries.push('HumanPapillomavirus', 'DNA methylation H o', 'microscope laboratory research', 'laboratory research scientist');
  }
  if (/creatine|làm việc trí óc|pin dự phòng/i.test(vi)) {
    queries.push('Working on a laptop outdoors (Unsplash)', 'Man at a laptop in an office (Unsplash)', 'Macbook and tea (Unsplash)', 'desk laptop coffee');
  }
  if (/bệnh nhân ung thư|dinh dưỡng chuẩn y khoa|khối cơ nạc/i.test(vi)) {
    queries.push('Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'Vegetable Salad (Unsplash)', 'salmon vegetables meal');
  }
  if (/phosphatidylserine|\bdha\b|màng tế bào thần kinh/i.test(vi)) {
    queries.push('salmon fillet culinary', 'walnuts bowl wooden', 'omega 3 capsules');
  }
  if (/đồ nướng|thịt nướng|cháy cạnh|cháy xém|barbecue|bbq/i.test(vi)) {
    queries.push('grilled meat skewers herbs', 'barbecue grill meat', 'charcoal grilled meat');
  }
  if (/muối và kali|cân bằng muối|kali|natri/i.test(vi)) {
    queries.push('Persea americana fruit 2', 'Fresh Vegetable Produce (Unsplash)', 'Spinacia oleracea spinach', 'fresh green avocado halved');
  }

  // Nhóm triệu chứng, thể trạng & bối cảnh sống
  if (/sợ lạnh|lạnh cóng|lạnh chân tay|hạ thân nhiệt/i.test(vi)) {
    queries.push('Sejak tea leaves', 'Tea cup (Unsplash)', 'knit sweater warm tea');
  }
  if (/uể oải|kiệt sức|đuối sức/i.test(vi) && !/rò rỉ ruột|creatine/i.test(vi)) {
    queries.push('Soft Comforts (Unsplash)', 'Tea cup (Unsplash)');
  }
  if (/tuyến giáp|suy giáp|hashimoto|bướu cổ/i.test(vi)) {
    queries.push('Sejak tea leaves', 'Seaweed food', 'Tea cup (Unsplash)');
  }
  if (/sập nguồn|buồn ngủ.*(trưa|chiều)|oải sau ăn|đỉnh đường huyết/i.test(vi)) {
    queries.push('Laptop on a neat desk (Unsplash)', 'Macbook and tea (Unsplash)', 'laptop coffee desk');
  }
  if (/khô mắt|mỏi mắt|nhìn mờ|màn hình|hoàng điểm/i.test(vi)) {
    queries.push('Laptop on a green thumb\'s desk (Unsplash)', 'Macbook and tea (Unsplash)', 'human eye iris');
  }
  if (/mất ngủ|khó ngủ|thao thức|giấc ngủ/i.test(vi)) {
    queries.push('Soft Comforts (Unsplash)', 'cozy bedroom lamp', 'person sleeping bed');
  }
  if (/cổ vai gáy|ngồi lâu|ngồi nhiều|đau lưng|ngồi máy tính/i.test(vi)) {
    queries.push('Man at a laptop in an office (Unsplash)', 'Working on a laptop outdoors (Unsplash)', 'Businessman working and writing notes in office (Unsplash)', 'office worker laptop desk');
  }
  if (/khớp gối|đau khớp|leo cầu thang|sụn khớp/i.test(vi)) {
    queries.push('outdoor wooden stairs', 'hiking trail wooden steps');
  }
  if (/ánh nắng|bình minh|dậy sớm/i.test(vi)) {
    queries.push('Early morning in autumn forest (Unsplash)', 'morning sunlight forest');
  }
  if (/đi bộ|vận động nhẹ/i.test(vi)) {
    queries.push('Early morning in autumn forest (Unsplash)', 'person walking forest path');
  }
  if (/thở 4-7-8|căng thẳng|stress|lo âu|phế vị/i.test(vi)) {
    queries.push('Yoga sunrise. (Unsplash)', 'calm forest stream');
  }

  // Nhóm thực phẩm, dược liệu, thói quen ăn uống trong Tựa đề tiếng Việt
  if (/yến mạch/i.test(vi)) queries.push('oatmeal breakfast', 'Bowl of Cereal (Unsplash)', 'granola yogurt berries', 'Healthy breakfast (Unsplash)');
  if (/bông cải xanh|súp lơ xanh/i.test(vi)) queries.push('Broccoli sprouts', 'Brassica oleracea broccoli');
  if (/cà chua/i.test(vi)) queries.push('Solanum lycopersicum tomatoes', 'fresh red tomatoes vine', 'cooked tomatoes olive oil');
  if (/tỏi/i.test(vi) && !/đồ nướng|thịt nướng|cháy cạnh|cháy xém|barbecue|bbq/i.test(vi)) {
    queries.push('Allium sativum garlic', 'fresh garlic wooden board');
  }
  if (/socola|cacao/i.test(vi)) queries.push('Theobroma cacao beans', 'dark chocolate pieces');
  if (/quả mọng|việt quất|dâu tây|mâm xôi/i.test(vi)) queries.push('Strawberry and blueberries (Unsplash V6FcCG14q30)', 'Fresh raspberries bowl', 'intitle:Unsplash berries');
  if (/quả lựu/i.test(vi)) queries.push('Punica granatum pomegranate', 'Pomegranate arils bowl');
  if (/kế sữa/i.test(vi)) queries.push('Silybum marianum flower');
  if (/trà xanh|matcha/i.test(vi)) queries.push('Sejak tea leaves', 'matcha green tea bowl', 'Tea cup (Unsplash)');
  if (/cà phê/i.test(vi)) queries.push('Sweet morning coffee (Unsplash)', 'Coffee (Unsplash BIYoKb7Lux0)', 'Roasted coffee beans');
  if (/cơm nguội|tinh bột kháng/i.test(vi) && !/khoai lang/i.test(vi)) queries.push('cooked white rice bowl', 'steamed rice ceramic bowl');
  if (/ăn rau trước|thứ tự ăn/i.test(vi)) queries.push('Salad Bowl (Unsplash)', 'Vegetable Salad (Unsplash)', 'Healthy Meal Prep (Unsplash)');
  if (/trà sữa/i.test(vi)) queries.push('Bubble tea', 'Boba pearl milk tea');
  if (/rong biển/i.test(vi)) queries.push('Seaweed food', 'Edible kelp seaweed');
  if (/dầu ô liu/i.test(vi)) queries.push('olive oil culinary', 'olive oil wooden table');
  if (/nấm hương|nấm dược liệu|nấm maitake/i.test(vi)) queries.push('Lentinula edodes shiitake', 'fresh shiitake mushrooms');
  if (/anh đào|cherry/i.test(vi)) queries.push('Prunus cerasus cherries', 'fresh red cherries bowl');
  if (/thịt đỏ|thịt xông khói|xúc xích/i.test(vi)) queries.push('charcuterie board cured meat', 'fresh raw beef steak');
  if (/trà nóng|canh sôi/i.test(vi)) queries.push('Tea cup (Unsplash)', 'steaming hot cup tea');
  if (/cám gạo/i.test(vi)) queries.push('Brown rice bowl', 'Oryza sativa rice');
  if (/quả bơ/i.test(vi)) queries.push('Persea americana fruit 2', 'fresh green avocado halved');
  if (/gừng/i.test(vi)) queries.push('Zingiber officinale ginger');
  if (/quế/i.test(vi)) queries.push('Cinnamomum verum cinnamon');
  if (/nghệ|curcumin/i.test(vi)) queries.push('Curcuma longa roots', 'turmeric powder');
  if (/đậu nành|đậu phụ|hạt lanh|phytoestrogen/i.test(vi)) queries.push('tofu salad bowl', 'Linum usitatissimum seeds', 'Flaxseeds', 'Edamame bowl');
  if (/giấm táo/i.test(vi)) queries.push('apple cider vinegar', 'Malus domestica apples');
  if (/táo đỏ|quả táo/i.test(vi)) queries.push('Malus domestica apples', 'red apple wooden table');
  if (/tập tạ|kháng lực|teo cơ/i.test(vi)) queries.push('dumbbell weight training', 'strength training kettlebell');
  if (/rượu bia|đỏ mặt/i.test(vi)) queries.push('Wine glasses (Unsplash)', 'red wine glass table');
  if (/cần tây/i.test(vi)) queries.push('fresh green celery', 'Apium graveolens celery');

  return [...new Set(queries)];
}

/**
 * Trích xuất danh sách từ khóa tìm kiếm đa tầng từ chủ đề bài viết (Đã khử bẫy từ đồng âm)
 */
export function extractSmartImageKeywords(topic = {}) {
  const titleQueries = extractKeywordsFromTitle(topic.titleVi || '', topic.titleEn || '');
  const rawText = [
    topic.titleVi || '',
    topic.titleEn || '',
    topic.slugVi || '',
    topic.slugEn || '',
    ...(Array.isArray(topic.tagsVi) ? topic.tagsVi : []),
    ...(Array.isArray(topic.tagsEn) ? topic.tagsEn : []),
    ...(Array.isArray(topic.tags) ? topic.tags : [])
  ].join(' ');

  const text = sanitizeVietnameseFalseFriends(rawText);
  const queries = [...titleQueries];

  // 0. Ưu tiên từ khóa chuyên biệt do Gemini cung cấp (nếu hợp lệ và không phải từ khóa rác)
  if (Array.isArray(topic.imageSearchQueries)) {
    for (const q of topic.imageSearchQueries) {
      if (typeof q === 'string' && q.trim().length >= 3) {
        const cleanQ = q.trim();
        if (!/^(?:fitness exercise|dumbbells|healthy nutrition|cancer laboratory)$/i.test(cleanQ)) {
          queries.push(cleanQ);
        }
      }
    }
  }

  // 0a. NHÓM HẠT BÍ ĐỎ & RỤNG TÓC NỘI TIẾT (Đặt trước nhóm rụng tóc chung)
  if (/hạt bí đỏ|hat-bi-do|dầu hạt bí|pumpkin seed|cucurbita pepo|pepita/i.test(text)) {
    queries.push('Pumpkin Seeds macro', 'Pepita de calabaza', 'Kürbiskernöl', 'pumpkin seeds bowl');
  }

  // 0b. NHÓM RỤNG TÓC, NANG TÓC & HÓI ĐẦU
  if (/rụng tóc|tóc rụng|rung-toc|nang tóc|hói đầu|mỏng tóc|saw palmetto|\bdht\b|hair loss|thinning hair|alopecia|follicle/i.test(text)) {
    queries.push('intitle:Unsplash hair woman', 'intitle:Unsplash braided hair', 'Seated woman with blonde hair', 'woman healthy hair');
  }

  // 0c. NHÓM KHOAI LANG LUỘC ĐỂ LẠNH & TINH BỘT KHÁNG
  if (/khoai lang|khoai-lang|sweet potato|ipomoea batatas/i.test(text)) {
    queries.push('Steamed sweet potato', 'Jjin-goguma', 'Baked potato, baked sweet potato', 'boiled sweet potato');
  }

  // 0d. NHÓM ĐƯỜNG, NẾP NHĂN DA & COLLAGEN
  if (/nếp nhăn|nep-nhan|làn da|lan-da|collagen|lão hóa da|đứt gãy sợi|skin wrinkle|skin aging/i.test(text)) {
    queries.push('intitle:Unsplash woman portrait', 'intitle:Unsplash berries', 'Fruit Platter (Unsplash)', 'fresh berries bowl');
  }

  // 0e. NHÓM ĂN TỐI MUỘN SAU 8 GIỜ & ĐỒNG HỒ SINH HỌC
  if (/ăn tối muộn|an-toi-muon|ăn khuya|sau 8 giờ|eating late|late dinner|late at night/i.test(text)) {
    queries.push('intitle:Unsplash dinner', 'Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'evening dinner table');
  }

  // 0f. NHÓM RÒ RỈ RUỘT (LEAKY GUT) & MỆT MỎI KÉO DÀI
  if (/rò rỉ ruột|ro-ri-ruot|leaky gut|endotoxin|hàng rào niêm mạc|luôn mệt mỏi|mệt mỏi kéo dài/i.test(text)) {
    queries.push('Healthy Lentil Salad (Unsplash)', 'Vegetable Salad (Unsplash)', 'fermented vegetables bowl', 'probiotic yogurt berries');
  }

  // 0g. NHÓM VI KHUẨN HP (H. PYLORI), CAGA & UNG THƯ DẠ DÀY
  if (/vi khuẩn hp|vi-khuan-hp|h\.?\s*pylori|helicobacter|caga|ung thư dạ dày|gastric cancer/i.test(text)) {
    queries.push('Broccoli sprouts', 'Fresh Vegetable Produce (Unsplash)', 'green cabbage kitchen', 'Brassica oleracea sprouts');
  }

  // 0h. NHÓM VIRUS HPV, GEN P53 & VACCINE CỔ TỬ CUNG
  if (/virus hpv|\bhpv\b|cổ tử cung|cervical cancer/i.test(text)) {
    queries.push('HumanPapillomavirus', 'DNA methylation H o', 'microscope laboratory research', 'laboratory research scientist');
  }

  // 0i. NHÓM CREATINE & LÀM VIỆC TRÍ ÓC
  if (/creatine|làm việc trí óc|pin dự phòng|mental fatigue|backup battery/i.test(text)) {
    queries.push('Working on a laptop outdoors (Unsplash)', 'Man at a laptop in an office (Unsplash)', 'Macbook and tea (Unsplash)', 'desk laptop coffee');
  }

  // 0j. NHÓM DINH DƯỠNG BỆNH NHÂN UNG THƯ & BẢO TỒN KHỐI CƠ NẠC
  if (/bệnh nhân ung thư|dinh dưỡng chuẩn y khoa|khối cơ nạc|medical nutrition|muscle preservation/i.test(text)) {
    queries.push('Healthy Meal Prep (Unsplash)', 'Steak Dinner (Unsplash)', 'Vegetable Salad (Unsplash)', 'salmon vegetables meal');
  }

  // 0k. NHÓM PHOSPHATIDYLSERINE, DHA & MÀNG TẾ BÀO THẦN KINH
  if (/phosphatidylserine|\bdha\b|màng tế bào thần kinh|neuronal membrane|omega-3/i.test(text)) {
    queries.push('salmon fillet culinary', 'walnuts bowl wooden', 'omega 3 capsules');
  }

  // 0l. NHÓM ĐỒ NƯỚNG CHÁY XÉM, PHẢN ỨNG GLYCATION (AGEs) & MAILLARD (Đặt trước nhóm Tỏi!)
  if (/đồ nướng|thịt nướng|cháy cạnh|cháy xém|chay-xem|barbecue|bbq|charred|charcoal grill|grilled meat/i.test(text)) {
    queries.push('grilled meat skewers herbs', 'barbecue grill meat', 'charcoal grilled meat');
  }

  // 1. NHÓM NGŨ CỐC, YẾN MẠCH, CHẤT XƠ HÒA TAN & AXIT BUTYRATE
  if (/yến mạch|yen-mach|oat|oatmeal|avena sativa|butyrate|chất xơ hòa tan|soluble fiber/i.test(text)) {
    queries.push('oatmeal breakfast', 'Bowl of Cereal (Unsplash)', 'granola yogurt berries', 'Healthy breakfast (Unsplash)');
  }

  // 2. NHÓM QUẢ MỌNG, VIỆT QUẤT, DÂU TÂY, MÂM XÔI & AXIT ELLAGIC
  if (/quả mọng|qua-mong|việt quất|viet-quat|dâu tây|dau-tay|mâm xôi|berries|berry|blueberry|blueberries|strawberry|strawberries|raspberry|ellagic|fisetin/i.test(text)) {
    queries.push('Strawberry and blueberries (Unsplash V6FcCG14q30)', 'Fresh raspberries bowl', 'intitle:Unsplash berries');
  }

  // 3. NHÓM QUẢ LỰU, UROLITHIN A & TÁI TẠO TY THỂ (MITOPHAGY)
  if (/quả lựu|qua-luu|pomegranate|punica granatum|urolithin/i.test(text)) {
    queries.push('Punica granatum pomegranate', 'Pomegranate arils bowl');
  }

  // 4. NHÓM CÁM GẠO, LÚA GẠO & CERAMIDE THỰC VẬT
  if (/cám gạo|cam-gao|rice bran|ceramide|phytoceramide|hạt gạo|oryza sativa/i.test(text)) {
    queries.push('Brown rice bowl', 'Oryza sativa rice');
  }

  // 5. NHÓM TRÀ SỮA, ĐƯỜNG FRUCTOSE LỎNG, NƯỚC NGỌT & GAN NHIỄM MỠ (MASLD)
  if (/trà sữa|tra-sua|boba|bubble tea|fructose|nước ngọt|soft drink|soda|gan nhiễm mỡ|fatty liver|masld/i.test(text)) {
    queries.push('Bubble tea', 'Boba tea', 'Iced milk tea');
  }

  // 6. NHÓM THỰC PHẨM MỐC, ĐỘC TỐ AFLATOXIN & BẢO QUẢN NGŨ CỐC / ĐẬU PHỘNG
  if (/thực phẩm mốc|thuc-pham-moc|aflatoxin|aspergillus|nấm mốc|moldy|ngũ cốc mốc|đậu phộng|lạc mốc/i.test(text)) {
    queries.push('Arachis hypogaea peanuts', 'Raw peanuts', 'Corn kernels');
  }

  // 7. NHÓM SẬP NGUỒN BỮA TRƯA, BUỒN NGỦ 2 GIỜ CHIỀU (POSTPRANDIAL SOMNOLENCE / LUNCH SLUMP)
  if (/sập nguồn|sap-nguon|bữa trưa|bua-trua|lunch slump|somnolence|buồn ngủ.*chiều|2 giờ chiều|đỉnh carbohydrate/i.test(text)) {
    queries.push('Laptop on a neat desk (Unsplash)', 'Macbook and tea (Unsplash)', 'laptop coffee desk');
  }

  // 8. NHÓM CĂN BẾP CHỐNG UNG THƯ & CHẾ BIẾN THỰC PHẨM THÔNG MINH TẠI GIA ĐÌNH
  if (/căn bếp|can-bep|chế biến đúng cách|che-bien-dung-cach|chọn thực phẩm thông minh|home kitchen|culinary preparation|anticancer foods/i.test(text)) {
    queries.push('Fresh Vegetable Produce (Unsplash)', 'Healthy Vegetables (Unsplash)', 'Salad Bowl (Unsplash)');
  }

  // 9. NHÓM LUTEIN, ZEAXANTHIN, HOÀNG ĐIỂM & KHÔ MỎI MẮT MÀN HÌNH
  if (/lutein|zeaxanthin|hoàng điểm|hoang-diem|điểm vàng|macula|macular|sắc tố vàng|sac-to-vang|bức rèm vàng|thị lực|mắt khô|khô mắt|dry eye/i.test(text)) {
    queries.push('Human eye iris', 'Tagetes patula', 'Tagetes erecta');
  }

  // 10. NHÓM ASTAXANTHIN & MỎI MẮT KỸ THUẬT SỐ
  if (/astaxanthin|computer vision syndrome|hội chứng mỏi mắt|vết chân chim/i.test(text)) {
    queries.push('Laptop on a green thumb\'s desk (Unsplash)', 'Macbook and tea (Unsplash)', 'human eye iris');
  }

  // 10b. NHÓM TUYẾN GIÁP, SUY GIÁP, SỢ LẠNH, I-ỐT & SELEN (Đã tách riêng khỏi rụng tóc!)
  if (/tuyến giáp|tuyen-giap|thyroid|suy giáp|hypothyroid|hashimoto|sợ lạnh|so-lanh|cold intolerance|i-ốt|iodine|selen\b|selenium|bướu cổ|goiter/i.test(text)) {
    queries.push('Sejak tea leaves', 'Seaweed food', 'Tea cup (Unsplash)');
  }

  // 11. NHÓM CÀ CHUA NẤU CHÍN, DẦU Ô LIU & LYCOPENE
  if (/cà chua|ca-chua|tomato|lycopene|dầu ô liu|olive oil/i.test(text)) {
    queries.push('Solanum lycopersicum tomatoes', 'fresh red tomatoes vine', 'cherry tomatoes olive oil');
  }

  // 12. NHÓM TỎI TƯƠI ĐẬP DẬP & ALLICIN (Chỉ khi không phải bài đồ nướng BBQ)
  if (/tỏi|toi-tuoi|garlic|allicin|alliinase/i.test(text) && !/đồ nướng|thịt nướng|cháy cạnh|cháy xém|barbecue|bbq|grilled meat/i.test(text)) {
    queries.push('Allium sativum garlic', 'fresh garlic wooden board', 'crushed garlic culinary');
  }

  // 13. NHÓM MẦM SÚP LƠ XANH, BÔNG CẢI XANH & SULFORAPHANE (Nrf2-Keap1)
  if (/sulforaphane|súp lơ|sup-lo|bông cải xanh|broccoli|brassica oleracea|nrf2/i.test(text)) {
    queries.push('Broccoli sprouts', 'Brassica oleracea broccoli', 'microgreens sprouts');
  }

  // 14. NHÓM NẤM DƯỢC LIỆU, NẤM HƯƠNG, MAITAKE & BETA-GLUCAN
  if (/nấm hương|nấm maitake|shiitake|maitake|mushroom|beta-glucan|dectin-1/i.test(text)) {
    queries.push('Lentinula edodes shiitake', 'fresh shiitake mushrooms', 'edible mushrooms basket');
  }

  // 15. NHÓM THỊT ĐỎ CHẾ BIẾN SẴN, XÚC XÍCH, THỊT XÔNG KHÓI & NITROSAMINE
  if (/thịt đỏ|thit-do|thịt xông khói|xúc xích|processed meat|bacon|sausage|nitrosamine|sắt heme/i.test(text)) {
    queries.push('charcuterie board cured meat', 'fresh raw beef steak');
  }

  // 16. NHÓM CANH SÔI, TRÀ NÓNG TRÊN 65 ĐỘ & THỰC QUẢN
  if (/trà nóng|tra-nong|canh sôi|trên 65|65°c|65-do|hot tea|scalding|thực quản|esophageal/i.test(text)) {
    queries.push('Tea cup (Unsplash)', 'steaming hot cup tea', 'steaming bowl soup');
  }

  // 17. NHÓM KẾ SỮA (SILYMARIN) & BẢO VỆ TẾ BÀO GAN
  if (/kế sữa|ke-sua|milk thistle|silymarin|silybum marianum/i.test(text)) {
    queries.push('Silybum marianum flower', 'milk thistle flower');
  }

  // 18. NHÓM ĐỎ MẶT KHI UỐNG RƯỢU BIA, ACETALDEHYDE & ALDH2
  if (/đỏ mặt|do-mat|acetaldehyde|aldh2|facial flush|hangover|rượu bia|alcohol/i.test(text) && !/kế sữa|silymarin|milk thistle/i.test(text)) {
    queries.push('Wine glasses (Unsplash)', 'red wine glass table');
  }

  // 19. NHÓM QUẢ ANH ĐÀO CHUA (TART CHERRY) & AXIT URIC / BỆNH GÚT
  if (/anh đào|anh-dao|cherry|tart cherry|axit uric|uric acid|gout|gút/i.test(text)) {
    queries.push('Prunus cerasus cherries', 'fresh red cherries bowl');
  }

  // 20. NHÓM SOCOLA ĐEN, CACAO, FLAVANOL & OXIT NITRIC
  if (/socola|chocolate|cacao|flavanol|theobroma/i.test(text)) {
    queries.push('Theobroma cacao beans', 'dark chocolate pieces');
  }

  // 22. NHÓM NGỒI NHIỀU, TÊ LIỆT ENZYME LPL & ĐAU MỎI CỔ VAI GÁY VĂN PHÒNG
  if (/ngồi nhiều|ngoi-nhieu|ngồi làm việc|sedentary|enzyme lpl|cổ vai gáy|co-vai-gay|trapezius|ngồi máy tính|neck and shoulder/i.test(text)) {
    queries.push('Man at a laptop in an office (Unsplash)', 'Working on a laptop outdoors (Unsplash)', 'Businessman working and writing notes in office (Unsplash)', 'office worker laptop desk');
  }

  // 23. NHÓM TỶ LỆ KALI & NATRI, XẢ ÁP MẠCH MÁU
  if (/kali|natri|potassium|sodium|quả bơ|avocado/i.test(text)) {
    queries.push('Persea americana fruit 2', 'Fresh Vegetable Produce (Unsplash)', 'Spinacia oleracea spinach', 'fresh green avocado halved');
  }

  // 24. NHÓM AXIT HYALURONIC, ĐỆM KHỚP GỐI & LEO CẦU THANG
  if (/hyaluronic|khớp gối|khop-goi|đệm khớp|knee joint|sụn khớp|hoạt dịch|cầu thang|stair/i.test(text)) {
    queries.push('outdoor wooden stairs', 'hiking trail wooden steps');
  }

  // 25. NHÓM TẬP KHÁNG LỰC, TẬP TẠ, LEUCINE, mTOR & NGĂN NGỪA TEO CƠ (SARCOPENIA)
  if (/leucine|teo cơ|teo-co|sarcopenia|kháng lực|khang-luc|tập tạ|resistance training|weight training|myokine/i.test(text)) {
    queries.push('dumbbell weight training', 'strength training kettlebell');
  }

  // 26. NHÓM DƯỢC LIỆU & THỰC PHẨM CHỨC NĂNG CỤ THỂ KHÁC
  if (/bạch quả|ginkgo biloba/i.test(text)) queries.push('Ginkgo biloba leaf', 'Ginkgo biloba autumn');
  if (/berberin|vàng đắng/i.test(text)) queries.push('Berberis vulgaris berries');
  if (/\b(?:curcumin|turmeric|củ nghệ|nghệ vàng|tinh bột nghệ)\b/i.test(text)) {
    queries.push('Curcuma longa roots', 'turmeric powder');
  }
  if (/ashwagandha|sâm ấn độ|withania/i.test(text)) queries.push('Withania somnifera plant');
  if (/rhodiola|rễ vàng/i.test(text)) queries.push('Rhodiola rosea flower');
  if (/nhân sâm|panax ginseng/i.test(text)) queries.push('Panax ginseng root');
  if (/trà xanh|green tea|theanine|egcg|matcha/i.test(text)) queries.push('Sejak tea leaves', 'matcha green tea bowl', 'Tea cup (Unsplash)');
  if (/resveratrol|nho đỏ/i.test(text)) queries.push('Vitis vinifera grapes');
  if (/gừng|ginger|zingiber/i.test(text)) queries.push('Zingiber officinale ginger');
  if (/quế|cinnamon/i.test(text)) queries.push('Cinnamomum verum cinnamon');
  if (/đậu nành|soybean|isoflavone|genistein|hạt lanh|flaxseed|phytoestrogen/i.test(text)) {
    queries.push('tofu salad bowl', 'Linum usitatissimum seeds', 'Flaxseeds', 'Edamame bowl');
  }
  if (/\b(?:quả táo|ăn táo|táo đỏ|apple fruit|pectin|akkermansia)\b/i.test(text)) {
    queries.push('Malus domestica apples', 'red apple wooden table');
  }
  if (/giấm táo|giam-tao|apple cider vinegar/i.test(text)) {
    queries.push('apple cider vinegar', 'Malus domestica apples');
  }
  if (/cơm nguội|com-nguoi|tinh bột kháng|resistant starch/i.test(text) && !/khoai lang/i.test(text)) {
    queries.push('cooked white rice bowl', 'steamed rice ceramic bowl');
  }
  if (/ăn rau trước|an-rau-truoc|thứ tự bữa ăn|thu-tu-an/i.test(text)) {
    queries.push('Salad Bowl (Unsplash)', 'Vegetable Salad (Unsplash)', 'Healthy Meal Prep (Unsplash)');
  }
  if (/cà phê|ca-phe|coffee|caffeine|adenosine/i.test(text)) {
    queries.push('Sweet morning coffee (Unsplash)', 'Coffee (Unsplash BIYoKb7Lux0)', 'Roasted coffee beans');
  }
  if (/nhịn ăn gián đoạn|nhin-an-gian-doat|intermittent fasting|autophagy|tự thực bào/i.test(text)) {
    queries.push('Sejak tea leaves', 'Healthy breakfast (Unsplash)');
  }
  if (/muối khoáng|muoi-khoang|nước ấm sáng sớm|điện giải|electrolyte/i.test(text)) {
    queries.push('glass water lemon', 'clear glass water morning');
  }
  if (/ánh nắng|anh-nang|morning sun|bình minh|nhân trên chéo|scn/i.test(text)) {
    queries.push('Early morning in autumn forest (Unsplash)', 'morning sunlight forest');
  }
  if (/đi bộ|di-bo|walking|glut4/i.test(text)) {
    queries.push('Early morning in autumn forest (Unsplash)', 'person walking forest path');
  }
  if (/giấc ngủ|giac-ngu|sleep|melatonin|night shift|ánh sáng xanh|blue light|nhiệt độ phòng ngủ/i.test(text) && !/ăn tối muộn|eating late/i.test(text)) {
    queries.push('Soft Comforts (Unsplash)', 'cozy bedroom lamp', 'person sleeping bed');
  }
  if (/cortisol|stress|căng thẳng|thở 4-7-8|phế vị|vagus nerve/i.test(text)) {
    queries.push('Yoga sunrise. (Unsplash)', 'calm forest stream');
  }
  if (/vaccin|vac-xin|tiêm chủng|immuniz|mrna|kháng thể/i.test(text)) {
    queries.push('microscope laboratory research', 'intitle:Unsplash laboratory', 'Drmakete lab 2015 (Unsplash)');
  }
  if (/bài thuốc.*ung thư|chữa khỏi ung thư|lang băm|quackery/i.test(text)) {
    queries.push('oncology research microscope', 'medical scientist laboratory');
  }

  return [...new Set(queries)];
}

/**
 * Zero-LLM Deterministic Visual Spec Engine v4.1:
 * Kết hợp trực tiếp (hỗ trợ mở rộng vô hạn cho chủ đề mới từ PubMed Radar & Open Frontier):
 * 1. Title-First Entity Extraction (Tiêu đề nói gì -> Tìm đúng đối tượng đó)
 * 2. Phân loại nội dung & 35+ nhóm hoạt chất chuyên sâu
 * 3. Từ khóa cụ thể do AI tạo cho chủ đề mới (topic.imageSearchQueries)
 * 4. Chỉ dùng SAFE_ORGAN_FALLBACKS ở cuối cùng sau khi các truy vấn cụ thể đều không khớp!
 */
export function buildDeterministicVisualSpec(topic = {}) {
  const titleQueries = extractKeywordsFromTitle(topic.titleVi || '', topic.titleEn || '');
  const deterministicQueries = extractSmartImageKeywords(topic);
  const userQueries = Array.isArray(topic.imageSearchQueries)
    ? topic.imageSearchQueries.filter(q => typeof q === 'string' && q.trim().length >= 2 && !/^(?:fitness exercise|dumbbells|healthy nutrition|cancer laboratory)$/i.test(q.trim()))
    : [];

  const organ = topic.organ || 'Metabolic';
  const SAFE_ORGAN_FALLBACKS = {
    Cardiovascular: ['Fresh Vegetable Produce (Unsplash)', 'Strawberry and blueberries (Unsplash V6FcCG14q30)'],
    Heart: ['Fresh Vegetable Produce (Unsplash)', 'Salad Bowl (Unsplash)'],
    Brain: ['Early morning in autumn forest (Unsplash)', 'Sejak tea leaves'],
    Gut: ['Salad Bowl (Unsplash)', 'Vegetable Salad (Unsplash)'],
    Metabolic: ['Healthy Meal Prep (Unsplash)', 'Healthy Vegetables (Unsplash)'],
    'Cellular Aging': ['Fruit Platter (Unsplash)', 'Early morning in autumn forest (Unsplash)'],
    Immunity: ['Healthy Vegetables (Unsplash)', 'Broccoli sprouts'],
    Immune: ['Healthy Vegetables (Unsplash)', 'Broccoli sprouts'],
    Oncology: ['Fresh Vegetable Produce (Unsplash)', 'Broccoli sprouts'],
    Cancer: ['Fresh Vegetable Produce (Unsplash)', 'Broccoli sprouts'],
    Liver: ['Silybum marianum flower', 'Vegetable Salad (Unsplash)']
  };
  const organFallbacks = SAFE_ORGAN_FALLBACKS[organ] || SAFE_ORGAN_FALLBACKS.Metabolic;

  // THỨ TỰ ƯU TIÊN: 1. Từ khóa Tựa đề -> 2. Phân loại chuẩn hóa -> 3. imageSearchQueries từ AI (cho chủ đề mới mở rộng!) -> 4. Fallback cơ quan
  const combinedQueries = [...new Set([...titleQueries, ...deterministicQueries, ...userQueries, ...organFallbacks])];

  const titleVi = topic.titleVi || topic.titleEn || '';
  const isSymptom = /sợ lạnh|lạnh cóng|mệt mỏi|uể oải|rụng tóc|tóc rụng|suy giáp|tuyến giáp|giấc ngủ|mất ngủ|stress|căng thẳng|sương mù não|sập nguồn|postprandial|đau mỏi|cổ vai gáy/i.test(titleVi);
  const isCulinary = /nấu chín|căn bếp|chế biến|nấu ăn|thực phẩm|bữa trưa|bữa ăn|bữa tối|ăn tối|rau|yến mạch|khoai lang|gạo|bông cải|cà chua|tỏi|dầu ô liu|đậu nành|hạt bí|socola|đồ nướng/i.test(titleVi);
  const isMolecular = /Clinical Deep-Dive|Deep Dispatch/i.test(topic.tier || '') && /virus|hpv|p53|dna|phân tử|molecular|protein|synap|tế bào/i.test(titleVi);

  let coreSubject = '';
  if (titleQueries.length > 0) {
    if (isCulinary) {
      coreSubject = `Natural appetizing culinary or botanical photography depicting: "${topic.titleVi || topic.titleEn}" (rustic wooden table, kitchen preparation, fresh whole ingredients)`;
    } else if (isSymptom) {
      coreSubject = `Cozy authentic lifestyle, workspace, or wellness photography depicting: "${topic.titleVi || topic.titleEn}" (natural light, warm human context, relaxing with tea, ergonomic desk)`;
    } else if (isMolecular) {
      coreSubject = `Clean, text-free 3D molecular/viral structural artwork OR authentic high-resolution 35mm biomedical photograph closely depicting: "${topic.titleVi || topic.titleEn}"`;
    } else {
      coreSubject = `Authentic high-resolution 35mm photograph closely depicting the title subject: "${topic.titleVi || topic.titleEn}"`;
    }
  } else if (isCulinary) {
    coreSubject = 'Appetizing food ingredients in a natural kitchen or dining setting (bowl, cutting board, rustic wooden table)';
  } else if (isSymptom) {
    coreSubject = 'Cozy warm lifestyle scene, person in natural morning light, ergonomic desk, or peaceful resting';
  } else {
    coreSubject = 'Authentic high-resolution botanical, culinary, or lifestyle photograph matching ' + (topic.titleEn || topic.titleVi || 'health topic');
  }

  return {
    coreSubject,
    forbiddenSubjects: 'Isolated objects/cutouts on pure white (#FFFFFF) or pure black (#000000) studio backgrounds; pathology/autopsy/formaldehyde jars; laboratory petri dishes; military/army scenes; hospital patient beds; amateur harsh-flash snapshots; messy 2000s computer rooms with tangled cables; wholesale burlap sacks; raw uncooked rice; plain tree twigs/leaves for nutrition topics; commercial packaging/logos.',
    queries: combinedQueries
  };
}

// Backward-compatible alias
export const generateVisualSpecWithGemini = buildDeterministicVisualSpec;

/**
 * Trạm kiểm duyệt thị giác AI (Universal Fail-Closed Gemini Vision Gatekeeper v4.0)
 * Áp dụng cho MỌI nguồn ảnh (Pexels, Pixabay, Wikimedia Commons, Curated Library).
 * Tuyệt đối KHÔNG fail-open (nếu ảnh không khớp nội dung hoặc dính bẫy chất lượng -> REJECT ngay lập tức).
 */
export async function evaluateCandidateWithGeminiVision(buf, topic = {}, apiKey = '', visualSpec = null) {
  if (!buf || buf.length < 25000) {
    return { pass: false, score: 0, reason: 'Buffer too small (<25KB)' };
  }
  if (!apiKey) {
    return { pass: true, score: 8.0, reason: 'No GEMINI_API_KEY configured (local offline mode)' };
  }

  // Resize candidate image to 640x360 before sending to Gemini Vision for fast (<1.5s) & low-token evaluation
  let visionJpegBuf = buf;
  try {
    visionJpegBuf = await sharp(buf)
      .resize(640, 360, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch {
    return { pass: false, score: 0, reason: 'Invalid image buffer' };
  }

  const titleVi = topic.titleVi || topic.slugVi || '';
  const titleEn = topic.titleEn || topic.slugEn || '';
  const coreSubject = visualSpec?.coreSubject || titleVi || titleEn;
  const forbidden = visualSpec?.forbiddenSubjects || 'Cutouts on pure white/black backgrounds, pathology/autopsy jars, laboratory petri dishes, military scenes, amateur harsh-flash snapshots, messy computer rooms, burlap sacks, raw uncooked rice, plain tree twigs.';

  const prompt = `You are the strict Editorial Art Director for PhytoCodex, a premier biomedical & health publication directed by Dr. Xuan Chien Hoang (University of Hamburg).

Article Title (VI): "${titleVi}"
Article Title (EN): "${titleEn}"
Acceptable Visual Subject (any ONE of these is valid): "${coreSubject}"
Forbidden Visual Traps: "${forbidden}"

Inspect this candidate cover photograph and score its suitability from 1 to 10.
IMPORTANT EVALUATION GUIDELINES:
- Real editorial photography depicts a SINGLE clear, appetizing or relatable subject (e.g., steamed sweet potatoes on a plate, OR a clean bowl of healthy salad, OR a bright ergonomic laptop desk, OR a cozy bedroom at night, OR a vibrant woman brushing healthy hair). Do NOT demand multiple metaphors in one frame. If the photo is aesthetically refined (magazine quality, natural light, pleasant composition) and authentically matches the article headline, APPROVE IT ("pass": true, "score" >= 8.0).

MANDATORY REJECTION RULES (Must set "pass": false and "score" <= 4 if ANY of these apply):
1. CONTENT & EDITORIAL MISMATCH: The main visible subject does NOT directly align with the article's specific headline (e.g., coffee beans for late-night dinner, generic salad for skin wrinkles unless clearly skincare/collagen nutrition, olive tree branches for stomach cancer, marigold flower for H. pylori, gym equipment for food/sleep/liver topics).
2. ISOLATED CUTOUT ON PURE WHITE (#FFFFFF) OR PURE BLACK (#000000) BACKGROUND: Reject objects, bulbs, broccoli, chocolate chunks, or pills isolated on seamless pure white or pure black studio backgrounds. Cover photography MUST have a natural scene, shallow depth of field, warm lifestyle atmosphere, or natural table/kitchen/nature environment.
3. PATHOLOGY / AUTOPSY / FORMALDEHYDE MUSEUM JARS / PETRI DISHES: Reject preserved organs in jars, pickled brains, surgical gore, clinical lesions, or ugly agar petri dishes.
4. MILITARY / ARMY / HOSPITAL PATIENT BEDS: Reject military uniforms, camouflage field tents, or institutional hospital cots.
5. AMATEUR / UNAPPETIZING / CLUTTERED SNAPSHOTS: Reject harsh direct-flash snapshots, messy 2000s computer rooms with CRT monitors or tangled cables, dirty cafe tables with crumpled napkins, empty cheap hotel rooms, industrial wholesale burlap sacks, or dry uncooked white rice grains macro texture.
6. BOTANICAL TWIGS / TREE LEAVES WITHOUT FOOD: Reject plain tree branches or leaves without clearly recognizable food/fruit for dietary/nutrition articles.
7. COMMERCIAL PACKAGING / LOGOS / WATERMARKS / DIAGRAMS: Reject snack boxes, brand logos, stock watermarks, multi-panel figures, or text charts.

To PASS ("pass": true), the image MUST score >= 8.0 and look like a cohesive, appetizing, magazine-grade 35mm editorial photograph matching the headline (or clean, text-free 3D molecular/viral structural artwork when Acceptable Visual Subject explicitly allows it).

Reply ONLY in valid JSON:
{
  "pass": boolean,
  "score": number,
  "subject": "what is literally visible in the image",
  "reason": "why it passed or failed content alignment and aesthetic quality"
}`;

  for (const model of VISION_MODELS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 14000);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/jpeg', data: visionJpegBuf.toString('base64') } }
            ]
          }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text.replace(/^```json\s*|\s*```$/g, '').trim();
          const parsed = JSON.parse(cleaned);
          const score = Number(parsed.score) || 0;
          const pass = Boolean(parsed.pass) && score >= 8.0;
          return {
            pass,
            score,
            subject: parsed.subject || '',
            reason: parsed.reason || ''
          };
        }
      }
    } catch {
      // try next vision model in chain
    }
  }

  // FAIL-CLOSED: Không bao giờ duyệt mù ảnh chưa qua kiểm định thị giác!
  return { pass: false, score: 0, reason: 'Vision Gatekeeper could not verify image (Fail-Closed protection)' };
}

/**
 * Kiểm tra toàn diện 1 buffer ứng viên: Kích thước -> Định dạng -> Độc bản (MD5 + Perceptual) -> Gemini Vision Gatekeeper
 */
async function validateCandidateBuffer(buf, label, currentSlug, topic, geminiApiKey, visualSpec) {
  if (!buf || buf.length < 25000) return null;
  try {
    const meta = await sharp(buf).metadata();
    if (!meta || !['jpeg', 'png', 'webp'].includes(meta.format)) return null;
    if ((meta.width || 0) < 800 || (meta.height || 0) < 450) return null;

    if (await checkIfImageAlreadyUsed(buf, currentSlug)) {
      return null;
    }

    const evalResult = await evaluateCandidateWithGeminiVision(buf, topic, geminiApiKey, visualSpec);
    if (!evalResult.pass) {
      console.warn(`🛡️ [Vision Gatekeeper REJECTED] "${label}": Score ${evalResult.score}/10 — Subject: "${evalResult.subject}" | Reason: ${evalResult.reason}`);
      return null;
    }

    console.log(`✅ [Vision Gatekeeper APPROVED] "${label}": Score ${evalResult.score}/10 — Subject: "${evalResult.subject}"`);
    return buf;
  } catch {
    return null;
  }
}

/**
 * 1. Tải ảnh thực tế chất lượng cao từ Pexels API (Có kiểm duyệt Vision Gatekeeper)
 */
async function fetchFromPexels(keyword, apiKey, currentSlug, topic, geminiApiKey, visualSpec) {
  if (!apiKey) return null;
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&orientation=landscape&size=large&per_page=6`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey, 'User-Agent': 'Phytocodex-Engine/4.0' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const photos = data.photos || [];

    for (const photo of photos) {
      const imgUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
      if (!imgUrl) continue;

      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) continue;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      const validated = await validateCandidateBuffer(buf, `Pexels:${photo.id} (${keyword})`, currentSlug, topic, geminiApiKey, visualSpec);
      if (validated) return validated;
    }
  } catch (err) {
    console.warn(`[Pexels API Warning]: ${err.message}`);
  }
  return null;
}

/**
 * 2. Tải ảnh thực tế chất lượng cao từ Pixabay API (Có kiểm duyệt Vision Gatekeeper)
 */
async function fetchFromPixabay(keyword, apiKey, currentSlug, topic, geminiApiKey, visualSpec) {
  if (!apiKey) return null;
  try {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(keyword)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=6`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Phytocodex-Engine/4.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    const hits = data.hits || [];

    for (const hit of hits) {
      const imgUrl = hit.largeImageURL || hit.webformatURL;
      if (!imgUrl) continue;

      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) continue;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      const validated = await validateCandidateBuffer(buf, `Pixabay:${hit.id} (${keyword})`, currentSlug, topic, geminiApiKey, visualSpec);
      if (validated) return validated;
    }
  } catch (err) {
    console.warn(`[Pixabay API Warning]: ${err.message}`);
  }
  return null;
}

/**
 * 3. Tải ảnh thực tế chất lượng cao từ Wikimedia Commons (filetype:bitmap + chống rác + Vision Gatekeeper v4.0)
 */
async function fetchFromWikimediaCommons(keyword, currentSlug, topic = {}, geminiApiKey = '', visualSpec = null) {
  try {
    const filteredQuery = `filetype:bitmap -intitle:pdf -intitle:djvu -intitle:diagram -intitle:chart -intitle:specimen -intitle:pathology -intitle:autopsy -intitle:museum -intitle:military -intitle:army ${keyword}`;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(filteredQuery)}&prop=imageinfo&iiprop=url|size|mime&format=json&gsrlimit=12`;

    let data = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      await new Promise(r => setTimeout(r, attempt === 0 ? 900 : 4500));
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'PhytocodexBot/4.0 (https://phytocodex.vercel.app; info@phytocodex.org)' },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (res.status === 429) {
        const ra = parseInt(res.headers.get('retry-after') || '5', 10);
        if (attempt === 0) {
          await new Promise(r => setTimeout(r, Math.min(Math.max(ra, 3), 15) * 1000));
          continue;
        }
        return null;
      }
      if (!res.ok) return null;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        if (attempt === 0) continue;
        return null;
      }
      data = await res.json();
      break;
    }
    if (!data) return null;
    const pages = Object.values(data.query?.pages || {});

    for (const p of pages) {
      const title = (p.title || '').toLowerCase();
      // Loại bỏ sơ đồ, bài báo scan, fossil, diatom, vector, clip-art, bệnh học/xác chết, quân đội, bao tải, đĩa petri, ảnh lịch sử
      if (/schema|diagram|figure|plate|drawing|clipart|icon|vector|symbol|flag of|map of|logo|packaging|brand|snack|in-pack|box|fossil|diatom|specimen|scan|gazette|newsletter|report|bulletin|journal|ia_|manuscript|epsos|watermark|lockout|chart|graph|plot|table|loc |nclc|pathology|autopsy|cadaver|formalin|formaldehyde|brain_in|military|soldier|army|burlap|petri|189\d|190\d|191\d|192\d|\.pdf$|\.djvu$|\.svg$|\.gif$/i.test(title)) {
        continue;
      }

      const info = p.imageinfo?.[0];
      if (!info || Math.max(info.width, info.height) < 1100 || Math.min(info.width, info.height) < 550) continue;
      if (info.width < info.height * 0.85) continue; // Bắt buộc khung ngang hoặc gần vuông cho bìa 16:9
      const fileUrl = info.url || '';
      if (fileUrl.match(/\.(pdf|djvu|svg|gif|webm|ogg|tif|tiff)$/i)) continue;

      try {
        await new Promise(r => setTimeout(r, 200));
        const fetchCtrl = new AbortController();
        const fetchTimeout = setTimeout(() => fetchCtrl.abort(), 12000);
        const imgRes = await fetch(fileUrl, {
          headers: { 'User-Agent': 'PhytocodexBot/4.0 (https://phytocodex.vercel.app; info@phytocodex.org)' },
          signal: fetchCtrl.signal
        });
        clearTimeout(fetchTimeout);

        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer());
          const validated = await validateCandidateBuffer(buf, title, currentSlug, topic, geminiApiKey, visualSpec);
          if (validated) return validated;
        }
      } catch {
        // ignore single file fetch timeout
      }
    }
  } catch (err) {
    console.warn(`[Wikimedia Commons Warning]: ${err.message}`);
  }
  return null;
}

/**
 * 4. Thư viện ảnh lưu trữ thẩm mỹ cao (Curated High-Resolution 4K Unsplash/Editorial Library)
 * BẮT BUỘC đi qua Vision Gatekeeper khi có GEMINI_API_KEY để đảm bảo 100% ăn nhập với nội dung bài viết.
 * TUYỆT ĐỐI KHÔNG bỏ qua kết quả từ chối của Vision Gatekeeper!
 */
const CURATED_EDITORIAL_TITLES = {
  Oncology: [
    'Broccoli sprouts.jpg',
    'Fresh Vegetable Produce (Unsplash).jpg',
    'Healthy Vegetables (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Healthy lentil salad (Unsplash).jpg',
    'Salad Bowl (Unsplash).jpg',
    'Sejak tea leaves.jpg',
    'Curcuma longa roots.jpg'
  ],
  Cancer: [
    'Broccoli sprouts.jpg',
    'Fresh Vegetable Produce (Unsplash).jpg',
    'Healthy Vegetables (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Healthy lentil salad (Unsplash).jpg',
    'Salad Bowl (Unsplash).jpg',
    'Sejak tea leaves.jpg',
    'Curcuma longa roots.jpg'
  ],
  Metabolic: [
    'Healthy Meal Prep (Unsplash).jpg',
    'Salad Bowl (Unsplash).jpg',
    'Vegetable Salad (Unsplash).jpg',
    'Healthy lentil salad (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Healthy breakfast (Unsplash).jpg',
    'Sweet morning coffee (Unsplash).jpg',
    'Broccoli sprouts.jpg',
    'Sejak tea leaves.jpg',
    'Strawberry and blueberries (Unsplash V6FcCG14q30).jpg'
  ],
  Brain: [
    'Early morning in autumn forest (Unsplash).jpg',
    'Yoga sunrise. (Unsplash).jpg',
    'Laptop on a neat desk (Unsplash).jpg',
    'Macbook and tea (Unsplash).jpg',
    'Sweet morning coffee (Unsplash).jpg',
    'Sejak tea leaves.jpg',
    'Woman yoga pose sunrise (Unsplash).jpg'
  ],
  Gut: [
    'Salad Bowl (Unsplash).jpg',
    'Vegetable Salad (Unsplash).jpg',
    'Healthy lentil salad (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Healthy breakfast (Unsplash).jpg',
    'Healthy Meal Prep (Unsplash).jpg',
    'Broccoli sprouts.jpg',
    'Fresh Vegetable Produce (Unsplash).jpg'
  ],
  Cardiovascular: [
    'Fresh Vegetable Produce (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Strawberry and blueberries (Unsplash V6FcCG14q30).jpg',
    'Theobroma cacao (cacao 2).jpg',
    'Salad Bowl (Unsplash).jpg',
    'Fruit Platter (Unsplash).jpg'
  ],
  Heart: [
    'Fresh Vegetable Produce (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Salad Bowl (Unsplash).jpg',
    'Strawberry and blueberries (Unsplash V6FcCG14q30).jpg',
    'Theobroma cacao (cacao 2).jpg',
    'Fruit Platter (Unsplash).jpg'
  ],
  'Cellular Aging': [
    'Fruit Platter (Unsplash).jpg',
    'Strawberry and blueberries (Unsplash V6FcCG14q30).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Early morning in autumn forest (Unsplash).jpg',
    'Yoga sunrise. (Unsplash).jpg',
    'Healthy Vegetables (Unsplash).jpg'
  ],
  Immune: [
    'Healthy Vegetables (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Broccoli sprouts.jpg',
    'Curcuma longa roots.jpg',
    'Sejak tea leaves.jpg'
  ],
  Immunity: [
    'Healthy Vegetables (Unsplash).jpg',
    'Healthy harvest (Unsplash).jpg',
    'Broccoli sprouts.jpg',
    'Curcuma longa roots.jpg',
    'Sejak tea leaves.jpg'
  ],
  Liver: [
    'Broccoli sprouts.jpg',
    'Vegetable Salad (Unsplash).jpg',
    'Healthy lentil salad (Unsplash).jpg',
    'Sejak tea leaves.jpg'
  ]
};

export async function fetchWikimediaImageByTitle(title, currentSlug, topic = {}, geminiApiKey = '', visualSpec = null, skipVision = false) {
  try {
    const cleanTitle = title.replace(/^File:/i, '');
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(cleanTitle)}&prop=imageinfo&iiprop=url|size|mime&format=json`;
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'PhytocodexBot/4.0 (https://phytocodex.vercel.app; info@phytocodex.org)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    const info = page?.imageinfo?.[0];
    if (!info || !info.url) return null;

    const imgRes = await fetch(info.url, {
      headers: { 'User-Agent': 'PhytocodexBot/4.0 (https://phytocodex.vercel.app; info@phytocodex.org)' }
    });
    if (!imgRes.ok) return null;
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (skipVision) {
      if (buf.length > 25000 && !(await checkIfImageAlreadyUsed(buf, currentSlug))) {
        return buf;
      }
      return null;
    }
    return await validateCandidateBuffer(buf, `Curated:${cleanTitle}`, currentSlug, topic, geminiApiKey, visualSpec);
  } catch (err) {
    console.warn(`[Curated Library Warning]: ${err.message}`);
  }
  return null;
}

async function fetchFromCuratedEditorialLibrary(slug, topic = {}, apiKey = '', visualSpec = null) {
  const organ = topic.organ || 'Metabolic';
  const candidates = CURATED_EDITORIAL_TITLES[organ] || CURATED_EDITORIAL_TITLES.Metabolic;
  const hash = crypto.createHash('md5').update(slug.replace(/-(vi|en)$/, '')).digest('hex');
  const startIndex = parseInt(hash.slice(0, 4), 16) % candidates.length;

  // Khi có GEMINI_API_KEY: Bắt buộc kiểm định qua Vision Gatekeeper, TUYỆT ĐỐI KHÔNG bỏ qua khi bị từ chối!
  // Chỉ chạy skipVision ở chế độ cục bộ không có API key (!apiKey).
  const skipVision = !apiKey;
  for (let i = 0; i < candidates.length; i++) {
    const idx = (startIndex + i) % candidates.length;
    const title = candidates[idx];
    const buf = await fetchWikimediaImageByTitle(title, slug, topic, apiKey, visualSpec, skipVision);
    if (buf) {
      console.log(`🏛️ [Curated Library] Đã kích hoạt ảnh lưu trữ đạt chuẩn: "${title}"`);
      return buf;
    }
  }
  return null;
}

/**
 * 5. Bộ sinh bìa chuyên khảo đồ họa chuẩn hóa SVG (Procedural Monograph Card)
 * Chỉ kích hoạt khi toàn bộ kết nối API bên ngoài đều gián đoạn hoặc không tìm được ảnh khớp 100% nội dung.
 * Đảm bảo tính ĐỘC BẢN 100%, hiển thị chính xác tiêu đề bài viết, TUYỆT ĐỐI KHÔNG GÁN ẢNH LỆCH CHỦ ĐỀ.
 */
async function generateProceduralMonographImage(slug, topic = {}) {
  const isEn = slug.endsWith('-en');
  const organ = topic.organ || 'Metabolic';
  const title = (isEn ? (topic.titleEn || topic.titleVi || slug) : (topic.titleVi || topic.titleEn || slug)).replace(/[<>&"]/g, '');
  const tier = (topic.tier || (isEn ? 'Evidence Monograph' : 'Chuyên khảo thực chứng')).toUpperCase();

  const PALETTES = {
    Cardiovascular: { bg1: '#1a0910', bg2: '#0b1320', accent: '#f43f5e', ring: '#e11d48' },
    Heart: { bg1: '#1a0910', bg2: '#0b1320', accent: '#f43f5e', ring: '#e11d48' },
    Brain: { bg1: '#071326', bg2: '#0b192c', accent: '#38bdf8', ring: '#0284c7' },
    Gut: { bg1: '#041c14', bg2: '#09291e', accent: '#10b981', ring: '#059669' },
    Metabolic: { bg1: '#0a1628', bg2: '#0d233a', accent: '#00f2fe', ring: '#0284c7' },
    'Cellular Aging': { bg1: '#180a2b', bg2: '#110b24', accent: '#c084fc', ring: '#9333ea' },
    Immunity: { bg1: '#261304', bg2: '#1c140a', accent: '#f59e0b', ring: '#d97706' },
    Immune: { bg1: '#261304', bg2: '#1c140a', accent: '#f59e0b', ring: '#d97706' },
    Oncology: { bg1: '#0f172a', bg2: '#062019', accent: '#10b981', ring: '#059669' },
    Cancer: { bg1: '#0f172a', bg2: '#062019', accent: '#10b981', ring: '#059669' },
    Liver: { bg1: '#181206', bg2: '#0f1a14', accent: '#10b981', ring: '#047857' }
  };
  const pal = PALETTES[organ] || PALETTES.Metabolic;

  const words = title.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).length > 38 && current.length > 0) {
      lines.push(current);
      current = w;
    } else {
      current = current ? current + ' ' + w : w;
    }
  }
  if (current) lines.push(current);
  const titleSvgLines = lines.slice(0, 3).map((l, i) =>
    `<text x="90" y="${330 + i * 52}" fill="#ffffff" font-family="Georgia, serif" font-size="40" font-weight="700" letter-spacing="-0.5">${l}</text>`
  ).join('');

  const svg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.bg1}" />
        <stop offset="100%" stop-color="${pal.bg2}" />
      </linearGradient>
      <radialGradient id="glow" cx="85%" cy="20%" r="55%">
        <stop offset="0%" stop-color="${pal.accent}" stop-opacity="0.22" />
        <stop offset="100%" stop-color="${pal.accent}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5D061" />
        <stop offset="100%" stop-color="#E6AF2E" />
      </linearGradient>
    </defs>

    <rect width="1280" height="720" fill="url(#bg)" />
    <rect width="1280" height="720" fill="url(#glow)" />

    <g stroke="${pal.accent}" stroke-width="1.2" stroke-opacity="0.18" fill="none">
      <polygon points="980,180 1060,135 1140,180 1140,270 1060,315 980,270" />
      <polygon points="1060,315 1140,270 1220,315 1220,405 1140,450 1060,405" />
      <polygon points="900,315 980,270 980,180 900,135 820,180 820,270" />
      <circle cx="1060" cy="135" r="5" fill="${pal.accent}" fill-opacity="0.4" />
      <circle cx="1140" cy="270" r="6" fill="${pal.accent}" fill-opacity="0.5" />
      <circle cx="1060" cy="315" r="5" fill="${pal.accent}" fill-opacity="0.4" />
      <circle cx="980" cy="270" r="4" fill="${pal.accent}" fill-opacity="0.3" />
    </g>

    <g transform="translate(90, 80)">
      <circle cx="20" cy="20" r="20" fill="url(#gold)" />
      <circle cx="20" cy="20" r="14" fill="#070d19" />
      <circle cx="20" cy="20" r="7" fill="url(#gold)" />
      <text x="56" y="27" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900" letter-spacing="3">PHYTOCODEX</text>
      <text x="225" y="26" fill="${pal.accent}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">· DECODING THE MOLECULES OF HEALTH</text>
    </g>

    <g transform="translate(90, 210)">
      <rect width="260" height="34" rx="17" fill="${pal.accent}" fill-opacity="0.12" stroke="${pal.accent}" stroke-width="1.2" stroke-opacity="0.4" />
      <text x="15" y="22" fill="${pal.accent}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1.2">${organ.toUpperCase()} · ${tier}</text>
    </g>

    ${titleSvgLines}

    <g transform="translate(90, 620)">
      <line x1="0" y1="0" x2="1100" y2="0" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
      <text x="0" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Dr. Xuan Chien Hoang · University of Hamburg</text>
      <text x="1100" y="38" text-anchor="end" fill="#64748b" font-family="system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="0.5">EVIDENCE-BASED BIOMEDICAL MONOGRAPH</text>
    </g>
  </svg>
  `;

  return sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer();
}

/**
 * Chuẩn hóa ảnh về tỷ lệ vàng 16:9 (1280x720) và tự động sinh cover / thumbnail WebP song song
 */
export async function processAndSaveImage(rawBuffer, slug) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  const thumbPath = path.join(thumbsDir, `${slug}.webp`);
  const coverPath = path.join(coversDir, `${slug}.webp`);

  await sharp(rawBuffer)
    .resize(1280, 720, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88 })
    .toFile(targetPath);

  await sharp(targetPath)
    .resize(720, 405, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(thumbPath);

  await sharp(targetPath)
    .resize(1280, 720, { fit: 'cover', position: 'centre' })
    .webp({ quality: 84 })
    .toFile(coverPath);

  return targetPath;
}

/**
 * Điều phối sinh / thu thập ảnh độc bản bám sát 100% nội dung cho bài viết mới
 */
export async function generateDispatchImage(slug, topic = {}) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }

  const { PEXELS_API_KEY, PIXABAY_API_KEY, GEMINI_API_KEY } = resolveApiKeys();

  // Bước 1: 100% Deterministic Visual Spec Engine v4.0 (Zero-LLM Query Generation, Zero Token Cost)
  const visualSpec = buildDeterministicVisualSpec(topic);
  const keywordCandidates = visualSpec.queries;

  console.log(`📸 [Image Engine v4.0 Tất Định] Tìm ảnh chụp thực tế 100% cho "${slug}"...`);
  console.log(`   🎯 Tiêu chuẩn chủ thể: ${visualSpec.coreSubject}`);
  console.log(`   🔍 Từ khóa tất định: ${keywordCandidates.slice(0, 5).map(k => `"${k}"`).join(', ')}`);

  // Bước 2: Duyệt qua từng từ khóa ứng viên (Tất cả các tầng đều phải vượt qua Fail-Closed Gemini Vision Gatekeeper v4.0)
  for (const keyword of keywordCandidates) {
    // TẦNG 1: Pexels API (Nếu có key)
    if (PEXELS_API_KEY) {
      const pexelsBuffer = await fetchFromPexels(keyword, PEXELS_API_KEY, slug, topic, GEMINI_API_KEY, visualSpec);
      if (pexelsBuffer) {
        await processAndSaveImage(pexelsBuffer, slug);
        console.log(`✅ [Image Engine] Đã lưu ảnh Pexels 4K đạt chuẩn Vision ("${keyword}") -> ${slug}.jpg`);
        return targetPath;
      }
    }

    // TẦNG 2: Pixabay API (Nếu có key)
    if (PIXABAY_API_KEY) {
      const pixabayBuffer = await fetchFromPixabay(keyword, PIXABAY_API_KEY, slug, topic, GEMINI_API_KEY, visualSpec);
      if (pixabayBuffer) {
        await processAndSaveImage(pixabayBuffer, slug);
        console.log(`✅ [Image Engine] Đã lưu ảnh Pixabay đạt chuẩn Vision ("${keyword}") -> ${slug}.jpg`);
        return targetPath;
      }
    }

    // TẦNG 3: Wikimedia Commons (Kho tư liệu mở `filetype:bitmap` + Vision Gatekeeper v4.0)
    const wikiBuffer = await fetchFromWikimediaCommons(keyword, slug, topic, GEMINI_API_KEY, visualSpec);
    if (wikiBuffer) {
      await processAndSaveImage(wikiBuffer, slug);
      console.log(`✅ [Image Engine] Đã lưu ảnh thực tế Wikimedia đạt chuẩn Vision ("${keyword}") -> ${slug}.jpg`);
      return targetPath;
    }
  }

  // TẦNG 4: Curated Editorial Library (Chỉ chấp nhận nếu vượt qua Vision Gatekeeper khớp chủ đề!)
  console.log(`🏛️ [Image Engine] Kiểm tra Curated Editorial Library cho "${slug}"...`);
  const curatedBuffer = await fetchFromCuratedEditorialLibrary(slug, topic, GEMINI_API_KEY, visualSpec);
  if (curatedBuffer) {
    await processAndSaveImage(curatedBuffer, slug);
    console.log(`✅ [Image Engine] Đã lưu ảnh từ Curated Library đạt chuẩn Vision -> ${slug}.jpg`);
    return targetPath;
  }

  // TẦNG 5: Procedural Monograph Card (Hiển thị chính xác tiêu đề chuyên khảo, tuyệt đối không lấy ảnh râu ông nọ cắm cằm bà kia)
  console.warn(`🎨 [Image Engine] Kích hoạt Procedural Monograph Artwork cho "${slug}"...`);
  const proceduralBuffer = await generateProceduralMonographImage(slug, topic);
  await processAndSaveImage(proceduralBuffer, slug);
  console.log(`✅ [Image Engine] Đã tạo bìa chuyên khảo đồ họa độc bản -> ${slug}.jpg`);
  return targetPath;
}
