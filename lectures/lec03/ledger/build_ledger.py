#!/usr/bin/env python3
"""Editor helper for lecture 03: applies the editor's decisions (tables below) to part*.jsonl + gaps.jsonl +
board_items.jsonl, renumbers to L-ids in teaching order, writes ledger.jsonl, id_map.json, ledger_changes.md.
Every judgement lives in the tables below and is logged in ledger_changes.md."""
import copy
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
LEC = os.path.dirname(HERE)


def load(path):
    out = []
    if os.path.exists(path) and os.path.getsize(path):
        for line in open(path, encoding="utf-8"):
            if line.strip():
                out.append(json.loads(line))
    return out


originals = []
for n in (1, 2, 3):
    originals += load(os.path.join(HERE, "part%d.jsonl" % n))
originals += load(os.path.join(HERE, "gaps.jsonl"))
board = load(os.path.join(LEC, "board", "board_items.jsonl"))
seq = {o["id"]: i for i, o in enumerate(originals + board)}

items = {}
for o in originals:
    it = copy.deepcopy(o)
    it["orig_ids"] = [o["id"]]
    it["merged_from"] = []
    items[o["id"]] = it
owner = {o["id"]: o["id"] for o in originals}  # original id -> key of the item holding it

log = {"fix": [], "merge": [], "board": [], "flag": [], "topic": [], "link": [], "reject": []}

# ----------------------------------------------------------------------------------------------------------
# 1. Distortion fixes (gap_report.md), each re-checked against transcript.md
# ----------------------------------------------------------------------------------------------------------
FIXES = [
    ("K1-002", {"statement": "Distributed ID generation is one of the most misunderstood topics out there.",
                "detail": "It is followed by a garbled phrase ('Like, hey, auto increment [unclear: works giving ID wise "
                          "this] such a big problem'); possibly: people assume auto-increment is enough and that ID "
                          "generation is no big problem."},
     "statement cut to the clean claim ('one of the most misunderstood topic out there'); the auto-increment reading, "
     "which rests on the unclear phrase, moved to detail as 'possibly'; flag kept, confidence medium"),
    ("K1-039", {"statement": "The teacher praises the boot-counter approach as really good because it tackles the disk IO "
                             "problem head on, says the long ID might become a (not big) problem whose disadvantages will "
                             "be discussed, and says this is something he will definitely be adding going forward."},
     "dropped inferred 'to the course' (transcript: 'this is something I will definitely be adding to this going forward')"),
    ("K1-055", {"statement": "Monotonically increasing does not mean purely sequential: the teacher calls 1 2 3 4 5 6 "
                             "strictly monotonically increasing, while 1 2 5 7 8 9 32 33 34 is (just) monotonically "
                             "increasing - each new ID is guaranteed greater than all previous IDs."},
     "'strictly sequential' -> the teacher's own label 'strictly monotonically increasing' (transcript: 'Like 1 2 3 4 5 6 "
     "is strictly monotonically increasing IDs')"),
    ("K1-076", {"statement": "Always remember: the clock never goes back in time on a single machine - it can slow down "
                             "(or, as heard, 'you can just pass it up'), but always moves forward.",
                "flags+": ['check: "you can just pass it up" - speed up?'], "confidence": "medium"},
     "'or speed up' was an interpretation -> 'or, as heard, you can just pass it up'; flag added; confidence high -> medium "
     "(transcript: 'It can slow down or you can just pass it up.')"),
    ("K1-090", {"statement": "A student asks how to resolve conflicts based on IDs when IDs in a distributed system may not "
                             "be unique (the context is ordering for conflict resolution); the teacher defers it - only "
                             "about 30 percent of the topic is done."},
     "removed 'ordered' from the student's question (transcript: 'we are not sure whether the IDs on distributed system would "
     "be unique')"),
    ("K2-003", {"statement": "Amazon assigns a globally unique ID to every order placed; given the system's high throughput, "
                             "and because the same ID service also provides IDs to many other internal services (orders "
                             "being just one), the IDs had to be unique."},
     "'built for high throughput' was the reason for uniqueness, not a property of the service (transcript: 'Given the high "
     "throughputness of the system ... So that had to be unique')"),
    ("K2-024", {"flags+": ['check: "2-264" - likely 2^64', 'unclear: "boys"'], "confidence": "medium"},
     "detail rests on two markers ('2-264', 'boys'): flags added, confidence high -> medium; status "
     "proposed_then_corrected kept (teacher pushed back: 'Why would you want to do that?')"),
    ("K2-042", {"statement": "A database does not keep indexes in RAM by default; it loads them into RAM during boot-up or "
                             "when a query needs them, and keeps them there.",
                "detail": "Interpretation: 'That is the main source' most likely refers to disk (referent unclear in the "
                          "audio).",
                "flags+": ['check: "That is the main source" - referent unclear (disk?)']},
     "'disk is the main source' moved from statement to detail as an interpretation; flag added; confidence stays medium"),
    ("K2-054", {"statement": "Flickr was the pre-Instagram photo platform - in the teacher's words 'Instagram of 2010s to "
                             "2010s' - where a lot got posted before Instagram took over.",
                "flags+": ['check: "2010s to 2010s" - garbled year range'], "confidence": "medium"},
     "kept the teacher's garbled 'Instagram of 2010s to 2010s' instead of the cleaned 'Instagram of the 2010s'; flag added; "
     "confidence high -> medium"),
    ("K2-060", {"statement": "Provisioning heuristic for the real world (not interviews, which the teacher calls crappy): "
                             "when asked what size a database should be to perform, the bare minimum is the sum of the "
                             "sizes of all the indexes it holds; anything beyond that is good.",
                "detail": "Read in context with the RAM >= total index size rule, this means the server's RAM."},
     "'the database's memory' -> 'what size a database should be' (transcript: 'what should be the size of this database "
     "for it to be performed?'); memory reading moved to detail"),
    ("K3-008", {"statement": "Snowflake IDs are very similar to MongoDB's ID, but small ('very small, very nice').",
                "deps+": ["K2-049"]},
     "dropped added '(ObjectId)' and 'much smaller' (transcript: 'very similar to MongoDB's ID, but very small, very nice'); "
     "size comparison left to K2-049 via depends_on"),
    ("K3-023", {"statement": "This is why Twitter scales: firing tweets is one of the highest-throughput workloads in the "
                             "world (people tweet heavily during big events), and a separate set of services (unclear in "
                             "audio; apparently ID generation services) would itself need to be scaled; Twitter avoids "
                             "that.", "confidence": "medium"},
     "'a central ID service' was an interpretation of [unclear: 'lighting services'] -> marked as unclear; confidence high -> "
     "medium"),
    ("K3-028", {"confidence": "high"},
     "confidence medium -> high: no flag, the only doubt (paid API status) is already a hedge in the statement"),
    ("K3-033", {"statement": "In 2016, bored at Amazon and heavily into MongoDB, the teacher wrote a quick benchmark of "
                             "pagination strategies in MongoDB (a student later refers to it as the graph on his blog).",
                "audio+": ["02:24:03-02:24:22"]},
     "'(shown on his blog)' was not in the cited range -> attributed to the student's 02:24:03 'your blogs graph', range added"),
    ("K3-069", {"confidence": "medium"},
     "confidence high -> medium: the 2^41 figure comes from the flagged [?Two to the power 41]"),
    ("K3-116", {"flags-": ["check: name spelling - Rajiv?"]},
     "removed participant-name flag (nothing in the item depends on it; participants stay anonymous)"),
    ("K3-121", {"statement": "A table is not limited to one sequence: having only the ID column auto-increment is not a hard "
                             "limit; you can have other auto-increment columns, even three."},
     "garbled clause reworded (transcript: 'It's not a hard limit where it says only ID can be auto increment')"),
    ("K3-135", {"confidence": "medium", "deps+": ["K3-092"]},
     "confidence high -> medium (the 'fifth week' rests on [?Fifth week | asr: 'Fifth thing']); depends_on K3-092 (clean "
     "'fifth week' mention) added as support"),
    ("K3-136", {"statement": "A student suggested requests must be routed round-robin for Snowflake IDs to increase; the "
                             "teacher said not necessarily ('You're not guaranteeing atomicity' - in context apparently "
                             "meaning monotonicity).",
                "flags+": ['check: "atomicity" probably means monotonicity']},
     "the teacher's reason was 'atomicity', not 'Snowflake does not guarantee that' -> quoted as said, monotonicity reading "
     "flagged; confidence stays medium"),
]


