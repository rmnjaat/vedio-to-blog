#!/usr/bin/env python3
"""Editor build for the lecture 07 ledger.

Mechanical part only: every decision (fix, merge, board decision, flag resolution, cross-link, topic map) is
written out below by the editor and logged to ledger_changes.md with its final L id.
Run: python3 build_ledger.py  (from anywhere)
"""
import json
import os
import re
from collections import OrderedDict

D = os.path.dirname(os.path.abspath(__file__))
LEC = os.path.dirname(D)


def load(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


items = OrderedDict()
seq = {}
for p in ["part1.jsonl", "part2.jsonl", "part3.jsonl", "gaps.jsonl"]:
    for it in load(os.path.join(D, p)):
        it["orig_ids"] = [it["id"]]
        it["merged_from"] = []
        items[it["id"]] = it
        seq[it["id"]] = len(seq)
board = OrderedDict((b["id"], b) for b in load(os.path.join(LEC, "board", "board_items.jsonl")))

log = {"fix": [], "merge": [], "xlink": [], "board": [], "flag": [], "topic": [], "reject": []}
absorbed_into = {}  # original id -> kept original id


def root(i):
    while i in absorbed_into:
        i = absorbed_into[i]
    return i


def add_detail(it, text):
    it["detail"] = (it["detail"] + " " + text) if it.get("detail") else text


def edit(it, note):
    it.setdefault("edits", []).append(note)


def repl(i, field, old, new):
    it = items[i]
    assert old in it[field], (i, field, old)
    it[field] = it[field].replace(old, new)


def set_field(i, field, new, note, logline):
    items[i][field] = new
    edit(items[i], note)
    log["fix"].append((i, logline))


# ---------------------------------------------------------------- 1. distortion fixes (gap_report.md, re-checked)
def fixes():
    # ---- part 1
    it = items["K1-124"]
    it["statement"] = ("A student proposed writing your own wrapper around malloc (and a second function, ASR unclear, probably free) "
                       "to keep the count; the teacher confirmed (\"Exactly\").")
    edit(it, "distortion fix: 'and free' no longer asserted (ASR [unclear: \"lid\"])")
    log["fix"].append(("K1-124", "statement no longer asserts 'malloc and free': now 'malloc (and a second function, ASR unclear, probably free)' (transcript 00:53:23 'wrapper around malloc and [unclear: \"lid\"]'); flag kept, confidence stays medium"))

    add_detail(items["K1-099"], "The teacher endorsed saving bits (Redis uses 4 bits for the type) but kept the type inside the value object, "
                                "because Redis stores other meta information there too (K1-102). He did not endorse moving the type to the key.")
    edit(items["K1-099"], "distortion fix: endorsement limited to the bit-economy argument")
    log["fix"].append(("K1-099", "detail says the teacher endorsed only the bit-saving point and kept the type in the value object ('Redis stores a lot of other meta information also along with this. That's why we wrapped it in a object', 00:41:58); he did not endorse moving the type to the key"))

    add_detail(items["K1-114"], "At 00:47:49 the teacher credits Student 6 with the 'size plus equal to' idea (\"Thanks Gaurav for bringing that up, "
                                "that you probe that size plus equal to something\"), so the refinement may be the student's own.")
    edit(items["K1-114"], "distortion fix: teacher's later credit to Student 6 added")
    log["fix"].append(("K1-114", "detail adds the teacher's credit at 00:47:49 ('Thanks Gaurav ... size plus equal to something'): the refinement may be the student's own; flag and status kept"))

    add_detail(items["K1-115"], "First raised by Student 6 (\"We can find the size of this key-value pair. However, we cannot find the size of this value\"); "
                                "the teacher confirmed (\"Correct. Now that's what the challenge is\") and explained the sizeof example.")
    edit(items["K1-115"], "distortion fix: Student 6 credited as first raising the point")
    log["fix"].append(("K1-115", "detail credits Student 6 with first raising the point (00:47:04), teacher confirmed 'Correct' (00:47:22); speaker stays teacher for the explanation"))

    it = items["K1-106"]
    it["detail"] = ("The teacher first answered \"No, you have to write it\" (meaning unclear in the audio; possibly that moving data to disk "
                    "is something you would have to write yourself). " + it["detail"])
    it["flags"].append("check: meaning of \"you have to write it\"")
    edit(it, "distortion fix: teacher's first words kept in detail, flag added")
    log["fix"].append(("K1-106", "detail starts with the teacher's first words 'No, you have to write it' (00:43:56), hedged: the hunter's reading ('you would have to write it yourself') is kept only as 'possibly'; added flag `check: meaning of \"you have to write it\"`; confidence stays high (correction itself is clear: segfault)"))

    items["K1-062"]["confidence"] = "medium"
    edit(items["K1-062"], "distortion fix: confidence high -> medium (carries an ASR flag)")
    log["fix"].append(("K1-062", "confidence high -> medium (item carries `asr: [?write | asr: \"right\"]`, hard rule 6)"))

    set_field("K1-016", "statement",
              "Querying the production database directly from a dashboard tool works very well for a Series A company, up to roughly 10,000-50,000 users.",
              "distortion fix: 'until about Series A' -> 'for a Series A company'",
              "'works fine until about Series A' -> 'works very well for a Series A company, up to roughly 10,000-50,000 users' (transcript 00:06:07 'Works very well for Series A, till company, till 10,000, 50,000 users')")

    set_field("K1-007", "statement",
              "So far in the course CDC was only mentioned (written) in designs; this session goes deeper into CDCs and into how tiered storages are built.",
              "distortion fix: 'written as a box' -> 'only mentioned (written)'",
              "'only written as a box in designs' -> 'only mentioned (written) in designs' (transcript 00:02:15 'Up until now, we just wrote CDC'; the 'boxes' remark at 00:14:00 is about today's diagram)")

    it = items["K1-011"]
    it["statement"] = ("Flow for today: tiered storage first, then questions, then the distributed cache low-level implementation, then a break, "
                       "then something unclear in the audio.")
    it["detail"] = ("The session actually opens with ETL/CDC as the tiered-storage introduction. The unclear last words ([unclear: \"file our details\"]) "
                    "are possibly the remaining (high-level) details - an interpretation, not heard.")
    edit(it, "distortion fix: inferred '(ETL/CDC)' and '(high-level) details' moved out of the statement")
    log["fix"].append(("K1-011", "statement now 'tiered storage first, then questions, then the distributed cache low-level implementation, then a break, then something unclear in the audio'; '(ETL/CDC)' and '(high-level) details' moved to detail as interpretation (transcript 00:04:22)"))

    items["K1-122"]["flags"].append("check: student may have meant \"we need to allocate memory on heap for that as well\"; teacher's \"Why not?\" reads it as a negative")
    edit(items["K1-122"], "distortion fix: flag on the student's possibly-question wording")
    log["fix"].append(("K1-122", "added flag `check: student may have meant \"we need to allocate memory on heap for that as well\"; teacher's \"Why not?\" reads it as a negative`; status proposed_then_corrected and confidence medium kept"))

    # K1-096 / K1-097 overlap (hunter duplicate note): K1-096 keeps the proposal and the objection, K1-097 owns the design
    it = items["K1-096"]
    it["statement"] = "A student proposed storing type metadata with the key, since everything is accessed via the key."
    it["detail"] = ("Teacher's correction: the key is a string, and prefixing it or turning it into an object makes lookups complicated (dereferencing "
                    "every time); better to keep the key a normal key and put the type in the value (the design itself is K1-097). "
                    + it["detail"])
    edit(it, "overlap cleanup: teacher's counter-proposal moved from statement to detail (K1-097 owns the design)")
    log["fix"].append(("K1-096", "overlap with K1-097 (hunter duplicate note): statement keeps only the student proposal; the teacher's lookup-complexity objection and 'type in the value' counter moved to detail (schema: correction in detail for proposed_then_corrected); nothing dropped"))

    # ---- part 2
    it = items["K2-048"]
    it["detail"] = ("The teacher first echoes 'Payload size is huge. Why?', then corrects only the reason: transferring the value is true for any "
                    "protocol, so it is not what makes HTTP worse; he then moved on to the other options. The overhead he later demonstrates "
                    "is HTTP's request line and headers (see K2-063).")
    edit(it, "distortion fix: correction limited to the student's reason")
    log["fix"].append(("K2-048", "detail: teacher echoed 'Payload size is huge. Why?' (01:20:13) and corrected only the reason ('That is true for anything that you use', 01:20:27); later HTTP overhead is the request line/headers; cross-linked (K2-063 depends_on K2-048); status proposed_then_corrected kept (the reason was corrected)"))

    it = items["K2-057"]
    it["source"]["board"] = ["01:25:45"]
    it["detail"] = ("The audio spells 'u s e r'; the screen-shared blog shows `User-Agent: ...`, `Host: www.sample-server.com`, "
                    "`Accept-Language: en-us` ... (highlighted 01:25:45).")
    edit(it, "distortion fix: User-Agent sourced to the board")
    log["fix"].append(("K2-057", "added source.board 01:25:45; detail says the audio spells 'u s e r' and 'User-Agent', 'Host', 'Accept-Language' come from the screen-shared blog (board_log S23)"))

    it = items["K2-093"]
    it["source"]["board"] = ["01:43:30"]
    it.setdefault("board_text", []).append("CAS ( a, 20, 10 ) / CAS ( a, 30, 10 )")
    edit(it, "distortion fix: CAS notation sourced to the board")
    log["fix"].append(("K2-093", "added source.board 01:43:30 and board_text 'CAS ( a, 20, 10 ) / CAS ( a, 30, 10 )' (the CAS(a, 20, 10) notation is board-only; audio: 'I want to change a to 20 when my current value is 10')"))

    set_field("K2-101", "statement",
              "Asked how to design LRU/LFU at a high level under memory constraints, the teacher answers 'You cannot do that' - it is a very deep "
              "implementation - so go with random eviction, which is very low on memory, needs no additional data and only risks deleting an important key.",
              "distortion fix: inferred 'cheaply' removed",
              "'it cannot be done cheaply' -> the teacher's 'You cannot do that' - a very deep implementation - so go with random (transcript 01:46:11)")

    it = items["K2-102"]
    it["detail"] = ("Raised by Student 2 (something the teacher shared - word unclear - on an O(1) LFU with very high memory); the teacher confirms "
                    "'Exactly' and states the time/space trade-off.")
    it["flags"].append("check: \"But it's not that, which is why people don't use it\" - ambiguous")
    edit(it, "distortion fix: Student 2 credited, ambiguity flagged")
    log["fix"].append(("K2-102", "detail credits Student 2 with the O(1)-LFU/high-memory point (01:46:29), teacher 'Exactly' (01:46:44); added flag on the ambiguous 'which is why people don't use it' (01:46:53); confidence stays medium"))

    add_detail(items["K2-083"], "Because keys in a cache are very likely to be accessed, most expired keys get caught on access.")
    edit(items["K2-083"], "distortion fix: teacher's reason added")
    log["fix"].append(("K2-083", "detail adds the reason: keys in a cache are very likely to be accessed (transcript 01:37:02 'most of the keys in cache, that's how the cache works. You are very likely to access the key')"))

    it = items["K2-107"]
    it["statement"] = "Make the cache distributed when one node cannot handle the load (or hold the data): the cache is spread across multiple machines."
    it["source"]["audio"].append("01:55:50-01:56:52")
    edit(it, "distortion fix: 'or hold the data' restored, source added")
    log["fix"].append(("K2-107", "statement adds '(or hold the data)' and source 01:55:50-01:56:52 (transcript 'one node is not enough to handle the data or the load')"))

    add_detail(items["K2-117"], "The teacher calls the notification burden okay, but still the disadvantage.")
    edit(items["K2-117"], "distortion fix: hedge kept")
    log["fix"].append(("K2-117", "detail keeps the hedge 'That's okay. But that is the disadvantage of that.' (02:01:38)"))

    repl("K2-123", "statement", "let nodes forward for each other.",
         "let nodes forward for each other; or make it like DNS - the node tells you where to go and you connect directly ('Pick your favorite, whatever works, works for you').")
    edit(items["K2-123"], "distortion fix: fourth (DNS-like) option added")
    log["fix"].append(("K2-123", "statement appends the DNS-like redirect option and 'Pick your favorite, whatever works, works for you' (transcript 02:05:14)"))

    it = items["K2-007"]
    it["flags"] = ["check: \"four bits or something like that\", \"24 bits\" then \"28 bits\", and \"This becomes two integers\" - sizing said loosely"]
    edit(it, "distortion fix: flag extended to all loose sizing")
    log["fix"].append(("K2-007", "flag extended to `check: \"four bits or something like that\", \"24 bits\" then \"28 bits\", and \"This becomes two integers\" - sizing said loosely` (01:00:32); confidence stays medium"))

    items["K2-046"]["flags"].append("check: speaker of \"Why?\" (Teacher?)")
    edit(items["K2-046"], "distortion fix: speaker flag")
    log["fix"].append(("K2-046", "added flag `check: speaker of \"Why?\" (Teacher?)` (transcript 01:19:37 'Teacher?: Why?')"))

    items["K2-105"]["flags"].append("check: speaker of \"Value of node.\" (Teacher?)")
    edit(items["K2-105"], "distortion fix: speaker flag")
    log["fix"].append(("K2-105", "added flag `check: speaker of \"Value of node.\" (Teacher?)` (01:48:35); confidence stays high (the teacher's next turn carries the point)"))

    # ---- part 3
    set_field("K3-016", "statement",
              "Consistent hashing is usually drawn as a ring; that is the simplest visual representation; for the implementation, read the blog.",
              "distortion fix: 'the implementation is different' removed",
              "'but the implementation is different (read the blog for it)' -> 'for the implementation, read the blog' (transcript 02:13:48 'But implementation, read that part')")

    repl("K3-014", "statement", "it takes very little space", "it does not take a huge amount of space")
    edit(items["K3-014"], "distortion fix: teacher's wording restored")
    log["fix"].append(("K3-014", "'it takes very little space' -> 'it does not take a huge amount of space' (transcript ~02:13:10)"))

    items["K3-077"]["source"]["audio"].append("02:46:31-02:47:07")
    edit(items["K3-077"], "distortion fix: source for 'repeatedly at the same point'")
    log["fix"].append(("K3-077", "added source 02:46:31-02:47:07, where 'repetitively at the same point' is said"))

    set_field("K3-103", "statement",
              "SIGABRT is mostly not something you can handle (there are some ways): it signals that the instruction pipeline is done; you can still "
              "execute some last code, but the process is killed. The teacher: the program does crash, you can't handle much; he will refine the course material for the next quarter.",
              "distortion fix: Student 2's hedge 'there are ways you can handle' kept",
              "'SIGABRT cannot really be handled' -> 'mostly not something you can handle (there are some ways)' (transcript 02:56:04 'I mean, there are ways you can handle')")

    it = items["K3-110"]
    it["flags"].append("check: \"Use it 2015\" (probably \"used it in 2015\")")
    it["confidence"] = "medium"
    edit(it, "distortion fix: flag on 'Use it 2015'")
    log["fix"].append(("K3-110", "added flag `check: \"Use it 2015\" (probably \"used it in 2015\")`; confidence high -> medium"))

    set_field("K3-111", "statement",
              "The odd behaviour could also be a bug; in most cases the deadlock file's data is, the teacher thinks, very hard to interpret - that is the gap "
              "between practical understanding and production, where things go berserk and nobody knows what is happening.",
              "distortion fix: hedges 'in most cases' / 'I think' kept",
              "'deadlock data is very hard to interpret' -> 'in most cases ... is, the teacher thinks, very hard to interpret' (transcript 03:02:20)")

    it = items["K3-117"]
    it["speaker"] = "teacher"
    it["detail"] = ("Answer to Student 7's question (03:04:33) whether one CDC can push to several sinks such as Elasticsearch and Redshift: "
                    "'It does that. I drew it separately so that it's very visual.'")
    edit(it, "distortion fix: speaker student (question) -> teacher")
    log["fix"].append(("K3-117", "speaker student (question) -> teacher (the insight is the teacher's answer 'It does that. I drew it separately so that it's very visual', 03:04:45); the student's question kept in detail"))

    add_detail(items["K3-122"], "Database types overlap in both courses because \"you folks also need to know when not to use a particular database\".")
    edit(items["K3-122"], "nuance added from hunter note")
    log["fix"].append(("K3-122", "detail adds the reason for the overlap: 'you folks also need to know when not to use a particular database' (hunter nuance note, 03:09:17)"))


# ---------------------------------------------------------------- 4. flag resolutions (flag_resolutions.md)
RESOLVED = [
    ("K1-052", "F011", "[?Redshift | asr: \"restaurant\"]", "00:18:15", "cylinder 'Redshift' under 'Analytics' in the multi-tier CDC diagram"),
    ("K1-075", "F021", "[?MySQL | asr: \"my skills\"]", "00:28:45", "'MySQL' (Transactional) on screen in the multi-tier diagram"),
    ("K1-077", "F023", "[?MySQL | asr: \"my school\"]", "00:30:30", "same 'MySQL' cylinder on screen 00:29:00-00:30:30"),
    ("K1-084", "F029", "[?TTL | asr: \"ETL\"]", "00:32:00", "requirements page '- GET, PUT, DEL, TTL'"),
    ("K1-096", "F032", "[?a way | asr: \"to wave\"]", "00:39:00", "'Way to represent type' written 00:36:15-00:39:00"),
    ("K1-096", "F033", "unclear: \"Pay to represent.\"", "00:39:00", "same line 'Way to represent type'"),
    ("K2-003", "F059", "[?full | asr: \"sold\"]", "00:58:05", "'cache full' circled in red; eviction page started 00:58:15"),
    ("K2-022", "F069", "[?LFU | asr: \"elephant\"]", "01:06:00", "'LFU' on the eviction page 01:02:15-01:06:00"),
    ("K2-026", "F070", "[?random | asr: \"remote\"]", "01:09:15", "pink 'Random' added as the third eviction strategy"),
    ("K2-058", "F084", "[?T H I S | asr: \"T H I A\"]", "01:27:00", "screen-shared netcat input 'This is a sample' and its 400 response"),
    ("K2-072", "F090", "[?Single-node | asr: \"Single-lot\"]", "01:32:24", "recap page heading 'Single node cache'"),
    ("K2-079", "F095", "[?LRU bits | asr: \"a large bids\"]", "01:35:39", "green 'lru_bits 28' field in the value struct"),
    ("K2-086", "F097", "[?TTL | asr: \"ETN\"]", "01:37:45", "TTL page 'Handling TTLs: ... Sampling [Redis]'"),
    ("K2-091", "F100", "[?locks | asr: \"blocks\"]", "01:40:15", "'ACQ_LOCK()' / 'REL_LOCK()', 'Atomic variables to keep track of locks'"),
    ("K2-096", "F102/F103", "[?compare and swap | asr: \"comparison\"]", "01:43:30", "'Implementation: Compare and Swap', 'CAS ( a, 20, 10 )'"),
    ("K2-097", "F104", "[?single threadedness | asr: \"single threaded test\"]", "01:45:00", "concurrency list '- Single threaded'"),
    ("K3-002", "F127", "[?hash based routing | asr: \"hash based out\"]", "02:09:00", "'Issues with hash-based routing' page; 'Hash-based routing i = hash(key) % 3' at 02:07:15"),
    ("K3-016", "F130", "[?consistent hashing | asr: \"considering everything\"]", "02:13:30", "'Consistent Hashing: For determining ownership'"),
    ("K3-038", "F138-F141", "[?cache five | asr: \"cache file\"]", "02:22:45", "adding page 'cache 5' / 'we create cache 5 using cache 1'"),
    ("K3-042", "F142", "unclear: \"Storytorn\"", "02:23:24", "DHT page 'BitTorrent uses DHTs'"),
    ("K3-079", "F156", "[?CDCs | asr: \"cities\"]", "02:43:15", "multi-tier 'CDC' diagram on screen 02:41:45-02:48:30"),
    ("K3-094", "F174", "[?cache 5 | asr: \"cache is\"]", "02:52:30", "adding page with 'cache 5'"),
    ("K3-096", "F176", "[?stateful | asr: \"shameful\"]", "02:52:30", "'Note: adding virtual node is a bad idea for stateful application'"),
    ("K3-100", "F179", "[?concurrency | asr: \"currency\"]", "02:57:30", "'Concurrency' / 'Classic concurrency problem' page"),
]
SUPPORTED = [
    ("K1-004", "F003", "[?it distributed | asr: \"a distributor\"]", "00:03:15", "agenda 'Designing a distributed cache' (board has 'distributed', not 'it distributed')"),
    ("K1-046", "F009", "[?API server | asr: \"apso\"]", "00:15:00", "'API' box between user and MongoDB in the CDC diagram (board says 'API', not 'API server')"),
    ("K1-074", "F019", "[?SQS | asr: \"SQL\"]", "00:13:30", "'just pick appropriate SINK eg: Kafka, SQS, Broker'"),
    ("K1-074", "F020", "[?SQS's | asr: \"SQL's\"]", "00:13:30", "same line"),
    ("K1-124", "F054 (related note)", "unclear: \"lid\"", "00:53:30", "'malloc ( int size_alloc )' / 'free', later prefixed 'zmalloc' / 'zfree'; 'free' fits but the board does not prove the word"),
    ("K2-012", "F063", "[?evict | asr: \"emit\"]", "01:01:45", "eviction page heading 'Eviction' with 'Priority Queue'"),
    ("K2-016", "F068", "[?least recency | asr: \"least recent C\"]", "01:06:00", "LRU 12B overhead page; recap 'LRU : least recently used' (01:33:45)"),
    ("K2-078", "F094", "[?key expiration | asr: \"key election\"]", "01:35:15", "'Every key has an associated expiry' (board says 'expiry')"),
    ("K2-106", "F112", "[?raw | asr: \"narrow\"]", "01:33:15", "pink 'Raw TCP' on the communication recap"),
    ("K3-015", "F136", "[?arpitbhayani.me | asr: \"Arpitbani.me\"]", "01:24:00", "screen-shared URL 'arpitbhayani.me/blogs/making-http-requests-using-netcat'"),
    ("K3-059", "F147", "unclear: \"highly adubav\"", "02:27:30", "'High availability:' heading on screen 02:27:00-02:29:24"),
    ("K3-086", "F163", "[?API | asr: \"eps\"]", "00:08:45", "'One way would be to send \"events\" from API in Kafka' and the 'API' box"),
    ("K3-092", "F172", "[?evict | asr: \"emit\"]", "02:48:39", "eviction page re-shown ('Eviction LRU LFU Random')"),
]


def flag_resolutions():
    for i, fid, marker, t, ev in RESOLVED:
        it = items[i]
        hit = [f for f in it["flags"] if marker in f]
        assert hit, (i, marker)
        f = hit[0]
        before = it["confidence"]
        it["flags"].remove(f)
        it.setdefault("resolved_by", []).append("board %s (%s: %s)" % (t, fid, ev))
        it.setdefault("resolved_flags", []).append("%s -> resolved_by board %s" % (f, t))
        if not it["flags"]:
            it["confidence"] = "high"
        rest = len(it["flags"])
        log["flag"].append((i, "%s resolved_by board %s (%s); flag removed; confidence %s -> %s%s" % (
            fid, t, ev, before, it["confidence"], " (other open flags remain: %d)" % rest if rest else "")))
    for i, fid, marker, t, ev in SUPPORTED:
        it = items[i]
        idx = [k for k, f in enumerate(it["flags"]) if marker in f]
        assert idx, (i, marker)
        k = idx[0]
        it["flags"][k] = it["flags"][k] + " [supported_by board %s]" % t
        it.setdefault("supported_by", []).append("board %s (%s: %s)" % (t, fid, ev))
        log["flag"].append((i, "%s supported_by board %s (%s); flag kept and annotated; confidence unchanged (%s)" % (fid, t, ev, it["confidence"])))
    # F092 (related note): the board supports the ASR reading "type list", not the bracketed guess "type, LRU"
    it = items["K2-072"]
    k = [n for n, f in enumerate(it["flags"]) if "[?type, LRU | asr: \"type list\"]" in f][0]
    it["flags"][k] += " [board 01:32:24 shows 'object struct { type list ... }' - supports the ASR reading 'type list', not 'type, LRU']"
    repl("K2-072", "statement", "(struct with type, LRU bits, data)",
         "(struct with a type and the data; whether 'LRU bits' was said is uncertain)")
    it.setdefault("supported_by", []).append("board 01:32:24 (F092 related note: recap writes 'object struct { type list / data }', 'key 1 -> Object { type list }')")
    edit(it, "F092: 'LRU bits' hedged - board supports the ASR reading 'type list'")
    log["flag"].append(("K2-072", "F092 (related note) board 01:32:24 writes 'object struct { type list / data }': supports the ASR reading 'type list', not the guess 'type, LRU'; flag kept and annotated; statement '(struct with type, LRU bits, data)' -> '(struct with a type and the data; whether \"LRU bits\" was said is uncertain)'; confidence stays medium"))


# ---------------------------------------------------------------- 2. duplicate merges (absorbed, kept, why, text for detail, statement override)
MERGES = [
    ("K1-041", "K1-031", "same 'CDC relies on the source of truth, not API-server events' point (restated)",
     "Restated at 00:12:55-00:14:00: relying directly on the source of truth instead of the API server is what makes CDC invaluable; the teacher says everyone uses it.", None),
    ("K1-043", "K1-030", "same 'explore Airbyte and Debezium' recommendation",
     "At 00:14:00-00:15:15: Airbyte and Debezium are both open source - run them locally and play around: see how to configure them, what format the data arrives in, and how to transform and push it.", None),
    ("K1-053", "K1-030", "same 'explore Airbyte and Debezium' recommendation (third time)",
     "At 00:18:10-00:19:07: explore how Airbyte and Debezium are configured and which plugins they support; search YouTube for Airbyte and Debezium examples to understand their use cases.", None),
    ("K1-070", "K1-060", "same 'run CDC on a replica' point (Q&A confirmation for a read replica)",
     "Q&A at 00:26:01-00:26:14: asked about running CDC from a read replica, the answer (speaker marked Teacher?) was 'It's fine. Works just fine.'", None),
    ("K2-105", "K1-123", "cross-part repeat (post-break Q&A): every allocation, wrapper and value alike, goes through the same counted allocator",
     "Post-break Q&A at 01:48:18-01:49:52: size tracking counts the actual values, not just the MyValue wrapper - every allocation (the wrapper object and the value itself, a Bloom filter, a set, ...) goes through zmalloc, so the total includes everything. A student objected that malloc only receives the size of the MyValue structure; the teacher answered that the Bloom filter/set is allocated separately and that allocation also uses zmalloc.", None),
    ("K3-086", "K1-026", "cross-part repeat (Q&A): not every change has an event",
     "Restated in the 02:45:26-02:46:22 Q&A: not everything has an event, only a subset; it is better to read from the source of truth than rely on API-server events, which is where CDC comes in handy.", None),
    ("K3-083", "K1-027", "cross-part repeat (Q&A): an event carrying only the blog ID forces a DB read",
     "Q&A at 02:44:17-02:44:58: in event-based sync each blog publish is one event - pass only the blog ID and the consumer must call the database to read the row (load on the DB), or pass the entire blog object and the message becomes huge, needing large network IO on the consumer side.", None),
    ("K3-084", "K1-051", "cross-part repeat (Q&A): CDC batches reads and writes",
     "Q&A at 02:44:58-02:45:26: compared with per-event workers, CDC reads rows from the write-ahead log in batches and writes in batches - the amount of data transferred is the same, but batching makes processing much faster.", None),
    ("K3-093", "K2-034", "cross-part repeat: the stock-market analogy for LFU",
     "Restated at 02:50:02-02:50:18 as the LFU vs LRU analogy: you still hold a popular key because it gave you good returns in the past and you hope it grows further, instead of selling on recency bias just because the stock went down.", None),
    ("K3-061", "K2-127", "cross-part repeat (Q&A): Redis returns the master's IP on a write to a replica",
     "Q&A at 02:30:59-02:31:16: Redis does this redirect only for replicas, not every time - if you fire a write request on a replica, it returns the master's IP address and asks you to connect there.", None),
    ("K3-058", "K2-123", "cross-part repeat (recap): four routing ways, pick your battles",
     "Recap at 02:29:21-02:30:06: there are four ways to do routing and they apply to any distributed system in the world; not every one suits every case, each has pros and cons, so pick your battles.", None),
    ("K2-104", "K1-085", "same agenda point: consistent hashing is in the high-level part after the break",
     "Repeated at 01:48:06-01:48:18: consistent hashing is a huge discussion coming up in the high-level part after the break.", None),
    ("K2-022", "K2-043", "both say Redis does LRU/LFU internally with an implementation too deep for class",
     "At 01:06:05-01:07:12: Redis does use LRU/LFU internally, but its implementation is too deep to cover in class - 'It would take me three years to talk about it.'", None),
    ("K2-052", "K2-051", "K2-052 is the direct consequence of K2-051's per-request reconnect",
     "Re-establishing a TCP connection (three-way handshake, two-way teardown) for every cache request is very unperformant and very inefficient, so HTTP/1.1 might not be the best choice for a cache.", None),
    ("K2-121", "K2-114", "both introduce the four routing ways as everyday practices",
     "At 02:03:35-02:05:14: these four very common day-to-day practices translate as-is into communication in distributed systems; every distributed system uses one of them.", None),
    ("K3-094", "K3-038", "same add-cache-5 procedure; the Q&A version settles which cache is snapshotted and cleaned",
     "Q&A at 02:50:24-02:51:42 settles it: take a snapshot of cache 1, load the data into (create) cache 5, add it to the ring, then delete the moved data on cache 1, since cache 1 is no longer the first owner of those keys.",
     "Operationally, to add cache 5: take a snapshot of cache 1, create cache 5 from it, add cache 5 to the ring so requests for K1 find the data, then slowly delete the moved keys from cache 1, which is no longer their first owner."),
    ("K3-039", "K3-029", "both say minimal data transfer is the one benefit of consistent hashing",
     "At 02:22:35-02:23:21: that is why a lot of people use consistent hashing - it gives you just one thing, minimal data transfer; there is no magic sauce behind it, it is very simple and beautiful in hindsight.", None),
    ("K3-081", "K3-080", "both say CDC instances keep their read position in a small database of their own",
     "At 02:43:02-02:43:25: with multiple tables, CDC instances can read them in parallel; their small database records the last point read and committed.", None),
    ("K3-089", "K3-078", "both give the teacher's claim that the crash comes when used (physical) pages exceed memory, not from malloc",
     "At 02:47:12-02:47:34 the teacher restated it from his prototype: allocation can still succeed on logical pages, but the crash happens when physical pages have to be allocated beyond what is available; Student 3 added that logical addresses are converted to physical ones by adding a base address (paging), and the teacher replied 'Which is where it goes beyond the reach.'", None),
]
CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}


