# Lecture 06 (lec03): content fixes

Files edited: `site/src/content/lectures/lec03.mdx`, `lec03/s0-header.mdx`, `s1`, `s2`, `s3`, `s4`, `s5a`, `s5b`, `s6`, `s7`, `s8`, `s9` MDX parts, and figure text (labels, title/desc only) in `site/src/figures/lec03/s1-why-own-ids.tsx`, `s2-building-getid.tsx`, `s3-order-and-clocks.tsx`, `s4-id-size.tsx`, `s6-snowflake-figs.tsx`, `s7-instagram-figs.tsx`, `s9-keep-figs.tsx`.

Before each change, I checked it against `lectures/lec03/transcript/transcript.md`, the ledger and `board/board_log.md`. Every new outside fact has an inline `<Cite>` to a page I opened in this round: RFC 9562 §8, MySQL `replication-options-source`, `integer-types` and `insert-on-duplicate`, Discord's developer reference, and Instagram's "Sharding & IDs at Instagram" post.

Verification:
- Build: `pipeline/bin/site.sh gates lec03 lectures/lec03/qa/gates_content_fix.txt`. Result: build ok, 13 pages.
- Coverage: 314/314 placed ids on the pages, `COVERAGE PASS`. Links: zero broken. Figures: ok at 360/390/768/1440, light and dark. Last line: `GATES PASS`.
- Tags: no `[[L-…]]` or `k=` tag was removed. Two new tags were added where new text teaches an item: `[[L-0150]]` on the s4 opener and `[[L-0210]]` on the new §6.7 board list.

## 1. Blind exam (exam_grade.json)

| Q | Change |
|---|---|
| Q039 | `s3-order-and-clocks.mdx` §3.7. The conclusion paragraph now opens: "The lesson the class board boxed: “There is no way to distribute and guarantee strict monotonicity.”" `[[L-0081]]` (board S40, 00:42:27). The next paragraph now reads: "So, as the board put it, the solutions we see out there have relaxed constraints, in two directions: **non-integer IDs**, and **no monotonicity**, because not everyone needs monotonicity." `[[L-0082]]`. The "super complicated" line stays where it belongs: it is the S39 board text about gossip. |
| Q100 | `s6-snowflake.mdx` §6.7 now opens with the board list (S78/S79, 01:55): "no moving part; no service; just a function call (a library); no extra load on the database. The logic is handled by the API servers, which the board called excellent." `[[L-0210]]` |

## 2. Faithfulness audit (faithfulness.json)

