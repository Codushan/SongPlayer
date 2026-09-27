const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'showcase');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Diwali Diya: Authentic golden Indian clay/brass diya cutout with glowing flame & sparkles on 100% transparent background
const diwaliSvg = `
<svg width="480" height="400" viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Flame Glow -->
    <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffedd5" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#ef4444" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <!-- Flame Inner -->
    <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="30%" stop-color="#f59e0b"/>
      <stop offset="75%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <!-- Diya Body Brass Gradient -->
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="30%" stop-color="#eab308"/>
      <stop offset="70%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <!-- Diya Rim -->
    <linearGradient id="rimGrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#ca8a04"/>
      <stop offset="50%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <!-- Oil surface -->
    <radialGradient id="oilGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ca8a04"/>
      <stop offset="80%" stop-color="#713f12"/>
    </radialGradient>
    <!-- Soft shadow under Diya -->
    <radialGradient id="diyaShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(120, 53, 15, 0.45)"/>
      <stop offset="100%" stop-color="rgba(120, 53, 15, 0)"/>
    </radialGradient>
  </defs>

  <!-- Ambient Flame Glow behind -->
  <circle cx="240" cy="145" r="130" fill="url(#flameGlow)"/>

  <!-- Sparkles / Diyas around -->
  <g opacity="0.85">
    <circle cx="140" cy="90" r="3" fill="#fde047"/>
    <polygon points="140,82 143,89 150,90 143,91 140,98 137,91 130,90 137,89" fill="#fde047"/>
    <circle cx="340" cy="110" r="2.5" fill="#fde047"/>
    <polygon points="340,104 342,109 347,110 342,111 340,116 338,111 333,110 338,109" fill="#fde047"/>
    <polygon points="285,60 287,64 291,65 287,66 285,70 283,66 279,65 283,64" fill="#fde047"/>
    <circle cx="180" cy="150" r="2" fill="#fbbf24"/>
    <circle cx="310" cy="160" r="2.5" fill="#fbbf24"/>
  </g>

  <!-- Ground Soft Reflection / Shadow (Transparent) -->
  <ellipse cx="240" cy="340" rx="160" ry="24" fill="url(#diyaShadow)"/>

  <!-- Diya Outer Base -->
  <path d="M120 230 C120 310 180 340 240 340 C300 340 360 310 360 230 C330 255 270 265 240 265 C210 265 150 255 120 230 Z" fill="url(#brassGrad)"/>

  <!-- Ornate Decorative Petal Engravings on Diya Base -->
  <path d="M165 255 Q180 295 195 258 Q210 305 225 260 Q240 310 255 260 Q270 305 285 258 Q300 295 315 255" stroke="#fef08a" stroke-width="2.5" fill="none" opacity="0.75"/>
  <circle cx="200" cy="285" r="3.5" fill="#fef08a"/>
  <circle cx="240" cy="292" r="4.5" fill="#fef08a"/>
  <circle cx="280" cy="285" r="3.5" fill="#fef08a"/>

  <!-- Diya Rim & Oil Bowl (Perspective view) -->
  <ellipse cx="240" cy="230" rx="120" ry="34" fill="url(#rimGrad)"/>
  <ellipse cx="240" cy="231" rx="112" ry="28" fill="url(#oilGrad)"/>

  <!-- Beaded Rim Dots -->
  <g fill="#fef9c3" opacity="0.9">
    <circle cx="130" cy="230" r="2"/>
    <circle cx="145" cy="238" r="2.2"/>
    <circle cx="165" cy="246" r="2.2"/>
    <circle cx="190" cy="252" r="2.5"/>
    <circle cx="215" cy="256" r="2.5"/>
    <circle cx="240" cy="257" r="3"/>
    <circle cx="265" cy="256" r="2.5"/>
    <circle cx="290" cy="252" r="2.5"/>
    <circle cx="315" cy="246" r="2.2"/>
    <circle cx="335" cy="238" r="2.2"/>
    <circle cx="350" cy="230" r="2"/>
  </g>

  <!-- Cotton Wick (Baati) -->
  <path d="M225 235 Q235 220 238 200" stroke="#fcd34d" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M238 202 L239 194" stroke="#451a03" stroke-width="4" stroke-linecap="round"/>

  <!-- Flame Outer -->
  <path d="M240 195 C230 195 210 165 215 130 C220 95 238 60 240 50 C242 60 260 95 265 130 C270 165 250 195 240 195 Z" fill="url(#flameInner)"/>

  <!-- Flame Core (Intense White/Yellow) -->
  <path d="M240 192 C234 192 222 170 226 145 C230 120 239 90 240 82 C241 90 250 120 254 145 C258 170 246 192 240 192 Z" fill="#ffffff" opacity="0.95"/>
</svg>
`;

