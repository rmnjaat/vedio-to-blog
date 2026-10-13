// Base-aware internal URLs. The site is served under a base path (GitHub Pages project site: /vedio-to-blog/),
// so every internal link and asset path goes through `url()`. External URLs and pure #hashes pass through.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/'); // always ends with '/'

export function url(path = ''): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) return path;
  return BASE + path.replace(/^\/+/, '');
}
export const base = BASE;