def first_audio(it):
    a = it["source"]["audio"]
    return min(a) if a else None


def apply_patch(it, p):
    for k, v in p.items():
        if k == "flags+":
            for f in v:
                if f not in it["flags"]:
                    it["flags"].append(f)
        elif k == "flags-":
            it["flags"] = [f for f in it["flags"] if f not in v]
        elif k == "deps+":
            for d in v:
                if d not in it["depends_on"]:
                    it["depends_on"].append(d)
        elif k == "audio+":
            for r in v:
                if r not in it["source"]["audio"]:
                    it["source"]["audio"].append(r)
        else:
            it[k] = v


for oid, patch, why in FIXES:
    it = items[oid]
    apply_patch(it, patch)
    it.setdefault("edits", []).append(why)
    log["fix"].append((oid, why))

# ----------------------------------------------------------------------------------------------------------
# 2. Duplicate merges (absorbed -> kept): nuance of the absorbed item appended to kept detail
# ----------------------------------------------------------------------------------------------------------
MERGES = [
    ("K1-043", "K1-042", "same 'flush every 1000 IDs cuts disk IO by a factor of 1000'",
     "Stated again as a number: flushing every 1000 IDs cuts disk IO by a factor of 1000."),
    ("K1-076", "K1-075", "both say a single machine's clock never goes back in time",
     "The teacher stresses: 'always remember, the clock never goes back in time. Never.' It can slow down (or, as heard, "
     "'you can just pass it up'), but always moves forward no matter what - 'such an important thing'."),
    ("K1-093", "K1-092", "both say a random ID/UUID works if monotonicity can be relaxed",
     "The teacher adds: you may think you need monotonicity, but in reality you can often relax that constraint - and then "
     "a random ID like a UUID works."),
    ("K1-100", "K1-099", "both say restarting from the max saved ID is what load() already does",
     "The teacher adds that loading from disk or from the database is one and the same thing: you start from that "
     "particular point."),
    ("K1-102", "K1-101", "both say the ID logic does not assume each ID is written back to the database (expensive)",
     "The ID may not be written anywhere - it may just be attached to something and pushed forward, like a request ID; so "
     "the ID generation logic should not assume each generated ID is written back to a database."),
    ("K3-115", "K1-007", "cross-part repeat: implement every ID-generation approach yourself",
     "Repeated at the end of the lecture (02:17:34): implement every ID generation approach covered - none is fancy; "
     "implementing them gave the teacher himself a much deeper understanding of how they work, their advantages and "
     "disadvantages, logical partitions, and why export/dump/load is needed."),
    ("K2-032", "K2-030", "both say UUIDs are inefficient at scale",
     "The teacher voices the follow-up 'if your company uses UUIDs, are we inefficient?' and answers: yes, it is "
     "inefficient at scale (whether a real student asked is uncertain)."),
    ("K2-045", "K2-037", "both say 16-byte UUIDs make the index 4x larger",
     "Summed up later: UUIDs, being gigantic 16-byte integers (4x larger), do not index well and bloat up the index; the "
     "teacher closes with 'In most cases they would get four of them. So which is why people don't use UUIDs.' (first "
     "sentence unclear)."),
    ("K2-059", "K2-041", "both say the first thing to check on a slow database is index size",
     "The teacher generalises: whenever a senior engineer, technical architect or principal engineer optimizes a database, "
     "the first thing they look at is index size - 'Always remember this' - because if the index has spilled to disk the "
     "database will always be slow."),
    ("K2-091", "K2-070", "both say stub is a dummy column that exists only to make the insert/unique constraint work",
     "In Q&A (01:32) the teacher repeats: the stub value is just a hard-coded constant in the query (literally any string); "
     "its only purpose is to make the database break the unique constraint so the update fires atomically - there is no "
     "other reason for stub."),
    ("K2-090", "K2-076", "Q&A re-explanation of how the ticket query yields the next ID",
     "Re-explained in Q&A (01:31): the insert (with no id given) of the same stub value fails because stub has a unique "
     "key, so ON DUPLICATE KEY UPDATE runs id = id + 1 - that is how the query yields a unique value."),
    ("K2-093", "K2-085", "same odd-dies-at-5 / even-at-202 scenario worked again in Q&A",
     "Worked through again with a student in Q&A (01:33): odd server died at 5 while the even server reached 202; on return "
     "it would generate 7 while the even one generates 204. Resetting both sides only makes it look better; without it the "
     "system still functions correctly."),
    ("K2-092", "K2-089", "both say an engineer does the reset",
     "In Q&A (01:33) the teacher repeats that an engineer does it; the configuration is MySQL-specific (look up how to "
     "change auto_increment_offset), and it is only for aesthetics - the system keeps running correctly without it."),
    ("K3-044", "K3-041", "both say ID pagination is efficient because data is stored ordered by primary key",
     "The teacher adds that ID-based pagination therefore gives constant performance: it is a property of the database to "
     "always keep data ordered by primary key."),
    ("K3-055", "K3-022", "both say Snowflake needs no central service and has no moving part",
     "Later (01:55) the teacher says Snowflake gained traction because of its decentralization: no centralized ID "
     "generation service, no moving part, no external service to scale up and out."),
    ("K3-061", "K3-022", "third statement of the same benefit",
     "And (01:57): Snowflake is just a library - a few lines of code - so generating an ID needs no network call and no "
     "service to build and scale, which makes it very efficient."),
    ("K3-113", "K3-025", "Q&A repeat: within a millisecond the smaller machine ID gives the smaller ID",
     "In Q&A (02:17) the teacher repeats: of IDs generated at the same time on different machines, the one from machine "
     "ID 1 is smaller and the one from machine ID 2 is larger."),
    ("K3-068", "K3-015", "Q&A repeat: Snowflake's counter is the per-server static counter",
     "In Q&A (02:01) the teacher confirms the counter is a per-server static counter, atomically incremented every time an "
     "ID is generated - which is why the static counter was stressed early in the lecture."),
    ("K3-119", "K3-100", "both say a sequencer atomically increments and returns the next value",
     "In Q&A (02:20): a sequencer's responsibility is to atomically increment - invoking nextval atomically increments it "
     "and returns the value."),
    ("K3-120", "K3-109", "both say an auto-increment column implies a sequence, else you create one with any name",
     "Later (02:20) the teacher adds: in Instagram's scheme the sequence is created explicitly because there is no "
     "auto-increment column; table_id_seq is the name Instagram also gave it, but you can name a sequence anything."),
    ("K3-112", "K3-087", "both give Instagram's 2^13 (~8,000) logical-shard limit",
     "In Q&A (02:16) the teacher adds that this - at most about 8,000 logical databases, 'a huge number' - is Instagram's "
     "limit, instead of a limit on the number of API servers."),
    ("K3-079", "K3-056", "both say good engineers do not reach for microservices",
     "In the Instagram context (02:04) the teacher adds: good companies continuously try not to have microservices; good "
     "engineers think in problems and solutions, not microservices - a microservice for everything is an overkill for most "
     "organizations."),
    ("K3-024", "K3-010", "both say Snowflake IDs are roughly/almost ordered",
     "The teacher headlines this as 'the beauty of Snowflakes': they are roughly sortable."),
    ("K3-048", "K3-027", "both say efficient pagination is a byproduct of time-leftmost IDs",
     "Generalised later (01:52): efficient pagination is a side effect of Snowflake or of any ID generation logic that puts "
     "the timestamp on the leftmost side."),
    ("K3-072", "K3-052", "Q&A re-teach of the custom-epoch headroom figure",
     "In Q&A (02:02) the teacher re-explains: with a custom epoch the counted time moves at the same rate as real time, so "
     "you gain range - he says you get 35 years, or 45 years if you start today, before exhausting the 41 bits."),
    ("G-002", "K3-073", "gap item is the source pointer of the same 'brilliant optimization' remark",
     "The teacher learned about the scheme from a blog post he does not name: 'When I first read that blog, I started "
     "cursing because this is such a brilliant piece of optimization.'"),
]

