#!/usr/bin/env python3
"""Sample board frames from a lecture video, segment them into board states, and run dense passes so short-lived
states are not missed. python3 stdlib + the ffmpeg binary (no PIL / numpy).

Usage:
  board_frames.py sample VIDEO BOARD_DIR [--every 15] [--crop W:H:X:Y] [--diff-px 300] [--pix-thresh 24]
                                         [--dense-step 3] [--start SEC] [--duration SEC]
  board_frames.py extract VIDEO BOARD_DIR --at HH:MM:SS [HH:MM:SS ...]     # ad-hoc frames for the reader

sample writes into BOARD_DIR:
  frames/f_NNNNN.jpg        every --every s (frame n = (n-1)*every s, offset by --start)
  frames_kept/b_HHMMSS.jpg  last frame of each board state (a state = run of frames whose 108x70 grayscale
                            thumbnail differs from the previous one by <= --diff-px pixels), plus intermediate
                            states found by the dense pass
  frames_index.json / frames_index.md   state list: kept frame, first/last time, sampled frame count, dense flag
Dense pass: for every state change between two samples, the interval is re-sampled every --dense-step s; a dense
frame that differs from BOTH neighbouring samples by > --diff-px is a short-lived state and is kept too.
--crop limits the comparison (not the saved images) to the board region, e.g. exclude a participant-tile column.
Never keep frames that show only participant tiles: the reader skips them, and they must not be published.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys

TW, TH = 108, 70
FRAME = TW * TH


def fmt(t):
    t = int(round(t))
    return "%02d:%02d:%02d" % (t // 3600, t % 3600 // 60, t % 60)


def parse(s):
    p = [int(x) for x in s.split(":")]
    while len(p) < 3:
        p.insert(0, 0)
    return p[0] * 3600 + p[1] * 60 + p[2]


def thumbs(video, every, start, duration, crop):
    vf = "fps=1/%s" % every
    if crop:
        vf += ",crop=%s" % crop
    vf += ",scale=%d:%d,format=gray" % (TW, TH)
    cmd = ["ffmpeg", "-nostdin", "-loglevel", "error"]
    if start:
        cmd += ["-ss", str(start)]
    cmd += ["-i", video]
    if duration:
        cmd += ["-t", str(duration)]
    cmd += ["-vf", vf, "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, check=True, stdout=subprocess.PIPE).stdout
    return [raw[i:i + FRAME] for i in range(0, len(raw) - FRAME + 1, FRAME)]


def diff(a, b, thresh):
    return sum(1 for x, y in zip(a, b) if abs(x - y) > thresh)


def grab(video, t, path):
    subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-ss", "%.2f" % t, "-i", video,
                    "-frames:v", "1", "-q:v", "3", path], check=True)


def sample(a):
    os.makedirs(os.path.join(a.dir, "frames"), exist_ok=True)
    kept_dir = os.path.join(a.dir, "frames_kept")
    os.makedirs(kept_dir, exist_ok=True)
    cmd = ["ffmpeg", "-nostdin", "-loglevel", "error", "-y"]
    if a.start:
        cmd += ["-ss", str(a.start)]
    cmd += ["-i", a.video]
    if a.duration:
        cmd += ["-t", str(a.duration)]
    cmd += ["-vf", "fps=1/%s" % a.every, "-q:v", "3", os.path.join(a.dir, "frames", "f_%05d.jpg")]
    subprocess.run(cmd, check=True)
    th = thumbs(a.video, a.every, a.start, a.duration, a.crop)
    n = len(th)
    t_of = lambda i: a.start + i * a.every  # noqa: E731
    # segment into states
    states, cur = [], [0]
    for i in range(1, n):
        if diff(th[i - 1], th[i], a.pix_thresh) > a.diff_px:
            states.append(cur)
            cur = [i]
        else:
            cur.append(i)
    states.append(cur)
    index = []
    for s in states:
        last = s[-1]
        name = "b_%s.jpg" % fmt(t_of(last)).replace(":", "")
        shutil.copyfile(os.path.join(a.dir, "frames", "f_%05d.jpg" % (last + 1)), os.path.join(kept_dir, name))
        index.append({"kept": name, "start": fmt(t_of(s[0])), "end": fmt(t_of(last)), "frames": len(s), "dense": False})
    # dense pass between consecutive states
    extra = []
    for k in range(1, len(states)):
        i0, i1 = states[k - 1][-1], states[k][0]
        t0 = t_of(i0)
        dense = thumbs(a.video, a.dense_step, t0 + a.dense_step, a.every - a.dense_step, a.crop)
        for j, d in enumerate(dense):
            if diff(d, th[i0], a.pix_thresh) > a.diff_px and diff(d, th[i1], a.pix_thresh) > a.diff_px:
                t = t0 + (j + 1) * a.dense_step
                name = "b_%s.jpg" % fmt(t).replace(":", "")
                if not os.path.exists(os.path.join(kept_dir, name)):
                    grab(a.video, t, os.path.join(kept_dir, name))
                    extra.append({"kept": name, "start": fmt(t), "end": fmt(t), "frames": 0, "dense": True})
    index = sorted(index + extra, key=lambda x: x["start"])
    json.dump({"video": a.video, "every": a.every, "crop": a.crop, "diff_px": a.diff_px, "states": index},
              open(os.path.join(a.dir, "frames_index.json"), "w"), indent=1)
    lines = ["# Board frame index", "", "Sampled every %ss (frame n = (n-1)*%ss + %ss). %d samples, %d states, "
             "%d short-lived states from dense passes (every %ss)." % (a.every, a.every, a.start, n, len(states),
                                                                     len(extra), a.dense_step), "",
             "| Kept frame | First seen | Last seen | Samples | Dense |", "|---|---|---|---|---|"]
    lines += ["| %s | %s | %s | %d | %s |" % (x["kept"], x["start"], x["end"], x["frames"], "yes" if x["dense"] else "")
              for x in index]
    open(os.path.join(a.dir, "frames_index.md"), "w").write("\n".join(lines) + "\n")
    print("samples %d, states %d, dense extra %d -> %s" % (n, len(states), len(extra), kept_dir))


def extract(a):
    kept_dir = os.path.join(a.dir, "frames_kept")
    os.makedirs(kept_dir, exist_ok=True)
    for ts in a.at:
        path = os.path.join(kept_dir, "b_%s.jpg" % fmt(parse(ts)).replace(":", ""))
        grab(a.video, parse(ts), path)
        print(path)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("sample")
    s.add_argument("video")
    s.add_argument("dir")
    s.add_argument("--every", type=int, default=15)
    s.add_argument("--crop")
    s.add_argument("--diff-px", type=int, default=300)
    s.add_argument("--pix-thresh", type=int, default=24)
    s.add_argument("--dense-step", type=int, default=3)
    s.add_argument("--start", type=int, default=0)
    s.add_argument("--duration", type=int, default=0)
    e = sub.add_parser("extract")
    e.add_argument("video")
    e.add_argument("dir")
    e.add_argument("--at", nargs="+", required=True)
    a = ap.parse_args()
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found")
    sample(a) if a.cmd == "sample" else extract(a)


if __name__ == "__main__":
    main()
