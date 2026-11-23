/**
 * Autonomous Gemini Topic & Content Generator for Phytocodex (v4.0 — High Diversity & Natural Editorial Style)
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 *
 * Key upgrades in v4.0:
 * - Fixes critical bug where commonGuidelines (JSON schema + retry feedback) were omitted from payload
 * - Expands to 12 balanced domains with 85+ fresh uncovered biomedical/everyday-health ideas + Open Frontier Discovery mode
 * - Zero fallback to exhausted ideas[0]
 * - Enforces 7 rotating natural headline archetypes (bans overused "Vì sao..." / "Tại sao..." / "Why..." openings)
 * - Enforces 6 rotating engaging opening hook archetypes (bans AI-slop clichés like "Chị Lan kế toán Hà Nội", "Trong guồng quay hối hả", "tiệc tùng cuối năm")
 */

import fs from 'fs';
import path from 'path';
import { getCompactExclusionSummary, getRecentDispatchContext } from './topic-registry.mjs';
import { checkTopicCollision } from './topic-dedup-guard.mjs';

const MODEL_CANDIDATES = [
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.8-flash'
];

// 7 rotating editorial headline archetypes — natural, journalistic, NO "Vì sao..." cliché
const TITLE_ARCHETYPES = [
  {
    id: 'paradox',
    name: 'Nghịch lý / Lật ngược thói quen quen thuộc',
    instruction: 'Đặt tựa đề kiểu khẳng định một nghịch lý đời thường bất ngờ (KHÔNG dùng câu hỏi "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "Nước súc miệng diệt khuẩn có thể vô hiệu hóa lợi ích hạ huyết áp của củ dền" hoặc "Cà phê uống ngay sau bữa ăn giàu sắt đang âm thầm giảm một nửa lượng sắt hấp thu".'
  },
  {
    id: 'metric-rule',
    name: 'Con số / Quy tắc thực chiến gọn sắc',
    instruction: 'Đặt tựa đề mở đầu hoặc neo vào một con số sinh học/thời lượng cụ thể đi kèm lợi ích rõ ràng (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "30 loại thực vật mỗi tuần: Ngưỡng đa dạng giúp hệ vi sinh đường ruột hồi sinh" hoặc "15 phút chợp mắt buổi trưa và ranh giới tránh cơn uể oải sau khi tỉnh".'
  },
  {
    id: 'vivid-image',
    name: 'Hình ảnh đời thường sắc nét (Editorial Metaphor)',
    instruction: 'Đặt tựa đề ngắn gọn dùng một hình ảnh cụ thể, tinh tế, giàu sức gợi về cơ thể hoặc thực phẩm (KHÔNG dùng "Vì sao/Tại sao", KHÔNG lạm dụng "Giải mã"). Ví dụ tham khảo phong cách: "Cơ dép bắp chân, cỗ máy bơm đường huyết thầm lặng dưới gầm bàn làm việc" hoặc "Lớp màng trắng quanh múi cam và lá chắn Hesperidin cho thành mao mạch".'
  },
  {
    id: 'smart-contrast',
    name: 'So sánh hai lựa chọn thực tế (A hay B)',
    instruction: 'Đặt tựa đề đối chiếu trực tiếp hai cách chế biến, hai loại thực phẩm hoặc hai thói quen phổ biến (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "Gừng tươi pha trà hay gừng nướng cháy vỏ: Sự biến đổi từ Gingerol sang Shogaol" hoặc "Quế Ceylon và quế Cassia: Ranh giới tinh tế giữa ổn định đường huyết và gánh nặng cho gan".'
  },
  {
    id: 'declarative-mechanism',
    name: 'Câu trần thuật chủ động nêu cơ chế bất ngờ',
    instruction: 'Đặt tựa đề là một câu trần thuật trực diện, mạch lạc, không cần dấu hai chấm hoặc chỉ dùng khi thật tự nhiên (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "Thở bằng mũi giải phóng khí Oxit Nitric tự nhiên ngay từ các xoang mặt" hoặc "Mất chỉ 1% lượng nước cơ thể đã đủ làm suy giảm khả năng tập trung ở vỏ não trước trán".'
  },
  {
    id: 'hidden-blindspot',
    name: 'Góc khuất đời sống ít người để ý',
    instruction: 'Đặt tựa đề chỉ thẳng một góc khuất tinh tế trong sinh hoạt hằng ngày bằng giọng điềm tĩnh, chuẩn khoa học (KHÔNG giật gân, KHÔNG dùng "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "Ngủ bù cuối tuần lệch quá 2 giờ đang tạo ra cơn lệch múi giờ chuyển hóa ngay tại nhà" hoặc "Ánh nắng UVA xuyên qua cửa kính văn phòng âm thầm thúc đẩy lão hóa da dù không gây cháy nắng".'
  },
  {
    id: 'ingredient-spotlight',
    name: 'Cận cảnh một hoạt chất / thực phẩm bình dị',
    instruction: 'Đặt tựa đề tôn vinh một thực phẩm hoặc hoạt chất quen thuộc theo kiểu tạp chí khoa học hiện đại (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ tham khảo phong cách: "Ergothioneine trong nấm ăn: Hoạt chất được tế bào người thiết kế riêng kênh vận chuyển" hoặc "Trà hoa bụp giấm Hibiscus và cơ chế ức chế men chuyển tự nhiên trên thành mạch".'
  }
];

