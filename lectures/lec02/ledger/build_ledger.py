#!/usr/bin/env python3
"""Build the final Lecture 02 ledger (editor role).

Mechanical part only: every judgement (distortion fixes, merges, cross-links, board decisions, flag resolutions,
topic rules) is written out in the tables below and logged to ledger_changes.md with its final L id.

Inputs : part*.jsonl, gaps.jsonl, ../board/board_items.jsonl
Outputs: ledger.jsonl, id_map.json, ledger_changes.md
"""
import copy
import glob
import json
import os
import re

D = os.path.dirname(os.path.abspath(__file__))
BOARD = os.path.join(D, "..", "board", "board_items.jsonl")


def load(path):
    return [json.loads(l) for l in open(path, encoding="utf-8") if l.strip()]


parts = []
for f in sorted(glob.glob(os.path.join(D, "part*.jsonl"))):
    parts += load(f)
gaps = load(os.path.join(D, "gaps.jsonl"))
board = load(BOARD)
orig = {it["id"]: copy.deepcopy(it) for it in parts + gaps + board}
seq = {i: n for n, i in enumerate([it["id"] for it in parts + gaps + board])}

# =============================================================================================================
# 1. Distortion fixes (gap_report.md), each re-checked against transcript.md
# =============================================================================================================
FIXES = [
    ("K1-099", dict(statement="Financial companies categorise every transaction (by sellers) along like 50-60 parameters "
                    "that the teacher knows of (country, region, type of products purchased, type of things interacted "
                    "with, and so much more), ingest them into a graph so almost every person has an independent graph, "
                    "and when a new edge appears outside it they compute a degree of suspicion and predict whether the "
                    "transaction is suspicious."),
     "restored the hedge 'like 50 or 60 parameters that I know of' and 'by sellers' (transcript 00:36:54)"),
    ("K1-106", dict(statement="Dgraph is written in Go and works very well at [unclear] scale but falters a bit at high "
                    "scale; the teacher used it very extensively and it was one of the first projects he went through to "
                    "understand Go."),
     "removed invented 'moderate scale'; the scale word is the unresolved [unclear: \"bit scale\"]; flag and medium kept"),
    ("K1-094", dict(statement="The one-level example is simplified: real cohort building happens two or three levels deep "
                    "and becomes really difficult to model.",
                    detail="Earlier the teacher said: 'Modeling this becomes a piece of cake in graph' (00:33:20)."),
     "removed inferred 'outside a graph' (teacher: 'It becomes really difficult to model'); 00:33:20 'piece of cake in graph' quote moved to detail"),
    ("K1-093", dict(detail_append="The teacher frames it: 'Modeling this becomes a piece of cake in graph' (00:33:20)."),
     "added the omitted 'Modeling this becomes a piece of cake in graph' (00:33:20) to detail (hunter note on K1-094)"),
    ("K1-138", dict(detail="The teacher paraphrases the docs ('please use it sparing or something on similar lines'); "
                    "use cross-shard ACID only when you actually need it ('If you need something like this, you should "
                    "use it')."),
     "detail now carries the teacher's paraphrase hedge and his usage condition (transcript 00:50:16)"),
    ("K1-023", dict(statement="The previous session's distributed key-value store sharded its databases (one holding keys "
                    "A to M, another N to Z), giving up consistency to get an almost highly available, horizontally "
                    "scalable system - exactly what non-relational databases do.",
                    detail="At 00:51:20 a student describes it as 'we tried to design the KV store on relational "
                    "databases', with no correction from the teacher.",
                    add_audio=["00:51:20-00:51:49"]),
     "dropped 'relational' from the statement (not in the 00:07:03 passage); student's 00:51:20 wording kept in detail with its source"),
    ("K2-107", dict(statement="Each WebSocket server keeps (in memory, or maybe on disk) which users are connected to it "
                    "and which channels they belong to: WS1 knows A, B, C, D are in channel 1; WS2 knows E is part of "
                    "channel 2 (as spoken; the running example has E in channel 1).",
                    add_flags=["check: \"E is part of channel 2\" - likely slip for channel 1"], confidence="medium"),
     "no longer silently corrects 'channel 2' to channel 1; flag added; confidence high -> medium"),
    ("K2-126", dict(detail="Correction: The teacher said 'So that's okay' and asked what else the issue is - not the "
                    "overhead in question. (At 02:04:33, replying to another student, he calls a server going down "
                    "'basically fault tolerance'.)"),
     "detail no longer attributes the 'fault tolerance' remark to this exchange (it was said at 02:04:33 to Student 9)"),
    ("K2-122", dict(detail="At 02:06:01 the teacher told a different student, whose answer was that one connection per "
                    "server limits scaling, 'you are the closest'. The real overhead turned out to be connections wasted "
                    "on inter-server links."),
     "'closest' remark re-attributed to Student 1 at 02:06:01, not to this student (02:01:45)"),
    ("K2-132", dict(status="endorsed",
                    detail="The teacher first countered (a server can still have a good amount, say a million "
                    "connections; never more than 10,000 servers; 10,000 connections are created with ease) but then "
                    "said 'you are the closest'. He refined it right after: the issue is not running out of connections "
                    "but wasting the server's limited connections on inter-server links."),
     "status proposed_then_corrected -> endorsed ('I heard you, you, you are the closest'); counter and refinement in detail"),
    ("K2-023", dict(status="endorsed",
                    detail="The teacher kept the DM-as-channel part ('So you are suggesting two users, direct messages "
                    "also channel. Yeah.'; at 01:12:12 'this is a good way to design this database schema') but called "
                    "the publisher-subscriber addition an unnecessary complication ('focus on the first part')."),
     "status proposed_then_corrected -> endorsed (core DM-as-common-channel adopted); pub/sub correction kept in detail (chose status change over a split)"),
    ("K2-086", dict(statement="Weigh pros versus cons: micro-optimizations like UDP give a small overhead saving but add "
                    "retry complexity and needlessly complex client code - don't overcomplicate; when you open it "
                    "(apparently Slack) you see gRPC requests being fired, no fancy implementation.",
                    add_flags=["check: referent of \"it\" in \"when you open it\""], confidence="medium"),
     "'when you open Slack' -> 'when you open it (apparently Slack)'; flag added; confidence high -> medium"),
    ("K2-055", dict(detail="Posed here as a guiding question ('Is persistence of message more important? Right.'); "
                    "asserted as the type-1 guarantee from 01:30:06."),
     "detail notes it is a Socratic question here, answered by the type-1 flow"),
    ("K2-020", dict(detail_append="Student's argument: an enum allows better filtering than string-prefix processing "
                    "('at least it can be a little more better filtering compared to like if I start processing')."),
     "student's own justification added to detail (01:09:37)"),
    ("K3-047", dict(statement="On Instagram, live chat messages and, in the live-video space, the heart animation would "
                    "all go over the same WebSocket connection.",
                    add_flags=["check: \"live video space\" - video stream or the live-video feature's events?"],
                    confidence="medium"),
     "no longer claims the video stream itself goes over the WebSocket; flag added; confidence high -> medium"),
    ("K3-140", dict(status="open", confidence="low",
                    detail="The teacher only confirmed ('Yeah', 03:04:06) that the DB acknowledges the write to the "
                    "worker; the hold/retry/reprocess part is the student's."),
     "status endorsed -> open, confidence medium -> low ('Correct. Correct.' sits inside the student's turn)"),
    ("K3-035", dict(detail="If Cassandra is used [unclear: 'well input'], you still need a way to store the messages in "
                    "the sharded store."),
     "restored the dropped Cassandra remark in detail"),
    ("K3-045", dict(statement="Even if a page fires 100 HTTP requests in parallel, the browser only sends six at a time, "
                    "then the next six, and so on."),
     "removed invented timing 'after those complete' (teacher: 'and then next six')"),
    ("K3-060", dict(statement="To cover lost real-time messages, run periodic background refreshes of the Slack channel: "
                    "e.g. a small JavaScript thread periodically fetches the last 50 messages, checks whether any were "
                    "missed, and renders them in the UI, mimicking a (false) notification."),
     "restored 'false' in 'mimicking a false notification'"),
    ("K3-053", dict(detail="For Slack it goes the way discussed earlier (synchronous persistence), then to the edge "
                    "server and the other users."),
     "detail no longer imports 'persisted and then sent' into this passage; points back to the earlier Slack flow"),
]

