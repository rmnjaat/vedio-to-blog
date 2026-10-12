# Verdict review: second fact-checker, lecture 02

Date: 2026-10-13. I reviewed the checker files as they stood at 00:17 IST. `databases_consistency` and `slack_rtc_websockets` were rewritten between 00:10 and 00:14 while I was working. I redid every check against the rewritten versions, and nothing below relies on the earlier drafts.

Scope:
- Every verdict marked `wrong` or `outdated`, or with severity `medium`/`high`, in `databases_consistency.jsonl`, `slack_rtc_websockets.jsonl` and `messaging_learning_approach.jsonl`. That is 16 items: 8 in databases_consistency, 8 in slack_rtc_websockets and 0 in messaging_learning_approach.
- 15 randomly sampled `accurate` verdicts (seed 8).
- All 60 proposed additions.

I opened every URL cited below myself. For each flagged item I re-read the ledger row and the transcript at its timestamps. When I couldn't open a URL, the entry says so.

## Summary

- **Flagged verdicts.** I re-checked all 16. I agree with 14 and dispute 2. Both disputes are severity downgrades from medium to low; I keep the verdict label in both.
- **Spot-check.** All 15 sampled `accurate` verdicts agree. 12 of the 15 are reasoning or design claims with no source ("Correct as stated for this context"), which is acceptable for those.
- **Additions.** Of the 60 proposed, 53 are confirmed, 7 need rewording and 0 are rejected. Usefulness: 50 keep, 10 optional. The optional ones are mostly cross-group duplicates:
  - A-MLA-01 duplicates A-SRW-10.
  - A-MLA-02 duplicates A-SRW-11.
  - A-MLA-04 duplicates A-SRW-05.
  - A-MLA-10 overlaps A-DC-20.
- **Version drift.** Six items, listed below. None of them overturns a verdict.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0320 | imprecise / medium | **imprecise / low** | The item states the browser's HTTP/1.1 per-host limit of six. That limit is real: Chromium main `client_socket_pool_manager.cc` says "Default to allow up to 6 connections per host", and Firefox `all.js` has `pref("network.http.max-persistent-connections-per-server", 6)`. A learner who repeats "6 per host" is right for HTTP/1.1. The harmful conclusion, that a WebSocket uses up one of the six, belongs to L-0324 and L-0325, which are already `wrong/medium` with sourced notes. Grading the premise medium as well counts the same error twice. An inline clarification is enough: the limit is HTTP/1.1 only, WebSockets have their own pool, and HTTP/2 multiplexes ("A single HTTP/2 connection can contain multiple concurrently open streams", RFC 9113 s5). |
| L-0096 | imprecise / medium | **imprecise / low** | At [00:34:32] this remark is part of an illustration: "I'm just giving you a simple example to imagine ... Most machine learning teams and organizations do this exact same thing ... recommendations are driven through graph databases". The checker graded the same over-generalisation on L-0091 ("most common use" of graph DBs is recommendations) as `simplified/low`, and L-0096 should be consistent with it. The substance is right: Amazon Science describes item-to-item CF that produces "an updated list of related items for every product ... on a daily basis" and never mentions a graph database. But a graph DB for recommendations is a legitimate option (Neo4j: "The key technology in enabling real-time recommendations is the graph database"), so a learner who believes the remark would not end up with a broken design. |

## Agreements (with extra evidence where useful)

### Databases / consistency

- **L-0143 (wrong / medium): agree.** At [00:53:04] the teacher says: "massive [blob] values, each of let's say four MB ... relational databases would cry their heart out. But DynamoDB would work better." AWS Constraints says: "The maximum item size in DynamoDB is 400 KB, which includes both attribute name binary length ... and attribute value lengths". AWS bp-use-s3-too adds: "Exceeding the maximum item size will result in failed write attempts". The design fails outright, so medium is right.
- **L-0130 (imprecise / medium): agree.** The checker downgraded this from wrong to imprecise in the rewrite, and I agree with that. The remark at [00:48:30] answers a student who is discussing the fraud and recommendation pipeline, so "too absolute" fits better than "factually false". On the substance:
  - The Neo4j Operations Manual (2026.09) says: "Transactions comply with the ACID consistency model".
  - The Neptune intro says you can "create sophisticated, interactive graph applications that can query billions of relationships in milliseconds".
- **L-0132 (imprecise / medium): agree.** At [00:49:02] the teacher says: "this cannot be one generic query ... you have to write or rewrite that query". PostgreSQL 18 says: "Using RECURSIVE, a WITH query can refer to its own output", and recursive queries are "typically used to deal with hierarchical or tree-structured data". This is a common interview point.
- **L-0134 (imprecise / medium): agree.**
  - Neptune intro: "Each Neptune DB cluster has one primary DB instance that is responsible for writing".
  - Neo4j clustering intro: "Only primaries are eligible to act as the writer for a database" and "The main purpose of database secondaries is to scale out read workloads".
  - The ledger row has low confidence (the phrase "part-triotic" is unclear), so the note should correct the claim without over-quoting the teacher.
  - Drift: Neo4j 2026.09 now lists Infinigraph ("automatic sharding") and "Sharded property databases New in 2025.12". This makes the checker's "generally do not ... out of the box" slightly less absolute than before, but it still holds for the standard product.