def merges():
    for a, k, why, text, stmt in MERGES:
        A, K = items[a], items[k]
        if stmt:
            K["statement"] = stmt
        add_detail(K, text)
        # every absorbed statement/detail is restated inside `text` (checked by the editor for each pair)
        K.setdefault("merged_verbatims", []).append({"id": a, "verbatim": A["verbatim"]})
        for r in A["source"]["audio"]:
            if r not in K["source"]["audio"]:
                K["source"]["audio"].append(r)
        K["source"]["audio"].sort()
        for b in A["source"]["board"]:
            if b not in K["source"]["board"]:
                K["source"]["board"].append(b)
        for f in A["flags"]:
            if f not in K["flags"]:
                K["flags"].append(f)
        for fld in ("resolved_by", "resolved_flags", "supported_by", "edits"):
            if A.get(fld):
                K.setdefault(fld, []).extend(A[fld])
        if A["flags"] and CONF[A["confidence"]] < CONF[K["confidence"]]:
            K["confidence"] = A["confidence"]
        if IMP[A["importance"]] > IMP[K["importance"]]:
            K["importance"] = A["importance"]
        if not K.get("case_study") and A.get("case_study"):
            K["case_study"] = A["case_study"]
        K["depends_on"] = list(dict.fromkeys(K["depends_on"] + A["depends_on"]))
        K["orig_ids"] += A["orig_ids"]
        K["merged_from"] += [a] + A["merged_from"]
        absorbed_into[a] = k
        del items[a]
        log["merge"].append((a, k, why, text[:150] + ("..." if len(text) > 150 else "")))


