# Lecture 07 (lec09) QA report - 2026-10-15 00:45:33

Result: **PASS** - the page is finished and verified

| gate | result | detail |
|---|---|---|
| page_gates | PASS |  |
| coverage | PASS | COVERAGE PASS |
| exam_r2 | PASS | grade: OK score 100.0% (154/154 correct, 0 partial, 0 wrong, 0 missing; half-credit 100.0%) |
| faithfulness | PASS | faith-verify: OK 16 re-checked |
| critic | PASS | critic: OK verdict pass, 13 issues |

- Coverage: coverage lec09: 364/364 placed ids on the pages; ledger overall 364/366
- Blind exam: round 1 ; after fixes  (gate: correct/total >= 0.95)
- Critic: first verdict pass_with_fixes, final verdict pass
- Faithfulness: 16 issues found, 16 resolved, 0 unresolved, len(v.get('new_issues' new - Faithfulness: 16 issues found, 16 resolved, 0 unresolved, [])) new
- qa stage time: 16 min (this run)

Files: exam.json, exam_grade.md, exam_grade_r2.md, faithfulness.md, faithfulness_verify.md, critic.md, critic_final.md, fixes_*.md, gates_final.txt, final_shots/.
