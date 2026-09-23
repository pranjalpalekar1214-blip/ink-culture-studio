// Generates original SVG placeholder images into public/images.
// Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_ARTISTS = "public/images/artists";
const OUT_PLACEHOLDERS = "public/images/placeholder";
mkdirSync(OUT_ARTISTS, { recursive: true });
mkdirSync(OUT_PLACEHOLDERS, { recursive: true });

const VOLT = "#f5c518"; // brand yellow
const palettes = {
  "Black-Grey": { bg: "#1a1a1a", fg: "#3d3d3d", accent: "#e8e2d5" },
  Realism: { bg: "#20140f", fg: "#4d2e1e", accent: VOLT },
  Geometric: { bg: "#141821", fg: "#2c3a52", accent: VOLT },
  "Fine-Line": { bg: "#191919", fg: "#404040", accent: "#e8e2d5" },
  Lettering: { bg: "#1e1208", fg: "#4d3314", accent: VOLT },
  "Neo-Trad": { bg: "#1c141c", fg: "#43273f", accent: VOLT },
  Traditional: { bg: "#211208", fg: "#52300f", accent: VOLT },
  Custom: { bg: "#17181a", fg: "#3a3d42", accent: VOLT },
  "Cover-Up": { bg: "#121212", fg: "#333333", accent: VOLT },
  Small: { bg: "#101410", fg: "#2b3a2b", accent: VOLT },
  Large: { bg: "#161616", fg: "#3b3b3b", accent: VOLT },
  Portrait: { bg: "#1a1414", fg: "#463030", accent: VOLT },
  Piercing: { bg: "#11151b", fg: "#2a3644", accent: VOLT },
};

function svg(name, p) {
  const accent = p.accent;
  const fg = p.fg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <rect width="400" height="500" fill="${p.bg}"/>
  <radialGradient id="g" cx="30%" cy="20%" r="90%">
    <stop offset="0%" stop-color="${fg}" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="${p.bg}" stop-opacity="0"/>
  </radialGradient>
  <rect width="400" height="500" fill="url(#g)"/>
  <g fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round">
    <path d="M210 150 C 190 120, 150 130, 150 165 C 150 200, 200 205, 215 175 C 228 150, 205 130, 190 142"/>
    <path d="M205 210 C 200 260, 210 300, 230 340"/>
    <path d="M225 240 C 205 250, 190 260, 180 285"/>
    <path d="M215 300 C 235 295, 250 280, 255 260"/>
    <path d="M60 80 L 76 84 L 80 100 L 90 86 L 106 90" stroke-opacity="0.35"/>
    <path d="M320 420 L 336 424 L 340 440" stroke-opacity="0.3"/>
  </g>
  <g stroke="${fg}" stroke-width="1.6" fill="none" opacity="0.8">
    <path d="M40 460 H 360"/>
    <path d="M40 440 H 250" stroke-opacity="0.6"/>
  </g>
  <rect x="14" y="14" width="372" height="472" fill="none" stroke="${accent}" stroke-opacity="0.25" stroke-dasharray="2 7"/>
  <text x="24" y="474" font-family="Arial Black, Arial, sans-serif" font-size="17" letter-spacing="2" fill="${accent}" fill-opacity="0.85">${name.toUpperCase()}</text>
  <text x="24" y="456" font-family="Arial, sans-serif" font-size="9" letter-spacing="3" fill="#ffffff" fill-opacity="0.4">STREET CULTURE · PLACEHOLDER</text>
</svg>`;
}

for (const [name, p] of Object.entries(palettes)) {
  writeFileSync(`${OUT_PLACEHOLDERS}/${name}.svg`, svg(name, p));
  writeFileSync(`${OUT_PLACEHOLDERS}/${name.toLowerCase()}.svg`, svg(name, p));
}

const artistSvg = (n) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <rect width="400" height="500" fill="#141414"/>
  <radialGradient id="g" cx="50%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#3a2f14" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#141414" stop-opacity="0"/>
  </radialGradient>
  <rect width="400" height="500" fill="url(#g)"/>
  <g fill="none" stroke="#e8e2d5" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round">
    <path d="M130 440 C 136 380, 168 356, 200 356 C 232 356, 264 380, 270 440"/>
    <path d="M148 200 C 148 128, 172 92, 200 92 C 228 92, 252 128, 252 200 C 252 264, 228 308, 200 308 C 172 308, 148 264, 148 200 Z"/>
    <path d="M148 200 C 132 196, 128 216, 144 228" />
    <path d="M252 200 C 268 196, 272 216, 256 228" />
  </g>
  <g fill="none" stroke="${VOLT}" stroke-opacity="0.8" stroke-width="3" stroke-linecap="round">
    <path d="M164 196 L 192 202 M 236 196 L 208 202"/>
    <path d="M168 224 C 176 218, 186 218, 192 224"/>
    <path d="M208 224 C 214 218, 224 218, 232 224"/>
    <path d="M180 262 C 190 266, 210 266, 220 262"/>
    <path d="M148 196 C 144 128, 172 84, 200 84 C 228 84, 256 128, 252 196 C 240 168, 222 158, 200 158 C 178 158, 160 168, 148 196 Z"/>
    <path d="M120 470 H 280" stroke-opacity="0.4"/>
  </g>
  <text x="140" y="486" font-family="Arial Black, Arial, sans-serif" font-size="20" letter-spacing="4" fill="${VOLT}" fill-opacity="0.9">ARTIST ${n}</text>
</svg>`;

writeFileSync(`${OUT_ARTISTS}/karan.svg`, artistSvg("01 — KARAN"));
writeFileSync(`${OUT_ARTISTS}/lucky.svg`, artistSvg("02 — LUCKY"));

// Brand logo (star + ink dot) — yellow
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M16 2 L 20 12 L 30 13 L 22 20 L 25 30 L 16 24 L 7 30 L 10 20 L 2 13 L 12 12 Z" fill="${VOLT}"/>
  <circle cx="16" cy="16" r="4.5" fill="#0d0d0d"/>
</svg>`;
writeFileSync("public/logo.svg", logo);
mkdirSync("src/assets", { recursive: true });
writeFileSync("src/assets/logo.svg", logo);

// Simple OG image (1200x630) — replace with a real branded image later
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#0d0d0d"/>
  <text x="80" y="300" font-family="Arial Black, Arial, sans-serif" font-size="110" fill="#e8e2d5">INK IS</text>
  <text x="80" y="420" font-family="Arial Black, Arial, sans-serif" font-size="110" fill="${VOLT}">CULTURE.</text>
  <text x="84" y="500" font-family="Arial, sans-serif" font-size="26" letter-spacing="6" fill="#e8e2d5" fill-opacity="0.7">STREET CULTURE TATTOO STUDIO &amp; ACADEMY — KANDIVALI WEST, MUMBAI</text>
</svg>`;
writeFileSync("public/og-image.svg", og);

console.log("Placeholder images written to public/images");
