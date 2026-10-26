# Lecture 1 (lec04) story rewrite: notes

Pilot of `lectures/STORY_BRIEF.md`. Source: `site/src/content/lectures/lec04.mdx` + `lec04/{s0-header,c1…c8}.mdx`.

## Chapters (visible words per built page, incl. captions, code, tables and hidden pause/recall answers; excl. SVG desc/labels)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook (dek + first paragraphs), what you'll build, what you'll be able to do, before you start | ~880 (incl. chapter list) | – |
| 1 | Why is the dot still green? | 1,315 | About 7 min |
| 2 | Who deletes the silence? | 1,557 | About 8 min |
| 3 | Two stores pass the test. Which one goes in the box? | 1,668 | About 8 min |
| 4 | The table is tiny. Why is the store struggling? | 1,612 | About 8 min |
| 5 | A spike hits and autoscaling adds twenty servers. What do they get? | 1,357 | About 7 min |
| 6 | A writer deletes a post by mistake. Can you give it back? | 1,618 | About 8 min |
| 7 | The home page is slow. What's in the row? | 1,427 | About 7 min |
| 8 | One post goes viral (incl. What you can now do, 4 recall questions, homework → Lecture 2) | 1,867 | About 9 min |

(Counts include page chrome, code, tables and hidden pause/recall answers.) Total ≈ 13.3k counted this way (about 11.5–12k of always-visible text once the hidden answers and page chrome are removed). Reading times = words / 200, rounded.

Spine: brief → naive login/logout design lies (battery) → server can't pull → periodic beats, 30 s → timestamp row → 8 GB is nothing → absence = offline → who deletes? (cron's cost) → store TTL → which store (weak reasons, then who runs it / lock-in / next year / push on expiry, written verdict) → 6M writes/min → where one write's time goes → pool → pool budget, spike → same pattern = failure detection → hand-off (disposable data vs data people care about; method carries over) → delete semantics → lifecycle, staggered hard delete → when delete must be real → slow home page: row contents, date formats, Redbus → viral post: what a cache is, shared cache, table as cache → what you can now do → homework that Lecture 2 opens with (linked).

## Figures

