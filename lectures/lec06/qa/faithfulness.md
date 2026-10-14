# Lecture 08 (lec06): faithfulness audit

Scope: the page `site/src/content/lectures/lec06.mdx` and `lec06/*.mdx`, the figure texts in `site/src/figures/lec06/*.tsx`, and the captions and alt text in `site/src/animations/clips/l06-*/timeline.ts`. They were checked against:
- the ledger `lectures/lec06/ledger/ledger.jsonl` (using the `[[L-xxxx]]` / `k=` tags)
- the transcript `lectures/lec06/transcript/transcript.md`
- `lesson/factcheck_applied.md` and `factcheck/final.jsonl`
- `board/diagrams.md`

No site files were edited. The machine-readable list is in `faithfulness.json`.

## Summary

| Kind | Count | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 5 | 0 | 1 | 4 |
| Invention (untagged / unsourced) | 4 | 0 | 0 | 4 |
| Fact-check application | 1 | 0 | 0 | 1 |
| Voice | 0 | 0 | 0 | 0 |
| Figure | 4 | 0 | 2 | 2 |
| Clip | 0 | 0 | 0 | 0 |
| **Total** | **14** | **0** | **3** | **11** |

There are no high-severity issues.

**Coverage.** Every paragraph-level block was read, and so was every figure and clip text.

| Part | Paragraphs checked |
|---|---|
| s0-header | 7/7 |
| s1-images | 51/51 |
| s2a-gravatar | 43/43 |
| s2b-gravatar | 67/67 |
| s3-serving | 50/50 |
| s4-tagging | 61/61 |
| s5a-badge | 34/34 |
| s5b-badge | 30/30 |
| s6-auxiliary | 43/43 |
| s7-keep | 14/14 |
| Figures (modules on the page) | 34/34 |
| Clips (captions, cues, alt) | 4/4 |

Paragraph counts are blocks: prose, code, PauseAndThink, StepThrough, TradeoffTable and RecallItem bodies.

**Ledger coverage.** 319 of the 321 ledger items are tagged on the page. The two not on the page, L-0116 and L-0146, are logistics drops that `placement.json` lists.

**Fact-check application.** All 8 SourceNotes (SN-01 to SN-08) sit directly after their claim. Each one keeps the teacher's point and links its sources. All 10 inline clarifications are present with their links: L-0009, L-0022, L-0054, L-0058, L-0109, L-0137, L-0218, L-0243, L-0257 and L-0282. 12 of the 13 unverifiable items are attributed or hedged as specified. L-0196 is not (F-008). The one weak spot is SN-05: the correction is placed correctly, but the page re-labels the teacher's own reason as "often given" (F-001).

**Voice.** There is no teacher–student dialogue, and there are no student names, "Student N" labels or "asked in class by" phrases. Student proposals are written as "one proposal…" or "it is tempting…", and the class's corrections are kept: L-0065, L-0075, L-0088, L-0184, L-0188, L-0241, L-0244 and L-0308 were all checked. The instructor is named only for first-person accounts: L-0012, L-0034, L-0061, L-0114, L-0162, L-0299, L-0312 and L-0319.

**Clips.** All four clips (l06-hash-scan, l06-invalidate, l06-badge, l06-aux-redis) match the ledger: 10,000 rows, a 1–2 day TTL, purge by a Kafka worker, unique senders since the last tap, and one write per sender.

### Most serious

1. `s3-serving.mdx:80` (Distortion, medium). "One reason often given is that S3 is not public": that was the teacher's own answer (01:18:26), now pinned on unnamed others. The PauseAndThink at line 72 also marks it wrong before the point is stated.
2. `s2a-gravatar.mdx:92`, Fig 2·a (Figure, medium). The figure shows the hash crossed off but says "Redrawn from the class board at 01:08". At 01:08 the board's users row holds hash `0eafd172`, not crossed off. The strike-through is from 00:35.
3. `s2b-gravatar.mdx:222`, Fig 2·f (Figure, medium). It shows the join struck through and a `select * from users where hash = ?` as board content. On the board only the two photo updates are struck, and the users select was only spoken.