# =============================================================================================================
# 2. Flag resolutions from the board (flag_resolutions.md); applied to original items before merging
#    (flag id, kind, item, board time, evidence, substring of the flag text on the item or None)
# =============================================================================================================
FLAGRES = [
    ("F004", "resolved", "K1-045", "00:15:15", "heading 'Document DBs' above the KV list", "[?Document"),
    ("F008", "resolved", "K1-057", "00:20:45", "stock_ticks header 'Symbol | price | name | exchange | timestamp'", "[?exchange"),
    ("F015", "resolved", "K1-082", "00:30:15", "'Graph Databases - stores data in nodes and edges'", "[?store"),
    ("F023", "resolved", "K1-103", "00:39:30", "'- solid use case: Fraud detection'", "[?use case"),
    ("F059", "resolved", "K2-023", "01:12:00", "'DM = channel', then 'DM = channel with 2 people'", "[?direct"),
    ("F063", "resolved", "K2-051", "01:22:30", "'Socket ??' and the 'WS' server stack", "[?WebSocket"),
    ("F083", "resolved", "K2-098", "01:46:45", "D-03's 'WS' stack at the start of 'Scaling WebSocket servers'", "[?WebSocket"),
    ("F096", "resolved", "K2-131", "02:05:30", "mesh of 'WS1'/'WS2'/'WS3' with 'TCP' links", "[?WebSocket"),
    ("F098", "resolved", "K2-132", "02:05:39", "same WS1/WS2/WS3 mesh; the board's term is 'WS'", "[?WS"),
    ("F100", "resolved", "K2-133", "02:06:30", "same mesh, TCP link WS1-WS2 circled", "[?WebSocket"),
    ("F113", "resolved", "K3-034", "02:19:45", "', type' added live after 'name' in the recap channels table", "[?type"),
    ("F114", "resolved", "K3-035", "02:20:15", "'pick any DB that you can shard .... even SQL works !', 'Partitioned DB'", "[?DB"),
    ("F116", "resolved", "K3-042", "02:24:45", "'WS Edge Servers' with three 'WS' lines", "[?WS"),
    ("F121", "resolved", "K3-056", "02:28:30", "'Balancer' written above a new box while he names it", "other balance"),
    ("F130", "resolved", "K3-068", "02:35:30", "'load Balancer' in D-11", "[?a load balancer"),
    ("F146", "resolved", "K3-096", "02:43:15", "'Balancer' box in D-11", "[?balancer"),
    ("F147", "resolved", "K3-096", "02:43:15", "same 'Balancer' box", None),
    ("F148", "resolved", "K3-096", "02:43:15", "'Redis PubSub [clustered]' in D-11", "[?Redis"),
    ("F151", "resolved", "K3-103", "02:48:30", "'Redis PubSub [clustered]'", "[?Redis"),
    ("F152", "resolved", "K3-104", "02:48:30", "D-11 path Kafka -> Messaging Service Workers -> Messages DB (partitioned)", "[?DBs"),
    ("F013", "supported", "K1-074", "00:27:30", "'Column Oriented database' on screen", "[?columnar"),
    ("F031", "supported", "K1-123", "00:39:30", "'solid use case: Fraud detection' earlier", "[?use case"),
    ("F040", "supported", "K1-143", "00:08:30", "KV examples 'Redis, DynamoDB, Aerospike'", "[?DynamoDB"),
    ("F044", "supported", "K2-013", "01:05:00", "'user.channel' written first, renamed 'Membership'", "[?user"),
    ("F061", "supported", "K2-046", "01:22:00", "'MySQL / Cassanda / Mongo'; later 'even SQL works !'", "[?DB"),
    ("F070", "supported", "K2-062", "01:29:15", "'Socket ??' and the 'WS' stack", "[?WebSocket"),
    ("F081", "supported", "K2-095", "01:00:45", "heading 'Designing : Slack's Realtime Communication (Text)'", None),
    ("F110", "supported", "K3-029", "01:00:45", "heading 'Slack's Realtime Communication'", None),
    ("F166", "supported", "K3-124", "02:59:00", "D-11 'WS' lines to 'Edge Servers'", "[?WebSocket"),
    ("F192", "supported", "K3-151", "03:12:15", "D-11 'WS' lines", "[?WebSocket"),
    ("F193", "supported", "K3-151", "03:12:15", "D-11 'WS' lines", "[?WebSocket"),
    ("F196", "supported", "K3-152", "03:13:15", "D-11 'WS' lines; recap 'WebSockets' heading (02:21)", "[?WebSockets"),
    # editor's own board reading (not in flag_resolutions.md): B-045 shows 'WS2 E->C1'
    ("B-045", "supported", "K2-107", "01:55:15", "board 'WS2 E->C1' (B-045) - supports the slip reading", "E is part of channel 2"),
]

