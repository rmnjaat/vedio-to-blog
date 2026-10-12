#!/usr/bin/env python3
"""Local, account-free speaker diarization (sherpa-onnx: pyannote-seg-3.0 ONNX + speaker embedding + clustering).

Usage:
  .venv-diar/bin/python scripts/diarize.py audio/lec01_clip10m.wav out.json [--num-speakers N | --threshold T] [--embedding eres2net|titanet|wespeaker]

Output: JSON list of {"start","end","speaker"}; speaker with most talk time -> TEACHER,
others STUDENT_1..n ordered by talk time. A summary is printed to stderr.
Models are downloaded on first run into ~/.cache/diar-models (GitHub releases of k2-fsa/sherpa-onnx; no token).
Input must be 16 kHz mono wav (convert with: ffmpeg -i in -ac 1 -ar 16000 out.wav).
"""
import argparse
import json
import os
import sys
import tarfile
import time
import urllib.request
from collections import defaultdict

import numpy as np
import sherpa_onnx
import soundfile as sf

MODEL_DIR = os.path.expanduser("~/.cache/diar-models")
BASE = "https://github.com/k2-fsa/sherpa-onnx/releases/download"
SEG_TAR = f"{BASE}/speaker-segmentation-models/sherpa-onnx-pyannote-segmentation-3-0.tar.bz2"
EMB_MODELS = {
    "eres2net": "3dspeaker_speech_eres2net_base_sv_zh-cn_3dspeaker_16k.onnx",
    "titanet": "nemo_en_titanet_small.onnx",
    "wespeaker": "wespeaker_en_voxceleb_resnet34_LM.onnx",
}


def ensure_models(emb_name):
    os.makedirs(MODEL_DIR, exist_ok=True)
    seg = os.path.join(MODEL_DIR, "sherpa-onnx-pyannote-segmentation-3-0", "model.onnx")
    if not os.path.exists(seg):
        tar = os.path.join(MODEL_DIR, "seg.tar.bz2")
        print("downloading segmentation model...", file=sys.stderr)
        urllib.request.urlretrieve(SEG_TAR, tar)
        with tarfile.open(tar) as t:
            t.extractall(MODEL_DIR)
        os.remove(tar)
    fname = EMB_MODELS[emb_name]
    emb = os.path.join(MODEL_DIR, fname)
    if not os.path.exists(emb):
        print(f"downloading embedding model {fname}...", file=sys.stderr)
        urllib.request.urlretrieve(f"{BASE}/speaker-recongition-models/{fname}", emb)
    return seg, emb


def diarize(wav_path, emb_name="eres2net", num_speakers=-1, threshold=0.9, threads=8,
            min_on=0.3, min_off=0.5):
    seg, emb = ensure_models(emb_name)
    config = sherpa_onnx.OfflineSpeakerDiarizationConfig(
        segmentation=sherpa_onnx.OfflineSpeakerSegmentationModelConfig(
            pyannote=sherpa_onnx.OfflineSpeakerSegmentationPyannoteModelConfig(model=seg),
            num_threads=threads,
        ),
        embedding=sherpa_onnx.SpeakerEmbeddingExtractorConfig(model=emb, num_threads=threads),
        clustering=sherpa_onnx.FastClusteringConfig(num_clusters=num_speakers, threshold=threshold),
        min_duration_on=min_on,
        min_duration_off=min_off,
    )
    if not config.validate():
        raise RuntimeError("invalid sherpa-onnx config")
    sd = sherpa_onnx.OfflineSpeakerDiarization(config)
    audio, sr = sf.read(wav_path, dtype="float32", always_2d=True)
    audio = audio.mean(axis=1)
    if sr != sd.sample_rate:
        raise SystemExit(f"expected {sd.sample_rate} Hz mono wav, got {sr} Hz; resample with ffmpeg")
    result = sd.process(np.ascontiguousarray(audio)).sort_by_start_time()
    return [(r.start, r.end, r.speaker) for r in result]


def absorb_tiny(segs, min_total):
    """Relabel segments of speakers with < min_total seconds overall to the nearest-in-time other speaker."""
    tot = defaultdict(float)
    for s, e, spk in segs:
        tot[spk] += e - s
    tiny = {k for k, v in tot.items() if v < min_total}
    if not tiny or len(tiny) == len(tot):
        return segs
    big = [x for x in segs if x[2] not in tiny]
    out = []
    for s, e, spk in segs:
        if spk in tiny:
            mid = (s + e) / 2
            spk = min(big, key=lambda b: 0 if b[0] <= mid <= b[1] else min(abs(b[0] - mid), abs(b[1] - mid)))[2]
        out.append((s, e, spk))
    return out


def label(segs):
    tot = defaultdict(float)
    for s, e, spk in segs:
        tot[spk] += e - s
    order = sorted(tot, key=lambda k: -tot[k])
    names = {spk: ("TEACHER" if i == 0 else f"STUDENT_{i}") for i, spk in enumerate(order)}
    out = [{"start": round(s, 3), "end": round(e, 3), "speaker": names[spk]} for s, e, spk in segs]
    summary = {names[k]: round(tot[k], 1) for k in order}
    return out, summary


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_wav")
    ap.add_argument("output_json")
    ap.add_argument("--embedding", choices=list(EMB_MODELS), default="eres2net")
    ap.add_argument("--num-speakers", type=int, default=-1, help="fixed number of speakers (-1 = use threshold)")
    ap.add_argument("--threshold", type=float, default=0.9, help="clustering distance threshold; larger -> fewer speakers")
    ap.add_argument("--threads", type=int, default=8)
    ap.add_argument("--min-speaker-time", type=float, default=3.0,
                    help="speakers with less total time are merged into the nearest speaker (0 = off)")
    a = ap.parse_args()
    t0 = time.time()
    segs = diarize(a.input_wav, a.embedding, a.num_speakers, a.threshold, a.threads)
    if a.min_speaker_time > 0:
        segs = absorb_tiny(segs, a.min_speaker_time)
    out, summary = label(segs)
    with open(a.output_json, "w") as f:
        json.dump(out, f, indent=1)
    total = sum(summary.values()) or 1
    print(f"done in {time.time() - t0:.1f}s, {len(summary)} speakers, {len(out)} segments", file=sys.stderr)
    for k, v in summary.items():
        print(f"  {k:12s} {v:8.1f}s  {100 * v / total:5.1f}%", file=sys.stderr)


if __name__ == "__main__":
    main()
