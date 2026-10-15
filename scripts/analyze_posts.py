import os, glob, re

posts = glob.glob(r"c:\Hoang's projects\the-biodispatch\content\posts\*.md")
items = []
tiers = {}

for p in posts:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    m_date = re.search(r'date:\s*["\']?([^"\'\n\r]+)', c)
    m_tier = re.search(r'tier:\s*["\']?([^"\'\n\r]+)', c)
    m_lang = re.search(r'lang:\s*["\']?([^"\'\n\r]+)', c)
    m_title = re.search(r'title:\s*["\']?([^"\'\n\r]+)', c)
    
    d = m_date.group(1).strip() if m_date else 'NO_DATE'
    t = m_tier.group(1).strip() if m_tier else 'NO_TIER'
    l = m_lang.group(1).strip() if m_lang else 'NO_LANG'
    title = m_title.group(1).strip() if m_title else ''
    
    items.append({
        'path': p,
        'filename': os.path.basename(p),
        'date': d,
        'tier': t,
        'lang': l,
        'title': title
    })
    tiers[t] = tiers.get(t, 0) + 1

items.sort(key=lambda x: x['date'])
print(f"Total posts: {len(items)}")
print("Tiers breakdown:", tiers)
print(f"Oldest date: {items[0]['date']} | Newest date: {items[-1]['date']}")

# Group by tier
life_posts = [x for x in items if x['tier'] in ['Life Dispatch', 'life']]
clinical_posts = [x for x in items if x['tier'] not in ['Life Dispatch', 'life']]

print(f"Life Dispatch posts: {len(life_posts)}")
print(f"Academic/Clinical/Gizmo posts: {len(clinical_posts)}")

print("\n--- Clinical/Academic posts sample ---")
for x in clinical_posts[:5]:
    print(f"  {x['date']} | {x['tier']:18} | {x['filename']}")

print("\n--- Life Dispatch posts sample ---")
for x in life_posts[:5]:
    print(f"  {x['date']} | {x['tier']:18} | {x['filename']}")
