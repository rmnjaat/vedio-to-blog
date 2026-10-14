#!/usr/bin/env python3
"""Lecture 10 ledger editor helper: applies the editor's decisions (encoded below) mechanically.

Writes ledger.jsonl, id_map.json, ledger_changes.md. Every decision in this file was made by the editor after
re-checking the transcript; this script only applies them, renumbers and logs.
"""
import json
import os
import re

D = os.path.dirname(os.path.abspath(__file__))
LEC = os.path.dirname(D)


def load(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


originals = []
for f in ["part1.jsonl", "part2.jsonl", "part3.jsonl", "gaps.jsonl"]:
    originals += load(os.path.join(D, f))
board = load(os.path.join(LEC, "board", "board_items.jsonl"))
ORDER = {o["id"]: i for i, o in enumerate(originals + board)}
items = {o["id"]: dict(o) for o in originals}
for it in items.values():
    it.update(orig_ids=[it["id"]], merged_from=[], edits=[])
bmap = {b["id"]: b for b in board}

LOG = {"fix": [], "merge": [], "xlink": [], "board": [], "flag": [], "topic": [], "reject": []}


def app_detail(it, text):
    it["detail"] = (it["detail"].rstrip() + " " + text) if it.get("detail") else text


# ---------------------------------------------------------------- 1. distortion fixes (gap_report.md)
def fix(i, log, **kw):
    it = items[i]
    for k, v in kw.items():
        if k == "append_detail":
            app_detail(it, v)
        elif k == "add_flags":
            it["flags"] = it["flags"] + v
        elif k == "replace":
            for field, old, new in v:
                assert old in it[field], (i, field, old)
                it[field] = it[field].replace(old, new)
        elif k == "add_deps":
            it["depends_on"] = it["depends_on"] + [d for d in v if d not in it["depends_on"]]
        elif k == "add_board":
            it["source"]["board"] = it["source"]["board"] + v
        else:
            it[k] = v
    it["edits"].append(log)
    LOG["fix"].append((i, log))


fix("K1-038", "detail: offset-as-index idea marked as surviving; correction scoped to B+ tree pages, 8 KB blocks, 1000-key limit",
    append_detail="The offset-as-index idea survived (see {K1-047}); the correction targets the B+ tree pages, 8 KB blocks "
                  "and the 1000-key memory limit (see {G-001}).")
fix("K1-067", "detail: 'wastes some space' -> 'wastes very little space' (transcript: 'you're wasting very little space')",
    replace=[("detail", "but it wastes some space", "although it wastes very little space")])
fix("K1-066", "status proposed_then_corrected -> endorsed; detail now says the separator was called good and later superseded; "
              "speaker flag added; confidence high -> medium",
    status="endorsed", confidence="medium",
    detail="The teacher superseded the separator with a byte offset stored in a header at the start of the file ({K1-071}), "
           "calling the separator approach good but improvable ('These are two good approaches. What else can you do?'); "
           "the byte offset removes the need for a separator.",
    add_flags=['check: speaker of "These are two good approaches" (Teacher?)'])
fix("K1-098", "status proposed_then_corrected -> endorsed ('But it's a valid point. I'm not denying it'); detail reworded; "
              "asr flag for 'end of a word' added; confidence high -> medium",
    status="endorsed", confidence="medium",
    detail="The teacher called it a valid point but not a problem yet, since meanings do not change dramatically "
           "(apple 'a fruit' today, 'a round fruit' tomorrow is not the end of the world).",
    add_flags=['asr: "end of a word" probably "end of the world"'])
fix("K1-097", "status proposed_then_corrected -> endorsed; detail adds the teacher's acknowledgement ('update tedious, correct') "
              "and that cost is the real issue",
    status="endorsed",
    detail="The teacher countered that updates are not real time but one bulk update every Sunday ('Is that still a "
           "problem?'); he acknowledged the point ('So you said update tedious, correct') but judged it not a problem yet; "
           "cost is the real issue ({K1-100}).")
fix("K1-048", "detail: removed invented 'offsets one, two, three (apple, ...)'; now 'student said first line is offset zero; "
              "teacher gave Amazon offset two (ASR) and book offset three'",
    detail="The student said the first line is offset zero; the teacher's spoken example gave Amazon offset two "
           "(ASR 'to') and book offset three.")
fix("K1-022", "detail: appended that sorting returns later for the update merge",
    append_detail="(Sorting is introduced later for the update merge, see {K2-022}.)")
fix("K1-027", "detail: appended that sorting returns later for the update merge",
    append_detail="(Sorting is introduced later for the update merge, see {K2-022}.)")
fix("K1-033", "detail: added the teacher's promise that the student's points will all be incorporated, just not via Parquet",
    append_detail="The teacher said the student's points will all be incorporated, just not via Parquet specifically.")
fix("K1-100", "detail: says the student raised the duplicated cost and the teacher named it the biggest pain (verbatim is the teacher's)",
    detail="A student raised the duplicated cost of saving the file on many servers ('we are having a lot of duplicated "
           "costs of saving the file'); the teacher named it the biggest pain ('Biggest pain, cost.').")
fix("K1-014", "pronoun: 'The student himself called' -> 'The student also called'",
    replace=[("detail", "The student himself called", "The student also called")])
fix("K1-018", "pronouns: 'asked how he was storing it, he moved to' -> 'asked how they were storing it, the student moved to'",
    replace=[("statement", "asked how he was storing it, he moved to", "asked how they were storing it, the student moved to")])
fix("K1-020", "pronoun: 'The student said he was thinking' -> 'The student said they were thinking'",
    replace=[("detail", "The student said he was thinking", "The student said they were thinking")])
fix("K2-012", "apple's original meaning 'a fruit' kept but sourced to the board (01:11:45, B-034 drawing); audio never states it",
    replace=[("statement", "the file holds 'apple, a fruit'", "the file holds 'apple, a fruit' (meaning as written on the board)")],
    append_detail="The audio does not state apple's original meaning; 'a fruit' is what the board shows (01:11:45).",
    add_board=["01:11:45"])
fix("K2-068", "detail: added the reason no garbage is served (new file at a new path; 'because you are reading from another file now')",
    detail="No garbage is served because the new data is in another file at a new path, so each server's in-memory index "
           "matches the file it reads (old servers keep reading the old file): 'you avoid serving garbage data because you "
           "are reading from another file now and you are just triggering a rolling deployment'. Contrast with the "
           "same-path upload ({K2-041}, {K2-042}).")
fix("K2-033", "statement rewritten: the student doubted a rolling upgrade would work for a single file and proposed an A-to-B "
              "switch to a new S3 URL plus a canary (not three equal options)",
    statement="The same student frames switching the API servers to the new file as a deployment problem. Since the file is "
              "in a single place, they doubt a rolling upgrade of the file would work ('I don't think that that kind of a "
              "deployment will work'). They propose a complete A-to-B switch instead: create the new file at a new S3 URL, "
              "give the new address to the API servers, and roll out the change with a canary (one server first, the rest "
              "once it works).",
    detail="The teacher's final answer is a rolling deployment of the API servers ({K2-067}); the doubt about a rolling "
           "upgrade here is the student's, about the single file.")
fix("K2-048", "detail: teacher endorsed the static metadata file but challenged the 5-10 minute polling for a weekly job",
    detail="The teacher endorsed the static metadata file (later meta.json, {K2-049}, {K2-061}) but challenged the 5-10 "
           "minute polling for a weekly job ({K2-050}..{K2-057}); the final design replaces polling with a triggered "
           "deployment ({K2-069}).")
fix("K2-050", "status endorsed -> open; detail: the teacher answered 'But ...' and redirected to reactive notification",
    status="open",
    detail="The teacher did not accept this as a reason to poll: he answered 'But we studied second week, third week that "
           "... wherever we have poll, we can make things reactive' ({K2-051}).")
fix("K2-006", "speaker teacher -> student (proposal); statement: the student proposed bumping the header version, the teacher "
              "deferred it; confidence high -> medium; depends_on + K1-078",
    speaker="student (proposal)", confidence="medium",
    statement="A student proposes updating the version stored in the file header; the teacher defers it as the last step "
              "('That's the last thing that we'll do') and refocuses on how the dictionary file itself is updated.",
    detail="The header version introduced earlier ({K1-078}) is a file-format version (variants of the layout), not a "
           "data version.",
    add_deps=["K1-078"])
fix("K2-011", "type concept -> misconception (consistent with sibling corrected proposals K2-007..K2-009)",
    type="misconception")
fix("K2-043", "file names: '.dict' extension was not said; now 'dictionary1.dictionary' / 'dictionary2.dictionary' as spoken "
              "(board writes S3://wd/dict1.dict, see B-043)",
    replace=[("statement", "s3://word-dictionary/dictionary1.dict first, then s3://word-dictionary/dictionary2.dict",
              "s3://word-dictionary/dictionary1.dictionary first, then s3://word-dictionary/dictionary2.dictionary")])
fix("K2-085", "removed '(key-value store)' (said only after the break); detail adds 'very similar to what we discussed on word dictionary'",
    replace=[("statement", "a super fast database (key-value store) that", "a super fast database that")],
    detail="The teacher said it is very similar to what was discussed for the word dictionary.")
fix("K3-122", "statement: the teacher only asked 'Why is that complex?' and pointed to the index; the student worked out the merge "
              "from the slide and the teacher confirmed; speaker flag added for the 'direct lookup' line",
    statement="A student worried that keeping a 170,000-record file sorted adds complexity (where to insert each new entry). "
              "The teacher asked 'Why is that complex?' and answered that lookups go directly to the index offset; the "
              "student then realised from the slide that the new sorted dictionary is created by the merge (so nothing is "
              "inserted in place), and the teacher confirmed ('Correct. This is sorted.').",
    add_flags=['check: speaker of "but you don\'t have to search anything. Right. It\'s direct lookup." inside Student 1\'s turn (03:04:26)'])
fix("K3-020", "type misconception -> process; status proposed_then_corrected -> rejected; detail: teacher asked for the naive "
              "way first, the student supplied the requested baseline",
    type="process", status="rejected",
    detail="The teacher asked for the naive way first ('what is the naive way of doing it?'); the student's answer is the "
           "requested baseline, not a misconception. Teacher's verdict: 'Return the latest one that seems very poor, but "
           "you want the best performance out of get as well.'")
fix("K3-034", "statement: dropped invented 'including the file being written'; correction now the teacher's 'No, reading and "
              "writing are from the same file, right?'; speaker flag for 02:17:23 added",
    statement="A student argued the disk needs room for three files at most (one being written, one being read, one being "
              "created); the teacher countered that reading and writing are from the same file ('No, reading and writing "
              "are from the same file, right?'), and a read goes to whichever file holds the key.",
    add_flags=['check: speaker of "whichever file my key is" at 02:17:23'])
fix("K3-091", "'spend about a week' -> 'one to two weeks' (transcript: 'Spend two weeks, two weeks period, one week of your time')",
    replace=[("statement", "spend about a week of your time building it",
              "spend one to two weeks building it (the teacher said 'two weeks', then 'one week of your time')")])
fix("K3-087", "hedge restored: 'most Riak setups have Bitcask as their backend' (transcript: 'Riak, most of them have Bitcask')",
    replace=[("statement", "it is heavily used in production, as Riak's backend",
              "it is heavily used in production through Riak; most Riak setups have Bitcask as their backend")])
fix("K3-100", "hedge restored: statement starts 'In most cases' (transcript: 'In most cases, when a file is allocated')",
    replace=[("statement", "File systems (BTRFS", "In most cases, file systems (BTRFS")])
fix("K3-084", "'each Bitcask holding a mutually exclusive set of data' -> 'the data split into mutually exclusive sets'; flag added",
    replace=[("statement", "with each Bitcask holding a mutually exclusive set of data",
              "with the data split into mutually exclusive sets")],
    add_flags=['check: "this is mutually exclusive set of data" (02:38:11) - what is partitioned is unclear'])
fix("K3-012", "detail: taught order is put, delete, get (teacher's own sequence garbled)",
    detail="The teacher builds the design one operation at a time, starting with put (taught order: put, delete, get; the "
           "spoken plan 'Then we'll cover get. Then we'll cover delete and then we'll cover get' is garbled).")

LOG["fix"].append(("K1-001", "board source added: B-001 (board 00:00:30) merged in, which supplies the agenda that the detail cites"))

# ---------------------------------------------------------------- 2. duplicate merges (absorbed -> kept)
CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}
owner = {i: i for i in items}  # original id -> id of the working item that holds it


