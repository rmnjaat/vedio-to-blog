# Lecture 04 (site: Lecture 01): faithfulness audit

## Scope

This audit covers:
- the page: `site/src/content/lectures/lec04.mdx` and `lec04/*.mdx` (s0 to s7)
- the figure texts in `site/src/figures/lec04/*.tsx`: labels, step texts, titles and descriptions
- the clip captions and alt text in `site/src/animations/clips/l04-*/timeline.ts`

It checks them against:
- `lectures/lec04/ledger/ledger.jsonl`, using the `[[L-…]]` and `k=` tags
- `lectures/lec04/transcript/transcript.md`
- `lectures/lec04/lesson/factcheck_applied.md` and `factcheck/final.jsonl`
- `lectures/lec04/board/diagrams.md`

No site files were edited. The full issue list is in `faithfulness.json`.

## Summary

| Kind | Total | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 4 | 0 | 1 | 3 |
| Invention (untagged, unsourced) | 1 | 0 | 0 | 1 |
| Fact-check application | 1 | 0 | 0 | 1 |
| Voice | 1 | 0 | 0 | 1 |
| Figures | 6 | 0 | 0 | 6 |
| Clips | 1 | 0 | 1 | 0 |
| **Total** | **14** | **0** | **2** | **12** |

There are no high-severity issues.

### Coverage

Every paragraph was read against its tagged ledger items. Counts are prose blocks per part. The PauseAndThink, RuleBox, StepThrough, TradeoffTable, recall and margin-note texts were also checked.

| Part | Paragraphs checked |
|---|---|
| s0-header | 13/13 |
| s1-approach | 23/23 |
| s2a-green-dots | 32/32 |
| s2b-green-dots | 35/35 |
| s3-redis-or-dynamodb | 63/63 |
| s4a-heartbeats | 41/41 |
| s4b-heartbeats | 42/42 |
| s5a-blog-rows | 50/50 |
| s5b-blog-rows | 52/52 |
| s6-cache | 54/54 |
| s7-keep | 23/23 |
| Figures (exported figure components) | 42/42 |
| Clips (l04-heartbeat-expiry, l04-connection-pool, l04-staggered-delete, l04-cache-aside) | 4/4 |

### Fact-check application

All 16 SourceNotes (SN-01 to SN-16) are on the page:
- Each sits directly after its taught point and links its listed sources.
- Each keeps the teacher's version beside it (for example "as stated in class, as soon as we hit 2032", "from BCE up to about 20,000 years, 'I think'").
- SN-04 carries the "Since the class" label.

All 24 inline clarifications are present, with sources. This includes the L-0159 arithmetic note (10 to 15 is 1.5×) and the L-0105 8 MB / 8 GB note.

All 12 unverifiable items are attributed as the instructor's story or experience, with no empty links (for example "take it as his account", "As an illustration", "said plainly that it doesn't know the details").

The "keep" additions for left-as-taught items appear as separate sourced sentences. The one exception is L-0101: see F-005.

The three open items are stated as points raised, not as endorsed:
- L-0072
- L-0087
- L-0325

L-0292 is the exception: see F-001.

### Voice

The page has no student names, no "Student N", and no "teacher" or "student" anywhere in the page, the figures or the clips. Questions are attributed to "a participant", "someone in class" or "a question". "Asked in class:" appears four times; this is flagged once, as low.

## Most serious

1. **F-001** `s6-cache.mdx:140` (Distortion, medium). A participant's broken, half-audible condition, "given that the computation you are saving is humongous", is presented as one that "the class agreed with". The ledger marks the claim itself as uncertain, and factcheck_applied §7 requires it to be stated as a point raised. Evidence: L-0292, transcript 02:35:33.
2. **F-002** `clips/l04-staggered-delete/timeline.ts:90` (Clip, medium). The clip shows a one-shot delete's locks making user requests give up. That frames locks as an availability failure, but the class said a hard-delete job causes no downtime and that the locking worry is about strong consistency. The margin note on the page says the same thing right below the clip. Evidence: L-0282, L-0284, transcript 02:30:54 and 02:31:28. The taught point to keep is "stagger it to reduce the impact" (L-0283, 02:37:39).
3. **F-005** `s2b-green-dots.mdx:173` (Fact-check, low). The teacher said "they're built using WebSockets". The page never states it: it rewrites it as "a persistent connection" and then corrects it with MQTT, although L-0101 is left-as-taught.
4. **F-006** Fig 4·h, `s4b-heartbeats.tsx:181` (Figure, low). The load-balancer panel draws only the fact-check's pull health checks, replacing the taught version, in which backend heartbeats tell your own LB which backend is down.
5. **F-009** Fig 6·e, `s6-cache.tsx:288` (Figure, low). The exercise figure adds a CDN that is not on the board and pre-answers places the class left for the reader: the browser, an API server and the database.

