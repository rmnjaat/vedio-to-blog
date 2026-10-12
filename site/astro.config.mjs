// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://example.invalid', // set the real origin before publishing
  trailingSlash: 'ignore',
  integrations: [mdx(), react()],
  // code uses the sample's three colours through CSS variables (see notebook.css, "code")
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      transformers: [{
        name: 'notebook-code',
        span(node) {
          const text = node.children?.map((c) => ('value' in c ? c.value : '')).join('') ?? '';
          const style = String(node.properties?.style ?? '');
          // only words are keywords (const, new, await): operators stay ink, as in the sample
          if (style.includes('token-keyword') && !/^[a-z]+$/i.test(text.trim())) node.properties.style = style.replace('token-keyword', 'foreground');
          if (style.includes('token-comment')) node.properties.class = 'c';
        },
      }],
    },
  },
  devToolbar: { enabled: false },
  vite: { build: { chunkSizeWarningLimit: 900 } },
});
