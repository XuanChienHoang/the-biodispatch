import os, glob, re

posts = glob.glob(r"c:\Hoang's projects\the-biodispatch\content\posts\*.md")
topics = {}

for p in posts:
    fname = os.path.basename(p)
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    m_tier = re.search(r'tier:\s*["\']?([^"\'\n\r]+)', c)
    m_date = re.search(r'date:\s*["\']?([^"\'\n\r]+)', c)
    m_title = re.search(r'title:\s*["\']?([^"\'\n\r]+)', c)
    m_lang = re.search(r'lang:\s*["\']?([^"\'\n\r]+)', c)
    
    t = m_tier.group(1).strip() if m_tier else 'Clinical Deep-Dive'
    d = m_date.group(1).strip() if m_date else ''
    title = m_title.group(1).strip() if m_title else ''
    lang = m_lang.group(1).strip() if m_lang else ('vi' if fname.endswith('-vi.md') else 'en')
    
    # Base key for pairing
    base = fname.replace('.md', '')
    if base.endswith('-vi'):
        pair_key = base[:-3]
    elif base.endswith('-en'):
        pair_key = base[:-3]
    else:
        pair_key = base
        
    is_life = t in ['Life Dispatch', 'life']
    
    if pair_key not in topics:
        topics[pair_key] = {
            'is_life': is_life,
            'tier': t,
            'files': [],
            'date': d,
            'title': title
        }
    topics[pair_key]['files'].append((fname, p, lang))

life_topics = {k: v for k, v in topics.items() if v['is_life']}
academic_topics = {k: v for k, v in topics.items() if not v['is_life']}

print(f"Total topics: {len(topics)}")
print(f"Life Dispatch topics: {len(life_topics)}")
print(f"Academic topics: {len(academic_topics)}")

print("\n--- All Life Topics (21 topics = 42 posts) ---")
for i, (k, v) in enumerate(sorted(life_topics.items())):
    flist = [x[0] for x in v['files']]
    print(f"{i+1:2d}. {k:45} | {flist}")
