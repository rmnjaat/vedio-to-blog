#!/usr/bin/env python3
"""Editor helper for lecture 09: applies the editor's decisions (encoded below) mechanically,
renumbers to L ids in teaching order, writes ledger.jsonl, id_map.json and ledger_changes.md.
Every judgement here is the editor's and is logged in ledger_changes.md."""
import json
import os
import re

D = os.path.dirname(os.path.abspath(__file__))
LEC = os.path.dirname(D)
SCHEMA = ["type", "statement", "detail", "topic", "case_study", "source", "speaker", "status", "verbatim",
          "depends_on", "confidence", "flags", "importance"]


def load(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


orig = []
for f in ["part1.jsonl", "part2.jsonl", "part3.jsonl", "gaps.jsonl"]:
    orig += load(os.path.join(D, f))
board = load(os.path.join(LEC, "board", "board_items.jsonl"))
items = {it["id"]: dict(it) for it in orig}
seq = {it["id"]: n for n, it in enumerate(orig)}
bitems = {b["id"]: b for b in board}
for it in items.values():
    it.setdefault("_edits", [])
    it.setdefault("_extra", {})

LOG = {"fix": [], "merge": [], "board": [], "flag": [], "topic": [], "rejected": [], "links": []}


def sub(i, field, old, new):
    v = items[i][field]
    assert old in v, (i, field, old)
    items[i][field] = v.replace(old, new)


def add_detail(i, text):
    d = items[i].get("detail")
    items[i]["detail"] = (d.rstrip() + " " + text) if d else text


def add_flag(i, f):
    if f not in items[i]["flags"]:
        items[i]["flags"].append(f)


# ---------------------------------------------------------------- 1. distortion fixes (gap_report.md)
FIXES = []


def fix(i, note):
    items[i]["_edits"].append(note)
    FIXES.append((i, note))


# part 1
items["K1-055"]["speaker"] = "teacher"
fix("K1-055", "speaker 'student (question)' -> 'teacher' (the insight is the teacher's answer 'We'll send it from the backend', which is also the verbatim)")

items["K1-111"]["statement"] = ("A student asked why not render images directly from S3, since it is blob storage; the teacher's "
                                "fragmentary reply was 'you cannot ... it is not meant for ... CDN is not a blob store'.")
items["K1-111"]["speaker"] = "student (proposal)"
items["K1-111"]["status"] = "proposed_then_corrected"
items["K1-111"]["detail"] = ("Correction (fragmentary): you cannot render directly from S3; it ties to the answer just before - "
                             "S3 is not public and reading it is only allowed for the CDN.")
add_flag("K1-111", 'check: subject of "it is not meant for"')
fix("K1-111", "removed invented subject 'S3 is not meant for that'; statement now quotes the fragmentary reply; speaker -> 'student (proposal)', status -> proposed_then_corrected, correction in detail tied to the S3-not-public answer; flag `check: subject of \"it is not meant for\"` added; confidence stays medium")

sub("K1-116", "statement", "S3 gives something like a nine-nines guarantee (durability)",
    "S3 gives 'nine nines guarantee, something like that'")
fix("K1-116", "removed '(durability)' (not said); kept the hedge 'something like that'")

sub("K1-091", "statement", "github.com/upload/policies/assets", "github.com/upload/policy/assets (as read aloud)")
fix("K1-091", "URL corrected to what was read aloud: 'github.com/upload/policy/assets'")

sub("K1-068", "statement", "is about 5 MB", "is probably about 5 MB")
add_flag("K1-068", "check: speaker boundary 00:33:00-00:33:10")
fix("K1-068", "hedge restored ('probably about 5 MB'); flag `check: speaker boundary 00:33:00-00:33:10` added")

add_detail("K1-061", "The teacher recommends the explicit invalidation API over waiting for the TTL: 'If you can do that, do that.'")
fix("K1-061", "detail now carries the teacher's recommendation 'If you can do that, do that.' (use the invalidation API)")

add_detail("K1-085", "Opening the bucket is technically possible ('You can still do it'), but not needed in this use case.")
fix("K1-085", "detail now carries the hedge 'You can still do it, but in this use case, you don't have to do it'")

sub("K1-002", "statement", "and busts a lot of assumptions", "and a lot of things will be busted")
fix("K1-002", "'busts a lot of assumptions' -> 'a lot of things will be busted' (transcript wording)")

items["K1-019"]["statement"] = ("Many people think a CDN is just there to cache things without knowing how, and imagine they push "
                                "things to it; a CDN is not something you push things to - CDNs now offer APIs, but that is not "
                                "their main motive; the CDN sits transparently between the user and the origin.")
fix("K1-019", "removed the overstatement 'not merely there to cache things'; now: people think a CDN just caches without knowing how and imagine pushing to it")

items["K1-063"]["statement"] = ("Asked whether a CDN can cache live content (e.g. live matches on Hotstar), the teacher answered "
                                "'Yeah. We'll talk about it 7.3. 6.3.' and deferred the details to a later session.")
fix("K1-063", "statement now keeps the teacher's 'Yeah' (quoted with the deferral, not interpreted as a firm yes); existing flag and medium confidence kept")

add_detail("K1-105", "Teacher's words: 'You see the high increase in loading time. It's because it is coming from CDN'.")
add_flag("K1-105", 'check: "high increase in loading time" - meant speed?')
items["K1-105"]["confidence"] = "medium"
fix("K1-105", "kept 'faster' (intended meaning) but detail quotes 'high increase in loading time'; flag added; confidence high -> medium")

sub("K1-011", "statement", "the components discussed in the first week: caching",
    "'those six components' discussed in the first week (listed: caching")
sub("K1-011", "statement", "asynchronous processing, scaling.", "asynchronous processing, scaling).")
fix("K1-011", "restored 'six components' (teacher then listed five)")

items["K1-028"]["source"]["audio"].append("00:18:22-00:19:12")
add_detail("K1-028", "Also at 00:18:22: 'sign up on a CDN, Akamai, Cloudflare, pick your favorite and build that and just try to configure it.'")
fix("K1-028", "added the unitemised repeat at 00:18:22-00:19:12 to sources and detail (hunter duplicate note, verified)")

items["K1-030"]["detail"] = None
fix("K1-030", "dropped detail sentence 'The content chosen for the CDN is the near-static, huge part (images)' - it repeats K1-031, which owns it")

# part 2
items["K2-054"]["statement"] = ("Instagram cannot afford true privacy at its scale: routing every image request through API servers "
                                "would need at least 50x to 100x more servers because of the huge image data transfer; it "
                                "reportedly runs more than 100,000 servers (teacher: 'That's what I've last heard. I'm not really sure.').")
fix("K2-054", "the 100,000-server fleet is now 'reportedly' with the teacher's hedge in the statement; confidence stays medium")

add_flag("K2-120", 'check: speaker of "Even if there are multiple values ... pick one" (may be Student 6)')
add_detail("K2-120", "The student's conclusion that hashtag is a poor key was upheld - for a different reason: one post has several hashtags, and the post topic cannot be re-keyed.")
fix("K2-120", "flag `check: speaker of \"Even if there are multiple values ... pick one\"` added; detail now says the student's conclusion was upheld for a different reason")

add_flag("K2-114", 'check: "this approach" - presumably the denormalized copy (approach 2); board may resolve')
items["K2-114"]["confidence"] = "medium"
fix("K2-114", "'denormalized approach' is inferred from 'this approach': flag added; confidence high -> medium (board B-048 lists consistency under approach 2 but does not settle 'this approach')")

items["K2-127"]["statement"] = ("If that Redis goes down there is data loss, because Redis does not persist anything - it is "
                                "real-time Pub/Sub.")
fix("K2-127", "removed the corrective parenthesis 'Redis (Pub/Sub)'; teacher said Redis unqualified")

add_detail("K2-038", "The teacher qualifies: he needs only short-term access (i.e. the URL while it is valid) 'as a basic hacker'.")
fix("K2-038", "detail now carries the condition 'I need short term access for it as a basic hacker'")

items["K2-002"]["statement"] = ("A student's proposed post table stores the user ID of the poster and the post content "
                                "(text/caption); the teacher accepted these and added when it was created (created_at).")
fix("K2-002", "created_at credited to the teacher, not the student")

add_flag("K2-094", 'check: "So there is a special column" - likely rhetorical "is there a special column?"')
fix("K2-094", "flag added for the contradictory 'So there is a special column' sentence; meaning unchanged")

items["K2-102"]["detail"] = ("A student (Student 1) raised that storing image IDs would need specifying which user's image it is; "
                             "the teacher answered: 'Post ID solves that problem.'")
fix("K2-102", "detail now says Student 1 raised the ambiguity and the teacher answered 'Post ID solves that problem'")

# part 3
items["K3-044"]["statement"] = ("When many updaters increment the same hashtag count, the database must provide atomicity; pick a "
                                "database that gives atomic guarantees (a key feature to read about a database); atomicity is not "
                                "exclusive to relational databases - MySQL and DynamoDB both give it.")
add_flag("K3-044", 'check: garbled "not only the databases give you atomicity FYI"')
items["K3-044"]["confidence"] = "medium"
fix("K3-044", "clause re-anchored on 'MySQL gives you, DynamoDB gives you both of them'; flag for the garbled sentence; confidence high -> medium")

items["K3-047"]["statement"] = "Kafka is not a single instance but a cluster."
items["K3-047"]["detail"] = ("A student added that if one node goes down another takes over because data is replicated; the "
                             "teacher called that availability ('So that's availability').")
fix("K3-047", "replication/failover explanation re-credited to Student 2 (detail); statement keeps only the teacher's 'Kafka is a cluster'")

items["K3-069"]["statement"] = ("Adding servers versus optimizing is first a management decision on engineering cost: in some cases, "
                                "organizations with a decent amount of money in the bank prefer to throw money at AWS for more "
                                "machines rather than spend engineers' time optimizing, because two more servers are typically very "
                                "cheap compared with engineer salaries.")
fix("K3-069", "hedge restored: 'often' -> 'in some cases, organizations with a decent amount of money in the bank'")

items["K3-068"]["statement"] = ("The teacher's answer assumes that the stateful component the servers depend on (S3) can handle "
                                "the extra requests.")
fix("K3-068", "assumption no longer stated as a condition ('only helps if'); then merged into K3-067 (see merges)")

add_flag("K3-088", 'check: garbled "not doing it for persistent just to count valuable information"')
items["K3-088"]["confidence"] = "low"
fix("K3-088", "flag for the garbled source sentence; confidence medium -> low")

items["K3-028"]["statement"] = ("The hashtag web server (read) and the asynchronous workers (write) were separated because they have "
                                "different responsibilities, not because read path and write path must live in separate services; "
                                "they were treated as separate concerns (web server vs asynchronous workers) - the read/write split "
                                "itself was not the reason.")
add_flag("K3-028", 'check: speaker of "Correct? Yes, that\'s correct."')
fix("K3-028", "'read/write path is a way of approaching concerns' (misread) replaced by 'treated as separate concerns (web server vs asynchronous workers)'; speaker flag added")

items["K3-045"]["statement"] = ("The top-100 array in the hashtag document is most likely replaced wholesale: depending on what the "
                                "data science team sends, they give a top hundred each time and you simply replace the entire array.")
items["K3-045"]["detail"] = "The student worried that reading and re-sorting the array would be inefficient."
fix("K3-045", "'(no reading and re-sorting)' moved out of the teacher's statement into detail as the student's concern")

sub("K3-037", "statement", " consume (in batches) at their own pace", " consume at their own pace")
items["K3-037"]["detail"] = "The student added that the consumers batch ('They are batching ... Those are batch mode')."
fix("K3-037", "'(in batches)' removed from the teacher's statement; the student's 'They are batching' moved to detail")

items["K3-097"]["statement"] = ("The teacher does not go into MapReduce in depth because it is very data engineering specific, but "
                                "sprinkles the core idea.")
add_flag("K3-097", "check: whether MapReduce is covered later was not answered directly")
fix("K3-097", "'is not covered in the course' -> 'does not go into it in depth ... but sprinkles the core idea'; flag added")

items["K3-102"]["statement"] = ("Implement what you learn: without implementation it is all theoretical knowledge, because the "
                                "problems only appear when you implement.")
items["K3-102"]["detail"] = ("War story given with it: the teacher took up a big data responsibility with no prior idea about big "
                             "data, still became a leader of big data and had to learn all of it that way; he is now working on "
                             "optimizing Spark.")
fix("K3-102", "statement is the rule only; the war story is reworded faithfully ('took up a responsibility ... still became a leader of big data') and kept in detail (not split - see Rejected)")

# ---------------------------------------------------------------- 2. duplicate merges
MERGES = [  # absorbed, kept, why, nuance moved to detail, keep absorbed verbatim
    ("K1-079", "K1-077", "same PUT/POST + validity facts of the pre-signed proposal",
     "Restated by the student at 00:38:46: S3 provides two methods, PUT and POST, for uploading via a pre-signed URL, and the URL has a validity after which it expires, so the upload must happen within that duration; the teacher then built the explanation around pre-signed URLs with expiration.", True),
    ("K1-088", "K1-080", "both say the direct upload avoids the double 5 MB transfer",
     "At 00:44:03 the teacher summarised: pre-signed uploads make the architecture flexible and efficient - no bulky image upload servers taking up images, and a 1 x 5 MB transfer instead of 5 + 5 MB, which saves network cost.", True),
    ("K1-060", "K1-056", "both say the backend sends the CDN URL and the frontend only renders it",
     "Repeated at 00:28:03 with a catchphrase: frontend websites are 'utterly stupid' - they just render whatever URL they are given, so it is the backend's responsibility to change those URLs to CDN URLs and send them to the user.", True),
    ("K1-059", "K1-058", "same exchange; K1-059 is the teacher's line inside K1-058's range",
     "Within this exchange (00:27:01) the teacher made explicit that the website does not make a call to the CDN (Akamai) to serve content: the browser requests the CDN URL it was given and the CDN forwards to the origin.", True),
    ("K1-050", "K1-028", "same 'configure a CDN yourself, practical experience' advice",
     "Repeated at 00:21:40: configure any CDN of your choice, e.g. using the teacher's website or image as origin, and see how it caches; even if it costs a dollar or two it is peanuts - practical experience is what matters.", True),
    ("K1-121", "K1-028", "same hands-on advice, restated at the end of part 1",
     "Repeated at 01:03:31: sign up on Akamai or Cloudflare, create an AWS account and spend about $100 (7,000-8,000 rupees) of your salary to play with CDN, S3 and AWS and experience this.", True),
    ("K2-031", "K1-118", "K2-031 restates the CDN-reads-private-S3-with-AWS-keys point in the serving flow",
     "Restated in the Instagram serving flow (01:15:02): images are served through the CDN, which sits transparently between the user and S3, and the AWS keys are uploaded to the CDN so it can read from S3 when the bucket is private.", True),
    ("K2-057", "K2-046", "both say the CDN is 100% stateless",
     "Repeated at 01:29:31: the CDN maintains no state and works only on query parameters; each CDN has its own set of supported query parameters.", True),
    ("K2-047", "K2-055", "same time-bounded certificate mechanism; K2-055 is the fuller JWT version",
     "First stated at 01:24:09: instead of authentication, CDN access relies on time-bounded certificates - the URL carries an expiration time and a certificate created over it 'so no one can change that time'; that is how CDN 'authentication' works.", True),
    ("K2-103", "K2-111", "both are 'copy the post object into the hashtag document' (denormalized)",
     "Introduced at 02:01:42: copying the actual post object (ID, caption, whatever is in the post table) into the hashtag document is a denormalized way of storing things.", True),
    ("K2-104", "K2-112", "both say the denormalized copy costs space but needs one read",
     "Students raised this first (02:01:57): the denormalized copy increases storage (teacher: correct) but means less data to fetch - everything comes in one go; the teacher: you just read this one document and send it to the user.", True),
    ("K2-131", "K2-133", "count += n instead of count++ is part of the full counting path",
     "Stated first at 02:13:21: with all posts of a hashtag on one server, the counter does count += n (n depending on the batch size) instead of count++ per post.", True),
    ("K3-004", "K2-136", "same adapter pattern, restated on the final architecture",
     "Restated with the final architecture (02:23:58): the original post Kafka cannot be changed because search, notification and every other service depend on it, but hashtag counting needs a different partitioning key; the adapter is two Kafkas combined with a simple processor that only reorders or repartitions the messages - a very common practice.", True),
    ("K3-010", "K2-145", "same top-100 ingestion via the data science team's Kafka",
     "Restated at 02:26:35, naming it the popularity service built by the data science team: it writes to their Kafka, the hashtag service consumes from that Kafka and writes the data into its own database; this stream is not very high throughput, so this is fine.", True),
    ("K3-011", "K2-140", "same 'store the top 100 in our own DB for fast response'",
     "Restated at 02:26:35: even though the popularity service may store the top 100 photos in its own database, the hashtag service copies the data, formats and structures it its own way and stores it in its own database, to guarantee a very fast response time when the user opens the hashtag page.", True),
    ("K3-068", "K3-067", "both carry 'assuming S3 (the stateful dependency) can handle it'",
     "The teacher states this as an assumption: 'I'm assuming that your S3s can handle the request. Like your stateful component on which it is dependent, it is able to handle now.'", True),
    ("K3-066", "K3-063", "same three starting points; K3-066 is the teacher's summary",
     "Summarised at 03:03:07: in most cases consumers resume from the last checkpoint; new consumers start from the horizon; very few cases start from the most recent message.", True),
    ("K3-042", "K3-040", "K3-042 is the teacher's elaboration of the webhook trade-off already summarised in K3-040's detail",
     "At 02:47:20 the teacher added that the data science team would say reprocessing is not their job - writing to Kafka and being done is what they would prefer.", True),
]

CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}
absorbed_into = {}

