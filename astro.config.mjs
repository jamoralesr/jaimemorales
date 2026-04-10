// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import shikiTheme from './src/styles/shiki-theme.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: 'https://jaimemorales.cl',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
      wrap: false,
    },
  },
});
