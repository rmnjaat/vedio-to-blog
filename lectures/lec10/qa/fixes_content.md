# Lecture 10: content fixes (`site/src/content/lectures/lec10/*.mdx`, figure text in `site/src/figures/lec10/*.tsx`)

Each change was checked against `lectures/lec10/transcript/transcript.md`, `ledger/ledger.jsonl`, `board/board_log.md` and `lesson/factcheck_applied.md` before it was made. No new outside fact was added, so no new `<Cite>` was needed. The existing citations are unchanged.

Verification:
- Build: `pipeline/bin/site.sh gates lec10 lectures/lec10/qa/gates_content_fix.txt` gave `build ok: 15 pages`.
- Coverage: `COVERAGE PASS`, 311/311 placed ids on the pages (ledger overall 311/311).
- Links: zero broken.
- Figures: `check-figures ok` at 360/390/768/1440, light and dark.
- Result: **GATES PASS**.
- Tags: no `[[L-…]]` or `k=` tag was removed. Each edit kept every tag of the text it replaced. The new Q077 paragraph carries `[[L-0196 L-0310]]`.

## 1. Blind exam (exam_grade.json)

| Q | Change |
|---|---|
| Q077 | `s6b-switching-servers.mdx` §6.4: added a paragraph right after the prepared-notes topic list (L-0186). It gives the board's `Updating the dictionary` procedure in board order (S53, 01:43:30): spin up a new server; download the dictionary locally; download the changelog; merge in O(n), creating a new dictionary and index locally; upload the new dictionary and the new index to S3. It also gives the board's answer to "How is merge O(n)?": the dictionary is sorted and the index is sorted, so it is the merging of two sorted lists. Links to 5.3. Tagged `[[L-0196 L-0310]]`, whose board_text and B-047/B-048 notes are this page. |

The other non-correct-looking rows in exam_grade.md (Q002, Q012, Q041, Q057, Q068, Q070, Q075, Q082, Q102, Q103, Q113, Q118, Q126) are graded **correct**, with minor reader omissions, and the grader proposes no fix. No change.

## 2. Faithfulness audit (faithfulness.json)

| Id | Change |
|---|---|
| F-001 | `s10-bitcask.mdx` §10.3: "That order matches Martin Kleppmann's book…" changed to "A learner in the class pointed out that Martin Kleppmann's book also covers Bitcask in its storage chapter, and found that understanding Bitcask first made the other storage engines easy to follow. [[L-0291]]". This matches the student turn at 02:45:25 and L-0291 (speaker = student). There is no name and no dialogue. |
| F-002 | `s5-weekly-update.mdx` §5.2: deleted "Graveyards belong with live updates; this is a weekly one." The line now reads "…must not contain repeated entries, and this is a weekly update, so build the clean file directly. [[L-0135]]", which is the teacher's reason at 01:13:19. The 8.3 pointer stays as an editorial pointer: "Append-then-compact does come back in the second engine of this lecture, which takes live writes (8.3)." |
| F-003 | `s6b-switching-servers.mdx` §6.4 aside: now "the first thought was to add Redis Pub/Sub and expose APIs to reload the data; in the end, a triggered deployment did the job". Both were ideas, as at 03:00:54. `[[L-0308]]` kept. |
| F-004 | `s11-keep.mdx` table row "Why files at all": the left cell is now "The brief rules out any database; cost puts one shared copy on S3, not one per server (4.1)" (L-0003, L-0099/0102/0103). The right cell gained "(7.1)". |
| F-005 | `s9-record-format.mdx` §9.3: "In practice it will be written" changed to "roughly 20 bytes, so in the instructor's words it will definitely be written. [[L-0299]]" (02:53:06 "It will definitely be there"). The L-0297 inline correction above it is unchanged. |
| F-006 | `s2-finding-one-word.mdx` §2.1 RuleBox: dropped the unsourced hedge "It is a classroom rule of thumb rather than the only tool…". L-0046 is now left as taught. The number-crunch sentence (L-0052) stays. |
| F-007 | `s3-one-file.mdx` §3.2: "`AODB` on the board" changed to "say `AODB` (the example said in class; the board's scrawl reads `AOBB`)" (D-04). `[[L-0079]]` kept. The figure label stays AODB, as the audit allows. |
| F-008 | `s8-files-that-grow.mdx` §8 opener: "Its one file is 900 GB on a 1 TB disk" changed to "Say, for illustration, the store from chapter 7 has been running for a month, and its one file has filled most of the disk." The untaught 900 GB figure is gone, and the scenario is marked as illustrative. |
| F-009 | `s1-dictionary-no-database.mdx` §1.4: "A good idea, and complex enough to come back to later" changed to "Complex enough, in class, to set aside and touch upon later. [[L-0032]]" (00:17:05). |
| F-010 | `s6a-switching-servers.mdx` §6.1: removed "Of the three, the last is the one that bites on S3." The teacher's three problems now stand as taught `[[L-0157]]`. A-D-05 follows as a separate sourced sentence: "On S3 specifically, a failed or interrupted upload leaves the object already there intact, because single-key updates are atomic, so the stale offsets are what bite first…". The aws.amazon.com Cite and `[[L-0157]]` are kept. |