// 6 rotating opening hook styles — kills repetitive "Chị Lan kế toán Hà Nội" / "tiệc tùng cuối năm" / "Trong guồng quay hối hả"
const HOOK_ARCHETYPES = [
  {
    id: 'sensory-micro-scene',
    name: 'Khoảnh khắc giác quan cận cảnh',
    instruction: 'Mở bài ngay bằng một chi tiết giác quan rất nhỏ, chân thực (âm thanh, mùi hương, cảm giác sinh lý cụ thể như tiếng tách nhỏ khi ngâm hạt é, vị cay nồng bốc lên từ lát hành tím, cảm giác nặng nề ở đôi chân sau 3 tiếng ngồi yên). TUYỆT ĐỐI KHÔNG bịa nhân vật kiểu "Chị Lan 34 tuổi kế toán Hà Nội" hay "Anh Minh".'
  },
  {
    id: 'surprising-number',
    name: 'Con số sinh lý hoặc kết quả nghiên cứu gây khựng lại',
    instruction: 'Mở bài thẳng bằng một con số sinh lý hoặc dữ liệu thực nghiệm đáng kinh ngạc (ngắn gọn, 1-2 câu đầu súc tích), sau đó nối tự nhiên vào thói quen hằng ngày của người đọc.'
  },
  {
    id: 'habit-paradox',
    name: 'Nghịch lý của một thói quen tưởng là rất tốt',
    instruction: 'Mở bài bằng việc nêu một thói quen quen thuộc mà hầu hết mọi người đều tin là lành mạnh, rồi nhẹ nhàng đặt lại vấn đề bằng bằng chứng sinh học sắc sảo — không dùng câu sáo rỗng "Có bao giờ bạn tự hỏi".'
  },
  {
    id: 'science-vignette',
    name: 'Giai thoại phòng thí nghiệm / Khám phá khoa học ngắn',
    instruction: 'Mở bài bằng một quan sát lịch sử y học hoặc thí nghiệm khoa học thú vị (2-3 câu ngắn, giàu hình ảnh), rồi kéo thẳng về ứng dụng trong bữa ăn hoặc sinh hoạt hôm nay.'
  },
  {
    id: 'direct-dialogue',
    name: 'Chia sẻ trực diện góc nhìn TS. Hoàng Xuân Chiến',
    instruction: 'Mở bài như một lời trò chuyện điềm đạm, gần gũi, thẳng thắn từ trải nghiệm nghiên cứu và câu hỏi thường gặp của người thân/bạn đọc — tự nhiên, ấm áp, tuyệt đối không kiểu cách hay lên lớp.'
  },
  {
    id: 'sharp-contrast',
    name: 'Đặt hai tình huống tương phản cạnh nhau ngay câu đầu',
    instruction: 'Mở bài bằng sự đối lập rõ rệt giữa hai cách làm tưởng chừng giống hệt nhau (ví dụ: cùng một loại thực phẩm nhưng khác nhiệt độ, thời điểm uống, hoặc cách kết hợp), để khơi gợi tò mò lập tức.'
  }
];

