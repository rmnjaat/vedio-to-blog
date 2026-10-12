#!/bin/bash
# Regenerate the status dashboard every 60 s.
cd "$(dirname "$0")/.."
while true; do python3 pipeline/status.py >/dev/null 2>&1; sleep 60; done
