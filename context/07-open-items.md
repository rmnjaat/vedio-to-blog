# 07 · Open items and next steps

## Waiting on the user

1. **Verdict on Lecture 1 v4** (fbfc788). If approved, apply the same style to Lectures 2–10:
   - plain topic headings and summaries (newsletter style), no question/riddle headings;
   - relatable hook, standalone chapter openings, bridge sentences in prose;
   - tag main before each rewrite and add a `VERSIONS.md` row;
   - keep section ids stable or remap incoming `sec=` links in the same push;
   - run the `lectures/STORY_REVIEW.md` checks again (at least fresh reader + fact re-check + blind exam).
   Also update `lectures/STORY_BRIEF.md` rule 5 (it still says titles are questions) to the plain-topic rule.
2. **Domain**: buy one (e.g. `designnotes.dev`) and attach it in Cloudflare, if wanted. GitHub Pages base path stays.

## Known small gaps

- Four story lectures are a little over the 12k-word target (L6 13.1k, L7 13.1k, L9 13.4k, L10 12.5k); further cuts
  would remove lecture content, so they were left.
- A few chapters sit just outside 900–1,800 words (e.g. L8 ch6 853, ch8 ~2,000; L10 ch2 866).
- Some clips still show older on-screen wording explained by their captions (e.g. L4 Clip 9·1 draws the Kafka road;
  L3 sampling clip re-parameterised). Storyboard source files for some clips still mention old hosts/rules (not rendered).
- `lectures/course.json` topic strings still describe the archive versions (the site uses page titles for published lectures).
- Unused figure exports remain inside some figure files (listed in each lecture's `story/NOTES.md`).
- `learn/status/index.html` is regenerated often and usually shows as modified; `temp-*.rdb` in repo root is a stray Redis dump (untracked).

## How to resume work safely

- Read `context/` and `lectures/STORY_BRIEF.md`, `STORY_WRITER.md`, `STORY_REVIEW.md`.
- Check `git status` first; commit only the lecture you worked on.
- Always clean-worktree full build + `npm run links` before pushing.
- Never broad `pkill`; kill exact process trees.