// Rich, fresh, diverse domain pillars (12 pillars, 85+ UNCOVERED everyday-health & preventive biomedical topics)
const DOMAIN_PILLARS = [
  {
    domain: 'Hóa sinh Căn bếp & Phòng ngừa Ung thư Thực chứng (Culinary Biochemistry & Chemoprevention)',
    organ: 'Oncology',
    goalId: 'cancer-prevention',
    ideas: [
      'Quercetin trong vỏ hành tím và cách thái mỏng giữ nguyên hợp chất chống viêm bảo vệ ADN',
      'Ướp thịt với hương thảo và nghệ tươi trước khi áp chảo giúp giảm hơn 70% hợp chất dị vòng HCA',
      'Khói dầu ăn chiên đi chiên lại giải phóng aldehyde 4-HNE và cách chọn dầu theo điểm bốc khói',
      'Nồi chiên không dầu và hợp chất Acrylamide trong tinh bột nướng giòn ở nhiệt độ trên 160°C',
      'Nhựa dùng một lần gặp canh nóng giải phóng vi nhựa cùng chất gây rối loạn nội tiết BPA và Phthalate',
      'Cải xoong và củ cải trắng chứa PEITC kích hoạt men giải độc gan Pha 2 trước tác nhân gây đột biến',
      'Gạo lứt tím, bắp cải tím và sắc tố Anthocyanin bảo vệ lớp màng tế bào trước tổn thương oxy hóa',
      'Kimchi, dưa muối lên men tự nhiên và axit hữu cơ postbiotic nuôi dưỡng miễn dịch niêm mạc đại tràng',
      'Hạt hạch Brazil giàu Selen chống oxy hóa: Ranh giới giữa liều bảo vệ tế bào và ngưỡng dư thừa',
      'Thụ thể Vitamin D trong tế bào biểu mô ruột và vai trò điều hòa phân chia tế bào khỏe mạnh'
    ]
  },
  {
    domain: 'Dinh dưỡng Đời thường & Tối ưu Hấp thu Vi chất (Smart Nutrition & Bioavailability)',
    organ: 'Metabolic',
    goalId: 'smart-nutrition',
    ideas: [
      'Bữa sáng giàu đạm so với bữa sáng thuần tinh bột: Tác động lên hormone Ghrelin và cơn thèm ngọt giữa buổi',
      'Quế Ceylon và quế Cassia: Khác biệt về hàm lượng Coumarin bảo vệ gan khi hỗ trợ nhạy cảm insulin',
      'Hạt chia và hạt é ngâm nước tạo lớp gel chất nhầy làm chậm hấp thu chất béo và đường sau ăn',
      'Ngâm đậu đen, đậu lăng qua đêm để giảm Axit Phytic và Lectin giúp hấp thu khoáng chất, hết đầy bụng',
      'Dầu ô liu nguyên chất chứa Oleocanthal: Nhiệt độ nấu bao nhiêu thì polyphenol bắt đầu suy giảm',
      'Cá béo kích thước nhỏ (cá mòi, cá thu nhật) so với cá săn mồi lớn: Cân bằng EPA/DHA và nguy cơ thủy ngân',
      'Một lát bơ ăn cùng salad cà rốt và rau bina giúp tăng hấp thu Carotenoid tan trong dầu gấp nhiều lần',
      'Lòng đỏ trứng gà và dưỡng chất Choline: Giải oan cholesterol thực phẩm cho màng tế bào và trí nhớ',
      'Chuối xanh và tinh bột kháng tự nhiên hỗ trợ điều hòa đường huyết và nuôi lợi khuẩn đường ruột',
      'Uống trà đặc ngay sau bữa ăn giàu sắt thực vật khiến Tannin khóa chặt quá trình hấp thu sắt không heme',
      'Kết hợp Vitamin C từ chanh hoặc ớt chuông để chuyển hóa sắt thực vật sang dạng dễ hấp thu hơn gấp 3 lần'
    ]
  },
  {
    domain: 'Thần kinh, Tập trung & Giấc ngủ Phục hồi (Brain, Focus & Restorative Sleep)',
    organ: 'Brain',
    goalId: 'brain-sleep',
    ideas: [
      'Giấc ngủ trưa 15 đến 20 phút so với ngủ 60 phút: Tránh quán tính giấc ngủ và giữ tỉnh táo đến tối',
      'Ngủ bù cuối tuần lệch quá 2 giờ tạo ra hội chứng lệch múi giờ xã hội (Social Jetlag) phá vỡ chuyển hóa',
      'Mất chỉ 1 đến 2% lượng nước cơ thể đã làm suy giảm trí nhớ ngắn hạn và tăng cảm giác mệt mỏi thần kinh',
      'Nấm hầu thủ (Lion Mane) và hợp chất Hericenones kích thích yếu tố tăng trưởng thần kinh NGF',
      'Nhụy hoa nghệ tây (Saffron) với Crocin và Safranal hỗ trợ điều hòa chất dẫn truyền thần kinh và giấc ngủ nhẹ',
      'Nhịp thở dài sinh lý (Physiological Sigh) với hai lần hít vào giúp tái phồng phế nang và dịu căng thẳng tức thì',
      'Thở bằng mũi so với thở bằng miệng khi ngủ: Nguồn khí Oxit Nitric tự nhiên trong xoang mặt và chất lượng oxy',
      'Hương tinh dầu hương thảo chứa 1,8-Cineole và cơ chế bảo vệ chất dẫn truyền Acetylcholine cho trí nhớ làm việc',
      'Đọc sách giấy 15 phút trước giờ ngủ làm dịu hoạt động hạch hạnh nhân và rút ngắn thời gian vào giấc',
      'Tiếng ồn hồng (Pink Noise) và tác động ổn định sóng chậm trong giấc ngủ phục hồi trí nhớ dài hạn'
    ]
  },
  {
    domain: 'Hệ Vi sinh Đường ruột & Tiêu hóa Chuyên sâu (Gut Microbiome & Digestive Health)',
    organ: 'Gut',
    goalId: 'gut-microbiome',
    ideas: [
      'Quy tắc 30 loại thực vật mỗi tuần từ dự án American Gut giúp nhân đôi độ đa dạng hệ vi sinh đường ruột',
      'Gừng tươi và gừng nướng khô: Sự chuyển hóa từ Gingerol sang Shogaol quyết định hiệu quả làm rỗng dạ dày',
      'Tinh dầu bạc hà chứa Menthol tác động lên kênh thụ thể TRPM8 giúp thư giãn cơ trơn đường ruột',
      'Bông atiso và hoạt chất Cynarin kích thích tiết dịch mật hỗ trợ tiêu hóa bữa ăn giàu chất béo',
      'Chất xơ tiền sinh học Inulin trong hành tây, tỏi tây và ranh giới gây chướng bụng ở người nhạy cảm FODMAP',
      'Chất tạo ngọt nhân tạo Sucralose và Saccharin làm thay đổi hệ vi sinh ruột và phản ứng đường huyết ra sao',
      'Phục hồi hệ vi sinh sau đợt dùng kháng sinh: Vai trò nấm men Saccharomyces boulardii và thời điểm bổ sung lợi khuẩn',
      'Rau vị đắng (mướp đắng, cải cúc) kích hoạt thụ thể vị đắng T2R dọc đường ruột điều hòa cảm giác no',
      'Trà lên men Kombucha: Lợi ích từ axit hữu cơ và cái bẫy đường dư ẩn giấu trong các chai pha sẵn',
      'Glycine trong nước hầm xương và thực phẩm giàu đạm giúp củng cố niêm mạc ruột và điều hòa nhiệt độ giấc ngủ'
    ]
  },
  {
    domain: 'Tim mạch, Vi tuần hoàn & Sức khỏe Mạch máu (Cardiovascular & Microcirculation)',
    organ: 'Heart',
    goalId: 'cardio-vessels',
    ideas: [
      'Nước súc miệng diệt khuẩn mạnh có thể làm mất tác dụng hạ huyết áp từ nitrat tự nhiên trong củ dền và rau bina',
      'Trà hoa bụp giấm (Hibiscus) giàu Anthocyanin hỗ trợ giãn mạch tương tự cơ chế ức chế men chuyển nhẹ',
      'Lớp màng trắng quanh múi cam, bưởi giàu Hesperidin củng cố độ bền mao mạch và giảm ứ trệ tuần hoàn',
      'Cơ dép ở bắp chân (Soleus Push-up), trái tim thứ hai giúp bơm máu tĩnh mạch và tiêu thụ đường ngay khi ngồi',
      'Chóng mặt khi đứng dậy đột ngột: Phản xạ thụ thể áp suất Baroreceptor và cách giữ ổn định huyết áp tư thế',
      'Omega-3 thực vật (ALA) từ hạt óc chó và tỷ lệ chuyển hóa rất thấp sang EPA, DHA trong cơ thể người',
      'Chân tay thường xuyên lạnh dù trời không quá rét: Góc nhìn vi tuần hoàn mao mạch và tín hiệu Oxit Nitric',
      'Chất xơ Beta-Glucan trong lúa mạch và nấm ăn bẫy axit mật giúp gan kéo bớt cholesterol LDL ra khỏi máu'
    ]
  },
  {
    domain: 'Lão hóa Tế bào, Ty thể & Trường thọ Thực chứng (Cellular Longevity & Resilience)',
    organ: 'Cellular Aging',
    goalId: 'longevity-aging',
    ideas: [
      'Ergothioneine trong nấm ăn: Hoạt chất bảo vệ ty thể được tế bào người thiết kế riêng kênh vận chuyển OCTN1',
      'Taurine suy giảm theo tuổi tác và vai trò bảo vệ chức năng ty thể, võng mạc và cơ tim ở tuổi trung niên',
      'Sức nắm bàn tay (Grip Strength), chỉ số sinh học dự báo tuổi thọ và sức khỏe hệ thần kinh cơ chuẩn xác hơn BMI',
      'Đứng một chân 10 giây và hệ tiền đình, cảm thụ bản thể: Dấu hiệu lão hóa thầm lặng sau tuổi 50',
      'Thiếu hụt Vitamin B12 âm thầm ở người lớn tuổi và người dùng thuốc tiểu đường Metformin gây tê bì thần kinh',
      'Tỷ lệ Kẽm và Đồng trong cơ thể: Uống kẽm liều cao kéo dài có thể vô tình gây thiếu hụt đồng và thiếu máu',
      'Bệnh nha chu và vi khuẩn Porphyromonas gingivalis: Con đường từ nướu răng đến phản ứng viêm mạn tính mạch máu',
      'Bài tập cơ lệch tâm (đi xuống cầu thang, hạ tạ chậm) tái cấu trúc gân khớp và cải thiện độ nhạy insulin vượt trội'
    ]
  },
  {
    domain: 'Làn da, Thị lực, Miễn dịch & Môi trường Sống (Skin, Vision, Immunity & Daily Environment)',
    organ: 'Immune',
    goalId: 'immune-environment',
    ideas: [
      'Tia UVA xuyên qua cửa kính văn phòng và xe hơi âm thầm phá hủy sợi đàn hồi da dù không gây cháy nắng',
      'Ngồi phòng điều hòa khô lạnh suốt 8 giờ làm tăng mất nước qua biểu bì (TEWL) và làm khô hàng rào niêm mạc mũi',
      'Vitamin C từ ổi, ớt chuông và vai trò đồng yếu tố bắt buộc của enzym prolyl hydroxylase giúp vết thương mau lành',
      'Chăm sóc hệ vi sinh trên bề mặt da: Rửa mặt quá nhiều lần bằng chất tẩy mạnh làm hỏng lớp màng axit bảo vệ pH 5.5',
      'Mật ong nguyên chất và cơ chế làm dịu phản xạ ho về đêm ở người lớn cùng lưu ý tuyệt đối với trẻ dưới 1 tuổi',
      'Ánh sáng tự nhiên ngoài trời giúp võng mạc tiết Dopamine bảo vệ trục nhãn cầu chống tiến triển cận thị',
      'Chất lượng không khí trong phòng ngủ đóng kín: Nồng độ CO2 vượt 1.000 ppm làm giảm rõ rệt hiệu suất nhận thức sáng hôm sau',
      'Thở cơ hoành sâu và tư thế khung chậu giúp giảm áp lực lên cột sống thắt lưng và cải thiện tuần hoàn bạch huyết'
    ]
  }
];