# =============================================================================================================
# 3. Duplicate merges (absorbed -> kept): nuance of the absorbed item moved into the kept item's detail
# =============================================================================================================
MERGES = [
    ("K1-103", "K1-086",
     "Recap (00:38:20): if you can visualise something as a graph, more often than not that is NOT where you should "
     "use a graph database (follow/following is trivial); use one where you need actual raw graph algorithms.",
     "same 'visualisable as a graph != use a graph DB' point, K1-103 is the recap; its 'use where you need raw graph algorithms' half moved to detail and cross-linked to K1-088"),
    ("K1-118", "K1-024",
     "Restated at 00:42: to scale a relational database just don't use foreign keys / constraints; then you can "
     "partition it exactly like a non-relational database, which never gives you those features anyway.",
     "same 'drop constraints and a relational DB scales horizontally' rule; K1-118's 'just don't use foreign key. Simple' and 'partition exactly like a non-relational DB' moved to detail, both verbatims kept"),
    ("K1-109", "K1-003",
     "Restated at 00:39:47 to close the introduction: these were the basics of non-relational databases, and each of "
     "them will be used in the coming weeks.",
     "same 'only scratched the surface, used in later weeks' admin note; K1-146 (Slack forward reference, after-break plan) kept separate and cross-linked"),
    ("K1-117", "K1-115",
     "Put explicitly: relational databases chose data consistency and strong consistency over a high ingestion rate.",
     "same backstory (relational DBs chose correctness); K1-117's explicit counterpart 'over a high ingestion rate' moved to detail"),
    ("K1-128", "K1-120",
     "Restated at 00:46: throughout the course every database choice weighs all these factors; don't be rigid on a "
     "particular database or say 'I will use NoSQL everywhere'.",
     "same 'don't be rigid on one database' rule; K1-128's course-wide framing and 'I will use NoSQL everywhere' moved to detail"),
    ("K2-043", "K1-125",
     "In the Slack design (01:17:47) the teacher adds that Cassandra-like databases are very ingestion heavy and suit "
     "very high-ingestion systems such as real-time chat messages at scale (WhatsApp, Instagram, Tinder).",
     "cross-part repeat (Cassandra for high ingestion); K2-043's chat examples (WhatsApp, Instagram, Tinder) moved to detail"),
    ("K2-094", "K2-059",
     "Restated at 01:44:35 with the reason: receiving always happens over WebSocket, otherwise the client would have "
     "to continuously short-poll and refresh the page.",
     "same 'receiving is over WebSocket' point; K2-094's reason (else short polling and refreshes) moved to detail"),
    ("K2-083", "K2-080",
     "No one stops you from making a DB call on the WebSocket server, but you avoid it because of security, server "
     "load, and because if it goes down it breaks the entire real-time communication of the platform.",
     "same 'no DB calls from the WebSocket server' rule; K2-083's 'no one stops you' and platform-wide outage risk moved to detail"),
    ("K2-033", "K2-014",
     "Restated at 01:15:16: naming the table 'membership' automatically triggers your brain to add more attributes "
     "(e.g. read-till point, active for this time, how a user interacts with the channel), giving scope for "
     "extension; the 'channel' can be a channel, a user or a DM.",
     "same 'noun name invites more attributes' point; K2-033's example attributes and 'channel can be a channel, a user or a DM' moved to detail"),
    ("K2-042", "K2-040",
     "Even a relational database does a very good job of storing chat messages, given that it is partitioned and "
     "sharded.",
     "near-identical (sharded relational DB is enough for Slack); K2-042's 'given that it is partitioned and sharded' moved to detail"),
    ("K3-008", "K3-007",
     "A real-time Pub/Sub does not guarantee delivery; its only guarantee is to send the message to everyone "
     "connected to it at that moment.",
     "same 'a server not connected at publish time misses it'; K3-008's no-delivery-guarantee framing moved to detail"),
    ("K3-141", "K3-139",
     "Example (03:04:39): when you write to DynamoDB, it is internally written to three different storage nodes, and "
     "only after all three complete does it report the write as complete.",
     "same 'no ack until written in three places'; K3-141's explicit DynamoDB example moved to detail"),
]

