/**
 * Autonomous Gemini Topic & Content Generator for Phytocodex (v5.0 — Self-Expanding Discovery Engine)
 * Dr. Xuan Chien Hoang (Dr. rer. nat. | University of Hamburg)
 *
 * 3-Track Self-Expanding Topic Discovery Architecture (never locked to a static topic list!):
 * - Track A (~40%): LIVE PUBMED SCIENCE RADAR — queries NCBI PubMed E-utilities (2023-2026) across
 *   16 adjacent biomedical & everyday-health subfields, filters out covered topics, and anchors the
 *   article in a REAL newly published study (PMID/DOI verified from the start!).
 * - Track B (~35%): OPEN ADJACENT-FIELD EXPANSION — combines 16 open-ended adjacent domains
 *   (environmental health, drug-food interactions, sensory aging, oral-systemic link, chronobiology,
 *   Asian culinary biochemistry, respiratory/thermal physiology, musculoskeletal biomechanics, etc.)
 *   with 8 rotating editorial lenses so Gemini freely originates fresh topics beyond fixed lists.
 * - Track C (~25%, auto-fades to 0% as used): CURATED EVERYDAY SEEDS — verified high-interest
 *   everyday health topics; zero fallback to exhausted ideas[0].
 *
 * Also enforces:
 * - 7 rotating natural headline archetypes (bans "Vì sao..." / "Tại sao..." / "Why..." templates)
 * - 6 rotating engaging opening hook styles (bans AI-slop clichés & fake personas)
 * - Full 100% exclusion catalog + Self-Learning Dedup Guard v3.1
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

const NCBI_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const NCBI_PARAMS = 'tool=ThePhytocodex&email=contact@phytocodex.org';

// 7 rotating editorial headline archetypes — natural, journalistic, NO "Vì sao..." cliché
const TITLE_ARCHETYPES = [
  {
    id: 'paradox',
    name: 'Nghịch lý / Lật ngược thói quen quen thuộc',
    instruction: 'Đặt tựa đề kiểu khẳng định một nghịch lý đời thường bất ngờ (KHÔNG dùng câu hỏi "Vì sao/Tại sao"). Ví dụ phong cách: "Nước súc miệng diệt khuẩn có thể vô hiệu hóa lợi ích hạ huyết áp của củ dền".'
  },
  {
    id: 'metric-rule',
    name: 'Con số / Quy tắc thực chiến gọn sắc',
    instruction: 'Đặt tựa đề mở đầu hoặc neo vào một con số sinh học/thời lượng cụ thể đi kèm lợi ích rõ ràng (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ phong cách: "30 loại thực vật mỗi tuần: Ngưỡng đa dạng giúp hệ vi sinh đường ruột hồi sinh".'
  },
  {
    id: 'vivid-image',
    name: 'Hình ảnh đời thường sắc nét (Editorial Metaphor)',
    instruction: 'Đặt tựa đề ngắn gọn dùng một hình ảnh cụ thể, tinh tế, giàu sức gợi về cơ thể hoặc thực phẩm (KHÔNG dùng "Vì sao/Tại sao", KHÔNG lạm dụng "Giải mã"). Ví dụ phong cách: "Cơ dép bắp chân, cỗ máy bơm đường huyết thầm lặng dưới gầm bàn làm việc".'
  },
  {
    id: 'smart-contrast',
    name: 'So sánh hai lựa chọn thực tế (A hay B)',
    instruction: 'Đặt tựa đề đối chiếu trực tiếp hai cách chế biến, hai loại thực phẩm hoặc hai thói quen phổ biến (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ phong cách: "Gừng tươi pha trà hay gừng nướng cháy vỏ: Sự biến đổi từ Gingerol sang Shogaol".'
  },
  {
    id: 'declarative-mechanism',
    name: 'Câu trần thuật chủ động nêu cơ chế bất ngờ',
    instruction: 'Đặt tựa đề là một câu trần thuật trực diện, mạch lạc, không nhất thiết cần dấu hai chấm (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ phong cách: "Thở bằng mũi giải phóng khí Oxit Nitric tự nhiên ngay từ các xoang mặt".'
  },
  {
    id: 'hidden-blindspot',
    name: 'Góc khuất đời sống ít người để ý',
    instruction: 'Đặt tựa đề chỉ thẳng một góc khuất tinh tế trong sinh hoạt hằng ngày bằng giọng điềm tĩnh, chuẩn khoa học (KHÔNG giật gân, KHÔNG dùng "Vì sao/Tại sao"). Ví dụ phong cách: "Ngủ bù cuối tuần lệch quá 2 giờ đang tạo ra cơn lệch múi giờ chuyển hóa ngay tại nhà".'
  },
  {
    id: 'ingredient-spotlight',
    name: 'Cận cảnh một hoạt chất / thực phẩm bình dị',
    instruction: 'Đặt tựa đề tôn vinh một thực phẩm, thói quen hoặc hoạt chất quen thuộc theo kiểu tạp chí khoa học hiện đại (KHÔNG dùng "Vì sao/Tại sao"). Ví dụ phong cách: "Ergothioneine trong nấm ăn: Hoạt chất được tế bào người thiết kế riêng kênh vận chuyển".'
  }
];

// 6 rotating opening hook styles — kills repetitive "Chị Lan kế toán Hà Nội" / "tiệc tùng cuối năm" / "Trong guồng quay hối hả"
const HOOK_ARCHETYPES = [
  {
    id: 'sensory-micro-scene',
    name: 'Khoảnh khắc giác quan cận cảnh',
    instruction: 'Mở bài ngay bằng một chi tiết giác quan rất nhỏ, chân thực (âm thanh, mùi hương, cảm giác sinh lý cụ thể như vị cay nồng bốc lên từ lát hành tím, cảm giác nặng nề ở đôi chân sau 3 tiếng ngồi yên). TUYỆT ĐỐI KHÔNG bịa nhân vật kiểu "Chị Lan 34 tuổi kế toán Hà Nội" hay "Anh Minh".'
  },
  {
    id: 'surprising-number',
    name: 'Con số sinh lý hoặc kết quả nghiên cứu gây khựng lại',
    instruction: 'Mở bài thẳng bằng một con số sinh lý hoặc dữ liệu thực nghiệm đáng chú ý (1-2 câu đầu súc tích), sau đó nối tự nhiên vào thói quen hằng ngày của người đọc.'
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
    instruction: 'Mở bài như một lời trò chuyện điềm đạm, gần gũi, thẳng thắn từ trải nghiệm nghiên cứu và câu hỏi thường gặp của bạn đọc — tự nhiên, ấm áp, tuyệt đối không kiểu cách hay lên lớp.'
  },
  {
    id: 'sharp-contrast',
    name: 'Đặt hai tình huống tương phản cạnh nhau ngay câu đầu',
    instruction: 'Mở bài bằng sự đối lập rõ rệt giữa hai cách làm tưởng chừng giống hệt nhau (ví dụ: cùng một loại thực phẩm nhưng khác nhiệt độ, thời điểm uống, hoặc cách kết hợp), để khơi gợi tò mò lập tức.'
  }
];

// === TRACK A & TRACK B: 16 EXPANDED ADJACENT BIOMEDICAL & EVERYDAY-LIFE FRONTIER DOMAINS ===
// Automatically expands beyond narrow fixed topics into real-world adjacent health sciences!
export const ADJACENT_FRONTIER_DOMAINS = [
  {
    id: 'culinary-chemoprevention',
    organ: 'Oncology',
    domain: 'Hóa sinh Căn bếp, Bảo quản Thực phẩm & Phòng ngừa Ung thư Thực chứng',
    pubmedQuery: '(phytochemical OR polyphenol OR glucosinolate OR marinade OR acrylamide OR cooking oil) AND (cancer prevention OR DNA damage OR phase II enzymes) AND (humans[MeSH] OR review[pt])',
    scopeHint: 'Khám phá tương tác gia vị, phương pháp nấu (hấp, luộc, lên men, ướp thảo mộc, nhiệt độ dầu ăn), hợp chất bảo vệ tế bào mới ngoài các bài đã đăng.'
  },
  {
    id: 'drug-nutrient-interactions',
    organ: 'Metabolic',
    domain: 'Tương tác Thuốc - Thực phẩm & Dược động học Đời thường (Food-Drug & Nutrient Interactions)',
    pubmedQuery: '(food-drug interaction OR micronutrient absorption OR iron absorption OR vitamin B12 metformin OR grapefruit CYP3A4 OR zinc copper) AND (clinical[tiab] OR review[pt])',
    scopeHint: 'Các tương tác thực tế ít người để ý: thực phẩm/đồ uống làm tăng hoặc cản trở hấp thu khoáng chất, vitamin hoặc thuốc thông dụng (sắt-tannin, kẽm-đồng, B12-metformin, canxi-levothyroxine, bưởi-CYP3A4...).'
  },
  {
    id: 'environmental-daily-exposures',
    organ: 'Immune',
    domain: 'Y học Môi trường Sống Hằng ngày (Không khí trong nhà, Vi nhựa, Nhiệt độ, Nước uống & Tiếp xúc Da)',
    pubmedQuery: '(microplastics OR indoor air quality CO2 OR endocrine disruptor OR food packaging OR drinking water OR UVA window) AND (human health OR inflammation OR cognition)',
    scopeHint: 'Các yếu tố môi trường ngay trong nhà và văn phòng: chất lượng không khí CO2 phòng ngủ, hộp nhựa đựng đồ nóng, chất chống dính, ánh nắng qua cửa kính, độ ẩm phòng điều hòa.'
  },
  {
    id: 'oral-systemic-axis',
    organ: 'Heart',
    domain: 'Trục Răng miệng - Tim mạch - Não bộ & Hệ Vi sinh Khoang miệng (Oral-Systemic Health)',
    pubmedQuery: '(oral microbiome OR antiseptic mouthwash nitric oxide OR periodontal disease cardiovascular OR Porphyromonas gingivalis) AND (human OR review[pt])',
    scopeHint: 'Mối liên hệ bất ngờ giữa vệ sinh răng miệng, vi khuẩn trên lưỡi chuyển hóa nitrat tạo Oxit Nitric, bệnh nha chu với viêm mạch máu và sức khỏe não bộ.'
  },
  {
    id: 'chronobiology-seasonal',
    organ: 'Brain',
    domain: 'Sinh học Nhịp điệu, Ngủ bù & Thích nghi Mùa (Chronobiology, Social Jetlag & Light Timing)',
    pubmedQuery: '(social jetlag OR chrononutrition OR light exposure circadian OR sleep inertia OR pink noise slow-wave sleep) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Nhịp sinh học thực tế ngoài melatonin/ánh sáng xanh cơ bản: lệch múi giờ cuối tuần, ánh sáng hoàng hôn, độ dài giấc ngủ trưa, giờ tập thể dục theo đồng hồ sinh học, nhịp thân nhiệt.'
  },
  {
    id: 'fermentation-postbiotics',
    organ: 'Gut',
    domain: 'Thực phẩm Lên men Truyền thống, Tiền sinh học & Chuyển hóa Vi sinh (Fermented Foods & Postbiotics)',
    pubmedQuery: '(fermented foods microbiome OR postbiotics OR inulin FODMAP OR plant diversity gut microbiome OR Saccharomyces boulardii) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Đa dạng thực vật nuôi lợi khuẩn, dưa muối/kimchi/kombucha/miso/natto, phục hồi hệ vi sinh sau kháng sinh, ranh giới chất xơ FODMAP gây đầy hơi.'
  },
  {
    id: 'spices-asian-botanicals',
    organ: 'Gut',
    domain: 'Hóa sinh Gia vị & Thảo mộc Bếp Á (Gừng, Quế, Bạc hà, Atiso, Hạt é, Đinh hương, Nhụy hoa nghệ tây)',
    pubmedQuery: '(gingerol shogaol OR peppermint oil TRPM8 OR cinnamon Ceylon coumarin OR saffron crocin OR artichoke cynarin OR bitter taste receptor T2R) AND (clinical OR review[pt])',
    scopeHint: 'Cơ chế phân tử của các gia vị và thảo mộc gần gũi trong bếp Việt/Á: chuyển hóa hoạt chất khi phơi/nướng/hãm trà, khác biệt giữa các chủng loại và liều an toàn.'
  },
  {
    id: 'vascular-microcirculation',
    organ: 'Heart',
    domain: 'Vi tuần hoàn, Động lực học Mạch máu & Huyết áp Đời thường (Microcirculation & Vascular Tone)',
    pubmedQuery: '(dietary nitrate beetroot blood pressure OR hibiscus sabdariffa blood pressure OR hesperidin endothelial OR soleus muscle metabolism OR orthostatic hypotension) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Các cơ chế ít người biết về tuần hoàn máu: cơ bắp chân bơm máu tĩnh mạch khi ngồi, nitrat rau củ, polyphenol vỏ cam quýt, hạ huyết áp tư thế, tuần hoàn ngoại vi lạnh tay chân.'
  },
  {
    id: 'sensory-vestibular-aging',
    organ: 'Brain',
    domain: 'Lão hóa Giác quan, Thăng bằng & Thần kinh Vận động (Sensory, Hearing, Vision & Balance Health)',
    pubmedQuery: '(grip strength longevity OR single-leg balance aging OR outdoor light myopia dopamine OR olfactory decline neurodegeneration OR noise hearing aging) AND (humans[MeSH] OR cohort)',
    scopeHint: 'Sức khỏe thính giác, khứu giác, tiền đình thăng bằng (đứng 1 chân), sức nắm bàn tay dự báo tuổi thọ, ánh sáng ngoài trời phòng cận thị, sự phối hợp não-cơ.'
  },
  {
    id: 'musculoskeletal-tendon',
    organ: 'Cellular Aging',
    domain: 'Cơ sinh học Gân Khớp, Xương & Phục hồi Vận động (Tendon, Bone Density & Eccentric Mechanics)',
    pubmedQuery: '(eccentric exercise tendon OR bone mineral density impact exercise OR diaphragmatic breathing posture OR barefoot intrinsic foot muscles OR joint loading cartilage) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Bài tập cơ lệch tâm (đi xuống dốc, hạ tạ chậm), tái cấu trúc gân, cơ bàn chân và thăng bằng, tải trọng cơ học nuôi mật độ xương, thở cơ hoành và cột sống.'
  },
  {
    id: 'hydration-renal-electrolytes',
    organ: 'Metabolic',
    domain: 'Cân bằng Dịch, Thận & Thẩm thấu Tế bào (Hydration Physiology, Renal Protection & Electrolytes)',
    pubmedQuery: '(mild dehydration cognition OR kidney stone oxalate calcium OR potassium citrate renal OR overhydration hyponatremia OR uric acid hydration) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Mất nước nhẹ 1-2% và não bộ, sỏi thận oxalat và nghịch lý ăn đủ canxi để ngăn sỏi, uống nước rải rác so với uống dồn, chức năng lọc thận theo nhịp ngày đêm.'
  },
  {
    id: 'respiratory-autonomic',
    organ: 'Brain',
    domain: 'Sinh lý Hô hấp, Xoang mặt & Hệ Thần kinh Tự chủ (Respiratory Nitric Oxide & Autonomic Balance)',
    pubmedQuery: '(nasal breathing nitric oxide OR physiological sigh stress OR humming paranasal sinus nitric oxide OR heart rate variability breathing) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Thở bằng mũi so với thở miệng khi ngủ, khí Oxit Nitric tạo ra ở xoang cạnh mũi, kỹ thuật thở dài sinh lý 2 nhịp, mối liên hệ hơi thở và hệ thần kinh đối giao cảm.'
  },
  {
    id: 'dermatology-skin-microbiome',
    organ: 'Immune',
    domain: 'Hàng rào Biểu bì, Hệ Vi sinh Da & Lành thương (Skin Microbiome, pH Mantle & Wound Biology)',
    pubmedQuery: '(skin microbiome acid mantle OR transepidermal water loss indoor OR vitamin C prolyl hydroxylase wound OR niacinamide skin barrier OR UV photoaging diet) AND (humans[MeSH] OR review[pt])',
    scopeHint: 'Lớp màng axit pH 5.5 và hệ vi sinh da, mất nước biểu bì trong phòng lạnh, cơ chế tổng hợp mô liên kết lành thương, dinh dưỡng hỗ trợ chống lão hóa ánh sáng.'
  },
  {
    id: 'cellular-longevity-metabolites',
    organ: 'Cellular Aging',
    domain: 'Chuyển hóa Trường thọ & Vi chất Bảo vệ Ty thể Thế hệ mới (Next-Gen Longevity Metabolites)',
    pubmedQuery: '(ergothioneine OCTN1 longevity OR taurine aging humans OR glycine sleep metabolism OR choline brain health OR omega-3 ALA conversion) AND (humans[MeSH] OR clinical OR review[pt])',
    scopeHint: 'Các phân tử trường thọ mới nổi chưa từng xuất bản trên Phytocodex: Ergothioneine, Taurine, Glycine, Choline, Astaxanthin ngoài mắt, tỷ lệ chuyển hóa ALA thực vật.'
  },
  {
    id: 'midlife-hormonal-transitions',
    organ: 'Metabolic',
    domain: 'Chuyển dịch Nội tiết Tuổi Trung niên & Chuyển hóa Theo Giới (Midlife Hormonal & Metabolic Shifts)',
    pubmedQuery: '(perimenopause metabolic health OR muscle protein synthesis aging women OR iron deficiency ferritin fatigue OR progesterone sleep OR testosterone resistance training) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Thiếu hụt ferritin dự trữ sắt tiềm ẩn gây mệt mỏi dù không thiếu máu, thay đổi chuyển hóa tuổi 40-55, nhu cầu đạm theo tuổi, giấc ngủ giai đoạn tiền mãn kinh.'
  },
  {
    id: 'food-matrix-processing',
    organ: 'Metabolic',
    domain: 'Cấu trúc Ma trận Thực phẩm & Tốc độ Hấp thu (Food Matrix, Processing & Satiety Biochemistry)',
    pubmedQuery: '(food matrix bioavailability OR whole fruit versus juice glycemic OR soaking legumes phytate lectin OR ultra-processed food satiety OR carotenoid fat absorption) AND (humans[MeSH] OR clinical)',
    scopeHint: 'Khác biệt sinh học giữa ăn nguyên trái và ép nước, ma trận chất béo giúp hấp thu vitamin tan trong dầu, ngâm hạt/đậu giảm kháng dưỡng chất, thực phẩm siêu chế biến đánh lừa tín hiệu no.'
  }
];

// 8 rotating editorial lenses for Track B (Open Adjacent-Field Expansion)
const EDITORIAL_LENSES = [
  'Thói quen nhỏ trong căn bếp hằng ngày tạo ra khác biệt sinh hóa lớn',
  'Tương tác thực phẩm - đồ uống - thuốc ít người để ý trong bữa ăn hằng ngày',
  'Yếu tố môi trường sống (ánh sáng, không khí, nhiệt độ, đồ dùng) âm thầm tác động lên tế bào',
  'Cơ chế tự điều chỉnh và tự chữa lành kỳ diệu của cơ thể khi được kích hoạt đúng cách',
  'So sánh thực tế giữa hai cách chế biến hoặc hai dạng thực phẩm tưởng như giống hệt nhau',
  'Tín hiệu sinh học sớm mà cơ thể phát ra trước khi triệu chứng rõ rệt xuất hiện',
  'Lật lại một niềm tin dinh dưỡng phổ biến bằng bằng chứng lâm sàng mới nhất',
  'Tối ưu hiệu suất trí não, vận động và phục hồi cho người đi làm bận rộn'
];

// === TRACK C: CURATED EVERYDAY SEEDS (65 verified uncovered seeds, auto-fades out once used) ===
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
      'Ánh sáng hoàng hôn buổi chiều muộn giúp võng mạc phát tín hiệu chuẩn bị tiết Melatonin đúng nhịp',
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

/**
 * Track A: Live PubMed Science Radar (Zero LLM cost, uses free NCBI E-utilities)
 * Queries recent (2023-2026) peer-reviewed biomedical papers in an adjacent domain
 * and returns a verified, non-duplicate paper to serve as a fresh editorial anchor.
 */