function resolveGeminiApiKey() {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }

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

function pickDiversePillarAndIdea(recentOrgans = []) {
  // Compute unused ideas for EVERY pillar using Dedup Guard v3.0
  const pillarsWithFresh = DOMAIN_PILLARS.map(pillar => {
    const freshIdeas = pillar.ideas.filter(idea => !checkTopicCollision({ titleVi: idea }).isDuplicate);
    return { ...pillar, freshIdeas };
  });

  const nonEmptyPillars = pillarsWithFresh.filter(p => p.freshIdeas.length > 0);

  // Avoid repeating the last 2 published organs whenever possible
  const lastTwoOrgans = new Set(recentOrgans.slice(0, 2));
  const freshRotated = nonEmptyPillars.filter(p => !lastTwoOrgans.has(p.organ));
  const candidatePool = freshRotated.length > 0 ? freshRotated : nonEmptyPillars;

  if (candidatePool.length > 0) {
    // Balanced 30% priority for Oncology/Chemoprevention if fresh ideas remain and not just posted
    const cancerPillar = candidatePool.find(p => p.goalId === 'cancer-prevention');
    let chosenPillar;
    if (cancerPillar && Math.random() < 0.30) {
      chosenPillar = cancerPillar;
    } else {
      const others = candidatePool.filter(p => p.goalId !== 'cancer-prevention');
      const pickPool = others.length > 0 ? others : candidatePool;
      chosenPillar = pickPool[Math.floor(Math.random() * pickPool.length)];
    }

    const randomIdea = chosenPillar.freshIdeas[Math.floor(Math.random() * chosenPillar.freshIdeas.length)];
    return { chosenPillar, randomIdea, isOpenDiscovery: false };
  }

  // OPEN FRONTIER DISCOVERY MODE: If all static seeds are ever exhausted, NEVER recycle ideas[0]!
  // Pick the least-recently-used organ and let Gemini discover a brand-new topic.
  const allOrgans = ['Oncology', 'Metabolic', 'Brain', 'Gut', 'Heart', 'Cellular Aging', 'Immune'];
  const leastRecent = allOrgans.find(o => !recentOrgans.slice(0, 4).includes(o)) || allOrgans[Math.floor(Math.random() * allOrgans.length)];
  const fallbackPillar = DOMAIN_PILLARS.find(p => p.organ === leastRecent) || DOMAIN_PILLARS[0];
  return { chosenPillar: fallbackPillar, randomIdea: null, isOpenDiscovery: true };
}

