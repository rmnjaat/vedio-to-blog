#!/usr/bin/env python3
"""Validators for the qa stage (lectures/<id>/qa/). Exit 1 on failure.

  check_qa.py exam      <id>                       exam.json: schema, >= 0.5 questions per class minute (min 50),
                                                   every 10-minute window of the class has a question, sources are
                                                   transcript/board only; writes qa/exam_questions.json (no answers)
  check_qa.py answers   <id> <answers.json>        the blind reader answered every question
  check_qa.py grade     <id> <grade.json> [--min 0.95]
                                                   every question graded; recomputes the score (correct / total);
                                                   with --min the score must reach it
  check_qa.py faith     <id>                       faithfulness.json: schema, ids, severities
  check_qa.py faith-verify <id> [--schema]         faithfulness_verify.json: every issue re-checked; all resolved
                                                   (--schema: only the re-check is complete)
  check_qa.py critic    <id> <critic.json> [--pass]
                                                   schema; with --pass the verdict must be "pass" and no open
                                                   blocker/high/medium issue may remain
  check_qa.py fixes     <id> <fixes_x.md> <issues.json> [--owner content|design|animation]
                                                   the fixer's report addresses every issue id it owns
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
errors = []
E = errors.append


def load(p):
    try:
        return json.loads(Path(p).read_text())
    except Exception as e:  # noqa
        E(f"{p}: cannot read JSON ({e})"); return None


def secs(t):
    h, m, s = (int(x) for x in t.split(":")); return h * 3600 + m * 60 + s


def done(label, extra=""):
    for e in errors[:80]: print("ERROR", e)
    print(f"{label}: " + ("OK" if not errors else f"FAILED ({len(errors)} errors)") + (f" {extra}" if extra else ""))
    sys.exit(1 if errors else 0)


def exam(lec):
    L = ROOT / "lectures" / lec
    X = load(L / "qa/exam.json")
    if not X: done("exam")
    qs = X.get("questions", [])
    tr = (L / "transcript/transcript.md").read_text()
    m = re.search(r"\*\*Duration\*\*\s*\|\s*(\d\d:\d\d:\d\d)", tr)
    dur = secs(m.group(1)) if m else max(secs(t) for t in re.findall(r"\[(\d\d:\d\d:\d\d)\]", tr))
    need = max(50, int(dur / 60 * 0.5))
    if len(qs) < need: E(f"{len(qs)} questions; need at least {need} (0.5 per class minute, min 50)")
    seen, wins = set(), {}
    for q in qs:
        for k in ["id", "q", "answer", "source", "kind", "difficulty"]:
            if not str(q.get(k, "")).strip(): E(f"{q.get('id')}: '{k}' missing")
        if q.get("id") in seen: E(f"duplicate id {q.get('id')}")
        seen.add(q.get("id"))
        src = str(q.get("source", ""))
        if not re.match(r"^(transcript|board)\b", src): E(f"{q.get('id')}: source must cite the transcript or board ('transcript 01:02:03' / 'board S04 ...'), got '{src[:60]}'")
        t = re.search(r"(\d\d:\d\d:\d\d)", src)
        if t: wins.setdefault(secs(t.group(1)) // 600, []).append(q["id"])
        if re.search(r"\bL-\d{4}\b", json.dumps(q)): E(f"{q.get('id')}: the exam must not cite ledger ids (transcript and board only)")
    # every 10-minute window with teaching has a question (windows that are only a break may be listed in X['skipped_windows'])
    skipped = {int(w) for w in X.get("skipped_windows", [])}
    for w in range(0, (dur + 599) // 600):
        if w not in wins and w not in skipped and (w + 1) * 600 <= dur + 300:
            E(f"no question from the window {w*10}-{w*10+10} min (add one, or list the window index {w} in skipped_windows if it was a break)")
    (L / "qa/exam_questions.json").write_text(json.dumps({"lecture": lec, "count": len(qs),
        "questions": [{"id": q["id"], "q": q["q"]} for q in qs]}, indent=1, ensure_ascii=False))
    done("exam", f"{len(qs)} questions, {len(wins)} windows")


def answers(lec, path):
    L = ROOT / "lectures" / lec
    X = load(L / "qa/exam.json"); A = load(path)
    if X is None or A is None: done("answers")
    if isinstance(A, dict): A = A.get("answers", [])
    got = {a.get("id"): a for a in A}
    for q in X["questions"]:
        a = got.get(q["id"])
        if not a: E(f"{q['id']} not answered"); continue
        for k in ["answer", "found"]:
            if k not in a: E(f"{q['id']}: '{k}' missing")
        if a.get("found") and not str(a.get("evidence", "")).strip(): E(f"{q['id']}: found=true needs page evidence")
    done("answers", f"{len(got)} answers")


def grade(lec, path, mn):
    L = ROOT / "lectures" / lec
    X = load(L / "qa/exam.json"); G = load(path)
    if X is None or G is None: done("grade")
    items = {g.get("id"): g for g in G.get("items", [])}
    c = {"correct": 0, "partial": 0, "wrong": 0, "missing": 0}
    for q in X["questions"]:
        g = items.get(q["id"])
        if not g: E(f"{q['id']} not graded"); continue
        gr = g.get("grade")
        if gr not in c: E(f"{q['id']}: grade must be correct/partial/wrong/missing, got {gr}"); continue
        c[gr] += 1
        if gr != "correct" and not str(g.get("fix", "")).strip(): E(f"{q['id']} ({gr}): needs a proposed fix")
    n = len(X["questions"]); score = c["correct"] / n if n else 0
    half = (c["correct"] + 0.5 * c["partial"]) / n if n else 0
    if abs(float(G.get("score", score)) - score) > 0.005: E(f"score in the file ({G.get('score')}) is not correct/total = {score:.4f}")
    G["score"], G["score_half_credit"], G["counts"] = round(score, 4), round(half, 4), c
    Path(path).write_text(json.dumps(G, indent=1, ensure_ascii=False))
    if mn is not None and score < mn: E(f"exam score {score:.1%} is below {mn:.0%}")
    done("grade", f"score {score:.1%} ({c['correct']}/{n} correct, {c['partial']} partial, {c['wrong']} wrong, {c['missing']} missing; half-credit {half:.1%})")


SEV = {"high", "medium", "low"}


def faith(lec):
    L = ROOT / "lectures" / lec
    F = load(L / "qa/faithfulness.json")
    if F is None: done("faith")
    seen = set()
    for i in F.get("issues", []):
        for k in ["id", "severity", "kind", "file", "problem", "fix"]:
            if not str(i.get(k, "")).strip(): E(f"{i.get('id')}: '{k}' missing")
        if i.get("severity") not in SEV: E(f"{i.get('id')}: severity must be high/medium/low")
        if i.get("id") in seen: E(f"duplicate {i.get('id')}")
        seen.add(i.get("id"))
    if "coverage" not in F: E("faithfulness.json needs 'coverage' (paragraphs checked / total, per part)")
    done("faith", f"{len(seen)} issues")


def faith_verify(lec, schema_only=False):
    L = ROOT / "lectures" / lec
    F = load(L / "qa/faithfulness.json"); V = load(L / "qa/faithfulness_verify.json")
    if F is None or V is None: done("faith-verify")
    st = {v.get("id"): v for v in V.get("issues", [])}
    unresolved = []
    for i in F.get("issues", []):
        v = st.get(i["id"])
        if not v: E(f"{i['id']} not re-checked"); continue
        if v.get("status") != "resolved": unresolved.append(i["id"])
    for n in V.get("new_issues", []):
        if n.get("severity") in ("high", "medium"): unresolved.append(f"new:{n.get('id')}")
    if unresolved and not schema_only: E(f"unresolved faithfulness issues: {' '.join(unresolved)}")
    if unresolved and schema_only: print(f"note: unresolved {' '.join(unresolved)} (gate applied by the stage)")
    done("faith-verify", f"{len(st)} re-checked")


def critic(lec, path, need_pass):
    C = load(path)
    if C is None: done("critic")
    if C.get("verdict") not in ("pass", "pass_with_fixes", "fail"): E("verdict must be pass / pass_with_fixes / fail")
    for i in C.get("issues", []):
        for k in ["id", "severity", "owner", "where", "problem", "fix"]:
            if not str(i.get(k, "")).strip(): E(f"{i.get('id')}: '{k}' missing")
        if i.get("severity") not in ("blocker", "high", "medium", "low"): E(f"{i.get('id')}: bad severity")
        if i.get("owner") not in ("content", "design", "animation"): E(f"{i.get('id')}: owner must be content/design/animation")
    if need_pass:
        if C.get("verdict") != "pass": E(f"critic verdict is {C.get('verdict')}, not pass")
        open_ = [i["id"] for i in C.get("issues", []) if i.get("severity") in ("blocker", "high", "medium") and i.get("status", "open") != "resolved"]
        if open_: E(f"open blocker/high/medium issues: {open_}")
    done("critic", f"verdict {C.get('verdict')}, {len(C.get('issues', []))} issues")


def fixes(lec, report, issues_path, owner):
    t = Path(report).read_text() if Path(report).exists() else ""
    if not t.strip(): E(f"{report} missing or empty")
    I = load(issues_path) or {}
    ids = [i["id"] for i in I.get("issues", I.get("items", [])) if (not owner or i.get("owner", owner) == owner)
           and i.get("grade", "x") != "correct"]
    for i in ids:
        if i not in t: E(f"{i} is not addressed in {Path(report).name}")
    done("fixes", f"{len(ids)} issues addressed")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit(2)
    cmd, lec = a[0], a[1]
    if cmd == "exam": exam(lec)
    elif cmd == "answers": answers(lec, a[2])
    elif cmd == "grade": grade(lec, a[2], float(a[a.index("--min") + 1]) if "--min" in a else None)
    elif cmd == "faith": faith(lec)
    elif cmd == "faith-verify": faith_verify(lec, "--schema" in a)
    elif cmd == "critic": critic(lec, a[2], "--pass" in a)
    elif cmd == "fixes": fixes(lec, a[2], a[3], a[a.index("--owner") + 1] if "--owner" in a else None)
    else: print(__doc__); sys.exit(2)
