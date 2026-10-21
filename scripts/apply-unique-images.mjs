import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const artifactDir = 'C:\\Users\\Hoang\\.gemini\\antigravity-ide\\brain\\6942e463-9812-489c-a365-9c617318b894';
const postsImagesDir = path.resolve('public/images/posts');

const MAPPINGS = [
  {
    src: path.join(artifactDir, 'omega_3_capsules_1792608006204.jpg'),
    targets: [
      'omega-3-triglyceride-va-ethyl-ester-sinh-kha-dung-vi-tim-mach-vi.jpg',
      'omega-3-triglyceride-vs-ethyl-ester-cardiovascular-pharmacokinetics-en.jpg'
    ]
  },
  {
    src: path.join(artifactDir, 'phosphatidylserine_synapse_1792608128644.jpg'),
    targets: [
      'phosphatidylserine-va-dha-mang-te-bao-than-kinh-vi.jpg',
      'phosphatidylserine-dha-mang-te-bao-than-kinh-vi.jpg',
      'phosphatidylserine-and-dha-neuronal-membrane-en.jpg',
      'phosphatidylserine-dha-neuronal-membrane-en.jpg'
    ]
  },
  {
    src: path.join(artifactDir, 'zombie_senolytics_1792608020862.jpg'),
    targets: [
      'thanh-loc-te-bao-zombie-senolytics-va-tuoi-tho-vi-mo-vi.jpg',
      'clearing-zombie-cells-senolytics-and-microscopic-longevity-en.jpg'
    ]
  },
  {
    src: path.join(artifactDir, 'gut_brain_vagus_1792608054519.jpg'),
    targets: [
      'how-gut-microbes-talk-to-the-brain-vagus-nerve-gaba-en.jpg',
      'tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi.jpg'
    ]
  },
  {
    src: path.join(artifactDir, 'mindful_chewing_1792608070498.jpg'),
    targets: [
      'chewing-slowly-satiety-gut-hormones.jpg',
      'nhai-ky-no-lau-giam-calo.jpg',
      'thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-en.jpg',
      'thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-en.jpg',
      'thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-vi.jpg',
      'thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-vi.jpg'
    ]
  },
  {
    src: path.join(artifactDir, 'efflux_pump_1792608087297.jpg'),
    targets: [
      'co-che-efflux-pump-khang-sinh-vi.jpg',
      'efflux-pump-antibiotic-resistance-en.jpg'
    ]
  }
];

async function run() {
  for (const item of MAPPINGS) {
    if (!fs.existsSync(item.src)) {
      console.warn(`File nguồn không tồn tại: ${item.src}`);
      continue;
    }
    const buffer = fs.readFileSync(item.src);
    for (const targetName of item.targets) {
      const destPath = path.join(postsImagesDir, targetName);
      await sharp(buffer)
        .resize(1280, 720, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 88 })
        .toFile(destPath);
      console.log(`✅ Đã cập nhật ảnh độc bản 16:9 -> ${targetName}`);
    }
  }
  console.log('🎉 Hoàn tất gán toàn bộ ảnh độc bản chất lượng cao!');
}

run().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
