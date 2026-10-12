# Lecture 1 assembly report (13 Oct 2026)

Page: `site/src/content/lectures/lec01.mdx` → `/lectures/lec01/`. Header, then §1, §2, §3a, §3b, §4, §5 and §6, imported in the order of the outline. The frontmatter TOC lists all 6 chapters and their 30 subsections. Section ids run #s1 … #s6, and subsections use #s<n>-<m>. §4 has no intro Section of its own, so an anchor `#s4` sits just before 4.1.

## Gates

| gate | result |
|---|---|
| (a) coverage | All 392 of the 392 placed ids appear on the built page, each in its placed section (`gate_a_coverage.txt`). Overall coverage is 392/400. The 8 missing items are the dropped `admin_reference` ones. No unknown ids and no stray `[[…]]` markers. |
| links | All 165 in-page `href="#…"` targets exist. Duplicate ids: none. Check-yourself headings are now `#s1-check` … `#s5-check`, and Prose now de-duplicates heading ids across the nested MDX files. |
| (b) build | Passes with no warnings (`gate_b_build.txt`). |
| (c) screenshots and interactions | Every section was captured at 1440 and 390, in light and dark. All 6 step-throughs were walked step by step with Next and Home, 30 steps per width. All 9 pause-and-think prompts were clicked. All 4 clips were played and every chapter chip clicked. The theme toggle was exercised. `check-figures` passes at 360, 390, 768 and 1440 in both themes: no label is under 12px and there is no horizontal scroll. Console: there are no errors. The only output is Remotion's licence notice, logged as a console warning (see open items). Tools are in `tools/`. |
| (d) §2.4 against the sample | Same look and rhythm: header, prose, clip, rule box, three-panel figure, prose, then the step-through. The deliberate differences are those listed in the outline: the notation key moved to §1, the clip is the built player with its chips taken from META, and replication is drawn as a pull. |

## Shared fixes made
- `ForwardChip` component and CSS: it uses the chip's casual hand, has a thin rule and a → mark, and works inline or as a `block`. It replaces every `fwd` / `fwd-chip` span and the local stand-in in §5.
- Kit: `Worker` and `Bubble` take `size`. `Worker` labels are centred away from the loop mark. `Cloud`, `Cube` and `Disk` were promoted from `s1-parts.tsx`, which re-exports them. Fig 3·e's `PhoneBubble` and Fig 6·a's separate Worker labels were removed. Fig 6·a now uses the cloud and cube, and its phone fleet glyph was redrawn.
- Glyphs: hulk, minions, browser, cdn, lb, apiram, apidisk, redis, matview, queue, stream, broadcast, snssqs, shortpoll, longpoll, websocket, sse and push, applied to tables T1, T2, T4 and T5. The NotationKey is extended with reader, cdn, redis, queue, stream/broker and worker.
- `Figure` now has `max` and `panels={2}`, and the inline max-width divs in §0 and §1 were removed. `RecallItem` was fixed: inline HTML in a question broke the grid.
- Clips: queue-vs-stream and polling now use the registered `clip=` form, and their poster children are removed. The cascade chips come from META.
- Small fixes: the phone step numerals in Figs 1·b, 3·d and 4b were moved clear of the rotated "time" label, and the phone reader in Fig 1·b was shrunk. Figs 3·b, 3·c and 6·a pass at 768. Next-chapter links now point to #s4 and #s5.

## Open items for the lead
- Remotion prints a licence notice, logged as a console warning, when a clip mounts. Silencing it needs `acknowledgeRemotionLicense` on `<Player>`. That is a licensing decision for the owner, so I left it.
- Fig 1·a appears twice, once in the header ("Medium so far") and once in §1.2. This is by design in the outline.
- The TOC lists all 30 subsections, which makes it long on desktop. It collapses on phones.
- The rail and section progress treat §5 as one section, with h3 subsections. This is consistent with how the page is written.