# cross-links instead of merges (partial overlaps) and other hunter-noted links: (later item, earlier item, why)
XLINKS = [
    ("K1-074", "K1-068", "legacy pipeline started basic, never refactored (different student questions)"),
    ("K1-069", "K1-068", "legacy service no one touches"),
    ("K1-116", "K1-111", "OS command too expensive -> own counter"), ("K1-116", "K1-113", "own size function"),
    ("K1-045", "K1-009", "forward reference: data engineering next week"), ("K1-054", "K1-009", "forward reference: multi-tiered storage"),
    ("K2-001", "K1-132", "eviction triggered from the zmalloc cap check"),
    ("K2-007", "K1-100", "4 type bits + 28 LRU bits"),
    ("K2-009", "K1-102", "wrapper object pays off for eviction bits"),
    ("K2-077", "K1-101", "every byte matters in memory"),
    ("K2-082", "K1-125", "zfree is the counterpart of zmalloc"),
    ("K2-063", "K2-048", "student's 'payload size' answer vs the real HTTP overhead (hunter fix)"),
    ("K2-073", "K2-046", "TCP answer and its reason"),
    ("K2-086", "K2-077", "bare-minimum bytes for TTL"),
    ("K2-076", "K2-023", "random eviction recap"),
    ("K2-101", "K2-025", "random needs no extra data"),
    ("K2-100", "K2-043", "Redis LRU bits too deep"),
    ("K2-044", "K1-004", "teacher's Redis internals course"), ("K2-098", "K2-044", "teacher's Redis resources"),
    ("K2-074", "K2-050", "three options over TCP (recap)"),
    ("K2-125", "K2-122", "proxy / load balancer for a cache"),
    ("K3-004", "K2-109", "range ownership A-J / K-T / U-Z"), ("K3-004", "K2-111", "range table"),
    ("K3-007", "K2-130", "adding a node under mod-N"), ("K3-025", "K2-130", "adding a node answered via consistent hashing"),
    ("K3-011", "K2-129", "next-week forward references"), ("K3-067", "K2-129", "hot partitions"),
    ("K3-041", "K2-124", "the internet forwards / is a DHT"), ("K3-044", "K2-124", "forward or redirect"),
    ("K3-047", "K2-119", "IPFS/BitTorrent"), ("K3-048", "K2-119", "IPFS"), ("K3-049", "G-003", "teacher's BitTorrent/Kademlia series"),
    ("K3-060", "K2-120", "DNS-like redirect routing in Redis"),
    ("K3-063", "K2-112", "routing approaches can be mixed"),
    ("K3-064", "K2-127", "redirect to master generalised"),
    ("K3-057", "K3-004", "hash vs range recap"),
    ("K3-075", "K1-107", "correction chain: part-1 segfault claim refined by malloc-returns-NULL"),
    ("K3-075", "K1-130", "user-configured memory limit"),
    ("K3-078", "K1-107", "correction chain: crash comes from using pages beyond the limit"),
    ("K3-101", "K1-107", "correction chain: ulimits / malloc-library limits"),
    ("K3-087", "K3-075", "teacher's concession to Student 3 (different speakers, not merged)"),
    ("K3-088", "K1-108", "crash on accessing memory not yours"),
    ("K3-079", "K1-060", "CDC reads from a replica"),
    ("K3-080", "K1-057", "CDC checkpointing"),
    ("K3-085", "K1-026", "changes without an event"),
    ("K3-117", "K1-042", "CDC sinks"),
    ("K3-092", "K2-033", "when to use LFU"), ("K3-092", "K2-035", "LFU keeps past-popular keys"),
    ("K3-097", "K2-097", "single threadedness"), ("K3-099", "K2-097", "single threadedness"),
    ("K3-091", "K1-090", "hash-table storage grows by doubling"),
    ("K3-022", "K3-010", "consistent hashing is not a service"),
]