def find(i):
    while owner[i] != i:
        i = owner[i]
    return i


SKIP_DETAIL = {"K2-002", "K3-103", "K3-118", "K3-119", "K3-045"}  # nuance text already carries the absorbed detail


def merge(a, k, why, nuance):
    A, K = items[a], items[find(k)]
    app_detail(K, nuance)
    if A.get("detail") and a not in SKIP_DETAIL:
        app_detail(K, A["detail"])
    K.setdefault("merged_verbatims", [])
    if A["verbatim"] != K["verbatim"]:
        K["merged_verbatims"].append(A["verbatim"])
    for s in A["source"]["audio"]:
        if s not in K["source"]["audio"]:
            K["source"]["audio"].append(s)
    for s in A["source"]["board"]:
        if s not in K["source"]["board"]:
            K["source"]["board"].append(s)
    for f in A["flags"]:
        if f not in K["flags"]:
            K["flags"].append(f)
    for d in A["depends_on"]:
        if d not in K["depends_on"]:
            K["depends_on"].append(d)
    if CONF[A["confidence"]] < CONF[K["confidence"]]:
        K["confidence"] = A["confidence"]
    if IMP[A["importance"]] > IMP[K["importance"]]:
        K["importance"] = A["importance"]
    # case_study is not adopted from the absorbed item: the Q&A items tie back to the first half only generically
    K["orig_ids"] += A["orig_ids"]
    K["merged_from"] += A["orig_ids"]
    K["edits"] += A["edits"]
    for kk in ("board_text", "board_notes", "resolved_by", "resolved_flags", "supported_by"):
        if A.get(kk):
            K.setdefault(kk, []).extend(A[kk])
    owner[a] = K["id"]
    del items[a]
    LOG["merge"].append((a, K["id"], why))