export async function fetchLivePubMedDiscovery(frontierDomain) {
  try {
    const term = `(${frontierDomain.pubmedQuery}) AND ("2023/01/01"[PDAT] : "2026/12/31"[PDAT]) AND hasabstract[text]`;
    const searchUrl = `${NCBI_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=12&sort=relevance&retmode=json&${NCBI_PARAMS}`;

    const ctrl = new AbortController();
    const t1 = setTimeout(() => ctrl.abort(), 10000);
    const searchRes = await fetch(searchUrl, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ThePhytocodex-Editorial/5.0 (contact@phytocodex.org)' }
    });
    clearTimeout(t1);
    if (!searchRes.ok) return null;

    const searchData = await searchRes.json();
    const idList = searchData?.esearchresult?.idlist || [];
    if (idList.length === 0) return null;

    await new Promise(r => setTimeout(r, 350)); // Respect NCBI <= 3 req/sec

    const summaryUrl = `${NCBI_BASE}/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json&${NCBI_PARAMS}`;
    const ctrl2 = new AbortController();
    const t2 = setTimeout(() => ctrl2.abort(), 10000);
    const sumRes = await fetch(summaryUrl, {
      signal: ctrl2.signal,
      headers: { 'User-Agent': 'ThePhytocodex-Editorial/5.0 (contact@phytocodex.org)' }
    });
    clearTimeout(t2);
    if (!sumRes.ok) return null;

    const sumData = await sumRes.json();
    const candidates = [];

    for (const pmid of idList) {
      const item = sumData?.result?.[pmid];
      if (!item || !item.title || item.error) continue;
      const title = item.title.replace(/\.$/, '').trim();
      // Skip protocol-only, erratum, veterinary, or overly narrow case reports
      if (/\b(?:protocol|erratum|corrigendum|comment on|letter to|case report|mouse|mice|rat|rats|murine|zebrafish|broiler|piglet)\b/i.test(title)) {
        continue;
      }
      const doiObj = Array.isArray(item.articleids) ? item.articleids.find(a => a.idtype === 'doi') : null;
      const doi = doiObj?.value || '';
      const yearMatch = (item.pubdate || '').match(/\d{4}/);
      const year = yearMatch ? parseInt(yearMatch[0], 10) : 2024;

      // Filter against our Zero-Token Dedup Guard (checks DOI, entity signatures, title & rare keywords!)
      const col = checkTopicCollision({ titleEn: title, titleVi: title, doi });
      if (!col.isDuplicate) {
        candidates.push({
          pmid,
          doi,
          title,
          journal: item.source || item.fulljournalname || 'Peer-Reviewed Journal',
          year
        });
      }
    }

    if (candidates.length === 0) return null;
    // Randomly pick from top 5 fresh papers so consecutive runs explore different angles
    const topSlice = candidates.slice(0, Math.min(5, candidates.length));
    return topSlice[Math.floor(Math.random() * topSlice.length)];
  } catch (err) {
    console.warn(`⚠️ [PubMed Radar] Không thể truy vấn PubMed tạm thời (${err.message}) -> chuyển sang Open Expansion.`);
    return null;
  }
}

