import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const png = fs.readFileSync(path.join(publicDir, 'logo-source.png'));
const base64 = png.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" role="img" aria-label="dles"><image width="512" height="512" xlink:href="data:image/png;base64,${base64}"/></svg>`;

for (const name of ['logo-mark.svg', 'favicon.svg']) {
  fs.writeFileSync(path.join(publicDir, name), svg);
}

console.log('embedded', png.length, 'bytes into svg');