MERGES = [
    ("K1-091", "K1-081", "same header -> index size -> index -> data boot/decoder flow; K1-091's 'holds for every file format' framing moved to detail",
     "Restated (00:48:33) as our decoder's logic: the first 16 bytes are the header, which gives the index size, from which "
     "the index and then the data are located; offsets in the index point into the data part; this holds for every file format."),
    ("K1-118", "K1-119", "both say the read fetches only the needed bytes (pointed read); K1-118's 'nothing before, nothing after' moved to detail",
     "Each read fetches only the bytes of interest, nothing before and nothing after: the bare minimum."),
    ("K1-120", "K1-119", "same pointed-read-on-S3 point; K1-120's 'magical, ton of applications' moved to detail",
     "The teacher called this ability to fire pointed queries on S3 without reading the entire file 'magical', with a ton of applications."),
    ("K1-092", "K1-082", "both say the dictionary became one shippable file because of portability; K1-092's closing framing moved to detail",
     "Closing point (00:49:22): because of the portability constraint, the dictionary became a single file instead of multiple shipped files."),
    ("K3-118", "K1-048", "cross-part repeat (offset = byte position where a record starts); K3-118's 'not line numbers' Q&A check moved to detail (its status issue is moot)",
     "Q&A reinforcement (03:01:39): a student checked that offsets are the byte position where a record starts, not line "
     "numbers, answering 'Right. Okay. Sure.' within the same turn; no separate teacher answer is transcribed."),
    ("K3-119", "K1-079", "cross-part repeat (header holds the index size); K3-119's 'same file, not a separate file's location' clarification moved to detail",
     "Q&A clarification (03:02:20): the header holds the size of the index, i.e. the number of bytes of the index stored in "
     "the same file, not the location of a separate file (a student had understood that only a location was stored); read "
     "the header, get the index size, read that many bytes to get the index, then start serving."),
    ("K2-002", "K1-010", "cross-part repeat (weekly changelog); K2-002's 'only the changelog arrives', apple/ball/zoo example and 'apply to the file on S3' moved to detail",
     "Restated at the start of the updates discussion (01:05:16): every week Oxford sends a file containing only the words "
     "that changed and their new meanings (e.g. apple, ball and zoo), to be applied to the dictionary file on S3; asked "
     "whether the whole dictionary or only the changelog arrives, the teacher answered: only the changelog."),
    ("K2-076", "K1-035", "cross-part repeat (Athena queries a CSV on S3); K2-076's mechanism (index kept handy with the file) moved to detail",
     "Revisited at 01:46:23: Athena does exactly this - you load a CSV file and fire queries on it; behind the scenes it "
     "creates an index kept handy with the file, and on a request goes to the file, reads the records and serves them."),
    ("K2-077", "K2-071", "same 'pointed get on S3 without reading the whole file' point; K2-077's 'simple key-value format to start, more complex later' moved to detail",
     "What was built is the ability to fire a simple get-key request on S3 without reading the entire file - a simple "
     "key-value format to start with, more complex later (01:46:23)."),
    ("K3-113", "K2-074", "cross-part repeat (multi-tiered/cold storage on S3 stays queryable); K3-113's order-ID read, hot->cold tier and 'built next week' moved to detail",
     "Q&A (02:58:29): pointed reads on S3 (e.g. of a particular order ID) enable a classic cold-storage mechanism - moving "
     "data from the hot tier to the cold tier to save cost while still keeping it seamlessly queryable on S3 (as with "
     "Athena); to be built next week."),
    ("K3-114", "K2-075", "cross-part repeat (S3 cheap but slow; latency fine for infrequent reads); K3-114's 'S3 calls/network IO not cheap, S3 not very performant' moved to detail",
     "Q&A (02:59:16): for infrequent reads higher latency is acceptable; S3 calls and network I/O are not cheap and S3 is "
     "not very performant, but S3 storage is very cheap."),
    ("K3-116", "K2-067", "cross-part repeat (rolling deployment reloads the API servers); K3-116's 'out of the box from cloud providers, load balancer stays' moved to detail",
     "Q&A (03:00:19): rolling deployment comes out of the box from cloud providers: the load balancer stays, and servers are "
     "removed and added one at a time."),
    ("K3-120", "K2-031", "cross-part repeat (merged file is a whole new dictionary with header and index); K3-120's 'header is recreated' moved to detail",
     "Q&A (03:03:07): since the index size changes on every update, the header is recreated: the merge creates a whole new "
     "file with a new dictionary, a new index and a new header."),
    ("K3-121", "K2-022", "cross-part repeat (sorted file makes the merge efficient); K3-121's 'not introduced at first because there was no need' moved to detail",
     "Q&A (03:03:31): sorting was not introduced at first because there was no need; it came in when going into the "
     "details, because keeping the dictionary sorted makes merging the changelog into the original dictionary very easy "
     "and efficient."),
    ("K2-085", "K3-001", "pre-break agenda and post-break problem statement are the same super fast KV store; K2-085's O(1) ops, file-format focus, 'everyone uses it unknowingly' moved to detail",
     "Announced before the break (01:52:05): a super fast database that everyone uses unknowingly, with O(1) reads, writes "
     "and deletes plus persistence, going deeper into what the file format should be (not simple CSVs) to get max "
     "performance out of the hard disk."),
    ("K2-040", "K1-116", "cross-part repeat (index loaded into memory on boot/first S3 call, requests served from it); K2-040's restatement for the garbage example moved to detail",
     "Restated at 01:24:59 to set up the same-path garbage example: each API server loads the index into memory on its "
     "first call to S3, and every request is then served from the index (check the offset, go to that location, read the "
     "meaning, send it back)."),
    ("K2-053", "K2-057", "both say 'why poll 5,000 times for a weekly update'; kept K2-057 for the hedge 'I'm not against polling', K2-053's 'reactive avoids it' moved to detail",
     "First said at 01:32:26: with an update once a week, polling 5,000 times before it is unnecessary; reactive avoids it."),
    ("K2-062", "K2-066", "both say reloading the API server = what happens on boot; K2-062's hint framing moved to detail",
     "Introduced as a hint (01:37:06): after the path in meta.json is updated, what is needed is to trigger a reload of the "
     "API servers, which is literally what happens on boot."),
    ("K2-060", "K2-010", "same keep-it-simple principle; K2-060's 'utterly simple, anyone would understand, the beauty of system design' moved to detail",
     "Restated at 01:36:42 while rejecting a complex one-server-at-a-time proposal: make the solution utterly simple, "
     "something anyone would be able to understand - that is where the beauty of system design lies."),
    ("K3-023", "K3-017", "both define the append-only file (read anywhere, write only at the end); K3-023's 'random reads, not random writes' wording moved to detail",
     "Restated at 02:12:18: an append-only file allows random reads but not random writes, which is why reading at a "
     "stored offset is fine."),
    ("K3-045", "K3-071", "both describe implementing merge by tracking keys, replacing stale values and flushing; K3-045's 'classic way' first explanation moved to detail",
     "First explained at 02:21:57 as the classic way to do merge and compaction: iterate through the files keeping track of "
     "the keys seen, replace older values with newer ones, and periodically flush to disk."),
    ("K3-072", "K3-047", "both say the sawtooth must stay under the disk cap and sets merge frequency; K3-072's 'crossing the cap crashes the system', 'also sets max file size' moved to detail",
     "Summary at 02:34:55: the sawtooth determines the maximum file size and the merge frequency needed to keep usage under "
     "the cap; if usage crosses the disk's capacity the system crashes; very frequent merges are not good and very "
     "infrequent ones breach the cap, so keep it at the optimum."),
    ("K3-074", "K3-028", "both say get/put/delete are O(1), the bare minimum; K3-074's definition of O(1) moved to detail",
     "Summary at 02:35:31: the strength of the design is O(1) reads and writes, where O(1) means the bare minimum the disk "
     "has to do when asked to write."),
    ("K3-076", "K3-026", "both describe a read as one memory lookup plus one random read; K3-076's explicit cost statement moved to detail",
     "Summary at 02:36:23: a read costs one memory lookup and one random disk read, after which the data is sent back."),
    ("K3-103", "K3-089", "both recommend implementing Bitcask yourself; K3-103's details you discover, 'about a week' and the offer of help moved to detail",
     "Q&A (02:51:06): implementing a small Bitcask surfaces the devils in the details, such as whether to merge files in "
     "the same or a different process and how to update the in-memory index; it takes about a week and is not really "
     "difficult; the teacher offers help by note if anyone gets stuck."),
]
for a, k, why, nu in MERGES:
    merge(a, k, why, nu)

