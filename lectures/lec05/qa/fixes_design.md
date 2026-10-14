# Lecture 03 (lec05): design fixes (response to critic.md)

Scope: the lec05 figures, the figure and component placement in the lec05 MDX, one additive block of rules in the shared
`site/src/styles/notebook.css`, and one wait in the QA capture tool (`pipeline/lib/page_qa.mjs`).
- Before shots: `lectures/lec05/qa/critic_shots/…`.
- After shots: `lectures/lec05/qa/fixes_design_shots/…` (same layout: `step/`, `fig/`, `sweep/<width>-<scheme>/<page>/`).

## Verification

- **Build:** `pipeline/bin/site.sh build lec05` → `build ok: 10 pages`.
- **QA:** `pipeline/bin/site.sh qa lec05 lectures/lec05/qa/fixes_design_shots --widths 1440,390 --sweep` → every page
  (overview, 1-locks … 6-craft-and-keep), light and dark, step-throughs walked, pause-and-think tried, clips played:
  `ok: no failures`. An earlier round failed on fig-2d (labels at 11.4px once the drawing was widened to 460 units); the
  drawing went back to 420 units with the lanes moved left, and the rerun passes.
- **Gates (lec05):** `lectures/lec05/qa/gates_design_fix.txt` → build ok, coverage pass, zero broken links,
  check-figures ok at 360/390/768/1440 in light and dark, `GATES PASS`.
- **Shared file changed** (`notebook.css`: additive rules that apply only to `.col>` children). The gates were re-run for
  every other lecture with a page:
  - **lec01:** `gates_lec01_after_shared.txt` → `GATES PASS`.
  - **lec08:** `gates_lec08_after_shared.txt` → `GATES PASS`.
  - **lec04:** `gates_lec04_after_shared.txt` → build ok, zero broken links, check-figures ok. It ends `GATES FAIL` on
    coverage only (0/327). Its part files (`site/src/content/lectures/lec04/*.mdx`) are still ~130-byte stubs with no
    content yet, so nothing on them can be tagged. This failure is not caused by the CSS change.
  - **Screenshots:** lec01 was swept at 1440 (`lectures/lec05/qa/lec01_after_shared_shots/sweep/1440-light/2-scaling/`,
    `ok: no failures`). In `021.png`, §2.4's two back-to-back asides now share one rule, and the comparison table below
    them has its new top margin. The rest of the page is unchanged (`019.png`).

## Issues and changes

