# Lecture 04 (lec02): content fixes

Each change was checked against `lectures/lec02/transcript/transcript.md`, the ledger and `board/board_log.md` before it was made. New outside facts carry an inline `<Cite>` to a page opened with WebFetch during this round: slack.engineering (Envoy migration) and owasp.org (MITM definition).

Verification:
- Build: `pipeline/bin/site.sh gates lec02 lectures/lec02/qa/gates_content_fix.txt`, build ok, 14 pages. The first run failed the figures gate: a long inline-code schema line made the 6-slack-schema page scroll sideways at 360/390. That line became a list, and the second run ended `GATES PASS`.
- Coverage: 439/439 placed ids on the pages (ledger overall 439/441), `COVERAGE PASS`. Links: zero broken. Figures: ok at 360/390/768/1440, light + dark.
- No `[[L-…]]` or `k=` tag was removed. New text carries ids L-0024, L-0251, L-0310, L-0313 and L-0148.

## 1. Blind exam (exam_grade.json)

| Issue | Change |
|---|---|
| Q039 | `s5-sql-or-nosql.mdx` §5.1: after the three board reasons, added the pink note beneath them, quoted: “We can also achieve [these] on SQL databases. So, saying SQL does not scale is not entirely correct.” It is followed by "give up the constraints that don't help you scale horizontally" and a link to [1.3](#s1-3). Tagged `[[L-0024]]`; the board text is in L-0024's board_text, 00:39:45. |
| Q113 | `s6-slack-schema.mdx` §6.4: after the L-0310 recap sentence, added "a workspace has multiple channels, each with multiple messages" `[[L-0313]]`. Then the recap's four tables as a list, with fields exactly as on board S99/S100 (02:19:39–02:19:45): workspace (id, name); channels (id, workspace_id, name, type, with type added live); messages (id, channel_id, message, user_id, ts); membership (channel_id, user_id, checkpoint). The list ends with the earlier comparison sentence `[[L-0310]]`. |
| Q126 | `s8b-websockets.mdx` §8.4: new opening paragraph giving the recap board's chain in board order (S113/S114, 02:30:00–02:30:03). Each server handles 4 users, so the 5th forms a WebSocket with another server. A→B goes through the local connection pool. A→E is possible only when the message reaches Edge Server 2. So we bridge the gap with a TCP connection. Tagged `[[L-0251]]`. The existing "100 edge servers … Not a great idea! Can we do better?" follows as the next step. |

## 2. Faithfulness audit (faithfulness.json)

| Issue | Change |
|---|---|
| F-001 | The 200 ms SLA (L-0101, unverifiable) is now attributed everywhere it appears. At `s4-graphs.mdx:118` it reads "In the instructor's account, relayed from a bank's engineering lead (see the note below), all of this has to happen within a 200 millisecond SLA" `[[L-0101]]`. "As relayed in class" was added to the chapter dek (:24), the PauseAndThink reveal (:45), the §4.3 dek (:97) and the chapter summary in `lec02.mdx:108`. The figure caption, the figure label and the recall answer already said "described/relayed in class". |
| F-002 | `s9-whole-system-figs.tsx` Fig 9·d: the labels "holds the message / until the commit" became "waits for / the ack" (L-0424, which the teacher taught). The desc no longer says the worker holds the message; it says the worker waits for the ack. The student's unconfirmed part stays only in the prose at s9:239, which already says that only the ack was confirmed. |
| F-003 | `s8b-websockets.mdx` §8.6: "intermittently killing a connection" became "intermittently killing one (the class didn't say whether a connection or a server)". This matches the transcript at 02:17:20, "intermittently kill one" (L-0304). |
| F-004 | `s4-graphs.mdx` Dgraph: "works very well up to a moderate scale" became "works very well, though it falters a bit at high scale". The unclear word ("bit scale", 00:39:02) is no longer filled in. Tagged L-0106 as before. |
| F-005 | `s10-deleting-ordering.mdx:61`: now "Asked in class: how should we think about ordering messages, and about exactly-once semantics?" This is the student's actual question (02:54:08) and no longer asserts anything. |
| F-006 | `s8a-websockets.mdx:152`: "It turns out to be nearest the real answer" became "Keep this one in mind: in substance it names the real cost, although in class the 'you are the closest' went to a later answer (the last one below)". This follows L-0263's detail, where the remark went to L-0273. |
| F-007 | `s9-whole-system.mdx` §9.4: "zero database credentials" became "zero credentials, in the class's words", which matches L-0358. L-0359 and SN-10 still explain the Kafka string. |
| F-008 | `s9-whole-system.mdx:54`: cut the unsourced, untaught "tabs open to the same host share them". It now says "The host name matters" `[[L-0434]]`, which is the transcript's 03:10:15 wording. The page also says the class answered only the host part and left the tab part unanswered (L-0434 detail). |
| F-009 | `s1-nosql.mdx:29`: the untagged retention claim ("every message … for years") became "Slack has to keep every channel's history so that anyone can scroll back through it" `[[L-0148]]` (requirement "historical messages can be scrolled through", board 00:58:30). |
| F-010 | `s9-whole-system.mdx` L-0354 margin note: added `<Cite href="https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/">` after "Slack puts Envoy proxies in front of its WebSocket servers". I opened the page, which says the "entire HAProxy websocket stack was replaced with Envoy Proxy globally". |
| F-011 | `s9-whole-system.mdx` SN-08: added `<Cite href="https://community.owasp.org/attacks/Manipulator-in-the-middle_attack">` to the MITM definition. I opened the page: "The Manipulator-in-the Middle attack (MITM) intercepts a communication between two systems." |
| F-012 | "Asked in class:" was dropped where the question was simply answered, and the question is now asked directly. That covers s9:54, s9:101, s9:131, s9:153 ("Asked again later"), s3:162, s3:174, s2:70, s2:139, s8b:55, s8b:120, s10:41 and s10:92. The attributions still in place are for proposals that were corrected or answered with a challenge (s10:29, s10:61, s9:214, s6:162, s3:119, s2:157, s8b:194). Every answer's own attribution, such as "the class's answer was no", was kept. |
| F-013 | `s4-graphs.mdx` §4.4: now "A fair question: how does a graph actually help, and why can't a relational database solve these use cases? The instructor turned it round: how would you power fraud detection on top of a relational database?" This follows transcript 00:48:44–00:48:53, with the counter-question given to the teacher. |
| F-014 | `s4-graphs.mdx` MLM margin note: "makes much more sense" became "might make much more sense", the teacher's hedge at 02:49:46 (L-0393). |
| F-015 | `s4-graphs.mdx` products: "The board listed a few:" became "The class named a few (the board listed all but BadgerDB):", following L-0104's board text and L-0107, which was spoken only. |
| F-016 | `s2-documents-kv.mdx:70`: the question is now the student's own observation, "MongoDB offers ACID these days, so what is left of the SQL versus non-SQL difference?" (transcript 00:50:04). It is asked directly, without "Asked in class", per F-012. The L-0136 tag and the MongoDB cite are kept. |
| F-017 | `s6-slack-schema.mdx` drafts list: "It filters a little better than parsing prefixes" became "Its proposer argued it filters a little better than parsing prefixes", following L-0164's detail, where this was the student's argument. |
| F-018 | `s9-whole-system-figs.tsx` Fig 9·c: both "kafka: write-only" labels became "kafka conn string" (L-0359, L-0383). The panel-a desc says "holds only a Kafka connection string (the note below suggests making it write-only)". The Fig 9·c caption in `s9-whole-system.mdx` and the TradeoffTable cell now present write-only as SN-10's suggestion, not as the class's design. |
| F-019 | `s3-columns.tsx` Fig 3·c: both labels now read "never the primary copy", the teacher's word at 00:26:45 (L-0073). The desc reads "which, as taught, is never the primary copy". The fact-check nuance stays in the body at s3:121 with its ClickHouse cite. |

## 3. Design critique, content-owned (critic.json --owner content)

| Issue | Change |
|---|---|
| C-09 | `s6-slack-schema.mdx` Fig 6·c caption: the timeline sentence "Time runs down." was dropped. The caption now opens with "Each step is one draft of messages…". For the numbering, the reading order was 6·a, "6·b, so far", 6·c, then a second plain "6·b". The completed schema is now labelled "Fig 6·b, complete", so it reads as the return to 6·b and not as a jump back. The ids (fig-6b, fig-6c) are unchanged, so the design shots still resolve. |
