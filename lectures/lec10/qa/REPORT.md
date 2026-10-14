# Lecture 10 (lec10) QA report - 2026-10-15 02:05:56

Result: **PASS** - the page is finished and verified

| gate | result | detail |
|---|---|---|
| page_gates | PASS |  |
| coverage | PASS | COVERAGE PASS |
| exam_r2 | PASS | grade: OK score 100.0% (126/126 correct, 0 partial, 0 wrong, 0 missing; half-credit 100.0%) |
| faithfulness | PASS | faith-verify: OK 10 re-checked |
| critic | PASS | critic: OK verdict pass, 20 issues |

- Coverage: coverage lec10: 311/311 placed ids on the pages; ledger overall 311/311
- Blind exam: round 1 ; after fixes  (gate: correct/total >= 0.95)
- Critic: first verdict pass_with_fixes, final verdict pass
- Faithfulness: 10 issues found, 10 resolved, 0 unresolved, len(v.get('new_issues' new - Faithfulness: 10 issues found, 10 resolved, 0 unresolved, [])) new
- qa stage time: 107 min (this run)

Files: exam.json, exam_grade.md, exam_grade_r2.md, faithfulness.md, faithfulness_verify.md, critic.md, critic_final.md, fixes_*.md, gates_final.txt, final_shots/.