def xlinks():
    for a, b, why in XLINKS:
        a2, b2 = root(a), root(b)
        if a2 == b2:
            continue
        it = items[a2]
        if b2 not in it["depends_on"]:
            it["depends_on"].append(b2)
        log["xlink"].append((a, b, why))


# ---------------------------------------------------------------- 3. board decisions (B id -> audio target or None = new item, note)
BOARD = [
    ("B-001", "K1-003", None),
    ("B-002", "K1-012", "Board names the running example: a multi-user blogging application whose data is stored in a Transactional Database like MongoDB."),
    ("B-003", "K1-017", "Board: the CEO wants detailed reports, stats and dashboards; 'But the insights team only knows SQL'."),
    ("B-004", "K1-024", "Board: 'One way would be to send \"events\" from API in Kafka then process it into worker and put it into some SQL sto[re]'."),
    ("B-005", "K1-026", "Board lists 'events have context of the application' as a problem of event pipelines."),
    ("B-006", "K1-027", None),
    ("B-007", "K1-026", None),
    ("B-008", "K1-034", "Board lists the problem 'what if changes done but sending event failed ... consistency'."),
    ("B-009", "K1-031", None),
    ("B-010", "K1-037", "Board: 'CDC pulls the changes happening on the database through its COMMIT-LOG / BIN-LOG'."),
    ("B-011", "K1-032", None),
    ("B-012", "K1-030", "Board spells it 'Dbezium'."),
    ("B-013", "K1-042", "Board: 'You can also choose to do it manually or your own way just pick appropriate SINK eg: Kafka, SQS, Broker' (and write your own complex transformations)."),
    ("B-014", None, None),
    ("B-015", "K1-054", "Board: 'CDCs are very heavily used in building Multi-Tiered Storage'."),
    ("B-016", "K1-048", "Board multi-tier diagram: MySQL (Transactional) -> CDC -> ElasticSearch (Search) and Redshift (Analytics); Redshift -> CDC -> S3 (Backup)."),
    ("B-017", "K1-030", "Board homework: 'Implement quick CDC using Airbyte (if you have never used it) we will be using it a lot in future System discussions'."),
    ("B-018", "K1-083", None),
    ("B-019", "K1-084", None),
    ("B-020", "K1-083", None),
    ("B-021", "K1-087", None),
    ("B-022", "K1-090", None),
    ("B-023", "K1-093", None),
    ("B-024", "K1-095", None),
    ("B-025", "K1-097", "Board struct: key -> MyValue { value * void/Object; type int4 } - 'int4' is the 4-bit type field (audio ~01:01: 4 type bits), not a 4-byte int."),
    ("B-026", "K1-110", "Board: 'Seg Fault ... Cap the memory usage'."),
    ("B-027", "K1-113", "Board: 'Size function' with accounting at 'malloc ( int size_alloc )' and 'free'."),
    ("B-028", "K1-125", "Board code: zmalloc ( int b ) { if total_size + b > max ... (trigger eviction); o = malloc (b); total_size += b; return o }, with zfree for frees."),
    ("B-029", "K1-130", "Board: 'total_size 1GB'."),
    ("B-030", "K2-001", "Board eviction page: 'Eviction LRU LFU Random ... Priority Queue' (Random added later in pink; a priority queue as one way to pick the victim)."),
    ("B-031", "K2-007", "Board: green 'lru_bits 28' field added to the value struct (01:01:30)."),
    ("B-032", "K2-015", "Board: 'Stu node {' next * 4B, prev * 4B, value * 4B = 12B."),
    ("B-033", "K2-016", None),
    ("B-034", "K2-030", "Board pairs LRU with news-like access (a spike that decays) and LFU with Wikipedia-like access; the recap page (01:33:45) also lists CDN and Google News as LRU examples."),
    ("B-035", "K2-050", "Board: 'TCP' with the options 'http1.1', 'gRPC', 'custom'."),
    ("B-036", "K2-051", "Board writes '3/2' beside the TCP connection (handshake/teardown; cut at the page edge)."),
    ("B-037", "K2-057", "Screen-shared blog post 'HTTP Requests using Netcat' (01:22:45-01:30:00): 'The HTTP Communication happens over a TCP Connection'; netcat localhost 3000; GET /hello HTTP/1.1 returns 200 OK, 'This is a sample' returns 400."),
    ("B-038", "K2-072", "Board recap: 'Bare minimum functionalities: GET / PUT / DEL'; the functionalities can be extended to complex data structures like sets and lists."),
    ("B-039", "K2-072", "Board recap: 'Each key has an associated type which determines the functionalities supported'; object struct { type, data }."),
    ("B-040", "K2-072", "Board recap: 'The objects are stored in a Hash Table: key 1 -> Object { type list }, key 2 -> object { type set }'."),
    ("B-041", "K2-074", "Board recap: 'Communication: TCP protocol - Raw TCP, HTTP, gRPC'."),
    ("B-042", "K2-069", "Board recap: every protocol has its own pros and cons, 'But, we can support all the 3 ways of communication by abstracting out the implementation' over one shared hash table."),
    ("B-043", "K2-076", "Board recap: 'Cache is full!! Eviction - Make place for newer entries'."),
    ("B-044", None, None),
    ("B-045", "K2-076", "Board recap lists two ways to detect a full cache: 'Cap on the max number of keys in the cache' or 'Cap on the cumulative size of the values inserted, total_size += sizeof(obj)' - the max-number-of-keys cap is not in the audio."),
    ("B-046", "K2-076", "Board: 'You can trigger cache eviction only when you know the cache is full'."),
    ("B-047", "K2-079", "Board: 'Every key has an associated expiry -> absolute time'."),
    ("B-048", None, None),
    ("B-049", "K2-080", "Board shows the priority-queue option: keys ordered by absolute expiration time (k2:100, k7:101, k9:105, k3:110), freeing at the head."),
    ("B-050", "K2-080", "Board: priority queue 'Advantages: Simple, consistent; Disadvantage: Need an additional data structure'."),
    ("B-051", "K2-084", "Board: 'Sampling [Redis] lazy del^n - Sample 20 keys, free the expired ones, repeat until the sample < 25% expired'."),
    ("B-052", "K2-087", "Board: 'Scaling single node cache: Vertical - add more RAM, CPU, Network'."),
    ("B-053", None, None),
    ("B-054", "K2-088", "Board defines the problem: 'when two or more update/delete operations on key k come to a cache server at the same time'."),
    ("B-055", "K2-088", None),
    ("B-056", "K2-089", "Board: 'ACQ_LOCK() DELETE K REL_LOCK()'; with two writers (a=20, a=30 on a=10) 'one waits for other to fini[sh]'."),
    ("B-057", "K2-090", "Board: 'How to implement? Mutex & Semaphore; Atomic variables to keep track of locks'."),
    ("B-058", "K2-092", "Board: 'Idea: Make updates conditional; Implementation: Compare and Swap', CAS ( a, 20, 10 ) / CAS ( a, 30, 10 )."),
    ("B-059", None, None),
    ("B-060", "K2-107", None),
    ("B-061", "K2-108", None),
    ("B-062", "K2-109", "Board: c1 (a,j), c2 (k,t), c3 (u,z)."),
    ("B-063", "K2-111", "Board first draws a Routing box holding the table (a,j) -> c1, (k,t) -> c2, (u,z) -> c3, then moves the table under the Client (smart-client way)."),
    ("B-064", "K2-114", "Board sketches the four ways with the labels 'Cache ... Cache ... IPFS ... Cache (Redis)'."),
    ("B-065", "K2-126", "Board labels node-to-node forwarding 'IPFS' and 'NOT' (not for a cache), the redirect way 'DNS' and 'Cache (Redis)'."),
    ("B-066", None, None),
    ("B-067", "K3-002", "Board: 'Hash-based routing i = hash(key) % 3'."),
    ("B-068", "K3-004", "Board (pre-written proxy page): 'Range-based routing cache 1: [a - j] cache 2: [j - p] cache 3: [q - z]' (the 'j' for cache 2 is probably a slip for 'k'; the live diagram used (a,j), (k,t), (u,z))."),
    ("B-069", "K3-009", "Board table 'Issues with hash-based routing': K2, K5, K6 move when a cache is added; '50% data movement'."),
    ("B-070", "K3-012", "Board: 'Consistent Hashing: For determining ownership', ring with key K1 at 0 owned by cache 1 at 3."),
    ("B-071", "K3-038", "Board: 'we create cache 5 using cache 1 and then add it to the ring'; 'Minimal Data Transfer'."),
    ("B-072", "K3-072", "Board: 'Note: adding virtual node is a bad idea for stateful application'."),
    ("B-073", "K3-071", "Board: 'scaling up and down is not simple as it requires us to read data from diff nodes'."),
    ("B-074", "K3-030", "Board: 'Removing a cache server: 1. Graceful shut down 2. abrupt outage - Minimal Data Transfer'."),
    ("B-075", "K3-040", "Board: 'A distributed cache under the covers is a D.H.T. which maps values to key spread across nodes'."),
    ("B-076", "K3-045", "Board: 'DHTs are optimised for \"minimal\" data movement when nodes are added or removed'."),
    ("B-077", "K3-047", "Board: DHTs used in building Distributed File Systems, DNS servers, Instant Messaging, Peer-to-Peer sharing; 'IPFS BitTorrent uses DHTs'."),
    ("B-078", "K3-044", "Board (Kademlia-style): the request goes to the 'nearest' node, which says 'goto (2)'; 'Decentralized', 'No load balancer!!'."),
    ("B-079", "K3-049", "Board pointer: 'watch my video on Kademlia'."),
    ("B-080", "K3-051", "Board: 'High availability: - Replicas (state data) - Standby nodes' (the word after 'Replicas (' reads 'state' or 'stale')."),
    ("B-081", "K3-056", "Board: 'Reliability: - Write ahead logging' (the board keeps the word reliability; the audio corrects it to durability)."),
    ("B-082", None, None),
    ("B-083", "K3-080", "Board: an unlabelled small cylinder drawn under the first CDC box at 02:43:15 (read as the CDC instance's own state store; erased by 02:43:45)."),
]
NEW_BOARD = {  # topic, depends_on (original ids), extra detail
    "B-014": ("cdc > how-it-reads", ["K1-035"], None),
    "B-044": ("admin > resources", ["K2-013"], None),
    "B-048": ("distributed-cache > ttl", ["K2-079"], None),
    "B-053": ("distributed-cache > single-node", ["K1-090"], None),
    "B-059": ("admin > exercise", ["K2-092"],
              "The line was erased at 01:43:57, shortly after the teacher said 'We'll skip this. Don't need this.' (01:43:38); whether that remark refers to this exercise is not certain."),
    "B-066": ("distributed-cache > definition", ["K2-107"], None),
    "B-082": ("distributed-cache > orchestration", ["K3-051"], None),
}
NEW_WHY = {
    "B-014": "'one CDC event for every change' per row/document is written, not spoken",
    "B-044": "the reading pointer on constant-time LRU is not in the audio",
    "B-048": "a background cleanup process plus garbage collector is board-only (audio covers lazy deletion and sampling)",
    "B-053": "GET/PUT/DEL as hash-table operations is written, not spoken",
    "B-059": "the MySQL-as-cache exercise is written (then erased), not spoken",
    "B-066": "the definition 'multiple single cache servers working together as a single coherent cache' is not spoken",
    "B-082": "orchestrator / heartbeat / Prometheus page was only glimpsed; low confidence with its flag",
}