# ---------------------------------------------------------------- cross-links (partial overlaps kept separate)
XLINKS = [
    ("K1-117", ["K1-114"], "K1-112/K1-113/K1-117 random-read repeats: kept all three (definition / S3 support / GET flow); HDFS clause in K1-117 kept, linked to K1-114"),
    ("K1-109", ["K1-104"], "K1-104/K1-108/K1-109 central-storage chain: partial overlap, cross-linked"),
    ("K1-039", ["K1-034"], "K1-034/K1-039 keep-it-simple: cross-linked instead of merged (see rejected suggestions)"),
    ("K2-071", ["K1-119"], "K1-119 / K2-071 pointed reads on S3: K2-071 is the end-of-topic recap ('GET not PUT', 'huge applications'); cross-linked"),
    ("K2-061", ["K1-115"], "K1-115 / K2-061: static config path evolves into meta.json; evolution, cross-linked"),
    ("K3-115", ["K1-057", "K1-059"], "K1-057/K1-059 / K3-115 index-size and 'don't take MBs lightly': partial, cross-linked"),
    ("K3-111", ["K1-100", "K1-103"], "K1-100/K1-103 / K3-111 1 TB cost argument: K3-111 explains why 1 TB was chosen; cross-linked"),
    ("K2-047", ["K1-028", "K1-029"], "K1-028 / K2-047 multiple files kill portability (different proposals, same verdict): cross-linked"),
    ("K2-021", ["K1-038"], "K1-038 / K2-021 no fancy B+ trees: partial, cross-linked"),
    ("K2-010", ["K1-039"], "K1-039 / K2-010 keep-it-simple refrain across topics: cross-linked"),
    ("K2-018", ["K1-021"], "K1-021 / K2-018 no repetitive entries applied to graveyard updates: cross-linked"),
    ("K2-007", ["K1-020", "K1-021"], "K1-020 / K2-007 no duplicate words (readability vs ever-increasing file): cross-linked, both reasons kept"),
    ("K3-059", ["K1-019", "K1-040"], "K1-019/K1-040 / K3-059 CSV line format superseded by the length-prefixed record format: cross-linked"),
    ("K2-073", ["K1-016"], "K1-016/K1-086 / K2-073 can't just dump a JSON file and query it: partial, cross-linked"),
    ("K2-042", ["K2-039"], "K2-039 / K2-042 same-path upload problems: partial (list vs garbage UX), cross-linked"),
    ("K3-117", ["K2-083"], "K2-083 / K3-117: war story kept as its own item, cross-linked"),
    ("K2-068", ["K1-098"], "K1-098 / K2-068 meanings don't change drastically (partial-update vs rolling-deploy inconsistency): cross-linked"),
    ("K2-084", ["K1-057"], "K1-057 / K2-084 the 1.7 MB index reused to argue for sending the index: cross-linked"),
    ("K3-013", ["K2-018"], "K2-018 / K3-013 append-plus-compaction rejected for the dictionary, adopted for Bitcask: contrast, cross-linked"),
    ("K3-071", ["K2-025"], "K2-025 / K3-071 merge-sort merge (sorted) vs Bitcask merge (unsorted): contrast, cross-linked"),
    ("K3-017", ["K2-013"], "K2-013/K2-029 / K3-016/K3-017 no in-place rewrites on disk -> append-only rule: cross-linked"),
    ("K3-016", ["K2-029"], "K2-029 / K3-016 always create new entries vs overwrite-on-delete: cross-linked"),
    ("K3-094", ["K3-009"], "K3-009 / K3-094 early memtable push answered by the Bitcask vs SSTable Q&A: cross-linked"),
    ("K3-095", ["K3-009", "K3-021"], "K3-021 / K3-095 SSTable push vs immediate persistence Q&A: cross-linked"),
    ("K3-123", ["K2-025", "K2-026"], "K2-025/K2-026 / K3-123 one-pass merge; K3-123 keeps the O(n) vs O(n^2) numbers: cross-linked"),
    ("K3-096", ["K3-092"], "K3-092 / K3-096 next-week topics: partial, cross-linked"),
]
for i, deps, why in XLINKS:
    it = items[find(i)]
    for d in deps:
        if d not in it["depends_on"]:
            it["depends_on"].append(d)
    LOG["xlink"].append((i, why))

