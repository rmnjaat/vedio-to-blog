# Lecture 03 (lec05): faithfulness audit

Scope: the page parts `site/src/content/lectures/lec05.mdx` and `lec05/*.mdx`, the figure texts in `site/src/figures/lec05/*.tsx`, and the clip captions and alt texts in `site/src/animations/clips/l05-*/timeline.ts`. They were checked against `lectures/lec05/ledger/ledger.jsonl` (using the `[[L-xxxx]]` and `k=` tags), `transcript/transcript.md`, `lesson/factcheck_applied.md` with `factcheck/final.jsonl`, and `board/diagrams.md`. Course cross-references ("Lecture 1/2/5/9…") were checked against `lectures/course.json`. No site files were edited.

## Summary

| Kind | Count | Medium | Low |
|---|---|---|---|
| Distortion | 6 | 1 | 5 |
| Invention (untagged and unsourced) | 5 | 1 | 4 |
| Fact-check application | 3 | 0 | 3 |
| Voice | 0 | 0 | 0 |
| Figures | 3 | 0 | 3 |
| Clips | 2 | 0 | 2 |
| **Total** | **19** | **2** | **17** |

There are no high-severity issues.

**Coverage.** Every block of every part was read: 100%. The counts are the prose and component blocks in each file.

| Part | Checked |
|---|---|
| s0 header | 8/8 |
| s1 locks | 129/129 |
| s2a check-in | 38/38 |
| s2b check-in | 85/85 |
| s3a KV store | 58/58 |
| s3b KV store | 66/66 |
| s4 Redis expiry | 48/48 |
| s5 distributed | 44/44 |
| s6 keep | 42/42 |
| SourceNotes (SN-01 to SN-15) | 15/15 |
| Inline clarifications | 22/22 |
| Figures (Figures, StepThroughs, rule-box sketches) | 29/29 |
| Clips | 4/4 |

**Fact-check application.**
- All 15 SourceNotes are present and placed right after their point.
- The teacher's point is kept beside every SourceNote. Examples: L-0010's 2012, Ignite "built on a relational DB", DynamoDB "always soft-deletes", the classic 25% Redis rule, and "Redis is single threaded".
- All 22 inline clarifications are present, including the L-0255 "not independently verified" hedge and the L-0263 no-TTL catch.
- All 29 unverifiable items are attributed ("in the instructor's estimate", "his figure", "his recollection") and none is "corrected".
- Remaining fact-check gaps are small. Three listed sources are not linked (SN-02 Oracle, SN-06 isolation-levels, SN-07 innodb-locking and sql-select). SN-07's LIMIT clause cites the wrong PostgreSQL page. The L-0080 addition doesn't use the verified wording.

**Voice.** No student names, "Student N" or "asked by" anywhere on the page. Student proposals are framed as "a prediction", "one proposal from class" or "the class's own summary", and the verdicts match the ledger status (endorsed, open, proposed_then_corrected). One candidate was checked and is not an issue: "They can't handle big data, the instructor agreed" (s2b:160) matches the transcript ("I agree to that", 01:06:36).

**Figures and clips.** Board redraws match D-01 to D-10: the deadlock cycle, the shared and exclusive lock rows, the schema, the architecture, the store table, the cron timeline, the replicas and the range shards. The deadlock clip kills the transaction that closes the cycle, as taught (L-0033). The issues found are an untaught second transaction in Fig 2·g, an ambiguous replication arrowhead, an extra seat row in the schema redraw, and two clip lead questions that don't match their clips.

### Most serious

1. `s2b-check-in.mdx:87` (also :71, :95), Distortion, medium. The approach 4 mechanism is explained only through PostgreSQL, where REPEATABLE READ raises an error. The class demo ran on MySQL at its default REPEATABLE READ and filled 120/120 on every run. MySQL's behaviour needs adding.
2. `s6-keep.mdx:119`, Invention, medium. "Each of these was deferred in class on purpose" covers two course-map items (Lecture 5 distributed locks, Lecture 6 ID service) that were never mentioned in class.
3. `s2b-check-in.tsx:168` with the Fig 2·g caption, Figure, low. A second "status = BOOKED → commit" transaction is invented. The class only said "split into multiple phases" and deferred the rest to flash sale.
4. `s1-locks.mdx:333`, Invention, low. "No mainstream database defaults to [serializable]" overgeneralises a fact-check that covers only MySQL and PostgreSQL.
5. `s2b-check-in.mdx:52`, Distortion, low. The instructor's probing question ("why would it wait on the first row?") is reversed.

Issue format: **[KIND] severity** `file:line`, then the problem, the evidence and the fix.

---

## s0 Header

No issues. The "Where we are" claims about Lecture 2 (the clap race, promised depth) and Lecture 1 (soft delete, online indicator) match course.json and the lec01 page (ForwardChip "optimistic and pessimistic locking, in depth").

## s1 Locks

- **[Invention] low** `s1-locks.mdx:333` (F-003). "So no mainstream database defaults to it" goes beyond the fact-check, which covers only InnoDB and PostgreSQL; CockroachDB, for one, defaults to SERIALIZABLE. Evidence: factcheck_applied.md L-0100/L-0104. Fix: "so neither MySQL nor PostgreSQL defaults to it (MySQL uses repeatable read, PostgreSQL read committed)."
- **[Invention] low** `s1-locks.mdx:210` (F-013). "pools of seats and coupons": "coupons" is in neither the cited docs nor the class. Fix: "like job queues or a pool of seats."
- **[Factcheck] low** `s1-locks.mdx:172` (F-015). SN-02 doesn't link its listed Oracle source, and SN-06 (`:373`) doesn't link innodb-transaction-isolation-levels.html. Fix: add the two `<Cite>`s (exact text in the JSON).

