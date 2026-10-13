#!/usr/bin/env python3
"""Editor helper for lecture 04: applies the editor's decisions (all listed below, by hand) and does the mechanical
parts - source unions, renumbering to L ids, depends_on rewrite, id_map.json and ledger_changes.md."""
import json
import os
import re

D = os.path.dirname(os.path.abspath(__file__))
LEC = os.path.dirname(D)


def load(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


items, seq = {}, {}
n = 0
for f in ["part1.jsonl", "part2.jsonl", "part3.jsonl", "gaps.jsonl"]:
    for it in load(os.path.join(D, f)):
        n += 1
        items[it["id"]] = it
        seq[it["id"]] = n
board = {b["id"]: b for b in load(os.path.join(LEC, "board", "board_items.jsonl"))}
all_orig = list(items) + list(board)

for it in items.values():
    it["orig_ids"] = [it["id"]]
    it["merged_from"] = []
    it["origin"] = "audio"

LOG = {"fix": [], "merge": [], "board": [], "flag": [], "topic": [], "reject": [], "xlink": []}
absorbed_into = {}


def add_edit(i, note):
    items[i].setdefault("edits", []).append(note)


def add_detail(i, text):
    d = items[i].get("detail")
    items[i]["detail"] = (d.rstrip() + " " + text) if d else text


# ---------------------------------------------------------------------------------------------------------------
# 1. Distortion fixes (each re-checked against transcript.md by the editor)
# ---------------------------------------------------------------------------------------------------------------
def fix(i, log, **kw):
    for k, v in kw.items():
        items[i][k] = v
    add_edit(i, "distortion fix: " + log)
    LOG["fix"].append((i, log))


fix("K1-092", "added flag for the contradictory first clause 'persistent connections that you can hold with DynamoDB' "
    "(01:00:14); statement kept (next sentences: DynamoDB 'stateless', 'With Redis, you create persistent connections'); "
    "confidence stays medium",
    flags=items["K1-092"]["flags"] + ['check: "persistent connections that you can hold with DynamoDB" at 01:00:14 - '
                                      'likely slip/ASR for Redis; next sentences say DynamoDB is stateless'])
fix("K1-071", "dropped 'self-managed' from the Redis clause (the student said DynamoDB is 'self managed. It's managed by "
    "the AWS'; about Redis only 'in-memory database ... can go down')",
    statement="A student proposed DynamoDB because it is managed by AWS (highly available, so the team does not have to "
              "worry about it), whereas Redis, an in-memory database, can go down; the teacher endorsed it: a managed "
              "service offloads infrastructure management to the cloud vendor so the team can focus on business logic.")
fix("K1-033", "dropped '(spiral approach)' - the teacher only says 'let's say we pick our core of the system as database. "
    "That's the easiest one to start'; link kept via depends_on K1-023 and a detail note",
    statement="The online/offline indicator design starts by picking the database as the core of the system, the easiest "
              "place to start, asking what is needed to render a user with a green or grey indicator.",
    detail="Matches the spiral approach's 'decide the core' step (link not stated by the teacher at this point).")
fix("K1-068", "'upsert the user's entry' -> 'update (set) the user's entry' (teacher: 'we update the entry in Redis and "
    "DynamoDB, whichever DB you choose, with a TTL of 30 seconds')",
    statement="Final logic: on every heartbeat, update (set) the user's entry in Redis or DynamoDB (whichever DB you "
              "choose) with a TTL of 30 seconds (resetting the TTL); the database deletes it automatically on expiry; "
              "entry exists = online, absent = offline. The app is just REST endpoints talking to this database.")
fix("K1-055", "added the hedge 'not really disk space yet' to detail",
    detail="The teacher notes this is 8 bytes of data, 'not really disk space yet' (on-disk size is not computed).")
fix("K1-091", "added flag for the unidentified 'Student?' turns at 00:59:38 and 01:00:06 (F029, F030); confidence stays high",
    flags=["speaker: Student? (unidentified) at 00:59:38 and 01:00:06 (F029, F030)"])
fix("K1-083", "added speaker flag for 'How you can configure it?' (00:55:38, Student?, F023); detail now 'someone (speaker "
    "unclear) asked how it is configured'",
    detail="Someone (speaker unclear, possibly the teacher probing) asked how it is configured; the student cited a blog "
           "post shared in chat.",
    flags=['check: speaker of "How you can configure it?" at 00:55:38 (Student?, F023 - may be the teacher)'])
fix("K1-085", "added speaker flag for 'All of them.' (00:56:59, Student?, F025 - possibly the teacher confirming); status "
    "stays open",
    flags=items["K1-085"]["flags"] + ['check: speaker of "All of them." at 00:56:59 (Student?, F025 - possibly teacher '
                                      'confirming)'])
fix("K1-018", "added flag for the garbled 'most only implemented it' behind 'mostly implemented it'; confidence high -> medium",
    flags=['asr: "most only implemented it" (read as "mostly implemented it")'], confidence="medium")
fix("K2-067", "removed the invented timing ('originally started the session'); now 'earlier the teacher used to start with "
    "the foundational topics'; added check flag on what 'earlier' means",
    statement="Earlier, the teacher used to start with the foundational topics and skip the online/offline indicator, but "
              "that became too theoretical, so he now starts with the online/offline indicator to get the class into "
              "the groove.",
    flags=['check: "earlier" = earlier cohorts or earlier in this session ("So earlier I did not cover online offline '
           'indicator. I started from here")'], confidence="medium")
fix("K2-133", "detail now records the teacher's opening 'No, no' (rejecting 'you said epoch integers are always better') "
    "before agreeing the overflow point is very true; status endorsed kept for the overflow point",
    detail="From a student (Sandeep), who had ranked epoch as the worst format. The teacher first answered 'No, no' to the "
           "claim that he had said epoch integers are always better, then agreed the overflow point is very true.",
    statement="A student worried that the epoch number keeps increasing and will soon max out a 4-byte int, forcing a move "
              "to 64 bits, making epoch the worst format; the teacher agreed the overflow point is very true.")
fix("K2-136", "restored the hedge 'let's say' on the byte count and replaced 'as MySQL does' with the teacher's pointer to "
    "MySQL's datetime documentation; confidence high -> medium",
    statement="An alternative is a compressed serialized date time that covers the entire date range without being "
              "limited by integer size, at a little extra space - 'let's say' about 6 bytes rather than 8 - stored in a "
              "very compressed way; the teacher points to MySQL's datetime documentation as the example.",
    confidence="medium")
fix("K2-055", "statement no longer reads as if someone answered 'always use it': the student paraphrased the earlier advice "
    "while moving on to ask about pool min/max",
    statement="A student, summarising the earlier advice as 'always use a connection pool', moved on to ask how to choose "
              "the pool minimum and maximum.")
fix("K2-026", "'(a loop)' -> the teacher's 'an infinite loop, the waiting part'",
    statement="Implementation: when the server boots it creates multiple database connection objects and puts them in a "
              "blocking queue; a caller pops a connection if one is there, otherwise it waits - an infinite loop, the "
              "waiting part - until someone puts one back.")
fix("K2-122", "speaker student (question) -> teacher (the answer is the insight); detail says the teacher did not dispute "
    "inflexibility in general",
    speaker="teacher",
    detail="Question from a student (Student 3), who found the format 'really inflexible' if time is ever needed. The "
           "teacher did not dispute the inflexibility in general; he said it did not matter because Redbus knew it would "
           "never need time: 'They knew they did not.'")
fix("K2-019", "verbatim re-anchored on the waiting option ('...if one of them releases the connection') instead of the "
    "problem statement",
    verbatim="So which means out of the three queries that were running, if one of them releases the connection")
fix("K2-058", "added the 1.5x-vs-1.2x note to detail and a check flag (teacher not changed)",
    detail="As stated: the example raises 10 to 15 (1.5x) while the rule given is 1.2x.",
    flags=["check: 15 vs 10 is 1.5x, rule says 1.2x"])
fix("K2-003", "source range 01:04:14-01:04:40 -> 01:04:14-01:05:19 (segment boundaries)",
    source={"audio": ["01:04:14-01:05:19", "01:05:19-01:05:44"], "board": []})
fix("K2-057", "source range 01:30:27-01:30:40 -> 01:30:27-01:31:12 (segment boundaries)",
    source={"audio": ["01:29:22-01:30:27", "01:30:27-01:31:12"], "board": []})
fix("K2-110", "source range 02:00:04-02:00:20 -> 02:00:04-02:01:11 (segment boundaries)",
    source={"audio": ["01:57:06-01:57:48", "02:00:04-02:01:11"], "board": []})
fix("K3-037", "dropped the added object 'keep' ('to maximize what you can')",
    statement="These are compliance hacks; the legal team helps navigate the compliance part to maximize what you can.")
fix("K3-108", "'no hard relation' -> 'no relation' (teacher: 'So no relation')",
    statement="HTTP is a protocol/specification while TCP is the layer 4 protocol, so there is no relation: you can send "
              "HTTP messages on top of UDP too.")
fix("K3-014", "added the physical half of the sentence ('but physically it sits over here', pointing at the board); "
    "'over here' resolved by board B-065 (see board decisions)",
    detail="Physically it sits elsewhere: the teacher pointed to its place on the board diagram (D-15: one central cache "
           "box linked to all three API servers).")
fix("K3-089", "added the reason storage needs no optimizing: deleting offline rows was a stretch to make the class think",
    detail="Deleting offline entries was a stretch so the class would think on those lines; storage itself is not a "
           "problem.")
fix("K3-010", "dropped the analyst's inferred framing clause; detail now only 'something he always says' (item then "
    "merged into K2-049)",
    detail="The teacher calls this something he always says.")
fix("K3-101", "added the teacher's reason: not just an engineering course (management perspective too)",
    detail="The teacher noted this is not just an engineering course; the perspectives also include a management "
           "perspective.")
fix("K3-063", "added flag on the student's 'if you don't edit' (read as 'not deleting'); confidence stays medium",
    flags=items["K3-063"]["flags"] + ['check: "if you don\'t edit" probably "delete" (02:38:19)'])
fix("K3-088", "copied the two ASR markers of the question into flags",
    flags=['asr: [?question | asr: "portion"]', 'asr: [?DB | asr: "DBI"]'] + items["K3-088"]["flags"])

# editor's own additions found while re-checking (logged as fixes)
fix("K2-003", "added flag: '8 GB for 1 million entries' (01:04:14) vs 1 billion users = 8 GB in K1-056 (teacher slip, "
    "kept as said); confidence high -> medium",
    flags=['check: "8 GB for 1 million entries" at 01:04:14 vs "1 billion users -> 8 GB" at 00:35:14 (K1-056); likely '
           'slip, kept as said'], confidence="medium")
fix("K3-065", "added the flag the analyst missed: the question rests on [?to delete | asr: \"to believe\"] (F114)",
    flags=['asr: [?to delete | asr: "to believe"]'])
fix("K2-109", "added the third ASR marker of the 01:56:23 segment (F071) to flags",
    flags=items["K2-109"]["flags"] + ['asr: [?date | asr: "data"]'])

# K3-042: nuance moved from the 02:28:18 answer (K3-044 stays as the Instagram/CDN Q&A)
add_detail("K3-042", "Repeated at 02:28:18: 'there would be plugins. I'm not sure any cache out of the box supports that' - "
                     "most caches you see are in memory, so if a cache does not support it there has to be a plugin, or "
                     "you just compress on your end.")
items["K3-042"]["source"]["audio"].append("02:28:18-02:28:58")
add_edit("K3-042", "nuance moved from the 02:28:18 answer (gap report, K3-042/K3-044)")
LOG["fix"].append(("K3-042", "moved the 02:28:18 repeat ('not sure any cache out of the box supports that', most caches "
                              "are in memory, else a plugin or compress on your end) into detail; source 02:28:18-02:28:58 "
                              "added; K3-044 kept as the Instagram/CDN Q&A"))


# ---------------------------------------------------------------------------------------------------------------
# 2. Duplicate merges (absorbed -> kept), every nuance moved by hand
# ---------------------------------------------------------------------------------------------------------------
def union(a, b):
    out = list(a)
    for x in b:
        if x not in out:
            out.append(x)
    return out


def merge(absorbed, kept, why, detail_add=None, statement=None, keep_verbatim=True, flag_note=None):
    a, k = items[absorbed], items[kept]
    k["source"]["audio"] = union(k["source"]["audio"], a["source"]["audio"])
    k["source"]["board"] = union(k["source"]["board"], a["source"]["board"])
    if detail_add:
        add_detail(kept, detail_add)
    if statement:
        k["statement"] = statement
    if keep_verbatim and a["verbatim"] != k["verbatim"]:
        k.setdefault("merged_verbatims", []).append(a["verbatim"])
    fl = a["flags"]
    if flag_note:
        fl = [f + " " + flag_note for f in fl]
    k["flags"] = union(k["flags"], fl)
    k["depends_on"] = union(k["depends_on"], a["depends_on"])
    k["orig_ids"] = union(k["orig_ids"], a["orig_ids"])
    k["merged_from"] = union(k["merged_from"], [absorbed] + a["merged_from"])
    for f in ("edits", "board_text", "board_notes", "resolved_by", "resolved_flags", "supported_by"):
        if a.get(f):
            k[f] = k.get(f, []) + a[f]
    if a["importance"] == "core" or k["importance"] == "core":
        k["importance"] = "core" if "core" in (a["importance"], k["importance"]) else k["importance"]
    absorbed_into[absorbed] = kept
    del items[absorbed]
    LOG["merge"].append((absorbed, kept, why))


merge("K2-055", "K2-029", "same 'always use a connection pool' advice; K2-055 is the student's paraphrase (fixed) at the "
      "start of the min/max question",
      detail_add="In the Q&A at 01:28:32 a student (Student 7) summarised this as 'always, always use' before asking how to "
                 "choose the pool minimum and maximum (answered by the min/max items).",
      flag_note="(absorbed Q&A paraphrase)")
merge("K2-064", "K2-062", "the festival answer said twice (01:32:28 and 01:33:14): scale the DB vertically first, then tune "
      "the pool",
      detail_add="Repeated at 01:33:14: vertically scale the database to handle the concurrent requests you need, then tune "
                 "the connection pool - the maximum, maybe not the minimum - since vertically scaled servers can also "
                 "handle more requests.")
merge("K2-074", "K2-073", "K2-074 is the teaser for soft delete (is_deleted is common; important for performance), "
      "explained in K2-086",
      detail_add="Many tables, including in your own organization, have an is_deleted column; the teacher calls soft "
                 "deletes extremely important, including for the performance of the database (reason given later: "
                 "B+ tree rebalancing).")
merge("K2-016", "K2-013", "both list the pool's benefits; K2-016 is the summary after the DB-side explanation",
      detail_add="Summarised at 01:12:01: a performance boost in client-side response time, less load on the database "
                 "(freeing it to fire other queries), saved infrastructure cost and a much more performant database.")
merge("K2-128", "K2-121", "same 'each date time format has its own trade-offs, pick what you need' rule, restated at 02:05:37",
      detail_add="Restated at 02:05:37: no date time format is better than the others overall; each has its own "
                 "trade-offs, and you choose the one that gives what you need.",
      flag_note="(in the absorbed 02:05:37 restatement)")
merge("K2-139", "K2-136", "both describe MySQL's serialized date time as the middle way; K2-139 adds 'balance both worlds'",
      detail_add="At 02:10:48 the teacher adds that MySQL's date time storage tries to balance both worlds: a serialized "
                 "(non-integer) format that still gives good enough performance.")
merge("K3-094", "K2-056", "cross-part repeat (closing Q&A 02:57:45) of the pool minimum of 3-5",
      detail_add="Repeated in the closing Q&A (02:57:45): start conservatively, minimum three to five connections, allowed "
                 "to grow to a certain stage, maybe less than 50 or 100.")
merge("K3-006", "K3-003", "same definition of a cache (anything that saves expensive work); K3-006 adds 'refer to it' and "
      "expensive IO",
      detail_add="Restated at 02:12:45: whatever result you save so you can refer to it instead of redoing an expensive "
                 "computation, expensive operation or expensive IO becomes a cache.")
merge("K3-017", "K3-018", "K3-017's general claim (the cache saves expensive DB queries and DB load) is the point of K3-018's "
      "popular-blog example",
      detail_add="General claim first (02:15:45): adding the cache saves expensive database queries and the load on the "
                 "database, because queries are now answered by the cache.")
merge("K3-024", "K3-061", "same rule of thumb (everything is a trade-off); K3-024 is the caching-places context, K3-061 the "
      "general form",
      detail_add="First said for caching places (02:19:52): when you use some place as a cache you gain something and lose "
                 "something, and the next day's discussion is trade-off based.")
merge("K3-049", "K3-062", "same staggered hard deletion of soft-deleted rows; K3-049 adds 'no downtime in the main service' "
      "and 'linear pace'",
      detail_add="First said at 02:30:54 (interview question on availability): hard-deleting soft-deleted entries should "
                 "cause no downtime in the main service; you do staggered deletions at a linear pace.")
merge("K3-058", "K3-056", "memory costs more than disk; K3-058 adds that cost is the biggest factor",
      detail_add="At 02:35:42 the teacher adds that RAM is more expensive than disk, and that is the biggest factor in "
                 "this choice.",
      flag_note="(in the absorbed 02:35:42 line)")
merge("K3-089", "K3-073", "the teacher answers the last-seen question twice; K3-089 adds 'product call', WhatsApp, 8 GB "
      "peanuts and the stretch",
      detail_add="Answered again at 02:53:48: whether to show last seen (like WhatsApp) is a product call; if they want it "
                 "you cannot delete offline entries, and there is nothing to optimize because storage is not a problem - "
                 "8 GB is peanuts. Deleting offline entries was a stretch so the class would think on those lines; "
                 "storage itself is not a problem.")
merge("K3-076", "K3-077", "same point (soft delete gives time to archive); K3-076 adds 'soft delete and archival are not "
      "the same thing'",
      detail_add="Soft delete and archival are not the same thing: soft delete allows you to archive, because with hard "
                 "delete there is no time to archive (02:45:51).")
merge("K3-083", "K2-038", "cross-part repeat of 'lean team -> throw money at the managed provider'; K3-083 adds 'they become "
      "your extended engineering team'",
      detail_add="Repeated at 02:49:45: with a lean team you can offload everything to DynamoDB - you throw money at them "
                 "and they become your extended engineering team.")
merge("K3-010", "K2-049", "cross-part repeat of the four things in computer science; K3-010 names RAM instead of memory",
      detail_add="Restated at 02:14:00 in the caching section as 'disk, network, CPU, RAM', which the teacher calls "
                 "something he always says.")

# ---------------------------------------------------------------------------------------------------------------
# 3. Cross-links instead of merges (partial overlaps: both sides keep their own nuance)
# ---------------------------------------------------------------------------------------------------------------
XL = [
    ("K2-111", "K1-054", "epoch definition: K1-054 seconds (heartbeat), K2-111 seconds or milliseconds (date-time column); "
                         "both kept so each section has its definition"),
    ("K2-003", "K1-057", "storage not the problem; K2-003 adds computation is the challenge"),
    ("K2-003", "G-001", "storage definition"),
    ("K2-112", "K1-055", "4-byte epoch integer"),
    ("K2-134", "K1-055", "4-byte epoch integer, overflow"),
    ("K3-013", "K1-087", "Redis advanced data structures"),
    ("K2-037", "K1-097", "lean teams go managed"),
    ("K2-038", "K1-085", "managed Redis offered by cloud providers"),
    ("K3-072", "K1-071", "availability: AWS vs your engineers"),
    ("K3-069", "K1-075", "vendor lock-in not a concern when you are the vendor"),
    ("K3-070", "K1-096", "open source vs proprietary: hiring angle"),
    ("K3-080", "K1-084", "Redis persistence: AOF"),
    ("K3-080", "K1-083", "Redis persistence"),
    ("K3-099", "K1-068", "TTL in Redis"),
    ("K3-065", "K1-066", "offload expiry/deletion to the database"),
    ("K3-084", "K1-066", "use the DB feature vs re-implement with a cron job (opposite direction)"),
    ("K3-086", "K1-088", "DynamoDB Streams vs CDC"),
    ("K3-102", "K1-041", "HTTP stateless, keep-alive qualifies 'no persistent connection'"),
    ("K3-103", "K1-099", "WebSocket persistent connection"),
    ("K3-073", "K1-060", "absence = offline means rows are deleted"),
    ("K3-081", "K1-029", "drop tech stereotypes"),
    ("K2-032", "K1-029", "core properties over memorised answers"),
    ("K3-061", "K1-058", "everything is trade-offs"),
    ("K2-067", "K1-019", "agenda"),
    ("K3-100", "K1-016", "brainstorming next week"),
    ("K1-099", "K1-020", "kept simple because day one"),
    ("K1-097", "K1-071", "managed service offloads infrastructure"),
    ("K1-096", "K1-082", "open source vs proprietary and lock-in"),
    ("K1-060", "K1-052", "no entry = offline"),
    ("K3-082", "K2-037", "autoscaling self-hosted Redis vs DynamoDB"),
    ("K3-082", "K3-072", "property of engineers, not the tool"),
    ("K3-095", "K2-024", "connection TTL"),
    ("K3-096", "K2-059", "telemetry for tuning the pool"),
    ("K3-090", "K2-057", "pool max vs DB max connections"),
    ("K3-090", "K2-035", "DB max connections is the bottleneck"),
    ("K3-092", "K2-023", "many servers x many connections hit the DB limit"),
    ("K3-098", "K2-047", "how a DB server holds many TCP connections"),
    ("K3-029", "K2-131", "batched hard deletes of soft-deleted rows"),
    ("K3-062", "K2-132", "staggered/batched deletion (rebalancing vs load)"),
    ("K3-066", "K3-029", "periodic hard delete vs offloading to the DB"),
    ("K3-077", "K2-079", "archive soft-deleted rows to S3 via a job"),
    ("K3-077", "K2-078", "soft delete enables archival"),
    ("K3-030", "K2-078", "archival"),
    ("K3-033", "K2-082", "harassment as a reason to keep deleted data"),
    ("K3-025", "K2-068", "the other four components next session"),
    ("K3-055", "K2-086", "databases store data in a B+ tree"),
    ("K2-063", "K1-005", "flash sale later in the course"),
    ("K2-070", "K1-019", "Medium-like blogging app"),
    ("K2-088", "K1-094", "know your database's internals"),
    ("K3-014", "K3-012", "cache placement"),
    ("K3-007", "K3-005", "caches equated with RAM"),
    ("K3-068", "K3-067", "worst case disk read"),
    ("K3-109", "K3-021", "exercise reminder"),
    ("K2-129", "K2-115", "Redbus bottleneck"),
    ("K2-040", "K2-022", "pool maximum 100"),
    ("K2-039", "K2-020", "pool grows on demand"),
    ("K2-043", "K2-028", "heavy queries outweigh connection cost"),
    ("K2-054", "K2-036", "vertical limit -> sharding"),
    ("K2-047", "K2-044", "network card"),
    ("K2-041", "K2-035", "connections as the DB bottleneck"),
    ("K2-097", "K2-090", "short vs long text"),
    ("K2-120", "K2-108", "find another way / be creative"),
    ("K2-065", "K2-059", "monitoring"),
    ("K2-060", "K2-056", "start conservatively"),
    ("K3-041", "K3-045", None),
]
for a, b, why in XL:
    if why is None:
        continue
    if b not in items[a]["depends_on"]:
        items[a]["depends_on"].append(b)
    LOG["xlink"].append((a, b, why))
items["K3-045"]["depends_on"] = union(items["K3-045"]["depends_on"], ["K3-041"])
LOG["xlink"].append(("K3-045", "K3-041", "compression is the application's job: key-value reason vs bandwidth reason"))


# ---------------------------------------------------------------------------------------------------------------
# 4. Board items
# ---------------------------------------------------------------------------------------------------------------
def bmerge(b, k, why, detail_add=None, flag=None):
    B, K = board[b], items[k]
    K["source"]["board"] = union(K["source"]["board"], B["source"]["board"])
    K.setdefault("board_text", []).append(B["verbatim"])
    K.setdefault("board_notes", []).append({"id": b, "time": B["source"]["board"], "statement": B["statement"],
                                            "detail": B["detail"]})
    if detail_add:
        add_detail(k, detail_add)
    if flag:
        K["flags"] = union(K["flags"], [flag])
    K["orig_ids"] = union(K["orig_ids"], [b])
    K["merged_from"] = union(K["merged_from"], [b])
    LOG["board"].append((b, k, why, B["verbatim"], bool(detail_add)))


bmerge("B-001", "K1-002", "course-rules page; duplicates the audio rules (K1-002, K1-004..K1-007, K1-011, K1-012)",
       "Board rules page (00:01:00-00:07:45) lists all the rules together: participate live, note new terms and read "
       "later, revise regularly, read the pre-reads, book 1:1s through Relog, give continuous feedback, share great "
       "links on Discord.")
bmerge("B-002", "K1-009", "duplicates audio")
bmerge("B-003", "K1-014", "duplicates audio (calendar, Discord, learn.relog.in)",
       "Board checklist: have the calendar invite, have joined the Discord server, have access to learn.relog.in.")
bmerge("B-004", "K1-015", "duplicates audio (session flow); its 'Brainstorming starts next week' also supports K1-016",
       "Board adds: in the interest of time some questions are taken at the end.")
bmerge("B-005", "K1-017", "duplicates audio (YouTube, membership, other courses)",
       "The board also lists the other-courses site and the essays site (URLs in board_text).")
bmerge("B-006", "K1-019", "duplicates audio (agenda)",
       "Board agenda: designing an online/offline indicator; how to approach system design; designing a multi-user "
       "blogging platform (database, caching).")
bmerge("B-007", "K1-021", "duplicates audio; heading resolves F007",
       "Board example: user 1 and user 4 green, user 5 and user 3 grey.")
bmerge("B-008", "K1-020", "duplicates audio", "Board: 'Since it is day 1, we keep thing simple and do not put a lot of "
       "focus on Scaling'.")
bmerge("B-009", "K1-023", "duplicates audio (decide the core, build around it)")
bmerge("B-010", "K1-024", "duplicates audio (core is use-case specific: database, communication)")
bmerge("B-011", "K1-025", "duplicates audio; board-only wording 'identify the bottleneck' (audio: 'borderline')",
       "Board steps: 1. start with a day-zero architecture, 2. see how each component behaves, 3. identify the "
       "bottleneck, 4. re-architect, 5. repeat (loop back to 2).")
bmerge("B-012", "K1-029", "duplicates audio (core property and access pattern)")
bmerge("B-013", "K1-029", "duplicates audio; board nuance: affinity 'comes second' (not 'never')",
       "Board wording: 'Affinity towards a tech comes second' - affinity is secondary to the core property and access "
       "pattern.")
bmerge("B-014", "K1-032", "duplicates audio")
bmerge("B-015", "K1-034", "duplicates audio", "Board: user (int) -> online/offline (bool); 'We still have not picked "
       "which DB to use'.")
bmerge("B-016", "K1-035", "duplicates audio")
bmerge("B-017", "K1-039", "duplicates audio; board writes the path as /status/users (audio '/data/users')",
       "The board writes the endpoint as 'GET /status/users ? ids = u1 , u2 , u3 , u4' (user -> API server -> database); "
       "the spoken '/data/users' is probably an ASR slip for 'status'. The brace label reads 'user ids for whom status "
       "need to be fixed' (probably 'fetched').",
       'check: spoken "slash data slash users" (00:25:35) vs board "GET /status/users" (00:24:15) - board likely right')
bmerge("B-018", "K1-042", "duplicates audio (push-based model)")
bmerge("B-019", "K1-041", "duplicates audio; board-only nuance 'unless there is a persistent connection'",
       "Board adds the exception: '* unless there is a persistent connection'.")
bmerge("B-020", "K1-044", "duplicates audio")
bmerge("B-021", "K1-047", "duplicates audio; board adds 'Subjective!'", "Board: how long is 'long enough' is "
       "'Subjective!'.")
bmerge("B-022", "K1-048", "duplicates audio")
bmerge("B-023", "K1-049", "duplicates audio", "Board example rows: u1 1000, u2 1050, u3 1060.")
bmerge("B-024", "K1-051", "duplicates audio; board adds that NOW() is in epoch seconds",
       "Board annotates NOW() as epoch seconds.")
bmerge("B-025", "K2-001", "same fact as the audio 'heartbeats every 10 seconds' (01:04:14); written earlier on the board "
       "(00:32:00) next to the getStatus logic",
       "The board already noted '* User sends heartbeat every 10 seconds' at 00:32:00, beside the 30-second offline "
       "threshold.")
bmerge("B-026", "K1-052", "duplicates audio (both getStatus rules; rule 2 is K1-053)",
       "Board logic covers both rules: no entry -> offline; entry.last_hb < NOW() - 30 sec -> offline; else online.")
bmerge("B-027", "K1-055", "duplicates audio")
bmerge("B-028", "K1-056", "duplicates audio")
bmerge("B-029", "K1-060", "duplicates audio (requirement check: all we care is online/offline)",
       "Board question: 'Can we do better on storage?' - requirement: all we care is online/offline.")
bmerge("B-030", "K1-060", "duplicates audio (absence == offline, expire after 30 seconds)")
bmerge("B-031", "K1-061", "duplicates audio (total entries = active users)")
bmerge("B-033", "K1-063", "duplicates audio")
bmerge("B-034", "K1-066", "duplicates audio")
bmerge("B-035", "K1-066", "duplicates audio ('don't reinvent the wheel')")
bmerge("B-036", "K1-067", "duplicates audio")
bmerge("B-037", "K1-068", "duplicates audio; board adds 'every heartbeat moves the expiration time forward'",
       "Board: 'Every heartbeat move the expiration time forward !'")
bmerge("B-038", "K1-070", "duplicates audio (persistence tick for DynamoDB); table header resolves F017")
bmerge("B-039", "K1-071", "duplicates audio (managed); board adds team size and expertise",
       "Board row: 'managed (* team size)' with '& experte' (expertise) below, ticked for DynamoDB.")
bmerge("B-040", "K1-075", "duplicates audio (vendor lock-in row, ticked for Redis)",
       "Board row 'vender lockin (cost/ issue/' ticked for Redis.")
bmerge("B-041", "K1-087", "duplicates audio (future extensibility, ticked for Redis)")
bmerge("B-042", "K1-092", "duplicates audio (time sensitivity, ticked for Redis); supports F031")
bmerge("B-043", "K1-069", "duplicates the audio question; board-only nuance 'Cost Estimation'",
       "Board: 'Which one would you pick & why ? * Cost Estimation' - cost estimation listed as a criterion (board only).")
bmerge("B-044", "K1-099", "duplicates audio")
bmerge("B-045", "K2-001", "duplicates audio; supports the 6 million figure (F035)")
bmerge("B-046", "K2-002", "duplicates audio; resolves F035 (6m, not 206 million)")
bmerge("B-047", "K2-042", "duplicates audio ('micro reads/updates, hence n/w bottleneck')")
bmerge("B-048", "K2-010", "duplicates audio", "Board: \"What's hectic? creating a new connection everytime\" -> "
       "Connection Pool, pre-established connections.")
bmerge("B-049", "K2-030", "duplicates audio")
bmerge("B-050", "K2-068", "duplicates audio", "Board: 'Any and every decision would affect one of these 6 factors'.")
bmerge("B-051", "K2-070", "duplicates audio", "Board: 'We take a look at key design decisions'.")
bmerge("B-052", "K2-071", "duplicates audio (users and blogs schema; blogs columns are K2-072)",
       "Board schema: users(id, name, bio); blogs(id, author_id, title, is_deleted, published_at, body).")
bmerge("B-053", "K2-073", "duplicates audio ('instead of DELETE we UPDATE')")
bmerge("B-054", "K2-084", "duplicates audio (recoverability, archival, audit)")
bmerge("B-055", "K2-086", "duplicates audio ('Eazy on the database engine [No tree re-balancing]'); resolves F088")
bmerge("B-056", "K2-090", "duplicates audio; board adds the type names LONGTEXT and VARCHAR",
       "Board: long text = LONGTEXT, stored as a reference; short text = VARCHAR, stored along with other columns.")
bmerge("B-057", "K2-109", "duplicates audio; board adds 'heavy on size and index' and the example format",
       "Board: 'datetime as datetime' - convenient, sub-optimal, heavy on size and index, serialized in some format "
       "(e.g. 02-04-2022 T 09:01:36 Z).")
bmerge("B-058", "K2-110", "duplicates audio (epoch integer: efficient, optimal, light weight)",
       "Board example value 172562347162 (12 digits; illustrative, epoch seconds in 2022 have 10 digits).",
       "check: board example value 172562347162 has 12 digits; epoch seconds in 2022 have 10 digits (fact-checker)")
bmerge("B-059", "K2-118", "duplicates audio (YYYYMMDD - 20220402)")
bmerge("B-060", "K2-137", "MySQL written next to the datetime section; duplicates the audio reference")
bmerge("B-061", "K3-003", "duplicates audio; board-only nuance 'reduces response times'",
       "Board: 'Caching - Reduces response times by saving any heavy computation'.")
bmerge("B-062", "K3-005", "duplicates audio")
bmerge("B-063", "K3-009", "duplicates audio (disk I/O, network I/O, compute); resolves F092")
bmerge("B-064", "K3-012", "duplicates audio; board adds 'with some advanced data structures'",
       "Board: 'Caches are just glorified Hash Tables with some advanced data structures'.")
bmerge("B-065", "K3-014", "duplicates audio (central cache shared by all API servers); resolves 'physically it sits over "
       "here' and F091",
       "Board diagram D-15: users -> LB -> three API servers -> Database, one central Cache box linked to all API "
       "servers (green links 02:14:45-02:16:45).")
bmerge("B-066", "K3-021", "duplicates audio (fun exercise, central RAM cache example)")

# B-032: board-only content -> its own item
B = board["B-032"]
new = dict(B)
new.update({"orig_ids": ["B-032"], "merged_from": [], "origin": "board",
            "topic": "online-offline-indicator > estimation", "depends_on": ["K1-061", "K1-056"],
            "board_text": [B["verbatim"]]})
items["B-032"] = new
seq["B-032"] = seq["K1-063"] - 0.5
LOG["board"].append(("B-032", None, "board-only: 100k active users -> 800 KB is never said in the audio", B["verbatim"],
                     False))


# ---------------------------------------------------------------------------------------------------------------
# 5. Flag resolutions (flag_resolutions.md)
# ---------------------------------------------------------------------------------------------------------------
def resolve(k, fid, marker_sub, evidence, raise_conf=True, flag_text=None):
    K = items[k]
    hit = [f for f in K["flags"] if marker_sub in f]
    if hit:
        K["flags"] = [f for f in K["flags"] if f not in hit]
    else:
        hit = [flag_text] if flag_text else []
    K.setdefault("resolved_by", []).append("board %s (%s: %s)" % (evidence[0], fid, evidence[1]))
    K["resolved_flags"] = K.get("resolved_flags", []) + hit
    old = K["confidence"]
    if raise_conf and not K["flags"] and old != "high":
        K["confidence"] = "high"
    LOG["flag"].append((k, "%s resolved_by board %s (%s); flag %s; confidence %s -> %s" % (
        fid, evidence[0], evidence[1], "removed" if K["resolved_flags"] else "n/a", old, K["confidence"])))


def support(k, fid, marker_sub, evidence, flag_text=None):
    K = items[k]
    done = False
    new = []
    for f in K["flags"]:
        if marker_sub in f and not done:
            f = f + " [supported_by board %s]" % evidence[0]
            done = True
        new.append(f)
    if not done and flag_text:
        new.append(flag_text + " [supported_by board %s]" % evidence[0])
    K["flags"] = new
    K.setdefault("supported_by", []).append("board %s (%s: %s)" % (evidence[0], fid, evidence[1]))
    LOG["flag"].append((k, "%s supported_by board %s (%s); flag kept and annotated; confidence %s unchanged" % (
        fid, evidence[0], evidence[1], K["confidence"])))


resolve("K1-007", "F004", "course platform", ("00:03:45", "rules page: '1:1 is through relog', 'learn.relog.in'"))
resolve("K1-021", "F007", "online offline", ("00:15:00", "heading 'Online Offline Indicator'"))
resolve("K1-070", "F017", "DynamoDB", ("00:47:30", "table header 'DynamoDB' with persistence/managed ticks"),
        flag_text='asr: [?DynamoDB | asr: "Dynamite"] (00:47:58, not previously listed in flags)')
resolve("K1-072", "F019", "locked", ("00:50:15", "row 'vender lockin (cost/ issue/'"))
resolve("K2-002", "F035", "206 million", ("01:04:45", "'Our DB needs to handle 6m updates per minute !!', no 206 anywhere"))
resolve("K2-033", "F044", "collection", ("01:22:00", "connection pool section: 'creating a new connection everytime'"))
resolve("K2-033", "F045", "location", ("01:22:00", "same connection pool section"))
resolve("K2-039", "F050", "distribution", ("01:22:30", "connection pool D-11, one connection traced with a reuse loop"))
resolve("K2-104", "F068", "Date time", ("01:56:45", "'Storing datetime in DB' / 'datetime as datetime'"))
resolve("K2-104", "board B-057", "example string", ("01:56:45", "board writes the example as '02-04-2022 T 09:01:36 Z'"))
add_detail("K2-104", "The board writes the example as '02-04-2022 T 09:01:36 Z' (01:56:45), i.e. 2 April 2022, "
                     "09:01:36.")
resolve("K2-109", "F069", "storing date as a date", ("01:56:45", "'datetime as datetime' with 'conventient' below"))
resolve("K2-111", "F072", "integer or", ("01:57:03", "'datetime as epoch integer'"))
resolve("K2-120", "F078", "epoch integers", ("02:02:00", "'datetime as epoch integer' on screen"))
resolve("K2-129", "F086", "epoch integer", ("02:06:00", "zoomed-out datetime section with 'datetime as epoch integer'"))
resolve("K2-131", "F088", "DataWare", ("02:08:30", "'+ Eazy on the database engine [No tree re-balancing]'"))
resolve("K3-018", "F091", "API", ("02:14:30", "D-15: three API boxes linked to the Cache"))
resolve("K3-019", "F092", "IO", ("02:14:15", "'Typical use: reduce disk I/O or network I/O or compute'"))

support("K1-092", "F031", "persistent relations", ("01:00:30", "'unless there is a persistent connection' (00:26:00); "
                                                   "'time sensitivity' row written ~01:00:30"))
support("K2-052", "F056", "bottleneck", ("01:27:00", "'Hence n/w bottleneck'; '3. identify the bottleneck' at 00:16:30"))
support("K2-069", "F065", "day one", ("01:03:30", "'Since it is day 1' (00:15:00) and 'this is Day 1' (01:03:30)"))
support("K2-109", "F070", "date object", ("01:56:45", "datetime section on screen; 'date object' not written"))
support("K2-109", "F071", '[?date | asr: "data"]', ("01:56:45", "datetime section on screen"))
support("K2-134", "F089", "four bytes", ("00:34:00", "'int (4B)', 'Size of each entry = 8B'"))
support("K3-043", "F102", "blog", ("01:41:30", "'blogs' table, '- body', 'delete blog'"))
support("K3-065", "F114", "to delete", ("00:41:00", "'How to auto delete ?' / 'Approach 1: Write a CRON job that deletes "
                                                    "expired entries'"))
support("K3-088", "F137", "DBI", ("01:05:30", "connection pool diagram 'Server' = 'DB' (D-11)"))
support("K3-088", "F138", "pulling", ("01:05:30", "'Connection Pool' / 'pre-established connections'"))
support("K1-016", "F006 (related note)", "onwards", ("00:11:00", "'* Brainsterming starts next week' agrees, word not "
                                                                 "shown"))
# K3-014's "over here" is not a transcript marker; resolved through B-065 (logged under board decisions and here)
items["K3-014"].setdefault("resolved_by", []).append("board 02:14:45 (gap-report fix: 'physically it sits over here' = "
                                                     "the central Cache box of D-15)")
LOG["flag"].append(("K3-014", "'physically it sits over here' (hunter note, no flag) resolved_by board 02:14:45 (D-15 "
                              "central Cache box); confidence high unchanged"))

# ---------------------------------------------------------------------------------------------------------------
# 6. Topic normalisation
# ---------------------------------------------------------------------------------------------------------------
TOPIC_EXACT = {
    "online-offline > scale estimation": "online-offline-indicator > scale-estimation",
    "admin > deferred topics": "admin > course-structure",
    "databases > managed vs self-hosted": "databases > redis-vs-dynamodb > managed",
    "redis-vs-dynamodb > ttl": "online-offline-indicator > expiry > ttl",
    "trade-offs": "design-approach > trade-offs",
    "learning approach": "design-approach > learning-approach",
    "system design > avoiding-db-specific-features": "design-approach > avoiding-db-specific-features",
    "fundamentals > four-resources": "scaling > fundamentals",
}
TOPIC_ID = {
    "K3-081": "design-approach > core-property",
    "K2-138": "databases > date-time > mysql",
}
TOPIC_PREFIX = [
    ("online-offline indicator", "online-offline-indicator"),
    ("database > ", "databases > "),
    ("redis-vs-dynamodb > ", "databases > redis-vs-dynamodb > "),
    ("connection-pooling > ", "concurrency > connection-pooling > "),
]


def norm_topic(t, i):
    if i in TOPIC_ID:
        return TOPIC_ID[i]
    if t in TOPIC_EXACT:
        return TOPIC_EXACT[t]
    for a, b in TOPIC_PREFIX:
        if t.startswith(a):
            t = b + t[len(a):]
    return " > ".join(p.strip().replace(" ", "-") for p in t.split(">"))


topic_changes = {}
for i, it in items.items():
    old = it["topic"]
    new = norm_topic(old, i)
    if new != old:
        it["topic"] = new
        topic_changes.setdefault((old, new), []).append(i)

# ---------------------------------------------------------------------------------------------------------------
# 7. Order, renumber, depends_on, id_map
# ---------------------------------------------------------------------------------------------------------------
TS = re.compile(r"(\d+):(\d+):(\d+)")


def secs(s):
    h, m, x = map(int, TS.match(s).groups())
    return h * 3600 + m * 60 + x


def first_time(it):
    a = [secs(r.split("-")[0]) for r in it["source"]["audio"]]
    if a:
        return min(a)
    return min(secs(b) for b in it["source"]["board"])


for g in ["G-001", "G-002", "G-003", "G-004"]:
    dep = [d for d in items[g]["depends_on"] if d in seq]
    seq[g] = max(seq[d] for d in dep) + 0.5 if dep else seq[g]

order = sorted(items, key=lambda i: (first_time(items[i]), seq[i]))
lid = {i: "L-%04d" % (n + 1) for n, i in enumerate(order)}
id_map = {}
for i in order:
    for o in items[i]["orig_ids"]:
        id_map[o] = lid[i]
assert set(id_map) == set(all_orig), set(all_orig) ^ set(id_map)


def to_l(x):
    while x in absorbed_into:
        x = absorbed_into[x]
    return lid[x] if x in lid else id_map[x]


FIELDS = ["id", "orig_ids", "origin", "type", "statement", "detail", "topic", "case_study", "source", "speaker",
          "status", "verbatim", "depends_on", "confidence", "flags", "importance", "merged_from"]
EXTRA = ["merged_verbatims", "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags", "edits"]
out = []
for i in order:
    it = items[i]
    it["origin"] = "both" if it["source"]["audio"] and it["source"]["board"] else (
        "audio" if it["source"]["audio"] else "board")
    deps = []
    for d in it["depends_on"]:
        l = to_l(d)
        if l != lid[i] and l not in deps:
            deps.append(l)
    rec = {"id": lid[i]}
    for f in FIELDS[1:]:
        rec[f] = it[f]
    rec["depends_on"] = deps
    for f in EXTRA:
        if it.get(f):
            rec[f] = it[f]
    out.append(rec)

with open(os.path.join(D, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for r in out:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")


def idkey(k):
    p = {"K": 0, "G": 1, "B": 2}[k[0]]
    m = re.match(r"[KGB](\d*)-(\d+)", k)
    return (p, int(m.group(1) or 0), int(m.group(2)))


with open(os.path.join(D, "id_map.json"), "w", encoding="utf-8") as f:
    json.dump({k: id_map[k] for k in sorted(id_map, key=idkey)}, f, indent=1)

# ---------------------------------------------------------------------------------------------------------------
# 8. ledger_changes.md
# ---------------------------------------------------------------------------------------------------------------
L = lambda x: id_map[x]
W = []
W.append("# Lecture 04 ledger - changes log\n")
W.append("Inputs: part1-3.jsonl (348 K items), gaps.jsonl (4 G items), gap_report.md, board/board_items.jsonl (66 B "
         "items), board/flag_resolutions.md, transcript.md. Output: ledger.jsonl (final IDs L-0001.. in teaching order = "
         "first audio timestamp, board time for board-only items; ties keep the original part order). Old->new IDs in "
         "id_map.json. Every hunter fix was re-checked against transcript.md before it was applied. Helper script: "
         "build_ledger.py (holds every decision below; does the renumbering, id_map and this log).\n")
W.append("## Distortion fixes (%d lines)\n" % len(LOG["fix"]))
for i, log in LOG["fix"]:
    W.append("- %s: %s [final %s]" % (i, log, L(i)))
W.append("\n## Duplicate merges (%d pairs; absorbed item -> kept item)\n" % len(LOG["merge"]))
for a, k, why in LOG["merge"]:
    W.append("- %s -> %s: %s; absorbed nuance moved to the kept item's detail, absorbed verbatim kept in "
             "merged_verbatims, sources and flags unioned [final %s]" % (a, k, why, L(a)))
W.append("\n## Partial overlaps cross-linked via depends_on instead of merged (%d links)\n" % len(LOG["xlink"]))
W.append("Each side adds its own nuance (or the pair is deliberately opposite, e.g. K1-089/K1-093 converging vs own "
         "feature sets - both kept as is, no link needed beyond K1-093 -> K1-090). Format: item -> now depends on.\n")
for a, b, why in LOG["xlink"]:
    W.append("- %s -> %s: %s [final %s -> %s]" % (a, b, why, L(a), L(b)))
W.append("\n## Board decisions (%d B-items) - one line per B id\n" % len(LOG["board"]))
for b, k, why, txt, nuance in LOG["board"]:
    if k:
        W.append("- %s -> merged into %s (%s)%s: \"%s\" [final %s]" % (
            b, k, why, "; board nuance added to detail" if nuance else "", txt, L(b)))
    else:
        W.append("- %s -> new item (%s): \"%s\" [final %s]" % (b, why, txt, L(b)))
W.append("\n## Flag resolutions from the board - one line per item touched\n")
for k, log in LOG["flag"]:
    W.append("- %s: %s [final %s]" % (k, log, L(k)))
W.append("\n## Topic normalisation\n")
W.append("One tree: hyphenated lower-case segments; `online-offline-indicator > ...` for the indicator (part 2's "
         "`online-offline > scale estimation` and part 3's `online-offline-indicator` joined); `databases > ...` for "
         "everything database (part 3's `database > soft-delete`, `database > indexes`, `redis-vs-dynamodb > ...`); "
         "`concurrency > connection-pooling > ...` for every pool item (part 3's `connection-pooling > ...`); "
         "trade-off, learning and DB-feature rules under `design-approach`; deferred-topic notes under "
         "`admin > course-structure`. `caching > fun-exercise` stays under caching on purpose: the exercise is caching "
         "content (places to cache), not logistics.\n")
for (old, new), ids in sorted(topic_changes.items()):
    W.append("- `%s` -> `%s`: %s" % (old, new, ", ".join("%s [%s]" % (i, L(i)) for i in sorted(ids))))
W.append("\n## Rejected or modified hunter suggestions (with reason)\n")
W += [
    "- K1-057 + G-001 / K2-003 (merge with the K1 number kept): not merged. K2-003 adds the core point 'computation, not "
    "storage, is the challenge' that opens connection pooling; merging would move it to 00:35. Instead K2-003 got a "
    "flag on '8 GB for 1 million entries' (slip vs K1-056's 1 billion) and depends_on K1-057/G-001 [final %s]." % L("K2-003"),
    "- K1-054 / K2-111 (merge epoch definitions): cross-linked instead; each anchors its own section (heartbeat storage vs "
    "date-time column) and K2-111 adds milliseconds and 'where the clock started ticking' [final %s, %s]." % (
        L("K1-054"), L("K2-111")),
    "- K2-037 + K2-038 / K1-097 / K3-083 (merge all into one): only K3-083 merged into K2-038 (same 'throw money' "
    "advice). K1-097 (teacher's own point at 01:02) and K2-037 (answer to a specific autoscaling question) stay "
    "separate and cross-linked, so no Q&A context is lost [final %s, %s, %s]." % (L("K1-097"), L("K2-037"), L("K2-038")),
    "- K2-037 / K3-082 (merge): cross-linked; K3-082 is a different argument (autoscaling is a property of engineering "
    "teams) [final %s]." % L("K3-082"),
    "- K2-079 / K3-077 and K2-078 / K3-076 (merge across parts): K3-076 merged into K3-077 (same answer), then K3-077 "
    "cross-linked to K2-078/K2-079 instead of merged: lecture process vs Q&A clarification with its own reasons "
    "(per-row S3 copy is slow) [final %s]." % L("K3-077"),
    "- K2-130/131/132 / K3-029 / K3-049 / K3-062 (merge carefully): only K3-049 merged into K3-062 (same Q&A thread). "
    "Rebalancing (part 2) and load/garbage-collection (part 3) reasons stay in separate cross-linked items.",
    "- K2-115 / K2-129 (Redbus): cross-linked, not merged - K2-129 is the later answer to 'why not epoch?' "
    "[final %s]." % L("K2-129"),
    "- K3-041 / K3-045: kept both (different reasons: key-value store vs network bandwidth), cross-linked.",
    "- K3-003 / K3-006 / K3-009: K3-006 merged into K3-003; K3-009 (the three things a cache saves) kept separate as "
    "the rule [final %s, %s]." % (L("K3-003"), L("K3-009")),
    "- K2-122: of the two fixes offered, chose speaker -> teacher (the answer is the insight), status endorsed for the "
    "teacher's answer; the student's objection is recorded in detail rather than marked rejected [final %s]." % L("K2-122"),
    "- K2-013 / K2-016 and K2-121 / K2-128: hunter offered no preference; merged (same claims restated a minute later).",
    "- All other hunter suggestions were applied as written.",
    "- Note (not a hunter item): part 3 sources use sub-segment times (e.g. 02:12:25-02:12:35) interpolated inside "
    "transcript segments; left as the analyst wrote them.",
]
W.append("\n## Validation\n")
W.append("VALIDATION_LINE")
CH = os.path.join(D, "ledger_changes.md")
open(CH, "w", encoding="utf-8").write("\n".join(W) + "\n")

# run the final validator and record its summary line in the log
import subprocess  # noqa: E402
PROJ = os.path.dirname(os.path.dirname(LEC))
res = subprocess.run(["python3", os.path.join(PROJ, ".claude", "skills", "lecture-ledger", "scripts", "validate_ledger.py"),
                      "final", D, "--board", os.path.join(LEC, "board", "board_items.jsonl"),
                      "--transcript", os.path.join(LEC, "transcript", "transcript.md")], capture_output=True, text=True)
lines = res.stdout.strip().splitlines()
summary = "\n".join(l for l in lines if l.startswith(("originals:", "PASS", "FAIL")))
summary = summary.replace(D, "lectures/lec04/ledger")
text = open(CH, encoding="utf-8").read().replace("VALIDATION_LINE", summary)
open(CH, "w", encoding="utf-8").write(text)
print(res.stdout[-3000:])
print("final items", len(out), "merged", len(LOG["merge"]), "board merged", sum(1 for x in LOG["board"] if x[1]),
      "board new", sum(1 for x in LOG["board"] if not x[1]))