/**
 * Picks a self-expanding discovery strategy across 3 tracks:
 * - Track A (~40%): Live PubMed Science Radar (real 2023-2026 study in an adjacent domain)
 * - Track B (~35%): Open Adjacent-Field Expansion (adjacent domain × editorial lens, zero fixed topic list)
 * - Track C (~25% -> auto-fades to 0%): Unused curated seeds from DOMAIN_PILLARS
 */
export async function pickSelfExpandingDiscovery(recentOrgans = []) {
  const lastTwoOrgans = new Set(recentOrgans.slice(0, 2));

  // Filter unused static seeds for Track C
  const pillarsWithFresh = DOMAIN_PILLARS
    .map(p => ({ ...p, freshIdeas: p.ideas.filter(idea => !checkTopicCollision({ titleVi: idea }).isDuplicate) }))
    .filter(p => p.freshIdeas.length > 0);

  // Pick a rotated frontier domain avoiding the last 2 published organs
  const rotatedFrontiers = ADJACENT_FRONTIER_DOMAINS.filter(d => !lastTwoOrgans.has(d.organ));
  const frontierPool = rotatedFrontiers.length > 0 ? rotatedFrontiers : ADJACENT_FRONTIER_DOMAINS;
  const chosenFrontier = frontierPool[Math.floor(Math.random() * frontierPool.length)];
  const chosenLens = EDITORIAL_LENSES[Math.floor(Math.random() * EDITORIAL_LENSES.length)];

  const roll = Math.random();
  const hasCuratedSeeds = pillarsWithFresh.length > 0;

  // Track A (~40%, or ~55% when seeds are exhausted): Live PubMed Science Radar
  if (roll < (hasCuratedSeeds ? 0.40 : 0.55)) {
    const paper = await fetchLivePubMedDiscovery(chosenFrontier);
    if (paper) {
      return {
        track: 'PUBMED_RADAR',
        organ: chosenFrontier.organ,
        domain: chosenFrontier.domain,
        paper,
        lens: chosenLens,
        idea: null
      };
    }
    // Graceful fallback to Track B if PubMed unavailable
    return {
      track: 'OPEN_ADJACENT_EXPANSION',
      organ: chosenFrontier.organ,
      domain: chosenFrontier.domain,
      scopeHint: chosenFrontier.scopeHint,
      lens: chosenLens,
      paper: null,
      idea: null
    };
  }

  // Track B (~35%, or ~45% when seeds are exhausted): Open Adjacent-Field Expansion
  if (roll < (hasCuratedSeeds ? 0.75 : 1.0)) {
    return {
      track: 'OPEN_ADJACENT_EXPANSION',
      organ: chosenFrontier.organ,
      domain: chosenFrontier.domain,
      scopeHint: chosenFrontier.scopeHint,
      lens: chosenLens,
      paper: null,
      idea: null
    };
  }

  // Track C (~25% while unused seeds remain): Curated Everyday Seeds
  const rotatedSeeds = pillarsWithFresh.filter(p => !lastTwoOrgans.has(p.organ));
  const seedPool = rotatedSeeds.length > 0 ? rotatedSeeds : pillarsWithFresh;
  const chosenPillar = seedPool[Math.floor(Math.random() * seedPool.length)];
  const randomIdea = chosenPillar.freshIdeas[Math.floor(Math.random() * chosenPillar.freshIdeas.length)];
  return {
    track: 'CURATED_SEED',
    organ: chosenPillar.organ,
    domain: chosenPillar.domain,
    idea: randomIdea,
    lens: chosenLens,
    paper: null
  };
}

