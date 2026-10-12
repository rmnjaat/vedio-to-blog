# Lecture 1: design fixes (response to critic.md)

Scope: components, layout, styles, the figure kit, and the lec01 figures.
- Before shots are in `qa/critic_shots/…`.
- After shots are in `qa/fixes_design_shots/after/…`. Figure shots put the desk layout on the left and the phone layout on the right; `-dark` files are the dark theme. `nav-*` files come from the built page.

## Verification

The final build passes, run under the lock.
- **Navigation check** (`nav-*`, at 1440 and 390, light and dark): the rail, breadcrumb and progress were checked in §1.3, §2.4, §3.6, §4.3, §5.3 and §6. The contents sheet opens, a link inside it navigates and closes it, and the chapter-end link opens it. Three step-throughs were walked on phone, the wrong pick in Pause and think was tried, and the clip poster was checked with JS on and off.
  - No console errors.
  - No horizontal scroll at either width.
- **check-figures:** passes at 360, 390, 768 and 1440 in light and dark, with every label at least 12px.
- **Full QA sweep** (`qa/tools/qa.mjs`: 35 sections, 6 step-throughs, 9 pause-and-think cards, 4 clips, light and dark): no errors. The only console message is Remotion's licence notice.
- **§2.4 compared with the sample:** see `s2-4-vs-sample-site.png` and `s2-4-vs-sample-sample.png`. The panel figure, the step-through, the type and the rhythm match. The one intended difference is the replica pull.

## Issues and changes

