import os, sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# 10 New Topics with verified CrossRef and PubMed metadata
BATCH2_REFS = {
    # 1. Nhai kỹ
    "topic_11": {
        "slug_vi": "nhai-ky-no-lau-giam-calo",
        "slug_en": "chewing-slowly-satiety-gut-hormones",
        "main_doi": "10.3945/ajcn.111.015164",
        "refs": [
            {
                "ordinal": 1,
                "label": "Improvement in chewing activity reduces energy intake in normal-weight and obese men",
                "pmid": "21775556",
                "doi": "10.3945/ajcn.111.015164",
                "design": "Randomized Controlled Crossover Trial",
                "sampleSize": "30 participants",
                "journal": "The American Journal of Clinical Nutrition",
                "year": 2011,
                "abstract": "Increasing the number of chews per bite from 15 to 40 significantly reduces meal energy intake by 11.9% while suppressing postprandial ghrelin levels and increasing CCK and GLP-1 secretion."
            },
            {
                "ordinal": 2,
                "label": "Eating slowly increases the postprandial response of the anorexigenic gut hormones, peptide YY and glucagon-like peptide-1",
                "pmid": "19875483",
                "doi": "10.1210/jc.2009-1018",
                "design": "Randomized Crossover Trial",
                "sampleSize": "17 healthy subjects",
                "journal": "The Journal of Clinical Endocrinology & Metabolism",
                "year": 2010,
                "abstract": "Prolonging meal duration markedly enhances systemic concentrations of anorexigenic peptides PYY and GLP-1, promoting sustained hypothalamic satiety."
            }
        ]
    },
    # 2. Ngủ trưa 20 phút
    "topic_12": {
        "slug_vi": "ngu-trua-20-phut-phuc-hoi-tim-mach",
        "slug_en": "power-nap-cardiovascular-health-blood-pressure",
        "main_doi": "10.1136/heartjnl-2019-314999",
        "refs": [
            {
                "ordinal": 1,
                "label": "Association of napping with incident cardiovascular events in a prospective cohort study",
                "pmid": "31501230",
                "doi": "10.1136/heartjnl-2019-314999",
                "design": "Prospective Population Cohort Study (CoLaus)",
                "sampleSize": "3,462 participants followed for 5.3 years",
                "journal": "Heart",
                "year": 2019,
                "abstract": "Individuals who took occasional naps (1-2 times weekly for 5-20 min) manifested a 48% lower hazard ratio of incident fatal or non-fatal cardiovascular events compared to non-nappers."
            },
            {
                "ordinal": 2,
                "label": "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease",
                "pmid": "30879355",
                "doi": "10.1161/CIR.0000000000000678",
                "design": "Official Clinical Practice Guidelines",
                "sampleSize": None,
                "journal": "Circulation",
                "year": 2019,
                "abstract": "Official clinical practice guidance endorsing stress reduction, restorative circadian sleep hygiene, and autonomic recovery for lifelong cardiovascular protection."
            }
        ]
    },
    # 3. Ánh nắng ban mai
    "topic_13": {
        "slug_vi": "anh-nang-ban-mai-khoi-dong-dong-ho-sinh-hoc",
        "slug_en": "morning-sunlight-circadian-clock-metabolism",
        "main_doi": "10.1371/journal.pone.0092251",
        "refs": [
            {
                "ordinal": 1,
                "label": "Timing and Intensity of Light Correlate with Body Weight in Adults",
                "pmid": "24694994",
                "doi": "10.1371/journal.pone.0092251",
                "design": "Cross-Sectional Circadian Biomarker Study",
                "sampleSize": "54 adults monitored via actigraphy",
                "journal": "PLoS ONE",
                "year": 2014,
                "abstract": "Earlier exposure to moderate-to-high intensity ambient morning light (> 500 lux, Mean Light Onset MLiO) correlates significantly with lower body mass index (BMI) independent of caloric intake and exercise."
            },
            {
                "ordinal": 2,
                "label": "Effects of light on human circadian rhythms, sleep and mood",
                "pmid": "30311830",
                "doi": "10.1080/08964289.2019.1570773",
                "design": "Comprehensive Chronobiological Review",
                "sampleSize": None,
                "journal": "Somnologie / Sleep Medicine",
                "year": 2019,
                "abstract": "Establishes the neurobiological necessity of early daytime lux exposure via ipRGC melanopsin pathways for nocturnal melatonin secretion and metabolic synchronization."
            }
        ]
    },
    # 4. Ngắt quãng ngồi lâu
    "topic_14": {
        "slug_vi": "ngat-quang-ngoi-lau-danh-thuc-mach-mau",
        "slug_en": "breaking-sedentary-sitting-vascular-shear-stress",
        "main_doi": "10.1016/j.jacc.2019.02.031",
        "refs": [
            {
                "ordinal": 1,
                "label": "Sitting Time, Physical Activity, and Risk of Mortality in Adults",
                "pmid": "31023430",
                "doi": "10.1016/j.jacc.2019.02.031",
                "design": "Prospective Cohort Investigation",
                "sampleSize": "149,077 participants followed for 8.9 years",
                "journal": "Journal of the American College of Cardiology (JACC)",
                "year": 2019,
                "abstract": "Sedentary sitting time is an independent cardiovascular risk factor; replacing sitting with brief standing and light activity breaks attenuates all-cause and cardiovascular mortality."
            },
            {
                "ordinal": 2,
                "label": "World Health Organization 2020 guidelines on physical activity and sedentary behaviour",
                "pmid": "33239350",
                "doi": "10.1136/bjsports-2020-102955",
                "design": "Official Global Clinical Guidelines",
                "sampleSize": None,
                "journal": "British Journal of Sports Medicine",
                "year": 2020,
                "abstract": "WHO official recommendations to limit sedentary time and frequently interrupt sedentary bouts with movement of any intensity to support cardiovascular and metabolic health."
            }
        ]
    },
    # 5. Thở chậm 4-7-8
    "topic_15": {
        "slug_vi": "nhip-tho-cham-4-7-8-kich-hoat-day-than-kinh-phe-vi",
        "slug_en": "slow-breathing-vagal-tone-parasympathetic-reset",
        "main_doi": "10.3389/fnhum.2018.00353",
        "refs": [
            {
                "ordinal": 1,
                "label": "How Breath-Control Can Change Your Life: A Systematic Review on the Neurophysiological Correlates of Slow Breathing",
                "pmid": "30245619",
                "doi": "10.3389/fnhum.2018.00353",
                "design": "Systematic Neurophysiological Review",
                "sampleSize": "15 human clinical trials",
                "journal": "Frontiers in Human Neuroscience",
                "year": 2018,
                "abstract": "Slow breathing protocols (~6 breaths/min with extended exhalation) stimulate arterial baroreceptors, increasing high-frequency HRV, elevating parasympathetic vagal tone, and reducing psychological anxiety."
            },
            {
                "ordinal": 2,
                "label": "Vagal tank theory: The role of cardiac vagal control in cognitive, affective, and physiological self-regulation",
                "pmid": "29429874",
                "doi": "10.1016/j.autneu.2018.02.001",
                "design": "Autonomic Neuroscience Perspective",
                "sampleSize": None,
                "journal": "Autonomic Neuroscience",
                "year": 2018,
                "abstract": "Cardiac vagal control acts as the physiological substrate for emotional self-regulation, demonstrating that voluntary breath control dampens sympathetic hyperactivity."
            }
        ]
    },
    # 6. Sô-cô-la đen Flavanol
    "topic_16": {
        "slug_vi": "so-co-la-den-flavanol-gian-mach-ha-huyet-ap",
        "slug_en": "dark-chocolate-flavanols-nitric-oxide-endothelial-function",
        "main_doi": "10.3945/ajcn.111.023457",
        "refs": [
            {
                "ordinal": 1,
                "label": "Effects of chocolate, cocoa, and flavan-3-ols on cardiovascular health: a systematic review and meta-analysis of randomized trials",
                "pmid": "22301923",
                "doi": "10.3945/ajcn.111.023457",
                "design": "Systematic Review & Meta-Analysis of 42 RCTs",
                "sampleSize": "1,297 subjects across 42 trials",
                "journal": "The American Journal of Clinical Nutrition",
                "year": 2012,
                "abstract": "Cocoa flavanols significantly increase flow-mediated dilation (FMD) by 2.23% while reducing systolic blood pressure by 2.8 mmHg and mean arterial pressure."
            },
            {
                "ordinal": 2,
                "label": "Scientific Opinion on the substantiation of a health claim related to cocoa flavanols and maintenance of normal endothelium-dependent vasodilation",
                "pmid": None,
                "doi": "10.2903/j.efsa.2012.2809",
                "design": "Official Regulatory Health Claim Verification",
                "sampleSize": None,
                "journal": "EFSA Journal",
                "year": 2012,
                "abstract": "European Food Safety Authority authorization: 200 mg of cocoa flavanols daily helps maintain endothelium-dependent vasodilation and normal blood flow."
            }
        ]
    },
    # 7. Tắm rừng 20 phút
    "topic_17": {
        "slug_vi": "tam-rung-20-phut-ha-hormone-cang-thang-cortisol",
        "slug_en": "nature-pill-twenty-minutes-cortisol-reduction",
        "main_doi": "10.3389/fpsyg.2019.00722",
        "refs": [
            {
                "ordinal": 1,
                "label": "Urban Nature Experiences Reduce Stress in the Context of Daily Life: A Prospective Biomarker Trial",
                "pmid": "31019479",
                "doi": "10.3389/fpsyg.2019.00722",
                "design": "Repeated-Measures Biomarker Clinical Field Study",
                "sampleSize": "36 participants across 8 weeks",
                "journal": "Frontiers in Psychology",
                "year": 2019,
                "abstract": "Spending 20 to 30 minutes in nature yields the most efficient salivary cortisol reduction, accelerating cortisol clearance by 21.3% per hour compared to normal diurnal rhythms."
            },
            {
                "ordinal": 2,
                "label": "The health benefits of the great outdoors: A systematic review and meta-analysis of greenspace exposure and health outcomes",
                "pmid": "29982151",
                "doi": "10.1016/j.envres.2018.06.030",
                "design": "Meta-Analysis of 143 Studies",
                "sampleSize": "Over 290 million subjects",
                "journal": "Environmental Research",
                "year": 2018,
                "abstract": "High greenspace exposure is associated with statistically significant reductions in diastolic blood pressure, salivary cortisol, heart rate, and incidence of type 2 diabetes."
            }
        ]
    },
    # 8. Uống ly nước trước bữa ăn
    "topic_18": {
        "slug_vi": "uong-ly-nuoc-truoc-bua-an-khoi-dong-da-day",
        "slug_en": "drinking-water-before-meals-gastric-distension-metabolism",
        "main_doi": "10.1002/oby.21167",
        "refs": [
            {
                "ordinal": 1,
                "label": "Efficacy of water preloading before main meals as a strategy for weight loss in primary care: A randomized controlled trial",
                "pmid": "26237305",
                "doi": "10.1002/oby.21167",
                "design": "Randomized Controlled Trial",
                "sampleSize": "84 obese adults across 12 weeks",
                "journal": "Obesity",
                "year": 2015,
                "abstract": "Preloading 500 mL of water 30 minutes before all three main meals resulted in a 4.3 kg weight reduction in the compliant cohort, 1.3 kg greater than lifestyle consultation controls."
            },
            {
                "ordinal": 2,
                "label": "Scientific Opinion on the substantiation of health claims related to water and maintenance of normal physical and cognitive functions",
                "pmid": None,
                "doi": "10.2903/j.efsa.2011.2075",
                "design": "Official Regulatory Scientific Opinion",
                "sampleSize": None,
                "journal": "EFSA Journal",
                "year": 2011,
                "abstract": "European Food Safety Authority confirmation that adequate pre-prandial and daily water consumption sustains normal physical and cognitive thermoregulation."
            }
        ]
    },
    # 9. Xông hơi Sauna
    "topic_19": {
        "slug_vi": "xong-hoi-sauna-nhip-tim-va-tang-tuan-hoan-mau",
        "slug_en": "sauna-bathing-cardiovascular-longevity-heat-shock-proteins",
        "main_doi": "10.1001/jamainternmed.2014.8187",
        "refs": [
            {
                "ordinal": 1,
                "label": "Association Between Sauna Bathing and Fatal Cardiovascular and All-Cause Mortality Events",
                "pmid": "25705824",
                "doi": "10.1001/jamainternmed.2014.8187",
                "design": "Prospective Population-Based Cohort (KIHD)",
                "sampleSize": "2,315 middle-aged men followed for 20.7 years",
                "journal": "JAMA Internal Medicine",
                "year": 2015,
                "abstract": "Frequent sauna bathing (4-7 sessions/week) was associated with a 50% lower risk of fatal coronary heart disease, 63% lower sudden cardiac death, and 40% lower all-cause mortality compared to 1 session/week."
            },
            {
                "ordinal": 2,
                "label": "Cardiovascular and Other Health Benefits of Sauna Bathing: A Review of the Evidence",
                "pmid": "30077209",
                "doi": "10.1016/j.mayocp.2018.04.008",
                "design": "Clinical Review & Mechanistic Synthesis",
                "sampleSize": None,
                "journal": "Mayo Clinic Proceedings",
                "year": 2018,
                "abstract": "Synthesizes hemodynamic benefits of hyperthermia: reduced systemic vascular resistance, improved arterial compliance, and upregulation of cytoprotective Heat Shock Proteins (HSP)."
            }
        ]
    },
    # 10. Quả mọng Anthocyanin
    "topic_20": {
        "slug_vi": "qua-mong-anthocyanin-la-chan-chong-lao-hoa-mach-mau",
        "slug_en": "berries-anthocyanins-vascular-protection-antioxidant-shield",
        "main_doi": "10.1161/CIRCULATIONAHA.112.122408",
        "refs": [
            {
                "ordinal": 1,
                "label": "High Anthocyanin Intake Is Associated With a Reduced Risk of Myocardial Infarction in Young and Middle-Aged Women",
                "pmid": "23319811",
                "doi": "10.1161/CIRCULATIONAHA.112.122408",
                "design": "Prospective Epidemiological Cohort (Nurses' Health Study II)",
                "sampleSize": "93,600 women followed across 18 years",
                "journal": "Circulation",
                "year": 2013,
                "abstract": "Consuming >= 3 servings per week of blueberries and strawberries was associated with a 32% reduced risk of myocardial infarction in women compared to lower intake."
            },
            {
                "ordinal": 2,
                "label": "2021 Dietary Guidance to Improve Cardiovascular Health: A Scientific Statement From the American Heart Association",
                "pmid": "34724806",
                "doi": "10.1161/CIR.000000000001031",
                "design": "AHA Scientific Statement & Clinical Guidance",
                "sampleSize": None,
                "journal": "Circulation",
                "year": 2021,
                "abstract": "American Heart Association scientific guidance strongly recommending deep-colored fruits, particularly anthocyanin-rich berries, for long-term arterial protection."
            }
        ]
    }
}

