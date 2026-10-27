# Course-wide consistency pass, Lectures 1–9

Course order: L1 lec04 · L2 lec01 · L3 lec05 · L4 lec02 · L5 lec08 · L6 lec03 · L7 lec09 · L8 lec06 · L9 lec07 · L10 lec10.
Scope: `site/src/content/lectures/<id>.mdx` and `<id>/*.mdx` for lec01–lec09. No lec10 file was edited.

## Edits

Paths are relative to `site/src/content/lectures/`.

### Lecture 1 (lec04): 4 edits
- lec04.mdx:3: `kicker: "Lecture 01 · …"` → `kicker: "Lecture 1 · …"` (zero-padded old number)
- lec04.mdx:5: `description: "Lecture 01: …"` → `description: "Lecture 1: …"` (zero-padded old number)
- lec04.mdx:114: `{/* Lecture 01 (lec04) overview page …` → `{/* Lecture 1 (lec04) overview page …` (zero-padded, source comment)
- lec04/s0-header.mdx:4: `{/* Lecture 01 (lec04) overview body …` → `{/* Lecture 1 (lec04) overview body …` (zero-padded, source comment)

### Lecture 2 (lec01): 2 edits
- lec01.mdx:93: `{/* Lecture 02 (lec01) …` → `{/* Lecture 2 (lec01) …` (zero-padded, source comment)
- lec01/s0-header.mdx:7: `{/* Lecture 02 (lec01) …` → `{/* Lecture 2 (lec01) …` (zero-padded, source comment)

### Lecture 3 (lec05): 4 edits
- lec05.mdx:3: `kicker: "Lecture 03 · …"` → `kicker: "Lecture 3 · …"` (zero-padded old number)
- lec05.mdx:5: `description: "Lecture 03: …"` → `description: "Lecture 3: …"` (zero-padded old number)
- lec05.mdx:124: `{/* Lecture 03 (lec05) …` → `{/* Lecture 3 (lec05) …` (zero-padded, source comment)
- lec05/s0-header.mdx:7: `{/* Lecture 03 (lec05) …` → `{/* Lecture 3 (lec05) …` (zero-padded, source comment)

### Lecture 4 (lec02): 3 edits
- lec02.mdx:5: `description: "Lecture 04: …"` → `description: "Lecture 4: …"` (zero-padded old number)
- lec02.mdx:139: `{/* Lecture 04 (lec02) …` → `{/* Lecture 4 (lec02) …` (zero-padded, source comment)
- lec02/s0-header.mdx:3: `{/* Lecture 04 (lec02) …` → `{/* Lecture 4 (lec02) …` (zero-padded, source comment)

### Lecture 5 (lec08): 4 edits
- lec08.mdx:3: `kicker: "Lecture 05 · …"` → `kicker: "Lecture 5 · …"` (zero-padded old number)
- lec08.mdx:5: `description: "Lecture 05: …"` → `description: "Lecture 5: …"` (zero-padded old number)
- lec08.mdx:111: `{/* Lecture 05 (lec08) …` → `{/* Lecture 5 (lec08) …` (zero-padded, source comment)
- lec08/s0-header.mdx:7: `{/* Lecture 05 (lec08) …` → `{/* Lecture 5 (lec08) …` (zero-padded, source comment)

### Lecture 6 (lec03): 2 edits
- lec03.mdx:135: `{/* Lecture 06 (lec03) …` → `{/* Lecture 6 (lec03) …` (zero-padded, source comment)
- lec03/s0-header.mdx:5: `{/* Lecture 06 (lec03) …` → `{/* Lecture 6 (lec03) …` (zero-padded, source comment)

### Lecture 7 (lec09): 2 edits
- lec09.mdx:125: `{/* Lecture 07 (lec09) …` → `{/* Lecture 7 (lec09) …` (zero-padded, source comment)
- lec09/s0-header.mdx:8: `{/* Lecture 07 (lec09) …` → `{/* Lecture 7 (lec09) …` (zero-padded, source comment)

### Lecture 8 (lec06): 0 edits

### Lecture 9 (lec07): 3 edits
- lec07.mdx:124: `{/* Lecture 09 (lec07) …` → `{/* Lecture 9 (lec07) …` (zero-padded, source comment)
- lec07/s0-header.mdx:3: `{/* Lecture 09 (lec07) …` → `{/* Lecture 9 (lec07) …` (zero-padded, source comment)
- lec07/c9-a-box-dies.mdx:125: `…you build two storage engines out of nothing but files on a disk.` → `…you build two storage engines out of nothing but files: one read from S3, one appended to a cheap disk.` (hand-off to Lecture 10: its first build is one file on S3, not on a local disk; lec10 overview "Build 1, a dictionary on S3" / "Build 2, a key-value store on cheap disks")

