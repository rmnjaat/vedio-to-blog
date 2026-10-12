#!/usr/bin/env python3
"""Run LLM pipeline steps through Claude Code headless mode (`claude -p`) on the user's subscription.
No API keys, no direct API calls: this only shells out to the `claude` CLI.

Usage:
  claude_call.py run   --root ROOT --logdir DIR --name NAME --prompt pipeline/prompts/X.md
                       [--var KEY=VALUE ...] [--expect PATH ...] [--validate "shell cmd"] [--tools base|web|board]
  claude_call.py batch --root ROOT --logdir DIR --jobs jobs.json [--parallel 4]
        jobs.json = [{"name", "prompt", "vars": {...}, "expect": [...], "validate": "...", "tools": "base",
                      "sentinel": "lectures/<id>/.done/<step>", "lock": "pipeline/.locks/<name>"}, ...]
  run also takes --sentinel PATH and --lock DIR (same meaning as the job keys).

Per call:
  1. Render the prompt file: {{KEY}} -> value (fails if any {{...}} is left unresolved).
  2. Run: claude -p --output-format json --permission-mode acceptEdits --permission-prompts none
          --allowedTools <preset> --disallowedTools Agent Task --add-dir ROOT --model $PIPE_MODEL
          --max-turns $PIPE_MAX_TURNS [--effort $PIPE_EFFORT]      (cwd = ROOT, so project skills resolve;
          the rendered prompt is passed on stdin)
  3. Success = exit 0 and is_error false, every --expect file exists and is non-empty, and --validate exits 0.
  4. Usage/rate limit (429, "usage limit", "rate limit", "overloaded", "resets ...") -> wait and retry the same
     attempt: every $PIPE_RL_WAIT s (default 900) up to $PIPE_RL_MAX s total (default 21600); never counted as a failure.
  5. Any other failure -> ONE retry, with the failure reason and validator output appended to the prompt
     ("fix the existing outputs, do not start over"). Second failure -> exit 1.
Logs in LOGDIR: NAME.prompt.md, NAME.aN.json (raw CLI JSON), NAME.aN.stderr, NAME.aN.validate.txt,
NAME.result.md (agent's final report), and one line per attempt in calls.tsv.
Env: PIPE_MODEL (default opus), PIPE_EFFORT (optional), PIPE_MAX_TURNS (default 250), PIPE_DRY_RUN=1 (print only).
"""
import argparse
import concurrent.futures as cf
import json
import os
import re
import subprocess
import sys
import threading
import time

BASE = ["Read", "Write", "Edit", "Glob", "Grep", "Skill", "TodoWrite",
        "Bash(python3 *)", "Bash(ls *)", "Bash(wc *)", "Bash(head *)", "Bash(tail *)", "Bash(grep *)",
        "Bash(mkdir *)", "Bash(cp *)", "Bash(diff *)", "Bash(sort *)", "Bash(jq *)"]
TOOLS = {"base": BASE, "web": BASE + ["WebFetch", "WebSearch"], "board": BASE + ["Bash(ffmpeg *)", "Bash(ffprobe *)"]}
RL_RE = re.compile(r"rate.?limit|usage limit|limit reached|429|overloaded|529|resets? (at|in)|too many requests|"
                   r"quota", re.I)
LOCK = threading.Lock()


def log_line(logdir, row):
    with LOCK:
        path = os.path.join(logdir, "calls.tsv")
        new = not os.path.exists(path)
        with open(path, "a", encoding="utf-8") as f:
            if new:
                f.write("time\tname\tattempt\tstatus\tseconds\tturns\tcost_usd\tsession\treason\n")
            f.write("\t".join(str(x) for x in row) + "\n")


def render(prompt_path, variables):
    text = open(prompt_path, encoding="utf-8").read()
    for k, v in variables.items():
        text = text.replace("{{%s}}" % k, str(v))
    left = sorted(set(re.findall(r"\{\{[A-Z0-9_]+\}\}", text)))
    if left:
        raise SystemExit("%s: unresolved placeholders %s" % (prompt_path, ", ".join(left)))
    return text


