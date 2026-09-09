import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * PLACEHOLDER GUARD — fail-closed, same shape as the Web3Forms key check in
 * ContactForm.astro, and there for the same reason: this project has twice
 * shipped something that looked finished and was not.
 *
 * Scans the RENDERED OUTPUT rather than the source, because that is what
 * actually reaches a visitor. Unfinished copy carries the literal token
 * PLACEHOLDER; if any survives into dist/ on a production build, the build
 * fails and Netlify publishes nothing.
 *
 * WHY THIS TOKEN. The repo previously marked unfinished work with TODO, which
 * had spread into shipped markup, image alt text and documentation prose
 * alike — so it matched commentary about the convention as often as real
 * unfinished copy, and a guard keyed on it would have fired on its own
 * documentation. That convention has been fully retired: `grep -rn TODO src/`
 * returns nothing, and should keep returning nothing.
 *
 * PLACEHOLDER is reserved for this guard and means exactly one thing, so
 * `grep -rn PLACEHOLDER src/` is a reliable inventory of what is still
 * unwritten. Do not reintroduce a second marker alongside it.
 *
 * Gated on CONTEXT=production alone — no CI clause. Unlike the form key,
 * a false negative here costs nothing: previews and local builds are meant
 * to render placeholder copy, since being able to SEE it is the point.
 */
function placeholderGuard() {
  const TOKEN = 'PLACEHOLDER';

  const htmlFilesIn = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFilesIn(path);
      return entry.name.endsWith('.html') ? [path] : [];
    });

  return {
    name: 'placeholder-guard',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const offenders = htmlFilesIn(root)
          .map((file) => ({
            file: file.slice(root.length),
            hits: (readFileSync(file, 'utf8').match(new RegExp(TOKEN, 'g')) ?? [])
              .length,
          }))
          .filter((r) => r.hits > 0);

        if (offenders.length === 0) {
          logger.info(`No ${TOKEN} copy in the build output.`);
          return;
        }

        const summary = offenders
          .map((o) => `    ${o.file} (${o.hits})`)
          .join('\n');

        if (process.env.CONTEXT === 'production') {
          throw new Error(
            `${TOKEN} copy reached the production build output.\n\n` +
            `${summary}\n\n` +
            'This is unfinished copy and must not ship. Replace it, or drop ' +
            'the page from the build. Run `grep -rn ' + TOKEN + ' src/` to ' +
            'find the source of each string.'
          );
        }

        logger.warn(
          `${TOKEN} copy is present in this build — expected for a preview ` +
          `or local build; a production build will FAIL on it:\n${summary}`
        );
      },
    },
  };
}

export default defineConfig({
  site: 'https://eventsserve.co.za',
  build: { inlineStylesheets: 'auto' },

  integrations: [
    placeholderGuard(),
    sitemap({
      // The 404 page is a real route in the build output but must never be
      // offered to a crawler as content. /construction is the holding page:
      // noindex and unlinked, so listing it in the sitemap would be an
      // invitation to index a page that asks not to be indexed.
      filter: (page) =>
        !page.endsWith('/404') && !page.includes('/construction'),
    }),
  ],

  image: {
    // Sharp handles responsive sizing + AVIF/WebP for the photo-heavy sections.
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