# Partial overlaps: cross-linked via depends_on (later -> earlier) instead of merged
CROSSLINKS = [
    ("K1-017", "K1-013"), ("K1-020", "K1-013"), ("K1-038", "K1-025"), ("K1-048", "K1-046"), ("K1-065", "K1-060"),
    ("K1-066", "K1-062"), ("K1-070", "K1-052"), ("K1-127", "K1-121"), ("K1-127", "K1-123"), ("K1-139", "K1-138"),
    ("K1-143", "K1-141"), ("K1-146", "K1-003"), ("K1-086", "K1-088"),
    ("K3-109", "K1-134"), ("K3-109", "K1-135"), ("K3-108", "K1-088"), ("K2-048", "K1-123"), ("K2-048", "K1-125"),
    ("K2-040", "K1-126"), ("K2-040", "K1-022"), ("K3-055", "K1-005"), ("K3-155", "K1-006"), ("K3-155", "K3-055"),
    ("K2-003", "K1-004"), ("K2-005", "K1-005"),
    ("K2-089", "K2-080"), ("K2-090", "K2-082"), ("K2-092", "K2-090"), ("K2-038", "K2-012"), ("K2-038", "K2-027"),
    ("K2-034", "K2-031"), ("K2-134", "K2-101"), ("K2-076", "K2-063"), ("K2-079", "K2-063"), ("K2-056", "K2-052"),
    ("K2-118", "K2-088"), ("K2-129", "K2-126"), ("K2-069", "K2-068"), ("K2-068", "K2-065"), ("K2-135", "K2-132"),
    ("K2-024", "K2-023"), ("K2-097", "K2-095"),
    ("K3-034", "K2-024"), ("K3-034", "K2-028"), ("K3-148", "K2-028"), ("K3-149", "K2-028"), ("K3-035", "K2-040"),
    ("K3-036", "K2-039"), ("K3-037", "K2-063"), ("K3-107", "K2-063"), ("K2-093", "K2-064"), ("K3-042", "K2-064"),
    ("K3-067", "K2-093"), ("K3-053", "K2-072"), ("K3-053", "G-003"), ("K3-105", "K2-075"), ("K3-073", "K2-090"),
    ("K3-074", "K2-092"), ("K3-072", "K2-091"), ("K3-098", "K2-090"), ("K3-049", "K2-097"), ("K3-094", "K2-065"),
    ("K3-094", "K2-055"), ("K3-032", "K2-088"), ("K3-033", "K2-088"), ("K3-093", "K2-088"), ("K3-133", "K2-088"),
    ("K3-013", "K2-106"), ("K3-051", "K2-106"), ("K3-077", "K2-106"), ("K3-082", "K2-108"), ("K3-002", "K2-115"),
    ("K3-001", "K2-135"), ("K3-001", "K2-136"), ("K3-003", "K2-101"), ("K3-153", "K2-031"), ("K3-153", "K2-032"),
    ("K3-111", "K2-070"), ("K3-154", "K2-070"), ("K3-038", "K2-099"), ("K3-038", "K2-100"), ("K3-054", "K2-094"),
    ("K3-030", "K2-105"), ("K3-063", "K2-105"), ("K3-021", "K2-131"), ("K3-006", "K2-109"), ("K3-076", "K2-096"),
    ("K3-107", "K2-096"),
    ("K3-087", "K3-005"), ("K3-095", "K3-019"), ("K3-057", "K3-024"), ("K3-096", "K3-057"), ("K3-096", "K3-024"),
    ("K3-056", "K3-021"), ("K3-058", "K3-030"), ("K3-063", "K3-058"), ("K3-156", "K3-030"), ("K3-156", "K3-058"),
    ("K3-066", "K3-063"), ("K3-107", "K3-049"), ("K3-097", "K3-070"), ("K3-076", "K3-068"), ("K3-098", "K3-068"),
    ("K3-098", "K3-074"), ("K3-051", "K3-013"), ("K3-090", "K3-083"), ("K3-126", "K3-060"), ("K3-127", "K3-121"),
    ("K3-130", "K3-121"), ("K3-139", "K3-136"), ("K3-114", "K3-055"),
]

REJECTED = [
    "K3-155 -> K1-006 merge: rejected. K1-006 is a learning-approach rule (system design = recognising patterns, Lego "
    "blocks); K3-155 is the closing claim that these systems are interconnected and a few changes give a brand-new "
    "system. Related, not the same; cross-linked (K3-155 depends_on K1-006 and K3-055).",
    "K3-109 numbers into K1-134 detail: not done; K3-109 answers a different student's multi-level-marketing case "
    "(K3-108), so it stays its own item, cross-linked to K1-134/K1-135.",
    "K2-023 split into two items: not done; status set to endorsed with the pub/sub correction kept in detail "
    "(the hunter's second option), so nothing is dropped and no new item is invented.",
    "K2-101 / K2-134 merge: cross-linked instead; K2-101 sets the four-connection teaching limit, K2-134 is the "
    "'limited number of ports' step of the mesh-overhead reveal.",
    "K1-088 + second half of K1-103: K1-103 can only be absorbed once; it went whole into K1-086 (its "
    "'raw graph algorithms' half is in K1-086's detail) and K1-086 now depends_on K1-088.",
    "K1-003 / K1-109 / K1-146 three-way merge: only K1-109 merged; K1-146 also carries the after-break Slack plan and "
    "'one of them is used right here', which would lose its place in teaching order. Cross-linked to K1-003.",
    "K1-052 / K1-070: kept K1-070 as its own qa_insight (student question) cross-linked to K1-052, the hunter's "
    "alternative.",
    "K2-086 '(e.g. in the browser's network tab)': not added; the teacher did not say it. Only '(apparently Slack)' "
    "plus a check flag.",
    "K3-060 optional flag `check: meaning of \"false notification\"`: not added; the restored wording '(false)' is "
    "enough and the flag would rest on no transcript marker.",
    "G-004 'the editor may drop it as pure admin': kept; it states the support process (one-on-ones, Discord), which "
    "is course structure, not break logistics.",
    "flag_resolutions.md related note on B-070 ('audio at 02:25:24 refers to a correction job'): no such audio in "
    "transcript.md (no 'correction', 'replay' or 'buffer'), so B-070 is a board-only item.",
    "K3-141 'merge into K3-139 or K3-136': chose K3-139 (same no-ack-until-three-writes point); K3-139 depends_on K3-136.",
]