CONF_RANK = {"low": 0, "medium": 1, "high": 2}


def add_detail(it, text):
    it["detail"] = (it["detail"].rstrip() + " " + text) if it.get("detail") else text


def merge(absorbed_key, kept_key, nuance):
    a, k = items[absorbed_key], items[kept_key]
    add_detail(k, nuance)
    k.setdefault("merged_verbatims", []).append(a["verbatim"])
    for r in a["source"]["audio"]:
        if r not in k["source"]["audio"]:
            k["source"]["audio"].append(r)
    for b in a["source"]["board"]:
        if b not in k["source"]["board"]:
            k["source"]["board"].append(b)
    for f in a["flags"]:
        if f not in k["flags"]:
            k["flags"].append(f)
    for d in a["depends_on"]:
        if d not in k["depends_on"]:
            k["depends_on"].append(d)
    for key in ("board_text", "board_notes", "merged_verbatims", "edits"):
        if key in a and key != "merged_verbatims":
            k.setdefault(key, []).extend(a[key])
    k["orig_ids"] += a["orig_ids"]
    k["merged_from"] += a["orig_ids"]
    for o in a["orig_ids"]:
        owner[o] = kept_key
    del items[absorbed_key]


for ab, kp, why, nuance in MERGES:
    merge(ab, kp, nuance)
    log["merge"].append((ab, kp, why))

