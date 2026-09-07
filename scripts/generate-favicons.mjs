/**
 * Static image derivative generator — RUN BY HAND, NOT BY THE BUILD.
 *
 *   node scripts/generate-favicons.mjs
 *
 * WHY THIS IS MANUAL
 * ------------------
 * Favicons and OG images have to be plain static URLs in `public/`, and
 * `public/` bypasses `astro:assets` entirely — Astro copies those files
 * verbatim and never optimises or resizes them. So the responsive-image
 * pipeline that handles everything in `src/assets/` cannot help here. The
 * alternative was an integration hook regenerating three files that change
 * roughly never. This is cheaper and more honest: run it when a source mark
 * changes, commit the output, move on.
 *
 * `sharp` is already present as an Astro dependency. Nothing is installed for
 * this script — check before adding an import.
 *
 * SOURCES — all in src/assets/brand/, none in public/
 * --------------------------------------------------
 * Events-favicon.png  1323x1182 RGBA  the "ES" monogram
 * Events-white.png    1323x1071 RGBA  the full wordmark, white type
 *
 * The monogram is NOT square (ratio 1.119) and its artwork fills the canvas to
 * within ~20px, so there is no margin to crop against. Every square derivative
 * therefore PADS to square first and then downscales. Cropping would cut into
 * the monogram itself.
 *
 * OUTPUTS — all to public/
 * ------------------------
 * favicon-32.png        32x32   PNG, alpha preserved   browser tab
 * apple-touch-icon.png  180x180 PNG, alpha FLATTENED   iOS home screen
 * og-default.jpg        1200x630 JPG, opaque           link previews
 *
 * iOS does not honour transparency on touch icons — it renders transparent
 * pixels black — so that one is flattened onto the brand red.
 *
 * The OG image is 1200x630 and opaque, and both are hard requirements rather
 * than preferences: Slack, WhatsApp and X render a transparent or
 * wrongly-proportioned OG image as blank or black.
 */

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = (f) => path.join(root, 'src', 'assets', 'brand', f);
const out = (f) => path.join(root, 'public', f);

const MONOGRAM = brand('Events-favicon.png');
const WORDMARK = brand('Events-white.png');

/**
 * --c-crimson in src/styles/tokens.css. This is the crimson in the client's
 * own logo artwork, so flattening onto it is seamless — the previous value
 * (#AA2A3B) was a different red and left a visible two-tone band around the
 * mark. Keep this in step with tokens.css.
 */
const BRAND_RED = '#931E2E';

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** OG canvas, fixed by what the social scrapers expect. */
const OG_W = 1200;
const OG_H = 630;
/** Wordmark width as a share of the OG canvas. */
const OG_LOGO_SCALE = 0.45;

/**
 * Pad an image to a centred square on a transparent canvas, at full
 * resolution. Returns an encoded BUFFER, not a chainable sharp instance, and
 * that is deliberate.
 *
 * sharp applies its pipeline in a fixed order — resize runs BEFORE extend no
 * matter which you call first — so chaining `.extend().resize()` downscales
 * and only then pads, producing a 32x173 strip instead of a 32x32 square.
 * Materialising the padded square first forces the order we actually want:
 * pad at 1323, then resample down.
 */
async function squareBuffer(src) {
  const { width, height } = await sharp(src).metadata();
  const side = Math.max(width, height);
  const x = Math.round((side - width) / 2);
  const y = Math.round((side - height) / 2);

  return sharp(src)
    .extend({
      top: y,
      bottom: side - height - y,
      left: x,
      right: side - width - x,
      background: TRANSPARENT,
    })
    .png()
    .toBuffer();
}

function report(label, info) {
  console.log(
    `wrote   public/${label.padEnd(21)} ${info.width}x${info.height}  ` +
      `${info.channels === 4 ? 'RGBA' : 'RGB '}  ${(info.size / 1024).toFixed(1)}KB`
  );
}

/* --- Favicons -------------------------------------------------------------- */

const mono = await sharp(MONOGRAM).metadata();
console.log(`source  Events-favicon.png  ${mono.width}x${mono.height}`);
console.log(`padded  ${Math.max(mono.width, mono.height)}px square (centred, transparent)\n`);

const padded = await squareBuffer(MONOGRAM);

report(
  'favicon-32.png',
  // Alpha kept: the tab sits on whatever chrome the browser and OS theme use.
  await sharp(padded).resize(32, 32, { fit: 'fill' }).png().toFile(out('favicon-32.png'))
);

report(
  'apple-touch-icon.png',
  await sharp(padded)
    .flatten({ background: BRAND_RED })
    .resize(180, 180, { fit: 'fill' })
    .png()
    .toFile(out('apple-touch-icon.png'))
);

/* --- OG image -------------------------------------------------------------- */

const word = await sharp(WORDMARK).metadata();
const logoW = Math.round(OG_W * OG_LOGO_SCALE);
const logoH = Math.round((logoW * word.height) / word.width);

// Whole logo must be visible. It is centred, so the binding check is that it
// fits inside the canvas on both axes with room to breathe.
if (logoH > OG_H) {
  throw new Error(
    `Wordmark at ${OG_LOGO_SCALE * 100}% width is ${logoW}x${logoH}, taller than the ` +
      `${OG_W}x${OG_H} canvas. Lower OG_LOGO_SCALE.`
  );
}

console.log(`\nsource  Events-white.png     ${word.width}x${word.height}`);
console.log(`logo    ${logoW}x${logoH} (${OG_LOGO_SCALE * 100}% of ${OG_W}px width), centred`);

const logo = await sharp(WORDMARK).resize(logoW, logoH, { fit: 'fill' }).png().toBuffer();

report(
  'og-default.jpg',
  await sharp({
    create: { width: OG_W, height: OG_H, channels: 3, background: BRAND_RED },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    // Opaque by construction: a 3-channel base, and JPEG has no alpha anyway.
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile(out('og-default.jpg'))
);
