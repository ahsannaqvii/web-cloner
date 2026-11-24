// Recolors the white wordmark in Infeniti's logo PNG to ink (#191919), keeping the green mark.
import sharp from "sharp";
const [src, dst] = process.argv.slice(2);
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (a && Math.min(r, g, b) > 150 && Math.max(r, g, b) - Math.min(r, g, b) < 40) {
    data[i] = data[i + 1] = data[i + 2] = 0x19;
  }
}
await sharp(data, { raw: info }).png().toFile(dst);
console.log("wrote", dst, info.width, info.height);