Issue format: **[Kind] severity** `file:line`, then the problem, the evidence and the fix.

---

## §0 Header and §1 Approach

No issues. The class's own claims are checked:
- L-0022 is attributed to "ten or eleven years" of the instructor's experience.
- L-0028 does not resolve the ambiguous "this".
- L-0023 has its inline Spiral-model note.
- "That blog is where Lecture 2 picks up the story" matches course.json (lec01, "Medium under load").

## §2 Green dots (s2a, s2b)

- **[Voice] low** `site/src/content/lectures/lec04/s2a-green-dots.mdx:109` (also `s2b-green-dots.mdx:169`) **(F-014)**
  - **Problem:** "Asked in class: …" keeps the classroom Q&A form. There are no names.
  - **Evidence:** L-0335, L-0327.
  - **Fix:** drop the "Asked in class:" lead-ins ("Can HTTP run without TCP? HTTP runs on top of TCP…"; "Is the TTL worth its cost? It was there because space mattered…").
- **[Fact-check] low** `site/src/content/lectures/lec04/s2b-green-dots.mdx:173` **(F-005)**
  - **Problem:** L-0101 (simplified/low, left as taught, A-OOI-18 woven in) loses the teacher's actual words, "built using WebSockets".
  - **Evidence:** transcript 01:03:03.
  - **Fix:** "Real online/offline indicators are not built this way: as the class put it, they are built using WebSockets, with many tunings and optimisations on top. The common thread is a persistent connection. When Facebook built Messenger, for example, it kept that connection over MQTT… [[L-0101]]"
- **[Figure] low** `site/src/figures/lec04/s2a-green-dots.tsx:227` (Fig 2·e; step texts at `s2a-green-dots.mdx:139,141`) **(F-011)**
  - **Problem:** "10 min of use" and "an hour later" are durations the class never gave, and nothing marks them as illustrative.
  - **Evidence:** L-0046.
  - **Fix:** add "Times are illustrative." to the caption, or say "later" / "much later".

The 10-second heartbeat used in §2.4 is on the board at 00:32 (D-07, "User sends heartbeat every 10 seconds"), so it is fine.

## §3 Redis or DynamoDB?

- **[Distortion] low** `site/src/content/lectures/lec04/s3-redis-or-dynamodb.mdx:104` **(F-004)**
  - **Problem:** the managed-vs-self-hosted value question is placed "near the end of class". It was asked at 01:20, in the pooling Q&A.
  - **Evidence:** L-0139.
  - **Fix:** "The question came back in the Q&A after the pooling discussion, from a different angle: …"

Checked and correct in this part:
- The student proposals are framed as answers from the class (L-0072 to L-0076, L-0088, L-0093), and the corrections are attributed to the lecture.
- The Walmart inline note (L-0080) keeps "The lecture said Walmart is on GCP".
- SN-03, SN-04 and SN-05 sit directly after their points.
- L-0087 is stated as having "no clear verdict".

## §4 Six million heartbeats a minute (s4a, s4b)

- **[Distortion] low** `site/src/content/lectures/lec04/s4a-heartbeats.mdx:216` **(F-003)**
  - **Problem:** the RuleBox says the two halves were said "three hours apart". They were said at 01:17 and 02:56, about 1 h 40 min apart.
  - **Evidence:** L-0131, L-0320.
  - **Fix:** "about an hour and forty minutes apart".
- **[Invention] low** `site/src/content/lectures/lec04/s4a-heartbeats.mdx:118` (and `s4b-heartbeats.mdx:156`) **(F-010)**
  - **Problem:** the clip lead's "A write takes 1 ms inside the database" and the recall question's "well under a millisecond" are numbers that were not taught and have no source.
  - **Evidence:** L-0111.
  - **Fix:** "Each heartbeat updates one row by primary key. How much of its time is the write itself?"
- **[Figure] low** `site/src/figures/lec04/s4a-heartbeats.tsx:64` (Fig 4·a) **(F-012)**
  - **Problem:** "(the board's note, 01:23)". The board added the note at 01:24:45–01:26:00.
  - **Evidence:** D-10.
  - **Fix:** "01:25".
- **[Figure] low** `site/src/figures/lec04/s4b-heartbeats.tsx:181` (Fig 4·h panel b and its caption at `s4b-heartbeats.mdx:139`) **(F-006)**
  - **Problem:** the panel shows only the pull health checks ("same idea, the lb asks"). The taught point was that the same heartbeats tell your own load balancer that a backend is down. The fact-check note belongs beside that version, not instead of it, as the prose at :136 does.
  - **Evidence:** L-0133, transcript 01:18:18.
  - **Fix:** draw backend heartbeats into the LB, with the dead backend "not routed", and add a grey note: "real LBs often ask instead (health checks)".