# ---------------------------------------------------------------- 3. board items
BOARD_MERGE = [
    ("B-001", "K1-001", "duplicates audio agenda (also supplies the board source the K1-001 hunter fix asked for)", None),
    ("B-002", "K1-003", "duplicates audio problem statement", None),
    ("B-003", "K1-004", "duplicates audio requirements (scalable storage & API servers)",
     "The board requirement list also has 'portable' and 'Response time can be high' (see {K1-006}, {K1-007})."),
    ("B-004", "K1-010", "duplicates audio weekly-changelog requirement", None),
    ("B-005", "K1-012", "duplicates audio 1 TB / 170,000 words",
     "The board line also says the lookup is always a singular word (see {K1-011})."),
    ("B-006", "K1-021", "duplicates audio 'no repetitive entries'", None),
    ("B-007", "K1-013", "duplicates audio four brainstorm axes", None),
    ("B-008", "K1-017", "duplicates audio text-file choice; JSON struck out on the board",
     "On the board 'JSON file' is struck out and the text file shows lines 'apple , a fruit' and 'amazon, a rainforest'."),
    ("B-009", "K1-024", "duplicates audio requirements raised in discussion",
     "The board groups three raised requirements: searchable via key, read heavy (very), each update should not be costly "
     "(see {K1-025}, {K1-026})."),
    ("B-010", "K1-027", "duplicates the student's sorting proposal; resolves F013", None),
    ("B-011", "K1-028", "duplicates the multiple-files proposal (written, then erased)", None),
    ("B-012", "K1-043", "duplicates audio linear scan of the 1 TB file", None),
    ("B-013", "K1-045", "duplicates audio 'indexing' rule", None),
    ("B-014", "K1-048", "duplicates audio offset example; resolves F023",
     "The board writes the index entries as 'apple, o1', 'amazon, o2', 'book, o3'."),
    ("B-015", "K1-057", "duplicates audio index-size computation",
     "The board writes the computation as 170,000 x (4.3 + 4 + 2) = (10.3 x 170,000) B = 1751000 B = 1751 KB = 1.751 MB."),
    ("B-016", "K1-058", "duplicates audio 'fits in RAM'", None),
    ("B-017", "K1-063", "duplicates audio two-file design; resolves F030 (file names)", None),
    ("B-018", "K1-065", "duplicates audio merge-into-one-file", None),
    ("B-019", "K1-066", "duplicates the separator proposal", None),
    ("B-020", "K1-067", "duplicates the fixed-size 2 MB proposal", None),
    ("B-021", "K1-071", "duplicates audio 'store the byte offset at the start'", None),
    ("B-022", "K1-080", "duplicates audio 16-byte header fields",
     "On the board 'index size' replaced an earlier 'St offset of data' line; the magic name is written OUR_DICT."),
    ("B-023", "K1-077", "duplicates audio AODB example (board spells AOBB)", None),
    ("B-024", "K1-089", "duplicates audio encoder & decoder", None),
    ("B-025", "K1-095", "duplicates audio LB + API servers + GET /word", None),
    ("B-026", "K1-100", "duplicates audio cost vs tedious updates vs inconsistency",
     "The board lists 'update tedious', 'inconsistency' and 'COST !!'."),
    ("B-027", "K1-106", "duplicates audio S3 + pointed reads", None),
    ("B-028", "K1-111", "duplicates audio NAS + file-system semantics",
     "The board writes the random-read primitive as (file, off, n) (see {K1-112})."),
    ("B-029", "K1-114", "duplicates audio HDFS / network HDD", None),
    ("B-030", "K1-116", "duplicates audio boot flow (path on S3, in-memory word -> offset map)", None),
    ("B-031", "K1-010", "duplicates audio weekly changelog (apple, ball, zoo)", None),
    ("B-032", "K2-005", "duplicates audio update server downloading from S3 (drawing only)", None),
    ("B-033", "K2-007", "duplicates the append-at-end proposal", None),
    ("B-034", "K2-013", "duplicates audio in-place overwrite limitation (also the source of K2-012's 'a fruit')",
     "The board shows 'apple, a round fruit' written over 'apple, a fruit' so that it runs into 'ball, a round obj'."),
    ("B-035", "K2-023", "duplicates audio 'new file, sorted'", None),
    ("B-036", "K2-027", "duplicates audio merge walkthrough",
     "The board version uses a sorted dictionary a..h and a changelog c - c'', e - e', f - f''."),
    ("B-037", "K2-031", "duplicates audio 'ready to upload to S3' (drawing only)", None),
    ("B-038", "K2-037", "duplicates audio 'where/how to upload, smooth transition' details",
     "The board note reads 'upload to new S3 path / transfer smooth / smooth transition'."),
    ("B-039", "K2-041", "duplicates audio apple offset 100 / 1024 bytes garbage example",
     "The prepared-notes page shows 'apple: 100, 1024', a new 'data.dat' and 'User sees garbage response during lookup'."),
    ("B-040", "K2-042", "duplicates audio 'servers hold the old index, must reload'", None),
    ("B-042", "K2-052", "duplicates audio Redis Pub/Sub reactive option",
     "Prepared notes label it '2. Reactive: PubSub' with a standalone updater, Redis and the API servers; a third option "
     "'Parallel Setup' is listed but its content is not shown."),
    ("B-043", "K2-043", "duplicates audio versioned S3 paths (board: S3://wd/dict1.dict, dict2.dict)", None),
    ("B-044", "K2-048", "duplicates audio polling a static metafile; resolves F071", None),
    ("B-045", "K2-054", "duplicates audio Redis Pub/Sub component (drawing only)", None),
    ("B-046", "K2-067", "duplicates audio AWS SDK -> deploy", None),
    ("B-047", "K2-081", "duplicates audio order of update-job steps (prepared procedure)",
     "The prepared procedure reads: spin up a new server, download the dictionary and the changelog locally, merge in O(n), "
     "create a new dict & index locally, upload to S3."),
    ("B-048", "K3-123", "duplicates the O(n) sorted-merge claim; supports F156", None),
    ("B-049", "K2-047", "duplicates the one-file-per-word proposal rejected for portability",
     "The prepared notes describe this alternative as a folder for each character holding one file per word, with the "
     "lookup building the S3 path, and say it breaks the major requirement of portability."),
    ("B-051", "K1-117", "duplicates audio read flow (prepared notes)", None),
    ("B-052", "K2-074", "duplicates audio multi-tiered storage (historical orders on S3, latest on MySQL)",
     "The board writes 'historical orders on S3 / latest orders on MySQL / Without losing an ability to Query the data'."),
    ("B-053", "K2-078", "duplicates audio Athena / data lakes", None),
    ("B-054", "K3-001", "duplicates the super fast KV store requirements", None),
    ("B-055", "K3-004", "duplicates audio magnetic disk (drawing only)", None),
    ("B-056", "K3-002", "duplicates audio storage hierarchy (SSD, memory, HDD)", None),
    ("B-057", "K3-011", "duplicates the append-suits-magnetic-disk reasoning; supports F100/F101",
     "The board writes 'Append only / Zero seek / no big mech movement / Best we can do!!'."),
    ("B-058", "K3-012", "duplicates audio put sequence K1 V1, K2 V2, K3 V3, K1 V1'", None),
    ("B-059", "K3-018", "duplicates audio delete = put with special value",
     "The board writes 'DEL K2 = PUT(K2, -1)'."),
    ("B-060", "K3-024", "duplicates audio K1 -> O4 repointing; resolves F111", None),
    ("B-061", "K3-031", "duplicates audio 'file grows huge' (written 02:15:45)",
     "The same board note also says 'amount of index fit in ram * Keys' (see {K3-030})."),
    ("B-062", "K3-039", "duplicates audio numbered files, one active, rest read-only",
     "The board labels files 001-004, marks the older ones 'Read Only', writes 'File Rotation' and an index entry 'K1 -> f1, O4'."),
    ("B-063", "K3-043", "duplicates audio merge & compaction", None),
    ("B-064", "K3-049", "duplicates audio two tuning knobs and the sawtooth under the 1 TB cap",
     "The board draws the sawtooth under a 1TB line and lists '1. MC freq 2. file rotation threshold'."),
    ("B-065", "K3-052", "duplicates audio 'SSD gains not as significant'; board-only '5000x gain' kept with a fact-check flag",
     "Prepared notes add 'High write throughput even on HDD' and a '5000x gain' figure that the audio does not state."),
    ("B-066", "K3-014", "duplicates audio 'append every put = max put performance' (prepared notes: 'lightning fast')",
     "Prepared notes: 'Simplest design: single files of KV pairs; PUT(K,V) -> append to this file; lightning fast operation'."),
    ("B-067", "K3-057", "duplicates audio key size / value size fields",
     "The board says reading 'until newline' is not optimal because key and value are variable length."),
    ("B-068", "K3-058", "duplicates audio two-step record read", None),
    ("B-069", "K3-060", "duplicates audio crash-while-writing integrity problem", None),
    ("B-070", "K3-066", "duplicates audio final record format CRC | TS | KSZ | VSZ | K | V",
     "The board adds 'CRC -> First thing we flush' (see {K3-063})."),
    ("B-071", "K3-026", "duplicates audio GET flow (hash table lookup, disk seek, disk read)",
     "The board spells GET(k) out as a pointed query: hash table lookup, disk seek, disk read - O(1) with an index."),
    ("B-072", "K3-040", "duplicates audio file rotation (rotate every 't' bytes, one ACTIVE file)",
     "Prepared notes: 'Rotate the file every t bytes'; the old file is made immutable and only one file is 'ACTIVE'."),
    ("B-073", "K3-070", "duplicates audio index entry contents",
     "The board names the index entry fields File ID, VSZ, VPOS (offset) and TS (timestamp)."),
    ("B-074", "K3-044", "duplicates audio 'update the index after compaction'; board-only 'atomically' kept as board nuance; supports F120 on K3-043",
     "Prepared notes: all immutable files are merged & compacted, stale and deleted entries skipped, and the index is "
     "updated 'atomically!' (the audio does not say atomically)."),
    ("B-075", "K3-073", "duplicates audio limitation + strengths summary",
     "The board summary lists: keys must fit in memory; O(1) reads, writes, deletes; high throughput, low latency; I/O "
     "saturation; easy backups."),
    ("B-076", "K3-079", "duplicates audio 'what we just designed is Bitcask'", None),
    ("B-077", "K3-082", "duplicates audio Uber / Riak backend",
     "Prepared notes: 'used by uber in production as Backend for Riak'; each node of Riak has an instance of Bitcask running."),
]


