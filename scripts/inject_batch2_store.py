import os, sys, json
sys.stdout.reconfigure(encoding='utf-8')
from update_batch2_refs import BATCH2_REFS

store_path = 'src/lib/store.ts'
with open(store_path, 'r', encoding='utf-8') as f:
    store_content = f.read()

ts_entries = []
for topic_id, data in BATCH2_REFS.items():
    ref1 = data['refs'][0]
    ref2 = data['refs'][1]
    
    entry_body = f"""    {{
      ordinal: 1,
      label: {json.dumps(ref1['label'])},
      pmid: {json.dumps(ref1['pmid'])},
      doi: {json.dumps(ref1['doi'])},
      design: {json.dumps(ref1['design'])},
      sampleSize: {json.dumps(ref1['sampleSize'])},
      journal: {json.dumps(ref1['journal'])},
      year: {ref1['year']},
      abstract: {json.dumps(ref1['abstract'])},
    }},
    {{
      ordinal: 2,
      label: {json.dumps(ref2['label'])},
      pmid: {json.dumps(ref2['pmid'])},
      doi: {json.dumps(ref2['doi'])},
      design: {json.dumps(ref2['design'])},
      sampleSize: {json.dumps(ref2['sampleSize'])},
      journal: {json.dumps(ref2['journal'])},
      year: {ref2['year']},
      abstract: {json.dumps(ref2['abstract'])},
    }},"""

    for slug in [data['slug_vi'], data['slug_en']]:
        ts_entries.append(f'  "{slug}": [\n{entry_body}\n  ],')

end_target = "    },\n  ],\n};\n\nexport interface MarkdownArticleData"

idx = store_content.find(end_target)
if idx != -1:
    slice_point = idx + len("    },\n  ],")
    new_content = store_content[:slice_point] + ",\n" + "\n".join(ts_entries) + store_content[slice_point+1:]
    with open(store_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESSFULLY INJECTED 20 NEW SEED_REFS INTO src/lib/store.ts!")
else:
    print("COULD NOT FIND EXACT INSERTION POINT!")
