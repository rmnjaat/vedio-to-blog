# Lecture 05 (lec08): faithfulness audit

**Scope.** The audit covers:
- the page: `site/src/content/lectures/lec08.mdx` and `lec08/*.mdx`
- the figure texts in `site/src/figures/lec08/*.tsx`
- the clip captions and alt text in `site/src/animations/clips/l08-*/timeline.ts`

**Sources.** These were checked against:
- `lectures/lec08/ledger/ledger.jsonl`, through each `[[L-…]]` and `k=` tag
- `lectures/lec08/transcript/transcript.md`
- `lectures/lec08/lesson/factcheck_applied.md` and `factcheck/final.jsonl`
- `lectures/lec08/board/diagrams.md` and `board_log.md`

No site files were edited. Machine-readable issues are in `faithfulness.json`.

## Summary

| Kind | Count | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 3 | 0 | 1 | 2 |
| Invention (untagged and unsourced) | 3 | 0 | 0 | 3 |
| Fact-check application | 3 | 0 | 0 | 3 |
| Voice | 3 | 0 | 0 | 3 |
| Figure / clip (beyond those above) | 0 | 0 | 0 | 0 |
| **Total** | **12** | **0** | **1** | **11** |

There are no high-severity issues.

## Coverage

| Part | Units checked |
|---|---|
| lec08.mdx (frontmatter, chapter summaries) | 1/1 |
| s0-header | 7/7 |
| s1-approach | 40/40 |
| s2-algorithms | 86/86 |
| s3-one-laptop | 64/64 |
| s4a-control-plane | 34/34 |
| s4b-control-plane | 65/65 |
| s5a-dns | 41/41 |
| s5b-design | 45/45 |
| s6a-remote-locks | 47/47 |
| s6b-remote-locks | 56/56 |
| s7-distributed-locks | 54/54 |
| s8-keep | 30/30 |
| SourceNotes (SN-01 … SN-08) | 8/8 |
| Inline clarifications | 20/20 |
| Unverifiable attributions | 17/17 |
| Figures | 36/36 |
| Clips | 4/4 |

A "unit" is a prose paragraph, list item, figure caption, step text, prompt, recall answer or table row.

**Fact-check application.**
- All 8 SourceNotes are on the page. Each sits directly after its tagged point, keeps the teacher's sentence and carries its listed sources: SN-01 L-0038, SN-02 L-0091, SN-03 L-0227, SN-04 L-0369/0370, SN-05 L-0303, SN-06 L-0328, SN-07 L-0305/0306, SN-08 L-0316/0318.
- All 20 inline clarifications are present and sourced. L-0282 lacks one of its two links (F-012).
- 16 of the 17 unverifiable items are worded as the instructor's or the class's. The exception is L-0046 (F-003).
- The "left as taught" additions appear as separate sourced sentences, not as corrections.

**Voice.**
- No student names and no "Student N" appear.
- There is one "asked in class" (F-006).
- "The instructor" is used for the teacher's own stories and opinions, which is acceptable.
- Student proposals the teacher rejected (L-0172, L-0186, L-0189, L-0191, L-0207, L-0218, L-0250–0253, L-0311, L-0337, L-0347) are presented as ideas raised and then turned down, not as course content.

**Figures and clips.** All match the board and the ledger:
- request numbers RR 1,4/2,5/3,6, WRR 1,5/2,3,6,7/4,8, LC 1,5,7/2,4,8,9/3,6,10 (D-02)
- addresses 10.0.0.1:9000 and .7/.8/.9:8081, and the tcp1→tcp2 / tcp3→tcp4 map (D-03)
- meta port 9091 and the CDC → pub/sub → LB config path (D-04, D-06)
- `queue7 : consumer 2`, ex 300 (D-08, D-09)
- five independent masters, no replication (D-10)

Prometheus is drawn as scraping, but the captions say that the class drew agents pushing (L-0200 treatment). That is correct and disclosed. The MongoDB figure shows both the taught version and the documented one.

The four clips (stale config, RR vs least connections, lock TTL, Redlock) stay inside the taught numbers: 10 s poll / nine seconds, five-minute TTL, three of five.

### Most serious

