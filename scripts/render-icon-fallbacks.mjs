/**
 * Static rest-frame fallbacks for the service icons — RUN BY HAND, NOT BY THE BUILD.
 *
 *   node scripts/render-icon-fallbacks.mjs
 *
 * Run it whenever a JSON in src/assets/icons/ is added or replaced. The build
 * tells you when: ServiceGrid throws if an icon has no .svg, or if its .svg
 * was rendered from a different JSON than the one beside it, or by an older
 * version of this script. If you change what this script writes, bump
 * RENDERER_VERSION in ./icon-fallback-version.mjs before rerunning it.
 *
 * WHY THE FALLBACKS EXIST
 * -----------------------
 * The icons are Lottie animations, played on hover by lottie-web. The player
 * is never loaded under prefers-reduced-motion or on devices without hover,
 * and it can fail to load. In every one of those cases the icon still has to
 * show its rest pose, so ServiceGrid inlines a static SVG of it and the player
 * replaces that once it is ready.
 *
 * The rest pose is the LAST frame (totalFrames - 1), the old site's rule. For
 * every icon the first and last frames were checked visually and show the
 * same pose; the last is where a hover ends, so leaving after one never jumps.
 *
 * HOW
 * ---
 * lottie-web needs a DOM, so this renders in the system Chrome, headless, and
 * reads the SVG back out of the page. Nothing is installed for this script.
 * Set CHROME_PATH if Chrome is not at the macOS default.
 */
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { RENDERER_VERSION } from './icon-fallback-version.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const iconDir = join(root, 'src/assets/icons');
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const sources = Object.fromEntries(
  readdirSync(iconDir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => [file.slice(0, -'.json'.length), readFileSync(join(iconDir, file), 'utf8')])
);
const player = readFileSync(join(root, 'node_modules/lottie-web/build/player/lottie_light.min.js'), 'utf8');

/* Escaped so a "<" in the data cannot close the <script> it sits in. */
const embed = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const page = `<!doctype html><html><body>
<script>${player}</script>
<script>
  const sources = ${embed(sources)};
  const out = {};
  let pending = Object.keys(sources).length;
  for (const [key, json] of Object.entries(sources)) {
    const box = document.createElement('div');
    document.body.appendChild(box);
    const anim = lottie.loadAnimation({
      container: box, renderer: 'svg', loop: false, autoplay: false, animationData: JSON.parse(json),
    });
    const capture = () => {
      const frame = anim.totalFrames - 1;
      anim.goToAndStop(frame, true);
      out[key] = { frame, svg: box.innerHTML };
      if (--pending) return;
      const result = document.createElement('script');
      result.type = 'application/json';
      result.id = 'result';
      result.textContent = JSON.stringify(out).replace(/</g, '\\\\u003c');
      document.body.appendChild(result);
    };
    anim.isLoaded ? capture() : anim.addEventListener('DOMLoaded', capture);
  }
</script>
</body></html>`;

const work = mkdtempSync(join(tmpdir(), 'icon-fallbacks-'));
let dom;
try {
  const html = join(work, 'render.html');
  writeFileSync(html, page);

  /* Headless Chrome can print the DOM and then fail to exit, so it is killed
     as soon as the document is complete, with a ceiling in case it never
     prints at all. */
  dom = await new Promise((resolve, reject) => {
    const proc = spawn(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      `--user-data-dir=${join(work, 'profile')}`,
      '--virtual-time-budget=5000',
      '--dump-dom',
      pathToFileURL(html).href,
    ]);
    let stdout = '';
    let ceiling;
    const finish = (settle, value) => {
      clearTimeout(ceiling);
      proc.kill('SIGKILL');
      settle(value);
    };
    ceiling = setTimeout(() => finish(reject, new Error('Chrome printed no DOM within 60s')), 60_000);
    proc.stdout.on('data', (chunk) => {
      stdout += chunk;
      if (stdout.includes('</html>')) finish(resolve, stdout);
    });
    proc.on('error', (error) =>
      finish(reject, new Error(`Could not start Chrome at "${chrome}" — set CHROME_PATH. ${error.message}`))
    );
    proc.on('exit', () =>
      stdout.includes('</html>')
        ? finish(resolve, stdout)
        : finish(reject, new Error('Chrome exited without printing the DOM'))
    );
  });
} finally {
  /* Chrome is SIGKILLed, and its helper processes can still be writing to the
     profile while this walks it, which fails with ENOTEMPTY. Retrying gives
     them time to die. */
  rmSync(work, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}

const match = dom.match(/<script[^>]*id="result"[^>]*>([\s\S]*?)<\/script>/);
if (!match) throw new Error('The render page produced no result — an icon JSON may have failed to load');
const results = JSON.parse(match[1]);

for (const [key, { frame, svg }] of Object.entries(results)) {
  const hash = createHash('sha256').update(sources[key]).digest('hex');
  const viewBox = svg.match(/^<svg[^>]*viewBox="([^"]+)"/)[1];
  const xlink = svg.includes('xlink:') ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : '';
  /* The player numbers ids with one counter across the whole page, so the raw
     numbers depend on every icon rendered before this one: replacing one JSON
     would renumber every SVG after it alphabetically. Each icon is renumbered
     from 1 in order of first appearance, so its SVG depends on its own JSON
     alone, and the key prefix keeps eight inlined icons from colliding. A
     suffix the player appends for mattes (_1, _2) follows its base number. */
  const ids = new Map();
  const cleaned = svg
    // The player sizes its root to fill the container; ServiceGrid's CSS sizes it now.
    .replace(/^<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg"${xlink} viewBox="${viewBox}">`)
    .replace(/__lottie_element_(\d+)/g, (_, n) => {
      if (!ids.has(n)) ids.set(n, ids.size + 1);
      return `icon-${key}-${ids.get(n)}`;
    });
  writeFileSync(
    join(iconDir, `${key}.svg`),
    `<!-- Generated by scripts/render-icon-fallbacks.mjs from ${key}.json, frame ${frame}. ` +
      `Do not edit. renderer-version:${RENDERER_VERSION} source-sha256:${hash} -->\n${cleaned}\n`
  );
  console.log(`${key}.svg  frame ${frame}  ${cleaned.length} bytes`);
}
