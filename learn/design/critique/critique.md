# Round 1 critique: why A, B and C still read as generated

Screenshots are in `shots/`. `{A,B,C}-d-{light,dark}-0..7.png` are 1440×900 at 8 evenly spaced scroll positions. `{A,B,C}-m-{light,dark}-0..4.png` are 390×844 @2x at 5 positions. `*-x-*.png` are targeted crops (C opener, B lag figure, B/C clip posters, A table and B clip at phone width). Line numbers refer to each sample's `index.html`.

---

## 0. The tell that applies to all three before any styling

Put the three pages next to each other and they have the **same skeleton in the same order**:

lecture header → meta row (reading time, reviewed date) → full TOC with "you are here" → § opener → boxed "rule" → three-panel triptych → code block → step-through figure with Prev/Next → "Pause and think" radio quiz with "Just show me" → clip poster with chapter chips → 3-column trade-off table → "Check yourself" ×3 `<details>` → prev/next → colophon.

All three use the same microcopy: "Pause and think", "Just show me", "Check my answer", "Check yourself", "Show answer", "you are here", "Last reviewed 11 Oct 2026", "Found an error?". They share the same keyboard hint line ("Keys: ← → step · link to a step with #fig-…/step-3"), the same bank-balance example, the same 16 GB → 4 TB ladder, and nearly the same sentences ("the most critical … and the most brittle", "how it does that is their problem, that it can is yours").

That is what a reader senses as "AI". The brief's component list was implemented as a checklist three times with three skins. A human designer would have let the content decide which devices this section needs. Section 2.4 has one real mechanism worth stepping through (replication lag). It does not need a triptych, a step-through, a quiz, a clip, a table and a three-question recall all in about 11 minutes of reading. Each device is fine on its own; stacking all of them at even intervals is the slop.

---

## A. Spec Sheet

### What reads as generated

1. **Mono-caps labels on everything.** Uppercase, letter-spaced Plex Mono is defined about 20 times in the CSS: `.eyebrow` (l.61), `.btn` (l.72), `.lec-no` (l.88), `.spec dt` (l.94), `.toc h2` (l.97), `.note .k` (l.134), `.rule .lab` (l.142), `svg .lab` (l.170), `.panel-lab` (l.191), `.opt .tag` (l.238), `.reveal .verdict` (l.243), `.spec-t thead/tbody th` (l.267–269), `.recall .show` (l.284). The top bar, eyebrow, figure tags, table row heads, quiz label, buttons and "ANSWER ▾" all use the same voice. When every label is in small caps, none of them stands out, and it becomes the generic "technical brutalist" Figma-community look.
2. **Eyebrow + condensed heading + grey lede, nested.** The page opens with `LECTURE` / `01` / `WEEK 1 · DAY 2 · CASE STUDY: MEDIUM` / h1 / grey lede / 4-cell spec `dl` / `CONTENTS · L01`. Then comes a rule, and the same stack again: `§ 2.4 · ON THIS PAGE` / `§ 2.4 · SCALING · MEDIUM` / h2 / lede. That is two eyebrows plus a rail eyebrow inside one viewport (`A-d-light-0.png`). Each h3 adds a third numbering layer (`h3 .hn`, l.126: "2.4.1" above "How far does a bigger machine go?").
3. **Decorative numbers.** The 64 px mono `01` (`.lec-no b`, l.89) carries no information that the breadcrumb, eyebrow and spec row don't already give. The spec `dl` (l.380–384) shows "§ 2.4 of 5 parts · ≈ 11 min · 00:45:30–01:03:42 Q&A 02:37–03:10 · 2026-10-11". A reader needs none of that above the fold, and it uses four labelled cells to say it.
4. **REC timestamps as ornament.** `REC 00:47:28` sits under every margin note, rule and code caption. Your own NOTES admit it points to a recording the public site may never link. Unlinked provenance stamps are costume.
5. **Hairline everything, and every block the same width.** Body, rule callout, code block, quiz, recall and prev/next all sit on the same 664 px column with the same 1 px rule above and below (`A-d-light-4.png`, `A-d-light-7.png`). The rhythm is metronomic: paragraph, paragraph, hairline box, paragraph, note.
6. **Margin notes on every paragraph.** Nine notes in the gutter, all with the same anatomy (caps title, grey body, REC stamp). They stop being asides and become a second column of equal weight, so the eye ping-pongs. Titles like "WORKED NUMBER" and "CASCADING FAILURE" are generic category labels, not the specific titles the NOTES claim.

