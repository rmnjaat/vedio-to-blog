# Lecture 10 - blind-reader exam grade (round 1)

- Key: `lectures/lec10/qa/exam.json` (126 questions)
- Blind answers (built page only): `lectures/lec10/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 125 |
| partial | 1 (Q077) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**125/126 correct (99.2%); 125.5/126 = 99.6% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q077 | partial | The prepared five-step procedure (spin up a new server; download the dictionary locally; download the changelog; merge in O(n), creating a new dict and index locally; upload the new dictionary and index to S3) and "merge is O(n) because dictionary and index are sorted". The reader could give only the notes' topic list. | **Absent as a procedure.** `s6b-switching-servers.mdx:71` renders only the spoken topic list (L-0186). The board's prepared "Updating the dictionary" page (board S53, 01:43:30), carried in the detail of ledger L-0196, is never shown. Its steps exist only scattered across Ch5 (5.1 new server + download, 5.3 merge O(n)), far from where the question points. | After `s6b-switching-servers.mdx:71` add: "The prepared `Updating the dictionary` page lays it out as a procedure: spin up a new server; download the dictionary locally; download the changelog; merge in O(n), creating a new dictionary and index locally; upload the new dictionary and new index to S3. How is the merge O(n)? The dictionary is sorted and the index is sorted, so it is the merging of two sorted lists. [[L-0196 L-0310]]" |

## Correct, with minor omissions (no fix required)

The content is on the page; the reader left it out or hedged:

- Q002: "still scalable on storage and API servers" not restated.
- Q012: "this constraint is the foundation for later systems" not restated.
- Q041: did not add "databases disallowed, so blob storage like S3" (covered in Q042/Q044).
- Q057: "always write to a new file, since in-place overwrites the next line" (Ch5 5.2).
- Q068: "extra meta call per request" not mentioned.
- Q070: reader hedged ("page only partly covers this"). All three strategies and the refresh timeline are on the page (`s6a-switching-servers.mdx:76`, Fig 6·c), but the Pub/Sub details (Redis pipe, standalone updater) were not given.
- Q075: "purple" and "replaced the erased Pub/Sub pipe" not stated. The AWS SDK → API servers connection is right.
- Q082: reader said the page doesn't frame it as a promise for after the break, but gave all of the substance.
- Q102: "5000x gain" from the prepared notes not quoted.
- Q103: "variable-length keys/values, so you need the exact byte count" left implicit.
- Q113: what Riak adds (routing, consistent hashing, replication, Bitcask per node) not listed.
- Q118: that the temporary hash table is separate from the in-memory index not stated.
- Q126: "computer science is obsessed with sorted data" not restated.