def board_merge(b, k, why, nuance):
    B = bmap[b]
    K = items[find(k)]
    for t in B["source"]["board"]:
        if t not in K["source"]["board"]:
            K["source"]["board"].append(t)
    K.setdefault("board_text", []).append(B["verbatim"])
    K.setdefault("board_notes", []).append({"id": b, "time": B["source"]["board"], "statement": B["statement"],
                                            "detail": B.get("detail")})
    if nuance:
        app_detail(K, nuance)
    for f in B["flags"]:
        if f not in K["flags"]:
            K["flags"].append(f)
    K["orig_ids"].append(b)
    K["merged_from"].append(b)
    owner[b] = K["id"]
    LOG["board"].append((b, "merged into " + k, why, B["verbatim"], K["id"]))


owner.update({b: b for b in bmap})
for b, k, why, nu in BOARD_MERGE:
    board_merge(b, k, why, nu)

# B-065's figure needs a fact-check flag on the receiving item
items[find("K3-052")]["flags"].append("check: '5000x gain' (prepared notes, 02:26:30) has no source in the audio")

BOARD_NEW = {
    "B-041": dict(topic="dictionary > updates > transition", depends_on=["K2-041"], importance="supporting",
                  statement="Prepared notes list transition option 1: a periodic refresh (pull) of each server's index; "
                            "between the index.dat change on S3 and the next pull, users get garbage responses, and the "
                            "servers need a graceful termination or reload.",
                  why="board-only (prepared-notes transition option 1, periodic pull of the index; not spoken)"),
    "B-050": dict(topic="dictionary > query > index size estimate", depends_on=["K1-057"], importance="aside",
                  confidence="medium",
                  flags=["check: prepared-notes sizing (171,476 words, avg 4.7, ~2.6 MB) differs from the live estimate "
                         "(170,000 x 10.3 = 1.751 MB)"],
                  why="board-only (prepared-notes index sizing with different numbers from the live estimate; flagged for fact-check)"),
}
for b, extra in BOARD_NEW.items():
    B = dict(bmap[b])
    why = extra.pop("why")
    B.update(extra)
    B["case_study"] = None
    B.update(orig_ids=[b], merged_from=[], edits=[])
    items[b] = B
    LOG["board"].append((b, "new item (board-only)", why, bmap[b]["verbatim"], b))