### Hierarchy and pacing
- The first screen is 100% apparatus: no sentence of teaching appears until y≈760 at 1440 wide, and not until the third phone screen.
- After FIG 2.4a the page is flat. Every h3 is 22 px semibold Plex Sans, so "What if most of the traffic is reads?" has the same weight as the quiz question ("Medium reads a user's profile…" is also 600 weight, about 20 px). Questions-as-headings combined with a question-as-quiz blur together.
- The step-through starts on **an empty dot grid** (0/5 state, `A-d-light-3.png`, `A-m-light-2.png`): about 800 px of nothing on a phone with "Press Next." at the bottom. That is the worst moment on the page.
- Good: the rule callout (l.142–144) is the one place with real typographic tension, a big condensed statement against a small label column. It works because nothing else looks like it.

### Typography
- Plex Sans + Plex Sans Condensed + Plex Mono is the safe "single superfamily" choice. It is competent but anonymous, and Plex is the house font of a thousand dev-tool landing pages.
- The h1 is condensed 46 px in a 18 ch measure (l.90), so it breaks into four one-word lines ("Caching, scaling, / delegation, / concurrency, / communication"). That reads as a list, not a title. The list *is* the TOC, so the title is redundant.
- Lede at 21 px grey (`--ink-2`) next to body at 18 px near-black: the lede looks *less* important than the body.
- Mono labels are 10.5 px with +0.12 em tracking. At that size Plex Mono caps get grey and fuzzy in dark mode (`A-d-dark-1.png`).
- On phones the top bar crops the breadcrumb mid-glyph ("§ 2.4 SCALING THE D") with no ellipsis, and the code block clips its comments with no scroll affordance (`A-m-light-3.png`).

### Diagrams
- FIG 2.4a is the most honest diagram of the three: orthogonal routing, the arrowhead on the side that asks, and labels on the shapes. But the dot grid behind every figure plus the 1 px frame plus the black `FIG 2.4a` tag plus the right-aligned "after the board at 00:56:00" is four layers of chrome around a 3-element drawing.
- The legend row at the bottom of FIG 2.4a contradicts the "labels on shapes, not legends" rule in the brief.
- SVG text is 10.5–11 px (l.169–170). On a phone the swim-lane labels ("master conn", "replica conn") sit around 8–9 px and collide with the lifelines.
- The clip poster is the strongest image on the page (orange master, "serves 5 pulls, not 15"). It shows what A could be: one signal colour doing real work.

### Copy voice
- Mostly plain and accurate. The tells are aphorisms bolted onto paragraph ends:
  - "Software is an abstraction, and under it is metal with fixed limits."
  - "how it does that is their problem, that it can is yours."
  - "only if you want to make things complicated on purpose."
  - "Data is where it gets interesting."
- Unsourced generalisations: "It is the shape behind most of the big outages in distributed-systems postmortems." Name one (for example the 2017 GitLab database outage, or the Roblox 2021 Consul outage) or cut it.
- Interface copy is chatty-mechanical: "3 QUESTIONS · ANSWER FIRST, THEN OPEN", "PAUSE AND THINK · COMMIT BEFORE YOU LOOK", "Use the buttons, or focus the figure and press ← →".

