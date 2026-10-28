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
  "anh-sang-do-670nm-sac-pin-ty-the-vong-mac-vi": {
    "slug": "670nm-red-light-recharging-retinal-mitochondria-en",
    "lang": "en",
    "title": "670nm Red Light Therapy: Recharging Retinal Mitochondria and Reversing Visual Fatigue"
  },
  "670nm-red-light-recharging-retinal-mitochondria-en": {
    "slug": "quang-sinh-hoc-670nm-phuc-hoi-ty-the-vong-mac-vi",
    "lang": "vi",
    "title": "Quang sinh học 670 nm: Tái kích hoạt Cytochrome c Oxidase và cứu vãn suy thoái năng lượng võng mạc"
  },
  "anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi": {
    "slug": "blue-light-screen-time-disrupts-deep-sleep-en",
    "lang": "en",
    "title": "Screen Time Before Sleep: How Retinal ipRGCs Sabotage Deep Sleep Architecture"
  },
  "blue-light-screen-time-disrupts-deep-sleep-en": {
    "slug": "anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi",
    "lang": "vi",
    "title": "Lướt điện thoại ban đêm: Tế bào võng mạc ipRGC và bí mật giấc ngủ sâu"
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
  "co-che-ro-ri-ruot-va-xu-huong-viêm-he-thong-vi": {
    "slug": "leaky-gut-syndrome-and-systemic-inflammation-en",
    "lang": "en",
    "title": "Molecular mechanisms of leaky gut syndrome: Tight junction degradation and systemic chronic inflammation"
  },
  "leaky-gut-syndrome-and-systemic-inflammation-en": {
    "slug": "co-che-ro-ri-ruot-va-xu-huong-viêm-he-thong-vi",
    "lang": "vi",
    "title": "Cơ chế phân tử của hội chứng rò rỉ ruột: Sự suy giảm mối nối chặt tế bào và hệ lụy viêm hệ thống mạn tính"
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
  "di-bo-sau-an-giai-ma-chuyen-hoa-glut4-khong-can-insulin-vi": {
    "slug": "postprandial-walking-insulin-independent-glut4-glucose-clearance-en",
    "lang": "en",
    "title": "Ten-Minute Postprandial Walking: Decoding the Biological Key to Clearing Blood Glucose Without Relying on Insulin"
  },
  "postprandial-walking-insulin-independent-glut4-glucose-clearance-en": {
    "slug": "di-bo-sau-an-giai-ma-chuyen-hoa-glut4-khong-can-insulin-vi",
    "lang": "vi",
    "title": "Đi bộ 10 phút sau bữa ăn: Giải mã chiếc chìa khóa sinh học giúp cơ bắp dọn sạch đường huyết không cần Insulin"
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
  "khi-duong-lam-gion-lan-da-co-che-maillard-va-bi-quyet-bao-ve-collagen-vi": {
    "slug": "when-sugar-makes-skin-brittle-glycation-and-collagen-protection-en",
    "lang": "en",
    "title": "When Sugar Makes Skin Brittle: The Maillard Mechanism and Strategies to Preserve Collagen Elasticity"
  },
  "when-sugar-makes-skin-brittle-glycation-and-collagen-protection-en": {
    "slug": "khi-duong-lam-gion-lan-da-co-che-maillard-va-bi-quyet-bao-ve-collagen-vi",
    "lang": "vi",
    "title": "Khi đường làm giòn làn da: Cơ chế Maillard và bí quyết giữ gìn sự đàn hồi cho collagen"
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
  "moi-mat-vet-chan-chim-man-hinh-astaxanthin-vi": {
    "slug": "screen-eye-strain-crows-feet-astaxanthin-en",
    "lang": "en",
    "title": "Screen-Induced Eye Strain and Crow's Feet: How Blue Light Depletes the Macula and How Astaxanthin Restores Cellular Defense"
  },
  "screen-eye-strain-crows-feet-astaxanthin-en": {
    "slug": "moi-mat-vet-chan-chim-man-hinh-astaxanthin-vi",
    "lang": "vi",
    "title": "Mỏi mắt và vết chân chim do màn hình: Giải mã cơ chế ánh sáng xanh bào mòn điểm vàng và sức mạnh phục hồi của Astaxanthin"
  },
  "muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi": {
    "slug": "salt-blood-pressure-sodium-potassium-ratio-paradox-en",
    "lang": "en",
    "title": "Salt and Blood Pressure: Unraveling the Sodium-to-Potassium Ratio Paradox"
  },
  "salt-blood-pressure-sodium-potassium-ratio-paradox-en": {
    "slug": "muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi",
    "lang": "vi",
    "title": "Kiêng muối vẫn tăng huyết áp: Khám phá nghịch lý tỷ lệ Natri và Kali"
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
    "slug": "phosphatidylserine-and-dha-neuronal-membrane-en",
    "lang": "en",
    "title": "Phosphatidylserine and DHA in neuronal membranes: Synaptic transmission mechanisms and cognitive restoration in midlife decline"
  },
  "phosphatidylserine-and-dha-neuronal-membrane-en": {
    "slug": "phosphatidylserine-va-dha-mang-te-bao-than-kinh-vi",
    "lang": "vi",
    "title": "Phosphatidylserine và DHA màng tế bào thần kinh: Cơ chế truyền dẫn synap và phục hồi suy giảm nhận thức tuổi trung niên"
  },
  "phosphatidylserine-va-dha-mang-te-bao-than-kinh-vi": {
    "slug": "phosphatidylserine-and-dha-neuronal-membrane-en",
    "lang": "en",
    "title": "Phosphatidylserine and DHA in neuronal membranes: Synaptic transmission mechanisms and cognitive restoration in midlife decline"
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
  "quang-sinh-hoc-670nm-phuc-hoi-ty-the-vong-mac-vi": {
    "slug": "670nm-red-light-recharging-retinal-mitochondria-en",
    "lang": "en",
    "title": "670nm Red Light Therapy: Recharging Retinal Mitochondria and Reversing Visual Fatigue"
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
  "senolytics-fisetin-te-bao-gia-sasp-vi": {
    "slug": "clearing-zombie-cells-senolytics-and-microscopic-longevity-en",
    "lang": "en",
    "title": "Clearing zombie cells: Senolytics compounds and the mechanism of cellular rejuvenation"
  },
  "clearing-zombie-cells-senolytics-and-microscopic-longevity-en": {
    "slug": "thanh-loc-te-bao-zombie-senolytics-va-tuoi-tho-vi-mo-vi",
    "lang": "vi",
    "title": "Thanh lọc tế bào zombie: Hợp chất senolytics và cơ chế đảo ngược lão hóa tế bào"
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
  "tam-anh-nang-som-dieu-hoa-nhan-tren-cheo-vi": {
    "slug": "morning-sunlight-scd-circadian-reset-en",
    "lang": "en",
    "title": "Ten minutes of morning sunlight: Resetting the suprachiasmatic nucleus for daytime alertness and deep nocturnal sleep"
  },
  "morning-sunlight-scd-circadian-reset-en": {
    "slug": "tam-anh-nang-som-dieu-hoa-nhan-tren-cheo-vi",
    "lang": "vi",
    "title": "Tắm ánh nắng tự nhiên mười phút đầu ngày: Đặt lại đồng hồ sinh học tại nhân trên chéo để tỉnh táo ban ngày và ngủ sâu ban đêm"
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
  "thanh-loc-te-bao-zombie-senolytics-va-tuoi-tho-vi-mo-vi": {
    "slug": "clearing-zombie-cells-senolytics-and-microscopic-longevity-en",
    "lang": "en",
    "title": "Clearing zombie cells: Senolytics compounds and the mechanism of cellular rejuvenation"
  },
  "thu-tu-an-uong-glp1-duong-huyet-vi": {
    "slug": "meal-sequencing-glp1-glucose-en",
    "lang": "en",
    "title": "Scientific Meal Sequencing: The Secret to Flattening Glucose Spikes and Boosting Endogenous GLP-1"
  },
  "meal-sequencing-glp1-glucose-en": {
    "slug": "thu-tu-an-uong-glp1-duong-huyet-vi",
    "lang": "vi",
    "title": "Thứ tự ăn uống chuẩn khoa học: Bí quyết làm phẳng đường cong glucose và kích hoạt GLP-1 nội sinh"
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
  "ty-le-kali-natri-chia-khoa-thu-gian-mach-mau-vi": {
    "slug": "sodium-potassium-ratio-vascular-health-en",
    "lang": "en",
    "title": "The Sodium-Potassium Ratio: Unlocking Vascular Relaxation from the Dinner Table"
  },
  "sodium-potassium-ratio-vascular-health-en": {
    "slug": "ty-le-kali-natri-chia-khoa-thu-gian-mach-mau-vi",
    "lang": "vi",
    "title": "Tỷ lệ Kali và Natri: Chìa khóa thu giãn mạch máu từ mâm cơm gia đình"
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
  "urolithin-a-kich-hoat-mitophagy-phuc-hoi-co-bap-vi": {
    "slug": "urolithin-a-mitophagy-muscle-endurance-en",
    "lang": "en",
    "title": "Urolithin A from Pomegranate: Deciphering the NAD+ Independent Mitophagy Pathway for Muscle Recovery and Mitochondrial Longevity"
  },
  "urolithin-a-mitophagy-muscle-endurance-en": {
    "slug": "urolithin-a-kich-hoat-mitophagy-phuc-hoi-co-bap-vi",
    "lang": "vi",
    "title": "Urolithin A từ Quả Lựu: Cơ chế Kích hoạt Mitophagy Dọn dẹp Ty thể Độc lập với NAD+ Giúp Phục hồi Sức bền Cơ bắp"
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
  "vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi": {
    "slug": "why-eating-after-8pm-triggers-visceral-fat-storage-en",
    "lang": "en",
    "title": "Eating Dinner After 8 PM: Why Circadian Desynchrony Accelerates Visceral Fat Storage"
  },
  "why-eating-after-8pm-triggers-visceral-fat-storage-en": {
    "slug": "vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi",
    "lang": "vi",
    "title": "Ăn tối muộn sau 20 giờ: Chiếc bẫy sinh học khiến mỡ bụng tích tụ nhanh"
  },
  "vi-sao-ca-phe-sang-gay-sup-nguon-10h-vi": {
    "slug": "why-morning-coffee-causes-midmorning-crash-en",
    "lang": "en",
    "title": "Why does that 7 AM morning coffee trigger a sudden energy crash at 10 AM?"
  },
  "why-morning-coffee-causes-midmorning-crash-en": {
    "slug": "vi-sao-ca-phe-sang-gay-sup-nguon-10h-vi",
    "lang": "vi",
    "title": "Vì sao cốc cà phê lúc 7 giờ sáng lại khiến bạn sập nguồn vào lúc 10 giờ?"
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
