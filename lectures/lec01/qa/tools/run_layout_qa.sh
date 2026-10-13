#!/bin/zsh
# usage: run_layout_qa.sh <outdir> [widths] [--figs] -- build, serve dist under /vedio-to-blog/, QA; holds the heavy lock
SP=/private/tmp/claude-501/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/b2a3d74d-7c38-4f7b-a51a-78400e1d74ff/scratchpad
SITE="/Users/ramanjangu/Desktop/VEDIO TO BLOG/site"
export NODE_PATH=/Users/ramanjangu/.npm/_npx/787f53666b8d4740/node_modules
OUT=$1; WIDTHS=${2:-1440,1024,390}; FIGS=$3
until mkdir /tmp/vtb-heavy.lock 2>/dev/null; do sleep 15; done
SRV=""
cleanup() { [ -n "$SRV" ] && kill $SRV 2>/dev/null; rmdir /tmp/vtb-heavy.lock 2>/dev/null; }
trap cleanup EXIT INT TERM
cd "$SITE"
npm run build > $SP/build.log 2>&1 || { echo BUILD FAILED; tail -30 $SP/build.log; exit 1; }
grep -i "warn" $SP/build.log
rm -rf $SP/serve && mkdir -p $SP/serve && cp -R dist $SP/serve/vedio-to-blog
python3 -m http.server 4399 --bind 127.0.0.1 --directory $SP/serve > $SP/serve.log 2>&1 &
SRV=$!
for i in {1..40}; do curl -s -o /dev/null http://127.0.0.1:4399/vedio-to-blog/ && break; sleep 0.5; done
node scripts/check-links.mjs | tail -2
node $SP/layout_qa.mjs http://127.0.0.1:4399 $OUT $WIDTHS
if [ -n "$FIGS" ]; then
  for p in "" 1-caching 2-scaling 3-delegation 4-concurrency 5-communication 6-what-to-keep; do
    for w in 360 390 768 1440; do echo -n "check-figures $p $w: "; node scripts/check-figures.mjs http://127.0.0.1:4399/vedio-to-blog/lectures/lec01/$p/ --width $w | tail -1; done
  done
fi