| id | Issue | Change (files) | Before → after |
|---|---|---|---|
| C-01 | Step highlight trails the counter; the last step never looks current | The pages were right: `StepThrough.astro` maps `data-step` 1-based on both the drawing and the list, and the figures use `<Step n={1…}>`. The QA tool clicked Next and shot at once, inside the 0.2–0.25 s opacity transition. **`pipeline/lib/page_qa.mjs`** now waits 450 ms after each Next before the shot. Re-shot: step N highlights text N and draws row N, the last step included. | `critic_shots/step/1440-light-fig-3a-s3.png`, `1440-light-fig-2d-s4.png`, `1440-light-fig-2e-s5.png`, `390-light-fig-3a-s5.png` → `fixes_design_shots/step/1440-light-fig-3a-s3.png`, `1440-light-fig-2d-s4.png`, `1440-light-fig-2e-s5.png`, `390-light-fig-3a-s5.png` |
| C-04 | Collapsed asides stacked with ~50 px blank bands | Cause: a section is a CSS grid, so the asides' 24 px margins add instead of collapsing. **`notebook.css`**: `.col>details.aside+details.aside{margin-top:calc(-1 * var(--s5) - 1px)}`, so back-to-back asides share one rule and read as a short list. **`s2b-check-in.mdx`**: the three-in-a-row at the end of §2.4 is broken up: "Why the index matters" now sits right after the `FOR UPDATE` query it qualifies; "A debugging hunch" sits after the PostgreSQL paragraph, just before the run; "From your OS course" stays after the signalling paragraph. No more than two asides now sit back to back anywhere (§1.5, §3.4 pairs share a rule). | `critic_shots/sweep/1440-light/2-check-in/015.png`, `3-kv-store/010.png`, `1-locks/018.png` → `fixes_design_shots/sweep/1440-light/3-kv-store/010.png`, `fixes_design_shots/sweep/1440-light/2-check-in/` (§2.4), `…/1-locks/` (§1.5) |
| C-06 | Labels collide in fig-2d and fig-2e swim lanes | **`s2a-check-in.tsx` (fig-2d):** row-state boxes now sit right of the seats lifeline (`x = S + 8`), so every arrow ends on the line, and the strike through "1A = p1" sits inside its box. "UPDATE / commit" is stacked on two lines, each inside its own lane gap. The three "1A" replies sit under their own arrowheads, below every shaft. "reads after p2's commit" moves beside the seats lane above "1B = p3". Lanes were moved left to keep the 420-unit width (labels ≥ 12 px). **`s2b-check-in.tsx` (fig-2e):** the bubble is gone (C-12), replaced by "waiting: / no row yet" beside T3's hourglass. "1A/1B/1C + lock" and "UPDATE / COMMIT" are stacked inside the lane gaps. The "1C" seat box moves below the step-4 "signal". On phone, the two "re-check" labels become one beside the engine, where both arrows arrive, and "signal" sits 8 units clear of the engine line. | `critic_shots/step/1440-light-fig-2d-s4.png`, `1440-light-fig-2e-s5.png`, `390-light-fig-2e-s5.png` → `fixes_design_shots/step/1440-light-fig-2d-s4.png`, `390-light-fig-2d-s2.png`, `1440-light-fig-2e-s4.png`, `1440-light-fig-2e-s5.png`, `390-light-fig-2e-s3.png` |
| C-07 | fig-1d arrows on the wrong side; "kills itself" | **`s1-locks-fig-1d.tsx`:** T2 is the initiator, so every request is now an `Arrow` from T2 with its head on the row. In panel a, blue arrows go to rows 3 and 4 (green ticks stay on the rows it gets), and a dashed arrow with a slash goes to the skipped row 6. Panel b gets the same arrowheads: thin blue to rows 3 and 4, red to row 6 with the cross. The label is now "fails at once" (the board's "fails immediately"; the prose keeps the instructor's "kills itself" with its engine note). | `critic_shots/sweep/1440-light/1-locks/012.png` → `fixes_design_shots/fig/1440-light-fig-1d.png`, `390-light-fig-1d.png` |
| C-08 | fig-4b samples drawn as contiguous dashed blocks | **`s4-redis-expiry.tsx`:** the dashed frames are gone. Each round picks 20 cells scattered over the whole field (deterministic hash order; round 1 is 6 expired of 20, round 2 is 3 of 20, from cells round 1 didn't take). The picked keys are ringed in blue where they sit, solid for ①, dashed for ②. A legend reads "① round 1: 20 keys at random", "② round 2: 20 more". The sampled expired keys are deleted (faint and ticked); unsampled expired keys stay struck. **`s4-redis-expiry.mdx`:** the caption now describes the rings. The clip `l05-redis-sampling` poster is clip work (`site/src/animations/clips/`, outside this job's files). **Left for the animator:** highlight the 20 picked cells in place before gathering them into the "sample of 20" box, then re-capture the posters. | `critic_shots/fig/1440-light-fig-4b.png` → `fixes_design_shots/fig/1440-light-fig-4b.png`, `390-light-fig-4b.png` |
| C-09 | Table and chips flush against neighbouring text | **`notebook.css`:** `.col>.trade{margin:var(--s6) 0}` (32 px, the figure margin) and `.col>.fwd-line{margin:var(--s5) 0}` (24 px) for block "coming later" chips. The paragraph after the §2.5 six-column table and the chip and paragraph after the §4.2 table now have room. | `critic_shots/sweep/1440-light/2-check-in/019.png`, `023.png`, `4-redis-expiry/010.png` → `fixes_design_shots/sweep/1440-light/4-redis-expiry/010.png`, `…/2-check-in/` (§2.5, §2.7) |
| C-12 | Three speech bubbles; only fig-3b's is the misconception | fig-3b keeps its bubble. **`s1-locks-fig-1bc.tsx`:** fig-1c's "can nobody even read me?" becomes a plain muted hand note beside row 6 ("can nobody even / read row 6?"), as fig-1b's "both may read row 6" is drawn. It sits clear of the red ring. **`s2b-check-in.tsx`:** fig-2e's bubble becomes the hand note described in C-06. | `critic_shots/fig/390-light-fig-1c.png` → `fixes_design_shots/fig/1440-light-fig-1c.png`, `390-light-fig-1c.png`; fig-2e as in C-06 |

## Not changed / left for others

- C-08, clip part: the `l05-redis-sampling` composition and its posters belong to the animator (see the row above).

## Follow-up fix (F-018)

The replication arrow kept its pull direction (it starts at the replica that asks, head on the master), and every drawing
now carries the label Fig 5·b wide got, "pulls changes / from master", so it reads at a glance as: the replica pulls,
the data comes from the master.

- **Fig 5·b phone** (`site/src/figures/lec05/s5-distributed.tsx`): "pulls changes" above the dashed arrow, "from master"
  below it. Master moved to x 92 and replica to x 254 (their blue arrows, labels and the cleanup arrow moved with them),
  so the gap fits the words.
- **Fig 5·c** (`ShardRow`, same file): the same two-line label in both rows, wide and phone. Wide: replica radius 30→26,
  moved to x 656, batch cleanup to x 714 at width 160 (new `ww` prop). Phone: master x 76 (GET arrows follow), replica x 232.
- **Fig 6·a** (`site/src/figures/lec05/s6-keep.tsx`): same two-line label. Replica radius 30→26, moved to x 630; batch
  cleanup to x 680 and its arrow to x 766; tags §5.2 and §3.7 moved with them. The phone list already said
  "pull changes from their master".
