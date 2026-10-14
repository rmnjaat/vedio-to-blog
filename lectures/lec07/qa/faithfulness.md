# Lecture 07 (page "Lecture 09"): faithfulness audit

Scope: `site/src/content/lectures/lec07.mdx` and `lec07/*.mdx`, the figure texts (labels, titles, descs) in `site/src/figures/lec07/*.tsx`, and the clip captions and alt text in `site/src/animations/clips/l07-*/timeline.ts`. These were checked against `lectures/lec07/ledger/ledger.jsonl` (via each paragraph's `[[L-…]]` and `k=` tags), `transcript/transcript.md`, `lesson/factcheck_applied.md` with `factcheck/final.jsonl`, and `board/diagrams.md`. No site files were edited. Machine-readable list: `faithfulness.json`.

## Summary

| Kind | Total | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 7 | 0 | 1 | 6 |
| Invention | 2 | 0 | 0 | 2 |
| Fact-check application | 1 | 0 | 0 | 1 |
| Voice | 1 | 0 | 0 | 1 |
| Figure | 0 | 0 | 0 | 0 |
| Clip | 1 | 0 | 0 | 1 |
| **Total** | **12** | **0** | **1** | **11** |

No high-severity issues. Overall the page is faithful. Hedges and attributions are carried consistently ("as he tells it", "by his account", "the instructor hedged", "in this course's view"). Student contributions appear as "suggested in class" with no names, and every correction sits beside the teacher's point rather than replacing it.

## Coverage

| Part | Prose paragraphs checked | Components checked (figures, notes, tables, quizzes) |
|---|---|---|
| s0-header | 7/7 | 1/1 |
| s1a-etl-and-cdc | 42/42 | 9/9 |
| s1b-etl-and-cdc | 26/26 | 5/5 |
| s2-one-node | 65/65 | 11/11 |
| s3-eviction-and-expiry | 52/52 | 15/15 |
| s4-protocol-and-concurrency | 62/62 | 19/19 |
| s5-routing | 34/34 | 11/11 |
| s6a-consistent-hashing | 42/42 | 12/12 |
| s6b-consistent-hashing | 36/36 | 9/9 |
| s7-keep | 10/10 | 1/1 |
| **Figures** (40 Figure/StepThrough plus 6 rule-box drawings) | 46/46 | |
| **Clips** (captions, cues, alt) | 4/4 | |

**Fact-check application:**
- All 17 SourceNotes (SN-01 to SN-17) are present. Each sits directly after its tagged point and carries its listed source.
- All 18 inline clarifications are present. One of them (L-0103) is weakened: see F-005.
- All 21 unverifiable items are attributed.
- Every additions sentence checked carries a Cite.
- The "our design" framing for zmalloc-with-eviction (L-0122, L-0129) is applied.
- The board slip `[j–p]` is redrawn as `[k–p]` and flagged in the caption.

**Voice:** a grep for "Student", student names and "asked in class" found nothing on the page.

**Figures:**
- No label contradicts the board or the ledger. Ring positions (c1@3, c3@5, c4@10, c2@12, c5@1), the slice `(12, 1]`, the replica placement (c1 → c3, c4) and the hash-mod tables all match D-17 to D-20.
- The page-made numbers are labelled as the page's own: the hash values, 117/27 bytes and the eight-core drawing.

### Most serious

1. **F-001** `s6b-consistent-hashing.mdx:129` (Distortion, medium). The page says the AOF is what Redis "calls its write-ahead log". That label was the teacher's (02:28:51), not Redis's, and the AOF is not strictly write-ahead (fact-check note on L-0319).
2. **F-005** `s2-one-node.mdx:146` (Fact-check, low). The L-0103 inline clarification drops "running out of heap does not cause a segfault by itself", and its replacement ("doesn't change the ending") leans toward the segfault answer that SN-03 corrects.
3. **F-004** `s1a-etl-and-cdc.mdx:173` (Voice, low). "Active-standby or all active; both work" is stated as the class's answer. In the transcript it sits inside the student's question, and the speaker is flagged as unclear.
4. **F-002** `s6b-consistent-hashing.mdx:69` (Distortion, low). "As it was put on the board" is wrong for L-0305: that line was spoken, not written.

---

## Issues by part

### §1 ETL and CDC (s1a, s1b)

- **[Distortion] low, F-011** `s1a-etl-and-cdc.mdx:29`: "Production runs on MongoDB" is stated as fact. The teacher hedged it: "this database might be a NoSQL database like MongoDB" (L-0019), and the board reads "Transactional Database like MongoDB". Fix: "Production runs on a transactional database, MongoDB say, and it holds everyone's personal data."
- **[Voice] low, F-004** `s1a-etl-and-cdc.mdx:173`: the L-0343 claim is presented as taught. The transcript at 02:41:42 puts "Active standby both works" inside Student 3's turn, with a check flag on the speaker. Fix: "Several CDC instances can read the same source, active-standby or all active: 'active standby both works' came up inside the question itself, so who said it is unclear. [[L-0343]]" Keep the existing clarification that follows.
- **[Clip] low, F-012** `s1a-etl-and-cdc.mdx:122` with `l07-events-vs-cdc/timeline.ts:63`: the clip's downtime beat shows the CDC tool stopped while the database keeps taking writes. That is the checkpoint point (L-0065), not L-0040's "source database is down". Fix: add L-0065 to the page's `k=`, and optionally say "after the CDC tool has been down" in the caption.

Checked and fine:
- The board order of the four event problems.
- L-0016 hedged as a rule of thumb.
- The consulting story (L-0053 to L-0071), marked "as he tells it".
- PG sync: a student's tool, with the teacher's classification.
- SN-01 and SN-02 placement and sources.
- The Spark verdict, attributed.

### §2 One node (s2)

- **[Fact-check] low, F-005** `s2-one-node.mdx:146`: the L-0103 inline treatment is incomplete. Fix: replace "It doesn't change the ending, though, which comes next" with "Running out of heap does not cause a segfault by itself either: malloc returns NULL, or on Linux with overcommit the OOM killer ends a process when the pages are touched (more in the note below). [[L-0103]]"

Checked and fine:
- SN-03 and SN-04 sit right after their points.
- L-0341 keeps "I might be wrong".
- L-0349 keeps "not an area the instructor knows deeply".
- The student corrections (L-0338, L-0358, L-0359, L-0360) are phrased as "a correction came", "it was added" or "the explanation went".
- "Lecture said four bytes; 16 with padding" (L-0112) is handled as a clarification.

### §3 Eviction and expiry (s3)

- **[Distortion] low, F-007** `s3-eviction-and-expiry.mdx:60`: the page drops the teacher's first "It's actually 24 bits" (01:00:32). Fix: add "(the instructor first said 24, then settled on 28, the figure on the board)".
- **[Distortion] low, F-006** `s3-eviction-and-expiry.mdx:122`: "too deep for this page" turns the teacher's "too deep for class ('It would take me three years')" into the page's own judgement, and the page explains it a few lines later. Fix: "with a superb algorithm the class did not go into ('It would take me three years to talk about it')".

Checked and fine:
- SN-05, SN-06 and SN-07 placement.
- The 52,000 linked lists, given second-hand.
- The eight-months war story, attributed.
- The World Cup slip ("go for LRU") is silently resolved to LFU, which matches the reasoning given.

### §4 Protocol and concurrency (s4)

- **[Distortion] low, F-008** `s4-protocol-and-concurrency.mdx:278`: "A puzzle the board left for later". The line was erased right after "We'll skip this. Don't need this." Fix: "The board briefly carried a fun exercise, erased soon after: …"
- **[Invention] low, F-009** `s4-protocol-and-concurrency.mdx:169`: the TradeoffTable gives "About 117" bytes without saying it is the page's illustrative request. Fix: "About 117 in Fig 4·b's example: headers dwarf the data".

Checked and fine:
- SN-08 to SN-11 placement.
- The IoT story, attributed.
- "As the instructor tells it" on L-0235.
- The L-0366 hedge kept.
- Percona (L-0367) left as taught, per the treatment table.

### §5 Routing (s5)

No issues. Checked:
- SN-12 and SN-13.
- The L-0253 and L-0324 inline notes, including "the instructor was 100% sure only about…".
- The bank analogy order, and the board labels "IPFS · NOT" and "DNS · cache (Redis)".

### §6 Consistent hashing, DHTs, staying up (s6a, s6b)

- **[Distortion] medium, F-001** `s6b-consistent-hashing.mdx:129`: "which it calls its write-ahead log". Fix: "which the class called Redis's write-ahead log … (Strictly, Redis appends a write after executing it, so the AOF is a log of writes rather than a write-ahead log.)"
- **[Distortion] low, F-002** `s6b-consistent-hashing.mdx:69`: "As it was put on the board" for an audio-only item. Fix: "As it was put in class".
- **[Distortion] low, F-003** `s6b-consistent-hashing.mdx:33`: "ten or twenty per machine" hardens the student's "10 or 20 or something". Fix: "(the question in class put it at '10 or 20 or something')".

Checked and fine:
- The N/(N+1) framing fix, with page-made hash values labelled.
- L-0300 attributed.
- SN-14 to SN-17 placement, with the teacher's point kept before each note.
- The RF 2 vs RF 3 inline note.
- The orchestrator figure, marked as glimpsed.

### §7 What to keep (s7)

- **[Invention] low, F-010** `s7-keep.mdx:57`: "built from files" is not in L-0376 (03:05:34). Fix: "Two storage engines, built on our own. [[L-0376]]"

### Header (s0)

No issues. The agenda, the C grade, tiered storage "introduced here, built in a later week" and "the two halves were not connected in class" all match L-0001 to L-0010.
