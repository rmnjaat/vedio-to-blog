# Lecture 09 (lec07) QA report - 2026-10-14 22:26:11

Result: **PASS** - the page is finished and verified

| gate | result | detail |
|---|---|---|
| page_gates | PASS |  |
| coverage | PASS | COVERAGE PASS |
| exam_r2 | PASS | grade: OK score 98.3% (118/120 correct, 2 partial, 0 wrong, 0 missing; half-credit 99.2%) |
| faithfulness | PASS | faith-verify: OK 12 re-checked |
| critic | PASS | critic: OK verdict pass, 25 issues |

- Coverage: coverage lec07: 374/374 placed ids on the pages; ledger overall 374/381
- Blind exam: round 1 ; after fixes  (gate: correct/total >= 0.95)
- Critic: first verdict pass_with_fixes, final verdict pass
- Faithfulness: 12 issues found, 12 resolved, 0 unresolved, len(v.get('new_issues' new - Faithfulness: 12 issues found, 12 resolved, 0 unresolved, [])) new
- qa stage time: 13 min (this run)

Files: exam.json, exam_grade.md, exam_grade_r2.md, faithfulness.md, faithfulness_verify.md, critic.md, critic_final.md, fixes_*.md, gates_final.txt, final_shots/.