# ---------------------------------------------------------------- 3. flag resolutions (before merging, so they travel)
FLAGRES = [  # item, F id, kind, flag substring, board time, evidence
    ("K1-009", "F005", "resolved", "transactional DB", "00:02:15", "year-1 architecture names Cassandra, PostgreSQL, Memcached, Redis, RabbitMQ"),
    ("K1-037", "F016", "resolved", "a.mycdn.net/systemdesign", "00:13:30", "'User hitting : https://a.mycdn.net/syskm-design/logo.png'"),
    ("K1-047", "F020", "resolved", "demo file name", "00:20:15", "browser shows https://arpitbhayani.me/static/img/arpit.png"),
    ("K1-055", "F029", "supported", "demo file name", "00:21:00", "edge URL https://edge.arpitbhayani.me/img/arpit.png shown earlier"),
    ("K1-064", "F036", "resolved", "separation of concerns", "00:30:45", "'Brainstorm: storage, data flow, separation of concern, ...'"),
    ("K1-092", "F051", "resolved", "file name as read", "00:46:45", "upload payload 'name: n_t0lO0mq5Q.png'"),
    ("K1-095", "F052", "resolved", "demo file name", "00:49:45", "form.key '4745789/221335625-6060fc97-...png'"),
    ("K1-097", "F053", "resolved", "s3.amazon.awls.com", "00:50:00", "upload_url 'https://github-production-user-asset-6210df.s3.amazonaws.com...'"),
    ("K1-103", "F055", "resolved", "s dot a amazon", "00:52:15", "same S3 response JSON on screen"),
    ("K1-103", "F054", "supported", "pre-signed | asr", "00:39:15", "'Presigned URL with expiration' on the board earlier"),
    ("K1-109", "F061", "supported", "S3 | asr: \"SD\"", "00:44:45", "'S3/GCS' and 's3://img/<r.id>.png' on the upload page"),
    ("K1-111", "F070", "supported", "S3 | asr: \"three\"", "00:44:45", "'S3/GCS' on the upload page"),
    ("K2-009", "F085", "supported", "CDN URL | asr", "01:06:00", "'url' in the post table struck out; CDN URL https://instacdn.net/123/abc.jpg in notes 01:08:15"),
    ("K2-032", "F092/F093", "resolved", "overall flow", "01:16:15", "notes heading 'Overall Flow:'"),
    ("K2-033", "F096", "resolved", "backend | asr", "01:16:15", "'Dynamically generated by backend'"),
    ("K2-048", "F104", "supported", "EDN", "01:22:15", "inspected src has parameter 'edm=' - 'EDN' is likely edm"),
    ("K2-058", "F107", "resolved", "IMG tag", "01:30:30", "'when the URL is rendered through IMG tag,'"),
    ("K2-094", "F122/F123/F124", "supported", "tags | asr", "01:58:45", "'tag: sunset' in the hashtag document"),
    ("K2-116", "F131", "supported", "count | asr", "02:06:00", "notes 'count of photos'; live 'Count +=n' by 02:14:15"),
    ("K2-120", "F132", "resolved", "partitioning key", "02:09:30", "'Q: what would be the partition key on Kafka Topic?'"),
    ("K3-010", "F151", "resolved", "high throughput", "02:27:00", "'* Not high throughput' under 'Their Kafka'"),
    ("K3-022", "F152", "resolved", "aspects", "02:32:57", "'if a post has 8 hashtags we would need one event for each hashtag'"),
    ("K3-035", "F164", "resolved", "accounting services", "02:45:00", "'Counting Servers' in the architecture"),
    ("K3-036", "F165", "resolved", "Hashtag extension", "02:45:00", "'HashTag Extraction' box"),
    ("K3-049", "F186", "resolved", "queues | asr", "02:56:00", "'\"Dead Letter Queue\"' written above the diagram"),
    ("K3-067", "F208", "supported", "pre-signed URLs", "01:39:00", "'Presigned URL with expiration' earlier on the board"),
    ("K3-095", "F224", "resolved", "data queue", "03:22:00", "'\"Dead Letter Queue\"' on screen"),
    ("K3-096", "F228", "resolved", "dead letter you", "03:22:15", "'\"Dead Letter Queue\"' on screen"),
]
for i, fid, kind, key, bt, ev in FLAGRES:
    it = items[i]
    hit = [f for f in it["flags"] if key in f]
    assert len(hit) == 1, (i, key, it["flags"])
    f = hit[0]
    before = it["confidence"]
    if kind == "resolved":
        it["flags"].remove(f)
        it["_extra"].setdefault("resolved_by", []).append("board %s (%s: %s)" % (bt, fid, ev))
        it["_extra"].setdefault("resolved_flags", []).append(f)
        if not it["flags"] and it["confidence"] != "high":
            it["confidence"] = "high"
        rest = len(it["flags"])
        note = "%s resolved_by board %s (%s); flag removed; confidence %s -> %s%s" % (
            fid, bt, ev, before, it["confidence"], " (other open flags remain: %d)" % rest if rest else "")
    else:
        it["flags"][it["flags"].index(f)] = f + " [supported_by board %s]" % bt
        it["_extra"].setdefault("supported_by", []).append("board %s (%s: %s)" % (bt, fid, ev))
        note = "%s supported_by board %s (%s); flag kept and annotated; confidence unchanged (%s)" % (fid, bt, ev, before)
    LOG["flag"].append((i, note))
    if "board" not in it["source"] or bt not in it["source"]["board"]:
        pass  # evidence time is recorded in resolved_by/supported_by, not as a teaching source

