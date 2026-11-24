// Build step for production: node scripts/build.mjs
//
// 1. Optimises everything in assets/ (resized, converted to WebP) when `sharp` is installed.
// 2. Rewrites index.html so each <img data-local="assets/name"> points straight at the file
//    that really exists (matched case-insensitively, any extension). The browser then makes
//    ONE request per image instead of probing extensions and getting 404s.
//    Images without a local file point straight at their stock photo.
// 3. Preloads the hero image.
//
// Output goes to _site/. The source files are never modified.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const OUT = '_site';
const MAX_WIDTH = 1200;
const IMG_EXT = /\.(webp|jpe?g|jfif|png|avif)$/i;
const key = (s) => s.toLowerCase().replace(/\s+/g, '-');

let sharp = null;
try { sharp = (await import('sharp')).default; } catch { console.log('sharp not installed: images are copied as they are.'); }

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(path.join(OUT, 'assets'), { recursive: true });
await fs.cp('css', path.join(OUT, 'css'), { recursive: true });
await fs.cp('js', path.join(OUT, 'js'), { recursive: true });

// ---- 1. assets -> { lowercase-base-name: "assets/file.ext" } ----
const found = {};
let before = 0, after = 0;
const files = await fs.readdir('assets').catch(() => []);
for (const file of files) {
  if (!IMG_EXT.test(file)) continue;
  const base = key(file.replace(/\.[^.]+$/, ''));
  const src = path.join('assets', file);
  before += (await fs.stat(src)).size;
  let outName;
  if (sharp) {
    outName = `${base}.webp`;
    await sharp(src).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, 'assets', outName));
  } else {
    outName = `${base}${path.extname(file).toLowerCase()}`;
    await fs.copyFile(src, path.join(OUT, 'assets', outName));
  }
  after += (await fs.stat(path.join(OUT, 'assets', outName))).size;
  found[base] = `assets/${outName}`;
}
console.log(`Images: ${files.filter((f) => IMG_EXT.test(f)).length} processed, ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);

// ---- 2. rewrite index.html ----
let html = await fs.readFile('index.html', 'utf8');
let heroSrc = null;
html = html.replace(/<img\b[^>]*>/g, (tag) => {
  const local = tag.match(/data-local="([^"]+)"/);
  if (!local) return tag;
  const base = key(decodeURIComponent(local[1]).replace(/^assets\//, ''));
  const hit = found[base];
  if (hit) {
    if (/hero__img/.test(tag)) heroSrc = hit;
    return tag.replace(/data-local="[^"]*"/, `src="${hit}"`).replace(/\s*data-fallback(-srcset)?="[^"]*"/g, '');
  }
  // no local file: go straight to the stock photo
  const fb = tag.match(/data-fallback="([^"]+)"/)?.[1];
  const fbSet = tag.match(/data-fallback-srcset="([^"]+)"/)?.[1];
  if (!fb) return tag;
  return tag
    .replace(/data-local="[^"]*"/, `src="${fb}"${fbSet ? ` srcset="${fbSet}"` : ''}`)
    .replace(/\s*data-fallback(-srcset)?="[^"]*"/g, '');
});

// ---- 3. preload the hero image ----
if (heroSrc) {
  html = html.replace('</head>', `  <link rel="preload" as="image" href="${heroSrc}" fetchpriority="high">\n</head>`);
}
await fs.writeFile(path.join(OUT, 'index.html'), html);
console.log('Built _site/');
