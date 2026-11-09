// Usage: node scripts/add-photos.mjs <sourceDir> <targetFolder> src=name ...
// Resizes (max 1600px, mozjpeg q76) and copies new photos into public/images/<targetFolder>.
import sharp from "sharp";
import fs from "node:fs";
sharp.cache(false);
const [src, folder, ...pairs] = process.argv.slice(2);
fs.mkdirSync(`public/images/${folder}`, { recursive: true });
for (const p of pairs) {
  const [from, to] = p.split("=");
  const buf = await sharp(fs.readFileSync(`${src}/${from}`)).rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true, progressive: true }).toBuffer();
  fs.writeFileSync(`public/images/${folder}/${to}.jpg`, buf);
  console.log(to, (buf.length / 1024).toFixed(0) + "KB");
}