| # | Issue | Change | Before → after |
|---|---|---|---|
| 1 | The rail was empty and there was no navigation below 1420px | **Layout.astro** builds the outline from the lecture contents (`#toc`). This works whether a section is an `h2` article or an `h3`.<br>- **Rail (≥1420px):** shows `§n Chapter`, then every §n.m. The current one is bold and opens to its subheads, with scrollspy (blue bar). The rail scrolls if it is long. A one-section page (`/demo`) keeps the sample's "§2.4 on this page".<br>- **Top bar, every width:** `≡ §x.y · n%` is now a button. It opens a contents sheet with "you are here" and the share of the section and of the whole lecture read: a left drawer on desktop, a bottom sheet on phones. Without JS it links to `#toc`.<br>- **SectionEnd:** adds a "Contents of this lecture ↑" link at each chapter end, which opens the sheet. | `desk-light/page/010.png` → `nav-1440-light-nav-s2-4.png`, `nav-1440-light-nav-s5-3.png`, `nav-1440-light-sheet.png`, `nav-390-light-sheet.png`, `nav-390-dark-sheet.png` |
| 19 | The breadcrumb dropped the chapter | The crumb reads "Lecture 01 / 2 Scaling / 2.4 The database" and follows the reader. On phones it reads "Lecture 01 / 2 Scaling", because the section number is already in the progress button next to it. | `nav-1440-light-nav-s2-4.png`, `nav-390-light-nav-s3-6.png` |
| 20 | Chapter 5's headings broke the pattern | The section agent turned §5.1–5.7 into `Section` articles. The rail handles both forms anyway. | `nav-1440-light-nav-s5-3.png` |
| 3 | Figure scale varied about 2.5× | **Kit `Fig`:** every figure is capped at its viewBox width, so 1 unit is at most 1 CSS px. fig-3k (2.6×) and fig-4c (1.5×) now show at 1:1.<br>- fig-2e and fig-1b lettering went from 12.5 to 14, and fig-4b's from 13/12.5 to 14.<br>- At 768px, the fig-2g and fig-4a labels went to 15, and fig-3g's message ids to 14.<br>- Figure lettering is now 14–17px on desktop.<br>- The clips' lettering inside the stage is still clip work (see below). | `desk-light/fig/fig-3k.png` → `fig-3k-final.png`; `fig-2e*.png`, `fig-1b*.png`, `fig-4b.png` |
| 6 | Phone step-throughs split the drawing from the text | At ≤860px the Prev/Next bar and the current step's text form a compact panel stuck to the bottom of the screen while the figure is in view. Stepping scrolls just enough to keep the changed arrow between the top bar and the step bar. | `phone-light/step/fig-1b-s*.png` → `nav-390-light-fig-1b-s1.png`, `-s3.png`, `nav-390-dark-fig-3d-s2.png`, `nav-390-light-fig-4b-s2.png` |
| 7 | Clip posters only appeared after hydration | **ClipPlayer** renders static `<picture>` posters for both themes, and CSS picks the one for the current theme. They are in the HTML before hydration and without JS. A Play pill is shown only when JS runs.<br>- New `scripts/clip-posters.mjs` captures `public/clips/<id>/poster-{paper,blackboard}[-phone].png` from a served build. The current four clips are captured.<br>- **Re-run it after any clip change**, then rebuild. | `desk-light/page/032.png` → `nav-nojs-clip.png`, `nav-1440-dark-clip.png` |
| 2 (plumbing) | Clips were illegible on phone | `ClipMeta.phone?: {width,height}` was added to `registry.ts`. When it is set, at ≤640px the player passes `layout: 'phone'` to the composition, uses that canvas and aspect ratio, and shows `poster-*-phone.png`. The portrait compositions themselves are clip work. | — |
| 9 | fig-2b: the "then horizontally" pointer was wrong | Past the knee, horizontal growth is a rising staircase labelled "then horizontally". The vertical curve continues as a dashed line that flattens at a red "hardware ceiling". | `desk-light/fig/fig-2b.png` → `after/fig-2b*.png` |
| 10 | fig-3g was sloppy | Three real lanes sit inside the pipe, with message boxes centred in them. There is one chain, `key = user_id → hash → p1`, and the topic is spelled `ON_PUBLISH` everywhere. | `fig-3g.png` → `after/fig-3g*.png` |
| 11 | fig-2g was cluttered | Five separate pull ports sit on the master's base. One second-tier fan is drawn in full and the others are marked "×3". The figure carries "5 × 3 = 15 on the second layer". | `fig-2g.png` → `after/fig-2g*.png` |
| 12 | fig-1g had crossing routes | Routes are orthogonal and none cross. control plane → cdn runs above s3. "snapshot" sits beside its arrow. "background fetch" sits clear of the disk label. | `fig-1g.png` → `fig-1g-final.png` |
| 13 | Consumer pulls were inconsistent | One convention everywhere: a dashed ask from the consumer to the queue or stream (head at the source), and a solid blue arrow bringing the messages back. Applied in fig-3d (step 2: "c2 asks first"), 3f, 3h, 3i, 3k and 6a. Replica pulls are unchanged. | `fig-3d/3f/3h/3i/6a.png` → `after/…` |
| 8 | fig-1a repeated "Medium so far" | fig-1a's left panel is now "served from redis, one network hop", next to the local-memory panel. "Medium so far" is unnumbered in the MDX, and 5·e/5·f were renumbered (section agent). | `fig-1a.png` → `after/fig-1a*.png` |
| 16 | Too many speech bubbles | The bubbles in fig-1d and fig-3e are now plain hand annotations. fig-2e keeps the section's one bubble. | `after/fig-1d*`, `fig-3e*` |
| 17 | Glyphs drifted from the key | fig-2a uses machine bars, not cylinders, for RAM sizes. fig-5a–5f use the key's `api` box, and the client is the browser glyph. fig-4a's zig-zag is now a `one machine` box with t1/t2. fig-3a's card is drawn as the client glyph. | `after/fig-2a*`, `fig-5*`, `fig-4a-final.png`, `fig-3a*` |
| 5 | Pause-and-think verdicts were templated | The component defaults are now "Right." and "Not quite. Here’s why:", and the section agent wrote a verdict for each card. After a wrong pick, the right option gets a green ✓, and screen readers hear "The right answer is …". | `desk-light/fig/think0-after.png` → `nav-1440-light-think-wrong.png`, `nav-390-dark-think-wrong.png` |
| 21 | Chips and key hints were under 12px | The chips are now 14px (.875rem). The key hint is 13px and uses `--ink-2`. | `nav-1440-dark-clip.png` |
| 15 | "More precisely" boxes | The component stays as it is: a blue rule, not a grey box. How often it appears is the section agent's call. | — |

## Left for other agents

- **Clips** (`src/animations/clips/`): see #2, #3, #4, #18 and #22.
  - Author the lettering so it lands at 15–18px on the 920px desktop stage. It is about 30px now, see `nav-1440-dark-clip.png`.
  - Add the portrait compositions: set `META.phone` and handle the `layout` prop.
  - Fix clip 4·1 so every part tells the 100 → 102 story.
  - Fix the "db / unchanged" and pale "5× queries" labels.
  - Check that chip seeks land on settled frames.
  - Then run `node scripts/clip-posters.mjs <served url>` under the lock and rebuild.
- **Section MDX:**
  - fig-1a needs this caption: "Two kinds of cache. Left: a read answered by the shared Redis still crosses the network, one hop. Right: the same read answered from the API server’s own memory (the dot) never calls Redis or the database. For Medium, the dot can hold published stories. Redrawn from the class board at 00:30 and 00:32."
  - fig-3d caption: "Dashed is a consumer asking the queue (a pull), blue is the message it gets back, green is the consumer's delete, red is the crash and the visibility timeout."
  - Optional: reword the 3f, 3h, 3i and 6a captions as consumer pulls, and the 2a caption as "the database's machine (RAM)".
