#!/bin/bash
# Site operations for the page stages. Every heavy command (astro build, Playwright) takes the machine lock
# /tmp/vtb-heavy.lock for its whole run and always releases it. Agents call ONLY this script for site work.
#
#   pipeline/bin/site.sh build   <id> [--parts p1,p2 --tag T]   isolated build of one lecture (VTB_ONLY) into site/.builds/<id>[-T]
#   pipeline/bin/site.sh build-all                              full site build into site/dist (every lecture)
#   pipeline/bin/site.sh coverage <id> [--tag T] [--sections 1.1,1.2] [--parts p1,p2]
#                                                               every placed ledger id is on the built pages (pipeline/lib/check_coverage.py)
#   pipeline/bin/site.sh links   <id> [--tag T]                 every internal link / asset / #fragment resolves (scripts/check-links.mjs)
#   pipeline/bin/site.sh figures <id> [--tag T]                 check-figures on every page of the lecture at 360, 390, 768, 1440 (light + dark)
#   pipeline/bin/site.sh qa      <id> <outdir> [--tag T] [--sweep] [--pages a,b] [--widths ..]
#                                                               Playwright QA + screenshots (pipeline/lib/page_qa.mjs)
#   pipeline/bin/site.sh posters <id> [--tag T]                 capture the lecture's clip posters into site/public/clips/<clip>/
#   pipeline/bin/site.sh gates   <id> <outfile>                 build + coverage + links + figures; summary in <outfile>; exit 1 on any failure
#   pipeline/bin/site.sh text    <id> <outfile> [--tag T]       the built pages as reading text (for the blind reader)
# Env: PIPE_NODE_PATH (node_modules with playwright), VTB_LOCK (default /tmp/vtb-heavy.lock)
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; SITE="$ROOT/site"
LOCK="${VTB_LOCK:-/tmp/vtb-heavy.lock}"
export NODE_PATH="${PIPE_NODE_PATH:-/Users/ramanjangu/.npm/_npx/787f53666b8d4740/node_modules}"
BASE=$(sed -nE "s/^[[:space:]]*base:[[:space:]]*'([^']+)'.*/\1/p" "$SITE/astro.config.mjs" | head -1); BASE="${BASE:-/}"
cmd="${1:-}"; shift || true
die(){ echo "site.sh: $*" >&2; exit 2; }

HELD=0; SRV=""; SERVE_DIR=""
lock(){ [ $HELD -eq 1 ] && return; local n=0
  until mkdir "$LOCK" 2>/dev/null; do
    # a lock older than 2 h whose holder is gone is stale
    if [ $n -eq 0 ] && [ -n "$(find "$LOCK" -maxdepth 0 -mmin +120 2>/dev/null)" ]; then echo "site.sh: lock $LOCK is over 2 h old; waiting anyway (remove it by hand if nothing heavy runs)" >&2; fi
    n=$((n+1)); sleep 15; done
  HELD=1; echo "$$ $(date +%T) site.sh $cmd" > "$LOCK/owner" 2>/dev/null; }
cleanup(){ [ -n "$SRV" ] && kill "$SRV" 2>/dev/null; [ -n "$SERVE_DIR" ] && rm -rf "$SERVE_DIR"
  [ $HELD -eq 1 ] && { rm -f "$LOCK/owner"; rmdir "$LOCK" 2>/dev/null; }; }
trap cleanup EXIT INT TERM

# options
ID=""; TAG=""; PARTS=""; SECTIONS=""; OUTP=""; EXTRA=()
parse(){ while [ $# -gt 0 ]; do case "$1" in
  --tag) TAG="$2"; shift 2;; --parts) PARTS="$2"; shift 2;; --sections) SECTIONS="$2"; shift 2;;
  --sweep) EXTRA+=(--sweep); shift;; --pages|--widths) EXTRA+=("$1" "$2"); shift 2;;
  -*) die "unknown option $1";;
  *) if [ -z "$ID" ]; then ID="$1"; elif [ -z "$OUTP" ]; then OUTP="$1"; else die "extra argument $1"; fi; shift;; esac; done; }
parse "$@"
OUTDIR_REL=".builds/${ID}${TAG:+-$TAG}"; BUILD="$SITE/$OUTDIR_REL"

