# Lecture 05 (lec08) assembly report (14 Oct 2026)

## Pages and parts

The overview is `site/src/content/lectures/lec08.mdx` at `/lectures/lec08/`. It has the frontmatter (title, kicker, dek, description, reviewed 14 Oct 2026, status draft, ledger, a `contents` block with all 8 chapters and 40 subsections, and `chapters`) and imports `lec08/s0-header.mdx`. That header holds the "About this class" MarginNote and "The load balancer so far". Each chapter has its own page:

| page | parts | sections |
|---|---|---|
| `1-approach` | s1-approach | #s1, #s1-1 … #s1-3 |
| `2-algorithms` | s2-algorithms | #s2, #s2-1 … #s2-6 |
| `3-one-laptop` | s3-one-laptop | #s3, #s3-1 … #s3-5 |
| `4-control-plane` | s4a-control-plane, s4b-control-plane | #s4, #s4-1 … #s4-6 |
| `5-dns` | s5a-dns, s5b-design | #s5, #s5-1 … #s5-7 |
| `6-remote-locks` | s6a-remote-locks, s6b-remote-locks | #s6, #s6-1 … #s6-8 |
| `7-distributed-locks` | s7-distributed-locks | #s7, #s7-1 … #s7-5 |
| `8-what-to-keep` | s8-keep | #s8 |

Chapters 1–7 also have a check-yourself heading, `#s<n>-check`. Every chapter part opens with a `Section id="s<n>"`, so no anchor stand-in is needed. TOC titles were checked against the parts, including the curly quotes in 1.1, 5.2 and 6.6.

## Gates

| gate | result |
|---|---|
| build | `build ok: 12 pages`, isolated build `site/.builds/lec08` (`gates_assembly.txt`). |
| coverage | 376 of 376 placed ids are on their chapter's page: overview 6, ch1 27, ch2 52, ch3 55, ch4 80, ch5 63, ch6 70, ch7 26, ch8 28. Overall ledger coverage is 376/381; the 5 missing ids are the ones dropped in `placement.json`. `COVERAGE PASS`. |
| links | 12 pages; 544 internal links, assets and `#fragments` checked; zero broken. |
| check-figures | Every page at 360, 390, 768 and 1440, light and dark: no label under 12px, no horizontal scroll. |
| QA sweep | Every page at 1440, 1024 and 390, light and dark: layout columns and nav, all 5 step-throughs walked (26 steps), all 9 pause-and-think prompts clicked, all 4 clips played and their chapter chips clicked, no console errors, no horizontal scroll, label sizes checked. `report.txt` ends `ok: no failures`. |
| screenshots | I looked at the top, middle and end of the overview, Figs 2·e, 5·c and 5·e at 1440, the phone step-throughs 2·d and 3·b, and phone sweep frames for 3·a, 4·e, 5·c, 5·d and 5·e. After the fixes I looked at them again. |

## Consistency fixes made
- **Overview body written** (`s0-header.mdx`). "About this class" covers L-0001, L-0004, L-0006, L-0009, L-0017 and L-0019, each tagged, with a Lecture 6 ForwardChip for distributed ID generators. "The load balancer so far" is untagged. It says where Lectures 1–4 left the load balancer: a box in Lecture 2, heartbeats from Lecture 1, row locks from Lecture 3, Pub/Sub from Lecture 4. The outline gives it no figure.
- **Figure numbers in reading order.** Chapter 2 had 2·a, 2·b(a), 2·b(b), 2·c, 2·b. It now runs 2·a–2·e, and the in-text "last step of Fig 2·c" now says 2·d. Chapter 6 had 6·a(1), 6·a(2), 6·b(1), 6·b(2), 6·c–6·e. It now runs 6·a–6·g. Element ids are unchanged, so no link broke. Clips are already 2·1, 4·1, 6·1 and 7·1.
- **Hand-offs.** Chapters 1 and 2 had no `SectionEnd`. Both now have one, with a next-chapter link and concept chips, as in chapters 3–7.
- **Duplicates removed.** The 28k-connections Linux fact appeared three times: in P2's reveal, in the Fig 4·a caption and in the §4.1 text. Only the sourced §4.1 sentence keeps it. The "scale on day zero is the worst way" sentence in §3.2 now refers back to chapter 1 instead of repeating it. L-0104 stays tagged in both places.
- **Figure legibility.** 0 labels failed in chapters 6–7. Chapters 1–5 had about 240 labels under 12px at 360, 768 or 1024. The causes were phone layouts at 12.5–13.5 units, the 880-wide Figs 1·a, 5·c and 5·e at 768, and the three-across Fig 2·e at 1024. I raised the phone labels to 14 units, the wide figures to 15 and the 2·e panels to 16, then re-laid out the labels that collided:
  - Fig 3·a: the backend list became one IP per line plus ":8081 each".
  - Fig 4·e: the console label is now two lines and the box is wider.
  - Fig 5·c: the request path's second client line moved so it clears the domain label.
  - Fig 5·d: the boxes are labelled leader/follower, with one "orchestrator ×3" label above them.
  - Fig 2·e and Fig 5·e: two labels moved.
  
  Two small per-lecture helpers were added in `s3-one-laptop-parts.tsx`, with defaults unchanged: `LbServer` now takes `subSize`, and `TimeSeries` takes `labelSize`.
- Checked and already consistent: NotationKey appears once (§1.2), and each of chapters 1–7 has one RuleBox and 3 recall questions. No duplicate ids. Chapter openers start from the previous chapter's problem from chapter 3 on.

## Open items
- **Domain spelling:** §5.1–5.2 use `payments.lb.google.com`, as said at 01:48. §5.4 and §5.6 use `lb.payments.google.com`, as written on the 01:51 board. Both are faithful. I left them as taught; a reader may notice the switch.
- **Shared change needed** (from writer w2): the QA step-through shots are taken mid-fade. For example, Fig 3·b step 5 shows its labels half-faded. `page_qa.mjs` should wait for the transition to finish.
- **Shared change needed** (from writer w1): NotationKey has no glyphs for this lecture's orchestrator stack, DNS box, Pub/Sub pipe, time-series cylinder or lock tag. It is used unchanged.
- **Shared change suggestion:** kit `Box` `sub` and `Cyl` labels have fixed sizes (12.5 and 14). Phone figures and wide figures at 768 need them larger. A `subSize`/`labelSize` prop in the kit would remove the local workarounds in this lecture.
- Back-links to Lectures 1–4 are plain chips without hrefs, because those lectures are still "coming soon" in the course nav.
