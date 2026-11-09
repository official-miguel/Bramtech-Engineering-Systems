import sharp from "sharp";
import fs from "node:fs";
const out = {};
for (const d of fs.readdirSync("public/images")) {
  for (const f of fs.readdirSync(`public/images/${d}`)) {
    if (d === "logo") continue;
    const buf = await sharp(`public/images/${d}/${f}`).resize(12).jpeg({ quality: 50 }).toBuffer();
    const m = await sharp(`public/images/${d}/${f}`).metadata();
    out[`/images/${d}/${f}`] = { blur: `data:image/jpeg;base64,${buf.toString("base64")}`, w: m.width, h: m.height };
  }
}
fs.writeFileSync("src/content/image-meta.json", JSON.stringify(out));
console.log(Object.keys(out).length, "images");