- **Added** `site/src/figures/lec04/so-far.tsx`: `SoFarDot` (stages 0–5) and `SoFarBlog` (stages 0–3), desk 640 + phone 330 layouts, kit only. Each chapter opens on the design *as it stands*, with the piece the previous chapter added on a blue wash marked "new" (so the map never spoils the chapter's own reveal). The final stages close each build (5.4 and 8.4).
- **Kept**: WhatUserSees, FourCallsOrOne, UsersPush, TwoCallsNotEnough (stepper), PulseTable, HowBig, WhoDeletes, FeedingCompetitor, HearingExpiry, PoolQueue, ThreeFour (stepper), PoolBudget, HeartbeatsReused, BlogSchema, DeletedLife, LongShortText, ThreeDates (rows corrected: native types are compact binary, not "heavy"), EpochLine (dropped "said as 2032"), WhatACacheSaves, YourTurn; all four clips.
- **Dropped from the page**: NotationKey + LectureMarks legend, TwoWaysToBuild, PropertyFirst, PeriodicPulse (duplicate of stepper step 5), NeverReinvent (slogan), BrainstormTable (misread tick), CrashCost, ThreeMissedFactors (slogan), RoomToGrow, WriteLoad (replaced by a pause), FiveTrips stepper + ConnectionPool (duplicate of Clip 4·1), StartConservative (slogan), FourResources, SixTopics, TreeDelete (taught a correction), ThreeQuestions (slogan), ErasedData, TwentyOrFour, OneCacheThreeServers (duplicate of the cache-aside clip), HashVsTree, CompressWhere, ThreeThingsSaved, TwoBuilds (superseded by so-far). Files `s1-approach.tsx` and `s7-keep.tsx` deleted (nothing imports them); other unused exports left in place.
- Desc/label text fixed so no figure says "class", "board", "as taught", "redrawn" (s2a, s3, s4a, s4b, s5a, s5b, s6).

## Cut, and why

- Course admin, spiral vs incremental as a chapter (two sentences remain in 1), "property before the tool" folded into 1.1.
- All SourceNote "More precisely"/"Since the class" boxes: the correct fact is stated once in the text (AOF everysec ~1 s, DynamoDB TTL lag + `expires_at`, 2038, MySQL DATETIME 5 B / 1000–9999, row storage, TOAST/InnoDB, Walmart hybrid, Amazon Food closed 2022, GDPR deadlines and backups).
- B+ tree soft-delete argument (engines defer deletes; the claim would need a retraction), HTTP keep-alive/QUIC aside (one direction/NAT sentence remains), Redis licence/Valkey, DB convergence, Aerospike, Debezium detail (→ one Go deeper), RDS formulas, EC2 conntrack, 30k-connections homework, HikariCP details beyond one sentence, "only four things" as its own section (one paragraph in 5.1), Atlassian outage, compliance-hacks framing, time-zone war story box, materialized-view timings, indexes-on-disk Q&A, compression (→ Go deeper), forward chips (≤1–2 LectureLinks per chapter instead).
- Class timestamps in meta, NotationKey, SectionEnd "concepts" lists, per-chapter Check-yourself blocks (replaced by one set of 4 recall questions at the end).
- `[[L-…]]`/`k=` tags kept on retained content; no coverage gate run.

## Shared-file change (smallest additive)

The page templates hard-coded "From a live whiteboard class" (overview meta) and "written from the class recording and board…" (every footer), which the brief's grep forbids. Added two **optional** frontmatter fields in `site/src/content.config.ts`: `origin` (overview meta) and `footnote` (footer text), read with the old text as fallback in `site/src/pages/lectures/[id]/index.astro` and `[chapter].astro`. Other lectures are unchanged.

## Self-check

- `pipeline/bin/site.sh build lec04`: ok (12 pages). `links lec04`: zero broken. `figures lec04`: ok at 360/390/768/1440, light + dark.
- QA screenshots: `lectures/lec04/story/shots/` (1440 + 390, light + dark, no failures). Looked at: overview top (1440, 390), ch3 top, ch4 phone top (so-far), ch5 top, ch6 top, ch7 phone top, ch8 end.
- Titles alone: still green? → who deletes the silence? → two stores pass, which one? → six million heartbeats a minute → the spike adds twenty servers, why nothing? → a writer deletes by mistake → the home page is slow → one post goes viral. Reads as the story.
- grep of every built page's text (HTML stripped, incl. SVG desc) for instructor|in class|the class|the board|as taught|lecture's view|More precisely|student: **0 hits**.
- PauseAndThink: answers are hidden until a choice is clicked (component sets `answer.hidden`); the paragraph after each was checked not to restate the answer (2.2 rewritten for this).
- Go deeper boxes: at most one per chapter (MarginNote, collapsed), each under 120 words. Cite links ≤3 per chapter.

## Unsure

- Ch8 is at the 1,800 ceiling counting the hidden recall answers.
- The verdict in 3.5 ("managed Redis; DynamoDB for a tiny AWS-only team") combines the lecture's L-0311 and L-0139/L-0140; it is a stronger single recommendation than the class gave.
- The Goldman Sachs story is told as "a large bank".

## Revision 2 (after review_reader.md and review_facts.md)

- **Blog half is one story, the blog's first month:** ch6 opens on the midnight mistaken delete, places the six topics on the course map, and ends with "three weeks in, the home page gets slower". Ch7 now shows the version-1 home-page query (`SELECT *`, `published_at` stored as text), names its two costs, fixes each (body out of the row + a short `excerpt` column and selecting only what the list shows; a native or epoch `published_at`), and shows version 2. Redbus and the date trade-offs follow. Ch8 picks up "one post goes viral". The ch7 contradictions are fixed: native types are compact; YYYYMMDD beat Redbus's own column; excerpt vs body.
- **Spoilers:** ch4 is now "The table is tiny. Why is the store struggling?" (slug `4-tiny-table`). Ch5 is now "A spike hits and autoscaling adds twenty servers. What do they get?", and 5.2 is "Ten servers, one budget, and a spike". The dek, hook, Build 1/2 paragraphs and all chapter blurbs no longer give answers. The ch1 stepper moved to 1.4, after the fix is introduced. The Fig 2·c (8 GB/800 KB) figure moved to 2.3. The Fig 5·b caption is neutral. 8.1 is now "What counts as a cache?".
- **Faithfulness:**
  - §3.5 verdict is two-sided, and the lean-team route leans to DynamoDB ("throw money at AWS… extended engineering team").
  - §3.1 speed is restated around persistent connections, consistent with §3.4.
  - §3.2 availability carries the product caveat. Netflix is reworded.
  - Ch1 Go-deeper: persistent connections still detect death through silence (keep-alive pings). The Lecture 4 link text now says Slack messaging.
  - The 10 s/30 s reason is reworded. The TTL "forever" caveat is fixed in the Clip 2·1 caption and the recall answer.
  - Pool "15" is described as a common practice.
  - The unsupported "many teams…" claim is removed. The zones and custom-format sentences are hedged.
  - Fig 2·b now shows an upsert, `now`, and the batch endpoint. Fig 2·c no longer says "see 2.7".
- **Ch4–5 store:** both say plainly that they follow a classic relational database such as PostgreSQL. The Fig 4·a caption matches the two-sided choice. The 100k → 1M online users jump is bridged. "Five trips" is broken down (3 + 2). The duplicate PoolQueue figure is dropped.
- **Restored ideas:**
  - Open source vs proprietary, as the reason for the comparison (3.3).
  - Scale the database up, then shard (5.3, links Lecture 2).
  - The six topics as the course map (ch6 intro).
  - Spiral vs incremental named in two sentences (ch1 intro).
- **Cut:** the interview aside (6.3), "go deep" sermon (3.4), the orphan hiring line (folded in), GDPR detail (moved into the ch6 Go-deeper), the "table in a figure" line, and the 3.4 repeat of DynamoDB TTL lag.
- **Cross-lecture note (not edited, out of scope):** lec02, lec06 and lec07 link to lec04 `#s2`, `#s3` and `#s4-4`. All still resolve to matching content. lec02 quotes the old §3 title "Redis or DynamoDB?".
- **Re-checked:**
  - build ok; links: zero broken; figures ok at 360/390/768/1440 light+dark.
  - QA screenshots re-shot into `shots/`, no failures. Looked at ch6 phone top and ch7 desk top.
  - Banned-word grep over every built page: 0 hits.
