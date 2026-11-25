import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './site.config.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/admin/'), i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } } })
  ]
});
