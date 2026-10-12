# Task: pipeline smoke test for {{LECTURE_ID}}

This only checks that the pipeline's `claude -p` wrapper works. Do exactly this and nothing else:
1. Read `.claude/skills/lecture-ledger/SKILL.md` and find the name of the second role it defines.
2. Write the file `{{OUT}}` containing exactly two lines: `lecture={{LECTURE_ID}}` and `role=<that role name>`.
3. Run `python3 -c "print('validator-ok')"` and include its output in your report.

Final message (exactly one line): `SMOKE {{LECTURE_ID}} OK role=<role> python=<output>`
