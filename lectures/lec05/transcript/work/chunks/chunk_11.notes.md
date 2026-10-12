# chunk_11 notes (lec05, 02:02:46-02:14:38)

## New technical terms / names (not in term_decisions)

- `select start from store` -> `select star from store` (SQL `SELECT *` read aloud; 02:06:50, 02:07:26, 02:07:29), WORD high. Candidate row for term_decisions: "star (SELECT *) <- start" in SQL-query context.
- `disk waste` -> `disk-based` (02:08:02, 02:08:12; "disk based database" said correctly at 02:13:46), TERM high. Candidate row: "disk-based <- disk waste".
- `ptl` -> `TTL` (02:03:20), TERM high (non-word; next to "you add ttl").
- `c c plus plus` -> `C, C++` (02:09:10), TERM high.
- `absurd set` (02:05:20) -> `upsert set`, medium: the teacher may mean Postgres `ON CONFLICT ... DO UPDATE SET`; the lead may prefer a flag.

## Flags left for the listener

- 02:03:09 `[?single node | asr: "single load"]` - "start a single load, no, don't think about distributed on day zero".
- 02:03:29 `soft [unclear: "built it"]` - probably "soft delete(d)" / "soft delete bit", not certain.
- 02:03:49 `[?ORM's life | asr: "orm slight"]` - "id column makes orm slight simple".
- 02:04:56 `[?margin | asr: "barge"]` - "slow down your system by a massive barge".
- 02:06:53-02:06:54 "Oh, sorry. Oh, sorry." two back-to-back segments - kept both, `[check: possible ASR duplicate]`.
- 02:07:32 `[?or | asr: "our"]` - "expired at our TTL is greater than now".
- 02:07:58 `[?performant | asr: "proper"]` - "make your database far more proper".
- 02:08:12 `[?reiterating | asr: "re-hydrating"]` - "warning i'm re-hydrating" (he says "i'm iterating it 100 times" at 02:09:53, kept as spoken).
- 02:08:52 `[unclear: "and what are."]` - "rebalance the binary tree and what are. hash table" (maybe "or a hash table" / "and whatnot").
- 02:09:03 `[unclear: "while i delete"]`; 02:09:10 `[?stuff | asr: "stop"]` (malloc/free aside).
- 02:09:47 `[unclear: "the side"]` - "If it found the side to be expired" (probably "the key").
- 02:12:05 `[unclear: "fii"]` - "you cannot run away from math fii".
- 02:13:32 `[?internals | asr: "interface"]` - "discuss a bit of Redis interface" ("Redis internals" said at 02:11:57).
- Not flagged, kept as spoken: 02:03:14 "think about distribute first ... make things forward" (odd but readable), 02:10:25 "a kind of a synchronicity" (maybe "asynchronicity").

## Speaker doubts

- none (all owned segments are TEACHER; continuous lecture).

## For the lead

- Paragraph starting at 02:12:50 (raw #2097, float 7969.54 = 02:12:49.5, shown rounded as 02:12:50) put the verifier block boundary on the wrong side of the segment and failed the 6.4% add check. I merged that paragraph into the 02:11:57 one and started the next paragraph at 02:13:16 instead. Same rounding risk exists anywhere a paragraph opens on a segment with start .5-.99 s near a 10-min block edge.
- Verifier reports 2 one-word drops (`ttl` 02:06:31, `redis` 02:09:23). Both words are present ("TTL. TTL," / "in Redis, Redis checked"). This looks like the verifier treating the repeated word across the segment seam as a stutter. No text was removed.
- Topic candidates: 02:02:59 KV store schema/storage, 02:04:38 put/upsert + locks, 02:06:29 TTL batch deletion, 02:08:02 lazy deletion, 02:11:57 Redis expiry sampling algorithm (topic map in term_decisions has "02:08 Redis expiry comparison").
