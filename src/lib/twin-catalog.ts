/**
 * Precompiled Bilingual Twin Catalog for Phytocodex
 * Maps each article slug to its exact bilingual counterpart.
 */

export interface TwinInfo {
  slug: string;
  lang: "vi" | "en";
  title: string;
}

export const TWIN_CATALOG: Record<string, TwinInfo> = {
  "alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi": {
    "slug": "alpha-ketoglutarate-epigenetic-clock-reversal-en",
    "lang": "en",
    "title": "The Alpha-Ketoglutarate Paradox: Bridging Mitochondrial Metabolism and Epigenetic Clock Reversal"
  },
  "alpha-ketoglutarate-epigenetic-clock-reversal-en": {
    "slug": "alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi",
    "lang": "vi",
    "title": "Nghịch lý Alpha-Ketoglutarate: Cầu nối chuyển hóa tái thiết lập đồng hồ biểu sinh và đảo ngược tuổi già sinh học"
  },
  "ampk-nrf2-mtor-map": {
    "slug": "ampk-nrf2-mtor-map-en",
    "lang": "en",
    "title": "Mapping the 4 Cellular Longevity Master Nodes: AMPK, Nrf2, mTOR & NF-κB via Molecular Pharmacology"
  },
  "ampk-nrf2-mtor-map-en": {
    "slug": "ampk-nrf2-mtor-map",
    "lang": "vi",
    "title": "Bản đồ 4 Nút Tín hiệu Trẻ hóa Tế bào: AMPK, Nrf2, mTOR & NF-κB dưới góc nhìn Dược lý học Phân tử"
  },
  "an-rau-truoc-com-kiem-soat-duong-huyet-vi": {
    "slug": "eating-vegetables-before-carbs-flattens-glucose-spikes-en",
    "lang": "en",
    "title": "Eating Vegetables Before Carbs Flattens Glucose Spikes: The Dietary Fiber Matrix"
  },
  "eating-vegetables-before-carbs-flattens-glucose-spikes-en": {
    "slug": "an-rau-truoc-com-kiem-soat-duong-huyet-vi",
    "lang": "vi",
    "title": "Ăn rau trước cơm giúp kiểm soát đường huyết: Bí mật chiếc lưới lọc chất xơ"
  },
  "an-uong-qua-nong-tren-65-do-ung-thu-thuc-quan-vi": {
    "slug": "scalding-hot-beverages-esophageal-cancer-risk-en",
    "lang": "en",
    "title": "Scalding Beverages Above 65°C: Thermal Mucosal Micro-Trauma, Esophageal Cancer Risk, and the 5-Minute Cooling Rule"
  },
  "scalding-hot-beverages-esophageal-cancer-risk-en": {
    "slug": "an-uong-qua-nong-tren-65-do-ung-thu-thuc-quan-vi",
    "lang": "vi",
    "title": "Ăn canh sôi, uống trà nóng trên 65°C: Cơ chế tổn thương nhiệt vi mô dẫn đến ung thư thực quản và quy tắc 5 phút"
  },
  "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc": {
    "slug": "morning-sunlight-circadian-clock-metabolism",
    "lang": "en",
    "title": "Morning Sunlight and Circadian Entrainment: ipRGC Signaling, Cortisol Peaks, and Metabolic Tone"
  },
  "morning-sunlight-circadian-clock-metabolism": {
    "slug": "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc",
    "lang": "vi",
    "title": "Ánh nắng ban mai: Khởi động đồng hồ sinh học và kiểm soát mỡ cơ thể"
  },
  "astaxanthin-giai-toa-moi-mat-man-hinh-tre-hoa-da-vi": {
    "slug": "astaxanthin-screen-eye-fatigue-skin-longevity-en",
    "lang": "en",
    "title": "Astaxanthin: The Red Pigment Rescuing Screen Eye Fatigue and Rejuvenating Skin at the Cellular Level"
  },
  "astaxanthin-screen-eye-fatigue-skin-longevity-en": {
    "slug": "astaxanthin-giai-toa-moi-mat-man-hinh-tre-hoa-da-vi",
    "lang": "vi",
    "title": "Astaxanthin: Sắc tố đỏ giải cứu đôi mắt mỏi do màn hình và trẻ hóa làn da từ cấp tế bào"
  },
  "axit-hyaluronic-duong-uong-dem-khop-goi-vi": {
    "slug": "oral-hyaluronic-acid-knee-joint-matrix-en",
    "lang": "en",
    "title": "Oral Hyaluronic Acid: Unraveling Matrix Hydration and Stair Navigation in Aging Knees"
  },
  "oral-hyaluronic-acid-knee-joint-matrix-en": {
    "slug": "axit-hyaluronic-duong-uong-dem-khop-goi-vi",
    "lang": "vi",
    "title": "Axit Hyaluronic đường uống: Giải mã cơ chế ngậm nước đệm khớp và phục hồi khả năng leo cầu thang"
  },
  "bi-mat-khoai-lang-luoc-de-lanh-ve-dang-va-giam-duong-huyet-vi": {
    "slug": "the-secret-of-cooled-boiled-sweet-potatoes-for-blood-sugar-en",
    "lang": "en",
    "title": "The secret of cooled boiled sweet potatoes: Blood sugar magic from a humble root"
  },
  "the-secret-of-cooled-boiled-sweet-potatoes-for-blood-sugar-en": {
    "slug": "bi-mat-khoai-lang-luoc-de-lanh-ve-dang-va-giam-duong-huyet-vi",
    "lang": "vi",
    "title": "Bí mật khoai lang luộc để lạnh: Phép màu hạ đường huyết từ củ khoai quen thuộc"
  },
  "butyrate-scfa-epigenetics-histone-gut-barrier": {
    "slug": "butyrate-scfa-epigenetics-histone-gut-barrier-en",
    "lang": "en",
    "title": "Short-Chain Fatty Acid Butyrate: Epigenetic Master Key of Gut Barrier Integrity and Histone Deacetylase Inhibition"
  },
  "butyrate-scfa-epigenetics-histone-gut-barrier-en": {
    "slug": "butyrate-scfa-epigenetics-histone-gut-barrier",
    "lang": "vi",
    "title": "Axit béo chuỗi ngắn Butyrate và bức tường thành niêm mạc ruột: Chiếc chìa khóa biểu sinh hàn gắn rò rỉ và điều hòa miễn dịch"
  },
  "ca-chua-nau-chin-lycopene-dau-o-liu-phong-ngua-ung-thu-vi": {
    "slug": "cooked-tomatoes-olive-oil-lycopene-cancer-prevention-en",
    "lang": "en",
    "title": "Cooked Tomatoes, Olive Oil, and Lycopene: Why Heat and Lipids Unlock Potent Cellular Protection"
  },
  "cooked-tomatoes-olive-oil-lycopene-cancer-prevention-en": {
    "slug": "ca-chua-nau-chin-lycopene-dau-o-liu-phong-ngua-ung-thu-vi",
    "lang": "vi",
    "title": "Cà chua nấu chín, dầu ô liu và Lycopene: Vì sao nhiệt độ và chất béo mở khóa hoạt chất dập tắt gốc tự do bảo vệ tế bào?"
  },
  "ca-phe-sau-2-gio-chieu-va-phan-tu-adenosine-vi-sao-chung-ta-van-ngu-duoc-nhung-n-vi": {
    "slug": "afternoon-coffee-and-adenosine-why-you-sleep-without-deep-repair-vi-en",
    "lang": "en",
    "title": "Afternoon coffee and adenosine molecules: Why you still doze off but your brain misses deep repair sleep"
  },
  "afternoon-coffee-and-adenosine-why-you-sleep-without-deep-repair-vi-en": {
    "slug": "ca-phe-sau-2-gio-chieu-va-phan-tu-adenosine-vi-sao-chung-ta-van-ngu-duoc-nhung-n-vi",
    "lang": "vi",
    "title": "Cà phê sau 2 giờ chiều và phân tử adenosine: Vì sao bạn vẫn chợp mắt được nhưng não bộ không thể bước vào pha ngủ sâu?"
  },
  "can-bang-ph-da-va-he-vi-sinh-vi": {
    "slug": "skin-ph-balance-microbiome-en",
    "lang": "en",
    "title": "5.5 is the golden pH: The natural acidic threshold keeping your skin armor unbroken"
  },
  "skin-ph-balance-microbiome-en": {
    "slug": "can-bang-ph-da-va-he-vi-sinh-vi",
    "lang": "vi",
    "title": "5.5 là độ pH chuẩn: Mức độ axit tự nhiên giữ cho lớp áo giáp da không bị thủng lỗ chỗ"
  },
  "can-bang-ty-le-kem-dong-vi": {
    "slug": "zinc-copper-balance-en",
    "lang": "en",
    "title": "The 15:1 Ratio Rule: Protecting copper stores while supplementing zinc"
  },
  "zinc-copper-balance-en": {
    "slug": "can-bang-ty-le-kem-dong-vi",
    "lang": "vi",
    "title": "Quy tắc tỷ lệ 15:1: Điểm mấu chốt để bổ sung kẽm không gây kiệt quệ đồng"
  },
  "cancer-seed-and-soil-metabolism": {
    "slug": "cancer-seed-and-soil-metabolism-en",
    "lang": "en",
    "title": "The Cancer Code Part 2: Seed & Soil: Why the Tissue Microenvironment Dictates Tumor Fate"
  },
  "cancer-seed-and-soil-metabolism-en": {
    "slug": "cancer-seed-and-soil-metabolism",
    "lang": "vi",
    "title": "Mật mã Ung thư Phần 2: Hạt giống & Thổ nhưỡng: Vì sao Vi môi trường mô quyết định số phận Khối u?"
  },
  "canh-bao-suy-giam-xuong-gan-tien-man-kinh-vi": {
    "slug": "mind-body-exercise-perimenopause-bone-tendon-en",
    "lang": "en",
    "title": "Subtle joint crepitation when stepping down stairs signals accelerating bone and tendon cellular aging during perimenopause"
  },
  "mind-body-exercise-perimenopause-bone-tendon-en": {
    "slug": "canh-bao-suy-giam-xuong-gan-tien-man-kinh-vi",
    "lang": "vi",
    "title": "Cảm giác lục khục khớp gối khi bước xuống bậc cầu thang cảnh báo đợt suy giảm mật độ xương và gân quanh tuổi tiền mãn kinh"
  },
  "ceramide-thuc-vat-tu-cam-gao-tai-lap-hang-rao-da-vi": {
    "slug": "oral-rice-phytoceramides-skin-barrier-tewl-en",
    "lang": "en",
    "title": "Oral rice phytoceramides and the art of restoring the moisture brick-and-mortar barrier in dry sensitive skin"
  },
  "oral-rice-phytoceramides-skin-barrier-tewl-en": {
    "slug": "ceramide-thuc-vat-tu-cam-gao-tai-lap-hang-rao-da-vi",
    "lang": "vi",
    "title": "Ceramide thực vật từ cám gạo và nghệ thuật vá lớp vữa khóa nước cho làn da khô nhạy cảm"
  },
  "chat-xo-hoa-tan-yen-mach-va-axit-butyrate-phong-ngua-ung-thu-dai-trang-vi": {
    "slug": "soluble-fiber-oats-butyrate-colorectal-cancer-prevention-en",
    "lang": "en",
    "title": "Soluble fiber in oats and butyrate acid: The invisible shield protecting colonic mucosa"
  },
  "soluble-fiber-oats-butyrate-colorectal-cancer-prevention-en": {
    "slug": "chat-xo-hoa-tan-yen-mach-va-axit-butyrate-phong-ngua-ung-thu-dai-trang-vi",
    "lang": "vi",
    "title": "Chất xơ hòa tan trong yến mạch và axit butyrate: Chiếc khiên vô hình bảo vệ niêm mạc đại tràng"
  },
  "chat-xo-pectin-tu-tao-tam-ao-giap-gel-bao-ve-niem-mac-ruot-vi": {
    "slug": "apple-pectin-and-gut-barrier-protection-en",
    "lang": "en",
    "title": "An Apple a Day: How Pectin Forms a Bio-Gel Shield to Protect the Gut Barrier and Nourish Akkermansia"
  },
  "apple-pectin-and-gut-barrier-protection-en": {
    "slug": "chat-xo-pectin-tu-tao-tam-ao-giap-gel-bao-ve-niem-mac-ruot-vi",
    "lang": "vi",
    "title": "Ăn một quả táo mỗi ngày: Cơ chế pectin tạo màng gel sinh học bảo vệ niêm mạc ruột và nuôi dưỡng Akkermansia"
  },
  "chiet-xuat-ke-sua-silymarin-bao-ve-mang-te-bao-gan-vi": {
    "slug": "milk-thistle-silymarin-liver-cell-membrane-protection-en",
    "lang": "en",
    "title": "Milk Thistle Extract (Silymarin): The Biological Shield Protecting Liver Cell Membranes from Alcohol and Painkillers"
  },
  "milk-thistle-silymarin-liver-cell-membrane-protection-en": {
    "slug": "chiet-xuat-ke-sua-silymarin-bao-ve-mang-te-bao-gan-vi",
    "lang": "vi",
    "title": "Chiết xuất Kế sữa (Silymarin): Bức tường sinh học bảo vệ màng tế bào gan trước rượu bia và thuốc giảm đau"
  },
  "cholesterol-myth-vascular-inflammation": {
    "slug": "cholesterol-myth-vascular-inflammation-en",
    "lang": "en",
    "title": "The Cardiovascular Code Part 1: The Cholesterol Myth: Why Lipids Never Clog Arteries Without Inflammation"
  },
  "cholesterol-myth-vascular-inflammation-en": {
    "slug": "cholesterol-myth-vascular-inflammation",
    "lang": "vi",
    "title": "Mật mã Tim mạch Phần 1: Huyền thoại Cholesterol: Vì sao Mỡ máu không làm nghẽn mạch nếu thiếu Viêm?"
  },
  "chuyen-hoa-mo-nau-ucp1-ro-ri-proton": {
    "slug": "brown-fat-ucp1-mitochondrial-proton-leak",
    "lang": "en",
    "title": "The Mitochondrial Proton Leak Paradox: Activating UCP1 in Brown Adipose Tissue to Rewire Metabolism and Extend Longevity"
  },
  "brown-fat-ucp1-mitochondrial-proton-leak": {
    "slug": "chuyen-hoa-mo-nau-ucp1-ro-ri-proton",
    "lang": "vi",
    "title": "Nghịch lý rò rỉ proton ty thể: Kích hoạt UCP1 ở mỡ nâu để tái cấu trúc chuyển hóa và kéo dài tuổi thọ"
  },
  "co-che-tiet-doc-to-loai-iii-cua-yersinia-pestis-vi-chi-huy-pha-vo-hang-rao-mien-dich-vi": {
    "slug": "type-iii-secretion-system-of-yersinia-pestis-disrupting-immune-defenses-en",
    "lang": "en",
    "title": "The type III secretion system of Yersinia pestis: Hijacking macrophage signaling for immune evasion"
  },
  "type-iii-secretion-system-of-yersinia-pestis-disrupting-immune-defenses-en": {
    "slug": "co-che-tiet-doc-to-loai-iii-cua-yersinia-pestis-vi-chi-huy-pha-vo-hang-rao-mien-dich-vi",
    "lang": "vi",
    "title": "Cơ chế tiết độc tố loại III của Yersinia pestis: Khi vi khuẩn biến hệ miễn dịch thành bãi rác vô hiệu"
  },
  "collagen-peptide-thuy-phan-su-that-sinh-hoc-vi-mo-vi": {
    "slug": "hydrolyzed-collagen-peptides-molecular-reality-en",
    "lang": "en",
    "title": "Hydrolyzed collagen peptides: The molecular truth of intestinal absorption and dermal fibroblast stimulation or mere ordinary amino acids?"
  },
  "hydrolyzed-collagen-peptides-molecular-reality-en": {
    "slug": "collagen-peptide-thuy-phan-su-that-sinh-hoc-vi-mo-vi",
    "lang": "vi",
    "title": "Collagen peptide thủy phân: Sự thật về việc hấp thu qua ruột và kích thích nguyên bào sợi dưới da hay chỉ là acid amin thông thường?"
  },
  "con-duong-kynurenine-viem-nao-vi": {
    "slug": "kynurenine-pathway-neuroinflammation-en",
    "lang": "en",
    "title": "The Kynurenine Paradox: When Tryptophan Metabolism Becomes a Neuroinflammatory Driver"
  },
  "kynurenine-pathway-neuroinflammation-en": {
    "slug": "con-duong-kynurenine-viem-nao-vi",
    "lang": "vi",
    "title": "Nghịch lý Kynurenine: Khi chuyển hóa Tryptophan trở thành 'kẻ thù' gây viêm não bộ"
  },
  "con-khat-ngam-tuoi-trung-nien-lam-giam-toc-do-loc-cau-than-vi": {
    "slug": "subclinical-dehydration-diminishes-glomerular-filtration-en",
    "lang": "en",
    "title": "Subclinical Dehydration Diminishes Glomerular Filtration and Accelerates Early Brain Volume Loss"
  },
  "subclinical-dehydration-diminishes-glomerular-filtration-en": {
    "slug": "con-khat-ngam-tuoi-trung-nien-lam-giam-toc-do-loc-cau-than-vi",
    "lang": "vi",
    "title": "Cơn khát ngầm tuổi trung niên làm suy giảm tốc độ lọc cầu thận và đẩy nhanh đợt teo não sớm"
  },
  "con-lac-tien-dinh-va-co-may-geroscience-vi": {
    "slug": "vestibular-pendulum-and-geroscience-framework-en",
    "lang": "en",
    "title": "The Vestibular Pendulum and the Geroscience Framework for Sensory Longevity"
  },
  "vestibular-pendulum-and-geroscience-framework-en": {
    "slug": "con-lac-tien-dinh-va-co-may-geroscience-vi",
    "lang": "vi",
    "title": "Con lắc tiền đình và cỗ máy geroscience: Trạm kiểm soát thăng bằng và đà suy giảm giác quan"
  },
  "creatine-tai-tao-nang-luong-nao-bo-vi": {
    "slug": "creatine-brain-energy-regeneration-en",
    "lang": "en",
    "title": "Creatine Is Not Just for Muscles: The Brain Power Bank That Defeats Afternoon Brain Fog"
  },
  "creatine-brain-energy-regeneration-en": {
    "slug": "creatine-tai-tao-nang-luong-nao-bo-vi",
    "lang": "vi",
    "title": "Creatine không chỉ dành cho cơ bắp: Trạm sạc năng lượng não bộ giúp vượt qua cơn sập nguồn chiều"
  },
  "cu-h5n1-va-o-khoa-acid-sialic-vi-sao-virus-kho-lay-nhung-gay-viem-phoi-nang-vi": {
    "slug": "h5n1-avian-flu-and-the-sialic-acid-lock-why-transmission-is-rare-yet-fatal-en",
    "lang": "en",
    "title": "H5N1 Avian Flu and the Sialic Acid Lock: Why Transmission Between Humans Is Rare Yet Alveolar Damage Is Severe"
  },
  "h5n1-avian-flu-and-the-sialic-acid-lock-why-transmission-is-rare-yet-fatal-en": {
    "slug": "cu-h5n1-va-o-khoa-acid-sialic-vi-sao-virus-kho-lay-nhung-gay-viem-phoi-nang-vi",
    "lang": "vi",
    "title": "Cúm H5N1 và ổ khóa acid sialic: Vì sao virus khó lây từ người sang người nhưng lại tàn phá phổi nặng nề"
  },
  "curcumin-piperine-sinh-kha-dung": {
    "slug": "curcumin-piperine-bioavailability",
    "lang": "en",
    "title": "Why Black Pepper Increases Curcumin Bioavailability 20-Fold: Deciphering the Hepatic Metabolic Brake"
  },
  "curcumin-piperine-bioavailability": {
    "slug": "curcumin-piperine-sinh-kha-dung",
    "lang": "vi",
    "title": "Vì sao hạt tiêu đen giúp tinh chất nghệ tăng hấp thu gấp 20 lần? Giải mã 'chiếc phanh sinh học' của lá gan"
  },
  "dau-hat-bi-do-va-rung-toc-noi-tiet-vi": {
    "slug": "pumpkin-seed-oil-and-hormonal-hair-loss-en",
    "lang": "en",
    "title": "Pumpkin Seed Oil and Hormonal Hair Loss: Decrypting How Phytosterols Protect Scalp Hair Follicles"
  },
  "pumpkin-seed-oil-and-hormonal-hair-loss-en": {
    "slug": "dau-hat-bi-do-va-rung-toc-noi-tiet-vi",
    "lang": "vi",
    "title": "Dầu hạt bí đỏ và hiện tượng rụng tóc nội tiết: Giải mã cơ chế bảo vệ nang tóc từ vi chất Phytosterol"
  },
  "dau-moi-co-vai-gay-ngoi-may-tinh-giai-phap-2-phut-vi": {
    "slug": "desk-worker-trapezius-ischemia-2-minute-solution-en",
    "lang": "en",
    "title": "Understanding Desk Worker Neck and Shoulder Pain: From Trapezius Ischemia to the 2-Minute Micro-Break Solution"
  },
  "desk-worker-trapezius-ischemia-2-minute-solution-en": {
    "slug": "dau-moi-co-vai-gay-ngoi-may-tinh-giai-phap-2-phut-vi",
    "lang": "vi",
    "title": "Giải mã cơn đau mỏi cổ vai gáy ở dân văn phòng: Từ cơ chế thiếu máu cục bộ cơ thang đến bài tập 2 phút"
  },
  "dau-nanh-nguyen-ban-va-isoflavone-genistein-giai-ma-noi-so-vo-can-cu-vi": {
    "slug": "whole-soy-and-genistein-debunking-the-unfounded-fear-en",
    "lang": "en",
    "title": "Whole Soy and Genistein: Debunking Unfounded Fears and Metabolic Insights"
  },
  "whole-soy-and-genistein-debunking-the-unfounded-fear-en": {
    "slug": "dau-nanh-nguyen-ban-va-isoflavone-genistein-giai-ma-noi-so-vo-can-cu-vi",
    "lang": "vi",
    "title": "Đậu nành nguyên bản và Genistein: Giải mã nỗi sợ vô căn cứ và góc nhìn y học chuyển hóa"
  },
  "dem-che-do-night-shift-va-kinh-loc-anh-sang-xanh-melatonin-vi": {
    "slug": "night-shift-mode-blue-blocking-glasses-melatonin-en",
    "lang": "en",
    "title": "Night Shift Mode and Blue-Blocking Glasses: Why Changing Screen Color Alone Cannot Save Your Nighttime Melatonin"
  },
  "night-shift-mode-blue-blocking-glasses-melatonin-en": {
    "slug": "dem-che-do-night-shift-va-kinh-loc-anh-sang-xanh-melatonin-vi",
    "lang": "vi",
    "title": "Chế độ Night Shift và kính lọc ánh sáng xanh: Vì sao đổi màu màn hình vẫn chưa đủ để cứu vãn giấc ngủ?"
  },
  "di-bo-sau-an-giam-duong-huyet-vi": {
    "slug": "post-meal-walking-glycemic-control-en",
    "lang": "en",
    "title": "A ten-minute walk after meals: When skeletal muscles act as a natural glucose sponge"
  },
  "post-meal-walking-glycemic-control-en": {
    "slug": "di-bo-sau-an-giam-duong-huyet-vi",
    "lang": "vi",
    "title": "Đi bộ mười phút sau bữa ăn: Khi cơ bắp trở thành miếng bọt biển hút đường tự nhiên"
  },
  "dinh-duong-chuan-y-khoa-cho-benh-nhan-ung-thu-va-cach-bao-ton-khoi-co-nac-vi": {
    "slug": "medical-nutrition-therapy-for-cancer-patients-and-muscle-preservation-en",
    "lang": "en",
    "title": "Medical nutrition therapy for cancer patients: Debunking tumor-starvation myths and preserving lean muscle mass"
  },
  "medical-nutrition-therapy-for-cancer-patients-and-muscle-preservation-en": {
    "slug": "dinh-duong-chuan-y-khoa-cho-benh-nhan-ung-thu-va-cach-bao-ton-khoi-co-nac-vi",
    "lang": "vi",
    "title": "Dinh dưỡng chuẩn y khoa cho bệnh nhân ung thư: Đập tan hiểu lầm kiêng thịt bỏ đói khối u và cách bảo tồn khối cơ nạc"
  },
  "do-nuong-chay-canh-la-chan-phong-ung-thu-tu-rau-song-vi": {
    "slug": "charcoal-grilled-meat-carcinogens-herbs-garlic-shield-en",
    "lang": "en",
    "title": "Charcoal Grilled Meat Carcinogens and the Molecular Shield: How Fresh Herbs and Raw Garlic Neutralize HCAs and PAHs"
  },
  "charcoal-grilled-meat-carcinogens-herbs-garlic-shield-en": {
    "slug": "do-nuong-chay-canh-la-chan-phong-ung-thu-tu-rau-song-vi",
    "lang": "vi",
    "title": "Đồ nướng cháy cạnh và nguy cơ ung thư: Giải mã lá chắn giải độc phân tử từ đĩa rau sống và tép tỏi sống Việt Nam"
  },
  "do-nuong-chay-xem-phan-ung-glycation-ages-lao-hoa-da-va-mach-mau-vi": {
    "slug": "charred-food-glycation-ages-skin-wrinkles-arterial-stiffness-en",
    "lang": "en",
    "title": "Charred food and advanced glycation end-products: How sugar cross-linking stiffens arteries and accelerates wrinkles"
  },
  "charred-food-glycation-ages-skin-wrinkles-arterial-stiffness-en": {
    "slug": "do-nuong-chay-xem-phan-ung-glycation-ages-lao-hoa-da-va-mach-mau-vi",
    "lang": "vi",
    "title": "Đồ nướng cháy xém và phản ứng đường hóa: Khi phân tử đường làm giòn mạch máu và tăng nếp nhăn"
  },
  "duong-va-nep-nhan-da-hien-tuong-dut-gay-soi-collagen-vi": {
    "slug": "sugar-and-skin-wrinkles-molecular-collagen-crosslinking-en",
    "lang": "en",
    "title": "Sugar and skin wrinkles: How sweet molecules permanently damage your skin spring system"
  },
  "sugar-and-skin-wrinkles-molecular-collagen-crosslinking-en": {
    "slug": "duong-va-nep-nhan-da-hien-tuong-dut-gay-soi-collagen-vi",
    "lang": "vi",
    "title": "Đường và nếp nhăn da: Khi các phân tử đường vô tình bẻ gãy hệ thống lò xo collagen trong cơ thể"
  },
  "ergothioneine-chia-khoa-ty-the-vi": {
    "slug": "ergothioneine-mitochondrial-key-en",
    "lang": "en",
    "title": "5 milligrams of Ergothioneine daily: The dosage to shield mitochondria from premature aging"
  },
  "ergothioneine-mitochondrial-key-en": {
    "slug": "ergothioneine-chia-khoa-ty-the-vi",
    "lang": "vi",
    "title": "5 miligam Ergothioneine mỗi ngày: Liều lượng bảo vệ ty thể khỏi sự lão hóa sớm"
  },
  "ferroptosis-sat-te-bao-nao-vi": {
    "slug": "ferroptosis-brain-cell-death-en",
    "lang": "en",
    "title": "Ferroptosis: The Silent Assassin in Neurodegeneration and Cellular Defense Mechanisms"
  },
  "ferroptosis-brain-cell-death-en": {
    "slug": "ferroptosis-sat-te-bao-nao-vi",
    "lang": "vi",
    "title": "Ferroptosis: Kẻ sát nhân thầm lặng trong thoái hóa thần kinh và cơ chế tự bảo vệ của tế bào"
  },
  "forecasting-hs-crp-delta": {
    "slug": "forecasting-hs-crp-delta-en",
    "lang": "en",
    "title": "Forecasting hs-CRP Delta: When Meta-Analytic Evidence Redefines Cardiovascular Risk Stratification"
  },
  "forecasting-hs-crp-delta-en": {
    "slug": "forecasting-hs-crp-delta",
    "lang": "vi",
    "title": "Dự báo Biến thiên Chỉ số Viêm hs-CRP: Khi khoa học thống kê phân tích gộp định hình sức khỏe tim mạch thực chứng"
  },
  "giac-ngu-ngat-quang-va-nguy-co-dot-gay-dna-vi": {
    "slug": "fragmented-sleep-and-dna-double-strand-break-risk-en",
    "lang": "en",
    "title": "Fragmented sleep and group 2a carcinogenic risk when nocturnal melatonin depletion deprives dna double-strand break repair mechanisms"
  },
  "fragmented-sleep-and-dna-double-strand-break-risk-en": {
    "slug": "giac-ngu-ngat-quang-va-nguy-co-dot-gay-dna-vi",
    "lang": "vi",
    "title": "Giấc ngủ ngắt quãng và tác nhân sinh ung nhóm 2a khi sự suy giảm melatonin về đêm tước đoạt cơ chế sửa chữa đứt gãy dna"
  },
  "giai-ma-khoa-hoc-vaccine-va-cac-hieu-lam-vi": {
    "slug": "demystifying-vaccine-science-and-misconceptions-en",
    "lang": "en",
    "title": "Demystifying Vaccine Science: Molecular Mechanisms of Modern Platforms and Clinical Statistics Debunking Common Misconceptions"
  },
  "demystifying-vaccine-science-and-misconceptions-en": {
    "slug": "giai-ma-khoa-hoc-vaccine-va-cac-hieu-lam-vi",
    "lang": "vi",
    "title": "Giải mã khoa học vaccine: Cơ chế phân tử các nền tảng miễn dịch hiện đại và thống kê thực chứng phản bác các hiểu lầm phổ biến"
  },
  "giam-tao-truoc-bua-an-giam-duong-huyet-vi": {
    "slug": "apple-cider-vinegar-before-meals-glucose-blunting-en",
    "lang": "en",
    "title": "A Spoon of Apple Cider Vinegar Before Meals: Science or Social Media Hype? The Acetic Acid Mechanism"
  },
  "apple-cider-vinegar-before-meals-glucose-blunting-en": {
    "slug": "giam-tao-truoc-bua-an-giam-duong-huyet-vi",
    "lang": "vi",
    "title": "Thìa giấm táo trước bữa ăn: Sự thật khoa học hay trào lưu phóng đại? Giải mã Acid Acetic"
  },
  "giu-am-mui-va-mien-dich-ngoai-bao-vi": {
    "slug": "keep-nose-warm-nasal-vesicle-immunity-en",
    "lang": "en",
    "title": "The Science of Keeping Your Nose Warm: Extracellular Vesicles and Innate Antiviral Defense"
  },
  "keep-nose-warm-nasal-vesicle-immunity-en": {
    "slug": "giu-am-mui-va-mien-dich-ngoai-bao-vi",
    "lang": "vi",
    "title": "Bí mật giữ ấm mũi mùa lạnh: Đội quân bọng ngoại bào và lá chắn miễn dịch bẩm sinh"
  },
  "glp1-keo-dai-tuoi-tho-nature": {
    "slug": "glp1-longevity-nature-mitochondria",
    "lang": "en",
    "title": "GLP-1 Receptor Agonists Extend Lifespan by 12% in Nature: Longevity Breakthrough or Cellular Housekeeping Engine?"
  },
  "glp1-longevity-nature-mitochondria": {
    "slug": "glp1-keo-dai-tuoi-tho-nature",
    "lang": "vi",
    "title": "Thuốc giảm cân GLP-1 kéo dài 12% tuổi thọ trên Nature: Liệu có phải 'thần dược trường thọ' mới hay chỉ là chiếc máy dọn rác ty thể?"
  },
  "glymphatic-deep-sleep-brain-cleaning": {
    "slug": "glymphatic-deep-sleep-brain-cleaning-en",
    "lang": "en",
    "title": "The Glymphatic System and the Midnight Brain Wash: Molecular Clearance of Toxic Amyloid-Beta During Deep Slow-Wave Sleep"
  },
  "glymphatic-deep-sleep-brain-cleaning-en": {
    "slug": "glymphatic-deep-sleep-brain-cleaning",
    "lang": "vi",
    "title": "Hệ thống Glymphatic và cơn 'rửa xe' não bộ lúc nửa đêm: Cơ chế dọn dẹp mảnh rác Amyloid-Beta khi ngủ sâu"
  },
  "gut-mucin-barrier-integrity-vi": {
    "slug": "gut-mucin-barrier-integrity-en",
    "lang": "en",
    "title": "The Mucin Barrier: Erosion of the Intestinal Mucus Layer and the Onset of Autoimmune Dysregulation"
  },
  "gut-mucin-barrier-integrity-en": {
    "slug": "gut-mucin-barrier-integrity-vi",
    "lang": "vi",
    "title": "Bức tường Mucin: Khi lớp nhầy ruột bị bào mòn và sự khởi đầu của bệnh lý tự miễn"
  },
  "hien-thuong-cortisol-steal-khi-stress-triet-tieu-hormone-sinh-luc-vi": {
    "slug": "the-cortisol-steal-phenomenon-how-stress-hijacks-vitality-hormones-en",
    "lang": "en",
    "title": "The Cortisol Steal Phenomenon: How Chronic Stress Quietly Hijacks Your Vitality and Hair"
  },
  "the-cortisol-steal-phenomenon-how-stress-hijacks-vitality-hormones-en": {
    "slug": "hien-thuong-cortisol-steal-khi-stress-triet-tieu-hormone-sinh-luc-vi",
    "lang": "vi",
    "title": "Hiện tượng Cortisol Steal: Khi căng thẳng kéo dài âm thầm cướp đi sinh lực và mái tóc của bạn"
  },
  "hien-tuong-do-mat-khi-uong-ruou-va-giai-phap-bao-ve-gene-vi": {
    "slug": "asian-glow-alcohol-flush-and-gene-protection-strategies-en",
    "lang": "en",
    "title": "Alcohol flush reaction: When your body sends a toxin warning signal"
  },
  "asian-glow-alcohol-flush-and-gene-protection-strategies-en": {
    "slug": "hien-tuong-do-mat-khi-uong-ruou-va-giai-phap-bao-ve-gene-vi",
    "lang": "vi",
    "title": "Hiện tượng đỏ mặt khi uống rượu: Khi cơ thể gửi tín hiệu cảnh báo độc tố"
  },
  "hien-tuong-sap-nguon-bua-trua-va-giai-phap-vi-sinh-vi": {
    "slug": "postprandial-somnolence-lunch-slump-and-metabolic-stability-en",
    "lang": "en",
    "title": "The 2 PM crash and postprandial somnolence: The true metabolic culprit of heavy lunches and how to fix it"
  },
  "postprandial-somnolence-lunch-slump-and-metabolic-stability-en": {
    "slug": "hien-tuong-sap-nguon-bua-trua-va-giai-phap-vi-sinh-vi",
    "lang": "vi",
    "title": "Hiện tượng sập nguồn và buồn ngủ rũ rượi lúc 2 giờ chiều: Thủ phạm thực sự từ đỉnh carbohydrate bữa trưa và cách hóa giải"
  },
  "hoi-chung-ro-rui-ruot-va-met-moi-keo-dai-vi": {
    "slug": "leaky-gut-syndrome-and-chronic-fatigue-en",
    "lang": "en",
    "title": "Leaky gut syndrome and unexplained chronic fatigue: When mucosal barriers loosen"
  },
  "leaky-gut-syndrome-and-chronic-fatigue-en": {
    "slug": "hoi-chung-ro-rui-ruot-va-met-moi-keo-dai-vi",
    "lang": "vi",
    "title": "Hội chứng rò rỉ ruột và những cơn mệt mỏi vô cớ: Khi hàng rào niêm mạc lỏng lẻo"
  },
  "hop-chat-phenolic-dau-liu-va-nhiet-do-dun-nau-vi": {
    "slug": "olive-oil-phenolics-and-cooking-temperatures-en",
    "lang": "en",
    "title": "Heating extra virgin olive oil at high temperatures silently degrades cellular protective phenolic compounds"
  },
  "olive-oil-phenolics-and-cooking-temperatures-en": {
    "slug": "hop-chat-phenolic-dau-liu-va-nhiet-do-dun-nau-vi",
    "lang": "vi",
    "title": "Thói quen đun nóng dầu ô liu tinh luyện ở nhiệt độ cao vô tình làm thất thoát hợp chất phenolic bảo vệ tế bào"
  },
  "inositols-ti-le-vang-40-1-buong-trung-pcos-vi": {
    "slug": "inositols-golden-ratio-40-1-ovarian-pcos-en",
    "lang": "en",
    "title": "The Ovarian Paradox and the Golden 40:1 Inositol Ratio in PCOS Management"
  },
  "inositols-golden-ratio-40-1-ovarian-pcos-en": {
    "slug": "inositols-ti-le-vang-40-1-buong-trung-pcos-vi",
    "lang": "vi",
    "title": "Nghịch lý buồng trứng và tỷ lệ vàng 40:1 của Inositol trong điều trị đa nang buồng trứng PCOS"
  },
  "insulin-igf1-cancer-proliferation": {
    "slug": "insulin-igf1-cancer-proliferation-en",
    "lang": "en",
    "title": "The Cancer Code Part 3: The Insulin & IGF-1 Axis: The Molecular Accelerator of Tumor Proliferation"
  },
  "insulin-igf1-cancer-proliferation-en": {
    "slug": "insulin-igf1-cancer-proliferation",
    "lang": "vi",
    "title": "Mật mã Ung thư Phần 3: Trục Insulin & IGF-1: Chiếc công tắc phân tử thúc đẩy tăng sinh tế bào ác tính"
  },
  "lam-dung-men-vi-sinh-va-hau-sinh-hoc-postbiotic-vi": {
    "slug": "commercial-probiotics-versus-native-postbiotics-en",
    "lang": "en",
    "title": "Daily commercial probiotic supplements can suppress the native gut microbiome from producing essential postbiotics"
  },
  "commercial-probiotics-versus-native-postbiotics-en": {
    "slug": "lam-dung-men-vi-sinh-va-hau-sinh-hoc-postbiotic-vi",
    "lang": "vi",
    "title": "Thói quen lạm dụng men vi sinh đóng chai có thể vô hiệu hóa khả năng tự sản xuất postbiotic của hệ vi sinh ruột"
  },
  "le-chach-nhip-sinh-hoc-va-suy-giam-chuyen-hoa-vi": {
    "slug": "social-jetlag-and-metabolic-dysfunction-en",
    "lang": "en",
    "title": "Weekend social jetlag silently promotes adipose tissue accumulation"
  },
  "social-jetlag-and-metabolic-dysfunction-en": {
    "slug": "le-chach-nhip-sinh-hoc-va-suy-giam-chuyen-hoa-vi",
    "lang": "vi",
    "title": "Lệch nhịp sinh học cuối tuần âm thầm thúc đẩy tích lũy mỡ thừa"
  },
  "lutein-zeaxanthin-bao-ve-mat-va-da-vi": {
    "slug": "lutein-zeaxanthin-eye-and-skin-protection-en",
    "lang": "en",
    "title": "Lutein and Zeaxanthin: The Molecular Sunglasses Shielding Eyes and Skin from Digital Screens"
  },
  "lutein-zeaxanthin-eye-and-skin-protection-en": {
    "slug": "lutein-zeaxanthin-bao-ve-mat-va-da-vi",
    "lang": "vi",
    "title": "Sắc tố vàng Lutein và Zeaxanthin: Chiếc kính râm phân tử bảo vệ mắt và làn da trước màn hình điện tử"
  },
  "magie-glycinate-vs-citrate-giac-ngu-va-lo-au-vi": {
    "slug": "magnesium-glycinate-versus-citrate-sleep-and-anxiety-en",
    "lang": "en",
    "title": "Magnesium Glycinate vs Magnesium Citrate: Selecting the Optimal Chelate for Sleep Architecture and Neural Calming"
  },
  "magnesium-glycinate-versus-citrate-sleep-and-anxiety-en": {
    "slug": "magie-glycinate-vs-citrate-giac-ngu-va-lo-au-vi",
    "lang": "vi",
    "title": "Magie Glycinate vs Magie Citrate: Lựa chọn dạng muối tối ưu cho giấc ngủ và xoa dịu hệ thần kinh"
  },
  "melatonin-circadian-zeitgeber": {
    "slug": "melatonin-circadian-zeitgeber-en",
    "lang": "en",
    "title": "Melatonin is a Circadian Zeitgeber, Not a Sedative Hypnotic: Deciphering the 0.3 mg vs 10 mg Paradox"
  },
  "melatonin-circadian-zeitgeber-en": {
    "slug": "melatonin-circadian-zeitgeber",
    "lang": "vi",
    "title": "Melatonin là 'Người chỉnh nhịp sinh học', không phải thuốc an thần gây ngủ: Giải mã nghịch lý liều 0.3 mg vs 10 mg"
  },
  "metabolomic-horizon-clinical-diagnostics-vi": {
    "slug": "metabolomic-horizon-clinical-diagnostics",
    "lang": "en",
    "title": "The Metabolomic Horizon: Why Small Molecules Are Redefining Early Clinical Diagnostics"
  },
  "metabolomic-horizon-clinical-diagnostics": {
    "slug": "metabolomic-horizon-clinical-diagnostics-vi",
    "lang": "vi",
    "title": "Đường chân trời Chuyển hóa học: Vì sao các phân tử nhỏ đang thay đổi hoàn toàn cách phát hiện sớm bệnh lý?"
  },
  "mevalonate-statin-coq10-vi": {
    "slug": "mevalonate-statin-coq10-en",
    "lang": "en",
    "title": "The Mevalonate Shunt: HMG-CoA Reductase Inhibition and Mitochondrial Coenzyme Q10 Depletion"
  },
  "mevalonate-statin-coq10-en": {
    "slug": "mevalonate-statin-coq10-vi",
    "lang": "vi",
    "title": "Ngã ba Mevalonate: Khi thuốc Statin hạ mỡ máu vô tình làm cạn kiệt Coenzyme Q10 ở ty thể"
  },
  "nad-cd38-sirtuin-mitochondria-cellular-aging": {
    "slug": "nad-cd38-sirtuin-mitochondria-cellular-aging-en",
    "lang": "en",
    "title": "The NAD+-Sirtuin Axis and the CD38 Black Hole: Defending Mitochondrial Bioenergetics Against Cellular Senescence"
  },
  "nad-cd38-sirtuin-mitochondria-cellular-aging-en": {
    "slug": "nad-cd38-sirtuin-mitochondria-cellular-aging",
    "lang": "vi",
    "title": "Trục NAD+, Sirtuin và kẻ trộm năng lượng CD38: Cuộc chiến bảo toàn năng lượng ty thể khi tế bào già cỗi"
  },
  "nam-huong-beta-glucan-dectin-1-mien-dich-vi": {
    "slug": "shiitake-beta-glucan-dectin-1-immunity-en",
    "lang": "en",
    "title": "The symphony of shiitake and Beta-Glucan: Awakening immune patrol cells through the Dectin-1 key"
  },
  "shiitake-beta-glucan-dectin-1-immunity-en": {
    "slug": "nam-huong-beta-glucan-dectin-1-mien-dich-vi",
    "lang": "vi",
    "title": "Bản giao hưởng của nấm hương và Beta-Glucan: Đánh thức hệ tuần tra tế bào lạ bằng chìa khóa Dectin-1"
  },
  "ngan-ngua-teo-co-tuoi-40-leucine-mtor-vi": {
    "slug": "preventing-sarcopenia-after-40-leucine-mtor-en",
    "lang": "en",
    "title": "Preventing Muscle Loss After 40: How Leucine Flips the mTOR Switch to Rebuild Aging Muscles"
  },
  "preventing-sarcopenia-after-40-leucine-mtor-en": {
    "slug": "ngan-ngua-teo-co-tuoi-40-leucine-mtor-vi",
    "lang": "vi",
    "title": "Ngăn ngừa teo cơ sau tuổi 40: Bí quyết nạp axit amin Leucine để kích hoạt công tắc mTOR nuôi dưỡng cơ bắp"
  },
  "ngat-quang-ngoi-lau-danh-thuc-mach-mau": {
    "slug": "breaking-sedentary-sitting-vascular-shear-stress",
    "lang": "en",
    "title": "Interrupting Sedentary Time: Hemodynamic Shear Stress and Vascular Endothelial Protection"
  },
  "breaking-sedentary-sitting-vascular-shear-stress": {
    "slug": "ngat-quang-ngoi-lau-danh-thuc-mach-mau",
    "lang": "vi",
    "title": "Ngắt quãng ngồi lâu: Đánh thức dòng máu và phục hồi nội mô mạch"
  },
  "nghich-ly-mitohormesis-va-suc-manh-cua-stress-oxy-hoa-co-kiem-soat-vi": {
    "slug": "the-mitohormesis-paradox-and-the-power-of-controlled-oxidative-stress-en",
    "lang": "en",
    "title": "The Mitohormesis Paradox: Harnessing Controlled Oxidative Stress for Cellular Longevity"
  },
  "the-mitohormesis-paradox-and-the-power-of-controlled-oxidative-stress-en": {
    "slug": "nghich-ly-mitohormesis-va-suc-manh-cua-stress-oxy-hoa-co-kiem-soat-vi",
    "lang": "vi",
    "title": "Nghịch lý Mitohormesis: Khi stress oxy hóa có kiểm soát trở thành chìa khóa trường thọ"
  },
  "ngoi-nhieu-te-liet-enzyme-lpl-khi-mau-u-trung-chan-vi": {
    "slug": "sitting-paralyzes-lpl-enzyme-venous-stasis-en",
    "lang": "en",
    "title": "Sitting continuously for over 2 hours shuts down LPL enzyme: Simple micro-movements to restore vascular flow"
  },
  "sitting-paralyzes-lpl-enzyme-venous-stasis-en": {
    "slug": "ngoi-nhieu-te-liet-enzyme-lpl-khi-mau-u-trung-chan-vi",
    "lang": "vi",
    "title": "Ngồi làm việc liên tục trên 2 giờ làm tắt ngấm enzyme LPL: Thói quen nhấp nhổm đơn giản giải thoát mạch máu chân"
  },
  "ngu-trua-20-phut-phuc-hoi-tim-mach": {
    "slug": "power-nap-cardiovascular-health-blood-pressure",
    "lang": "en",
    "title": "The 20-Minute Power Nap: Hemodynamic Reset and Cardiovascular Risk Reduction"
  },
  "power-nap-cardiovascular-health-blood-pressure": {
    "slug": "ngu-trua-20-phut-phuc-hoi-tim-mach",
    "lang": "vi",
    "title": "Giấc ngủ trưa 20 phút: Liều thuốc tự nhiên phục hồi tim mạch và huyết áp"
  },
  "nhai-ky-no-lau-giam-calo": {
    "slug": "chewing-slowly-satiety-gut-hormones",
    "lang": "en",
    "title": "Mindful Chewing and Satiety: How Mastication Velocity Governs Gut Hormones PYY and GLP-1"
  },
  "chewing-slowly-satiety-gut-hormones": {
    "slug": "nhai-ky-no-lau-giam-calo",
    "lang": "vi",
    "title": "Nhai kỹ no lâu: Bí mật tín hiệu hormone PYY và GLP-1 từ thành ruột"
  },
  "nhin-an-gian-doat-14-16-gio-kich-hoat-autophagy-vi": {
    "slug": "intermittent-fasting-14-16-hours-autophagy-en",
    "lang": "en",
    "title": "Intermittent Fasting 14-16 Hours: The Golden Window to Trigger Cellular Garbage Clearance Through Autophagy"
  },
  "intermittent-fasting-14-16-hours-autophagy-en": {
    "slug": "nhin-an-gian-doat-14-16-gio-kich-hoat-autophagy-vi",
    "lang": "vi",
    "title": "Nhịn ăn gián đoạn 14-16 giờ: Khung giờ vàng kích hoạt xe rác tự thực bào dọn dẹp tế bào"
  },
  "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi": {
    "slug": "slow-breathing-vagal-tone-parasympathetic-reset",
    "lang": "en",
    "title": "Slow-Paced Breathing and Vagal Tone: Baroreceptor Reset, Heart Rate Variability, and Autonomic Resilience"
  },
  "slow-breathing-vagal-tone-parasympathetic-reset": {
    "slug": "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi",
    "lang": "vi",
    "title": "Nhịp thở chậm 4-7-8: Kích hoạt dây thần kinh phế vị và biến thiên nhịp tim HRV"
  },
  "nhum-muoi-khoang-trong-coc-nuoc-am-sang-som-vi": {
    "slug": "pinch-of-salt-in-morning-warm-water-en",
    "lang": "en",
    "title": "A Pinch of Mineral Salt in Morning Warm Water: Unlocking Cellular Rehydration and Energy After Overnight Fasting"
  },
  "pinch-of-salt-in-morning-warm-water-en": {
    "slug": "nhum-muoi-khoang-trong-coc-nuoc-am-sang-som-vi",
    "lang": "vi",
    "title": "Nhúm muối khoáng trong cốc nước ấm sáng sớm: Giải mã cơ chế tái cấp nước tế bào và kích hoạt năng lượng sau đêm dài"
  },
  "nobel-medicine-2026-optogenetics": {
    "slug": "nobel-medicine-2026-optogenetics-en",
    "lang": "en",
    "title": "The 2026 Nobel Prize in Medicine: When Light Became the Molecular Switch Controlling the Brain (Optogenetics)"
  },
  "nobel-medicine-2026-optogenetics-en": {
    "slug": "nobel-medicine-2026-optogenetics",
    "lang": "vi",
    "title": "Giải Nobel Y học 2026: Khi Ánh sáng trở thành Công tắc Phân tử Điều khiển Não bộ (Optogenetics)"
  },
  "nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi": {
    "slug": "hydration-electrolytes-cellular-osmosis-workout-en",
    "lang": "en",
    "title": "Hydration During Workout: The Water Intoxication Paradox and Electrolyte Balance"
  },
  "hydration-electrolytes-cellular-osmosis-workout-en": {
    "slug": "nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi",
    "lang": "vi",
    "title": "Uống nước khi tập thể thao: Nghịch lý ngộ độc nước và vai trò của chất điện giải"
  },
  "omega-3-triglyceride-va-ethyl-ester-sinh-kha-dung-vi-tim-mach-vi": {
    "slug": "omega-3-triglyceride-vs-ethyl-ester-cardiovascular-pharmacokinetics-en",
    "lang": "en",
    "title": "Natural triglyceride vs ethyl ester omega-3: Bioavailability, oxidative stability and high dose atrial fibrillation risk"
  },
  "omega-3-triglyceride-vs-ethyl-ester-cardiovascular-pharmacokinetics-en": {
    "slug": "omega-3-triglyceride-va-ethyl-ester-sinh-kha-dung-vi-tim-mach-vi",
    "lang": "vi",
    "title": "Omega-3 triglyceride tự nhiên và ethyl ester: So sánh sinh khả dụng, độ bền oxy hóa và nguy cơ rung nhĩ liều cao"
  },
  "oxldl-sdldl-atherosclerosis-mechanism": {
    "slug": "oxldl-sdldl-atherosclerosis-mechanism-en",
    "lang": "en",
    "title": "The Cardiovascular Code Part 2: oxLDL & sdLDL Particles: The True Culprits Penetrating Arterial Walls"
  },
  "oxldl-sdldl-atherosclerosis-mechanism-en": {
    "slug": "oxldl-sdldl-atherosclerosis-mechanism",
    "lang": "vi",
    "title": "Mật mã Tim mạch Phần 2: Hạt mỡ oxLDL & sdLDL: Kẻ đục thủng thành mạch thực sự"
  },
  "pharmacokinetics-one-compartment": {
    "slug": "pharmacokinetics-one-compartment-en",
    "lang": "en",
    "title": "Reading a Serum Concentration-Time Curve: The 4 Numbers Defining Therapeutic Reality"
  },
  "pharmacokinetics-one-compartment-en": {
    "slug": "pharmacokinetics-one-compartment",
    "lang": "vi",
    "title": "Cách đọc đường cong Nồng độ Dược chất trong Máu: 4 con số quyết định một liều uống có thực sự hiệu quả hay không"
  },
  "phosphatidylserine-dha-mang-te-bao-than-kinh-vi": {
    "slug": "phosphatidylserine-dha-neuronal-membrane-en",
    "lang": "en",
    "title": "Phosphatidylserine and DHA: Restoring Neuronal Membrane Fluidity and Countering Midlife Brain Fog"
  },
  "phosphatidylserine-dha-neuronal-membrane-en": {
    "slug": "phosphatidylserine-dha-mang-te-bao-than-kinh-vi",
    "lang": "vi",
    "title": "Phosphatidylserine và DHA: Phục hồi độ linh hoạt màng nơ-ron và đẩy lùi sương mù não tuổi trung niên"
  },
  "phytoestrogen-dau-nanh-va-hat-lanh-giai-ma-su-that-va-loi-ich-tien-man-kinh-vi": {
    "slug": "phytoestrogen-soy-and-flaxseed-truth-and-menopause-benefits-en",
    "lang": "en",
    "title": "Phytoestrogens in soy and flaxseed: Deodorizing myths and menopause benefits"
  },
  "phytoestrogen-soy-and-flaxseed-truth-and-menopause-benefits-en": {
    "slug": "phytoestrogen-dau-nanh-va-hat-lanh-giai-ma-su-that-va-loi-ich-tien-man-kinh-vi",
    "lang": "vi",
    "title": "Phytoestrogen trong đậu nành và hạt lanh: Giải mã sự thật và lợi ích tiền mãn kinh"
  },
  "policosanol-versus-statins": {
    "slug": "policosanol-versus-statins-en",
    "lang": "en",
    "title": "Policosanol, Reconsidered: Cuban Trials, the European Replication Gap, and Clinical Reality"
  },
  "policosanol-versus-statins-en": {
    "slug": "policosanol-versus-statins",
    "lang": "vi",
    "title": "Đánh giá lại Policosanol trong Hạ mỡ máu: Dữ liệu Cuba, Khoảng trống Châu Âu và Thực tế Lâm sàng"
  },
  "qua-anh-dao-chua-va-axit-uric-vi": {
    "slug": "tart-cherry-hydration-uric-acid-en",
    "lang": "en",
    "title": "Tart Cherries and Hydration: A Natural Strategy to Lower Uric Acid and Prevent Gout Flares"
  },
  "tart-cherry-hydration-uric-acid-en": {
    "slug": "qua-anh-dao-chua-va-axit-uric-vi",
    "lang": "vi",
    "title": "Quả anh đào chua và thói quen uống nước: Giải pháp tự nhiên giúp hạ axit uric và ngăn ngừa cơn gút cấp"
  },
  "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau": {
    "slug": "berries-anthocyanins-vascular-protection-antioxidant-shield",
    "lang": "en",
    "title": "Berries and Anthocyanins: Vascular Endothelial Protection, Arterial Compliance, and Polyphenol Defense"
  },
  "berries-anthocyanins-vascular-protection-antioxidant-shield": {
    "slug": "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau",
    "lang": "vi",
    "title": "Quả mọng: Lá chắn Anthocyanin chống lão hóa mạch máu và bảo vệ tim mạch"
  },
  "qua-mong-va-axit-ellagic-bao-ve-dna-vi": {
    "slug": "berries-and-ellagic-acid-dna-protection-en",
    "lang": "en",
    "title": "The morning bowl of berries and the invisible shield protecting DNA from double-strand breaks"
  },
  "berries-and-ellagic-acid-dna-protection-en": {
    "slug": "qua-mong-va-axit-ellagic-bao-ve-dna-vi",
    "lang": "vi",
    "title": "Bát quả mọng buổi sáng và chiếc khiên vô hình bảo vệ chuỗi DNA khỏi đứt gãy"
  },
  "quang-sinh-hoc-670nm-phuc-hoi-ty-the-vong-mac-vi": {
    "slug": "photobiomodulation-670nm-retinal-mitochondria-en",
    "lang": "en",
    "title": "670 nm Photobiomodulation: Recharging Cytochrome c Oxidase and Rescuing Retinal Bioenergetic Decline"
  },
  "photobiomodulation-670nm-retinal-mitochondria-en": {
    "slug": "quang-sinh-hoc-670nm-phuc-hoi-ty-the-vong-mac-vi",
    "lang": "vi",
    "title": "Quang sinh học 670 nm: Tái kích hoạt Cytochrome c Oxidase và cứu vãn suy thoái năng lượng võng mạc"
  },
  "resistant-starch-scfa-gut-vi": {
    "slug": "resistant-starch-scfa-gut-en",
    "lang": "en",
    "title": "Resistant Starch and Colonic Integrity: Microbial SCFA Synthesis and Tight Junction Assembly"
  },
  "resistant-starch-scfa-gut-en": {
    "slug": "resistant-starch-scfa-gut-vi",
    "lang": "vi",
    "title": "Vì sao tinh bột kháng nuôi sống tế bào niêm mạc ruột? Giải mã chiếc khóa protein Claudin-1 chống rò rỉ ruột"
  },
  "saw-palmetto-kem-ngan-rung-toc-sinh-luc-vi": {
    "slug": "saw-palmetto-zinc-dht-hair-loss-vitality-en",
    "lang": "en",
    "title": "Protecting Hair Follicles and Vitality in Midlife: Unlocking the 5-Alpha Reductase Inhibition Mechanism of Saw Palmetto and Zinc"
  },
  "saw-palmetto-zinc-dht-hair-loss-vitality-en": {
    "slug": "saw-palmetto-kem-ngan-rung-toc-sinh-luc-vi",
    "lang": "vi",
    "title": "Bảo vệ nang tóc và sinh lực tuổi trung niên: Giải mã cơ chế khoá enzyme 5-alpha reductase từ Saw Palmetto và Kẽm"
  },
  "sirt6-gen-truong-tho-sua-chua-dna-vi": {
    "slug": "sirt6-longevity-gene-dna-repair-en",
    "lang": "en",
    "title": "Sirt6: The Guardian of the Genome and the Key to Cellular Longevity"
  },
  "sirt6-longevity-gene-dna-repair-en": {
    "slug": "sirt6-gen-truong-tho-sua-chua-dna-vi",
    "lang": "vi",
    "title": "Sirt6: Người gác đền của bộ gen và chìa khóa cho sự trường thọ tế bào"
  },
  "so-co-la-den-flavanol-gian-mach-ha-huyet-ap": {
    "slug": "dark-chocolate-flavanols-nitric-oxide-endothelial-function",
    "lang": "en",
    "title": "Dark Chocolate Cocoa Flavanols: Nitric Oxide Activation and Endothelial Vasodilation"
  },
  "dark-chocolate-flavanols-nitric-oxide-endothelial-function": {
    "slug": "so-co-la-den-flavanol-gian-mach-ha-huyet-ap",
    "lang": "vi",
    "title": "Sô-cô-la đen: Bí mật hoạt chất flavanol giúp giãn mạch và hạ huyết áp"
  },
  "socola-den-oxit-nitric-huyet-ap-vi": {
    "slug": "dark-chocolate-nitric-oxide-blood-pressure-en",
    "lang": "en",
    "title": "High-cocoa dark chocolate and blood pressure: The Nitric Oxide pathway for natural arterial relaxation"
  },
  "dark-chocolate-nitric-oxide-blood-pressure-en": {
    "slug": "socola-den-oxit-nitric-huyet-ap-vi",
    "lang": "vi",
    "title": "Socola đen đậm đặc và huyết áp: Cơ chế kích hoạt Oxit Nitric giúp thư giãn thành mạch tự nhiên"
  },
  "spermidine-eif5a-tu-thuc-ty-the-vi": {
    "slug": "spermidine-eif5a-autophagy-mitochondria-en",
    "lang": "en",
    "title": "The Spermidine Paradox: Deciphering eIF5A Hypusination and TFEB-Driven Autophagy for Mitochondrial Rejuvenation"
  },
  "spermidine-eif5a-autophagy-mitochondria-en": {
    "slug": "spermidine-eif5a-tu-thuc-ty-the-vi",
    "lang": "vi",
    "title": "Nghịch lý Spermidine: Từ tinh dịch tố đến chiếc chìa khóa vàng hypusine hóa eIF5A kích hoạt dọn rác tự thực và đảo ngược lão hóa ty thể"
  },
  "streptococcus-pyogenes-sieu-khang-nguyen-stss-vi": {
    "slug": "streptococcus-pyogenes-superantigen-stss-en",
    "lang": "en",
    "title": "Molecular Shockwaves of Streptococcus pyogenes: Deciphering Superantigen-Mediated Cytokine Storms in STSS"
  },
  "streptococcus-pyogenes-superantigen-stss-en": {
    "slug": "streptococcus-pyogenes-sieu-khang-nguyen-stss-vi",
    "lang": "vi",
    "title": "Cú sốc phân tử từ Streptococcus pyogenes: Giải mã cơ chế siêu kháng nguyên kích hoạt bão cytokine trong hội chứng STSS"
  },
  "su-chuyen-doi-te-bao-sung-va-toc-do-lanh-thuong-bieu-bi-vi": {
    "slug": "keratinocyte-migration-and-epidermal-wound-healing-en",
    "lang": "en",
    "title": "Keratinocyte directional migration dictates dermal wound closure velocity"
  },
  "keratinocyte-migration-and-epidermal-wound-healing-en": {
    "slug": "su-chuyen-doi-te-bao-sung-va-toc-do-lanh-thuong-bieu-bi-vi",
    "lang": "vi",
    "title": "Quá trình di cư của tế bào sừng quyết định tốc độ khép miệng vết thương ngoài da"
  },
  "su-that-tra-thai-doc-gan-phase-1-phase-2-vi": {
    "slug": "the-truth-about-liver-detox-teas-phase-1-and-2-en",
    "lang": "en",
    "title": "The Truth About Rapid Liver Detox Teas and the Micronutrients Truly Needed for Phase 1 and Phase 2 Detoxification"
  },
  "the-truth-about-liver-detox-teas-phase-1-and-2-en": {
    "slug": "su-that-tra-thai-doc-gan-phase-1-phase-2-vi",
    "lang": "vi",
    "title": "Sự thật về trà thải độc gan cấp tốc và các vi chất thực sự cần thiết cho hai pha giải độc"
  },
  "su-that-ve-cac-bai-thuoc-chua-khoi-ung-thu-vi": {
    "slug": "truth-about-viral-miracle-cancer-cures-en",
    "lang": "en",
    "title": "The Truth Behind Viral 'Miracle Cancer Cures': Tumor Biology Decoded and the Fatal Cost of Abandoning Evidence-Based Oncology"
  },
  "truth-about-viral-miracle-cancer-cures-en": {
    "slug": "su-that-ve-cac-bai-thuoc-chua-khoi-ung-thu-vi",
    "lang": "vi",
    "title": "Sự thật về các 'bài thuốc thần kỳ' chữa khỏi ung thư trên mạng: Giải mã sinh học khối u và cái giá đắt của việc từ bỏ y học thực chứng"
  },
  "succinate-creatine-bat-thermogenesis-vi": {
    "slug": "succinate-creatine-bat-thermogenesis-en",
    "lang": "en",
    "title": "Succinate Signaling and Creatine Futile Cycling: The Next-Generation Thermogenic Paradigm Beyond UCP1"
  },
  "succinate-creatine-bat-thermogenesis-en": {
    "slug": "succinate-creatine-bat-thermogenesis-vi",
    "lang": "vi",
    "title": "Tín hiệu Succinate và Chu trình Creatine vô nghĩa: Kỷ nguyên sinh nhiệt mới của mỡ nâu vượt ngoài ranh giới UCP1"
  },
  "succinate-ucp1-bat-sinh-nhiet-ty-the": {
    "slug": "succinate-ucp1-bat-mitochondrial-thermogenesis",
    "lang": "en",
    "title": "The Succinate-UCP1 Axis in Brown Adipose Tissue: Unlocking Mitochondrial Uncoupling for Metabolic Longevity"
  },
  "succinate-ucp1-bat-mitochondrial-thermogenesis": {
    "slug": "succinate-ucp1-bat-sinh-nhiet-ty-the",
    "lang": "vi",
    "title": "Trục Succinate-UCP1 tại ty thể mỡ nâu: Công tắc sinh nhiệt và đột phá trong điều trị chuyển hóa, kéo dài tuổi thọ"
  },
  "sulforaphane-nrf2-keap1-longevity-vi": {
    "slug": "sulforaphane-nrf2-keap1-longevity-en",
    "lang": "en",
    "title": "Elucidating the Nrf2-Keap1 pathway via Sulforaphane: A strategic reboot of endogenous antioxidant defenses and mitochondrial protection"
  },
  "sulforaphane-nrf2-keap1-longevity-en": {
    "slug": "sulforaphane-nrf2-keap1-longevity-vi",
    "lang": "vi",
    "title": "Thấu thị cơ chế Nrf2-Keap1 từ Sulforaphane: Chiến lược tái cấu trúc hệ thống chống oxy hóa nội sinh và bảo vệ ty thể"
  },
  "sulforaphane-nrf2-window": {
    "slug": "sulforaphane-nrf2-window-en",
    "lang": "en",
    "title": "The Nrf2 Activation Window from Sulforaphane: Why Over-Boiling Broccoli Destroys Its Anticancer Potential"
  },
  "sulforaphane-nrf2-window-en": {
    "slug": "sulforaphane-nrf2-window",
    "lang": "vi",
    "title": "Cửa sổ Kích hoạt Nrf2 từ Sulforaphane: Vì sao luộc súp lơ xanh quá kỹ làm mất sạch khả năng chống ung thư?"
  },
  "supplement-drug-interaction-matrix": {
    "slug": "supplement-drug-interaction-matrix-en",
    "lang": "en",
    "title": "The Natural Bioactives & Prescription Drug Interaction Matrix: When Botanical Supplements Turn Lethal"
  },
  "supplement-drug-interaction-matrix-en": {
    "slug": "supplement-drug-interaction-matrix",
    "lang": "vi",
    "title": "Ma trận Tương tác Hoạt chất Tự nhiên & Thuốc Kê đơn: Khi bổ sung thảo dược sai cách trở thành mối nguy sinh tử"
  },
  "tac-hai-sinh-hoc-cua-viec-an-toi-muon-sau-8-gio-vi": {
    "slug": "biological-damage-of-eating-late-at-night-en",
    "lang": "en",
    "title": "Biological damage of eating late dinner after 8 PM: When fat cells lock receptors and excess calories turn straight into visceral fat"
  },
  "biological-damage-of-eating-late-at-night-en": {
    "slug": "tac-hai-sinh-hoc-cua-viec-an-toi-muon-sau-8-gio-vi",
    "lang": "vi",
    "title": "Tác hại sinh học của việc ăn tối muộn sau 8 giờ: Khi tế bào mỡ khóa thụ thể và lượng calo dư thừa chuyển thẳng thành mỡ nội tạng"
  },
  "tai-nguyen-sac-to-vang-hoang-diem-vi-sao-man-hinh-khien-mat-nhu-chiec-la-kho-vi": {
    "slug": "yellow-pigment-macula-screen-dry-leaf-en",
    "lang": "en",
    "title": "The golden visual shield: Why screen light dries our eyes like an autumn leaf"
  },
  "yellow-pigment-macula-screen-dry-leaf-en": {
    "slug": "tai-nguyen-sac-to-vang-hoang-diem-vi-sao-man-hinh-khien-mat-nhu-chiec-la-kho-vi",
    "lang": "vi",
    "title": "Bức rèm vàng bảo vệ thị lực: Vì sao màn hình khiến mắt khô héo như chiếc lá mùa thu"
  },
  "tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi": {
    "slug": "warm-bath-effect-on-core-body-temperature-sleep-en",
    "lang": "en",
    "title": "Taking a Warm Bath Before Sleep: The Core Cooling Paradox for Restful Slumber"
  },
  "warm-bath-effect-on-core-body-temperature-sleep-en": {
    "slug": "tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi",
    "lang": "vi",
    "title": "Tắm nước ấm trước khi ngủ: Nghịch lý hạ nhiệt độ cơ thể và giấc ngủ ngon"
  },
  "tam-rung-20-phut-ha-hormone-cang-thang-cortisol": {
    "slug": "nature-pill-twenty-minutes-cortisol-reduction",
    "lang": "en",
    "title": "The 20-Minute Nature Pill: Shinrin-Yoku, Phytoncides, and Salivary Cortisol Clearance"
  },
  "nature-pill-twenty-minutes-cortisol-reduction": {
    "slug": "tam-rung-20-phut-ha-hormone-cang-thang-cortisol",
    "lang": "vi",
    "title": "Tắm rừng 20 phút: Liều thuốc tự nhiên hạ hormone căng thẳng Cortisol"
  },
  "tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi": {
    "slug": "how-gut-microbes-talk-to-the-brain-vagus-nerve-gaba-en",
    "lang": "en",
    "title": "Anxiety Originates in the Gut: The Vagus Nerve, Bacterial GABA, and the Biological Brake on Stress"
  },
  "how-gut-microbes-talk-to-the-brain-vagus-nerve-gaba-en": {
    "slug": "tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi",
    "lang": "vi",
    "title": "Tâm trạng bất an bắt nguồn từ đường ruột: Dây thần kinh phế vị, vi khuẩn sản xuất GABA và chiếc phanh sinh học xua tan lo âu"
  },
  "tap-the-luc-khang-luc-giu-tuoi-tho-te-bao-vi": {
    "slug": "resistance-training-for-cellular-longevity-en",
    "lang": "en",
    "title": "Resistance training in middle age: Stimulating myokines for cellular longevity"
  },
  "resistance-training-for-cellular-longevity-en": {
    "slug": "tap-the-luc-khang-luc-giu-tuoi-tho-te-bao-vi",
    "lang": "vi",
    "title": "Tập kháng lực ở tuổi trung niên: Kích thích hormone myokine giữ gìn tuổi thọ tế bào"
  },
  "thanh-loc-te-bao-zombie-senolytics-va-tuoi-tho-vi-mo-vi": {
    "slug": "clearing-zombie-cells-senolytics-and-microscopic-longevity-en",
    "lang": "en",
    "title": "Clearing zombie cells: Senolytics compounds and the mechanism of cellular rejuvenation"
  },
  "clearing-zombie-cells-senolytics-and-microscopic-longevity-en": {
    "slug": "thanh-loc-te-bao-zombie-senolytics-va-tuoi-tho-vi-mo-vi",
    "lang": "vi",
    "title": "Thanh lọc tế bào zombie: Hợp chất senolytics và cơ chế đảo ngược lão hóa tế bào"
  },
  "thit-do-che-bien-san-nitrit-ung-thu-dai-truc-trang-vi": {
    "slug": "processed-meat-nitrites-colorectal-cancer-risk-en",
    "lang": "en",
    "title": "Processed Red Meat and Colorectal Cancer: Nitrosamines, Heme Iron Catalysis, and Safe Dietary Strategies"
  },
  "processed-meat-nitrites-colorectal-cancer-risk-en": {
    "slug": "thit-do-che-bien-san-nitrit-ung-thu-dai-truc-trang-vi",
    "lang": "vi",
    "title": "Thịt đỏ chế biến sẵn và ung thư đại trực tràng: Cơ chế Nitrosamine, sắt Heme và giải pháp dinh dưỡng an toàn"
  },
  "thoa-axit-glycolic-hay-bo-sung-polyphenol-thuc-pham-hang-rao-da-vi": {
    "slug": "topical-glycolic-acid-versus-dietary-polyphenols-skin-barrier-en",
    "lang": "en",
    "title": "High-Concentration Topical Glycolic Acid versus Dietary Polyphenols: Epidermal Exfoliation versus pH 5.5 Skin Acid Mantle Restoration"
  },
  "topical-glycolic-acid-versus-dietary-polyphenols-skin-barrier-en": {
    "slug": "thoa-axit-glycolic-hay-bo-sung-polyphenol-thuc-pham-hang-rao-da-vi",
    "lang": "vi",
    "title": "Thoa Axit Glycolic nồng độ cao hay bổ sung Polyphenol qua thực phẩm: Cuộc đối đầu giữa bong tróc biểu bì và phục hồi hàng rào màng axit pH 5.5"
  },
  "thoi-quen-an-lap-lai-rau-xanh-lam-ngheo-he-vi-sinh-ruot-vi": {
    "slug": "repeating-healthy-greens-erodes-gut-microbiome-diversity-en",
    "lang": "en",
    "title": "Repeating a Few Healthy Greens Daily Quietly Erodes Gut Microbiome Diversity"
  },
  "repeating-healthy-greens-erodes-gut-microbiome-diversity-en": {
    "slug": "thoi-quen-an-lap-lai-rau-xanh-lam-ngheo-he-vi-sinh-ruot-vi",
    "lang": "vi",
    "title": "Thói quen ăn lặp lại vài loại rau xanh lành mạnh vô tình kiệt quệ độ đa dạng hệ vi sinh đường ruột"
  },
  "thuc-pham-chong-ung-thu-va-che-bien-dung-cach-vi": {
    "slug": "anticancer-foods-and-proper-culinary-preparation-en",
    "lang": "en",
    "title": "The anti-cancer kitchen: The art of food combination and temperature to activate bioactive compounds"
  },
  "anticancer-foods-and-proper-culinary-preparation-en": {
    "slug": "thuc-pham-chong-ung-thu-va-che-bien-dung-cach-vi",
    "lang": "vi",
    "title": "Căn bếp chống ung thư: Nghệ thuật kết hợp thực phẩm và nhiệt độ để kích hoạt hoạt chất sinh học"
  },
  "thuc-pham-len-men-va-he-sinh-thai-ti-hon-vi": {
    "slug": "fermented-foods-and-our-extended-microbiome-en",
    "lang": "en",
    "title": "Traditional fermented foods: The extended microbiome of the human body"
  },
  "fermented-foods-and-our-extended-microbiome-en": {
    "slug": "thuc-pham-len-men-va-he-sinh-thai-ti-hon-vi",
    "lang": "vi",
    "title": "Thực phẩm lên men truyền thống: Hệ sinh thái vi sinh vật mở rộng của cơ thể người"
  },
  "thuc-pham-moc-aflatoxin-va-la-chan-phong-ngua-ung-thu-gan-vi": {
    "slug": "moldy-food-aflatoxin-and-liver-cancer-prevention-shield-en",
    "lang": "en",
    "title": "Moldy food, Aflatoxin toxicity and natural kitchen strategies to protect liver tumor suppressor genes"
  },
  "moldy-food-aflatoxin-and-liver-cancer-prevention-shield-en": {
    "slug": "thuc-pham-moc-aflatoxin-va-la-chan-phong-ngua-ung-thu-gan-vi",
    "lang": "vi",
    "title": "Thực phẩm mốc, độc tố Aflatoxin và lá chắn tự nhiên bảo vệ gen ung thư gan từ căn bếp"
  },
  "tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi": {
    "slug": "resistant-starch-cold-rice-gut-microbiome-scfa-en",
    "lang": "en",
    "title": "Cold Rice for Gut Health: How Resistant Starch Nourishes the Microbiome"
  },
  "resistant-starch-cold-rice-gut-microbiome-scfa-en": {
    "slug": "tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi",
    "lang": "vi",
    "title": "Cơm nguội để tủ lạnh tốt cho đường ruột: Bí mật cấu trúc Tinh bột Kháng"
  },
  "toi-tuoi-dap-dap-va-allicin-quy-tac-10-phut-vang-vi-su-song-vi": {
    "slug": "crushed-fresh-garlic-and-allicin-the-10-minute-golden-rule-for-cellular-defense-en",
    "lang": "en",
    "title": "Crushed fresh garlic and allicin: The 10 minute golden rule for cellular defense and apoptosis"
  },
  "crushed-fresh-garlic-and-allicin-the-10-minute-golden-rule-for-cellular-defense-en": {
    "slug": "toi-tuoi-dap-dap-va-allicin-quy-tac-10-phut-vang-vi-su-song-vi",
    "lang": "vi",
    "title": "Tỏi tươi đập dập và allicin: Quy tắc 10 phút vàng kích hoạt vũ khí sinh học chống đột biến tế bào"
  },
  "tra-sua-duong-fructose-va-gan-nhiem-mo-vi": {
    "slug": "liquid-fructose-boba-fatty-liver-en",
    "lang": "en",
    "title": "Why liquid fructose in boba tea accumulates liver fat faster than saturated fats"
  },
  "liquid-fructose-boba-fatty-liver-en": {
    "slug": "tra-sua-duong-fructose-va-gan-nhiem-mo-vi",
    "lang": "vi",
    "title": "Vì sao đường fructose lỏng trong trà sữa tích mỡ gan nhanh hơn mỡ động vật?"
  },
  "tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi": {
    "slug": "green-tea-l-theanine-and-caffeine-smooth-focus-en",
    "lang": "en",
    "title": "Green Tea for Calm Focus: How L-Theanine and Caffeine Harmonize Alpha Brainwaves"
  },
  "green-tea-l-theanine-and-caffeine-smooth-focus-en": {
    "slug": "tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi",
    "lang": "vi",
    "title": "Uống trà xanh tỉnh táo êm dịu: Sức mạnh sóng não Alpha từ L-Theanine"
  },
  "tri-hoan-ngum-ca-phe-dau-tien-60-90-phut-vi": {
    "slug": "delay-first-morning-coffee-60-90-minutes-en",
    "lang": "en",
    "title": "Why delaying your first morning coffee by 90 minutes prevents that dreaded afternoon energy crash"
  },
  "delay-first-morning-coffee-60-90-minutes-en": {
    "slug": "tri-hoan-ngum-ca-phe-dau-tien-60-90-phut-vi",
    "lang": "vi",
    "title": "Vì sao việc trì hoãn ngụm cà phê đầu tiên 90 phút sau khi ngủ dậy lại giúp bạn không bị đuối sức vào buổi chiều"
  },
  "triglyceride-hdl-ratio-metabolic-health": {
    "slug": "triglyceride-hdl-ratio-metabolic-health-en",
    "lang": "en",
    "title": "The Cardiovascular Code Part 3: The Golden Triglyceride to HDL Ratio: A Superior Window into Cardiometabolic Risk"
  },
  "triglyceride-hdl-ratio-metabolic-health-en": {
    "slug": "triglyceride-hdl-ratio-metabolic-health",
    "lang": "vi",
    "title": "Mật mã Tim mạch Phần 3: Tỉ số Vàng Triglyceride / HDL: Thước đo nhạy bén hơn cả xét nghiệm mỡ máu thông thường"
  },
  "tuyen-giap-va-bo-doi-vi-chat-selen-iod-vi-sao-so-lanh-u-e-oai-vi": {
    "slug": "thyroid-and-selenium-iodine-pair-why-cold-fatigue-en",
    "lang": "en",
    "title": "Thyroid and the Selenium-Iodine Duo: Why Fatigue and Cold Intolerance Persist Despite Sleep and Water"
  },
  "thyroid-and-selenium-iodine-pair-why-cold-fatigue-en": {
    "slug": "tuyen-giap-va-bo-doi-vi-chat-selen-iod-vi-sao-so-lanh-u-e-oai-vi",
    "lang": "vi",
    "title": "Tuyến giáp và bộ đôi vi chất Selen cùng I-ốt: Vì sao uống đủ nước, ngủ đủ giấc vẫn thấy uể oải sợ lạnh?"
  },
  "ty-le-1-1-giua-glycine-va-nac-phuc-hoi-glutathione-ty-the-vi": {
    "slug": "one-to-one-glycine-nac-ratio-mitochondrial-glutathione-en",
    "lang": "en",
    "title": "The 1:1 Glycine and NAC Ratio: Restoring Endogenous Glutathione and Mitochondrial Resilience Beyond Age 45"
  },
  "one-to-one-glycine-nac-ratio-mitochondrial-glutathione-en": {
    "slug": "ty-le-1-1-giua-glycine-va-nac-phuc-hoi-glutathione-ty-the-vi",
    "lang": "vi",
    "title": "Tỷ lệ 1:1 giữa Glycine và NAC: Đòn bẩy khôi phục Glutathione nội sinh và sức bền ty thể sau tuổi 45"
  },
  "ty-le-kali-natri-xua-tan-noi-lo-muoi-vi": {
    "slug": "potassium-sodium-ratio-blood-pressure-en",
    "lang": "en",
    "title": "The Potassium-to-Sodium Ratio: The Key to Unlocking Vascular Relief Without Extreme Salt Restriction"
  },
  "potassium-sodium-ratio-blood-pressure-en": {
    "slug": "ty-le-kali-natri-xua-tan-noi-lo-muoi-vi",
    "lang": "vi",
    "title": "Tỷ lệ Kali và Natri: Chìa khóa vàng giúp xả áp mạch máu mà không cần kiêng muối cực đoan"
  },
  "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day": {
    "slug": "drinking-water-before-meals-gastric-distension-metabolism",
    "lang": "en",
    "title": "Pre-Meal Water Preloading: Gastric Mechanoreceptor Distension and Metabolic Thermogenesis"
  },
  "drinking-water-before-meals-gastric-distension-metabolism": {
    "slug": "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day",
    "lang": "vi",
    "title": "Uống một ly nước trước bữa ăn: Cơ chế căng thành vị và khởi động chuyển hóa"
  },
  "uong-nuoc-da-lanh-sau-bua-an-nhieu-dau-mo-vi": {
    "slug": "drinking-ice-water-after-fatty-meals-en",
    "lang": "en",
    "title": "Drinking Ice Water After Fatty Meals: Clarifying Fat Solidification Myths and Gastric Impact"
  },
  "drinking-ice-water-after-fatty-meals-en": {
    "slug": "uong-nuoc-da-lanh-sau-bua-an-nhieu-dau-mo-vi",
    "lang": "vi",
    "title": "Uống nước đá lạnh sau bữa ăn nhiều dầu mỡ: Thực hư chuyện đông đặc mỡ và gánh nặng cho dạ dày"
  },
  "urolithin-a-mitophagy-don-dep-ty-the-phuc-hoi-suc-ben-vi": {
    "slug": "urolithin-a-mitophagy-mitochondrial-recycling-muscle-endurance-en",
    "lang": "en",
    "title": "Urolithin A and Mitophagy: Unlocking Cellular Endurance through Mitochondrial Recycling"
  },
  "urolithin-a-mitophagy-mitochondrial-recycling-muscle-endurance-en": {
    "slug": "urolithin-a-mitophagy-don-dep-ty-the-phuc-hoi-suc-ben-vi",
    "lang": "vi",
    "title": "Urolithin A và nghệ thuật dọn dẹp ty thể: Bí quyết tái tạo sức bền tế bào từ quả lựu"
  },
  "van-dong-va-te-bao-nk-phong-ngua-ung-thu-vi": {
    "slug": "exercise-and-nk-cells-cancer-prevention-en",
    "lang": "en",
    "title": "How muscle contraction activates NK patrol cells to eliminate early cancer cells"
  },
  "exercise-and-nk-cells-cancer-prevention-en": {
    "slug": "van-dong-va-te-bao-nk-phong-ngua-ung-thu-vi",
    "lang": "vi",
    "title": "Vận động cơ bắp kích hoạt đội tuần tra NK tiêu diệt mầm mống ung thư ra sao"
  },
  "vi-khuan-hp-caga-va-ung-thu-da-dau-vi": {
    "slug": "h-pylori-caga-toxin-gastric-cancer-en",
    "lang": "en",
    "title": "H. pylori and Gastric Cancer: The CagA Toxin Mechanism, Golden Treatment Window, and Protective Phytochemicals"
  },
  "h-pylori-caga-toxin-gastric-cancer-en": {
    "slug": "vi-khuan-hp-caga-va-ung-thu-da-dau-vi",
    "lang": "vi",
    "title": "Vi khuẩn HP và ung thư dạ dày: Độc tố CagA, thời điểm vàng điều trị và hoạt chất tự nhiên bảo vệ niêm mạc"
  },
  "virus-epstein-barr-va-da-xo-cung-bat-chuoc-phan-tu-vi": {
    "slug": "epstein-barr-virus-multiple-sclerosis-molecular-mimicry-en",
    "lang": "en",
    "title": "Epstein-Barr Virus and Molecular Mimicry: When the Immune System Confuses Neurons with Pathogens"
  },
  "epstein-barr-virus-multiple-sclerosis-molecular-mimicry-en": {
    "slug": "virus-epstein-barr-va-da-xo-cung-bat-chuoc-phan-tu-vi",
    "lang": "vi",
    "title": "Virus Epstein-Barr và hiện tượng bắt chước phân tử: Khi hệ miễn dịch nhầm lẫn tế bào thần kinh với kẻ thù"
  },
  "virus-hpv-va-co-che-vo-hieu-hoa-p53-vi": {
    "slug": "hpv-virus-and-p53-inactivation-mechanism-en",
    "lang": "en",
    "title": "HPV and cervical cancer: The molecular mechanism of p53 inactivation and the protective shield of vaccination"
  },
  "hpv-virus-and-p53-inactivation-mechanism-en": {
    "slug": "virus-hpv-va-co-che-vo-hieu-hoa-p53-vi",
    "lang": "vi",
    "title": "Virus HPV và ung thư cổ tử cung: Cơ chế phân tử vô hiệu hóa gen p53 và lá chắn bảo vệ từ vaccine"
  },
  "vitamin-d3-k2-mk7-chong-voi-hoa-dong-mach-vi": {
    "slug": "vitamin-d3-k2-mk7-arterial-calcification-en",
    "lang": "en",
    "title": "The calcification paradox: Molecular mechanisms of vitamin D3 combined with K2 MK-7 in mineral guidance and vascular protection"
  },
  "vitamin-d3-k2-mk7-arterial-calcification-en": {
    "slug": "vitamin-d3-k2-mk7-chong-voi-hoa-dong-mach-vi",
    "lang": "vi",
    "title": "Nghịch lý canxi hóa: Cơ chế phân tử của vitamin D3 kết hợp K2 MK-7 trong việc định hướng khoáng chất và bảo vệ hệ mạch"
  },
  "warburg-effect-cancer-metabolism": {
    "slug": "warburg-effect-cancer-metabolism-en",
    "lang": "en",
    "title": "The Cancer Code Part 1: The Warburg Effect & Malignant Glucose Addiction"
  },
  "warburg-effect-cancer-metabolism-en": {
    "slug": "warburg-effect-cancer-metabolism",
    "lang": "vi",
    "title": "Mật mã Ung thư Phần 1: Hiệu ứng Warburg & Cơn nghiện Glucose của Tế bào Ác tính"
  },
  "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau": {
    "slug": "sauna-bathing-cardiovascular-longevity-heat-shock-proteins",
    "lang": "en",
    "title": "Sauna Bathing and Cardiovascular Longevity: Heat Shock Proteins, Arterial Compliance, and Autonomic Fitness"
  },
  "sauna-bathing-cardiovascular-longevity-heat-shock-proteins": {
    "slug": "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau",
    "lang": "vi",
    "title": "Xông hơi Sauna: Lợi ích tim mạch, tăng tuần hoàn máu và protein sốc nhiệt HSP"
  }
};

export function resolveTwin(currentSlug: string): TwinInfo | null {
  if (TWIN_CATALOG[currentSlug]) {
    return TWIN_CATALOG[currentSlug];
  }

  // Runtime heuristic fallback for newly published articles
  if (currentSlug.endsWith("-vi")) {
    const enSlug = currentSlug.replace(/-vi$/, "-en");
    return {
      slug: enSlug,
      lang: "en",
      title: "English Edition"
    };
  }

  if (currentSlug.endsWith("-en")) {
    const viSlug = currentSlug.replace(/-en$/, "-vi");
    return {
      slug: viSlug,
      lang: "vi",
      title: "Phiên bản Tiếng Việt"
    };
  }

  return null;
}