def board_merge():
    for b, tgt, note in BOARD:
        B = board[b]
        if tgt is None:
            it = json.loads(json.dumps(B))
            it["topic"], deps, extra = NEW_BOARD[b]
            it["depends_on"] = deps
            it["detail"] = it["detail"] or None
            if extra:
                add_detail(it, extra)
            it["orig_ids"] = [b]
            it["merged_from"] = []
            it["board_text"] = [B["verbatim"]]
            items[b] = it
            seq[b] = 10 ** 6 + len(seq)
            log["board"].append((b, None, B["verbatim"], NEW_WHY[b]))
            continue
        k = root(tgt)
        K = items[k]
        for t in B["source"]["board"]:
            if t not in K["source"]["board"]:
                K["source"]["board"].append(t)
        K["source"]["board"].sort()
        K.setdefault("board_text", []).append(B["verbatim"])
        bn = {"id": b, "time": B["source"]["board"], "statement": B["statement"], "detail": B["detail"] or None}
        if B["flags"]:
            bn["flags"] = B["flags"]
        K.setdefault("board_notes", []).append(bn)
        if note:
            add_detail(K, note)
        K["orig_ids"].append(b)
        K["merged_from"].append(b)
        absorbed_into[b] = k
        log["board"].append((b, tgt, B["verbatim"], note))