do_build(){ # isolated build of $ID (optionally only some parts)
  [ -n "$ID" ] || die "build needs a lecture id"
  lock
  local log="$BUILD.log"; mkdir -p "$SITE/.builds"
  echo "build $ID${PARTS:+ (parts $PARTS)} -> site/$OUTDIR_REL"
  ( cd "$SITE" && VTB_ONLY="$ID" VTB_PARTS="$PARTS" VTB_OUT="$OUTDIR_REL" nice -n 5 npx astro build ) > "$log" 2>&1
  local rc=$?
  grep -iE "warn|error" "$log" | grep -viE "chunk|licen" | tail -20
  if [ $rc -ne 0 ]; then echo "BUILD FAILED (rc $rc), last lines of site/$OUTDIR_REL.log:"; tail -40 "$log"; return 1; fi
  echo "build ok: $(find "$BUILD" -name index.html | wc -l | tr -d ' ') pages"
}
serve(){ # serve $BUILD under $BASE on a free port; sets URL
  [ -d "$BUILD" ] || die "no build at site/$OUTDIR_REL (run: pipeline/bin/site.sh build $ID${TAG:+ --tag $TAG})"
  SERVE_DIR=$(mktemp -d /tmp/vtb-serve.XXXXXX); mkdir -p "$SERVE_DIR$(dirname "${BASE%/}")"
  ln -s "$BUILD" "$SERVE_DIR${BASE%/}"
  local port; port=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')
  python3 -m http.server "$port" --bind 127.0.0.1 --directory "$SERVE_DIR" > /dev/null 2>&1 & SRV=$!
  URL="http://127.0.0.1:$port$BASE"
  for _ in $(seq 1 60); do curl -s -o /dev/null "$URL" && return 0; sleep 0.5; done; die "server did not start"
}
pages(){ # page paths of the lecture in the build: lectures/<id>/ and lectures/<id>/<chapter>/
  ( cd "$BUILD" && find "lectures/$ID" -name index.html | sed 's/index.html$//' | sort ); }

case "$cmd" in
  build) do_build;;
  build-all) lock; ( cd "$SITE" && nice -n 5 npx astro build ) > "$SITE/.builds-all.log" 2>&1 || { tail -40 "$SITE/.builds-all.log"; exit 1; }; echo "full build ok";;
  coverage) [ -n "$ID" ] || die "coverage needs a lecture id"
    python3 "$ROOT/pipeline/lib/check_coverage.py" "$ID" --html "$BUILD/lectures/$ID" ${SECTIONS:+--sections "$SECTIONS"} ${PARTS:+--parts "$PARTS"};;
  links) [ -d "$BUILD" ] || die "no build at site/$OUTDIR_REL"; ( cd "$SITE" && node scripts/check-links.mjs --dist "$OUTDIR_REL" );;
  figures) lock; serve; bad=0
    for p in $(pages); do for w in 360 390 768 1440; do
      r=$(cd "$SITE" && node scripts/check-figures.mjs "$URL$p" --width $w 2>&1); rc=$?
      [ $rc -ne 0 ] && { bad=1; echo "== $p @ $w"; echo "$r" | tail -15; }
    done; done
    [ $bad -eq 0 ] && echo "check-figures ok: every page of $ID at 360/390/768/1440, light + dark: labels >= 12px, no horizontal scroll"; exit $bad;;
  qa) [ -n "$OUTP" ] || die "qa needs an outdir"; lock; serve; mkdir -p "$OUTP"
    node "$ROOT/pipeline/lib/page_qa.mjs" "$URL" "$ID" "$OUTP" "${EXTRA[@]+"${EXTRA[@]}"}" \
      --sample "file://$(python3 -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))' "$ROOT/learn/design/B-whiteboard-notebook/index.html")";;
  posters) lock; serve; urls=(); for p in $(pages); do urls+=("$URL$p"); done
    ( cd "$SITE" && node scripts/clip-posters.mjs "${urls[@]}" ) || exit 1
    echo "posters written to site/public/clips/; rebuild so the pages pick them up";;
  text) [ -n "$OUTP" ] || die "text needs an outfile"; python3 "$ROOT/pipeline/lib/page_text.py" "$BUILD/lectures/$ID" "$OUTP";;
  gates) [ -n "$OUTP" ] || die "gates needs an outfile"; mkdir -p "$(dirname "$OUTP")"; fail=0
    { echo "# page gates $ID $(date '+%F %T')"
      echo "## build"; do_build || fail=1
      if [ $fail -eq 0 ]; then
        echo "## coverage"; python3 "$ROOT/pipeline/lib/check_coverage.py" "$ID" --html "$BUILD/lectures/$ID" || fail=1
        echo "## links"; ( cd "$SITE" && node scripts/check-links.mjs --dist "$OUTDIR_REL" > "$BUILD.links.txt" 2>&1 ) || fail=1; tail -15 "$BUILD.links.txt"
        echo "## figures"; serve; ff=0
        for p in $(pages); do for w in 360 390 768 1440; do
          r=$(cd "$SITE" && node scripts/check-figures.mjs "$URL$p" --width $w 2>&1) || { ff=1; echo "== $p @ $w"; echo "$r" | tail -15; }
        done; done
        [ $ff -eq 0 ] && echo "check-figures ok: every page at 360/390/768/1440, light + dark" || fail=1
      fi
      echo; [ $fail -eq 0 ] && echo "GATES PASS" || echo "GATES FAIL"; } > "$OUTP" 2>&1
    cat "$OUTP"; [ $fail -eq 0 ];;
  *) sed -n 2,17p "$0"; exit 2;;
esac