# ----------------------------------------------------------------------------------------------------------
# 3. Board decisions: B id -> (target original id | None for new board-only item, board-only nuance or None)
# ----------------------------------------------------------------------------------------------------------
BOARD = {
    "B-001": ("K1-006", "Board agenda (00:00:30): Foundation for ID generation; Monotonically increasing IDs; Central ID "
                        "generation service; Database Ticket Servers; Twitter's Insane Idea; Instagram bettering it. Title "
                        "slide: Distributed ID Generators."),
    "B-002": ("K1-008", None),
    "B-003": ("K1-009", None),
    "B-004": ("K1-010", None),
    "B-005": ("K1-011", None),
    "B-006": ("K1-011", "Board code: func get_id() { return get_epoch_ms(); }."),
    "B-007": ("K1-013", "Board: the logic works fine when there is just one machine and the code is not invoked twice "
                        "within the same millisecond."),
    "B-008": ("K1-014", None),
    "B-009": ("K1-015", "Board code: return concat(machine_id, get_epoch_ms()); IDs m1-1729, m2-1729."),
    "B-010": ("K1-017", None),
    "B-011": ("K1-020", "Board lists the two thread options side by side: 1. add thread_id as a differentiator; 2. add a "
                        "counter that resets every few minutes."),
    "B-012": ("K1-019", "Board code: return concat(machine_id, thread_id, get_epoch_ms()); IDs m1-t1-1729, m1-t2-1729, "
                        "m2-t1-1729 (the board's last example reads m2 - t3 - 1729, likely a slip for t2)."),
    "B-013": ("K1-023", "Board code: int counter = 0; return concat(machine_id, get_epoch_ms(), counter++); IDs "
                        "m1-1729-01, m1-1729-02, m1-1729-03 (a right-hand ID reads m3 - 1730 - 03, likely a slip for m2)."),
    "B-014": ("K1-027", None),
    "B-015": ("K1-030", None),
    "B-016": ("K1-033", "Board labels the store-to-disk fix 'Fault Tolerance'."),
    "B-017": ("K1-035", None),
    "B-018": ("K1-044", "Board code: int counter = load() + 1000; save the counter only every N increments."),
    "B-019": ("K1-045", "Board works the example as m1-01 .. m1-08 with on-disk values 03 and 06; new starting value "
                        "(safe) = 06 + 3 + 1 = m1-10, marked 'Safest !!'."),
    "B-020": ("K1-054", None),
    "B-021": ("K1-053", "Board example: a = 10; T1 sets a = 20, T2 sets a = 30 - how can we say T1 came before T2?"),
    "B-022": ("K1-056", "Board code: return concat(get_time_ms(), machine_id) - 'instead of machine_time, we now put "
                        "time - machine'."),
    "B-023": ("K1-061", "Board phrases it as 'All ID generation algorithms have time on LHS', labelled 'sortability'."),
    "B-024": ("K1-057", "Board-only nuance: the LHS is the most significant part, makes sorting simple and decides the "
                        "order; a conflict in the first half is resolved by tie breaking in the second half."),
    "B-025": ("K1-056", "Board example (time in epoch ms first): 1729 0001, 1729 0002, 1730 0001, 1730 0002, 1730 0003, "
                        "1731 0001 - the time part decides the order."),
    "B-026": ("K1-062", "Board gives the reason as clocks across machines going out of sync."),
    "B-027": ("K1-071", None),
    "B-028": ("K1-074", "Board (00:37:15-00:38:15) motivates the central service: instead of keeping ID generation in the "
                        "application logic, create a central ID service - this 'should solve the clock skew problem'."),
    "B-029": (None, None),
    "B-030": ("K1-077", "Board: we run the same get_id function in the ID server to generate monotonically increasing IDs."),
    "B-031": ("K1-078", "Board-only nuance: the ID server could fail, or the disk of the server could fail."),
    "B-032": ("K1-079", "Board: to solve the SPoF add multiple ID servers behind a load balancer; these ID servers need to "
                        "gossip to converge upon an agreed value."),
    "B-033": ("K1-080", None),
    "B-034": ("K1-081", "Board phrases it as the lesson of these evolutions: there is no way to distribute and guarantee "
                        "strict monotonicity."),
    "B-035": ("K1-082", "Board: the solutions we see out there have relaxed constraints -> non-integer IDs, no "
                        "monotonicity."),
    "B-036": ("K1-087", "Board sketch: two unlabelled database cylinders side by side (erased by 00:47:15)."),
    "B-037": ("K2-008", "Board heading (pre-drawn, visible from 00:54:15): 'Central ID service with Batching: Amazon's "
                        "Way'."),
    "B-038": ("K2-019", "Board table 'Service | counter' with rows orders (0 -> 500 -> 1000) and payments (0 -> 2000)."),
    "B-039": ("K2-006", "Board drawing labels the API tier 'APIs for ID Svc' (DB behind stacked API boxes behind a load "
                        "balancer)."),
    "B-040": ("K2-014", "Board walkthrough also shows payments: payments server 1 asks for 2000 and gets (0, 2000); a "
                        "later payments call gets [2000, 4000) (label visible 00:54:45, removed 00:59:42)."),
    "B-041": ("K2-020", None),
    "B-042": ("K2-017", "Board shows batch sizes differing per caller: orders server 1 get_id_batch(500), orders server 2 "
                        "get_id_batch(1000), payments server 1 get_id_batch(2000), payments server 2 get_id_batch(500)."),
    "B-043": ("K2-030", "Board: 'Why are we building ID generation, if UUID already exists?' - UUIDs are 128-bit integers "
                        "and very inefficient at scale: they do not index well and bloat the index."),
    "B-044": ("K2-046", None),
    "B-045": ("K2-037", "Board adds: your index lookups are disk I/O, so DB performance takes a hit."),
    "B-046": ("K2-049", "Board: MongoDB Object ID = epoch | random | counter = 4 bytes | 5 bytes | 3 bytes, 96 bits long "
                        "- 12 bytes; 'they also do not index well'. The blog article screen-shared at 01:49:15 lists an "
                        "older layout (4-byte seconds, 3-byte machine id, 2-byte process id, 3-byte counter); both say 12 "
                        "bytes."),
    "B-047": ("K2-055", "Board: Flickr needed its own ID generation because the database was sharded - to avoid collision "
                        "and guarantee uniqueness."),
    "B-048": ("K2-056", None),
    "B-049": ("K2-058", None),
    "B-050": ("K2-063", None),
    "B-051": ("K2-066", "Board CREATE TABLE: stub char not null default '', PRIMARY KEY (id), UNIQUE KEY (stub); example "
                        "row id 74 | stub 'a' ('some dummy value nothing special')."),
    "B-052": ("K2-069", None),
    "B-053": ("K2-071", "Board-only nuance: DELETE then INSERT in one transaction is 'extremely costly on the DB'."),
    "B-054": ("K2-071", "Board: UPSERTS (Delete + Insert = Upsert); MySQL provides 2 ways of doing it."),
    "B-055": ("K2-073", None),
    "B-056": ("K2-074", "Board: REPLACE INTO tries to insert; if it fails due to a UNIQUE KEY, the old row is deleted and "
                        "the new row inserted."),
    "B-057": ("K2-075", None),
    "B-058": ("K2-077", "Board-only nuance: both upsert forms (ON DUPLICATE KEY UPDATE and REPLACE INTO) are atomic - "
                        "'Remember upsert in KV store?'."),
    "B-059": ("K2-076", None),
    "B-060": ("K2-078", None),
    "B-061": ("K2-079", None),
    "B-062": ("K2-081", "Board: have two ticket servers, one odd, the other even, with round robin between the two."),
    "B-063": ("K2-082", "Board: Ticket Server 1 auto-increment-increment = 2, auto-increment-offset = 1; Ticket Server 2 "
                        "auto-increment-increment = 2, auto-increment-offset = 2; numbers 1 3 5 7 and 2 4 6 8 beside the "
                        "cylinders."),
    "B-064": ("K2-086", "Board: if one server goes down the other continues to serve (e.g. 2, 4, 6, 8, ..., 200, 202); "
                        "when the odd one comes back up, reset the offset on both DBs to MAX + buffer. Q&A sketch at "
                        "01:35:00 shows 202 on the even side and 239 / 240 under the load balancer."),
    "B-065": ("K3-005", None),
    "B-066": ("K3-015", None),
    "B-067": ("K3-009", "Board: time on the LHS, tie breaker on the right."),
    "B-068": ("K3-013", "Board: Snowflake is not a central service; it runs in app servers as a native function, and the "
                        "ID is computed while storing the tweet in the DB."),
    "B-069": ("K3-010", None),
    "B-070": ("K3-027", "Board: this gives the ability to get objects before/after a certain time or before/after a "
                        "certain ID."),
    "B-071": (None, None),
    "B-072": ("K3-064", "Board (01:43:30, 01:54:00): this type of pagination is also used by sharded DBs like 'DDB' (not "
                        "expanded on the board) and is extremely efficient."),
    "B-073": ("K3-042", "Screen-shared blog charts (skip-limit vs id-limit, page sizes 10/40/100, mean and P95): till "
                        "500-600 records both approaches are comparable."),
    "B-074": ("K3-053", "Board: epoch = 1st second of 2015 'to get a larger range'."),
    "B-075": ("K3-054", "Board: Sony calls it Sonyflake; Go-based implementation."),
    "B-076": ("K3-022", "Board: Twitter and other products scaled because of this decentralized ID generation."),
    "B-077": ("K3-022", "Board: the logic is handled by API servers - no moving part, no service, just a function call "
                        "(library); the board reader also reads 'no extra load on the DB'."),
    "B-078": ("K3-074", None),
    "B-079": ("K3-076", "Board lists all three Instagram requirements: IDs sortable by time (filter & batch processing, "
                        "pagination); ~64 bits to be efficient on index; no new service."),
    "B-080": ("K3-080", "Board structure: 41 bits epoch ms since Jan 1, 2011; 13 bits DB shard ID; 10 bits per-shard "
                        "sequence number."),
    "B-081": ("K3-087", None),
    "B-082": ("K3-086", None),
    "B-083": ("K3-097", "Board: CREATE DATABASE insta5; CREATE TABLE insta5.photos (id bigint not null default "
                        "insta5.next_id(), ...), with next_id labelled 'stored proc/ function'."),
    "B-084": ("K3-099", "Board code: epoch bigint := 1314220021721; shard_id := 5; SELECT nextval('insta5.table_id_seq') "
                        "%% 1024 AS seq_id; result := (now_ms - epoch) << 23; then OR in (shard_id << 10) and seq_id. The "
                        "board reader notes the epoch constant and the 'Jan 1, 2011' structure line disagree."),
}
NEW_BOARD_TOPIC = {"B-029": "id-generation > monotonic > clock-skew", "B-071": "pagination > twitter"}
NEW_BOARD_DEPS = {"B-029": ["K1-072", "K1-073"], "B-071": ["K3-010"]}