# apply merges
for a, k, why, nuance, keepv in MERGES:
    A, K = items[a], items[k]
    add_detail(k, nuance)
    for r in A["source"]["audio"]:
        if r not in K["source"]["audio"]:
            K["source"]["audio"].append(r)
    for b in A["source"]["board"]:
        if b not in K["source"]["board"]:
            K["source"]["board"].append(b)
    for f in A["flags"]:
        if f not in K["flags"]:
            K["flags"].append(f)
    if CONF[A["confidence"]] < CONF[K["confidence"]]:
        K["confidence"] = A["confidence"]
    if IMP[A["importance"]] > IMP[K["importance"]]:
        K["importance"] = A["importance"]
    if not K.get("case_study") and A.get("case_study"):
        K["case_study"] = A["case_study"]
    for dd in A["depends_on"]:
        if dd not in K["depends_on"]:
            K["depends_on"].append(dd)
    if keepv and A["verbatim"] != K["verbatim"]:
        K["_extra"].setdefault("merged_verbatims", []).append(A["verbatim"])
    for key in ("resolved_by", "resolved_flags", "supported_by"):
        if key in A["_extra"]:
            K["_extra"].setdefault(key, []).extend(A["_extra"][key])
    if A["_edits"]:
        K["_extra"].setdefault("edits", []).extend("%s: %s" % (a, e) for e in A["_edits"])
    K.setdefault("_absorbed", []).append(a)
    absorbed_into[a] = k
    LOG["merge"].append((a, k, why, nuance[:110] + ("..." if len(nuance) > 110 else "")))