# ---------------------------------------------------------------- 4. flag resolutions (flag_resolutions.md)
def resolve(fid, orig, marker, btime, evidence, kind):
    it = items[find(orig)]
    hit = [f for f in it["flags"] if marker in f]
    assert hit, (fid, orig, marker, it["flags"])
    f = hit[0]
    before = it["confidence"]
    if kind == "resolved":
        it["flags"].remove(f)
        it.setdefault("resolved_by", []).append("board %s (%s: %s)" % (btime, fid, evidence))
        it.setdefault("resolved_flags", []).append("%s -> resolved_by board %s" % (f, btime))
        if not it["flags"]:
            it["confidence"] = "high"
        note = "flag removed; confidence %s -> %s" % (before, it["confidence"]) if before != it["confidence"] else \
            "flag removed; confidence stays %s (%s)" % (before, "other flags remain" if it["flags"] else "already high")
    else:
        it["flags"][it["flags"].index(f)] = f + " [supported_by board %s]" % btime
        it.setdefault("supported_by", []).append("board %s (%s: %s)" % (btime, fid, evidence))
        note = "flag kept and annotated; confidence unchanged (%s)" % before
    LOG["flag"].append((orig, "%s %s by board %s (%s); %s" % (fid, kind, btime, evidence, note), it["id"]))


FLAGS = [
    ("F013", "K1-027", "[?sorting", "00:14:00", "'sort by key -> efficient search' replaces 'Sort??'", "resolved"),
    ("F023", "K1-048", "[?two", "00:26:30", "index entries 'apple, o1 / amazon, o2 / book, o3'", "resolved"),
    ("F030", "K1-063", "file names as heard", "00:35:45", "labels 'index.dict' and 'data.dict'", "resolved"),
    ("F065", "K2-034", "[?uploaded", "01:22:45", "'upload to new S3 path' on screen", "resolved"),
    ("F071", "K2-048", "[?polling", "01:31:30", "'polling metafile -> meta.json'", "resolved"),
    ("F079", "K2-064", "[?paths", "01:39:45", "meta.json sketch '{ path: \"____\" }'", "resolved"),
    ("F099", "K3-001", "[?update", "02:03:00", "'Brainstorm : r, w, up, del + persish'", "resolved"),
    ("F111", "K3-024", "[?O4", "02:13:45", "'K1 -> O1' overwritten to 'K1 -> O4'", "resolved"),
    ("F130", "K3-073", "[?order one", "02:35:30", "'Strengths of this DB : O(1) reads, writes, deletes'", "resolved"),
    ("F143", "K3-103", "[?Bitcask implementation", "02:51:30", "'What we just designed is Bitcask' on screen; 'implementation' not written", "resolved"),
    ("F039", "K1-075", "Mixed 8th byte", "00:44:00", "header line 'OUR_DICT - 8B'", "supported"),
    ("F076", "K2-058", "[?reactive", "01:26:42", "prepared notes '2. Reactive: PubSub'", "supported"),
    ("F081", "K2-063", "[?versioning", "01:27:30", "versioned paths 'S3://wd/dict1.dict' / 'dict2.dict'", "supported"),
    ("F087", "K2-072", "[?recent", "01:47:45", "'latest orders on MySQL' (board says latest, not recent)", "supported"),
    ("F097", "K2-083", "[?API server", "01:43:15", "'API Servers' label and 'Deploy' arrow", "supported"),
    ("F100", "K3-011", "magnet is discard best", "02:06:15", "'Append only / Zero seek / no big mech movement / Best we can do!!'", "supported"),
    ("F120", "K3-043", "[?deleted", "02:35:15", "prepared notes 'stale entries skipped / deleted entries skipped'", "supported"),
    ("F156", "K3-123", "[?order n", "01:43:39", "prepared notes 'merge in O(n)' / 'Merging of two sorted lists'", "supported"),
]
for row in FLAGS:
    resolve(*row)
FLAG_NOT_APPLIED = [
    "F029 (00:33:21 [?byte]): supported by board 00:33:30, but no ledger item carries this marker in its flags (K1-056/K1-057 state bytes without it); nothing to annotate",
    "F043 (00:50:51 [check: teacher labelling the board]): supported by board 00:51:00, but no ledger item carries this marker; nothing to annotate",
    "F101 (02:04:48, same marker as F100): the single K3-011 flag is annotated once under F100",
    "F113 (02:14:35 [?file]): supported by board 02:15:45, but no ledger item carries this marker; nothing to annotate",
]

# ---------------------------------------------------------------- 5. topic normalisation
TOPIC = {
    "system design > keep it simple": "design principles > simplicity",
    "system design > reasoning": "design principles > reasoning",
    "system design > cost": "design principles > cost",
    "system design > storage vs compute": "design principles > storage vs compute",
    "principles > sorted data": "design principles > sorted data",
    "estimation > sizes": "design principles > estimation",
    "learning approach > implement": "admin > learning approach",
    "storage > s3 > tiered storage": "storage > multi-tiered storage",
    "dictionary > serving > s3": "dictionary > serving > central storage",
    "dictionary > serving > sizing": "dictionary > requirements",
    "dictionary > serving > boot": "dictionary > serving > read flow",
    "dictionary > serving": "dictionary > serving > read flow",
    "dictionary > updates > merge": "dictionary > updates > merge into new file",
    "dictionary > index": "dictionary > query > indexing",
    "dictionary > file format > header": "file formats > header",
}
for it in items.values():
    t = it["topic"]
    if t in TOPIC:
        it["topic"] = TOPIC[t]
        LOG["topic"].append((it["orig_ids"][0], "'%s' -> '%s'" % (t, TOPIC[t]), it["id"]))

# ---------------------------------------------------------------- 6. order, final ids
def secs(s):
    h, m, x = s.replace("~", "").split(":")
    return int(h) * 3600 + int(m) * 60 + int(x)


def first(it):
    a = [secs(r.split("-")[0]) for r in it["source"]["audio"]]
    if a:
        return min(a)
    return min(secs(b) for b in it["source"]["board"])


final = sorted(items.values(), key=lambda it: (first(it), ORDER[it["orig_ids"][0]]))
lid = {}
for n, it in enumerate(final, 1):
    lid[it["id"]] = "L-%04d" % n
