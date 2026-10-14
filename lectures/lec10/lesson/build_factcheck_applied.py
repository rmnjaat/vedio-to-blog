#!/usr/bin/env python3
"""Write lectures/lec10/lesson/factcheck_applied.md from factcheck/final.jsonl, additions_verified.jsonl and placement.json.

Run after build_placement.py: python3 lectures/lec10/lesson/build_factcheck_applied.py
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
L = HERE.parent
P = json.loads((HERE / "placement.json").read_text())
ledger = {d["id"]: d for d in map(json.loads, (L / "ledger/ledger.jsonl").read_text().splitlines()) if d}
final = {d["id"]: d for d in map(json.loads, (L / "factcheck/final.jsonl").read_text().splitlines()) if d}
adds = {d["add_id"]: d for d in map(json.loads, (L / "factcheck/additions_verified.jsonl").read_text().splitlines()) if d}

# "More precisely" text per note (from final.jsonl notes and verdict_review.md, worded for the page)
SN_TEXT = {
    "SN-01": ("Athena does not keep a per-key index for a CSV file: it runs SQL by scanning the files a query touches and bills per TB scanned. "
              "Partitioning, compression and columnar formats such as Parquet cut how much it reads. The dictionary shares the idea of querying plain files on S3 "
              "without a database server, but its design (in-memory key index plus ranged GETs) is a point-lookup store, not how Athena works inside.",
              ["A-D-11"], ["https://aws.amazon.com/athena/pricing/", "https://docs.aws.amazon.com/athena/latest/ug/partitions.html",
                           "https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html"]),
    "SN-02": ("A 1 TB file holds 10^12 bytes, but a 4-byte integer reaches only about 2.1 billion (signed) or 4.3 billion (unsigned), so byte offsets into it "
              "must be 64-bit (8-byte) integers. With 8-byte offsets the 170,000-word index is 170,000 × (4.3 + 8 + 2) B ≈ 2.4 MB: still tiny, so the design stands.",
              ["A-D-01"], ["https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html"]),
    "SN-03": ("S3 is object storage, not block storage. AWS uses three terms: block storage (EBS) is a disk-like volume attached to one instance, file storage (EFS) "
              "is a shared network file system, and object storage (S3) holds whole objects fetched over HTTP by key. Databases are ruled out, so the file goes on "
              "shared storage such as S3 or a network file system.",
              ["A-D-12"], ["https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/",
                           "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"]),
    "SN-04": ("S3 supports ranged reads (ask for n bytes at an offset and get exactly those), which is all this read-only design needs, one range per GET. "
              "But it is an object store, not a file system: objects are written whole and cannot be appended to or modified in place, and tools that mount S3 "
              "as a file system say they do not implement full POSIX semantics.",
              ["A-SSE-10"], ["https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html",
                             "https://github.com/awslabs/mountpoint-s3/blob/main/doc/SEMANTICS.md"]),
    "SN-05": ("Putting the CRC first is a convention, not a rule. Bitcask and LevelDB put it at the start of each record (and Bitcask writes the whole record, CRC "
              "included, in one write, so the CRC is not flushed separately). The Postgres WAL and the MySQL binlog also protect every record with a CRC "
              "(CRC-32C per WAL record; CRC32 per binlog event by default) but place it elsewhere: Postgres at the end of the record header, MySQL in the last "
              "4 bytes of each event. Either works as long as the reader knows the record length and checks the CRC before trusting the data.",
              ["A-SSE-07", "A-SSE-08"], ["https://raw.githubusercontent.com/basho/bitcask/develop/src/bitcask_fileops.erl",
                                         "https://github.com/google/leveldb/blob/main/doc/log_format.md",
                                         "https://raw.githubusercontent.com/postgres/postgres/master/src/include/access/xlogrecord.h",
                                         "https://www.postgresql.org/docs/current/wal-reliability.html",
                                         "https://dev.mysql.com/doc/refman/8.4/en/replication-options-binary-log.html",
                                         "https://dev.mysql.com/doc/dev/mysql-server/latest/classmysql_1_1binlog_1_1event_1_1Log__event__footer.html"]),
    "SN-06": ("Network frames carry checksums so the receiver can detect corruption, but often not first: the PPP frame check sequence comes after the data, "
              "and the TCP checksum sits in the middle of the header.",
              [], ["https://www.rfc-editor.org/rfc/rfc1662", "https://www.rfc-editor.org/rfc/rfc9293#section-3.1"]),
    "SN-07": ("Around 2015 Uber used Riak, whose default storage backend is Bitcask, for parts of its new dispatch services. Its core trip data lived in "
              "Postgres and then moved to Schemaless, a MySQL-based store. So Bitcask ran at Uber through Riak, but not as the store of the main ride-hailing data.",
              [], ["https://riak.com/posts/technical/ubers-ringpop-and-riak/", "https://www.uber.com/blog/schemaless-part-one-mysql-datastore/",
                   "https://docs.riak.com/riak/kv/latest/setup/planning/backend/index.html"]),
    "SN-08": ("Riak is masterless: keys are hashed onto a ring split into partitions owned by vnodes, each write goes to the owning vnode and the next N−1, and any "
              "node can coordinate a request. Partitions are disjoint key ranges, but each key is stored on N vnodes, and each partition runs its own Bitcask "
              "instance underneath.",
              ["A-SSE-14"], ["https://docs.riak.com/riak/kv/latest/learn/why-riak-kv/index.html",
                             "https://docs.riak.com/riak/kv/latest/learn/concepts/clusters/index.html",
                             "https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html"]),
    "SN-09": ("In an LSM engine only the memtable (recent writes) is in memory; SSTables are sorted, immutable files on disk, written when a memtable is flushed. "
              "Every write first goes to an on-disk commit log. Bitcask, by contrast, keeps every key (not values) in memory.",
              ["A-SSE-13"], ["https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html",
                             "https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html"]),
    "SN-10": ("Bitcask appends every write straight to its data file, while an LSM engine appends it to a write-ahead log and buffers it in a memtable, which the "
              "log can fully recover. In both, crash durability depends on how often the log is synced: Bitcask's default (sync_strategy none) leaves flushing "
              "to the OS, and o_sync forces a sync on every write at a throughput cost; Cassandra's default periodic sync can lose up to 10 s.",
              ["A-SSE-02"], ["https://github.com/facebook/rocksdb/wiki/Write-Ahead-Log-%28WAL%29",
                             "https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html",
                             "https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html"]),
}

UNVERIFIABLE_HOW = {
    "L-0089": "MarginNote 'Where the instructor learned this': stated as his experience.",
    "L-0284": "Stated as the instructor's experience ('he implemented it about five years ago').",
    "L-0292": "Stated as the instructor's experience (college paper-reading course).",
    "L-0301": "Stated as the instructor's view ('in his experience, overviews rarely cover integrity').",
    "L-0302": "Stated as the instructor's view.",
    "L-0304": "Stated as the instructor's impression from those posts.",
    "L-0308": "MarginNote 'From the instructor': stated as his experience with his own services.",
}


def sec_of(i):
    return P["placements"][i]["section"]


def short(s, n=170):
    return s if len(s) <= n else s[:n].rsplit(" ", 1)[0] + "..."


def add_line(ids):
    out = []
    for i in ids:
        for a in final[i].get("additions", []):
            out.append(a["add_id"])
    return out


flagged = {i: d for i, d in final.items() if d.get("treatment", "none") != "none"}
sn_ids = {i for v in P["source_notes"].values() for i in v}
inline = [i for i, d in sorted(flagged.items()) if i not in sn_ids and d["verdict"] == "imprecise"]
left = [i for i, d in sorted(flagged.items()) if i not in sn_ids and d["verdict"] == "simplified"]
unver = [i for i, d in sorted(final.items()) if d["verdict"] == "unverifiable"]
assert set(inline) | set(left) | sn_ids == set(flagged), set(flagged) - set(inline) - set(left) - sn_ids

lines = ["# Lecture 10: fact-check treatments applied", "",
         "Policy (from the lesson brief, applied mechanically):",
         "- **wrong / outdated / imprecise-medium-or-high:** the teacher's point stays on the page as taught, and a **SourceNote** (\"More precisely\") sits directly beside it with the precise version and its sources.",
         "- **imprecise-low / simplified-medium:** a light inline clarification, one clause or sentence, with a source link (this lecture has no simplified-medium items).",
         "- **simplified-low:** left as taught. Where a verified addition is attached, it is woven in as a separate sourced sentence, not as a correction.",
         "- **unverifiable:** stated as the instructor's (or the class's) experience or opinion, with no empty source link.",
         "- Hedges stay hedges; opinions stay attributed.",
         "",
         "Verdict override applied (`factcheck/verdict_overrides.jsonl`, from `verdict_review.md`): **L-0153** is imprecise/**low** (was medium), so it gets an inline clarification, not a SourceNote. "
         "Source fix from the verdict review: partitioning in SN-01 is cited to the Athena partitions page, not the pricing page. Version notes: Lucene 10.5.2 page cited beside 9.12 (A-D-16); Cassandra docs are 5.0; PostgreSQL 18.6; MySQL 8.4; Riak KV 2.2.3. "
         "L-0263 is wrong/low: the course policy puts every 'wrong' item in a SourceNote, so it gets SN-06 despite its low severity.",
         "",
         f"Counts: {len(flagged)} flagged items (treatment ≠ none) = {len(sn_ids)} with a SourceNote ({len(P['source_notes'])} notes) + {len(inline)} inline clarifications + {len(left)} left as taught. "
         f"Plus {len(unver)} unverifiable items (treatment none) attributed as experience or opinion. All {len(adds)} verified additions are used ({sum(1 for a in adds.values() if a['usefulness']=='keep')} keep, "
         f"{sum(1 for a in adds.values() if a['usefulness']!='keep')} optional).",
         "", "## 1. SourceNotes", ""]
for sn, ids in P["source_notes"].items():
    secs = sorted({sec_of(i) for i in ids})
    head = ", ".join(f"{i} ({final[i]['verdict']}/{final[i]['severity']})" for i in ids)
    lines.append(f"### {sn} · §{', '.join(secs)} · {head}")
    for i in ids:
        lines.append(f"- **Teacher's point (kept):** {short(ledger[i]['statement'])}")
    txt, used, srcs = SN_TEXT[sn]
    lines.append(f"- **More precisely:** {txt}")
    if used:
        lines.append(f"- **Additions used:** {', '.join(used)}")
    lines.append(f"- **Sources:** {' · '.join(srcs)}")
    lines.append("")

lines += ["## 2. Inline clarifications (imprecise-low)", "",
          "| Id | § | Verdict | Clarification on the page | Additions | Source |", "|---|---|---|---|---|---|"]
for i in inline:
    d = final[i]
    note = d["note"].replace("|", "/")
    lines.append(f"| {i} | {sec_of(i)} | {d['verdict']}/{d['severity']}{' (override)' if d.get('overridden') else ''} | {note} | {', '.join(add_line([i])) or '–'} | {' · '.join(d['sources']) or '–'} |")
lines.append("")

lines += ["## 3. Left as taught (simplified-low)", "",
          "The checker's note is for the writer's awareness; the page states the teacher's point unchanged. Where an addition is attached it is a separate sourced sentence. Where a SourceNote in the same section already covers the gap (L-0051, L-0058, L-0187 by SN-02; L-0036 by SN-01; L-0208 by SN-10), the page points to it.",
          "", "| Id | § | Checker's note (not a page correction) | Addition woven in |", "|---|---|---|---|"]
for i in left:
    d = final[i]
    lines.append(f"| {i} | {sec_of(i)} | {d['note'].replace('|', '/')} | {', '.join(add_line([i])) or '–'} |")
lines.append("")

lines += ["## 4. Unverifiable: attributed", "", "| Id | § | Severity | How the page states it |", "|---|---|---|---|"]
for i in unver:
    lines.append(f"| {i} | {sec_of(i)} | {final[i]['severity']} | {UNVERIFIABLE_HOW[i]} |")
lines.append("")

lines += ["## 5. Additions and where they land", "", "| Addition | Usefulness | § | Component | Use |", "|---|---|---|---|---|"]
for k, v in sorted(P["additions"].items()):
    lines.append(f"| {k} | {adds[k]['usefulness']} | {v['section']} | {v['component']} | {v['note']} |")
lines.append("")

lines += ["## 6. Lecture-level framing fixes (no verdict attached)", "",
          "- **Header name:** spoken 'O-U-R-D-I-C-T' is 7 letters; the page uses the board's 8-byte `OUR_DICT` (spot-check note on L-0077).",
          "- **Byte offsets in the example:** the spoken 'amazon at two, book at three' are line-like numbers; the page uses real byte offsets (apple 0, amazon 14) and says offsets are bytes (Q&A 03:01:39, L-0049).",
          "- **Board slip in D-15:** `K3 → f2, O3` is redrawn as `K3 → f1, O3`, because K3 V3 is in file 001 on the same board.",
          "- **Riak figure (D-21):** drawn masterless per SN-08; the board's 'proxy' box stays as 'any node can route'.",
          "- **1.7 MB in L-0199** inherits the 4-byte offset; left as taught (accurate in the spot-check: with 8-byte offsets it is ~2.4 MB, the point stands).",
          "- **Course numbering:** back-references use course order (`lectures/course.json`): routing and consistent hashing Lecture 9; reactive config Lecture 5; Redis Pub/Sub Lecture 4; delete as `-1` Lecture 3; timestamp leftmost Lecture 6; caching at every level Lecture 2. Next week's topics are chipped 'coming later · week 6'.",
          ""]
(HERE / "factcheck_applied.md").write_text("\n".join(lines))
print(f"factcheck_applied.md: {len(flagged)} flagged, {len(sn_ids)} SN ids, {len(inline)} inline, {len(left)} left, {len(unver)} unverifiable")
