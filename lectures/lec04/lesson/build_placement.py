#!/usr/bin/env python3
"""Build lectures/lec04/lesson/placement.json from the table below (one line per ledger id).

Line format:  ID | section | component | also (sec:Comp, ...) | note
Run:  python3 "lectures/lec04/lesson/build_placement.py"  then  check_placement.py
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

SECTIONS = {
    "about": "Lecture header: About this class",
    "1": "How to approach a design", "1.1": "Two ways to build", "1.2": "The property before the tool",
    "2": "Green dots: the online/offline indicator", "2.1": "The brief, and the core", "2.2": "Reading many dots at once",
    "2.3": "Who says a user is alive?", "2.4": "Why the beat must repeat", "2.5": "A timestamp instead of a boolean",
    "2.6": "Is storage the problem?", "2.7": "Absence means offline. Who deletes?", "2.8": "Let the database expire it",
    "3": "Redis or DynamoDB?", "3.1": "Same features, different choice", "3.2": "Persistence, and Redis as the primary store",
    "3.3": "Managed or self-managed", "3.4": "Vendor lock-in", "3.5": "Room to grow", "3.6": "How fast you hear about an expiry",
    "3.7": "Staying portable, and where to stop",
    "4": "Six million heartbeats a minute", "4.1": "The other number", "4.2": "The line nobody thinks about",
    "4.3": "Keep the connections open", "4.4": "Where the pool lives", "4.5": "How many connections?",
    "4.6": "The database's ceiling", "4.7": "When pooling hurts", "4.8": "Only four things", "4.9": "The same pattern: failure detection",
    "5": "Blog rows: database decisions", "5.1": "Six components, and the blog schema", "5.2": "Delete, or mark deleted?",
    "5.3": "The B+ tree argument", "5.4": "The soft-delete lifecycle", "5.5": "The right to be forgotten",
    "5.6": "bio vs body: where long text lives", "5.7": "Three ways to store a date", "5.8": "Redbus and the custom format",
    "5.9": "Time zones and running out of numbers",
    "6": "What a cache is", "6.1": "Not just RAM", "6.2": "One shared cache for the blog", "6.3": "A table can be a cache",
    "6.4": "Should the cache compress?", "6.5": "Exercise: every place you could cache",
    "7": "What to keep",
}
COMPONENTS = ["Prose", "Figure", "StepThrough", "AnimationClip", "RuleBox", "PauseAndThink", "TradeoffTable",
              "MarginNote", "SourceNote", "CodeBlock", "ForwardChip", "RecallQuestions", "AboutThisClass", "NotationKey"]

TABLE = r"""
L-0001|about|AboutThisClass||First line: course of 8 weeks, intuition and implementation, not drawing boxes ('you can do as a kid also').
L-0002|about|AboutThisClass||'How to use this page': the course is built on live brainstorming, so stop at every prompt.
L-0003|about|AboutThisClass||Not interview prep: joy of engineering, first principles, simple designs that scale.
L-0004|about|AboutThisClass||Note new terms and look them up yourself (intermediate course).
L-0005|about|AboutThisClass||Weeks chain together; by week 7 a flash sale takes ~10 min. Revise.
L-0006|about|AboutThisClass||Pre-reads (Redis, DynamoDB) cover most of what you need.
L-0008|about|AboutThisClass||Every system in the course runs on a laptop; no massive infrastructure.
L-0009|about|AboutThisClass|7:Prose|Implement the core of each system over a year or so; echoed in the recap.
L-0010|about|AboutThisClass||Implementing shows where a design falters; real teams expect implementation.
L-0016|about|AboutThisClass||Week 1 is foundations; system brainstorming starts next week.
L-0019|about|AboutThisClass||Agenda line: indicator first, then database and caching on a Medium-like app.
L-0020|about|AboutThisClass||Day one keeps scale out of focus; scale comes in weeks 2-4.
L-0167|about|AboutThisClass||Why the page opens with a build: theory-first became too theoretical.
L-0022|1.1|Prose||Two approaches in the instructor's 10-11 years; worded as his experience (unverifiable).
L-0023|1.1|Prose|1.1:Figure|Spiral: decide the core (usually the DB), build around it. Inline: course term, not Boehm's Spiral model.
L-0024|1.1|Prose||Core can be a schema or a comms layer; WebSocket layer in a messaging app.
L-0025|1.1|Figure|1.1:Prose|D-02 loop: day zero, observe under load/at scale, bottleneck, re-architect, repeat.
L-0026|1.1|Prose||Spiral when the system is a no-brainer you've built before.
L-0027|1.1|Prose||Incremental for ambiguity; fits startups shipping day zero.
L-0028|1.1|Prose||Big multi-year projects grow organically from some parts; no hard lines. Keep vague (referent unclear).
L-0029|1.2|RuleBox|1.2:Prose, 7:Prose|RuleBox §1 board wording: core property & access pattern first; affinity second.
L-0030|1.2|Prose||Affinity fails: no DynamoDB off AWS; no Redis in the company.
L-0031|1.2|Prose||Course often drops Cassandra; relational DBs run at scale too.
L-0032|1.2|RuleBox|1.2:Prose|RuleBox body: build intuition; systems are infinitely buildable and evolve.
L-0092|1.2|Prose||Go deep on every candidate, pros and cons, stay open.
L-0312|1.2|Prose|3.2:Prose|Drop stereotypes ('DynamoDB only for X'); said in the Redis-as-primary answer.
L-0021|2.1|Figure|2.1:Prose|The brief, green/grey dots (D-01); opening problem of chapter 2.
L-0033|2.1|Prose||Spiral applied: DB as the core; what is needed to render a dot.
L-0034|2.1|Figure|2.1:Prose|D-03: user int -> online bool; DB not yet decided.
L-0035|2.1|Prose|2.1:Figure|Access pattern = key-value (get many, get one, update one); names the pattern, not the DB.
L-0050|about|AboutThisClass|2.1:NotationKey|Notation note: board tables don't mean relational; SQL is just illustration. Repeated in the notation key.
L-0036|2.2|Prose||First idea: single-user status endpoint.
L-0037|2.2|Figure|2.2:Prose|Four users = four calls; poor UX and load. Fig 2·c panel a.
L-0038|2.2|Prose|2.2:Figure|First critical decision: batch endpoint. Fig 2·c panel b.
L-0039|2.2|Prose|2.2:Figure|Board path GET /status/users?ids=...; '/data/users' is an ASR slip, not used.
L-0040|2.3|Prose||Someone must update the state: pull or push.
L-0041|2.3|Prose|2.3:Figure|Pull impossible; board 'unless persistent connection'. Left as taught + A-OOI-22.
L-0042|2.3|Prose|2.3:Figure|Push heartbeats: client periodically says 'I am alive'. Fig 2·d.
L-0043|2.3|Prose||Heart analogy; names the mechanism.
L-0044|2.3|Prose|2.4:Figure|POST /heartbeat marks the authenticated user alive (D-06 heading).
L-0330|2.3|MarginNote||'Is HTTP really stateless?': stateless by design, keep-alive possible. Left as taught + A-CC-13.
L-0331|2.3|MarginNote||HTTP/2 persistent; WebSocket not HTTP but persistent. + A-CC-14 (starts as HTTP Upgrade).
L-0332|2.3|MarginNote|2.3:SourceNote|Server closes unless keep-alive. SN-01: HTTP/1.1 persistent by default.
L-0333|2.3|MarginNote||Think of HTTP as stateless; for state use WebSockets or MQTT.
L-0334|2.3|ForwardChip||Stateful HTTP/2 design, week 5 (HTTP/2 appears in Lecture 9).
L-0335|2.3|MarginNote||Asked: HTTP runs on TCP. Left as taught + A-CC-15 (HTTP/3 over QUIC/UDP).
L-0336|2.3|MarginNote||HTTP is a spec, TCP layer 4; could go over UDP. Inline: needs reliable ordered transport (QUIC).
L-0045|2.4|PauseAndThink|2.4:Prose, 2.4:StepThrough|Tempting idea: login + logout calls. P1 and Fig 2·e step 1-2.
L-0046|2.4|StepThrough|2.4:Prose, 2.4:PauseAndThink|Can't announce offline: crash, battery, unplug. Fig 2·e steps 3-4; P1 reveal.
L-0047|2.4|Prose|2.4:Figure|No heartbeat for long enough -> offline. D-06 'when is a user offline?'.
L-0048|2.4|Prose|2.4:Figure|'Long enough' is business logic; 30 s here, heartbeat every 10 s.
L-0049|2.5|Figure|2.5:Prose|pulse(user_id, last_heartbeat) table (D-07).
L-0051|2.5|CodeBlock|2.5:Prose|UPDATE pulse ... now(). Left as taught + A-OOI-06 upsert in the CodeBlock.
L-0052|2.5|CodeBlock|2.5:Prose|getStatus rule 1: no entry -> offline.
L-0053|2.5|CodeBlock|2.5:Prose|getStatus rule 2: last_hb < now-30 s -> offline; else online.
L-0054|2.5|Prose||Epoch seconds since 1 Jan 1970; link forward to 5.7.
L-0055|2.6|Prose|2.6:Figure|4 B + 4 B = 8 B per user. Left as taught; 2038 limit picked up in 5.9.
L-0056|2.6|Prose|2.6:Figure, 2.6:PauseAndThink|1B users -> 8 GB. Left as taught + A-OOI-08 (row overhead).
L-0057|2.6|Prose|2.6:PauseAndThink|8 GB < phone storage, fits in RAM: storage not the challenge.
L-0058|2.6|Prose||Storage = space to hold the data.
L-0059|2.6|Prose|7:Prose|Ask 'can I change this?' at every step; design = trade-offs.
L-0060|2.6|Prose|7:Prose|Stay open, document every option and why; heart of a senior engineer.
L-0061|2.7|Prose|2.7:Figure|Absence = offline: only online users have rows.
L-0062|2.7|Prose|2.7:Figure|Each heartbeat resets a 30 s timer; entries = online users.
L-0063|2.7|Prose|2.7:PauseAndThink, 2.7:Figure|Cron job deletes stale rows; Fig 2·i panel a; P3.
L-0064|2.7|Prose|2.7:Figure|Works on day one, not robust; board 'edge cases'.
L-0065|2.7|Figure|2.7:Prose, 2.6:Figure|1B total, 100k active -> 100k rows, 800 KB (board S38).
L-0066|2.7|Prose|2.7:PauseAndThink|Cron = another moving part: hosting, uptime, telemetry.
L-0067|2.7|Prose|7:Prose|Never draw a box for its own sake; complex diagram is the worst outcome.
L-0305|2.7|MarginNote||'What about last seen?': out of scope; needs rows kept; 8 GB is peanuts.
L-0068|2.8|RuleBox|2.8:Prose, 7:Prose|RuleBox §2: never reinvent the wheel; offload expiry to the DB.
L-0069|2.8|Prose||KV + TTL requirement; Redis and DynamoDB, chosen to drive the next chapter.
L-0070|2.8|Prose|2.8:SourceNote, 2.8:AnimationClip, 2.8:CodeBlock, 3.7:TradeoffTable|Final design: SET with TTL 30 s on every heartbeat. SN-02 (SET clears TTL; DynamoDB lag).
L-0327|2.8|Prose||TTL because space mattered; in-memory deletion is peanuts (asked in class).
L-0306|2.8|ForwardChip||Redis expiry internals: Lecture 3 (lazy deletion, sampling), Lecture 9 (own cache).
L-0101|2.8|MarginNote||'Not how production does it': persistent connections. Left as taught + A-OOI-18 (MQTT).
L-0102|2.8|ForwardChip|7:ForwardChip|WebSockets in Lecture 2 §5.4 (said 'next week'); Slack real-time presence in Lecture 4.
L-0071|3.1|Prose|3.1:Figure|Both give KV + TTL; other criteria; board 'cost estimation'.
L-0098|3.1|Prose||Open source vs proprietary. Left as taught + A-D-07 (licence history, Valkey).
L-0100|3.1|RuleBox|3.1:Prose|RuleBox §3: future extensions, vendor lock-in, managed vs self-managed.
L-0072|3.2|Prose|3.1:Figure|Tempting: persistence. Challenge: data dies in 30 s anyway. Kept open (no verdict).
L-0085|3.2|Prose||Redis persists too, with limits.
L-0086|3.2|Prose|7:Prose|Know how: AOF, RDB, config, flush frequency.
L-0309|3.2|Prose||Asked late: Redis can be the primary database.
L-0310|3.2|Prose||Primary + Redis or Redis alone depends on the guarantees needed.
L-0311|3.2|Prose|3.2:SourceNote, 3.7:TradeoffTable|Redis as primary with AOF, 8 GB in RAM. SN-03 (everysec ~1 s; failover).
L-0073|3.3|Prose|3.1:Figure, 3.7:TradeoffTable|Managed offloads infra; board 'managed (*team size) & expertise'.
L-0087|3.3|Prose||Managed Redis on every cloud (ElastiCache); point raised, no verdict.
L-0099|3.3|Prose||Lean 5-10 person teams go managed; every DB has ops pain.
L-0139|3.3|Prose||Asked: managed DynamoDB vs self-managed Redis to autoscale -> managed for lean teams.
L-0140|3.3|Prose||Self-host only with expertise; 'throw money at cloud providers'.
L-0304|3.3|Prose||Availability assumed equal; property of engineers. Left as taught.
L-0313|3.3|Prose||Surge handling is engineering; counts against self-hosted Redis.
L-0074|3.4|Prose|3.1:Figure|Raised in class: team size; Redis avoids lock-in.
L-0075|3.4|Prose||Reasons to switch: pricing, infra move, deals; often not a big issue.
L-0076|3.4|MarginNote||'From practice: why teams switched clouds': security incidents, discontinued services, trust.
L-0077|3.4|Prose|3.7:TradeoffTable|Definition of vendor lock-in; DynamoDB AWS-only.
L-0078|3.4|Prose||Moving clouds = rewriting code; mature orgs care.
L-0079|3.4|Prose|3.4:SourceNote, 3.4:Figure|Competition; Amazon food business. SN-04 'Since the class' (May 2020 - Dec 2022).
L-0080|3.4|Prose|3.4:Figure|Walmart not on AWS. Inline: hybrid Azure/GCP/own cloud.
L-0081|3.4|Prose||$10M/month to a competitor; illustration (unverifiable).
L-0082|3.4|Prose||Early startup with $10k bill need not care.
L-0083|3.4|Prose||Netflix stays on AWS; hedged (unverifiable-low).
L-0084|3.4|Prose||Lock-in drives open-source preference.
L-0301|3.4|Prose||When it doesn't matter: you are the vendor; sure to stay on AWS.
L-0302|3.4|Prose||Manager's hat: hiring for open-source tools.
L-0303|3.4|Prose||Neo4j vs TigerGraph talent pool.
L-0088|3.5|Prose||Tempting: Redis only strings. Correction: Redis has numbers and structures.
L-0089|3.5|Prose|3.1:Figure, 3.7:TradeoffTable|Future extensibility: Bloom, HLL, geo.
L-0090|3.5|Prose||Streams + Lambda; Redis CDC. Inline: Redis has best-effort notifications, not a durable feed.
L-0091|3.5|Prose||DBs converging. Left as taught + A-D-25.
L-0095|3.5|Prose||Each DB has its own features. Inline: Aerospike has an AGPLv3 Community Edition.
L-0096|3.5|Prose||DB is the most critical, brittle component; know it early.
L-0093|3.6|Prose|3.6:SourceNote|Tempting: Redis faster because in memory; class said 'not really'. SN-05.
L-0094|3.6|Prose|3.6:SourceNote, 3.6:Figure, 3.7:TradeoffTable|Persistent connections vs stateless DynamoDB. SN-05 (+A-D-05, A-D-06).
L-0097|3.6|Prose|3.6:Figure, 3.7:TradeoffTable|Expiry hooks over a connection vs streams. Light inline (simplified-medium) + A-D-03.
L-0314|3.7|Prose||TTL chosen because needed; move only to a store with it, or re-implement (cron).
L-0315|3.7|Prose||Draw a line on abstraction or you write your own database.
L-0316|3.7|Prose|3.7:MarginNote|Debezium for CDC off DynamoDB. + A-OOI-05, A-OOI-04. MarginNote tells the student's story.
L-0317|3.7|Prose||Document limits and migration steps.
L-0103|4.1|Prose|4.1:Figure, 2.6:PauseAndThink|10 s heartbeat -> 6/min; 1M active -> 6M/min. P2 second half.
L-0104|4.1|Prose|4.1:Figure|One DB update per heartbeat; DB chokes. Left as taught + A-OOI-09.
L-0105|4.1|Prose|7:Prose|Storage isn't the problem, computation is. Inline: '1 million entries' slip -> 8 MB / 8 GB.
L-0106|4.1|ForwardChip||Sharding/partitioning: Lecture 2 (hash), Lecture 3 (range).
L-0107|4.2|Prose||Pooling is under-discussed; know it for write-heavy loads.
L-0108|4.2|Prose|4.2:StepThrough|HTTP POST in, second TCP connection to the DB.
L-0109|4.2|StepThrough|4.2:Prose, 4.3:AnimationClip|Five trips per call as counted. Inline: + DB login, TLS.
L-0110|4.2|Prose||The diagram line stands for an expensive setup.
L-0111|4.2|Prose|4.2:PauseAndThink|Micro update; time goes to connecting. Left as taught; A-OOI-16 sentence follows.
L-0116|4.2|Prose|4.2:StepThrough|DB-side cost of connecting. Inline + A-OOI-16 (process per connection).
L-0112|4.3|Prose|4.3:Figure|Definition: keep connections open and reuse.
L-0113|4.3|Prose|4.3:Figure, 4.3:AnimationClip|Three connections at startup.
L-0114|4.3|Prose|4.3:AnimationClip|Pick, mark busy, fire query; saves setup/teardown.
L-0115|4.3|Prose|4.3:AnimationClip|Two benefits: faster calls, less DB load.
L-0117|4.3|Prose||Saves CPU and network; 'not really memory'. Inline: memory is part of it.
L-0119|4.3|Prose||Libraries for MySQL/Postgres/Redis. Left as taught.
L-0129|4.3|Prose||Huge gain for one-row PK updates (B+ tree leaf).
L-0130|4.3|Prose||Big queries dwarf setup; pool matters less.
L-0131|4.3|Prose|4.5:RuleBox, 7:Prose|'Always a great option'; set beside L-0320 in RuleBox §4 body.
L-0126|4.4|Prose|4.4:Figure|Pool is a library in the API server. Left as taught (A-OOI-14 in 4.7).
L-0127|4.4|Prose||Misconception 'everything is a service'. Left as taught.
L-0128|4.4|CodeBlock|4.4:Figure, 4.4:Prose|Blocking queue implementation.
L-0118|4.5|Prose|4.5:StepThrough, 4.5:TradeoffTable|Min and max; min 3.
L-0120|4.5|StepThrough|4.5:Prose|All busy: wait.
L-0121|4.5|StepThrough|4.5:Prose|Or stretch: open one more and add it.
L-0122|4.5|Prose||Unbounded stretch breaks.
L-0123|4.5|StepThrough|4.5:Prose, 4.5:TradeoffTable|Max 100; 101st waits. + A-OOI-10 connectionTimeout.
L-0124|4.5|Prose|4.7:Figure|DB caps connections; hundreds of servers x 100. + A-OOI-19.
L-0125|4.5|Prose|4.5:TradeoffTable|Idle TTL 10 min. + A-OOI-11.
L-0141|4.5|Prose||Asked: expired connections recreated up to max, same expiry.
L-0142|4.5|Prose||Max is a ceiling, not a constant.
L-0135|4.5|Prose||New server waits for a free DB slot. Inline: DB refuses with error; pool waits up to timeout.
L-0157|4.5|Prose|4.5:TradeoffTable|Min 3 or 5. Left as taught + A-OOI-12 (HikariCP fixed-size).
L-0158|4.5|Prose|4.7:Figure, 4.5:TradeoffTable|Max per server = DB max / max servers; 1000/100 = 10.
L-0159|4.5|Prose|4.5:TradeoffTable|15 instead of 10, '1.2x', not a standard. Inline: 1.5x; 100 x 12 > 1000.
L-0160|4.5|Prose||Telemetry on the pool; a week of production.
L-0161|4.5|RuleBox|4.5:Prose, 7:Prose|RuleBox §4 rule: start conservative, observe, retune.
L-0136|4.6|Prose||Scale the DB up; size by concurrency.
L-0137|4.6|Prose||Max connections is the most common bottleneck; the lecture's experience (unverifiable-low).
L-0138|4.6|Prose|4.6:ForwardChip|Vertical or shard; Lecture 2 §2.4.
L-0143|4.6|Prose||Asked: connections, not data, decide the size here. Yes.
L-0144|4.6|Prose|4.1:Figure|Micro reads/writes -> network bottleneck (board green note).
L-0145|4.6|Prose|4.8:Figure|Big aggregations: CPU and memory instead.
L-0146|4.6|Prose||Limit depends on RAM and network card. Left as taught + A-OOI-15.
L-0147|4.6|Prose||Managed services publish the formula/limit.
L-0148|4.6|Prose||Self-managed: benchmark.
L-0149|4.6|Prose||High-network instances. Inline + A-OOI-20.
L-0326|4.6|MarginNote||'Go explore: 30,000 connections'; + A-OOI-21.
L-0162|4.6|Prose||Festival 2x: scale the DB up, 'Always'.
L-0163|4.6|Prose||Scale up then down; then tune max. Left as taught.
L-0164|4.6|ForwardChip|7:ForwardChip|Better spike answer: flash sales, week 7 (not in these notes yet).
L-0165|4.6|Prose||Tech unit economics, monitoring.
L-0318|4.6|Prose|4.6:ForwardChip|Pools when scaling the DB; write a hello world; Lectures 2 and 3.
L-0319|4.7|Figure|4.7:Prose, 4.7:PauseAndThink|1000 max, min 100 per server, +20 servers -> exhausted. P6, Fig 4·f.
L-0320|4.7|Prose|4.5:RuleBox, 4.7:Figure|Misconfigured pool caps server count. + A-OOI-14 (PgBouncer, RDS Proxy).
L-0321|4.7|Prose||Free growth or long expiry hogs connections; outage for new servers.
L-0322|4.7|Prose||Grass not always green; document, near-optimal, move on.
L-0323|4.7|Prose|4.5:TradeoffTable|TTL sweet spot; long queries need longer.
L-0324|4.7|Prose||Average query time is the key metric. Left as taught.
L-0325|4.7|Prose|4.7:SourceNote|Asked: grow pool when query time rises? SN-06 (+A-OOI-13).
L-0150|4.8|Prose||Asked: connections + size? Broadened to four resources.
L-0151|4.8|Prose|4.8:Figure, 6.1:Prose|Memory, CPU, disk, network; GPU under CPU.
L-0152|4.8|Figure|4.8:Prose|CPU-bound: aggregations.
L-0153|4.8|Figure|4.8:Prose|Memory-bound: massive joins.
L-0154|4.8|Figure|4.8:Prose|Disk-bound: data warehouses.
L-0155|4.8|Figure|4.8:Prose|Network-bound: query count capped by network; heartbeat store.
L-0156|4.8|Prose||Scaling defined on the four; vertical has a limit; shard.
L-0132|4.9|Prose|4.9:Figure|Heartbeats = failure detection (own AWS).
L-0133|4.9|Prose|4.9:Figure|Own load balancer. Left as taught + A-OOI-17.
L-0134|4.9|Prose|1.2:Prose|Observe patterns, don't memorise Q&A.
L-0168|5.1|Figure|5.1:Prose|Six components card (board S64).
L-0259|5.1|ForwardChip|7:ForwardChip|Other four components: Lecture 2.
L-0170|5.1|Prose||Multi-user blogging app like Medium.
L-0171|5.1|Figure|5.1:Prose|users(id, name, bio); bio ~128-140 chars.
L-0172|5.1|Figure|5.1:Prose|blogs(id, author_id, title, body, published_at, is_deleted).
L-0173|5.2|Prose|5.1:Figure|Soft delete definition.
L-0174|5.2|Prose||Hard delete definition. Left as taught.
L-0175|5.2|Prose|5.2:PauseAndThink|Reason 1: recoverability.
L-0176|5.2|Prose|5.2:PauseAndThink|Google Drive trash, 30 days.
L-0177|5.2|Prose|5.2:PauseAndThink|Reason 2: archival (ML). Light inline (simplified-medium) + A-D-24.
L-0178|5.2|Prose|5.4:Figure|Job moves soft-deleted rows to S3.
L-0179|5.2|Prose|5.2:PauseAndThink|Reason 3: audit.
L-0180|5.2|MarginNote|5.2:PauseAndThink|'From the instructor: the police station' harassment story (unverifiable, attributed).
L-0181|5.2|Prose||Platforms must provide evidence to authorities. Left as taught.
L-0182|5.2|MarginNote||Instructor visited the police station with printouts.
L-0183|5.2|RuleBox|5.2:Prose, 7:Prose|RuleBox §5: recoverability, archival, audit?
L-0184|5.2|Prose||Holistic view rather than just building.
L-0188|5.2|Prose||User-generated content tables usually soft delete.
L-0185|5.3|Prose|5.3:SourceNote, 5.3:Figure|B+ tree rebalancing claim. SN-07 (+A-D-09, A-D-10).
L-0186|5.3|Prose|5.3:Figure|Soft delete updates only. Inline: still a write.
L-0187|5.3|Prose||Know your engine's internals.
L-0228|5.3|Prose||Asked: benefit vanishes on final hard delete? Answer: batch. Inline.
L-0229|5.3|Prose||Clubbing deletes clubs rebalancing. Inline.
L-0230|5.3|Prose|5.4:CodeBlock|100 per commit -> 100x fewer rebalances. Inline + A-D-11.
L-0263|5.4|Prose|5.4:Figure|Soft deletes grow DB; periodic hard delete.
L-0264|5.4|Prose|5.4:Figure|Or move elsewhere: archival.
L-0265|5.4|Prose||When to hard delete is subjective.
L-0308|5.4|Prose|5.4:Figure|Soft delete gives time to archive in batch.
L-0282|5.4|MarginNote||'From practice: the interview question'; cron has nothing to do with availability.
L-0283|5.4|AnimationClip|5.4:Prose, 5.4:CodeBlock|Staggered deletion under traffic; clip l04-staggered-delete.
L-0284|5.4|MarginNote||Locking concern = consistency, not availability. Left as taught.
L-0285|5.4|ForwardChip|7:ForwardChip|Strong consistency: Lecture 3.
L-0295|5.4|Prose||Cron takes pool connections; gain some, lose some.
L-0297|5.4|Prose||Retention policy = cron offloaded to a DB thread. + A-D-13.
L-0298|5.4|Prose||Offload and stagger. Left as taught.
L-0296|5.4|Prose|5.4:CodeBlock|Unique email blocks re-signup; hard delete. Inline + A-D-12 partial index.
L-0266|5.5|Prose|5.5:Figure|GDPR erasure within one month. Left as taught + A-CC-02.
L-0267|5.5|Prose|5.5:SourceNote|Not immediate; breathing space. SN-08 (+A-CC-01).
L-0268|5.5|Prose|5.5:SourceNote, 5.5:Figure|PII deleted, logs keep it. SN-09.
L-0269|5.5|Prose||Atlassian 14 days. Inline + A-CC-05.
L-0270|5.5|Prose|5.5:Figure|Snapshots not rewritten. Left as taught + A-CC-03.
L-0271|5.5|Prose||'Compliance hacks'. Inline: reframed as recognised practices.
L-0272|5.5|MarginNote||Instructor made his org GDPR compliant in 2 months (unverifiable, attributed).
L-0273|5.5|Prose|5.5:SourceNote|GDPR on every organisation. SN-10 (+A-CC-04 scope).
L-0189|5.6|Prose|5.6:Figure|bio short text, body long text; '~140 chars'.
L-0190|5.6|Prose|5.6:SourceNote|Fixed-width rows. SN-11.
L-0191|5.6|Prose||C struct analogy. Inline: fixed-length columns only.
L-0192|5.6|Figure|5.6:Prose|VARCHAR inline (D-13 right). Left as taught.
L-0193|5.6|Figure|5.6:Prose|LONGTEXT by reference (D-13 left). Left as taught + A-D-14, A-D-15.
L-0194|5.6|Prose||Two reads vs one. Left as taught.
L-0195|5.6|Prose||Rows must stay bounded. + A-D-16.
L-0196|5.6|Prose||Which fields are short vs long.
L-0197|5.6|Prose||5,000-char comment. Inline + A-D-17 (utf8mb4).
L-0198|5.6|Prose||List pages don't need the body.
L-0199|5.6|Prose|7:Prose|Keep rows minimal.
L-0200|5.7|Prose|5.7:Figure|Three approaches to published_at.
L-0201|5.7|Prose|5.7:Figure|Approach 1: native type.
L-0202|5.7|Prose||Serialise to disk, parse back.
L-0203|5.7|Prose|5.7:Figure|Hypothetical string storage; board example 02-04-2022T09:01:36Z.
L-0204|5.7|Prose|5.8:PauseAndThink|Last-7-days query parses every row.
L-0205|5.7|Prose||Expensive; storage format decides performance.
L-0206|5.7|Prose||MySQL/Postgres/MongoDB differ; seconds or ms.
L-0207|5.7|Prose||Know how yours stores dates.
L-0208|5.7|Prose|5.9:TradeoffTable|Convenient but can be suboptimal. Left as taught.
L-0209|5.7|Prose|5.7:Figure|Approach 2: epoch integer column.
L-0210|5.7|Prose||Epoch definition.
L-0211|5.7|Figure|5.7:Prose, 5.9:TradeoffTable|20 bytes vs 4 bytes (Fig 5·h byte strip).
L-0212|5.7|Prose|5.9:TradeoffTable|Efficient but unreadable.
L-0213|5.7|Prose|5.7:SourceNote, 5.9:TradeoffTable|Light on the index. SN-12.
L-0214|5.8|Prose||Redbus 2016 (attributed, unverifiable).
L-0215|5.8|Prose||Epoch loses readability for their engineers (attributed).
L-0216|5.8|Prose|5.7:Figure|Approach 3: relax a constraint.
L-0217|5.8|Prose|5.7:Figure|YYYYMMDD integer 20220402.
L-0218|5.8|Prose|5.9:TradeoffTable|Readable and fast integer compare.
L-0219|5.8|Prose||Be creative; alter constraints.
L-0220|5.8|Prose||Choose by readability, performance, convenience.
L-0221|5.8|PauseAndThink|5.8:Prose|Asked: inflexible? They knew they didn't need time.
L-0222|5.8|PauseAndThink|5.8:Prose|Asked: no speed over epoch; agreed; readability. P8.
L-0223|5.8|Prose||Instructor has seen custom formats elsewhere (unverifiable).
L-0227|5.8|Prose||Production, more analytics than transactional (attributed).
L-0224|5.9|Prose|5.9:SourceNote, 5.9:TradeoffTable|Native type captures zone. SN-13 (+A-D-21).
L-0225|5.9|Prose||Render epoch in local zone.
L-0226|5.9|MarginNote||'From practice: burned by time zones'; keep UTC.
L-0231|5.9|Prose||Asked: epoch overflows 4-byte int. Left as taught.
L-0232|5.9|Prose|5.9:SourceNote, 5.9:TradeoffTable|'2032', 8 bytes doubles. SN-14 (+A-D-20).
L-0233|5.9|Prose||Pre-1970 negatives. Inline: normal and supported.
L-0234|5.9|Prose||Compressed serialised datetime ~6 B 'let's say'. Left as taught + A-D-18.
L-0235|5.9|Prose|5.9:SourceNote|MySQL range BCE-20,000 'I think'. SN-15 (+A-D-19).
L-0236|5.9|Prose||Read MySQL's official datetime docs.
L-0169|6.1|Prose||Caching gets a few minutes today; returns through the course.
L-0237|6.1|Prose||Sets up Lecture 2's first discussion.
L-0238|6.1|Prose||Misconception: caching = in-memory.
L-0239|6.1|Prose||Definition: anything saving heavy computation or operation.
L-0240|6.1|Prose||Memoization.
L-0241|6.1|Prose|6.1:Figure|Not only RAM: disk, network.
L-0242|6.1|Prose||Usually cuts disk or network I/O; RAM habit.
L-0243|6.1|Figure|6.1:Prose|Cache an expensive network call on local disk.
L-0244|6.1|RuleBox|6.1:Prose, 6.1:Figure, 7:Prose|RuleBox §6: disk I/O, network I/O, computation.
L-0245|6.1|Prose||Be creative.
L-0246|6.1|RuleBox|6.1:Prose|Glorified hash tables (board). Left as taught.
L-0247|6.1|Prose||Redis HLL/Bloom/geo. Left as taught + A-CC-16.
L-0248|6.2|Figure|6.2:Prose|Remote cache, logically between API and DB (D-15).
L-0249|6.2|Prose|6.2:AnimationClip|Cache-aside read flow.
L-0250|6.2|Prose|6.2:Figure, 6.2:AnimationClip|One copy all servers read.
L-0251|6.2|AnimationClip|6.2:Prose|Popular blog join cached; DB load drops.
L-0252|6.2|Prose||Network hop still paid; cheaper than recomputing.
L-0260|6.3|Prose||Asked: precomputed result in a DB table? Possible. + A-CC-11.
L-0261|6.3|Prose||'Why not this, why just this?'.
L-0286|6.3|Prose|6.3:TradeoffTable|Persistent connections to both cancel out.
L-0287|6.3|Prose|6.3:Figure, 6.3:TradeoffTable|Redis memory vs DB disk. Left as taught + A-CC-10.
L-0288|6.3|Prose|6.3:SourceNote|Small vs large reads. SN-16 (+A-CC-09).
L-0289|6.3|Figure|6.3:Prose, 6.3:TradeoffTable|B+ tree log n vs hash. Left as taught.
L-0290|6.3|Prose|6.3:TradeoffTable|RAM costlier and smaller; biggest factor.
L-0291|6.3|Prose||Subjective; not much difference overall. Left as taught.
L-0292|6.3|Prose||Holds if computation saved is large (claim uncertain; short caveat).
L-0293|6.3|Prose||Managed Redis pricing (A-CC-17 not used).
L-0294|6.3|Prose|6.3:TradeoffTable|Table in app DB loads that DB.
L-0299|6.3|Prose||Worst case assumed; small table in RAM -> no difference.
L-0300|6.3|Prose||Index doesn't guarantee RAM; design for worst case.
L-0307|6.3|Prose|6.3:ForwardChip|Indexes stored on disk; Lecture 3.
L-0274|6.4|Prose|6.4:PauseAndThink|Compress only big values; trade-off.
L-0275|6.4|Prose||App compresses; caches are KV. Left as taught + A-CC-07.
L-0276|6.4|Prose||Plugins maybe; never needed. Left as taught + A-CC-06.
L-0277|6.4|Prose|6.4:Figure|Email loses; 10 KB -> 1 KB wins.
L-0278|6.4|Prose||CDNs and media. Left as taught + A-CC-08.
L-0279|6.4|PauseAndThink|6.4:Prose, 6.4:Figure|Reasoned live: compress in the client (network). Left as taught; P9 reveal.
L-0280|6.4|Figure|6.4:Prose|Compress, send, store, receive, decompress.
L-0281|6.4|Prose|7:Prose|Keep asking questions.
L-0253|6.5|ForwardChip||Cache internals, eviction, LRU/LFU: Lecture 9.
L-0254|6.5|Prose|6.5:Figure, 7:ForwardChip|The exercise; Lecture 2 opens with it.
L-0255|6.5|MarginNote||'From an earlier cohort': Goldman Sachs participant (unverifiable).
L-0256|6.5|Prose|6.5:Figure|Central cache covered; CDN and LB hints.
L-0257|6.5|Prose||Purpose: spark ideas, see the hacks.
L-0262|6.5|Prose||Local storage deferred to Lecture 2 §1.4.
L-0258|7|Prose||Trade-offs, no one right answer.
L-0328|7|Prose||Trade-off intuition over 8 weeks; brainstorming needs the why.
L-0329|7|ForwardChip||Three hats, week 6; senior engineer's view in Lecture 8.
"""

DROPPED = [
    ("L-0007", "Pure logistics: how to book the three one-on-ones on the course platform."),
    ("L-0011", "Pure logistics: the post-session feedback form."),
    ("L-0012", "Pure logistics: the Discord 'Look What I Found' channel."),
    ("L-0013", "Pure logistics: session days and times, open forum, calendar invite."),
    ("L-0014", "Pure logistics: where and when recordings are posted."),
    ("L-0015", "Pure logistics: when questions are taken during a session. Every question asked is placed under its topic."),
    ("L-0017", "Pure logistics/promotion: the instructor's YouTube channel and membership."),
    ("L-0018", "Pure logistics/promotion: the instructor's other course and essays."),
    ("L-0166", "Pure logistics: the break and the time split for the second half."),
    ("L-0337", "Pure logistics: recording upload and a reminder to do the exercise (the exercise itself is L-0254, placed in 6.5)."),
]

SOURCE_NOTES = {
    "SN-01": ["L-0332"], "SN-02": ["L-0070"], "SN-03": ["L-0311"], "SN-04": ["L-0079"],
    "SN-05": ["L-0093", "L-0094"], "SN-06": ["L-0325"], "SN-07": ["L-0185"], "SN-08": ["L-0267"],
    "SN-09": ["L-0268"], "SN-10": ["L-0273"], "SN-11": ["L-0190"], "SN-12": ["L-0213"],
    "SN-13": ["L-0224"], "SN-14": ["L-0232"], "SN-15": ["L-0235"], "SN-16": ["L-0288"],
}

ADDITIONS = r"""
A-OOI-01|2.8|SourceNote|SN-02: a plain SET clears the TTL; write SET ... EX 30 every heartbeat.
A-OOI-02|2.8|SourceNote|SN-02: DynamoDB TTL lag of days; check expires_at < now.
A-OOI-04|3.7|Prose|DynamoDB Streams mark TTL deletions as service deletions (archiver can tell them apart).
A-OOI-05|3.7|Prose|Debezium reads the MySQL binlog into Kafka topics (makes L-0316 concrete).
A-OOI-06|2.5|CodeBlock|Upsert with INSERT ... ON CONFLICT DO UPDATE for the first heartbeat.
A-OOI-08|2.6|Prose|Row overhead: ~36 B per row in PostgreSQL before indexes; conclusion holds.
A-OOI-09|4.1|Prose|100k writes/s is within a Redis node's benchmark range; hard for a disk RDBMS.
A-OOI-10|4.5|Prose|HikariCP connectionTimeout 30 s default: the waiting caller gets an error after it.
A-OOI-11|4.5|Prose|HikariCP idleTimeout defaults to 10 minutes, matching the class's example.
A-OOI-12|4.5|Prose|HikariCP recommends fixed-size pools (min = max), the opposite convention.
A-OOI-13|4.7|SourceNote|SN-06: HikariCP sizing starting point; past the optimum throughput falls.
A-OOI-14|4.7|Prose|Central poolers (PgBouncer, RDS Proxy) multiplex many servers onto few connections.
A-OOI-15|4.6|Prose|RDS default max_connections from memory (MySQL ~MB/12).
A-OOI-16|4.2|Prose|PostgreSQL spawns a backend process per connection.
A-OOI-17|4.9|Prose|ALB health checks every 30 s, 2 failures; LB pulls.
A-OOI-18|2.8|MarginNote|Facebook Messenger kept a persistent MQTT connection (2011).
A-OOI-19|4.5|Prose|PostgreSQL max_connections default 100, 3 reserved for superusers.
A-OOI-20|4.6|Prose|EC2 connection-tracking allowance per instance.
A-OOI-21|4.6|MarginNote|Redis benchmarked past 60,000 client connections; fits the 'go explore' note.
A-OOI-22|2.3|Prose|WebSocket gives two-way messages over one connection (the board's 'unless').
A-D-01|3.2|SourceNote|SN-03: AOF fsync policies; everysec may lose 1 s.
A-D-02|3.2|SourceNote|SN-03: async replication can lose acknowledged writes on failover.
A-D-03|3.6|Prose|Expired events fire on actual deletion, can be late, off by default, fire-and-forget.
A-D-05|3.6|SourceNote|SN-05: SDK reuses TCP connections to DynamoDB.
A-D-06|3.6|SourceNote|SN-05: DynamoDB single-digit ms; DAX for microseconds.
A-D-07|3.1|Prose|Redis licence history 2024-25 and the Valkey fork.
A-D-09|5.3|SourceNote|SN-07: InnoDB purge / PostgreSQL VACUUM defer physical removal.
A-D-10|5.3|SourceNote|SN-07: page merge only below MERGE_THRESHOLD (50%).
A-D-11|5.3|Prose|MySQL DELETE ... LIMIT loop; also in the 5.4 CodeBlock.
A-D-12|5.4|CodeBlock|Partial unique index on email WHERE NOT is_deleted.
A-D-13|5.4|Prose|MongoDB TTL monitor runs every 60 s and can lag.
A-D-14|5.6|Prose|InnoDB DYNAMIC moves long values off-page only when the row doesn't fit.
A-D-15|5.6|Prose|PostgreSQL TOAST for any wide value; fetched only if selected.
A-D-16|5.6|Prose|InnoDB in-page row limit just under 8 KB; MySQL 65,535-byte row cap.
A-D-17|5.6|Prose|utf8mb4 up to 4 bytes per character.
A-D-18|5.9|Prose|MySQL DATE 3 B, DATETIME 5 B, TIMESTAMP 4 B; also feeds T3 sizes.
A-D-19|5.9|SourceNote|SN-15: PostgreSQL timestamp 8 B, 4713 BC - 294276 AD.
A-D-20|5.9|SourceNote|SN-14: MySQL TIMESTAMP ends 2038-01-19.
A-D-21|5.9|SourceNote|SN-13: TIMESTAMP vs DATETIME zones; timestamptz stores UTC.
A-D-24|5.2|Prose|Erasure needs a legal basis for reuse (ML); inline beside L-0177.
A-D-25|3.5|Prose|MongoDB multi-document ACID since 4.0/4.2.
A-CC-01|5.5|SourceNote|SN-08: one month, extendable by two.
A-CC-02|5.5|Prose|Art. 17(3) exceptions; right is not absolute.
A-CC-03|5.5|Prose|ICO 'beyond use' for backups (beside L-0270; also cited in SN-09).
A-CC-04|5.5|SourceNote|SN-10: territorial scope.
A-CC-05|5.5|Prose|Atlassian 2022 outage facts.
A-CC-06|6.4|Prose|pymemcache compresses values over 400 bytes (client-side).
A-CC-07|6.4|Prose|Redis compresses only RDB files and optional list nodes.
A-CC-08|6.4|Prose|Compress text; media is already compressed.
A-CC-09|6.3|SourceNote|SN-16: page-sized reads, 8 kB / 16 KB.
A-CC-10|6.3|Prose|InnoDB buffer pool keeps hot pages in RAM.
A-CC-11|6.3|Prose|Materialized view as the 'table as cache'; 188 ms -> 0.117 ms.
A-CC-12|2.3|SourceNote|SN-01: HTTP/1.1 persistent by default; HTTP/1.0 per-request.
A-CC-13|2.3|MarginNote|Keep-Alive header only matters in HTTP/1.x.
A-CC-14|2.3|MarginNote|WebSocket starts as an HTTP Upgrade.
A-CC-15|2.3|MarginNote|HTTP/3 over QUIC over UDP.
A-CC-16|6.1|Prose|Redis built-in probabilistic types as of Oct 2026.
"""

NOT_USED = {
    "A-OOI-03": "optional; Redis's passive/active expiry is taught in Lecture 3, and the ForwardChip (L-0306) points there.",
    "A-OOI-07": "optional; duplicates A-D-20 (the 2038 limit), which is used in SN-14.",
    "A-D-04": "optional; duplicates A-OOI-02 (TTL lag) and A-OOI-04 (service deletions in Streams), both used.",
    "A-D-08": "optional; duplicates A-CC-16 (Redis built-in types), which is used in 6.1.",
    "A-D-22": "optional; SQLite's date storage choice adds a fourth database the class never discussed.",
    "A-D-23": "optional; a law-firm summary of India's IT Rules 2021 whose later amendments were not checked; L-0181 stands as taught without it.",
    "A-CC-17": "optional; dated ElastiCache pricing dimensions; L-0293's point (managed Redis has its own pricing) needs no figures.",
}


def main():
    placements = {}
    for line in TABLE.strip().splitlines():
        i, sec, comp, also, note = [x.strip() for x in line.split("|", 4)]
        al = []
        for a in [x.strip() for x in also.split(",") if x.strip()]:
            s, c = a.split(":")
            al.append({"section": s, "component": c})
        assert i not in placements, i
        placements[i] = {"section": sec, "component": comp, "also": al, "note": note}
    for sn, ids in SOURCE_NOTES.items():
        for i in ids:
            placements[i]["source_note"] = sn
    adds = {}
    for line in ADDITIONS.strip().splitlines():
        k, sec, comp, note = [x.strip() for x in line.split("|", 3)]
        adds[k] = {"section": sec, "component": comp, "note": note}
    out = {
        "lecture": "lec04",
        "ledger": "lectures/lec04/ledger/ledger.jsonl",
        "sections": SECTIONS,
        "components": COMPONENTS,
        "placements": dict(sorted(placements.items())),
        "dropped": [{"id": i, "reason": r} for i, r in DROPPED],
        "source_notes": SOURCE_NOTES,
        "additions": adds,
        "additions_not_used": NOT_USED,
    }
    (HERE / "placement.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"placed {len(placements)}, dropped {len(DROPPED)}, additions {len(adds)}, not used {len(NOT_USED)}")


if __name__ == "__main__":
    main()
