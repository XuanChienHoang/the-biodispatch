export interface LaymanMedicalPoint {
  term: string;
  layTerm: string;
  analogy: string;
}

export interface LaymanMedicalBoxData {
  title: string;
  hook: string;
  points: LaymanMedicalPoint[];
}

/**
 * Curated high-precision layman medical analogies for The BioDispatch corpus.
 * Keyed by post slug or root twin slug.
 */
export const CURATED_MEDICAL_ANALOGIES: Record<string, LaymanMedicalBoxData> = {
  // 1. GLP-1 and Mitochondria Longevity
  "glp1-keo-dai-tuoi-tho-nature": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Kéo Dài Tuổi Thọ Tế Bào",
    hook: "Giải mã cơ chế thuốc GLP-1 và ty thể mà không cần bằng cấp y sinh:",
    points: [
      {
        term: "Ty thể (Mitochondria)",
        layTerm: "Chiếc lò sưởi / Máy phát điện mini trong mỗi tế bào",
        analogy:
          "Ty thể đốt đường và mỡ để tạo năng lượng ATP cho bạn sống. Khi già đi, máy phát điện bị rỉ sét và xả khói đen độc hại (ROS) làm hỏng tế bào.",
      },
      {
        term: "Thực bào Ty thể (Mitophagy)",
        layTerm: "Đội ngũ công nhân vệ sinh nội bào dọn dẹp lò sưởi hỏng",
        analogy:
          "Thay vì để máy phát điện rỉ sét rò rỉ khói độc, tế bào gom chúng lại tiêu hủy và thay mới bằng lò phát điện sạch nguyên bản.",
      },
      {
        term: "Kích hoạt AMPK & Ức chế mTOR",
        layTerm: "Chế độ tiết kiệm pin và kích hoạt chu trình bảo dưỡng",
        analogy:
          "GLP-1 đánh lừa tế bào rằng đang trong chế độ nhịn ăn lành mạnh, khiến cơ thể tạm dừng xây dựng lãng phí để tập trung bảo trì sửa chữa máy móc.",
      },
    ],
  },
  "glp1-longevity-nature-mitochondria": {
    title: "Layman Medical Concept: 3 Pillars of Cellular Longevity",
    hook: "Deciphering GLP-1 receptor agonists and mitochondrial dynamics without a biomedical degree:",
    points: [
      {
        term: "Mitochondria",
        layTerm: "Microscopic power generators inside every cell",
        analogy:
          "Mitochondria burn glucose and fatty acids to produce ATP energy. As cells age, unmaintained generators spew toxic reactive oxygen species (ROS) smoke.",
      },
      {
        term: "Mitophagy",
        layTerm: "Cellular sanitation crew recycling rusted generators",
        analogy:
          "Instead of allowing leaky generators to foul the cellular cytoplasm, the cell swallows up degraded organelles and builds pristine new powerhouses.",
      },
      {
        term: "AMPK Activation & mTOR Inhibition",
        layTerm: "Battery-saver mode initiating deep maintenance routines",
        analogy:
          "GLP-1 mimics physiological energy scarcity, signalling the body to pause redundant expansion and invest heavily into restorative repair pathways.",
      },
    ],
  },

  // 2. Curcumin & Piperine Bioavailability
  "curcumin-piperine-sinh-kha-dung": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Khái niệm Sinh Hóa Cốt Lõi",
    hook: "Hiểu nhanh cơ chế hấp thu tinh chất nghệ và tiêu đen mà không cần bằng cấp y khoa:",
    points: [
      {
        term: "Sinh khả dụng (Bioavailability)",
        layTerm: "Tỷ lệ hoạt chất thực sự lọt vào máu",
        analogy:
          "Bạn uống 1000 mg nghệ nhưng gan và ruột loại bỏ tới 990 mg. Chỉ 10 mg vào được máu. 10 mg đó chính là sinh khả dụng (1%).",
      },
      {
        term: "Chuyển hóa Pha 2 (Glucuronidation qua UGT1A1)",
        layTerm: "Chiếc máy dán nhãn trục xuất tự động của lá gan",
        analogy:
          "Gan coi nghệ là chất lạ. Enzyme UGT1A1 gắn ngay một chiếc 'thẻ bài' (acid glucuronic) vào phân tử nghệ để cơ thể nhanh chóng bài tiết qua thận và mật.",
      },
      {
        term: "Piperine (Chiết xuất hạt tiêu đen)",
        layTerm: "Chiếc phanh sinh học kẹt tạm thời máy dán nhãn",
        analogy:
          "Piperine làm tạm dừng enzyme UGT1A1 trong 1–2 giờ. Trong thời gian lá gan bị 'phân tâm', nghệ tự do tràn vào mạch máu, giúp nồng độ tăng vọt gấp 20 lần.",
      },
    ],
  },
  "curcumin-piperine-bioavailability": {
    title: "Layman Medical Concept: 3 Core Biochemical Keys",
    hook: "Demystifying curcumin absorption and black pepper kinetics without medical training:",
    points: [
      {
        term: "Bioavailability",
        layTerm: "The actual percentage entering arterial circulation",
        analogy:
          "If you swallow 1,000 mg of raw turmeric, the gut and liver discard 990 mg. Only 10 mg ever reaches systemic blood. That 10 mg is bioavailability (1%).",
      },
      {
        term: "Phase II Glucuronidation (UGT1A1)",
        layTerm: "The liver's automated export-labeling machine",
        analogy:
          "The liver perceives curcumin as foreign cargo. UGT1A1 stamps an excretory glucuronide tag onto the molecule, expelling it through bile and kidneys.",
      },
      {
        term: "Piperine (Black Pepper Extract)",
        layTerm: "A reversible molecular brake on hepatic clearance",
        analogy:
          "Piperine temporarily pauses the UGT1A1 conveyor belt for 1–2 hours. While customs inspectors are distracted, free curcumin flows into circulation with a 2,000% surge.",
      },
    ],
  },

  // 3. Metabolomics Horizon
  "metabolomic-horizon-clinical-diagnostics-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Chuyển Hóa Học (Metabolomics) Là Gì?",
    hook: "Vì sao các bác sĩ hàng đầu thế giới đang chuyển dịch từ xét nghiệm gen sang đo đạc chất chuyển hóa:",
    points: [
      {
        term: "ADN (Genomics) vs Chất chuyển hóa (Metabolomics)",
        layTerm: "Bản vẽ trên giấy vs Đồng hồ đo tốc độ thực tế",
        analogy:
          "Bộ gen ADN cho biết cơ thể bạn CÓ THỂ mắc bệnh gì trong tương lai (bản vẽ thiết kế). Còn chất chuyển hóa cho biết cơ thể BẠN ĐANG VẬN HÀNH THẾ NÀO ngay hôm nay (khói bụi, nhiệt độ và xăng xe thực tế).",
      },
      {
        term: "TMAO (Trimethylamine N-oxide)",
        layTerm: "Khi vi khuẩn đường ruột phát tín hiệu xấu đến tim mạch",
        analogy:
          "Ăn nhiều thịt đỏ → vi khuẩn ruột tạo khí TMA → gan oxy hóa thành TMAO → làm viêm và xơ vữa thành mạch máu. Đo TMAO giúp chặn đứng xơ vữa trước khi nghẽn mạch.",
      },
      {
        term: "SCFA (Axit béo chuỗi ngắn: Butyrate)",
        layTerm: "Bữa tiệc thịnh soạn cho niêm mạc ruột",
        analogy:
          "Khi bạn ăn nhiều rau xanh và chất xơ, vi khuẩn có lợi lên men tạo ra Butyrate — chất này giống như lớp vữa xi măng hàn gắn các vết rò rỉ ở thành ruột, dập tắt các ổ viêm trong cơ thể.",
      },
    ],
  },
  "metabolomic-horizon-clinical-diagnostics": {
    title: "Layman Medical Concept: What is Metabolomics?",
    hook: "Why clinical medicine is shifting from static DNA testing to dynamic metabolic fingerprinting:",
    points: [
      {
        term: "Genomics vs. Metabolomics",
        layTerm: "Architectural blueprint vs. Real-time dashboard speedometer",
        analogy:
          "DNA sequencing shows what diseases you COULD develop (static blueprint). Metabolites reveal HOW YOUR ENGINE IS RUNNING right now (fuel, exhaust, and temperature).",
      },
      {
        term: "TMAO (Trimethylamine N-oxide)",
        layTerm: "When gut microbes send hazardous signals to vascular walls",
        analogy:
          "Excess red meat/carnitine feeds gut flora that produce TMA gas, converted by the liver into TMAO, instigating arterial inflammation and plaque formation.",
      },
      {
        term: "SCFA (Short-Chain Fatty Acids / Butyrate)",
        layTerm: "A restorative feast for colonic mucosal defense",
        analogy:
          "Beneficial microbes ferment prebiotic fiber into butyrate, which acts as sealing mortar across intestinal bricks to stop inflammatory endotoxin leaks.",
      },
    ],
  },

  // 4. Resistant Starch & Gut Barrier
  "resistant-starch-scfa-gut-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Tinh Bột Kháng & Hàng Rào Ruột",
    hook: "Cơ chế bảo vệ niêm mạc ruột chống viêm rò rỉ qua 3 khái niệm sinh học:",
    points: [
      {
        term: "Tinh bột kháng (Resistant Starch)",
        layTerm: "Kiện hàng bọc thép đi thẳng xuống đại tràng",
        analogy:
          "Dạ dày và ruột non không tiêu hóa được tinh bột kháng. Nó đi nguyên vẹn xuống đại tràng để trở thành nguồn thức ăn quý giá cho hệ vi sinh đường ruột.",
      },
      {
        term: "Khóa protein Claudin-1 & Occludin",
        layTerm: "Lớp vữa xi măng gắn kết các viên gạch tế bào",
        analogy:
          "Các tế bào biểu mô ruột xếp sát nhau như tường thành. Claudin-1 là lớp vữa niêm phong các kẽ hở, ngăn không cho độc tố vi khuẩn tràn vào máu.",
      },
      {
        term: "Axit béo Butyrate",
        layTerm: "Nhiên liệu vàng nuôi dưỡng lính canh tế bào",
        analogy:
          "Tế bào đại tràng tiêu thụ tới 70% năng lượng từ Butyrate. Đủ Butyrate, tế bào ruột khỏe mạnh và lớp vữa thành ruột được gia cố vững chắc.",
      },
    ],
  },
  "resistant-starch-scfa-gut-en": {
    title: "Layman Medical Concept: Resistant Starch & Gut Integrity",
    hook: "Preserving intestinal permeability through 3 essential biological mechanisms:",
    points: [
      {
        term: "Resistant Starch",
        layTerm: "Armored cargo passing intact into the colon",
        analogy:
          "Upper digestive enzymes cannot break down resistant starch; it arrives untouched in the large intestine to serve as premium feed for beneficial microbiota.",
      },
      {
        term: "Claudin-1 & Occludin Tight Junctions",
        layTerm: "The sealant mortar bonding intestinal epithelial bricks",
        analogy:
          "Colonic cells stand shoulder to shoulder like a defensive fortress. Claudin-1 proteins act as mortar, sealing fissures to keep endotoxins out of arterial blood.",
      },
      {
        term: "Microbial Butyrate",
        layTerm: "High-octane fuel for colonic barrier defenders",
        analogy:
          "Colonocytes derive over 70% of their daily energy directly from butyrate. Plentiful butyrate guarantees thick mucosal lining and low systemic inflammation.",
      },
    ],
  },

  // 5. Mevalonate Pathway, Statins & CoQ10
  "mevalonate-statin-coq10-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Ngã Ba Mevalonate & Thuốc Statin",
    hook: "Vì sao thuốc hạ mỡ máu lại gây cảm giác mỏi cơ bắp và cách khắc phục:",
    points: [
      {
        term: "Enzyme HMG-CoA Reductase",
        layTerm: "Chiếc van tổng kiểm soát ở đầu nguồn dòng chảy",
        analogy:
          "Thuốc Statin đóng chặt chiếc van này để giảm tổng hợp mỡ máu cholesterol, bảo vệ thành mạch vành khỏi xơ vữa.",
      },
      {
        term: "Ngã ba Mevalonate",
        layTerm: "Dòng sông rẽ đôi nhánh đi hai hướng",
        analogy:
          "Một nhánh nước tạo Cholesterol, nhưng nhánh còn lại tạo Coenzyme Q10 cho ty thể. Khi đóng van tổng, nhánh CoQ10 cũng vô tình bị khô cạn.",
      },
      {
        term: "Coenzyme Q10 (Ubiquinol)",
        layTerm: "Chất dẫn truyền tia lửa điện trong nhà máy ty thể",
        analogy:
          "Cạn kiệt CoQ10 khiến ty thể tế bào cơ bị đoản mạch năng lượng, gây đau mỏi cơ bắp. Bổ sung Ubiquinol giúp bù đắp lượng thiếu hụt này.",
      },
    ],
  },
  "mevalonate-statin-coq10-en": {
    title: "Layman Medical Concept: The Mevalonate Statin Conundrum",
    hook: "Why lipid-lowering statin therapy induces muscular fatigue and how pharmacology resolves it:",
    points: [
      {
        term: "HMG-CoA Reductase",
        layTerm: "The master control floodgate at the river's headwaters",
        analogy:
          "Statins clamp this enzyme shut to curb downstream cholesterol synthesis, safeguarding coronary vessels from arterial plaque accumulation.",
      },
      {
        term: "The Mevalonate Branch-Point",
        layTerm: "A major river diverging into two downstream tributaries",
        analogy:
          "One stream generates cholesterol, while the other manufactures Coenzyme Q10. Clamping the main floodgate inevitably dries up the CoQ10 tributary.",
      },
      {
        term: "Coenzyme Q10 (Ubiquinol)",
        layTerm: "The spark-plug carrier inside mitochondrial powerhouses",
        analogy:
          "CoQ10 depletion starves skeletal muscle mitochondria of electron transport capacity, sparking myalgia. Supplementing active ubiquinol restores energy flux.",
      },
    ],
  },

  // 6. Brown Fat UCP1 Proton Leak
  "chuyen-hoa-mo-nau-ucp1-ro-ri-proton": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Kích Hoạt Mỡ Nâu UCP1",
    hook: "Giải mã cơ chế 'rò rỉ proton' giúp đốt mỡ thừa và bảo vệ tế bào khỏi stress oxy hóa:",
    points: [
      {
        term: "Mô Mỡ Nâu (BAT vs WAT)",
        layTerm: "Lò sưởi sinh nhiệt tự nhiên đối lập với kho chứa mỡ trắng",
        analogy:
          "Mỡ trắng chỉ biết tích trữ calo khiến bạn thừa cân. Mỡ nâu chứa dày đặc ty thể, hoạt động như một lò sưởi chuyên đốt sạch mỡ thừa để tỏa nhiệt.",
      },
      {
        term: "Kênh UCP1 (Uncoupling Protein 1)",
        layTerm: "Cống xả lũ khẩn cấp giải phóng áp lực đập thủy điện",
        analogy:
          "Bình thường dòng proton phải qua tuabin ATP. UCP1 mở cống phụ cho proton chảy tự do, hạ điện thế màng để triệt tiêu 90% gốc tự do ROS gây lão hóa.",
      },
      {
        term: "Tiếp xúc lạnh chu kỳ (Cold Exposure)",
        layTerm: "Chiếc công tắc thần kinh bật sáng lò sưởi nội sinh",
        analogy:
          "Nhiệt độ mát (15–16°C) kích hoạt thụ thể Beta-3 qua norepinephrine, đánh thức enzyme PKA giải phóng acid béo tự do để mở toang van UCP1.",
      },
    ],
  },
  "brown-fat-ucp1-mitochondrial-proton-leak": {
    title: "Layman Medical Concept: 3 Keys to Brown Fat UCP1 Activation",
    hook: "Demystifying the mitochondrial proton leak that burns visceral fat and tames oxidative stress:",
    points: [
      {
        term: "Brown Adipose Tissue (BAT)",
        layTerm: "A metabolic furnace opposed to passive white fat storage",
        analogy:
          "White fat passively stores calories. Brown fat is densely packed with iron-rich mitochondria, functioning as an active thermogenic furnace.",
      },
      {
        term: "Uncoupling Protein 1 (UCP1)",
        layTerm: "An emergency hydroelectric spillway venting excess pressure",
        analogy:
          "Instead of forcing protons through the ATP turbine, UCP1 lets them leak harmlessly across the membrane, reducing ROS output by up to 90%.",
      },
      {
        term: "Cyclic Cold Exposure",
        layTerm: "The neural thermostat switch igniting the furnace",
        analogy:
          "Mild cold stimulus triggers beta-3 adrenergic receptors, releasing free fatty acids that displace purine inhibitors to open the UCP1 proton pore.",
      },
    ],
  },

  // 7. Cholesterol Myth & Vascular Inflammation
  "cholesterol-myth-vascular-inflammation": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Khái Niệm Giải Mã Huyền Thoại Cholesterol",
    hook: "Vì sao cholesterol không tự gây tắc mạch và bản chất thực sự của xơ vữa động mạch:",
    points: [
      {
        term: "Cholesterol toàn phần",
        layTerm: "Đội thợ cứu hỏa và vật liệu sửa chữa thành mạch",
        analogy:
          "Thấy lính cứu hỏa ở mọi đám cháy không có nghĩa họ là thủ phạm đốt nhà. Gan gửi cholesterol đến để vá vi tổn thương trên thành mạch đang bị viêm.",
      },
      {
        term: "Tổn thương Nội Mạc (Endothelial Injury)",
        layTerm: "Những vết rách xước trên lớp sơn bóng lòng mạch",
        analogy:
          "Đường huyết cao, khói thuốc và stress cào xước lòng mạch máu. Chỉ khi có vết xước viêm nhiễm này, các hạt mỡ mới bị mắc kẹt và bốc cháy.",
      },
      {
        term: "Hạt mỡ bị Oxy hóa (oxLDL)",
        layTerm: "Những thanh xà gồ bị gỉ sét biến thành bẫy viêm",
        analogy:
          "Hạt LDL bình thường di chuyển hiền hòa. Chỉ khi bị gốc tự do oxy hóa (gỉ sét), nó mới kích hoạt đại thực bào nuốt vào thành tế bào bọt xơ vữa.",
      },
    ],
  },
  "cholesterol-myth-vascular-inflammation-en": {
    title: "Layman Medical Concept: 3 Insights into the Cholesterol Paradox",
    hook: "Why circulating cholesterol cannot clog arteries without underlying vascular inflammation:",
    points: [
      {
        term: "Total Serum Cholesterol",
        layTerm: "Emergency structural firefighters dispatched to damaged vessels",
        analogy:
          "Seeing firefighters at every blaze does not mean they ignited the fire. The liver mobilizes cholesterol to patch micro-fissures in inflamed vascular lining.",
      },
      {
        term: "Endothelial Micro-Injury",
        layTerm: "Pits and scratches on the highway lining of the bloodstream",
        analogy:
          "Hyperglycemia, smoking toxins, and shear stress crack the arterial endothelium. Only at these inflamed fissures can circulating lipids become trapped.",
      },
      {
        term: "Oxidized LDL (oxLDL)",
        layTerm: "Rusted metallic debris triggering macrophage foam cells",
        analogy:
          "Normal buoyant LDL glides smoothly. Once oxidized by free radicals, it turns into inflammatory debris that transforms macrophages into atherosclerotic foam cells.",
      },
    ],
  },

  // 8. Glymphatic Brain Cleaning System
  "glymphatic-deep-sleep-brain-cleaning": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Chiếc Chìa Khóa 'Rửa Xe' Não Bộ Lúc Nửa Đêm",
    hook: "Hệ thống Glymphatic rửa trôi mảng rác Alzheimer Amyloid-Beta khi bạn ngủ sâu ra sao:",
    points: [
      {
        term: "Hệ thống Glymphatic",
        layTerm: "Đội xe bồn phun nước rửa đường ban đêm của não bộ",
        analogy:
          "Ban ngày giao thông đông đúc não không thể dọn dẹp. Đêm đến, các tế bào thần kinh co lại 60%, nhường chỗ cho dòng nước dịch não tủy cuốn phăng rác rưởi.",
      },
      {
        term: "Kênh nước Aquaporin-4 (AQP4)",
        layTerm: "Những chiếc vòi xịt nước cao áp gắn ở chân tế bào",
        analogy:
          "AQP4 phân bố dày đặc ở chân tế bào sao, hoạt động như đầu phun áp lực đẩy dòng dịch não tủy len lỏi vào từng ngóc ngách mô não để gột rửa độc tố.",
      },
      {
        term: "Mảnh rác Amyloid-Beta & Tau",
        layTerm: "Lớp bùn rác thải tích tụ làm tắc nghẽn mạng lưới thần kinh",
        analogy:
          "Đây là phế phẩm của tư duy ban ngày. Thiếu ngủ sâu khiến bùn rác ứ đọng lại, lâu dần đóng tảng phá hủy tế bào thần kinh gây bệnh Alzheimer.",
      },
    ],
  },
  "glymphatic-deep-sleep-brain-cleaning-en": {
    title: "Layman Medical Concept: 3 Keys to Nocturnal Brain Washing",
    hook: "How the glymphatic system clears Alzheimer's Amyloid-Beta plaques during slow-wave sleep:",
    points: [
      {
        term: "The Glymphatic System",
        layTerm: "Pressurized municipal street-sweeping trucks flushing midnight streets",
        analogy:
          "During waking hours, traffic is too heavy for municipal maintenance. In deep sleep, brain cells shrink by 60%, allowing cerebrospinal fluid to flush accumulated debris.",
      },
      {
        term: "Aquaporin-4 (AQP4) Channels",
        layTerm: "High-pressure directional water nozzles on astrocytic endfeet",
        analogy:
          "AQP4 water channels act like precision fire hoses, driving convective flow of cerebrospinal fluid through interstitial spaces to sweep away metabolites.",
      },
      {
        term: "Amyloid-Beta & Tau Protein",
        layTerm: "Toxic metabolic sludge choking neural communications",
        analogy:
          "Normal daytime cognitive activity generates metabolic byproduct sludge. Without deep sleep cleansing, this sludge aggregates into Alzheimer's plaques.",
      },
    ],
  },

  // 9. NAD+, CD38 & Sirtuins
  "nad-cd38-sirtuin-mitochondria-cellular-aging": {
    title: "Góc Y Khoa Dễ Hiểu: Cuộc Chiến Bảo Toàn Năng Lượng Ty Thể",
    hook: "Hiểu rõ tam giác NAD+, enzyme phá hoại CD38 và gen trường thọ Sirtuin:",
    points: [
      {
        term: "Phân tử NAD+",
        layTerm: "Dòng tiền mặt thanh khoản nuôi sống toàn bộ nhà máy tế bào",
        analogy:
          "NAD+ vận chuyển điện tử trong ty thể và là nhiên liệu duy nhất để các enzyme sửa chữa ADN hoạt động. Sau tuổi 50, lượng tiền mặt này bị bốc hơi một nửa.",
      },
      {
        term: "Enzyme CD38 (Kẻ trộm NAD+)",
        layTerm: "Gã kế toán biến chất ngốn sạch ngân quỹ công ty",
        analogy:
          "Khi cơ thể có ổ viêm mạn tính, CD38 tăng vọt gấp nhiều lần. Nó tiêu thụ hàng trăm phân tử NAD+ chỉ để tạo ra một phân tử tín hiệu vô dụng, làm cạn kiệt tế bào.",
      },
      {
        term: "Gen trường thọ Sirtuins (SIRT1/SIRT3)",
        layTerm: "Ban giám đốc đầu tư chiến lược bảo dưỡng ty thể",
        analogy:
          "Sirtuin cần NAD+ để xóa bỏ dấu vết lão hóa và kích thích sinh ty thể mới. Bịt lỗ rò CD38 giúp Sirtuin có đủ ngân sách để duy trì tuổi thọ thanh xuân.",
      },
    ],
  },
  "nad-cd38-sirtuin-mitochondria-cellular-aging-en": {
    title: "Layman Medical Concept: Preserving Cellular Energy Flux",
    hook: "Deconstructing the NAD+, CD38 thief, and Sirtuin longevity triad in human aging:",
    points: [
      {
        term: "NAD+ Coenzyme",
        layTerm: "The high-liquidity cash currency fueling all cellular operations",
        analogy:
          "NAD+ shuttles electrons into ATP synthesis and powers DNA repair enzymes. By age 50, systemic NAD+ reserves plummet by roughly 50%.",
      },
      {
        term: "The CD38 Glycohydrolase",
        layTerm: "A rogue accountant bleeding corporate reserves dry",
        analogy:
          "Chronic inflammation escalates CD38 expression. CD38 incinerates hundreds of NAD+ molecules merely to print out transient signaling tags, starving the cell.",
      },
      {
        term: "Sirtuins (SIRT1 / SIRT3)",
        layTerm: "The visionary executive board maintaining mitochondrial assets",
        analogy:
          "Sirtuins require abundant NAD+ to deacetylate metabolic enzymes and preserve mitochondrial health. Quelling CD38 restores their vital operating budget.",
      },
    ],
  },

  // 10. Warburg Effect & Cancer Metabolism
  "warburg-effect-cancer-metabolism": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Khái Niệm Về Cơn Nghiện Glucose Của Tế Bào Ung Thư",
    hook: "Vì sao tế bào ác tính từ chối cỗ máy ty thể hiệu quả để chọn con đường đốt đường thô sơ:",
    points: [
      {
        term: "Hiệu ứng Warburg (Aerobic Glycolysis)",
        layTerm: "Chiếc xe bỏ động cơ hybrid để chuyển sang đốt than xả khói đen",
        analogy:
          "Tế bào lành đốt 1 phân tử đường thu 36 ATP sạch trong ty thể. Tế bào ung thư đốt than thô sơ chỉ thu 2 ATP nhưng tạo ra hàng loạt mảnh gạch vụn để nhân đôi tế bào.",
      },
      {
        term: "Axit Lactic & Vi Môi Trường Toan Hóa",
        layTerm: "Hàng rào khói độc làm tê liệt các chiến sĩ cảnh sát miễn dịch",
        analogy:
          "Khói đen lactate xả ra làm môi trường xung quanh khối u bị chua loét (axit hóa). Axit này vô hiệu hóa tế bào T miễn dịch, dọn đường cho u xâm lấn mô lành.",
      },
      {
        term: "Cắt Cơn Nghiện Đường Bằng Dinh Dưỡng",
        layTerm: "Khóa chặt vòi cấp than để bỏ đói cỗ máy nhân đôi",
        analogy:
          "Tế bào ác tính cần đường gấp 10-20 lần tế bào bình thường. Ổn định đường huyết và nhịn ăn gián đoạn cắt nguồn nguyên liệu sản xuất vỏ bọc khối u.",
      },
    ],
  },
  "warburg-effect-cancer-metabolism-en": {
    title: "Layman Medical Concept: 3 Keys to Cancer's Sugar Addiction",
    hook: "Why malignant cells shun efficient mitochondria in favor of primitive aerobic glycolysis:",
    points: [
      {
        term: "The Warburg Effect",
        layTerm: "Trading a clean hybrid engine for a soot-spewing coal burner",
        analogy:
          "Healthy cells burn glucose into 36 clean ATPs via mitochondria. Tumors switch to inefficient glycolysis yielding only 2 ATP, but churning out molecular building blocks.",
      },
      {
        term: "Lactic Acid Acidification",
        layTerm: "A toxic smoke screen paralyzing immune patrol officers",
        analogy:
          "The tumor floods its perimeter with acidic lactate. This low pH incapacitates cytotoxic T cells and degrades tissue scaffolding, aiding invasion.",
      },
      {
        term: "Targeting Glucose Dependency",
        layTerm: "Cutting off the high-speed coal supply line",
        analogy:
          "Cancer cells consume glucose at 10-20x normal rates. Stabilizing glycemia and intermittent fasting restrict the metabolic precursors tumors need to double.",
      },
    ],
  },

  // 11. Triglyceride to HDL Ratio
  "triglyceride-hdl-ratio-metabolic-health": {
    title: "Góc Y Khoa Dễ Hiểu: Tỉ Số Vàng Triglyceride / HDL",
    hook: "Thước đo nhạy bén hơn cả xét nghiệm mỡ máu thông thường để phát hiện sớm xơ vữa:",
    points: [
      {
        term: "Chỉ số Triglyceride / HDL",
        layTerm: "Tỷ lệ giữa hàng hóa ùn ứ và số lượng xe tải dọn rác",
        analogy:
          "Triglyceride là mỡ thừa ùn ứ trong kho. HDL là xe tải dọn rác chở mỡ thừa về gan tiêu hủy. Tỉ số TG/HDL > 3 chứng tỏ kho hàng đã vỡ trận và tắc nghẽn nặng.",
      },
      {
        term: "Hạt mỡ sdLDL (Small Dense LDL)",
        layTerm: "Những viên bi sắt sắc nhọn đâm xuyên bờ đê thành mạch",
        analogy:
          "Khi tỉ số TG/HDL cao, cơ thể tràn ngập các hạt sdLDL nhỏ li ti. Chúng dễ dàng chui lọt qua kẽ tế bào thành mạch, bị oxy hóa và tạo mảng xơ vữa nguy hiểm.",
      },
      {
        term: "Kháng Insulin tại Gan",
        layTerm: "Cánh cửa kho từ chối nhận nhiên liệu khiến mỡ tràn vào máu",
        analogy:
          "Gan bị 'lờn' tín hiệu insulin, không ngừng tổng hợp và bơm hạt mỡ VLDL vào dòng máu, khiến Triglyceride tăng vọt còn HDL bị suy giảm nhanh chóng.",
      },
    ],
  },
  "triglyceride-hdl-ratio-metabolic-health-en": {
    title: "Layman Medical Concept: The Golden TG / HDL Ratio",
    hook: "A clinical marker far more predictive of cardiovascular events than total cholesterol alone:",
    points: [
      {
        term: "Triglyceride to HDL Ratio",
        layTerm: "The balance between overflowing cargo and garbage collection trucks",
        analogy:
          "Triglycerides represent surplus cargo accumulating in loading bays. HDL particles are cleanup trucks. A TG/HDL ratio > 3 signals severe systemic gridlock.",
      },
      {
        term: "Small Dense LDL (sdLDL)",
        layTerm: "Sharp miniature ball bearings piercing arterial embankments",
        analogy:
          "Elevated TG/HDL directly predicts an abundance of atherogenic sdLDL particles that slip into subendothelial cracks and trigger foam cell formation.",
      },
      {
        term: "Hepatic Insulin Resistance",
        layTerm: "A jammed warehouse door leaking excess fat into arterial transit",
        analogy:
          "De-sensitized liver cells continuously assemble and release triglyceride-rich VLDL into circulation while HDL particles are rapidly cleared and degraded.",
      },
    ],
  },

  // 12. Melatonin: Circadian Zeitgeber vs Sedative
  "melatonin-circadian-zeitgeber": {
    title: "Góc Y Khoa Dễ Hiểu: Melatonin - Người Chỉnh Nhịp Sinh Học",
    hook: "Vì sao melatonin không phải thuốc ngủ và giải mã nghịch lý liều 0.3 mg vs 10 mg:",
    points: [
      {
        term: "Melatonin (Chất dẫn nhịp Zeitgeber)",
        layTerm: "Người thư ký phát loa thông báo đã đến giờ tắt đèn",
        analogy:
          "Melatonin không ép bạn bất tỉnh như thuốc ngủ. Nó chỉ gửi tín hiệu thời gian cho toàn bộ tế bào biết bóng đêm đã đến để chuẩn bị hạ thân nhiệt đi ngủ.",
      },
      {
        term: "Nghịch lý Liều Dược lý (10 mg) vs Liều Sinh lý (0.3 mg)",
        layTerm: "Chiếc loa phóng thanh công suất khủng gây điếc tai",
        analogy:
          "Tuyến tùng tự nhiên chỉ tiết lượng tương đương 0.3 mg. Uống 5-10 mg làm thụ thể ngập lụt, gây trơ thụ thể khiến sáng hôm sau bạn thức dậy với đầu óc u mê.",
      },
      {
        term: "Nhân Trên Chéo (SCN) & Ánh Sáng Xanh",
        layTerm: "Đồng hồ tổng chỉ huy bị đánh lừa bởi mặt trời nhân tạo",
        analogy:
          "Màn hình điện thoại phát ánh sáng xanh bước sóng 480nm làm nhân SCN nghĩ vẫn đang là buổi trưa, lập tức khóa van tiết melatonin của tuyến tùng.",
      },
    ],
  },
  "melatonin-circadian-zeitgeber-en": {
    title: "Layman Medical Concept: Melatonin as a Circadian Zeitgeber",
    hook: "Why melatonin is a biological clock synchronizer rather than a chemical sedative:",
    points: [
      {
        term: "Circadian Zeitgeber",
        layTerm: "The executive secretary announcing closing time across the office",
        analogy:
          "Melatonin does not chemically knock your brain out. It quietly delivers a rhythmic temporal cue notifying organs to lower core body temperature for rest.",
      },
      {
        term: "0.3 mg Physiological vs. 10 mg Megadose Paradox",
        layTerm: "An industrial loudspeaker blaring until morning",
        analogy:
          "The pineal gland naturally releases roughly 0.3 mg. Taking 10 mg floods and desensitizes melatonin receptors, leaving you with heavy morning grogginess.",
      },
      {
        term: "Suprachiasmatic Nucleus (SCN) & Blue Light",
        layTerm: "The master pacemaker deceived by artificial daylight",
        analogy:
          "Screen light at 480 nm tricks the brain's SCN clock into believing it is high noon, immediately halting pineal melatonin secretion.",
      },
    ],
  },

  // 13. Sulforaphane & Nrf2 Window
  "sulforaphane-nrf2-window": {
    title: "Góc Y Khoa Dễ Hiểu: Cửa Sổ Kích Hoạt Nrf2 Từ Sulforaphane",
    hook: "Bí mật hóa học của cây súp lơ và vì sao luộc quá kỹ làm mất sạch dược tính:",
    points: [
      {
        term: "Glucoraphanin & Enzyme Myrosinase",
        layTerm: "Quả lựu đạn sinh học hai thành phần cần ngòi nổ",
        analogy:
          "Cây súp lơ giấu thuốc nổ ở một ngăn và ngòi nổ Myrosinase ở ngăn khác. Nhai nát hoặc băm nhỏ làm vỡ vách ngăn để hai chất gặp nhau sinh ra Sulforaphane.",
      },
      {
        term: "Nguyên tắc 'Cắt và Chờ 40 Phút'",
        layTerm: "Thời gian vàng để quả lựu đạn kịp kích nổ trước khi nấu",
        analogy:
          "Nhiệt độ sôi phá hủy enzyme ngòi nổ Myrosinase. Băm nhỏ súp lơ rồi để yên 40 phút giúp toàn bộ Sulforaphane được hình thành trọn vẹn trước khi xào nấu.",
      },
      {
        term: "Trục Keap1 - Nrf2",
        layTerm: "Chiếc còng số 8 giữ chân vị tổng chỉ huy giải độc tế bào",
        analogy:
          "Sulforaphane bẻ gãy chiếc còng Keap1, giải phóng Nrf2 bay thẳng vào nhân ADN để bật công tắc sản xuất hàng nghìn chất chống oxy hóa nội sinh bảo vệ cơ thể.",
      },
    ],
  },
  "sulforaphane-nrf2-window-en": {
    title: "Layman Medical Concept: Sulforaphane & the Nrf2 Antioxidant Window",
    hook: "The binary chemical warfare of cruciferous vegetables and how thermal cooking alters efficacy:",
    points: [
      {
        term: "Glucoraphanin & Myrosinase Enzyme",
        layTerm: "A binary chemical grenade requiring a separate detonator fuse",
        analogy:
          "Cruciferous plants store precursor glucoraphanin and detonator myrosinase in separate compartments. Mastication or chopping ruptures cells, synthesizing sulforaphane.",
      },
      {
        term: "The 'Chop & Hold' 40-Minute Protocol",
        layTerm: "The crucial window allowing complete enzymatic synthesis before heat",
        analogy:
          "Boiling water rapidly denatures fragile myrosinase proteins. Chopping raw broccoli and waiting 40 minutes lets sulforaphane fully generate prior to cooking.",
      },
      {
        term: "The Keap1-Nrf2 Master Switch",
        layTerm: "Cellular handcuffs tethering the master antioxidant commander",
        analogy:
          "Sulforaphane modifies cysteine sensors on Keap1 handcuffs, freeing Nrf2 to migrate into the cell nucleus and transcribe hundreds of detoxifying genes.",
      },
    ],
  },

  // 14. OxLDL, SdLDL & Atherosclerosis
  "oxldl-sdldl-atherosclerosis-mechanism": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Sát Thủ Giấu Mặt Gây Xơ Vữa Động Mạch",
    hook: "Phân biệt mỡ máu lành tính và những phân tử trực tiếp đục thủng thành mạch máu:",
    points: [
      {
        term: "Phân lớp Pattern A vs Pattern B",
        layTerm: "Quả bóng bãi biển xốp nhẹ vs Viên bi sắt sắc nhọn",
        analogy:
          "Pattern A là hạt LDL to xốp, trôi bồng bềnh không gây hại. Pattern B gồm các hạt sdLDL nhỏ đặc, dễ chui tọt qua khe nứt nội mạc để bám sâu vào thành mạch.",
      },
      {
        term: "Hạt mỡ gỉ sét oxLDL",
        layTerm: "Mồi lửa bốc cháy trong lòng thành mạch máu",
        analogy:
          "Hạt mỡ sau khi lọt vào thành mạch bị các gốc tự do oxy hóa (gỉ sét). Cơ thể nhận diện nó là dị vật nguy hiểm cần điều động đại thực bào đến xử lý.",
      },
      {
        term: "Tế bào Bọt (Foam Cells)",
        layTerm: "Lính cứu hỏa ăn no bội thực biến thành mảng vữa nghẽn mạch",
        analogy:
          "Đại thực bào nuốt không ngừng các hạt oxLDL gỉ sét cho đến khi phình to và chết đi, tạo thành ổ mủ bã đậu xơ vữa chèn ép dòng máu lưu thông.",
      },
    ],
  },
  "oxldl-sdldl-atherosclerosis-mechanism-en": {
    title: "Layman Medical Concept: 3 Silent Drivers of Atherosclerosis",
    hook: "Distinguishing harmless buoyant lipoproteins from aggressive vascular wall invaders:",
    points: [
      {
        term: "Pattern A vs. Pattern B Phenotypes",
        layTerm: "Buoyant beach balls vs. Dense steel ball bearings",
        analogy:
          "Pattern A consists of large, buoyant LDL that glides harmlessly. Pattern B features small dense LDL (sdLDL) that penetrates subendothelial junctions.",
      },
      {
        term: "Oxidized LDL (oxLDL)",
        layTerm: "Rusted sparks igniting an inflammatory wildfire in the vessel wall",
        analogy:
          "Trapped sdLDL undergoes free radical oxidation. The immune system identifies rusted oxLDL as toxic foreign debris and mobilizes scavengers.",
      },
      {
        term: "Atherogenic Foam Cells",
        layTerm: "Gorged scavenger cells dying into a calcified arterial blockage",
        analogy:
          "Macrophages engulf oxLDL without regulatory feedback until they burst into lipid-rich foam cells, generating the necrotic core of vulnerable plaques.",
      },
    ],
  },

  // 15. Pharmacokinetics One-Compartment Model
  "pharmacokinetics-one-compartment": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Tọa Độ Vàng Của Nồng Độ Thuốc Trong Máu",
    hook: "Cách cơ thể hấp thu và đào thải dược chất mà không cần công thức toán học phức tạp:",
    points: [
      {
        term: "Cmax (Nồng độ đỉnh trong máu)",
        layTerm: "Mực nước cao nhất sau khi mở vòi bơm",
        analogy:
          "Sau khi uống thuốc, nồng độ dược chất tăng dần đến đỉnh Cmax. Nếu Cmax quá cao sẽ gây độc cho gan thận, nếu quá thấp thuốc sẽ mất tác dụng.",
      },
      {
        term: "T1/2 (Thời gian bán thải)",
        layTerm: "Tốc độ chiếc cống ngầm xả hết một nửa hồ bơi",
        analogy:
          "Là thời gian cơ thể đào thải 50% lượng thuốc ra ngoài. Thuốc có T1/2 là 6 giờ thì sau 6 giờ nồng độ chỉ còn một nửa, quyết định bạn phải uống 1 hay 3 lần/ngày.",
      },
      {
        term: "AUC (Cửa sổ diện tích dưới đường cong)",
        layTerm: "Tổng khối lượng dược chất cơ thể thực sự hấp thụ được",
        analogy:
          "Đo lường toàn bộ thời gian và nồng độ thuốc lưu lại trong cơ thể. Thức ăn nhiều dầu mỡ có thể tăng AUC của thuốc tan trong dầu lên gấp 3-5 lần.",
      },
    ],
  },
  "pharmacokinetics-one-compartment-en": {
    title: "Layman Medical Concept: 3 Golden Coordinates of Pharmacokinetics",
    hook: "How the body absorbs, distributes, and clears pharmacological compounds:",
    points: [
      {
        term: "Cmax (Peak Concentration)",
        layTerm: "The high-water mark after opening the supply tap",
        analogy:
          "Following oral administration, active molecules crest at Cmax. Exceeding Cmax risks acute organ toxicity; failing to reach it renders therapy inert.",
      },
      {
        term: "Elimination Half-Life (T1/2)",
        layTerm: "The duration for the drainage valve to empty half the pool",
        analogy:
          "The time needed for metabolic enzymes and kidneys to eliminate 50% of circulating drug. A 6-hour half-life dictates a precise multi-dose regimen.",
      },
      {
        term: "Area Under the Curve (AUC)",
        layTerm: "Total cumulative systemic drug exposure over time",
        analogy:
          "AUC measures the full duration and depth of biological exposure. High-fat meals can boost the AUC of lipophilic agents by 300% to 500%.",
      },
    ],
  },

  // 16. Nobel Optogenetics
  "nobel-medicine-2026-optogenetics": {
    title: "Góc Y Khoa Dễ Hiểu: Khi Ánh Sáng Điều Khiển Tế Bào Thần Kinh",
    hook: "Giải mã phát kiến đoạt giải Nobel biến công tắc ánh sáng thành liệu pháp y sinh:",
    points: [
      {
        term: "Kênh quang học Channelrhodopsin",
        layTerm: "Chiếc công tắc điện nhạy sáng mượn từ loài tảo lục",
        analogy:
          "Các nhà khoa học lấy gen cảm nhận ánh sáng của tảo lục đưa vào tế bào não. Khi chiếu tia sáng xanh 470nm, kênh mở ra và nơ-ron lập tức phát xung điện.",
      },
      {
        term: "Độ chính xác miligiây (Millisecond Precision)",
        layTerm: "Cây bút laser vi phẫu đối lập với chiếc búa điện cực thô sơ",
        analogy:
          "Trước đây kích điện não giống như lấy búa đập cả bảng mạch điện thoại. Optogenetics giống như cây bút laser chỉ bật tắt duy nhất một bóng đèn mong muốn.",
      },
      {
        term: "Ứng dụng Điều trị Bệnh Não",
        layTerm: "Chiếc chìa khóa ngắt cơn co giật và phục hồi thị lực",
        analogy:
          "Cho phép bác sĩ dập tắt ổ động kinh ngay khi vừa chớm phát hỏa, hoặc kích hoạt tế bào võng mạc thoái hóa giúp người mù tìm lại ánh sáng.",
      },
    ],
  },
  "nobel-medicine-2026-optogenetics-en": {
    title: "Layman Medical Concept: Controlling Neural Circuits with Light",
    hook: "Deciphering the Nobel-winning breakthrough of optogenetic molecular switches:",
    points: [
      {
        term: "Channelrhodopsin-2 (ChR2)",
        layTerm: "A light-sensitive molecular switch borrowed from green algae",
        analogy:
          "Engineers transfer light-gated algal ion channels into neurons. Pulsing 470 nm blue light opens the channel, triggering immediate action potentials.",
      },
      {
        term: "Sub-Millisecond Precision",
        layTerm: "An optical laser scalpel replacing a crude electrical hammer",
        analogy:
          "Traditional electrodes shocked thousands of random cells simultaneously. Optogenetics acts like a precision laser activating one single chosen neuron.",
      },
      {
        term: "Clinical Translation",
        layTerm: "Silencing epileptic seizures and restoring functional vision",
        analogy:
          "Enables clinicians to optically quench epileptic storm centers in real time or reactivate photoreceptor-depleted retinas to restore sight.",
      },
    ],
  },

  // 17. Insulin, IGF-1 & Cancer Proliferation
  "insulin-igf1-cancer-proliferation": {
    title: "Góc Y Khoa Dễ Hiểu: Trục Insulin & Tăng Sinh Tế Bào Ác Tính",
    hook: "Vì sao nồng độ insulin cao liên tục hoạt động như bàn đạp chân ga của khối u:",
    points: [
      {
        term: "Trục Insulin - IGF-1",
        layTerm: "Luồng gió oxy khổng lồ thổi bùng ngọn lửa nhân đôi tế bào",
        analogy:
          "Đột biến ADN chỉ là que diêm bén lửa. Nồng độ insulin và IGF-1 cao quanh năm chính là luồng gió oxy thổi bùng tế bào ác tính phân chia không ngừng.",
      },
      {
        term: "Con đường PI3K / Akt / mTOR",
        layTerm: "Bàn đạp chân ga bị đạp lút sàn mà chiếc phanh đã bị tháo",
        analogy:
          "Khi insulin gắn vào thụ thể, chuỗi tín hiệu này ra lệnh cho tế bào cấm tự hủy (apoptosis), ép tế bào tiêu thụ gấp đôi dưỡng chất để tăng kích thước.",
      },
      {
        term: "Giải pháp Hạ Nhiệt Trục Insulin",
        layTerm: "Thả chân ga và kích hoạt chế độ bảo trì dọn dẹp nội bào",
        analogy:
          "Nhịn ăn gián đoạn và giảm đường tinh bột làm mức insulin tụt xuống mức nền, buộc cơ thể bật công tắc autophagy dọn sạch các tế bào hỏng hóc.",
      },
    ],
  },
  "insulin-igf1-cancer-proliferation-en": {
    title: "Layman Medical Concept: The Insulin-IGF1 Malignancy Axis",
    hook: "Why chronic hyperinsulinemia acts as an unrestrained biological gas pedal:",
    points: [
      {
        term: "The Insulin - IGF-1 Cascade",
        layTerm: "A continuous oxygen blast feeding an smoldering mutation fire",
        analogy:
          "DNA mutations are merely stray sparks. Chronically elevated insulin and IGF-1 levels fan those sparks into uninhibited, exponential tumor proliferation.",
      },
      {
        term: "The PI3K / Akt / mTOR Highway",
        layTerm: "An accelerator pedal pinned to the floor with severed brakes",
        analogy:
          "Insulin receptor binding activates PI3K/Akt signaling, blocking programmed cell death (apoptosis) and forcing cells into relentless biomass accumulation.",
      },
      {
        term: "Clinical Downregulation",
        layTerm: "Lifting off the gas pedal to trigger cellular autophagy",
        analogy:
          "Targeted intermittent fasting and low-glycemic eating drop basal insulin, signaling cells to pause growth and initiate lysosomal cleanup.",
      },
    ],
  },

  // 18. Succinate & Creatine Futile Cycle
  "succinate-creatine-bat-thermogenesis-vi": {
    title: "Góc Y Khoa Dễ Hiểu: Chu Trình Creatine Vô Nghĩa & Đốt Mỡ Nâu",
    hook: "Kỷ nguyên sinh nhiệt mới của mỡ nâu vượt qua giới hạn của kênh UCP1:",
    points: [
      {
        term: "Chu trình Creatine vô nghĩa (Futile Cycle)",
        layTerm: "Chiếc máy bơm nước chạy không tải tỏa nhiệt cực lớn",
        analogy:
          "Tế bào liên tục gắn phosphate vào creatine rồi lại bẻ gãy ngay lập tức. Quá trình này không sinh công cơ học mà tiêu tốn năng lượng để tỏa ra nhiệt ấm.",
      },
      {
        term: "Phân tử Succinate nội sinh",
        layTerm: "Chất phụ gia turbo làm quay máy bơm với tốc độ tối đa",
        analogy:
          "Khi tiếp xúc lạnh, succinate tràn vào ty thể và được oxy hóa chớp nhoáng qua Phức hợp II, thúc đẩy cỗ máy sinh nhiệt hoạt động với công suất gấp 3 lần.",
      },
      {
        term: "Sinh nhiệt độc lập với UCP1",
        layTerm: "Kế hoạch B sưởi ấm cơ thể ngay cả khi van chính bị hỏng",
        analogy:
          "Nghiên cứu chứng minh chuột thiếu UCP1 vẫn không bị hạ thân nhiệt nhờ chu trình creatine. Đây là hy vọng mới để bào chế thuốc trị béo phì ở người trưởng thành.",
      },
    ],
  },
  "succinate-creatine-bat-thermogenesis-en": {
    title: "Layman Medical Concept: Creatine Futile Cycling & Fat Thermogenesis",
    hook: "The next-generation non-shivering thermogenesis pathway operating beyond UCP1:",
    points: [
      {
        term: "The Creatine Futile Cycle",
        layTerm: "An idling water pump engine generating immense friction heat",
        analogy:
          "Mitochondria continuously phosphorylate creatine only to immediately hydrolyze it. This futile loop performs no physical work, dissipating calories directly as heat.",
      },
      {
        term: "Succinate Accumulation",
        layTerm: "A high-octane turbo additive accelerating the idling pump",
        analogy:
          "Cold stimulation causes systemic succinate uptake, rapidly oxidized through Complex II to supercharge the thermogenic futile cycle.",
      },
      {
        term: "UCP1-Independent Thermogenesis",
        layTerm: "Plan B heating system functioning even without primary vents",
        analogy:
          "Even in adult humans with low classical UCP1 expression, creatine cycling provides an alternative pathway to burn visceral fat and combat metabolic decline.",
      },
    ],
  },

  // 19. Succinate UCP1 Thermogenesis Axis
  "succinate-ucp1-bat-sinh-nhiet-ty-the": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Của Trục Succinate - UCP1",
    hook: "Cơ chế phân tử biến mô mỡ nâu thành lò đốt calo sinh nhiệt tối thượng:",
    points: [
      {
        term: "Chất chuyển hóa Succinate",
        layTerm: "Viên than hoạt tính đốt cháy tức thì trong lò sưởi",
        analogy:
          "Succinate từ máu được vận chuyển thẳng vào ty thể mỡ nâu, kích nổ chuỗi truyền điện tử qua Phức hợp II để cung cấp dòng năng lượng cực lớn cho sinh nhiệt.",
      },
      {
        term: "Đợt bùng phát ROS có kiểm soát",
        layTerm: "Tia lửa tín hiệu bật sáng dàn đèn của nhà xưởng",
        analogy:
          "Gốc tự do ROS không phải lúc nào cũng xấu. Một lượng nhỏ ROS tạo ra từ succinate đóng vai trò như sứ giả tín hiệu ra lệnh mở toang kênh UCP1.",
      },
      {
        term: "Mất ghép cặp chuỗi điện tử (Uncoupling)",
        layTerm: "Mở van xả áp biến toàn bộ động năng thành hơi ấm",
        analogy:
          "Thay vì quay máy phát điện ATP, proton thoát qua UCP1 biến năng lượng dự trữ của mỡ thừa thành nhiệt lượng sưởi ấm toàn cơ thể.",
      },
    ],
  },
  "succinate-ucp1-bat-mitochondrial-thermogenesis": {
    title: "Layman Medical Concept: 3 Keys to the Succinate - UCP1 Axis",
    hook: "How the mitochondrial electron transport chain turns brown fat into a calorie incinerator:",
    points: [
      {
        term: "Succinate Metabolite",
        layTerm: "Pure chemical fuel directly igniting the inner mitochondrial furnace",
        analogy:
          "Succinate enters brown adipocytes via MCT transport, delivering high-density reducing equivalents directly to Complex II to fuel non-shivering heat.",
      },
      {
        term: "Physiological ROS Burst",
        layTerm: "A controlled flare signal triggering emergency cellular valves",
        analogy:
          "Transient reactive oxygen species (ROS) produced by succinate oxidation act not as destructive toxins, but as critical cues unlocking UCP1 proton pores.",
      },
      {
        term: "Proton Uncoupling",
        layTerm: "Venting the steam turbine to generate pure thermal comfort",
        analogy:
          "Protons bypass ATP synthase, dissipating electrochemical gradients directly into heat and accelerating substrate clearance from blood.",
      },
    ],
  },

  // 20. Butyrate & Gut Epigenetics
  "butyrate-scfa-epigenetics-histone-gut-barrier": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Chiếc Chìa Khóa Hàn Gắn Niêm Mạc Ruột",
    hook: "Vì sao Butyrate vừa là thức ăn nuôi tế bào ruột vừa là sứ giả hòa bình miễn dịch:",
    points: [
      {
        term: "Nhiên liệu độc quyền Colonocyte",
        layTerm: "Thức ăn cao cấp ưa thích duy nhất của tế bào ruột già",
        analogy:
          "Tế bào biểu mô ruột không màng đến đường glucose trong máu. Chúng cần hấp thụ trực tiếp Butyrate do vi khuẩn lên men để có sức đứng vững làm lá chắn.",
      },
      {
        term: "Ức chế Histone Deacetylase (HDAC)",
        layTerm: "Chiếc chìa khóa mở cuộn sách di truyền chống viêm",
        analogy:
          "Butyrate nới lỏng các cuộn ADN bị đóng chặt, cho phép tế bào đọc mã gen để sản xuất tế bào T điều hòa (Treg), dẹp yên các phản ứng dị ứng và viêm ruột.",
      },
      {
        term: "Gia cố mối nối chặt (Tight Junctions)",
        layTerm: "Lớp keo dán kín tường thành ngăn độc tố rò rỉ vào máu",
        analogy:
          "Kích thích sản sinh protein Claudin và Zonula Occludens, bịt kín các kẽ hở giữa các tế bào để ngăn độc tố vi khuẩn LPS tràn vào mạch máu gây viêm toàn thân.",
      },
    ],
  },
  "butyrate-scfa-epigenetics-histone-gut-barrier-en": {
    title: "Layman Medical Concept: 3 Keys to Butyrate Gut Epigenetics",
    hook: "How short-chain fatty acids nourish colonic lining and orchestrate immune tolerance:",
    points: [
      {
        term: "Colonocyte Energetics",
        layTerm: "The exclusive metabolic fuel sustaining colonic lining cells",
        analogy:
          "Colonic epithelial cells shun arterial glucose, relying upon luminal microbial butyrate for over 70% of their baseline energetic maintenance.",
      },
      {
        term: "Epigenetic HDAC Inhibition",
        layTerm: "Unrolling genomic blueprints to foster mucosal peace",
        analogy:
          "Butyrate inhibits histone deacetylases, allowing transcription of Foxp3 to expand regulatory T cells and extinguish autoimmune inflammation.",
      },
      {
        term: "Tight Junction Reinforcement",
        layTerm: "Waterproof sealant bonding intestinal barrier bricks",
        analogy:
          "Upregulates Claudin-1 and Occludin proteins, sealing intercellular fissures against lipopolysaccharide (LPS) endotoxin leakage into the bloodstream.",
      },
    ],
  },

  // 21. Cancer Seed and Soil
  "cancer-seed-and-soil-metabolism": {
    title: "Góc Y Khoa Dễ Hiểu: Hạt Giống & Thổ Nhưỡng Của Khối U",
    hook: "Hiểu đúng giả thuyết kinh điển của Stephen Paget: Vì sao môi trường mô quyết định số phận ung thư:",
    points: [
      {
        term: "Hạt giống (Tế bào đột biến gen)",
        layTerm: "Những hạt cỏ dại bay lơ lửng trong không khí",
        analogy:
          "Cơ thể sinh ra hàng nghìn tế bào đột biến mỗi ngày. Nhưng nếu rơi vào mảnh đất cằn cỗi có đủ oxy và miễn dịch khỏe mạnh, hạt cỏ không thể bén rễ.",
      },
      {
        term: "Thổ nhưỡng (Vi môi trường mô u - TME)",
        layTerm: "Khu vườn bị bỏ hoang, úng ngập và đất đai chua loét",
        analogy:
          "Mô bị viêm mạn tính, ứ đọng đường và thiếu oxy chính là mảnh đất màu mỡ để hạt mầm ung thư bám rễ, phát triển mạch máu mới và di căn.",
      },
      {
        term: "Cải tạo Thổ nhưỡng (Soil Rehabilitation)",
        layTerm: "Xới đất, thoát nước và nhổ sạch cỏ dại cho khu vườn",
        analogy:
          "Bên cạnh việc dùng hóa trị diệt hạt giống, việc cải tạo lối sống, dập tắt ổ viêm và tăng cường oxy hóa giúp mảnh đất không còn phù hợp cho u sinh sống.",
      },
    ],
  },
  "cancer-seed-and-soil-metabolism-en": {
    title: "Layman Medical Concept: The Seed & Soil Tumor Paradigm",
    hook: "Stephen Paget's timeless ecological insight: Why tissue terrain dictates malignant destiny:",
    points: [
      {
        term: "The Seed (Mutant Cells)",
        layTerm: "Airborne weed seeds carried by the breeze",
        analogy:
          "Somatic mutations arise daily in tissues. On healthy, oxygenated ground with active immune surveillance, rogue seeds fail to take root and die off.",
      },
      {
        term: "The Soil (Tumor Microenvironment)",
        layTerm: "A neglected garden saturated with acidic water and rot",
        analogy:
          "Hypoxic, chronically inflamed, glucose-rich tissue terrain forms the hospitable soil that invites neoangiogenesis and metastatic colonization.",
      },
      {
        term: "Terrain Rehabilitation",
        layTerm: "Aerating, draining, and weeding the soil landscape",
        analogy:
          "Rather than solely attacking mutant seeds with cytotoxicity, normalizing tissue metabolic terrain removes the permissive habitat tumors depend upon.",
      },
    ],
  },

  // 22. AMPK, Nrf2, mTOR & NF-kB Master Map
  "ampk-nrf2-mtor-map": {
    title: "Góc Y Khoa Dễ Hiểu: Bản Đồ 4 Công Tắc Trẻ Hóa Tế Bào",
    hook: "Điều phối nhịp điệu sinh học của cỗ xe tế bào giữa chế độ tăng trưởng và tự bảo dưỡng:",
    points: [
      {
        term: "mTOR vs AMPK",
        layTerm: "Bàn đạp chân ga tăng tốc vs Chiếc phanh hãm bảo dưỡng",
        analogy:
          "mTOR thúc đẩy tế bào xây dựng cơ bắp và lớn lên. AMPK là phanh an toàn buộc tế bào tạm ngừng chi tiêu để dọn dẹp rác rưởi nội bào khi cạn năng lượng.",
      },
      {
        term: "Nrf2",
        layTerm: "Hệ thống làm mát và dàn máy lọc khí thải tự động",
        analogy:
          "Khi động cơ tế bào hoạt động sinh ra khói độc gốc tự do, Nrf2 được kích hoạt để khởi động hàng trăm nhà máy sản xuất chất chống oxy hóa nội sinh.",
      },
      {
        term: "NF-κB",
        layTerm: "Hệ thống còi báo động khẩn cấp khi có giặc tấn công",
        analogy:
          "NF-κB phát động phản ứng viêm cứu mạng khi nhiễm trùng. Nhưng nếu còi báo động rú liên tục ngày đêm, chính nó sẽ phá hủy các cấu trúc khỏe mạnh.",
      },
    ],
  },
  "ampk-nrf2-mtor-map-en": {
    title: "Layman Medical Concept: The 4 Cellular Master Nodes",
    hook: "Orchestrating the biochemical rhythm between cellular expansion and deep restorative repair:",
    points: [
      {
        term: "mTOR vs. AMPK",
        layTerm: "The acceleration gas pedal vs. The regenerative brake system",
        analogy:
          "mTOR drives protein synthesis and biomass growth. AMPK acts as an energy sensor that brakes expansion to initiate deep recycling and autophagy.",
      },
      {
        term: "Nrf2 Master Regulator",
        layTerm: "The automatic catalytic converter filtering out toxic exhaust",
        analogy:
          "As mitochondrial combustion produces reactive byproducts, Nrf2 transcription translocates into DNA to deploy an army of endogenous antioxidants.",
      },
      {
        term: "NF-κB Inflammatory Hub",
        layTerm: "The municipal emergency siren sounding invasion alerts",
        analogy:
          "NF-κB orchestrates acute immune rescue. However, when the alarm wails unabated day and night, chronic inflammation destroys healthy bystander tissue.",
      },
    ],
  },

  // 23. Forecasting hs-CRP Delta
  "forecasting-hs-crp-delta": {
    title: "Góc Y Khoa Dễ Hiểu: Đo Lường Ngọn Lửa Viêm hs-CRP",
    hook: "Vì sao chỉ số viêm nhạy cao hs-CRP dự báo nguy cơ nhồi máu cơ tim chính xác hơn mỡ máu:",
    points: [
      {
        term: "Chỉ số hs-CRP (High-Sensitivity C-Reactive Protein)",
        layTerm: "Chiếc nhiệt kế đo độ nóng của ngọn lửa viêm trong lòng mạch",
        analogy:
          "hs-CRP là protein do gan phóng thích khi có ổ viêm. Cholesterol là củi khô, còn hs-CRP chính là que diêm cháy: có củi mà không có diêm thì đống củi không thể nổ bùng.",
      },
      {
        term: "Độ Bất Ổn Của Mảng Xơ Vữa (Plaque Vulnerability)",
        layTerm: "Vỏ trứng mỏng manh chứa đầy mủ bã đậu bên trong",
        analogy:
          "Khi hs-CRP cao (> 3 mg/L), các enzyme viêm bào mòn lớp vỏ bọc collagen của mảng xơ vữa, khiến nó dễ nứt vỡ tạo cục máu đông gây đột quỵ bất ngờ.",
      },
      {
        term: "Can Thiệp Đa Mô Thức Hạ Viêm",
        layTerm: "Dập tắt que diêm bằng dinh dưỡng và lối sống thực chứng",
        analogy:
          "Kết hợp Omega-3 EPA, Curcumin chuẩn hóa và giảm mỡ nội tạng giúp hạ hs-CRP xuống < 1 mg/L, biến mảng xơ vữa từ bất ổn thành khối hóa đá an toàn.",
      },
    ],
  },
  "forecasting-hs-crp-delta-en": {
    title: "Layman Medical Concept: The hs-CRP Vascular Flame",
    hook: "Why high-sensitivity C-reactive protein predicts cardiovascular risk beyond lipid panels alone:",
    points: [
      {
        term: "High-Sensitivity CRP (hs-CRP)",
        layTerm: "The sensitive clinical thermometer registering vascular inflammation",
        analogy:
          "The liver synthesizes hs-CRP during active inflammation. Cholesterol is dry timber; hs-CRP represents flying sparks. Timber without sparks cannot explode.",
      },
      {
        term: "Atherosclerotic Plaque Vulnerability",
        layTerm: "A fragile eggshell cap concealing a volatile necrotic core",
        analogy:
          "When hs-CRP rises above 3 mg/L, inflammatory metalloproteinases degrade the fibrous cap, priming the plaque for sudden rupture and coronary thrombosis.",
      },
      {
        term: "Multimodal Anti-Inflammatory Intervention",
        layTerm: "Dousing the sparks through evidence-based lifestyle levers",
        analogy:
          "Targeted EPA omega-3s, bioavailable curcumin, and visceral fat reduction reliably suppress hs-CRP below 1 mg/L, stabilizing arterial architecture.",
      },
    ],
  },

  // 24. Supplement - Drug Interaction Matrix
  "supplement-drug-interaction-matrix": {
    title: "Góc Y Khoa Dễ Hiểu: Ma Trận Tương Tác Thảo Dược & Thuốc Tây",
    hook: "Vì sao uống tùy tiện thực phẩm chức năng cùng thuốc kê đơn có thể gây nguy hiểm:",
    points: [
      {
        term: "Họ Enzyme Gan Cytochrome P450 (CYP3A4)",
        layTerm: "Các cổng soát vé xử lý và cho phép xe thuốc rời cơ thể",
        analogy:
          "Gan dùng hệ enzyme này để phân hủy và đào thải thuốc tây. Bất kỳ chất nào làm kẹt cổng hoặc mở toang cổng đều làm đảo lộn nồng độ thuốc trong máu.",
      },
      {
        term: "Cảm ứng Enzyme (Induction - như Cỏ Ban Âu)",
        layTerm: "Người đốc thúc mở toang cửa quét sạch thuốc ra ngoài",
        analogy:
          "Khiến gan phân hủy thuốc quá nhanh. Thuốc hạ áp hay ngừa thai bị tống khứ khỏi máu trước khi kịp phát huy tác dụng, dẫn đến thất bại điều trị.",
      },
      {
        term: "Ức chế Enzyme (Inhibition - như Nước Bưởi Chùm, Piperine)",
        layTerm: "Dựng rào chắn chặn cổng khiến xe thuốc ùn ứ quá mức",
        analogy:
          "Khóa chặt cổng đào thải khiến thuốc tích tụ gấp 3-5 lần trong máu. Một viên thuốc hạ mỡ máu statin có thể biến thành liều độc làm hoại tử cơ vân.",
      },
    ],
  },
  "supplement-drug-interaction-matrix-en": {
    title: "Layman Medical Concept: Herb-Drug Metabolic Interactions",
    hook: "Why combining dietary botanicals with prescription medications can trigger toxic overdoses:",
    points: [
      {
        term: "Hepatic Cytochrome P450 Enzymes",
        layTerm: "Clearance tollbooths managing prescription drug traffic",
        analogy:
          "The liver relies on enzymes like CYP3A4 to break down medications. Anything altering tollgate throughput destabilizes target drug levels in blood.",
      },
      {
        term: "Enzymatic Induction (e.g., St. John's Wort)",
        layTerm: "Aggressive wardens throwing tollgates wide open prematurely",
        analogy:
          "Accelerates drug degradation so rapidly that cardiovascular drugs or oral contraceptives are flushed out before ever achieving therapeutic targets.",
      },
      {
        term: "Enzymatic Inhibition (e.g., Grapefruit, Piperine)",
        layTerm: "Heavy barricades trapping medication molecules in transit",
        analogy:
          "Stops hepatic clearance cold. Prescription statins or anticoagulants accumulate 300% to 500% above safety limits, risking acute organ toxicity.",
      },
    ],
  },

  // 25. Policosanol vs Statins
  "policosanol-versus-statins": {
    title: "Góc Y Khoa Dễ Hiểu: Đánh Giá Lại Policosanol & Thuốc Statin",
    hook: "Bài học sâu sắc về tính khách quan và khả năng tái lập trong y sinh thực chứng:",
    points: [
      {
        term: "Policosanol (Chiết xuất sáp mía)",
        layTerm: "Hoạt chất từng được ca ngợi là 'thần dược' hạ mỡ máu tự nhiên",
        analogy:
          "Các thử nghiệm ban đầu tại Cuba báo cáo hiệu quả ngang ngửa Statin. Nhưng khi các viện nghiên cứu độc lập ở Đức và Mỹ kiểm tra lại, hiệu quả hoàn toàn biến mất.",
      },
      {
        term: "Khả Năng Tái Lập Độc Lập (Reproducibility)",
        layTerm: "Chiếc thước đo chân lý của khoa học quốc tế",
        analogy:
          "Một phát minh chỉ đáng tin khi bất kỳ phòng lab độc lập nào trên thế giới cũng làm ra kết quả tương tự. Nếu chỉ tỏa sáng ở nơi sinh ra nó, kết quả đó vô giá trị.",
      },
      {
        term: "Men Gạo Đỏ (Monacolin K)",
        layTerm: "Bản sao tự nhiên thực sự có cấu trúc giống hệt Lovastatin",
        analogy:
          "Khác với Policosanol, Men gạo đỏ chứa hoạt chất ức chế men gan thực sự, nhưng cần kiểm soát độc tố nấm mốc citrinin để bảo đảm an toàn cho thận.",
      },
    ],
  },
  "policosanol-versus-statins-en": {
    title: "Layman Medical Concept: Re-evaluating Policosanol & Statins",
    hook: "A foundational masterclass in independent scientific reproducibility and evidence grading:",
    points: [
      {
        term: "Policosanol (Sugar Cane Wax)",
        layTerm: "The botanical lipid-lowering panacea that vanished under scrutiny",
        analogy:
          "Early single-center trials hailed it as equal to statins. Yet when rigorously tested in randomized European and US clinical cohorts, efficacy was zero.",
      },
      {
        term: "Independent Reproducibility",
        layTerm: "The universal gold standard separating reality from institutional bias",
        analogy:
          "A biomedical claim is only valid if independent teams duplicate it across the globe. If an effect disappears beyond institutional borders, it cannot be trusted.",
      },
      {
        term: "Red Yeast Rice (Monacolin K)",
        layTerm: "A genuine natural structural analogue to pharmaceutical statins",
        analogy:
          "Unlike policosanol, red yeast rice genuinely inhibits HMG-CoA reductase, though clinical formulations require strict monitoring for nephrotoxic citrinin.",
      },
    ],
  },
};

/**
 * Normalizes any slug (removing language suffixes or aliases) to find a match.
 */
export function getCuratedAnalogy(slug: string): LaymanMedicalBoxData | null {
  if (CURATED_MEDICAL_ANALOGIES[slug]) {
    return CURATED_MEDICAL_ANALOGIES[slug];
  }

  // Try matching via root twins
  const baseRoot = slug.replace(/-(vi|en)$/, "");
  if (CURATED_MEDICAL_ANALOGIES[baseRoot]) {
    return CURATED_MEDICAL_ANALOGIES[baseRoot];
  }
  if (CURATED_MEDICAL_ANALOGIES[`${baseRoot}-vi`]) {
    return CURATED_MEDICAL_ANALOGIES[`${baseRoot}-vi`];
  }
  if (CURATED_MEDICAL_ANALOGIES[`${baseRoot}-en`]) {
    return CURATED_MEDICAL_ANALOGIES[`${baseRoot}-en`];
  }

  return null;
}
