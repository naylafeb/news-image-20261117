import { copyFileSync, existsSync, readFileSync } from "node:fs";

// The entry is a single image: a newspaper front page summing up
// Tuesday 17 November 2026 in eight stories — U.S. strikes on Iran
// after the Hormuz tanker attacks, the Crimean Bridge hit, the
// Trump-Xi-Putin summit, Huang's "I would return", the U.S. losing
// measles-free status, UK sanctions, Japan scrambling jets, and Wall
// Street sliding. Copy it byte-for-byte to the output dir.
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
if (!existsSync(src)) {
  throw new Error("entry.png is missing from the entry directory");
}
const buf = readFileSync(src);
const isPng =
  buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
const isJpg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
if (!isPng && !isJpg) throw new Error("entry.png is not a PNG or JPEG");
copyFileSync(src, `${out}/entry.png`);