### What a top designer would change (by impact)
1. **Cut the mono-caps budget to two uses:** figure tags and table row heads. Everything else (eyebrows, note titles, buttons, quiz label, "ANSWER ▾") goes to sentence case in the text face, or disappears.
2. **Delete the header apparatus.** Remove the 64 px `01`, the spec `dl` and one of the two eyebrows. Open on the h1 and one sentence of teaching. Move the reviewed date and time ranges to the colophon.
3. **Make the step-through open on step 1, not 0,** and crop the swim-lane to the rows actually used (or grow it downward as steps advance). No empty grid.
4. **Halve the margin notes** (9 → 4) and give the survivors *argumentative* titles ("The board draws it backwards" is the right kind; "WORKED NUMBER" is not). Drop REC stamps unless they link to the timestamped video.
5. **Break the column.** Let FIG 2.4a go full-bleed past the gutter, let the rule callout hang its label into the left rail, and let the table run wide. Right now everything snaps to two widths.
6. **Remove figure chrome:** the dot grid behind static figures (keep it only for the time-sequence figure, where it measures something), the legend row, and the black tag. Use a plain caption below with "Fig. 2.4a" in the text face.
7. **Pick a text face with a voice** for body and h1, for example a grotesk with character (Söhne, Untitled Sans, Founders Grotesk) or a sturdy serif. Keep Plex Mono for identifiers only. Drop Condensed, or keep it only for the rule statement.
8. **Rewrite h3s as statements,** not questions ("A bigger machine buys you about eight doublings", not "How far does a bigger machine go?"). The quiz is the only place a question should appear.
9. **Fix phone breakage:** an ellipsised or shortened breadcrumb ("§2.4" only), a horizontal-scroll shadow on `pre`, and SVG labels at 12 px minimum via a portrait variant of FIG 2.4b.
10. **Give orange one job.** It is currently the link underline, the eyebrow highlight, the rule underline, the step state, the progress bar and the code highlight. Keep it for "the thing you're looking at now" and make links ink with an underline.

---

## B. Whiteboard Notebook

### What reads as generated
1. **The "hand-drawn" look is a preset.** Recursive CASL with `slnt -3` (l.62, l.165), graph paper, stick figures, wobble and a speech bubble together read as the Excalidraw default, the most recognisable "AI made me a diagram" aesthetic of the last two years. The NOTES name the risk; the screenshots confirm it (`B-x-clip.png`).
2. **Marker colours used like a template:** blue = path, red = failure, green = ack. On the clip poster the *API box* is outlined red with "fails with it", the arrow is blue, and the timeout is red dashed. That makes three colours in one small drawing, which is what the brief's blacklist calls "color = type".
3. **The yellow sticky note** (`.think`, l.205: `background:var(--note)`). A flat butter-yellow card with "Pause and think" in a scribble face is the stock "callout" of every Notion template.
4. **Centred column with an orphan rail.** The rail is `position:fixed; left:calc(50% - 460px - 224px)` (l.297), which lands at x=36 at 1440 wide, about 320 px from the text, while the right 350 px of the page is empty (`B-d-light-3.png`, `B-d-light-4.png`). It is a centred blog column with a nav stuck to the window edge, and there is no margin-note system at all, so asides become collapsible accordions instead.
5. **Uniform section rhythm.** Every h3 ("Read replicas", "Replication lag, step by step", "Sharding", "The three side by side", "Check yourself") gets the same 1.75 rem Literata 620 with the same `--s7` top margin (l.122). Paragraph, paragraph, figure, paragraph, repeat. Nothing is ever bigger or smaller than expected.
6. **Collapsible asides with skip hints** ("skip unless you run your own database", "a common follow-up"). They are reasonable, but in the screenshot they read as FAQ accordions, a very generated component.

### Hierarchy and pacing
- Best prose rhythm of the three: Literata at 19 px, warm paper and generous leading is genuinely pleasant (`B-d-light-3.png`).
- The pacing still never varies. Nothing interrupts the column except figures, which are all the same `wide` width (about 920 px) and the same graph-paper box.
- The key-rule box (l.138, hand-ruled border with asymmetric radii) is the one moment of authored drawing on the page. Its sketch, though, reads "② then api servers" left of "① database first", so the numbering goes right to left against reading order.
- The header TOC sits *above* the section with "you are here" in blue scribble. It pushes the first sentence of 2.4 below the fold on desktop and three screens down on a phone.