# =============================================================================================================
# 4. Board decisions: ("merge", target, board-only nuance for detail or None) | ("new", depends_on)
# =============================================================================================================
BOARD_DEC = {
    "B-001": ("merge", "K1-004", None),
    "B-002": ("merge", "K1-012", None),
    "B-003": ("merge", "K1-017", "Board: 'In most cases, NoSQL databases provide scalability and availability by "
              "compromising consistency' ('consistency' highlighted)."),
    "B-004": ("merge", "K1-020", None),
    "B-005": ("merge", "K1-022", "Board (boxed): 'NoSQL DBs scale does not mean SQL does not -> anything that shards, "
              "scales'."),
    "B-006": ("merge", "K1-028", None),
    "B-007": ("merge", "K1-029", None),
    "B-008": ("merge", "K1-033", None),
    "B-009": ("merge", "K1-026", None),
    "B-010": ("merge", "K1-026", None),
    "B-011": ("merge", "K1-040", None),
    "B-012": ("merge", "K1-043", None),
    "B-013": ("merge", "K1-048", None),
    "B-014": ("new", ["K1-040"]),
    "B-015": ("merge", "K1-051", None),
    "B-016": ("merge", "K1-053", "Board diagram D-01: rows R1-R3 drawn as long row blocks vs column blocks c1-c5 "
              "crossed by the R1-R3 lines."),
    "B-017": ("merge", "K1-055", "Board frames it as 'a table with 100 columns' and writes the query as "
              "SELECT avg(price) WHERE ts = '___';"),
    "B-018": ("merge", "K1-057", "Board: 'a row DB will go row by row reading all columns & discarding 98 of them "
              "[inefficient]' (100-column framing)."),
    "B-019": ("merge", "K1-061", None),
    "B-020": ("merge", "K1-062", None),
    "B-021": ("merge", "K1-068", None),
    "B-022": ("merge", "K1-083", "Board definition: 'Graph Databases - stores data in nodes and edges'."),
    "B-023": ("merge", "K1-085", None),
    "B-024": ("merge", "K1-096", None),
    "B-025": ("merge", "K1-104", "Board list of graph database examples: Neo4j, Neptune, DGraph, TigerGraph."),
    "B-026": ("merge", "K1-110", "Board 'Why non-relational DBs scale' adds two reasons not spoken here: 'Data can be "
              "denormalized' and 'Data is modelled to be sharded' (board-only wording)."),
    "B-027": ("merge", "K1-024", "Board (00:39:45): 'We can also achieve on SQL databases. So, saying SQL does not "
              "scale is not entirely correct'."),
    "B-028": ("merge", "K1-121", "Board 'when to use SQL?': ACID; relations, constraints; fixed schema ('fixed "
              "schema' is board-only)."),
    "B-029": ("new", ["K1-110", "K1-127"]),
    "B-030": ("merge", "K2-004", None),
    "B-031": ("merge", "K2-005", "Board writes 'creator tools'."),
    "B-032": ("merge", "K2-006", "Board brainstorm: channels, messages, checkpoints, realtime communication, with "
              "'(membership)' added."),
    "B-033": ("merge", "K2-030", "Board data model (D-02, built live 01:04-01:17): users(id, name); channels(id, org, "
              "name, type); Membership(user_id, channel_id, checkpoint); Messages(from, channel_id, created_at, msg)."),
    "B-034": ("merge", "K2-015", "Board: first schema 'sender_id channel_id receiver_id msg -> DM / ch', then erased "
              "and replaced step by step (from + to (ch/usr), from/to/type, then from + channel_id, 01:08-01:11)."),
    "B-035": ("merge", "K2-013", "Board: the join table is first written 'user.channel' (~01:05) and renamed "
              "'Membership' by 01:06."),
    "B-036": ("merge", "K2-024", None),
    "B-037": ("merge", "K2-028", "Board: 'type : grp/user/ch', later 'reg' written over 'ch'."),
    "B-038": ("merge", "K2-031", None),
    "B-039": ("merge", "K2-046", "Board labels the three DB cylinders 'MySQL / Cassanda / Mongo' (01:19:30-01:22:15)."),
    "B-040": ("merge", "K2-053", "Board D-03: users A, B -> API server stack, with separate arcs from A to the WS stack."),
    "B-041": ("merge", "K2-054", "Board jottings during these student answers: 'Socket ??', then 'Defintly' and "
              "'Freq Commⁿ' (01:22:30-01:29:45)."),
    "B-042": ("merge", "K2-063", "Board D-04 '3 ways to persist the message', markers 1-3: (1) synchronously through "
              "the API servers, then deliver; (2) WebSocket to the edge server, asynchronous persistence through Kafka "
              "and workers; (3) WebSocket delivery with no persistence; colours white/green/blue."),
    "B-043": ("merge", "K2-079", "Board caption (recap, 02:20:45): 'Depending on criticality of \"persistence\" we "
              "pick one over other'."),
    "B-044": ("merge", "K2-103", "Board: 'Channel 1 - A - B - C - D - E', WS1 drawn with four connection dots, WS2."),
    "B-045": ("merge", "K2-107", "Board (01:55:15): 'WS1 -> A->C1 B->C1 C->C1 D->C1 / WS2 E->C1' - the board has E "
              "in C1."),
    "B-046": ("merge", "K2-117", None),
    "B-047": ("merge", "K2-124", "Board D-05: final mesh of WS servers joined pairwise by 'TCP' links."),
    "B-048": ("merge", "K3-001", "Board: 'Redis Realtime PubSub' replaces the mesh."),
    "B-049": ("merge", "K3-015", "Board: 'WS1 -> SUB(C1)  WS2 -> SUB(C1)  G -> C2  H -> C2'."),
    "B-050": ("merge", "K3-021", "Board (02:15:30): purple box with arrows next to user A, labelled 'Balance Connectn'."),
    "B-051": ("merge", "K3-034", "Board recap: 'Insight 1 : DMs are channel with 2 people. Thus we only need to model "
              "channels very well' (board-only wording)."),
    "B-052": ("new", ["K3-034"]),
    "B-053": ("merge", "K3-034", "Board recap schema: workspace(id, name); channels(id, workspace_id, name, type), "
              "', type' added live at 02:19:45; messages(id, channel_id, message, user_id, ts); membership(channel_id, "
              "user_id, checkpoint)."),
    "B-054": ("merge", "K3-035", "Board: 'Because there will be large number of messages, we store it in a sharded DB "
              "- pick any DB that you can shard .... even SQL works !'."),
    "B-055": ("new", ["K3-035"]),
    "B-056": ("new", ["B-055"]),
    "B-057": ("new", ["K2-068", "B-055"]),
    "B-058": ("new", ["B-057", "K2-024"]),
    "B-059": ("merge", "K2-059", "Board recap (02:20:57): 'REST based short polling is a very poor UX for something "
              "as realtime as messaging .... so, we need a better solution'."),
    "B-060": ("merge", "K3-038", "Board recap: 'Every user will have 1 websocket connection open with our backend "
              "infrastructure and that will be used for anything and everything realtime'; the WS line is labelled "
              "'persistent TCP'."),
    "B-061": ("merge", "K3-046", "Board: 'Because WebSockets are expensive and browsers have a 6 concurrent TCP "
              "connection limit, we have to multiplex all realtime communication on ONE WEBSOCKET connection' (board "
              "says a flat 6; the audio says six for Chrome, eight for Firefox)."),
    "B-062": ("merge", "K3-042", "Board: 'Hence, we need a fleet of servers ( Edge Servers ) to whom our end users "
              "connect over WS'; D-08 shows users with WS lines to a 'WS Edge Servers' stack."),
    "B-063": ("new", ["K3-042", "K3-046"]),
    "B-064": ("merge", "K3-053", "Board D-09: Edge Server -> Kafka -> Messaging Service workers -> Messages DB "
              "(partitioned); a separate 'Messaging Svc' reads from the DB for user B."),
    "B-065": ("new", ["K3-053"]),
    "B-066": ("merge", "K3-054", "Board: 'Non-realtime usecases - channel scroll - DM scroll - unimportant messages "
              "that are loaded when channel is clicked, eg: Muted channels' and '* anything related to messaging that "
              "is NOT \"pushed\"'."),
    "B-067": ("merge", "K3-052", "Board: 'Idea : Every Slack channel has one PubSub channel. Each edge server "
              "subscribes to the PubSub channel corresponding to the slack channels that users connected to it are "
              "part of', with the note '* can be optimized'."),
    "B-068": ("merge", "K3-051", "Board example (D-10): A in c1, c2, c3; B in c2, c4, c5; C in c1, c3; D in c4, all "
              "on one edge server, which sends SUB(c1,c2,c3,c4,c5) to the Realtime PubSub [Redis]."),
    "B-069": ("new", ["K3-059"]),
    "B-070": ("new", ["B-069"]),
    "B-071": ("merge", "K3-050", "Board D-11: users -> WS -> Edge Servers (membership) <-> Redis PubSub [clustered] "
              "<-> other Edge Servers; Edge Servers -> Kafka -> Messaging Service workers -> Messages DB "
              "(partitioned); users -> load Balancer -> API Servers -> DB; a 'Balancer' box added live "
              "(02:28:00-02:28:30) with an arrow to user A."),
    "B-072": ("merge", "K3-054", "Board D-11 label: 'API Servers - non-realtime API - channel scroll - mutd channels' "
              "(= muted)."),
    "B-073": ("merge", "K2-110", "Board recap (02:30:00): 'each server can handle 4 users, what if we get the 5th "
              "user - The 5th user forms a websocket with another server'; A to B via the 'local connection pool'; A to "
              "E 'Possible only when message reaches Edge Server 2'."),
    "B-074": ("merge", "K3-001", "Board recap: 'But if we have 100 Edge Server will every server to every another "
              "server ? Not a great Idea ! Can we do better ?' followed by 'Realtime PubSub'."),
    "B-075": ("merge", "K2-104", "Board recap (02:30:12): 'Every edge server knows which user is connected to it and "
              "how to communicate with it [ Socket IO library manages this ]'; the edge server box contains a 'local "
              "Connection Pool' next to a 'Socket IO Server'."),
    "B-076": ("merge", "K3-053", "Board recap (02:30:12): 'when the message is sent from A to B the edge server will "
              "1. Persist message In Kafka 2. Find B in the local pool 3. Send message to B'."),
}
BOARD_NEW_REASON = {
    "B-014": "KV example list incl. 'Aerospike' not in audio (transcript search: no 'Aerospike'); Redis/DynamoDB as KV stores are also said at 00:51 (K1-142)",
    "B-029": "'when to use NoSQL?' criteria (no relations, denormalized, shardable) are board-only; audio's NoSQL rule is about high ingestion (K1-123/K1-127)",
    "B-052": "'workspace -> multiple channels -> multiple messages' is board-only (no 'workspace' in transcript)",
    "B-055": "sharding by channel_id into mutually exclusive shards is board-only (recap audio only says 'sharded')",
    "B-056": "'scrolling is simple, no cross shard query' is board-only",
    "B-057": "recap 'A very basic flow' (send_message REST call, API server finds shard by channel_id) is board-only; audio Slack flow is K2-068",
    "B-058": "'we solve sending messages for both DM & channel' is board-only",
    "B-063": "'any service (chat, notification, etc.) talks to users in realtime through the edge servers' is board-only",
    "B-065": "'Insight: messages once sent will always be persisted, no DB-level runtime exception like Unique Key failed' is board-only (no 'unique key' in transcript)",
    "B-069": "'cannot drop the message, use the channel scroll API (REST) when channel is clicked' is board-only; audio's fix is the periodic refresh (K3-060)",
    "B-070": "correction job + 'buffer in another kafka and replay' are board-only; flag_resolutions.md cites audio 'correction job' at 02:25:24 but the transcript has no 'correction'/'replay'/'buffer'",
}