## 3. Design critique (critic.json, owner content)

| Id | Change |
|---|---|
| C-02 | `s10-bitcask.mdx` §10.2. The fact-check policy (SN-07, SN-08: "teacher's point stays… the note never replaces it") rules out the critic's suggestion to rewrite the prose to match the boxes. So the prose now marks the teacher's claims as taught and points at the correction, and the reader no longer meets two unexplained opposite claims. Three changes: (1) "As taught, Bitcask is used by Uber in production, for its main ride-hailing service. [[L-0275]] … [[L-0276]] The note below narrows the first half of that: Bitcask did run at Uber through Riak, but in dispatch services, not under the core trip data." (2) "The list as given in class: master-slave architecture, consensus, … The note below corrects the first item: Riak has no master, and any node can route a request." `[[L-0278]]` kept. (3) The SourceNotes and Fig 10·b are unchanged; they hold the sourced versions. |
| C-03 | Teacher narration cut wherever attribution isn't required. Changes: (1) Fig 3·b label (`s3-one-file-figs.tsx`) "the instructor's own database" changed to "your own database". (2) §3.2 prose changed to "Your own database would start with its own magic bytes…". (3) §6.4 aside retitled "Reload by deploying", with the his/he narration removed. (4) §10.2 L-0280 changed to "If it isn't, doubt the high-throughput claim" (the RuleBox already says "ask how the system gets its throughput"). (5) §10.3 L-0292 changed to "It is simple and beautiful, which is how it struck the instructor in a college storage paper-reading course". (6) §10.3 L-0284 now leads with the instruction: "implement it, then benchmark it against on-disk and in-memory key-value stores, on magnetic disks and on SSDs…". (7) §9.3 L-0304 no longer says "surprised the instructor". (8) The second "in his view" in §9.3 was dropped. (9) The §3.3 aside was retitled "A homemade image format". L-0284, L-0292, L-0089, L-0301, L-0302, L-0304 and L-0308 are unverifiable, and factcheck_applied §4 requires them to be stated as the instructor's experience or view, so one attribution clause stays in each. The remaining "the class" uses are provenance in meta lines, captions, "Verdict in class" table labels and proposals "suggested in class", which the brief requires. |
| C-08 | The right answer is now first on 5 of 9 cards: §3 (header size), §5 (overwrite), §6.3 (deploy), §7 (delete), §9 (checksum). Option lengths were balanced: (1) §4's wrong option is now "Updates: a weekly push to 100 servers drifts out of sync". (2) §5's right option is now "Its first bytes are overwritten by apple's longer line" (it was shorter than the wrong option). (3) §8's wrong option is now "Big: split the disk into two or three huge files, then rotate". The right/wrong verdict texts are unchanged and still match the choices. |
| C-10 | Fig 6·a (`s6a-switching-servers-figs.tsx`): every row now uses the page's `word,meaning` format with no space (`aah,to exclaim`, `abate,to lessen`, `bat,a club`, `bath,a wash`), and the result label is now `returns: apple,a fruit`. The 1,024-byte length was **kept**, because the class used it (01:25:42: "it will go to byte offset 100 and read 1024 bytes"). The mismatch is resolved in the text instead: (1) step 1 and the figure desc call 1,024 "the class's round number", and say the read starts at apple's entry; (2) §6.1 prose adds "(a round number for the example; a real entry's length is its own line's byte count, 13 bytes for `apple,a fruit` plus its newline)". The think card keeps the 1,024 bytes as taught. |
| C-15 | Fig 8·c (`s8-files-that-grow-figs.tsx`), desk and phone: "1. MC freq" changed to "1. merge frequency". The same label in Clip 8·1 (`site/src/animations/clips/l10-sawtooth/Sawtooth.tsx:269`) is outside this fixer's files, so it was left for the animation fixer: change `text="1. MC freq"` to `"1. merge frequency"`. |
