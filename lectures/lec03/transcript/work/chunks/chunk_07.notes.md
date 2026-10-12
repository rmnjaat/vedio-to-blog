# chunk_07 notes (lec03, 01:11:11-01:21:59)

## New technical terms / names not in term_decisions

- UID -> UUID rule applied also to lowercase/plural hits not listed by time in term_decisions: 01:15:20 "UIDs", 01:15:22 "UIDs", 01:17:05 "uids", 01:17:51 "UIDs" (all in the UUID index-size discussion; logged TERM high). Lead: confirm the rule covers lowercase "uid(s)".
- 01:16:29 "The UI is just fine." -> flagged `[?UUID | asr: "UI"]` (UI is a real word; context = small app, UUID acceptable).
- 01:13:18 "not just Rupert SQL" -> `[unclear: "Rupert SQL"]` (maybe "PostgreSQL" / "MySQL"; do not guess).
- 01:16:53 "counter for each chart" -> `[unclear: "for each chart"]` (MongoDB ObjectId counter; maybe "shard"/"process" — not decided).
- 01:18:57 "forexes your index" / 01:19:10 "in that forex" -> flagged `[?4Xes]` / `[?4X]` (teacher says "4X larger" 01:15:22). Candidate for a lecture-wide decision.
- 01:16:38 "96 bits log" -> `[?long]`; 01:19:20 "database pass" -> `[?fast]`; 01:19:25 "serial engineer" -> `[?senior]`, "stop in your" unclear (staff engineer?); 01:19:52 "bare minimum side" -> `[?size]`; 01:20:28 "getting varied" -> `[?queried]`; 01:14:53 "filing a particular query" -> `[?firing]`.
- 01:17:24 "New to see a lot of ID generation" -> `[unclear: "New to see"]` (You'll see?).
- Products named: MongoDB (12-byte IDs), Flickr, Facebook, MySQL — casing only.

## Speaker doubts

- 01:11:27 "Array, how my company is using UUID, are we inefficient at scale?" / 01:11:32 "Yes, you are." — all TEACHER label; reads like the teacher voicing a hypothetical student, or a real student question with teacher answer. Kept Teacher + `[check: ...]`; "Array" flagged `[?Arre]`.
- 01:15:12 "Now, you're just over-exaggerating." — teacher voicing an imagined objection; kept Teacher, no flag.

## For the lead

- Topic candidates: 01:16:38 MongoDB IDs; 01:17:56 Flickr ticket servers. UUID/index-size topic starts in chunk_06 (01:11:03), so no candidate at 01:11:11.
- Fragments kept as spoken (no gap evidence): 01:11:11 "companies at scale don't prefer it." (continues chunk_06), 01:12:30 "big, it would make...", 01:16:20 "scale." (after "people don't use UUIDs").
- 01:16:13 "In most cases they would get four of them." -> `[check: "get four of them" - go for them?]`.
- Hallucination candidates in range (#1101, #1131, #1137 "Okay.") = real teacher back-channels; kept.
- Verifier lists one 1-word drop "integers" at 01:11:13; the word is present in output (alignment artifact, both "integers" tokens kept).
