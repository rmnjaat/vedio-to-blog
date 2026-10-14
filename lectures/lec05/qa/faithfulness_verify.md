# lec05 faithfulness re-check (after fixes)

Every issue was re-checked against the current page, figures and clip timelines. I did not rely on `fixes_content.md` or `fixes_design.md`.

- Issues: 19 total. **19 resolved, 0 unresolved.**
- New issues: 1, low (non-blocking).

## Unresolved

None.

## New issues

- **N-01 (low)**: `site/src/content/lectures/lec05/s2b-check-in.mdx:248`. The Fig 2·g caption says "the hold is a status in the row". The class said only that the seat is "put on hold", that the hold is not SQL locking, and that the rest belongs to a different system covered with flash sale (L-0135, L-0162, 01:24:33). The class never said where the hold is stored. Fix: "A short transaction puts the seat on hold (a hold, not a lock), and the payment happens outside any transaction. …"

## Notes

- F-018: the replica→master arrows keep the pull direction. They are now labelled "pulls changes / from master" in Fig 5·b (wide and phone), Fig 5·c and Fig 6·a, and every caption says the data flows from master to replica.
- F-016/F-017: the leads were checked against `l05-expiry-window/timeline.ts` and `l05-redis-sampling/timeline.ts`.
