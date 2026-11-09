// One-time: resize and compress the photos in public/images (max 1600px long edge, mozjpeg q76).
// Originals stay in /images. Re-copy from there before re-running, to avoid compressing twice.
import sharp from "sharp";
import fs from "node:fs";
sharp.cache(false);
let before = 0, after = 0;
for (const d of fs.readdirSync("public/images")) {
  if (d === "logo") continue;
  for (const f of fs.readdirSync(`public/images/${d}`)) {
    const p = `public/images/${d}/${f}`;
    const buf = await sharp(fs.readFileSync(p)).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 76, mozjpeg: true, progressive: true }).toBuffer();
    before += fs.statSync(p).size; after += buf.length;
    fs.writeFileSync(p, buf);
  }
}
console.log((before/1e6).toFixed(1)+"MB ->", (after/1e6).toFixed(1)+"MB");
