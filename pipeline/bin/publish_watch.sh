#!/bin/bash
# Publish lectures as soon as their QA passes, until no pipeline run is left.
cd "$(dirname "$0")/../.."
while :; do
  for p in lectures/lec*/qa/PASS; do id=$(basename "$(dirname "$(dirname "$p")")")
    grep -q '^status: draft$' "site/src/content/lectures/$id.mdx" 2>/dev/null && { echo "[$(date +%T)] $id passed"; pipeline/bin/publish.sh; break; }
  done
  pgrep -f "pipeline/run.sh lec" > /dev/null || pgrep -f run_pool.sh > /dev/null || { echo "[$(date +%T)] no runs left"; exit 0; }
  sleep 60
done
