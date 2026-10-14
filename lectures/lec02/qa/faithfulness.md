# Lecture 04 (lec02): faithfulness audit

**Scope.** The audit covered these parts of the page:
- the page itself: `site/src/content/lectures/lec02.mdx` (the frontmatter summaries) and `site/src/content/lectures/lec02/*.mdx`;
- the figure texts in `site/src/figures/lec02/*.tsx`, meaning labels, step texts, titles and descriptions;
- the clip captions, chapter marks and alt text in `site/src/animations/clips/l02-*/timeline.ts`.

**Sources.** The page was checked against these files:
- `lectures/lec02/ledger/ledger.jsonl`, following each paragraph's `[[L-…]]` and `k=` tags;
- `lectures/lec02/transcript/transcript.md`;
- `lectures/lec02/lesson/factcheck_applied.md` and `factcheck/final.jsonl`, together with `factcheck/additions_verified.jsonl`;
- `lectures/lec02/board/diagrams.md`.

No site files were edited. Every issue below includes a proposed fix. The machine-readable list is in `faithfulness.json`.

## Summary

| Kind | Total | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 10 | 0 | 0 | 10 |
| Invention (untagged and unsourced) | 2 | 0 | 0 | 2 |
| Fact-check application | 3 | 0 | 1 | 2 |
| Voice | 1 | 0 | 0 | 1 |
| Figures | 3 | 0 | 1 | 2 |
| Clips | 0 | 0 | 0 | 0 |
| **Total** | **19** | **0** | **2** | **17** |

There are no high-severity issues.

## Coverage

Every paragraph was checked. That includes prose, list items, PauseAndThink and RecallItem answers, MarginNotes, RuleBox bodies and table cells. Every figure module and every clip text was checked too.

| Part | Checked / total |
|---|---|
| lec02.mdx (frontmatter summaries) | 10/10 |
| s0-header | 8/8 |
| s1-nosql | 25/25 |
| s2-documents-kv | 35/35 |
| s3-columns | 39/39 |
| s4-graphs | 45/45 |
| s5-sql-or-nosql | 22/22 |
| s6-slack-schema | 46/46 |
| s7-sending | 57/57 |
| s8a-websockets | 44/44 |
| s8b-websockets | 43/43 |
| s9-whole-system | 54/54 |
| s10-deleting-ordering | 43/43 |
| SourceNotes (SN-01 to SN-12) | 12/12 |
| Inline clarifications | 14/14 |
| Unverifiable items, attributed | 16/16 |
| Figures: Figure, StepThrough and RuleBox drawings, 20 `.tsx` files | 52/52 |
| Clips | 4/4 |

**Fact-check application.** All 12 SourceNotes are present. Each sits directly after its claim, keeps the teacher's point in the text above it, and links its main source. Two have problems:
- **SN-08** is missing its MITM-definition source (F-011).
- **L-0354**'s inline note is missing its Envoy cite (F-010).

All 14 inline clarifications are present, and each keeps the taught point beside the correction. Of the 16 unverifiable items, 15 are attributed to the instructor or the lecture. **L-0101** (the 200 ms SLA) is the exception: it is stated as fact in the body, two deks, a PauseAndThink and the chapter summary (F-001). The woven "keep" additions match `additions_verified.jsonl` in their numbers: 400 KB, 16,384 slots, 2.3 M QPS, 255/200 sockets, 30 days, two of three, and 500 ms.

**Voice.** There are no student names, no "Student N" and no dialogue on the page or in figures and clips. Proposals that were corrected are attributed to "suggested in class" and are not given to the teacher. The only issue is that the "Asked in class:" formula is used heavily (F-012).

**Figures and clips.** No label contradicts the board:
- the replication direction is right in Fig 9·d (node 1 → nodes 2, 3);
- push and pull are right in Fig 8·f;
- the Kafka pull arrows are right.

Two figures, however, carry a correction or a student's claim as if it were the design:
- **Fig 9·d** shows the worker "holds the message", which was the student's claim (F-002).
- **Fig 9·c** shows "kafka: write-only", which is the fact-check's correction (F-018).

**Fig 3·c** shows only the softened "usually not the primary copy" (F-019). All four clips are faithful. Their hypotheses are labelled ("Slack (a hypothesis)", "WhatsApp-like (hypothetical)"), and the 10-minute lag and "last 50" are the class's numbers.

### Most serious

