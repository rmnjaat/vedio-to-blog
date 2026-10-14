# Lecture 05 (lec08): content fixes

Files changed:
- `site/src/content/lectures/lec08/` s0, s1, s2, s3, s4a, s4b, s5a, s5b, s6a, s6b, s7 and s8
- text strings only in `site/src/figures/lec08/s1-approach.tsx` and `s5b-design.tsx`

Every change was checked against `lectures/lec08/transcript/transcript.md` and `ledger/ledger.jsonl` before it was made. Four sources were newly opened with WebFetch for new outside facts:
- RFC 8305
- RFC 1034 §3.6
- SQS `ReceiveMessage` API reference
- Kleppmann's 2016 post

The Oracle queue link is the source listed in the fact-check for L-0302.

Verification:
- **Gates.** `pipeline/bin/site.sh gates lec08 lectures/lec08/qa/gates_content_fix.txt`: build ok (12 pages), COVERAGE PASS 376/376 placed ids, zero broken links, figures ok at 360/390/768/1440 light and dark, then **GATES PASS**.
- **Tags.** No `[[L-…]]` or `k=` tag was removed. New tags were added:
  - s0: `[[L-0165 L-0350]]`, `[[L-0014]]`, `[[L-0177]]`
  - s5b: `[[L-0185]]`
  - s6b: `[[L-0332]]`
  - s7: `[[L-0322 L-0280]]`
  - s4b: a second `[[L-0167]]`

## 1. Blind exam (exam_grade.json)

| Q | Change |
|---|---|
| Q069 | `s4b-control-plane.mdx` §4.4: replaced "That cost is real, but the main one is staleness". It now says the tempting reason is that checking which backends are alive slows the user requests at the LB server, and it doesn't, because the orchestrator runs the health checks, not the LB server. It adds that polling the database does keep the LB server busy, but the main cost is staleness. This follows transcript 01:21:16 ("No, no, no. Orchestrator is doing it…") and 01:21:28, where the teacher accepts the polling point, as in the L-0167 detail. `[[L-0167]]` |
| Q093 | `s5b-design.mdx` §5.4: added the prepared page's line, "scaling will happen on CPU, memory and the number of TCP connections. Where do we have this data? The monitoring component, Prometheus." `[[L-0185]]` (board 01:50:57). The `s4b` vitals parenthetical now reads "(The board added the number of TCP connections: scaling will happen on CPU, memory and # TCP connections.)" `[[L-0185]]` |
| Q094 | Fig 5·c caption: autoscaling "acts through the LB console APIs: its arrow points into the console box", plus "The board wrote 'leaderElec' above the orchestrator". D5C desc in `s5b-design.tsx`: "and autoscaling points into the LB console / APIs … (the board wrote leaderElec above it)" (L-0222, board_log 01:51). |
| Q143 | `s6b-remote-locks.mdx` §6.7: after `[[L-0330]]`, added that in the same answer ZooKeeper's notification framework is just real-time Pub/Sub, a pool of persistent TCP connections notifying every subscriber, so it could replace Redis Pub/Sub in the LB design, with a link to [§4.5](#s4-5). `[[L-0332]]` (transcript 03:01:55). |

## 2. Faithfulness audit (faithfulness.json)

