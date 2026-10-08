import fs from 'fs';
import path from 'path';

const dateSchedule = [
  // Tháng 5: Nền tảng Dược động học & Chuyển hóa
  {
    date: '2026-05-04T09:00:00Z',
    files: ['pharmacokinetics-one-compartment.md', 'pharmacokinetics-one-compartment-en.md']
  },
  {
    date: '2026-05-11T09:00:00Z',
    files: ['curcumin-piperine-sinh-kha-dung.md', 'curcumin-piperine-bioavailability.md']
  },
  {
    date: '2026-05-18T09:00:00Z',
    files: ['supplement-drug-interaction-matrix.md', 'supplement-drug-interaction-matrix-en.md']
  },
  {
    date: '2026-05-25T09:00:00Z',
    files: ['forecasting-hs-crp-delta.md', 'forecasting-hs-crp-delta-en.md']
  },

  // Tháng 6: Tim mạch, Lipid & Kháng Insulin
  {
    date: '2026-06-02T09:00:00Z',
    files: ['triglyceride-hdl-ratio-metabolic-health.md', 'triglyceride-hdl-ratio-metabolic-health-en.md']
  },
  {
    date: '2026-06-09T09:00:00Z',
    files: ['cholesterol-myth-vascular-inflammation.md', 'cholesterol-myth-vascular-inflammation-en.md']
  },
  {
    date: '2026-06-16T09:00:00Z',
    files: ['oxldl-sdldl-atherosclerosis-mechanism.md', 'oxldl-sdldl-atherosclerosis-mechanism-en.md']
  },
  {
    date: '2026-06-23T09:00:00Z',
    files: ['policosanol-versus-statins.md', 'policosanol-versus-statins-en.md']
  },
  {
    date: '2026-06-30T09:00:00Z',
    files: ['mevalonate-statin-coq10-vi.md', 'mevalonate-statin-coq10-en.md']
  },

  // Tháng 7: Hệ vi sinh đường ruột & Biểu sinh học
  {
    date: '2026-07-07T09:00:00Z',
    files: ['resistant-starch-scfa-gut-vi.md', 'resistant-starch-scfa-gut-en.md']
  },
  {
    date: '2026-07-14T09:00:00Z',
    files: ['butyrate-scfa-epigenetics-histone-gut-barrier.md', 'butyrate-scfa-epigenetics-histone-gut-barrier-en.md']
  },
  {
    date: '2026-07-21T09:00:00Z',
    files: ['sulforaphane-nrf2-window.md', 'sulforaphane-nrf2-window-en.md']
  },
  {
    date: '2026-07-28T09:00:00Z',
    files: ['ampk-nrf2-mtor-map.md', 'ampk-nrf2-mtor-map-en.md']
  },

  // Tháng 8: Chuyển hóa tế bào Ung thư & Metabolomics
  {
    date: '2026-08-04T09:00:00Z',
    files: ['warburg-effect-cancer-metabolism.md', 'warburg-effect-cancer-metabolism-en.md']
  },
  {
    date: '2026-08-11T09:00:00Z',
    files: ['cancer-seed-and-soil-metabolism.md', 'cancer-seed-and-soil-metabolism-en.md']
  },
  {
    date: '2026-08-18T09:00:00Z',
    files: ['insulin-igf1-cancer-proliferation.md', 'insulin-igf1-cancer-proliferation-en.md']
  },
  {
    date: '2026-08-25T09:00:00Z',
    files: ['metabolomic-horizon-clinical-diagnostics-vi.md', 'metabolomic-horizon-clinical-diagnostics.md']
  },

  // Tháng 9: Trường thọ, Nhịp sinh học & Ty thể
  {
    date: '2026-09-01T09:00:00Z',
    files: ['nad-cd38-sirtuin-mitochondria-cellular-aging.md', 'nad-cd38-sirtuin-mitochondria-cellular-aging-en.md']
  },
  {
    date: '2026-09-08T09:00:00Z',
    files: ['glp1-keo-dai-tuoi-tho-nature.md', 'glp1-longevity-nature-mitochondria.md']
  },
  {
    date: '2026-09-15T09:00:00Z',
    files: ['melatonin-circadian-zeitgeber.md', 'melatonin-circadian-zeitgeber-en.md']
  },
  {
    date: '2026-09-22T09:00:00Z',
    files: ['glymphatic-deep-sleep-brain-cleaning.md', 'glymphatic-deep-sleep-brain-cleaning-en.md']
  },
  {
    date: '2026-09-29T09:00:00Z',
    files: ['chuyen-hoa-mo-nau-ucp1-ro-ri-proton.md', 'brown-fat-ucp1-mitochondrial-proton-leak.md']
  },

  // Đầu tháng 10: Nghiên cứu Đột phá & Thời sự Y học
  {
    date: '2026-10-02T09:00:00Z',
    files: ['succinate-ucp1-bat-sinh-nhiet-ty-the.md', 'succinate-ucp1-bat-mitochondrial-thermogenesis.md']
  },
  {
    date: '2026-10-04T09:00:00Z',
    files: ['succinate-creatine-bat-thermogenesis-vi.md', 'succinate-creatine-bat-thermogenesis-en.md']
  },
  {
    date: '2026-10-06T09:00:00Z',
    files: ['nobel-medicine-2026-optogenetics.md', 'nobel-medicine-2026-optogenetics-en.md']
  },
  {
    date: '2026-10-08T09:00:00Z',
    files: ['dich-hach-yersinia-pestis-t3ss-doc-luc-vi.md', 'yersinia-pestis-t3ss-virulence-lab-leak-en.md']
  }
];

const postsDir = 'content/posts';
const updatedFiles = new Set();

for (const item of dateSchedule) {
  for (const filename of item.files) {
    const filePath = path.join(postsDir, filename);
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filename);
      continue;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace date in frontmatter
    content = content.replace(/^date:\s*["'][^"']+["']/m, `date: "${item.date}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFiles.add(filename);
  }
}

console.log(`Successfully updated dates for ${updatedFiles.size} files.`);
const allFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const remaining = allFiles.filter(f => !updatedFiles.has(f));
console.log('Remaining files not covered:', remaining);