def run_validate(cmd, root, out_path):
    if not cmd:
        return True, ""
    r = subprocess.run(cmd, shell=True, cwd=root, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    open(out_path, "w", encoding="utf-8").write("$ %s\n%s" % (cmd, r.stdout))
    return r.returncode == 0, r.stdout[-4000:]


def call_once(job, root, logdir, attempt, prompt):
    name = job["name"]
    cmd = ["claude", "-p", "--output-format", "json", "--permission-mode", "acceptEdits",
           "--permission-prompts", "none", "--allowedTools", *TOOLS[job.get("tools", "base")],
           "--disallowedTools", "Agent", "Task", "--add-dir", root,
           "--model", os.environ.get("PIPE_MODEL", "opus"),
           "--max-turns", os.environ.get("PIPE_MAX_TURNS", "250")]
    if os.environ.get("PIPE_EFFORT"):
        cmd += ["--effort", os.environ["PIPE_EFFORT"]]
    if os.environ.get("PIPE_DRY_RUN"):
        print("DRY RUN %s: claude -p <%s, %d chars> %s" % (name, job["prompt"], len(prompt), " ".join(
            repr(c) if " " in c else c for c in cmd[2:])))
        return "ok", {}, ""
    t0 = time.time()
    # the prompt goes in on stdin (never as an argv word: a prompt starting with "-" would parse as a flag)
    r = subprocess.run(cmd, cwd=root, input=prompt, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    secs = int(time.time() - t0)
    open(os.path.join(logdir, "%s.a%d.json" % (name, attempt)), "w", encoding="utf-8").write(r.stdout)
    open(os.path.join(logdir, "%s.a%d.stderr" % (name, attempt)), "w", encoding="utf-8").write(r.stderr)
    try:
        res = json.loads(r.stdout.strip().splitlines()[-1]) if r.stdout.strip() else {}
    except (json.JSONDecodeError, IndexError):
        res = {}
    text = " ".join(str(x) for x in (res.get("result"), res.get("api_error_status"), r.stderr[-2000:]) if x)
    meta = (secs, res.get("num_turns", ""), res.get("total_cost_usd", ""), res.get("session_id", ""))
    if res.get("result"):
        open(os.path.join(logdir, "%s.result.md" % name), "w", encoding="utf-8").write(str(res["result"]))
    if r.returncode != 0 or res.get("is_error") or not res:
        if RL_RE.search(text):
            return "ratelimit", meta, text[:300]
        return "error", meta, ("exit %d, subtype %s: %s" % (r.returncode, res.get("subtype"), text[:500]))
    return "ok", meta, ""


def run_job(job, root, logdir):
    """Optional job keys: "sentinel" (path; job skipped if it exists, written on success) and "lock" (a directory
    claimed with mkdir for the whole job, so two lectures never edit a shared file at the same time)."""
    name = job["name"]
    sentinel = os.path.join(root, job["sentinel"]) if job.get("sentinel") else None
    if sentinel and os.path.exists(sentinel):
        print("[%s] %s: already done (sentinel), skipped" % (time.strftime("%T"), name))
        return True
    lock = os.path.join(root, job["lock"]) if job.get("lock") else None
    if lock:
        os.makedirs(os.path.dirname(lock), exist_ok=True)
        while True:
            try:
                os.mkdir(lock)
                break
            except FileExistsError:
                print("[%s] %s: waiting for lock %s" % (time.strftime("%T"), name, job["lock"]))
                time.sleep(30)
    try:
        ok = _run_job(job, root, logdir)
    finally:
        if lock:
            os.rmdir(lock)
    if ok and sentinel and not os.environ.get("PIPE_DRY_RUN"):
        os.makedirs(os.path.dirname(sentinel), exist_ok=True)
        open(sentinel, "w").write(time.strftime("%F %T") + "\n")
    return ok


def _run_job(job, root, logdir):
    name = job["name"]
    base_prompt = render(os.path.join(root, job["prompt"]), job.get("vars", {}))
    open(os.path.join(logdir, "%s.prompt.md" % name), "w", encoding="utf-8").write(base_prompt)
    prompt, reason = base_prompt, ""
    for attempt in (1, 2):
        waited = 0
        while True:
            status, meta, why = call_once(job, root, logdir, attempt, prompt)
            if status != "ratelimit":
                break
            wait = int(os.environ.get("PIPE_RL_WAIT", "900"))
            if waited + wait > int(os.environ.get("PIPE_RL_MAX", "21600")):
                log_line(logdir, (time.strftime("%F %T"), name, attempt, "ratelimit-giveup", *meta, why))
                print("[%s] %s: usage limit persisted > %ss, giving up" % (time.strftime("%T"), name, waited))
                return False
            log_line(logdir, (time.strftime("%F %T"), name, attempt, "ratelimit-wait", *meta, why))
            print("[%s] %s: usage/rate limit, waiting %ss (%s)" % (time.strftime("%T"), name, wait, why[:120]))
            time.sleep(wait)
            waited += wait
        if os.environ.get("PIPE_DRY_RUN"):
            return True
        if status == "ok":
            missing = [p for p in job.get("expect", []) if not os.path.exists(os.path.join(root, p))
                       or os.path.getsize(os.path.join(root, p)) == 0]
            if missing:
                status, why = "error", "expected outputs missing/empty: %s" % ", ".join(missing)
            else:
                ok, vout = run_validate(job.get("validate"), root,
                                        os.path.join(logdir, "%s.a%d.validate.txt" % (name, attempt)))
                if not ok:
                    status, why = "invalid", "validation failed:\n" + vout
        log_line(logdir, (time.strftime("%F %T"), name, attempt, status, *meta, why.replace("\n", " ")[:300]))
        print("[%s] %s attempt %d: %s %s" % (time.strftime("%T"), name, attempt, status.upper(),
                                            ("(%ss)" % meta[0]) if meta else ""))
        if status == "ok":
            return True
        reason = why
        prompt = base_prompt + (
            "\n\n---\nRETRY NOTE (attempt 2): the previous attempt did not pass. Reason:\n```\n%s\n```\n"
            "Inspect the outputs that already exist, fix them (do not start over unless they are unusable), "
            "re-run the validation command from the task until it passes, then give the report.\n" % reason[-3500:])
    return False


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("mode", choices=["run", "batch"])
    ap.add_argument("--root", required=True)
    ap.add_argument("--logdir", required=True)
    ap.add_argument("--name")
    ap.add_argument("--prompt")
    ap.add_argument("--var", action="append", default=[])
    ap.add_argument("--expect", action="append", default=[])
    ap.add_argument("--validate")
    ap.add_argument("--tools", default="base", choices=sorted(TOOLS))
    ap.add_argument("--sentinel")
    ap.add_argument("--lock")
    ap.add_argument("--jobs")
    ap.add_argument("--parallel", type=int, default=3)
    a = ap.parse_args()
    os.makedirs(a.logdir, exist_ok=True)
    if a.mode == "run":
        jobs = [{"name": a.name, "prompt": a.prompt, "vars": dict(v.split("=", 1) for v in a.var),
                 "expect": a.expect, "validate": a.validate, "tools": a.tools, "sentinel": a.sentinel,
                 "lock": a.lock}]
    else:
        jobs = json.load(open(a.jobs, encoding="utf-8"))
    with cf.ThreadPoolExecutor(max_workers=max(1, a.parallel)) as ex:
        futs = {ex.submit(run_job, j, a.root, a.logdir): j["name"] for j in jobs}
        results = {futs[f]: f.result() for f in cf.as_completed(futs)}
    failed = sorted(n for n, ok in results.items() if not ok)
    print("calls: %d ok, %d failed%s" % (len(results) - len(failed), len(failed),
                                         (": " + ", ".join(failed)) if failed else ""))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