// 2. Chhath Puja: Golden Sacred Rising Sun with holy Ganga wavelets & Arghya Soop offering cutout on 100% transparent background
const chhathSvg = `
<svg width="480" height="400" viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#f97316" stop-opacity="0.5"/>
      <stop offset="80%" stop-color="#ea580c" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fde047"/>
      <stop offset="70%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="soopBamboo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
    <radialGradient id="waterShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(234, 88, 12, 0.4)"/>
      <stop offset="100%" stop-color="rgba(234, 88, 12, 0)"/>
    </radialGradient>
  </defs>

  <!-- Big Solar Aura Glow -->
  <circle cx="240" cy="150" r="140" fill="url(#sunGlow)"/>

  <!-- Sun Rays (Artistic Surya Deva Rays) -->
  <g stroke="#fde047" stroke-width="3" stroke-linecap="round" opacity="0.8">
    <line x1="240" y1="30" x2="240" y2="10"/>
    <line x1="325" y1="65" x2="340" y2="50"/>
    <line x1="360" y1="150" x2="380" y2="150"/>
    <line x1="325" y1="235" x2="340" y2="250"/>
    <line x1="155" y1="65" x2="140" y2="50"/>
    <line x1="120" y1="150" x2="100" y2="150"/>
    <line x1="155" y1="235" x2="140" y2="250"/>
    <!-- Diagonals -->
    <line x1="290" y1="45" x2="300" y2="30" stroke-width="2"/>
    <line x1="190" y1="45" x2="180" y2="30" stroke-width="2"/>
    <line x1="355" y1="105" x2="375" y2="95" stroke-width="2"/>
    <line x1="125" y1="105" x2="105" y2="95" stroke-width="2"/>
  </g>

  <!-- Sacred Rising Sun Disc -->
  <circle cx="240" cy="150" r="70" fill="url(#sunGrad)"/>

  <!-- Sacred Surya Tilak / Radiance on Sun -->
  <circle cx="240" cy="150" r="62" stroke="#ffffff" stroke-width="2" opacity="0.5" fill="none"/>
  <circle cx="240" cy="150" r="45" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="4 4" fill="none" opacity="0.7"/>

  <!-- Holy River Ganga Golden Waves Base -->
  <ellipse cx="240" cy="335" rx="170" ry="25" fill="url(#waterShadow)"/>
  <path d="M90 320 Q160 305 240 320 T390 320" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
  <path d="M120 340 Q180 330 240 340 T360 340" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>

  <!-- Chhath Puja Traditional Daura / Soop with Offerings (Front Cutout) -->
  <g transform="translate(140, 220)">
    <!-- Traditional Bamboo Soop -->
    <path d="M10 90 L30 30 C70 10 130 10 170 30 L190 90 C140 105 60 105 10 90 Z" fill="url(#soopBamboo)"/>
    <path d="M10 90 C60 105 140 105 190 90" stroke="#78350f" stroke-width="4" fill="none"/>
    <path d="M30 30 C70 10 130 10 170 30" stroke="#fef3c7" stroke-width="3" fill="none"/>
    <!-- Bamboo Weave lines -->
    <line x1="60" y1="20" x2="50" y2="95" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
    <line x1="100" y1="15" x2="100" y2="100" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
    <line x1="140" y1="20" x2="150" y2="95" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Fruits / Offerings in Soop -->
    <!-- Coconut -->
    <circle cx="100" cy="45" r="18" fill="#78350f"/>
    <circle cx="100" cy="45" r="15" fill="#a16207"/>
    <!-- Banana bunch -->
    <path d="M60 40 Q80 30 100 38" stroke="#fde047" stroke-width="8" stroke-linecap="round"/>
    <path d="M65 48 Q85 38 105 46" stroke="#facc15" stroke-width="7" stroke-linecap="round"/>
    <!-- Red Hibiscus Flower for Chhathi Maiya -->
    <circle cx="135" cy="48" r="14" fill="#dc2626"/>
    <circle cx="135" cy="48" r="5" fill="#fde047"/>
    <!-- Small Diya in Soop -->
    <ellipse cx="100" cy="72" rx="14" ry="5" fill="#ca8a04"/>
    <path d="M100 70 Q98 62 100 58 Q102 62 100 70 Z" fill="#f59e0b"/>
  </g>
</svg>
`;

