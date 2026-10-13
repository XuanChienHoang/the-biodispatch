import glob
import yaml
import os
import sys
import re
from datetime import datetime, timedelta

sys.stdout.reconfigure(encoding='utf-8')

# 1. Định nghĩa 21 cặp bài đời sống
life_pairs = [
    ('vi-sao-ca-phe-sang-gay-sup-nguon-10h-vi', 'why-morning-coffee-causes-midmorning-crash-en'),
    ('an-rau-truoc-com-kiem-soat-duong-huyet-vi', 'eating-vegetables-before-carbs-flattens-glucose-spikes-en'),
    ('vi-sao-an-muon-sau-20h-gay-tich-mo-bung-vi', 'why-eating-after-8pm-triggers-visceral-fat-storage-en'),
    ('tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi', 'green-tea-l-theanine-and-caffeine-smooth-focus-en'),
    ('tam-nuoc-nong-hay-nuoc-lanh-truoc-khi-ngu-vi', 'warm-bath-effect-on-core-body-temperature-sleep-en'),
    ('anh-sang-xanh-ban-dem-pha-vo-giac-ngu-vi', 'blue-light-screen-time-disrupts-deep-sleep-en'),
    ('nuoc-uong-bu-khoang-dien-giai-khi-tap-the-duc-vi', 'hydration-electrolytes-cellular-osmosis-workout-en'),
    ('muoi-an-va-huyet-ap-nghich-ly-ti-le-natri-kali-vi', 'salt-blood-pressure-sodium-potassium-ratio-paradox-en'),
    ('giam-tao-truoc-bua-an-giam-duong-huyet-vi', 'apple-cider-vinegar-before-meals-glucose-blunting-en'),
    ('di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi', 'ten-minute-post-meal-walk-glucose-clearance-en'),
    ('tinh-bot-khang-com-nguoi-nuoi-vi-khuan-ruot-vi', 'resistant-starch-cold-rice-gut-microbiome-scfa-en'),
    ('nhai-ky-no-lau-giam-calo', 'chewing-slowly-satiety-gut-hormones'),
    ('uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day', 'drinking-water-before-meals-gastric-distension-metabolism'),
    ('ngu-trua-20-phut-phuc-hoi-tim-mach', 'power-nap-cardiovascular-health-blood-pressure'),
    ('anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc', 'morning-sunlight-circadian-clock-metabolism'),
    ('tam-rung-20-phut-ha-hormone-cang-thang-cortisol', 'nature-pill-twenty-minutes-cortisol-reduction'),
    ('nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi', 'slow-breathing-vagal-tone-parasympathetic-reset'),
    ('so-co-la-den-flavanol-gian-mach-ha-huyet-ap', 'dark-chocolate-flavanols-nitric-oxide-endothelial-function'),
    ('qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau', 'berries-anthocyanins-vascular-protection-antioxidant-shield'),
    ('xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau', 'sauna-bathing-cardiovascular-longevity-heat-shock-proteins'),
    ('ngat-quang-ngoi-lau-danh-thuc-mach-mau', 'breaking-sedentary-sitting-vascular-shear-stress')
]

all_life_files = set()
for vi, en in life_pairs:
    all_life_files.add(vi)
    all_life_files.add(en)

all_md = [os.path.basename(f)[:-3] for f in glob.glob('content/posts/*.md')]
academic_files = sorted([f for f in all_md if f not in all_life_files])

file_info = {}
for af in academic_files:
    with open(f'content/posts/{af}.md', 'r', encoding='utf-8') as f:
        c = f.read()
    parts = c.split('---', 2)
    fm = yaml.safe_load(parts[1]) if len(parts) >= 3 else {}
    file_info[af] = {
        'doi': fm.get('doi'),
        'date': str(fm.get('date')),
        'title': fm.get('title')
    }

pairs_found = []
used = set()
special_pairs = [
    ('alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi', 'alpha-ketoglutarate-epigenetic-clock-reversal-en'),
    ('alpha-ketoglutarate-tre-hoa-bieu-gen-vi', 'alpha-ketoglutarate-epigenetic-rejuvenation-en')
]
for p1, p2 in special_pairs:
    if p1 in academic_files and p2 in academic_files:
        pairs_found.append((p1, p2))
        used.add(p1)
        used.add(p2)

for af in academic_files:
    if af in used: continue
    target = None
    if af.endswith('-en'):
        prefix = af[:-3]
        for cand in [prefix, prefix + '-vi']:
            if cand in academic_files and cand not in used:
                target = cand
                break
    elif af.endswith('-vi'):
        prefix = af[:-3]
        for cand in [prefix, prefix + '-en']:
            if cand in academic_files and cand not in used:
                target = cand
                break
    else:
        for cand in [af + '-en', af + '-vi']:
            if cand in academic_files and cand not in used:
                target = cand
                break
    if not target:
        my_doi = file_info[af]['doi']
        if my_doi:
            for other in academic_files:
                if other != af and other not in used and file_info[other]['doi'] == my_doi:
                    target = other
                    break
    if target:
        if '-en' in af:
            pairs_found.append((target, af))
        else:
            pairs_found.append((af, target))
        used.add(af)
        used.add(target)

# Sắp xếp các cặp học thuật theo thời gian gốc
def get_pair_date(pair):
    d1 = file_info[pair[0]]['date']
    d2 = file_info[pair[1]]['date']
    return min(d1, d2)

academic_pairs = sorted(pairs_found, key=get_pair_date)

# 2. Xen kẽ nhịp nhàng: Cứ 2 bài học thuật thì đến 1 bài đời sống (Academic, Academic, Life)
# Tổng cộng: 21 chu kỳ x 3 = 63 cặp bài!
interleaved_pairs = []
for i in range(21):
    interleaved_pairs.append(('academic', academic_pairs[2*i]))
    interleaved_pairs.append(('academic', academic_pairs[2*i + 1]))
    interleaved_pairs.append(('life', life_pairs[i]))

print(f'Total interleaved pairs: {len(interleaved_pairs)}')

# 3. Phân bổ mốc thời gian mượt mà từ 2026-05-04T09:00:00Z đến 2026-10-13T14:00:00Z
start_dt = datetime(2026, 5, 4, 9, 0, 0)
end_dt = datetime(2026, 10, 13, 14, 0, 0)
total_seconds = (end_dt - start_dt).total_seconds()
interval = total_seconds / (len(interleaved_pairs) - 1)

def update_post_date(file_slug, new_date_str):
    filepath = f'content/posts/{file_slug}.md'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Thay thế trường date trong frontmatter
    new_content = re.sub(
        r'(^date:\s*["\']?)([^"\'\n]+)(["\']?)',
        rf'\g<1>{new_date_str}\g<3>',
        content,
        count=1,
        flags=re.MULTILINE
    )
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

for idx, (p_type, pair) in enumerate(interleaved_pairs):
    target_dt = start_dt + timedelta(seconds=idx * interval)
    # Định dạng ISO 8601 UTC
    iso_date = target_dt.strftime('%Y-%m-%dT%H:%M:%SZ')
    
    vi_file, en_file = pair
    update_post_date(vi_file, iso_date)
    update_post_date(en_file, iso_date)
    
    if idx % 10 == 0 or idx == len(interleaved_pairs) - 1:
        print(f'[{idx+1}/63] ({p_type}) {iso_date} -> {vi_file} | {en_file}')

print('\n🎉 Hoàn thành tái phân bổ mốc thời gian xuất bản từ tháng 5 đến tháng 10 năm 2026!')