| id | Change |
|---|---|
| F-001 | `s9-keep.mdx:43`: now says "The class deferred the question from §3.1 … and did not come back to it. `[[L-0090]]`". The deciding factor that follows is marked "the inference from here is this page’s own", and "will do" was softened to "may do". `s3:45` now reads "deferred, and the class did not come back to it"; §9.1 is pointed to as what the rest of the lecture gives you, not as what the lecture said. |
| F-002 | `s4-id-size.mdx:25`: "So why did Flickr, Twitter and Instagram, the case studies that follow, all stay away from it? `[[L-0150]]`". The s4 dek and the `lec03.mdx` chapter-4 summary now say "The companies after Amazon in this lecture still turned it down". The s3 hand-off was changed from "the big companies still say no" to "the companies that follow still stay away from it". |
| F-003 | `s7-instagram.mdx` Fig 7·b caption: "The class sketched thousands of them on “say, 10 or 15” servers; Instagram’s post says only “far fewer” physical servers." The §7.3 structure line is now "as the class sketched it … (“say, 10 or 15”; the exact count could not be checked, and Instagram’s post says only “far fewer” …)" with a Cite to the Instagram post, which I opened; it gives no server count. In `s7-instagram-figs.tsx`, the desc reads "(10 to 15 in the class’s example)" and the label reads "say, 10–15 of them". Tag `[[L-0276]]` kept. |
| F-004 | `s0-header.mdx:21`: "This page follows that announced order. Against the order actually taught it makes three moves: … (asked at 00:45) …, ID size (taught inside the Amazon case) …, and pagination, taught right after Twitter, comes after Instagram as announced." `[[L-0100]]` |
| F-005 | `s5a:108`: removed the unsourced "usually replicated or run as a pair … off the hot path" claim. In its place is a plain untagged bridge: "One database is also one box that can fail. Flickr’s design in section 5.7 runs two for exactly that reason." |
| F-006 | `s5a:116`: the signed 2.1 billion parenthesis now carries a Cite to dev.mysql.com integer-types, which I opened (INT signed max 2147483647, unsigned max 4294967295). |
| F-007 | `s7`: "uses **stored procedures** (the class called it PL/SQL) … Instagram’s is a function written in PL/pgSQL, Postgres’s procedural language (§7.1). `[[L-0277]]`" |
| F-008 | `s3:234`: "after a couple of critical questions it often turns out otherwise" `[[L-0086]]`. This keeps the hedge, which matches the garbled audio at 00:44:20. |
| F-009 | `s5a:43`: "which the class rated among the best ways to get performance out of any system (the exact words are lost in the recording). `[[L-0103]]`". Habit 5 in `s9:78` now reads "the class rated batching among the best ways…". |
| F-010 | `s2:194`: "Only the long ID might become a problem, though not a big one, and that cost…" `[[L-0039]]` |
| F-011 | The transcript at 00:09 says m2's threads are "T1 and T3", so Fig 2·b now draws m2 as `t1 · t3`, with `m2-t1-1729` and `m2-t3-1729` (labels in `s2-building-getid.tsx`, plus desc). The caption drops the "slip" remark and adds "(m2’s threads happen to be t1 and t3)". |
| F-012 | `s4` MarginNote: cut "The slow-query log and `EXPLAIN` … are the other usual first checks." |
| F-013 | `s6` §6.7: "In the lecture’s view, good engineers don’t start there: …" `[[L-0241]]` |
| F-014 | `s5a:45`: "That database is a classic relational one; in the class’s telling no fancy non-relational store is needed, and the instructor prefers not to complicate things. `[[L-0106]]`" |
| F-015 | `s3` MarginNote (L-0064): "Rather than resetting the clock, it disciplines it…" became "Besides setting the clock, it can discipline it…". It now reads as an addition next to the taught point, not a rebuttal. The ntp.org Cite is kept. |
| F-016 | `s4` SN-07 (OWASP note): added "RFC 9562 itself says implementations “SHOULD NOT assume that UUIDs are hard to guess”" with a Cite to rfc-editor.org. I opened §8 to confirm the quote. |
| F-017 | `s5b` SN-10: cut the unsourced "an explicit `id = id + 1` does not [honour step/offset]". Added the listed source as a Cite to dev.mysql.com insert-on-duplicate, which I opened: "a duplicate on the unique key turns the insert into an UPDATE of the old row". Also added the sourced statement that auto-increment values follow the server's step and offset, with a Cite to replication-options-source (opened). |
| F-018 | `s5b` SN-11: "dynamic MySQL variables" now has a Cite to replication-options-source, which I opened ("Dynamic: Yes"). The note now says "the process restart described above is one way to do it, not the only one", so it no longer contradicts the taught restart at :156 (L-0185). |
| F-019 | `s1:87`: "A central ID service is an evolution you reach later. `[[L-0010]]`". The RuleBox reads "A central ID service comes later in the evolution." The FunctionFirst label is now "later", and its desc reads "an evolution that comes later". |
| F-020 | `s2:198`: "the class said it comes in handy at two different places. On this page those are the next section and Amazon’s ID service in section 5.2. `[[L-0041]]`" |
| F-021 | `s3:246`: "The catch raised in class: with UUIDs you lose ordering. The answer: you get some, you lose some. `[[L-0093]]`" |
| F-022 | `s7:32`: "The lecture learned it from a blog post (Instagram’s own engineering post, with a Cite to instagram-engineering.tumblr.com, which I opened)". `[[L-0255]]` |
| F-023 | `s8:52`: "Picture the kind of job the class described for Twitter: iterating through every tweet…" `[[L-0226]]` |
| F-024 | `s9:92`: ForwardChip `when="from Lecture 7"`. Per `course_order.md`, week 4 is Lectures 7 and 8. |
| F-025 | `s9-keep-figs.tsx`: moved `flickr tickets · §5` to the "a central service" stop. DESC: "In a central service: the single ID server, Amazon ranges and Flickr’s ticket servers. Inside the database: auto-increment and Instagram next_id()." |
| F-026 | `s4` Fig 4·c caption: "Redrawn from the class board at 01:11 (D-13)." This matches `diagrams.md` D-13 (01:11:00). |