# =============================================================================================================
# 5. Topic normalisation (prefix rules, first match wins)
# =============================================================================================================
TOPIC_RULES = [
    ("slack > storage > sharded-db", "slack-rtc > database-choice"),
    ("slack > schema > channel-type", "slack-rtc > schema > dm-as-channel"),
    ("slack > delivery-models", "slack-rtc > delivery-models"),
    ("scaling > websocket-servers > membership-state", "websockets > edge-servers > membership"),
    ("scaling > websocket-servers", "websockets > scaling"),
    ("communication > websocket-server", "websockets > edge-servers"),
    ("messaging > persistence-types", "messaging > persistence-guarantees"),
    ("communication", "messaging"),
    ("design principles", "design-principles"),
    ("learning approach > critical thinking", "learning-approach > critical-thinking"),
    ("learning approach", "learning-approach"),
    ("tradeoffs", "design-principles > tradeoffs"),
    ("databases > graph", "databases > non-relational > graph > vs-relational"),
    ("databases > cassandra", "databases > non-relational > cassandra"),
    ("admin > references", "admin > resources"),
    ("admin > course-scope", "admin > scope"),
    # board-only items (board reader's own paths)
    ("databases > nosql > key-value", "databases > non-relational > key-value"),
    ("databases > sql vs nosql", "databases > sql-vs-nosql"),
    ("slack > architecture > async persistence", "messaging > architecture"),
    ("slack > basic flow", "messaging > architecture"),
    ("slack > data model", "slack-rtc > schema > entities"),
    ("slack > edge servers", "websockets > edge-servers"),
    ("slack > reliability", "messaging > missed-messages"),
    ("slack > storage > sharding", "slack-rtc > database-choice"),
    ("slack", "slack-rtc"),
]

