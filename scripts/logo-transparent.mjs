// Turns the logo's light background transparent (colour-to-alpha), so it blends with any light surface.
// Reads bramtech-logo-original.png and writes bramtech-logo-clear.png (the file the site uses).
import sharp from "sharp";
import fs from "node:fs";
sharp.cache(false);
const dir = "public/images/logo";
const orig = `${dir}/bramtech-logo-original.png`;
const { data, info } = await sharp(fs.readFileSync(orig)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const bg = [data[0], data[1], data[2]]; // top-left pixel is background
for (let i = 0; i < data.length; i += 4) {
  let a = 0;
  for (let c = 0; c < 3; c++) a = Math.max(a, (bg[c] - data[i + c]) / bg[c]);
  if (a < 0.08) { data[i + 3] = 0; continue; }
  a = Math.min(1, a);
  for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round(bg[c] + (data[i + c] - bg[c]) / a)));
  data[i + 3] = Math.round(a * 255);
}
await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(`${dir}/bramtech-logo-clear.png`);
console.log("bg", bg, "done");
