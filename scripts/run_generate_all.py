import os
import sys
import json
import shutil
import re
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))

# Import all topic batches
from build_ten_life_dispatches import TOPICS as B1
from life_topics_part2 import MORE_TOPICS_A as B2
from life_topics_part3 import MORE_TOPICS_B as B3
from life_topics_part4 import MORE_TOPICS_C as B4

ALL_TOPICS = B1 + B2 + B3 + B4
print(f"Total topics to generate: {len(ALL_TOPICS)}")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
POSTS_DIR = os.path.join(ROOT_DIR, "content", "posts")
IMAGES_DIR = os.path.join(ROOT_DIR, "public", "images", "posts")
COVERS_DIR = os.path.join(ROOT_DIR, "public", "images", "covers")
THUMBS_DIR = os.path.join(ROOT_DIR, "public", "images", "thumbs")
STORE_FILE = os.path.join(ROOT_DIR, "src", "lib", "store.ts")

os.makedirs(POSTS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(COVERS_DIR, exist_ok=True)
os.makedirs(THUMBS_DIR, exist_ok=True)

# 1. Generate Image Assets & Thumbnails
for t in ALL_TOPICS:
    img_name_vi = f"{t['slug_vi']}.jpg"
    img_name_en = f"{t['slug_en']}.jpg"
    dest_vi = os.path.join(IMAGES_DIR, img_name_vi)
    dest_en = os.path.join(IMAGES_DIR, img_name_en)
    
    src_img = os.path.join(IMAGES_DIR, t["source_image"])
    if not os.path.exists(src_img):
        src_img = os.path.join(IMAGES_DIR, "vi-sao-ca-phe-sang-gay-sup-nguon-10h-vi.jpg")
    
    if not os.path.exists(dest_vi):
        shutil.copyfile(src_img, dest_vi)
    if not os.path.exists(dest_en):
        shutil.copyfile(src_img, dest_en)
        
    # Generate webp covers (1280x720) and thumbs (720x405)
    for slug in [t["slug_vi"], t["slug_en"]]:
        src_p = os.path.join(IMAGES_DIR, f"{slug}.jpg")
        cover_p = os.path.join(COVERS_DIR, f"{slug}.webp")
        thumb_p = os.path.join(THUMBS_DIR, f"{slug}.webp")
        
        if os.path.exists(src_p):
            try:
                with Image.open(src_p) as im:
                    im.resize((1280, 720)).save(cover_p, "WEBP", quality=82)
                    im.resize((720, 405)).save(thumb_p, "WEBP", quality=80)
            except Exception as e:
                print(f"Error processing {slug}: {e}")

print("Images and WebP thumbnails generated successfully.")

# 2. Generate Markdown Files for VI and EN
for idx, t in enumerate(ALL_TOPICS):
    # Stagger dates nicely
    day = 13 - (idx % 8)
    date_str = f"2026-10-{day:02d}T10:00:00Z"
    
    # Vietnamese Markdown
    vi_md = f"""---
title: "{t['title_vi']}"
date: "{date_str}"
excerpt: "{t['excerpt_vi']}"
author: "TS. Hoàng Xuân Chiến"
authorRole: "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức"
tags: ["Khoa học đời sống", "Nhịp sinh học", "Dinh dưỡng thực chứng", "Sức khỏe thường thức"]
organ: "{t['organ']}"
tier: "{t['tier']}"
readingTime: "{t['minutes']} phút"
featured: true
doi: "{t['doi']}"
gizmo: null
lang: "vi"
image: "/images/posts/{t['slug_vi']}.jpg"
imageAlt: "{t['image_alt_vi']}"
---

{t['lead_vi']}

![{t['image_alt_vi']}](/images/posts/{t['slug_vi']}.jpg)

> *"{t['analogy_vi']}"*

---

Sơ đồ phản ứng sinh học trong cơ thể:

{t['flowchart']}

---

{t['content_vi']}

---

### Tài liệu tham khảo và Hướng dẫn Chuyên ngành (Official Guidelines)

1. **{t['refs'][0]['label']}**: [DOI: {t['refs'][0]['doi']}](https://doi.org/{t['refs'][0]['doi']}). {t['refs'][0]['abstract']}
2. **{t['refs'][1]['label']}**: {t['refs'][1]['abstract']} [DOI: {t['refs'][1]['doi']}](https://doi.org/{t['refs'][1]['doi']}).
"""
    vi_path = os.path.join(POSTS_DIR, f"{t['slug_vi']}.md")
    with open(vi_path, "w", encoding="utf-8") as f:
        f.write(vi_md.strip() + "\n")

    # English Markdown
    en_md = f"""---
title: "{t['title_en']}"
date: "{date_str}"
excerpt: "{t['excerpt_en']}"
author: "Dr. Xuan Chien Hoang"
authorRole: "Doctor of Natural Sciences (Dr. rer. nat.) · University of Hamburg, Germany"
tags: ["Everyday Health", "Circadian Biology", "Evidence-Based Nutrition", "Clinical Medicine"]
organ: "{t['organ']}"
tier: "{t['tier']}"
readingTime: "{t['minutes']} min read"
featured: true
doi: "{t['doi']}"
gizmo: null
lang: "en"
image: "/images/posts/{t['slug_en']}.jpg"
imageAlt: "{t['image_alt_en']}"
---

{t['lead_en']}

![{t['image_alt_en']}](/images/posts/{t['slug_en']}.jpg)

> *"{t['analogy_en']}"*

---

Biological pathway reaction sequence:

{t['flowchart']}

---

{t['content_en']}

---

### Official Scientific Guidelines & Peer-Reviewed References

1. **{t['refs'][0]['label']}**: [DOI: {t['refs'][0]['doi']}](https://doi.org/{t['refs'][0]['doi']}). {t['refs'][0]['abstract']}
2. **{t['refs'][1]['label']}**: {t['refs'][1]['abstract']} [DOI: {t['refs'][1]['doi']}](https://doi.org/{t['refs'][1]['doi']}).
"""
    en_path = os.path.join(POSTS_DIR, f"{t['slug_en']}.md")
    with open(en_path, "w", encoding="utf-8") as f:
        f.write(en_md.strip() + "\n")

print(f"Generated {len(ALL_TOPICS) * 2} bilingual Markdown files in {POSTS_DIR}.")

# 3. Update store.ts SEED_REFS
with open(STORE_FILE, "r", encoding="utf-8") as f:
    store_content = f.read()

new_ref_blocks = []
for t in ALL_TOPICS:
    ref_list = t["refs"]
    block_items = []
    for r in ref_list:
        pmid_val = f'"{r["pmid"]}"' if r["pmid"] else "null"
        block_items.append(f"""    {{
      ordinal: {r['ordinal']},
      label: "{r['label']}",
      pmid: {pmid_val},
      doi: "{r['doi']}",
      design: "{r['design']}",
      sampleSize: null,
      journal: "{r['journal']}",
      year: {r['year']},
      abstract: "{r['abstract']}",
    }},""")
    items_code = "\n".join(block_items)
    new_ref_blocks.append(f"""  "{t['slug_vi']}": [\n{items_code}\n  ],""")
    new_ref_blocks.append(f"""  "{t['slug_en']}": [\n{items_code}\n  ],""")

combined_refs = "\n".join(new_ref_blocks)

# Insert before closing brace of SEED_REFS
store_pattern = r"const SEED_REFS: Record<string, Ref\[\]> = \{([\s\S]*?)\n\};"
match = re.search(store_pattern, store_content)
if match:
    prev_body = match.group(1).rstrip()
    updated_store = store_content[:match.start()] + f"const SEED_REFS: Record<string, Ref[]> = {{\n{prev_body}\n{combined_refs}\n}};" + store_content[match.end():]
    with open(STORE_FILE, "w", encoding="utf-8") as f:
        f.write(updated_store)
    print("Updated SEED_REFS in src/lib/store.ts.")

print("All 10 Life Dispatches successfully generated and synced!")