- **L-0424 (imprecise / medium): agree, with new evidence.** At [03:04:39] the teacher says DynamoDB writes to three storage nodes "and once it has completed writing to three different nodes, then only it says my write is complete." I read the USENIX ATC'22 DynamoDB paper. WebFetch saved the PDF as binary, and I extracted its text locally. It says the opposite of the teacher's detail:
  - "A write is acknowledged to the application once a quorum of peers persists the log record to their local write-ahead logs".
  - s6.1: "A healthy write quorum in the case of DynamoDB consists of two out of the three replicas from different AZs."

  PostgreSQL 18 also says: "PostgreSQL streaming replication is asynchronous by default". The core lesson stands (the storage engine replicates, and workers don't), but "all three" is wrong for DynamoDB and too strong as a general rule.
- **L-0422 (imprecise / medium): agree.** At [03:02:40] the teacher says: "You cannot read from Kafka. You would already processed the messages." Kafka's intro page says "events are not deleted after consumption" and "Events in a topic can be read as often as needed". This is the classic Kafka-vs-queue distinction, and a learner who believes consumed messages are gone would give a wrong interview answer, so medium is fair. The teacher's real point, that durability should come from the replicated DB, stands.
- **L-0081 (imprecise / medium): agree.** At [00:29:45] the teacher says: "It's not on demand pricing. You pay for the servers that you are running." The evidence against it:
  - BigQuery estimate-costs: "When using the on-demand pricing model, queries are billed according to the number of bytes read".
  - Redshift Serverless: "You can purchase on-demand capacity – ... you pay for resources as you go", with a "minimum charge ... for 60 seconds of resource usage, metered on a per-second basis".

  BigQuery is a column store the teacher had named, so the claim is wrong for it.

### Slack RTC / WebSockets

- **L-0324 (wrong / medium): agree.** Chromium: `255` for `WEBSOCKET_SOCKET_POOL`, with the comment "WebSocket connections are long-lived, and should be treated differently ... Use a limit of 255 ... Also note that Firefox uses a limit of 200". Firefox: `pref("network.websocket.max-connections", 200)`. I checked both at the cited 125.0.6422.5 tag and at Chromium main, and the values are the same. The advice to use one multiplexed WebSocket per client still stands; only the mechanism the teacher gave is wrong.
- **L-0325 (wrong / medium): agree.** The "five five five ... four four four" image example at [02:23:02] rests on L-0324. The RFC 9113 s5 stream quote above covers the HTTP/2 case.
- **L-0275 (wrong / medium): agree.** The checker raised this from imprecise to wrong in the rewrite, and I agree. RFC 9293 s3.4.1 says "A connection is defined by a pair of sockets", and s4 defines a connection as "A logical communication path identified by a pair of sockets". All clients share one listening port, so ports are not the reason for limited capacity.
- **L-0383 (imprecise / medium): agree.** In my draft review I had proposed low, citing the teacher's [~02:33:44] framing ("all I'll be losing is just a Kafka connection string ... this Kafka is anyway internal to our infra"). The rewritten checker entry makes a point that holds against that framing: the compromised edge server is exactly the machine that can reach the internal Kafka, and a stolen producer credential lets an attacker inject forged messages that backend consumers trust and persist. Kafka 4.3 security overview: "Authentication of connections to brokers from clients ... using either SSL or SASL" and "Authorization of read / write operations by clients". Kafka 4.3 SASL page: "The options `username` and `password` are used by clients to configure the user for client connections". Medium stands.
- **L-0360 (imprecise / medium): agree.** I re-read [~02:33:44]-[02:34:52]: "this server" is the internet-exposed edge server. The AWS DDoS whitepaper says UDP reflection and SYN floods "are infrastructure layer attacks" that "can inundate the capacity of a network", and that you need systems that "scale up capacity more rapidly than the inbound traffic flood". A rate limiter is not DDoS protection. The ASR flag ("simple load, a simple [?rate limiter]") does not change this.
- **L-0374 (imprecise / medium): agree.** OWASP's definition of MITM: "intercepts a communication between two systems". OWASP A01:2021: "users cannot act outside of their intended permissions"; "Bypassing access control checks by modifying the URL (parameter tampering ...)"; "Except for public resources, deny by default". The teacher used the wrong name, and that would cost marks in an interview.
- **L-0322 (wrong / low): agree.** Firefox's `max-persistent-connections-per-server` is 6, not 8.

### Messaging / learning approach

- Nothing to review in this group: no item is wrong, outdated, medium or high. This group's files were not rewritten (last modified 00:04). I re-opened all 16 of its additions; see `additions_verified.jsonl`.

## Spot-check of 15 accurate verdicts (random, seed 8)

Sample: `random.Random(8).sample(sorted(accurate_ids), 15)` over the 332 accurate ids in the current files.

| ID | Claim (short) | Agree? | Comment |
|---|---|---|---|
| L-0028 | JSON value you want to query inside → document DB | yes | Reasoning claim. |
| L-0037 | Lines between KV / document / columnar are blurry | yes | AWS: DynamoDB "supports both key-value and document data models" (opened). |
| L-0059 | Row store must pass over unneeded columns | yes | Consistent with Redshift: a row store "would read the blocks that contain the 95 unneeded columns" (opened). |
| L-0090 | Graph DB for follow/following = Hulk opening a jar | yes | Analogy. FlockDB (A-DC-17) backs the idea. |
| L-0106 | Dgraph written in Go; falters at high scale | yes | github.com/hypermodeinc/dgraph: "Dgraph is written using the Go Programming Language" (opened). The scale remark is the teacher's experience. |
| L-0148 | Slack requirements list | yes | Problem statement. |
| L-0158 | Noun table name "membership" invites extension | yes | Design heuristic. |
| L-0168 | Model DMs as two-person channels | yes | Slack conversation object: is_im (opened). |
| L-0179 | Muted/favourite/notification settings live in membership | yes | Design claim. Slack keeps per-member state (last_read) on the conversation. |
| L-0250 | Within one server, fan out to channel members except the sender | yes | Design statement. |
| L-0253 | Student: route via API server (not taken up) | yes | Status open; no checkable claim. |
| L-0266 | Student: mesh overhead = keeping connections alive | yes | Status open; reasonable. |
| L-0298 | Connection service is like DNS but is not DNS | yes | Design statement. Slack's boot flow (A-SRW-14) is the real-world analogue. |
| L-0333 | Missed realtime messages are recovered via the scroll REST API | yes | Sound design. |
| L-0437 | Slack should load old data via API, not WebSockets | yes | Consistent with WhatsApp deleting delivered messages (privacy policy, opened). |

**Result: 15/15 agree.**

## Version drift (current versions as of 2026-10-13)

- **Kafka 4.3 is current.** The `slack_rtc_websockets` checker cites the `/42/` pages: security-overview for L-0383 and A-SRW-16, and the SASL page in my earlier check. Those pages now say "You are viewing documentation for an older version (4.2)". I opened the `/43/` versions and the quoted sentences are unchanged. A-SRW-16 now cites `/43/`.
- **OWASP Top 10:2025 is current.** top10.owasp.org redirects to it, and Broken Access Control is still A01. A-SRW-17 was reworded to mention both editions.
- **Chromium.** The checker pinned tag 125.0.6422.5, which is from 2024. Main has the same 6/255 values and comment. A-SRW-08 now cites `refs/heads/main`, checked 2026-10-13.
- **Neo4j Operations Manual 2026.09** lists Infinigraph ("automatic sharding") and "Sharded property databases New in 2025.12". This is relevant to L-0134 and L-0088; see above.
- **MongoDB 9.0 manual.** Since 8.0, `w: "majority"` acknowledges once a majority have durably written the oplog entry, without waiting for the write to be applied. No addition in the current files depends on this.
- **The DynamoDB ATC'22 paper (2022)** describes the design as of 2022. AWS's public docs (opened) still say only that HTTP 200 means "durably persisted", so the 2-of-3 quorum stays a paper-dated fact.

## Notes on cited URLs

- **usenix.org/system/files/atc22-elhemali.pdf**: WebFetch could not render it (binary PDF). I extracted its text locally from the saved file (zlib-inflated content streams, read-only parse, no third-party code) and found the quorum sentences quoted above.
- **cloud.google.com/bigquery/pricing**: not readable (WebFetch returned only the page title). It is no longer cited by the current checker files, which now use docs.cloud.google.com/bigquery/docs/estimate-costs. That page opens and contains the quote.
- **RFC 9293, RFC 9113 and RFC 9000** are long pages, so I read them in offset chunks. The RFC 9293 glossary quote is in s4.
- **postgresql.org functions-comparison**: has the `num_nonnulls` entry but no CHECK example. A-SRW-03's CHECK usage is a valid application of the function, not a quote.
- **clickhouse.com insert strategy**: I did not find the "background merges may fall behind" wording in what I read, so A-DC-14 was reworded to the page's own reason.
- **slack.engineering/real-time-messaging** says "tens of millions of channels per host" and "about 16 million channels are served per host" (peak), and "delivers messages across the world in 500ms". A-SRW-13 was aligned to these.
- **Zoom continuous-meeting-chat** (22 Jun 2023, updated June 2026) does not say what happens when the feature is off, so A-MLA-12 was trimmed.
- Every other cited URL opened and contained the quoted or paraphrased statement.