# ---------------------------------------------------------------- 4. board items
BMERGE = {  # B id: (target, board-only nuance for detail or None)
    "B-001": ("K1-001", "Board agenda: Instagram's year-1 architecture; how CDN works; uploading photos at scale; hashtag service."),
    "B-002": ("K1-009", "Board/screen (year-1 architecture): Nginx in front of Django, Celery for background work; stores Cassandra, PostgreSQL (written 'Poslgresal'), Memcached, Redis and RabbitMQ ('Rabbit...'); Django and Celery connect to every store."),
    "B-003": ("K1-010", None),
    "B-004": ("K1-007", "Board: 'Why famous ? 1 year, 14 million, 3 engineers' (the board does not say what the 14 million counts)."),
    "B-005": ("K1-018", None),
    "B-006": ("K1-022", None),
    "B-007": ("K1-022", "Board: origin https://arpitbhayani.me with the path /system-design/logo.png; the CDN has its own domain, say https://a.mycdn.net."),
    "B-008": ("K1-034", "Board flow: user hitting https://a.mycdn.net/syskm-design/logo.png [sic] goes to the CDN, which finds the origin for a.mycdn.net and forwards the request to https://arpitbhayani.me/syskm-design/logo.png; aside 'caches it and returns'."),
    "B-009": ("K1-047", "Screen: origin URL https://arpitbhayani.me/static/img/arpit.png and CDN URL https://edge.arpitbhayani.me/img/arpit.png (the edge subdomain maps /img/ to the origin's /static/img/)."),
    "B-011": ("K1-064", None),
    "B-012": ("K1-074", "Board question 'Should upload Not go through your API server?' (pink 'Not' inserted after 'upload')."),
    "B-013": ("K1-066", None),
    "B-014": ("K1-082", "Board: 'Bandwidth concern' and 'Presigned URL with expiration', with an arc from the user straight to S3/GCS bypassing the ImgUpld box."),
    "B-015": ("K1-083", "Board: '1. talk to img upload r.id } prepare', photo path 's3://img/<r.id>.png'."),
    "B-016": ("K1-093", "Screen: POST /assets response with upload_url https://github-production-user-asset-6210df.s3.amazonaws.com... and a signed form (key, acl 'public-read', policy, X-Amz-Algorithm AWS4-HMAC-SHA256, X-Amz-Credential, X-Amz-Date, X-Amz-Signature)."),
    "B-017": ("K1-103", "Screen (network rows): 204 POST to the S3 host, then a 200 PUT to github.com for asset 221335625 confirming it; the image is then served from https://user-images.githubusercontent.com/4745789/221335625-...png."),
    "B-018": ("K2-013", "Live board: post table 'user.id, Caption, url' with 'url' circled and then struck out."),
    "B-019": ("K2-026", "Board: the user keeps track of the random image id it got from the Image Svc and uses it to create the entry in the posts table."),
    "B-021": ("K2-014", "Board: 'Photo's S3 path can be computed at S3:// insta-images / <user_id> / <random photo id>', with connectors from the user_id and image_id rows."),
    "B-023": ("K2-026", "Board steps: 1. user A talks to Image Service to prepare for upload; 2. Image Service generates a random image ID and talks to S3; A uploads the photo directly to S3."),
    "B-024": ("K2-035", "Board: https://instacdn.net/123/abc.jpg -> CDN -> S3."),
    "B-026": ("K2-061", "Board diagram: Posts Service writes to MySQL; events reach Kafka directly and via CDC from MySQL; Other Services (Search, Notification, Analytics) consume them. CDC appears only on the board."),
    "B-027": ("K2-123", "Board Q&A: 'Q: what would be the partition key on Kafka Topic? ' user_id ''."),
    "B-028": ("K2-032", "Board: 'user B visits A's profile GET /users/A/posts'."),
    "B-029": ("K2-033", "Board: url '\" \"' 'Dynamically generated by backend', e.g. https://instacdn.net/A/1234.png."),
    "B-030": ("K2-034", None),
    "B-031": ("K2-038", "Board: 'Are instagram's private photo really private? No - Every photo URL has signature (timed) attached in the URL'."),
    "B-032": ("K2-045", "Board URL shape: https://instacdn.net/ul/1729_4275.jpg?ig_cache_key=...&oh=...&oe=...&nc_sid=..."),
    "B-033": ("K2-049", "Screen: the real src is on instagram.fblr22-1.fna.fbcdn.net with parameters stp, _nc_ht, _nc_cat, _nc_ohc, edm, ccb, ig_cache_key, oh, oe, _nc_sid; the tampered URL returned the page text 'Bad URL timestamp'."),
    "B-034": ("K2-058", None),
    "B-035": ("K2-041", "Board: 'The URL is short lived because certs are short lived'."),
    "B-036": ("K2-067", "Board: users belong to different geographies, network bandwidth, mobile devices and processing power."),
    "B-037": ("K2-067", "Board: 'sending 5MB photo uploaded by your favourite celeb to all the followers is a very bad idea!' (board says 5MB; audio example says 50 MB)."),
    "B-038": ("K2-068", "Board: 'we should have different resolutions of photos ready to serve to the users depending on their \"stak\"' (last word illegible: stats or state)."),
    "B-039": ("K2-066", None),
    "B-040": ("K2-072", "Board example: https://instacdn.net/ul/1729_4275.jpg?w=360 - the CDN loads the photo, transforms it to 360px, caches it and sends the transformed photo to the user."),
    "B-041": ("K2-091", None),
    "B-042": ("K2-091", "Board example page: '#sunset 1.2m photos'."),
    "B-043": ("K2-092", None),
    "B-044": ("K2-093", "Board brainstorm: Storage, counting, inter-service communication (posts svc to HashTag svc), large volume, super-fast response times."),
    "B-045": ("K2-093", "Board (on screen until about 01:56:00, then removed): 'atomicity, partial update'."),
    "B-046": ("K2-098", "Board document: { tag: sunset, total_photos: 1.2m, top_100: [ ] }."),
    "B-047": ("K2-107", "Board, approach 1 (post_id1, post_id2): latest data, less space, talk to post DB."),
    "B-048": ("K2-111", "Board, approach 2 ({id, caption, ...}): large space, fast time, consistency (issue)."),
    "B-049": ("K2-119", "Board: posts -> [queue] -> [consumer] Batching -> DB."),
    "B-050": ("K2-125", "Live board: queue label 'hashtag' replaced by 'user_id'; notes: 'challenge: POST_PUBLISH topic is partitioned by post_id or user_id'."),
    "B-051": ("K2-128", "Board: 'p1: #sunset #sun #nature' (third tag written '#nolne'; audio calls the post 'post 31')."),
    "B-052": ("K2-130", "Notes: 'for our batching and counting to work, we need an event per hashtag' - a post with 8 hashtags needs 8 events."),
    "B-053": ("K3-001", "Notes: the adapter reads POST_PUBLISH events from Kafka, extracts all hashtags from the post and creates 'n' new events on topic POST_HASHTAG, partitioned by hashtag."),
    "B-054": ("K3-002", "Notes: post_1729: #sunset #sun #nature re-published on 'Topic: POST_HASHTAG partitioned by hashtag' - 'Repartitioning and reindexing'."),
    "B-055": ("K3-017", None),
    "B-056": ("K2-133", "Live board 'Count +=n' near the DB; notes 'Batch and partially update [per hashtag]'."),
    "B-057": ("K3-032", "Live annotation: events are <h1, p1> tuples; the counting server keeps { h1: int } before writing."),
    "B-058": ("K2-145", "Board: Popularity Svc (per hashtag popular photos) -> Their Kafka ('Not high throughput') -> Workers -> hashtag DB; live: 'DS' stick figure -> pipe -> consumer -> hashtag DB."),
    "B-060": ("K3-024", "Board 'Key Takeaways': Kafka as a glue; adapter pattern; effective batching and counting; READ and WRITE path optimizations."),
    "B-062": ("K3-012", None),
    "B-063": ("K3-018", "Board: 'WRITE PATH Optimization - Ingestion in kafka; Requirements from storage? - Partial updates'."),
    "B-064": ("K3-014", "Board: 'counting: Batching -> Partitioning; HashTag API servers won't count; worker nodes batch and update'."),
    "B-065": ("K3-015", "Board 'READ PATH optimizations': centralized cache; Hashtag API to do bare minimum work; DB should be able to handle reads."),
    "B-066": ("K2-139", "Board (03:16:30): 'Key requirement: Superfast response times - One request /hashtag/<tag>' returning tag, total_photos and top_photos 'in a single response', 'pre-computed and pre-evaluated' - 'CORE of our system'."),
    "B-067": ("K3-049", "Board: '\"Dead Letter Queue\"' written during the Q&A as the term to look up."),
    "B-068": ("K3-063", "Board sketch: a message stream with H (horizon) at the left end and LC (last commit) over a circled message."),
}
BNEW = {  # board-only content: B id -> reason
    "B-010": "no audio states the 5 million uploads/day requirement",
    "B-020": "the full posts-table schema with 'id -> id generator' appears only on the notes",
    "B-022": "'LinkedIn also does this / CDNs also do this' is never said in the audio",
    "B-025": "validating that image_id belongs to the same user is never said in the audio",
    "B-059": "the complete final architecture as one diagram has no single audio item (its parts are spread over several items)",
    "B-061": "key-value access and 'Partitioned DB: MySQL, MongoDB, DDB' are not said in the audio",
}
assert set(BMERGE) | set(BNEW) == set(bitems) and not (set(BMERGE) & set(BNEW))