# =============================================================================================================
# mechanics
# =============================================================================================================
TS = re.compile(r"~?(\d{1,2}):(\d{2}):(\d{2})")
CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}


def secs(s):
    h, m, x = TS.match(s.strip()).groups()
    return int(h) * 3600 + int(m) * 60 + int(x)


def first_time(it):
    a = it["source"]["audio"]
    if a:
        return min(secs(r.split("-")[0]) for r in a)
    return min(secs(b) for b in it["source"]["board"])


def add_unique(lst, vals):
    for v in vals:
        if v not in lst:
            lst.append(v)


def sort_audio(lst):
    return sorted(set(lst), key=lambda r: secs(r.split("-")[0]))


log = {"fix": [], "merge": [], "xlink": [], "board": [], "flag": [], "topic": [], "reject": []}
items = {}
for i, it in orig.items():
    it = copy.deepcopy(it)
    if it.get("detail") == "":
        it["detail"] = None  # board items use "" for no detail; schema wants null
    it["orig_ids"] = [i]
    it["merged_from"] = []
    items[i] = it
owner = {i: i for i in orig}  # original id -> id of the working item that holds it

# 1. fixes
for oid, ch, note in FIXES:
    it = items[oid]
    for k in ("statement", "detail", "status", "confidence"):
        if k in ch:
            it[k] = ch[k]
    if "detail_append" in ch:
        it["detail"] = (it["detail"] + " " if it.get("detail") else "") + ch["detail_append"]
    if "add_flags" in ch:
        add_unique(it["flags"], ch["add_flags"])
    if "add_audio" in ch:
        it["source"]["audio"] = sort_audio(it["source"]["audio"] + ch["add_audio"])
    it.setdefault("edits", []).append("distortion fix: " + note)
    log["fix"].append((oid, note))

# 2. flag resolutions
for fid, kind, oid, t, ev, marker in FLAGRES:
    it = items[oid]
    hit = [f for f in it["flags"] if marker and marker in f]
    if kind == "resolved":
        before = it["confidence"]
        for f in hit:
            it["flags"].remove(f)
            it.setdefault("resolved_flags", []).append(f)
        add_unique(it.setdefault("resolved_by", []), ["board %s (%s: %s)" % (t, fid, ev)])
        if not it["flags"]:
            it["confidence"] = "high"
        if hit:
            rest = len(it["flags"])
            note = "flag removed; confidence %s -> %s%s" % (before, it["confidence"],
                                                          " (other open flags remain: %d)" % rest if rest else "")
        else:
            note = "flag n/a (the item carries no separate flag for this marker); confidence %s -> %s" % (
                before, it["confidence"])
        log["flag"].append((oid, "%s resolved_by board %s (%s)" % (fid, t, ev), note))
    else:
        for f in hit:
            if "[supported_by board %s]" % t in f:
                continue  # a sibling row (same marker, same frame) already annotated it
            idx = it["flags"].index(f)
            it["flags"][idx] = f + " [supported_by board %s]" % t
        add_unique(it.setdefault("supported_by", []), ["board %s (%s: %s)" % (t, fid, ev)])
        note = ("flag kept and annotated; confidence unchanged (%s)" % it["confidence"]) if hit else \
            "no flag on the item rests on this marker (supporting evidence only); confidence unchanged (%s)" % it["confidence"]
        log["flag"].append((oid, "%s supported_by board %s (%s)" % (fid, t, ev), note))


def absorb(kept, ab, detail_add):
    """Merge working item `ab` into working item `kept`."""
    k, a = items[kept], items[ab]
    if detail_add:
        k["detail"] = (k["detail"] + " " if k.get("detail") else "") + detail_add
    k["source"]["audio"] = sort_audio(k["source"]["audio"] + a["source"]["audio"])
    k["source"]["board"] = sorted(set(k["source"]["board"] + a["source"]["board"]), key=secs)
    add_unique(k["flags"], a["flags"])
    add_unique(k["depends_on"], a["depends_on"])
    if CONF[a["confidence"]] < CONF[k["confidence"]]:
        k["confidence"] = a["confidence"]
    if IMP[a["importance"]] > IMP[k["importance"]]:
        k["importance"] = a["importance"]
    add_unique(k["orig_ids"], a["orig_ids"])
    add_unique(k["merged_from"], a["orig_ids"])
    for key in ("supported_by", "resolved_by", "resolved_flags", "edits", "board_text", "board_notes",
                "merged_verbatims"):
        if a.get(key):
            k.setdefault(key, [])
            for v in a[key]:
                if v not in k[key]:
                    k[key].append(v)
    for o in a["orig_ids"]:
        owner[o] = kept
    del items[ab]


# 3. duplicate merges
for ab, kept, add, why in MERGES:
    a = items[ab]
    items[kept].setdefault("merged_verbatims", []).append({"id": ab, "verbatim": a["verbatim"]})
    absorb(kept, ab, add)
    log["merge"].append((ab, kept, why))

# cross-links
for frm, to in CROSSLINKS:
    f_it = items[owner[frm]]
    if owner[to] != owner[frm]:
        added = to not in f_it["depends_on"]
        add_unique(f_it["depends_on"], [to])
        log["xlink"].append((frm, to, "added" if added else "already linked"))

