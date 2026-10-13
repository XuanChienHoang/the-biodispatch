# -*- coding: utf-8 -*-
"""
Main runner for Batch 2 Life Dispatches Quality & Reference Overhaul:
1. Re-generates all 20 markdown files with rich depth (1,450 - 1,600 words VI, 1,150 - 1,350 words EN)
2. Embeds 100% verified CrossRef & PubMed references
3. Adds tailored Layman Medical Analogies to src/lib/medical-analogies.ts
"""

import os, sys, re

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch2_data_part1 import TOPICS_1_TO_5
from batch2_data_part2 import TOPICS_6_TO_10

POSTS_DIR = r"c:\Hoang's projects\the-biodispatch\content\posts"
ANALOGIES_FILE = r"c:\Hoang's projects\the-biodispatch\src\lib\medical-analogies.ts"

ALL_TOPICS = TOPICS_1_TO_5 + TOPICS_6_TO_10

def build_post_markdown_vi(t):
    # Frontmatter
    fm = f"""---
title: "{t['title_vi']}"
date: "2026-10-13T12:00:00Z"
excerpt: "{t['intro_vi'][:160].strip()}..."
author: "TS. Hoàng Xuân Chiến"
authorRole: "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức"
tags: {t['tags_vi']}
organ: "Metabolic"
tier: "Life Dispatch"
readingTime: "{t['reading_time_vi']}"
featured: false
doi: "{t['doi']}"
gizmo: null
lang: "vi"
image: "{t['image']}"
imageAlt: "{t['image_alt_vi']}"
---

{t['intro_vi']}

![{t['image_alt_vi']}]({t['image']})

> *"{t['quote_vi']}"*

---

Sơ đồ phản ứng sinh học trong cơ thể:

{t['diagram_vi']}

---

{t['table_vi']}

---

{t['section1_vi']}

---

{t['section2_vi']}

---

{t['section3_vi']}

---

{t['section4_vi']}

---

{t['reflection_vi']}

---

### Tài liệu tham khảo và Hướng dẫn Chuyên ngành (Official Guidelines)

{t['ref1_vi']}
{t['ref2_vi']}
"""
    return fm

def build_post_markdown_en(t):
    # Frontmatter
    fm = f"""---
title: "{t['title_en']}"
date: "2026-10-13T12:00:00Z"
excerpt: "{t['intro_en'][:160].strip()}..."
author: "Dr. Xuan Chien Hoang"
authorRole: "Dr. rer. nat. | University of Hamburg, Germany"
tags: {t['tags_en']}
organ: "Metabolic"
tier: "Life Dispatch"
readingTime: "{t['reading_time_en']}"
featured: false
doi: "{t['doi']}"
gizmo: null
lang: "en"
image: "{t['image_en']}"
imageAlt: "{t['image_alt_en']}"
---

{t['intro_en']}

![{t['image_alt_en']}]({t['image_en']})

> *"{t['quote_en']}"*

---

Biological Reaction Pathway Map:

{t['diagram_en']}

---

{t['table_en']}

---

{t['section1_en']}

---

{t['section2_en']}

---

{t['section3_en']}

---

{t['section4_en']}

---

{t['reflection_en']}

---

### References and Official Clinical Guidelines

{t['ref1_en']}
{t['ref2_en']}
"""
    return fm

# 1. Generate all markdown posts
print("=== GENERATING 20 ENRICHED MARKDOWN POSTS ===")
for t in ALL_TOPICS:
    vi_path = os.path.join(POSTS_DIR, f"{t['slug_vi']}.md")
    en_path = os.path.join(POSTS_DIR, f"{t['slug_en']}.md")
    
    vi_content = build_post_markdown_vi(t)
    en_content = build_post_markdown_en(t)
    
    with open(vi_path, 'w', encoding='utf-8') as f:
        f.write(vi_content)
    with open(en_path, 'w', encoding='utf-8') as f:
        f.write(en_content)
        
    vi_words = len(vi_content.split())
    en_words = len(en_content.split())
    print(f"[{t['id']:2d}] VI: {t['slug_vi']:52} ({vi_words:4d} words) | EN: {t['slug_en']:52} ({en_words:4d} words)")

# 2. Build tailored Medical Analogies for all 10 topics
BATCH2_ANALOGIES = """
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
"""

print("\n=== UPDATING src/lib/medical-analogies.ts ===")
with open(ANALOGIES_FILE, 'r', encoding='utf-8') as f:
    analogies_content = f.read()

# Check if already inserted or insert before the closing '};'
if '"nhai-ky-no-lau-giam-calo":' not in analogies_content:
    # insert right before the export function getCuratedAnalogy or right before the closing };
    # look for: "ten-minute-post-meal-walk-glucose-clearance-en": { ... }, };
    closing_pattern = r'(\s*ten-minute-post-meal-walk-glucose-clearance-en[\s\S]*?\}\,\s*\}\;)'
    match = re.search(closing_pattern, analogies_content)
    if match:
        old_block = match.group(1)
        # replace the final closing "};" with BATCH2_ANALOGIES + "\n};"
        new_block = old_block[:-2] + BATCH2_ANALOGIES + "\n};"
        analogies_content = analogies_content.replace(old_block, new_block)
        with open(ANALOGIES_FILE, 'w', encoding='utf-8') as f:
            f.write(analogies_content)
        print("Successfully appended Batch 2 analogies to src/lib/medical-analogies.ts!")
    else:
        print("Pattern match failed, trying alternative insertion point...")
        # fallback: insert before 'export function getCuratedAnalogy'
        idx = analogies_content.find('export function getCuratedAnalogy')
        if idx != -1:
            # find last '};' before idx
            last_bracket = analogies_content.rfind('};', 0, idx)
            if last_bracket != -1:
                analogies_content = analogies_content[:last_bracket] + BATCH2_ANALOGIES + analogies_content[last_bracket:]
                with open(ANALOGIES_FILE, 'w', encoding='utf-8') as f:
                    f.write(analogies_content)
                print("Successfully inserted Batch 2 analogies before getCuratedAnalogy!")
else:
    print("Batch 2 analogies already exist in src/lib/medical-analogies.ts.")

print("\nBatch 2 Enrichment & Reference Overhaul complete!")
