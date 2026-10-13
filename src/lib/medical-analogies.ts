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
 * Curated high-precision layman medical analogies for Phytocodex corpus.
 * Keyed by post slug or root twin slug.
 */
export const CURATED_MEDICAL_ANALOGIES: Record<string, LaymanMedicalBoxData> = {
  // 0. Yersinia pestis & T3SS Virulence
  "dich-hach-yersinia-pestis-t3ss-doc-luc-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Độc Lực Của Vi Khuẩn Dịch Hạch",
    hook: "Giải mã cơ chế 'chiếc kim tiêm phân tử' T3SS hạ gục đại thực bào mà không cần bằng cấp y khoa:",
    points: [
      {
        term: "Hệ thống Bơm độc T3SS (Type III Secretion System)",
        layTerm: "Chiếc thang kim tiêm siêu vi xuyên thủng tường thành",
        analogy:
          "Vi khuẩn áp sát và cắm thẳng một chiếc kim rỗng vào tế bào miễn dịch để bơm độc tố vào buồng chỉ huy mà kháng thể trong máu không thể can thiệp.",
      },
      {
        term: "Kho vũ khí Độc tố Yop (YopH, YopE, YopJ)",
        layTerm: "Chất độc làm đông cứng pháo đài và cắt đứt còi báo động",
        analogy:
          "YopH và YopE phá hủy khung xương tế bào khiến bạch cầu bị liệt chân giả không thể thực bào; YopJ khóa van NF-κB chặn đứng còi báo động cytokine.",
      },
      {
        term: "Thể Phổi Nguyên Phát (Pneumonic Plague)",
        layTerm: "Cuộc tập kích đường thở với cửa sổ cấp cứu 24 giờ",
        analogy:
          "Khi hít phải qua không khí, vi khuẩn nhân đôi âm thầm trong 24 giờ đầu trước khi bùng phát cơn bão cytokine hoại tử phổi, đòi hỏi kháng sinh tức thì.",
      },
    ],
  },
  "yersinia-pestis-t3ss-virulence-lab-leak-en": {
    title: "Layman Medical Concept: 3 Virulence Keys of Yersinia pestis",
    hook: "Deconstructing the Type III molecular syringe and immune paralysis without technical jargon:",
    points: [
      {
        term: "Type III Secretion Injectisome (T3SS)",
        layTerm: "A nanoscale hypodermic syringe piercing leukocyte walls",
        analogy:
          "Y. pestis docks against immune cells and deploys a hollow needle to pump cytotoxic effectors directly into the host cytosol, bypassing circulating antibodies.",
      },
      {
        term: "The Cytotoxic Yop Arsenal (YopH, YopE, YopJ)",
        layTerm: "Molecular saboteurs freezing cellular defenses and alarms",
        analogy:
          "YopH/YopE depolymerize the actin cytoskeleton to paralyze phagocytosis, while YopJ silences NF-κB to prevent alarm cytokine release.",
      },
      {
        term: "Primary Pneumonic Plague Aerosol",
        layTerm: "A high-velocity respiratory strike with a 24-hour golden window",
        analogy:
          "Inhaled bacteria replicate silently for 24 hours before unleashing fatal alveolar hemorrhage, requiring prompt antibiotic intervention within hours.",
      },
    ],
  },

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
  "an-rau-truoc-com-kiem-soat-duong-huyet-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Rau củ giàu chất xơ",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Chất xơ hòa tan trong rau xanh khi vào ruột giống như chiếc lưới mắt cáo phủ lên niêm mạc; nó làm chậm dòng chảy của đường vào máu thay vì để đường ùa vào tự do.",
      },
      {
        term: "Hình thành lớp gel nhầy trong ruột non",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Đường huyết tăng thoai thoải không gây buồn ngủ",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "eating-vegetables-before-carbs-flattens-glucose-spikes-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Rau củ giàu chất xơ",
        layTerm: "Primary physiological trigger",
        analogy: "Soluble dietary fiber acts like a fine molecular mesh lining the intestinal wall, slowing glucose absorption instead of allowing sugar to flood the bloodstream unchecked.",
      },
      {
        term: "Hình thành lớp gel nhầy trong ruột non",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Đường huyết tăng thoai thoải không gây buồn ngủ",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Bóng tối kích hoạt tuyến tùng tiết Melatonin",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Ăn tối muộn giống như bạn chuyển hàng tới một nhà kho đã khóa cổng và tắt đèn; nhân viên không bốc dỡ vào dây chuyền sản xuất được nên đành chất đống tạm vào bãi rác nội tạng.",
      },
      {
        term: "Melatonin gắn thụ thể MT1/MT2 trên tế bào beta tụy",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Chuyển hướng tích trữ vào mỡ nội tạng gan và bụng",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "why-eating-after-8pm-triggers-visceral-fat-storage-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Bóng tối kích hoạt tuyến tùng tiết Melatonin",
        layTerm: "Primary physiological trigger",
        analogy: "Eating late at night is like delivering raw inventory to a factory after closing time; with assembly lines dormant, raw materials get abandoned in deep visceral storage lockers.",
      },
      {
        term: "Melatonin gắn thụ thể MT1/MT2 trên tế bào beta tụy",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Chuyển hướng tích trữ vào mỡ nội tạng gan và bụng",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "giam-tao-truoc-bua-an-giam-duong-huyet-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Uống giấm táo pha loãng trước ăn",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Acid acetic trong giấm giống như một chiếc kẹp tạm thời kẹp vào chiếc kéo cắt tinh bột trong ruột; nó làm kéo cắt chậm lại giúp đường giải phóng từ từ.",
      },
      {
        term: "Acid Acetic ức chế men Alpha-Amylase và Disaccharidase",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Hút đường vào cơ không cần quá nhiều Insulin",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "apple-cider-vinegar-before-meals-glucose-blunting-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Uống giấm táo pha loãng trước ăn",
        layTerm: "Primary physiological trigger",
        analogy: "Acetic acid acts like a temporary safety clamp on digestive molecular shears, slowing carbohydrate cleavage so glucose enters the bloodstream at an orderly pace.",
      },
      {
        term: "Acid Acetic ức chế men Alpha-Amylase và Disaccharidase",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Hút đường vào cơ không cần quá nhiều Insulin",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Ánh sáng xanh 460-480nm xuyên qua mắt",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Nhìn vào màn hình điện thoại trong bóng tối giống như bạn chĩa một ngọn hải đăng rực rỡ vào mắt; các tế bào cảm quang lập tức bấm chuông báo thức khiến não tưởng trời đang đứng bóng trưa.",
      },
      {
        term: "Kích hoạt tế bào hạch võng mạc nhạy quang ipRGC",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Melatonin bị chặn đứng, ngủ chập chờn",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "blue-light-screen-time-disrupts-deep-sleep-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Ánh sáng xanh 460-480nm xuyên qua mắt",
        layTerm: "Primary physiological trigger",
        analogy: "Staring at a bright screen in a pitch-black bedroom is like beaming a miniature lighthouse directly onto your retina; your circadian pacemaker assumes it is noon and cancels nocturnal cleanup.",
      },
      {
        term: "Kích hoạt tế bào hạch võng mạc nhạy quang ipRGC",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Melatonin bị chặn đứng, ngủ chập chờn",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Uống trà xanh giàu L-Theanine & Caffeine",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Caffeine trong trà giống như bàn đạp ga phóng nhanh về phía trước, trong khi L-Theanine là chiếc phanh tái sinh mượt mà; cả hai phối hợp biến năng lượng thành một chuyến đi êm ái.",
      },
      {
        term: "L-Theanine vượt qua hàng rào máu não trong 30 phút",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Tập trung sâu điềm tĩnh, không lo âu bồn chồn",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "green-tea-l-theanine-and-caffeine-smooth-focus-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Uống trà xanh giàu L-Theanine & Caffeine",
        layTerm: "Primary physiological trigger",
        analogy: "Caffeine acts like an accelerator pedal, while L-Theanine functions as a precision hydraulic brake; together they engineer high cognitive velocity without engine overheating.",
      },
      {
        term: "L-Theanine vượt qua hàng rào máu não trong 30 phút",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Tập trung sâu điềm tĩnh, không lo âu bồn chồn",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Vận động mạnh đổ nhiều mồ hôi mất nước & Natri",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Tế bào cơ thể giống như một quả dưa hấu ngâm trong nước muối; nếu bạn đột ngột đổ toàn nước lã vào, nước sẽ ùa vào trong làm dưa úng nước và trương phình.",
      },
      {
        term: "Uống ồ ạt nước lọc không khoáng",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Chuột rút, đau đầu, mệt mỏi uể oải",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "hydration-electrolytes-cellular-osmosis-workout-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Vận động mạnh đổ nhiều mồ hôi mất nước & Natri",
        layTerm: "Primary physiological trigger",
        analogy: "Your cells behave like delicate water balloons suspended in a saline bath; flooding the outer fluid with pure fresh water forces water inward until the balloons stretch and strain.",
      },
      {
        term: "Uống ồ ạt nước lọc không khoáng",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Chuột rút, đau đầu, mệt mỏi uể oải",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Tắm nước ấm 40-42°C trước giờ ngủ 90 phút",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Tắm nước ấm giống như bạn mở tung các cánh cửa sổ ở tầng trên để hơi nóng trong nhà thoát hết ra ngoài; chỉ ít phút sau, toàn bộ căn phòng sẽ mát lạnh dễ chịu.",
      },
      {
        term: "Giãn nở các mao mạch đầu chi tại bàn tay và bàn chân",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Kích hoạt trung tâm điều hòa giấc ngủ tại vùng dưới đồi",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "warm-bath-effect-on-core-body-temperature-sleep-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Tắm nước ấm 40-42°C trước giờ ngủ 90 phút",
        layTerm: "Primary physiological trigger",
        analogy: "A warm bath acts like opening all the upstairs thermal windows in a house; dumping heat through the roof cools down the entire living room within minutes.",
      },
      {
        term: "Giãn nở các mao mạch đầu chi tại bàn tay và bàn chân",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Kích hoạt trung tâm điều hòa giấc ngủ tại vùng dưới đồi",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Khẩu phần ăn thiếu rau củ giàu Kali",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Natri và Kali giống như hai bên của một chiếc bập bênh áp lực; thay vì chỉ cố hạ bên Natri xuống, bạn chỉ cần nâng bên Kali lên là chiếc bập bênh sẽ lập tức cân bằng hoàn hảo.",
      },
      {
        term: "Tỉ số Na+/K+ trong máu tăng cao",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Huyết áp tâm thu và tâm trương tăng vọt",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "salt-blood-pressure-sodium-potassium-ratio-paradox-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Khẩu phần ăn thiếu rau củ giàu Kali",
        layTerm: "Primary physiological trigger",
        analogy: "Sodium and Potassium function like opposite seats on a vascular seesaw; rather than obsessively cutting sodium, elevating dietary potassium naturally restores hemodynamic balance.",
      },
      {
        term: "Tỉ số Na+/K+ trong máu tăng cao",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Huyết áp tâm thu và tâm trương tăng vọt",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Cơm nóng được làm mát qua đêm ở 4°C",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Làm lạnh cơm giống như việc cuộn chặt những sợi len tinh bột thành một cuộn len thắt nút; chiếc kéo enzyme ở dạ dày không cắt được nên cuộn len đi thẳng xuống đại tràng đãi tiệc lợi khuẩn.",
      },
      {
        term: "Phân tử Amylose kết tinh lại thành Tinh bột Kháng RS3",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Hàn gắn hàng rào ruột, giảm 50% đỉnh đường huyết",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "resistant-starch-cold-rice-gut-microbiome-scfa-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Cơm nóng được làm mát qua đêm ở 4°C",
        layTerm: "Primary physiological trigger",
        analogy: "Chilling cooked starch is like tying loose yarn into tightly coiled cryptographic knots; digestive enzymes fail to untangle them, allowing whole bundles to reach colon bacteria.",
      },
      {
        term: "Phân tử Amylose kết tinh lại thành Tinh bột Kháng RS3",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Hàn gắn hàng rào ruột, giảm 50% đỉnh đường huyết",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },
  "di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {
        term: "Bữa ăn xong, đường huyết bắt đầu dâng cao",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "Đi bộ sau ăn giống như bạn mở một con mương thoát nước phụ ngay khi đập thủy điện xả lũ; nước đường lập tức tràn vào tưới mát cánh đồng cơ bắp mà không làm vỡ bờ đê mạch máu.",
      },
      {
        term: "Đi bộ nhẹ 10-15 phút",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      },
      {
        term: "Đường huyết hạ sâu êm dịu, bảo vệ tuyến tụy",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      },
    ],
  },
  "ten-minute-post-meal-walk-glucose-clearance-en": {
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {
        term: "Bữa ăn xong, đường huyết bắt đầu dâng cao",
        layTerm: "Primary physiological trigger",
        analogy: "Walking after dinner acts like opening an auxiliary irrigation channel right as a reservoir overflows; excess glucose drains directly into muscular soil without breaching vascular riverbanks.",
      },
      {
        term: "Đi bộ nhẹ 10-15 phút",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      },
      {
        term: "Đường huyết hạ sâu êm dịu, bảo vệ tuyến tụy",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      },
    ],
  },

  // Batch 2 Curated Medical Analogies
  "nhai-ky-no-lau-giam-calo": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Tín Hiệu Khi Nhai Kỹ",
    hook: "Giải mã cơ chế 'phanh hồi tràng' và hormone no tự nhiên mà không cần dược phẩm:",
    points: [
      {
        term: "Cửa sổ trễ 20 phút của tế bào nội tiết L",
        layTerm: "Độ trễ truyền tin từ ruột non lên não bộ",
        analogy: "Giống như việc bưu tá cần 15-20 phút chuyển thư từ kho hàng tá tràng về trung tâm chỉ huy vùng dưới đồi; ăn quá nhanh khiến bạn nạp thừa calo trước khi bức thư báo no kịp tới nơi."
      },
      {
        term: "Phản xạ cơ học màng nha chu (Periodontal Ligament)",
        layTerm: "Cảm biến áp lực nhai khởi động men tiêu hóa",
        analogy: "Mỗi nhịp nghiền răng kích hoạt dây thần kinh số V như công tắc mở vòi phun enzyme amylase và lipase nước bọt, giúp dạ dày không phải gồng mình co bóp thức ăn thô."
      },
      {
        term: "Hormone PYY và GLP-1 (Ileal Brake)",
        layTerm: "Chiếc phanh tự nhiên kiểm soát khẩu phần",
        analogy: "Khi thức ăn nghiền mịn chạm tới ruột non, PYY và GLP-1 được phóng thích như van hãm từ từ đóng lại, dập tắt hormone báo đói Ghrelin và giúp bạn dừng ăn thanh thản."
      }
    ]
  },
  "chewing-slowly-satiety-gut-hormones": {
    title: "Layman Medical Concept: 3 Pillars of Masticatory Satiety",
    hook: "Deconstructing the 20-minute ileal endocrine brake without pharmacological jargon:",
    points: [
      {
        term: "The 20-Minute Enteroendocrine Latency Window",
        layTerm: "Neuro-humoral delay between gut contact and hypothalamic satiety",
        analogy: "Like a courier requiring 20 minutes to transport delivery receipts from the ileal depot to the cerebral command tower; bolting meals leaves the brain blind to energy influx until overconsumption occurs."
      },
      {
        term: "Periodontal Mechanoreceptor Reflexes",
        layTerm: "Bite-pressure sensors jumpstarting digestive chemistry",
        analogy: "Each rhythmic chewing compression fires trigeminal pulses triggering cephalic salivary enzymes, relieving downstream gastric parietal cells of excessive acid burden."
      },
      {
        term: "The Anorexigenic PYY & GLP-1 Cascade",
        layTerm: "The biological brake pad extinguishing hunger",
        analogy: "As finely emulsified chyme enters the distal gut, L-cells flood circulation with PYY and GLP-1, applying gentle friction against orexigenic Ghrelin circuits."
      }
    ]
  },

  "ngu-trua-20-phut-phuc-hoi-tim-mach": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Bước Xả Tải Cho Trái Tim Khi Chợp Mắt",
    hook: "Hiểu rõ cơ chế phục hồi huyết động và cắt đứt stress mạch máu trong 20 phút:",
    points: [
      {
        term: "Chuyển dịch sang Phó giao cảm (Vagal Tone)",
        layTerm: "Chuyển từ chế độ rượt đuổi sang chế độ sạc pin",
        analogy: "Khi nhắm mắt thả lỏng, dây thần kinh phế vị xả acetylcholine làm chậm nhịp tim 10 nhịp/phút, giống như hạ chân ga khi xe vừa chạy đường dài."
      },
      {
        term: "Hạ áp lực hậu tải thất trái (Left Ventricular Offloading)",
        layTerm: "Mở rộng van thoát nước để giảm áp lực cho máy bơm",
        analogy: "Các tiểu động mạch ngoại vi giãn nở, huyết áp tâm thu hạ 5-10 mmHg, giúp quả tim được co bóp êm dịu mà không phải chống lại lực cản mạch máu xơ cứng."
      },
      {
        term: "Dọn dẹp Adenosine vỏ não trước pha SWS",
        layTerm: "Quét sạch rác thần kinh mà không rơi vào bẫy ngủ say",
        analogy: "Chợp mắt 20 phút chỉ dừng lại ở giấc ngủ nông N2, dọn dẹp bớt chất gây buồn ngủ adenosine mà không rơi vào giấc ngủ sâu delta, giúp bạn thức dậy tỉnh táo ngay lập tức."
      }
    ]
  },
  "power-nap-cardiovascular-health-blood-pressure": {
    title: "Layman Medical Concept: 3 Hemodynamic Resets of a Power Nap",
    hook: "Understanding left ventricular offloading and autonomic recalibration in 20 minutes:",
    points: [
      {
        term: "Parasympathetic Vagal Dominance Shift",
        layTerm: "Downshifting from high-rev acceleration to biological idle",
        analogy: "Closing your eyes commands the vagus nerve to release acetylcholine onto sinoatrial pacemakers, easing cardiac chronotropic workload by 8-15 beats per minute."
      },
      {
        term: "Left Ventricular Afterload Reduction",
        layTerm: "Opening relief valves to unburden the myocardial pump",
        analogy: "Peripheral resistance arterioles relax, dropping mean arterial pressure 5-10 mmHg and shielding coronary endothelium from chronic high-velocity shear stress."
      },
      {
        term: "Adenosine Clearance Prior to Slow-Wave Sleep",
        layTerm: "Purging cerebral fatigue without triggering sleep inertia",
        analogy: "Capping sleep at 20 minutes clears receptor-bound adenosine within Stage N2 while bypassing delta-wave Stage N3, ensuring instantaneous executive sharpness upon waking."
      }
    ]
  },

  "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Nút Bật Sinh Học Của Ánh Nắng Sáng",
    hook: "Cơ chế quang sinh học kích hoạt đốt mỡ và đồng bộ hóa nhịp ngày đêm:",
    points: [
      {
        term: "Sắc tố quang học Melanopsin trên tế bào ipRGC",
        layTerm: "Bộ ăng-ten bắt sóng ánh sáng xanh tự nhiên",
        analogy: "Mắt bạn có một dàn ăng-ten cổ xưa chuyên thu nhận quang tử ánh sáng mặt trời 480nm, gửi xung điện thẳng về đồng hồ trung tâm SCN mà không cần tạo hình ảnh thị giác."
      },
      {
        term: "Kích hoạt phản ứng Cortisol Thức giấc (CAR)",
        layTerm: "Cú hích sinh học khởi động cỗ máy năng lượng",
        analogy: "Ánh sáng sớm kích thích tuyến thượng thận xả một đỉnh cortisol lành mạnh lúc 8:00 sáng, nâng thân nhiệt và đánh thức các tế bào đốt mỡ thay vì tích tụ mỡ bụng."
      },
      {
        term: "Cài đặt bộ đếm giờ Melatonin 14 tiếng",
        layTerm: "Lên dây cót cho một giấc ngủ sâu ban đêm",
        analogy: "Dập tắt melatonin dư thừa lúc 7:00 sáng chính là hành động hẹn giờ chính xác: đúng 14 tiếng sau vào lúc 21:00 tối, cơn sóng melatonin tự nhiên sẽ đưa bạn vào giấc ngủ êm đềm."
      }
    ]
  },
  "morning-sunlight-circadian-clock-metabolism": {
    title: "Layman Medical Concept: 3 Photobiological Triggers of Morning Sun",
    hook: "How early ambient photons govern central clock genes and metabolic fat burning:",
    points: [
      {
        term: "Retinal Melanopsin (ipRGC) Photoreception",
        layTerm: "Non-visual biological photon sensors wired to the clock",
        analogy: "Your retinas harbor specialized 480nm blue-wavelength antennas that transmit instantaneous reset signals to the hypothalamic master clock without image-processing lag."
      },
      {
        term: "The Healthy Cortisol Awakening Peak (CAR)",
        layTerm: "The biological ignition key energizing resting metabolism",
        analogy: "Early sunlight prompts a physiological morning cortisol peak, raising core temperature and activating adipose tissue lipolysis for sustained daytime vigor."
      },
      {
        term: "The 14-Hour Melatonin Night Timer",
        layTerm: "Winding the neurochemical clock for restorative sleep",
        analogy: "Suppressing melatonin at 7:00 AM primes pineal biochemical synthesis; exactly 14 hours later, uninhibited nocturnal melatonin release guarantees effortless sleep onset."
      }
    ]
  },

  "ngat-quang-ngoi-lau-danh-thuc-mach-mau": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Cơ Chế Khi Đứng Dậy Ngắt Quãng Ngồi Lâu",
    hook: "Giải mã lực cắt trượt mạch máu và chiếc bơm cơ bắp chân:",
    points: [
      {
        term: "Kích hoạt Bơm cơ bắp chân (Soleus/Gastrocnemius Pump)",
        layTerm: "Khởi động trái tim thứ hai đẩy máu tĩnh mạch về phổi",
        analogy: "Mỗi bước chân hoặc nhịp nhón gót bóp chặt tĩnh mạch sâu chi dưới, đẩy dòng máu ứ đọng ngược chiều trọng lực trở về tim và não bộ."
      },
      {
        term: "Khôi phục Lực cắt trượt tầng (Laminar Shear Stress)",
        layTerm: "Dòng nước chảy xiết đánh thức thành ống dẫn máu",
        analogy: "Đứng dậy làm thông góc gập động mạch đùi; dòng máu cuộn chảy mượt mà kích thích enzyme eNOS bơm khí Nitric Oxide làm giãn nở và bảo vệ nội mạc mạch máu."
      },
      {
        term: "Tái kích hoạt men dọn mỡ Lipoprotein Lipase (LPL)",
        layTerm: "Bật lại công tắc dọn dẹp dầu mỡ trong lòng mạch",
        analogy: "Ngồi lì làm tắt 90% enzyme LPL trên mao mạch cơ; chỉ 2 phút cử động là công tắc LPL bật sáng trở lại, hút sạch triglyceride trôi nổi trong máu."
      }
    ]
  },
  "breaking-sedentary-sitting-vascular-shear-stress": {
    title: "Layman Medical Concept: 3 Vascular Rescues of Movement Breaks",
    hook: "How intermittent 2-minute strolls rescue endothelial nitric oxide and lipid clearance:",
    points: [
      {
        term: "The Peripheral Soleus Skeletal Muscle Pump",
        layTerm: "Activating the secondary cardiac pump in your calves",
        analogy: "Rhythmic contractions of calf musculature compress deep venous reservoirs, driving pooled deoxygenated blood upward against gravity back to central circulation."
      },
      {
        term: "Restoration of High Laminar Shear Stress",
        layTerm: "Fluid friction awakening arterial endothelial walls",
        analogy: "Unkinking femoral and popliteal vessels restores rapid laminar blood velocity, mechanically signaling eNOS enzymes to spray protective gaseous Nitric Oxide."
      },
      {
        term: "Reactivation of Endothelial Lipoprotein Lipase (LPL)",
        layTerm: "Flipping the microvascular fat-clearing breaker back on",
        analogy: "Unbroken sitting silences 90% of capillary LPL; a 180-second movement break reactivates the enzymatic vacuum clearing circulating triglycerides and blunting glucose."
      }
    ]
  },

  "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Nút Thần Kinh Của Nhịp Thở 4-7-8",
    hook: "Cơ chế kéo dài thì thở ra giúp phanh lại cơn hoảng loạn và nhịp tim dồn dập:",
    points: [
      {
        term: "Cung phản xạ Áp cảm thụ quan (Baroreflex)",
        layTerm: "Cảm biến áp lực lồng ngực kích hoạt phanh phế vị",
        analogy: "Thở ra dài 8 giây làm tăng áp lực lồng ngực, kích thích các cảm biến xoang cảnh báo động cho hành não xả acetylcholine làm chậm nhịp tim ngay lập tức."
      },
      {
        term: "Biến thiên nhịp tim HRV (Vagal Tank)",
        layTerm: "Độ đàn hồi của bình nhiên liệu thần kinh tự chủ",
        analogy: "Nhịp thở chậm đưa khoảng cách giữa các nhịp tim vào trạng thái co giãn nhịp nhàng, làm đầy chiếc bình nhiên liệu phế vị giúp bạn giữ tâm trí vững vàng trước stress."
      },
      {
        term: "Tối ưu hóa hiệu ứng Bohr nhờ nín thở 7 giây",
        layTerm: "Giữ lượng CO2 vàng để hồng cầu giải phóng oxy nuôi não",
        analogy: "Nín thở 7 giây tích lũy lượng CO2 sinh lý vừa đủ để mở khóa phân tử hemoglobin, ép chúng nhả oxy dồi dào vào tế bào não và cơ tim."
      }
    ]
  },
  "slow-breathing-vagal-tone-parasympathetic-reset": {
    title: "Layman Medical Concept: 3 Autonomic Keys of the 4-7-8 Breath",
    hook: "How extending exhalation leverages baroreceptor reflexes to extinguish somatic anxiety:",
    points: [
      {
        term: "The Arterial Baroreflex Feedback Loop",
        layTerm: "Intrathoracic pressure sensors triggering the vagal brake",
        analogy: "Sustaining an 8-second exhalation elevates thoracic pressure, mechanically stimulating carotid sinus baroreceptors to flood sinoatrial pacemakers with calming acetylcholine."
      },
      {
        term: "Elevating Heart Rate Variability (Vagal Tank)",
        layTerm: "Refilling the nervous system's emotional resilience reservoir",
        analogy: "Slow breathing aligns respiratory sinus arrhythmia, maximizing R-R wave variability and topping up your physiological reserve against acute panic."
      },
      {
        term: "Bohr Effect Optimization via 7-Second Apnea",
        layTerm: "Harnessing therapeutic CO2 to unlock tissue oxygenation",
        analogy: "Holding breath for seven seconds creates optimal physiological hypercapnia, lowering cellular affinity of hemoglobin and bathing prefrontal neurons in liberated oxygen."
      }
    ]
  },

  "so-co-la-den-flavanol-gian-mach-ha-huyet-ap": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Giãn Mạch Của Flavanol Ca Cao",
    hook: "Giải mã cơ chế khí Nitric Oxide hạ huyết áp từ hạt ca cao nguyên chất:",
    points: [
      {
        term: "Hoạt chất (-)-Epicatechin kích hoạt enzyme eNOS",
        layTerm: "Chiếc chìa khóa sinh học mở van xả khí Nitric Oxide",
        analogy: "Epicatechin trong ca cao hấp thu nhanh vào máu, gắn vào enzyme eNOS trên thành mạch và ra lệnh sản xuất khí Nitric Oxide liên tục suốt 2-4 giờ."
      },
      {
        term: "Dòng thác cGMP giãn cơ trơn mạch máu",
        layTerm: "Chất truyền tin bảo tế bào thành mạch thả lỏng",
        analogy: "Khí Nitric Oxide khuếch tán sang lớp cơ thành mạch, làm tăng cGMP để bơm canxi ra ngoài, giúp các mạch máu co cứng mở rộng khẩu kính và hạ huyết áp êm dịu."
      },
      {
        term: "Bảo tồn phân tử NO khỏi gốc tự do ROS",
        layTerm: "Chiếc khiên chống rỉ sét cho các ống dẫn máu",
        analogy: "Polyphenol ca cao dập tắt các gốc tự do superoxide, ngăn không cho chúng phá hủy Nitric Oxide, duy trì độ mềm mại và đàn hồi của động mạch."
      }
    ]
  },
  "dark-chocolate-flavanols-nitric-oxide-endothelial-function": {
    title: "Layman Medical Concept: 3 Vascular Pillars of Cocoa Flavanols",
    hook: "How unadulterated cocoa polyphenols stimulate endothelial nitric oxide and lower pressure:",
    points: [
      {
        term: "Monomeric (-)-Epicatechin Phosphorylation of eNOS",
        layTerm: "The molecular switch sparking gaseous Nitric Oxide synthesis",
        analogy: "Absorbed epicatechin rapidly activates Akt kinases to phosphorylate endothelial eNOS, sustaining high-velocity Nitric Oxide bio-generation for hours."
      },
      {
        term: "The cGMP Second Messenger Vasodilation Cascade",
        layTerm: "The biochemical messenger commanding arterial smooth muscle to relax",
        analogy: "Nitric Oxide diffuses into adjacent vascular muscle cells, elevating cGMP to clear intracellular calcium and relaxing constricted arterial walls."
      },
      {
        term: "Superoxide Quenching and NO Half-Life Preservation",
        layTerm: "An antioxidant shield protecting fragile vasodilator gases",
        analogy: "Cocoa procyanidins aggressively scavenge reactive oxygen species, preventing the destruction of Nitric Oxide into cytotoxic peroxynitrite."
      }
    ]
  },

  "tam-rung-20-phut-ha-hormone-cang-thang-cortisol": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Tác Động Sinh Học Của 'Viên Thuốc Tự Nhiên'",
    hook: "Cơ chế khí dung Phytoncide và hình học cành cây chữa lành hệ thần kinh:",
    points: [
      {
        term: "Hạ nhiệt Trục HPA (Thanh thải Cortisol)",
        layTerm: "Tắt còi báo động khẩn cấp của trung khu lo âu",
        analogy: "Màu xanh và không gian tĩnh lặng của rừng cây giải tỏa áp lực cho thùy trán, giúp tốc độ đào thải hormone stress cortisol nước bọt tăng vọt 21.3% mỗi giờ."
      },
      {
        term: "Khí dung thơm thực vật Phytoncides",
        layTerm: "Kháng sinh tự nhiên của cây đánh thức tế bào miễn dịch",
        analogy: "Hít thở các phân tử phytoncide từ lá thông và vỏ cây kích thích tủy xương sản sinh tế bào NK tăng 50%, củng cố lá chắn tiêu diệt virus và tế bào lạ."
      },
      {
        term: "Hình học Fractal của tán cây và Sóng não Alpha",
        layTerm: "Cấu trúc cành lá đưa bộ não về tần số bình yên",
        analogy: "Đôi mắt nhìn ngắm những cấu trúc phân nhánh tự nhiên của cành lá kích hoạt sóng não Alpha 8-12Hz, mang lại trạng thái thư thái sâu mà không gây buồn ngủ."
      }
    ]
  },
  "nature-pill-twenty-minutes-cortisol-reduction": {
    title: "Layman Medical Concept: 3 Healing Modalities of the 'Nature Pill'",
    hook: "How 20 minutes beneath a forest canopy rapidly purges cortisol and boosts NK cells:",
    points: [
      {
        term: "HPA Axis De-escalation & Cortisol Clearance",
        layTerm: "Silencing the central nervous system's chronic alarm siren",
        analogy: "Nature's gentle 'soft fascination' disengages prefrontal cognitive strain, accelerating salivary cortisol clearance by 21.3% per hour."
      },
      {
        term: "Aerosolized Airborne Phytoncides",
        layTerm: "Volatile botanical shields empowering innate immunity",
        analogy: "Inhaling organic pine terpenes excites bone marrow to upregulate cytotoxic Natural Killer (NK) cells and perforin by 50% for up to a month."
      },
      {
        term: "Natural Fractal Geometries & EEG Alpha Waves",
        layTerm: "Organic branching patterns synchronizing peaceful brainwaves",
        analogy: "Viewing the self-repeating fractal branches of trees shifts cortical rhythms into 8-12 Hz Alpha oscillations, melting away cognitive exhaustion."
      }
    ]
  },

  "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Tác Động Của Ly Nước 500ml Trước Bữa Ăn",
    hook: "Cơ chế căng thành vị sinh lý và sinh nhiệt chuyển hóa tự nhiên:",
    points: [
      {
        term: "Căng giãn cơ học thành vị (Gastric Distension)",
        layTerm: "Lấp đầy một phần dạ dày bằng thể tích không calo",
        analogy: "500ml nước làm căng thành dạ dày, kích hoạt các đầu mút thụ thể cơ học báo cho não bộ rằng khoang chứa đã có đồ ăn, tự động cắt cơn thèm ăn ngấu nghiến."
      },
      {
        term: "Sinh nhiệt do nước qua thần kinh giao cảm",
        layTerm: "Tăng tốc độ đốt calo khi nghỉ ngơi tới 30%",
        analogy: "Nước hấp thu nhanh vào tĩnh mạch cửa gan kích thích phản xạ giao cảm, nâng tỷ lệ trao đổi chất khi nghỉ ngơi lên 30% trong suốt 40-60 phút sau đó."
      },
      {
        term: "Kênh dẫn rãnh bờ cong nhỏ (Magenstrasse)",
        layTerm: "Đường thoát nước riêng không làm loãng men tiêu hóa",
        analogy: "Dạ dày có một rãnh giải phẫu riêng giúp nước trôi nhanh xuống ruột non trong 15 phút, không hề làm loãng acid dịch vị hay cản trở tiêu hóa thịt cá."
      }
    ]
  },
  "drinking-water-before-meals-gastric-distension-metabolism": {
    title: "Layman Medical Concept: 3 Metabolic Actions of Pre-Meal Water",
    hook: "How preloading 500 mL water 30 minutes pre-meal triggers mechanical fullness and thermogenesis:",
    points: [
      {
        term: "Gastric Mechanoreceptor Distension",
        layTerm: "Pre-filling the stomach chamber with zero-calorie fluid",
        analogy: "A 500 mL water bolus expands the gastric lumen, firing vagal mechanoreceptors to inform hypothalamic satiety centers before food arrives."
      },
      {
        term: "Water-Induced Sympathetic Thermogenesis",
        layTerm: "Boosting baseline resting calorie burn by up to 30%",
        analogy: "Hypo-osmotic portal vein signaling fires sympathetic efferents, accelerating resting energy expenditure by 30% peaking 40 minutes post-ingestion."
      },
      {
        term: "Anatomical Transit via the Magenstrasse",
        layTerm: "A specialized bypass canal keeping digestive acid concentrated",
        analogy: "The stomach channels free liquids along the lesser curvature directly into the duodenum within 15 minutes, preserving gastric enzymatic potency."
      }
    ]
  },

  "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Lợi Ích Tim Mạch Của Xông Hơi Sauna",
    hook: "Tại sao ngồi trong phòng xông hơi 80°C tương đương một buổi tập cardio chạy bộ:",
    points: [
      {
        term: "Mô phỏng bài tập Cardio nhịp tim 120-150 bpm",
        layTerm: "Tập thể dục cho trái tim trong trạng thái ngồi thư giãn",
        analogy: "Nhiệt độ cao làm giãn mao mạch da, buộc tim phải đập nhanh 120-150 nhịp/phút và tăng gấp đôi cung lượng máu, rèn luyện cơ tim mà không gây đau mỏi khớp."
      },
      {
        term: "Kích hoạt Protein Sốc Nhiệt (HSP70 / HSP90)",
        layTerm: "Đội thợ sửa chữa các tế bào và protein bị hư hỏng",
        analogy: "Nhiệt độ 38.5°C kích hoạt các protein HSP đi khắp tế bào như những người thợ khéo léo, nắn lại các chuỗi protein bị gập sai và dọn sạch rác thoái hóa."
      },
      {
        term: "Giảm kháng lực mạch máu ngoại vi (TPR)",
        layTerm: "Mở rộng mạng lưới đường cao tốc tuần hoàn máu",
        analogy: "Sau khi bước ra khỏi phòng xông, các mạch máu giãn rộng đưa huyết áp hạ sâu êm dịu, bảo vệ lớp nội mạc động mạch vành và giảm 50% nguy cơ biến cố tim."
      }
    ]
  },
  "sauna-bathing-cardiovascular-longevity-heat-shock-proteins": {
    title: "Layman Medical Concept: 3 Cardiovascular Triumphs of Sauna Bathing",
    hook: "How hyperthermic conditioning replicates endurance exercise and induces chaperone repairs:",
    points: [
      {
        term: "Exercise Biomimetic Tachycardia (120-150 bpm)",
        layTerm: "Passive cardiovascular aerobic conditioning",
        analogy: "Severe dry heat diverts blood to cutaneous beds, driving heart rate to 120-150 bpm and doubling cardiac output identically to brisk jogging."
      },
      {
        term: "Molecular Heat Shock Chaperones (HSP70/HSP90)",
        layTerm: "Intracellular mechanics refolding damaged cellular proteins",
        analogy: "Elevated core tissue temperatures unleash HSP chaperones that seek out misfolded proteins, refolding them to rescue cellular and mitochondrial function."
      },
      {
        term: "Systemic Peripheral Resistance Reduction",
        layTerm: "Opening wide arterial floodgates to drop blood pressure",
        analogy: "Profound vasodilation lowers cardiac afterload; resting post-sauna blood pressure drops, driving a documented 50% reduction in fatal coronary events."
      }
    ]
  },

  "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau": {
    title: "Góc Y Khoa Dễ Hiểu: 3 Tác Động Chống Lão Hóa Của Quả Mọng",
    hook: "Giải mã chiếc khiên sắc tố Anthocyanin bảo vệ mạch máu khỏi xơ cứng:",
    points: [
      {
        term: "Sắc tố thực vật Anthocyanin gắn vào màng tế bào",
        layTerm: "Lớp sơn chống gỉ tự nhiên cho lòng mạch máu",
        analogy: "Sắc tố tím đỏ của quả mọng hấp thu vào máu và bọc lấy lớp tế bào nội mô, ngăn chặn các gốc tự do làm rỉ sét các phân tử mỡ LDL."
      },
      {
        term: "Khóa chặt công tắc gây viêm nội mạc NF-κB",
        layTerm: "Chặn đứng chiếc bẫy dính mảng xơ vữa động mạch",
        analogy: "Anthocyanin khóa công tắc NF-κB, ngăn tế bào mạch máu tiết ra các phân tử kết dính ICAM-1, không cho bạch cầu bám vào tạo thành mảng xơ vữa."
      },
      {
        term: "Bảo tồn độ đàn hồi động mạch và Giảm sóng mạch PWV",
        layTerm: "Giữ cho các ống dẫn máu mềm mại dẻo dai như tuổi đôi mươi",
        analogy: "Tiêu thụ quả mọng đều đặn giúp các sợi collagen và elastin thành mạch giữ được độ đàn hồi, ngăn ngừa tình trạng xơ cứng động mạch và hạ nguy cơ nhồi máu cơ tim 32%."
      }
    ]
  },
  "berries-anthocyanins-vascular-protection-antioxidant-shield": {
    title: "Layman Medical Concept: 3 Vascular Defenses of Berry Anthocyanins",
    hook: "How nature's deep pigments preserve endothelial elasticity and prevent atherosclerosis:",
    points: [
      {
        term: "Endothelial Membrane Incorporation of Anthocyanins",
        layTerm: "A natural anti-corrosion coating for arterial inner walls",
        analogy: "Dark berry pigments circulate as bioactive phenolic metabolites, integrating into vascular membranes to prevent lipid peroxidation of circulating LDL."
      },
      {
        term: "Inhibition of the Vascular NF-κB Inflammatory Axis",
        layTerm: "Shutting down the sticky Velcro traps of early plaque",
        analogy: "Anthocyanins downregulate NF-κB, halting the expression of VCAM-1 adhesion molecules so circulating monocytes cannot adhere and initiate fatty streaks."
      },
      {
        term: "Preservation of Arterial Compliance (Blunting PWV)",
        layTerm: "Keeping arterial highway conduits youthful and resilient",
        analogy: "Regular berry intake maintains elastin integrity across the central aorta, reducing pulse wave velocity (PWV) and cutting myocardial infarction risk by 32%."
      }
    ]
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