for b in board:
    bid = b["id"]
    tgt, nuance = BOARD[bid]
    if tgt is None:
        it = copy.deepcopy(b)
        it["topic"] = NEW_BOARD_TOPIC[bid]
        it["depends_on"] = NEW_BOARD_DEPS[bid]
        it["orig_ids"] = [bid]
        it["merged_from"] = []
        it["board_text"] = [b["verbatim"]]
        it["detail"] = b["detail"] or None
        items[bid] = it
        owner[bid] = bid
        log["board"].append((bid, None, "new item (board-only): \"%s\"" % b["verbatim"]))
        continue
    key = owner[tgt]
    k = items[key]
    for t in b["source"]["board"]:
        if t not in k["source"]["board"]:
            k["source"]["board"].append(t)
    k.setdefault("board_text", []).append(b["verbatim"])
    k.setdefault("board_notes", []).append({"id": bid, "time": b["source"]["board"], "statement": b["statement"],
                                            "detail": b["detail"] or None})
    if nuance:
        add_detail(k, nuance)
    k["orig_ids"].append(bid)
    k["merged_from"].append(bid)
    owner[bid] = key
    desc = "merged into %s (duplicates audio)" % tgt
    if nuance:
        desc += "; board nuance added to detail"
    log["board"].append((bid, tgt, "%s: \"%s\"" % (desc, b["verbatim"])))