### Typography
- Literata + Recursive (casual + mono + scribble) is one variable family doing four jobs. The CASL axis appears on buttons, table heads, chips, recall summaries and the TOC (l.85, 250, 261, 270, 279, 281), so the "hand" voice leaks into UI and stops meaning "annotation".
- The h1 "Medium under load" is good: short, a real title. The dek beneath is a list again ("scaling, concurrency, delegation and communication").
- Old-style figures in prose are a nice touch ("90:10", "99:1").
- In the mobile top bar, "Lecture 01 / 2.4 T…" plus "§2.4 · 21%" plus a "Blackboard" button means three truncated things competing in 390 px.

### Diagrams
- The wobble generator is tasteful at desktop size, but the stroke weight doesn't scale: on a phone the clip poster's lettering drops to about 7 px and the Play pill covers a stick figure (`B-x-clip-m.png`).
- **The replication arrow contradicts its label.** In FIG panel B the dashed arrow points master → replica while the label underneath says "replica pulls". Sample A gets this right, and the prose of all three makes a point of it.
- Stick figures for clients are cute once. On the notation key and every figure they become clip art.
- Grid paper behind every figure plus a frame plus a fig-bg fill is the same chrome problem as A, in pastel.

### Copy voice
- The warmest and most human of the three. Good lines: "The moment a writer presses *Publish*, Medium shows them their story", "the writer concludes the publish failed".
- Tells:
  - "The database deserves this care more than any other part. It is the most critical and most brittle piece of Medium's infrastructure." ("critical" is on the blacklist and "deserves this care" is filler.)
  - "it shows up again and again in outage reports" (unsourced).
  - "Under a second sounds harmless. Whether it is depends on who is reading." (a setup-and-turn cadence that appears in all three samples)
  - "and you should know what they are doing."
- "Concepts in this section: cascading failure · read replica · …" at the end is a glossary checklist that nobody asked for.

### What a top designer would change (by impact)
1. **Pick one: notebook figures *or* notebook page.** Keep the hand-lettered figures but put them on plain paper (no graph grid, no frame) and set the page itself like a printed book. The contrast between a printed page and drawn figures is what looks authored; costume on both looks generated.
2. **Kill the yellow sticky.** Set "Pause and think" as a hanging question in the left margin, or as a full-width typographic interruption (large italic question, answers as plain text links). No tinted box.
3. **Two marker colours, not three.** Graphite plus one red for "this breaks". Request paths are graphite, ack is a tick glyph, not green.
4. **Fix the arrow direction** in panel B and make the rule-box sketch read ① then ② left to right.
5. **Build a real asymmetric grid.** Hang the section rail next to the text (about 48 px gap, not 320 px) and use the empty right side for margin notes instead of accordions. Let one figure per section go full-bleed.
6. **Restrict the CASL "hand" voice to inside figures.** Buttons, chips, table heads and TOC go to the plain sans (or Literata small caps).
7. **Vary the h3 treatment by role.** Mechanism headings get the big Literata; "The three side by side" and "Check yourself" become small run-in heads. Not every heading deserves 1.75 rem.
8. **Draw the figure's mobile version** with portrait layout and a 13 px lettering floor. Move the Play control below the poster on phones.
9. **Replace the stick figures** after their first appearance with a smaller "client" glyph, and cap the drawing at 3 people.
10. **Cut "Concepts in this section"** and the "From a live whiteboard class" meta. If provenance matters, put one sentence in the colophon.

---

## C. Explorable Essay

### What reads as generated
1. **The wordmark lies.** "Systems, drawn *by hand*" (l.515, `.bar__mark span` italic) sits above clean vector diagrams with flat pastel tints. Ironic or not, a tagline that is untrue of the product is classic generated branding.
2. **The decorative numerals.** The 120 px Newsreader 300 "§2.4" drop numeral (`.opener__num`, l.232) and the 4.5 rem "90:10 to 99:1" pull number (`.pull__n`, l.265) are the Stripe-Press/"editorial" move by rote. The pull number restates the sentence right above it and has a 22 ch grey caption ("Typical ratio of reads to writes in most applications.") that adds nothing.
3. **"This sample shows section 2.4 only."** (`.omitted`, l.225/587). It is meta-text visible in the design and should not be there.
4. **Pastel cast cylinders.** Teal, ochre and slate flat tints with a deeper top face (`C-d-light-1.png`) look like a well-configured diagram library. The tinted "screen bar" on the writer/reader boxes reads as window chrome.
5. **Tasteful-but-empty whitespace.** The scrolly section gives about 60 vh per step, so at 1440 wide there are screens that are 70% blank with a 4-line step on the left and a static figure on the right (`C-d-light-4.png`: the whole bottom half is empty). That is the "Apple product page" void, not breathing room.
6. **The same skeleton as A and B** (see §0), with the most polish. Polish on a template is still a template.

