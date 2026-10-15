import glob, os, re

posts = glob.glob(r"c:\Hoang's projects\the-biodispatch\content\posts\*.md")
life = []
academic = []

for p in posts:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    m_tier = re.search(r'tier:\s*["\']?([^"\'\n\r]+)', c)
    m_date = re.search(r'date:\s*["\']?([^"\'\n\r]+)', c)
    t = m_tier.group(1).strip() if m_tier else ''
    d = m_date.group(1).strip() if m_date else ''
    
    if t in ['Life Dispatch', 'life']:
        life.append((d, os.path.basename(p)))
    else:
        academic.append((d, t, os.path.basename(p)))

life.sort()
academic.sort()

print(f"Total Life posts: {len(life)}")
for d, name in life:
    print(f"  {d} | {name}")

print(f"\nTotal Academic posts: {len(academic)}")
print("First 5 Academic:")
for d, t, name in academic[:5]:
    print(f"  {d} | {t} | {name}")
print("Last 5 Academic:")
for d, t, name in academic[-5:]:
    print(f"  {d} | {t} | {name}")
