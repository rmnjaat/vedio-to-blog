#!/bin/bash
# Publish every lecture whose QA passed (lectures/<id>/qa/PASS): mark it published, commit its files plus the shared
# site/pipeline files, prove the commit builds on its own (clean worktree, zero broken links), push to main.
# GitHub Actions then deploys to Pages. Lectures still in progress are never committed.
#   pipeline/bin/publish.sh            (no-op when nothing new passed)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; cd "$ROOT"
GIT=(git -c user.name=rmnjaat -c user.email=ramanjangu01@outlook.com)
new=()
for pass in lectures/lec*/qa/PASS; do
  id=$(basename "$(dirname "$(dirname "$pass")")"); mdx="site/src/content/lectures/$id.mdx"
  [ -f "$mdx" ] || continue
  if grep -q '^status: draft$' "$mdx"; then sed -i '' 's/^status: draft$/status: published/' "$mdx"; new+=("$id"); fi
done
[ ${#new[@]} -gt 0 ] || { echo "publish: nothing new"; exit 0; }
git add .gitignore pipeline/ learn/status/index.html site/README.md site/astro.config.mjs site/scripts \
  site/src/animations/README.md site/src/animations/Root.tsx site/src/animations/registry.ts site/src/components \
  site/src/content.config.ts site/src/data site/src/figures/glyphs.tsx site/src/figures/kit site/src/lib site/src/pages \
  site/src/styles
for pass in lectures/lec*/qa/PASS; do
  id=$(basename "$(dirname "$(dirname "$pass")")"); n=${id#lec}
  git add "site/src/content/lectures/$id.mdx" "site/src/content/lectures/$id" "site/src/figures/$id" "lectures/$id"
  for d in site/src/animations/clips/l$n-* site/public/clips/l$n-*; do [ -e "$d" ] && git add "$d"; done
done
"${GIT[@]}" commit -q -m "Publish ${new[*]} (QA passed)" -m "Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
W="$(mktemp -d)/wt"; git worktree add -q "$W" HEAD; ln -s "$ROOT/site/node_modules" "$W/site/node_modules"
until mkdir /tmp/vtb-heavy.lock 2>/dev/null; do sleep 15; done; echo "$$ $(date +%T) publish" > /tmp/vtb-heavy.lock/owner
ok=1; (cd "$W/site" && npm run build > "$W/build.log" 2>&1 && npm run links > "$W/links.log" 2>&1) || ok=0
rm -rf /tmp/vtb-heavy.lock
if [ $ok -eq 0 ]; then echo "publish: clean build failed, not pushed (see $W/build.log, $W/links.log)"; exit 1; fi
ls "$W/site/dist/lectures"; git worktree remove --force "$W"
git push -q origin main && echo "publish: pushed ${new[*]}"
