/**
 * Autonomous Gemini Topic & Content Generator for Phytocodex
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
import { getCompactExclusionSummary } from './topic-registry.mjs';
import { checkTopicCollision } from './topic-dedup-guard.mjs';

// Model candidates with fallback support (stable and responsive models prioritized)
const MODEL_CANDIDATES = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.1-pro-preview',
  'gemini-3.5-flash',
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

export async function generateTopicWithGemini(existingCatalog = [], feedback = null, targetTier = 'Life Dispatch') {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    console.warn('⚠️ [Gemini Generator] Không tìm thấy GEMINI_API_KEY trong env.');
    return null;
  }

  // CƠ CHẾ SIÊU TIẾT KIỆM TOKEN: Nén toàn bộ 100+ bài đã xuất bản thành danh mục hoạt chất/cơ chế dưới 200 tokens
  const exclusionSummary = getCompactExclusionSummary();

  const systemInstruction = `Bạn là TS. Hoàng Xuân Chiến (Dr. rer. nat. - Đại học Hamburg, CHLB Đức), Giám đốc Học thuật kiêm Tổng biên tập của ấn bản y sinh "Phytocodex" (phytocodex.vercel.app).
Bạn là chuyên gia hàng đầu về Y học Chuyển hóa, Lão hóa & Trường thọ (Metabolic Longevity), Dược động học và Tín hiệu tế bào.

ĐỐI TƯỢNG ĐỘC GIẢ VÀ ĐỊNH HƯỚNG NỘI DUNG:
- ĐỐI TƯỢNG ĐỘC GIẢ: Độc giả phổ thông đại chúng là chính (người đi làm, phụ huynh, người quan tâm đến sức khỏe bản thân và gia đình).
- TỶ LỆ NỘI DUNG: Ưu tiên tối đa bài viết đời sống thường thức (Life Dispatch) mang tính ứng dụng thực tế cao, dễ hiểu, giải tỏa lo lắng, giải mã các thói quen hàng ngày. Ít bài quá nặng về nghiên cứu hàn lâm chuyên sâu.
- VĂN PHONG TS. HOÀNG XUÂN CHIẾN: Ấm áp, gần gũi, hóm hỉnh, sâu sắc. Luôn dùng các hình ảnh ẩn dụ đời thường tinh tế để giải thích cơ chế phân tử (ví như "nhà máy điện", "cửa an ninh", "xe bồn rửa đường", "bức tường vôi vữa"). Tránh dùng từ ngữ hàn lâm khó hiểu mà không giải thích.

MỤC TIÊU:
Nghiên cứu và tạo ra 1 chủ đề bài viết chuyên khảo y sinh song ngữ MỚI HOÀN TOÀN, đột phá, mang tính thực chứng cao (Nature/Science/Cell/Lancet), TUYỆT ĐỐI KHÔNG TRÙNG LẶP HOẶC TƯƠNG TỰ VỚI BẤT KỲ BÀI NÀO ĐÃ CÓ TRONG KHO.

${exclusionSummary}

QUY TẮC BẮT BUỘC:
1. KHÔNG dùng bất kỳ dấu em-dash (—) hay en-dash (–) nào. Chỉ dùng dấu phẩy, hai chấm, gạch nối ngắn (-) hoặc ngoặc đơn.
2. Tiêu đề (titleVi, titleEn): Hấp dẫn, gần gũi, theo câu tự nhiên (Sentence case tiếng Việt), phản ánh đúng lợi ích đời thường, tối thiểu 20 ký tự.
3. Tóm tắt (excerptVi, excerptEn): Tối thiểu 100 từ, nêu bật nghịch lý sinh học hoặc thói quen phổ biến nhưng ít người hiểu đúng.
4. Ẩn dụ (analogyVi, analogyEn): Một đoạn so sánh ví von đời thường cực kỳ tinh tế, giải thích cơ chế phân tử bằng hình ảnh thân thuộc, dễ nhớ.
5. Dẫn nhập (leadVi, leadEn): Mở đầu bằng câu chuyện đời thực, tình huống thường gặp tại gia đình hoặc nơi làm việc trước khi đi vào cơ chế khoa học. Tối thiểu 160 từ.
6. Sơ đồ Flowchart (flowchart): Chuỗi phản ứng phân tử bắt buộc dùng mũi tên "──►" và ngoặc vuông, ví dụ: [Thói quen / Tác nhân] ──► [Thụ thể / Enzyme] ──► [Lợi ích sức khỏe]
7. Phần nội dung (sectionsVi, sectionsEn): Phải có ĐỦ 3 phần chi tiết (Heading + Body):
   - Phần 1: Cơ chế sinh học đằng sau thói quen / vi chất (giải nghĩa rõ từng chữ viết tắt bằng ngôn từ mộc mạc). Tối thiểu 250 từ.
   - Phần 2: Giải mã sự thật khoa học & BẮT BUỘC có 1 BẢNG SO SÁNH MARKDOWN (Markdown Table) đối chiếu các chỉ số sinh lý / thói quen / liều lượng (với tiêu đề cột rõ ràng, ít nhất 3 dòng dữ liệu). Tối thiểu 250 từ kèm bảng.
   - Phần 3: BẮT BUỘC là phần "Ứng dụng thực tế & Lời khuyên lâm sàng" (Heading phải chứa từ như "Chiến lược đời sống", "Ứng dụng thực tế", "Khuyến nghị an toàn", hoặc "Tối ưu hóa thói quen"). Hướng dẫn cụ thể: ăn gì, uống khi nào, tránh gì. Tối thiểu 250 từ.
8. Đảm bảo tổng độ dài văn bản mỗi ngôn ngữ ĐẠT TỐI THIỂU 850 - 1.200 từ. Tuyệt đối không viết tóm tắt ngắn dưới 750 từ.
9. TÀI LIỆU THAM KHẢO CHÍNH XÁC TUYỆT ĐỐI (ZERO HALLUCINATION):
   - Cung cấp bài báo gốc có thật đã xuất bản trên các tạp chí uy tín (Nature, Science, Cell, Lancet, NEJM, Nutrients, AJCN, v.v.).
   - "refPaperTitle": Tiêu đề NGUYÊN GỐC CỦA BÀI BÁO KHOA HỌC (chính xác từng chữ trên PubMed/CrossRef).
   - "refAuthors": Tác giả chính hoặc nhóm nghiên cứu.
   - "refJournal": Tên tạp chí khoa học.
   - "refYear": Năm xuất bản chính xác.
   - "refDoi": Mã DOI CHÍNH XÁC CỦA BÀI BÁO (bắt đầu bằng 10.xxxx/...).
   - "refPmid": Mã PMID chính xác trên PubMed tương ứng với DOI đó.
   - "refAbstract": Tóm tắt học thuật bằng tiếng Anh của nghiên cứu đó (khoảng 3-4 câu).
   - TUYỆT ĐỐI KHÔNG gán DOI của bài báo này cho bài báo khác!
10. CẤU TRÚC ĐOẠN VĂN THOÁNG ĐÃNG (CHỐNG BỨC TƯỜNG CHỮ):
   - Mỗi đoạn văn (paragraph) chỉ dài 2-4 câu (khoảng 80-120 từ/đoạn). Thường xuyên xuống dòng tạo khoảng trắng, giúp độc giả trên điện thoại đọc êm mắt, tiếp thu trọn vẹn.
11. BỘ TÓM TẮT & HƯỚNG DẪN THỰC HÀNH V2 (BRIEF & PRACTICAL GUIDE):
   - Bắt buộc điền đầy đủ "briefVi", "briefEn", "practicalVi", "practicalEn":
   - "bottomLine": 1 câu đắt giá nhất giải thích độc giả được lợi gì trong cuộc sống thực tế.
   - "evidence": Chọn chuẩn xác mức bằng chứng ('human-rct', 'human-observational', 'mixed', 'review', 'animal', 'in-vitro').
   - "takeaways": Đúng 3 gạch đầu dòng then chốt, mỗi gạch 1 câu súc tích.
   - "steps": 2-3 hành động thực tiễn (thời điểm, liều dùng, mẹo áp dụng dễ nhớ).
   - "avoidIf": Cảnh báo thận trọng / chống chỉ định.
   - "interactions": Tương tác thuốc hoặc thực phẩm.
   - "seeDoctor": Triệu chứng báo động cần đi khám bác sĩ.
12. HỆ THỐNG TAGS THEO TRIỆU CHỨNG (HEALTH GOALS TAXONOMY):
   - tagsVi và tagsEn bắt buộc chứa từ khóa tìm kiếm theo triệu chứng gần gũi (như: giac-ngu, duong-huyet, tim-mach, ruot, nang-luong, lao-hoa, noi-tiet, khop, gan, mat-da) để hệ thống tự động phân loại vào các mục sức khỏe trên trang chủ.`;

  // Ngân hàng 10 trụ cột đề tài bám sát 10 Nhu cầu Sức khỏe Đời sống của độc giả đại chúng
  const DOMAIN_PILLARS = [
    {
      domain: 'Giấc ngủ, Nhịp sinh học & Giảm căng thẳng thần kinh (Sleep & Stress Management)',
      organ: 'Brain',
      goalId: 'sleep-stress',
      ideas: [
        'Cà phê sau 2 giờ chiều và phân tử Adenosine: Vì sao bạn vẫn chợp mắt được nhưng não bộ không thể bước vào pha ngủ sâu?',
        'Kỹ thuật thở 4-7-8 kích hoạt dây thần kinh phế vị (Vagus Nerve): Cơ chế phân tử giúp hạ nhịp tim và dập tắt cơn lo âu sau 2 phút',
        'Ánh sáng xanh từ điện thoại trước khi đi ngủ: Vì sao bật chế độ Night Shift hay đeo kính vàng vẫn chưa đủ để bảo vệ Melatonin?',
        'Hạ nhiệt độ phòng ngủ xuống 19-20°C: Cơ chế sinh học kích hoạt giấc ngủ sóng chậm NREM và thúc đẩy hệ Glymphatic dọn rác não',
        'Magie Glycinate vs Magie Citrate: Vì sao uống sai dạng muối magie lại gây kích thích tiêu hóa thay vì an thần ngủ ngon?'
      ]
    },
    {
      domain: 'Kiểm soát Đường huyết, Kháng Insulin & Đốt mỡ bụng (Blood Sugar & Weight Health)',
      organ: 'Metabolic',
      goalId: 'metabolic-weight',
      ideas: [
        'Trật tự bữa ăn chuẩn khoa học (Rau trước - Đạm giữa - Tinh bột cuối): Cơ chế làm phẳng đỉnh đường huyết sau ăn tới 40%',
        'Một thìa giấm táo trước bữa ăn nhiều tinh bột: Axit axetic ức chế men alpha-amylase và làm chậm tốc độ rỗng dạ dày ra sao?',
        'Đi bộ nhẹ 10-15 phút sau ăn: Cơ chế cơ bắp co bóp kích hoạt kênh GLUT4 kéo đường vào tế bào mà không cần tụy tiết thêm insulin',
        'Tác hại sinh học của việc ăn tối muộn sau 8 giờ: Khi tế bào mỡ khóa thụ thể và lượng calo dư thừa chuyển thẳng thành mỡ nội tạng',
        'Bí mật tinh bột kháng trong cơm nguội và khoai tây luộc để lạnh: Quá trình thoái biến tinh bột thành thức ăn nuôi lợi khuẩn đại tràng'
      ]
    },
    {
      domain: 'Sức khỏe Tim mạch, Huyết áp & Bảo vệ Thành mạch (Heart & Vascular Health)',
      organ: 'Heart',
      goalId: 'cardio-vessels',
      ideas: [
        'Bổ sung Canxi mà quên Vitamin D3 và K2 (MK-7): Nguy cơ vôi hóa lắng đọng tại thành mạch máu mà ít người để ý',
        'Socola đen trên 85% cacao và huyết áp: Hợp chất Flavanol kích hoạt giải phóng Oxit Nitric (NO) làm giãn nở động mạch tự nhiên',
        'Muối ăn và huyết áp: Vì sao việc nạp đủ Kali từ rau củ quả lại quan trọng hơn là kiêng muối quá mức?',
        'Ngồi làm việc liên tục trên 2 tiếng làm tê liệt enzyme LPL: Thói quen nhấp nhổm đơn giản giúp ngăn ngừa ứ trệ tuần hoàn chi dưới',
        'Xông hơi (Sauna) và sức khỏe cơ tim: Cơ chế kích hoạt protein sốc nhiệt HSP mô phỏng lợi ích của bài tập thể lực vừa phải'
      ]
    },
    {
      domain: 'Đường ruột, Tiêu hóa & Hệ Vi sinh (Gut Health & Microbiome)',
      organ: 'Gut',
      goalId: 'gut-microbiome',
      ideas: [
        'Uống nước đá lạnh ngay sau bữa ăn nhiều dầu mỡ: Thực hư chuyện đông đặc chất béo và làm chậm men tiêu hóa dạ dày',
        'Hội chứng rò rỉ ruột (Leaky Gut) và chứng mệt mỏi kéo dài: Khi khoảng hở niêm mạc giải phóng độc tố vi khuẩn endotoxin vào máu',
        'Chất xơ hòa tan Pectin từ táo và yến mạch: Thức ăn nuôi dưỡng lớp màng nhầy Mucin bảo vệ niêm mạc đại tràng',
        'Curcumin từ nghệ kết hợp Piperine từ hạt tiêu đen: Bí quyết tăng sinh khả dụng gấp 20 lần giúp làm dịu niêm mạc tiêu hóa',
        'Thói quen nhai kỹ 20-30 lần mỗi miếng ăn: Cơ chế enzyme amylase trong nước bọt giúp giải phóng 50% gánh nặng cho dạ dày'
      ]
    },
    {
      domain: 'Năng lượng Tế bào, Chống sập nguồn & Sức bền (Daily Energy & Recovery)',
      organ: 'Metabolic',
      goalId: 'energy-vitality',
      ideas: [
        'Hiện tượng sập nguồn và buồn ngủ rũ rượi lúc 2 giờ chiều: Thủ phạm thực sự từ đỉnh carbohydrate bữa trưa và cách hóa giải',
        'Trì hoãn ngụm cà phê đầu tiên sau khi thức dậy 60-90 phút: Cho phép cơ thể tự dọn sạch Adenosine và tránh tình trạng đuối sức buổi chiều',
        'Một cốc nước ấm pha nhúm muối khoáng buổi sáng: Cơ chế cân bằng điện giải thẩm thấu đánh thức tế bào sau 8 tiếng mất nước',
        'Tắm ánh nắng tự nhiên 10 phút đầu ngày: Đặt lại đồng hồ sinh học tại nhân trên chéo (SCN) để tỉnh táo ban ngày và ngủ sâu ban đêm',
        'Creatine monohydrate cho người làm việc trí óc: Tái tạo năng lượng ATP cho tế bào thần kinh khi đối mặt với áp lực công việc cao'
      ]
    },
    {
      domain: 'Trẻ hóa Tế bào, Ty thể & Chống Lão hóa Sớm (Longevity & Anti-Aging)',
      organ: 'Cellular Aging',
      goalId: 'longevity-cancer',
      ideas: [
        'Fisetin từ quả dâu tây: Hoạt chất tự nhiên giúp đào thải tế bào già cỗi (Zombie cells) gây viêm âm ỉ trong mô',
        'Nhịn ăn gián đoạn 14-16 tiếng đúng cách: Thời điểm vàng kích hoạt cơ chế tự thực bào (Autophagy) dọn sạch rác phân tử',
        'Urolithin A từ quả lựu và quả óc chó: Tái sinh các ty thể già cỗi thành nhà máy sản xuất năng lượng mới (Mitophagy)',
        'Đồ nướng cháy khét và phản ứng Glycation (AGEs): Vì sao đường liên kết với protein làm giòn mạch máu và đẩy nhanh nếp nhăn?',
        'Tập thể lực kháng lực (Resistance Training) ở tuổi trung niên: Kích thích hormone myokine bảo vệ não bộ và kéo dài tuổi thọ sinh học'
      ]
    },
    {
      domain: 'Cân bằng Nội tiết, Ngăn rụng tóc & Phục hồi Sinh lực (Hormones, Hair & Vitality)',
      organ: 'Metabolic',
      goalId: 'hormones-vitality',
      ideas: [
        'Rụng tóc sau tuổi 30 và hormone DHT: Vì sao chiết xuất Saw Palmetto và kẽm giúp bảo vệ nang tóc khỏi tác động teo nhỏ?',
        'Tuyến giáp và bộ đôi vi chất Selen + I-ốt: Mối liên hệ mật thiết giữa quá trình chuyển đổi T4 sang T3 và cảm giác uể oải sợ lạnh',
        'Hiện tượng Cortisol Steal khi căng thẳng kéo dài: Khi stress triệt tiêu nguồn nguyên liệu tổng hợp hormone sinh sản và sinh lực',
        'Phytoestrogen trong đậu nành và hạt lanh: Giải mã những hiểu lầm phổ biến và lợi ích thực sự cho phụ nữ giai đoạn tiền mãn kinh'
      ]
    },
    {
      domain: 'Bảo vệ Xương khớp, Đau mỏi Cơ & Vận động Linh hoạt (Joints & Mobility)',
      organ: 'Cellular Aging',
      goalId: 'joints-mobility',
      ideas: [
        'Đau mỏi cổ vai gáy của người ngồi máy tính: Cơ chế thiếu máu cục bộ cơ thang và các bài giải phóng căng thẳng cơ học 2 phút',
        'Collagen peptide thủy phân: Sự thật về việc các mảnh dipeptide ngắn Pro-Hyp kích thích tế bào sụn sản sinh dịch nhờn khớp',
        'Axit Hyaluronic đường uống: Khả năng ngậm nước tại mô đệm liên kết và cải thiện tình trạng khô khớp gối khi leo cầu thang',
        'Ngăn ngừa teo cơ sau tuổi 40 (Sarcopenia): Tầm quan trọng của axit amin Leucine trong bữa ăn để kích hoạt con đường mTOR nuôi cơ'
      ]
    },
    {
      domain: 'Bảo vệ Gan mật, Hạ men gan & Đào thải Axit Uric (Liver Care & Detox)',
      organ: 'Metabolic',
      goalId: 'liver-detox',
      ideas: [
        'Gan nhiễm mỡ không do rượu (MASLD): Vì sao đường Fructose lỏng trong trà sữa và nước ngọt tích tụ mỡ gan nhanh hơn mỡ động vật?',
        'Sự thật về các gói trà thải độc gan cấp tốc: Cơ chế giải độc Phase 1 và Phase 2 của tế bào gan thực sự cần những vi chất nào?',
        'Chiết xuất Kế sữa (Silymarin) và màng tế bào gan: Khả năng ngăn chặn độc tố từ rượu bia và thuốc hạ sốt giảm đau xâm nhập',
        'Axit Uric cao và nguy cơ cơn gút cấp: Vì sao ăn quả anh đào (Tart Cherry) và uống đủ nước giúp tăng đào thải axit uric qua thận?'
      ]
    },
    {
      domain: 'Chăm sóc Thị lực, Mỏi mắt Màn hình & Trẻ hóa Làn da (Eyes & Skin Care)',
      organ: 'Cellular Aging',
      goalId: 'skin-eyes',
      ideas: [
        'Hội chứng mỏi mắt kỹ thuật số (Computer Vision Syndrome): Quy tắc 20-20-20 và cơ chế thư giãn điều tiết của cơ thể mi',
        'Lutein và Zeaxanthin: Hai sắc tố vàng tích tụ tại hoàng điểm để hấp thụ ánh sáng xanh có năng lượng cao từ màn hình',
        'Ceramide thực vật đường uống từ cám gạo: Cơ chế tái lập hàng rào lipid chống mất nước qua biểu bì cho da khô nhạy cảm',
        'Đường và nếp nhăn da: Hiện tượng đứt gãy sợi collagen do liên kết chéo phân tử và giải pháp bảo vệ da qua chế độ ăn ít đường'
      ]
    }
  ];

  // Lựa chọn ngẫu nhiên một trụ cột và chủ đề chưa từng xuất hiện trên website
  const randomPillar = DOMAIN_PILLARS[Math.floor(Math.random() * DOMAIN_PILLARS.length)];
  const availableIdeas = randomPillar.ideas.filter(idea => {
    const col = checkTopicCollision({ titleVi: idea });
    return !col.isDuplicate;
  });
  const randomIdea = availableIdeas.length > 0
    ? availableIdeas[Math.floor(Math.random() * availableIdeas.length)]
    : randomPillar.ideas[0];

  const isLifeDispatch = targetTier === 'Life Dispatch';

  const prompt = isLifeDispatch
    ? `Hãy sáng tạo một bài viết đời sống y khoa thường thức dễ hiểu, gần gũi nhưng chuẩn xác khoa học (Tier: "Life Dispatch") song ngữ (Tiếng Việt và Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

GỢI Ý CHỦ ĐỀ ĐỜI THƯỜNG / THÓI QUEN SỐNG (BẮT BUỘC MỚI LẠ, CHƯA CÓ TRONG KHO):
- Lĩnh vực: ${randomPillar.domain}
- Phân loại cơ quan: "${randomPillar.organ}"
- Gợi ý chủ đề tham khảo: "${randomIdea}"
(TUYỆT ĐỐI KHÔNG lặp lại các chủ đề cũ đã có trong danh mục loại trừ ở trên).

NGUYÊN TẮC BIÊN TẬP CỦA TS. HOÀNG XUÂN CHIẾN (LIFE DISPATCH):
1. TIẾP CẬN ĐỜI THƯỜNG & DỄ HIỂU: Văn phong ấm áp, gần gũi, bóc tách các thói quen hàng ngày, giúp độc giả đại chúng đọc là hiểu ngay và áp dụng được liền.
2. KHÔNG LẠM DỤNG TỪ NGỮ QUÁ HÀN LÂM: Cơ chế phân tử giải thích mộc mạc, có ẩn dụ sinh động.
3. TIÊU ĐỀ HẤP DẪN, DỄ HIỂU: Tiêu đề tiếng Việt viết theo văn phong tự nhiên (Sentence case), hấp dẫn nhưng KHÔNG giật gân, phản ánh đúng lợi ích sức khỏe thực tế.
4. ĐỊNH DẠNG SLUG: Tiếng Việt có hậu tố "-vi", tiếng Anh có hậu tố "-en".
5. LIÊM CHÍNH Y VĂN: Cung cấp 1-2 tài liệu tham khảo thực tế có thật trên PubMed/CrossRef.`
    : `Hãy sáng tạo một bài phân tích chuyên khảo y sinh chuyên sâu (Tier: "Clinical Deep-Dive") song ngữ (Tiếng Việt và Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

GỢI Ý LĨNH VỰC CHO KỲ NÀY:
- Lĩnh vực: ${randomPillar.domain}
- Phân loại cơ quan: "${randomPillar.organ}"
- Gợi ý chủ đề tham khảo: "${randomIdea}"
(TUYỆT ĐỐI KHÔNG lặp lại các chủ đề cũ đã có trong danh mục loại trừ ở trên).

NGUYÊN TẮC BIÊN TẬP CỦA TS. HOÀNG XUÂN CHIẾN (CLINICAL DEEP-DIVE):
1. TIẾP CẬN CHUYÊN SÂU & THỰC CHỨNG: Đi sâu vào con đường tín hiệu phân tử, enzym, thụ thể, cơ chế dược động học.
2. CÓ BẢNG SO SÁNH ĐỐI CHIẾU LÂM SÀNG CHI TIẾT.
3. TIÊU ĐỀ CHUẨN MỰC KHOA HỌC: Sentence case, không viết hoa toàn bộ từ tiếng Việt.
4. ĐỊNH DẠNG SLUG: Tiếng Việt có hậu tố "-vi", tiếng Anh có hậu tố "-en".
5. LIÊM CHÍNH Y VĂN: Trích dẫn bài báo gốc trên Nature, Science, Cell, Lancet, v.v.`;

  const commonGuidelines = `
NGUYÊN TẮC BIÊN TẬP BẮT BUỘC:
1. KHÔNG DÙNG DẤU GẠCH NGANG DÀI (EM-DASH "—" HOẶC EN-DASH "–"). Chỉ dùng dấu phẩy, hai chấm, gạch nối ngắn (-) hoặc ngoặc đơn.
2. NÓI VỀ KHOA HỌC THUẦN TÚY - TUYỆT ĐỐI KHÔNG CHÍNH TRỊ.
3. QUY CHUẨN VIẾT HOA TIÊU ĐỀ TIẾNG VIỆT (Sentence case): Chỉ viết hoa chữ cái đầu tiên và danh từ riêng/thuật ngữ.
4. ĐỊNH DẠNG SLUG BẮT BUỘC: slugVi kết thúc bằng "-vi", slugEn kết thúc bằng "-en".
5. LIÊM CHÍNH Y VĂN: Tiêu đề "label" phải là tên tiếng Anh chính xác nguyên bản của bài báo khoa học đã xuất bản.

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON SCHEMA VỚI CẤU TRÚC:
{
  "topicId": "slug-id-viet-tat",
  "slugVi": "slug-tieng-viet-co-hau-to-vi",
  "slugEn": "slug-tieng-anh-co-hau-to-en",
  "titleVi": "Tiêu đề tiếng Việt hấp dẫn, gần gũi",
  "titleEn": "Tiêu đề tiếng Anh chuẩn mực",
  "excerptVi": "Tóm tắt tiếng Việt",
  "excerptEn": "Tóm tắt tiếng Anh",
  "organ": "${randomPillar.organ}",
  "tier": "${targetTier}",
  "tagsVi": ["Tag 1", "Tag 2", "Tag 3"],
  "tagsEn": ["Tag 1", "Tag 2", "Tag 3"],
  "references": [
    {
      "ordinal": 1,
      "label": "Exact authentic paper title in English as published in journal",
      "pmid": "Official PubMed ID if 100% sure, otherwise empty string",
      "doi": "Official DOI if 100% sure, otherwise empty string",
      "design": "Landmark Review / RCT / Meta-analysis",
      "journal": "Nature / Science / Cell / Lancet",
      "year": 2023,
      "abstract": "Key molecular findings (1-2 sentences)."
    }
  ],
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
    { "heading": "1. Tiêu đề mục 1: Cơ chế phân tử vi mô", "body": "Nội dung mục 1 phân tích cơ chế thụ thể (tối thiểu 250 từ)..." },
    { "heading": "2. Tiêu đề mục 2: Phân tích sự thật & Bảng đối chiếu lâm sàng", "body": "Nội dung mục 2 phân tích sâu sắc...\\n\\n| Trạng thái Sinh lý | Nồng độ Phân tử | Tác động Lâm sàng |\\n| :--- | :--- | :--- |\\n| Sinh lý Cơ bản (Baseline) | Mức chuẩn nội môi | Duy trì chức năng bình thường |\\n| Tổn thương / Lão hóa | Biến đổi vượt ngưỡng | Kích hoạt chuỗi viêm mạn tính |\\n| Can thiệp Tối ưu hóa | Trở về ngưỡng an toàn | Phục hồi hiệu suất tế bào |\\n\\nTiếp tục phân tích chi tiết..." },
    { "heading": "3. Ứng dụng thực tế & Khuyến nghị an toàn", "body": "Nội dung mục 3 hướng dẫn áp dụng thực tế (tối thiểu 250 từ)..." }
  ],
  "sectionsEn": [
    { "heading": "1. Heading 1: Molecular Mechanisms", "body": "Section 1 detailed molecular analysis (min 200 words)..." },
    { "heading": "2. Heading 2: Fact-Checking & Comparative Metrics", "body": "Section 2 in-depth discussion...\\n\\n| Physiological State | Molecular Concentration | Clinical Endpoint |\\n| :--- | :--- | :--- |\\n| Homeostatic Baseline | Normal physiological range | Optimal function |\\n| Pathological Strain | Pathological elevation | Chronic cellular stress |\\n| Optimized Intervention | Functional restoration | Resilient cellular longevity |\\n\\nFurther detailed discussion..." },
    { "heading": "3. Practical Takeaways & Safety Guidelines", "body": "Section 3 actionable clinical protocols (min 200 words)..." }
  ],
  "briefVi": {
    "bottomLine": "Một câu kết luận súc tích, đắt giá, dễ hiểu cho người bình thường",
    "evidence": "human-rct",
    "takeaways": [
      "Ý chính 1 (1 câu ngắn)",
      "Ý chính 2 (1 câu ngắn)",
      "Ý chính 3 (1 câu ngắn)"
    ]
  },
  "briefEn": {
    "bottomLine": "One clear bottom-line practical insight",
    "evidence": "human-rct",
    "takeaways": [
      "Key takeaway 1",
      "Key takeaway 2",
      "Key takeaway 3"
    ]
  },
  "practicalVi": {
    "steps": ["Việc nên làm 1", "Việc nên làm 2"],
    "avoidIf": ["Những ai cần thận trọng hoặc không nên áp dụng"],
    "interactions": ["Tương tác thuốc hoặc thực phẩm đáng chú ý"],
    "seeDoctor": "Khi nào cần đi khám hoặc tham vấn bác sĩ"
  },
  "practicalEn": {
    "steps": ["Actionable step 1", "Actionable step 2"],
    "avoidIf": ["Cautions or contraindications"],
    "interactions": ["Known drug or nutrient interactions"],
    "seeDoctor": "When to consult a healthcare provider"
  }
};

${feedback ? `\n\n🚨 PHẢN HỒI QUAN TRỌNG TỪ HỆ THỐNG BIÊN TẬP (BẮT BUỘC KHẮC PHỤC TRONG LẦN NÀY):\n${feedback}\nHãy chắc chắn bản thảo tiếng Việt đạt trên 850 từ và bản tiếng Anh đạt trên 700 từ, có đầy đủ bảng so sánh Markdown!` : ''}`;

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
        // Kiểm định chống trùng lặp cục bộ tức thì bằng Deterministic Dedup Guard (0 token)
        const collision = checkTopicCollision(parsed);
        if (collision.isDuplicate) {
          console.warn(`🛑 [Topic Dedup Guard BỊ CHẶN] ${collision.reason}`);
          feedback = `Đề tài "${parsed.titleVi}" bị từ chối do trùng lặp: ${collision.reason}. Bắt buộc chọn một đề tài hoàn toàn khác chưa từng có trong kho!`;
          continue;
        }

        console.log(`🎯 [Gemini Generator] AI đã sinh thành công chuyên khảo: "${parsed.titleVi}"`);
        return parsed;
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Generator] Lỗi khi gọi ${model}: ${err.message}`);
    }
  }

  return null;
}
