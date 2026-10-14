#!/usr/bin/env python3
"""Write lectures/lec02/lesson/factcheck_applied.md from factcheck/final.jsonl, additions_verified.jsonl,
placement.json and the SourceNote texts below. Run after build_placement.py."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
L = HERE.parent
ledger = {json.loads(l)["id"]: json.loads(l) for l in (L / "ledger/ledger.jsonl").open() if l.strip()}
final = {json.loads(l)["id"]: json.loads(l) for l in (L / "factcheck/final.jsonl").open() if l.strip()}
adds = {json.loads(l)["add_id"]: json.loads(l) for l in (L / "factcheck/additions_verified.jsonl").open() if l.strip()}
P = json.loads((HERE / "placement.json").read_text())
pl = P["placements"]
add_of = {}
for i, d in final.items():
    for a in d.get("additions", []):
        add_of.setdefault(i, []).append(a["add_id"])

# SourceNote: (more precisely, additions used, extra sources)
SN = {
    "SN-01": ("A single DynamoDB item is capped at 400 KB, attribute names included, so a 4 MB value cannot be stored in DynamoDB at all; neither DynamoDB nor a relational database is a good blob store. Keep large values in object storage (AWS suggests S3) and store the key or pointer in the database.",
              ["A-DC-01"]),
    "SN-02": ("It depends on the product. Provisioned warehouses do charge for reserved servers, but BigQuery's on-demand model bills each query by the bytes it reads (capacity/slot pricing is the reserved alternative), and Redshift Serverless bills for compute actually used, per second, with optional reservations.",
              ["A-DC-15"]),
    "SN-03": ("Feeding a graph database asynchronously for analytics is common, but not a rule: transactional graph databases such as Neo4j ('Transactions comply with the ACID consistency model') and Amazon Neptune serve online, user-facing queries over billions of relationships in milliseconds.",
              []),
    "SN-04": ("One join per level is true for a hand-written fixed-depth query. SQL can walk any depth in one query with a recursive CTE (PostgreSQL's WITH RECURSIVE is 'typically used to deal with hierarchical or tree-structured data'); graph databases make deep traversals simpler to write and often faster. The same applies to the MLM hierarchy (L-0393, L-0394).",
              ["A-DC-16"]),
    "SN-05": ("Most graph databases scale reads with replicas but keep a single writer per graph: Neptune has one primary instance that performs all writes plus up to 15 read replicas, and in Neo4j only primaries can be the writer. Partitioning one graph across shards is hard (Neo4j has recently added sharded property databases, not the standard setup).",
              ["A-DC-19"]),
    "SN-06": ("Ports are not the limit: every client connects to the same listening port, and a TCP connection is identified by the pair of sockets (client address and port plus server address and port). What bounds a WebSocket server is its file descriptors, memory and CPU, so it can still hold only a finite number of connections.",
              []),
    "SN-07": ("Chrome and Firefox both allow 6 concurrent HTTP/1.1 connections per host (Firefox's max-persistent-connections-per-server is 6, not 8). WebSockets are counted in a separate pool, 255 per host in Chrome and 200 in Firefox, so an open WebSocket does not take one of the six or slow image loading; over HTTP/2 all requests share one multiplexed connection anyway. One WebSocket per product is still the right advice, for other reasons: every extra socket is another long-lived connection the server must hold and another reconnect the client must handle (this also covers the stated harm in L-0329).",
              ["A-SRW-08"]),
    "SN-08": ("A user claiming a channel they are not in is an authorisation flaw, broken access control (OWASP A01 in 2021 and in the current 2025 list), not a man-in-the-middle attack, which intercepts traffic between two parties. The baseline is 'except for public resources, deny by default': check membership server-side.",
              ["A-SRW-17"]),
    "SN-09": ("With nothing sensitive on the edge server, DDoS is indeed the main risk, but a rate limiter only handles some request floods. The most common attacks (UDP reflection, SYN floods) are infrastructure-layer floods that need network capacity which scales faster than the attack, i.e. upstream DDoS protection.",
              ["A-SRW-18"]),
    "SN-10": ("A Kafka credential is still a secret: a compromised edge server can reach the internal Kafka and inject messages that consumers trust and persist. Give the edge a least-privilege credential (Kafka authenticates clients with SSL or SASL and authorises read/write per client), e.g. write-only to one topic, and have consumers validate what they read. Losing it is far less damaging than losing database credentials.",
              ["A-SRW-16"]),
    "SN-11": ("Kafka does not delete events when they are consumed; a topic keeps them for its retention period and they can be read as often as needed, so a consumer can rewind and reprocess. The teacher's real point stands: durability of the write should come from the database's own replication, not from re-reading Kafka.",
              ["A-DC-20"]),
    "SN-12": ("A synchronously replicated database acknowledges a write once the configured replicas, often a majority quorum, have persisted it; DynamoDB keeps three replicas in different Availability Zones and acknowledges when two of the three have the log record. Asynchronous replication (PostgreSQL's default) acknowledges earlier and can lose recent writes on failover. The core lesson stands: the storage engine replicates, not the workers.",
              ["A-DC-04"]),
}

LEAVE_NUANCE_HEAD = "fact-check nuance (not shown as a correction)"


def trunc(s, n=140):
    s = " ".join(s.split())
    return s if len(s) <= n else s[: n - 3].rstrip() + "..."


def sec(i):
    return pl[i]["section"] if i in pl else "dropped"


def srcs(i):
    return " · ".join(final[i].get("sources", [])) or "none needed"


flagged = {i: d for i, d in final.items() if d.get("treatment", "none") != "none" or d["verdict"] == "unverifiable"}
sn_ids = {i for v in P["source_notes"].values() for i in v}
inline = [i for i, d in sorted(final.items()) if d["verdict"] == "imprecise" and d["severity"] == "low"]
leave = [i for i, d in sorted(final.items()) if d["verdict"] == "simplified" and d["severity"] == "low"]
unver = [i for i, d in sorted(final.items()) if d["verdict"] == "unverifiable"]
assert not [i for i, d in final.items() if d["verdict"] == "simplified" and d["severity"] in ("medium", "high")]

out = []
w = out.append
w("# Lecture 04 (lec02): fact-check treatments applied\n")
w("Policy (from the brief, applied mechanically):")
w("- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** (\"More precisely\") sits directly after it with the precise version and its sources.")
w("- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a source link where a fact is added). This lecture has no simplified-medium item.")
w("- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction. (`final.jsonl` marks these `inline`; the course policy, as in Lecture 02, leaves them as taught.)")
w("- **unverifiable:** stated as the instructor's (or one learner's) experience, estimate or opinion, with no empty source link.")
w("")
w("Verifier overrides from `verdict_review.md` are already in `final.jsonl` and are applied: **L-0320** is imprecise/low (was medium), so it gets an inline clarification instead of a note; **L-0096** is imprecise/low (was medium), also inline. Version drift noted by the verifier: Kafka docs are cited at 4.3, OWASP's current list is 2025 (A01 unchanged), Chromium values were re-checked on main.")
w("")
n_sn = len(sn_ids)
w(f"Counts: {len(flagged)} flagged items = {n_sn} with a SourceNote ({len(P['source_notes'])} notes) + {len(inline)} inline clarifications + {len(leave)} left as taught + {len(unver)} attributed as unverifiable. {sum(1 for d in final.values() if d['verdict']=='accurate')} items were checked accurate; {len(ledger)-len(final)} ledger items had no verdict (section 5).")
w("")
w("## 1. SourceNotes\n")
for sn, ids in P["source_notes"].items():
    head = ", ".join(f"{i} ({final[i]['verdict']}/{final[i]['severity']}" + (f"; first pass: {final[i]['first_pass']['verdict']}/{final[i]['first_pass']['severity']}" if final[i].get('first_pass') else "") + ")" for i in ids)
    w(f"### {sn} · §{sec(ids[0])} · {head}")
    for i in ids:
        w(f"- **Teacher's point (kept):** {trunc(ledger[i]['statement'])}")
    more, used = SN[sn]
    w(f"- **More precisely:** {more}")
    if used:
        w(f"- **Additions used:** {', '.join(used)}")
    s = []
    for i in ids:
        for u in final[i].get("sources", []):
            if u not in s:
                s.append(u)
    for a in used:
        for u in adds[a].get("sources", []):
            if u not in s:
                s.append(u)
    w(f"- **Sources:** {' · '.join(s)}")
    w("")

w("## 2. Light inline clarifications\n")
w("| id | verdict | § | treatment on the page | sources |")
w("|---|---|---|---|---|")
for i in inline:
    d = final[i]
    extra = ""
    if i in add_of:
        used = [a for a in add_of[i] if a in P["additions"]]
        if used:
            extra = f" (+ {', '.join(used)})"
    fp = f"; first pass {d['first_pass']['verdict']}/{d['first_pass']['severity']}" if d.get("first_pass") else ""
    w(f"| {i} | {d['verdict']}/{d['severity']}{fp} | {sec(i)} | {trunc(d['note'], 260)}{extra} | {srcs(i)} |")
w("")

w("## 3. Left as taught (simplified, low)\n")
w(f"| id | § | {LEAVE_NUANCE_HEAD} | 'keep' addition woven in |")
w("|---|---|---|---|")
for i in leave:
    d = final[i]
    used = [a for a in add_of.get(i, []) if a in P["additions"]]
    w(f"| {i} | {sec(i)} | {trunc(d['note'], 300)} | {', '.join(used) or '-'} |")
w("")

w("## 4. Unverifiable: attributed, no source link\n")
w("| id | § | how it is presented |")
w("|---|---|---|")
how = {
    "war_story": "the instructor's own story, told as his (no names)",
    "number": "the instructor's figure or estimate, attributed ('in the instructor's experience')",
    "process": "as the instructor describes it, attributed",
    "claim": "the lecture's view or recollection, worded as such",
    "tradeoff": "the instructor's estimate, attributed; the trade-off itself stands",
    "example": "the lecture's illustration or one learner's observation, attributed",
}
for i in unver:
    t = ledger[i]["type"]
    w(f"| {i} | {sec(i)} | {how.get(t, 'attributed')} ({t}); fact-check: {trunc(final[i]['note'], 160)} |")
w("")

w("## 5. Not flagged by the fact-check\n")
nov = [i for i in ledger if i not in final]
w(f"{len(nov)} ledger items had no verdict (course logistics and pointers): {', '.join(nov)}. The placed ones are course-structure facts, reading pointers or exhortations and need no check. The dropped ones (L-0347, L-0435) are listed in `placement.json` with reasons.")
w("")
w("## 6. Verified additions not used\n")
for k, v in P["additions_not_used"].items():
    w(f"- {k}: {v}")
w("")
w("## 7. Verified additions used outside a SourceNote\n")
w("| addition | usefulness | § | how |")
w("|---|---|---|---|")
for k, v in P["additions"].items():
    if v["component"] != "SourceNote":
        w(f"| {k} | {adds[k]['usefulness']} | {v['section']} | {v['note']} |")
w("")
(HERE / "factcheck_applied.md").write_text("\n".join(out))
print("flagged", len(flagged), "sn ids", n_sn, "inline", len(inline), "leave", len(leave), "unver", len(unver))
