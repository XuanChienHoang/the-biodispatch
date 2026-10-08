/**
 * Autonomous Gemini Topic & Content Generator for The BioDispatch
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 * 
 * Generates brand new cutting-edge bilingual dispatches adhering to:
 * - 7 Editorial Gatekeeper criteria
 * - TS. Xuan Chien Hoang's tone & storytelling archetype
 * - No em-dash/en-dash
 * - Clear analogical blockquote
 * - Linear pathway flowchart ([A] ──► [B])
 * - Clinical comparison table
 * - Actionable clinical protocols / translation takeaway
 */

import fs from 'fs';
import path from 'path';

// Model candidates with fallback support
const MODEL_CANDIDATES = [
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash'
];

function resolveGeminiApiKey() {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }

  // Fallback to local configs if available
  const candidateConfigPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    'c:/Hoang\'s projects/03_DR_HOANG_CONTENT_AND_MEDIA/instagram_facts_studio/config.env'
  ];

  for (const p of candidateConfigPaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const match = content.match(/GEMINI_API_KEY=(.*)/);
      if (match && match[1].trim()) {
        return match[1].trim().replace(/["']/g, '');
      }
    }
  }

  return '';
}

export async function generateTopicWithGemini(existingSlugs = []) {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    console.warn('⚠️ [Gemini Generator] Không tìm thấy GEMINI_API_KEY trong env.');
    return null;
  }

  const existingSample = existingSlugs.slice(0, 30).join(', ');

  const systemInstruction = `Bạn là TS. Hoàng Xuân Chiến (Dr. rer. nat. - Đại học Hamburg, CHLB Đức), Giám đốc Học thuật kiêm Tổng biên tập của ấn bản y sinh "The BioDispatch" (the-biodispatch.vercel.app).
Bạn là chuyên gia hàng đầu về Y học Chuyển hóa, Lão hóa & Trường thọ (Metabolic Longevity), Dược động học và Tín hiệu tế bào.

MỤC TIÊU:
Nghiên cứu và tạo ra 1 chủ đề bài viết chuyên khảo y sinh song ngữ MỚI HOÀN TOÀN, đột phá, mang tính thực chứng cao (Nature/Science/Cell/Lancet), chưa từng xuất hiện trong danh sách đã có.

QUY TẮC BẮT BUỘC:
1. KHÔNG dùng bất kỳ dấu em-dash (—) hay en-dash (–) nào. Chỉ dùng dấu phẩy, hai chấm, gạch nối ngắn (-) hoặc ngoặc đơn.
2. Tiêu đề (titleVi, titleEn): Hấp dẫn, sâu sắc, tối thiểu 20 ký tự.
3. Tóm tắt (excerptVi, excerptEn): Tối thiểu 100 từ, nêu bật nghịch lý sinh học hoặc hiểu lầm phổ biến.
4. Ẩn dụ (analogyVi, analogyEn): Một đoạn so sánh ví von đời thường cực kỳ tinh tế, giải thích cơ chế phân tử bằng hình ảnh thân thuộc (ví dụ ví ty thể với nhà máy điện, hệ thống làm sạch với xe rửa đường...).
5. Dẫn nhập (leadVi, leadEn): Mở đầu bằng câu chuyện đời thực, hiện tượng quen thuộc, bóc tách hiểu lầm trước khi đi vào cơ chế khoa học. Tối thiểu 150 từ.
6. Sơ đồ Flowchart (flowchart): Chuỗi phản ứng phân tử bắt buộc dùng mũi tên "──►" và ngoặc vuông, ví dụ: [Tác nhân] ──► [Thụ thể/Enzyme] ──► [Đáp ứng tế bào]
7. Phần nội dung (sectionsVi, sectionsEn): Phải có ĐỦ 3 phần chi tiết (Heading + Body):
   - Phần 1: Cơ chế phân tử vi mô & các thụ thể/enzymes chủ chốt (giải nghĩa rõ từng chữ viết tắt).
   - Phần 2: Nghịch lý sinh học và BẮT BUỘC có 1 BẢNG SO SÁNH MARKDOWN (Markdown Table) đối chiếu các chỉ số sinh lý / trạng thái lâm sàng.
   - Phần 3: BẮT BUỘC là phần "Ứng dụng thực tế & Lời khuyên lâm sàng" (Heading phải chứa từ như "Chiến lược lâm sàng", "Ứng dụng thực tế", "Khuyến nghị an toàn", hoặc "Tối ưu hóa lối sống").
8. Đảm bảo tổng độ dài văn bản mỗi ngôn ngữ đạt trên 800 - 1.200 từ.
9. Cung cấp DOI thực chứng hoặc chuẩn mực của các bài báo uy tín (Science, Nature, Cell, PNAS, Lancet, JCI...) kèm PMID.`;

  const prompt = `Hãy sáng tạo một bài phân tích chuyên khảo y sinh song ngữ (Tiếng Việt và Tiếng Anh) cho ấn bản The BioDispatch của TS. Hoàng Xuân Chiến.
QUAN TRỌNG VỀ ĐỊNH HƯỚNG NỘI DUNG MỚI:
- CHỦ ĐỀ GẦN GŨI VỚI ĐỜI THỰC: Tập trung vào các loại THỰC PHẨM CHỨC NĂNG, HOẠT CHẤT HOẶC THÓI QUEN DINH DƯỠNG PHỔ BIẾN mà mọi người hay dùng hàng ngày (ví dụ: Magie L-Threonate vs Magie Glycinate cho giấc ngủ; Collagen thủy phân và sự thật về việc hấp thu vào da; Berberine và lời đồn "Ozempic tự nhiên"; Creatine cho trí não người không tập gym; Omega-3 Triglyceride vs Ethyl Ester; Ashwagandha và hạ cortisol; Vitamin D3 phối hợp K2 MK-7 chống vôi hóa mạch; Kẽm Carnosine bảo vệ niêm mạc dạ dày; v.v.).
- BẮT ĐẦU TỪ HIỂU LẦM / SỰ THẬT ĐỜI THỰC: Khởi đầu bằng những băn khoăn, quảng cáo thổi phồng hay hiểu lầm phổ biến của cộng đồng, sau đó dùng các nghiên cứu lâm sàng mới nhất để làm rõ sự thật khách quan (được gì, mất gì, ai nên dùng, ai không nên dùng).
- CÂN BẰNG GIỮA DỄ HIỂU VÀ CHUYÊN MÔN: Phần mở đầu và ứng dụng cực kỳ dễ hiểu, gần gũi. Phần cơ chế phân tử giải thích rõ ràng, súc tích có giải nghĩa thuật ngữ, không viết quá hàn lâm đánh đố bạn đọc thông thường.
- Slug tiếng Việt BẮT BUỘC có hậu tố "-vi" (ví dụ: magie-glycinate-giac-ngu-vi), slug tiếng Anh BẮT BUỘC có hậu tố "-en" (ví dụ: magnesium-glycinate-sleep-en) để hệ thống tự động nhận diện ngôn ngữ tuyệt đối!

Các chủ đề đã xuất bản gần đây (TRÁNH TRÙNG LẶP):
${existingSample}

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON SCHEMA VỚI CẤU TRÚC:
{
  "topicId": "slug-id-viet-tat",
  "slugVi": "slug-tieng-viet-co-hau-to-vi",
  "slugEn": "slug-tieng-anh-co-hau-to-en",
  "titleVi": "Tiêu đề tiếng Việt",
  "titleEn": "Tiêu đề tiếng Anh",
  "excerptVi": "Tóm tắt tiếng Việt",
  "excerptEn": "Tóm tắt tiếng Anh",
  "organ": "Brain | Heart | Liver | Gut | Longevity | Cellular Aging",
  "tier": "Clinical Deep-Dive",
  "tagsVi": ["Tag 1", "Tag 2", "Tag 3"],
  "tagsEn": ["Tag 1", "Tag 2", "Tag 3"],
  "doi": "10.1038/...",
  "pmid": "12345678",
  "journal": "Nature",
  "year": 2024,
  "gizmo": "pathway",
  "readingTimeVi": "9 phút đọc",
  "readingTimeEn": "9 min read",
  "analogyVi": "Lời giải thích ẩn dụ...",
  "analogyEn": "Metaphorical analogy...",
  "leadVi": "Lời dẫn nhập tiếng Việt...",
  "leadEn": "Lead in English...",
  "flowchartVi": "[Bước 1 bằng Tiếng Việt] ──► [Bước 2] ──► [Bước 3]",
  "flowchartEn": "[Step 1 in English] ──► [Step 2] ──► [Step 3]",
  "sectionsVi": [
    { "heading": "1. Tiêu đề mục 1", "body": "Nội dung chi tiết mục 1..." },
    { "heading": "2. Tiêu đề mục 2 (Bao gồm bảng so sánh markdown)", "body": "Nội dung mục 2 kèm | Bảng | So sánh |..." },
    { "heading": "3. Ứng dụng thực tế & Chiến lược lâm sàng", "body": "Nội dung mục 3 ứng dụng..." }
  ],
  "sectionsEn": [
    { "heading": "1. Heading 1", "body": "Section 1 body..." },
    { "heading": "2. Heading 2 (Includes comparison table)", "body": "Section 2 body with | Markdown | Table |..." },
    { "heading": "3. Translational Protocols & Clinical Strategies", "body": "Section 3 translational protocols..." }
  ]
}`;

  for (const model of MODEL_CANDIDATES) {
    try {
      console.log(`🤖 [Gemini Generator] Đang thử kết nối AI model: ${model}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.6
          }
        })
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const errBody = await res.text();
        console.warn(`⚠️ [Gemini Generator] Model ${model} phản hồi status ${res.status}: ${errBody.slice(0, 150)}...`);
        continue;
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText);
      if (parsed && parsed.slugVi && parsed.sectionsVi && parsed.sectionsEn) {
        console.log(`🎯 [Gemini Generator] AI đã sinh thành công chuyên khảo: "${parsed.titleVi}"`);
        return parsed;
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Generator] Lỗi khi gọi ${model}: ${err.message}`);
    }
  }

  return null;
}