Checked and correct in this part:
- The "five trips as the lecture counts them" framing, with the L-0109 note.
- The "not really memory" self-correction is kept beside the L-0117 note.
- L-0135, L-0149, L-0157 and L-0159 are treated as specified.
- L-0325 is stated as an open suggestion, with SN-06 directly after it.
- L-0137 is attributed as "in the lecture's experience".

## §5 Blog rows (s5a, s5b)

- **[Distortion] low** `site/src/content/lectures/lec04/s5a-blog-rows.mdx:164` **(F-013)**
  - **Problem:** a participant's follow-up (the hourly job takes pool connections) is introduced with "Asked in class:" and reads as the instructor's answer. The answer was only "you gain some, you lose some".
  - **Evidence:** L-0295, transcript 02:38:19 and 02:38:37.
  - **Fix:** "A follow-up pointed out that it takes one or two connections from the connection pool…, while not deleting lets the data grow. The answer: you gain some, you lose some; you never win it all."
- **[Figure] low** `site/src/figures/lec04/s5a-blog-rows.tsx:213` (Fig 5·d) **(F-008)**
  - **Problem:** "staggered, off-peak" was not taught. The class's scenario is deleting while traffic is high, spread across the whole day.
  - **Evidence:** L-0283, transcript 02:37:39.
  - **Fix:** "staggered across the day".

Checked and correct in this part:
- All nine SourceNotes in §5 (SN-07 to SN-15) sit directly after their points and keep the taught claim: "as stated in class, 2032", "'I think' 20,000 years", "fixed-width rows" as described by the lecture.
- The Redbus story is attributed ("take it as his account").
- L-0228 is the student's objection with the teacher's "No, no, no" answer, plus its inline note.
- The bio length "about 140" and the epoch redraw follow factcheck_applied §7.

## §6 What a cache is

- **[Distortion] medium** `site/src/content/lectures/lec04/s6-cache.mdx:140` **(F-001)**
  - **Problem:** "The class agreed with one condition on that conclusion: it holds given that the computation you are saving is large." The condition was a participant's broken sentence, and the ledger marks the claim as uncertain.
  - **Evidence:** L-0292, transcript 02:35:33, factcheck_applied §7.
  - **Fix:** "A participant added a condition, as far as the recording lets us hear it: 'given that the computation you are saving is humongous'. The instructor answered 'Right.' [[L-0292]]"
- **[Figure] low** `site/src/figures/lec04/s6-cache.tsx:288` (Fig 6·e, caption at `s6-cache.mdx:217`) **(F-009)**
  - **Problem:** the figure adds a CDN cloud that is not on board D-15, and tags 2–6 (browser, CDN, LB, API server, database) pre-answer the exercise. The class hinted only the CDN and the load balancer, and deferred local storage (L-0262).
  - **Evidence:** L-0256, D-15.
  - **Fix:** tag only the central cache (done) and the two hinted places. Caption: "The class's hints: the CDN and the load balancer. Find the rest yourself."

Checked and correct in this part:
- SN-16 is right after L-0288.
- L-0279 is labelled "the lecture's reasoning rather than an industry rule".
- The hedge in L-0276 is kept ("wasn't sure of any and had never used one").
- The Goldman Sachs story is attributed to the instructor.

## §7 What to keep

- **[Figure] low** `site/src/figures/lec04/s7-keep.tsx:22` (Fig 7·a, caption at `s7-keep.mdx:19`) **(F-007)**
  - **Problem:** the summary shows the presence store as Redis. The class's final logic was "Redis or DynamoDB, whichever DB you choose".
  - **Evidence:** L-0070, transcript 00:44:40.
  - **Fix:** label it "redis / dynamodb · ttl 30s", and say "a key-value store with a 30-second TTL, Redis or DynamoDB (§3)" in the caption.

## Clips

- **[Clip] medium** `site/src/animations/clips/l04-staggered-delete/timeline.ts:90` (captions B1–B2, and the alt text at :140) **(F-002)**
  - **Problem:** the one-shot DELETE "holds its locks" and requests "give up" (7 of them). That shows lock contention as an availability failure, which the class rejected ("There would not be any downtime…", "That's not going down. That's just about being strongly consistent"). The lock and timeout model comes from the L-0284 fact-check nuance, which was left as taught.
  - **Evidence:** L-0282, L-0284, L-0283.
  - **Fix:** "All in one shot: one huge DELETE puts its whole load on the database at once." / "Requests slow down behind it while it runs." Show slowed requests rather than requests that give up, or mark the request model as illustrative.

The other three clips match the ledger and the page:
- **l04-heartbeat-expiry:** the EX 30 trap is the SN-02 addition.
- **l04-connection-pool:** "five trips … plus the database login".
- **l04-cache-aside:** 3–4 table join; "the hop remains".