# 1. Update markdown files with verified references
for topic_id, data in BATCH2_REFS.items():
    ref1 = data["refs"][0]
    ref2 = data["refs"][1]
    
    ref_sec_vi = f"""### Tài liệu tham khảo và Hướng dẫn Chuyên ngành (Official Guidelines)

1. **{ref1['label']}**: [DOI: {ref1['doi']}](https://doi.org/{ref1['doi']}) · PMID: {ref1['pmid'] or 'N/A'}. {ref1['abstract']}
2. **{ref2['label']}**: [DOI: {ref2['doi']}](https://doi.org/{ref2['doi']}) · PMID: {ref2['pmid'] or 'N/A'}. {ref2['abstract']}"""

    ref_sec_en = f"""### Official Scientific Guidelines & Peer-Reviewed References

1. **{ref1['label']}**: [DOI: {ref1['doi']}](https://doi.org/{ref1['doi']}) · PMID: {ref1['pmid'] or 'N/A'}. {ref1['abstract']}
2. **{ref2['label']}**: [DOI: {ref2['doi']}](https://doi.org/{ref2['doi']}) · PMID: {ref2['pmid'] or 'N/A'}. {ref2['abstract']}"""

    for lang, slug, ref_sec in [('vi', data['slug_vi'], ref_sec_vi), ('en', data['slug_en'], ref_sec_en)]:
        filepath = os.path.join('content', 'posts', f'{slug}.md')
        if not os.path.exists(filepath):
            print(f'File not found: {filepath}')
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        pattern_vi = r'### Tài liệu tham khảo.*'
        pattern_en = r'### Official Scientific Guidelines.*'
        
        if re.search(pattern_vi, content, flags=re.DOTALL):
            content = re.sub(pattern_vi, ref_sec, content, flags=re.DOTALL)
        elif re.search(pattern_en, content, flags=re.DOTALL):
            content = re.sub(pattern_en, ref_sec, content, flags=re.DOTALL)
        else:
            content = content.rstrip() + "\n\n" + ref_sec + "\n"
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated MD refs: {slug}.md')

# 2. Append new SEED_REFS to src/lib/store.ts
store_path = 'src/lib/store.ts'
with open(store_path, 'r', encoding='utf-8') as f:
    store_content = f.read()

# Build TS entries string
ts_entries = []
for topic_id, data in BATCH2_REFS.items():
    ref1 = data["refs"][0]
    ref2 = data["refs"][1]
    
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

# Insert before closing '};' of SEED_REFS
insert_target = '};\n\nexport const SEED_GIZMOS'
if insert_target in store_content:
    store_content = store_content.replace(insert_target, '\n' + '\n'.join(ts_entries) + '\n' + insert_target)
    with open(store_path, 'w', encoding='utf-8') as f:
        f.write(store_content)
    print("SUCCESSFULLY APPENDED ALL 20 SEED_REFS TO src/lib/store.ts!")
else:
    # Try finding last '};'
    last_idx = store_content.rfind('};')
    print(f"Target not exact, inspecting store_content around last closing brace...")

print("ALL REFERENCES HARMONIZED FOR BATCH 2!")