Total: 24 edited lines (L1 4, L2 2, L3 4, L4 3, L5 4, L6 2, L7 2, L8 0, L9 3).

## Checked and left alone

- Every `Lecture N` mention, `<LectureLink>` and its number in lec01–lec09 matches the course order. There are no `<ForwardChip>` uses left in lec01–lec09.
- All 19 `sec="…"` targets exist as `<Section id>` in the target lecture and land on the matching topic
  (lec05 s9-3 range shards, s5 key-value store, s8 in memory; lec04 s1-3, s2, s3, s8-2, s8-3; lec01 s3-4, s3-7, s4-2, s5;
  lec07 s5-5, s6-4, s8; lec06 s4-3; lec08 s1).
- Each claim about another lecture's content was checked against that lecture's current page (e.g. L2 at-least-once and
  partition keys by `user_id`, L3 "relational databases grew up around money", L1's AOF flush-once-a-second note, L4's
  Redis Pub/Sub at-most-once, L5's `SET … NX`, L7's `instacdn.net` and derive-don't-store rule, L8's `photo_updated`
  event on Kafka). No false claims found.
- Leftover grep (`instructor|in class|the class|the board|as taught|lecture's view|More precisely|student|teacher|yesterday|cohort`):
  no hits in lec01–lec09 page text except `cohort` in lec02/c4-graphs.mdx, where it is the technical term (collaborative
  filtering cohorts), not a class leftover.
- Not edited (figure, outside the brief): `site/src/figures/lec06/s5a-badge.tsx:220`, an accessible figure description,
  says "The board’s separate newly_unread_count is struck out". It is read by screen readers. Suggested fix:
  "A separate newly_unread_count is struck out". Several other figure files have "board" only in code comments.

## Hand-off verdicts

1. **L1 → L2 (lec04 → lec01): consistent.** L1 ends (8.5) on the where-else-could-you-keep-a-copy homework and names
   L2's four topics; L2 opens with that homework (chapter 1) and its recap (viral post, one shared cache, three API
   servers) matches L1 chapter 8.
2. **L2 → L3 (lec01 → lec05): consistent.** L2 ends on the claps fixed by an atomic DB update and points to the airline
   check-in and a key-value store on MySQL; L3 opens with exactly that, and its recap (lost clap, lock, database
   guarantees) matches L2 chapter 4.
3. **L3 → L4 (lec05 → lec02): consistent.** L3 ends on "what did Redis and DynamoDB give up", naming the four families
   and Slack; L4's recap quotes the same question and the A–M / N–Z range split.
4. **L4 → L5 (lec02 → lec08): consistent.** L4 ends on the never-opened load balancer, starting from one process that
   copies bytes between two connections; L5 opens exactly there. L5's recap is a cross-course recap rather than
   L4's ending, but "every lecture so far has drawn this box without opening it" covers it.
5. **L5 → L6 (lec08 → lec03): consistent.** L5 ends on two masters both handing out order 3; L6 opens on the same
   picture and its recap says L5 "ended on exactly the picture above".
6. **L6 → L7 (lec03 → lec09): consistent.** L6 ends on CDN, uploads, private photos and hashtag pages; L7 covers all
   four, and its recap of L6 (a 64-bit, time-sorted ID made inside the database) matches.
7. **L7 → L8 (lec09 → lec06): consistent.** L7 ends on "the CDN resized your photo, who wrote that code?" and previews
   Gravatar, tags and the badge; L8 opens with those three and quotes the same question.
8. **L8 → L9 (lec06 → lec07): consistent.** L8 ends on two copies of the blog's data (analytics, then the cache from the
   inside); L9's two parts are exactly those, and its recap lists L8's Redis uses accurately.
9. **L9 → L10 (lec07 → lec10): consistent after one edit.** L9's closing now says Build 1 is read from S3 and Build 2 is
   appended to a cheap disk, as lec10's current overview describes. lec10's "Where you are" describes L9 accurately
   (hash table in memory, a ring of nodes, an AOF that only mattered after a restart). L9's closing says L10 "starts
   with a terabyte dictionary"; lec10's overview now opens with an old-orders-on-S3 hook before the dictionary. That
   still reads true, because chapter 1 starts with the dictionary, so it was left as is.
