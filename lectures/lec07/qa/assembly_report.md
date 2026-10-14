# Lecture 09 (lec07) assembly report (14 Oct 2026)

Lecture: **Build your own Redis**, course position 09 (week 5, day 1). Overview `site/src/content/lectures/lec07.mdx` →
`/lectures/lec07/`, plus one page per chapter. The frontmatter has the kicker "Lecture 09 · week 5, day 1 · running case:
build-your-own Redis", the dek, description, `reviewed: 14 Oct 2026`, `status: draft` and the ledger path. `contents`
lists all 7 chapters and their 37 subsections, with the titles and ids the parts actually use. `chapters` has the
slugs, parts and summaries from `chapters.json`.

## Pages and their parts

| page | parts | section ids |
|---|---|---|
| overview `/lectures/lec07/` | `s0-header` | "About this class" (MarginNote, tagged L-0001 L-0002 L-0003 L-0007 L-0008 L-0009 L-0010 L-0079 L-0082), "Our Redis so far" (untagged, no figure: the outline gives none) |
| `1-etl-and-cdc` | `s1a-etl-and-cdc`, `s1b-etl-and-cdc` | #s1, #s1-1 … #s1-7, #s1-check |
| `2-one-node` | `s2-one-node` | #s2, #s2-1 … #s2-6, #s2-check |
| `3-eviction-and-expiry` | `s3-eviction-and-expiry` | #s3, #s3-1 … #s3-5, #s3-check |
| `4-protocol-and-concurrency` | `s4-protocol-and-concurrency` | #s4, #s4-1 … #s4-6, #s4-check |
| `5-routing` | `s5-routing` | #s5, #s5-1 … #s5-4, #s5-check |
| `6-consistent-hashing` | `s6a-consistent-hashing`, `s6b-consistent-hashing` | #s6, #s6-1 … #s6-7, #s6-compare, #s6-check |
| `7-what-to-keep` | `s7-keep` | #s7 |

"Our Redis so far" sums up where the cache stood after Lectures 1, 2, 3 and 5, following `course.json`: the TTL store
for heartbeats, the shared Redis next to Medium's database, the KV store on MySQL with lazy and sampled expiry, and Redis
as the lock store with Redlock. It has three "back in" chips (Lecture 2 → lec01#s2-4, Lecture 3 → lec05#s4,
Lecture 5 → lec08#s5-2). The About note links back to the Kafka essentials (Lecture 2 → lec01#s3-6).

Per chapter: figures 1·a–1·f, 2·a (with stage 1), 2·b–2·d, 3·a–3·e, 4·a–4·h, 5·a (with a "continued" panel), 5·b, 5·c,
6·a–6·j and 7·a. Clips: 1·1 `l07-events-vs-cdc`, 3·1 `l07-lru-vs-lfu`, 5·1 `l07-four-routes`, 6·1 `l07-mod-vs-ring`.
Step-throughs: 3·e, 4·f, 6·e and 6·f. There are 9 pause-and-think prompts (P1–P9). Chapters 1–6 each have one RuleBox,
three RecallItems and a SectionEnd hand-off to the next chapter. Chapter 7 has neither a RuleBox nor recall questions,
like lec01's "What to keep". The NotationKey appears once, in §1 (`s1a`).

## Gates

| gate | result |
|---|---|
| build | `build ok: 11 pages` (isolated build `site/.builds/lec07`). |
| coverage | All 374 of the 374 placed ids are on their chapter's page: overview 9, ch1 76, ch2 69, ch3 60, ch4 64, ch5 30, ch6 71, ch7 13. Overall ledger coverage is 374/381; the 7 not on the page are the items the placement leaves unplaced. `COVERAGE PASS`. |
| links | 11 pages, 586 internal links and assets: `ok: zero broken links`. 96 links go into other lectures and are checked against the lecture's MDX only. No duplicate element ids on any of the 8 pages (built-HTML scan). |
| check-figures | `check-figures ok: every page at 360/390/768/1440, light + dark`. |
| QA sweep | `report.txt` ends `ok: no failures`. 8 pages × 1440/1024/390 × light/dark = 48 page captures (top/mid/end, 146 shots). The 4 step-throughs were walked: 21 steps at 1440 and 21 at 390 (42 shots). All 9 pause-and-think prompts were clicked (45 shots). All 4 clips were played and their chapter chips clicked (32 poster and playing shots). There are 117 single-figure shots and a 39-shot sweep. |
| posters | `pipeline/bin/site.sh posters lec07` wrote paper and blackboard posters, desk and phone, for all 4 clips into `site/public/clips/l07-*/`. The pages were rebuilt after. |

`gates_assembly.txt` ends `GATES PASS`.

## Consistency fixes
- **Overview:** wrote the overview frontmatter and `s0-header.mdx`, the About note and "Our Redis so far". TOC titles use
  the parts' exact titles, with curly apostrophes.
- **Label floor:** added `site/src/figures/lec07/floor.tsx`, a per-lecture `Fig` wrapper like lec06's. It raises every
  label to at least 12px at 360 and 768, where the column is narrowest, and moves nothing. Chapter 2 keeps its own
  floor.
- **Byte-budget tag:** chapter 3's writer used `<span class="scribble">`; chapter 2 now uses the same tag, so the two
  chapters match.
- **Figs 6·e and 6·f:** the step labels crossed the lifelines. They now have a paper-coloured halo, the same fix as
  lec02 Fig 8·f; I checked it in the 1440 and 390 step screenshots.
- **Checked and found consistent, no edit needed:**
  - figure and clip numbers run in reading order on every page;
  - section ids are unique and every `#s…` link resolves (the 7·a links to §1.3, §2.2, §4.5, §5.4, §6.2 and §6.7 all go
    to the right pages);
  - exactly one NotationKey, and one RuleBox plus three recall questions per chapter;
  - every chapter opens with a one-line problem and ends with a SectionEnd to the next;
  - no paragraph is duplicated across chapters.

  No ledger tag was removed.

## Open items
- Shared change needed (from writer w1): the `NotationKey` takes no props. The lecture's own marks (CDC tool, log
  strip) are in a separate key figure right under it, `fig-l07-key`.
- Shared change needed (from writer w1): `TradeoffTable` has no CDC or Spark header glyph. T1 uses `replicas` and
  `minions` as stand-ins.
- Shared change needed (from writer w2): the outline's "byte budget" margin tag has no CSS. `.scribble` stands in for
  it (see above).
- The "Lecture 10" chips in §6.5 and §7 have no link yet, because that page is not built.
- On phones the clip chapter chips sit in a row that scrolls sideways, so only the first two of the five chips in
  Clip 5·1 are visible at once. This is the shared player's behaviour.
- Captions of two-panel figures say "Left/Right" (1·d, 2·b), and the phone layout stacks those panels. lec01 does the
  same.
