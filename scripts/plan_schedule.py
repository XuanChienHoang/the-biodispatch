import glob, os, re
from datetime import datetime, timedelta

posts = glob.glob(r"c:\Hoang's projects\the-biodispatch\content\posts\*.md")
academic = []
life = []

for p in posts:
    fname = os.path.basename(p)
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    m_tier = re.search(r'tier:\s*["\']?([^"\'\n\r]+)', c)
    m_date = re.search(r'date:\s*["\']?([^"\'\n\r]+)', c)
    m_lang = re.search(r'lang:\s*["\']?([^"\'\n\r]+)', c)
    
    t = m_tier.group(1).strip() if m_tier else 'Clinical Deep-Dive'
    d = m_date.group(1).strip() if m_date else ''
    lang = m_lang.group(1).strip() if m_lang else ('vi' if fname.endswith('-vi.md') else 'en')
    
    is_life = t in ['Life Dispatch', 'life']
    item = {'file': fname, 'path': p, 'date': d, 'tier': t, 'lang': lang}
    if is_life:
        life.append(item)
    else:
        academic.append(item)

print(f"Academic posts: {len(academic)}")
print(f"Life posts: {len(life)}")
print(f"Total posts: {len(academic) + len(life)}")

# Sort both by date
academic.sort(key=lambda x: x['date'])
life.sort(key=lambda x: x['date'])

# Let's inspect unique dates in academic
acad_dates = sorted(list(set(x['date'] for x in academic)))
print(f"Academic date range: {acad_dates[0]} to {acad_dates[-1]} ({len(acad_dates)} distinct timestamps)")

# Current academic dates span from May 04 to Oct 13.
# User wants: "Chỉnh lại thời gian xuất bản của các bài cho phù hợp. Kéo từ tháng 5 đến giờ, xen kẽ với các bài học thuật."
# "tỷ lệ 4 bài bình thường, 1 bài chuyên sâu. 1 ngày sẽ tự động đăng 4 bài."
