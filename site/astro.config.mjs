// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  // GitHub Pages project site: https://rmnjaat.github.io/vedio-to-blog/
  // Every internal link goes through src/lib/url.ts (import.meta.env.BASE_URL), so the base can change in one place.
  // Dev and preview serve under the same base: http://localhost:4321/vedio-to-blog/
  site: 'https://rmnjaat.github.io',
  base: '/vedio-to-blog/',
  trailingSlash: 'ignore',
  // the pipeline builds one lecture at a time into its own folder (VTB_OUT=.builds/<id>), so parallel lectures never share dist/
  outDir: process.env.VTB_OUT || './dist',
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