1. **`s5a-dns.mdx:102` (Distortion, medium).** The teacher's first-person design answer is stated as general client behaviour: "the client doesn't wait for the TTL… it immediately invalidates its cache". The teacher actually said "I would explicitly invalidate my cache", after "I was not aware of this". The same claim is repeated in Fig 5·b step 5, the s5b table and a recall answer. The L-0231 fact-check nuance (clients usually try the other addresses in the same answer, and intermediate resolvers can still serve the cached answer) is also missing.
2. **`s1-approach.mdx:117` (Fact-check, low).** Fig 1·b and the second recall question state only SN-01's corrected version. The teacher's "not horizontally scalable = single point of failure" is not visible in the figure.
3. **`s7-distributed-locks.mdx:110` (Distortion, low).** The page names "the one line people miss" as the release-on-failure branch. The teacher did not name it at that point, so this is an inference stated as fact. s8 repeats it.

Issue format: **[Kind] severity** `file:line`, then the problem, the evidence and the fix.

---

## §0 Header and lec08.mdx

- **[Invention] low** `s0-header.mdx:27`. The "so far" recap is untagged and includes earlier-lecture facts that are not in this lecture's sources: the LB as a cache location, and LB internals "put off to this week". Three of its links do have ledger support.
  - Evidence: L-0014, L-0165, L-0177, L-0350.
  - Fix: tag [[L-0165 L-0350]], [[L-0014]] and [[L-0177]] at the matching sentences. Either link Lecture 2's page for the cache claim or cut that clause.

The frontmatter, the dek and the chapter summaries match the ledger.

## §1 Approach

- **[Factcheck] low** `s1-approach.mdx:117` (Fig 1·b caption; labels at `s1-approach.tsx:121-123`; recall q at `:142`). Only the corrected version is shown. The teacher's point (L-0038) is missing from the figure, and the recall question tests the reader against it.
  - Fix: open the caption with "The class called any layer that can't scale out a single point of failure [[L-0038]]. More precisely…", and reword the recall question to "The class said…; what does the fact-check add?".

Checked and fine:
- the hedges "take it with a pinch of salt" (L-0030) and the instructor's opinions (L-0021, L-0002, L-0025)
- Murphy's law on the board (L-0026)
- the cut-corners escape hatch (L-0044)
- A-DSC-09 as a separate SRE-book sentence

## §2 Algorithms

- **[Factcheck] low** `s2-algorithms.mdx:44`. L-0046 is unverifiable but is stated as fact.
  - Fix: "as the instructor put it, …".
- **[Distortion] low** `s2-algorithms.mdx:46`. "In production" is added; the transcript has "in order to get performance" only.
  - Fix: "in practice".
- **[Voice] low** `s2-algorithms.mdx:192` (also step 4 at `:164`). "Pick one at random" is said inside Student 3's turn, but it is presented as settled.
  - Fix: "the answer in class was to pick one of them at random."
- **[Voice] low** `s2-algorithms.mdx:246`. "…was asked in class."
  - Fix: pose the question directly.
- **[Invention] low** `s2-algorithms.mdx:217-218` (TradeoffTable). The cells "Any; the counts adapt" and "Uniform per unit of capacity" were never taught.
  - Fix: "Not discussed in class".

Checked and fine:
- SN-02 after L-0091, with "according to the instructor" kept (the transcript has "If you go through BigQuery's Redshift documentation")
- inline L-0064, L-0073, L-0084, L-0085, L-0093, all with their links
- the L-0065 margin note with the A-LBL-13 sentence
- the 80% / 40% numbers (L-0061)
- the 1 : 2 : 1 weights and the disclosure that the board's numbers were cut off
- the microseconds-vs-milliseconds point (L-0081)

## §3 One laptop

No issues. Checked and fine:
- the board addresses and ports
- `lb.go` port 9090 and backends 8081–8084 (L-0126)
- the "ten lines … even ten an exaggeration" hedge (L-0008)
- the "raises a panic" attribution with the Go correction (L-0138 inline)
- the byte-stream and ICMP clarifications (L-0117, L-0118)
- 10,000 ÷ 2 = 5,000 (L-0122)
- the forward chips: CDN → Lecture 7 (lec09 has the CDN content), consistent hashing → Lecture 9 (lec07)

## §4 Control plane (s4a, s4b)

