// Sinh thumbnail WebP 720px (thẻ danh sách) và cover WebP 1280px (bài tiêu điểm) cho trang chủ.
// Chạy: node scripts/make-thumbs.mjs  (chạy lại mỗi khi thêm ảnh bài mới vào public/images/posts)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "public", "images", "posts");
const OUT = path.join(process.cwd(), "public", "images", "thumbs");
const COVER = path.join(process.cwd(), "public", "images", "covers");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(COVER, { recursive: true });

let total = 0;
for (const file of fs.readdirSync(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const dest = path.join(OUT, `${name}.webp`);
  const info = await sharp(path.join(SRC, file))
    .resize({ width: 720, height: 405, fit: "cover", position: "centre" })
    .webp({ quality: 78 })
    .toFile(dest);
  total += info.size;
  const cover = await sharp(path.join(SRC, file))
    .resize({ width: 1280, height: 720, fit: "cover", position: "centre" })
    .webp({ quality: 80 })
    .toFile(path.join(COVER, `${name}.webp`));
  total += cover.size;
  console.log(`${name}  thumb ${(info.size / 1024).toFixed(0)} KB  cover ${(cover.size / 1024).toFixed(0)} KB`);
}
console.log(`Total thumbs: ${(total / 1024).toFixed(0)} KB`);
