#!/usr/bin/env python3
"""Editor helper for lecture 05: applies the editor's decisions (all listed below, by hand) and does the mechanical
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

LOG = {"fix": [], "merge": [], "board": [], "flag": [], "topic": [], "xlink": []}
absorbed_into = {}


def union(a, b):
    out = list(a)
    for x in b:
        if x not in out:
            out.append(x)
    return out


def add_edit(i, note):
    items[i].setdefault("edits", []).append(note)


def add_detail(i, text):
    d = items[i].get("detail")
    items[i]["detail"] = (d.rstrip() + " " + text) if d else text


def sub(i, field, old, new):
    assert old in items[i][field], (i, field, old)
    return items[i][field].replace(old, new)


# ---------------------------------------------------------------------------------------------------------------
# 1. Distortion fixes (each re-checked against transcript.md by the editor)
# ---------------------------------------------------------------------------------------------------------------
def fix(i, log, **kw):
    for k, v in kw.items():
        items[i][k] = v
    add_edit(i, "distortion fix: " + log)
    LOG["fix"].append((i, log))


# part 1
fix("K1-042", "'read-heavy' -> 'read-only' (transcript 00:17:09: 'for a read-only use case')",
    statement=sub("K1-042", "statement", "read-heavy", "read-only"))
fix("K1-058", "dropped the invented '(previous week's material)' and 'implemented': the teacher only says folks were "
    "'trying out all the four'",
    statement="Some students tried out all four of short polling, long polling, SSE and WebSockets; the teacher encourages "
              "this ('Do that') because implementing is where you learn the most.")
fix("K1-105", "detail now records the teacher's ambiguous reply 'No, no, that's right. We anyway discussed that' "
    "(00:57:16); check flag added; status stays open",
    detail=items["K1-105"]["detail"] + " The teacher replied 'No, no, that's right. We anyway discussed that' (apparently "
           "acknowledging the scheduling argument already discussed for approach 3) and restated the prediction without a "
           "verdict.",
    flags=items["K1-105"]["flags"] + ["check: what \"No, no, that's right\" (00:57:16) acknowledges"])
fix("K1-119", "'busy waiting' is now the student's term, not an established fact; speaker flag for 'That's a great word' "
    "(inside Student 6's turn); detail + cross-link to K2-040 (waiters are signalled, not busy-looping); the teacher's "
    "agreement limited to lower total execution time",
    statement="A student predicts approach 5 will fill all seats while removing what the student calls the 'busy waiting' "
              "of approach 4, so total execution time will be less; the teacher agrees on the lower total execution time.",
    detail="The teacher echoed 'Busy waiting time.' and asked what advantage approach 5 gives. Approach 4 waiters are "
           "signalled, not busy-looping (see the 01:25:12 correction, K2-040).",
    flags=items["K1-119"]["flags"] + ["check: speaker of \"That's a great word\" (inside Student 6's turn at 01:05:46; "
                                      "probably the teacher)"],
    depends_on=items["K1-119"]["depends_on"] + ["K2-040"])
fix("K1-096", "added speaker flag for the '~00:51:38 Teacher?' turn inside the item's span",
    flags=items["K1-096"]["flags"] + ["check: speaker of ~00:51:38 turn (Teacher?)"])
fix("K1-097", "added speaker flag for '~00:52:04 Teacher?'; detail says 'not entirely true' is a partial correction; "
    "status proposed_then_corrected kept (the teacher does correct it at 01:01:25)",
    flags=items["K1-097"]["flags"] + ["check: speaker of ~00:52:04 turn (Teacher?)"],
    detail="The teacher called it 'Not entirely true' (a partial correction, not a rejection). " + items["K1-097"]["detail"])
fix("K1-061", "source 00:29:24-00:30:39 added ('I want that 120 seat to be filled in best way possible')",
    source={"audio": items["K1-061"]["source"]["audio"] + ["00:29:24-00:30:39"], "board": items["K1-061"]["source"]["board"]})
fix("K1-008", "source 00:03:35-00:04:19 added ('There is nothing magical about it ... our entire society runs on money')",
    source={"audio": items["K1-008"]["source"]["audio"] + ["00:03:35-00:04:19"], "board": items["K1-008"]["source"]["board"]})
fix("K1-121", "detail keeps the teacher's 're-evaluated' wording and the conflicting Q&A wording (K3-095); not resolved "
    "(fact-checker)",
    detail="The teacher says the engine 'quickly re-evaluated' here ('It quickly revalued, or rather database engine quickly "
           "revaluated'); in the Q&A at 02:50:10 (K3-095) he says that with SKIP LOCKED the database does not re-evaluate "
           "the query but moves to the next row on the same disk page. Both wordings kept as said.")

# part 2
fix("K2-034", "removed the inserted '(explicitly)' (teacher: 'So you have never acquired a lock on any row')",
    statement=sub("K2-034", "statement", "never (explicitly) acquired", "never acquired"))
fix("K2-038", "speaker student (question) -> teacher (the item is the teacher's answer); added flag for the "
    "'[?lock | asr: \"blog\"]' marker behind the 'people say lock' detail",
    speaker="teacher",
    flags=items["K2-038"]["flags"] + ['asr: [?lock | asr: "blog"]'])
fix("K2-058", "detail now starts with the teacher's hedge 'partially true' before the correction",
    detail="The teacher called it 'partially true', then corrected: " + items["K2-058"]["detail"][len("Corrected: "):]
    if items["K2-058"]["detail"].startswith("Corrected: ") else "The teacher called it 'partially true'. " +
    items["K2-058"]["detail"])
fix("K2-098", "added flag: 'Correct.' sits inside Student 1's turn (01:59:55); detail now 'endorsed implicitly'",
    flags=items["K2-098"]["flags"] + ['check: "Correct." inside Student 1\'s turn at 01:59:55'],
    detail="The teacher endorsed it implicitly by naming what the clause saves (next item: 'And what we save with this "
           "one clause is that heavy network IO').")
fix("K2-039", "dropped the invented step ', and commit' (teacher: 'acquire the lock for that moment and say that this "
    "seat is put on hold. That's it')",
    statement=sub("K2-039", "statement", "mark the seat as on hold, and commit", "mark the seat as on hold"))
for k, q in [("K2-011", "No, it's different. It's not SQL locking."),
             ("K2-014", "No, we would not have skip locked. We would have just this."),
             ("K2-022", "It's not that a row would be skipped all together"),
             ("K2-032", "whatever the isolation level says, that thing, your transaction would do.")]:
    fix(k, "speaker student (question) -> teacher: the insight is the teacher's answer ('%s'); detail already names the "
        "student's question" % q, speaker="teacher")
fix("K2-030", "dropped the analyst's gloss '(one per seat)'",
    statement="With SKIP LOCKED (approach five), the booking query is executed about 120 times in total across all threads "
              "(the student's figure, confirmed by the teacher's 'It will be 120').")
fix("K2-076", "dropped '(no extra column)': the student only said 'And storage' (the column reason is the teacher's, "
    "K3-005, cross-linked)",
    statement="Using expired_at = -1 for deletes saves a second background job (one job instead of two), which means less "
              "CPU, less disk load, fewer reads, and storage.",
    depends_on=items["K2-076"]["depends_on"] + ["K3-005"])
fix("K2-006", "'would suffer' -> 'would be [unclear] (likely hurt)': the verb is an unclear marker",
    statement=sub("K2-006", "statement", "without it the entire throughput would suffer",
                  "without it the entire throughput would be [unclear] (likely hurt)"))

# part 3
fix("K3-086", "'an IIT Delhi student' -> 'a person from IIT Delhi' (the transcript does not say student)",
    statement="Asked how an app made by a person from IIT Delhi achieved faster bookings some years back, the teacher said "
              "he has no idea.")
fix("K3-022", "added flag for 'a synchronicity' (read as asynchronicity); detail now quotes the teacher; confidence "
    "high -> medium",
    flags=items["K3-022"]["flags"] + ['asr: "a synchronicity" (probably "asynchronicity")'],
    detail="Redis runs the cleanup 'not a thread, but a kind of, kind of a synchronicity'; 'assume it as a thread'. The "
           "teacher says he cannot reveal details because he covers them in his course and they are out of scope.",
    confidence="medium")
fix("K3-120", "speaker student (question) -> teacher and status proposed_then_corrected -> endorsed (the statement is the "
    "teacher's definition); detail records the student's claim, the teacher's 'not really, it is just about timeout' "
    "and that his second cause (K3-121) is the student's own point",
    speaker="teacher", status="endorsed",
    detail="A student claimed the error comes only when the first transaction took the lock and did not commit; the "
           "teacher said 'Not really. It just about timeout', then gave forgetting to commit/abort as one of two causes "
           "(next item) - so the correction is partial.")
fix("K3-081", "'heads you win, tails you win' and 'handled by the batch cleanup' moved from statement to detail as the "
    "student's summary (no teacher verdict after it)",
    statement="Even though the update is fired for every user delete, it leads to no disk IO for already-expired keys "
              "because the clause does not match them.",
    detail="Student 1's own summary (no explicit teacher verdict): anything less than or equal to now 'is anyways taken "
           "care by the batch' - 'heads you win, tails also you win kind of a mechanism'.")
fix("K3-048", "statement no longer asserts the student's hypothesis 'without it the database would read the rows anyway'; "
    "the teacher only confirmed the index exists",
    statement="The disk IO savings rely on having an index on the TTL (expired_at) column; the teacher confirmed you would "
              "have that index.",
    detail="The student's 'if we do not index it, then we'll anyways be reading that value' got only a general 'Yeah. "
           "You'd have that index. Yes.'")
fix("K3-142", "'the essence of the reply was' -> the teacher recalls (not verbatim) the essence of the thread",
    statement="Around 2011-2012 (the teacher's final year) there was a MySQL forum thread where someone proposed built-in "
              "soft deletion; the teacher recalls, not the exact line, that its essence was that as a database evolves it "
              "is more important to know what you do not want to do than what you want to do, since anything is "
              "infinitely buildable.")
fix("K3-131", "restored the hedge 'I feel' on Redis",
    statement="Real KV stores are not built like this: Redis is an in-memory store and, the teacher feels, definitely is "
              "not built like this; DynamoDB does not use a relational DB; but Apache Ignite's source code is very "
              "similar to this design.")
for k in ["K3-088", "K3-093", "K3-116", "K3-128", "K3-129", "K3-131", "K3-139", "K3-145"]:
    fix(k, "speaker student (question) -> teacher: the statement is the teacher's answer, not the question",
        speaker="teacher")
fix("K3-002", "added flag for the unflagged marker '[unclear: \"built it\"]'; confidence stays high ('we store is "
    "deleted' is clear)",
    flags=items["K3-002"]["flags"] + ['unclear: "built it"'])
fix("K3-075", "detail now carries what the [?batch job] flag scopes: no batch (cleanup) job needed for this exercise",
    detail="For this exercise you do not need the batch (cleanup) job: 'Just implement one small component, you don't "
           "need batch job now'.")
fix("K3-111", "source 02:57:35-02:58:34 added ('Golang gives me concurrency much better than what Java gives me' is said "
    "there first); detail notes it",
    source={"audio": ["02:57:35-02:58:34"] + items["K3-111"]["source"]["audio"], "board": []},
    detail="First said at 02:57:35 ('Golang gives me concurrency much better than what Java gives me. I'm more happy with "
           "Golang any day'), repeated at 02:59:10.")
fix("K3-004", "dropped the ID-column clause duplicated from K3-003 (gap report K3-003/K3-004); K3-004 keeps the opinion",
    statement="The teacher's opinion: ORMs suck and he hates them.",
    detail="Said as the reason people keep an auto-increment ID column (K3-003: it makes the ORM's life simple).")


# ---------------------------------------------------------------------------------------------------------------
# 2. Duplicate merges (absorbed -> kept), every nuance moved by hand
# ---------------------------------------------------------------------------------------------------------------
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
    k["depends_on"] = union(k["depends_on"], [d for d in a["depends_on"] if d != kept])
    k["orig_ids"] = union(k["orig_ids"], a["orig_ids"])
    k["merged_from"] = union(k["merged_from"], [absorbed] + a["merged_from"])
    for f in ("edits", "board_text", "board_notes", "resolved_by", "resolved_flags", "supported_by"):
        if a.get(f):
            k[f] = k.get(f, []) + a[f]
    if "core" in (a["importance"], k["importance"]):
        k["importance"] = "core"
    absorbed_into[absorbed] = kept
    del items[absorbed]
    LOG["merge"].append((absorbed, kept, why))


merge("K1-083", "K1-082", "both say concurrent transactions see the same value, hence locking; K1-083 is the teacher's "
      "general statement of the point he endorsed",
      detail_add="The teacher's general form (00:43:17): locking is needed because transactions running at the exact same "
                 "time may see the exact same value and operate on it.")
merge("K1-085", "K1-084", "both say ORDER BY id makes everyone book seat 1; K1-085 adds the order 1, 2, 3",
      detail_add="Teacher (00:44:32): because of ORDER BY id all concurrent transactions see seat ID 1 first (then 2, 3 "
                 "in that order) and everyone books that same seat.")
merge("K1-113", "K1-116", "the signal-and-re-evaluate mechanism told twice (01:01:25 and 01:04:06); K1-113 adds "
      "'re-execute and re-evaluate' on commit",
      detail_add="First said at 01:01:25: when the lock-holding transaction commits, the waiting transactions are signalled "
                 "to re-execute and re-evaluate the query.",
      flag_note="(in the absorbed 01:01:25 line)")
merge("K1-123", "K1-124", "same 'relational databases do scale' point; K1-123 adds 'those who say they don't scale do not "
      "know their real power'",
      detail_add="Those who say relational databases don't scale do not know their real power.")
merge("K3-146", "K1-057", "cross-part repeat (03:20:45) of 'implement only the core part you want to learn; the airline "
      "demo built only the locking part'",
      detail_add="Repeated in the closing Q&A (03:20:45): implement only the part you want to learn and do not waste time "
                 "learning frontend if you are not a frontend expert; the airline ticket demo itself simulated only the "
                 "locking part without a full frontend/backend.",
      flag_note="(in the absorbed 03:20:45 repeat)")
merge("K2-003", "K2-001", "both state 'fixed inventory + contention = locking'; K2-003 adds 'any system in the world', "
      "'the first thing that should come to mind' and the repeat after BookMyShow",
      detail_add="In any system in the world with fixed inventory and contention for it you apply locking, to ensure "
                 "correctness 'always'; whenever you see fixed inventory and contention, the first thing that should come "
                 "to mind is locking. Repeated after the BookMyShow example ('Fixed inventory, contention, locking').")
merge("K2-017", "K2-018", "both say the loser of a pointed-seat race gets 'no rows matched'; K2-017 adds the student's "
      "'it will fail for error' exchange and the speaker flag",
      detail_add="When the pointed seat has already been taken, MySQL reports that no rows matched. The student had said "
                 "'it will fail for error'; the 'Exactly' replies are labelled Teacher? in the transcript.")
merge("K2-035", "K2-032", "both say the isolation level governs plain concurrent UPDATEs; K2-035 adds the per-level "
      "behaviour",
      detail_add="Per level (01:23:15): serializable runs them one after another; repeatable read and read committed each "
                 "have their own particular behaviour.")
merge("K2-079", "K2-078", "both say one query absorbs both cases; K2-079 adds 'elegant', no separate threads and minimal "
      "load thanks to the expired_at index",
      detail_add="The teacher calls it an elegant solution: one SQL query absorbs both cases (no separate threads for "
                 "time-based and soft deletes) and puts minimal load because of the expired_at index.")
merge("G-005", "K2-093", "both list the per-database upsert clauses (01:57:50); G-005 adds 'every database supports it'",
      detail_add="Every database supports upsert, but each has a different clause for it (01:57:50); earlier (01:55:37) "
                 "the teacher said to check whether the chosen database supports upsert operations.")
merge("K3-009", "K2-093", "cross-part repeat (02:05:00, prepared notes) of the upsert clauses; K3-009 adds 'replace INSERT "
      "with REPLACE' in MySQL",
      detail_add="In the 02:05:00 recap: in MySQL replace INSERT with REPLACE (INSERT INTO store VALUES ... becomes REPLACE "
                 "INTO); in Postgres replace INSERT with UPSERT.")
merge("K3-008", "K2-084", "cross-part repeat (02:04:38) of 'get-then-insert/update is expensive'; K3-008 adds 'pathetic', "
      "'massive margin'",
      detail_add="In the 02:04:38 recap the teacher calls get-then-insert/update 'pathetic': it slows the system down by a "
                 "massive margin.",
      flag_note="(in the absorbed 02:04:38 recap)")
merge("K3-007", "K2-085", "cross-part repeat (02:04:38) of what a put needs; K3-007 adds 'a put must be an upsert, not an "
      "insert'",
      detail_add="In the 02:04:38 recap: a put must be an upsert, not an insert - when the same key is put twice, the second "
                 "value is expected to replace the first.")
merge("K3-014", "K2-098", "cross-part repeat (02:07:09) of the get query with 'AND expired_at > now'; K3-014 adds the "
      "reason (the key exists until the next hard-delete job)",
      detail_add="In the 02:07:09 recap: because an expired key still exists until the next hard-deletion job runs, get "
                 "must filter it in SQL: SELECT * FROM store WHERE key = k AND expired_at > now.",
      flag_note="(in the absorbed 02:07:09 recap)")
merge("K3-015", "K2-099", "cross-part repeat (02:07:30) of 'the get clause saves network IO'; K3-015 adds DB-side "
      "bandwidth and disk IO time",
      detail_add="In the 02:07:30 recap: filtering in the get query avoids moving the value to the user and filtering it "
                 "there; it saves the network bandwidth of the server and of the database, and the disk IO time the "
                 "database spends reading a humongous value.")
merge("K3-016", "K2-100", "cross-part repeat (02:07:30) of 'micro-optimizations make a database performant'",
      detail_add="Restated at 02:07:30: such micro-optimizations make a database far more performant.",
      flag_note="(in the absorbed 02:07:30 line)")
merge("K3-078", "K2-070", "the Q&A clarification (02:38:15) that the TTL column is the absolute expiry time; K3-078 adds "
      "the '12 o'clock on a particular day' example",
      detail_add="Clarified in the Q&A (02:38:15): the TTL column here is expired_at, the absolute time at which the key "
                 "expires (e.g. 12 o'clock on a particular day), not a duration.")
merge("K3-001", "K2-047", "cross-part repeat (02:02:59) of 'don't design distributed on day zero, start single-node'; "
      "K3-001 adds the single MySQL node and 'cover all the devils, then scale'",
      detail_add="Restated at 02:02:59 for the KV store: start with a single MySQL node; first cover all the implementation "
                 "details ('devils') on one node, sort them out, then scale.",
      flag_note="(in the absorbed 02:02:59 restatement)")
merge("K3-096", "K2-030", "the closing-Q&A student conclusion (02:50:57) is the same 'about 120 evaluations with SKIP "
      "LOCKED' already confirmed at 01:21:09",
      detail_add="In the closing Q&A (02:50:57) a student concluded again that with SKIP LOCKED only about 120 evaluations "
                 "(one per thread) are triggered; the 'Right. Yeah.' that follows sits inside the student's own turn.",
      flag_note="(in the absorbed 02:50:57 Q&A)")
merge("K3-094", "K2-031", "the closing-Q&A recap (02:48:43) of N(N+1)/2; K3-094 adds that these are internal database "
      "evaluations, not application queries",
      detail_add="Clarified in the closing Q&A (02:48:43): the N(N+1)/2 figure counts evaluations done internally by the "
                 "database (each waiting thread re-evaluates after the locked seat is taken), not queries fired by the "
                 "application; student recap: with 120 threads all wait on seat 1, then 119 on seat 2, and so on.",
      flag_note="(in the absorbed 02:48:43 Q&A)")
merge("K3-022", "K3-017", "both say lazy deletion deletes an accessed expired key right away; K3-022 adds Redis telling "
      "the user the key does not exist and the cleanup-'thread' aside",
      detail_add="Redis (02:10:10): if a key with a TTL is read before Redis's periodic cleanup has removed it, Redis does "
                 "not return it, tells the user the key does not exist, and deletes it right there because that is not an "
                 "expensive operation for it. Redis runs the cleanup 'not a thread, but a kind of, kind of a "
                 "synchronicity' ('assume it as a thread'); the teacher cannot reveal details because he covers them in "
                 "his course and they are out of scope.",
      flag_note="(in the absorbed Redis aside, 02:10:10)")
merge("K3-039", "K3-033", "both say Redis optimizes for speed over completeness; K3-039 adds 'trading off a bit of memory "
      "leak', cleaned up eventually by lazy deletion plus sampling",
      detail_add="Redis trades a bit of memory leak for speed, assuming the leftover expired keys are eventually cleaned up "
                 "through lazy deletion and random sampling, so it spends bare minimum time in its periodic job (02:18:52).")
merge("K3-088", "K3-030", "the Q&A (02:43:49) on the 25% rule; K3-088 adds that the threshold is on the sample's deleted "
      "keys, not a database-wide count",
      detail_add="Clarified in the Q&A (02:43:49): the 25% threshold is on the keys deleted from the sample (the expired "
                 "ones in the 20-key sample), not on an expired-keys count over the whole database, which would itself be "
                 "a slow operation.",
      flag_note="(in the absorbed 02:43:49 Q&A)")
merge("K3-080", "K3-006", "the Q&A restatement (02:39:37) of 'user delete is an update; hard delete later in batch to avoid "
      "B+ tree rebalancing'",
      detail_add="Restated in the Q&A (02:39:42): a user delete does not hard-delete the key every time, because that would "
                 "require rebalancing the B+ tree; the hard delete happens later in batch.")
merge("K3-081", "K3-041", "both say the 'TTL > now' clause means no disk IO for expired keys; K3-081 adds that the update is "
      "still fired, plus the student's summary",
      detail_add="Q&A (02:40:09): even though the update is fired for every user delete, it leads to no disk IO for "
                 "already-expired keys because the clause does not match them. Student 1's own summary (no explicit "
                 "teacher verdict): anything less than or equal to now 'is anyways taken care by the batch' - 'heads you "
                 "win, tails also you win kind of a mechanism'.")
merge("K3-079", "K3-077", "both clarify user delete (TTL > now, soft) vs batch delete (TTL < now, hard)",
      detail_add="Teacher (02:38:45): the user delete sets TTL to a magic number only where the key is not yet expired; "
                 "batch delete is a separate cleanup that hard-deletes keys whose TTL is less than now.")
merge("K3-066", "K3-076", "the same week 5-7 roadmap (hot partitions, dynamic scaling, consistent hashing)",
      detail_add="Earlier (02:33:32): hot partitions, adding replicas on the fly and scaling dynamically are discussed in "
                 "depth in the fifth, sixth and seventh weeks.")

# ---------------------------------------------------------------------------------------------------------------
# 3. Cross-links instead of merges (partial overlaps: both sides keep their own nuance)
# ---------------------------------------------------------------------------------------------------------------
XL = [
    ("K1-095", "K1-094", "deadlock definition kept standalone; K1-094 holds the student's prediction (link exists)"),
    ("K1-089", "K1-084", "best case: all 120 start while seat 1 is free (ORDER BY id cluster)"),
    ("K1-122", "K1-120", "10x faster lesson vs the 1.7 s -> 147 ms numbers (link exists)"),
    ("K1-114", "K1-116", "'client does not re-fire' kept separate from the signalling sequence"),
    ("K2-042", "K1-124", "relational DBs scale: partitioning/sharding vs big-data caveat"),
    ("K3-137", "K1-059", "teacher built these systems himself: deadlock war story vs 85% built myself"),
    ("K2-020", "K1-033", "MySQL two-terminal recipe = how to reproduce K1-033's crosswise deadlock locally"),
    ("K2-024", "K1-116", "'evaluated only once' misconception vs re-evaluation on signal"),
    ("K2-040", "K1-116", "thread wait queue + signal is the 'how' behind the waiters"),
    ("K2-009", "K1-116", "locking at the engine/CPU level (mutex)"),
    ("K2-031", "K1-117", "N(N+1)/2 quantifies 'painful for the database'"),
    ("K3-095", "K1-121", "SKIP LOCKED internals; the re-evaluate wording conflict stays visible"),
    ("K2-014", "K1-107", "pointed seat lookup (id = 67) set up by K1-107"),
    ("K2-022", "K1-050", "SKIP LOCKED: a released row is not lost"),
    ("K2-032", "K1-098", "isolation level governs plain UPDATEs"),
    ("K2-002", "K1-067", "120 seats + 120 people = fixed inventory + contention"),
    ("K2-011", "K1-066", "the demo is not a reservation system; holding a seat is a separate system"),
    ("K2-038", "K2-011", "never span a transaction across payment: throughput reason vs 'different system'"),
    ("K2-039", "K2-013", "'on hold' vocabulary vs the multi-phase process"),
    ("K2-023", "K2-022", "released row picked up by whoever re-evaluates (cluster)"),
    ("G-003", "K2-023", "ORDER BY reason for the released row (cluster)"),
    ("K2-070", "K2-065", "student's created_at proposal vs the expired_at solution"),
    ("K2-078", "K2-071", "expiry cleanup (<= now) vs the combined job (< now); not merged, see rejected"),
    ("K2-075", "K2-074", "student's negative-value proposal vs the teacher's query (link exists)"),
    ("K2-095", "K2-092", "upsert outcome vs mechanism"),
    ("K2-099", "K2-097", "student's API-side proposal vs the network I/O payoff"),
    ("K2-100", "K2-087", "'devils in the details' said twice with different framing"),
    ("K2-098", "K2-077", "student's read-path filter point vs the get query"),
    ("K3-002", "K2-053", "final column list vs the key/value type reasoning"),
    ("K3-122", "K2-072", "B+ tree reason vs the student's soft-delete proposal"),
    ("K3-006", "K2-075", "delete = update (-1) plus the periodic batch hard delete"),
    ("K3-005", "K2-076", "-1 saves the column (teacher) vs one job instead of two (student)"),
    ("K3-131", "K2-050", "Apache Ignite: built on a relational DB vs very similar source code"),
    ("K3-043", "K2-050", "the delete clause found in Apache Ignite"),
    ("K3-040", "K2-101", "the 'one more performance optimization' promised at 02:00:57 is delivered here"),
    ("K2-094", "K2-093", "promise to cover the upsert clauses, fulfilled at 02:05 (now inside K2-093)"),
    ("K3-116", "K2-092", "upsert saves a round trip: 4 trips vs 2 with SELECT TOP 1 1"),
    ("K3-013", "K2-078", "TTL approach 1 (cron every 10 minutes) uses the same cleanup query"),
    ("K3-045", "K2-098", "final recap of both queries (get half = K2-098)"),
    ("K3-011", "K1-053", "NOWAIT applied to concurrent puts"),
    ("K3-012", "K1-052", "choice among SKIP LOCKED / NOWAIT / wait depends on what you need"),
    ("K3-093", "K2-020", "autocommit = 0 in the experiment vs what autocommit = true means"),
    ("K3-093", "K2-037", "commit releases the locks"),
    ("K3-089", "K3-031", "sample represents the population: 'not more than 25 percent'"),
    ("K3-089", "K3-035", "leftover expired keys bounded: 20-25% vs not more than 25%"),
    ("K3-091", "K3-029", "why sampling is not for disk-based DBs"),
    ("K3-021", "K3-020", "on disk batch, in memory pointed/staggered deletes"),
    ("K3-125", "K3-019", "in-memory deletes are cheap: microseconds vs malloc/free"),
    ("K3-087", "K3-073", "local exercise: two MySQL servers vs one DB plus one replica"),
    ("K3-136", "K3-075", "implementing is how you learn (link exists)"),
    ("K3-136", "K1-057", "implement only what you want to learn"),
    ("K3-107", "K3-102", "complex ORM code unreadable: projections vs 10-15-table joins"),
    ("K3-106", "K3-104", "native-query compromise because ORMs lack DB-specific operations (link exists)"),
    ("K3-143", "K3-139", "database stays out of the user's space: answer vs design principle"),
    ("K3-047", "K3-005", "-1 vs any magic value (before 1 January 1970)"),
    ("K3-123", "K3-006", "almost all databases do soft delete then batch cleanup"),
    ("K3-134", "K3-131", "real KV stores differ in the storage layer"),
    ("K3-034", "K3-033", "Redis single threaded (link exists)"),
    ("K3-092", "K3-091", "skim the rows instead of sampling on disk (link exists)"),
]
for a, b, why in XL:
    assert a in items and b in items, (a, b)
    if b not in items[a]["depends_on"]:
        items[a]["depends_on"].append(b)
    LOG["xlink"].append((a, b, why))


# ---------------------------------------------------------------------------------------------------------------
# 4. Board items
# ---------------------------------------------------------------------------------------------------------------
def bmerge(b, k, why, detail_add=None, flag=None):
    B, K = board[b], items[k]
    K["source"]["board"] = union(K["source"]["board"], B["source"]["board"])
    K.setdefault("board_text", []).append(B["verbatim"])
    K.setdefault("board_notes", []).append({"id": b, "time": B["source"]["board"], "statement": B["statement"],
                                            "detail": B["detail"] or None})
    if detail_add:
        add_detail(k, detail_add)
    if flag:
        K["flags"] = union(K["flags"], [flag])
    K["orig_ids"] = union(K["orig_ids"], [b])
    K["merged_from"] = union(K["merged_from"], [b])
    LOG["board"].append((b, k, why, B["verbatim"], bool(detail_add)))


bmerge("B-001", "K1-004", "duplicates audio (lecture plan: locking, airline demo, KV store on a relational DB)",
       "Board agenda (00:00:30): Relational Databases & Pessimistic locking; Designing: Airline Checkin System; "
       "Designing: KV Store on relational DB (title slide 'SYSTEM DESIGN MASTERCLASS Databases').")
bmerge("B-002", "K1-006", "duplicates audio (rows and columns)")
bmerge("B-003", "K1-006", "duplicates audio (relations); board wording 'You pick relational databases for relations'",
       "Board: 'You pick relational databases for relations.'")
bmerge("B-004", "K1-012", "duplicates audio (ACID core of relational DBs); board adds the pre-reads pointer (cf. K1-014)",
       "Board: 'Relational Databases are known for ACID' / 'Refer to pre-reads for understanding ACID'.")
bmerge("B-006", "K1-016", "duplicates audio (database locking = pessimistic implementation); board 'core idea' wording",
       "Board heading: 'Database Locking : [ Pessimistic Locking ]', core idea: you acquire the lock before proceeding.")
bmerge("B-007", "K1-018", "duplicates audio (wrap the critical section with a lock)",
       "Board flow: ACQ_LOCK() -> READ -> UPDATE -> REL_LOCK().")
bmerge("B-008", "K1-019", "duplicates audio")
bmerge("B-009", "K1-022", "duplicates audio ('protect the sanity of the data', 00:08:14); board adds consistency, integrity",
       "Board: why locks - to protect the sanity of the data (consistency, integrity), i.e. protecting the data against "
       "concurrent updates.")
bmerge("B-010", "K1-024", "duplicates audio (deadlock as the risk of pessimistic locking)",
       "Board: 'Risk: Transactional Deadlock !!'")
bmerge("B-011", "K1-032", "duplicates audio (the database kills a transaction to avoid deadlock); board wording differs",
       "Board wording: 'The transaction that detects the deadlock kills itself !' (audio: the engine kills the transaction "
       "that fired the lock-acquiring query); diagram D-01 shows T1 -> Row 1 and Row 2 -> T1.")
bmerge("B-012", "K1-040", "duplicates audio (shared lock: others read, cannot modify)",
       "Board: rows 'reserved for read by the current transaction'.")
bmerge("B-013", "K1-043", "duplicates audio (shared lock upgraded to exclusive on modify)")
bmerge("B-014", "K1-037", "duplicates audio (SELECT ... FOR SHARE)")
bmerge("B-015", "K1-041", "duplicates audio (T1 1,2,6 / T2 3,4,6 FOR SHARE example)",
       "Board diagram D-02: Transaction 1 'READ & MODIFY' WHERE user_id IN (1,2,6) FOR SHARE; Transaction 2 'READ & WAIT' "
       "WHERE user_id IN (3,4,6) FOR SHARE.")
bmerge("B-016", "K1-045", "duplicates audio (exclusive lock: others neither read nor modify)",
       "Board: rows 'reserved for write by the current transaction'.")
bmerge("B-017", "K1-046", "duplicates audio (SELECT ... FOR UPDATE)")
bmerge("B-018", "K1-047", "duplicates audio (FOR UPDATE example, T2 waits on row 6)",
       "Board diagram D-03: Transaction 2 marked WAIT; red emphasis on the overlapping row 6 (00:22:45).")
bmerge("B-019", "K1-050", "duplicates audio (SKIP LOCKED); board wording 'removes the locked rows from the result set'",
       "Board: SKIP LOCKED 'Removes the locked rows from the result set'.")
bmerge("B-020", "K1-053", "duplicates audio (NOWAIT fails immediately / kills the transaction)",
       "Board: 'NOWAIT locking read does not wait for the lock to be acquired. It fails immediately'.")
bmerge("B-022", "K1-060", "duplicates audio (airline check-in requirements)")
bmerge("B-023", "K1-061", "duplicates audio (handle multiple people picking seats)",
       "Board restates at 00:29:24: 'How will we handle when all 120 people flying in one flight in the same trip check-in "
       "at the same time!'")
bmerge("B-024", "K1-062", "duplicates audio (schema); board gives the exact columns",
       "Board schema D-04: airlines(id, name), flights(id, airline_id, name), trips(id, flight_id, fly_time), "
       "users(id, name), seats(id, name, trip_id, user_id); sample rows AIRINDIA, INDIGO, GOAIR; AIRINDIA 101, AIRINDIA "
       "279, INDIGO 6E101; seats 1A-1E.")
bmerge("B-025", "K1-063", "duplicates audio (check-in service, MySQL, admin service)",
       "Board diagram D-05: users -> check-in -> MySQL <- Admin Svc; 'Admin adds new flights & trips & keeps the states "
       "updates' (as written; probably 'status updated').")
bmerge("B-026", "K2-001", "duplicates audio (fixed inventory + contention -> locking); board lists CoWIN, IRCTC, "
       "BookMyShow, Flash Sale as early as 00:29:24",
       "Board (00:29:24): 'Similar Systems Fixed inventory + contention: Cowin, IRCTC, BookMyShow, Flash Sale'.")
bmerge("B-027", "K1-070", "duplicates audio (approach 0 books a given seat); board code comment adds 'last one wins'",
       "Board code comment (approach0/main.go): 'books the given seat for the given user // last one wins'; UPDATE seats "
       "set user_id = ? where id = ?.")
bmerge("B-028", "K1-075", "duplicates audio (approach 1 random seat); code comment 'overriding possible'",
       "Code comment: 'books one seat at random for the given user // overriding possible'.")
bmerge("B-029", "K1-080", "duplicates audio (approach 2 run); terminal shows two users each booking 7-E and 12-E",
       "Terminal on screen: two users each 'booking' 7-E and two booking 12-E; seat map mostly empty. Code comment: 'all "
       "users booking seats at random with no checks // last one wins'.")
bmerge("B-030", "K1-081", "duplicates audio (approach 3 query and runs)",
       "Code comment: 'finding first available seat and booking it // last one wins'; runs at 00:46:15-00:48:30 show all "
       "visible users assigned 1-C (or 1-B) and only 3-4 seats marked.")
bmerge("B-031", "K1-110", "duplicates audio (approach 4 FOR UPDATE run fills all 120); board gives exact timings",
       "Terminal: 'simulating 120 users', seats 1-A ... 20-F assigned in order, 'took 1.2469734s', '1.7339124s', "
       "'1.7906213s'. Code comment: 'selecting the first available seat // and exclusively locking it'.")
bmerge("B-032", "K1-120", "duplicates audio (approach 5, 147 ms); exact figure 147.4798ms on screen",
       "Terminal: 'took 147.4798ms' for approach 5 (approach 4 runs on screen: 1.2469734s, 1.7339124s, 1.7906213s).")
bmerge("B-033", "K2-014", "duplicates audio (pointed seat query id = 67 FOR UPDATE, live code edit)",
       "Live code edit (01:13:15): where trip_id = 1 and user_id IS null and id = 67 FOR UPDATE.")
bmerge("B-034", "K2-045", "duplicates audio (distributed KV store on a relational DB; requirements in K2-048..K2-050)",
       "Board: 'Distributed KV store on relational database'; requirements 'Infinitely Scalable', 'GET, PUT, DEL, TTL'; "
       "'Apache Ignite' written as the reference.")
bmerge("B-035", "K2-051", "duplicates audio (five brainstorm parts); board adds 'TTL ... Keyspecific' (cf. K2-066)",
       "Board: 'Brainstorm: Storage, optimize storage, Insert, Update, TTL'; TTL marked 'Keyspecific'.")
bmerge("B-036", "K2-056", "duplicates audio (key varchar(16) primary key); board also shows value (BLOB)",
       "Board: 'store: key PK ( varchra (16) ) [sic, varchar], value (BLOB)'.")
bmerge("B-037", "K2-067", "duplicates audio (created_at + TTL proposal and its cleanup query)",
       "Board columns: key, value, created_at, ttl_sec; query 'Delete store where now() - create..'.")
bmerge("B-038", "K2-070", "duplicates audio (store expired_at; indexable cleanup query)",
       "Board: 'expired_at'; 'BG Job Delete from store where expired_at <= now();'.")
bmerge("B-039", "K2-075", "duplicates audio (delete = update expired_at = -1); board shows is_del written first and erased",
       "Board: 'Soft delete' - an 'is_del = True' column with its own BG job was written first (01:46:30) and erased by "
       "01:50; 'Delete -> update store set exp_at = -1 where key = k' replaces it.")
bmerge("B-040", "K2-082", "duplicates audio (insert; second PUT on same key fails, key is PK)",
       "Board: 'Insert -> insert into store values (k, v, e);', 'Put k1 v1 / Put k1 v2', 'key -> PK'.")
bmerge("B-041", "K2-093", "duplicates audio (upsert clauses); prepared notes add key exist -> update / not -> insert",
       "Board: 'UPSERT', 'upsert into store values (k, v2, e);', '\" Replace into \"', '\" ON Duplicate Key Update \"'; "
       "prepared notes (02:04:45): 'key exist -> update', 'key does not exist -> insert', \"REPLACE INTO 'store' VALUES "
       "( k, v, ttl )\" for MySQL, 'postgreSQL -> UPSERT statement'.")
bmerge("B-042", "K2-098", "duplicates audio (GET with expired_at > now())",
       "Board: 'GET Select * from store where key = k, and expired_at > now()'.")
bmerge("B-043", "K2-047", "duplicates audio (start with a single node, then scale); prepared notes; resolves F107",
       "Prepared notes (02:02:45): 'Storage: MySQL start with single node & then scale as the system demands'.")
bmerge("B-044", "K3-005", "duplicates audio (final schema; ttl = -1 replaces is_deleted)",
       "Prepared notes: key, value, ttl (absolute expiration time), is_deleted; 'Saving storage: why have another column "
       "for is_deleted ?' -> 'ttl -> -1 special value marking deletion'.")
bmerge("B-045", "K3-006", "duplicates audio (batch, periodic hard delete); board adds 'minimize I/O & rebalancing'",
       "Prepared notes: 'How to hard delete? Batch & periodic cleanup - Run a separate cleanup process to hard delete the "
       "soft deleted rows', 'minimize I/O & rebalancing'.")
bmerge("B-046", "K3-011", "duplicates audio (FOR UPDATE NOWAIT for concurrent puts); board caption contradicts NOWAIT",
       "Prepared notes: 'Multiple PUT requests? locks -> protects data integrity', caption 'when one is updating other "
       "waits' next to 'FOR UPDATE NO WAIT' and 'UPDATE store SET value = v2 WHERE key = k1'.",
       'check: board caption "when one is updating other waits" (02:03:30) vs the NOWAIT clause on the same page; audio '
       '(02:05:50) says NOWAIT, "kill myself"')
bmerge("B-047", "K3-013", "duplicates audio (TTL approach 1: batch deletion with a CRON job; filter on read)",
       "Board D-07: 'Approach 1: Batch deletion with CRON Job', every 't minutes' hard delete; 'What about expired keys "
       "before they are hard deleted? - filter out' (where key = k and ttl > now()).")
bmerge("B-048", "K3-017", "duplicates audio (lazy deletion, in-memory); 'what if the key is never fetched?' (cf. K3-024)",
       "Board: 'Lazy deletion [in-mem] Do hard delete when an expired key is fetched * what if the key is never fetched ?'")
bmerge("B-049", "K3-028", "duplicates audio (random sampling of 20 keys, repeat above 25%, not for disk-backed DBs)",
       "Board: 'Approach 3: Random Sampling & Deletion * Not suitable for disk backed DBs - Randomly sample 20 keys having "
       "expiration set'.")
bmerge("B-050", "K3-031", "duplicates audio (sample represents the population)",
       "Board: 'Idea: if sample has < 25% of expired keys, population will have < 25% of expired keys (not deleted)'.")
bmerge("B-051", "K3-036", "duplicates audio (Redis, 20 from the Central Limit Theorem)",
       "Board: 'This approach is used by Redis & the number ( sample size ) 20 comes from the Central limit Theorem'.")
bmerge("B-052", "K3-040", "duplicates audio (delete with AND ttl > NOW()); board adds 'reducing the load on disk'",
       "Board: 'UPDATE store SET ttl = -1 WHERE key = k1 AND ttl > NOW();' with the brace label 'reducing the load on "
       "disk'.")
bmerge("B-053", "K3-045", "duplicates audio (batch cleanup ttl <= now() removes expired and soft-deleted keys)",
       "Board: 'DELETE FROM store WHERE ttl <= now();' labelled 'expired and soft deleted'.")
bmerge("B-054", "K3-053", "duplicates audio (users -> LB -> KV API servers -> MySQL + batch cleanup)",
       "Board D-08 adds: 'We add as many KV API servers to support the load ... assuming MySQL is handling the incoming "
       "load' (cf. K3-054).")
bmerge("B-055", "K3-056", "duplicates audio (read replicas when reads dominate, staleness okay); board-only ratio 99:1",
       "Board: 'If we have a 99:1 read requests and one DB is not able to handle it, we add read replicas ... stale data "
       "is okay' (the 99:1 ratio is board-only).")
bmerge("B-056", "K3-059", "duplicates audio (scale the master vertically first, then partition)")
bmerge("B-057", "K3-061", "duplicates audio (range sharding a-m / n-z, replicas, batch cleanup per master)",
       "Board D-10: Master 1 [a-m], Master 2 [n-z], each with its own replica and batch-cleanup job; every KV-API connects "
       "to all masters; 'Each Master node owns an exclusive fragment of the data'.")

# board-only items -> their own items
for b, topic, deps, why in [
        ("B-005", "databases > indexes", [], "board-only: 'Indexes make reads faster and writes slower' is never "
                                                    "said in the audio (the audio only mentions the index video, K1-014)"),
        ("B-021", "concurrency > locking > nowait", ["B-020"], "board-only: MySQL ERROR 3572 for a NOWAIT read on a locked "
                                                             "row is not said in the audio")]:
    B = board[b]
    new = {k: v for k, v in B.items()}
    new.update({"orig_ids": [b], "merged_from": [], "origin": "board", "topic": topic,
                "depends_on": [d if d != "B-020" else "K1-053" for d in deps],
                "detail": B["detail"] or None, "board_text": [B["verbatim"]]})
    items[b] = new
    seq[b] = n + 1
    n += 1
    LOG["board"].append((b, None, why, B["verbatim"], False))


# ---------------------------------------------------------------------------------------------------------------
# 5. Flag resolutions (flag_resolutions.md)
# ---------------------------------------------------------------------------------------------------------------
def find(marker_sub, near=None):
    return [i for i, it in items.items() if any(marker_sub in f for f in it["flags"])]


def resolve(k, fid, marker_sub, evidence, flag_text=None):
    K = items[k]
    hit = [f for f in K["flags"] if marker_sub in f]
    if not hit:
        assert flag_text, (k, fid, marker_sub)
        hit = [flag_text]
    K["flags"] = [f for f in K["flags"] if f not in hit]
    K.setdefault("resolved_by", []).append("board %s (%s: %s)" % (evidence[0], fid, evidence[1]))
    K["resolved_flags"] = K.get("resolved_flags", []) + hit
    old = K["confidence"]
    if not K["flags"] and old != "high":
        K["confidence"] = "high"
    if K["confidence"] != old:
        conf = "confidence %s -> %s" % (old, K["confidence"])
    else:
        conf = "confidence %s unchanged%s" % (old, " (other flags remain)" if K["flags"] else "")
    LOG["flag"].append((k, "%s resolved_by board %s (%s); flag removed; %s" % (fid, evidence[0], evidence[1], conf)))


def support(k, fid, marker_sub, evidence, flag_text=None):
    K = items[k]
    if flag_text and not any(marker_sub in f for f in K["flags"]):
        K["flags"] = K["flags"] + [flag_text]
        add_edit(k, "added the missing flag %s (analyst had not copied it); confidence %s -> medium" % (
            flag_text, K["confidence"]))
        if K["confidence"] == "high":
            K["confidence"] = "medium"
    done = False
    new = []
    for f in K["flags"]:
        if marker_sub in f and not done:
            f = f + " [supported_by board %s]" % evidence[0]
            done = True
        new.append(f)
    assert done, (k, fid, marker_sub)
    K["flags"] = new
    K.setdefault("supported_by", []).append("board %s (%s: %s)" % (evidence[0], fid, evidence[1]))
    LOG["flag"].append((k, "%s supported_by board %s (%s); flag kept and annotated; confidence %s unchanged" % (
        fid, evidence[0], evidence[1], K["confidence"])))


RES = [
    ("F019", "Which seat", ("00:33:15", "approach-0 code 'which seat do you want to book?'")),
    ("F024", "?rand ", ("00:39:00", "approach-1/2 code uses rand.Intn")),
    ("F030", "approach three", ("00:49:45", "approach3/main.go then approach4 = same query + FOR UPDATE")),
    ("F036", "[?120 | asr: \"26\"]", ("01:00:15", "terminal 'simulating 120 users', 6 x 20 seat map all x")),
    ("F063", "for a bit", ("01:21:30", "query on screen 'ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED'")),
    ("F074", "where can", ("01:38:45", "'PK ( varchra (16) )' written while speaking")),
    ("F078", "[?varchar | asr: \"worker\"]", ("01:38:45", "same 'PK ( varchra (16) )' on screen")),
    ("F084", "where it", ("01:41:00", "'PK ( varchra (16) )' next to '(BLOB)'")),
    ("F104", "an episode", ("02:01:00", "yellow box 'UPSERT' and 'upsert into store values (k, v2, e);'")),
    ("F107", "single load", ("02:02:45", "prepared notes 'start with single node'")),
    ("F120", "discalpe", ("02:21:45", "'ttl > NOW()' labelled 'reducing the load on disk'")),
    ("F125", "bad job", ("02:24:30", "'Implementing Batch cleanup delete' on screen")),
    ("F131", "arc\"", ("02:27:45", "heading 'High level Architecture'")),
    ("F136", "bad job", ("02:34:30", "partitioned architecture with a yellow 'Batch Cleanup' box per master")),
    ("F147", "this backed", ("02:45:30", "'* Not suitable for disk backed DBs'")),
]
SUP = [
    ("F009", "exclusive error", ("00:21:30", "'Exclusive locks :' page and FOR UPDATE example (noun not written)")),
    ("F015", "air indigo", ("00:28:30", "schema rows '1 AIRINDIA', '2 INDIGO', '3 GOAIR'")),
    ("F018", "lockup", ("00:29:24", "'locking Demonstration' heading")),
    ("F021", "transition", ("00:34:30", "approach-0 book(): 'transaction got the seat'")),
    ("F028", "relationship", ("00:02:00", "'Relational Databases:' page")),
    ("F034", "All one 26 feet", ("01:00:15", "'Each flight has 120 seats'; 'simulating 120 users'")),
    ("F039", "one-minute", ("01:00:45", "approach-4 run output, 120 seats filled")),
    ("F042", "\"126\"", ("01:06:00", "approach-5 seat map all 120 x")),
    ("F043", "database login", ("00:06:15", "heading 'Database Locking : [ Pessimistic Locking ]'")),
    ("F048", "classes", ("00:30:00", "'Similar Systems ... Flash Sale'")),
    ("F064", "approach for", ("00:50:45", "repo tree 'approach4'")),
    ("F070", "Single load", ("02:02:45", "'start with single node' in the prepared notes")),
    ("F096", "[?varchar | asr: \"worker\"]", ("01:41:00", "'PK ( varchra (16) )' written at 01:37-01:41")),
    ("F139", "ACID | asr: \"us\"", ("00:02:00", "'Relational Databases are known for ACID'")),
]
# flag -> item, decided by time (the same marker text recurs at different moments)
RES_ITEM = {"F019": ["K1-070"], "F024": ["K1-080"], "F030": ["K1-093"], "F036": ["K1-110"], "F063": ["K2-031"],
            "F074": ["K2-056"], "F078": ["K2-059"], "F084": ["K2-064"], "F104": ["K2-102"], "F107": ["K2-047"],
            "F120": ["K3-041"], "F125": ["K3-046"], "F131": ["K3-052"], "F136": ["K3-075"], "F147": ["K3-090"]}
SUP_ITEM = {"F009": ["K1-048"], "F015": ["K1-060"], "F018": [], "F021": ["K1-072"], "F028": ["K1-088", "G-002"],
            "F034": ["K1-106"], "F039": ["K1-112"], "F042": ["K1-120"], "F043": ["K1-122"], "F048": ["K2-012"],
            "F064": ["K2-033"], "F070": [], "F096": ["K2-080"], "F139": ["K3-085"]}
# markers the analyst did not copy into flags although the item rests on that moment
FLAG_TEXT = {"F125": 'asr: [?batch job | asr: "bad job"] (02:24:07, student\'s argument; not previously listed in flags)',
             "F064": 'asr: [?approach four | asr: "approach for"] (01:22:40, the student\'s question; not previously '
                     'listed in flags)'}
NOITEM = []
for fid, m, ev in RES:
    if not RES_ITEM[fid]:
        NOITEM.append((fid, m, "resolved", find(m)))
    for k in RES_ITEM[fid]:
        resolve(k, fid, m, ev, FLAG_TEXT.get(fid))
for fid, m, ev in SUP:
    if not SUP_ITEM[fid]:
        NOITEM.append((fid, m, "supported", find(m)))
    for k in SUP_ITEM[fid]:
        support(k, fid, m, ev, FLAG_TEXT.get(fid))

# related notes (not flags)
add_detail("K1-080", "The terminal on screen (00:39:00-00:39:45) shows two users each 'booking' 7-E (and two 12-E); the "
                     "ASR 'seven easy' matches 7-E better than the guessed 7C.")
items["K1-080"]["flags"] = [f + " [board shows 7-E, 00:39:00]" if "7C" in f else f for f in items["K1-080"]["flags"]]
items["K1-080"].setdefault("supported_by", []).append("board 00:39:00 (F025 related note: terminal shows 7-E booked twice)")
LOG["flag"].append(("K1-080", "F025 (related note): board 00:39:00 terminal shows 7-E booked twice; flag kept, annotated "
                              "'[board shows 7-E]', detail notes it; confidence high unchanged"))
add_detail("K2-059", "At this moment the teacher writes '(BLOB)' next to value on the board (01:41:00); the unclear "
                     "'pick block' is probably 'pick blob'.")
items["K2-059"]["flags"] = [f + " [board: '(BLOB)' written here, probably 'pick blob']" if "pick block" in f else f
                            for f in items["K2-059"]["flags"]]
items["K2-059"].setdefault("supported_by", []).append("board 01:41:00 (F080 related note: '(BLOB)' written next to value)")
LOG["flag"].append(("K2-059", "F080 (related note): board 01:41:00 shows '(BLOB)' written next to value; 'pick block' flag "
                              "kept and annotated; confidence medium unchanged"))
add_detail("K2-056", "The board shows only the size 16 ('varchra (16)'); no help for the '30 to 60' sizes (F076).")
LOG["flag"].append(("K2-056", "F076 (related note): board shows only 16; '30 to 60' flag kept unchanged"))

# ---------------------------------------------------------------------------------------------------------------
# 6. Topic normalisation
# ---------------------------------------------------------------------------------------------------------------
TOPIC_EXACT = {
    "concurrency > pessimistic-locking": "concurrency > locking",
    "locking > isolation-levels": "databases > relational > isolation-levels",
    "learning approach": "learning > approach",
    "system-design > principles": "design-approach > principles",
    "engineering-practice": "design-approach > engineering-practice",
    "kv-store > approach": "design-approach",
    "admin > forward-references": "admin > roadmap",
    "admin > assignment": "admin > assignments",
    "aside > booking-app": "admin > aside > booking-app",
    "caching > redis > expiry": "kv-store > ttl > redis > sampling",
    "concurrency > goroutines": "programming-languages > go > goroutines",
}
TOPIC_ID = {
    "K1-057": "learning > implement",
    "B-036": None,
}
TOPIC_PREFIX = [
    ("concurrency > pessimistic-locking > ", "concurrency > locking > "),
    ("locking > ", "concurrency > locking > "),
    ("relational-databases > ", "databases > relational > "),
    ("case-study > airline-checkin > ", "concurrency > airline-check-in > "),
    ("case-study > kv-store > ", "kv-store > "),
]


def norm_topic(t, i):
    if TOPIC_ID.get(i):
        return TOPIC_ID[i]
    if t in TOPIC_EXACT:
        return TOPIC_EXACT[t]
    for a, b in TOPIC_PREFIX:
        if t.startswith(a):
            t = b + t[len(a):]
            break
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


order = sorted(items, key=lambda i: (first_time(items[i]), seq[i]))
lid = {i: "L-%04d" % (k + 1) for k, i in enumerate(order)}
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
    if it["confidence"] == "low" and not it["flags"]:
        raise SystemExit("low confidence without flag: " + i)
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
nK = sum(1 for x in all_orig if x.startswith("K"))
nG = sum(1 for x in all_orig if x.startswith("G"))
W = []
W.append("# Lecture 05 ledger - changes log\n")
W.append("Inputs: part1-3.jsonl (%d K items), gaps.jsonl (%d G items), gap_report.md, board/board_items.jsonl (%d B "
         "items), board/flag_resolutions.md, board/board_log.md, transcript.md. Output: ledger.jsonl (%d items, final IDs "
         "L-0001.. in teaching order = first audio timestamp, board time for board-only items; ties keep the original "
         "part order). Old->new IDs in id_map.json. Every hunter fix was re-checked against transcript.md before it was "
         "applied. Helper script: build_ledger.py (holds every decision below; does the renumbering, id_map and this "
         "log).\n" % (nK, nG, len(board), len(out)))
W.append("## Distortion fixes (%d lines)\n" % len(LOG["fix"]))
for i, log in LOG["fix"]:
    W.append("- %s: %s [final %s]" % (i, log, L(i)))
W.append("\n## Duplicate merges (%d pairs; absorbed item -> kept item)\n" % len(LOG["merge"]))
for a, k, why in LOG["merge"]:
    W.append("- %s -> %s: %s; absorbed nuance moved to the kept item's detail, absorbed verbatim kept in "
             "merged_verbatims, sources and flags unioned [final %s]" % (a, k, why, L(a)))
W.append("\n## Partial overlaps cross-linked via depends_on instead of merged (%d links)\n" % len(LOG["xlink"]))
W.append("Each side adds its own nuance, so both are kept. Format: item -> now depends on (\"link exists\" = the analyst "
         "had already linked them; kept).\n")
for a, b, why in LOG["xlink"]:
    W.append("- %s -> %s: %s [final %s -> %s]" % (a, b, why, L(a), L(b)))
W.append("\n## Board decisions (%d B-items) - one line per B id\n" % len(LOG["board"]))
for b, k, why, txt, nuance in sorted(LOG["board"], key=lambda x: x[0]):
    if k:
        W.append("- %s -> merged into %s (%s)%s: \"%s\" [final %s]" % (
            b, k, why, "; board nuance added to detail" if nuance else "", txt, L(b)))
    else:
        W.append("- %s -> new item (%s): \"%s\" [final %s]" % (b, why, txt, L(b)))
W.append("\n## Flag resolutions from the board - one line per item touched\n")
for k, log in LOG["flag"]:
    W.append("- %s: %s [final %s]" % (k, log, L(k)))
for fid, m, kind, hits in NOITEM:
    W.append("- %s (%s, marker '%s'): no ledger item rests on this moment's marker%s; nothing to change" % (
        fid, kind, m, (" (the same marker text elsewhere: %s, different moment)" % ", ".join(hits)) if hits else ""))
W.append("\n## Topic normalisation\n")
W.append("One tree: hyphenated lower-case segments. Locking under `concurrency > locking > ...` (part 1's "
         "`concurrency > pessimistic-locking > ...` and part 2's `locking > ...` joined; deadlocks stay "
         "`concurrency > deadlocks`); relational-database items under `databases > relational > ...` (part 1's "
         "`relational-databases > ...`; part 2's `locking > isolation-levels` joins part 1's isolation-levels); board "
         "`case-study > ...` paths mapped to the audio trees (`concurrency > airline-check-in`, `kv-store`); principles "
         "and practice rules under `design-approach`; course logistics under `admin > ...` (`forward-references` -> "
         "`roadmap`, `assignment` -> `assignments`).\n")
for (old, new), ids in sorted(topic_changes.items()):
    W.append("- `%s` -> `%s`: %s" % (old, new, ", ".join("%s [%s]" % (i, L(i)) for i in sorted(ids, key=idkey))))
W.append("\n## Rejected or modified hunter suggestions (with reason)\n")
W += [
    "- K1-094 / K1-095 (merge or cross-link): cross-linked; K1-095 stays the standalone definition of deadlock vs waiting "
    "[final %s, %s]." % (L("K1-094"), L("K1-095")),
    "- K1-113 / K1-114 / K1-116: K1-113 merged into K1-116 as suggested; K1-114 ('the client does not re-fire') kept "
    "separate [final %s]." % L("K1-114"),
    "- K1-124 / K2-042 (merge or cross-link): cross-linked; K2-042 is the closing remark of the first half with its own "
    "'partitioning, sharding' point [final %s]." % L("K2-042"),
    "- K1-121 / K3-095 (part 3 hunter: merge): cross-linked instead, following the part 1 hunter: the two disagree on "
    "'re-evaluate', and the conflict must stay visible for the fact-checker [final %s, %s]." % (L("K1-121"), L("K3-095")),
    "- K2-071 -> K2-078 (merge, keep both operators): not merged. K2-071 (01:45:19) is the expiry-only query introduced "
    "before soft delete; merging would move the combined 'expired + soft-deleted' job to 01:45, before the soft-delete "
    "discussion it depends on. Cross-linked; both operators (<= and <) stay visible in their own items "
    "[final %s, %s]." % (L("K2-071"), L("K2-078")),
    "- K2-011 / K2-038 (merge or cross-link): cross-linked (different reasons: 'different system' vs throughput).",
    "- K2-090 / K2-093 / G-005: G-005 merged into K2-093 (same moment); K2-090 kept separate (its 'check whether your DB "
    "supports upsert' at 01:55:50 is the earlier, hedged statement; G-005's 'every database supports it' noted in "
    "K2-093's detail) [final %s]." % L("K2-090"),
    "- K2-092 / K2-095, K2-097 / K2-099, K2-087 / K2-100, K2-065 / K2-070, K2-074 / K2-075, K2-077 / K2-098: "
    "cross-linked (proposal vs solution or mechanism vs outcome), as the hunter allowed.",
    "- K2-073 / K2-075 / K2-076 / K3-002 / K3-005 (merge into the K2 items): not merged; K3-005 is the teacher's own "
    "statement of the space saving (the K2-076 statement no longer claims the column reason) and anchors board B-044; "
    "cross-linked K3-005 <-> K2-076 [final %s, %s]." % (L("K3-005"), L("K2-076")),
    "- K2-071 / K2-078 / K3-013 / K3-045 (merge, both operators): K3-013 is 'TTL approach 1 (cron every 10 minutes)' and "
    "K3-045 the final recap of both queries; kept and cross-linked [final %s, %s]." % (L("K3-013"), L("K3-045")),
    "- K3-014 / K3-045 (merge K3-045's get half): K3-014 merged into K2-098; K3-045 kept whole (it states both final "
    "queries together and carries board B-053) and cross-linked to K2-098.",
    "- K2-085 / K2-091 / K3-007: K3-007 merged into K2-085; K2-091 (the PUT K1 V1 / PUT K1 V2 example) kept as the "
    "example [final %s]." % L("K2-091"),
    "- K3-066 / K3-069 (detail) / K3-076: K3-066 merged into K3-076; K3-069's detail sentence kept - it is context of the "
    "'once a quarter' point, not a separate item [final %s]." % L("K3-069"),
    "- K3-031 / K3-089 / K3-035, K3-029 / K3-091 / K3-092, K3-020 / K3-021, K3-019 / K3-125 / K3-126, K3-073 / K3-087, "
    "K3-075 / K3-136, K3-102 / K3-107, K3-104 / K3-106, K3-139 / K3-143, K3-131 / K3-132 / K3-134, K3-006 / K3-122 / "
    "K3-123: cross-linked, as the hunter suggested.",
    "- K3-120: of the two fixes offered, chose speaker -> teacher, status endorsed, with the student's claim and the "
    "teacher's 'not really' in detail (no separate proposal item: the student's point re-appears as the teacher's "
    "second cause, K3-121) [final %s]." % L("K3-120"),
    "- K2-030: chose 'the student's figure, confirmed' over dropping the gloss silently [final %s]." % L("K2-030"),
    "- K1-058: chose to drop '(previous week's material)' rather than flag it.",
    "- K3-111: source added as suggested; the overlap with K3-109 is only that sentence, so no merge.",
    "- All other hunter suggestions were applied as written.",
]
W.append("\n## Validation\n")
W.append("VALIDATION_LINE")
CH = os.path.join(D, "ledger_changes.md")
open(CH, "w", encoding="utf-8").write("\n".join(W) + "\n")

import subprocess  # noqa: E402
PROJ = os.path.dirname(os.path.dirname(LEC))
res = subprocess.run(["python3", os.path.join(PROJ, ".claude", "skills", "lecture-ledger", "scripts", "validate_ledger.py"),
                      "final", D, "--board", os.path.join(LEC, "board", "board_items.jsonl"),
                      "--transcript", os.path.join(LEC, "transcript", "transcript.md")], capture_output=True, text=True)
lines = res.stdout.strip().splitlines()
summary = "\n".join(l for l in lines if l.startswith(("originals:", "PASS", "FAIL")))
summary = summary.replace(D, "lectures/lec05/ledger")
text = open(CH, encoding="utf-8").read().replace("VALIDATION_LINE", summary)
open(CH, "w", encoding="utf-8").write(text)
print(res.stdout[-4000:])
from collections import Counter  # noqa: E402
print("final items", len(out), "merged", len(LOG["merge"]), "board merged", sum(1 for x in LOG["board"] if x[1]),
      "board new", sum(1 for x in LOG["board"] if not x[1]),
      "resolved", sum(1 for x in LOG["flag"] if "resolved_by" in x[1]),
      "supported", sum(1 for x in LOG["flag"] if "supported_by" in x[1]))
print(Counter(r["type"] for r in out))
print("NOITEM", NOITEM)