### Hierarchy and pacing
- C has the best scale contrast: a 64 px roman/italic title, a 120 px numeral, 20 px body and a 34 px key rule. The opener (`C-x-opener.png`) is the one screen in the whole bake-off that has a clear entry point.
- But the contrast is front-loaded. After the key rule, the text column runs at a single level until "Check yourself". The margin notes are good (small serif, specific titles like "NAMING") but too sparse to create counter-rhythm.
- The TOC appears twice above the fold at 1440 (left rail plus a two-column contents block). The section starts at y≈900.

### Typography
- Newsreader + Instrument Sans + JetBrains Mono is a 2024-era "good taste" stack, and every editorial AI demo uses it. It is fine, but it is not a decision.
- The `.sc` label class (l.115: Instrument Sans 12 px caps +0.08 em) is used for "PAUSE AND THINK", "THE RULE FOR THIS CHAPTER", "CONTENTS", "SOURCES", "PREVIOUS/NEXT" and the triptych panel heads. These are the same mono/sans-caps eyebrows as A, just quieter.
- Body at 20 px on a 660 px measure is right. `text-wrap: pretty` and hanging punctuation are real craft.
- The key rule's italic ("*the database first*") breaks across lines so that "first," starts the line hanging into the margin (`C-d-light-1.png`). That is an awkward break; balance it.
- On phones the visible `#` anchor prefix before h3s ("# Routing is your job", `C-m-light-2.png`) looks like a Markdown leak.

### Diagrams
- The step-through architecture-plus-timeline is the most ambitious figure here and the closest to the Ciechanowski/Kleppmann references. The plum square as the tracked datum is a great device.
- Routing is awkward. Writer → api goes right, then down, then right, then up again to the master (`C-d-light-3.png`). The api box sits *below* the line between writer and master for no reason. Put writer, api and master on one row.
- The triptych's replication arrow points master → replica while the prose says the replica pulls (same contradiction as B; the step-through gets it right with "replica pulls changes").
- Colour as identity is honest, but in dark mode slate and teal are near-identical in value (`C-d-dark-3.png`), and the pastel fills go muddy.
- The clip poster's "line width ∝ share of queries" is a smart idea, but the 3×30% replica arrows are the same weight as the 90% trunk once they fork, so the encoding breaks at the exact point it should show.

### Copy voice
- The most "written" of the three, and the most prone to *writerly* tics:
  - "The arithmetic hides a catch." (setup line)
  - "Scaling is a team game." (slogan close)
  - "Data is where scaling gets interesting."
  - "Medium is the textbook case."
  - "no dropdown will sell it to you." / "Software is an abstraction; underneath, it runs on something with slots."
  - "SRE teams set it up routinely."
  - "Cascading failures of this kind sit behind most large outages in distributed systems." (unsourced)
- Each paragraph ends on a little turn. Read five in a row and the cadence is mechanical.

