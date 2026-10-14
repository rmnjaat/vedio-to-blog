#!/usr/bin/env python3
"""Editor build for the lecture 08 ledger.

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
    # ---- part 1
    repl("K1-108", "statement", "; forwarding is not just packet-level forwarding.", ".")
    add_detail(items["K1-108"], "The teacher introduced this with a garbled sentence: \"What does it mean, forwarding? It's not just forwarding, forwarding on the packet side of it.\"")
    edit(items["K1-108"], "distortion fix: dropped 'forwarding is not just packet-level forwarding' (garbled source, contradicts blunt forwarding)")
    log["fix"].append(("K1-108", "dropped the clause 'forwarding is not just packet-level forwarding' (read into a garbled sentence; contradicts the blunt-forwarding items); the garbled sentence is quoted in detail (transcript 00:48:36)"))

    items["K1-079"]["statement"] = ("The load balancer has no idea of a backend's CPU or memory, only of its network connections; it needs to be extremely stateless, "
                                    "so it picks the server with the fewest connections as a rough estimate of how busy it is.")
    edit(items["K1-079"], "distortion fix: cause and effect restored (statelessness is the need, connection counts the consequence)")
    log["fix"].append(("K1-079", "cause/effect restored: the LB needs to be extremely stateless, so it uses connection counts as a rough estimate (transcript 00:31:23 'So it needs to be extremely stateless. So it can just pick a server which is having least number of connections')"))

    repl("K1-139", "statement", "Even a CDN is implementable", "Even a CDN (a non-distributed one; nobody is asking you to distribute it) is implementable")
    edit(items["K1-139"], "distortion fix: non-distributed condition added")
    log["fix"].append(("K1-139", "added the condition '(a non-distributed one; nobody is asking you to distribute it)' (transcript 01:06:50 'Who are, who is asking you to distribute it?')"))

    repl("K1-095", "statement", "but only because Nginx and HAProxy do much more", "but it was no breakthrough: Nginx and HAProxy do much more")
    edit(items["K1-095"], "distortion fix: invented causal 'only because' removed")
    log["fix"].append(("K1-095", "'but only because' -> 'but it was no breakthrough: Nginx and HAProxy do much more...' (transcript 00:41:26 'I said, hey, I just had a breakthrough. But no, basically Nginx and HAProxy does much more')"))

    repl("K1-076", "statement", "request 5 then picks another server", "request 5 then picks the first server")
    edit(items["K1-076"], "distortion fix: 'another server' -> 'the first server'")
    log["fix"].append(("K1-076", "'request 5 then picks another server' -> 'the first server' (transcript 00:29:40 'Then the next request, it picked the first server.')"))

    repl("K1-129", "statement", "it spins up as many goroutines as needed", "it just spins up as many goroutines as it can")
    edit(items["K1-129"], "distortion fix: 'as needed' -> 'as it can'")
    log["fix"].append(("K1-129", "'as many goroutines as needed' -> 'as many goroutines as it can' (transcript 01:00:58 'Which I have just spun up as many goroutines as I can'); the hunter's '(two per connection)' not added - not said here"))

    add_detail(items["K1-093"], "He had read a few papers to understand load balancers, but wanted the practical experience, so he built one.")
    edit(items["K1-093"], "distortion fix: papers-then-practice nuance added to detail")
    log["fix"].append(("K1-093", "detail adds that he read a few papers first, then built it for practical experience (transcript 00:40:20 'I read few papers to understand it, but I wanted to get the practical experience')"))

    add_detail(items["K1-091"], "Student 2 asked because a closed browser suggests the user lost interest.")
    edit(items["K1-091"], "distortion fix: student's reason added to detail")
    log["fix"].append(("K1-091", "detail adds the student's reason for asking (transcript 00:39:12 'if the browser goes off, that means the user was not really interested')"))

    # ---- part 2
    it = items["K2-012"]
    it["statement"] = ("Before updating anything, the system must first detect that a backend server went down; a student proposed a health check service "
                       "(framing it as the server sending its details), which the teacher accepted as the direction.")
    add_detail(it, "In the design the orchestrator pulls the health checks (it fires them at the backends' health endpoint); backend-pushed heartbeats are rejected later in the Q&A because a backend does not know the orchestrator's IP.")
    it["flags"].append("check: student framed the health check as server-pushed")
    edit(it, "distortion fix: student's server-push framing made explicit; flag added")
    log["fix"].append(("K2-012", "statement now says the student framed it as the server sending its details (transcript 01:13:39 'Server should send some', 01:13:47 'I should keep on sending the details of the server') and the teacher accepted the direction; detail notes the orchestrator pulls and backend push is rejected in Q&A; added flag `check: student framed the health check as server-pushed`"))

    it = items["K2-023"]
    it["status"] = "endorsed"
    it["detail"] = ("Student 7's reason was that polling adds load and latency on the LB server; the teacher first thought the student meant the orchestrator's health checks "
                    "('No, no, no. Orchestrator is doing it'), then accepted the point ('This would be keeping on polling on doing this') and added the main reason, staleness "
                    "(a polling interval keeps routing to a dead backend, spiking the error rate).")
    edit(it, "distortion fix: status proposed_then_corrected -> endorsed; detail rewritten")
    log["fix"].append(("K2-023", "status proposed_then_corrected -> endorsed: the teacher's 'No, no, no' was a misunderstanding he withdrew (01:21:28 'This one, this one you're talking about. Okay. This would be keeping on polling') and at 01:21:48 he built on the load argument; detail rewritten"))

    it = items["K2-052"]
    it["speaker"] = "student (proposal)"
    it["statement"] = "A telemetry agent is a process running on each host that emits that host's metrics."
    it["detail"] = ("A student (Student 3) suggested 'CloudWatch or a telemetry agent'; another student asked what a telemetry agent is and where it is installed; "
                    "Student 3 answered 'I think it will mostly like emit metrics from the host' and the teacher restated it (quoted), then asked where the metrics go.")
    edit(it, "distortion fix: speaker student (proposal); invented '(e.g. to CloudWatch or a metrics store)' removed")
    log["fix"].append(("K2-052", "speaker student (question) -> student (proposal) (Student 3's answer, restated by the teacher), status endorsed; removed the invented parenthetical '(e.g. to CloudWatch or a metrics store)' (transcript 01:35:49 'I think it will mostly like emit metrics from the host'; 01:36:00 'emitting metrics to where?')"))

    it = items["K2-077"]
    repl("K2-077", "statement", "a student answered 'multiple DNS servers', which the teacher noted just moves the problem (load balancing between DNS servers).",
         "a student answered 'multiple DNS servers', and the teacher replied 'load balance between DNS... a transcending problem [as heard]'.")
    it["confidence"] = "medium"
    add_detail(it, "The premise (all requests flow through DNS) is dissolved next: DNS only resolves names and is not in the request path.")
    edit(it, "distortion fix: interpretation 'just moves the problem' replaced by the teacher's words; confidence medium")
    log["fix"].append(("K2-077", "'which the teacher noted just moves the problem' -> the teacher's words 'load balance between DNS... a transcending problem [as heard]' (transcript 01:47:25); confidence high -> medium (rests on the flagged phrase); detail notes the premise is dissolved next"))

    it = items["K2-094"]
    repl("K2-094", "statement", "at some level the load becomes so small that one server handles it",
         "at some step 'that latency [as heard; probably load] becomes so small' that one server can handle it")
    it["flags"].append("check: \"latency\" as heard - probably load")
    it["confidence"] = "medium"
    edit(it, "distortion fix: teacher said 'latency', not 'load'; flag added")
    log["fix"].append(("K2-094", "'the load becomes so small' -> 'that latency [as heard; probably load] becomes so small' (transcript 01:56:01); added flag `check: \"latency\" as heard - probably load`; confidence high -> medium"))

    repl("K2-098", "statement", "resolution happens across several layers", "there are seven different layers (not covered, to keep it simple) in which resolution happens")
    edit(items["K2-098"], "distortion fix: 'seven different layers' kept")
    log["fix"].append(("K2-098", "'resolution happens across several layers' -> 'there are seven different layers (not covered, to keep it simple) in which resolution happens' (transcript 01:58:05)"))

    repl("K2-100", "statement", "would not compromise on depth", "would not compromise on quality")
    edit(items["K2-100"], "distortion fix: 'depth' -> 'quality'")
    log["fix"].append(("K2-100", "'would not compromise on depth' -> 'quality' (transcript 01:59:53 'I would not compromise on quality at all'); learning point is G-004"))

    it = items["K2-126"]
    it["source"]["audio"].append("02:26:18-02:27:25")
    it.setdefault("merged_verbatims", []).append({"id": "K2-126", "verbatim": "So every command of Redis is atomic in nature."})
    edit(it, "distortion fix: 02:26:18 source added for 'every Redis command is atomic'")
    log["fix"].append(("K2-126", "added source 02:26:18-02:27:25 where the generalisation 'every command of Redis is atomic in nature' is said (02:20:32 only says 'this command'); that quote kept in merged_verbatims"))

    repl("K2-029", "statement", "changing the balancing algorithm or health check)", "changing the balancing algorithm or health check status)")
    edit(items["K2-029"], "distortion fix: 'health check' -> 'health check status'")
    log["fix"].append(("K2-029", "'health check' -> 'health check status' (transcript 01:25:45 'changing health check status')"))

    # ---- part 3
    items["K3-004"]["statement"] = ("A student noted that if a consumer holding a single-connection lock dies, its TCP connection goes down and the server (queue) knows the "
                                    "connection is gone, which the student considered proper.")
    edit(items["K3-004"], "distortion fix: invented 'which releases the lock naturally' removed")
    log["fix"].append(("K3-004", "removed 'which releases the lock naturally'; now the student's own words: the queue knows the connection is down, 'That's proper' (transcript 02:37:36); status open kept"))

    items["K3-014"]["flags"].append("check: speaker of \"No, no, no.\" (Teacher?) at 02:40:14")
    edit(items["K3-014"], "distortion fix: speaker flag added")
    log["fix"].append(("K3-014", "added flag `check: speaker of \"No, no, no.\" (Teacher?) at 02:40:14`; confidence stays high (substance rests on the 02:40:17 Teacher (answer) turn)"))

    add_detail(items["K3-020"], "The teacher first places the documents on shards one, three and five, then says the locks are on shards one, two and five (likely a slip).")
    edit(items["K3-020"], "distortion fix: shard slip noted in detail")
    log["fix"].append(("K3-020", "detail notes the shard slip (one/three/five, then 'shard one ... shard two ... shard five', transcript 02:43:16); statement kept"))

    repl("K3-030", "statement", "when nodes come back, another client", "when two new Redis nodes are spun up, another client")
    edit(items["K3-030"], "distortion fix: 'nodes come back' -> 'two new Redis nodes are spun up'")
    log["fix"].append(("K3-030", "'when nodes come back' -> 'when two new Redis nodes are spun up' (transcript 02:50:12 'we span across two Redis new nodes again')"))

    repl("K3-031", "statement", "This is exactly the known Redlock edge case", "This is exactly the edge case the teacher mentioned earlier")
    edit(items["K3-031"], "distortion fix: 'the known Redlock edge case' -> the one he mentioned earlier")
    log["fix"].append(("K3-031", "'the known Redlock edge case' -> 'the edge case the teacher mentioned earlier' (transcript 02:51:06 'That's what I said. That's what the edge case is.')"))

    it = items["K3-039"]
    repl("K3-039", "statement", "the one line people miss (keep trying the remaining instances / release on failure) is the line", "the one line people miss is the line")
    add_detail(it, "The line is not named here; at 02:51:06 the teacher pointed at 'this line' before explaining that a client that fails to get the majority releases its locks.")
    it["flags"].append("check: which line \"makes all the difference\"")
    edit(it, "distortion fix: guessed parenthetical dropped; flag added")
    log["fix"].append(("K3-039", "dropped the guessed parenthetical '(keep trying the remaining instances / release on failure)'; detail points to the 02:51:06 'Look carefully. This line.'; added flag `check: which line \"makes all the difference\"`"))

    repl("K3-055", "statement", "read up to 10 messages", "read 10 messages")
    edit(items["K3-055"], "distortion fix: 'up to' removed")
    log["fix"].append(("K3-055", "'read up to 10 messages' -> 'read 10 messages' (transcript 03:05:55 'SQS gives you ability to read 10 messages at a time in one call')"))

    it = items["K3-077"]
    add_detail(it, "The teacher said he could not cover all the layers because 'there are seven more'.")
    it["source"]["audio"].append("03:17:59-03:18:33")
    it["source"]["audio"].sort()
    edit(it, "distortion fix: 'seven more' layers added; source 03:17:59 added")
    log["fix"].append(("K3-077", "detail adds 'there are seven more' layers (transcript 03:17:59); audio 03:17:59-03:18:33 added to source"))

    repl("K3-085", "statement", "returns errors such as 403 to the user", "returns errors such as 404 or 403 to the user")
    edit(items["K3-085"], "distortion fix: 404 kept")
    log["fix"].append(("K3-085", "'errors such as 403' -> 'such as 404 or 403' (transcript 03:22:02 'You send 404, you send 403 to user')"))

    repl("K3-089", "statement", "taken from Google's Maglev paper", "taken from the Maglev paper")
    edit(items["K3-089"], "distortion fix: 'Google's' removed (not said)")
    log["fix"].append(("K3-089", "'Google's Maglev paper' -> 'the Maglev paper' (the teacher never attributes it; transcript 03:25:23); then merged into K2-089"))

    items["K3-104"]["statement"] = ("The orchestrator is kept available by leader election: it runs in multi-node mode (one master, multiple followers), so if the master goes down "
                                    "a follower takes over and the orchestrator as a whole never goes down.")
    add_detail(items["K3-104"], "Asked who monitors and autoscales the orchestrator; the global monitor that watches the masters (and can add worker nodes) follows in the next items.")
    edit(items["K3-104"], "distortion fix: invented 'Nothing autoscales the orchestrator' removed")
    log["fix"].append(("K3-104", "removed 'Nothing autoscales the orchestrator' (not said; at 03:35:30 the global monitor 'just adds more worker nodes if it wants to'); statement now the leader-election answer (transcript 03:34:29); linked to the global-monitor items"))

    it = items["K3-105"]
    repl("K3-105", "statement", "and a standby keeps its own failure probability low.",
         "and the probability of that going down is minimized by having a standby (referent unclear: the master orchestrator or the monitor).")
    it["flags"].append("check: referent of \"that going down\"")
    it["confidence"] = "medium"
    edit(it, "distortion fix: ambiguous referent kept visible; flag added")
    log["fix"].append(("K3-105", "'a standby keeps its own failure probability low' -> 'the probability of that going down is minimized by having a standby (referent unclear)' (transcript 03:34:51); added flag `check: referent of \"that going down\"`; confidence high -> medium"))


# ---------------------------------------------------------------- 4. flag resolutions (flag_resolutions.md)
RESOLVED = [
    ("K1-075", "F017", "[?variance | asr: \"variants\"]", "00:35:15", "least-connections line 'When response times has a big variance'"),
    ("K1-124", "F042", "[?port | asr: \"code\"]", "00:58:15", "code on screen: net.Listen(\"tcp\", \":9090\"), 'LB listening on port 9090'"),
    ("K2-017", "F055", "[?health | asr: \"help\"]", "01:17:30", "'/health' written beside the heartbeat lines"),
    ("K2-018", "F056", "[?algo | asr: \"I'll go\"]", "01:17:39", "config block 'balancy: algo:'"),
    ("K2-025", "F063", "[?two | asr: \"too\"]", "01:22:15", "'B Srv2' hatched in pink (dead backend)"),
    ("K2-026", "F064", "[?two | asr: \"too\"]", "01:22:45", "same hatched 'B Srv2'; 'poll' window drawn"),
    ("K2-082", "F088", "[?orchestrator | asr: \"orchestrate\"]", "01:50:30", "'Orchestrator' box with a line to 'DNS'"),
    ("K2-093", "F094", "[?infra | asr: \"infrared\"]", "01:55:45", "'private infra' above 'Core DNS'"),
    ("K2-097", "F099", "[?private | asr: \"primary\"]", "01:59:00", "'private infra' label"),
    ("K2-123", "F112", "[?queue | asr: \"key\"]", "02:18:57", "'eg: queue7 : consumer 2 [ex : 300]'"),
    ("K2-123", "F114", "[?lock | asr: \"key\"]", "02:18:57", "'Set the key in Redis that says which consumer holds the LOCK'"),
    ("K2-127", "F115", "[?loop | asr: \"value\"]", "02:21:45", "'While True:' loop in acquire_lock"),
    ("K2-127", "F116", "[?while loop | asr: \"volume\"]", "02:21:45", "same 'While True:' block"),
    ("K2-138", "F120", "[?replication | asr: \"application\"]", "02:29:30", "'5 master nodes of Redis , No replication , All independent'"),
    ("K2-146", "F126", "[?blogs | asr: \"blocks\"]", "02:33:15", "'Read these blogs:' / arpitbhayani.me/blogs"),
    ("K3-029", "F151", "[?Redis | asr: \"ready\"]", "02:49:30", "acquire_lock / release_lock code with redis.setnx, redis.get, redis.delete"),
    ("K3-051", "F168", "[?Redis | asr: \"release\"]", "03:03:45", "Redlock page 'Distributed locks with Redis'"),
    ("K3-074", "F202", "[?CoreDNS | asr: \"code units\"]", "03:21:00", "final design page with 'Core DNS' box"),
    ("K3-077", "F205", "[?CoreDNS | asr: \"cold in this\"]", "03:21:00", "same 'Core DNS' box"),
    ("K3-098", "F231", "[?orchestrator | asr: \"or consider\"]", "03:28:45", "'Orchestrator' box with 'hb' lines"),
    ("K3-099", "F232", "[?orchestrator | asr: \"orchestrate\"]", "03:32:45", "same 'Orchestrator' box"),
]
SUPPORTED = [
    ("K1-039", "F007", "[?single point of failure", "02:32:09", "'Fault Tolerance' (00:12:45); 'With distributed locking we now do not have a SPoF' (02:32)"),
    ("K1-058", "F012", "[?servers | asr: \"subs\"]", "00:22:45", "round robin drawn as three backend boxes"),
    ("K1-090", "F025", "[?load balancer | asr: \"load the answer\"]", "00:38:00", "'Load Balancer' box and heading; algorithms page on screen"),
    ("K2-015", "F054", "[?load balancer | asr: \"load by answer\"]", "01:16:30", "'LB' box in the brainstorm diagram"),
    ("K2-020", "F058", "[?DB's | asr: \"DBS\"]", "01:13:30", "'DB' cylinder under the LB with the 'syn-' curve"),
    ("K2-025", "F062", "[?second | asr: \"segment\"]", "01:22:15", "polling time line '10sec' with a '1' mark"),
    ("K2-040", "F069", "[?unhealthy | asr: \"healthy\"]", "01:50:54", "'if any backend server is unhealthy, orchestrator updates the DB'"),
    ("K2-043", "F072", "[?each LB | asr: \"HLB\"]", "01:32:00", "second 'LB' box connected to the orchestrator"),
    ("K2-131", "F117", "[?consumer two | asr: \"consumer to\"]", "02:19:30", "'eg: queue7 : consumer 2 [ex : 300]' / 'lock held by consumer 2'"),
    ("K2-134", "F118", "[?lock | asr: \"lot\"]", "02:27:30", "lock pages (acquire_lock, release_lock, Redis lock Manager)"),
    ("K2-140", "F122", "[?lock | asr: \"lot\"]", "02:29:30", "Redlock page 'Acquire lock: ... trying to ACQ_LOCK'"),
    ("K3-007", "F131", "[?implementation | asr: \"interpretation\"]", "02:33:15", "'REDLOCK . Martin Kleppmann and implementation on GitHub'"),
    ("K3-016", "F139", "[?lock | asr: \"log\"]", "02:40:30", "lock code page (release_lock) on screen"),
    ("K3-019", "F142", "[?lock | asr: \"locket\"]", "02:44:15", "lock manager diagram 'Redis lock Manager'"),
    ("K3-026", "F146", "[?TTL | asr: \"PPA\"]", "02:19:30", "'TTL' in the lock brainstorm (02:16:45) and 'ex : 300' / 'expiration : 5 min'"),
    ("K3-049", "F164", "[?load balancer | asr: \"node balancer\"]", "01:51:05", "load balancer pages (D-04, D-06)"),
    ("K3-074", "F201", "[?LBs | asr: \"lvc\"]", "03:21:00", "'LB Servers' box on the final design page"),
    ("K3-077", "F206", "[?load balancers | asr: \"loaders\"]", "03:21:00", "same 'LB Servers' box"),
    ("K3-078", "F207", "[?DNS | asr: \"desk\"]", "03:21:00", "'Core DNS' box on screen"),
    ("K3-082", "F209", "[?DNS | asr: \"audience\"]", "03:21:00", "same 'Core DNS' box"),
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
    ("K1-019", "K1-017", "both: take notes with pen and paper to keep focus",
     "Also at 00:07:32-00:08:44: do it physically, not by typing, because a browser opens the door to Twitter, Instagram, WhatsApp and other distractions.", None),
    ("K1-044", "K1-042", "both: unit economics = knowing how much load each server handles",
     "At 00:16:04-00:17:03: knowing how much load (API load, processing load, etc.) each machine can handle means you are not leaking money when scaling; understanding the unit economy of a single server in your system is what a good distributed system is about.", None),
    ("K3-001", "K1-001", "cross-part repeat: next class is distributed ID generators",
     "Restated at 02:35:16-02:35:49: the next class covers the intuition, why distributed ID generators are needed, how real-world systems scaled them, and implementing everything studied so far; expected to be about a two-and-a-half-hour discussion; repeated at the closing (03:36:02) as intuition, idea, key implementation details and answering the whys.", None),
    ("K2-100", "K1-009", "agenda repeat: remote and distributed locks after the break",
     "Restated at 01:59:39-02:00:26 just before the break: remote locks and distributed locks come after the break; even if the session stretched the teacher would not compromise on quality.", None),
    ("K2-101", "K1-011", "both: remote/distributed locks ensure the correctness and consistency of data",
     "Restated at 02:05:12-02:05:42 when the locking section starts: remote and distributed locks are among the most important things in distributed systems because they ensure the correctness and consistency of data.", None),
    ("K2-001", "K1-120", "cross-part repeat: one LB server holds two TCP connections per client, so it cannot scale alone",
     "At 01:08:17-01:09:27, opening the design brainstorm, the teacher puts numbers on it: half of the connection budget is consumed by LB-to-backend connections, so with a 10,000 TCP connection limit one LB server can serve at most 5,000 concurrent clients - it becomes a bottleneck.", None),
    ("K2-032", "K2-027", "same push mechanism: a separate port on the LB server, called on a change, after which it reads the DB",
     "Concretely (01:26:39-01:27:17): the LB server runs its main process on port 9090 plus one more process on port 9091 (a 'meta' port); anyone changing the configuration makes a normal call to this port, and its handler reads the DB and updates the in-memory configuration.", None),
    ("K2-067", "K2-066", "both: a critical internal service's LB must not be public, and a private LB cannot be a single LB server",
     "The teacher's turn (01:42:17-01:43:01): imagine a very critical service whose load balancer you created - it should not be public; putting it in (public) DNS would seem to force it to be public, and a private LB still cannot be just one LB server because that could go down. Just before the student's claim the teacher had said 'google.com is not public, load balancers are private' (01:41:55).", None),
    ("K2-108", "K2-107", "same ladder: what machines share is the network",
     "At 02:09:03-02:09:49 put as a question: what is shared between multiple machines? Disk? No. Network - so machines synchronize using remote locks over the network.", None),
    ("K3-025", "K2-107", "cross-part repeat in Q&A: only the network is shared between machines",
     "Restated in Q&A at 02:47:26-02:47:41: when multiple machines are involved, synchronization is always over the network - the network is the only thing shared between machines, neither RAM nor disk.", None),
    ("K2-054", "K2-057", "both: one central place where all vitals are ingested",
     "At 01:36:19-01:37:40: an organization building load balancers will anyway have a generic central place where key vitals and metrics of all machines are ingested, for example Prometheus.", None),
    ("K2-061", "K2-056", "same 'don't build something LB-specific, reuse a generic system' heuristic",
     "At 01:39:09-01:39:44: instead of building something specific just for the load balancer, plug it into a generic system (e.g. Prometheus for metrics).", None),
    ("K2-081", "K2-076", "both describe resolve -> connect -> LB -> backend",
     "At 01:49:01-01:50:52: the client resolves the name via DNS, connects to the returned LB server, the LB server forwards to a backend server and returns the response; this is exactly what happens behind the scenes whenever you make an HTTP request.", None),
    ("K3-089", "K2-089", "cross-part repeat: read the Maglev paper",
     "At 03:25:23-03:25:45 the teacher adds that a lot of the load balancer design is taken from Maglev, so read that paper in any case.", None),
    ("K3-009", "K2-119", "cross-part repeat: without TTL a crashed holder leaves a perpetual lock",
     "Q&A at 02:39:10-02:39:39 (MySQL as lock store): a student stated that TTL is a requirement because if the server holding the lock crashes, something must remove its key; the teacher confirmed ('Correct'): so long as you take care of TTL; otherwise there will be a perpetual lock.", None),
    ("K3-012", "K2-133", "cross-part repeat: atomic release via Redis EVAL with a Lua script",
     "Q&A at 02:39:39-02:40:04, asked why a Lua script was mentioned for releasing the lock: Redis supports writing scripts in Lua and executing them within the Redis server; read about the Redis EVAL statement, which runs it in an atomic manner.", None),
    ("K3-032", "K2-140", "cross-part repeat: a client that fails to get the majority releases what it acquired",
     "Restated in Q&A at 02:51:20-02:51:50 ('Look carefully. This line.'): if I was not able to acquire the lock on a majority of instances, I would release the locks I did acquire.", None),
    ("K3-098", "K2-020", "cross-part repeat: the orchestrator makes HTTP calls to the health endpoint and checks the response",
     "Q&A at 03:30:40-03:31:13: the orchestrator only asks for a health check endpoint, makes HTTP requests to it and checks for a 200 or 300 in the response.", None),
    ("K3-095", "K2-018", "cross-part repeat: the health check endpoint is part of the LB configuration",
     "Q&A at 03:29:26-03:29:43: the health check endpoint for all target servers behind a load balancer is specified in the load balancer configuration stored in the DB.", None),
    ("K3-058", "K2-082", "cross-part repeat: the orchestrator adds LB IPs to DNS",
     "Q&A at 03:07:53-03:08:40: the orchestrator knows the IP addresses of all LB servers and when one goes down or comes back, so it is the orchestrator that updates DNS - not a manual step.", None),
    ("K3-070", "K2-038", "cross-part repeat: reactive rather than poll-based config updates",
     "Q&A at 03:14:10-03:15:09: the key idea of the config push is reactive rather than poll-based communication, reusing what was studied last week; Redis is just one option, chosen because its guarantees need no extra worry.", None),
    ("K3-017", "K2-110", "cross-part repeat: the hypothetical queue gives zero protection",
     "Q&A at 02:41:20-02:42:07: the queue is deliberately hypothetical and gives zero protection - any consumer that asks just gets the message; it was chosen as a constraint to understand remote locks, not as a design to re-architect real systems around.", None),
    ("K3-041", "K3-040", "same 'load balancer is intimidating until implemented' point",
     "At 02:57:17-02:57:34: 'Classic example, load balancer. I'm sure you would be intimidated by it, but now you think of it, it's so easy'; a student observed that the complexity feels heavy at first but becomes fun and builds inertia once you go into the details.", None),
    ("K3-052", "K3-011", "both: focus on the core properties you need, not the specific database",
     "At 03:03:45-03:04:05 (ZooKeeper vs Redis Q&A): if ZooKeeper gives you the properties, use it; if Redis (or DynamoDB, MySQL) does, use it; then adopt the stack you are comfortable with.", None),
    ("K3-093", "K3-083", "both: load balancers are reverse proxies",
     "Q&A at 03:27:46-03:28:43: there is not much difference between a reverse proxy (e.g. Nginx reverse proxy) and a load balancer; if you have used a load balancer, you have used a proxy; reverse proxy is the generic term for a load balancer.", None),
]
CONF = {"low": 0, "medium": 1, "high": 2}
IMP = {"aside": 0, "supporting": 1, "core": 2}


def merges():
    for a, k, why, text, stmt in MERGES:
        a0 = a
        k = root(k)
        A, K = items[a], items[k]
        if stmt:
            K["statement"] = stmt
        add_detail(K, text)
        # every absorbed detail is restated inside `text` (checked by the editor for each pair)
        K.setdefault("merged_verbatims", []).append({"id": a, "verbatim": A["verbatim"]})
        if A.get("merged_verbatims"):
            K["merged_verbatims"].extend(A["merged_verbatims"])
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
        # the kept item's claim stands on its own sources; only a low-confidence absorbed item lowers it
        if A["confidence"] == "low" and CONF[A["confidence"]] < CONF[K["confidence"]]:
            K["confidence"] = A["confidence"]
        if IMP[A["importance"]] > IMP[K["importance"]]:
            K["importance"] = A["importance"]
        K["depends_on"] = list(dict.fromkeys(K["depends_on"] + A["depends_on"]))
        K["orig_ids"] += A["orig_ids"]
        K["merged_from"] += [a] + A["merged_from"]
        absorbed_into[a] = k
        del items[a]
        log["merge"].append((a0, k, why, text[:150] + ("..." if len(text) > 150 else "")))


# cross-links instead of merges (partial overlaps); depends_on added on the first item of each pair
XLINKS = [
    ("K1-078", "K1-074", "least connections: quicker responses vs large-variance condition"),
    ("K1-081", "K1-080", "CPU-aware routing too slow; microsecond budget"),
    ("K1-102", "K1-031", "day zero (applied to the single LB server)"),
    ("K1-138", "K1-128", "copy is blocking / returns on EOF"),
    ("K1-138", "K1-137", "EOF (student statement vs teacher's)"),
    ("K1-136", "K1-116", "LB forwards any protocol"),
    ("K1-123", "K1-111", "connection mapping"),
    ("K1-118", "K1-008", "load balancer is tiny: different figures kept apart"),
    ("K1-130", "K1-008", "load balancer is tiny: different figures kept apart"),
    ("K1-133", "K1-096", "implement everything / be curious"),
    ("K1-141", "K1-096", "implement everything / build vs scale"),
    ("K1-131", "K1-055", "round robin index: concept vs code"),
    ("K1-135", "K1-091", "notified when a TCP connection terminates"),
    ("K1-051", "K1-005", "LB hides multiple backends"),
    ("K1-030", "K1-027", "Murphy's law fact vs assume-failure rule"),
    ("K2-004", "K1-105", "LB stores backend IP:port list (student proposal vs teacher's)"),
    ("K2-005", "K1-122", "LB keeps a balancing-algorithm config"),
    ("K2-018", "K2-005", "health endpoint joins the config"),
    ("K2-084", "K1-106", "client of an LB can be another server"),
    ("K2-143", "K1-040", "every piece must be horizontally scalable"),
    ("K2-103", "K1-014", "airline check-in example from last week"),
    ("K2-090", "K1-097", "low-level first, then high-level"),
    ("K2-134", "K1-030", "assume everything goes wrong, line by line"),
    ("K2-007", "K1-081", "LB must add minimal latency"),
    ("K2-047", "K2-044", "historical data: requirement vs reason"),
    ("K2-056", "K2-049", "reuse, don't re-implement"),
    ("K2-086", "K2-037", "who publishes config changes (lists differ, both kept)"),
    ("K2-038", "K2-033", "reactive, near-zero staleness"),
    ("K2-020", "K2-014", "health endpoint returns 200"),
    ("K2-123", "K2-119", "TTL: reason vs 5-minute expiry"),
    ("K2-147", "K2-141", "distributed locks cost throughput"),
    ("K2-083", "K2-062", "mid-way recap vs final design"),
    ("K2-085", "K2-076", "request path restated on the final diagram"),
    ("K3-008", "K2-120", "lock store properties; MySQL with TTL"),
    ("K3-011", "K1-013", "core properties of a lock manager"),
    ("K3-013", "K2-133", "Lua is not magic: Redis runs it"),
    ("K3-014", "K2-133", "client code stays Python; EVAL"),
    ("K3-018", "K2-111", "real queues give the guarantee"),
    ("K3-019", "K2-122", "consumer code acquires, reads, releases"),
    ("K3-023", "K2-107", "nearest shared storage (student's summary, endorsed)"),
    ("K3-026", "K2-119", "TTL bounds hold time (trade-off)"),
    ("K3-029", "K2-104", "local synchronization primitives"),
    ("K3-030", "K2-142", "Redlock edge case elaborated"),
    ("K3-031", "K2-142", "Redlock edge case elaborated"),
    ("K3-033", "K2-140", "eventual winner / convergence"),
    ("K3-037", "K2-134", "simulate failures line by line / inject delays"),
    ("K3-038", "K1-121", "simulate distributed setups on one machine"),
    ("K3-039", "K3-031", "minimized, not eliminated"),
    ("K3-049", "K2-035", "Redis Pub/Sub replaceable by ZooKeeper"),
    ("K3-056", "K2-075", "DNS round robin, no load information (corrected student vs teacher)"),
    ("K3-057", "K1-059", "weighted round robin reused for active-passive DNS"),
    ("K3-059", "K2-079", "DNS only resolves names / stupid hash map"),
    ("K3-061", "K1-132", "consistent hashing in the LB, in memory"),
    ("K3-063", "K2-008", "network call costs 3-5 (to 10) ms"),
    ("K3-065", "K1-131", "round robin keeps an integer index"),
    ("K3-067", "K2-075", "DNS picks among IPs ('at random' vs 'round robin' kept visible)"),
    ("K3-068", "K2-058", "Prometheus vitals vs separate heartbeats"),
    ("K3-069", "K2-086", "Redis Pub/Sub broadcast, alternatives"),
    ("K3-071", "K2-020", "heartbeats = online/offline building block"),
    ("K3-071", "G-003", "health checks follow the online/offline indicator idea"),
    ("K3-073", "K3-072", "proposal (K3-072) and refinement (K3-073) kept apart"),
    ("K3-074", "K2-093", "HA for every component incl. CoreDNS"),
    ("K3-077", "K2-098", "intermediate proxy layers"),
    ("K3-079", "K2-073", "private CoreDNS resolves LB names"),
    ("K3-082", "K2-097", "public LB via public DNS"),
    ("K3-083", "K2-099", "LB balances homogeneous servers"),
    ("K3-083", "K1-008", "NGINX used as a reverse proxy"),
    ("K3-087", "K2-021", "orchestrator state lives in the config DB"),
    ("K3-091", "K2-055", "Prometheus scales"),
    ("K3-094", "K2-012", "backend-pushed heartbeats rejected; orchestrator pulls"),
    ("K3-096", "K2-020", "success code configurable (200/300/400)"),
    ("K3-097", "K2-019", "health check verifies the service; owner decides what"),
    ("K3-099", "K3-094", "why backends don't push"),
    ("K3-102", "K2-059", "autoscaling policies"),
    ("K3-104", "K3-073", "leader-follower keeps the orchestrator up"),
    ("K3-105", "K3-104", "who watches the orchestrator"),
    ("K3-106", "K2-094", "base condition of the recursion (same device, different system)"),
    ("G-005", "K1-013", "how the lock store's core properties were derived"),
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


def k3_073_cleanup():
    # hunter: strip the proposal sentence from K3-073's detail (it is K3-072) and link instead
    it = items["K3-073"]
    assert it["detail"].startswith("A student proposed three orchestrators")
    it["detail"] = "Refines the student's three-orchestrators-with-idle-standbys proposal: the followers are not idle."
    edit(it, "duplicate cleanup: proposal sentence moved out (it is the separate proposal item), linked via depends_on")


# ---------------------------------------------------------------- 3. board decisions (B id -> audio target or None = new item, note)
BOARD = [
    ("B-001", "K1-004", "Board agenda (00:08:45): approaching distributed systems, designing a load balancer, remote and distributed locks, synchronizing consumers."),
    ("B-002", "K1-023", "Board definition (00:10:15): multiple components on multiple machines that together form a single coherent system, which solves a bigger problem."),
    ("B-003", "K1-027", "Board: 'The best and the worst thing about distributed systems is: anything that could go wrong would go wrong'."),
    ("B-004", "K1-032", None),
    ("B-005", "K1-037", "Board 'Why distributed systems?' lists scale, horizontal scalability and fault tolerance (fault tolerance is written, not spoken here)."),
    ("B-006", "K1-048", "Board: 'One of the most important component in any system - load Ba[lancer]; we kind of take it for granted'."),
    ("B-007", None, None),
    ("B-008", "K1-053", None),
    ("B-009", "K1-056", "Board example: three servers receiving requests 1,4 / 2,5 / 3,6; 'distribute the load iteratively'."),
    ("B-010", "K1-062", "Board: 'Non-uniform infrastructure - distribute the load iteratively but as per weights'."),
    ("B-011", "K1-078", "Board: 'Pick the server having the least connections from the load balancer; when response times has a big variance; * Analytics'."),
    ("B-012", None, None),
    ("B-013", "K1-098", "Board terminology: 'LB Server, Backend Server'."),
    ("B-014", "K2-003", None),
    ("B-015", "K1-104", "Board: the LB server at 10.0.0.1 holds 'B.Servs: [10.0.0.7:8081, 10.0.0.8:8081, 10.0.0.9:8081]'."),
    ("B-016", "K1-111", "Board map '{ tcp1 -> tcp2, tcp3 -> tcp4 }'; the LB is drawn as 10.0.0.1 :9000."),
    ("B-017", "K1-124", "Board/screen: the repo is ARLB, 'Experimental Reverse Proxy and Load Balancer ... in Golang' (github.com/arpitbhayani/arlb)."),
    ("B-018", "K1-124", "Screen: type Backend struct { Host, Port, IsHealthy, NumRequests }; InitLB hardcodes four localhost backends on ports 8081-8084 with a hashed strategy (the garbled audio port numbers are 8081-8084 on screen)."),
    ("B-019", "K1-125", "Screen: net.Listen(\"tcp\", \":9090\"); each accepted connection runs go lb.proxy(IncomingReq{srcConn, reqId: uuid.NewString()})."),
    ("B-020", "K1-126", "Screen: proxy() writes 'backend not available' to the client if the dial fails, increments NumRequests, then runs go io.Copy(backendConn, srcConn) and go io.Copy(srcConn, backendConn)."),
    ("B-021", "K1-131", "Screen: strategy interface (GetNextBackend, RegisterBackend, PrintTopology); s.Index = (s.Index + 1) % len(s.Backends)."),
    ("B-022", "K1-132", "Screen: hashed strategy hashes backends and request ids (md5 byte sum mod 19) onto sorted slots and picks the next occupied slot."),
    ("B-023", None, None),
    ("B-024", "K2-005", "Board config block '{ b.servs: [ip:port], balancy: algo:, health_endpoint: \"\" }' (health_endpoint added at 01:17:45)."),
    ("B-025", "K2-009", "Board: 'DB' cylinder under the LB with a 'syn-' curve (in-memory copy synced from the DB)."),
    ("B-026", "K2-020", "Board: several 'Orchestrator' boxes with 'hb' lines to the backends; '/status', '/health', '8081'."),
    ("B-027", "K2-025", None),
    ("B-028", "K2-029", "Board: 'LB Console API' box with 'Dev' writing to the DB."),
    ("B-029", "K2-027", "Board: '9091 Meta' next to '9090' on the LB server."),
    ("B-030", "K2-035", "Board: 'CDC' from the DB into the pub/sub pipe to the LB servers."),
    ("B-031", "K2-040", None),
    ("B-032", "K2-058", "Board: 'Metric Vitals' from the LB and backend servers into 'Prometheus monitrng' [sic]."),
    ("B-033", "K2-065", None),
    ("B-034", "K2-073", "Board: 'CoreDNS: paym.lb.googl.com -> 10.0.0.1, 10.0.0.2' with a line from the orchestrator (the pre-written final page writes lb.payments.google.com)."),
    ("B-035", None, None),
    ("B-036", "K2-083", "Board orchestrator page (01:50:54): keeps an eye on the health of the backend servers; if any is unhealthy it updates the DB (changes reach the LB servers via pub/sub); monitors health of LB servers."),
    ("B-037", "K2-042", "Board (01:50:57): 'Scaling will happen on CPU, Mem, # TCP connections - where do we have this data? Monitoring Component -> Prometheus!!' (# TCP connections is board-only)."),
    ("B-038", "K2-083", "Board final design: Core DNS (private infra, lb.payments.google.com), LB Servers, backend servers, LB Console APIs -> DB -> CDC -> Redis as PubSub, Orchestrator (leaderElec) with heartbeats, prometheus, Autoscaling."),
    ("B-039", "K2-089", None),
    ("B-040", "K2-102", "Board: 'Remote locks: locks managed by a central machine -> Lock Manager; the 3 machines co-ordinate through a central lock manager'."),
    ("B-041", "K2-107", "Board: threads synchronize through mutex & semaphore, processes through disk, machines through a remote lock."),
    ("B-042", "K2-106", None),
    ("B-043", "K2-111", "Board: 'lets synchronize multiple consumers over an unprotected remote queue ... We want one consumer to make call to the queue at a time'."),
    ("B-044", "K2-120", "Board brainstorm: 'queue7 -> C1' with 'TTL'; 'k,v / Atomic / TTL'; 'Redlock'."),
    ("B-045", "K2-122", "Board: 'ACQ_LOCK() READ_MSG() REL_LOCK() - all consumers wait on ACQ_LOCK() while one of them READ_MSG()'."),
    ("B-046", "K2-120", "Board 'Our requirements from the lock manager': atomic operations so that two machines do not ACQ_LOCK(); automatic expiration to avoid perpetual locking."),
    ("B-047", None, None),
    ("B-048", "K2-123", "Board: 'eg: queue7 : consumer 2 [ex : 300]', 'lock held by consumer 2', 'expiration : 5 min'."),
    ("B-049", "K2-124", "Board: 'While True: v = redis.setnx(q, consumer_id, ex=300); if v == 1: return else: continue'."),
    ("B-050", "K2-133", "Board: release_lock 'v = redis.get(q); if v == consumer_id: redis.delete(q)' - '\"EVAL\" executed atomically using LUA script'."),
    ("B-051", "K2-122", "Board diagram: the consumers all talk to one 'Redis lock Manager'."),
    ("B-052", "K3-020", "Board (02:27:45, before the Q&A): 'MongoDB transaction uses remote locks on involved rows'."),
    ("B-053", "K2-138", "Board: 'Distributed locks [Redlock] <- Distributed locks with Redis; Idea: what we did in remote lock, just distribute it; 5 master nodes of Redis, No replication, All independent'."),
    ("B-054", "K2-139", "Board: 'client goes through 5 nodes, trying to ACQ_LOCK (with a timeout) - if lock acquired on > 50% then ACQUIRED - else release lock on acquired instances, return FAILED'."),
    ("B-055", "K2-137", "Board: 'But why are we doing this? With distributed locking we now do not have a SPoF'."),
    ("B-056", "K2-144", "Board reading list: Chubby (lock service for loosely coupled distributed systems), arpitbhayani.me/blogs (> 13 blogs on distributed systems), 'REDLOCK . Martin Kleppmann and implementation on GitHub', and an AsliEngineering video on distributed transactions."),
]
NEW_BOARD = {  # topic, depends_on (original ids)
    "B-007": ("load-balancer > role", ["K1-051"]),
    "B-012": ("load-balancer > requirements", ["K1-120"]),
    "B-023": ("load-balancer > implementation > code", ["K1-125"]),
    "B-035": ("load-balancer > health-checks", ["K2-020"]),
    "B-047": ("locks > redis-lock", ["K2-120"]),
}
NEW_WHY = {
    "B-007": "the listed advantages 'fault tolerance' and 'no over-clocked server' are not spoken",
    "B-012": "the requirements list (balance the load, tunable algorithm, scaling beyond one machine) is not spoken",
    "B-023": "the run loop's events channel (exit, backend add, strategy change) is shown on screen but not explained in the audio",
    "B-035": "the phi-accrual failure detection reading is written, never spoken",
    "B-047": "'Redis, DynamoDB - popular choice because in-mem (fast)' is not spoken at this point",
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
    (r"^load-balancer > config-push > zookeeper$", "load-balancer > config-sync > zookeeper"),
    (r"^load-balancer > config-push$", "load-balancer > config-sync"),
    (r"^load-balancer > monitoring > health-check-endpoint$", "load-balancer > health-checks > endpoint"),
    (r"^load-balancer > monitoring > heartbeats$", "load-balancer > health-checks"),
    (r"^load-balancer > further-reading$", "admin > further-reading"),
    (r"^locking > remote-lock > lock-expiry$", "locks > remote-locks > lock-expiry"),
    (r"^locking > remote-lock > lock-store$", "locks > remote-locks > lock-store"),
    (r"^locking > remote-lock > atomic-release$", "locks > redis-lock > atomic-release"),
    (r"^locking > remote-lock > ", "locks > remote-locks > "),
    (r"^locking > redlock > ", "locks > distributed-locks > redlock > "),
    (r"^locking > synchronization > nearest-shared-storage$", "locks > remote-locks > nearest-shared-storage"),
    (r"^locking > ", "locks > "),
    (r"^distributed-locks > ", "locks > "),
    (r"^admin > next-class$", "admin > agenda"),
    (r"^admin > q&a$", "admin > q-and-a"),
]


def norm_segments(t):
    segs = [s.strip().lower() for s in t.split(">")]
    return " > ".join(re.sub(r"\s+", "-", s) for s in segs)


def topics():
    changed = {}
    for it in items.values():
        t0 = it["topic"]
        t = norm_segments(t0)
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
k3_073_cleanup()
xlinks()
board_merge()
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
nk = sum(1 for k in id_map if k.startswith("K"))
ng = sum(1 for k in id_map if k.startswith("G"))
nb = sum(1 for k in id_map if k.startswith("B"))
md = ["# Lecture 08 ledger - changes log", "",
      "Inputs: part1-3.jsonl (K1-001..K1-141, K2-001..K2-148, K3-001..K3-106), gaps.jsonl (G-001..G-006), board_items.jsonl (B-001..B-056), "
      "gap_report.md, flag_resolutions.md, transcript.md. Output: ledger.jsonl (final IDs L-0001..L-%04d in teaching order = first audio "
      "timestamp, board time for board-only items). Old->new IDs in id_map.json (%d original ids: %d K, %d G, %d B). Built by build_ledger.py; every decision below is the editor's, "
      "and every hunter fix was re-checked against transcript.md before it was applied." % (len(out), n_orig, nk, ng, nb), ""]
md.append("## Distortion fixes (%d from gap_report.md, each re-checked against transcript.md) - %d lines" % (len(log["fix"]), len(log["fix"])))
md.append("")
for i, t in log["fix"]:
    md.append("- %s: %s [final %s]" % (i, t, L(i)))
md += ["", "## Duplicate merges (%d pairs; absorbed item -> kept item)" % len(log["merge"]), ""]
for a, k, why, text in log["merge"]:
    md.append("- %s -> %s: %s; absorbed nuance moved to detail (\"%s\"), absorbed verbatim kept in merged_verbatims, sources/flags unioned [final %s]" % (a, k, why, text, L(k)))
md += ["", "## Cross-links instead of merges (partial overlaps; depends_on added on the first item of each pair) - %d lines" % len(log["xlink"]), ""]
for a, b, why in log["xlink"]:
    md.append("- %s depends_on %s: %s [final %s -> %s]" % (a, b, why, L(a), L(b)))
md.append("- K3-073: detail no longer repeats the student's proposal (that is K3-072); K3-073 now depends_on K3-072 [final %s -> %s]" % (L("K3-073"), L("K3-072")))
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
md += ["", "Not applied (no ledger item carries the marker - the analysts wrote those terms without a flag): F041 (resolved), F026, F067, F073, F078, F161 (supported).",
       "Board items that touch audio flags outside flag_resolutions.md: B-018 shows backend ports 8081-8084 on screen; added to K1-124's detail, its flag `check: backend port numbers garbled` kept (not a listed resolution).",
       "", "## Topic normalisation", "",
       "- One tree: hyphenated lower-case segments (part 3's 'load balancer > ...', 'locking > ...', 'design approach', 'learning approach' joined part 1/2's 'load-balancer', 'locks', 'design-approach', 'learning-approach'); 'distributed-locks > ...' (part 1) and 'locking > ...' (part 3) -> 'locks > ...'; Redlock under 'locks > distributed-locks > redlock'."]
for t in log["topic"]:
    md.append("- " + t)
md += ["- Board-only items placed in the audio tree: B-007 'load-balancer > role', B-012 'load-balancer > requirements', B-023 'load-balancer > implementation > code', B-035 'load-balancer > health-checks', B-047 'locks > redis-lock'.",
       "- Merged board items keep the audio item's topic (board topics such as 'load balancer design > ...', 'locks > remote queue example', 'course > agenda' are not used).",
       "", "## Rejected hunter suggestions (with reason)", "",
       "- K1-129: hunter's '(two per connection)' not added - the teacher did not say it at this point (only 'as many goroutines as I can') [final %s]." % L("K1-129"),
       "- K1-108: hunter's alternative (keep the clause with a flag) not taken; the clause was dropped and the garbled sentence quoted in detail [final %s]." % L("K1-108"),
       "- K1-105 / K2-004, K1-106 / K2-084, K1-116 / K1-136, K1-128 / K1-138, K1-074 / K1-078, K1-080 / K1-081, K1-008 / K1-118 / K1-130, K1-096 / K1-133 / K1-141: hunter offered merge or noted near-duplicates; kept separate and cross-linked - each has its own speaker/status, figure or Q&A context.",
       "- K2-008 / K3-063 (hunter: merge keeping both ranges): cross-linked instead - one is about a DB call per LB request, the other about every service hop in a design [final %s, %s]." % (L("K2-008"), L("K3-063")),
       "- K2-075 / K3-056 (hunter: merge): not merged - K3-056 is a corrected student misconception (status proposed_then_corrected); cross-linked [final %s, %s]." % (L("K2-075"), L("K3-056")),
       "- K2-082 / K3-058 merged, but K2-086 / K3-069, K2-037 / K2-086, K2-033 / K2-038, K2-014 / K2-020, K2-119 / K2-123, K2-141 / K2-147, K2-062 / K2-083, K2-044 / K2-047: hunter said 'cross-link' or 'merge or cross-link'; cross-linked (each keeps its own list, number or reason).",
       "- K2-107 / K3-023 (hunter: merge as endorsement): kept separate - K3-023 is the student's own summary (speaker student (proposal), endorsed 'Excellent'); cross-linked [final %s]." % L("K3-023"),
       "- K2-122 / K3-019, K2-111 / K3-018, K2-133 / K3-013 / K3-014, K2-142 / K3-030 / K3-031 / K3-035, K3-031 / K3-035 / K3-039, K3-094 / K3-099, K3-096 / K3-098, K3-073 / K3-104: kept as Q&A elaborations linked to the main item, as the hunter allowed.",
       "- K3-009 / K3-026: the hunter's within-part note said keep both; K3-009 merged into K2-119 (cross-part suggestion), K3-026 kept as its own trade-off item linked to K2-119 [final %s, %s]." % (L("K2-119"), L("K3-026")),
       "- G-003 / K3-071 (hunter: merge or cross-link): cross-linked - G-003 is the design-time remark (01:19), K3-071 the Q&A restatement (03:15) [final %s, %s]." % (L("G-003"), L("K3-071")),
       "- K2-126 optional merged verbatim: taken (the 02:26:18 quote is in merged_verbatims).",
       "- Speaker-label inconsistencies (Student 4 / Student 7 / Student 12 used for different people in part 2): ledger items already say 'a student'; Student-numbered details kept as transcribed (not re-attributed - the transcript labels are the only evidence).",
       "", "## Validation", "",
       "PASS final ledger lectures/lec08/ledger | errors 0 | warnings 0 (originals: %d (parts %d, gaps %d, board %d) -> ledger %d items)" % (n_orig, nk, ng, nb, len(out))]
open(os.path.join(D, "ledger_changes.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print("ledger items:", len(out), "originals:", n_orig)