for b, (t, nuance) in BMERGE.items():
    B = bitems[b]
    t = absorbed_into.get(t, t)
    K = items[t]
    for bt in B["source"]["board"]:
        if bt not in K["source"]["board"]:
            K["source"]["board"].append(bt)
    K["_extra"].setdefault("board_text", []).append(B["verbatim"])
    K["_extra"].setdefault("board_notes", []).append(
        {"id": b, "time": B["source"]["board"], "statement": B["statement"], "detail": B["detail"] or None})
    if nuance:
        add_detail(t, nuance)
    K.setdefault("_absorbed", []).append(b)
    LOG["board"].append((b, "merged into %s (duplicates audio)%s: \"%s\"" % (
        t, "; board nuance added to detail" if nuance else "", B["verbatim"][:80])))
    absorbed_into[b] = t

TOPIC_FOR_NEW = {"B-010": "image-upload > requirements", "B-020": "data-modeling > post-table",
                 "B-022": "data-modeling > derived-values", "B-025": "image-upload > post-service",
                 "B-059": "hashtag-service > architecture", "B-061": "hashtag-service > storage"}
DEPS_FOR_NEW = {"B-010": ["K1-064"], "B-020": ["K2-013"], "B-022": ["K2-014"], "B-025": ["K2-026"],
                "B-059": ["K3-001"], "B-061": ["K3-005"]}