# 4. board decisions
for bid in sorted(BOARD_DEC):
    dec = BOARD_DEC[bid]
    b = items[bid]
    btxt = b["verbatim"]
    if dec[0] == "merge":
        tgt = owner[dec[1]]
        k = items[tgt]
        k.setdefault("board_text", []).append(btxt)
        k.setdefault("board_notes", []).append({"id": bid, "time": b["source"]["board"], "statement": b["statement"],
                                                "detail": b["detail"] or None})
        if dec[2]:
            k["detail"] = (k["detail"] + " " if k.get("detail") else "") + dec[2]
        k["source"]["board"] = sorted(set(k["source"]["board"] + b["source"]["board"]), key=secs)
        add_unique(k["orig_ids"], [bid])
        add_unique(k["merged_from"], [bid])
        owner[bid] = tgt
        del items[bid]
        log["board"].append((bid, "merged into %s (duplicates audio)%s" % (
            dec[1], "; board nuance added to detail" if dec[2] else ""), btxt))
    else:
        add_unique(b["depends_on"], dec[1])
        b["board_text"] = [btxt]
        log["board"].append((bid, "kept as board-only item: " + BOARD_NEW_REASON[bid], btxt))

# 5. topic normalisation
for wid, it in items.items():
    t = it["topic"]
    for old, new in TOPIC_RULES:
        if t == old or t.startswith(old + " > "):
            it["topic"] = new + t[len(old):]
            log["topic"].append((wid, t, it["topic"]))
            break

# origin
for it in items.values():
    s = it["source"]
    it["origin"] = "both" if s["audio"] and s["board"] else ("audio" if s["audio"] else "board")

# 6. final ids in teaching order (first audio time, board time for board-only; ties keep original order)
order = sorted(items.values(), key=lambda it: (first_time(it), seq[it["id"]]))
lid = {}
for n, it in enumerate(order, 1):
    lid[it["id"]] = "L-%04d" % n
id_map = {o: lid[owner[o]] for o in orig}

FIELD_ORDER = ["id", "orig_ids", "origin", "type", "statement", "detail", "topic", "case_study", "source", "speaker",
               "status", "verbatim", "depends_on", "confidence", "flags", "importance", "merged_from",
               "merged_verbatims", "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags",
               "edits"]
out = []
for it in order:
    wid = it["id"]
    me = lid[wid]
    deps = []
    for d in it["depends_on"]:
        L = id_map.get(d)
        if L is None:
            raise SystemExit("unknown depends_on %s in %s" % (d, wid))
        if L != me and L not in deps:
            deps.append(L)
    it["depends_on"] = sorted(deps)
    it["id"] = me
    it["orig_ids"] = sorted(it["orig_ids"], key=lambda o: seq[o])
    it["merged_from"] = sorted(it["merged_from"], key=lambda o: seq[o])
    out.append({k: it[k] for k in FIELD_ORDER if k in it})

with open(os.path.join(D, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for o in out:
        f.write(json.dumps(o, ensure_ascii=False) + "\n")
with open(os.path.join(D, "id_map.json"), "w", encoding="utf-8") as f:
    json.dump({k: id_map[k] for k in sorted(id_map)}, f, indent=1, ensure_ascii=False)
    f.write("\n")

# ledger_changes.md
L = lambda o: id_map[o]  # noqa: E731
md = ["# Lecture 02 ledger - changes log", "",
      "Inputs: part1-3.jsonl (K1-001..K1-146, K2-001..K2-136, K3-001..K3-156), gaps.jsonl (G-001..G-004), "
      "gap_report.md, ../board/board_items.jsonl (B-001..B-076), ../board/flag_resolutions.md, transcript.md. "
      "Output: ledger.jsonl (final IDs L-0001.. in teaching order = first audio timestamp, board time for board-only "
      "items). Old->new IDs in id_map.json. Built by build_ledger.py, whose tables hold every editorial decision "
      "listed here.", "",
      "## Distortion fixes (%d lines; 19 hunter distortions, each re-checked against transcript.md, plus the K1-093 "
      "detail the K1-094 entry asked for)" % len(log["fix"]), ""]
md += ["- %s: %s [final %s]" % (o, n, L(o)) for o, n in log["fix"]]
md += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(log["merge"]), ""]
md += ["- %s -> %s: %s [final %s]" % (a, k, w, L(k)) for a, k, w in log["merge"]]
md += ["", "### Cross-links instead of merges (%d depends_on links; partial overlaps the hunters listed, kept as "
       "separate items because each adds its own context)" % len(log["xlink"]), ""]
md += ["- %s -> depends_on %s (%s) [final %s -> %s]" % (f, t, s, L(f), L(t)) for f, t, s in log["xlink"]]
nm = sum(1 for b in log["board"] if b[1].startswith("merged"))
md += ["", "## Board decisions (%d B-items: %d merged, %d board-only) - one line per B id" % (
    len(log["board"]), nm, len(log["board"]) - nm), ""]
md += ["- %s -> %s: \"%s\" [final %s]" % (b, d, (t[:80] + ("..." if len(t) > 80 else "")), L(b))
       for b, d, t in log["board"]]
md += ["", "## Flag resolutions from the board (%d lines; flag_resolutions.md rows touching items, plus the "
       "editor's B-045 reading)" % len(log["flag"]), ""]
md += ["- %s: %s; %s [final %s]" % (o, w, n, L(o)) for o, w, n in log["flag"]]
md += ["", "## Topic normalisation (%d items; one tree: slack-rtc, messaging, websockets, design-principles, "
       "learning-approach, admin)" % len(log["topic"]), ""]
md += ["- %s: topic '%s' -> '%s' [final %s]" % (w, a, b, L(w)) for w, a, b in log["topic"]]
md += ["", "## Rejected hunter suggestions (with reason)", ""]
md += ["- %s" % r for r in REJECTED]
md += ["", "## Validation", "", "VALIDATION_LINE", ""]
open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8").write("\n".join(md))
print("final items:", len(out), "| merges:", len(log["merge"]), "| board merged/new: %d/%d" % (nm, len(log["board"]) - nm))
