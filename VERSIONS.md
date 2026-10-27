# Site versions and how to go back

Each version is a git tag on `main`. Pushing to `main` redeploys both sites
(GitHub Pages and https://system.designnotes.workers.dev).

| Tag | Date | What it is |
|---|---|---|
| `v1-story-before-l1-flow` | 2026-10-27 | All 10 lectures in story style, before the Lecture 1 flow rewrite |
| (current `main`) | 2026-10-28 | v2: Lecture 1 rewritten so every section ends on the question the next one answers; shorter sentences |

## Go back to the previous version of Lecture 1

Restore only Lecture 1's files from the tag, then commit and push:

```sh
git checkout v1-story-before-l1-flow -- site/src/content/lectures/lec04.mdx site/src/content/lectures/lec04/
git commit -m "Revert Lecture 1 to v1-story-before-l1-flow"
git push origin main
```

To put the whole site back instead: `git revert` the commits made after the tag (`git log v1-story-before-l1-flow..main`), then push.