## s2 Check-in (s2a, s2b)

- **[Distortion] medium** `s2b-check-in.mdx:87` (also :71, :95) (F-001). The PostgreSQL-only REPEATABLE READ error is presented without MySQL's behaviour. The demo ran on MySQL at REPEATABLE READ and succeeded on every run. Evidence: L-0065, L-0112, L-0115. Fix: add "In MySQL, where the demo ran at its default REPEATABLE READ, a locking read always reads the latest committed version, so the waiter re-checks and moves on exactly as in the run (dev.mysql.com innodb-locking-reads); the error is PostgreSQL's behaviour."
- **[Invention] low** `s2b-check-in.mdx:32` (F-004). PostgreSQL-doc comments sit inside the MySQL demo's code block. Fix: remove them from the code and keep line 36 as prose, prefixed "PostgreSQL's documentation adds two details for that engine:".
- **[Distortion] low** `s2b-check-in.mdx:52` (F-008). "The question of why it wouldn't wait on the first row" reverses the instructor's "Why would it wait on the first row?" (00:52:04). Fix: "The instructor asked why it would wait on the first row at all, then set the question aside for later…"
- **[Factcheck] low** `s2b-check-in.mdx:59` (F-014). SN-07's LIMIT clause cites transaction-iso.html; its source is sql-select.html (verdict_review). innodb-locking.html is not linked. Fix: re-cite as in the JSON.
- **[Distortion] low** `s2a-check-in.mdx:131` (F-006). All 120 on one seat is the extreme (worst) case of the bug, not its "best case" (L-0090). Fix: "The extreme case is simple to state."
- **[Factcheck] low** `s2a-check-in.mdx:86` (F-007). The goroutine addition isn't A-KSD-20 (goroutines share one address space and are multiplexed onto a few OS threads), and it adds the unsourced "cost almost nothing to simulate". Fix: use A-KSD-20's wording and drop that sentence.
- **[Figure] low** `s2b-check-in.tsx:168` with the caption at `s2b-check-in.mdx:248` (F-005). Fig 2·g invents a second "status = BOOKED → commit" transaction and the caption's "two short transactions". The class said "acquire the lock for that moment… put on hold… split into multiple phases" (01:24:33) and deferred the rest to flash sale (L-0135). Fix: relabel it as a later phase covered with flash sale.
- **[Figure] low** `s2a-check-in.tsx:13` (F-019). Fig 2·a is captioned "redrawn from the class board" but adds a 1F/NULL row that isn't on the board (D-04 has 1A–1E). Fix: say so in the caption.

## s3 KV store (s3a, s3b)

- **[Distortion] low** `s3a-kv-store.mdx:42` (F-011). The board's five parts are mapped onto sections that don't match (3.3 is TTL, 3.6 is GET), and the claim "follows them in order" is not accurate. Fix: list the board's five parts, then the order the class actually took.
- **[Invention] low** `s3b-kv-store.mdx:106` (F-012). The class said only "two optimizations in weeks 5 and 6". The names ("in-memory store", "append-only store") and "weeks 5 and 6 = Lectures 9 and 10" come from the course map. Fix: say the class promised two for weeks 5–6 without naming them, then give the course's Lectures 9 and 10 as this course's equivalents.
- **[Clip] low** `s3b-kv-store.mdx:212` (F-016). The Clip 3·1 lead (expires 12:00, cron 12:07, GET 12:03) doesn't match the clip (12:02, 12:10, 12:04). Fix: align the lead with the clip.

## s4 Redis expiry

- **[Distortion] low** `s4-redis-expiry.mdx:35` (F-009). The reason given is that "finding the key expired" is cheap. In class the reason was that the delete is cheap, because nothing has to be restructured (02:10:10). Fix: "since deleting it doesn't require restructuring anything and so isn't expensive, it deletes it right there."
- **[Clip] low** `s4-redis-expiry.mdx:113` (F-017). The Clip 4·1 lead says "a million keys", but the clip shows an example population of 200 keys. Fix: "Keys with a TTL, about 30% of them expired…"

## s5 Distributed

- **[Figure] low** `s5-distributed.tsx:101` (also :123 and `s6-keep.tsx:33`) (F-018). The replication arrowhead lands on the master, which at a glance reads as data flowing into the master. Data flows from the master to the replicas (L-0275), and the board drew plain lines. Fix: point it master → replica and label it "replicates (async)", or keep the pull direction and label it "pulls changes from master".

## s6 Craft and keep

- **[Invention] medium** `s6-keep.mdx:119` (F-002). "Each of these was deferred in class on purpose" includes the untagged Lecture 5 (locks across machines) and Lecture 6 (central ID service) chips, which come from course.json crosslinks and not from the class. Fix: split the list into "deferred in class" (L-0358, L-0349) and "elsewhere in this course (not mentioned in class)".
- **[Distortion] low** `s6-keep.mdx:66` (F-010). The page says "signal" and "re-evaluate" are MySQL source words. The instructor said only "signals and all" (01:19:22). Fix: claim "signal" only, attributed.
