# Layout change: docs layout, one page per chapter, GitHub Pages

13 Oct 2026. The owner asked for a lecture bar on the left, the content in the middle and the page's sub-index on the right, instead of one very long page. This is a layout change only. Type, colours, figures, the notebook paper and the light/dark (Blackboard) themes are unchanged, and no lecture content was rewritten.

## What changed

**Pages.** Lecture 01 is now 7 pages under `/vedio-to-blog/lectures/lec01/`:

| page | built from |
|---|---|
| `/` (overview) | `lec01.mdx` header (kicker, H1, dek, meta), chapter list with one-line summaries (`#toc`), then its body: `s0-header.mdx` (About this class, Medium so far) |
| `1-caching/` | `s1-caching.mdx` |
| `2-scaling/` | `s2-scaling.mdx` |
| `3-delegation/` | `s3a-delegation.mdx` + `s3b-delegation.mdx` |
| `4-concurrency/` | `s4-concurrency.mdx` (the page adds the `#s4` anchor) |
| `5-communication/` | `s5-communication.mdx` |
| `6-what-to-keep/` | `s6-keep.mdx` |

The split is declared in `lec01.mdx` frontmatter under `chapters` (no, slug, parts, summary). The summaries are the chapter openers' own deks.

**Layout** (`DocsShell`, `CourseNav`, `OnThisPage`, `ChapterList`, `Pager`):
- From 1280px: three columns. On the left, the course nav lists Lecture 01 to 10. Lecture 01 opens to its chapters, with the current page marked by the old rail's blue rule. Lectures 02 to 10 say "coming soon" and are not links. On the right, "On this page" lists the sections with their numbers and opens the subheads of the section in view. Both rails are sticky and scroll on their own.
- 1024 to 1279px: the left nav stays. "On this page" becomes a sticky dropdown at the top of the content, labelled with the section in view.
- Below 1024px: the left nav becomes a drawer behind the bar's menu button (Esc, backdrop and Close all shut it). The dropdown stays.
- The bar breadcrumb follows the section in view, and the blue progress line shows how far you are down the page.
- Previous/next links sit at the bottom of every page. The overview's next link is "Start reading". The last chapter's next link reads "Next lecture: Lecture 02 · coming soon" and is not a link.
- Each chapter's own "Next chapter" link inside `SectionEnd` is dropped, because the pager replaces it. The "Contents of this lecture ↑" link now goes to the overview's chapter list.

**Links.** The MDX still uses plain `#s2-4` hrefs. The page template rewrites any id that lives on another chapter page to `…/2-scaling/#s2-4`, using a map of the `id="…"` attributes in each chapter's parts. This also covers the SVG links in Fig 6a.

**Base path.** `astro.config.mjs` now has `site: https://rmnjaat.github.io` and `base: /vedio-to-blog/`. All internal links, crumbs and clip posters go through `src/lib/url.ts`, which uses `import.meta.env.BASE_URL`. Fonts are loaded from Google Fonts, so they need no base. Dev and preview serve under `/vedio-to-blog/`.

**Deploy.** `.github/workflows/pages.yml` runs on a push to main and on workflow_dispatch, with permissions `pages: write` and `id-token: write`. It uses checkout@v4, then setup-node@v4 with Node 22 (Astro 7 needs at least 22.12), then `npm ci`, `npm run build` and `npm run links` in `site/`, then upload-pages-artifact@v3 (`site/dist`) and deploy-pages@v4. One manual step is needed: Settings → Pages → Source: GitHub Actions. The lockfile matches `package.json` and includes the linux-x64 native packages. The build reads nothing outside `site/` and needs no gitignored files.

**Scripts.** `coverage.mjs` now reads every page under `dist/lectures/<id>/` together. The new `scripts/check-links.mjs` (`npm run links`) checks every href, src, srcset and island URL, and every #fragment, against the built files under the base.

## Checks (all run while holding the heavy lock)

- `npm run build`: 10 pages, no warnings.
- `npm run links`: 462 internal links and assets checked, **0 broken**.
- Coverage: **392/400** ids placed. The 8 missing ids are all admin items, missing on purpose (364/364 with `--ignore-type admin_reference`). Ids per page: overview 8, ch1 93, ch2 77, ch3 112, ch4 18, ch5 77, ch6 24.
- Clean copy: the tracked and new files of `site/` were copied to a temp dir, then `npm ci` and the build were run there on Node 22.23. The build passed and links showed 0 broken.
- Dev server: `/vedio-to-blog/`, the overview, the chapter pages, the demo and a clip poster all return 200.
- Playwright on dist served by a plain static server under `/vedio-to-blog/` (the GitHub Pages shape), at 1440, 1024 and 390, light and dark. Script: `qa/tools/layout_qa.mjs` and `run_layout_qa.sh`. Report: `layout_qa_report.txt`. **74 ok, 0 failures:**
  - At each width, the right parts are visible: the nav, the rail, the dropdown and the menu button.
  - The nav has 10 lectures, 9 marked "coming soon" with no links, and 6 chapters, and it marks the current page.
  - Scrollspy marks the right entry at the middle and the end of every page. The dropdown label and the crumb follow it.
  - Every step-through steps through to its last step.
  - A clip plays on chapters 2 to 5 (0:02 after 2.5s).
  - Previous and next links work, and the last chapter points to Lecture 02 "coming soon".
  - A cross-chapter link (§6 to §2.4) lands on the right page with §2.4 at the top.
  - The dropdown jumps and closes, and the drawer opens, closes on Esc and navigates.
  - No console errors, no failed requests, and no horizontal scroll at 360, 390, 1024 or 1440.
- `check-figures` passes on all 7 lecture pages at 360, 390, 768 and 1440 in both themes: every label is at least 12px and there is no horizontal scroll.
- Screenshots are in `qa/layout_shots/`. Fixes made after reviewing them:
  - "On this page" subheads now line up with the section titles.
  - The pager's "Next chapter" was colliding with the global `.next` style and is now right-aligned.
  - The drawer title no longer repeats "Lectures".

## Preview locally

```
cd "/Users/ramanjangu/Desktop/VEDIO TO BLOG/site" && npm run build && npx astro preview --port 4330
# open http://localhost:4330/vedio-to-blog/
```

Port 4321 is currently taken by an unrelated `python -m http.server`, so the command above uses 4330.
