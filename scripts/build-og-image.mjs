import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo-source.png');

if (!fs.existsSync(logoPath)) {
  console.error('build-og-image: logo-source.png não encontrado em public/');
  process.exit(1);
}

const logoBase64 = fs.readFileSync(logoPath).toString('base64');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="dles.com.br">
  <rect width="1200" height="630" fill="#f5f4f0"/>
  <image href="data:image/png;base64,${logoBase64}" x="500" y="88" width="200" height="200" preserveAspectRatio="xMidYMid meet"/>
  <text x="600" y="348" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="72" font-weight="700" fill="#141820" letter-spacing="-2">dles.com.br</text>
  <text x="600" y="418" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="36" fill="#5e6470">Jogos di&#225;rios em portugu&#234;s</text>
  <text x="600" y="472" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="26" fill="#5e6470">Sorteio do dia e lista completa</text>
</svg>`;

const pngPath = path.join(publicDir, 'og-image.png');
const svgPath = path.join(publicDir, 'og-image.svg');

await sharp(Buffer.from(svg)).png().toFile(pngPath);
fs.writeFileSync(svgPath, svg);

console.log('build-og-image: wrote', pngPath, `(${fs.statSync(pngPath).size} bytes)`);
