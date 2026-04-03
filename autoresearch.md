# Autoresearch Session: n8n Control-Plane/Data-Plane Scaling Strategy

- **Objective:** Analyse the current codebase/docs and optimize toward a clear, argued development path to scale via self-hosted n8n control plane + data plane.
- **Metric:** `scaling_readiness_score` (points, 0-100, higher is better)
- **Benchmark command:** `python3 experiments/scaling_eval/run_eval.py`
- **Environment:** Local
- **Files in scope:**
  - `saas/workflows/*.json`
  - `saas/skalierungsansätze/*.md`
  - `saas/Planung Umsetzung/masterplan.md`
  - `experiments/scaling_eval/**`
  - `outputs/scale-research/**`
- **Max iterations:** 12

## Research anchor (matching paper)
- **A Dataflow Language for Decentralised Orchestration of Web Service Workflows** (2013), arXiv:1305.01840
  - Hypothesis used in this run: decentralising execution and keeping orchestration logic separable reduces bottlenecks and single-point pressure in workflow systems.

## Loop protocol
For each iteration:
1. Run benchmark.
2. Identify lowest subscore.
3. Apply minimal high-leverage change in scoped files.
4. Re-run benchmark.
5. Keep change if score improves or resolves a major evidence gap; otherwise revert.
6. Log observation/inference/risk in `autoresearch.jsonl`.