## 3. Design critique, content-owned (critic.json --owner content)

| id | Change |
|---|---|
| C-02 | Discord's docs (opened) list the timestamp as bits 63 to 22, which is 42 bits and includes Twitter's unused top bit. In `s6-snowflake-figs.tsx` the Fig 6·d label is now plain "epoch 2015", with no "(discord)", and the desc reads "the same 41 bits from a 2015 epoch (Discord’s start)". The caption adds: "Discord’s docs count one more bit, which stretches it further (see below)". The Discord paragraph now reconciles the two: "The 42 is not a contradiction of the 41 above: Discord’s table counts the timestamp from bit 63, the top bit Twitter leaves unused … Kept as 41 … to about 2084; using that 42nd bit doubles the range, to about 2154." Check-yourself answer 2 adds the same note. `[[L-0239]]`, `k=` on the figure kept. |
| C-03 | Removed narration of the recording or teacher where it carried no content. In s1, the "(The recording garbles…)" aside is gone, and a hedge is kept as "roughly". "raised in class" became "One fix:", "One idea:" or "Another idea:" (s1, s2 ×2, s3 §3.7, s5a §5.4), "A tempting idea:" for the refuted round-robin proposal (s6), and "as one summary goes:" (s6). The §4.3 note now reads "The instructor’s first check on a slow database is index size." In §5.2: "This design comes first-hand: the team that built Amazon’s ID service worked right next to the instructor…". The §8 benchmark is now "A quick 2016 benchmark by the instructor… compared…". The board-crossed "8 and 9" aside is gone (see C-09). The fig-3-2 label is now "strictly monotonic". **Kept on purpose**, because the faithfulness audit and the brief require attribution: the instructor's first-hand accounts (L-0101, L-0139, L-0221); "The lecture describes it as living on the heap" (the fact-check policy keeps the teacher's point beside the cppreference correction); "As worked out in class" in SN-12 (the audit approved this attribution); and "The catch raised in class" (F-021). |
| C-08 | In `s4-id-size.tsx`, the Fig 4·a labels "1 GB" / "~4 GB" now read "8 B per entry" / "20 B per entry". The footnote reads "the id grows ~4× vs an INT (~2× vs a BIGINT); the whole entry 8 B → 20 B, ~2.5×", and the phone footnote has two lines with the same content. The desc states both the per-entry growth and that 1 GB → 4 GB is the lecture's rough estimate. The §4.2 prose keeps the teacher's 1 GB → 4 GB `[[L-0135]]` and its adjustments sentence now adds "a 4-byte `user_id` keeps an entry at 8 → 20 bytes, about 2.5×". |
| C-09 | `s2` §2.6: "Some integers are never handed out: here, `m1-09`. (The lecture spoke of losing both 8 and 9, but in this example 8 went out before the crash, so only 9 is unused.)" `[[L-0046]]`. The transcript (00:24) has "we never used 8 and 9 … we lost those two values", so the teacher's words are kept, attributed, and reconciled with Fig 2·d and Clip 2·1. |
| C-10 | `s5a` Fig 5·a caption: "a green tick marks a server that holds a range". |
| C-14 | `s3` §3.5 PauseAndThink: the option now reads "No: the clocks disagree". The verdict texts are unchanged and still match. |