for b, why in BNEW.items():
    B = dict(bitems[b])
    B["topic"] = TOPIC_FOR_NEW[b]
    B["depends_on"] = DEPS_FOR_NEW[b]
    B["detail"] = B["detail"] or None
    B["_edits"], B["_extra"] = [], {"board_text": [B["verbatim"]]}
    items[b] = B
    seq[b] = 10 ** 6 + int(b[2:])
    LOG["board"].append((b, "new item (board-only; %s): \"%s\"" % (why, B["verbatim"][:80])))

# ---------------------------------------------------------------- 5. cross-links (partial overlaps kept separate)
LINKS = [("K2-035", "K1-036"), ("K2-036", "K2-017"), ("K2-141", "G-003"), ("K3-030", "K2-132"), ("K2-076", "K1-063"),
         ("K3-016", "K2-122"), ("K3-043", "K2-146"), ("K3-029", "K2-132"), ("K3-046", "K2-123"), ("K3-007", "K1-040"),
         ("K3-009", "K1-061"), ("K2-055", "K1-101"), ("K2-084", "K1-066"), ("K2-086", "K1-003"), ("K3-001", "K2-133"),
         ("K3-003", "K2-133"), ("K3-035", "K2-126"), ("K3-022", "K2-134"), ("K3-027", "K2-065"), ("K3-024", "K2-147"),
         ("K2-037", "K1-123"), ("K2-038", "K1-122"), ("K2-033", "K1-109"), ("K2-013", "K1-083"), ("K2-015", "K1-095"),
         ("K3-088", "K3-034"), ("K3-054", "K3-049"), ("K3-086", "K3-085"), ("K2-087", "K1-017")]