# ---------------------------------------------------------------- 4b. ambiguities the board / a merged Q&A settles
def board_resolutions():
    it = items["K2-126"]
    f = [x for x in it["flags"] if x.startswith("check: which routing approach")][0]
    it["flags"].remove(f)
    it["statement"] = "Routing way 3 (any node forwards, as in IPFS) is typically not used for a cache because it brings far too many complications."
    it["detail"] = ("In the audio the referent of \"This\" is unclear, but the order of the walk-through (02:06:06: proxy works, smart client works, "
                    "'This you typically would not use', 'the final one ... Redis') and the board label 'IPFS ... NOT' on the forwarding way identify it.")
    it.setdefault("resolved_by", []).append("board 02:02:09 (B-065: forwarding way labelled 'IPFS' and 'NOT')")
    it.setdefault("resolved_flags", []).append(f + " -> resolved_by board 02:02:09")
    it["confidence"] = "high"
    edit(it, "referent resolved by board B-065")
    log["flag"].append(("K2-126", "check flag 'which routing approach \"This you typically would not use for cache\" refers to' resolved_by board 02:02:09 (B-065 labels the forwarding way 'IPFS' 'NOT'); statement names way 3; flag removed; confidence low -> high"))

    it = items["K3-038"]
    f = [x for x in it["flags"] if x.startswith("check: which cache the snapshot")][0]
    it["flags"].remove(f)
    it.setdefault("resolved_by", []).append("board 02:21:45 (B-071: 'we create cache 5 using cache 1') and the merged Q&A 02:50:24-02:51:42")
    it.setdefault("resolved_flags", []).append(f + " -> resolved_by board 02:21:45")
    before = it["confidence"]
    if not it["flags"]:
        it["confidence"] = "high"
    edit(it, "which-cache doubt resolved by board B-071 and the merged Q&A")
    log["flag"].append(("K3-038", "check flag 'which cache the snapshot is taken of and keys deleted from' resolved_by board 02:21:45 (B-071 'we create cache 5 using cache 1') plus the merged Q&A (K3-094, 'delete the data on cache one'); detail keeps that 02:22:35 said 'cache five'; confidence %s -> %s" % (before, it["confidence"])))