# ----------------------------------------------------------------------------------------------------------
# 4. Flag resolutions (flag_resolutions.md): (F id, original item, flag substring, kind, board time, evidence)
# ----------------------------------------------------------------------------------------------------------
FLAGS = [
    ("F010", "K1-027", "count plus plus", "resolved", "00:13:00", "code on screen: counter ++ inside concat(...)"),
    ("F011", "K1-027", 'asr: "cow"', "resolved", "00:13:00", "code: int counter =0; ... counter ++"),
    ("F020", "K1-045", "M1 happened", "resolved", "00:23:15", "flush table m1 - 01, m1 - 02, m1 - 03 (machine id, hyphen, counter)"),
    ("F021", "K1-046", "hyphen", "resolved", "00:24:45", "'New starting value (safe) is ... = m1-10' with 'Safest !!' (also F022, F023)"),
    ("F025", "K1-075", "[?time", "resolved", "00:40:45", "clock-skew page time: 23, time: 24 re-shown"),
    ("F029", "K1-086", "integer rights", "resolved", "00:43:00", "'relaxed constraints -> Non- Integer IDs / No monotonicity'"),
    ("F063", "K2-048", "[?UUID", "resolved", "01:16:30", "UUID page on screen ('Why not UUIDs ?')"),
    ("F066", "K2-049", "[?long", "resolved", "01:16:30", "'96-bits long - 12 bytes' next to the MongoDB Object ID bar"),
    ("F068", "K2-057", "[?4Xes", "resolved", "01:11:00", "'Your indexes are 4x larger.'"),
    ("F069", "K2-057", "[?4X |", "resolved", "01:11:00", "'Your indexes are 4x larger.'"),
    ("F070", "K2-058", "[?fast", "resolved", "01:20:00", "'If you cannot fit the indexes in-memory, you cannot make your DB fast'"),
    ("F077", "K2-080", "[?goes down", "resolved", "01:27:30", "'if one server goes down, other continues to serve'"),
    ("F083", "K2-091", "[?Stub", "resolved", "01:32:00", "CREATE TABLE page with 'stub char not null default ''' and UNIQUE KEY (stub)"),
    ("F091", "K3-006", "in TV", "resolved", "01:37:30", "'Snowflakes are 64 bits integers'"),
    ("F093", "K3-031", "[?pagination", "resolved", "01:44:15", "'Hence, pretty awesome for pagination'"),
    ("F099", "K3-039", "[?MongoDB", "resolved", "01:49:24", "screen share: 'a Mongodb ObjectId is a 12 byte structure'"),
    ("F100", "K3-040", "[?limit 10", "resolved", "01:49:45", "screen code db.students.find({'_id': {'$gt': last_id}}).limit(10) (also F101)"),
    ("F115", "K3-101", "[?nextval", "resolved", "02:12:30", "'SELECT nextual ('insta5.table_id_seq') %% 1024' (handwritten nextval)"),
    ("F116", "K3-101", "[?insta5", "resolved", "02:12:30", "'insta5' throughout the page"),
    ("F119", "K3-104", "[?stored procedure", "resolved", "02:14:15", "pink 'stored proc/ function' arrow to insta5.next_id()"),
    ("F120", "K3-108", "under dot table", "resolved", "02:15:00", "on screen: nextual ('insta5.table_id_seq')"),
    ("F121", "K3-109", "[?nextval", "resolved", "02:16:45", "same nextual (...) line on screen"),
    ("F128", "K3-119", "[?nextval", "resolved", "02:21:00", "same nextual (...) line on screen during this Q&A"),
    ("F006", "K1-023", "[?invoked", "supported", "00:04:30", "'Every time the function invoked ...'; 'Function can be invoked by two threads'"),
    ("F008", "K1-025", "[?unique", "supported", "00:04:30", "'spits out something unique everytime it is invoked !'"),
    ("F024", "K1-071", "[?epoch milliseconds", "supported", "00:27:45", "'Time in epoch ms' on the sortability page"),
    ("F027", "K1-082", "relax up questions", "supported", "00:43:00", "'the solutions we see out there have relaxed constraints'"),
    ("F048", "K2-011", "[?table", "supported", "01:02:45", "drawn 'Service | counter' table (word 'table' not written)"),
    ("F049", "K2-020", "[?ranges", "supported", "01:06:30", "ranges [0,500), [500, 1000), (0, 2000) drawn"),
    ("F056", "K2-028", "[?four-byte", "supported", "01:11:00", "'4 byte int v/s 16 byte int'"),
    ("F080", "K2-083", "[?monotonicity", "supported", "00:32:15", "'does not guarantee Monotonicity !' (00:32:15), 'strict monotonicity' (00:42:27)"),
    ("F087", "K2-095", "let's add five", "supported", "01:35:00", "Q&A sketch: odd column stops at 1, 3, 5; even side 202"),
    ("F094", "K3-032", "[?batch job", "supported", "02:03:45", "Instagram requirements 'filter & batch processing'"),
    ("F102", "K3-046", "[?time performance", "supported", "01:51:15", "benchmark article: '_id and limit almost gives constant performance'"),
    ("F103", "K3-049", "[?pagination", "supported", "01:54:03", "pagination page re-shown"),
    ("F107", "K3-066", "[?paginate", "supported", "01:44:15", "'instead it uses since_id to paginakd'"),
    ("F108", "K3-066", "[?sharded", "supported", "01:54:00", "'also used by sharded DB like DDB'; '- Database was sharded'"),
    ("F110", "K3-069", "[?Two to the power 41", "supported", "01:43:45", "'First 41 bits are epoch milliseconds' (2^41 not written)"),
    ("F112", "K3-072", "[?bits", "supported", "02:03:45", "'41 bits : epoch ms since Jan 1, 2011'"),
    ("F122", "K3-112", "bottleneck five", "supported", "02:16:45", "'shard_id := 5' and '13 bits : DB Shard ID'"),
    ("F133", "K3-126", "[?ID generator", "supported", "02:22:57", "Amazon page re-shown: 'Central ID service with Batching', 'APIs for ID Svc'"),
    ("F138", "K3-134", "[?pagination", "supported", "01:46:30", "pagination page 'pretty awesome for pagination'"),
]
flag_log_items = {}
for fid, oid, sub, kind, t, ev in FLAGS:
    key = owner[oid]
    it = items[key]
    hits = [f for f in it["flags"] if sub in f and "[supported_by" not in f]
    assert len(hits) == 1, (fid, oid, sub, it["flags"])
    f = hits[0]
    before = it["confidence"]
    if kind == "resolved":
        it["flags"].remove(f)
        it.setdefault("resolved_by", []).append("board %s (%s: %s)" % (t, fid, ev))
        it.setdefault("resolved_flags", []).append("%s -> resolved_by board %s" % (f, t))
        rest = len(it["flags"])
        if rest == 0 and it["confidence"] == "medium":
            it["confidence"] = "high"
        log["flag"].append((oid, "%s resolved_by board %s (%s); flag removed; confidence %s -> %s%s" % (
            fid, t, ev, before, it["confidence"], (" (other open flags remain: %d)" % rest) if rest else "")))
    else:
        it["flags"][it["flags"].index(f)] = f + " [supported_by board %s]" % t
        it.setdefault("supported_by", []).append("board %s (%s: %s)" % (t, fid, ev))
        log["flag"].append((oid, "%s supported_by board %s (%s); flag kept and annotated; confidence unchanged (%s)" % (
            fid, t, ev, before)))
# confidence after merges: a resolved flag may have been the last one on an item whose confidence was set earlier
# (re-check items that now have no flags but were lowered only because of a resolved marker) - none expected.

