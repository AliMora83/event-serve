import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eventsserve.co.za',
  build: { inlineStylesheets: 'auto' },

  integrations: [
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