### What a top designer would change (by impact)
1. **Drop the wordmark tagline** or make it true. Name the site something plain. Remove "This sample shows section 2.4 only."
2. **Remove the pull number** and keep the 90:10 / 99:1 in the sentence with old-style figures. Keep the § drop numeral only if it is the *only* display numeral on the page. Then it is a signature, not one item in a kit.
3. **Collapse the scrolly whitespace.** Each step gets as much height as its text plus about 20 vh, and the figure sticks while the steps scroll past. Or abandon scroll-driving on this section and use the stepper at all widths. Either way, no screen should be more than 40% empty.
4. **Redraw FIG 2.4b on one horizontal row** (writer → api → master, reader → api → replica below it) with straight orthogonal runs. Fix the triptych arrow direction.
5. **Drop the pastel fills.** Outline-only shapes in the cast colour, with a tint *only* on the element in focus. Identity comes from stroke colour and the coloured term in the prose, not from fills.
6. **One TOC above the fold, not two.** At ≥1320 px, the rail is the TOC; remove the two-column contents block or fold it into the rail.
7. **Rewrite every paragraph-ending aphorism** as the next concrete fact or delete it.
8. **Replace the sans-caps `.sc` eyebrows** with run-in italic serif labels ("*Pause and think.*" leading into the question), which is native to an essay.
9. **Phone:** hide the `#` anchors on touch, make the figure's label floor 13 px with a portrait viewBox, and drop the "4…" truncated progress in the top bar.
10. **Dark mode:** re-pick slate vs teal for value separation (one light, one dark), and test cast colours as text on `--paper-2`.

---

## Cross-cutting rules for round 2

These apply to all three directions.

1. **No shared skeleton.** Each section's devices are chosen by its content. A section gets *at most one* interactive figure, *at most one* reader prompt and *one* end-of-section recall. A triptych, clip, table and quiz appear only where the content has that shape. If two directions end up with the same component order, one of them is wrong.
2. **Write the microcopy fresh, per direction and per prompt.** Banned strings: "Check yourself", "Pause and think", "Just show me", "Check my answer", "Show answer", "you are here", "Found an error?", "step by step", "side by side", "Keys: ← →". The prompt label should be the question itself. Recall questions sit under a heading that says what they test ("Three ways this goes wrong").
3. **Label budget.** At most two uppercase-tracked label styles per page, and never on buttons, quiz options, note titles or nav. No eyebrows above h2s. No stacked numbering (§ 2.4 · 2.4.1 · FIG 2.4a). Number figures only, never headings.
4. **The first screen teaches.** On desktop and phone, the first sentence of the section's argument is visible above the fold. The meta (reading time, reviewed date, recording range, REC stamps) goes to the colophon or is linked, never shown as ornament. No visible TOC block longer than the viewport before content; the rail or a collapsed sheet does that job.
5. **Break the column on purpose.** Use at least three measures per page: body (about 66 ch), wide (figures), and full-bleed for one hero figure per section. Margin notes hang into a gutter that sits adjacent to the text. A paragraph-level device should look unlike its neighbours; if two consecutive blocks have the same width, rule and padding, merge or vary them.
6. **Diagrams obey the prose.** Arrow direction matches the text (the replica pulls; the arrowhead is on the side that asks). Numbering reads in reading order. Routing is straight and on one row where the flow is linear. No frame + grid + tag + legend chrome; a caption under the figure is enough. Labels are at least 12 px at 390 px wide, or the figure gets a portrait version.
7. **Colour: one accent with one job,** plus red for failure. Identity colour (C) is allowed only as stroke plus the matching prose term, never as pastel fills. Links are ink plus an underline.
8. **No aphorism closers.** Paragraphs end on a fact, a number or the next question, never on a slogan ("Scaling is a team game", "Data is where it gets interesting", "metal with fixed limits"). Every "most outages" or "teams routinely" claim gets a named incident or source, or is cut.
9. **No empty states on load.** Step-throughs open on step 1. Scroll-driven figures never leave more than 40% of a viewport blank.
10. **Fix the phone-specific breakage first:** truncated breadcrumbs (show "§2.4" only), `pre` overflow with a visible scroll affordance or wrapped comments, hidden `#` anchors on touch, and Play controls that do not cover the drawing.
11. **Choose type for voice, then commit.** Pick one distinctive text face per direction that is *not* Plex, Inter, Newsreader+Instrument or Literata+Recursive by default. Keep the mono for identifiers and numbers only. Let the h1 be a title, not the TOC rewritten as a list.
12. **One signature per direction, used once per section.** A: the rule statement. B: hand-drawn figures. C: the cast-coloured term linked to the figure. Everything else on the page should be quiet enough that the signature reads as intent.
