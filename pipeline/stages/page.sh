#!/bin/bash
# Stage page: lesson design + clips -> the lecture's pages on the site.
#   1. BUILD_BRIEF.md + scaffold (lecture MDX frontmatter from chapters.json, stub parts)      [machine]
#   2. section writers, one per writer group in chapters.json, PIPE_WRITER_PARALLEL (default 3) at a time;
#      each writes its parts + figures; gate check_part.py (ids tagged, isolated build, coverage of its sections)
#   3. assembler: overview part, frontmatter, cross-chapter consistency, posters; gates + Playwright QA
# Gate: pipeline/bin/site.sh gates (build, coverage of every placed id on its chapter page, links, check-figures).
source "$(dirname "$0")/common.sh"
for f in chapters.json placement.json outline.md clips.json; do [ -s "$LEC/lesson/$f" ] || die "missing $LEC/lesson/$f (run the lesson stage)"; done
$PY pipeline/lib/make_brief.py "$ID" | tee -a "$LOGDIR/run.log"
$PY pipeline/lib/scaffold_page.py "$ID" | tee -a "$LOGDIR/run.log" || die "scaffold failed"
# clips must be in the site before pages embed them
for c in $($PY -c "import json;c=json.load(open('$LEC/lesson/clips.json'));c=c.get('clips',c) if isinstance(c,dict) else c;print(' '.join(x['id'] for x in c))"); do
  [ -f "site/src/animations/clips/$c/timeline.ts" ] || die "clip $c is not in the site (run the animate stage)"; done

lines=()
while IFS=$'\t' read -r w chapters parts sections; do
  lines+=("$(job "page_writer_$w" pipeline/prompts/section_writer.md "$PY pipeline/lib/check_part.py $ID $w" site "$DONE/page.writer_$w" \
    "${COMMON_VARS[@]}" WRITER="$w" CHAPTERS="$chapters" PARTS="$parts" PARTS_CSV="$parts" SECTIONS="$sections" MAX_TURNS=500)")
done < <($PY - "$LEC/lesson/chapters.json" <<'EOF'
import json, sys
c = json.load(open(sys.argv[1]))
ws = {}
for ch in c["chapters"]:
    ws.setdefault(ch["writer"], []).append(ch)
for w, chs in ws.items():
    print("\t".join([w, ", ".join(f"{ch['no']} {ch['title']} (/{ch['slug']}/)" for ch in chs),
                     ",".join(p["file"] for ch in chs for p in ch["parts"]),
                     ", ".join(s for ch in chs for p in ch["parts"] for s in p["sections"])]))
EOF
)
say "page: ${#lines[@]} section writers, ${PIPE_WRITER_PARALLEL:-3} at a time"
batch page_writers "${PIPE_WRITER_PARALLEL:-3}" "${lines[@]}" || die "section writers failed (see $LOGDIR/calls.tsv)"

say "page: assembler"
batch page_assemble 1 "$(job page_assemble pipeline/prompts/assembler.md \
    "$SITE_SH gates $ID $LEC/qa/gates_assembly.txt && $PY -c \"import json,sys; r=json.load(open('$LEC/qa/assembly_shots/report.json')); sys.exit(1 if r['failures'] else 0)\"" \
    site "$DONE/page.assemble" "${COMMON_VARS[@]}" MAX_TURNS=500 EXPECT="$LEC/qa/assembly_report.md")" || die "assembler failed"
grep -rl "PIPELINE-STUB" "site/src/content/lectures/$ID" 2>/dev/null && die "stub parts remain"
validate page_gates $SITE_SH gates "$ID" "$LEC/qa/gates_page.txt"
