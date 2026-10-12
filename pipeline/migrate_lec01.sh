#!/bin/bash
# COPY (never move) the Lecture 1 artifacts made by hand into the pipeline layout lectures/lec01/.
# Old paths (transcripts/..., learn/lec01/...) keep working. Existing files in lectures/lec01/ are never
# overwritten (rsync --ignore-existing), so it is safe to re-run. Marks the finished stages as done.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
L=lectures/lec01
mkdir -p $L/{asr,transcript/work,board,ledger,factcheck,lesson,qa,review,logs,.done}
cp_(){ [ -e "$1" ] || { echo "skip (missing): $1"; return 0; }; rsync -a --ignore-existing "$1" "$2"; echo "copied $1 -> $2"; }

cp_ out/lec01/lec01.merged.json   $L/asr/
cp_ out/lec01/lec01.merged.txt    $L/asr/
cp_ out/lec01/lang.json           $L/asr/
cp_ transcripts/work/lec01/       $L/transcript/work/
cp_ transcripts/corrected/lec01/  $L/transcript/
cp_ learn/lec01/board/            $L/board/
cp_ learn/lec01/ledger/           $L/ledger/
cp_ learn/lec01/factcheck/        $L/factcheck/
cp_ learn/lec01/teaching_map.md   $L/
cp_ learn/lec01/review/           $L/review/

# Pipeline metadata that Lecture 1 never had (derived from the copied files, nothing re-judged):
# - factcheck/groups.json: the three topic groups exactly as they were checked by hand
# - factcheck/verdict_overrides.jsonl: the three disputes of verdict_review.md in machine-readable form
python3 - "$L/factcheck" <<'EOF'
import json, os, sys
d = sys.argv[1]
g = os.path.join(d, "groups.json")
if not os.path.exists(g):
    out = []
    for name, abbr in [("caching_scaling", "CS"), ("delegation_concurrency", "DC"), ("communication", "CM")]:
        ids = sorted(json.loads(l)["id"] for l in open(os.path.join(d, name + ".jsonl")) if l.strip())
        out.append({"name": name, "abbr": abbr, "roots": [], "ids": ids})
    json.dump(out, open(g, "w"), indent=1); print("wrote", g)
o = os.path.join(d, "verdict_overrides.jsonl")
if not os.path.exists(o):
    rows = [
        {"id": "L-0158", "verdict": "imprecise", "severity": "medium",
         "note": "Right for SQS (ReceiveMessage polling) and Kafka/Kinesis consumers, wrong only as a generalisation: RabbitMQ's normal consumer mode is push, and its docs call basic.get polling highly inefficient and strongly recommended against.",
         "sources": ["https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html", "https://www.rabbitmq.com/docs/consumers"],
         "reason": "verdict_review.md dispute: the teacher hedged ('very few instances where you do push base things')"},
        {"id": "L-0244", "verdict": "wrong", "severity": "medium",
         "note": "TCP closes each direction with its own FIN, each ACKed, and the side that closed first waits in TIME-WAIT (2xMSL); HTTP/1.1 connections are persistent by default. The lecture's real point, that short polling carries a lot of per-request overhead, still holds.",
         "sources": ["https://www.rfc-editor.org/rfc/rfc9293", "https://www.rfc-editor.org/rfc/rfc9112#section-9.3", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x"],
         "reason": "verdict_review.md dispute: supporting detail, 'high' overstates the harm; medium matches L-0264, L-0289"},
        {"id": "L-0288", "verdict": "outdated", "severity": "medium",
         "note": "Valid when GCM existed: Google announced in April 2018 that the GCM APIs would be removed as soon as April 11, 2019. Use Firebase Cloud Messaging (Android) / APNs (Apple) today.",
         "sources": ["https://developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html"],
         "reason": "verdict_review.md dispute: label wrong -> outdated"},
    ]
    with open(o, "w") as f:
        for r in rows: f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print("wrote", o)
EOF
[ -s $L/factcheck/final.jsonl ] || python3 .claude/skills/lecture-factcheck/scripts/apply_policy.py $L/factcheck --groups $L/factcheck/groups.json

for s in ingest asr diarize merge correct board ledger factcheck teachmap; do
  [ -f $L/.done/$s ] || echo "migrated $(date '+%F %T') from hand-made Lecture 1 artifacts" > $L/.done/$s
done
echo "done: $L (stages marked done; page stages lesson/animate/page/qa are not)"