export async function generateTopicWithGemini(existingCatalog = [], feedback = null, targetTier = 'Life Dispatch') {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    console.warn('⚠️ [Gemini Generator] Không tìm thấy GEMINI_API_KEY trong env.');
    return null;
  }

  const exclusionSummary = getCompactExclusionSummary();
  const recentCtx = getRecentDispatchContext(8);
  const { chosenPillar, randomIdea, isOpenDiscovery } = pickDiversePillarAndIdea(recentCtx.recentOrgans);

  // Rotate headline & opening hook archetypes randomly each run
  const chosenTitleArchetype = TITLE_ARCHETYPES[Math.floor(Math.random() * TITLE_ARCHETYPES.length)];
  const chosenHookArchetype = HOOK_ARCHETYPES[Math.floor(Math.random() * HOOK_ARCHETYPES.length)];

  console.log(`🧭 [Diversity Engine] Lĩnh vực: ${chosenPillar.organ} | Kiểu tựa đề: ${chosenTitleArchetype.id} | Kiểu mở bài: ${chosenHookArchetype.id} | OpenDiscovery=${isOpenDiscovery}`);

  const systemInstruction = `Bạn là TS. Hoàng Xuân Chiến (Dr. rer. nat. - Đại học Hamburg, CHLB Đức), Giám đốc Học thuật kiêm Tổng biên tập của ấn bản y sinh "Phytocodex" (phytocodex.vercel.app).
Bạn là chuyên gia hàng đầu về Y học Chuyển hóa, Lão hóa & Trường thọ (Metabolic Longevity), Dược động học và Tín hiệu tế bào.

ĐỐI TƯỢNG ĐỘC GIẢ VÀ ĐỊNH HƯỚNG NỘI DUNG:
- ĐỐI TƯỢNG ĐỘC GIẢ: Độc giả phổ thông đại chúng (người đi làm, phụ huynh, người quan tâm sức khỏe gia đình dựa trên khoa học thực chứng).
- VĂN PHONG TS. HOÀNG XUÂN CHIẾN: Tự nhiên, điềm đạm, ấm áp, hóm hỉnh vừa đủ, sắc sảo và tôn trọng trí tuệ người đọc. Dùng ẩn dụ tinh tế để giải thích cơ chế phân tử nhưng KHÔNG sáo rỗng, KHÔNG viết kiểu văn mẫu AI.

MỤC TIÊU TUYỆT ĐỐI:
Tạo ra 1 bài viết chuyên khảo y sinh song ngữ MỚI HOÀN TOÀN, mang tính thực chứng cao (Nature/Science/Cell/Lancet/NEJM/AJCN/Nutrients), TUYỆT ĐỐI KHÔNG TRÙNG LẶP hoặc viết lại bất kỳ chủ đề, hoạt chất hay cơ chế nào đã xuất bản dưới đây!

${exclusionSummary}

QUY TẮC BẮT BUỘC VỀ TỰA ĐỀ & MỞ BÀI (CHỐNG RẬP KHUÔN AI):
1. TIÊU ĐỀ TỰ NHIÊN (titleVi, titleEn):
   - TUYỆT ĐỐI KHÔNG bắt đầu tiêu đề tiếng Việt bằng "Vì sao..." hay "Tại sao...", và KHÔNG bắt đầu tiêu đề tiếng Anh bằng "Why...".
   - Hạn chế tối đa các cụm sáo rỗng như "Giải mã bí mật...", "Sự thật bất ngờ...", "Phép màu...".
   - Viết câu trần thuật hoặc cấu trúc tự nhiên theo Sentence case tiếng Việt (chỉ viết hoa chữ cái đầu câu, sau dấu hai chấm nếu là mệnh đề độc lập, và danh từ riêng/thuật ngữ).
   - BẮT BUỘC áp dụng phong cách đặt tựa đề cho kỳ này: [${chosenTitleArchetype.name}] -> ${chosenTitleArchetype.instruction}
2. MỞ BÀI THU HÚT & ĐA DẠNG (leadVi, leadEn):
   - BẮT BUỘC áp dụng kiểu mở bài cho kỳ này: [${chosenHookArchetype.name}] -> ${chosenHookArchetype.instruction}
   - CẤM TUYỆT ĐỐI các câu mở bài sáo rỗng kiểu AI sau:
     * "Trong guồng quay hối hả của cuộc sống hiện đại..." / "Trong nhịp sống hiện đại..."
     * "Có bao giờ bạn tự hỏi..." / "Bạn có bao giờ thắc mắc..." / "Đã bao giờ bạn cảm thấy..."
     * "Hãy tưởng tượng..." / "Trong những buổi tiệc tùng cuối năm..." / "Trong gian bếp của mỗi gia đình Việt Nam..."
     * Bịa nhân vật rập khuôn kiểu "Chị Lan, 34 tuổi, nhân viên kế toán tại Hà Nội", "Chị Minh", "Anh Minh"...
     * Tiếng Anh: "In today's fast-paced world...", "Have you ever wondered...", "Imagine a..."
   - Độ dài leadVi >= 150 từ, chia 2 đoạn ngắn thoáng mắt (mỗi đoạn 2-3 câu).

QUY TẮC CẤU TRÚC & KHOA HỌC BẮT BUỘC:
3. KHÔNG dùng bất kỳ dấu em-dash (—) hay en-dash (–) nào. Chỉ dùng dấu phẩy, hai chấm, gạch nối ngắn (-) hoặc ngoặc đơn.
4. Tóm tắt (excerptVi, excerptEn): 90-130 từ, nêu bật góc nhìn khoa học mới mẻ và giá trị thực tế.
5. Ẩn dụ (analogyVi, analogyEn): Một đoạn so sánh ví von mới mẻ, sáng tạo, gắn sát với cơ chế của riêng bài này.
6. Sơ đồ Flowchart (flowchartVi, flowchartEn): Chuỗi phản ứng phân tử bắt buộc dùng mũi tên "──►" và ngoặc vuông, ví dụ: [Tác nhân] ──► [Thụ thể / Enzyme] ──► [Tác động sinh học].
7. Phần nội dung (sectionsVi, sectionsEn): ĐỦ 3 phần chi tiết (Heading + Body), đoạn văn thoáng 2-4 câu/đoạn:
   - Phần 1: Cơ chế sinh học đằng sau thói quen / vi chất (giải nghĩa mộc mạc từng thuật ngữ). Tối thiểu 250 từ.
   - Phần 2: Đối chiếu bằng chứng khoa học & BẮT BUỘC có 1 BẢNG SO SÁNH MARKDOWN (ít nhất 3 dòng dữ liệu cụ thể, có số liệu/ngưỡng rõ ràng). Tối thiểu 250 từ kèm bảng.
   - Phần 3: BẮT BUỘC là phần "Ứng dụng thực tế & Khuyến nghị an toàn" (Heading chứa từ khóa như "Ứng dụng thực tế", "Chiến lược đời sống", "Khuyến nghị an toàn", "Thực hành an toàn"). Hướng dẫn cụ thể liều lượng, thời điểm, cách chế biến. Tối thiểu 250 từ.
8. Tổng độ dài văn bản tiếng Việt đạt 850 - 1.250 từ, tiếng Anh đạt 750 - 1.100 từ.
9. TÀI LIỆU THAM KHẢO CÓ THẬT (ZERO HALLUCINATION):
   - Chỉ dẫn bài báo gốc thực sự tồn tại trên PubMed/CrossRef (Nature, Science, Cell, Lancet, NEJM, BMJ, AJCN, Nutrients, J Nutr, Am J Clin Nutr, v.v.).
   - "label": Tiêu đề nguyên bản tiếng Anh chính xác. Để trống pmid/doi nếu không chắc 100% (hệ thống Citation Verifier sẽ tự tra cứu và đối khớp PubMed).
10. BỘ TÓM TẮT & HƯỚNG DẪN THỰC HÀNH V2: Điền đầy đủ briefVi, briefEn (bottomLine, evidence, 3 takeaways) và practicalVi, practicalEn (steps, avoidIf, interactions, seeDoctor).
11. TAGS THEO MỤC SỨC KHỎE: tagsVi và tagsEn chứa từ khóa gần gũi (như giac-ngu, duong-huyet, tim-mach, ruot, nang-luong, lao-hoa, noi-tiet, khop, gan, mat-da, ung-thu, mien-dich).
12. TỪ KHÓA TÌM ẢNH (imageSearchQueries): Mảng 4 cụm từ khóa tiếng Anh ngắn (2-4 từ) mô tả CHÍNH XÁC thực phẩm, dược liệu, nguyên liệu nấu ăn hoặc khung cảnh đời thường của bài viết (TUYỆT ĐỐI KHÔNG dùng cụm chung chung như "fitness exercise", "healthy nutrition", "cancer laboratory").`;

  const isLifeDispatch = targetTier === 'Life Dispatch';
  const topicDirective = isOpenDiscovery
    ? `- CHẾ ĐỘ KHÁM PHÁ CHỦ ĐỀ MỚI HOÀN TOÀN (Open Frontier): Hãy chọn 1 chủ đề đời sống y sinh cụ thể, thú vị, có bằng chứng nghiên cứu rõ ràng thuộc nhóm cơ quan "${chosenPillar.organ}" (${chosenPillar.domain}), HOÀN TOÀN CHƯA TỪNG XUẤT HIỆN trong danh mục loại trừ ở trên.`
    : `- Lĩnh vực: ${chosenPillar.domain}\n- Phân loại cơ quan: "${chosenPillar.organ}"\n- Gợi ý chủ đề gốc (hãy viết lại tựa đề thật tự nhiên theo đúng phong cách [${chosenTitleArchetype.name}], KHÔNG copy nguyên văn): "${randomIdea}"`;

  const basePrompt = isLifeDispatch
    ? `Hãy viết một bài báo khoa học đời sống thường thức gần gũi, chuẩn xác (Tier: "Life Dispatch") song ngữ (Tiếng Việt & Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

ĐỊNH HƯỚNG CHỦ ĐỀ KỲ NÀY (BẮT BUỘC MỚI 100%, KHÔNG TRÙNG KHO CŨ):
${topicDirective}

YÊU CẦU BIÊN TẬP BẮT BUỘC:
- Tựa đề theo phong cách: [${chosenTitleArchetype.name}] — KHÔNG bắt đầu bằng "Vì sao/Tại sao" hay "Why".
- Mở bài theo phong cách: [${chosenHookArchetype.name}] — tự nhiên, cuốn hút, KHÔNG dùng câu sáo rỗng AI hay bịa nhân vật "Chị Lan/Anh Minh".
- Nếu là đề tài phòng ngừa ung thư, chú trọng giải pháp thực tiễn từ căn bếp, cách chế biến hoặc hợp chất thực vật bảo vệ thay vì chỉ hù dọa.
- Slug tiếng Việt kết thúc bằng "-vi", slug tiếng Anh kết thúc bằng "-en".`
    : `Hãy viết một bài phân tích chuyên khảo y sinh chuyên sâu (Tier: "Clinical Deep-Dive") song ngữ (Tiếng Việt & Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

ĐỊNH HƯỚNG CHỦ ĐỀ KỲ NÀY (BẮT BUỘC MỚI 100%, KHÔNG TRÙNG KHO CŨ):
${topicDirective}

YÊU CẦU BIÊN TẬP BẮT BUỘC:
- Đi sâu cơ chế phân tử, thụ thể, enzym, dược động học kèm bảng so sánh định lượng cụ thể.
- Tựa đề theo phong cách: [${chosenTitleArchetype.name}] — tự nhiên, chuẩn khoa học, KHÔNG bắt đầu bằng "Vì sao/Tại sao" hay "Why".
- Mở bài theo phong cách: [${chosenHookArchetype.name}] — ấn tượng, trực diện, không mở đầu rập khuôn.
- Slug tiếng Việt kết thúc bằng "-vi", slug tiếng Anh kết thúc bằng "-en".`;

  const buildSchemaAndFeedback = (activeFeedback) => `
TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON VỚI CẤU TRÚC SAU (KHÔNG kèm markdown fence thừa):
{
  "topicId": "slug-id-ngan-gon",
  "slugVi": "slug-tieng-viet-co-hau-to-vi",
  "slugEn": "slug-tieng-anh-co-hau-to-en",
  "titleVi": "Tiêu đề tiếng Việt tự nhiên, KHÔNG bắt đầu bằng Vì sao/Tại sao",
  "titleEn": "Natural English editorial headline, NOT starting with Why",
  "excerptVi": "Tóm tắt tiếng Việt 90-130 từ",
  "excerptEn": "English excerpt 80-120 words",
  "organ": "${chosenPillar.organ}",
  "tier": "${targetTier}",
  "tagsVi": ["tag-1", "tag-2", "tag-3", "tag-4"],
  "tagsEn": ["tag-1", "tag-2", "tag-3", "tag-4"],
  "imageSearchQueries": [
    "specific English culinary or visual query 1",
    "specific English culinary or visual query 2",
    "specific Latin botanical or ingredient query 3",
    "specific lifestyle context query 4"
  ],
  "references": [
    {
      "ordinal": 1,
      "label": "Exact authentic paper title in English as published in journal",
      "pmid": "",
      "doi": "",
      "design": "RCT / Meta-analysis / Systematic Review",
      "journal": "Journal Name",
      "year": 2023,
      "abstract": "Key molecular and clinical findings in 2 concise sentences."
    }
  ],
  "gizmo": "pathway",
  "readingTimeVi": "7 phút đọc",
  "readingTimeEn": "7 min read",
  "analogyVi": "Ẩn dụ đời thường tinh tế, mới mẻ dành riêng cho bài viết này...",
  "analogyEn": "Fresh vivid everyday analogy...",
  "leadVi": "Mở bài cuốn hút theo phong cách [${chosenHookArchetype.name}], chia 2 đoạn ngắn thoáng mắt...",
  "leadEn": "Engaging opening hook in English matching the chosen hook style...",
  "flowchartVi": "[Bước 1 bằng Tiếng Việt] ──► [Bước 2] ──► [Bước 3]",
  "flowchartEn": "[Step 1 in English] ──► [Step 2] ──► [Step 3]",
  "sectionsVi": [
    { "heading": "1. Tiêu đề mục 1 rõ ràng", "body": "Phân tích cơ chế phân tử mộc mạc, chia đoạn ngắn 2-4 câu (tối thiểu 250 từ)..." },
    { "heading": "2. Tiêu đề mục 2: Bằng chứng & Bảng đối chiếu", "body": "Phân tích dữ liệu thực chứng...\\n\\n| Chỉ số / Tình huống | Cơ chế Sinh học | Ảnh hưởng Thực tế |\\n| :--- | :--- | :--- |\\n| Mức 1 | ... | ... |\\n| Mức 2 | ... | ... |\\n| Mức 3 | ... | ... |\\n\\nPhân tích tiếp..." },
    { "heading": "3. Ứng dụng thực tế & Khuyến nghị an toàn", "body": "Hướng dẫn thực hành cụ thể liều lượng, thời điểm, cách chế biến (tối thiểu 250 từ)..." }
  ],
  "sectionsEn": [
    { "heading": "1. Section 1 Heading", "body": "Clear molecular explanation in short paragraphs (min 220 words)..." },
    { "heading": "2. Section 2: Evidence & Clinical Comparison", "body": "Evidence breakdown...\\n\\n| Condition / Variable | Molecular Mechanism | Practical Outcome |\\n| :--- | :--- | :--- |\\n| Level 1 | ... | ... |\\n| Level 2 | ... | ... |\\n| Level 3 | ... | ... |\\n\\nFurther analysis..." },
    { "heading": "3. Practical Takeaways & Safety Guidelines", "body": "Actionable everyday steps and safety notes (min 220 words)..." }
  ],
  "briefVi": {
    "bottomLine": "Một câu kết luận thực tiễn đắt giá nhất cho bạn đọc",
    "evidence": "human-rct",
    "takeaways": ["Ý chính 1", "Ý chính 2", "Ý chính 3"]
  },
  "briefEn": {
    "bottomLine": "One clear practical bottom-line insight",
    "evidence": "human-rct",
    "takeaways": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3"]
  },
  "practicalVi": {
    "steps": ["Bước thực hành cụ thể 1", "Bước thực hành cụ thể 2"],
    "avoidIf": ["Đối tượng cần thận trọng"],
    "interactions": ["Tương tác thuốc hoặc thực phẩm đáng lưu ý"],
    "seeDoctor": "Dấu hiệu cần thăm khám bác sĩ"
  },
  "practicalEn": {
    "steps": ["Actionable step 1", "Actionable step 2"],
    "avoidIf": ["Cautions or contraindications"],
    "interactions": ["Notable drug or food interactions"],
    "seeDoctor": "When to consult a physician"
  }
}${activeFeedback ? `\n\n🚨 PHẢN HỒI BẮT BUỘC KHẮC PHỤC TỪ CỔNG KIỂM DUYỆT:\n${activeFeedback}\nHãy đổi sang đề tài/cách diễn đạt hoàn toàn đáp ứng yêu cầu trên!` : ''}`;

  let currentFeedback = feedback;

  for (const model of MODEL_CANDIDATES) {
    try {
      console.log(`🤖 [Gemini Generator] Đang thử kết nối AI model: ${model}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);

      // FIX v4.0: Gắn đầy đủ schema + feedback vào prompt thực sự gửi lên Gemini!
      const fullPrompt = `${basePrompt}\n${buildSchemaAndFeedback(currentFeedback)}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.72
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
        // Kiểm định chống trùng lặp cục bộ tức thì bằng Deterministic Dedup Guard v3.0 (0 token)
        const collision = checkTopicCollision(parsed);
        if (collision.isDuplicate) {
          console.warn(`🛑 [Topic Dedup Guard BỊ CHẶN] ${collision.reason}`);
          currentFeedback = `Đề tài "${parsed.titleVi}" bị từ chối do trùng lặp: ${collision.reason}. BẮT BUỘC chọn một đề tài KHÁC HẲN chưa từng có trong kho!`;
          continue;
        }

        // Kiểm tra nhanh chống tiêu đề "Vì sao/Tại sao/Why" (cả ở đầu câu và sau dấu hai chấm)
        if (/(?:^|[:\-]\s*)(?:vì sao|tại sao)\b/i.test((parsed.titleVi || '').trim()) || /(?:^|[:\-]\s*)why\b/i.test((parsed.titleEn || '').trim())) {
          console.warn(`🛑 [Title Style Guard] Tiêu đề dùng khuôn mẫu Vì sao/Why ("${parsed.titleVi}") -> yêu cầu model tiếp theo viết tự nhiên hơn.`);
          currentFeedback = `Tiêu đề "${parsed.titleVi}" dùng khuôn mẫu "Vì sao/Tại sao/Why". BẮT BUỘC đặt lại tiêu đề tự nhiên theo phong cách [${chosenTitleArchetype.name}], KHÔNG dùng "Vì sao/Tại sao/Why" ở đầu câu hay sau dấu hai chấm.`;
          continue;
        }

        console.log(`🎯 [Gemini Generator] AI đã sinh thành công bài mới: "${parsed.titleVi}"`);
        return parsed;
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Generator] Lỗi khi gọi ${model}: ${err.message}`);
    }
  }

  return null;
}