// 3. Bhojpuri Folk Beats: Traditional Indian Dholak percussion & musical notes cutout on 100% transparent background
const dholakSvg = `
<svg width="480" height="400" viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="musicGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <!-- Sheesham Wood Gradient -->
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="35%" stop-color="#d97706"/>
      <stop offset="70%" stop-color="#92400e"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
    <!-- Leather Skin Head (Puri) -->
    <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="60%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <radialGradient id="dholakShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.35)"/>
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)"/>
    </radialGradient>
  </defs>

  <!-- Ambient Glow -->
  <circle cx="240" cy="200" r="140" fill="url(#musicGlow)"/>

  <!-- Musical Notes floating freely around cutout -->
  <g fill="#ec4899" opacity="0.9">
    <!-- Note 1 -->
    <path d="M120 110 C120 100 135 95 140 92 L140 125 A 9 7 0 1 1 130 132 L130 110 Z"/>
    <!-- Beamed Double Note -->
    <path d="M330 90 L370 75 L370 95 L330 110 Z"/>
    <path d="M330 90 L330 130 A 8 6 0 1 1 322 136 L322 90 Z"/>
    <path d="M370 75 L370 115 A 8 6 0 1 1 362 121 L362 75 Z"/>
    <!-- Note 3 -->
    <path d="M360 270 C360 260 375 255 380 252 L380 285 A 9 7 0 1 1 370 292 L370 270 Z" fill="#8b5cf6"/>
  </g>

  <!-- Sparkles -->
  <polygon points="170,80 172,85 177,86 172,87 170,92 168,87 163,86 168,85" fill="#facc15"/>
  <polygon points="310,60 312,65 317,66 312,67 310,72 308,67 303,66 308,65" fill="#facc15"/>

  <!-- Ground Soft Shadow -->
  <ellipse cx="240" cy="330" rx="160" ry="20" fill="url(#dholakShadow)"/>

  <!-- Dholak Group (Slightly tilted for dynamic folk energy) -->
  <g transform="rotate(-6 240 205)">
    <!-- Wooden Barrel Body (Curved barrel) -->
    <path d="M 120 155 C 170 110, 310 110, 360 155 C 375 205, 375 215, 360 265 C 310 310, 170 310, 120 265 C 105 215, 105 205, 120 155 Z" fill="url(#woodGrad)"/>

    <!-- Decorative Gold Center Band / Ring -->
    <path d="M 230 120 C 236 170, 236 250, 230 300 L 250 300 C 256 250, 256 170, 250 120 Z" fill="#eab308" opacity="0.85"/>

    <!-- Traditional Cotton Ropes / Lacing (Zig-Zag Woven cords) -->
    <g stroke="#fef3c7" stroke-width="3" stroke-linecap="round" opacity="0.9">
      <line x1="120" y1="165" x2="240" y2="120"/>
      <line x1="240" y1="120" x2="360" y2="165"/>

      <line x1="120" y1="190" x2="240" y2="210"/>
      <line x1="240" y1="210" x2="360" y2="190"/>

      <line x1="120" y1="230" x2="240" y2="210"/>
      <line x1="240" y1="210" x2="360" y2="230"/>

      <line x1="120" y1="255" x2="240" y2="300"/>
      <line x1="240" y1="300" x2="360" y2="255"/>
    </g>

    <!-- Tuning Metal Rings (Chhalla) on ropes -->
    <circle cx="180" cy="165" r="5" fill="#ca8a04" stroke="#fef08a" stroke-width="2"/>
    <circle cx="200" cy="255" r="5" fill="#ca8a04" stroke="#fef08a" stroke-width="2"/>
    <circle cx="300" cy="165" r="5" fill="#ca8a04" stroke="#fef08a" stroke-width="2"/>
    <circle cx="280" cy="255" r="5" fill="#ca8a04" stroke="#fef08a" stroke-width="2"/>

    <!-- Left Drum Head (Bass / Dhama - Leather Membrane & Rim) -->
    <ellipse cx="115" cy="210" rx="20" ry="55" fill="url(#leatherGrad)"/>
    <!-- Syahi / Masala Inner tuning patch on Bass head -->
    <ellipse cx="115" cy="210" rx="9" ry="24" fill="#3f1e09" opacity="0.85"/>
    <ellipse cx="115" cy="210" rx="21" ry="56" stroke="#522504" stroke-width="6" fill="none"/>

    <!-- Right Drum Head (Treble / Chanti - Leather Membrane & Rim) -->
    <ellipse cx="365" cy="210" rx="18" ry="55" fill="url(#leatherGrad)"/>
    <ellipse cx="365" cy="210" rx="19" ry="56" stroke="#522504" stroke-width="6" fill="none"/>
  </g>
</svg>
`;

async function run() {
  await sharp(Buffer.from(diwaliSvg))
    .png()
    .toFile(path.join(outDir, 'diwali_diya.png'));
  console.log('✅ Generated public/showcase/diwali_diya.png (100% transparent PNG cutout)');

  await sharp(Buffer.from(chhathSvg))
    .png()
    .toFile(path.join(outDir, 'chhath_sun.png'));
  console.log('✅ Generated public/showcase/chhath_sun.png (100% transparent PNG cutout)');

  await sharp(Buffer.from(dholakSvg))
    .png()
    .toFile(path.join(outDir, 'bhojpuri_beats.png'));
  console.log('✅ Generated public/showcase/bhojpuri_beats.png (100% transparent PNG cutout)');
}

run().catch(console.error);