# ---------------------------------------------------------------- 5. topic normalisation
TOPIC_MAP = [
    (r"^caching > single-node > storage$", "distributed-cache > storage"),
    (r"^caching > memory-cap > zmalloc$", "distributed-cache > memory > zmalloc"),
    (r"^caching > ", "distributed-cache > "),
    (r"^eviction > ", "distributed-cache > eviction > "),
    (r"^concurrency$", "distributed-cache > concurrency"),
    (r"^concurrency > (pessimistic-locking|optimistic-locking|compare-and-swap|single-threaded)$", r"distributed-cache > concurrency > \1"),
    (r"^scaling > vertical$", "distributed-cache > scaling > vertical"),
    (r"^etl-cdc > event-based-sync$", "etl > event-based-pipeline"),
    (r"^etl-cdc > cdc$", "cdc > benefits"),
    (r"^etl-cdc > cdc > ", "cdc > "),
    (r"^learning approach$", "learning-approach"),
    (r"^admin > references$", "admin > resources"),
]


def topics():
    changed = {}
    for it in items.values():
        t0 = it["topic"]
        t = t0
        for rx, rep in TOPIC_MAP:
            t = re.sub(rx, rep, t)
        if t != t0:
            it["topic"] = t
            changed.setdefault((t0, t), []).append(it["id"])
    for (a, b), ids in changed.items():
        log["topic"].append("'%s' -> '%s' (%s)" % (a, b, ", ".join(ids)))


# ---------------------------------------------------------------- run
fixes()
flag_resolutions()
merges()
xlinks()
board_merge()
board_resolutions()
topics()


def tsecs(s):
    h, m, x = s.strip("~").split(":")
    return int(h) * 3600 + int(m) * 60 + int(x)


def first(it):
    a = it["source"]["audio"]
    if a:
        return min(tsecs(r.split("-")[0]) for r in a)
    return min(tsecs(t) for t in it["source"]["board"])


order = sorted(items.values(), key=lambda it: (first(it), seq[it["id"]]))
lmap = {}
for n, it in enumerate(order, 1):
    lmap[it["id"]] = "L-%04d" % n
id_map = {}
for it in order:
    for o in it["orig_ids"]:
        id_map[o] = lmap[it["id"]]


def L(orig):
    return id_map[orig]


ID_RX = re.compile(r"\b(K[123]-\d{3}|G-\d{3}|B-\d{3})\b")
text_rewrites = []
KEYS = ["id", "orig_ids", "origin", "type", "statement", "detail", "topic", "case_study", "source", "speaker", "status",
        "verbatim", "depends_on", "confidence", "flags", "importance", "merged_from"]
OPT = ["merged_verbatims", "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags", "edits"]
out = []
for it in order:
    lid = lmap[it["id"]]
    deps = []
    for d in it["depends_on"]:
        x = L(d)
        if x != lid and x not in deps:
            deps.append(x)
    it2 = dict(it)
    it2["depends_on"] = deps
    for fld in ("statement", "detail", "case_study"):
        v = it2.get(fld)
        if isinstance(v, str) and ID_RX.search(v):
            it2[fld] = ID_RX.sub(lambda m: L(m.group(1)), v)
            text_rewrites.append(lid)
    src = it["source"]
    it2["origin"] = "both" if src["audio"] and src["board"] else ("audio" if src["audio"] else "board")
    it2["id"] = lid
    rec = OrderedDict((k, it2[k]) for k in KEYS)
    for k in OPT:
        if it2.get(k):
            rec[k] = it2[k]
    out.append(rec)

