import sharp from 'sharp';

async function composeRefinedBanners() {
  const emblemSize = 136;
  
  // 1. Cut emblem in circular mask
  const circleSvg = Buffer.from(`
    <svg width="${emblemSize}" height="${emblemSize}" viewBox="0 0 ${emblemSize} ${emblemSize}">
      <circle cx="${emblemSize / 2}" cy="${emblemSize / 2}" r="${emblemSize / 2 - 1}" fill="#FFFFFF"/>
    </svg>
  `);

  const circularEmblem = await sharp('public/images/phytocodex-emblem.jpg')
    .resize(emblemSize, emblemSize, { fit: 'cover' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Subtle luxury gold + emerald outline ring
  const ringSvg = Buffer.from(`
    <svg width="${emblemSize}" height="${emblemSize}" viewBox="0 0 ${emblemSize} ${emblemSize}">
      <!-- Outer elegant hairline gold ring with glow -->
      <circle cx="${emblemSize / 2}" cy="${emblemSize / 2}" r="${emblemSize / 2 - 2}" fill="none" stroke="#D4AF37" stroke-width="2.2" opacity="0.9"/>
      <circle cx="${emblemSize / 2}" cy="${emblemSize / 2}" r="${emblemSize / 2 - 5.5}" fill="none" stroke="#2DD4BF" stroke-width="1" opacity="0.45"/>
    </svg>
  `);

  const emblemWithRing = await sharp(circularEmblem)
    .composite([{ input: ringSvg, blend: 'over' }])
    .png()
    .toBuffer();

  // 1. OPTION A: PURE ELEGANT EMBLEM (Just the emblem circular badge in the top-left corner)
  // Clean, perfectly balanced, no text clipping, matches the user's "chèn logo mới ở góc nhẹ nhàng là được"
  const emblemBadgePadding = 10;
  const minimalEmblemWithBackdrop = await sharp({
    create: {
      width: emblemSize + emblemBadgePadding * 2,
      height: emblemSize + emblemBadgePadding * 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: emblemWithRing, top: emblemBadgePadding, left: emblemBadgePadding }
    ])
    .png()
    .toBuffer();

  await sharp('public/images/biodispatch-hero-banner.jpg')
    .composite([
      {
        input: minimalEmblemWithBackdrop,
        top: 36,
        left: 44,
        blend: 'over'
      }
    ])
    .jpeg({ quality: 96 })
    .toFile('public/images/phytocodex-banner.jpg');

  console.log('Main phytocodex-banner.jpg created with pure elegant emblem.');

  // 2. OPTION B: ELEGANT PILL WITH ACCURATELY SIZED WORDMARK (if text is desired)
  const pillWidth = 460;
  const pillHeight = 148;
  const pillSvg = Buffer.from(`
    <svg width="${pillWidth}" height="${pillHeight}" viewBox="0 0 ${pillWidth} ${pillHeight}">
      <defs>
        <linearGradient id="pillGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#040D18" stop-opacity="0.88" />
          <stop offset="65%" stop-color="#071829" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#081A2F" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      
      <!-- Subtle frosted pill -->
      <rect x="2" y="6" width="${pillWidth - 4}" height="${pillHeight - 12}" rx="${(pillHeight - 12) / 2}" fill="url(#pillGrad)" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.35" />
      
      <!-- Wordmark -->
      <text x="156" y="64" font-family="'Cinzel', 'Trajan Pro', 'Georgia', serif" font-size="28" font-weight="700" letter-spacing="4" fill="#F8FAFC">
        PHYTO<tspan fill="#D4AF37">CODEX</tspan>
      </text>
      
      <!-- Tagline -->
      <text x="158" y="90" font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="10" font-weight="600" letter-spacing="2.2" fill="#2DD4BF" opacity="0.95">
        DECODING THE MOLECULES OF HEALTH
      </text>
    </svg>
  `);

  const fullBadgeComposite = await sharp({
    create: {
      width: pillWidth,
      height: pillHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: pillSvg, top: 0, left: 0 },
      { input: emblemWithRing, top: 6, left: 6 }
    ])
    .png()
    .toBuffer();

  await sharp('public/images/biodispatch-hero-banner.jpg')
    .composite([
      {
        input: fullBadgeComposite,
        top: 32,
        left: 40,
        blend: 'over'
      }
    ])
    .jpeg({ quality: 96 })
    .toFile('public/images/phytocodex-banner-with-wordmark.jpg');

  console.log('phytocodex-banner-with-wordmark.jpg also created with wide pill.');
}

composeRefinedBanners().catch(console.error);