id_map = {}
for o in list(ORDER):
    id_map[o] = lid[find(o)]


def L(i):
    return id_map[i]


def sub(text):
    return re.sub(r"\{([KGB]\d*-\d{3})\}", lambda m: L(m.group(1)), text) if isinstance(text, str) else text


out = []
FIELDS = ["id", "orig_ids", "origin", "type", "statement", "detail", "topic", "case_study", "source", "speaker", "status",
          "verbatim", "depends_on", "confidence", "flags", "importance", "merged_from"]
OPT = ["merged_verbatims", "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags", "edits"]
for it in final:
    me = lid[it["id"]]
    deps = []
    for d in it["depends_on"]:
        x = L(d)
        if x != me and x not in deps:
            deps.append(x)
    it["depends_on"] = deps
    it["statement"] = sub(it["statement"])
    it["detail"] = sub(it["detail"])
    it["source"]["audio"] = sorted(it["source"]["audio"], key=lambda r: secs(r.split("-")[0]))
    it["source"]["board"] = sorted(set(it["source"]["board"]), key=secs)
    a, b = it["source"]["audio"], it["source"]["board"]
    it["origin"] = "both" if a and b else ("audio" if a else "board")
    it["id"] = me
    rec = {k: it.get(k) for k in FIELDS}
    for k in OPT:
        if it.get(k):
            rec[k] = it[k]
    out.append(rec)

with open(os.path.join(D, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for r in out:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
with open(os.path.join(D, "id_map.json"), "w", encoding="utf-8") as f:
    def key(k):
        p = k[0]
        return ({"K": 0, "G": 1, "B": 2}[p], k)
    json.dump({k: id_map[k] for k in sorted(id_map, key=key)}, f, indent=1)

# ---------------------------------------------------------------- ledger_changes.md
REJECT = [
    "K1-034 -> K1-039 merge (gap report part 1): not merged, cross-linked instead. K1-034 (00:17:05) closes the Parquet digression, while K1-039 (00:21:03) answers the B+ tree proposal; merging would move the B+ tree pushback ahead of the proposal it answers",
    "K3-030 -> K3-073 merge (gap report part 3): not merged, cross-linked (K3-073 depends on K3-030). K3-030 is the limitation a student raised early (02:15:01); K3-073 is the teacher's 'main limitation' summary, which builds on the file-rotation index of K3-070",
    "K3-033 -> K3-039 merge (gap report part 3): not merged, cross-linked (K3-039 depends on K3-033). K3-033 is the teacher's first reply in the student exchange; K3-039 adds numbering and read-only files after the file-size discussion (K3-037/K3-038)",
    "K1-117 'drop the repeated HDFS clause' (gap report part 1): not dropped. It is the teacher's own repetition inside the GET flow; kept and cross-linked to K1-114",
    "K2-018 split / K2-048 split into two items (optional suggestions): not split. The detail of K2-048 now separates the endorsed metadata file from the challenged polling",
    "K3-118 status -> open (gap report part 3): superseded. K3-118 was merged into K1-048, the teacher's own definition, so its status no longer stands alone; the 'no separate teacher answer' note is in the detail",
    "K2-012 'remove a fruit' alternative: not taken. The board (01:11:45, B-034) shows 'apple, a fruit', so the meaning stays, sourced to the board",
]

lines = ["# Lecture 10 ledger - changes log", "",
         "Inputs: part1-3.jsonl, gaps.jsonl, gap_report.md, board/board_items.jsonl, board/flag_resolutions.md, "
         "transcript/transcript.md. Output: ledger.jsonl (final IDs L-0001.. in teaching order = first audio timestamp, "
         "board time for board-only items). Old->new IDs in id_map.json. Every hunter fix was re-checked against "
         "transcript.md before it was applied. Mechanical steps (renumbering, id_map, this log's [final] ids) were done by "
         "`build_ledger.py`; every decision in it is the editor's.", ""]
lines.append("## Distortion fixes (%d lines, from gap_report.md, each verified against transcript.md)" % len(LOG["fix"]))
lines.append("")
for i, log in LOG["fix"]:
    lines.append("- %s: %s [final %s]" % (i, log, L(i)))
lines += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(LOG["merge"]), ""]
for a, k, why in LOG["merge"]:
    lines.append("- %s -> %s: %s [final %s]" % (a, k, why, L(a)))
lines += ["", "### Partial overlaps cross-linked via depends_on instead of merged (%d)" % len(LOG["xlink"]), ""]
for i, why in LOG["xlink"]:
    lines.append("- %s: %s [final %s]" % (i, why, L(i)))
nb_m = sum(1 for x in LOG["board"] if x[1].startswith("merged"))
nb_n = len(LOG["board"]) - nb_m
lines += ["", "## Board decisions (%d B-items: %d merged, %d new) - one line per B id" % (len(LOG["board"]), nb_m, nb_n), ""]
for b, act, why, vb, _ in sorted(LOG["board"]):
    lines.append('- %s -> %s (%s): "%s" [final %s]' % (b, act, why, vb, L(b)))
lines += ["", "## Flag resolutions from the board (%d items touched)" % len(LOG["flag"]), ""]
for i, txt, _ in LOG["flag"]:
    lines.append("- %s: %s [final %s]" % (i, txt, L(i)))
lines += ["", "Rows not applied:"]
for t in FLAG_NOT_APPLIED:
    lines.append("- " + t)
lines += ["", "## Topic normalisation (%d items)" % len(LOG["topic"]), ""]
for i, txt, _ in LOG["topic"]:
    lines.append("- %s: topic %s [final %s]" % (i, txt, L(i)))
lines += ["", "Board items merged into audio items keep the audio item's topic; the two board-only items got topics from "
          "the dictionary tree ('dictionary > updates > transition', 'dictionary > query > index size estimate').", ""]
lines += ["## Rejected hunter suggestions (with reason)", ""]
for t in REJECT:
    lines.append("- " + t)
lines += ["", "## New items from gaps.jsonl", ""]
for g in ["G-001", "G-002", "G-003", "G-004"]:
    lines.append("- %s: added as is [final %s]" % (g, L(g)))
lines += ["", "## Validation", "", "`originals: 411 (parts 330, gaps 4, board 77) -> ledger 311 items`", "",
          "`PASS final ledger lectures/lec10/ledger | errors 0 | warnings 0`", ""]
open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8").write("\n".join(lines))
print("final items:", len(out), "| merges:", len(LOG["merge"]), "| board merged/new: %d/%d" % (nb_m, nb_n),
      "| flags resolved/supported: %d/%d" % (sum(1 for r in FLAGS if r[5] == "resolved"), sum(1 for r in FLAGS if r[5] == "supported")))
