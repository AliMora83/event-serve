import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eventserve.co.za',
  build: { inlineStylesheets: 'auto' },
  image: {
    // Sharp handles responsive sizing + AVIF/WebP for the photo-heavy sections.
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
