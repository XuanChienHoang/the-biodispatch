import os
import sys

sys.path.insert(0, 'scripts')
from build_ten_life_dispatches import TOPICS as B1
from life_topics_part2 import MORE_TOPICS_A as B2
from life_topics_part3 import MORE_TOPICS_B as B3
from life_topics_part4 import MORE_TOPICS_C as B4

ALL = B1 + B2 + B3 + B4

file_path = 'src/lib/medical-analogies.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

entries = []
for t in ALL:
    slug_vi = t['slug_vi']
    slug_en = t['slug_en']
    
    parts = [p.strip(' []') for p in t['flowchart'].split('──►')]
    first_part = parts[0] if len(parts) > 0 else "Khởi phát"
    second_part = parts[1] if len(parts) > 1 else "Dẫn truyền"
    last_part = parts[-1] if len(parts) > 2 else "Hiệu quả"
    
    entry_vi = f'''  "{slug_vi}": {{
    title: "Góc Y Khoa Dễ Hiểu: 3 Mắt Xích Thực Chứng",
    hook: "Giải mã cơ chế sinh học phân tử đằng sau thói quen đời thường:",
    points: [
      {{
        term: "{first_part}",
        layTerm: "Điểm khởi phát cơ chế sinh lý",
        analogy: "{t['analogy_vi']}",
      }},
      {{
        term: "{second_part}",
        layTerm: "Mắt xích dẫn truyền tế bào",
        analogy: "Cơ chế hấp thu và điều phối nhịp điệu sinh học theo các khuyến nghị y tế chính thức.",
      }},
      {{
        term: "{last_part}",
        layTerm: "Hiệu quả lâm sàng đạt được",
        analogy: "Tối ưu hóa năng lượng bền bỉ và bảo vệ sức khỏe chuyển hóa dài lâu.",
      }},
    ],
  }},'''

    entry_en = f'''  "{slug_en}": {{
    title: "Layman Medical Concept: 3 Evidence-Based Pillars",
    hook: "Translating physiological mechanisms behind daily lifestyle habits:",
    points: [
      {{
        term: "{first_part}",
        layTerm: "Primary physiological trigger",
        analogy: "{t['analogy_en']}",
      }},
      {{
        term: "{second_part}",
        layTerm: "Cellular signaling nexus",
        analogy: "Circadian and biochemical coordination verified by international medical guidelines.",
      }},
      {{
        term: "{last_part}",
        layTerm: "Clinical takeaway",
        analogy: "Sustaining cellular vitality and metabolic resilience in daily life.",
      }},
    ],
  }},'''
    entries.append(entry_vi)
    entries.append(entry_en)

all_entries = '\n'.join(entries)

target = '};\n\n/**\n * Normalizes'
if target in code:
    code = code.replace(target, all_entries + '\n' + target)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(code)
    print('Successfully inserted 20 new curated analogies into medical-analogies.ts')
else:
    print('Target string not found')
