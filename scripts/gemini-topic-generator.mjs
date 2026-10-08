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
9. TÀI LIỆU THAM KHẢO CHÍNH XÁC TUYỆT ĐỐI (ZERO HALLUCINATION):
   - Cung cấp bài báo gốc có thật đã xuất bản trên các tạp chí hàng đầu (Nature, Science, Cell, Lancet, NEJM, PNAS, JCI, v.v.).
   - "refPaperTitle": Tiêu đề NGUYÊN GỐC CỦA BÀI BÁO KHOA HỌC (chính xác từng chữ trên PubMed/CrossRef, KHÔNG lấy tiêu đề bài dispatch đặt vào đây).
   - "refAuthors": Tác giả chính hoặc nhóm nghiên cứu (ví dụ "Jones, S.A., Kunji, E.R.S. et al.").
   - "refJournal": Tên tạp chí khoa học (ví dụ "Nature", "Cell", "Science Advances").
   - "refYear": Năm xuất bản chính xác.
   - "refDoi": Mã DOI CHÍNH XÁC CỦA BÀI BÁO (bắt đầu bằng 10.xxxx/..., khi bấm vào https://doi.org/[refDoi] PHẢI mở đúng bài báo này).
   - "refPmid": Mã PMID chính xác trên PubMed tương ứng với DOI đó.
   - "refAbstract": Tóm tắt học thuật bằng tiếng Anh của chính nghiên cứu đó (khoảng 3-4 câu).
   - TUYỆT ĐỐI KHÔNG gán DOI của bài báo này cho bài báo khác!`;

  // Đa dạng hóa chuyên đề theo 6 trụ cột y sinh thực tế & xu hướng thời sự y học
  const DOMAIN_PILLARS = [
    {
      domain: 'Thực phẩm Chức năng & Vi chất Dinh dưỡng (Nutraceuticals & Supplement Science)',
      organ: 'Metabolic',
      ideas: [
        'Magie L-Threonate vs Magie Glycinate: Dạng nào thực sự vượt qua hàng rào máu não (BBB) cải thiện giấc ngủ và lo âu?',
        'Collagen peptide thủy phân: Sự thật về việc hấp thu qua ruột và kích thích nguyên bào sợi dưới da hay chỉ là acid amin thông thường?',
        'Berberine và lời đồn "Ozempic tự nhiên": Cơ chế ức chế PCSK9, kích hoạt AMPK và phân tích hiệu quả thực tế lâm sàng',
        'Creatine cho trí não: Tại sao phụ nữ và người lớn tuổi không tập gym vẫn hưởng lợi từ việc dự trữ phosphocreatine tế bào thần kinh?',
        'Omega-3 Triglyceride vs Ethyl Ester: Sinh khả dụng, độ bền oxy hóa và rủi ro rung nhĩ khi dùng liều cao',
        'Vitamin D3 phối hợp K2 MK-7: Cơ chế kích hoạt Osteocalcin và Matrix Gla Protein (MGP) để ngăn vôi hóa thành động mạch'
      ]
    },
    {
      domain: 'Dịch tễ học, Vi sinh vật & Thời sự Y học Mới nổi (Epidemiology & Infectious Biology - Zero Politics)',
      organ: 'Immune',
      ideas: [
        'Vi khuẩn Yersinia pestis (Dịch hạch): Cơ chế tiết độc tố hệ thống loại III (T3SS), làm tê liệt đại thực bào và góc nhìn y học hiện đại về chẩn đoán/kháng sinh',
        'Cúm gia cầm H5N1 đột biến thụ thể acid sialic: Ranh giới phân tử giữa lây nhiễm gia cầm (alpha-2,3) và lây nhiễm sang người (alpha-2,6)',
        'Kháng kháng sinh thế hệ mới: Cơ chế bơm tống thuốc (efflux pump) và enzyme phân giải beta-lactamase phổ rộng',
        'Virus Epstein-Barr (EBV) và mối liên hệ phân tử với bệnh Đa xơ cứng (Multiple Sclerosis) qua hiện tượng bắt chước phân tử (molecular mimicry)'
      ]
    },
    {
      domain: 'Sức khỏe Não bộ, Giấc ngủ & Trục Thần kinh (Neuroscience & Circadian Biology)',
      organ: 'Brain',
      ideas: [
        'Melatonin liều vi lượng (0.3 mg) vs liều cao (5-10 mg): Nghịch lý bão hòa thụ thể MT1/MT2 và tình trạng trơ nhịp sinh học',
        'Hệ thống Glymphatic: Tư thế ngủ nghiêng và vai trò của kênh nước AQP4 trong việc dọn dẹp mảng bám Beta-Amyloid khi ngủ sâu',
        'L-Theanine kết hợp Caffeine: Cơ chế kích hoạt sóng não Alpha và ức chế thụ thể glutamate chống kích thích quá mức',
        'Trục Não - Ruột (Vagus Nerve): Vi khuẩn đường ruột sản xuất chất dẫn truyền thần kinh GABA và ảnh hưởng đến trầm cảm/lo âu'
      ]
    },
    {
      domain: 'Chuyển hóa Năng lượng & Kiểm soát Đường huyết (Metabolic Health & Glucose Dynamics)',
      organ: 'Metabolic',
      ideas: [
        'Giấm táo (Acid Acetic) trước bữa ăn: Sự thật về việc làm chậm rỗng dạ dày và ức chế enzyme alpha-glucosidase giảm đột biến đường huyết',
        'Thứ tự ăn uống (Rau ──► Đạm ──► Tinh bột): Cơ chế phóng thích GLP-1 nội sinh và làm phẳng đường cong glucose sau ăn',
        'Kháng Insulin tại cơ bắp vs tại gan: Cơ chế tích tụ Diacylglycerol (DAG) nội bào và ức chế thụ thể IRS-1',
        'Tỷ lệ Triglyceride / HDL-C: Chỉ số vàng phản ánh kích thước hạt LDL nhỏ đậm đặc (sdLDL) vượt trội so với cholesterol toàn phần'
      ]
    },
    {
      domain: 'Đường ruột, Vi sinh vật & Tính thấm Niêm mạc (Gut Microbiome & Intestinal Barrier)',
      organ: 'Gut',
      ideas: [
        'Hội chứng rò rỉ ruột (Leaky Gut): Cơ chế tổn thương protein mối nối chặt (Zonulin, Occludin) và sự tràn nội độc tố LPS vào tuần hoàn',
        'Akkermansia muciniphila: Loài vi khuẩn ăn chất nhầy niêm mạc nhưng lại làm dày lớp màng nhầy và tăng độ nhạy insulin',
        'Tinh bột kháng (Resistant Starch) & Acid béo chuỗi ngắn (SCFA): Cơ chế Butyrate nuôi dưỡng tế bào biểu mô ruột kết và biểu sinh HDAC'
      ]
    },
    {
      domain: 'Lão hóa Tế bào, Ty thể & Trường thọ (Cellular Aging & Mitochondrial Health)',
      organ: 'Cellular Aging',
      ideas: [
        'Tự thực bào (Autophagy) qua nhịn ăn gián đoạn 16/8: Khi nào tế bào bắt đầu dọn dẹp protein biến tính và ty thể hư hỏng?',
        'NMN vs NR vs NAD+: Sự thật về khả năng vượt qua màng tế bào của phân tử tiền chất NAD+ và vai trò enzyme CD38 khi già đi',
        'Sulforaphane từ mầm súp lơ xanh: Chất kích hoạt con đường chống oxy hóa nội sinh Nrf2 mạnh nhất từ tự nhiên',
        'Tế bào già cỗi (Senescent Cells) và hợp chất Senolytics (Quercetin, Fisetin): Cơ chế đào thải tế bào "zombie" giải phóng phân tử viêm SASP'
      ]
    }
  ];

  // Lựa chọn ngẫu nhiên một trụ cột để tạo sự phong phú tự nhiên mỗi ngày
  const randomPillar = DOMAIN_PILLARS[Math.floor(Math.random() * DOMAIN_PILLARS.length)];
  const randomIdea = randomPillar.ideas[Math.floor(Math.random() * randomPillar.ideas.length)];

  const prompt = `Hãy sáng tạo một bài phân tích chuyên khảo y sinh song ngữ (Tiếng Việt và Tiếng Anh) cho ấn bản The BioDispatch của TS. Hoàng Xuân Chiến.

GỢI Ý LĨNH VỰC CHO KỲ NÀY:
- Lĩnh vực: ${randomPillar.domain}
- Phân loại cơ quan: "${randomPillar.organ}"
- Gợi ý chủ đề tham khảo: "${randomIdea}"
(Hoặc bạn có thể tự do chọn 1 chủ đề khác đang là xu hướng khoa học, thời sự y tế mới nổi hoặc thực phẩm chức năng phổ biến tương đương).

NGUYÊN TẮC BIÊN TẬP CỦA TS. HOÀNG XUÂN CHIẾN:
1. TIẾP CẬN ĐỜI THƯỜNG & KHÁCH QUAN: Khởi đầu từ những hiện tượng đời thực, băn khoăn của cộng đồng, thói quen dùng thực phẩm chức năng hoặc tin tức y tế mới nổi.
2. NÓI VỀ KHOA HỌC THUẦN TÚY - TUYỆT ĐỐI KHÔNG CHÍNH TRỊ: Nếu đề cập đến các vấn đề thời sự dịch bệnh (như nghi vấn dịch hạch, cúm mới...), CHỈ TẬP TRUNG 100% VÀO CƠ CHẾ SINH HỌC VI SINH, con đường lây truyền, đáp ứng miễn dịch và phương pháp điều trị y học. Tuyệt đối không bàn luận chính trị, không phân định đúng sai quốc gia hay thuyết âm mưu.
3. CÂN BẰNG GIỮA DỄ HIỂU VÀ CHUYÊN MÔN: Phần mở đầu và ứng dụng thực tế phải thật gần gũi, ai đọc cũng hiểu được. Phần cơ chế phân tử giải thích rõ ràng, súc tích, giải nghĩa thuật ngữ, tránh viết quá nặng nề trừu tượng.
4. ĐỊNH DẠNG SLUG BẮT BUỘC: Slug tiếng Việt BẮT BUỘC có hậu tố "-vi" (ví dụ: magie-glycinate-giac-ngu-vi, yersinia-pestis-dich-hach-vi), slug tiếng Anh BẮT BUỘC có hậu tố "-en" (ví dụ: magnesium-glycinate-sleep-en, yersinia-pestis-plague-mechanism-en) để hệ thống tự động nhận diện ngôn ngữ tuyệt đối!

Các chủ đề đã xuất bản gần đây (TRÁNH TRÙNG LẶP):
${existingSample}

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON SCHEMA VỚI CẤU TRÚC:
{
  "topicId": "slug-id-viet-tat",
  "slugVi": "slug-tieng-viet-co-hau-to-vi",
  "slugEn": "slug-tieng-anh-co-hau-to-en",
  "titleVi": "Tiêu đề tiếng Việt hấp dẫn, gần gũi",
  "titleEn": "Tiêu đề tiếng Anh chuẩn mực",
  "excerptVi": "Tóm tắt tiếng Việt (nêu bật góc nhìn thực chứng & thực tế)",
  "excerptEn": "Tóm tắt tiếng Anh",
  "organ": "${randomPillar.organ}",
  "tier": "Clinical Deep-Dive",
  "tagsVi": ["Tag 1", "Tag 2", "Tag 3"],
  "tagsEn": ["Tag 1", "Tag 2", "Tag 3"],
  "doi": "10.1038/...",
  "pmid": "12345678",
  "journal": "Nature / Science / Lancet / Cell",
  "year": 2024,
  "refPaperTitle": "Exact Title of the Landmark Research Paper as published in the Journal",
  "refAuthors": "First Author et al.",
  "refDesign": "Randomized Controlled Trial / Cryo-EM Structural Study / Mechanistic In-vivo Model",
  "refAbstract": "Original academic abstract summarizing findings, molecular mechanism, and quantitative results of this specific study.",
  "gizmo": "pathway",
  "readingTimeVi": "8 phút đọc",
  "readingTimeEn": "8 min read",
  "analogyVi": "Lời giải thích ẩn dụ đời thường dễ nhớ...",
  "analogyEn": "Metaphorical analogy...",
  "leadVi": "Lời dẫn nhập tiếng Việt mở đầu bằng câu chuyện/thực tế đời sống...",
  "leadEn": "Lead in English...",
  "flowchartVi": "[Bước 1 bằng Tiếng Việt] ──► [Bước 2] ──► [Bước 3]",
  "flowchartEn": "[Step 1 in English] ──► [Step 2] ──► [Step 3]",
  "sectionsVi": [
    { "heading": "1. Tiêu đề mục 1: Cơ chế phân tử vi mô", "body": "Nội dung mục 1 giải thích rõ ràng..." },
    { "heading": "2. Tiêu đề mục 2: Phân tích sự thật & Bảng đối chiếu", "body": "Nội dung mục 2 kèm | Bảng | So sánh |..." },
    { "heading": "3. Ứng dụng thực tế & Lời khuyên an toàn", "body": "Nội dung mục 3 hướng dẫn áp dụng thực tế..." }
  ],
  "sectionsEn": [
    { "heading": "1. Heading 1: Molecular Mechanisms", "body": "Section 1 body..." },
    { "heading": "2. Heading 2: Fact-Checking & Comparison Table", "body": "Section 2 body with | Markdown | Table |..." },
    { "heading": "3. Practical Takeaways & Safety Guidelines", "body": "Section 3 actionable guidance..." }
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
