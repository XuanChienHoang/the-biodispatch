import fs from 'fs';
import path from 'path';

const postsDir = path.resolve('content/posts');

// Kế hoạch phân bổ lại thời gian xuất bản (Mỗi tuần 2 bài, hoặc giãn cách hợp lý từ tháng 5 đến tháng 10 năm 2026)
// Không dồn vào 1 ngày 09/10/2026, mà phân bổ đều theo dòng lịch sử nghiên cứu y sinh học
const schedule = [
  // Tháng 5: Dược động học & Tương tác phân tử
  { date: '2026-05-04T09:00:00Z', files: ['pharmacokinetics-one-compartment.md', 'pharmacokinetics-one-compartment-en.md'] },
  { date: '2026-05-11T09:00:00Z', files: ['curcumin-piperine-sinh-kha-dung.md', 'curcumin-piperine-bioavailability.md'] },
  { date: '2026-05-18T09:00:00Z', files: ['supplement-drug-interaction-matrix.md', 'supplement-drug-interaction-matrix-en.md'] },
  { date: '2026-05-25T09:00:00Z', files: ['forecasting-hs-crp-delta.md', 'forecasting-hs-crp-delta-en.md'] },

  // Tháng 6: Tim mạch, Lipid máu & Kháng Insulin
  { date: '2026-06-02T09:00:00Z', files: ['triglyceride-hdl-ratio-metabolic-health.md', 'triglyceride-hdl-ratio-metabolic-health-en.md'] },
  { date: '2026-06-09T09:00:00Z', files: ['cholesterol-myth-vascular-inflammation.md', 'cholesterol-myth-vascular-inflammation-en.md'] },
  { date: '2026-06-16T09:00:00Z', files: ['oxldl-sdldl-atherosclerosis-mechanism.md', 'oxldl-sdldl-atherosclerosis-mechanism-en.md'] },
  { date: '2026-06-23T09:00:00Z', files: ['policosanol-versus-statins.md', 'policosanol-versus-statins-en.md'] },
  { date: '2026-06-30T09:00:00Z', files: ['mevalonate-statin-coq10-vi.md', 'mevalonate-statin-coq10-en.md'] },

  // Tháng 7: Trục Đường ruột, Biểu sinh & Hàng rào Niêm mạc
  { date: '2026-07-07T09:00:00Z', files: ['resistant-starch-scfa-gut-vi.md', 'resistant-starch-scfa-gut-en.md'] },
  { date: '2026-07-14T09:00:00Z', files: ['butyrate-scfa-epigenetics-histone-gut-barrier.md', 'butyrate-scfa-epigenetics-histone-gut-barrier-en.md'] },
  { date: '2026-07-21T09:00:00Z', files: ['sulforaphane-nrf2-window.md', 'sulforaphane-nrf2-window-en.md'] },
  { date: '2026-07-28T09:00:00Z', files: ['ampk-nrf2-mtor-map.md', 'ampk-nrf2-mtor-map-en.md'] },

  // Tháng 8: Chuyển hóa tế bào Ung thư, Metabolomics & Hàng rào ruột
  { date: '2026-08-04T09:00:00Z', files: ['warburg-effect-cancer-metabolism.md', 'warburg-effect-cancer-metabolism-en.md'] },
  { date: '2026-08-08T09:00:00Z', files: ['giai-ma-hoi-chung-ro-ri-ruot-zonulin-lps-vi.md', 'deciphering-leaky-gut-zonulin-lps-en.md'] },
  { date: '2026-08-12T09:00:00Z', files: ['cancer-seed-and-soil-metabolism.md', 'cancer-seed-and-soil-metabolism-en.md'] },
  { date: '2026-08-18T09:00:00Z', files: ['insulin-igf1-cancer-proliferation.md', 'insulin-igf1-cancer-proliferation-en.md'] },
  { date: '2026-08-25T09:00:00Z', files: ['metabolomic-horizon-clinical-diagnostics-vi.md', 'metabolomic-horizon-clinical-diagnostics.md'] },
  { date: '2026-08-29T09:00:00Z', files: ['gut-mucin-barrier-integrity-vi.md', 'gut-mucin-barrier-integrity-en.md'] },

  // Tháng 9: Trường thọ, Nhịp sinh học & Ty thể
  { date: '2026-09-02T09:00:00Z', files: ['nad-cd38-sirtuin-mitochondria-cellular-aging.md', 'nad-cd38-sirtuin-mitochondria-cellular-aging-en.md'] },
  { date: '2026-09-06T09:00:00Z', files: ['truc-nao-ruot-gaba-vi-khuan-vi.md', 'gut-brain-axis-gaba-microbiota-en.md'] },
  { date: '2026-09-10T09:00:00Z', files: ['glp1-keo-dai-tuoi-tho-nature.md', 'glp1-longevity-nature-mitochondria.md'] },
  { date: '2026-09-15T09:00:00Z', files: ['melatonin-circadian-zeitgeber.md', 'melatonin-circadian-zeitgeber-en.md'] },
  { date: '2026-09-19T09:00:00Z', files: ['vitamin-d3-k2-nghich-ly-canxi-vi.md', 'vitamin-d3-k2-calcium-paradox-en.md'] },
  { date: '2026-09-23T09:00:00Z', files: ['glymphatic-deep-sleep-brain-cleaning.md', 'glymphatic-deep-sleep-brain-cleaning-en.md'] },
  { date: '2026-09-27T09:00:00Z', files: ['chuyen-hoa-mo-nau-ucp1-ro-ri-proton.md', 'brown-fat-ucp1-mitochondrial-proton-leak.md'] },

  // Tháng 10: Chuỗi Nghiên cứu Đột phá Mùa Thu 2026 (Phân bổ nhịp nhàng từng ngày)
  { date: '2026-10-01T09:00:00Z', files: ['succinate-ucp1-bat-sinh-nhiet-ty-the.md', 'succinate-ucp1-bat-mitochondrial-thermogenesis.md'] },
  { date: '2026-10-02T09:00:00Z', files: ['succinate-creatine-bat-thermogenesis-vi.md', 'succinate-creatine-bat-thermogenesis-en.md'] },
  { date: '2026-10-03T09:00:00Z', files: ['urolithin-a-kich-hoat-mitophagy-phuc-hoi-co-bap-vi.md', 'urolithin-a-mitophagy-muscle-endurance-en.md'] },
  { date: '2026-10-04T09:00:00Z', files: ['spermidine-eif5a-tu-thuc-ty-the-vi.md', 'spermidine-eif5a-autophagy-mitochondria-en.md'] },
  { date: '2026-10-05T09:00:00Z', files: ['alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi.md', 'alpha-ketoglutarate-epigenetic-clock-reversal-en.md'] },
  { date: '2026-10-06T09:00:00Z', files: ['nobel-medicine-2026-optogenetics.md', 'nobel-medicine-2026-optogenetics-en.md'] },
  { date: '2026-10-07T09:00:00Z', files: ['alpha-ketoglutarate-tre-hoa-bieu-gen-vi.md', 'alpha-ketoglutarate-epigenetic-rejuvenation-en.md'] },
  { date: '2026-10-07T13:00:00Z', files: ['dich-hach-yersinia-pestis-t3ss-doc-luc-vi.md', 'yersinia-pestis-t3ss-virulence-lab-leak-en.md'] },
  { date: '2026-10-08T09:00:00Z', files: ['con-duong-kynurenine-viem-nao-vi.md', 'kynurenine-pathway-neuroinflammation-en.md'] },
  { date: '2026-10-08T13:00:00Z', files: ['streptococcus-pyogenes-sieu-khang-nguyen-stss-vi.md', 'streptococcus-pyogenes-superantigen-stss-en.md'] },
  { date: '2026-10-09T09:00:00Z', files: ['inositols-ti-le-vang-40-1-buong-trung-pcos-vi.md', 'inositols-golden-ratio-40-1-ovarian-pcos-en.md'] }
];

let totalUpdated = 0;
for (const slot of schedule) {
  for (const fn of slot.files) {
    const p = path.join(postsDir, fn);
    if (!fs.existsSync(p)) {
      console.warn(`File not found: ${fn}`);
      continue;
    }
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/^date:\s*["'][^"']+["']/m, `date: "${slot.date}"`);
    fs.writeFileSync(p, content, 'utf8');
    totalUpdated++;
  }
}

console.log(`✅ Đã phân bổ lại ngày xuất bản cho toàn bộ ${totalUpdated} bài viết thành công!`);