1. **`s4-graphs.mdx:118`** (fact-check, medium). The 200 ms SLA (L-0101, unverifiable, relayed second-hand from one bank's VP) is stated as fact. The same happens at :24, :45 and :97, and in the chapter summary at lec02.mdx:108. The margin note's attribution does not reach these places.
2. **`s9-whole-system-figs.tsx:305,321–322`** (figure, medium). Fig 9·d draws "holds the message until the commit". The teacher never confirmed that part of L-0425, and the page text beside the figure (:239) says so.
3. **`s9-whole-system.mdx:54`** (invention, low). "Tabs open to the same host share them" is tagged L-0434, but the class did not answer the tab part, and the sentence has no source.
4. **`s1-nosql.mdx:29`** (invention, low). The page opens with an unsourced claim about Slack's retention ("every message … for years").
5. **`s10-deleting-ordering.mdx:61`** and **`s4-graphs.mdx:132`** (distortion, low). Two student questions are reworded. In the first, the student is given an assertion they didn't make. In the second, the teacher's counter-question is merged into the student's question.

Issue format: **[Kind] severity** `file:line`, then the problem, the evidence and the fix.

---

## Frontmatter, §0 header

No issues. One cross-reference was checked: "Lecture 09 builds a Redis-like cache, Lecture 10 … files and column formats" matches `lectures/course.json` and the class's "fifth week, sixth week" (L-0003). The chapter summary for chapter 4 (lec02.mdx:108) is covered by F-001.

## §1 "NoSQL" is not one thing

- **[Invention] low** `s1-nosql.mdx:29` (F-009).
  - Problem: "Slack keeps every message every employee ever sends, in every channel, for years." This is untagged and unsourced. The class only required scrollable history (L-0148), and Slack's retention depends on the plan and the admin settings.
  - Evidence: L-0148.
  - Fix: "Slack has to keep every channel's history so that anyone can scroll back through it. In a design review someone says: …"

## §2 Documents and key-value stores

- **[Distortion] low** `s2-documents-kv.mdx:70` (F-016).
  - Problem: "Asked in class: so does MongoDB now do everything a relational database does?" The student actually observed that MongoDB offers ACID these days, inside a question about SQL versus non-SQL.
  - Evidence: transcript 00:50:04; L-0136.
  - Fix: "Asked in class: MongoDB offers ACID these days, so what is left of the SQL versus non-SQL difference?"

## §3 Column-oriented databases

- **[Figure] low** `s3-columns.tsx:159,182` (F-019).
  - Problem: Fig 3·c labels the warehouse "usually not the primary copy". That is the fact-check's softening of L-0073, and it replaces the teacher's "never your primary copy" in the figure. The body keeps both versions.
  - Evidence: transcript 00:26:45; factcheck_applied §2 L-0073.
  - Fix: label it "not the primary copy" or "never the primary copy", and leave the nuance to the body text.

## §4 Graph databases

- **[Fact-check] medium** `s4-graphs.mdx:118`, and also :24, :45, :97 and lec02.mdx:108 (F-001).
  - Problem: the 200 ms SLA is stated as fact. L-0101 is unverifiable and must be attributed.
  - Evidence: factcheck_applied §4 L-0101; transcript 00:36:54 and 00:37:31.
  - Fix for :118: "In the instructor's account, relayed from a bank's engineering lead, all of this has to happen within a **200 millisecond SLA**. [[L-0101]]"
  - Fix for the deks and the summary: add "as relayed in class".
- **[Distortion] low** `s4-graphs.mdx:132` (F-013).
  - Problem: "How would you power fraud detection on top of one?" was the teacher's counter-question, but the page puts it in the student's question. The student asked how a graph helps, and why a relational database can't solve these use cases.
  - Evidence: transcript 00:48:44–00:48:53.
  - Fix: "A fair question, asked in class: how does a graph actually help, and why can't a relational database solve these use cases? The instructor turned it round: how would you power fraud detection on top of a relational database?"
- **[Distortion] low** `s4-graphs.mdx:158` (F-014).
  - Problem: "a graph database makes much more sense" drops the hedge. The teacher said it "might make much more sense".
  - Evidence: transcript 02:49:46; L-0393.
  - Fix: "… a graph database might make much more sense …"
- **[Distortion] low** `s4-graphs.mdx:178` (F-015).
  - Problem: "The board listed a few:" is followed by BadgerDB, which was only spoken. The board had Neo4j, Neptune, Dgraph and TigerGraph.
  - Evidence: L-0104 detail; L-0107.
  - Fix: "The class named a few (the board listed all but BadgerDB):"
- **[Distortion] low** `s4-graphs.mdx:182` (F-004).
  - Problem: "works very well up to a moderate scale" fills a word that is unclear in the audio.
  - Evidence: transcript 00:39:02 '[unclear: "bit scale"]'; L-0106.
  - Fix: "In the instructor's experience it works very well, though it falters a bit at high scale."

## §5 Why they scale, and when to pick SQL

No issues. L-0114 (the backstory) is worded as the lecture's own account, and L-0122 has its inline clarification and the Cassandra cite.

## §6 Slack: the problem and the schema

- **[Distortion] low** `s6-slack-schema.mdx:129` (F-017).
  - Problem: "It filters a little better than parsing prefixes" was the proposing student's argument, and the teacher did not endorse it. The page states it as fact.
  - Evidence: L-0164 detail.
  - Fix: "Its proposer argued it filters a little better than parsing prefixes, but it is a variation of the same thing: …"

## §7 Sending a message

No issues. Several things were checked:
- Slack's flow is labelled as the instructor's hypothesis ("I may be wrong", 01:29:19), and WhatsApp's as hypothetical.
- L-0200, L-0221 and L-0228 have their inline notes with sources, and the teacher's point is kept in each.
- The A-SRW-04 numbers match the verified additions, and so do the A-SRW-06 and A-MLA-07 additions.

## §8 Scaling WebSocket servers (s8a + s8b)

- **[Distortion] low** `s8a-websockets.mdx:152` (F-006).
  - Problem: "It turns out to be nearest the real answer" is the page's own judgement. In class, "you are the closest" went to L-0273 (line 166).
  - Evidence: L-0263 detail.
  - Fix: "Keep this one in mind: in substance it names the real cost, although in class the 'you are the closest' went to a later answer (below)."
- **[Distortion] low** `s8b-websockets.mdx:160` (F-003).
  - Problem: "intermittently killing a connection". The teacher said "kill one" and didn't specify a connection or a server.
  - Evidence: transcript 02:17:20; L-0304.
  - Fix: "… intermittently killing one (the class didn't say whether a connection or a server) …"

SN-06 (ports) sits right after L-0275 and keeps the point that capacity is finite.

## §9 The whole system

- **[Invention] low** `s9-whole-system.mdx:54` (F-008).
  - Problem: the tab-sharing sentence is fact-check nuance with no cite, and it is tagged L-0434 as if it had been taught. The class answered only the sub-domain part.
  - Evidence: L-0434 detail; transcript 03:10:15.
  - Fix: cut the sentence, or write "The class didn't answer the tab part; …" with the Chromium cite.
- **[Fact-check] low** `s9-whole-system.mdx:139` (F-010).
  - Problem: the L-0354 inline note in the MarginNote has no Envoy cite.
  - Fix: add `<Cite href="https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/">`.
- **[Distortion] low** `s9-whole-system.mdx:145` (F-007).
  - Problem: "zero database credentials" narrows the teacher's "zero credentials" and contradicts the bold rule just before it.
  - Evidence: L-0358; factcheck_applied §3 L-0358.
  - Fix: "The edge server has zero credentials, in the class's words, …" Keep L-0359 and SN-10, which explain the Kafka string.
- **[Figure] low** `s9-whole-system-figs.tsx:241,257,281` and `s9-whole-system.mdx:148` (F-018).
  - Problem: "kafka: write-only" draws SN-10's least-privilege fix as the class's design. The class had a Kafka connection string that "holds no secret".
  - Evidence: L-0359, L-0383; SN-10.
  - Fix: label "kafka conn string", with "(make it write-only: see note)" under it.
- **[Fact-check] low** `s9-whole-system.mdx:200` (F-011).
  - Problem: the SN-08 MITM definition has no source.
  - Fix: add `<Cite href="https://community.owasp.org/attacks/Manipulator-in-the-middle_attack">`.
- **[Figure] medium** `s9-whole-system-figs.tsx:305,321–322` (F-002).
  - Problem: Fig 9·d draws "holds the message / until the commit", which is the student's unconfirmed part of L-0425.
  - Evidence: L-0425 (open); transcript 03:04:06.
  - Fix: remove the labels and the desc clause. If the worker needs a label, use "waits for the ack" (L-0424).

The other SourceNotes in this chapter are placed and sourced correctly: SN-07, SN-09, SN-10, SN-11 and SN-12. SN-12 corrects "all three" to "two of three" and keeps the teacher's point that the storage engine replicates.

## §10 Deleting, ordering, and what to keep

- **[Distortion] low** `s10-deleting-ordering.mdx:61` (F-005).
  - Problem: "Asked in class: chat needs exactly-once delivery and strict ordering, doesn't it?" The student only asked how to think about ordering and exactly-once.
  - Evidence: transcript 02:54:08; L-0404.
  - Fix: "Asked in class: how should we think about ordering messages, and about exactly-once semantics?"
- **[Voice] low** `s10-deleting-ordering.mdx:29`, and page-wide (F-012).
  - Problem: "Asked in class:" or "Suggested in class:" opens 24 paragraphs across 7 files, so the page reads like a transcript. No names or dialogue appear.
  - Fix: keep the formula only for proposals that were corrected or left open. Elsewhere, ask the question directly.

L-0396 (the WhatsApp storage claim) keeps the class's wording and adds the 30-day cite. L-0402 and L-0400 are attributed to the instructor.

## Clips

All four clips are faithful: l02-column-scan, l02-three-ways-to-persist, l02-mesh-to-pubsub and l02-missed-message. Their captions, chapter marks and alt text match the ledger:
- l02-column-scan: 10,000 rows; 100 against 2.
- l02-three-ways-to-persist: the Slack path is labelled a hypothesis, the WhatsApp path hypothetical, the lag is 10 minutes, and "stored late, not delivered late".
- l02-mesh-to-pubsub: 4 users + 3 peers = 7; one link per server; the Pub/Sub keeps nothing.
- l02-missed-message: persisted through Kafka; the push is lost; "last 50" on a timer.