- **Fig 5·b wide**: the earlier fix's "pulls changes" was cut off at the right edge (850-unit canvas). The canvas is now
  872 wide, so the label fits.
- **Caption** (`s5-distributed.mdx`, Fig 5·c): "Each dashed “pulls” arrow…" → "Each dashed arrow labelled “pulls changes
  from master” starts at the replica that asks; the data flows from master to replica." The Fig 5·b and 6·a captions
  already agreed with the drawings.
- **Checks:** type check of `src/figures/lec05` + kit is clean (rc 0). `pipeline/bin/site.sh build lec05 --tag f018` →
  build ok. `site.sh figures lec05 --tag f018` → check-figures ok at 360/390/768/1440, light and dark (labels ≥ 12px,
  no horizontal scroll). Screenshots: `lectures/lec05/qa/f018_shots/` (1440 fig5b, fig5c, fig6a; 390 fig5b, fig5c).

## Follow-up fix (critic final)

Open issues in `critic_final.json`: C-02, C-13 (medium); C-09, C-10, C-14, C-15, C-16, C-17 (low). C-01, C-03–C-08, C-11
and C-12 were already resolved; no shared component (`StepThrough.astro`, asides) was touched, so lec04's keep-in-view
behaviour is unchanged.

| id | Change (files) |
|---|---|
| C-02 | Voice pass over every lec05 MDX part, not only the flagged spots. §6.1: "has had his fair share" → "in practice it has caused its fair share of problems"; "The instructor uses ORMs day in and day out…" → "Use ORMs day in and day out, then, but don't use one at scale". §6.2: personal stack (L-0319) and the Java/LinkedIn experience (L-0325) moved into the existing aside, now "From class: the JVM in practice" (k L-0319 L-0322 L-0325); "in his experience" dropped (chapter intro marks opinions once). §6.3: "which is why the lecture uses them"; the "where this depth comes from" aside reworded without he/his. §4.2: "about 90% (an estimate from class)"; "This bears repeating"; "As the lecture puts it" (Redis threads, hedge kept). §2.4: "Why would it wait on the first row at all? That question was set aside…". Also §0 pre-reads, §1.1 (blockchain "by its account", father memory in the aside), §1.4/§1.6/§1.7, §2.2, §2.3, §2.5–2.7, §3.1–3.7, §5.3, ch. 5 end: "the instructor …" → plain statements or "in the lecture's view/experience" where an opinion or hedge needs it. No fact, `[[L-xxxx]]` or `k=` removed. `grep -wiE 'instructor|his|he|him'` on lec05 MDX is now empty. |
| C-13 / C-10 | `s2b-check-in.mdx`: the "More precisely" SourceNote moved from between the predictions list and the "You are the database engineer" card to after the "Think like the database engineer…" paragraph, so it explains the answer instead of giving it away ("The predictions above were made before the run…"). The predictions list is kept whole (every item carries a ledger id). |
| C-09 | `s2b-check-in.mdx` §2.7: the inline "Lecture 9: optimistic locking" chip is now a block chip (`<ForwardChip block>`), with the same 24 px margin as the other "coming later" chips. |
| C-14 | `figures/lec05/s3a-kv-store.tsx` fig-3a step 5: expired_at cell "e" → "12:00" (as step 3/4). |
| C-15 | `s6-keep.mdx` §6.1: the "(The sentence was garbled…)" production note removed from the copy; it stays in the ledger detail of L-0313. |
| C-16 | `figures/lec05/s1-locks-fig-1e.tsx`: "the transaction that detects it is killed" → "one transaction is rolled back (ERROR 1213)"; agrees with Clip 1·1. |
| C-17 | `animations/clips/l05-redis-sampling/RedisSampling.tsx` (lab and site copies identical; storyboard.md updated): the boxed "since 6.0" note is gone (the caption line carries the rule); in its place a muted two-line note "one example run: the picks are / random, so the counts vary". Page caption (`s4-redis-expiry.mdx`): "Example numbers." → "One example run: the picks are random, so its counts differ from Fig 4·b's." `lab.sh tsc` ok; lab stills at the poster frame (wide + phone, paper + blackboard) checked; posters regenerated with `site.sh posters lec05`. |

**Checks.** `pipeline/bin/site.sh gates lec05 lectures/lec05/qa/gates_followup.txt` → GATES PASS (build ok, coverage
356/356 placed ids, zero broken links, check-figures ok at 360/390/768/1440 light + dark). `site.sh qa` on the changed
pages at 1440 and 390 with sweep → no failures. Screenshots in `lectures/lec05/qa/followup_shots/`: `step/*-fig-3a-s5.png`,
`fig/*-fig-1e.png`, `clip/*-l05-redis-sampling-fig-poster.png`, `sweep/1440-light/2-check-in/012.png`, `013.png` (§2.4
order), `023.png` (§2.7 chip), `sweep/*/6-craft-and-keep/` (ch. 6).