No issues. Checked and fine:
- the student proposals and their fates: L-0158 (open, kept as "a tempting shortcut"), L-0172 (rejected), L-0186/0189/0191 (corrected), L-0193 (dismissed)
- the 9-second window (L-0169) and the meta ports 9090/9091 (L-0171)
- SN-03 right after "guarantees message delivery" (L-0227)
- SN-04 after L-0369/0370, with "per the instructor" on the InfluxDB claim
- the L-0200 scrape correction
- ZooKeeper watches (L-0331/0332, with A-LBL-17)
- "Lecture 4" for Slack Pub/Sub, "Lecture 9" for CDC ("fifth week")

## §5 DNS and design (s5a, s5b)

- **[Distortion] medium** `s5a-dns.mdx:102` (also `:92` step 5, `s5b-design.mdx:133`, `:149`). The teacher's "I would explicitly invalidate my cache" is stated as universal client behaviour, and the L-0231 nuance is dropped.
  - Evidence: transcript 01:55:00.
  - Fix: "The class's answer was to build the client so it doesn't wait for the TTL…", plus one sentence on clients trying the other addresses in the same answer first and on intermediate resolver caches.
- **[Invention] low** `s5b-design.mdx:133` (TradeoffTable). The Prometheus "If it dies" cell was not taught.
  - Fix: "Not discussed in class".

Checked and fine:
- L-0217 (open) is kept as an unresolved worry
- the L-0218 and L-0347 corrections
- the "at random" vs "round robins" inconsistency (L-0347) is disclosed
- the L-0234 "latency, most likely meaning load" hedge
- the L-0380 referent hedge
- inline L-0208, L-0234, L-0236, L-0353, L-0355, with links
- "Kind of", the seven layers and Maglev (L-0238)
- the L-0360 student summary is marked open

## §6 Remote locks (s6a, s6b)

- **[Voice] low** `s6a-remote-locks.mdx:131`. The student's OCI example is presented as class content, and the fact-check's "SQS does the same (30 s default)" is not stated.
  - Fix: "OCI's queue was the example raised in class, and SQS works the same way…".

Checked and fine:
- the dpkg story and the L-0245 inline correction (fcntl, `/var/lib/dpkg/lock`)
- the nearest-shared-storage ladder (L-0246, and the student summary L-0308, which the teacher endorsed)
- the rejected routes L-0250–0253
- SN-05 after L-0303
- the L-0258 inline note on single-instance vs Redlock
- the board code: `setnx(q, consumer_id, ex=300)` and the get/delete release
- the timeout edge case (L-0269, L-0271)
- the single-connection lock: L-0292 and L-0293 kept open, and the L-0293 host-crash addition
- SN-06 after L-0328
- SN-07 after L-0305/0306; shards 1, 3, 5 follow the ledger's reading of the teacher's slip
- the L-0307 inline note

## §7 Distributed locks

- **[Distortion] low** `s7-distributed-locks.mdx:110` (and `s8-keep.mdx:45`). "The line" is identified as fact.
  - Fix: "most likely the failure branch pointed at earlier…".
- **[Factcheck] low** `s7-distributed-locks.mdx:72`. The L-0282 inline note cites redis.io only; Kleppmann, which factcheck_applied also lists, is missing.
  - Fix: add the Kleppmann Cite.

Checked and fine:
- "run it in cluster. That's not how real systems are" is faithful (02:28:40)
- L-0276 is the instructor's view
- the L-0279 inline note (TTL minus acquisition time)
- the L-0280 addition (unlock all, random delay)
- SN-08 after L-0316/0318, with the 2–3 s window kept as taught
- the L-0319 inline note
- ports 6379–6383 (L-0321)
- "180 projects" (L-0326)
- the distribute-vs-scale distinction (L-0287/0288) and the L-0283 nuance

## §8 What to keep

Only the L-0322 repeat (counted under §7). The table's "More precisely" column repeats only facts that are already sourced on the page. The forward chips match the ledger: tomorrow, next week, "fifth week" and week 7.

## Figures and clips

All 36 figure modules and the 4 clips were checked by their visible labels, `desc` / alt text and captions. They raised no issues beyond F-002 (Fig 1·b), F-001 (Fig 5·b step 5) and F-005 (Fig 2·d step 4), which are counted above.