| id | Change |
|---|---|
| F-001 | `s5a-dns.mdx:102`: now "It need not be. The class's answer was to build the client so it doesn't wait for the TTL…" `[[L-0231]]`, followed by the L-0231 nuance as separate cited sentences. Many client stacks first try the other addresses from the same DNS answer (RFC 8305), and a fresh query can still be answered from an intermediate resolver's cache until the TTL runs out (RFC 1034 §3.6). Step 5 of Fig 5·b now says "a client built this way". In s5b, the TradeoffTable LB-server "If it dies" cell and the recall answer now open with "In the class's design". |
| F-002 | Fig 1·b caption: "The lecture called any layer that can't scale out a single point of failure; more precisely (see the note), the database here is one machine…". The figure desc carries the same. The recall question is now "The lecture said a layer that can't scale out is a single point of failure. What does the fact-check add?" (L-0038, SN-01). |
| F-003 | `s2-algorithms.mdx:44`: "Yet, as the instructor put it, it is a piece of code someone wrote…" `[[L-0046]]` |
| F-004 | `s2:46`: "in production" changed to "in practice". `[[L-0045]]` |
| F-005 | `s2:192` and Fig 2·d step 4: "the answer in class was to pick one of them at random". `[[L-0089]]` |
| F-006 | `s2:246`: the question is now posed directly: "How can one HTTP request take an hour?" |
| F-007 | `s2` TradeoffTable: least connections / infrastructure is now "Not discussed in class". Weighted round robin / load is now "Not discussed in class (the example assumed uniform load)". |
| F-008 | `s7:110`: "The line was not named at that moment; most likely it is the one pointed at earlier in the same answer, the failure branch of acquire…" `[[L-0322 L-0280]]` (02:51:06). `s8:45` now says "most likely the release-on-failure branch". |
| F-009 | `s0-header.mdx`: cut the untaught cache/TTL and "put off to this week" clause. Tagged the supported links `[[L-0165 L-0350]]`, `[[L-0014]]` and `[[L-0177]]`. |
| F-010 | `s6a:131`: "Some real queues hide a message… Oracle Cloud's (OCI) queue was the example raised in class (docs.oracle.com), and SQS works the same way: … visibility timeout, 30 seconds by default, and reappears if it isn't deleted in time (SQS ReceiveMessage docs)." `[[L-0302]]` |
| F-011 | `s5b` TradeoffTable Prometheus "If it dies" is now "Not discussed in class". |
| F-012 | `s7:72`: the fencing-token sentence now cites both redis.io and Kleppmann. |

## 3. Design critique, content-owned (critic.json)

| id | Change |
|---|---|
| C-01 | **Attributions.** About 50 attributions were rewritten as plain claims or cut, across s0–s8. In prose (excluding "Redrawn from the class board" captions), "the instructor" went from about 56 lines to about 20, and "the class" from about 65 to about 20, which meets the <30 target. The "the instructor" count misses the <10 target on purpose. The ones left are required by the fact-check policy: the unverifiable items L-0045, L-0046, L-0065, L-0085, L-0091, L-0276, L-0333, L-0344 and L-0370 have to stay attributed. The rest are first-person stories or resources that can't be stated as plain fact (ARLB/apt-get/malloc story, blog, videos, Chubby as first paper read, ~180 projects). **Biography asides.** Their titles were renamed: "Weighted round robin, from practice" (which now opens as the motivation for weighted round robin), "A first load balancer, from practice", "Two apt-gets, from practice", "A learning habit, from practice". "The instructor's master's professor" became "A professor…". "(The instructor has no video on it.)" was cut. **§7.1 verdict.** Now `right="Right: independent nodes and a majority (Redlock)."` and `wrong="Not for locks: Redlock spreads the lock over independent nodes…"`. All tags were kept. |
| C-04 | All prose and recall text now uses `payments.lb.google.com`: s5b §5.4 request path, §5.6 (three places) and the §5.7 recall question. The desc strings of Fig 5·c and Fig 5·e in `s5b-design.tsx` were updated to match. The drawn labels in those figures are C-03, owned by design. |
| C-13 | `s4a` §4.1 now opens with "§3's question already gave the number: 5,000 clients per LB server." The repeated "Put numbers on it…" arithmetic paragraph was cut. L-0122 is kept and Fig 4·a stays. |
| C-17 | Fig 1·b: the `dns` row label is now `stateless svc` (with the doc-fold marks dropped so it reads as a service box), and the desc lists the same seven layers as the prose. The prose follows the transcript list at 00:15:14, which has no DNS, so the figure was changed rather than the text. |
| C-18 | Fig 2·c caption: "The board's request numbers are cut off" was replaced with "The request numbers follow the 1 : 2 : 1 rule." Fig 5·c caption: the phone-layout sentence was replaced with a plain description of the thin control lines. |