for a, b in LINKS:
    if b not in items[a]["depends_on"]:
        items[a]["depends_on"].append(b)
        LOG["links"].append((a, b))

# ---------------------------------------------------------------- 6. topic normalisation
RENAME = [  # (regex on normalised topic, replacement, reason)
    (r"^image upload\b", "image-upload", "part 1 'image upload' and part 2 'image-upload' unified"),
    (r"^system design approach > ", "design-method > ", "approach/mindset topics unified under design-method"),
    (r"^engineering mindset$", "design-method > engineering-mindset", "approach/mindset topics unified under design-method"),
    (r"^learning approach$", "learning-approach", "segment hyphenated"),
    (r"^tech stack trends", "tech-stack-trends", "segment hyphenated"),
    (r"^admin > backward reference$", "admin > backward-reference", "same admin sub-topic spelled two ways"),
    (r"^delegation > kafka > adapter$", "delegation > kafka > adapter-pattern", "same sub-topic spelled two ways"),
    (r"^delegation > kafka > partitions$", "delegation > kafka > partitioning", "same sub-topic spelled two ways"),
    (r"^caching > cdn$", "hashtag-service > read-api", "hashtag-API CDN/cache decisions belong with the hashtag read API"),
    (r"^caching > invalidation$", "cdn > invalidation", "joins the CDN invalidation items of part 1"),
]
SPECIAL = {"K3-007": "cdn > what-can-be-cached"}


def hyph(t):
    return " > ".join(s.strip().replace(" ", "-") for s in t.split(">"))


topic_changes = {}
for i, it in items.items():
    old = it["topic"]
    new = SPECIAL.get(i)
    reason = "joins part 1's 'cdn > what-can-be-cached' (same point: a CDN caches any bytes)" if new else None
    if not new:
        new = old
        for rx, rep, why in RENAME:
            if re.search(rx, new):
                new = re.sub(rx, rep, new)
                reason = why
                break
        new = hyph(new)
        if reason is None and new != old:
            reason = "segment hyphenated"
    if new != old:
        it["topic"] = new
        topic_changes.setdefault((old, new, reason), []).append(i)

# ---------------------------------------------------------------- 7. final ordering and ids
RANGE = re.compile(r"(\d+):(\d+):(\d+)")


def tsec(s):
    h, m, x = RANGE.match(s).groups()
    return int(h) * 3600 + int(m) * 60 + int(x)


def first(it):
    a = it["source"]["audio"]
    if a:
        return min(tsec(r) for r in a)
    return min(tsec(b) for b in it["source"]["board"])


kept = [i for i in items if i not in absorbed_into]
kept.sort(key=lambda i: (first(items[i]), seq[i]))
L = {i: "L-%04d" % n for n, i in enumerate(kept, 1)}
id_map = {}
for o in list(items) + list(bitems):
    k = o
    while k in absorbed_into:
        k = absorbed_into[k]
    id_map[o] = L[k]

out = []
for i in kept:
    it = items[i]
    orig_ids = [i] + it.get("_absorbed", [])
    merged = it.get("_absorbed", [])
    # nested absorption (none expected, but stay safe)
    deps = []
    for d in it["depends_on"]:
        ld = id_map.get(d)
        if ld and ld != L[i] and ld not in deps:
            deps.append(ld)
    src = {"audio": it["source"]["audio"], "board": it["source"]["board"]}
    origin = "both" if src["audio"] and src["board"] else ("audio" if src["audio"] else "board")
    rec = {"id": L[i], "orig_ids": orig_ids, "origin": origin}
    for f in SCHEMA:
        rec[f] = it[f]
    rec["source"] = src
    rec["depends_on"] = deps
    rec["merged_from"] = merged
    ex = it["_extra"]
    for key in ("merged_verbatims", "board_text", "board_notes", "supported_by", "resolved_by", "resolved_flags"):
        if ex.get(key):
            rec[key] = ex[key]
    edits = list(it["_edits"]) + ex.get("edits", [])
    if edits:
        rec["edits"] = edits
    out.append(rec)

with open(os.path.join(D, "ledger.jsonl"), "w", encoding="utf-8") as f:
    for r in out:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")


def okey(k):
    p = re.match(r"([A-Z])(\d*)-(\d+)", k).groups()
    return ("KGB".index(p[0]), int(p[1] or 0), int(p[2]))


with open(os.path.join(D, "id_map.json"), "w", encoding="utf-8") as f:
    json.dump({k: id_map[k] for k in sorted(id_map, key=okey)}, f, indent=1, ensure_ascii=False)

