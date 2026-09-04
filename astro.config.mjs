import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eventserve.co.za',
  build: { inlineStylesheets: 'auto' },

  integrations: [
    sitemap({
      // The 404 page is a real route in the build output but must never be
      // offered to a crawler as content.
      filter: (page) => !page.endsWith('/404'),
    }),
  ],

  image: {
    // Sharp handles responsive sizing + AVIF/WebP for the photo-heavy sections.
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
