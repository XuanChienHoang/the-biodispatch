import fs from 'fs';
import path from 'path';

// Topics Radar Catalog for Autonomous Dispatches
// Curated by TS. Xuan Chien Hoang: Molecular, Metabolic, Longevity, Neuroscience
export const DISPATCH_RADAR_TOPICS = [
  {
    topicId: 'glymphatic-brain-wash-deep-sleep',
    slugVi: 'glymphatic-deep-sleep-brain-cleaning',
    slugEn: 'glymphatic-deep-sleep-brain-cleaning-en',
    titleVi: "Hệ Thống Glymphatic và Cơn 'Rửa Xe' Não Bộ Lúc Nửa Đêm: Cơ Chế Dọn Dẹp Amyloid-Beta Khi Ngủ Sâu",
    titleEn: "The Glymphatic System and the Midnight Brain Wash: Molecular Clearance of Amyloid-Beta During Deep Slow-Wave Sleep",
    excerptVi: "Trong pha ngủ sâu NREM, khoảng kẽ nội sọ nở rộng hơn 60%, tạo điều kiện cho dòng dịch não tủy cuốn phăng các mảng tích tụ độc tính thần kinh. Khám phá cơ chế phân tử phía sau chiếc máy lọc sinh học của não bộ.",
    excerptEn: "During deep slow-wave NREM sleep, interstitial space volume expands by 60%, allowing cerebrospinal fluid to flush out neurotoxic oligomers. Unveiling the molecular machinery behind the brain's internal lymphatic wash.",
    organ: 'Brain',
    tier: 'Clinical Deep-Dive',
    tagsVi: ['Khoa học Não bộ', 'Hệ Glymphatic', 'Chất lượng Giấc ngủ', 'Thoái hóa Thần kinh', 'Amyloid-Beta'],
    tagsEn: ['Neuroscience', 'Glymphatic System', 'Deep Sleep', 'Neurodegeneration', 'Amyloid-Beta'],
    doi: '10.1126/science.1241224',
    pmid: '24136966',
    journal: 'Science',
    year: 2013,
    gizmo: 'pathway',
    readingTimeVi: '8 phút đọc',
    readingTimeEn: '8 min read',
    analogyVi: 'Bộ não của chúng ta giống như một đại đô thị phồn hoa ban ngày với giao thông tấp nập. Đến đêm khuya khi xe cộ ngừng lưu thông, xe bồn công ích mới bắt đầu phun nước áp lực cao quét sạch bụi bẩn và rác rưởi trên mặt đường.',
    analogyEn: 'Our brain operates like a bustling metropolis by day. Only under cover of midnight, when traffic subsides, do municipal street sweepers release pressurized washwater to clear debris and metabolic litter off the avenues.',
    leadVi: 'Trong suốt nhiều thập kỷ, giải phẫu học cổ điển tin rằng não bộ là cơ quan duy nhất không có hệ bạch huyết (Lymphatic system). Nhưng vào năm 2012-2013, nhóm nghiên cứu tại Đại học Rochester dẫn đầu bởi GS. Maiken Nedergaard đã làm rung chuyển giới thần kinh học khi phát hiện ra **Hệ thống Glymphatic** (Glial-lymphatic).',
    leadEn: 'For over a century, classical neuroanatomy maintained that the mammalian central nervous system lacked a conventional lymphatic vascular network. However, pioneering work by Prof. Maiken Nedergaard uncovered the **Glymphatic System** (Glial-lymphatic pathway), redefining our understanding of cerebral metabolic clearance.',
    flowchart: '[Giấc ngủ sâu NREM Sóng chậm] ──► [Kênh Aquaporin-4 (AQP4) trên Astrocyte mở rộng] ──► [Khoảng kẽ nở rộng 60%] ──► [Dịch Não Tủy (CSF) cuốn trôi Amyloid-Beta & Tau]',
    sectionsVi: [
      {
        heading: '1. Kênh nước Aquaporin-4 (AQP4): Chiếc van bơm xả áp suất vi mô',
        body: `Cơ chế lọc rửa của hệ Glymphatic phụ thuộc hoàn toàn vào vị trí của các kênh vận chuyển nước **Aquaporin-4 (AQP4)** nằm tập trung dày đặc ở các "chân" của tế bào hình sao (Astrocyte endfeet) bọc xung quanh mao mạch máu não.

Khi bước vào giấc ngủ sóng chậm (Slow-Wave Sleep), nồng độ chất dẫn truyền thần kinh Noradrenaline tụt giảm rõ rệt. Tín hiệu này kích hoạt các tế bào hình sao co cụm lại, khiến khoảng kẽ giữa các tế bào thần kinh nở rộng thêm tới **60% thể tích**. 

Sự gia tăng thể tích đột ngột này biến mô não từ một miếng bọt biển khô đặc thành một mê cung thông thoáng, cho phép dòng dịch não tủy (CSF) mang áp lực đối lưu xuyên thấu qua nhu mô não, hòa lẫn với dịch kẽ (ISF) và cuốn trôi các protein sai hỏng.`
      },
      {
        heading: '2. Nghịch lý tích tụ Amyloid-Beta và Protein Tau trong mất ngủ kinh niên',
        body: `Nhiều người lầm tưởng rằng các bệnh lý thoái hóa như Alzheimer chỉ đơn thuần do sản sinh quá mức các mảng xơ Amyloid-Beta (Aβ). Tuy nhiên, các đo đạc dược động học gần đây chỉ ra rằng: **Tốc độ dọn dẹp (Clearance Rate) mới là yếu tố quyết định nồng độ độc tính tích lũy**.

| Trạng thái Sinh lý | Thể tích Khoảng kẽ Nội sọ | Tốc độ Rửa trôi Amyloid-Beta | Nồng độ Noradrenaline Não bộ |
| :--- | :--- | :--- | :--- |
| **Tỉnh táo (Awake)** | Tiêu chuẩn (100% dung tích nền) | Chậm (Dưới 10% lưu lượng cực đại) | Rất cao (Kìm hãm AQP4) |
| **Ngủ nông / Gián đoạn** | Mở rộng nhẹ (110 - 120%) | Cắt khúc, lưu lượng không đồng đều | Dao động bất thường |
| **Ngủ sâu Sóng chậm (NREM)** | Mở rộng vượt bậc (+60%) | Cực đại (Tăng gấp 2 - 3 lần) | Chạm đáy sinh học tối thiểu |

Chỉ cần một đêm mất ngủ hoàn toàn, nồng độ Amyloid-Beta và Tau trong dịch não tủy có thể tăng vọt từ 25% đến 50%, tương đương với tình trạng tổn thương vi mô cấp tính.`
      },
      {
        heading: '3. Can thiệp lâm sàng: Tối ưu hóa chu kỳ Glymphatic tự nhiên',
        body: `Để tối ưu hóa hiệu quả dọn rác não bộ mỗi đêm mà không cần can thiệp dược lý phức tạp, các nguyên lý sinh học phân tử khuyến nghị:

* **Tư thế ngủ nghiêng (Lateral position)**: Các mô hình MRI động học chứng minh dòng chảy Glymphatic đạt hiệu suất lưu chuyển cao nhất khi nằm nghiêng so với nằm ngửa hoặc nằm sấp.
* **Ổn định nhiệt độ lõi cơ thể**: Hạ nhiệt độ phòng ngủ xuống 18-20°C giúp kích hoạt hệ đối giao cảm, hạ nồng độ Noradrenaline trung ương nhanh hơn.
* **Khoảng cách bữa tối và giấc ngủ**: Tránh ăn sát giờ ngủ ít nhất 3 tiếng để ngăn chặn đỉnh bài tiết insulin làm gián đoạn bài tiết hormone tăng trưởng GH và sóng chậm delta.`
      }
    ],
    sectionsEn: [
      {
        heading: '1. Aquaporin-4 (AQP4) Water Channels: The Biophysical Flush Valves',
        body: `Glymphatic convective filtration relies predominantly on the polarization of **Aquaporin-4 (AQP4)** water channels densely clustered at astrocyte vascular endfeet encasing cerebral microvessels.

Upon entering delta slow-wave sleep, locus coeruleus noradrenergic tone drops dramatically. This reduction triggers astroglial volume shifts, expanding interstitial space volume by approximately **60%**.

This structural reorganization reduces hydrodynamic resistance throughout the parenchyma, enabling rapid convective influx of cerebrospinal fluid (CSF) into the interstitial domain to wash out metabolic solutes.`
      },
      {
        heading: '2. Clearance Failure vs. Overproduction in Neurodegeneration',
        body: `Contrary to classical assumptions that neurodegenerative pathologies originate solely from protein overproduction, pharmacokinetic isotope-tracing demonstrates that **impaired convective clearance** is often the primary driver of peptide accumulation.

| Physiological State | Interstitial Volume Fraction | Amyloid-Beta Clearance | Central Noradrenergic Tone |
| :--- | :--- | :--- | :--- |
| **Awake** | Baseline baseline (100%) | Basal (<10% peak flux) | High (Inhibits AQP4 polarity) |
| **Fragmented Sleep** | Partial expansion (110 - 120%) | Interrupted convective flux | Frequent spikes |
| **Slow-Wave NREM Sleep** | Maximal expansion (+60%) | Peak rate (2x - 3x increase) | Biological nadir |

Acute sleep deprivation produces an immediate 25-50% elevation in cerebrospinal Amyloid-Beta burden, highlighting the critical neuroprotective role of slow-wave sleep architecture.`
      },
      {
        heading: '3. Translational Strategies to Support Glymphatic Flux',
        body: `Optimizing nightly neurovascular cleansing without synthetic pharmacological interventions centers on bio-circadian alignment:

* **Lateral Sleeping Posture**: Dynamic contrast-enhanced MRI reveals convective glymphatic transport is significantly more efficient in lateral versus supine or prone postures.
* **Core Temperature Down-regulation**: Ambient bedroom temperatures between 18-20°C facilitate nocturnal vagal activation and accelerate locus coeruleus silencing.
* **Pre-sleep Fasting Window**: Avoiding caloric intake within 3 hours of sleep prevents postprandial hyperinsulinemia from interfering with delta sleep initiation.`
      }
    ]
  },
  {
    topicId: 'nad-sirtuins-cd38-mitochondria',
    slugVi: 'nad-cd38-sirtuin-mitochondria-cellular-aging',
    slugEn: 'nad-cd38-sirtuin-mitochondria-cellular-aging-en',
    titleVi: "Trục NAD+, Sirtuin và Kẻ Tiêu Tốn CD38: Cuộc Chiến Bảo Toàn Năng Lượng Ty Thể Khi Tế Bào Già Cỗi",
    titleEn: "The NAD+-Sirtuin Axis and the CD38 Sink: Conserving Mitochondrial Bioenergetics Against Cellular Senescence",
    excerptVi: "Khi tuổi tác tăng lên, nồng độ phân tử truyền năng lượng NAD+ tụt dốc không chỉ vì suy giảm tổng hợp mà do enzyme viêm CD38 tăng hoạt tính ngốn cạn nguồn dự trữ. Khám phá cơ chế điều hòa trục Sirtuin bảo vệ mạng lưới ty thể.",
    excerptEn: "Aging depletes intracellular NAD+ pools not merely through synthesis decline, but via inflammatory hyper-activation of the ectoenzyme CD38. Dissecting the molecular warfare between CD38 consumption and Sirtuin mitochondrial fidelity.",
    organ: 'Cellular Aging',
    tier: 'Clinical Deep-Dive',
    tagsVi: ['Lão hóa Tế bào', 'NAD+', 'Sirtuins', 'Ty thể', 'CD38', 'Chuyển hóa Năng lượng'],
    tagsEn: ['Cellular Aging', 'NAD+', 'Sirtuins', 'Mitochondria', 'CD38', 'Bioenergetics'],
    doi: '10.1038/s41580-020-00313-x',
    pmid: '33318698',
    journal: 'Nature Reviews Molecular Cell Biology',
    year: 2021,
    gizmo: 'pathway',
    readingTimeVi: '9 phút đọc',
    readingTimeEn: '9 min read',
    analogyVi: 'NAD+ giống như dòng tiền thanh khoản cao nuôi sống mọi giao dịch trong một tập đoàn. Sirtuins là ban giám đốc đầu tư chiến lược giúp doanh nghiệp trường tồn, trong khi enzyme CD38 viêm nhiễm giống như một lỗ rò ngân sách khổng lồ âm thầm tiêu tán toàn bộ vốn liếng trước khi ban giám đốc kịp hành động.',
    analogyEn: 'NAD+ behaves as the high-liquidity cash reserves funding every transaction in an enterprise. Sirtuins represent visionary stewards investing in long-term infrastructure, while the inflammatory enzyme CD38 acts as an unchecked budget leak draining assets before stewardship can occur.',
    leadVi: 'Nicotinamide Adenine Dinucleotide (NAD+) là một trong những phân tử cổ xưa và thiết yếu nhất của sự sống. Từ phản ứng đường phân, chu trình Krebs đến sửa chữa đứt gãy sợi đôi ADN thông qua PARP1, không có tế bào nào có thể tồn tại nếu thiếu NAD+.',
    leadEn: 'Nicotinamide Adenine Dinucleotide (NAD+) represents an indispensable coenzyme discovered over a century ago. Operating at the core of cellular glycolysis, oxidative phosphorylation, and DNA repair machinery, NAD+ bioavailability dictates cell survival.',
    flowchart: '[Tuổi tác & Viêm mạn tính (SASP)] ──► [Đại thực bào biểu hiện CD38 tăng vọt] ──► [Tiêu hao cạn kiệt nguồn NAD+] ──► [Bất hoạt Sirtuin (SIRT1/SIRT3)] ──► [Suy thoái Ty thể & Lão hóa]',
    sectionsVi: [
      {
        heading: '1. Nghịch lý NAD+: Không phải thiếu nguyên liệu, mà bị rò rỉ bởi CD38',
        body: `Trong nhiều năm, chiến lược tăng cường NAD+ chỉ tập trung vào việc bổ sung tiền chất (NR, NMN). Tuy nhiên, các nghiên cứu chấn động từ Viện Mayo Clinic chỉ ra rằng khi già đi, các tế bào bạch cầu và đại thực bào tích tụ trong mô phát tín hiệu viêm SASP, kích thích biểu hiện enzyme màng **CD38** tăng gấp nhiều lần.

CD38 là một enzyme thủy phân NAD+ cực kỳ phàm ăn: nó có thể tiêu thụ tới **100 phân tử NAD+** chỉ để tạo ra một phân tử tín hiệu duy nhất. 

Do đó, bổ sung tiền chất mà không kiểm soát sự tăng hoạt tính của CD38 giống như cố gắng đổ thêm nước vào một chiếc xô đã bị thủng đáy.`
      },
      {
        heading: '2. Tác động chuỗi lên Sirtuins và quá trình phân rã ty thể',
        body: `Khi nồng độ NAD+ nội bào chạm ngưỡng báo động, hai enzyme kiểm soát tuổi thọ quan trọng bậc nhất bị tê liệt:

* **SIRT1 (Trong nhân)**: Mất khả năng khử acetyl hóa yếu tố PGC-1α, dẫn tới ngừng trệ quá trình sinh mới ty thể (Mitochondrial Biogenesis).
* **SIRT3 (Trong ty thể)**: Mất khả năng kích hoạt superoxide dismutase (SOD2), khiến gốc tự do ROS tràn ngập và phá hủy chuỗi truyền điện tử.

| Thông số Phân tử | Tế bào Trẻ trung | Tế bào Lão hóa không can thiệp | Kiểm soát CD38 + Tối ưu NAD+ |
| :--- | :--- | :--- | :--- |
| **Nồng độ NAD+ nội bào** | 100% (Mức tối ưu) | Giảm 50 - 70% | Phục hồi 85 - 95% |
| **Hoạt tính CD38** | Thấp, kiểm soát chặt | Tăng sinh 300 - 500% | Bị ức chế về ngưỡng cân bằng |
| **Khả năng sinh mới Ty thể** | Mạnh mẽ qua PGC-1α | Đình trệ, ty thể trương phình | Kích hoạt trở lại liên tục |`
      },
      {
        heading: '3. Giải pháp phân tử tự nhiên: Ức chế CD38 kết hợp sinh học',
        body: `Để bịt lỗ rò CD38 một cách an toàn và tự nhiên:

* **Apigenin (từ rau cần tây và hoa cúc chamomile)**: Hoạt chất flavonoid tự nhiên này được chứng minh là chất ức chế chọn lọc CD38 mạnh mẽ nhất trong thực vật, giúp bảo toàn nồng độ NAD+ nội sinh mà không gây ức chế miễn dịch.
* **Quercetin**: Phối hợp hiệp đồng giảm gánh nặng tế bào già cỗi (Senolytics), từ đó triệt tiêu nguồn phát tín hiệu gây tăng sinh CD38.
* **Nhịp điệu vận động**: Bài tập HIIT ngắt quãng kích hoạt enzyme tái chế NAMPT, khép kín chu trình thu hồi NAD+ tự thân.`
      }
    ],
    sectionsEn: [
      {
        heading: '1. The NAD+ Paradox: Not a Synthesis Deficit, but a CD38 Sink',
        body: `Early longevity paradigms focused purely on replenishing biosynthetic precursors (NR, NMN). Seminal work from the Mayo Clinic, however, established that senescent cell secretomes (SASP) drive exponential upregulation of **CD38**, an ecto-enzyme expressed on immune macrophages.

CD38 functions as a catalytic black hole: consuming up to **100 molecules of NAD+** to synthesize a single cyclic ADP-ribose messenger.

Pouring precursors into a biological system with hyperactive CD38 without addressing enzymatic breakdown is thermodynamic futility.`
      },
      {
        heading: '2. Downstream Collapse of the Sirtuin Regulatory Network',
        body: `Depletion of the free NAD+ pool deprives sirtuins of their required obligate co-substrate:

* **Nuclear SIRT1**: Fails to deacetylate PGC-1α, paralyzing de novo mitochondrial biogenesis.
* **Mitochondrial SIRT3**: Cannot activate SOD2, unleashing reactive oxygen species that dismantle respiratory complexes.

| Molecular Parameter | Youthful Baseline | Unchecked Senescence | CD38 Inhibition + NAD+ Support |
| :--- | :--- | :--- | :--- |
| **Intracellular NAD+ Pool** | 100% (Optimal) | Depleted 50 - 70% | Restored to 85 - 95% |
| **CD38 Hydrolytic Activity** | Basal tight regulation | Elevated 300 - 500% | Suppressed to physiologic range |
| **PGC-1α Biogenesis** | Active mitochondrial renewal | Stalled, fragmented organelles | Robust biogenesis restored |`
      },
      {
        heading: '3. Targeted Natural Modulation: Plugging the Enzymatic Sink',
        body: `Translational strategies to preserve endogenous NAD+ availability:

* **Apigenin (Apium graveolens & Chamomile)**: Acts as a potent, plant-derived non-competitive inhibitor of CD38, attenuating hyper-catalytic NAD+ consumption.
* **Quercetin-mediated Senolysis**: Clears pro-inflammatory senescent cells that induce CD38 expression.
* **Pulsed Exercise**: High-intensity interval efforts stimulate the salvage pathway enzyme NAMPT, accelerating endogenous recycling.`
      }
    ]
  },
  {
    topicId: 'butyrate-scfa-histone-epigenetics',
    slugVi: 'butyrate-scfa-epigenetics-histone-gut-barrier',
    slugEn: 'butyrate-scfa-epigenetics-histone-gut-barrier-en',
    titleVi: "Axit Béo Chuỗi Ngắn Butyrate: Chiếc Chìa Khóa Biểu Sinh Mở Khóa Miễn Dịch và Hàng Rào Ruột",
    titleEn: "Short-Chain Fatty Acid Butyrate: Epigenetic Master Key of Gut Barrier Integrity and Histone Deacetylase Inhibition",
    excerptVi: "Butyrate không chỉ là nguồn thức ăn nuôi sống 70% tế bào niêm mạc đại tràng, mà còn là một chất ức chế HDAC biểu sinh tự nhiên điều hòa biểu hiện gen chống viêm và bảo toàn liên kết chặt chẽ Claudin-1.",
    excerptEn: "Beyond fueling 70% of colonic epithelial energy requirements, microbially-derived butyrate functions as an endogenous epigenetic HDAC inhibitor, orchestrating Treg induction and Claudin-1 tight junction fidelity.",
    organ: 'Gut',
    tier: 'Clinical Deep-Dive',
    tagsVi: ['Hệ Vi sinh Đường ruột', 'Butyrate', 'SCFA', 'Biểu sinh học', 'Hàng rào Ruột', 'Miễn dịch'],
    tagsEn: ['Gut Microbiome', 'Butyrate', 'SCFA', 'Epigenetics', 'Gut Barrier', 'Immunology'],
    doi: '10.1038/nature12721',
    pmid: '24226770',
    journal: 'Nature',
    year: 2013,
    gizmo: 'pathway',
    readingTimeVi: '8 phút đọc',
    readingTimeEn: '8 min read',
    analogyVi: 'Niêm mạc ruột của chúng ta giống như một bức tường thành bảo vệ hoàng thành. Butyrate vừa là xi măng trát kín từng khe nứt giữa các viên gạch (Tight junctions), vừa là mật lệnh hoàng gia ra lệnh cho binh lính phòng thủ buông vũ khí chống lại thường dân vô tội (dung nạp miễn dịch).',
    analogyEn: 'The gut epithelial lining acts as the rampart of an ancient fortress. Butyrate serves both as the high-grade mortar sealing microscopic cracks between bricks (tight junctions), and as an imperial decree commanding garrisons to refrain from attacking harmless citizens (immune tolerance).',
    leadVi: 'Trong hệ sinh thái đường ruột với hơn 38 nghìn tỷ vi sinh vật, **Butyrate** (một axit béo chuỗi ngắn gồm 4 carbon) nổi lên như phân tử truyền tin quan trọng bậc nhất kết nối giữa dinh dưỡng, vi sinh vật và bộ máy biểu sinh của vật chủ.',
    leadEn: 'Within the vast intestinal ecosystem harboring over 38 trillion microorganisms, **Butyrate** (a four-carbon short-chain fatty acid) stands as the quintessential molecular nexus uniting host nutrition, microbial metabolism, and host epigenetic machinery.',
    flowchart: '[Chất xơ hòa tan & Tinh bột kháng] ──► [Hệ vi sinh lên men sinh Butyrate] ──► [Ức chế HDAC (Histone Deacetylase)] ──► [Kích hoạt tế bào Treg Foxp3 & Tăng sinh Claudin-1] ──► [Bảo vệ Hàng rào Ruột]',
    sectionsVi: [
      {
        heading: '1. Nguồn nhiên liệu độc quyền nuôi dưỡng tế bào đại tràng (Colonocytes)',
        body: `Khác với đa số tế bào trong cơ thể sử dụng glucose làm năng lượng chính, các tế bào biểu mô đại tràng (Colonocytes) lại tiến hóa để lấy **hơn 70% năng lượng** trực tiếp từ quá trình oxy hóa beta của Butyrate trong lòng ruột.

Khi nguồn cung cấp Butyrate bị thiếu hụt do chế độ ăn nghèo chất xơ, các tế bào niêm mạc rơi vào trạng thái "đói năng lượng" (Energy starvation), dẫn tới teo mỏng lớp màng nhầy và phá vỡ cấu trúc liên kết vi mô.`
      },
      {
        heading: '2. Tác động Biểu sinh: Ức chế tự nhiên enzyme HDAC',
        body: `Khám phá đột phá nhất về Butyrate nằm ở khả năng hoạt động như một chất ức chế **Histone Deacetylase (HDAC)** nội sinh.

Bằng cách ngăn chặn việc loại bỏ nhóm acetyl khỏi protein histone trong nhân tế bào, Butyrate giữ cho cấu trúc chất nhiễm sắc (Chromatin) ở trạng thái mở:
* Cho phép yếu tố phiên mã **Foxp3** tiếp cận ADN, thúc đẩy sự biệt hóa của các tế bào T điều hòa (**Treg**) để ngăn chặn các bệnh tự miễn và viêm ruột mạn tính.
* Tăng cường phiên mã các protein liên kết chặt chẽ như **Claudin-1**, **Occludin** và **ZO-1**, hàn gắn triệt để hiện tượng rò rỉ ruột (Leaky Gut).`
      },
      {
        heading: '3. Chiến lược dinh dưỡng gia tăng Butyrate chuẩn mực',
        body: `Uống trực tiếp viên muối butyrate thường bị hấp thu sớm ở dạ dày và ruột non trước khi tới được đại tràng. Giải pháp sinh học tối ưu là nuôi dưỡng các chủng vi khuẩn sinh butyrate (*Faecalibacterium prausnitzii*, *Roseburia*):

* **Tinh bột kháng loại 3 (RS3)**: Cơm hoặc khoai tây nấu chín để nguội trong tủ lạnh 12-24 giờ làm tái kết tinh cấu trúc tinh bột, đi thẳng xuống đại tràng để vi sinh vật lên men.
* **Inulin và FOS tự nhiên**: Hành tây, tỏi, măng tây và atisô cung cấp các chuỗi fructan lý tưởng.
* **Bơ ghee hữu cơ**: Nguồn butyrate tự nhiên nguyên bản trong ẩm thực cổ truyền.`
      }
    ],
    sectionsEn: [
      {
        heading: '1. Preferred Fuel Substrate for Colonic Epithelium',
        body: `Unlike systemic somatic cells that rely predominantly on circulating glucose, colonic epithelial cells (colonocytes) derive over **70% of their metabolic energy** directly from luminal butyrate beta-oxidation.

Caloric deprivation of butyrate due to ultra-processed low-fiber dietary patterns plunges colonocytes into bioenergetic crisis, initiating autophagy, mucosal atrophy, and loss of epithelial homeostasis.`
      },
      {
        heading: '2. Epigenetic Potency: Endogenous HDAC Class I/II Inhibition',
        body: `The most significant molecular discovery concerning butyrate is its action as an endogenous **Histone Deacetylase (HDAC)** inhibitor.

By preventing the removal of acetyl groups from core histone tails within target cells, butyrate maintains chromatin in a transcriptionally accessible architecture:
* Facilitates unhindered binding of **Foxp3**, driving peripheral differentiation of immunosuppressive regulatory T cells (**Tregs**).
* Directly upregulates expression of **Claudin-1**, **Occludin**, and **ZO-1**, reinforcing paracellular gatekeeper complexes and resolving mucosal permeability.`
      },
      {
        heading: '3. Microbiome Optimization Protocols',
        body: `Direct oral butyrate salts often undergo rapid upper gastrointestinal absorption before reaching the colon. Optimal physiologic delivery relies on fueling native butyrogenic species (*Faecalibacterium prausnitzii*, *Roseburia*):

* **Retrograded Resistant Starch (RS3)**: Cooked and chilled tubers and grains undergo amylose recrystallization, resisting amylase breakdown and delivering substrate directly to the distal colon.
* **Inulin and Fructooligosaccharides (FOS)**: Found naturally in leeks, onions, and Jerusalem artichokes to fuel microbial fermentation.
* **Grass-fed Clarified Butter (Ghee)**: Rich dietary source of preformed bio-absorbable short-chain tributyrin.`
      }
    ]
  }
];