export async function generateTopicWithGemini(existingCatalog = [], feedback = null, targetTier = 'Life Dispatch') {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    console.warn('⚠️ [Gemini Generator] Không tìm thấy GEMINI_API_KEY trong env.');
    return null;
  }

  const exclusionSummary = getCompactExclusionSummary();
  const recentCtx = getRecentDispatchContext(8);
  const discovery = await pickSelfExpandingDiscovery(recentCtx.recentOrgans);

  const chosenTitleArchetype = TITLE_ARCHETYPES[Math.floor(Math.random() * TITLE_ARCHETYPES.length)];
  const chosenHookArchetype = HOOK_ARCHETYPES[Math.floor(Math.random() * HOOK_ARCHETYPES.length)];

  console.log(`🧭 [Self-Expanding Engine v5.0] Track=${discovery.track} | Organ=${discovery.organ} | TitleStyle=${chosenTitleArchetype.id} | HookStyle=${chosenHookArchetype.id}`);
  if (discovery.paper) {
    console.log(`🔬 [PubMed Anchor] PMID=${discovery.paper.pmid} (${discovery.paper.year}, ${discovery.paper.journal}): "${discovery.paper.title}"`);
  }

  const systemInstruction = `Bạn là TS. Hoàng Xuân Chiến (Dr. rer. nat. - Đại học Hamburg, CHLB Đức), Giám đốc Học thuật kiêm Tổng biên tập của ấn bản y sinh "Phytocodex" (phytocodex.vercel.app).
Bạn là chuyên gia hàng đầu về Y học Chuyển hóa, Lão hóa & Trường thọ (Metabolic Longevity), Dược động học và Tín hiệu tế bào.

ĐỐI TƯỢNG ĐỘC GIẢ VÀ ĐỊNH HƯỚNG NỘI DUNG:
- ĐỐI TƯỢNG ĐỘC GIẢ: Độc giả phổ thông đại chúng (người đi làm, phụ huynh, người quan tâm sức khỏe gia đình dựa trên khoa học thực chứng).
- VĂN PHONG TS. HOÀNG XUÂN CHIẾN: Tự nhiên, điềm đạm, ấm áp, hóm hỉnh vừa đủ, sắc sảo và tôn trọng trí tuệ người đọc. Dùng ẩn dụ tinh tế để giải thích cơ chế phân tử nhưng KHÔNG sáo rỗng, KHÔNG viết kiểu văn mẫu AI.

MỤC TIÊU TUYỆT ĐỐI:
Tạo ra 1 bài viết chuyên khảo y sinh song ngữ MỚI HOÀN TOÀN, mở rộng kiến thức thực chứng sang các góc nhìn đời sống mới mẻ, TUYỆT ĐỐI KHÔNG TRÙNG LẶP hoặc viết lại bất kỳ chủ đề, hoạt chất hay cơ chế nào đã xuất bản dưới đây!

${exclusionSummary}

QUY TẮC BẮT BUỘC VỀ TỰA ĐỀ & MỞ BÀI (CHỐNG RẬP KHUÔN AI):
1. TIÊU ĐỀ TỰ NHIÊN (titleVi, titleEn):
   - TUYỆT ĐỐI KHÔNG dùng "Vì sao..." hay "Tại sao..." (kể cả ở đầu câu hay ngay sau dấu hai chấm), và KHÔNG dùng "Why..." ở đầu/sau dấu hai chấm bản tiếng Anh.
   - Hạn chế tối đa các cụm sáo rỗng như "Giải mã bí mật...", "Sự thật bất ngờ...", "Phép màu...".
   - Viết câu trần thuật hoặc cấu trúc tự nhiên theo Sentence case tiếng Việt.
   - BẮT BUỘC áp dụng phong cách đặt tựa đề kỳ này: [${chosenTitleArchetype.name}] -> ${chosenTitleArchetype.instruction}
2. MỞ BÀI THU HÚT & ĐA DẠNG (leadVi, leadEn):
   - BẮT BUỘC áp dụng kiểu mở bài kỳ này: [${chosenHookArchetype.name}] -> ${chosenHookArchetype.instruction}
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
6. Sơ đồ Flowchart (flowchartVi, flowchartEn): Chuỗi phản ứng phân tử bắt buộc dùng mũi tên "──►" và ngoặc vuông.
7. Phần nội dung (sectionsVi, sectionsEn): ĐỦ 3 phần chi tiết (Heading + Body), đoạn văn thoáng 2-4 câu/đoạn:
   - Phần 1: Cơ chế sinh học đằng sau thói quen / vi chất (giải nghĩa mộc mạc từng thuật ngữ). Tối thiểu 250 từ.
   - Phần 2: Đối chiếu bằng chứng khoa học & BẮT BUỘC có 1 BẢNG SO SÁNH MARKDOWN (ít nhất 3 dòng dữ liệu cụ thể, có số liệu/ngưỡng rõ ràng). Tối thiểu 250 từ kèm bảng.
   - Phần 3: BẮT BUỘC là phần "Ứng dụng thực tế & Khuyến nghị an toàn" (Heading chứa từ khóa như "Ứng dụng thực tế", "Chiến lược đời sống", "Khuyến nghị an toàn"). Hướng dẫn cụ thể liều lượng, thời điểm, cách chế biến. Tối thiểu 250 từ.
8. Tổng độ dài văn bản tiếng Việt đạt 850 - 1.250 từ, tiếng Anh đạt 750 - 1.100 từ.
9. TÀI LIỆU THAM KHẢO CÓ THẬT (ZERO HALLUCINATION):
   - Chỉ dẫn bài báo gốc thực sự tồn tại trên PubMed/CrossRef. Nếu đề bài có sẵn bài báo gốc từ PubMed Radar, BẮT BUỘC đưa chính xác bài báo đó làm tài liệu tham khảo số 1 (giữ nguyên title, pmid, doi, journal, year).
10. BỘ TÓM TẮT & HƯỚNG DẪN THỰC HÀNH V2: Điền đầy đủ briefVi, briefEn và practicalVi, practicalEn.
11. TAGS THEO MỤC SỨC KHỎE: tagsVi và tagsEn chứa từ khóa gần gũi (như giac-ngu, duong-huyet, tim-mach, ruot, nang-luong, lao-hoa, noi-tiet, khop, gan, mat-da, ung-thu, mien-dich).
12. TỪ KHÓA TÌM ẢNH (imageSearchQueries): Mảng 4 cụm từ khóa tiếng Anh ngắn (2-4 từ) mô tả CHÍNH XÁC thực phẩm, dược liệu, nguyên liệu nấu ăn hoặc khung cảnh đời thường của bài viết (TUYỆT ĐỐI KHÔNG dùng cụm chung chung như "fitness exercise", "healthy nutrition", "cancer laboratory").`;

  let topicDirective = '';
  if (discovery.track === 'PUBMED_RADAR' && discovery.paper) {
    topicDirective = `- NGUỒN KHÁM PHÁ TRỰC TIẾP TỪ PUBMED (Nghiên cứu mới công bố):
  * Tiêu đề nghiên cứu gốc: "${discovery.paper.title}"
  * Tạp chí: ${discovery.paper.journal} (${discovery.paper.year}) | PMID: ${discovery.paper.pmid}${discovery.paper.doi ? ` | DOI: ${discovery.paper.doi}` : ''}
- Lĩnh vực mở rộng: ${discovery.domain} | Nhóm cơ quan: "${discovery.organ}"
- Lăng kính biên tập: ${discovery.lens}
- NHIỆM VỤ: Chuyển hóa phát hiện khoa học có thật từ nghiên cứu trên thành một bài báo đời sống hấp dẫn, dễ áp dụng (hoặc chuyên sâu nếu tier là Clinical Deep-Dive), đặt tựa đề thật tự nhiên theo phong cách [${chosenTitleArchetype.name}] và dùng chính nghiên cứu trên làm tài liệu tham khảo #1.`;
  } else if (discovery.track === 'OPEN_ADJACENT_EXPANSION') {
    topicDirective = `- CHẾ ĐỘ TỰ MỞ RỘNG LĨNH VỰC LIÊN QUAN (Open Adjacent-Field Expansion — KHÔNG bị bó hẹp vào danh sách có sẵn):
  * Lĩnh vực mở rộng: ${discovery.domain}
  * Gợi mở hướng khám phá: ${discovery.scopeHint}
  * Lăng kính đời sống kỳ này: ${discovery.lens}
  * Phân loại cơ quan: "${discovery.organ}"
- NHIỆM VỤ: Tự do đề xuất 1 chủ đề y sinh/dinh dưỡng/lối sống CỤ THỂ, MỚI LẠ, có bằng chứng nghiên cứu rõ ràng nằm trong giao điểm giữa lĩnh vực và lăng kính trên, HOÀN TOÀN KHÔNG TRÙNG với bất kỳ bài nào trong danh mục loại trừ.`;
  } else {
    topicDirective = `- Lĩnh vực: ${discovery.domain}
- Phân loại cơ quan: "${discovery.organ}"
- Gợi ý chủ đề gốc (hãy viết lại tựa đề thật tự nhiên theo đúng phong cách [${chosenTitleArchetype.name}], KHÔNG copy nguyên văn): "${discovery.idea}"`;
  }

  const isLifeDispatch = targetTier === 'Life Dispatch';
  const basePrompt = isLifeDispatch
    ? `Hãy viết một bài báo khoa học đời sống thường thức gần gũi, chuẩn xác (Tier: "Life Dispatch") song ngữ (Tiếng Việt & Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

ĐỊNH HƯỚNG CHỦ ĐỀ KỲ NÀY (BẮT BUỘC MỚI 100%, KHÔNG TRÙNG KHO CŨ):
${topicDirective}

YÊU CẦU BIÊN TẬP BẮT BUỘC:
- Tựa đề theo phong cách: [${chosenTitleArchetype.name}] — KHÔNG dùng "Vì sao/Tại sao" hay "Why".
- Mở bài theo phong cách: [${chosenHookArchetype.name}] — tự nhiên, cuốn hút, KHÔNG dùng câu sáo rỗng AI hay bịa nhân vật "Chị Lan/Anh Minh".
- Slug tiếng Việt kết thúc bằng "-vi", slug tiếng Anh kết thúc bằng "-en".`
    : `Hãy viết một bài phân tích chuyên khảo y sinh chuyên sâu (Tier: "Clinical Deep-Dive") song ngữ (Tiếng Việt & Tiếng Anh) cho ấn bản Phytocodex của TS. Hoàng Xuân Chiến.

ĐỊNH HƯỚNG CHỦ ĐỀ KỲ NÀY (BẮT BUỘC MỚI 100%, KHÔNG TRÙNG KHO CŨ):
${topicDirective}

YÊU CẦU BIÊN TẬP BẮT BUỘC:
- Đi sâu cơ chế phân tử, thụ thể, enzym, dược động học kèm bảng so sánh định lượng cụ thể.
- Tựa đề theo phong cách: [${chosenTitleArchetype.name}] — tự nhiên, chuẩn khoa học, KHÔNG dùng "Vì sao/Tại sao" hay "Why".
- Mở bài theo phong cách: [${chosenHookArchetype.name}] — ấn tượng, trực diện, không mở đầu rập khuôn.
- Slug tiếng Việt kết thúc bằng "-vi", slug tiếng Anh kết thúc bằng "-en".`;

  const buildSchemaAndFeedback = (activeFeedback) => `
TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON VỚI CẤU TRÚC SAU (KHÔNG kèm markdown fence thừa):
{
  "topicId": "slug-id-ngan-gon",
  "slugVi": "slug-tieng-viet-co-hau-to-vi",
  "slugEn": "slug-tieng-anh-co-hau-to-en",
  "titleVi": "Tiêu đề tiếng Việt tự nhiên, KHÔNG dùng Vì sao/Tại sao",
  "titleEn": "Natural English editorial headline, NOT using Why",
  "excerptVi": "Tóm tắt tiếng Việt 90-130 từ",
  "excerptEn": "English excerpt 80-120 words",
  "organ": "${discovery.organ}",
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
      "label": "${discovery.paper ? discovery.paper.title.replace(/"/g, '\\"') : 'Exact authentic paper title in English as published in journal'}",
      "pmid": "${discovery.paper ? discovery.paper.pmid : ''}",
      "doi": "${discovery.paper ? discovery.paper.doi : ''}",
      "design": "RCT / Meta-analysis / Systematic Review",
      "journal": "${discovery.paper ? discovery.paper.journal.replace(/"/g, '\\"') : 'Journal Name'}",
      "year": ${discovery.paper ? discovery.paper.year : 2024},
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
            temperature: 0.78
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
        const collision = checkTopicCollision(parsed);
        if (collision.isDuplicate) {
          console.warn(`🛑 [Topic Dedup Guard BỊ CHẶN] ${collision.reason}`);
          currentFeedback = `Đề tài "${parsed.titleVi}" bị từ chối do trùng lặp: ${collision.reason}. BẮT BUỘC chọn một đề tài KHÁC HẲN chưa từng có trong kho!`;
          continue;
        }

        if (/(?:^|[:\-]\s*)(?:vì sao|tại sao)\b/i.test((parsed.titleVi || '').trim()) || /(?:^|[:\-]\s*)why\b/i.test((parsed.titleEn || '').trim())) {
          console.warn(`🛑 [Title Style Guard] Tiêu đề dùng khuôn mẫu Vì sao/Why ("${parsed.titleVi}") -> yêu cầu model tiếp theo viết tự nhiên hơn.`);
          currentFeedback = `Tiêu đề "${parsed.titleVi}" dùng khuôn mẫu "Vì sao/Tại sao/Why". BẮT BUỘC đặt lại tiêu đề tự nhiên theo phong cách [${chosenTitleArchetype.name}], KHÔNG dùng "Vì sao/Tại sao/Why" ở đầu câu hay sau dấu hai chấm.`;
          continue;
        }

        console.log(`🎯 [Gemini Generator] AI đã sinh thành công bài mới (${discovery.track}): "${parsed.titleVi}"`);
        return parsed;
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Generator] Lỗi khi gọi ${model}: ${err.message}`);
    }
  }

  return null;
}
