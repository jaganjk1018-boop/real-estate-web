const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Luxury JK Realty SVG Logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#142642"/>
      <stop offset="50%" stop-color="#0E1E34"/>
      <stop offset="100%" stop-color="#070F1C"/>
    </linearGradient>

    <!-- Luxury Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2CE"/>
      <stop offset="25%" stop-color="#F3DC8C"/>
      <stop offset="60%" stop-color="#D4AF37"/>
      <stop offset="90%" stop-color="#AA820A"/>
      <stop offset="100%" stop-color="#805E02"/>
    </linearGradient>

    <!-- Subtle Golden Glow Filter -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Drop Shadow for Monogram -->
    <filter id="monogramShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Squircle with Subtle Gold Border -->
  <rect x="24" y="24" width="464" height="464" rx="112" ry="112" fill="url(#bgGrad)"/>
  <rect x="24" y="24" width="464" height="464" rx="112" ry="112" fill="none" stroke="url(#goldGrad)" stroke-width="8" opacity="0.9"/>
  <rect x="36" y="36" width="440" height="440" rx="100" ry="100" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.35"/>

  <!-- Architectural Crown / Rooftop Crest -->
  <g transform="translate(256, 120)" filter="url(#goldGlow)">
    <!-- Central Penthouse Gable Apex -->
    <path d="M 0 -36 L 54 -2 L 54 8 L 0 -26 L -54 8 L -54 -2 Z" fill="url(#goldGrad)"/>
    <!-- Modern Spire / Pinnacle -->
    <polygon points="0,-48 6,-34 -6,-34" fill="url(#goldGrad)"/>
    <!-- Small Luxury Accent Diamond -->
    <rect x="-4" y="16" width="8" height="8" transform="rotate(45)" fill="url(#goldGrad)"/>
  </g>

  <!-- Central Luxury Monogram "JK" -->
  <g filter="url(#monogramShadow)">
    <text 
      x="256" 
      y="340" 
      text-anchor="middle" 
      font-family="'Playfair Display', 'Cinzel', 'Georgia', 'Times New Roman', serif" 
      font-weight="900" 
      font-size="200" 
      letter-spacing="2"
      fill="url(#goldGrad)"
    >JK</text>
  </g>

  <!-- Subtitle: REALTY -->
  <text 
    x="256" 
    y="395" 
    text-anchor="middle" 
    font-family="'Inter', 'Montserrat', 'Helvetica', sans-serif" 
    font-weight="800" 
    font-size="28" 
    letter-spacing="14" 
    fill="url(#goldGrad)" 
    opacity="0.92"
  >REALTY</text>

  <!-- Underline Accent Flourish -->
  <line x1="170" y1="418" x2="342" y2="418" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
  <circle cx="256" cy="418" r="3.5" fill="url(#goldGrad)"/>
</svg>`;

function createIcoFromPngBuffers(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt1LE ? null : null;
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width === 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height === 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const srcAppDir = path.join(__dirname, '..', 'src', 'app');

  // Save SVG icons
  const publicSvgPath = path.join(publicDir, 'icon.svg');
  const appSvgPath = path.join(srcAppDir, 'icon.svg');
  fs.writeFileSync(publicSvgPath, svgContent, 'utf8');
  fs.writeFileSync(appSvgPath, svgContent, 'utf8');
  console.log('Saved SVG icons to public/icon.svg and src/app/icon.svg');

  // Generate PNGs at multiple resolutions
  const svgBuffer = Buffer.from(svgContent);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Save Apple Touch Icon and Web Icons
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  // Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = createIcoFromPngBuffers([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ]);

  const publicIcoPath = path.join(publicDir, 'favicon.ico');
  const appIcoPath = path.join(srcAppDir, 'favicon.ico');
  fs.writeFileSync(publicIcoPath, icoBuffer);
  fs.writeFileSync(appIcoPath, icoBuffer);
  console.log('Generated and saved favicon.ico to public/ and src/app/ (Sizes: 16x16, 32x32, 48x48)');
}

main().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