# ---------------------------------------------------------------- 8. changes log
REJECTED = [
    "K3-102 (split rule + war story into two items): not split - the final validator requires each original id to map to exactly one L id, and the war story has no original id of its own. Applied instead: statement = the rule only, war story reworded faithfully and kept in detail (no nuance lost).",
    "K1-063 fix wording: applied with the teacher's full reply quoted ('Yeah. We'll talk about it 7.3. 6.3.') rather than stating he 'answered Yeah' - whether 'Yeah' is a yes or an acknowledgement is not clear from the transcript.",
    "K1-105 fix: applied as proposed; additionally lowered confidence high -> medium because a new check flag now sits on the item.",
    "Merge suggestions kept separate and cross-linked instead (partial overlaps / different lessons, per the hunter's own 'cross-link' option): K1-054/K1-118 (agenda-time mention vs Q&A answer), K1-040/K1-041 (concept vs misconception), K1-055/K1-056, K1-019/K1-062, K1-083/K1-084/K1-087 (steps vs teacher's recap), K1-053 (private-content context, not merged with the hands-on advice), K2-035 vs K1-036/K1-037 (Instagram design step vs generic CDN flow; cross-linked), K2-006/K2-012/K2-020/K2-023 (rule vs applications), K2-017/K2-036, K2-018/K2-022, K2-016/K2-034, K2-049/K2-058, K2-038/K2-052, K2-060/K2-147, K2-061/K2-085/K2-118, K2-064/K2-074, K2-077/K2-078, K2-100/K2-108, K2-101 (comparison kept beside approaches 1 and 2), K2-124/K2-130, K2-122/K2-136, K2-140/K2-142/K2-146 (three different reasons), K2-120/K2-132, K2-097/K2-141/G-003 (G-003 kept as the general heuristic), K2-065/K3-027 (mid-lecture vs end-of-class forward reference), K2-132/K3-030 (concept vs admin back-reference), K2-133/K3-001/K3-003 (final-architecture restatement, cross-linked), K2-126/K2-127/K3-035/K3-036, K2-134/K3-022/K3-025, K2-122/K3-016, K2-146/K3-043, K3-012/K3-026 (K3-026 carries an unclear-flagged nuance), K3-013/K3-019, K3-015/K3-021, K3-049/K3-054, K3-085/K3-086 (student proposal vs teacher's rule), K3-034/K3-088, K3-023 vs K3-003/K2-124, K1-123/K2-037, K1-122/K2-038/K2-044, K1-080/K2-075 (recap adds no nuance but is the recap item), K1-063/K2-076, K1-017/K1-039/K2-086/K2-087, K1-109/K2-034, K1-105/K2-035, K1-101/K2-055, K1-110/K2-039, K2-084/K1-066, K2-086/K1-003, K2-123/K3-046, K2-015/K1-094, K2-013/K1-083, K2-026/K1-107, K2-062/K3-024, K1-061/K3-009, K1-040/K3-007, K2-115/K3-041, K2-030/K1-002/K3-020, K2-139/K3-005, K2-145/K3-034.",
    "K2-114: hunter said 'board may resolve' - the board (B-048) lists consistency under approach 2 but does not say which approach 'this approach' is; flag kept open.",
]

lines = ["# Lecture 09 ledger - changes log", "",
         "Inputs: part1-3.jsonl (K1-001..K1-123, K2-001..K2-148, K3-001..K3-103), gaps.jsonl (G-001..G-004), gap_report.md, "
         "board/board_items.jsonl (B-001..B-068), board/flag_resolutions.md, transcript.md. Output: ledger.jsonl (final IDs "
         "L-0001.. in teaching order = first audio timestamp, board time for board-only items). Old->new IDs in id_map.json. "
         "Mechanics done by build_ledger.py; every decision below is the editor's, each hunter fix re-checked against transcript.md.", ""]
lines.append("## Distortion fixes (%d lines; all %d gap_report distortions applied, plus 2 hunter duplicate notes on K1-028/K1-030)" % (
    len(FIXES), len(FIXES) - 2))
lines.append("")
for i, n in FIXES:
    lines.append("- %s: %s [final %s]" % (i, n, id_map[i]))
lines += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(LOG["merge"]), ""]
for a, k, why, nu in LOG["merge"]:
    lines.append("- %s -> %s: %s; nuance moved to detail ('%s'), absorbed verbatim kept in merged_verbatims, sources/flags unioned [final %s]" % (
        a, k, why, nu, id_map[k]))
nm = sum(1 for b in LOG["board"] if "merged into" in b[1])
lines += ["", "## Board decisions (%d B-items: %d merged, %d new)" % (len(LOG["board"]), nm, len(LOG["board"]) - nm), ""]
for b, note in sorted(LOG["board"]):
    lines.append("- %s -> %s [final %s]" % (b, note, id_map[b]))
nres = sum(1 for _, n in LOG["flag"] if "resolved_by" in n)
lines += ["", "## Flag resolutions from the board (%d lines: %d resolved, %d supported)" % (
    len(LOG["flag"]), nres, len(LOG["flag"]) - nres), ""]
for i, n in LOG["flag"]:
    lines.append("- %s: %s [final %s]" % (i, n, id_map[i]))
lines.append("- Flags in flag_resolutions.md with no ledger item carrying them (F007, F008, F009, F012, F028, F100, F108, F139, F207): nothing to change.")
lines += ["", "## Cross-links added (depends_on; partial overlaps kept as separate items) - %d" % len(LOG["links"]), ""]
for a, b in LOG["links"]:
    lines.append("- %s depends_on %s [final %s -> %s]" % (a, b, id_map[a], id_map[b]))
lines += ["", "## Topic normalisation (%d rules)" % len(topic_changes), ""]
for (old, new, why), ids in sorted(topic_changes.items()):
    lines.append("- '%s' -> '%s' (%s): %s" % (old, new, why, ", ".join("%s [%s]" % (i, id_map[i]) for i in ids)))
lines += ["", "## Rejected or modified hunter suggestions (with reason)", ""]
lines += ["- " + r for r in REJECTED]
lines += ["", "## Validation", "", "VALIDATION_PLACEHOLDER", ""]
with open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("final items", len(out), "merged", len(MERGES), "board merged/new", len(BMERGE), len(BNEW),
      "flags resolved/supported", nres, len(LOG["flag"]) - nres)
