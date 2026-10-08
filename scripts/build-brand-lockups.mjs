import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/branding/logos';
fs.mkdirSync(outDir, { recursive: true });

async function createMasterBrandLocks() {
  const iconColor = 'public/branding/logos/phytocodex-icon-color-transparent.png';
  const iconBlack = 'public/branding/logos/phytocodex-icon-black-transparent.png';
  const iconWhite = 'public/branding/logos/phytocodex-icon-white-transparent.png';

  // 1. Horizontal Lockup - Light Background (for documents, press releases, letterheads)
  // Dimensions: 1200 x 320
  const hWidth = 1200;
  const hHeight = 320;
  const iconSize = 220;

  const iconColorResized = await sharp(iconColor)
    .resize(iconSize, iconSize, { fit: 'contain' })
    .toBuffer();

  const iconBlackResized = await sharp(iconBlack)
    .resize(iconSize, iconSize, { fit: 'contain' })
    .toBuffer();

  const iconWhiteResized = await sharp(iconWhite)
    .resize(iconSize, iconSize, { fit: 'contain' })
    .toBuffer();

  // Typography SVG for Horizontal Full Color (on White / Transparent)
  const textHorizontalColor = Buffer.from(`
    <svg width="${hWidth}" height="${hHeight}" viewBox="0 0 ${hWidth} ${hHeight}" xmlns="http://www.w3.org/2000/svg">
      <text x="310" y="160" font-family="'Cinzel', 'Georgia', serif" font-size="76" font-weight="800" letter-spacing="8" fill="#0B1528">
        PHYTO<tspan fill="#B48A2C">CODEX</tspan>
      </text>
      <text x="314" y="210" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#0D9488">
        DECODING THE MOLECULES OF HEALTH
      </text>
      <line x1="314" y1="230" x2="980" y2="230" stroke="#CBD5E1" stroke-width="1.5" />
      <text x="314" y="254" font-family="'Inter', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#64748B">
        WHERE EASTERN BOTANICALS MEET EUROPEAN SCIENCE · DR. XUAN CHIEN HOANG
      </text>
    </svg>
  `);

  // Horizontal Color Transparent
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: iconColorResized, top: 50, left: 60 },
      { input: textHorizontalColor, top: 0, left: 0 }
    ])
    .png()
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-color-transparent.png'));

  // Horizontal Color on White Background
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      { input: iconColorResized, top: 50, left: 60 },
      { input: textHorizontalColor, top: 0, left: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-color-white-bg.jpg'));

  // Typography SVG for Horizontal Black Monochrome (on White / Transparent)
  const textHorizontalBlack = Buffer.from(`
    <svg width="${hWidth}" height="${hHeight}" viewBox="0 0 ${hWidth} ${hHeight}" xmlns="http://www.w3.org/2000/svg">
      <text x="310" y="160" font-family="'Cinzel', 'Georgia', serif" font-size="76" font-weight="800" letter-spacing="8" fill="#0F172A">
        PHYTO<tspan fill="#334155">CODEX</tspan>
      </text>
      <text x="314" y="210" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#1E293B">
        DECODING THE MOLECULES OF HEALTH
      </text>
      <line x1="314" y1="230" x2="980" y2="230" stroke="#94A3B8" stroke-width="1.5" />
      <text x="314" y="254" font-family="'Inter', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#475569">
        WHERE EASTERN BOTANICALS MEET EUROPEAN SCIENCE · DR. XUAN CHIEN HOANG
      </text>
    </svg>
  `);

  // Horizontal Black Transparent
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: iconBlackResized, top: 50, left: 60 },
      { input: textHorizontalBlack, top: 0, left: 0 }
    ])
    .png()
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-black-transparent.png'));

  // Horizontal Black on White BG
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      { input: iconBlackResized, top: 50, left: 60 },
      { input: textHorizontalBlack, top: 0, left: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-black-white-bg.jpg'));

  // Typography SVG for Horizontal White Monochrome (on Dark / Transparent)
  const textHorizontalWhite = Buffer.from(`
    <svg width="${hWidth}" height="${hHeight}" viewBox="0 0 ${hWidth} ${hHeight}" xmlns="http://www.w3.org/2000/svg">
      <text x="310" y="160" font-family="'Cinzel', 'Georgia', serif" font-size="76" font-weight="800" letter-spacing="8" fill="#FFFFFF">
        PHYTO<tspan fill="#E2E8F0">CODEX</tspan>
      </text>
      <text x="314" y="210" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#5EEAD4">
        DECODING THE MOLECULES OF HEALTH
      </text>
      <line x1="314" y1="230" x2="980" y2="230" stroke="#334155" stroke-width="1.5" />
      <text x="314" y="254" font-family="'Inter', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#94A3B8">
        WHERE EASTERN BOTANICALS MEET EUROPEAN SCIENCE · DR. XUAN CHIEN HOANG
      </text>
    </svg>
  `);

  // Horizontal White Transparent
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: iconWhiteResized, top: 50, left: 60 },
      { input: textHorizontalWhite, top: 0, left: 0 }
    ])
    .png()
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-white-transparent.png'));

  // Horizontal White on Luxury Navy BG
  await sharp({
    create: {
      width: hWidth,
      height: hHeight,
      channels: 4,
      background: { r: 11, g: 21, b: 38, alpha: 1 }
    }
  })
    .composite([
      { input: iconWhiteResized, top: 50, left: 60 },
      { input: textHorizontalWhite, top: 0, left: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'phytocodex-lockup-horizontal-white-navy-bg.jpg'));

  // 2. Vertical Stacked Lockup (Badge / Stamp style)
  // Dimensions: 800 x 900
  const vWidth = 800;
  const vHeight = 900;
  const vIconSize = 420;

  const vIconColor = await sharp(iconColor).resize(vIconSize, vIconSize, { fit: 'contain' }).toBuffer();
  const vIconBlack = await sharp(iconBlack).resize(vIconSize, vIconSize, { fit: 'contain' }).toBuffer();
  const vIconWhite = await sharp(iconWhite).resize(vIconSize, vIconSize, { fit: 'contain' }).toBuffer();

  // Vertical Typography Color
  const textVerticalColor = Buffer.from(`
    <svg width="${vWidth}" height="${vHeight}" viewBox="0 0 ${vWidth} ${vHeight}" xmlns="http://www.w3.org/2000/svg">
      <text x="${vWidth/2}" y="570" font-family="'Cinzel', 'Georgia', serif" font-size="64" font-weight="800" letter-spacing="8" fill="#0B1528" text-anchor="middle">
        PHYTO<tspan fill="#B48A2C">CODEX</tspan>
      </text>
      <text x="${vWidth/2}" y="620" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="600" letter-spacing="4.5" fill="#0D9488" text-anchor="middle">
        DECODING THE MOLECULES OF HEALTH
      </text>
      <line x1="200" y1="655" x2="600" y2="655" stroke="#CBD5E1" stroke-width="1.5" />
      <text x="${vWidth/2}" y="690" font-family="'Inter', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#64748B" text-anchor="middle">
        WHERE EASTERN BOTANICALS MEET EUROPEAN SCIENCE
      </text>
      <text x="${vWidth/2}" y="730" font-family="'Cinzel', serif" font-size="15" font-weight="700" letter-spacing="3" fill="#B48A2C" text-anchor="middle">
        DR. XUAN CHIEN HOANG
      </text>
    </svg>
  `);

  await sharp({
    create: { width: vWidth, height: vHeight, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: vIconColor, top: 90, left: (vWidth - vIconSize)/2 },
      { input: textVerticalColor, top: 0, left: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'phytocodex-lockup-vertical-color-white-bg.jpg'));

  await sharp({
    create: { width: vWidth, height: vHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite([
      { input: vIconColor, top: 90, left: (vWidth - vIconSize)/2 },
      { input: textVerticalColor, top: 0, left: 0 }
    ])
    .png()
    .toFile(path.join(outDir, 'phytocodex-lockup-vertical-color-transparent.png'));

  console.log('All Master Brand Lockups generated successfully in public/branding/logos!');
}

createMasterBrandLocks().catch(console.error);
