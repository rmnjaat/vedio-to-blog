#!/bin/zsh
# usage: run.sh <outdir> [widths]   -- build, preview, QA, check-figures; holds the heavy lock throughout
SP=/private/tmp/claude-501/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/b2a3d74d-7c38-4f7b-a51a-78400e1d74ff/scratchpad
SITE="/Users/ramanjangu/Desktop/VEDIO TO BLOG/site"
export NODE_PATH=/Users/ramanjangu/.npm/_npx/787f53666b8d4740/node_modules
OUT=$1; WIDTHS=${2:-1440,390}
until mkdir /tmp/vtb-heavy.lock 2>/dev/null; do sleep 15; done
PREV=""
cleanup() { [ -n "$PREV" ] && kill $PREV 2>/dev/null; pkill -f "astro.mjs preview --port 4399" 2>/dev/null; rmdir /tmp/vtb-heavy.lock 2>/dev/null; }
trap cleanup EXIT INT TERM
cd "$SITE"
npm run build > $SP/build.log 2>&1 || { echo BUILD FAILED; tail -30 $SP/build.log; exit 1; }
echo "build ok; warnings:"; grep -i "warn" $SP/build.log
node node_modules/astro/bin/astro.mjs preview --port 4399 > $SP/preview.log 2>&1 &
PREV=$!
for i in {1..40}; do curl -s -o /dev/null http://localhost:4399/lectures/lec01/ && break; sleep 0.5; done
SAMPLE='file:///Users/ramanjangu/Desktop/VEDIO%20TO%20BLOG/learn/design/B-whiteboard-notebook/index.html' node $SP/qa.mjs http://localhost:4399/lectures/lec01/ $OUT $WIDTHS
for w in 360 390 768 1440; do echo "== check-figures $w"; node scripts/check-figures.mjs http://localhost:4399/lectures/lec01/ --width $w; done
