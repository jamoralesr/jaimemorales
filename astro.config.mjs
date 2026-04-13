// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import shikiTheme from './src/styles/shiki-theme.json' with { type: 'json' };

/** rehype plugin: add loading="lazy" + decoding="async" to all <img> in prose. */
function rehypeLazyImages() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = node.properties || {};
        if (node.properties.loading == null) node.properties.loading = 'lazy';
        if (node.properties.decoding == null) node.properties.decoding = 'async';
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://jaimemorales.cl',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
      wrap: false,
    },
    rehypePlugins: [rehypeLazyImages],
  },
});