Issue format: **[Kind] severity** `file:line`, then the problem, the evidence and the fix.

---

## s0 Header
No issues.

## s1 Images
- **[Invention] low** F-010 `s1-images.mdx:90`. The `[[L-0029]]` tag sits on the added Content-Type / nginx MIME material, which L-0029 doesn't carry. Fix: drop or move the tag.
- **[Distortion] low** F-011 `s1-images.mdx:122`. The PauseAndThink `right` text starts "Yes." although the correct choice is "No: made on demand". Fix: "Right: it is made on demand…".

## s2 Gravatar (s2a, s2b)
- **[Figure] medium** F-002 `s2a-gravatar.mdx:92`, Fig 2·a. A crossed-off hash is attributed to the board at 01:08, but the board restored the hash by 00:44. Evidence: D-04, D-02, L-0067. Fix: caption "The schema after the first pass (about 00:36)… Built from the class board at 00:35 and 01:08."
- **[Figure] medium** F-003 `s2b-gravatar.mdx:222`, Fig 2·f (`s2b-gravatar-fig2e.tsx`). A struck join and a users select are shown as board content, but D-02 strikes only the photo updates. Fix: say which parts are board and which are spoken, or draw the read column unstruck.

## s3 Serving
- **[Distortion] medium** F-001 `s3-serving.mdx:80` (also line 72 and line 88). The teacher's "S3 is not public" is re-attributed as "often given". Evidence: transcript 01:18:26, L-0139, L-0140. Fix: "The class gave two reasons in one breath: S3 is not public, and only the database knows which photo is active". Keep SN-05 after it, and introduce line 88 as "the second reason is the one that holds".
- **[Invention] low** F-005 `s3-serving.mdx:215` and `s4-tagging-rule.tsx`. "Six teams" is a count the class never gave (L-0218 lists nine-plus systems). Fix: "many teams".

## s4 Tagging
- **[Factcheck] low** F-008 `s4-tagging.mdx:100`. L-0196 needs the hedge "the instructor's rule of thumb", but the page has only "as a rule of thumb". Fix: "By the instructor's rule of thumb…".
- **[Figure] low** F-006 `s4-tagging-events.tsx` and caption `s4-tagging.mdx:201`. "sync check" / "a synchronous authorization check" is not on the board or in the ledger. The synchronous dependency taught in class was the ML API. Fix: drop "sync".

## s5 Badge (s5a, s5b)
- **[Distortion] low** F-012 `s5b-badge.mdx:88`. The teacher's "from the front end" (L-0275) is silently resolved, and "once" is added. Fix: keep the class's wording, with a gloss.
- **[Figure] low** F-013 `s5b-badge.mdx:96` and Fig 5·g. The "batch if partitioned by recipient" note sits under the Status check API on the board, and its second line is uncertain, not "cut off". Fix: hedge it ("hard to read… most likely at the workers").
- **[Invention] low** F-014 `s5b-badge.mdx:37`. The page's own link (hash and active_photo_id as pre-computing) reads as taught, and it is untagged. Fix: frame it as the page looking back, or cut it.

## s6 Auxiliary database
- **[Distortion] low** F-004 `s6-auxiliary.mdx:161`, also `s7-keep.mdx:19` and the Fig 7·a title. "One afternoon" is wrong: the class ran in the morning (01:29:36 "from 9 AM to 10 30 AM"). Fix: "one morning" or "one class".
- **[Distortion] low** F-007 `s6-auxiliary.mdx:66`. "Voldemort guarding his Deathly Hallows" embellishes the teacher's bare "Voldemort… Deathly Hallows" (02:36:33). Fix: "The class reached for Harry Potter here (Voldemort, the Deathly Hallows)…".

## s7 What to keep
- **[Invention] low** F-009 `s7-keep.mdx:45`. "You don't need to read that whole textbook" is untaught, and it runs against the teacher's own textbook account (02:53:07). Fix: delete it.
- F-004 also applies here (line 19 and the Fig 7·a title).
