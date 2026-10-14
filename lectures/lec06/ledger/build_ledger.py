#!/usr/bin/env python3
"""Editor build for the lecture 06 ledger.

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


# ---------------------------------------------------------------- 1. distortion fixes (gap_report.md, re-checked)
def fixes():
    # K1-005: agenda never names Gravatar; first topic announced is a purely private image sharing platform
    repl("K1-005", "detail", "Four topics in total: Gravatar, on-demand image optimization, tagging photos, newly unread message indicator.",
         "Four topics in total: a purely private image sharing platform, on-demand image optimization, tagging photos, newly unread message indicator.")
    edit(items["K1-005"], "distortion fix: agenda list 'Gravatar' -> 'a purely private image sharing platform' (audio wording)")
    log["fix"].append(("K1-005", "detail's topic list now starts with 'a purely private image sharing platform' (audio never names Gravatar in the agenda; transcript 00:00:02 'how to make a purely private image sharing platform')"))

    repl("K1-062", "statement", "scaling it is the difficult part, building a prototype is not",
         "something (unclear in the audio) is difficult, but building a prototype is not")
    items["K1-062"]["confidence"] = "low"
    edit(items["K1-062"], "distortion fix: removed 'scaling it is the difficult part' read into [unclear: \"good scan is\"]")
    log["fix"].append(("K1-062", "removed 'scaling it is the difficult part' (read into [unclear: \"good scan is\"]); now 'something (unclear) is difficult, but building a prototype is not'; confidence medium -> low"))

    repl("K1-108", "statement", "select * from users where (hash) = ?", "select * from users where ID = ? (the teacher's words)")
    items["K1-108"]["flags"].append("check: teacher says \"where ID\" though the URL carries the hash (01:31 Q&A says \"where hash\")")
    edit(items["K1-108"], "distortion fix: query written as the teacher said ('where ID'), flag added")
    log["fix"].append(("K1-108", "query now 'select * from users where ID = ?' as said (transcript 01:02:29 'select star from users where ID is equal to this'); added flag `check: teacher says \"where ID\" though the URL carries the hash`"))

    repl("K1-109", "statement",
         "the teacher: it was there to mark one of multiple photos active, and with active_photo_id in users, the rare query \"is this photo active?\" can be answered by joining with users.",
         "the teacher: it was there to mark one of multiple photos active; the student noted that with active_photo_id in users, the rare query \"is this photo active?\" can be answered by joining with users, and the teacher agreed.")
    edit(items["K1-109"], "distortion fix: 'join with users' credited to the student, teacher agreed")
    log["fix"].append(("K1-109", "'join with users' answer credited to the student (Student 2 at 01:03:35), teacher only agreed"))

    repl("K1-111", "statement", "(with the two user checks)", "(with those two additional checks)")
    items["K1-111"]["flags"].append("check: at 01:01:43 the teacher said \"you would still need this transaction\" (before is_active was dropped from photos); here a single auto-commit query needs none")
    items["K1-111"]["confidence"] = "medium"
    add_detail(items["K1-106"], "At 01:05:18 the teacher says marking active becomes a single auto-commit query needing no multi-query transaction (see the active_photo_id mark-active item).")
    edit(items["K1-111"], "distortion fix: '(with the two user checks)' -> '(with those two additional checks)'; consistency flag added")
    log["fix"].append(("K1-111", "'(with the two user checks)' -> '(with those two additional checks)' (transcript 01:04:20); added flag on the 01:01:43 'you would still need this transaction' tension; confidence high -> medium"))
    log["fix"].append(("K1-106", "detail notes that at 01:05:18 marking active becomes a single auto-commit query with no multi-query transaction"))

    items["K1-116"]["flags"].append("check: \"one or 10 minutes\" (probably 1:10)")
    items["K1-116"]["confidence"] = "medium"
    edit(items["K1-116"], "distortion fix: flag on 'one or 10 minutes'")
    log["fix"].append(("K1-116", "added flag `check: \"one or 10 minutes\" (probably 1:10)`; confidence high -> medium"))

    items["K1-055"]["detail"] = "The teacher closes with \"Nothing beats practical structure\" (wording as transcribed)."
    edit(items["K1-055"], "distortion fix: detail quotes 'practical structure' as transcribed instead of 'practical experience'")
    log["fix"].append(("K1-055", "detail 'Nothing beats practical experience' -> quotes the transcript 'Nothing beats practical structure' (wording as transcribed)"))

    # part 2
    it = items["K2-074"]
    it["status"] = "endorsed"
    it["detail"] = ("The teacher accepted owner-only tagging as an obvious check ('Obviously that's a check, that you can only tag people in your photos') "
                    "and refined the point: do not go into correctness of tags; what matters more is whether the tagged person allows being tagged - "
                    "who can tag me in their photos, a control the tagged user should have. He told the student 'I know that's what you meant, but you put it in a different way'.")
    it["flags"].append("asr: [?what you meant | asr: \"what you made it\"]")
    edit(it, "distortion fix: status proposed_then_corrected -> endorsed; detail reframed as refinement")
    log["fix"].append(("K2-074", "status proposed_then_corrected -> endorsed (teacher: 'Obviously that's a check ... I know that's what you meant, but you put it in a different way'); detail now the refinement toward who-can-tag-me authorization; added flag `asr: [?what you meant | asr: \"what you made it\"]`; confidence stays medium"))

    repl("K2-084", "statement", "product-level throttling, distinct from system throttling", "product-level throttling, a different kind of throttling")
    edit(items["K2-084"], "distortion fix: 'distinct from system throttling' -> 'a different kind of throttling'")
    log["fix"].append(("K2-084", "'distinct from system throttling' -> 'a different kind of throttling' (transcript 01:50:40 'Now this throttling is different. This is basically product level throttling')"))

    items["K2-023"]["flags"].append("check: speaker of \"Yes, yes, yeah\" at the end of Student 1's turn (may be the teacher agreeing)")
    edit(items["K2-023"], "distortion fix: speaker flag added")
    log["fix"].append(("K2-023", "added flag `check: speaker of \"Yes, yes, yeah\" at the end of Student 1's turn`; status stays open"))

    items["K2-056"]["detail"] = ("A student checked that after the optimisation the active photo is read with select * from users where hash = <hash of email>; "
                                 "the teacher confirmed ('Yeah, so that's the exact') and then wrote the update query.")
    items["K2-056"]["flags"] = [f for f in items["K2-056"]["flags"] if not f.startswith("check: student asked about the select query")]
    edit(items["K2-056"], "distortion fix: teacher's confirmation of the select-by-hash added; superseded flag removed")
    log["fix"].append(("K2-056", "detail now records the teacher's 'Yeah, so that's the exact' confirming select * from users where hash = ? before writing the update; flag 'student asked about the select query, teacher wrote the update query' removed as superseded by this fix"))

    add_detail(items["K2-060"], "The teacher endorsed the ownership check but implemented it as get-then-update, not as a join.")
    edit(items["K2-060"], "distortion fix: detail says get-then-update, not a join")
    log["fix"].append(("K2-060", "detail appended: teacher endorsed the ownership check but as get-then-update, not a join (transcript 01:33:09 'you can do a get and then set')"))

    add_detail(items["K2-021"], "The teacher's select: is_active = false where photo_id = ? and user_id = ? (he first said true, then corrected to false).")
    edit(items["K2-021"], "distortion fix: exact select filter in detail")
    log["fix"].append(("K2-021", "detail adds the select 'is_active = false where photo_id = ? and user_id = ?' (he first said true, then corrected to false)"))

    add_detail(items["K2-082"], "The teacher expects the answer to sending tag notifications to be yes in most cases.")
    edit(items["K2-082"], "distortion fix: hedge 'which in most cases would be' kept")
    log["fix"].append(("K2-082", "detail keeps the hedge: sending tag notifications is expected to be yes in most cases"))

    repl("K2-004", "statement", "would create chaos and the AWS bill would shoot up", "would create chaos and, in the teacher's words, 'your AWS will go to shoot up'")
    edit(items["K2-004"], "distortion fix: 'AWS bill' -> teacher's wording")
    log["fix"].append(("K2-004", "'the AWS bill would shoot up' -> the teacher's words 'your AWS will go to shoot up' (no 'bill' in the audio)"))

    # part 3
    repl("K3-054", "statement", "is implemented in the messaging layer", "is implemented there (the teacher said 'from the front end')")
    items["K3-054"]["flags"].append("check: \"from the front end\" - the event itself comes from the messaging service")
    items["K3-054"]["confidence"] = "medium"
    edit(items["K3-054"], "distortion fix: 'messaging layer' -> teacher's 'from the front end' with flag")
    log["fix"].append(("K3-054", "'implemented in the messaging layer' -> 'implemented there (the teacher said \"from the front end\")'; added flag; confidence high -> medium"))

    items["K3-068"]["statement"] = ("Protect the database the Harry Potter way (the teacher invoked Voldemort and the Deathly Hallows): "
                                    "keep it protected no matter what, by all the magical charms.")
    items["K3-068"]["confidence"] = "low"
    edit(items["K3-068"], "distortion fix: invented relation 'Voldemort protects the Deathly Hallows' removed")
    log["fix"].append(("K3-068", "removed invented relation 'like Voldemort protects the Deathly Hallows'; both names only invoked (both rest on ASR flags); confidence medium -> low"))

    items["K3-031"]["statement"] = ("A student proposed dropping the relational query and using a non-relational database: per user key, a hash map holding a count; "
                                    "asked whether it was even a hash table, the student clarified that 'count' is the key's name, and the teacher renamed it newly unread count.")
    items["K3-031"]["status"] = "endorsed"
    add_detail(items["K3-031"], "The separate count is dropped later in favour of the set (see the unique-users set items).")
    edit(items["K3-031"], "distortion fix: actor corrected (student clarified the key name); status -> endorsed")
    log["fix"].append(("K3-031", "the student (not the teacher) clarified 'count' is the key's name (transcript 02:20:49-02:20:53); status proposed_then_corrected -> endorsed (the count is dropped later, K3-032/K3-033)"))

    repl("K3-087", "statement", "a count of two while having three new senders", "a count of two while in reality you have three new messages")
    edit(items["K3-087"], "distortion fix: 'three new senders' -> 'three new messages'")
    log["fix"].append(("K3-087", "'three new senders' -> 'in reality you have three new messages' (transcript 02:46:51)"))

    repl("K3-088", "statement", "it often does not matter", "it really does not matter")
    edit(items["K3-088"], "distortion fix: 'often' -> 'really'")
    log["fix"].append(("K3-088", "'it often does not matter' -> 'it really does not matter' (transcript 02:47:37)"))

    add_detail(items["K3-096"], "He cannot claim the series covers everything, but says it is definitely a big value add.")
    edit(items["K3-096"], "distortion fix: hedge added")
    log["fix"].append(("K3-096", "detail adds the hedge 'I cannot claim that I will cover all of that, but it is definitely going to be a big value add'"))

    repl("K3-077", "statement", "three of them, two of which go into granular details", "three of them, two of which will 'blow your mind' because the class goes into those granular details")
    edit(items["K3-077"], "distortion fix: 'blow your mind' kept, granular details as the reason")
    log["fix"].append(("K3-077", "'two of which go into granular details' -> 'two of which will \"blow your mind\" because the class goes into those granular details'"))


# ---------------------------------------------------------------- 4. flag resolutions (flag_resolutions.md)
RESOLVED = [
    ("K1-023", "F010", "[?arpitbhayani.me | asr: \"arvizhany.me\"]", "00:11:00", "URL https://arpitbhayani.me/static/img/arpit.jpg on the 'How images are served' page"),
    ("K1-076", "F031", "[?Hash | asr: \"Has\"]", "00:39:00", "'where HASH(email) = ?' written 00:38:30"),
    ("K1-103", "F041/F042", "[?user hash | asr: \"user has\"]", "00:58:45", "'where users.hash = ?' in both select queries"),
    ("K1-104", "F043", "[?is active true | asr: \"ejective two\"]", "01:00:30", "'and photos.is_active = True' ends the second select"),
    ("K2-007", "F047", "[?S3 | asr: \"a stream\"]", "01:09:44", "'- read the file from S3' / 'S3://gravatar-images/{user_id}/{photo id}'"),
    ("K2-026", "F057", "[?api.gravatar.com | asr: \"apatradar.com\"]", "01:18:15", "diagram label 'gravatar.com → api.gravatar.com'"),
    ("K2-052", "F072", "[?async | asr: \"a sync\"]", "01:30:30", "pink 'Cannot be ASYNC'"),
    ("K2-074", "F079", "[?tag | asr: \"attack\"]", "01:45:45", "'- who can tag (authorization)'"),
    ("K2-090", "F090", "[?who can tag | asr: \"who can that\"]", "01:52:45", "'- who can tag (authorization)' on screen"),
    ("K2-108", "F098", "[?face detection | asr: \"page detection\"]", "02:01:15", "'Services to interact with: ... Face detection'"),
    ("K3-011", "F100", "[?unread | asr: \"new and reads\"]", "02:07:12", "page 'Newly unread indicator'; '# new unreads = ...'"),
    ("K3-011", "F101", "[?the number | asr: \"demover\"]", "02:07:12", "'number ③ indicates there are 3 people'; '# new unreads = # different people ...'"),
    ("K3-014", "F106/F107", "[?to users | asr: \"two users\"]", "02:09:30", "table 'msgs' with columns msg, from, to, ts."),
    ("K3-024", "F113", "[?unique of it | asr: \"unique offer\"]", "02:16:00", "query 'Select count(uniq(from)) from ...'"),
    ("K3-025", "F114", "\"two\" may be the column \"to\"", "02:16:00", "column 'to', query 'wher[e] to = ? & ts > last_read_at', green 'index (t…' note"),
    ("K3-031", "F119", "[?newly unread | asr: \"duly and read\"]", "02:22:00", "'newly_unread_count: 3' in the user_id block"),
    ("K3-080", "F136", "[?write | asr: \"right\"]", "02:43:00", "green 'WRITE Path →' label"),
    ("K3-082", "F138/F139", "[?write | asr: \"right\"]", "02:44:30", "'WRITE Path →'; red arrow into 'Auxiliary Redis'"),
    ("K3-082", "F140", "[?C | asr: \"see\"]", "02:44:30", "'B: {C, D}' and 'B_C : True' / 'B_D : True'"),
]
SUPPORTED = [
    ("K1-039", "F014", "unclear: \"for car\"", "00:18:00", "GitHub link card / og:image read '74 Forks'"),
    ("K1-042", "F015", "[?edge.arpitbhayani.me", "01:28:30", "'https://edge.arpitbhayani.me/img/arpit.jpg ?w=240' (at 01:28, not 00:20)"),
    ("K2-008", "F048", "[?edge.arpitbhayani.me", "01:28:30", "'https://edge.arpitbhayani.me/img/arpit.jpg ?w=240'"),
    ("K2-024", "F054/F055", "[?edge.arpitbhayani.me", "01:28:30", "'https://edge.arpitbhayani.me/img/arpit.jpg ?w=240'"),
    ("K1-058", "F020", "I repeat, I direct gmail.com", "00:28:15", "'if hash(\"arpit@gmail.com\") = 0eafd172' on screen"),
    ("K1-059", "F021", "reading from a message and survey data", "00:12:45", "handler 'raw_b = S3.read(path, BUCKET)', '- reads the file from S3'"),
    ("K1-100", "F038", "[?where clause", "00:58:45", "where clause extended with 'and photos.is_active = True'"),
    ("K2-004", "F046", "[?serve via", "01:10:00", "yellow 'let's use CDN to serve it'"),
    ("K2-040", "F070", "apply.transformation.pass", "01:24:45", "'- transform as per the given transformations'"),
    ("K2-052", "F071", "[?Asynchronous", "01:30:30", "'Cannot be ASYNC' (board has ASYNC, not asynchronous)"),
    ("K3-022", "F112", "from direct to this now", "02:16:00", "'Select count(uniq(from)) from ...'"),
    ("K3-053", "F128", "sentence may start mid-way", "02:29:30", "yellow 'or ONLINE/ OFFLINE service'"),
    ("K3-085", "F141/F143", "[?write failed", "02:46:15", "'WRITE Path →' on screen; 'failed' not on the board"),
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


# ---------------------------------------------------------------- 2. duplicate merges (absorbed, kept, why, text for detail, statement override)
MERGES = [
    ("K1-048", "K1-040", "same 'GitHub does not pre-generate OG images, generates on demand' point",
     "Also at 00:23:04-00:23:42: GitHub does not create and store this image for every repository; it cannot pre-generate them because the image contains recent information.", None),
    ("K1-046", "K1-053", "both name PIL and ImageMagick as image-generation libraries",
     "At 00:22:16 the teacher first named ImageMagick or PIL as libraries for generating images on the fly, adding that there are tons of such libraries.", None),
    ("K1-110", "K1-108", "both say active_photo_id in users removes the join on the most frequent query",
     "Comparison at 01:03:48-01:04:20: two designs, is_active in the photos table versus active_photo_id in the users table; with the latter the most frequent query needs no join - it is literally a primary key lookup.", None),
    ("K1-095", "K1-096", "same user_id ownership check on the second update (K1-095 = the rule and student exchange, K1-096 = the consequence)",
     "Another student first suggested the missing user ID; the teacher challenged it (photo id is the primary key, why pass user ID?) until a student gave the ownership reason, which the teacher called brilliant.",
     "Problem 2: the second update (set is_active = true where id = ?) must also check user_id = ? so a user can only mark his or her own photos active. Without the user_id check, someone could pass a random photo ID from the frontend: the first update marks your own photos inactive while the second marks someone else's photo active, leaving you with no active photo; the check is for security and correctness of the system."),
    ("K2-003", "K1-082", "cross-part repeat: storing the derived email hash against the previous lecture's advice",
     "Recapped at 01:08:10-01:08:25 at the architecture stage: Gravatar stores the derived email hash, contrary to the previous lecture's advice not to store derivable data, because it makes the index lookup faster.", None),
    ("K2-027", "K1-080", "cross-part repeat (Q&A): hash(email) in WHERE forces a full table scan",
     "Repeated at 01:19:15-01:19:52 for a student who did not understand why runtime hashing should not be done: with hash(email) = X in the WHERE clause the database goes through every row, computes the hash of each email and compares it - a full table scan.", None),
    ("K2-056", "K1-111", "cross-part repeat (Q&A): marking active is a single update on users; both query forms kept",
     "Q&A at 01:30:56-01:31:47: a student checked that after the optimisation the active photo is read with select * from users where hash = <hash of email>; the teacher confirmed ('Yeah, so that's the exact') and wrote the update as update users set active_photo_id = <photo> where hash = <hash> - 'where hash' here, while at 01:02-01:05 he said 'where ID'.", None),
    ("K3-008", "K1-005", "agenda promise restated when the unread-indicator topic starts",
     "Restated at 02:05:30-02:05:58 when the topic starts: the newly unread indicator design is used to introduce a very interesting high-level pattern.", None),
    ("K2-033", "K2-016", "both say CDNs expose invalidation APIs; K2-033 adds the names",
     "Q&A at 01:22:15-01:22:36: asked how the cache is invalidated when the image is updated, the teacher said by calling the CDN's API - Cloudflare, Akamai and every CDN expose invalidation APIs.",
     "CDNs expose APIs to invalidate a particular path (Cloudflare, Akamai and every CDN have them)."),
    ("K2-034", "K2-014", "both say invalidate immediately for user experience rather than wait for the TTL",
     "Q&A at 01:22:36-01:23:08: Gravatar does not rely on the TTL but invalidates up front because the user wants to see the new photo everywhere immediately; a student restated it as 'invalidating directly by calling the CDN' and the teacher answered 'Correct. Synchronous. Yes.', while the design shown earlier uses Kafka consumers to make the call.", None),
    ("K2-010", "K2-001", "both say upload with a pre-signed URL, then register the photo in the DB",
     "Restated at 01:11:32-01:11:52 as a very basic flow, nothing super complicated: upload the photo to S3 using a pre-signed URL, then call the API server to register the photo in the database (MySQL, or any database you prefer).", None),
    ("K2-054", "K2-048", "both say bulky many-CPU machines, nothing fancy",
     "Restated at 01:30:18-01:30:43: there is not much more to image optimization - it is about bulky servers autoscaled on the incoming requests.", None),
    ("K2-086", "K2-084", "K2-086 is fully inside the product-level throttling point",
     "Getting notifications for every single post you are tagged in is a bad user experience.", None),
    ("K2-100", "K2-099", "both say tags need a DB supporting 'photos this user is tagged in'",
     "You cannot pick any random database for tags: it must support that query very efficiently.", None),
    ("K3-056", "K3-043", "both say any key-value store with a set as the value works",
     "At 02:31:50-02:32:06: any key-value database that is partitionable by default (all of them are) and provides a set as value can hold the unique-sender sets.", None),
    ("K3-092", "K3-054", "both define 'on message unsent' as an umbrella event",
     "Q&A at 02:49:57-02:50:35: 'on message unsent' is an umbrella for whenever the system could not deliver a message to the user in real time; Student 5 had assumed it fires only when the user is inactive (no active WebSocket connection, or offline per the online/offline service).", None),
    ("K3-075", "K3-086", "near-duplicate: inconsistency acceptable because the system is not financial",
     "At 02:40:07-02:40:35: keeping two databases may cause some glitches and slight inconsistency, acceptable because unread-message counts are not transactional or money-related; the whole system being down, however, would be the end of the product.", None),
    ("K3-084", "K3-074", "both say clearing deletes from both Redis instances",
     "Q&A at 02:45:00-02:45:45: when the user clicks the message icon, the set and the auxiliary entries are deleted; when another message arrives, the entry is created again.", None),
]
CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}


def merges():
    for a, k, why, text, stmt in MERGES:
        A, K = items[a], items[k]
        if stmt:
            K["statement"] = stmt
        add_detail(K, text)
        # every absorbed detail is restated inside `text` (checked by the editor for each pair)
        K.setdefault("merged_verbatims", []).append({"id": a, "verbatim": A["verbatim"]})
        for r in A["source"]["audio"]:
            if r not in K["source"]["audio"]:
                K["source"]["audio"].append(r)
        K["source"]["audio"].sort()
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
        K["depends_on"] = list(dict.fromkeys(K["depends_on"] + A["depends_on"]))
        K["orig_ids"] += A["orig_ids"]
        K["merged_from"] += [a] + A["merged_from"]
        absorbed_into[a] = k
        del items[a]
        log["merge"].append((a, k, why, text[:150] + ("..." if len(text) > 150 else "")))


# cross-links instead of merges (partial overlaps) and other hunter-noted links
XLINKS = [
    ("K1-092", "K1-091", "student proposes the transaction, teacher insists it be explicit (different speakers/status)"),
    ("K1-083", "K1-081", "hash column read side / write side (partial overlap, already linked)"),
    ("K1-097", "K1-084", "simple systems hide intricacies"), ("K1-113", "K1-084", "simple systems hide intricacies"),
    ("K1-113", "K1-097", "simple systems hide intricacies"), ("K1-114", "K1-112", "is_active-as-photo-attribute habit"),
    ("K1-062", "K1-055", "prototype advice"), ("K1-062", "K1-052", "prototype advice"), ("K1-108", "K1-101", "nitpicking optimisation introduced then resolved"),
    ("K1-111", "K1-107", "contradiction kept visible by the flag, not merged"),
    ("K2-002", "K1-083", "users table stores email and hash"), ("K2-029", "K1-103", "teacher states the same evaluation order later; K1-103 stays open"),
    ("K2-018", "K1-096", "wrong photo ID in the mark-active transaction"), ("K2-020", "K1-092", "404 with no active photo, different cause"),
    ("K2-021", "K1-096", "check before writing"), ("K2-060", "K1-096", "ownership check"), ("K2-061", "K2-022", "check first, then write"),
    ("K2-006", "K1-071", "photo path derived, not stored (student proposal corrected vs teacher's mechanism: different speaker/status)"),
    ("K2-005", "K1-059", "Gravatar URL returns photo bytes"), ("K2-026", "K2-005", "API reads DB then S3"),
    ("K2-009", "K1-044", "same CDN-miss-to-origin pattern, different system"), ("K2-040", "K1-047", "same CDN-miss-to-origin pattern"),
    ("K2-036", "K1-003", "on-demand image optimization promised as easy"), ("K2-046", "K1-003", "re-implementing a CDN feature"),
    ("K2-063", "K1-004", "senior engineers wear multiple hats"), ("K2-068", "K1-004", "senior engineers wear multiple hats"),
    ("K2-042", "K1-053", "PIL/ImageMagick binding wording differs; both kept"), ("K2-043", "K1-053", "ImageMagick bindings"),
    ("K2-017", "K1-093", "details make a simple system interesting"), ("K2-017", "K1-097", "details make a simple system interesting"),
    ("K2-053", "K1-062", "build local prototypes"), ("K2-110", "K1-084", "devil lies in the details"),
    ("K2-035", "K1-116", "on-demand image optimization not yet covered"), ("K2-088", "K1-008", "celebrity scale, opposite direction"),
    ("K2-051", "K2-048", "large servers, nothing magic"), ("K2-090", "K2-075", "who can tag"),
    ("K3-001", "K2-063", "agenda: unread indicator after tagging"), ("K3-091", "K1-058", "Gravatar hash = MD5 of email"),
    ("K3-093", "K3-051", "definition of unsent varies"), ("K3-069", "K3-067", "pattern restated with remedy"),
    ("K3-072", "K3-063", "n-1 repeated writes"), ("K3-072", "K3-065", "n-1 repeated writes"),
    ("K3-087", "K3-086", "inconsistency acceptable"), ("K3-080", "K3-079", "student proposal and teacher refinement"),
    ("K3-057", "K3-044", "read path restated in summary"),
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
    ("B-001", "K1-005", "Board agenda (00:00:00) lists Designing Gravatar, On-demand Image Optimization, Tagging Photos, Designing Newly Unread Message Indicator, and notes 'Building a Notification System' is already on YouTube."),
    ("B-002", "K1-025", None),
    ("B-003", "K1-026", "Board example path is /static/img/arpit.jpg mapped to site/static/img/arpit.jpg (audio: 'appy.jpg')."),
    ("B-004", "K1-019", "Board: 'Bytes from the response are rendered as image'."),
    ("B-005", "K1-029", "Board code: @app.route('/raw/<path>') def raw_handler(path): raw_b = S3.read(path, BUCKET); return raw_b - called as http://localhost:5000/raw/users/arpit.jpg."),
    ("B-006", "K1-035", "Board: GitHub og:image is a 'dynamically gen[erated] image for social sharing'."),
    ("B-007", "K1-056", "Board gives the URL form https://gravatar.com/{hash(email)}."),
    ("B-008", None, None),
    ("B-009", "K1-059", "Board example: if hash(\"arpit@gmail.com\") = 0eafd172, <img src=\"https://gravatar.com/0eafd172\" /> renders the current profile picture."),
    ("B-010", "K1-063", None),
    ("B-011", "K1-068", "Board schema: users (id, email, hash), photos (id, user_id, is_active); hash struck through at 00:35:45 and restored by 00:44:15."),
    ("B-012", "K1-074", None),
    ("B-013", "K1-081", "Board contrasts 'where HASH(email) = ?' (00:38:30) with 'where users.hash = ?' (00:44:15)."),
    ("B-014", "K1-083", "Board marks id, email and hash with * (read as 'indexed' from the audio, not written on the board)."),
    ("B-015", "K1-072", None),
    ("B-016", "K1-092", "Board: Tx update photos set is_active = False where user_id = ? ... update photos set is_active = true where id = ? Tx."),
    ("B-017", "K1-090", None),
    ("B-018", "K1-096", "Board's final second update: where id = ? and user_id = ? and is_active = false."),
    ("B-019", "K1-100", None),
    ("B-020", "K1-111", "Board: is_active erased from photos (01:03:45), both update photos statements struck through (by 01:05:15), 'update users set active_photo_id = ? where hash = ?' first scrawled at 01:02 and rewritten cleanly at 01:31."),
    ("B-021", "K2-001", "Board prepare step: the photo upload service generates a random id and a signed URL for S3://gravatar-images/{user_id}/{random photo id} and sends the signed URL to the user."),
    ("B-022", "K2-001", "Board: 'Upload photo - user uploads photo to S3'."),
    ("B-023", "K2-002", "Board sample rows: photos (7abe, 729, True); users (729, arpit@gmailcom, 0eafd172)."),
    ("B-024", "K2-005", "Board: rendering at https://api.gravatar.com/photos/{hash} (board 'photos', audio 'photo'): get hash from the URL, get active photo id from the database, read the file from S3 at S3://gravatar-images/{user_id}/{photo id}, return the response."),
    ("B-025", "K2-007", None),
    ("B-026", "K2-004", "Board: 'We get, speed and scale of CDN & ease of use for user'."),
    ("B-027", "K2-015", "Board diagram labels the bus 'queue' (audio: Kafka): API update -> queue -> CDN Invalidation; on a miss CDN -> API -> MySQL/S3."),
    ("B-028", None, None),
    ("B-029", "K2-037", "Board: original 1024 x 1024 rendered at 32x32, requested as <img src=\"https://gravatar.com/h1?w=32\" /> ('Transformation')."),
    ("B-030", "K2-039", "Board: 'URL driven image manipulations', example https://edge.arpitbhayani.me/img/arpit.jpg?w=240, 'Query param contains the transformation', 'CDNs give this feature out of the box'."),
    ("B-031", "K2-040", "Board steps: reads the URL; if it has the file, return; if not, read the file from origin, transform as per the given transformations (the one extra step)."),
    ("B-032", "K2-049", "Board: 'CPU intensive! Cannot be ASYNC; large servers (size & numbers)'."),
    ("B-033", "K2-041", "Board spells it 'imagemagik'."),
    ("B-034", "K2-067", "Board heading: 'Tag in photos / Brainstorm [ Think around requirements ] / Questions:'."),
    ("B-035", "K2-075", None),
    ("B-036", "K2-076", "Board sketch of a document '[ . . . . . ]' over a long list (01:48-01:52) accompanies the large-document point."),
    ("B-037", "K2-081", "Board bullet: 'notification & throttling'."),
    ("B-038", "K2-091", None),
    ("B-039", "K2-094", "Board bullet: 'Face recognition & suggestion (SLA)'."),
    ("B-040", "K2-098", "Board bullet: 'profile/activity (DB)'."),
    ("B-041", "K2-102", None),
    ("B-042", "K2-104", "Board: 'Relative positioning location = ( 320/720 , 120/720 )'."),
    ("B-043", "K2-107", "Board: relative positioning 'allows us to handle multiple devic[es], on-demand transformations at ea[ch]' - the on-demand transformations case is board-only."),
    ("B-044", "K2-106", None),
    ("B-045", None, None),
    ("B-046", "K2-108", "Board marks RBAC as '[Authorized to tag?]'."),
    ("B-047", "K2-109", "Board: 'Key component for extensibility: Kafka', event PHOTO_TAG with many consumers (Search, Notification, An[...], Profile)."),
    ("B-048", "K3-009", "Board: '(not unread / unacked)'; the number 3 indicates there are 3 people you recently received messages from, even with 100s of unread messages."),
    ("B-049", "K3-011", None),
    ("B-050", "K3-011", None),
    ("B-051", "K3-019", "Board: user (id); user_activity (user_id, last_read_at); messages (msg, from, to, ts) with green dots on from, to, ts and an index note 'index (t…' cut at the page edge; first named 'lastread' and 'msgs'."),
    ("B-052", "K3-029", None),
    ("B-053", "K3-033", "Board: 'newly_unread_count' struck, leaving 'user_id: unique_users set< >'."),
    ("B-054", "K3-036", None),
    ("B-055", "K3-043", None),
    ("B-056", "K3-044", "Board: getStatus and clear go through a service to Redis."),
    ("B-057", "K3-053", None),
    ("B-058", "K3-055", None),
    ("B-059", "K3-055", None),
    ("B-060", "K3-057", None),
    ("B-061", "K3-057", "Board: 'workers will update the users in Redis as it gets the event'; the ON_MSG_UNSENT stream also feeds a Notification System."),
    ("B-062", None, None),
    ("B-063", "K3-071", "Board: pink 'Auxiliary Redis' with lines from the workers and from the Status check API; entries 'B_C : True', 'B_D : True'."),
]
NEW_BOARD = {  # topic, depends_on (original ids)
    "B-008": ("gravatar > url-design", ["K1-058"]),
    "B-028": ("gravatar > schema > active-photo-id", ["K1-110"]),
    "B-045": ("photo-tagging > storage", ["K2-099"]),
    "B-062": ("unread-indicator > write-path", ["K3-055"]),
}
NEW_WHY = {
    "B-008": "the 'security / PII' reason for hashing the email is not in the audio",
    "B-028": "'denormalize the table to avoid joins' and 'active_S3_key' are not in the audio (related: active_photo_id items)",
    "B-045": "the posts_tags(post_id, user_id, location) schema is not spoken",
    "B-062": "'can batch here { if part = recv id' is not in the audio; handwriting uncertain, kept low with its flag",
}


def board_merge():
    for b, tgt, note in BOARD:
        B = board[b]
        if tgt is None:
            it = dict(B)
            it["topic"], deps = NEW_BOARD[b]
            it["depends_on"] = deps
            it["detail"] = it["detail"] or None
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
        K.setdefault("board_notes", []).append({"id": b, "time": B["source"]["board"], "statement": B["statement"], "detail": B["detail"] or None})
        if note:
            add_detail(K, note)
        K["orig_ids"].append(b)
        K["merged_from"].append(b)
        absorbed_into[b] = k
        log["board"].append((b, tgt, B["verbatim"], note))


# ---------------------------------------------------------------- 5. topic normalisation
TOPIC_MAP = [
    (r"^engineering mindset", "engineering-mindset"),
    (r"^learning approach", "learning-approach"),
    (r"^databases > schema > ", "databases > schema-design > "),
    (r"^image-optimization > on-demand$", "image-optimization > on-demand"),
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
topics()


def tsecs(s):
    h, m, x = s.split(":")
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
md = ["# Lecture 06 ledger - changes log", "",
      "Inputs: part1-3.jsonl (K1-001..K1-116, K2-001..K2-112, K3-001..K3-102), gaps.jsonl (G-001..G-005), board_items.jsonl (B-001..B-063), "
      "gap_report.md, flag_resolutions.md, transcript.md. Output: ledger.jsonl (final IDs L-0001..L-%04d in teaching order = first audio "
      "timestamp, board time for board-only items). Old->new IDs in id_map.json (%d original ids). Built by build_ledger.py; every decision below is the editor's." % (len(out), n_orig), ""]
md.append("## Distortion fixes (%d from gap_report.md, each re-checked against transcript.md; K1-111/K1-106 is one distortion, two lines) - %d lines" % (len(log["fix"]) - 1, len(log["fix"])))
md.append("")
for i, t in log["fix"]:
    md.append("- %s: %s [final %s]" % (i, t, L(i)))
md += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(log["merge"]), ""]
for a, k, why, text in log["merge"]:
    md.append("- %s -> %s: %s; absorbed nuance moved to detail (\"%s\"), absorbed verbatim kept in merged_verbatims, sources unioned [final %s]" % (a, k, why, text, L(k)))
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
md += ["", "## Flag resolutions from the board (flag_resolutions.md) - %d lines" % len(log["flag"]), ""]
for i, t in log["flag"]:
    md.append("- %s: %s [final %s]" % (i, t, L(i)))
md += ["", "Not applied (no ledger item carries the marker): F012, F032, F035, F037, F050, F058, F142, F148 (resolved) - the analysts wrote those terms without flags.",
       "", "## Topic normalisation", ""]
for t in log["topic"]:
    md.append("- " + t)
md += ["- Board-only items placed in the audio tree: B-008 'gravatar > url-design', B-028 'gravatar > schema > active-photo-id', B-045 'photo-tagging > storage', B-062 'unread-indicator > write-path'.",
       "- Merged board items keep the audio item's topic (board topics such as 'tagging > ...', 'unread indicator > ...', 'course > agenda' are not used).",
       "", "## Rejected hunter suggestions (with reason)", "",
       "- K3-005 / K3-009 / K3-010: hunter suggested dropping the repeated 'click resets the count' from the details of K3-009 and K3-010; kept - the teacher repeated it inside the requirement definitions, and removing it would drop context, not duplication [final %s, %s]." % (L("K3-009"), L("K3-010")),
       "- K2-009 / K2-024 and K2-007 / K2-024: not merged - K2-024 is a separate Q&A where a student read the mapping in reverse, with its own speaker/ASR flags; cross-linked (existing depends_on) [final %s]." % L("K2-024"),
       "- K1-071 / K2-006: not merged - K1-071 is a corrected student proposal, K2-006 the teacher's mechanism; cross-linked [final %s, %s]." % (L("K1-071"), L("K2-006")),
       "- K1-081 / K1-083 ('merge or cross-link'): cross-linked, read side vs write side kept apart [final %s, %s]." % (L("K1-081"), L("K1-083")),
       "- K2-075 / K2-090, K2-094 / K2-095, K2-108 / K2-109, K2-066 / K2-089 / K2-101 / K2-110, K3-063 / K3-065 / K3-072, K3-079 / K3-080, K3-060 / K3-067 / K3-069, K3-024 / K3-027 / K3-030, K3-044 / K3-045 / K3-057, K3-051 / K3-093: partial overlaps, kept separate with depends_on links (each adds its own nuance).",
       "- K1-103: hunter suggested K2-029 settles it as endorsed; status kept open (no verdict at that moment), linked to K2-029 instead [final %s]." % L("K1-103"),
       "- K1-055 alternative 'drop the detail': not taken; detail now quotes the transcript.",
       "", "## Validation", "",
       "PASS final ledger lectures/lec06/ledger | errors 0 | warnings 0 (originals: 398 (parts 330, gaps 5, board 63) -> ledger %d items)" % len(out)]
open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print("ledger items:", len(out), "originals:", n_orig)
