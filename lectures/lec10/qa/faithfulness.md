# Lecture 10: faithfulness audit

**Scope.** This audit covers:
- the page: `site/src/content/lectures/lec10.mdx` and `lec10/*.mdx`;
- the figure texts in `site/src/figures/lec10/*.tsx`, using the labels, titles, descriptions and step texts as rendered in `qa/page_text.md`;
- the clip captions, alt text and step texts in `site/src/animations/clips/l10-*/timeline.ts`.

These were checked against:
- `ledger/ledger.jsonl`, via the `[[L-…]]` and `k=` tags;
- `transcript/transcript.md`;
- `lesson/factcheck_applied.md` and `factcheck/final.jsonl`;
- `board/diagrams.md`.

No site files were edited.

## Summary

| Kind | Total | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 4 | 0 | 1 | 3 |
| Invention | 1 | 0 | 0 | 1 |
| Fact-check application | 3 | 0 | 0 | 3 |
| Voice | 1 | 0 | 1 | 0 |
| Figure | 1 | 0 | 0 | 1 |
| Clip | 0 | 0 | 0 | 0 |
| **Total** | **10** | **0** | **2** | **8** |

There are no high-severity issues. Overall the page is faithful:
- Student proposals are written as "one proposal", "the first answer people give" or "a tempting answer".
- The instructor's own experiences (his image format, Pub/Sub at his own services, the Bitcask benchmark, the college course, Hussein Nasser) are attributed to him.
- Every SourceNote sits right after the teacher's point it qualifies.

## Coverage

| Part | Paragraphs checked |
|---|---|
| s0 header | 5/5 |
| s1 dictionary, no database | 32/32 |
| s2 finding one word | 29/29 |
| s3 one file | 36/36 |
| s4 serving from S3 | 33/33 |
| s5 weekly update | 36/36 |
| s6a switching servers | 39/39 |
| s6b switching servers | 25/25 |
| s7 fast writes | 38/38 |
| s8 files that grow | 37/37 |
| s9 record format | 34/34 |
| s10 Bitcask | 31/31 |
| s11 what to keep | 5/5 |
| SourceNotes (SN-01 to SN-10) | 10/10 |
| Inline clarifications | 18/18 |
| Figures | 45/45 |
| Clips | 5/5 |

**Fact-check application.**
- All 10 SourceNotes are present. Each one comes right after its teacher's point, keeps that point, and has its sources (SN-01 uses the partitions page, as the verdict review asked).
- All 18 inline clarifications are on the page.
- All 7 unverifiable items are attributed as the instructor's experience or view.

There are three small fact-check problems:
- F-005: a left-as-taught item was softened.
- F-006: a hedge was added to a left-as-taught item.
- F-010: an addition was written as a correction.

**Figures.** These follow the board:
- the merge columns a–h (D-08);
- the in-place overwrite (D-07);
- the same-path garbage example (D-09);
- the file rotation and sawtooth (D-15);
- the record format (D-16).

The documented framing fixes are disclosed in their captions: K3 → f1, the masterless Riak figure, and real byte offsets. The only figure problem is the AODB/AOBB spelling (F-007).

**Clips.** All 5 match the ledger. In the sawtooth clip, "merge too rarely … crashes" is supported at 02:34:55 ("Very infrequent, you would breach past this … your system would crash").

**Voice.** No student names and no "Student N" appear. No teacher–student dialogue appears either. The only problem is a student's remark presented as the page's own claim (F-001).

### Most serious

1. **F-001 (voice, medium)** `s10-bitcask.mdx:136`: the claim that the order matches Kleppmann, and that learning Bitcask first makes the other engines easy, is a student's remark (02:45:25). The page states it as fact.
2. **F-002 (distortion, medium)** `s5-weekly-update.mdx:93`: "Graveyards belong with live updates". The transcript literally says the teacher *doesn't* see it working well for live updates (01:13:19, unclear ASR). His stated reason was "no repetitive entries; weekly, so clean it directly".
3. **F-004 (distortion, low)** `s11-keep.mdx:37`: "Cost: one copy on S3 instead of a database". Databases were excluded by the brief, not on cost.

---

## Issues by part

### s1 · A dictionary with no database
- **[Distortion] low** `s1-dictionary-no-database.mdx:101` (F-009). "A good idea, and complex enough to come back to later" overstates the teacher's reaction. He only said it was "still a complex enough solution that we'll touch upon later" (00:17:05), and L-0032 is open. Fix: "Complex enough, in class, to set aside and touch upon later. [[L-0032]]"

### s2 · Finding one word fast
- **[Factcheck] low** `s2-finding-one-word.mdx:51` (F-006). L-0046 is meant to be left as taught. Instead the page adds an unsourced hedge, "a classroom rule of thumb rather than the only tool", which takes the checker's note onto the page. Fix: drop that sentence.

### s3 · One file you can ship
- **[Figure] low** `s3-one-file.mdx:90` and `s3-one-file-figs.tsx:91` (F-007). The page says "AODB on the board", but the board reads AOBB; AODB is the spoken form (D-04). Fix: drop "on the board", or note that it was said in class.

### s5 · The weekly update
- **[Distortion] medium** `s5-weekly-update.mdx:93` (F-002). The graveyard line asserts a positive rule ("belong with live updates") that the class did not state. Fix: remove that sentence and keep the teacher's reason (no repetitive entries, weekly batch, clean directly). The 8.3 pointer can stay as an editorial pointer.

### s6a · Switching servers (6.1–6.3)
- **[Factcheck] low** `s6a-switching-servers.mdx:54` (F-010). "Of the three, the last is the one that bites on S3" ranks the teacher's list and turns the A-D-05 addition (simplified-low) into a correction. It also repeats the L-0153 inline note. Fix: keep the list as taught and add the S3 atomicity point as a separate sourced sentence.

### s6b · Switching servers (6.4–6.5)
- **[Distortion] low** `s6b-switching-servers.mdx:67` (F-003). "exposed APIs to reload the data": in fact he only *thought of* Pub/Sub and exposing APIs (03:00:54). Fix: "first thought of adding Redis Pub/Sub and exposing APIs…"

### s8 · Files that never stop growing
- **[Invention] low** `s8-files-that-grow.mdx:24` (F-008). The hook's "running for a month, 900 GB on a 1 TB disk" uses numbers that were not taught, and it is not marked as illustrative. Fix: "Say, for illustration, … has filled most of the disk".

### s9 · Record format and integrity
- **[Factcheck] low** `s9-record-format.mdx:143` (F-005). L-0299 is meant to be left as taught. The teacher's "It will definitely be there" became "In practice it will be written", and the correction already sits in the L-0297 inline note. Fix: "…so in the instructor's words it will definitely be written."

### s10 · It's called Bitcask
- **[Voice] medium** `s10-bitcask.mdx:136` (F-001). The Kleppmann remark is a student's (L-0291, 02:45:25) but is presented as the page's claim. Fix: "A learner in the class pointed out that Martin Kleppmann's book also covers Bitcask in its storage chapter, and found that understanding Bitcask first made the other storage engines easy to follow."

### s11 · What to keep
- **[Distortion] low** `s11-keep.mdx:37` (F-004). The "Why files at all" row gives cost as the dictionary's reason, but the brief excluded databases. Fix: "The brief rules out any database; cost puts one shared copy on S3, not one per server (4.1)".

### s0, s4, s7, figures, clips
No issues found.