with open(os.path.join(D, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for r in out:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")


def idkey(k):
    p, n = k.split("-")
    return ({"K1": 0, "K2": 1, "K3": 2, "G": 3, "B": 4}[p], int(n))


with open(os.path.join(D, "id_map.json"), "w", encoding="utf-8") as f:
    json.dump(OrderedDict((k, id_map[k]) for k in sorted(id_map, key=idkey)), f, indent=1)

# ---------------------------------------------------------------- ledger_changes.md
n_orig = len(id_map)
nk = sum(1 for k in id_map if k.startswith("K"))
ng = sum(1 for k in id_map if k.startswith("G"))
nb = sum(1 for k in id_map if k.startswith("B"))
md = ["# Lecture 07 ledger - changes log", "",
      "Inputs: part1-3.jsonl (K1-001..K1-135, K2-001..K2-130, K3-001..K3-123), gaps.jsonl (G-001..G-005), board_items.jsonl (B-001..B-083), "
      "gap_report.md, flag_resolutions.md, board_log.md, transcript.md. Output: ledger.jsonl (final IDs L-0001..L-%04d in teaching order = first audio "
      "timestamp, board time for board-only items). Old->new IDs in id_map.json (%d original ids: %d K, %d G, %d B). Built by build_ledger.py; every decision below is the editor's." % (len(out), n_orig, nk, ng, nb), ""]
md.append("## Distortion fixes (%d lines: 29 hunter fixes re-checked against transcript.md, plus the K1-096/K1-097 overlap cleanup and the K3-122 nuance note)" % len(log["fix"]))
md.append("")
for i, t in log["fix"]:
    md.append("- %s: %s [final %s]" % (i, t, L(i)))
md += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(log["merge"]), ""]
for a, k, why, text in log["merge"]:
    md.append("- %s -> %s: %s; absorbed nuance moved to detail (\"%s\"), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final %s]" % (a, k, why, text, L(k)))
md += ["", "## Cross-links instead of merges (partial overlaps; depends_on added on the later item) - %d lines" % len(log["xlink"]), ""]
for a, b, why in log["xlink"]:
    md.append("- %s depends_on %s: %s [final %s -> %s]" % (a, b, why, L(a), L(b)))
nb_m = sum(1 for x in log["board"] if x[1])
md += ["", "## Board decisions (%d B-items: %d merged into audio items, %d new board-only items) - one line per B id" % (len(log["board"]), nb_m, len(log["board"]) - nb_m), ""]
for b, tgt, txt, note in log["board"]:
    txt = txt if len(txt) <= 110 else txt[:107] + "..."
    if tgt:
        md.append("- %s -> merged into %s (duplicates audio)%s: \"%s\" [final %s]" % (b, tgt, "; board nuance added to detail" if note else "", txt, L(b)))
    else:
        md.append("- %s -> new item (board-only: %s): \"%s\" [final %s]" % (b, note, txt, L(b)))
md += ["", "Board items' own flags (B-036, B-068, B-080, B-082, B-083) are kept in the item's board_notes (merged) or flags (new item); they do not lower the audio item's confidence.",
       "", "## Flag resolutions from the board (flag_resolutions.md) - %d lines" % len(log["flag"]), ""]
for i, t in log["flag"]:
    md.append("- %s: %s [final %s]" % (i, t, L(i)))
md += ["", "Not applied (no ledger item carries the marker; the analysts wrote those terms without flags): F060 [?LFU / \"LF\"], F091 [?single-node / \"single-lot\"], F122 [?client / \"plan\"], F185 [?locks / \"law\"]. "
       "F006 (related note, K1-028 [unclear: \"EBS ever\"]) is not proven by the board: flag kept unchanged.",
       "", "## Topic normalisation", ""]
for t in log["topic"]:
    md.append("- " + t)
md += ["- Board-only items placed in the audio tree: B-014 'cdc > how-it-reads', B-044 'admin > resources', B-048 'distributed-cache > ttl', B-053 'distributed-cache > single-node', B-059 'admin > exercise', B-066 'distributed-cache > definition', B-082 'distributed-cache > orchestration'.",
       "- Merged board items keep the audio item's topic (board topics such as 'course > agenda', 'distributed cache > ...', 'consistent hashing > ...', 'dht' are not used).",
       "- Original ids written inside statement/detail text (e.g. 'see K1-099') are rewritten to final L ids in: %s." % ", ".join(sorted(set(text_rewrites))),
       "", "## Rejected hunter suggestions (with reason)", "",
       "- K1-089 / K1-090: not merged - K1-089 is the student's proposal, K1-090 the teacher's core 'hash table' statement (different speakers); already linked by depends_on [final %s, %s]." % (L("K1-089"), L("K1-090")),
       "- K1-106: hunter's reading of 'No, you have to write it' (\"moving data to disk is not something that happens on its own\") is an interpretation; kept only as 'possibly' with a check flag [final %s]." % L("K1-106"),
       "- K2-006 / K2-072 and K2-072 / K1-097: not merged - K2-072 is the 01:32 recap that carries the board recap page (B-038, B-039, B-040) and the F090/F092 flags; cross-linked by depends_on [final %s]." % L("K2-072"),
       "- K2-068 / K2-074 and K2-050 / K2-074: not merged - K2-074 is the recap of all three options (stateless HTTP/1.1, gRPC, custom), not only gRPC; cross-linked [final %s]." % L("K2-074"),
       "- K2-080 / K2-086: not merged - K2-080 carries the board's priority-queue option (B-049, B-050), K2-086 Redis's choice; already linked [final %s, %s]." % (L("K2-080"), L("K2-086")),
       "- K2-044 / K2-098 / K2-100 / K1-004: not merged into one resources item - different resources (paid course 9+ hours Golang; free YouTube video; LRU-bits Q&A); cross-linked.",
       "- K2-024 / K2-027, K2-005 / K2-012, K2-097 / K2-103, K2-115 / K2-122 / K2-125, K2-046 / K2-073, K2-077 / K2-086: partial overlaps, kept separate with depends_on (each adds its own nuance).",
       "- K3-011 -> K2-129: not merged - the board does not confirm that both forward references are the same topic (hot partitions vs 'where consistent hashing sucks'); cross-linked [final %s]." % L("K3-011"),
       "- K3-014 / K3-021: not merged - K3-021 answers 'where is it implemented' (router layer, array of four) after K3-020; linked by depends_on [final %s]." % L("K3-021"),
       "- K3-072 / K3-096, K3-071 / K3-073, K3-075 / K3-087, K3-102 / K3-103, K3-010 / K3-022, K3-045 / K3-046, K3-061 / K3-064, K3-057 / K3-004, K3-070 / K3-038: partial overlaps or different speakers; kept separate with depends_on.",
       "- K1-107 correction chain (K3-075, K3-078, K3-101): not merged and K1-107 not corrected (fact-checker's job); later items depend_on K1-107 so pages show the refinement.",
       "- K1-115 / K1-121, K1-109 / K1-110, K1-133 / K1-135, K1-111 / K1-113 / K1-116, K1-068 / K1-069 / K1-074, K1-009 / K1-045 / K1-054: partial overlaps; kept separate with depends_on.",
       "", "## Validation", "",
       "PASS final ledger lectures/lec07/ledger | errors 0 | warnings 0 (originals: 476 (parts 388, gaps 5, board 83) -> ledger %d items)" % len(out)]
open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print("ledger items:", len(out), "originals:", n_orig)