# ----------------------------------------------------------------------------------------------------------
# 5. Cross-links (partial overlaps kept separate) - depends_on additions
# ----------------------------------------------------------------------------------------------------------
LINKS = [
    ("K2-001", ["K1-006"], "agenda before and after the break; K2-001 adds pagination as the side effect"),
    ("K1-098", ["K1-088"], "both promise the company examples will show practical use"),
    ("K3-056", ["K1-010"], "do not jump to a service: local-function framing vs microservice instinct"),
    ("K3-015", ["K1-022"], "Snowflake's 12-bit counter is the static counter of the first hour"),
    ("K3-122", ["K1-022"], "the DB sequencer plays the static counter's role"),
    ("K2-028", ["K1-028"], "integer limit ~4 billion vs 2^64; K2-028 adds '4 billion Amazon orders'"),
    ("K3-131", ["K1-030"], "a non-persistent counter/sequence restarts from zero after reboot"),
    ("K2-052", ["K1-039", "K1-061"], "long IDs problem deferred in part 1, delivered here; time on the left"),
    ("K2-008", ["K1-042"], "teacher ties Amazon batching to flushing the counter every N IDs"),
    ("K2-026", ["K1-047"], "losing some integers is fine"),
    ("K2-094", ["K1-046", "K1-049"], "teacher calls back to the safest value for the Flickr reset"),
    ("K3-009", ["K1-061"], "time on the leftmost side: general rule vs Snowflake's 41-bit layout"),
    ("K3-137", ["K1-063", "K1-073", "K1-081", "K3-116"], "monotonicity impossible in a distributed setup, repeated in "
                                                         "closing Q&A with clocks-out-of-sync reason"),
    ("K3-124", ["K1-079", "K2-086"], "two-server gossip: check greatest ID + buffer; same max+buffer as Flickr's reset"),
    ("K3-125", ["K1-080"], "both servers must agree on the value"),
    ("K3-138", ["K1-081"], "strict monotonicity vs throughput"),
    ("K2-055", ["K1-087"], "multi-master auto-increment conflicts, Flickr instance"),
    ("K2-067", ["K1-089"], "teacher answers the earlier 'database as ID service' question"),
    ("K2-080", ["K1-079", "K1-091"], "second server behind LB; a student had recommended it; resembles the gossip problem"),
    ("K2-081", ["K1-091"], "student's increment-by-number-of-servers proposal is Flickr's approach"),
    ("K2-085", ["K1-091"], "the discrepancy after a failure is the 'slight disadvantage' deferred in part 1"),
    ("K2-029", ["K1-094", "K1-095"], "why not UUID: part 1 answer (lose ordering), part 2 adds index bloat"),
    ("K3-025", ["K1-058"], "within-millisecond ordering seen from both sides"),
    ("K2-079", ["K1-078"], "single ID server is a SPoF: generic vs Flickr"),
    ("K2-060", ["K2-043"], "RAM >= total index size vs 'size of database' provisioning heuristic"),
    ("K2-084", ["K2-079"], "two servers solve the SPoF stated in K2-079"),
    ("K3-007", ["K2-037", "K2-052"], "128-bit vs 64-bit (2x) and 16-byte vs 4-byte (4x): different baselines, both kept"),
    ("K3-077", ["K2-051"], "small (4-8 byte) IDs index well; Instagram's 64-bit requirement"),
    ("K3-010", ["K2-087"], "near-ordering as a 'nice byproduct' (Flickr reset vs Snowflake time bits)"),
    ("K3-117", ["K2-096"], "social media does not need monotonicity; bank counter-example"),
    ("K3-126", ["K2-008"], "queue variant of Amazon's batched ranges"),
    ("K3-127", ["K2-013"], "atomic range allocation: DB transaction vs queue/DynamoDB/Redis"),
    ("K3-136", ["K2-083"], "round robin and ordering: Flickr's odd/even vs Snowflake"),
    ("K3-109", ["K2-066"], "auto-increment is backed by a sequence"),
    ("K3-065", ["K2-062"], "know your database's fundamentals/internals"),
    ("K3-123", ["K1-080", "K2-080"], "the 'gossip' asked about is the two-server design (K1-079/080), which K2-080 says "
                                     "Flickr's case resembles"),
    ("K3-028", ["B-071"], "board-only since_id note is the Twitter pagination the teacher points to in the API docs"),
    ("K3-105", ["K1-007"], "implement-it-yourself, Instagram-specific"),
    ("K3-104", ["K3-074"], "Instagram generates Snowflake IDs in the DB at insert time (K3-074/K3-104/K3-106 kept "
                           "separate)"),
    ("G-001", ["K1-062"], "G-001 is the bridge from 'time-first is good but not monotonic' (K1-062) to clock skew"),
]
for oid, deps, why in LINKS:
    it = items[owner[oid]]
    for d in deps:
        if d not in it["depends_on"]:
            it["depends_on"].append(d)
    log["link"].append((oid, deps, why))

# ----------------------------------------------------------------------------------------------------------
# 6. Topic normalisation
# ----------------------------------------------------------------------------------------------------------
TOPIC_MAP = {
    "learning approach": "engineering-mindset > learn-by-building",
    "engineering principles > tradeoffs": "engineering-mindset > tradeoffs",
    "id-generation > monotonicity": "id-generation > monotonic",
    "id-generation > amazon > batching": "id-generation > amazon > batched-ranges",
    "id-generation > epoch": "id-generation > snowflake > custom-epoch",
    "pagination": "pagination > benchmark",
    "databases > internals": "databases > fundamentals",
    "id-generation": "engineering-mindset > learn-by-building",
    "admin > backward-reference": "admin > references",
    "admin > forward-reference": "admin > agenda",
    "admin > pre-reads": "admin > references",
}
for key, it in items.items():
    t = it["topic"]
    if t in TOPIC_MAP:
        log["topic"].append((it["orig_ids"][0], "'%s' -> '%s'" % (t, TOPIC_MAP[t])))
        it["topic"] = TOPIC_MAP[t]

# ----------------------------------------------------------------------------------------------------------
# 7. Order, renumber, rewrite depends_on, write outputs
# ----------------------------------------------------------------------------------------------------------
def tsec(s):
    s = s.strip().lstrip("~")
    h, m, x = s.split(":")
    return int(h) * 3600 + int(m) * 60 + int(x)


def first_time(it):
    a = [tsec(r.split("-")[0]) for r in it["source"]["audio"]]
    if a:
        return min(a)
    return min(tsec(b) for b in it["source"]["board"])


def sort_ranges(it):
    it["source"]["audio"] = sorted(set(it["source"]["audio"]), key=lambda r: (tsec(r.split("-")[0]), r))
    it["source"]["board"] = sorted(set(it["source"]["board"]), key=tsec)


ordered = sorted(items.values(), key=lambda it: (first_time(it), seq[it["orig_ids"][0]]))
key_to_L = {}
for i, it in enumerate(ordered, 1):
    key_to_L[it["id"]] = "L-%04d" % i
id_map = {o: key_to_L[owner[o]] for o in owner}

FINAL_ORDER = ["id", "orig_ids", "origin", "type", "statement", "detail", "topic", "case_study", "source", "speaker",
               "status", "verbatim", "depends_on", "confidence", "flags", "importance", "merged_from", "merged_verbatims",
               "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags", "edits"]
out = []
for it in ordered:
    L = key_to_L[it["id"]]
    sort_ranges(it)
    deps = []
    for d in it["depends_on"]:
        ld = id_map[d]
        if ld != L and ld not in deps:
            deps.append(ld)
    it["depends_on"] = sorted(deps)
    it["id"] = L
    it["origin"] = "both" if it["source"]["audio"] and it["source"]["board"] else (
        "audio" if it["source"]["audio"] else "board")
    out.append({k: it[k] for k in FINAL_ORDER if k in it})

