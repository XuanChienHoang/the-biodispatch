import os, sys, re

sys.stdout.reconfigure(encoding='utf-8')

# Data structure for the 10 Topics
TOPICS = [
    {
        "id": 1,
        "slug_vi": "an-rau-truoc-com-kiem-soat-duong-huyet-vi",
        "slug_en": "eating-vegetables-before-carbs-flattens-glucose-spikes-en",
        "title_vi": "Ăn rau trước cơm giúp kiểm soát đường huyết: Bí mật chiếc lưới lọc chất xơ",
        "title_en": "Eating Vegetables Before Carbs Flattens Glucose Spikes: The Dietary Fiber Matrix",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│               SƠ ĐỒ ĐỐI CHỨNG ĐƯỜNG CONG NĂNG LƯỢNG VÀ HORMONES             │
├─────────────────────────────────────────────────────────────────────────────┤
│ TIẾN TRÌNH TRUYỀN THỐNG (CƠM TINH BỘT ĂN ĐẦU TIÊN):                         │
│ [Tinh bột nhanh vào dạ dày] ──► [Men Amylase phân giải ồ ạt]                │
│                                           │                                 │
│                                           ▼                                 │
│ [Đỉnh Glucose máu vọt > 140 mg/dL] ──► [Tụy xả Insulin cấp cứu liều cao]    │
│                                           │                                 │
│                                           ▼                                 │
│ [Hạ đường huyết phản ứng: Đói cồn cào sau 2h, buồn ngủ díu mắt, tích mỡ]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ TIẾN TRÌNH KHOA HỌC (RAU XANH & PROTEIN ĂN TRƯỚC TIÊN):                     │
│ [Chất xơ Pectin & Beta-glucan ngậm nước tạo lớp gel nhớt sinh học]          │
│               │                                                             │
│               ▼                                                             │
│ [Làm chậm rỗng dạ dày (Gastric Emptying)] ──► [Bọc hạt tinh bột tránh men]  │
│               │                                                             │
│               ▼                                                             │
│ [Tế bào L thành ruột tiết GLP-1 & PYY] ──► [Não nhận tín hiệu no tự nhiên]  │
│               │                                                             │
│               ▼                                                             │
│ [Glucose hấp thu từ từ vào máu] ───────► [Đường huyết phẳng, năng lượng bền]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│          COMPARATIVE POSTPRANDIAL GLUCOSE & ENDOCRINE RESPONSE MAP          │
├─────────────────────────────────────────────────────────────────────────────┤
│ CONVENTIONAL PATTERN (CARBOHYDRATES CONSUMED FIRST):                        │
│ [Refined starch in stomach] ──► [Rapid enzymatic cleavage by Alpha-Amylase] │
│                                           │                                 │
│                                           ▼                                 │
│ [Glucose Spike > 140 mg/dL] ──► [Surge in reactive Insulin hypersecretion]  │
│                                           │                                 │
│                                           ▼                                 │
│ [Reactive Hypoglycemia: Mid-afternoon brain fog, intense hunger, lipogenesis]│
├─────────────────────────────────────────────────────────────────────────────┤
│ EVIDENCE-BASED PACING (VEGETABLES & PROTEIN FIRST):                         │
│ [Soluble viscous fibers (Pectin, Beta-glucan) hydrate into a gel matrix]    │
│               │                                                             │
│               ▼                                                             │
│ [Delayed Gastric Emptying Rate] ──► [Physical shield blocking rapid amylase]│
│               │                                                             │
│               ▼                                                             │
│ [Ileal L-cells stimulated: GLP-1 & PYY release] ──► [Hypothalamic satiety]  │
│               │                                                             │
│               ▼                                                             │
│ [Gradual, blunted Glucose absorption] ──► [Sustained alertness, fat burning]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Thấu hiểu cơ thể để sống an yên

Trong thực hành lâm sàng và y học dự phòng, chúng tôi thường nhắc nhở bệnh nhân rằng: cơ thể bạn không phải là một chiếc máy đốt calo vô tri giác, mà là một dàn nhạc giao hưởng của các tín hiệu nội tiết. Việc thay đổi thứ tự ăn không nhằm mục đích ép bạn phải ăn kiêng khắc khổ hay tước đoạt niềm vui thưởng thức những hạt cơm dẻo thơm. Đó đơn giản là cách chúng ta thuận theo nhịp điệu sinh học tự nhiên của bộ máy tiêu hóa.

Đừng biến bữa ăn gia đình thành một cuộc chiến căng thẳng với từng gam thức ăn. Nếu hôm nay bạn có một bữa liên hoan lỡ ăn bát phở trước, cơ thể hoàn toàn có cơ chế tự điều chỉnh. Điều quan trọng không nằm ở sự hoàn hảo trong một bữa ăn đơn lẻ, mà là xu hướng dài hạn mà bạn xây dựng mỗi ngày. Khi bạn dành cho đĩa rau xanh sự ưu tiên trong 5 phút đầu tiên, bạn đang gửi một tín hiệu trân trọng và bảo bọc đến từng tế bào thành ruột và tuyến tụy của chính mình.""",
        "reflection_en": """### The Doctor's Reflection: Sustainable Habits Over Dietary Perfection

In clinical preventive medicine, we frequently emphasize that the human body is not a static calorie furnace, but a responsive, beautifully orchestrated symphony of endocrine signals. Adjusting your meal sequencing is never about rigid restriction or depriving yourself of warm, aromatic rice. It is about honoring the mechanical and biochemical constraints under which human digestion evolved.

Do not allow nutrition to morph into a source of chronic anxiety. If a celebratory family dinner makes sequential eating impractical on occasion, your physiology is resilient and equipped to handle the variance. Long-term health is shaped by persistent biological rhythms, not solitary deviations. By offering vegetables the first five minutes of your meal, you gift your pancreas, vascular endothelium, and metabolic machinery the gentle buffer they need to serve you faithfully for decades."""
    },
    {
        "id": 2,
        "slug_vi": "vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi",
        "slug_en": "why-eating-after-8pm-triggers-visceral-fat-storage-en",
        "title_vi": "Ăn tối muộn sau 20 giờ: Chiếc bẫy sinh học khiến mỡ bụng tích tụ nhanh",
        "title_en": "Eating Dinner After 8 PM: Why Circadian Desynchrony Accelerates Visceral Fat Storage",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ĐỒ THỊ ĐỒNG HỒ SINH HỌC VÀ CHUYỂN HÓA MỠ ĐÊM                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ BAN NGÀY (8:00 - 18:00) - PHA TIÊU THỤ VÀ HOẠT ĐỘNG:                       │
│ [Ánh sáng tự nhiên] ──► [SCN kích hoạt nhịp trao đổi chất cao]              │
│ [Độ nhạy Insulin cao] ──► [Ty thể tế bào ưu tiên đốt cháy mỡ & đường làm ATP]│
├─────────────────────────────────────────────────────────────────────────────┤
│ BAN ĐÊM (SAU 20:00) - PHA PHỤC HỒI VÀ TÍCH TRỮ:                            │
│ [Bóng tối kích thích tuyến tùng tiết Melatonin]                             │
│               │                                                             │
│               ▼                                                             │
│ [Melatonin gắn thụ thể MT1 trên tụy] ──► [Khóa sản xuất Insulin tới 50%]    │
│               │                                                             │
│               ▼ (NẾU ĂN BỮA LỚN LÚC NÀY)                                    │
│ [Thức ăn nạp vào nhưng đường không vào được cơ] ──► [Đường máu tăng vọt kéo dài]│
│               │                                                             │
│               ▼                                                             │
│ [Gen Lipogenesis PPAR-gamma bật công tắc] ──► [Chuyển năng lượng thừa vào MỠ NỘI TẠNG]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│             CIRCADIAN CHRONOBIOLOGY & NOCTURNAL LIPID PARTITIONING          │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAYTIME PHASE (08:00 - 18:00) - ACTIVE METABOLIC CLEARANCE:                │
│ [Solar zeitgeber] ──► [Suprachiasmatic nucleus (SCN) drives high metabolism] │
│ [Peak insulin sensitivity] ──► [Mitochondria direct substrates toward ATP]  │
├─────────────────────────────────────────────────────────────────────────────┤
│ NOCTURNAL PHASE (AFTER 20:00) - RESTORATION & RESTRICTED CLEARANCE:         │
│ [Darkness stimulates pineal gland: Surge in Melatonin]                      │
│               │                                                             │
│               ▼                                                             │
│ [Melatonin binds pancreatic MT1 receptors] ──► [Blunts insulin release 50%] │
│               │                                                             │
│               ▼ (IF A HEAVY MEAL IS CONSUMED HERE)                          │
│ [Substrates stall in bloodstream] ──► [Prolonged nocturnal hyperglycaemia]  │
│               │                                                             │
│               ▼                                                             │
│ [Adipocyte PPAR-gamma expression triggered] ──► [Calories routed into VISCERAL FAT]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Hòa giải với chiếc đồng hồ sinh học bên trong

Trong xã hội hiện đại bận rộn, bữa tối muộn thường là thời điểm duy nhất chúng ta được thư giãn, trò chuyện cùng người thân sau một ngày dài áp lực. Chúng tôi thấu hiểu rằng việc yêu cầu mọi người luôn ăn trước 19 giờ đôi khi là bất khả thi với công việc và nhịp sống đô thị.

Bí quyết y học ở đây không phải là nhịn đói hay dằn vặt bản thân khi về muộn. Hãy nhìn cơ thể với lòng trắc ẩn: sau 20 giờ, các cơ quan nội tạng của bạn cũng giống như người công nhân cần được nghỉ ngơi, bảo trì và tái tạo tế bào. Nếu bắt buộc phải ăn muộn, hãy chọn một bát súp nhẹ, một chút đạm hấp hoặc đĩa rau xanh thay vì bữa cơm tinh bột đầy đặn. Việc nhường cho cơ thể khoảng không tĩnh lặng trước giấc ngủ là món quà lớn nhất giúp bạn thức dậy với một vòng eo nhẹ nhõm và tâm trí tràn đầy sinh lực.""",
        "reflection_en": """### The Doctor's Reflection: Harmonizing With Your Internal Clock

In modern metropolitan life, late dinner is frequently the sole window for decompression, social connection, and intimacy after demanding work hours. Clinicians understand that demanding everyone consistently consume dinner before 7 PM is unrealistic and disconnected from human reality.

The clinical objective is not self-flagellation or obsessive rigidity. View your internal physiology with compassion: after 8 PM, your gastrointestinal organs, liver, and pancreatic beta-cells are transitioning into restorative maintenance mode. If your schedule forces a late intake, pivot toward gentle nourishment—a bowl of warm broth, light steamed protein, or crisp vegetables rather than dense carbohydrate loads. Granting your metabolic machinery room to cool before bedtime ensures you awaken with vitality rather than visceral heaviness."""
    },
    {
        "id": 3,
        "slug_vi": "giam-tao-truoc-bua-an-giam-duong-huyet-vi",
        "slug_en": "apple-cider-vinegar-before-meals-glucose-blunting-en",
        "title_vi": "Thìa giấm táo trước bữa ăn: Sự thật khoa học hay trào lưu phóng đại? Giải mã Acid Acetic",
        "title_en": "A Spoon of Apple Cider Vinegar Before Meals: Science or Social Media Hype? The Acetic Acid Mechanism",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 CƠ CHẾ TÁC ĐỘNG SINH HÓA CỦA ACID ACETIC                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ BƯỚC 1: DẠ DÀY & MEN TIÊU HÓA                                               │
│ [Uống giấm táo pha loãng (15ml + 200ml nước)] ──► [Acid Acetic vào dạ dày]  │
│               │                                                             │
│               ▼                                                             │
│ [Tác động lên dây thần kinh phế vị Vagus] ──► [Làm chậm rỗng môn vị dạ dày] │
│               │                                                             │
│               ▼                                                             │
│ [Ức chế cạnh tranh men Alpha-Amylase & Sucrase] ──► [Chậm cắt mạch tinh bột]│
├─────────────────────────────────────────────────────────────────────────────┤
│ BƯỚC 2: TẾ BÀO CƠ BẮP & NỘI TIẾT                                             │
│ [Acid Acetic hấp thu qua tĩnh mạch cửa] ──► [Kích hoạt enzyme chuyển hóa AMPK]│
│               │                                                             │
│               ▼                                                             │
│ [Kênh GLUT4 di chuyển ra màng tế bào cơ] ──► [Hút đường vào tế bào làm ATP] │
│               │                                                             │
│               ▼                                                             │
│ [Đỉnh đường huyết sau ăn giảm 20-30%] ──► [Bảo vệ nội mô mạch máu và gan]   │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                BIOCHEMICAL PATHWAY OF ACETIC ACID MODULATION                │
├─────────────────────────────────────────────────────────────────────────────┤
│ STEP 1: GASTRIC MOTILITY & ENZYME INHIBITION                                │
│ [Diluted vinegar ingestion (15 mL + 200 mL H2O)] ──► [Acetic acid in gut]   │
│               │                                                             │
│               ▼                                                             │
│ [Vagus-mediated slowing of pyloric motility] ──► [Prolonged gastric emptying]│
│               │                                                             │
│               ▼                                                             │
│ [Competitive disaccharidase inhibition] ──► [Blunted starch breakdown]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ STEP 2: PERIPHERAL MUSCLE & AMPK ACTIVATION                                 │
│ [Portal absorption of acetate] ──► [Triggers cellular fuel-sensor AMPK]     │
│               │                                                             │
│               ▼                                                             │
│ [Translocation of GLUT4 transporters] ──► [Rapid muscular glucose disposal] │
│               │                                                             │
│               ▼                                                             │
│ [Postprandial glucose spike dampened 20-30%] ──► [Vascular and liver relief]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Khi khoa học tách biệt khỏi ảo tưởng

Giấm táo là một ví dụ điển hình về việc mạng xã hội thường thần thánh hóa một liệu pháp dân gian thành 'thần dược đốt mỡ tức thì'. Y học thực chứng nhìn nhận giấm táo một cách tỉnh táo và công bằng hơn: nó không thể thay thế một chế độ ăn lành mạnh, nhưng là một công cụ hỗ trợ chuyển hóa rẻ tiền, an toàn và có cơ chế sinh hóa thuyết phục.

Hãy xem việc nhấp một ngụm giấm táo pha loãng trước bữa cơm như một nghi thức nhắc nhở bản thân chuẩn bị bước vào bữa ăn một cách chậm rãi, chánh niệm. Đừng cố uống đặc hay uống quá nhiều vì nồng độ acid cao có thể làm mòn men răng và kích ứng niêm mạc thực quản. Một chút vị chua thanh mát nhẹ nhàng không chỉ đánh thức vị giác mà còn là cách tự nhiên giúp bạn đồng hành cùng cơ thể trong từng nhịp chuyển hóa năng lượng.""",
        "reflection_en": """### The Doctor's Reflection: Discerning Evidence From Wellness Myths

Apple cider vinegar epitomizes how wellness culture routinely distorts modest biochemical tools into miraculous fat-melting elixirs. Evidence-based medicine takes a sober, appreciative view: vinegar will never neutralize a chronic surplus of ultra-processed food, but when deployed thoughtfully, it represents an accessible, cost-effective physiological adjunct.

Approach a diluted pre-meal vinegar drink as a mindful sensory threshold—a deliberate pause signaling to your mind and digestive tract that nourishing fuel is arriving. Never consume it undiluted, as high acetic acid concentrations erode dental enamel and irritate esophageal epithelium. A gentle touch of acidity before meals awakens your palate while conferring measurable metabolic support."""
    },
    {
        "id": 4,
        "slug_vi": "anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi",
        "slug_en": "blue-light-screen-time-disrupts-deep-sleep-en",
        "title_vi": "Lướt điện thoại ban đêm: Tế bào võng mạc ipRGC và bí mật giấc ngủ sâu",
        "title_en": "Screen Time Before Sleep: How Retinal ipRGCs Sabotage Deep Sleep Architecture",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 TRỤC ÁNH SÁNG - VÕNG MẠC - ĐỒNG HỒ SINH HỌC                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ CƠ CHẾ SINH HỌC BAN NGÀY (ÁNH SÁNG MẶT TRỜI):                               │
│ [Ánh sáng tự nhiên 480nm] ──► [Tế bào ipRGC võng mạc chứa Melanopsin]       │
│                                           │                                 │
│                                           ▼                                 │
│ [Dẫn truyền qua bó thần kinh RHT] ──► [Kích hoạt nhân trên chéo SCN não]   │
│                                           │                                 │
│                                           ▼                                 │
│ [Ức chế tuyến tùng: Không tiết Melatonin] ──► [Cơ thể tỉnh táo, tràn năng lượng]│
├─────────────────────────────────────────────────────────────────────────────┤
│ KỊCH BẢN BAN ĐÊM VỚI MÀN HÌNH ĐIỆN THOẠI (22:00):                          │
│ [Photon ánh sáng xanh từ LED smartphone chiếu thẳng vào mắt ở cự ly gần]    │
│               │                                                             │
│               ▼                                                             │
│ [Melanopsin bị đánh lừa là giữa trưa] ──► [SCN tiếp tục phát lệnh BAN NGÀY] │
│               │                                                             │
│               ▼                                                             │
│ [Melatonin bị dập tắt > 50%] ──► [Trì hoãn cơn buồn ngủ từ 1 đến 2 giờ]    │
│               │                                                             │
│               ▼                                                             │
│ [Mất giai đoạn Sóng Chậm SWS] ──► [Hệ Glymphatic không thể dọn rác não]     │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│               THE RETINOHYPOTHALAMIC PHOTOTRANSDUCTION AXIS                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ NATURAL DAYLIGHT ENTRAINMENT (SOLAR EXPOSURE):                              │
│ [Solar 480nm photons] ──► [Retinal ipRGCs containing Melanopsin pigment]     │
│                                           │                                 │
│                                           ▼                                 │
│ [Retinohypothalamic tract (RHT)] ──► [Direct firing into master clock SCN]  │
│                                           │                                 │
│                                           ▼                                 │
│ [Pineal Melatonin suppressed] ──► [Daytime vigilance and optimal cognitive drive]│
├─────────────────────────────────────────────────────────────────────────────┤
│ NOCTURNAL SCREEN EXPOSURE DISRUPTION (22:00 IN BED):                        │
│ [High-intensity narrow-band blue photons directed at close proximity]       │
│               │                                                             │
│               ▼                                                             │
│ [Melanopsin misinterprets artificial blue light as midday sun]              │
│               │                                                             │
│               ▼                                                             │
│ [Nocturnal Melatonin surge blocked > 50%] ──► [Circadian phase delay 1.5h] │
│               │                                                             │
│               ▼                                                             │
│ [Truncated Slow-Wave Sleep (SWS)] ──► [Impaired Glymphatic cerebral clearance]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Giữ gìn thánh địa bình yên cho phòng ngủ

Trong đời sống hiện đại, chiếc điện thoại thông minh đã trở thành một phần mở rộng của tâm trí. Chúng ta kiểm tra tin nhắn cuối ngày, lướt đọc tin tức để xả stress, nhưng vô tình bắt bộ não phải xử lý luồng ánh sáng chói lọi mà tổ tiên chúng ta chỉ thấy vào ban trưa.

Giấc ngủ sâu không phải là một công tắc bật tắt tức thì, mà là một chiếc máy bay đang hạ cánh từ từ xuống đường băng. Nó cần thời gian để động cơ hạ nhiệt, nhiệt độ cơ thể giảm xuống và hormone Melatonin dâng tràn tự nhiên trong bóng tối. Thay vì ép bản thân phải 'cai' màn hình một cách tiêu cực, hãy tạo cho mình một vùng chuyển tiếp êm dịu 30 phút trước khi ngủ: bật đèn vàng dịu, mở một trang sách giấy, hoặc đơn giản là lắng nghe một giai điệu không lời. Khi tâm trí được thả lỏng trong bóng đêm êm ái, cơ thể sẽ tự biết cách chữa lành mọi mệt mỏi của ngày dài.""",
        "reflection_en": """### The Doctor's Reflection: Restoring the Bedroom as a Sanctuary

In digital civilization, smartphones serve as cognitive appendages. We scroll through messages and media to decompress, unaware that high-energy photons are signaling noon to an ancestral nervous system programmed by hundreds of millennia of celestial twilight.

Restorative sleep is not a digital switch; it resembles an aircraft executing a gradual, measured descent. It demands ambient dimming, thermal drop, and a pristine nocturnal melatonin curve unmarred by artificial glare. Rather than enforcing punitive screen bans that spark resentment, craft a soothing 30-minute transitional runway: warm amber incandescent lamps, tactile paper books, or calming acoustics. When darkness is welcomed rather than fended off, your nervous system readily initiates cellular repair."""
    },
    {
        "id": 5,
        "slug_vi": "tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi",
        "slug_en": "green-tea-l-theanine-and-caffeine-smooth-focus-en",
        "title_vi": "Uống trà xanh tỉnh táo êm dịu: Sức mạnh sóng não Alpha từ L-Theanine",
        "title_en": "Green Tea for Calm Focus: How L-Theanine and Caffeine Harmonize Alpha Brainwaves",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 BẢN GIAO HƯỞNG THẦN KINH: CAFFEINE VÀ L-THEANINE            │
├─────────────────────────────────────────────────────────────────────────────┤
│ TÁC ĐỘNG CỦA CAFFEINE ĐƠN LẺ (CÀ PHÊ ĐẬM):                                  │
│ [Khóa thụ thể Adenosine] ──► [Tăng Noradrenaline và Adrenaline]             │
│                                           │                                 │
│                                           ▼                                 │
│ [Kích thích tim đập nhanh, bồn chồn lo âu, tụt pin sập nguồn sau 3-4 giờ]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ HIỆP ĐỒNG HOÀN HẢO TRONG TRÀ XANH (CAFFEINE + L-THEANINE):                  │
│ [Caffeine: Khóa Adenosine, tăng tỉnh táo nhận thức]                         │
│               │                                                             │
│               ▲ (TƯƠNG TÁC ĐỐI TRỌNG CÂN BẰNG)                              │
│               │                                                             │
│ [L-Theanine vượt hàng rào máu não] ──► [Cạnh tranh thụ thể Glutamate NMDA]   │
│               │                                                             │
│               ▼                                                             │
│ [Kích thích sản xuất chất dẫn truyền GABA] ──► [Hạ nhịp tim, giảm căng thẳng]│
│               │                                                             │
│               ▼                                                             │
│ [Tăng điện thế Sóng Não Alpha (8-12 Hz)] ──► [Tỉnh thức tĩnh tại, không bồn chồn]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│           NEUROCHEMICAL DUET: CAFFEINE VS. L-THEANINE SYNERGY               │
├─────────────────────────────────────────────────────────────────────────────┤
│ ISOLATED CAFFEINE DYNAMICS (CONCENTRATED COFFEE):                            │
│ [Non-selective Adenosine A1/A2A blockade] ──► [Surge in Norepinephrine]     │
│                                           │                                 │
│                                           ▼                                 │
│ [Cardiovascular tachycardia, peripheral tremor, sharp post-peak crash]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ CO-DELIVERY IN GREEN TEA / MATCHA (CAFFEINE + L-THEANINE):                  │
│ [Caffeine: Sustains cortical vigilance and reaction velocity]               │
│               │                                                             │
│               ▲ (BALANCED MOLECULAR CHECK-AND-BALANCE)                      │
│               │                                                             │
│ [L-Theanine crosses blood-brain barrier] ──► [Modulates Glutamate receptors]│
│               │                                                             │
│               ▼                                                             │
│ [Elevates inhibitory GABA and Dopamine] ──► [Blunts sympathetic reactivity] │
│               │                                                             │
│               ▼                                                             │
│ [Induces Parietal Alpha Oscillations (8-12 Hz)] ──► [Serene, flow-state focus]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Tìm kiếm sự tĩnh tại giữa cuộc sống vội vã

Nhiều người trong chúng ta tìm đến chất kích thích thần kinh như một chiếc đòn bẩy để vắt kiệt giọt năng lượng cuối cùng cho công việc. Khi mệt mỏi, phản xạ tự nhiên là tìm một ly cà phê thật đậm, để rồi nhận lại cảm giác tim đập thình thịch, ruột gan bồn chồn và cú 'sập nguồn' não bộ vào giữa buổi chiều.

Trà xanh và nghi thức uống trà là một triết lý chữa lành độc đáo: nó dạy chúng ta cách tỉnh thức nhưng không vội vã. L-theanine và caffeine giống như hai người bạn đồng hành – một người giục giã bước chân về phía trước, một người giữ cho tâm trí không bị vấp ngã. Khi bạn chọn một tách trà ấm, hãy cho phép mình hít thở sâu, cảm nhận hương thơm thoang thoảng và tận hưởng trạng thái tập trung sâu lắng, an nhiên suốt cả ngày dài.""",
        "reflection_en": """### The Doctor's Reflection: Sustainable Focus in a Distracted World

In high-performance professional culture, stimulants are frequently leveraged like blunt instruments to extract every lingering ounce of cognitive endurance. When exhaustion strikes, reaching for concentrated espresso is standard, often culminating in palpitations, gastrointestinal tension, and mid-afternoon burnout.

Green tea offers an instructive pharmacological lesson: alertness does not necessitate agitated hyperactivity. L-theanine and caffeine represent nature’s exquisite balancing act—one elevating executive processing while the other anchors autonomic calm. Incorporating loose-leaf green tea or matcha into your morning routine invites sustained, tranquil cognitive flow that protects rather than exhausts your adrenals."""
    },
    {
        "id": 6,
        "slug_vi": "nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi",
        "slug_en": "hydration-electrolytes-cellular-osmosis-workout-en",
        "title_vi": "Uống nước khi tập thể thao: Nghịch lý ngộ độc nước và vai trò của chất điện giải",
        "title_en": "Hydration During Workout: The Water Intoxication Paradox and Electrolyte Balance",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ĐỘNG HỌC THẨM THẤU TẾ BÀO VÀ NỒNG ĐỘ NATRI MÁU              │
├─────────────────────────────────────────────────────────────────────────────┤
│ KỊCH BẢN NẠP NƯỚC LỌC TINH KHIẾT QUÁ MỨC KHI ĐỔ MỒ HÔI:                     │
│ [Vận động nặng: Mồ hôi thoát ra mang theo 1-2g Natri/giờ]                   │
│                                           │                                 │
│                                           ▼                                 │
│ [Uống ồ ạt 1-2 lít nước lọc tinh khiết] ──► [Pha loãng Natri huyết tương]   │
│                                           │                                 │
│                                           ▼                                 │
│ [Áp suất thẩm thấu ngoại bào tụt dốc] ──► [Nước tràn vào tế bào qua Aquaporin]│
│                                           │                                 │
│                                           ▼                                 │
│ [HẠ NATRI MÁU (EAH): Đau đầu, phù não, chuột rút, mệt mỏi kiệt quệ]        │
├─────────────────────────────────────────────────────────────────────────────┤
│ KỊCH BẢN BÙ KHOÁNG ĐẲNG TRƯƠNG THỰC CHỨNG:                                 │
│ [Nước + Natri (500-700mg/L) + một chút Glucose]                             │
│               │                                                             │
│               ▼                                                             │
│ [Đồng vận chuyển SGLT1 tại ruột non] ──► [Hấp thu nước và khoáng siêu tốc] │
│               │                                                             │
│               ▼                                                             │
│ [Thể tích huyết tương ổn định] ──► [Duy trì cung lượng tim, chống kiệt sức] │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│           CELLULAR OSMOREGULATION & EXERCISE SODIUM KINETICS                │
├─────────────────────────────────────────────────────────────────────────────┤
│ HAZARDOUS PLAIN WATER HYPER-HYDRATION UNDER PROFUSE SWEAT:                  │
│ [Prolonged exertion: 1-2g Sodium lost per liter of perspiration]            │
│                                           │                                 │
│                                           ▼                                 │
│ [Copious pure water intake] ──► [Dilution of extracellular fluid sodium]    │
│                                           │                                 │
│                                           ▼                                 │
│ [Extracellular osmolarity plunges] ──► [Water flows intracellularly]        │
│                                           │                                 │
│                                           ▼                                 │
│ [EXERCISE-ASSOCIATED HYPONATREMIA (EAH): Cephalea, cerebral edema, collapse]│
├─────────────────────────────────────────────────────────────────────────────┤
│ PHYSIOLOGICAL ELECTROLYTE REPLACEMENT PROTOCOL:                             │
│ [Hypotonic/Isotonic matrix: 500-700 mg/L Sodium + traces of glucose]        │
│               │                                                             │
│               ▼                                                             │
│ [SGLT1 co-transporters in enterocytes] ──► [Rapid osmotic fluid assimilation]│
│               │                                                             │
│               ▼                                                             │
│ [Plasma volume preservation] ──► [Cardiac output maintained, cramps avoided] │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Lắng nghe tín hiệu khát thay vì uống nước máy móc

Lời khuyên 'uống đủ 2-3 lít nước mỗi ngày' thường bị hiểu sai thành việc phải liên tục nốc từng ngụm nước lớn ngay cả khi cơ thể không đòi hỏi. Trong y học thể thao, chúng tôi chứng kiến không ít trường hợp vận động viên bị cấp cứu không phải vì thiếu nước, mà chính vì ngộ độc nước do uống nước lọc quá nhiều khi cơ thể đang cạn kiệt muối khoáng.

Cơ thể con người sở hữu một trung tâm điều nhiệt và khát cực kỳ tinh xảo tại vùng dưới đồi. Hãy uống nước theo cảm giác khát tự nhiên và đừng quên rằng nước trong cơ thể chúng ta là một đại dương muối khoáng sống động. Khi vận động ra nhiều mồ hôi, một nhúm muối khoáng nhỏ hòa cùng vài giọt chanh chính là liều thuốc trợ lực tuyệt vời nhất để bảo vệ từng tế bào cơ bắp và hệ thần kinh của bạn.""",
        "reflection_en": """### The Doctor's Reflection: Trusting Thirst Over Dogmatic Volume Targets

The ubiquitous recommendation to consume massive arbitrary fluid quotas often leads to mechanical overhydration. In sports medicine and emergency wards, life-threatening complications during marathons routinely arise not from dehydration, but from acute hyponatremia driven by aggressive plain water intake.

Human physiology possesses a remarkably calibrated osmoregulatory center in the hypothalamus. Drink primarily to quench physiological thirst rather than rigid schedules. Remember that internal fluids reflect a saline biological ocean; when heavy perspiration strips minerals, pairing fluid with modest sodium ensures cellular hydration, protecting cardiac output and neurological integrity."""
    },
    {
        "id": 7,
        "slug_vi": "tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi",
        "slug_en": "warm-bath-effect-on-core-body-temperature-sleep-en",
        "title_vi": "Tắm nước ấm trước khi ngủ: Nghịch lý hạ nhiệt độ cơ thể và giấc ngủ ngon",
        "title_en": "Taking a Warm Bath Before Sleep: The Core Cooling Paradox for Restful Slumber",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ĐỘNG HỌC NHIỆT VÀ ĐIỀU HÒA GIẤC NGỦ BAN ĐÊM                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 1: TẮM HOẶC NGÂM NƯỚC ẤM (40 - 42.5°C TRƯỚC NGỦ 90 PHÚT)          │
│ [Nhiệt ngoại bào kích thích thụ thể nhiệt TRPV1 dưới da]                     │
│               │                                                             │
│               ▼                                                             │
│ [Mạng lưới mạch máu ngoại vi tại bàn tay, bàn chân giãn nở tối đa (AVA)]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 2: BƯỚC RA KHỎI NƯỚC VÀ NGHỊCH LÝ LÀM MÁT LÕI (CORE COOLING):      │
│ [Mạch máu mở rộng biến da thành một chiếc 'Tản nhiệt điều hòa' khổng lồ]    │
│               │                                                             │
│               ▼                                                             │
│ [Nhiệt lượng từ tim, não, nội tạng thoát ra ngoài qua da với tốc độ cao]    │
│               │                                                             │
│               ▼                                                             │
│ [Nhiệt độ lõi cơ thể tụt xuống 0.5 - 1°C] ──► [SCN nhận tín hiệu ngủ sâu]    │
│               │                                                             │
│               ▼                                                             │
│ [Thời gian chìm vào giấc ngủ rút ngắn 36%] ──► [Kéo dài giấc ngủ phục hồi SWS]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│            THERMAL KINETICS & CIRCADIAN SOMNOGENIC INDUCTION                │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: PASSIVE BODY HEATING (40-42.5°C BATH/SHOWER 90 MIN BEFORE BED):    │
│ [Cutaneous TRPV4/TRPV1 thermoreceptors activated by warm water]             │
│               │                                                             │
│               ▼                                                             │
│ [Maximal vasodilation of distal arteriovenous anastomoses (AVAs) in limbs]  │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: EXITING WATER & CORE TEMPERATURE PRECIPITATION:                    │
│ [Peripheral capillary beds act as an expansive biological thermal radiator] │
│               │                                                             │
│               ▼                                                             │
│ [Internal heat from splanchnic organs dumped rapidly into ambient air]      │
│               │                                                             │
│               ▼                                                             │
│ [Core body temperature drops steeply by 0.5-1.0°C] ──► [Somnogenic signal]  │
│               │                                                             │
│               ▼                                                             │
│ [Sleep Onset Latency slashed by 36%] ──► [Augmentation of Slow-Wave Sleep]  │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Để cơ thể tự làm mát và rũ bỏ áp lực ngày dài

Có một nghịch lý thú vị trong sinh học: để làm mát căn nhà bên trong, chúng ta phải mở toang những cánh cửa sổ ở phía ngoài. Tắm nước ấm chính là chiếc chìa khóa mở toang cánh cửa mạch máu ngoại vi, giúp bạn giải phóng toàn bộ hơi nóng và sự căng thẳng tích tụ suốt một ngày làm việc mệt mỏi.

Đừng biến việc chuẩn bị đi ngủ thành một thủ tục vội vàng. Hãy dành 10-15 phút dưới làn nước ấm như một khoảng lặng tách biệt giữa thế giới hối hả ngoài kia và thế giới an yên trong phòng ngủ. Cảm giác hơi ấm bao bọc da thịt, tiếp nối bằng sự mát lành dịu nhẹ khi cơ thể tự hạ nhiệt, chính là lời ru êm ái nhất mà thiên nhiên ban tặng cho giấc ngủ của con người.""",
        "reflection_en": """### The Doctor's Reflection: Cooling Down to Restore Inner Tranquility

Biology is replete with elegant paradoxes: to cool the internal core, one must deliberately swing open the peripheral windows. A warm bath serves as that physiological key, unlocking distal cutaneous blood flow to discharge somatic heat and psychological tension accumulated across the workday.

Never reduce evening preparations to a rushed chore. Regard 10 to 15 minutes of warm bathing as a sacred sanctuary separating the relentless demands of the outside world from your restful nocturnal chamber. The comforting cocoon of warm water, followed by the quiet drop in internal core temperature, is physiology’s most natural lullaby for deep, restorative sleep."""
    },
    {
        "id": 8,
        "slug_vi": "muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi",
        "slug_en": "salt-blood-pressure-sodium-potassium-ratio-paradox-en",
        "title_vi": "Kiêng muối vẫn tăng huyết áp: Khám phá nghịch lý tỷ lệ Natri và Kali",
        "title_en": "Salt and Blood Pressure: Unraveling the Sodium-to-Potassium Ratio Paradox",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 BƠM SINH HỌC NA+/K+-ATPASE VÀ TRƯƠNG LỰC MẠCH MÁU            │
├─────────────────────────────────────────────────────────────────────────────┤
│ KỊCH BẢN THIẾU KALI (DÙ ĂN ÍT MUỐI NHƯNG KHÔNG ĂN RAU QUẢ):                 │
│ [Nồng độ Kali ngoại bào thấp] ──► [Bơm Na+/K+-ATPase tại tế bào cơ trơn suy yếu]│
│                                           │                                 │
│                                           ▼                                 │
│ [Natri & Canxi bị kẹt lại trong tế bào] ──► [Cơ trơn thành mạch co thắt mạnh]│
│                                           │                                 │
│                                           ▼                                 │
│ [Sức cản ngoại vi tăng vọt] ──────────────► [HUYẾT ÁP TĂNG CAO MÃN TÍNH]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ KỊCH BẢN CÂN BẰNG TỶ LỆ VÀNG (BỔ SUNG KALI ĐẦY ĐỦ):                         │
│ [Thực phẩm giàu Kali: Rau xanh, chuối, khoai lang, muối khoáng KCl 25%]     │
│               │                                                             │
│               ▼                                                             │
│ [Kích hoạt bài niệu Natri tại ống thận] ──► [Thận tự động đào thải Natri thừa]│
│               │                                                             │
│               ▼                                                             │
│ [Tăng tổng hợp Nitric Oxide (NO)] ──────► [Mạch máu giãn nở mềm mại, đàn hồi]│
│               │                                                             │
│               ▼                                                             │
│ [Giảm 14% nguy cơ đột quỵ và tử vong] ───► [Huyết áp ổn định an toàn vững bền]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│           CELLULAR NA+/K+-ATPASE & VASCULAR RESISTANCE MODULATION           │
├─────────────────────────────────────────────────────────────────────────────┤
│ HYPOKALEMIC STATE (SALT RESTRICTION WITHOUT POTASSIUM-RICH GREENS):         │
│ [Low extracellular Potassium] ──► [Impaired Na+/K+-ATPase pump cycling]     │
│                                           │                                 │
│                                           ▼                                 │
│ [Intracellular Sodium & Calcium accumulation] ──► [Arterial smooth spasm]   │
│                                           │                                 │
│                                           ▼                                 │
│ [Elevated systemic vascular resistance] ──► [PERSISTENT ARTERIAL HYPERTENSION]│
├─────────────────────────────────────────────────────────────────────────────┤
│ OPTIMIZED SODIUM-POTASSIUM EQUILIBRIUM:                                     │
│ [Dietary Potassium intake: Leafy greens, tubers, 25% KCl mineral salt]      │
│               │                                                             │
│               ▼                                                             │
│ [Enhanced renal natriuresis] ──► [Kidneys actively excrete excess sodium]   │
│               │                                                             │
│               ▼                                                             │
│ [Upregulation of Endothelial Nitric Oxide] ──► [Supple arterial compliance] │
│               │                                                             │
│               ▼                                                             │
│ [14% reduction in stroke & mortality] ──► [Long-term cardiovascular stability]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Thay đổi tư duy từ 'Kiêng khem' sang 'Bổ sung thông thái'

Trong tư vấn tim mạch, chúng tôi nhận thấy nhiều người lớn tuổi sống trong nỗi sợ hãi muối ăn. Họ luộc mọi thứ không nêm nếm, ăn những bữa cơm nhạt nhẽo đến mất hết cảm giác ngon miệng, nhưng đo huyết áp con số vẫn cao chót vót. Vấn đề không phải họ ăn thừa muối, mà là cơ thể họ đang 'đói' Kali một cách trầm trọng.

Thay vì chỉ chăm chăm cắt giảm muối trong tâm trạng ức chế, hãy chuyển hướng sang việc thêm màu xanh của rau củ, củ quả tươi vào đĩa ăn mỗi ngày. Một chế độ dinh dưỡng giàu Kali tự nhiên sẽ cho phép bạn nêm một chút gia vị vừa miệng để thưởng thức trọn vẹn hương vị bữa cơm gia đình mà trái tim và mạch máu vẫn được bảo vệ tối ưu.""",
        "reflection_en": """### The Doctor's Reflection: Shifting From Fearful Restriction to Abundant Nourishment

In cardiovascular clinics, patients frequently arrive terrified of culinary salt. They endure joyless, unseasoned meals, stripping away dining pleasure, only to find their blood pressure readings stubbornly elevated. Their underlying deficit is rarely excessive sodium alone, but profound cellular potassium depletion.

Rather than fixating on punitive deprivation, redirect your focus toward dietary abundance: load your plate with leafy greens, legumes, and potassium-rich whole foods. A robust intake of potassium equips your kidneys to eliminate excess sodium effortlessly, allowing you to enjoy flavorful, seasoned meals while keeping your vascular tree resilient."""
    },
    {
        "id": 9,
        "slug_vi": "tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi",
        "slug_en": "resistant-starch-cold-rice-gut-microbiome-scfa-en",
        "title_vi": "Cơm nguội để tủ lạnh tốt cho đường ruột: Bí mật cấu trúc Tinh bột Kháng",
        "title_en": "Cold Rice for Gut Health: How Resistant Starch Nourishes the Microbiome",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ĐỘNG HỌC THOÁI HÓA TINH BỘT VÀ LÊN MEN VI SINH               │
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 1: NẤU CHÍN VÀ LÀM LẠNH (RETROGRADATION - KẾT TINH LẠI):          │
│ [Cơm nóng: Chuỗi Amylose duỗi thẳng, dễ bị enzyme tiêu hóa cắt nhỏ]         │
│               │                                                             │
│               ▼ (LÀM LẠNH 4°C TRONG 12 - 24 GIỜ)                            │
│ [Các chuỗi Amylose co cụm, xoắn chặt thành cấu trúc tinh thể khép kín RS3]  │
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 2: ĐI QUA HỆ TIÊU HÓA ĐẾN ĐẠI TRÀNG:                              │
│ [RS3 vượt qua dạ dày và ruột non nguyên vẹn: Enzyme men tụy không cắt được] │
│               │                                                             │
│               ▼                                                             │
│ [Đến đại tràng: Trở thành đại tiệc lên men cho vi khuẩn có lợi Bifidobacteria]│
│               │                                                             │
│               ▼                                                             │
│ [Sản sinh axit béo chuỗi ngắn SCFA (Butyrate)] ──► [Hàn gắn niêm mạc ruột]  │
│               │                                                             │
│               ▼                                                             │
│ [Giảm mỡ tích tụ trong gan, hạ đỉnh đường huyết, tăng độ nhạy Insulin]      │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│           STARCH RETROGRADATION KINETICS & MICROBIAL FERMENTATION           │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: GELATINIZATION & COOLING (RETROGRADATION PHENOMENON):              │
│ [Hot freshly cooked rice: Linear amylose chains uncoiled and accessible]    │
│               │                                                             │
│               ▼ (REFRIGERATION AT 4°C FOR 12-24 HOURS)                      │
│ [Amylose chains realign and recrystallize into tightly packed RS3 matrices] │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: RESISTANCE TO ENZYMATIC HYDROLYSIS & COLONIC FERMENTATION:         │
│ [RS3 traverses stomach and upper small intestine unscathed by amylase]      │
│               │                                                             │
│               ▼                                                             │
│ [Reaches the cecum and colon: Premium prebiotic fuel for Bifidobacteria]    │
│               │                                                             │
│               ▼                                                             │
│ [Bacterial fermentation generates Short-Chain Fatty Acids (Butyrate/Acetate)]│
│               │                                                             │
│               ▼                                                             │
│ [Accelerates hepatic fat clearance, fortifies gut barrier, stabilizes sugar]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Trân quý trí tuệ ẩm thực truyền thống

Trong văn hóa phương Đông, hạt gạo là biểu tượng của sự sống và nguồn nuôi dưỡng ngàn đời. Nhưng trong làn sóng ăn kiêng hiện đại, tinh bột gạo thường bị gán mác là 'thủ phạm' gây béo phì và tiểu đường. Khoa học hóa sinh hiện đại đã giúp chúng ta minh oan cho hạt cơm: chỉ cần một chút tinh chỉnh về nhiệt độ và cách chuẩn bị, chúng ta có thể biến một phần tinh bột tiêu hóa nhanh thành nguồn thức ăn tuyệt vời cho hàng nghìn tỷ vi khuẩn có lợi trong đường ruột.

Bạn không cần phải ăn cơm lạnh ngắt đến khó nuốt. Sau khi cơm được làm lạnh trong tủ để tạo cấu trúc tinh bột kháng RS3, bạn hoàn toàn có thể hâm nóng lại ăn kèm món nóng sốt yêu thích – cấu trúc tinh thể bền vững này sẽ không bị phá hủy. Hãy thưởng thức bát cơm gia đình với sự biết ơn và an tâm, khi biết rằng bạn đang nuôi dưỡng cả cơ thể mình lẫn hệ sinh thái vi sinh vật trung thành bên trong.""",
        "reflection_en": """### The Doctor's Reflection: Honoring Culinary Heritage Through Science

In Asian cultures, rice has sustained generations as the foundational staple of vitality. Yet modern reductionist dieting frequently vilifies starch as an inherent metabolic hazard. Biochemistry offers a nuanced, liberating perspective: through minor adjustments in preparation and cooling, ordinary rice undergoes structural reorganization into prebiotic fuel for trillions of symbiotic microbes.

You do not need to consume cold, unpalatable meals. Once retrograded starch (RS3) crystallizes in the refrigerator, gentle reheating preserves the tightly bound matrix. Savor your meal with peace of mind, knowing that you are nourishing both your systemic energy needs and your vital internal microbiome."""
    },
    {
        "id": 10,
        "slug_vi": "di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi",
        "slug_en": "ten-minute-post-meal-walk-glucose-clearance-en",
        "title_vi": "Đi bộ 10 phút sau bữa ăn: Kích hoạt cơ bắp tiêu thụ đường không cần Insulin",
        "title_en": "A 10-Minute Walk After Meals: Mobilizing Muscle GLUT4 Clearance Without Insulin",
        "diagram_vi": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 CƠ CHẾ HẤP THU GLUCOSE QUA CO CƠ CỦA KÊNH GLUT4             │
├─────────────────────────────────────────────────────────────────────────────┤
│ TRẠNG THÁI NGHỈ NGƠI SAU ĂN (NGỒI HOẶC NẰM NGAY):                           │
│ [Đường Glucose ồ ạt tràn vào máu từ ruột]                                   │
│               │                                                             │
│               ▼                                                             │
│ [Cơ bắp nghỉ: Kênh GLUT4 nằm im lìm bên trong túi nội bào]                  │
│               │                                                             │
│               ▼                                                             │
│ [Tụy buộc phải tiết lượng lớn Insulin để 'mở khóa' kênh] ──► [Nguy cơ kháng Insulin]│
├─────────────────────────────────────────────────────────────────────────────┤
│ TRẠNG THÁI VẬN ĐỘNG NHẸ (ĐI BỘ 10 PHÚT NGAY SAU ĂN):                        │
│ [Các sợi cơ bắp chân và đùi co bóp nhịp nhàng]                              │
│               │                                                             │
│               ▼                                                             │
│ [Kích hoạt enzyme chuyển hóa năng lượng AMPK & giải phóng Canxi nội bào]    │
│               │                                                             │
│               ▼                                                             │
│ [KÊNH GLUT4 TỰ ĐỘNG CHUYỂN VỊ RA MÀNG TẾ BÀO MÀ KHÔNG CẦN INSULIN MỞ KHÓA]   │
│               │                                                             │
│               ▼                                                             │
│ [Cơ bắp hút sạch Glucose thừa] ──► [Hạ 22-30% đỉnh đường huyết, nhẹ bụng]   │
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "diagram_en": """```text
┌─────────────────────────────────────────────────────────────────────────────┐
│       CONTRACTION-MEDIATED GLUT4 TRANSLOCATION (INSULIN-INDEPENDENT)        │
├─────────────────────────────────────────────────────────────────────────────┤
│ POSTPRANDIAL SEDENTARY STATE (IMMEDIATE SITTING OR RECLINING):              │
│ [Nutrient absorption floods portal and systemic circulation with glucose]   │
│               │                                                             │
│               ▼                                                             │
│ [Resting skeletal myocytes: GLUT4 vesicles sequestered intracellularly]     │
│               │                                                             │
│               ▼                                                             │
│ [Beta-cells forced to pump massive Insulin surges] ──► [Metabolic exhaustion]│
├─────────────────────────────────────────────────────────────────────────────┤
│ POSTPRANDIAL LIGHT LOCOMOTION (10-MINUTE GENTLE STROLL):                     │
│ [Rhythmic contractions of quadriceps and soleus muscle fibers]              │
│               │                                                             │
│               ▼                                                             │
│ [Intracellular Calcium fluxes activate AMPK & Calmodulin-dependent kinases] │
│               │                                                             │
│               ▼                                                             │
│ [GLUT4 DIRECTLY TRANSLOCATES TO SARCOLEMMA WITHOUT REQUIRING INSULIN]       │
│               │                                                             │
│               ▼                                                             │
│ [Muscles vacuum glucose from circulation] ──► [Postprandial spike blunted 22%]│
└─────────────────────────────────────────────────────────────────────────────┘
```""",
        "reflection_vi": """### Góc nhìn Bác sĩ: Sức mạnh diệu kỳ từ những bước chân thong thả

Trong tâm lý của nhiều người, tập thể dục thường gắn liền với sự vất vả: phải thay đồ tập, đổ mồ hôi đầm đìa trong phòng gym, hay chạy bộ đến kiệt sức. Suy nghĩ đó vô tình tạo nên một rào cản tâm lý khiến chúng ta chần chừ và từ bỏ.

Khoa học chuyển hóa chứng minh rằng: đôi khi những thói quen nhẹ nhàng, khiêm tốn nhất lại mang đến hiệu quả bảo vệ sức khỏe sâu sắc nhất. Mười phút đi dạo thong thả quanh nhà hoặc góc phố sau bữa cơm không phải là một bài tập ép xác; đó là khoảng thời gian quý giá để bạn thả lỏng tâm trí, hít thở khí trời và trò chuyện cùng người thân. Hãy để đôi chân dẫn dắt bạn qua những bước đi bình thản, và cơ thể bạn sẽ đáp lại bằng một nguồn năng lượng trong lành, nhẹ nhõm suốt cả ngày.""",
        "reflection_en": """### The Doctor's Reflection: The Healing Grace of Unhurried Strides

Exercise is frequently misconstrued as an all-or-nothing ordeal requiring gym apparel, grueling exertion, and physical exhaustion. This intimidation barrier prevents millions from engaging in meaningful movement.

Metabolic biology reveals that gentle, unhurried habits often exert the most profound therapeutic impact. A 10-minute stroll following dinner is not an athletic chore; it is an effortless ritual of decompression, fresh air, and mindful companionship. Allow your feet to move at an easy pace, and your metabolism will reward you with boundless, stabilized vitality."""
    }
]

def update_post(filepath, new_title, new_diagram, new_reflection, is_vi):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Title in frontmatter
    content = re.sub(r'title:\s*\"[^\"]+\"', f'title: "{new_title}"', content, count=1)

    # 2. Update readingTime to 7 phút / 7 min read
    if is_vi:
        content = re.sub(r'readingTime:\s*\"[^\"]+\"', 'readingTime: "7 phút"', content, count=1)
    else:
        content = re.sub(r'readingTime:\s*\"[^\"]+\"', 'readingTime: "7 min read"', content, count=1)

    # 3. Replace diagram section
    # Search between blockquote and first '### 1.'
    diag_heading = "Sơ đồ phản ứng sinh học trong cơ thể:" if is_vi else "Biological pathway reaction sequence:"
    
    # Match from diagram heading or [ ... ] ──► to '### 1.'
    pattern_diag = r'(Sơ đồ phản ứng sinh học trong cơ thể:|Biological pathway reaction sequence:).*?(### 1\.)'
    replacement_diag = f"{diag_heading}\n\n{new_diagram}\n\n---\n\n\\2"
    content = re.sub(pattern_diag, replacement_diag, content, flags=re.DOTALL)

    # 4. Insert Reflection section before references
    ref_heading = "### Tài liệu tham khảo" if is_vi else "### Official Scientific Guidelines"
    pattern_ref = rf'({re.escape(ref_heading)}.*)'
    replacement_ref = f"{new_reflection}\n\n---\n\n\\1"
    
    # Check if reflection already present to avoid duplication
    if "Góc nhìn Bác sĩ" not in content and "The Doctor's Reflection" not in content:
        content = re.sub(pattern_ref, replacement_ref, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated post: {os.path.basename(filepath)}")

# Execute updates
for topic in TOPICS:
    file_vi = os.path.join('content', 'posts', f"{topic['slug_vi']}.md")
    file_en = os.path.join('content', 'posts', f"{topic['slug_en']}.md")
    
    update_post(file_vi, topic['title_vi'], topic['diagram_vi'], topic['reflection_vi'], True)
    update_post(file_en, topic['title_en'], topic['diagram_en'], topic['reflection_en'], False)

print("\nALL 20 POSTS SUCCESSFULLY ENRICHED WITH ACCESSIBLE TITLES, FULL DIAGRAMS, AND REFLECTIONS!")
