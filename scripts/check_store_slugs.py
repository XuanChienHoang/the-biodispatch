import os, sys

with open('src/lib/store.ts', 'r', encoding='utf-8') as f:
    txt = f.read()

slugs = [
    'nhai-ky-no-lau-giam-calo', 'chewing-slowly-satiety-gut-hormones',
    'ngu-trua-20-phut-phuc-hoi-tim-mach', 'power-nap-cardiovascular-health-blood-pressure',
    'anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc', 'morning-sunlight-circadian-clock-metabolism',
    'ngat-quang-ngoi-lau-danh-thuc-mach-mau', 'breaking-sedentary-sitting-vascular-shear-stress',
    'nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi', 'slow-breathing-vagal-tone-parasympathetic-reset',
    'so-co-la-den-flavanol-gian-mach-ha-huyet-ap', 'dark-chocolate-flavanols-nitric-oxide-endothelial-function',
    'tam-rung-20-phut-ha-hormone-cang-thang-cortisol', 'nature-pill-twenty-minutes-cortisol-reduction',
    'uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day', 'drinking-water-before-meals-gastric-distension-metabolism',
    'xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau', 'sauna-bathing-cardiovascular-longevity-heat-shock-proteins',
    'qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau', 'berries-anthocyanins-vascular-protection-antioxidant-shield'
]

found = [s for s in slugs if f'"{s}": [' in txt]
print(f"Found {len(found)} / {len(slugs)} slugs in store.ts")
for s in slugs:
    if s not in found:
        print("MISSING:", s)
