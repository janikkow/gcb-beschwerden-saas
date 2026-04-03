# CHANGELOG

## 2026-03-31 — Autoresearch scaling loop initialized
- Created autoresearch session files: `autoresearch.md`, `autoresearch.sh`, `autoresearch.jsonl`.
- Added benchmark harness: `experiments/scaling_eval/run_eval.py`.
- Baseline metric run:
  - `scaling_readiness_score = 85`
  - Gap: paper-aligned argument artifact missing.
- Next step: produce evidence-backed scaling brief aligned to control-plane/data-plane n8n architecture.

## 2026-03-31 — Iteration 1 milestone
- Added canonical research artifact: `outputs/scale-research/scaling-strategy-brief.md`.
- Included matched paper (arXiv:1305.01840), phased dev path, risk register, and explicit source URLs.
- Benchmark after change:
  - `scaling_readiness_score = 100` (delta +15)
- Next step: if continuing loop, refine with executable load-test thresholds and rollout gates tied to measured p95 latency/error/queue-depth metrics.