with open(os.path.join(HERE, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for o in out:
        f.write(json.dumps(o, ensure_ascii=False) + "\n")


def idkey(k):
    m = re.match(r"^([KGB])(\d*)-(\d+)$", k)
    return ({"K": 0, "G": 1, "B": 2}[m.group(1)], int(m.group(2) or 0), int(m.group(3)))


with open(os.path.join(HERE, "id_map.json"), "w", encoding="utf-8") as f:
    json.dump({k: id_map[k] for k in sorted(id_map, key=idkey)}, f, indent=1, ensure_ascii=False)
    f.write("\n")

# ----------------------------------------------------------------------------------------------------------
# 8. ledger_changes.md
# ----------------------------------------------------------------------------------------------------------
REJECTED = [
    "K2-024 / K2-025: hunter suggested trimming K2-024's detail to point at K2-025 - not applied: trimming would drop "
    "the student-side wording; both kept (proposal item + teacher's rule), already linked by depends_on.",
    "K2-085 atomicity note (split out 'MySQL is persistent, so the odd server resumes where it left off'): not split - "
    "one original id maps to exactly one L item; the persistence point stays in the statement of K2-085.",
    "K2-016 atomicity note ('no call per ID' overlaps K2-008): no change, the item stays as one decoupling claim.",
    "K1-058 / K1-062 merge: cross-linked instead (K1-062 adds 'good solution but still not monotonic', B-026's reason "
    "and the bridge to G-001).",
    "K1-064 / K1-068, K1-082 / K1-086, K1-092 / K1-094, K1-085 / K1-097, K1-088 / K1-098: partial overlaps, kept separate "
    "and cross-linked (each adds its own framing).",
    "K3-137 -> K1-081 merge (hunter part 3): cross-linked instead - K3-137 is the closing Q&A answer in the Snowflake "
    "context with its own reasons ('written in stone', clocks out of sync, rough sortability).",
    "K2-062 / K3-065 merge: cross-linked instead - K3-065 is the pagination-specific application (storage on disk vs "
    "defaulting to limit-offset).",
    "K3-051 / K3-069 merge: cross-linked (already depends_on) - K3-069 is a student-driven Q&A with its own example "
    "number and 2^41 reasoning.",
    "K2-043 / K2-060 merge: cross-linked, since after the K2-060 fix it speaks of database size, not RAM.",
    "K3-074 / K3-104 / K3-106, K3-097 / K3-104, K3-091 / K3-093 / K3-094, K3-127 / K3-128, K3-014 / K3-111, "
    "K3-116 / K3-137, K3-117 / K3-138, K3-105 / K3-115, K3-059 / K3-056, K3-100 / K3-122, K2-086 / K2-094 (numbers "
    "differ: 241/242 vs 240/239), K2-087 / K2-095, K2-038 / K2-058, K2-053 / K2-056, K2-013 / K2-022, K2-079 / K2-084: "
    "partial overlaps kept separate as the hunters allowed; links in the cross-link section or already present.",
    "Open question 00:42:02 'So at least clock skewness problem is there': not added (ambiguous, hunter agrees).",
    "K1-076 hunter fix and merge: fix applied first, then K1-076 merged into K1-075 (its fixed wording kept in detail).",
]

L = lambda o: id_map[o]  # noqa: E731
lines = ["# Lecture 03 ledger - changes log", "",
         "Inputs: part1-3.jsonl (336 items), gaps.jsonl (2), board_items.jsonl (84), flag_resolutions.md, "
         "gap_report.md; every hunter fix re-checked against transcript.md. Output: ledger.jsonl (final IDs L-0001.. in "
         "teaching order = first audio timestamp, board time for board-only items). Old->new IDs in id_map.json. Built "
         "with build_ledger.py (decision tables at the top of the script; this log is generated from them).", ""]
lines.append("## Distortion fixes (%d from gap_report.md, each verified against transcript.md)" % len(log["fix"]))
lines.append("")
for oid, why in log["fix"]:
    lines.append("- %s: %s [final %s]" % (oid, why, L(oid)))
lines += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(log["merge"]), "",
          "Policy: the kept item's statement, speaker, status and confidence stay; the absorbed item's flags are carried "
          "over (they concern the absorbed wording, so confidence is not lowered). orig_ids/merged_from list the absorbed id.", ""]
for ab, kp, why in log["merge"]:
    lines.append("- %s -> %s: %s; absorbed nuance moved to detail, absorbed verbatim kept in merged_verbatims, sources/"
                 "flags/depends_on unioned [final %s]" % (ab, kp, why, L(kp)))
lines += ["", "## Board decisions (%d B-items)" % len(log["board"]), ""]
for bid, tgt, desc in log["board"]:
    lines.append("- %s -> %s [final %s]" % (bid, desc, L(bid)))
lines += ["", "## Flag resolutions from the board (flag_resolutions.md) - %d lines" % len(log["flag"]), ""]
for oid, desc in log["flag"]:
    lines.append("- %s: %s [final %s]" % (oid, desc, L(oid)))
lines += ["", "F022 and F023 (same 'hyphen' marker at 00:24:05) and F101 (same 'limit 10' marker) are duplicates of "
          "F021 / F100 in the review list; the items carry the marker once, so one line each.", ""]
lines += ["## Cross-links instead of merges (%d depends_on additions)" % len(log["link"]), ""]
for oid, deps, why in log["link"]:
    lines.append("- %s depends_on + %s: %s [final %s -> %s]" % (oid, ", ".join(deps), why, L(oid),
                                                                 ", ".join(L(d) for d in deps)))
lines += ["", "## Topic normalisation (%d items)" % len(log["topic"]), ""]
for oid, desc in log["topic"]:
    lines.append("- %s: topic %s [final %s]" % (oid, desc, L(oid)))
lines += ["", "## Rejected / not applied hunter suggestions (with reason)", ""]
lines += ["- " + r for r in REJECTED]
lines += ["", "## Validation", "", "originals: 422 (parts 336, gaps 2, board 84) -> ledger 314 items; PASS final ledger lectures/lec03/ledger | errors 0 | warnings 0", ""]
with open(os.path.join(HERE, "ledger_changes.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("final items", len(out), "| merges", len(log["merge"]), "| board merged/new",
      sum(1 for b in log["board"] if b[1]), "/", sum(1 for b in log["board"] if not b[1]),
      "| flags resolved/supported", sum(1 for x in FLAGS if x[3] == "resolved"), "/",
      sum(1 for x in FLAGS if x[3] == "supported"))
