/**
 * Autonomous Image Generation Module for Phytocodex
 * Powered by Pollinations.ai (Flux Engine — 100% Free, Unlimited, Zero-Key required)
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * - Generates high-definition, photorealistic 16:9 biomedical & lifestyle illustrations
 * - Fallback to Curated Archetypes if network times out
 * - Zero API key leaks, fully server-side execution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'public/images/posts');

/**
 * Xây dựng prompt sinh ảnh chuẩn y sinh / phong cách TS. Hoàng Xuân Chiến
 */
function buildBiomedicalImagePrompt(topic) {
  const isLifeTier = (topic.tier === 'Life Dispatch' || topic.tier === 'life');
  const organ = topic.organ || 'Metabolic';
  const title = topic.titleEn || topic.titleVi;

  if (isLifeTier) {
    return `Editorial fine-art scientific lifestyle photography: ${title}. Modern natural morning lighting, organic healthy metabolic vitality, crisp depth of field, authentic aesthetic, 8k resolution, cinematic color grading, absolutely no text, no watermarks, 16:9 aspect ratio.`;
  }

  return `Nature-grade 3D scientific visualization: Molecular mechanism of ${title}. High-end biomedical rendering of ${organ} physiological pathways, subtle bioluminescent glow, volumetric depth of field, precision cellular structures, ultra-fine detailing, scientific accuracy, cinematic lighting, 8k render, no text, no watermarks, 16:9 aspect ratio.`;
}

/**
 * Sinh ảnh mới qua Pollinations.ai (Flux)
 */
export async function generateDispatchImage(slug, topic = {}) {
  const targetPath = path.join(imagesDir, `${slug}.jpg`);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }

  const prompt = buildBiomedicalImagePrompt(topic);
  console.log(`🎨 [Pollinations AI] Đang tạo ảnh bìa Flux 16:9 độc bản cho "${slug}"...`);

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    // Pollinations AI URL với model flux và kích thước 16:9
    const seed = Math.floor(Math.random() * 1000000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&model=flux&seed=${seed}&nologo=true`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Phytocodex-Dispatch-Engine/2.0'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`⚠️ [Pollinations AI] Server phản hồi HTTP ${response.status}. Chuyển sang ảnh mẫu Archetype.`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length < 20000) {
      console.warn(`⚠️ [Pollinations AI] Ảnh tải về kích thước quá nhỏ (${buffer.length} bytes). Chuyển sang ảnh mẫu.`);
      return null;
    }

    fs.writeFileSync(targetPath, buffer);
    console.log(`✅ [Pollinations AI] Đã tạo và lưu thành công ảnh độc bản (${(buffer.length / 1024).toFixed(0)} KB) -> public/images/posts/${slug}.jpg`);
    return targetPath;
  } catch (err) {
    console.warn(`⚠️ [Pollinations AI] Lỗi hoặc hết thời gian chờ: ${err.message}. Tự động kích hoạt ảnh mẫu Archetype.`);
    return null;
  }
}
